# 💬 Guide du Système de Témoignages avec Modération

## Vue d'ensemble

Le site dispose d'un système complet de témoignages permettant aux visiteurs de soumettre leurs avis, avec modération par l'administrateur avant publication.

---

## 🎯 Fonctionnalités

### Pour les Visiteurs (Site Public)
- ✅ Formulaire de soumission accessible depuis la section Témoignages
- ✅ Notation par étoiles (1 à 5)
- ✅ Champs : Nom, Durée (ex: "6 mois"), Note, Témoignage
- ✅ Multilingue (FR, EN, SK, UA)
- ✅ Validation côté client et serveur
- ✅ Confirmation de soumission

### Pour l'Administrateur
- ✅ Interface de modération dans l'admin
- ✅ Statistiques en temps réel (Total, En attente, Approuvés, Rejetés)
- ✅ Filtres par statut
- ✅ Actions : Approuver, Rejeter, Remettre en attente
- ✅ Édition et suppression
- ✅ Gestion multilingue

### Affichage Public
- ✅ Seuls les témoignages **approuvés** sont visibles
- ✅ Masquage automatique de la section si aucun témoignage approuvé
- ✅ Design responsive et élégant

---

## 📋 Workflow Complet

### 1. Soumission par un Visiteur

**Étapes :**
1. Le visiteur clique sur "Laissez votre témoignage" dans la section Témoignages
2. Un modal s'ouvre avec le formulaire
3. Il remplit : Nom, Durée (optionnel), Note (1-5 étoiles), Témoignage
4. Il clique sur "Envoyer"
5. Le témoignage est envoyé à `/.netlify/functions/submit-testimonial`
6. **Statut initial : `pending` (en attente)**
7. Message de confirmation : "Merci ! Votre témoignage sera publié après modération."

**Validation :**
- Nom : requis, max 100 caractères
- Témoignage : requis, min 10 caractères, max 1000 caractères
- Note : 1-5 étoiles (défaut : 5)
- Durée : optionnel, max 50 caractères

### 2. Modération par l'Admin

**Accès :**
1. Se connecter à l'admin
2. Aller dans "Témoignages" (💬)
3. Voir les statistiques et la liste des témoignages

**Actions disponibles :**
- **✅ Approuver** : Le témoignage devient visible sur le site public
- **❌ Rejeter** : Le témoignage est rejeté (non visible)
- **⏳ Remettre en attente** : Repasse en statut "pending"
- **✏️ Éditer** : Modifier le contenu (nom, texte, note, etc.)
- **🗑️ Supprimer** : Supprimer définitivement

**Filtres :**
- 📋 Tous
- ⏳ En attente (nouveaux témoignages)
- ✅ Approuvés (visibles sur le site)
- ❌ Rejetés

### 3. Affichage sur le Site Public

**Règles :**
- Seuls les témoignages avec `status: "approved"` sont affichés
- Si aucun témoignage approuvé : la section est masquée
- Affichage par ordre d'ajout (les plus récents en premier)
- Design : carte avec étoiles, texte, nom et durée

---

## 🔧 Architecture Technique

### Fichiers Impliqués

#### Frontend Public
- **`index.html`** : Bouton + Modal HTML (lignes 510-560)
- **`js/testimonial-form.js`** : Gestion du formulaire et soumission
- **`css/styles.css`** : Styles du modal (début du fichier)

#### Backend
- **`netlify/functions/submit-testimonial.js`** : Fonction Netlify pour recevoir les soumissions

#### Admin
- **`js/testimonials-manager.js`** : Interface de modération complète
- **`admin.html`** : Lien vers Témoignages dans la sidebar

#### Affichage
- **`js/content-loader.js`** : Fonction `renderTestimonials()` avec filtrage (lignes 176-225)

### Stockage des Données

**Netlify Blobs** : `site-data/site-content`

Structure dans `site-content.json` :
```json
{
  "content": {
    "fr": {
      "testimonials": {
        "items": [
          {
            "name": "Marie D.",
            "duration": "6 mois",
            "rating": 5,
            "text": "Alina est une coach exceptionnelle...",
            "status": "approved",
            "submittedAt": "2026-05-19T14:16:41.379Z",
            "language": "fr"
          }
        ]
      }
    }
  }
}
```

**Statuts possibles :**
- `pending` : En attente de modération (défaut pour soumissions publiques)
- `approved` : Approuvé et visible sur le site
- `rejected` : Rejeté (non visible)

---

## 🎨 Personnalisation

### Modifier les Traductions

**Fichier : `js/testimonial-form.js`** (lignes 220-245)

```javascript
const translations = {
    fr: {
        submitting: 'Envoi en cours...',
        thankYou: '✅ Merci ! Votre témoignage sera publié après modération.',
        // ...
    }
}
```

### Modifier le Design du Modal

**Fichier : `css/styles.css`** (début du fichier)

Classes principales :
- `.testimonial-modal` : Overlay
- `.modal-content` : Contenu du modal
- `.star-rating` : Étoiles
- `.form-message` : Messages de succès/erreur

