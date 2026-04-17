# 🔐 Guide d'Authentification Admin

## 📋 Vue d'ensemble

Votre interface admin est maintenant **protégée par un système d'authentification** sécurisé avec identifiant et mot de passe.

---

## 🚀 Démarrage Rapide

### Identifiants par défaut

**Pour localhost (développement) :**
- **Identifiant** : `admin`
- **Mot de passe** : `admin123`

⚠️ **IMPORTANT** : Changez ces identifiants avant la mise en ligne !

---

## 🔧 Configuration

### 1. Créer le fichier .env

Si ce n'est pas déjà fait :

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

### 2. Configurer vos identifiants

Ouvrez le fichier `.env` et modifiez :

```env
# Identifiants admin (CHANGEZ-LES !)
ADMIN_USERNAME=votre_identifiant
ADMIN_PASSWORD=votre_mot_de_passe_securise

# Clé API Claude (pour la traduction)
ANTHROPIC_API_KEY=sk-ant-votre-clé

# Environnement
NODE_ENV=development
```

### 3. Redémarrer le serveur

```bash
# Arrêtez le serveur (Ctrl+C)
# Redémarrez
npm start
```

---

## 🔑 Utilisation

### Se connecter

1. Allez sur : **http://localhost:3000/admin.html**
2. Vous serez automatiquement redirigé vers **http://localhost:3000/login.html**
3. Entrez vos identifiants
4. Cliquez sur **"Se connecter"**
5. Vous êtes redirigé vers l'admin ✅

### Se déconnecter

1. Dans l'interface admin, cliquez sur le bouton **🚪 Déconnexion** en bas de la sidebar
2. Vous êtes redirigé vers la page de login

### Session automatique

- Votre session dure **30 minutes**
- Elle est automatiquement prolongée à chaque action
- Après 30 minutes d'inactivité, vous devrez vous reconnecter

---

## 🔒 Sécurité

### Fonctionnalités de sécurité

✅ **Sessions sécurisées** avec tokens aléatoires  
✅ **Cookies HttpOnly** (protection XSS)  
✅ **Expiration automatique** après 30 min d'inactivité  
✅ **Protection des routes API** (authentification requise)  
✅ **Nettoyage automatique** des sessions expirées  
✅ **Mots de passe** stockés dans `.env` (non versionné)  

### Bonnes pratiques

#### ✅ À FAIRE

1. **Changez les identifiants par défaut**
   ```env
   ADMIN_USERNAME=alina_admin
   ADMIN_PASSWORD=MonMotDePasseTresSécurisé2024!
   ```

2. **Utilisez un mot de passe fort**
   - Au moins 12 caractères
   - Majuscules + minuscules + chiffres + symboles
   - Exemple : `Br@t1sl@v@2024!Fit`

3. **Ne partagez jamais vos identifiants**

4. **Vérifiez que `.env` est dans `.gitignore`**
   ```
   .env
   ```

5. **Déconnectez-vous après utilisation**

#### ❌ À NE PAS FAIRE

- ❌ Utiliser `admin` / `admin123` en production
- ❌ Partager vos identifiants
- ❌ Commiter le fichier `.env` dans Git
- ❌ Utiliser le même mot de passe partout
- ❌ Laisser votre session ouverte sur un ordinateur public

---

## 🌐 Mise en Production

### Avant la mise en ligne

1. **Changez les identifiants**
   ```env
   ADMIN_USERNAME=votre_identifiant_unique
   ADMIN_PASSWORD=MotDePasseTresSécurisé!2024
   ```

2. **Activez le mode production**
   ```env
   NODE_ENV=production
   ```

