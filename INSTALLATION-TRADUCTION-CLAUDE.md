# 🚀 Installation de la Traduction Automatique avec Claude

## 📋 Prérequis

- Node.js installé (version 14 ou supérieure)
- Un compte Anthropic (Claude)
- Accès à votre projet coaching-website

---

## 🔧 Étape 1 : Obtenir votre clé API Claude

### 1.1 Créer un compte Anthropic

1. Allez sur : **https://console.anthropic.com/**
2. Cliquez sur **"Sign Up"** (ou "Sign In" si vous avez déjà un compte)
3. Créez votre compte avec votre email

### 1.2 Obtenir votre clé API

1. Une fois connecté, allez dans **"API Keys"**
2. Cliquez sur **"Create Key"**
3. Donnez un nom à votre clé (ex: "Coaching Website Translation")
4. **Copiez la clé** (elle commence par `sk-ant-...`)
5. ⚠️ **IMPORTANT** : Sauvegardez cette clé en lieu sûr, vous ne pourrez plus la voir après !

### 1.3 Crédits gratuits

- Anthropic offre **$5 de crédits gratuits** pour commencer
- Cela représente environ **25,000 traductions** de textes courts
- Largement suffisant pour votre site !

---

## 📦 Étape 2 : Installer les dépendances

Ouvrez un terminal dans le dossier `coaching-website` et exécutez :

```bash
npm install
```

Cela installera :
- `@anthropic-ai/sdk` - SDK officiel Claude
- `dotenv` - Pour gérer les variables d'environnement

---

## 🔐 Étape 3 : Configurer votre clé API

### 3.1 Créer le fichier .env

1. Dans le dossier `coaching-website`, créez un fichier nommé **`.env`**
2. Copiez le contenu de `.env.example` :

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

### 3.2 Ajouter votre clé API

Ouvrez le fichier `.env` et remplacez `votre_clé_api_ici` par votre vraie clé :

```env
ANTHROPIC_API_KEY=sk-ant-api03-votre-vraie-clé-ici
```

### 3.3 Vérifier le .gitignore

Assurez-vous que `.env` est dans votre `.gitignore` pour ne pas partager votre clé :

```
.env
```

---

## ✅ Étape 4 : Tester l'installation

### 4.1 Démarrer le serveur

```bash
npm start
```

Vous devriez voir :
```
✅ Local server running on http://localhost:3000
📄 Admin: http://localhost:3000/admin.html
🌐 Site: http://localhost:3000/index.html
```

### 4.2 Tester la traduction

1. Ouvrez : **http://localhost:3000/admin.html**
2. Cliquez sur **📝 Contenu**
3. Sélectionnez une section (ex: Hero)
4. Modifiez un texte en français
5. Cliquez sur **🌍 Traduire automatiquement**
6. Attendez quelques secondes...
7. ✅ Vérifiez les traductions dans les autres langues !

---

## 🎯 Utilisation

### Traduire une section

1. **Modifiez le contenu** dans votre langue préférée (ex: français)
2. **Cliquez sur** 🌍 **Traduire automatiquement**
3. **Confirmez** l'action
4. **Attendez** 5-15 secondes
5. **Vérifiez** les traductions générées
6. **Corrigez** si nécessaire
7. **Sauvegardez** avec 💾

### Exemple concret

**Avant :**
```
FR: "Révélez Votre Potentiel"
EN: "Reveal Your Potential"
SK: "Odhaľte Svoj Potenciál"
UA: "Розкрийте Свій Потенціал"
```

**Vous modifiez en français :**
```
FR: "Transformez Votre Vie Aujourd'hui"
```

**Après traduction automatique :**
```
FR: "Transformez Votre Vie Aujourd'hui"
EN: "Transform Your Life Today"
SK: "Transformujte Svoj Život Dnes"
UA: "Трансформуйте Своє Життя Сьогодні"
```

---

## 💰 Coûts et Limites

### Tarification Claude

