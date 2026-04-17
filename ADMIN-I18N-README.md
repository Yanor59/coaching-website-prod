# 🌍 Système Multilingue de l'Admin

## Vue d'ensemble

L'interface d'administration est maintenant disponible en **2 langues** :
- 🇫🇷 **Français** (par défaut)
- 🇺🇦 **Ukrainien**

## Fonctionnalités

### Sélecteur de langue
Un sélecteur de langue est disponible en haut à droite de l'interface admin :
- Cliquez sur 🇫🇷 FR pour passer en français
- Cliquez sur 🇺🇦 UA pour passer en ukrainien

### Sauvegarde de la préférence
La langue choisie est automatiquement sauvegardée dans le navigateur (localStorage) et sera restaurée lors de votre prochaine visite.

### Traductions disponibles

Tous les éléments de l'interface sont traduits :
- ✅ Menu de navigation (Dashboard, Contenu, Médias)
- ✅ Titres et sous-titres
- ✅ Boutons d'action
- ✅ Messages de notification
- ✅ Labels de formulaire
- ✅ Messages d'erreur
- ✅ Modales et popups

## Architecture technique

### Fichiers impliqués

1. **`js/admin-i18n.js`** : Module de traduction
   - Contient toutes les traductions (FR + UA)
   - Gère le changement de langue
   - Met à jour l'interface automatiquement

2. **`admin.html`** : Attributs `data-i18n`
   - Chaque élément traduisible a un attribut `data-i18n="clé.de.traduction"`
   - Exemple : `<h2 data-i18n="sidebar.title">🏋️‍♀️ Alina Admin</h2>`

3. **`css/admin-styles.css`** : Styles du sélecteur
   - Styles pour les boutons de langue
   - Positionnement en haut à droite

### Structure des traductions

```javascript
adminTranslations = {
    fr: {
        sidebar: {
            title: "🏋️‍♀️ Alina Admin",
            dashboard: "Dashboard",
            content: "Contenu",
            // ...
        },
        notifications: {
            contentSaved: "✅ Modifications enregistrées avec succès!",
            // ...
        }
    },
    ua: {
        sidebar: {
            title: "🏋️‍♀️ Alina Адмін",
            dashboard: "Панель",
            content: "Контент",
            // ...
        },
        notifications: {
            contentSaved: "✅ Зміни успішно збережено!",
            // ...
        }
    }
}
```

## Ajouter une nouvelle langue

Pour ajouter une nouvelle langue (par exemple le slovaque) :

### 1. Ajouter les traductions dans `admin-i18n.js`

```javascript
const adminTranslations = {
    fr: { /* ... */ },
    ua: { /* ... */ },
    sk: {  // Nouvelle langue
        sidebar: {
            title: "🏋️‍♀️ Alina Admin",
            dashboard: "Dashboard",
            content: "Obsah",
            media: "Médiá",
            userRole: "Lokálna administrácia"
        },
        // ... copier toute la structure et traduire
    }
};
```

### 2. Ajouter le bouton dans `admin.html`

```html
<div class="admin-language-selector">
    <button class="admin-lang-btn active" data-lang="fr">🇫🇷 FR</button>
    <button class="admin-lang-btn" data-lang="ua">🇺🇦 UA</button>
    <button class="admin-lang-btn" data-lang="sk">🇸🇰 SK</button> <!-- Nouveau -->
</div>
```

### 3. C'est tout !

Le système détectera automatiquement la nouvelle langue et l'appliquera.

## Utilisation dans le code

### Obtenir une traduction

```javascript
// Méthode 1 : Via l'instance globale
const text = adminI18n.t('sidebar.title');

// Méthode 2 : Fonction helper (recommandé)
const t = (key) => typeof adminI18n !== 'undefined' ? adminI18n.t(key) : key;
const text = t('sidebar.title');
```

### Changer de langue programmatiquement

```javascript
adminI18n.setLang('ua'); // Passe en ukrainien
adminI18n.setLang('fr'); // Passe en français
```

### Obtenir la langue actuelle

```javascript
const currentLang = adminI18n.getCurrentLang(); // 'fr' ou 'ua'
```

## Bonnes pratiques

1. **Toujours utiliser des clés de traduction** au lieu de texte en dur
   ```javascript
   // ❌ Mauvais
   button.textContent = 'Enregistrer';
   
   // ✅ Bon
   button.textContent = t('common.save');
   ```

2. **Ajouter l'attribut `data-i18n`** sur les éléments HTML
   ```html
   <!-- ❌ Mauvais -->
   <h2>Titre</h2>
   
   <!-- ✅ Bon -->
   <h2 data-i18n="section.title">Titre</h2>
   ```

3. **Grouper les traductions par contexte**
   ```javascript
   {
       sidebar: { /* ... */ },
       header: { /* ... */ },
       notifications: { /* ... */ },
       common: { /* ... */ }
   }
   ```

## Dépannage

### La langue ne change pas
- Vérifiez que `admin-i18n.js` est chargé **avant** les autres scripts
- Vérifiez la console pour les erreurs JavaScript
- Videz le cache du navigateur

### Certains textes ne sont pas traduits
- Vérifiez que l'attribut `data-i18n` est présent
- Vérifiez que la clé existe dans les deux langues
- Appelez `adminI18n.updateUI()` pour forcer la mise à jour

### La préférence n'est pas sauvegardée
- Vérifiez que localStorage est activé dans le navigateur
- Vérifiez la console pour les erreurs

## Maintenance

### Ajouter une nouvelle traduction

1. Ouvrir `js/admin-i18n.js`
2. Ajouter la clé dans **toutes** les langues
3. Utiliser la clé dans le code avec `t('nouvelle.cle')`

### Modifier une traduction existante

1. Ouvrir `js/admin-i18n.js`
2. Trouver la clé à modifier
3. Modifier le texte dans la langue souhaitée
4. Recharger la page admin

## Support

Pour toute question ou problème :
- Consulter la console JavaScript (F12)
- Vérifier que tous les fichiers sont chargés
- Tester dans un autre navigateur

---

**Fait avec ❤️ par Bob**