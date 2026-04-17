# 🚀 Alina Coaching - Version Production Netlify

Version prête pour le déploiement sur Netlify avec Netlify Functions et Cloudinary.

## 📋 Prérequis

1. **Compte Netlify** (gratuit) : https://www.netlify.com/
2. **Compte Cloudinary** (gratuit) : https://cloudinary.com/
3. **Compte GitHub** : https://github.com/

## 🎯 Architecture

```
Frontend (Netlify)
├── Site public (index.html)
├── Interface admin (admin.html)
└── Netlify Functions (API)

Stockage Images (Cloudinary)
└── Upload et hébergement des images

Données (Git)
└── site-content.json dans le repository
```

## 📦 Installation

### 1. Créer un compte Cloudinary

1. Aller sur https://cloudinary.com/users/register/free
2. Créer un compte gratuit
3. Noter vos identifiants :
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 2. Préparer le repository GitHub

```bash
# Initialiser Git
cd coaching-website-prod
git init

# Ajouter les fichiers
git add .
git commit -m "Initial commit - Netlify ready"

# Créer un repo sur GitHub et le lier
git remote add origin https://github.com/VOTRE-USERNAME/alina-coaching.git
git push -u origin main
```

### 3. Déployer sur Netlify

1. Aller sur https://app.netlify.com/
2. Cliquer sur "Add new site" > "Import an existing project"
3. Choisir GitHub et sélectionner votre repository
4. Configuration :
   - **Build command** : (laisser vide)
   - **Publish directory** : `.` (racine)
   - **Functions directory** : `netlify/functions`

5. Cliquer sur "Deploy site"

### 4. Configurer les variables d'environnement

Dans Netlify Dashboard > Site settings > Environment variables :

```
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
ADMIN_PASSWORD=votre_mot_de_passe_admin
JWT_SECRET=une_chaine_aleatoire_longue_et_securisee
```

### 5. Activer Netlify Identity (optionnel)

1. Dans Netlify Dashboard > Identity
2. Cliquer sur "Enable Identity"
3. Settings > Registration > "Invite only"
4. Inviter votre email

## 🔧 Configuration

### Fichiers modifiés pour Netlify

1. **netlify.toml** - Configuration Netlify
2. **netlify/functions/** - API serverless
3. **js/api-service.js** - Adapté pour Netlify Functions
4. **js/image-upload.js** - Upload vers Cloudinary

### Structure des Netlify Functions

```
netlify/functions/
├── content.js          # CRUD pour site-content.json
├── upload-image.js     # Upload vers Cloudinary
├── auth.js            # Authentification
└── utils/
    └── helpers.js     # Fonctions utilitaires
```

## 🌐 URLs

Après déploiement :

- **Site public** : `https://votre-site.netlify.app/`
- **Admin** : `https://votre-site.netlify.app/admin.html`
- **API** : `https://votre-site.netlify.app/.netlify/functions/[nom-fonction]`

## 🔐 Sécurité

- ✅ HTTPS automatique
- ✅ Authentification JWT
- ✅ Variables d'environnement sécurisées
- ✅ CORS configuré
- ✅ Rate limiting sur les functions

## 📊 Limites gratuites

### Netlify (Plan gratuit)
- ✅ 100 GB bande passante/mois
- ✅ 125k requêtes functions/mois
- ✅ 300 minutes build/mois
- ✅ HTTPS inclus
- ✅ Déploiement automatique

### Cloudinary (Plan gratuit)
- ✅ 25 GB stockage
- ✅ 25 GB bande passante/mois
- ✅ Transformations d'images illimitées

## 🚀 Déploiement automatique

Chaque `git push` sur la branche `main` déclenche automatiquement :
1. Build du site
2. Déploiement sur Netlify
3. Mise à jour instantanée

## 📝 Modifications du contenu

### Via l'admin (recommandé)
1. Aller sur `https://votre-site.netlify.app/admin.html`
2. Se connecter
3. Modifier le contenu
4. Enregistrer

### Via Git (avancé)
1. Modifier `data/site-content.json`
2. Commit et push
3. Déploiement automatique

## 🐛 Dépannage

### Erreur 401 sur l'admin
- Vérifier que `JWT_SECRET` est configuré dans Netlify
- Rafraîchir la page (Ctrl+F5)

### Images ne s'affichent pas
- Vérifier les credentials Cloudinary
- Vérifier les variables d'environnement

### Functions timeout
- Les functions Netlify ont un timeout de 10 secondes
- Optimiser les opérations longues

## 📚 Documentation

- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Cloudinary Upload](https://cloudinary.com/documentation/upload_images)
- [Netlify Identity](https://docs.netlify.com/visitor-access/identity/)

## 🆘 Support

En cas de problème :
1. Vérifier les logs Netlify : Dashboard > Functions > Logs
2. Vérifier la console navigateur (F12)
3. Vérifier les variables d'environnement

---

**Version** : 1.0.0  
**Date** : Avril 2026  
**Prêt pour production** : ✅