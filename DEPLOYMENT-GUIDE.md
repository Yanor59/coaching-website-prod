# 🚀 Guide de Déploiement Gratuit

## 🎯 Hébergeurs Gratuits Recommandés

### 1. 🌟 Netlify (RECOMMANDÉ)
**Parfait pour votre projet !**

#### Avantages
- ✅ **100% Gratuit** pour les sites statiques
- ✅ SSL automatique (HTTPS)
- ✅ Déploiement en 1 clic
- ✅ Domaine gratuit : `votre-site.netlify.app`
- ✅ Formulaires gratuits (100/mois)
- ✅ Déploiement automatique depuis Git
- ✅ Prévisualisation des branches
- ✅ Rollback facile
- ✅ CDN mondial ultra-rapide

#### Limites Gratuites
- 100 GB de bande passante/mois
- 300 minutes de build/mois
- Largement suffisant pour commencer !

#### 📝 Déploiement sur Netlify

**Méthode 1 : Drag & Drop (La plus simple)**
1. Allez sur https://www.netlify.com/
2. Créez un compte gratuit
3. Cliquez sur "Add new site" → "Deploy manually"
4. Glissez-déposez le dossier `coaching-website`
5. Votre site est en ligne ! 🎉

**Méthode 2 : Via Git (Recommandé)**
```bash
# 1. Installer Git (si pas déjà fait)
# Télécharger depuis : https://git-scm.com/download/win

# 2. Initialiser Git dans votre projet
cd coaching-website
git init
git add .
git commit -m "Initial commit"

# 3. Créer un repo sur GitHub
# Allez sur https://github.com/new
# Créez un nouveau repository "coaching-website"

# 4. Pousser votre code
git remote add origin https://github.com/VOTRE-USERNAME/coaching-website.git
git branch -M main
git push -u origin main

# 5. Sur Netlify
# - Cliquez "Add new site" → "Import an existing project"
# - Connectez votre compte GitHub
# - Sélectionnez le repo "coaching-website"
# - Cliquez "Deploy site"
```

**Configuration Netlify :**
```toml
# Créer un fichier netlify.toml à la racine
[build]
  publish = "."
  
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 2. 🔷 Vercel
**Alternative excellente**

#### Avantages
- ✅ Gratuit pour projets personnels
- ✅ SSL automatique
- ✅ Déploiement ultra-rapide
- ✅ Domaine gratuit : `votre-site.vercel.app`
- ✅ Analytics gratuits
- ✅ Prévisualisation automatique

#### Déploiement
1. Allez sur https://vercel.com/
2. Créez un compte gratuit
3. Cliquez "Add New" → "Project"
4. Importez depuis GitHub ou glissez-déposez

---

### 3. 📄 GitHub Pages
**Gratuit et simple**

#### Avantages
- ✅ 100% Gratuit
- ✅ Domaine : `username.github.io/coaching-website`
- ✅ Intégré à GitHub
- ✅ SSL automatique

#### Déploiement
```bash
# 1. Créer un repo GitHub (voir ci-dessus)

# 2. Activer GitHub Pages
# - Allez dans Settings → Pages
# - Source : Deploy from a branch
# - Branch : main / (root)
# - Save

# 3. Votre site sera disponible à :
# https://VOTRE-USERNAME.github.io/coaching-website/
```

---

### 4. 🎨 Render
**Bon pour frontend + backend**

#### Avantages
- ✅ Gratuit pour sites statiques
- ✅ Peut aussi héberger le backend (Strapi)
- ✅ SSL automatique
- ✅ Déploiement automatique

#### Déploiement
1. Allez sur https://render.com/
2. Créez un compte gratuit
3. "New" → "Static Site"
4. Connectez votre repo GitHub

---

### 5. ☁️ Cloudflare Pages
**Ultra-rapide**

#### Avantages
- ✅ Gratuit illimité
- ✅ CDN le plus rapide au monde
- ✅ Builds illimités
- ✅ SSL automatique

#### Déploiement
1. Allez sur https://pages.cloudflare.com/
2. Créez un compte gratuit
3. Connectez votre repo GitHub
4. Déployez !

---

## 🔧 Backend Gratuit (Pour Strapi)

### 1. 🚂 Railway (RECOMMANDÉ pour Strapi)
**Gratuit avec $5 de crédit/mois**

#### Avantages
- ✅ $5 de crédit gratuit/mois
- ✅ Parfait pour Strapi
- ✅ Base de données PostgreSQL incluse
- ✅ Déploiement facile

#### Déploiement Strapi
```bash
# 1. Créer votre projet Strapi
npx create-strapi-app@latest backend --quickstart