- **Modèle utilisé** : Claude 3.5 Sonnet
- **Coût** : ~$3 par million de tokens
- **1 traduction courte** : ~200-300 tokens
- **Coût par traduction** : ~$0.0006-0.0009 (moins d'un centime !)

### Estimation mensuelle

| Utilisation | Traductions/mois | Coût estimé |
|-------------|------------------|-------------|
| Légère | 50 traductions | ~$0.03-0.05 |
| Normale | 200 traductions | ~$0.12-0.18 |
| Intensive | 500 traductions | ~$0.30-0.45 |

### Crédits gratuits

Avec les **$5 gratuits**, vous pouvez faire environ :
- **25,000 traductions** de textes courts
- **5,000 traductions** de paragraphes
- **1,000 traductions** de sections complètes

**C'est largement suffisant pour plusieurs mois d'utilisation !**

---

## 🔍 Vérification

### Vérifier que tout fonctionne

1. **Serveur démarré** : `npm start` sans erreur
2. **Clé API configurée** : Fichier `.env` avec votre clé
3. **Traduction fonctionne** : Test dans l'admin réussi
4. **Logs visibles** : Console affiche les traductions

### Logs attendus

Quand vous traduisez, vous devriez voir dans le terminal :

```
🌍 Translating to English...
✅ Translated: "Révélez Votre Potentiel" → "Reveal Your Potential"
🌍 Translating to Slovak...
✅ Translated: "Révélez Votre Potentiel" → "Odhaľte Svoj Potenciál"
🌍 Translating to Ukrainian...
✅ Translated: "Révélez Votre Potentiel" → "Розкрийте Свій Потенціал"
```

---

## 🐛 Dépannage

### Erreur : "ANTHROPIC_API_KEY non configurée"

**Problème** : Le fichier `.env` n'existe pas ou la clé n'est pas définie

**Solution** :
1. Vérifiez que le fichier `.env` existe
2. Vérifiez que la clé commence par `sk-ant-`
3. Redémarrez le serveur : `Ctrl+C` puis `npm start`

### Erreur : "Authentication error"

**Problème** : La clé API est invalide

**Solution** :
1. Vérifiez que vous avez copié la clé complète
2. Générez une nouvelle clé sur console.anthropic.com
3. Remplacez dans le fichier `.env`

### Erreur : "Rate limit exceeded"

**Problème** : Trop de requêtes en peu de temps

**Solution** :
1. Attendez quelques secondes entre les traductions
2. Vérifiez vos crédits sur console.anthropic.com
3. Ajoutez des crédits si nécessaire

### La traduction ne fonctionne pas

**Problème** : Erreur réseau ou configuration

**Solution** :
1. Vérifiez votre connexion internet
2. Consultez les logs du serveur (terminal)
3. Ouvrez la console du navigateur (F12)
4. Vérifiez que le module est bien chargé

---

## 🔒 Sécurité

### Bonnes pratiques

✅ **À FAIRE** :
- Garder votre clé API secrète
- Ajouter `.env` au `.gitignore`
- Ne jamais commiter la clé dans Git
- Régénérer la clé si elle est exposée

❌ **À NE PAS FAIRE** :
- Partager votre clé API
- Commiter le fichier `.env`
- Utiliser la même clé pour plusieurs projets
- Laisser la clé dans le code source

### Si votre clé est compromise

1. Allez sur console.anthropic.com
2. Supprimez l'ancienne clé
3. Créez une nouvelle clé
4. Mettez à jour le fichier `.env`

---

## 📊 Monitoring

### Suivre votre utilisation

1. Allez sur : **https://console.anthropic.com/settings/usage**
2. Consultez vos statistiques :
   - Nombre de requêtes
   - Tokens utilisés
   - Coût total
   - Crédits restants

### Logs locaux

Le serveur affiche dans le terminal :
- Chaque traduction effectuée
- Le texte source et traduit
- Les erreurs éventuelles

---

## 🎓 Ressources

### Documentation officielle

- **Anthropic Console** : https://console.anthropic.com/
- **Documentation Claude** : https://docs.anthropic.com/
- **SDK Node.js** : https://github.com/anthropics/anthropic-sdk-typescript

### Support

- **Email Anthropic** : support@anthropic.com
- **Documentation projet** : `GUIDE-TRADUCTION-AUTO.md`

---

## ✨ Améliorations futures

### Fonctionnalités prévues

- [ ] Traduction en batch (plus rapide)
- [ ] Cache des traductions
- [ ] Historique des traductions
- [ ] Glossaire personnalisé
- [ ] Détection automatique de la langue

---

## 📝 Checklist d'installation

- [ ] Compte Anthropic créé
- [ ] Clé API obtenue
- [ ] Dépendances installées (`npm install`)
- [ ] Fichier `.env` créé
- [ ] Clé API ajoutée dans `.env`
- [ ] `.env` dans `.gitignore`
- [ ] Serveur démarré (`npm start`)
- [ ] Test de traduction réussi
- [ ] Logs visibles dans le terminal

---

**Installation terminée !** 🎉

Vous pouvez maintenant traduire automatiquement tout votre contenu en quelques clics !

---

**Créé avec ❤️ par Bob**  
**Date** : 14 avril 2026