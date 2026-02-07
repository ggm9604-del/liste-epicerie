// Configuration Supabase
const SUPABASE_URL = 'https://liefkzfcmtenwbyplrxt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_yy7B6BsoihDEQl7jzj3Jtw_CQ1bNyMD';

// Initialize Supabase
const { createClient } = window.supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// State
let currentList = 'Points';
let items = {
    Points: [],
    IGA: [],
    Pharmacie: [],
    Costco: []
};

let sortOrder = {
    Points: null,
    IGA: null,
    Pharmacie: null,
    Costco: null
};

let editingItemId = null;
let swipedItemId = null;
let touchStartX = 0;

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    initializeServiceWorker();
    setupEventListeners();
    await initializeSupabase();
    loadItems();
    updateUI();
});

// Service Worker
async function initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('/service-worker.js');
        } catch (error) {
            console.log('Service Worker registration failed:', error);
        }
    }
}

// Event Listeners
function setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchList(e.target.dataset.list);
        });
    });

    // List name editing
    document.querySelectorAll('.list-name').forEach(name => {
        name.addEventListener('click', (e) => {
            if (e.target.contentEditable === 'false') {
                e.target.contentEditable = 'true';
                e.target.focus();
            }
        });

        name.addEventListener('blur', async (e) => {
            e.target.contentEditable = 'false';
            const newName = e.target.textContent.replace(/📝 |🛒 |💊 |🏬 /g, '');
            if (newName) {
                const section = e.target.closest('.list-section');
                if (section) {
                    const oldList = section.dataset.list;
                    // Update in your data structure if needed
                }
            }
        });

        name.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.target.contentEditable = 'false';
                e.target.blur();
            }
        });
    });

    // Add item buttons
    document.querySelectorAll('.add-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const section = btn.closest('.list-section');
            const input = section.querySelector('.add-item-input');
            addItem(section.dataset.list, input.value);
            input.value = '';
        });
    });

    // Add item on Enter key
    document.querySelectorAll('.add-item-input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const section = input.closest('.list-section');
                addItem(section.dataset.list, input.value);
                input.value = '';
            }
        });
    });

    // Sort buttons
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const section = btn.closest('.list-section');
            const listName = section.dataset.list;
            const order = e.target.dataset.sort;
            sortItems(listName, order);
            updateSortButtons(listName);
        });
    });
}

// Initialize Supabase Tables
async function initializeSupabase() {
    try {
        // Check if table exists, if not create it
        const { data, error } = await supabase
            .from('grocery_items')
            .select('count', { count: 'exact' })
            .limit(1);

        if (error && error.code !== 'PGRST116') {
            console.error('Supabase error:', error);
            updateSyncStatus('error');
        } else {
            // Setup real-time subscription
            const subscription = supabase
                .channel('grocery_items')
                .on('postgres_changes', 
                    { event: '*', schema: 'public', table: 'grocery_items' },
                    (payload) => {
                        loadItems();
                        updateUI();
                    }
                )
                .subscribe();

            updateSyncStatus('synced');
        }
    } catch (error) {
        console.error('Error initializing Supabase:', error);
        updateSyncStatus('error');
    }
}

// Load items from Supabase
async function loadItems() {
    try {
        const { data, error } = await supabase
            .from('grocery_items')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) throw error;

        // Group items by list
        items = {
            Points: [],
            IGA: [],
            Pharmacie: [],
            Costco: []
        };

        if (data) {
            data.forEach(item => {
                if (items[item.list_name]) {
                    items[item.list_name].push(item);
                }
            });
        }

        updateUI();
        updateSyncStatus('synced');
    } catch (error) {
        console.error('Error loading items:', error);
        updateSyncStatus('error');
    }
}

// Add item
async function addItem(listName, itemText) {
    if (!itemText.trim()) return;

    try {
        const { data, error } = await supabase
            .from('grocery_items')
            .insert([
                {
                    list_name: listName,
                    text: itemText.trim(),
                    completed: false,
                    created_at: new Date().toISOString()
                }
            ])
            .select();

        if (error) throw error;

        loadItems();
        updateUI();
    } catch (error) {
        console.error('Error adding item:', error);
        updateSyncStatus('error');
    }
}

// Toggle item completion
async function toggleItem(listName, itemId) {
    try {
        const item = items[listName].find(i => i.id === itemId);
        if (!item) return;

        const { error } = await supabase
            .from('grocery_items')
            .update({ completed: !item.completed })
            .eq('id', itemId);

        if (error) throw error;

        loadItems();
        updateUI();
    } catch (error) {
        console.error('Error toggling item:', error);
        updateSyncStatus('error');
    }
}

// Edit item
async function editItem(listName, itemId, newText) {
    if (!newText.trim()) {
        editingItemId = null;
        updateUI();
        return;
    }

    try {
        const { error } = await supabase
            .from('grocery_items')
            .update({ text: newText.trim() })
            .eq('id', itemId);

        if (error) throw error;

        editingItemId = null;
        loadItems();
        updateUI();
    } catch (error) {
        console.error('Error editing item:', error);
        updateSyncStatus('error');
    }
}

