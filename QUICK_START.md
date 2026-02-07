# ⚡ Démarrage Rapide - 5 minutes

## 🎯 Résumé

Tu as maintenant une **liste d'épicerie partagée en temps réel** !

## 📋 Ce qui a été créé

✅ Application web responsif (iPhone/Android/PC)  
✅ Synchronisation Supabase en temps réel  
✅ Installation comme app native sur iPhone  
✅ Interface intuitive avec 4 listes  
✅ Tri alphabétique et édition en direct  

## 🚀 Prochaines étapes (5 min)

### **1️⃣ Créer la table Supabase (2 min)**

Va à https://app.supabase.com → Ton projet → SQL Editor

Copie-colle :
```sql
CREATE TABLE grocery_items (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  list_name TEXT NOT NULL,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE grocery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations" ON grocery_items FOR ALL USING (true);
```

Clique **Run** ✅

---

### **2️⃣ Déployer sur Vercel (2 min)**

1. Va à https://vercel.com/signup (crée un compte)
2. "Import Project" → Charge les fichiers ou Github
3. Vercel déploie automatiquement
4. Tu reçois un lien 🔗 : `https://xxx.vercel.app`

---

### **3️⃣ Installer sur iPhone (1 min)**

- Ouvre le lien Vercel dans **Safari**
- Partager → "Sur l'écran d'accueil" → "Ajouter"
- L'app s'installe ! 📱

---

### **4️⃣ Partage avec ta famille**

**Envoie ce message à ta conjointe et ta fille :**

```
Salut ! 

Voici notre liste d'épicerie partagée :
https://[TON-LIEN-VERCEL]

Comment l'utiliser :
1. Ouvre le lien dans Safari
2. Partager → "Sur l'écran d'accueil" → "Ajouter"
3. C'est prêt ! L'app apparaît sur ton écran d'accueil

Utilisation :
- Ajoute des articles dans les listes (Points, IGA, Pharmacie, Costco)
- Clique le point (●) quand tu achètes
- Double-tap pour éditer
- Glisse à gauche pour supprimer
```

---

## ✨ Fonctionnalités incluses

✅ 4 listes indépendantes : Points, IGA, Pharmacie, Costco  
✅ Articles rouge (non coché) / vert (coché)  
✅ Tri alphabétique A→Z ou Z→A  
✅ Synchronisation temps réel  
✅ Édition des noms de listes  
✅ Édition/suppression rapide  
✅ Interface conviviale iPhone  
✅ Fonctionne hors-ligne  

---

## 📁 Fichiers fournis

```
index.html          → Page web
styles.css          → Design
app.js              → Logique (Supabase)
service-worker.js   → Offline support
manifest.json       → Config PWA
vercel.json         → Config déploiement
```

---

## 🔗 Lien Vercel

Une fois déployé, ton lien ressemblera à :
```
https://grocery-list-abc123.vercel.app
```

**C'est ce lien que tu partages !**

---

## ❓ Questions ?

Consulte ce fichier pour plus de détails :
- **DEPLOYMENT.md** → Guide complet de déploiement
- **README.md** → Documentation complète

---

## 🎉 Prêt ?

1. Crée la table Supabase ✅
2. Déploie sur Vercel ✅
3. Partage le lien ✅
4. Enjoy ! 🛒

Bonne chance ! 🍀
