# 🚀 Migration vers Netlify Blobs - Guide Complet

## 📋 Vue d'ensemble

Le système a été migré de **GitHub commits** vers **Netlify Blobs** pour la gestion du contenu.

### Avantages de cette migration :

✅ **Modifications instantanées** - Plus besoin d'attendre le redéploiement (1-2 min → instantané)
✅ **Plus simple** - Pas besoin de token GitHub
✅ **Backups automatiques** - Système de backup horaire et quotidien
✅ **Gratuit** - Inclus dans le plan Netlify gratuit (1GB de stockage)

---

## 🔧 Étapes de déploiement

### 1. Installer les dépendances

```bash
cd coaching-website-prod
npm install
```

Cela installera `@netlify/blobs` version 7.3.0

### 2. Commit et push vers GitHub

```bash
git add .
git commit -m "Migration vers Netlify Blobs pour gestion de contenu instantanée"
git push origin main
```

### 3. Netlify déploiera automatiquement

Le site sera redéployé automatiquement (1-2 minutes).

### 4. Variables d'environnement requises

Sur Netlify → Site settings → Environment variables, assurez-vous d'avoir :

- ✅ `JWT_SECRET` - Token d'authentification (requis)
- ✅ `ADMIN_PASSWORD` - Mot de passe admin (requis)
- ✅ `CLOUDINARY_CLOUD_NAME` - Pour l'upload d'images (requis)
- ✅ `CLOUDINARY_API_KEY` - Pour l'upload d'images (requis)
- ✅ `CLOUDINARY_API_SECRET` - Pour l'upload d'images (requis)

**Note :** Les variables `GITHUB_TOKEN`, `GITHUB_OWNER`, et `GITHUB_REPO` ne sont plus nécessaires !

---

## 📦 Système de Backup

### Backups automatiques

Le système crée automatiquement deux types de backups :

#### 1. **Backups horaires** (24 dernières heures)
- Créés à chaque modification
- Format : `backup-hourly-YYYY-MM-DDTHH`
- Conservation : 24 backups (dernières 24 heures)

#### 2. **Backups quotidiens** (30 derniers jours)
- Créés une fois par jour
- Format : `backup-daily-YYYY-MM-DD`
- Conservation : 30 backups (dernier mois)

### Restaurer un backup

#### Via l'API :

```javascript
// Lister les backups disponibles
const response = await fetch('/.netlify/functions/backups', {
  headers: {
    'Authorization': `Bearer ${authToken}`
  }
});
const backups = await response.json();

// Restaurer un backup
await fetch('/.netlify/functions/backups', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  },
  body: JSON.stringify({
    backupKey: 'backup-daily-2026-04-20'
  })
});
```

---

## 🔄 Comment ça fonctionne

### Avant (GitHub)
```
Admin modifie → API Netlify → Commit GitHub → Redéploiement (1-2 min) → Site mis à jour
```

### Maintenant (Netlify Blobs)
```
Admin modifie → API Netlify → Netlify Blobs → Site mis à jour (instantané)
                                    ↓
                            Backups automatiques
```

### Stockage des données

Les données sont stockées dans Netlify Blobs avec cette structure :

```
site-data/
├── site-content                    # Contenu actuel du site
├── backup-daily-2026-04-20         # Backup quotidien
├── backup-daily-2026-04-19         # Backup quotidien
├── ...                             # (30 jours)
├── backup-hourly-2026-04-20T14     # Backup horaire
├── backup-hourly-2026-04-20T13     # Backup horaire
└── ...                             # (24 heures)
```

---

## 🧪 Test après déploiement

### 1. Vérifier l'authentification
- Allez sur `/admin.html`
- Vous devriez être redirigé vers `/login.html`
- Connectez-vous avec le mot de passe admin

### 2. Tester une modification
- Modifiez un témoignage ou une photo
- La modification devrait être **instantanée** (pas de redéploiement)
- Rechargez la page publique pour voir les changements

### 3. Vérifier les backups
- Ouvrez la console du navigateur
- Les logs devraient montrer : `✅ Backups created: backup-daily-..., backup-hourly-...`

---

## 🆘 Dépannage

### Erreur : "Failed to read content"

**Cause :** Première migration, le contenu n'est pas encore dans Blobs

**Solution :** Le système migrera automatiquement le contenu depuis `/data/site-content.json` au premier chargement

### Erreur : "Unauthorized"

**Cause :** Token JWT manquant ou invalide

**Solution :** 
1. Vérifiez que `JWT_SECRET` est configuré dans Netlify
2. Reconnectez-vous via `/login.html`

### Les modifications ne s'affichent pas

**Cause :** Cache du navigateur

**Solution :** 
1. Videz le cache (Ctrl+Shift+R)
2. Vérifiez que le header `Cache-Control: no-cache` est présent dans la réponse API

---

## 📊 Limites et quotas

### Netlify Blobs (Plan gratuit)
- ✅ 1 GB de stockage
- ✅ Lectures illimitées
- ✅ 1000 écritures/heure

**Pour votre usage :**
- Contenu du site : ~500 KB
- 30 backups quotidiens : ~15 MB
- 24 backups horaires : ~12 MB
- **Total estimé : ~30 MB** (largement dans les limites)

---

## 🔐 Sécurité

### Protection des données
- ✅ Authentification JWT requise pour toutes les modifications
- ✅ Validation du contenu avant sauvegarde
- ✅ Backup automatique avant chaque restauration
- ✅ Logs détaillés de toutes les opérations

### Recommandations
- 🔒 Changez régulièrement le `JWT_SECRET`
- 🔒 Utilisez un mot de passe admin fort
- 🔒 Surveillez les logs Netlify pour détecter les accès suspects

---

## 📝 Notes importantes

1. **Migration automatique** : Au premier déploiement, le contenu sera automatiquement migré depuis le fichier JSON vers Netlify Blobs

2. **Pas de perte de données** : L'ancien fichier `/data/site-content.json` reste dans le repo GitHub comme backup de sécurité

3. **Backups avant restauration** : Avant chaque restauration, un backup du contenu actuel est créé automatiquement

4. **Nettoyage automatique** : Les vieux backups sont supprimés automatiquement (>30 jours pour quotidiens, >24h pour horaires)

---

## 🎯 Prochaines étapes

Après le déploiement :

1. ✅ Testez toutes les fonctionnalités admin
2. ✅ Vérifiez que les modifications sont instantanées
3. ✅ Confirmez que les backups sont créés
4. ✅ Supprimez les variables GitHub de Netlify (optionnel)

---

**Fait avec ❤️ par Bob**