// Delete item
async function deleteItem(listName, itemId) {
    try {
        const { error } = await supabase
            .from('grocery_items')
            .delete()
            .eq('id', itemId);

        if (error) throw error;

        swipedItemId = null;
        loadItems();
        updateUI();
    } catch (error) {
        console.error('Error deleting item:', error);
        updateSyncStatus('error');
    }
}

// Sort items
function sortItems(listName, order) {
    if (sortOrder[listName] === order) {
        sortOrder[listName] = null;
    } else {
        sortOrder[listName] = order;
    }
    updateUI();
}

// Switch list
function switchList(listName) {
    currentList = listName;
    document.querySelectorAll('.list-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });

    document.querySelector(`[data-list="${listName}"].list-section`).classList.add('active');
    document.querySelector(`[data-list="${listName}"].tab-button`).classList.add('active');
}

// Update UI
function updateUI() {
    renderAllLists();
}

// Render all lists
function renderAllLists() {
    Object.keys(items).forEach(listName => {
        renderList(listName);
    });
}

// Render single list
function renderList(listName) {
    const listElement = document.querySelector(`.items-list[data-list="${listName}"]`);
    if (!listElement) return;

    let listItems = [...items[listName]];

    // Sort by completion status (unchecked first)
    listItems.sort((a, b) => {
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }
        return 0;
    });

    // Apply alphabetical sorting if selected
    if (sortOrder[listName]) {
        listItems.sort((a, b) => {
            const comparison = a.text.localeCompare(b.text, 'fr', { numeric: true });
            return sortOrder[listName] === 'asc' ? comparison : -comparison;
        });
    }

    // Clear previous items
    listElement.innerHTML = '';

    if (listItems.length === 0) {
        const li = document.createElement('li');
        li.className = 'list-item empty-state';
        li.textContent = 'Aucun article. Commencez à en ajouter ! ➕';
        listElement.appendChild(li);
        return;
    }

    // Render items
    listItems.forEach(item => {
        const li = document.createElement('li');
        li.className = `list-item ${item.completed ? 'checked' : 'unchecked'}`;
        if (editingItemId === item.id) {
            li.classList.add('editing');
        }
        if (swipedItemId === item.id) {
            li.classList.add('swiped');
        }

        // Checkbox button
        const checkBtn = document.createElement('button');
        checkBtn.className = 'checkbox-btn';
        checkBtn.textContent = item.completed ? '●' : '●';
        checkBtn.style.color = item.completed ? '#66BB6A' : '#EF5350';
        checkBtn.addEventListener('click', () => toggleItem(listName, item.id));
        li.appendChild(checkBtn);

        // Item text
        const textSpan = document.createElement('span');
        textSpan.className = 'item-text';
        textSpan.textContent = item.text;
        textSpan.addEventListener('dblclick', () => {
            editingItemId = item.id;
            updateUI();
            setTimeout(() => {
                const input = li.querySelector('.item-edit input');
                if (input) input.focus();
            }, 0);
        });
        li.appendChild(textSpan);

        // Edit input
        if (editingItemId === item.id) {
            const editDiv = document.createElement('div');
            editDiv.className = 'item-edit';
            const input = document.createElement('input');
            input.type = 'text';
            input.value = item.text;
            input.addEventListener('blur', () => {
                editItem(listName, item.id, input.value);
            });
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    editItem(listName, item.id, input.value);
                } else if (e.key === 'Escape') {
                    editingItemId = null;
                    updateUI();
                }
            });
            editDiv.appendChild(input);
            li.appendChild(editDiv);
        }

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '🗑️';
        deleteBtn.addEventListener('click', () => deleteItem(listName, item.id));
        li.appendChild(deleteBtn);

        // Touch swipe handling
        li.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        li.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const swipeDistance = touchStartX - touchEndX;

            if (swipeDistance > 50) {
                swipedItemId = item.id;
                updateUI();
            }
        });

        // Click elsewhere to cancel swipe
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.list-item')) {
                swipedItemId = null;
                updateUI();
            }
        });

        listElement.appendChild(li);
    });
}

// Update sort buttons active state
function updateSortButtons(listName) {
    const section = document.querySelector(`.list-section[data-list="${listName}"]`);
    if (!section) return;

    section.querySelectorAll('.sort-btn').forEach(btn => {
        btn.classList.remove('active');
        if (sortOrder[listName] === btn.dataset.sort) {
            btn.classList.add('active');
        }
    });
}

// Update sync status
function updateSyncStatus(status) {
    const indicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.status-text');

    if (!indicator || !statusText) return;

    indicator.classList.remove('synced', 'error');

    switch (status) {
        case 'synced':
            indicator.classList.add('synced');
            statusText.textContent = '✓ Synchronisé';
            break;
        case 'error':
            indicator.classList.add('error');
            statusText.textContent = '✗ Erreur de synchronisation';
            break;
        default:
            statusText.textContent = '⟳ Synchronisation en cours...';
    }
}

// Handle visibility change to reload items when returning to app
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        loadItems();
    }
});
