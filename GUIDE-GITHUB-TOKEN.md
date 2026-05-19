# 🔑 Guide : Token GitHub pour Sauvegarder le Contenu

## 📋 Ce que nous allons faire

1. ✅ Créer un token GitHub (Personal Access Token)
2. ✅ Ajouter le token dans Netlify
3. ✅ Modifier la fonction `content.js` pour utiliser l'API GitHub
4. ✅ Tester la sauvegarde du contenu

**Temps estimé : 10 minutes**

---

## Étape 1 : Créer un Token GitHub

### 1.1 Aller dans les paramètres GitHub

1. **Connectez-vous** à GitHub : https://github.com/
2. **Cliquez** sur votre photo de profil (en haut à droite)
3. **Cliquez** sur : `Settings`

### 1.2 Accéder aux tokens

1. **Dans le menu de gauche**, tout en bas, cliquez sur : `Developer settings`
2. **Cliquez** sur : `Personal access tokens`
3. **Cliquez** sur : `Tokens (classic)`
4. **Cliquez** sur : `Generate new token` → `Generate new token (classic)`

### 1.3 Configurer le token

**Note (description)** :
```
Netlify - Alina Coaching Content Updates
```

**Expiration** :
- Choisissez : `No expiration` (ou `90 days` si vous préférez)

**Permissions (Scopes)** :
Cochez UNIQUEMENT ces permissions :
- ✅ `repo` (Full control of private repositories)
  - Cela inclut automatiquement :
    - ✅ `repo:status`
    - ✅ `repo_deployment`
    - ✅ `public_repo`
    - ✅ `repo:invite`
    - ✅ `security_events`

**Cliquez sur** : `Generate token` (en bas)

### 1.4 Copier le token

⚠️ **TRÈS IMPORTANT** :
1. **Copiez le token** immédiatement (il commence par `ghp_`)
2. **Sauvegardez-le** dans un endroit sûr (Notepad, fichier texte)
3. **Vous ne pourrez plus le voir** après avoir quitté cette page !

Exemple de token :
```
ghp_1234567890abcdefghijklmnopqrstuvwxyz123456
```

---

## Étape 2 : Ajouter le Token dans Netlify

### 2.1 Aller dans Netlify

1. **Connectez-vous** à Netlify : https://app.netlify.com/
2. **Cliquez** sur votre site
3. **Allez dans** : `Site settings`
4. **Dans le menu gauche** : `Environment variables`

### 2.2 Ajouter la variable GITHUB_TOKEN

1. **Cliquez** sur : `Add a variable`
2. **Key** :
   ```
   GITHUB_TOKEN
   ```
3. **Value** :
   ```
   ghp_votre_token_copié_ci_dessus
   ```
4. **Cliquez** sur : `Create variable`

### 2.3 Ajouter les variables du repository

Ajoutez aussi ces 2 variables :

#### Variable GITHUB_OWNER
```
Key: GITHUB_OWNER
Value: votre-username-github
```
(Exemple : si votre URL GitHub est `github.com/john-doe/alina-coaching`, alors `GITHUB_OWNER = john-doe`)

#### Variable GITHUB_REPO
```
Key: GITHUB_REPO
Value: alina-coaching
```
(Le nom de votre repository)

---

## Étape 3 : Vérifier les Variables

Vous devriez maintenant avoir **8 variables** dans Netlify :

1. ✅ `CLOUDINARY_CLOUD_NAME`
2. ✅ `CLOUDINARY_API_KEY`
3. ✅ `CLOUDINARY_API_SECRET`
4. ✅ `ADMIN_PASSWORD`
5. ✅ `JWT_SECRET`
6. ✅ `GITHUB_TOKEN` ⭐ NOUVEAU
7. ✅ `GITHUB_OWNER` ⭐ NOUVEAU
8. ✅ `GITHUB_REPO` ⭐ NOUVEAU

---

## Étape 4 : Modifier la Fonction content.js

Je vais créer une nouvelle version de `content.js` qui utilise l'API GitHub.