### Modifier les Limites

**Fichier : `netlify/functions/submit-testimonial.js`**

```javascript
const testimonial = {
    name: data.name.trim().substring(0, 100),      // Max 100 caractères
    text: data.text.trim().substring(0, 1000),     // Max 1000 caractères
    duration: data.duration ? data.duration.trim().substring(0, 50) : '',
    // ...
}
```

---

## 🧪 Tests

### Test du Formulaire Public

1. Ouvrir le site public
2. Aller dans la section "Témoignages"
3. Cliquer sur "Laissez votre témoignage"
4. Remplir le formulaire :
   - Nom : "Test User"
   - Durée : "1 mois"
   - Note : 5 étoiles
   - Témoignage : "Ceci est un test de témoignage"
5. Cliquer sur "Envoyer"
6. Vérifier le message de succès
7. Le modal se ferme automatiquement après 3 secondes

### Test de la Modération

1. Se connecter à l'admin
2. Aller dans "Témoignages"
3. Vérifier que le nouveau témoignage apparaît avec statut "⏳ En attente"
4. Cliquer sur le filtre "En attente" pour le voir
5. Cliquer sur "✅" pour approuver
6. Vérifier que le statut change vers "✅ Approuvé"
7. Retourner sur le site public
8. Rafraîchir (CTRL + SHIFT + R)
9. Le témoignage doit maintenant être visible

### Test du Filtrage

1. Dans l'admin, créer plusieurs témoignages avec différents statuts
2. Tester chaque filtre (Tous, En attente, Approuvés, Rejetés)
3. Vérifier que seuls les témoignages correspondants s'affichent
4. Sur le site public, vérifier que seuls les "approved" sont visibles

---

## 🔒 Sécurité

### Protections Implémentées

1. **Validation côté serveur** : Tous les champs sont validés dans la fonction Netlify
2. **Sanitization** : Les données sont nettoyées (trim, substring)
3. **Pas d'injection** : Utilisation de `escapeHtml()` dans l'affichage
4. **Modération obligatoire** : Statut "pending" par défaut
5. **Pas d'accès direct** : Les données sont dans Netlify Blobs (sécurisé)

### Recommandations

- ✅ **Actuel** : Modération manuelle (sécurité maximale)
- 🔄 **Optionnel** : Ajouter un captcha (hCaptcha ou reCAPTCHA) pour éviter le spam
- 🔄 **Optionnel** : Limiter le nombre de soumissions par IP (rate limiting)

---

## 📊 Statistiques

L'admin affiche en temps réel :
- **Total** : Nombre total de témoignages
- **En attente** : Nouveaux témoignages à modérer
- **Approuvés** : Témoignages visibles sur le site
- **Rejetés** : Témoignages refusés

---

## 🐛 Dépannage

### Le formulaire ne s'ouvre pas
- Vérifier que `js/testimonial-form.js` est bien chargé
- Ouvrir la console (F12) et chercher des erreurs
- Vérifier que le bouton a l'ID `openTestimonialForm`

### Les témoignages ne s'affichent pas sur le site
- Vérifier que le statut est bien "approved"
- Rafraîchir avec CTRL + SHIFT + R
- Vérifier dans l'admin que les témoignages existent

### Erreur lors de la soumission
- Vérifier que la fonction Netlify est déployée
- Ouvrir la console et vérifier l'erreur
- Vérifier les logs Netlify Functions

### Les modifications admin ne se voient pas
- Rafraîchir le site avec CTRL + SHIFT + R
- Vider le cache du navigateur
- Vérifier que la sauvegarde a réussi (message de confirmation)

---

## 🚀 Améliorations Futures

### Possibles
- [ ] Captcha anti-spam (hCaptcha gratuit)
- [ ] Upload de photo de profil
- [ ] Réponses de l'admin aux témoignages
- [ ] Système de votes (utile/pas utile)
- [ ] Export des témoignages en CSV
- [ ] Notifications email à l'admin lors de nouvelles soumissions

### Faciles à Implémenter
- [ ] Tri par date/note dans l'admin
- [ ] Recherche dans les témoignages
- [ ] Pagination si > 50 témoignages
- [ ] Statistiques avancées (moyenne des notes, etc.)

---

## 📝 Notes Importantes

1. **Multilingue** : Les témoignages sont stockés par langue. Un témoignage soumis en FR n'apparaît que dans la version FR du site.

2. **Statut par défaut** : Tous les témoignages soumis par le public ont le statut "pending" pour éviter le spam.

3. **Pas de compte requis** : Les visiteurs peuvent soumettre sans créer de compte (simplicité maximale).

4. **Modération rapide** : L'admin peut approuver/rejeter en un clic.

5. **Données persistantes** : Tout est stocké dans Netlify Blobs (pas de base de données externe nécessaire).

---

**Système créé avec ❤️ par Bob**
**Date : 19 mai 2026**