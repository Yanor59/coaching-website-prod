# 📋 Guide : Gestionnaire de Paramètres (Settings Manager)

**Date** : 19 mai 2026  
**Version** : 1.0

---

## 🎯 Vue d'Ensemble

Le **Settings Manager** permet de gérer via l'admin :
- 📧 Informations de contact (email, téléphone, adresse, horaires)
- 📱 Liens réseaux sociaux (Instagram, YouTube, Facebook, TikTok, LinkedIn)
- 📄 Liens légaux (Politique de confidentialité, CGU, Cookies)

Ces informations apparaissent automatiquement dans le footer et la section Contact.

---

## 🚀 Fichiers Créés/Modifiés

### Nouveaux Fichiers
1. **js/settings-manager.js** - Gestionnaire complet avec 3 onglets

### Fichiers Modifiés
1. **data/site-content.json** - Ajout section `site` avec `contact`, `social`, `legal`
2. **admin.html** - Ajout lien "Paramètres" (ligne 101-104) et script (ligne 228)
3. **js/admin.js** - Ajout cas `settings` dans navigation (ligne 381-384)
4. **js/content-loader.js** - Ajout fonction `renderFooter()` et appel

---

## 📖 Utilisation

### Accéder au Settings Manager
1. Admin → **⚙️ Paramètres**
2. Choisir l'onglet : Contact / Réseaux Sociaux / Liens Légaux

### Modifier les Informations de Contact
1. Onglet **Contact**
2. Remplir : Email, Téléphone, Adresse, Horaires
3. **💾 Sauvegarder**

### Ajouter des Liens Réseaux Sociaux
1. Onglet **Réseaux Sociaux**
2. Coller les URLs complètes (ex: `https://instagram.com/...`)
3. Laisser vide les réseaux non utilisés
4. **💾 Sauvegarder**

**Résultat** : Seuls les liens renseignés apparaissent dans le footer.

### Configurer les Liens Légaux
1. Onglet **Liens Légaux**
2. Entrer les URLs (locales ou externes)
   - Local : `privacy.html`
   - Externe : `https://docs.google.com/...`
3. **💾 Sauvegarder**

---

## ✅ Tests à Effectuer

1. **Contact** : Modifier email/téléphone → Vérifier sur le site
2. **Réseaux Sociaux** : Ajouter 2 liens → Vérifier qu'ils apparaissent dans le footer
3. **Liens Légaux** : Ajouter 1 lien → Vérifier qu'il fonctionne
4. **Persistance** : Fermer/rouvrir l'admin → Vérifier que les données sont sauvegardées

---

## 🔧 Structure des Données

```json
{
  "site": {
    "contact": {
      "email": "alina@coaching-bratislava.com",
      "phone": "+421 XXX XXX XXX",
      "address": "Bratislava, Slovaquie",
      "schedule": "Lun-Ven: 7h-20h<br>Sam: 9h-14h"
    },
    "social": {
      "instagram": "https://instagram.com/...",
      "youtube": "https://youtube.com/...",
      "facebook": "https://facebook.com/...",
      "tiktok": "",
      "linkedin": ""
    },
    "legal": {
      "privacyUrl": "privacy.html",
      "termsUrl": "https://...",
      "cookiesUrl": ""
    }
  }
}
```

---

## 🐛 Dépannage

**Les modifications ne s'affichent pas** :
- Vider le cache (Ctrl+F5)
- Vérifier la notification de sauvegarde
- Vérifier la console (F12)

**Les liens sociaux ne s'affichent pas** :
- Vérifier que les URLs sont complètes (`https://...`)
- Pas d'espaces avant/après
- Vérifier la console

---

## 📝 Notes

- ✅ Sauvegarde instantanée dans Netlify Blobs
- ✅ Authentification requise
- ✅ URLs échappées (sécurité XSS)
- ✅ Responsive (mobile, tablette, desktop)

---

**Fin du Guide**

*Créé par Bob - 19 mai 2026*