3. **Utilisez HTTPS** (obligatoire en production)
   - Les cookies de session nécessitent HTTPS
   - Obtenez un certificat SSL (Let's Encrypt gratuit)

4. **Configurez un nom de domaine**
   - Exemple : `admin.alinacoaching.com`

### Sécurité renforcée (production)

En mode production, le système utilise automatiquement :
- ✅ Cookies sécurisés (HTTPS uniquement)
- ✅ Protection CSRF
- ✅ Rate limiting (limite de tentatives)
- ✅ Logs de sécurité

---

## 🔍 Dépannage

### Problème : "Identifiant ou mot de passe incorrect"

**Solutions :**
1. Vérifiez vos identifiants dans le fichier `.env`
2. Assurez-vous qu'il n'y a pas d'espaces avant/après
3. Vérifiez que le serveur a été redémarré après modification du `.env`

### Problème : Redirection infinie vers login

**Solutions :**
1. Videz le cache du navigateur (Ctrl+Shift+Delete)
2. Essayez en navigation privée
3. Vérifiez les cookies dans les outils de développement (F12)

### Problème : Session expire trop vite

**Solution :**
Modifiez la durée dans `auth.js` :
```javascript
const SESSION_DURATION = 60 * 60 * 1000; // 60 minutes au lieu de 30
```

### Problème : Impossible de se connecter

**Solutions :**
1. Vérifiez que le serveur est démarré : `npm start`
2. Vérifiez la console du serveur pour les erreurs
3. Ouvrez la console du navigateur (F12) pour voir les erreurs
4. Vérifiez que le fichier `.env` existe et contient les identifiants

---

## 📊 Logs et Monitoring

### Logs du serveur

Le serveur affiche dans le terminal :

```
✅ User authenticated: admin
👋 User logged out: admin
⏰ Session expired: admin
🧹 Cleaned 2 expired session(s)
```

### Vérifier les sessions actives

Les sessions sont stockées en mémoire. Pour voir les sessions actives, consultez les logs du serveur.

---

## 🔐 Architecture Technique

### Comment ça fonctionne

```
┌─────────────────────────────────────┐
│  1. Utilisateur accède à /admin    │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  2. Vérification authentification   │
│     (cookie de session)             │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┐
        │             │
    Non authentifié   Authentifié
        │             │
        ▼             ▼
┌─────────────┐  ┌─────────────┐
│ Redirection │  │   Accès     │
│ vers login  │  │   admin     │
└─────────────┘  └─────────────┘
```

### Fichiers impliqués

1. **`auth.js`** - Module d'authentification
   - Gestion des sessions
   - Vérification des identifiants
   - Création/suppression de sessions

2. **`login.html`** - Page de connexion
   - Formulaire de login
   - Validation côté client
   - Redirection après succès

3. **`admin.html`** - Page admin protégée
   - Vérification auth au chargement
   - Bouton de déconnexion
   - Redirection si non authentifié

4. **`server.js`** - Serveur avec routes protégées
   - Route `/api/login` (POST)
   - Route `/api/logout` (POST)
   - Route `/api/check-auth` (GET)
   - Protection des routes `/api/*`

---

## 🎯 Fonctionnalités Avancées

### Ajouter plusieurs administrateurs (futur)

Pour la version production, vous pourrez :
- Créer plusieurs comptes admin
- Définir des rôles (admin, modérateur)
- Gérer les permissions
- Voir l'historique des connexions

### Authentification à deux facteurs (2FA)

Prévue pour une version future :
- Code par email
- Application d'authentification (Google Authenticator)
- SMS (optionnel)

---

## 📝 Checklist de Sécurité

Avant la mise en ligne, vérifiez :

- [ ] Identifiants changés (pas admin/admin123)
- [ ] Mot de passe fort (12+ caractères)
- [ ] `.env` dans `.gitignore`
- [ ] `.env` non commité dans Git
- [ ] NODE_ENV=production
- [ ] HTTPS activé
- [ ] Certificat SSL valide
- [ ] Domaine configuré
- [ ] Tests de connexion/déconnexion
- [ ] Session expire correctement

---

## 🆘 Support

### En cas de problème

1. **Consultez les logs du serveur** (terminal)
2. **Ouvrez la console du navigateur** (F12)
3. **Vérifiez le fichier `.env`**
4. **Redémarrez le serveur**
5. **Videz le cache du navigateur**

### Réinitialiser l'authentification

Si vous êtes bloqué :

1. Arrêtez le serveur (Ctrl+C)
2. Modifiez le fichier `.env` avec de nouveaux identifiants
3. Redémarrez le serveur (`npm start`)
4. Essayez de vous connecter avec les nouveaux identifiants

---

## 💡 Conseils

### Gestion des mots de passe

**Utilisez un gestionnaire de mots de passe** :
- 1Password
- LastPass
- Bitwarden (gratuit et open source)
- KeePass

### Sauvegardes

Sauvegardez votre fichier `.env` dans un endroit sécurisé :
- Gestionnaire de mots de passe
- Coffre-fort numérique
- Clé USB chiffrée

**Ne le sauvegardez JAMAIS** :
- Dans le cloud public (Dropbox, Google Drive)
- Dans un email
- Sur GitHub/GitLab

---

## 🎓 Ressources

### Documentation

- **Guide d'installation** : `INSTALLATION-TRADUCTION-CLAUDE.md`
- **Guide de traduction** : `GUIDE-TRADUCTION-AUTO.md`
- **Spécifications admin** : `ADMIN-SPECIFICATIONS.md`

### Sécurité web

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Guide de sécurité Node.js](https://nodejs.org/en/docs/guides/security/)

---

## 📊 Statistiques

### Identifiants par défaut

- **Localhost** : admin / admin123
- **Production** : À configurer dans `.env`

### Durée de session

- **Par défaut** : 30 minutes
- **Prolongation** : Automatique à chaque action
- **Nettoyage** : Toutes les 5 minutes

---

**Créé avec ❤️ par Bob**  
**Date** : 14 avril 2026  
**Version** : 1.0