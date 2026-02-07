# 📋 Liste d'Épicerie Partagée

Une application web progressive (PWA) pour gérer une liste d'épicerie partagée en temps réel avec ta conjointe et ta fille.

## ✨ Caractéristiques

- ✅ **4 listes indépendantes** : Points, IGA, Pharmacie, Costco
- ✅ **Synchronisation temps réel** : Les modifications s'affichent instantanément
- ✅ **Articles cochés/non cochés** : Organisés automatiquement (rouge non coché, vert coché)
- ✅ **Tri alphabétique** : Croissant ou décroissant pour chaque liste
- ✅ **Édition des noms de listes** : Cliquez sur le nom pour le modifier
- ✅ **Édition des articles** : Double-cliquez pour modifier
- ✅ **Suppression rapide** : Glissez à gauche sur mobile pour supprimer
- ✅ **Installation comme app** : Fonctionne comme une vraie application sur iPhone/Android
- ✅ **Fonctionne hors ligne** : Accès local même sans internet
- ✅ **Interface conviviale** : Design optimisé pour tous les appareils

## 🚀 Installation

### Étape 1 : Configurer Supabase

Tu as déjà créé un compte Supabase ! Pour finaliser :

1. Va à https://app.supabase.com
2. Sélectionne ton projet "Liste d'épicerie"
3. Va dans **SQL Editor** et crée cette table :

```sql
CREATE TABLE grocery_items (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  list_name TEXT NOT NULL,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE grocery_items ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (pour une liste familiale)
CREATE POLICY "Allow all operations" ON grocery_items FOR ALL USING (true);
```

### Étape 2 : Déployer l'application

#### Option A : Vercel (Recommandé - Gratuit)

1. Crée un compte sur https://vercel.com
2. Connecte ton GitHub ou importe ce projet
3. Déploie ! C'est automatique
4. Partage le lien avec ta conjointe et ta fille

#### Option B : Netlify (Gratuit)

1. Crée un compte sur https://netlify.com
2. Déplace les fichiers dans un dossier Git
3. Connecte ton repo à Netlify
4. Déploie en quelques clics

#### Option C : Hébergement local

1. Place les fichiers sur un serveur web (Apache, Nginx)
2. Accès via : `http://ton-ip-ou-domaine`

### Étape 3 : Installer sur iPhone

1. Ouvre le lien de l'app dans Safari
2. Clique l'icône **Partager** (carré avec flèche)
3. Sélectionne **"Sur l'écran d'accueil"**
4. C'est prêt ! L'app s'installe comme une vraie app

### Étape 4 : Partager

- Partage simplement le lien avec ta conjointe et ta fille
- Elles peuvent l'installer de la même façon
- Tout le monde voit les mises à jour en temps réel

## 📱 Guide d'utilisation

### Ajouter un article
- Écris le nom dans le champ en haut
- Clique le bouton **+** ou appuie sur Entrée

### Cocher/Décocher
- Clique sur le point (●) noir/vert à gauche
- L'article monte/descend automatiquement

### Éditer un article
- **Sur ordinateur** : Double-clique sur le texte
- **Sur téléphone** : Double-tab sur la ligne

### Supprimer un article
- **Sur ordinateur** : Clique le bouton 🗑️ quand l'article est sélectionné
- **Sur téléphone** : Glisse l'article vers la gauche, puis clique 🗑️

### Éditer le nom d'une liste
- Clique sur le nom (ex: "IGA")
- Le texte s'illumine en jaune
- Modifie et appuie sur Entrée

### Trier alphabétiquement
- Clique **A→Z** pour l'ordre croissant
- Clique **Z→A** pour l'ordre décroissant
- Clique à nouveau pour annuler

## 🔧 Fichiers du projet

```
.
├── index.html           # Page principale
├── styles.css           # Styles et design
├── app.js              # Logique JavaScript (Supabase)
├── service-worker.js   # Support offline
├── manifest.json       # Configuration PWA
└── README.md          # Ce fichier
```

## ⚙️ Configuration requise

- **Navigateur moderne** : Chrome, Firefox, Safari (iOS 12+)
- **Compte Supabase** : https://supabase.com (gratuit)
- **Connexion internet** : Pour la synchronisation en temps réel

## 🛡️ Sécurité

- Les données sont stockées dans Supabase (serveurs Google)
- Cryptifiées en transit
- Tout le monde avec le lien peut accéder (idéal pour la famille)
- Pas d'authentification requise

## 📚 Technologies utilisées

- **Frontend** : HTML5, CSS3, JavaScript Vanilla
- **Backend** : Supabase (PostgreSQL + Real-time)
- **PWA** : Service Workers, App Manifest
- **Déploiement** : Vercel/Netlify (gratuit)

## 🐛 Dépannage

### L'app ne se synchronise pas
- Vérifie ta connexion internet
- Actualise la page (Ctrl+R ou Cmd+R)
- Vérifie que tes clés Supabase sont correctes

### La table n'existe pas
- Va dans Supabase et crée la table via SQL Editor (voir Étape 1)

### L'app ne s'installe pas sur iPhone
- Utilise Safari (pas Chrome)
- Assure-toi qu'elle est hébergée en HTTPS

## 📞 Support

Si tu rencontres un problème :
1. Actualise la page
2. Vide le cache du navigateur
3. Réinstalle la PWA
4. Vérifie la table Supabase

## 📝 Notes

- Cette app est gratuite
- Idéale pour les listes de moins de 10 000 articles par mois
- Fonctionne hors ligne avec les données en cache
- Optimisée pour les appareils tactiles

## 🎨 Personnalisation future

Tu peux demander :
- Couleurs différentes
- Catégories d'articles
- Historique des achats
- Partage de listes avec des codes
- Notifications push
- Budget tracking

---

**Créée avec ❤️ - Liste d'épicerie partagée en temps réel**
