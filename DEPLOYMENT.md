# 🚀 Guide de Déploiement - Liste d'Épicerie

## Étape 1 : Créer la table Supabase

Avant tout, tu dois créer la table pour stocker tes articles.

### Instructions :

1. Va à https://app.supabase.com
2. Clique sur ton projet "Liste d'épicerie"
3. Va à l'onglet **SQL Editor** (à gauche)
4. Copie-colle ce code :

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

5. Clique le bouton **Run** (ou Cmd+Enter)
6. La table est créée ! ✅

---

## Étape 2 : Déployer sur Vercel (Recommandé)

Vercel c'est **100% gratuit** et très facile.

### Instructions :

1. **Crée un compte Vercel**
   - Va à https://vercel.com
   - Clique "Sign Up"
   - Connecte avec GitHub, GitLab ou email

2. **Importe ce projet**
   - Clique "Add New..."
   - Sélectionne "Project"
   - Importe depuis Git OU charge les fichiers
   - Clique "Import"

3. **Déploiement automatique**
   - Vercel va déployer automatiquement
   - Tu verras un lien comme : `https://grocery-list-xxx.vercel.app`
   - C'est ton lien ! 🎉

4. **Teste le lien**
   - Ouvre-le dans Safari sur ton iPhone
   - Ajoute un article pour vérifier que ça marche

---

## Étape 3 : Installer sur iPhone

### Pour toi :

1. Ouvre le lien Vercel dans **Safari** sur ton iPhone
2. Appuie l'icône **Partager** (carré avec flèche vers le haut)
3. Scroll down et clique **"Sur l'écran d'accueil"**
4. Clique **"Ajouter"**
5. L'app s'installe et apparaît sur ton écran d'accueil ! 📱

### Pour ta conjointe et ta fille :

1. Envoie-leur ce message :
```
Salut ! Voici le lien de notre liste d'épicerie partagée :
https://grocery-list-xxx.vercel.app

(Remplace xxx par ton vrai lien)

Comment l'installer sur ton iPhone :
- Ouvre le lien dans Safari
- Appuie "Partager" en bas
- Clique "Sur l'écran d'accueil"
- Appuie "Ajouter"
```

---

## Étape 4 : Vérifier que tout fonctionne

1. **Sur ton app**
   - Ajoute un article : "Lait"
   - Clique le point noir (●) pour cocher

2. **Sur l'app de ta conjointe/fille**
   - Actualise la page (ou attends 1-2 secondes)
   - Tu dois voir "Lait" avec le point vert ✅

Si tu ne vois pas l'article :
- Actualise la page
- Vérifie que la table Supabase existe (voir Étape 1)

---

## 📱 Comment utiliser l'app

### **Ajouter un article**
- Écris dans le champ en haut
- Clique **+** ou appuie Entrée

### **Cocher lors du shopping**
- Clique le point (●) quand tu achètes l'article
- L'article devient vert et descend

### **Éditer un article**
- **PC** : Double-clique
- **iPhone** : Double-tap sur la ligne

### **Supprimer un article**
- **PC** : Clique le bouton 🗑️
- **iPhone** : Glisse l'article à gauche, puis 🗑️

### **Trier alphabétiquement**
- Clique **A→Z** ou **Z→A** en haut
- Utile pour trouver les doublons !

### **Changer les noms des listes**
- Clique sur "IGA" pour l'éditer
- Le texte s'illumine en jaune
- Change-le et appuie Entrée

---

## 🆘 Blocage sur Supabase ?

Si tu vois une erreur ou ça ne se synchronise pas :

1. **Vérifie les clés**
   - Va dans Supabase
   - Settings → API
   - Copie le **Project URL** et **Anon Key**
   - Ouvre le fichier `app.js`
   - Cherche les lignes :
   ```javascript
   const SUPABASE_URL = 'https://...';
   const SUPABASE_KEY = 'sb_publishable_...';
   ```
   - Remplace par tes vraies clés

2. **Vérifie la table exists**
   - Va dans Supabase
   - Clique "Table Editor"
   - Tu dois voir une table "grocery_items"
   - Si elle n'existe pas, crée-la avec le SQL (Étape 1)

3. **Policies de sécurité**
   - Va dans SQLEditor
   - Copie-colle ce code :
   ```sql
   CREATE POLICY "Allow all operations" ON grocery_items FOR ALL USING (true);
   ```

---

## 💻 Alternative : Hébergement local (Avancé)

Si Vercel ne fonctionne pas pour toi :

1. Place tous les fichiers dans un dossier
2. Ouvre un terminal dans ce dossier
3. Tape : `python -m http.server 8000`
4. Accès : http://localhost:8000

---

## 📊 Résumé des étapes

- [ ] Créer la table Supabase
- [ ] Créer compte Vercel
- [ ] Déployer le projet
- [ ] Installer sur iPhone
- [ ] Partager le lien
- [ ] Tester la synchronisation

---

## ✅ Ça marche ! Bravo !

Tu as maintenant une liste d'épicerie partagée, sans frais, et sans limites ! 🎉

Si tu veux ajouter des fonctionnalités plus tard, demande-moi :
- Catégories
- Budget
- Photos
- Notifications
- Etc.

Bonne epicerie ! 🛒