### 4.1 Fonctionnement

Quand vous sauvegardez du contenu dans l'admin :
1. La fonction `content.js` reçoit les nouvelles données
2. Elle utilise l'API GitHub pour mettre à jour `data/site-content.json`
3. GitHub crée un commit automatique
4. Netlify détecte le commit et redéploie le site
5. Les changements sont visibles en 1-2 minutes

---

## Étape 5 : Tester

### 5.1 Après avoir pushé le nouveau code

1. **Attendez** le redéploiement Netlify (1-2 min)
2. **Ouvrez** l'admin : `https://votre-site.netlify.app/admin.html`
3. **Connectez-vous**
4. **Allez dans** : `Contenu`
5. **Modifiez** un texte (ex: le titre)
6. **Cliquez** sur : `Enregistrer`

### 5.2 Vérifier sur GitHub

1. **Allez** sur votre repository GitHub
2. **Cliquez** sur : `data/site-content.json`
3. **Vous devriez voir** un nouveau commit : "Update content via admin"
4. **Le fichier** contient vos modifications

### 5.3 Vérifier sur le site

1. **Attendez** 1-2 minutes (Netlify redéploie)
2. **Rafraîchissez** le site public
3. **Vos modifications** sont visibles ! 🎉

---

## 🔒 Sécurité du Token

### ⚠️ NE JAMAIS :
- ❌ Partager votre token
- ❌ Le mettre dans le code source
- ❌ Le commiter sur GitHub
- ❌ L'envoyer par email

### ✅ TOUJOURS :
- ✅ Le garder dans Netlify (variables d'environnement)
- ✅ Le régénérer si vous pensez qu'il a été compromis
- ✅ Utiliser un token avec les permissions minimales nécessaires

---

## 🔄 Workflow Complet

```
┌─────────────────────────────────────────────────────────┐
│  1. Admin modifie le contenu                            │
│     ↓                                                   │
│  2. Netlify Function (content.js)                       │
│     ↓                                                   │
│  3. GitHub API met à jour site-content.json             │
│     ↓                                                   │
│  4. GitHub crée un commit                               │
│     ↓                                                   │
│  5. Netlify détecte le commit                           │
│     ↓                                                   │
│  6. Netlify redéploie le site (1-2 min)                 │
│     ↓                                                   │
│  7. Site public mis à jour ✅                           │
└─────────────────────────────────────────────────────────┘
```

---

## 🐛 Dépannage

### Erreur "Bad credentials"
- Vérifiez que le token est correct dans Netlify
- Vérifiez qu'il n'y a pas d'espaces avant/après
- Régénérez un nouveau token si nécessaire

### Erreur "Not Found"
- Vérifiez `GITHUB_OWNER` (votre username)
- Vérifiez `GITHUB_REPO` (nom du repository)
- Vérifiez que le repository existe

### Les modifications ne s'affichent pas
- Attendez 1-2 minutes (temps de déploiement)
- Vérifiez dans Netlify → Deploys
- Videz le cache du navigateur (Ctrl+F5)

### Token expiré
- Allez dans GitHub → Settings → Developer settings
- Régénérez un nouveau token
- Mettez à jour dans Netlify

---

## 📞 Support

### Ressources
- **GitHub API** : https://docs.github.com/en/rest
- **Netlify Functions** : https://docs.netlify.com/functions/overview/
- **Tokens GitHub** : https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

---

## ✅ Checklist

Avant de continuer, vérifiez :

- [ ] Token GitHub créé
- [ ] Token copié et sauvegardé
- [ ] GITHUB_TOKEN ajouté dans Netlify
- [ ] GITHUB_OWNER ajouté dans Netlify
- [ ] GITHUB_REPO ajouté dans Netlify
- [ ] Prêt à modifier content.js

---

**Prochaine étape** : Je vais créer la nouvelle version de `content.js` qui utilise l'API GitHub !

---

**Version** : 1.0  
**Date** : 17 avril 2026  
**Guide** : Configuration du token GitHub pour sauvegarder le contenu