# 2. Pousser sur GitHub
cd backend
git init
git add .
git commit -m "Initial Strapi setup"
git remote add origin https://github.com/VOTRE-USERNAME/coaching-backend.git
git push -u origin main

# 3. Sur Railway
# - Allez sur https://railway.app/
# - Créez un compte gratuit
# - "New Project" → "Deploy from GitHub repo"
# - Sélectionnez votre repo backend
# - Railway détecte automatiquement Strapi !
```

---

### 2. 🟣 Render (Backend)
**Gratuit avec limitations**

#### Avantages
- ✅ Gratuit pour 1 service
- ✅ PostgreSQL gratuit (90 jours)
- ✅ SSL automatique

#### Limites
- ⚠️ Se met en veille après 15 min d'inactivité
- ⚠️ Redémarre lentement (~30 secondes)

---

### 3. 🔵 Heroku (Avec limitations)
**Anciennement gratuit, maintenant payant**

⚠️ **Note** : Heroku n'offre plus de tier gratuit depuis novembre 2022.
Minimum : $7/mois

---

## 📊 Comparaison des Hébergeurs

| Hébergeur | Frontend | Backend | Base de données | Prix | Recommandation |
|-----------|----------|---------|-----------------|------|----------------|
| **Netlify** | ✅ Excellent | ❌ Non | ❌ Non | Gratuit | ⭐⭐⭐⭐⭐ Frontend |
| **Vercel** | ✅ Excellent | ⚠️ Limité | ❌ Non | Gratuit | ⭐⭐⭐⭐⭐ Frontend |
| **Railway** | ✅ Bon | ✅ Excellent | ✅ Oui | $5/mois crédit | ⭐⭐⭐⭐⭐ Backend |
| **Render** | ✅ Bon | ⚠️ Veille | ⚠️ 90 jours | Gratuit | ⭐⭐⭐ Complet |
| **GitHub Pages** | ✅ Bon | ❌ Non | ❌ Non | Gratuit | ⭐⭐⭐ Simple |
| **Cloudflare** | ✅ Excellent | ❌ Non | ❌ Non | Gratuit | ⭐⭐⭐⭐ Frontend |

---

## 🎯 Configuration Recommandée pour Votre Projet

### Option 1 : Site Statique Seulement (Pour commencer)
**Coût : 0€**

```
Frontend (Netlify) → Gratuit
└── Site statique avec mock data
```

**Avantages :**
- Déploiement immédiat
- Aucun coût
- Parfait pour tester et montrer

**Limitations :**
- Pas de vraie base de données
- Pas de gestion de contenu dynamique

---

### Option 2 : Site Complet avec Backend
**Coût : ~5€/mois**

```
Frontend (Netlify) → Gratuit
    ↓ API
Backend Strapi (Railway) → $5/mois crédit gratuit
    ↓
PostgreSQL (Railway) → Inclus
```

**Avantages :**
- Site complet fonctionnel
- Gestion de contenu via admin
- Base de données réelle
- Presque gratuit ($5 de crédit/mois)

---

### Option 3 : Tout Gratuit (Avec limitations)
**Coût : 0€**

```
Frontend (Netlify) → Gratuit
    ↓ API
Backend Strapi (Render) → Gratuit (avec veille)
    ↓
PostgreSQL (Render) → Gratuit 90 jours
```

**Avantages :**
- Totalement gratuit
- Fonctionnel

**Limitations :**
- Backend se met en veille (redémarre en 30s)
- Base de données limitée à 90 jours

---

## 📝 Guide Pas à Pas : Déploiement Complet

### Étape 1 : Déployer le Frontend sur Netlify

```bash
# 1. Préparer le projet
cd coaching-website

# 2. Créer un fichier netlify.toml
echo '[build]
  publish = "."
  
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200' > netlify.toml

# 3. Si vous utilisez Git
git init
git add .
git commit -m "Ready for deployment"

# 4. Créer un repo sur GitHub
# Allez sur https://github.com/new

# 5. Pousser le code
git remote add origin https://github.com/VOTRE-USERNAME/coaching-website.git
git branch -M main
git push -u origin main

