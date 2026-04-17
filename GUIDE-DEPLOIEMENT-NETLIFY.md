# 🚀 Guide de Déploiement Netlify - Alina Coaching

Guide complet pour déployer votre site sur Netlify avec toutes les fonctionnalités.

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Configuration Cloudinary](#configuration-cloudinary)
3. [Préparation du Repository](#préparation-du-repository)
4. [Déploiement sur Netlify](#déploiement-sur-netlify)
5. [Configuration des Variables](#configuration-des-variables)
6. [Test du Site](#test-du-site)
7. [Dépannage](#dépannage)

---

## 🎯 Prérequis

### Comptes nécessaires (tous gratuits)

- ✅ **GitHub** : https://github.com/signup
- ✅ **Netlify** : https://app.netlify.com/signup
- ✅ **Cloudinary** : https://cloudinary.com/users/register/free

---

## ☁️ Configuration Cloudinary

### 1. Créer un compte Cloudinary

1. Aller sur https://cloudinary.com/users/register/free
2. Remplir le formulaire d'inscription
3. Vérifier votre email
4. Se connecter au Dashboard

### 2. Récupérer les identifiants

Dans le Dashboard Cloudinary :

1. Cliquer sur **Settings** (⚙️ en haut à droite)
2. Aller dans **Access Keys**
3. Noter ces 3 informations :

```
Cloud Name: votre_cloud_name
API Key: votre_api_key
API Secret: votre_api_secret (cliquer sur "Reveal" pour voir)
```

⚠️ **Important** : Gardez ces informations secrètes !

---

## 📦 Préparation du Repository

### 1. Installer Git (si pas déjà fait)

**Windows** : https://git-scm.com/download/win  
**Mac** : `brew install git`  
**Linux** : `sudo apt-get install git`

### 2. Initialiser le repository

Ouvrir un terminal dans le dossier `coaching-website-prod` :

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - Site Alina Coaching"
```

### 3. Créer un repository sur GitHub

1. Aller sur https://github.com/new
2. Nom du repository : `alina-coaching` (ou autre nom)
3. **Privé** ou **Public** (au choix)
4. **NE PAS** cocher "Initialize with README"
5. Cliquer sur **Create repository**

### 4. Lier le repository local à GitHub

Copier les commandes affichées sur GitHub (section "push an existing repository") :

```bash
git remote add origin https://github.com/VOTRE-USERNAME/alina-coaching.git
git branch -M main
git push -u origin main
```

✅ Votre code est maintenant sur GitHub !

---

## 🌐 Déploiement sur Netlify

### 1. Se connecter à Netlify

1. Aller sur https://app.netlify.com/
2. Cliquer sur **Sign up** ou **Log in**
3. Choisir **GitHub** pour se connecter

### 2. Importer le projet

1. Cliquer sur **Add new site** > **Import an existing project**
2. Choisir **Deploy with GitHub**
3. Autoriser Netlify à accéder à GitHub
4. Sélectionner le repository `alina-coaching`

### 3. Configuration du build

Sur la page de configuration :

- **Branch to deploy** : `main`
- **Build command** : (laisser vide)
- **Publish directory** : `.` (point)
- **Functions directory** : `netlify/functions`

Cliquer sur **Deploy site**

⏳ Netlify va déployer votre site (1-2 minutes)

---

## 🔐 Configuration des Variables

### 1. Accéder aux variables d'environnement

Dans Netlify Dashboard :

1. Cliquer sur votre site
2. Aller dans **Site settings**
3. Cliquer sur **Environment variables** (dans le menu gauche)
4. Cliquer sur **Add a variable**

### 2. Ajouter les variables

Ajouter ces 5 variables une par une :

#### Variable 1 : CLOUDINARY_CLOUD_NAME
```
Key: CLOUDINARY_CLOUD_NAME
Value: votre_cloud_name (de Cloudinary)
```

#### Variable 2 : CLOUDINARY_API_KEY
```
Key: CLOUDINARY_API_KEY
Value: votre_api_key (de Cloudinary)
```

#### Variable 3 : CLOUDINARY_API_SECRET
```
Key: CLOUDINARY_API_SECRET
Value: votre_api_secret (de Cloudinary)
```

#### Variable 4 : ADMIN_PASSWORD
```
Key: ADMIN_PASSWORD
Value: VotreMotDePasseAdmin123! (choisissez un mot de passe fort)
```

#### Variable 5 : JWT_SECRET
```
Key: JWT_SECRET
Value: une_chaine_aleatoire_tres_longue_et_securisee_123456789
```

💡 **Astuce** : Pour JWT_SECRET, utilisez un générateur de mot de passe aléatoire

### 3. Redéployer le site

Après avoir ajouté les variables :

1. Aller dans **Deploys**
2. Cliquer sur **Trigger deploy** > **Deploy site**

---

## ✅ Test du Site

### 1. Accéder au site

Votre site est disponible à l'URL :
```
https://nom-aleatoire-123.netlify.app
```

Vous pouvez changer ce nom dans **Site settings** > **Site details** > **Change site name**

### 2. Tester le site public

1. Ouvrir `https://votre-site.netlify.app/`
2. Vérifier que le site s'affiche correctement
3. Tester le changement de langue
4. Vérifier les images

### 3. Tester l'admin

1. Ouvrir `https://votre-site.netlify.app/admin.html`
2. Se connecter avec le mot de passe configuré (ADMIN_PASSWORD)
3. Tester la modification de contenu :
   - Aller dans **Contenu**
   - Modifier un texte
   - Cliquer sur **Enregistrer**
4. Rafraîchir le site public pour voir les changements

### 4. Tester l'upload d'images

1. Dans l'admin, aller dans **Galerie**
2. Cliquer sur **Ajouter une photo**
3. Sélectionner une image
4. Vérifier qu'elle s'affiche sur le site public

---

## 🐛 Dépannage

### Problème : Erreur 401 sur l'admin

**Cause** : JWT_SECRET non configuré ou incorrect

**Solution** :
1. Vérifier que JWT_SECRET est bien dans les variables d'environnement
2. Redéployer le site
3. Vider le cache du navigateur (Ctrl+Shift+Delete)
4. Rafraîchir la page (Ctrl+F5)

### Problème : Images ne s'uploadent pas

**Cause** : Credentials Cloudinary incorrects

**Solution** :
1. Vérifier les 3 variables Cloudinary
2. Vérifier qu'il n'y a pas d'espaces avant/après les valeurs
3. Redéployer le site
4. Vérifier les logs : **Deploys** > **Function logs**

### Problème : Modifications non sauvegardées

**Cause** : Permissions Git ou erreur dans la function

**Solution** :
1. Vérifier les logs : **Deploys** > **Function logs**
2. Vérifier que le fichier `data/site-content.json` existe
3. Vérifier les permissions du repository GitHub

### Problème : Site ne se déploie pas

**Cause** : Erreur dans le code ou configuration

**Solution** :
1. Aller dans **Deploys**
2. Cliquer sur le dernier déploiement
3. Lire les logs d'erreur
4. Corriger le problème dans le code
5. Push sur GitHub : `git push`

### Voir les logs en temps réel

1. Aller dans **Functions**
2. Cliquer sur une function (ex: `content`)
3. Voir les logs d'exécution

---

## 🎨 Personnalisation

### Changer le nom de domaine

1. **Site settings** > **Domain management**
2. Cliquer sur **Add custom domain**
3. Suivre les instructions pour configurer votre domaine

### Activer HTTPS (automatique)

Netlify active automatiquement HTTPS avec Let's Encrypt.

### Configurer les emails

Pour recevoir les soumissions de formulaire :

1. **Site settings** > **Forms**
2. Configurer les notifications email

---

## 📊 Monitoring

### Voir les statistiques

1. **Analytics** (dans le menu)
2. Voir les visites, bande passante, etc.

### Limites du plan gratuit

- ✅ 100 GB bande passante/mois
- ✅ 125,000 requêtes functions/mois
- ✅ 300 minutes build/mois

Si vous dépassez, Netlify vous proposera de passer au plan payant.

---

## 🔄 Mises à jour

### Mettre à jour le contenu

**Via l'admin** (recommandé) :
1. Se connecter à l'admin
2. Modifier le contenu
3. Enregistrer

**Via Git** (avancé) :
1. Modifier les fichiers localement
2. `git add .`
3. `git commit -m "Update content"`
4. `git push`
5. Netlify redéploie automatiquement

---

## 🆘 Support

### Ressources

- **Documentation Netlify** : https://docs.netlify.com/
- **Documentation Cloudinary** : https://cloudinary.com/documentation
- **Community Netlify** : https://answers.netlify.com/

### Logs utiles

- **Netlify Functions logs** : Dashboard > Functions > Logs
- **Deploy logs** : Dashboard > Deploys > [Dernier déploiement]
- **Console navigateur** : F12 dans le navigateur

---

## ✨ Félicitations !

Votre site est maintenant en ligne et fonctionnel ! 🎉

**URL de votre site** : `https://votre-site.netlify.app`  
**URL admin** : `https://votre-site.netlify.app/admin.html`

---

**Version** : 1.0.0  
**Date** : Avril 2026  
**Prêt pour production** : ✅