# 6. Sur Netlify
# - Connectez votre compte GitHub
# - Sélectionnez le repo
# - Deploy !
```

**Votre site sera disponible à :** `https://votre-site.netlify.app`

---

### Étape 2 : Déployer le Backend sur Railway (Optionnel)

```bash
# 1. Créer le projet Strapi
npx create-strapi-app@latest coaching-backend --quickstart

# 2. Configurer pour production
cd coaching-backend

# 3. Créer .env
echo 'HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret' > .env

# 4. Pousser sur GitHub
git init
git add .
git commit -m "Strapi backend"
git remote add origin https://github.com/VOTRE-USERNAME/coaching-backend.git
git push -u origin main

# 5. Sur Railway
# - Créez un projet
# - Ajoutez PostgreSQL
# - Déployez depuis GitHub
# - Railway configure automatiquement !
```

---

### Étape 3 : Connecter Frontend et Backend

```javascript
// Dans coaching-website/js/api-service.js
// Ligne 5, remplacez :
constructor(baseURL = 'http://localhost:1337/api') {

// Par votre URL Railway :
constructor(baseURL = 'https://votre-backend.railway.app/api') {

// Et ligne 402, changez :
const USE_MOCK = true;

// En :
const USE_MOCK = false;
```

Puis redéployez sur Netlify !

---

## 🎁 Bonus : Domaine Personnalisé Gratuit

### Option 1 : Sous-domaine Netlify
- Gratuit : `alina-coaching.netlify.app`
- Personnalisable dans les settings

### Option 2 : Domaine .tk gratuit
1. Allez sur https://www.freenom.com/
2. Cherchez un domaine disponible
3. Enregistrez gratuitement (1 an)
4. Configurez dans Netlify

### Option 3 : Acheter un domaine
- **Namecheap** : ~10€/an
- **OVH** : ~10€/an
- **Google Domains** : ~12€/an

---

## ✅ Checklist Avant Déploiement

### Frontend
- [ ] Remplacer le Lorem Ipsum
- [ ] Ajouter les vraies photos
- [ ] Ajouter le logo
- [ ] Configurer les URLs des vidéos
- [ ] Tester sur mobile
- [ ] Vérifier les traductions (4 langues)
- [ ] Optimiser les images
- [ ] Configurer les meta tags SEO

### Backend (si applicable)
- [ ] Configurer les variables d'environnement
- [ ] Créer les Content Types dans Strapi
- [ ] Configurer les permissions
- [ ] Tester l'API
- [ ] Configurer CORS
- [ ] Sauvegarder la base de données

### Général
- [ ] Tester le formulaire de contact
- [ ] Vérifier les liens
- [ ] Tester la galerie photos
- [ ] Tester les vidéos
- [ ] Vérifier le responsive
- [ ] Tester sur différents navigateurs

---

## 🆘 Aide et Support

### Documentation
- **Netlify** : https://docs.netlify.com/
- **Vercel** : https://vercel.com/docs
- **Railway** : https://docs.railway.app/
- **Strapi** : https://docs.strapi.io/

### Communautés
- **Discord Netlify** : https://discord.gg/netlify
- **Discord Strapi** : https://discord.strapi.io/
- **Stack Overflow** : Tag `netlify`, `strapi`, etc.

---

## 💡 Conseils Pro

1. **Commencez simple** : Déployez d'abord sur Netlify sans backend
2. **Testez localement** : Assurez-vous que tout fonctionne avant de déployer
3. **Utilisez Git** : Facilite les déploiements et les rollbacks
4. **Sauvegardez** : Exportez régulièrement votre base de données
5. **Monitoring** : Utilisez les analytics gratuits de Netlify
6. **SSL** : Toujours activé automatiquement, vérifiez juste
7. **Performance** : Utilisez Lighthouse pour optimiser

---

## 🎯 Résumé : Meilleure Option pour Vous

### Pour Commencer (Gratuit)
```
✅ Frontend : Netlify (gratuit)
✅ Domaine : alina-coaching.netlify.app
✅ Temps : 10 minutes
✅ Coût : 0€
```

### Pour Production (Quasi-gratuit)
```
✅ Frontend : Netlify (gratuit)
✅ Backend : Railway ($5 crédit/mois)
✅ Base de données : PostgreSQL (inclus)
✅ Domaine : Votre choix (~10€/an)
✅ Coût total : ~10€/an
```

---

**Créé le** : 9 avril 2026  
**Version** : 1.0  
**Statut** : Guide complet de déploiement gratuit