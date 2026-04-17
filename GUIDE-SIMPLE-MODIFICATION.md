# 🎯 Guide Simple : Modifier les Textes et Photos

## ⚡ Méthode Rapide et Facile

Voici la méthode la plus simple pour modifier les textes et photos de votre site **sans utiliser l'interface admin**.

---

## 📝 MODIFIER LES TEXTES

### Étape 1 : Ouvrir le Fichier de Contenu

Ouvrez ce fichier dans votre éditeur de code (VS Code) :
```
coaching-website/data/site-content.json
```

### Étape 2 : Comprendre la Structure

Le fichier est organisé comme ceci :
```json
{
  "content": {
    "fr": {          ← Français
      "hero": { ... },
      "about": { ... },
      "services": { ... }
    },
    "en": { ... },   ← Anglais
    "sk": { ... },   ← Slovaque
    "ua": { ... }    ← Ukrainien
  }
}
```

### Étape 3 : Modifier un Texte

**Exemple : Changer le titre principal**

Cherchez cette ligne (vers la ligne 19) :
```json
"title": "Révélez Votre Potentiel",
```

Changez-la en :
```json
"title": "Votre Nouveau Titre Ici",
```

**⚠️ IMPORTANT :**
- Gardez les guillemets `" "`
- Gardez la virgule `,` à la fin
- Ne supprimez pas les deux-points `:`

### Étape 4 : Sauvegarder

Appuyez sur **Ctrl+S** (Windows) ou **Cmd+S** (Mac)

### Étape 5 : Voir les Changements

1. Ouvrez votre navigateur
2. Allez sur `http://localhost:3000/index.html`
3. Rechargez la page (F5)
4. Vos modifications apparaissent ! ✨

---

## 🖼️ MODIFIER LES PHOTOS

### Méthode 1 : Ajouter Vos Photos

#### Étape 1 : Placer Vos Photos
Copiez vos photos dans ce dossier :
```
coaching-website/images/
```

**Exemple :**
- `coaching-website/images/alina-portrait.jpg`
- `coaching-website/images/studio-1.jpg`
- `coaching-website/images/exercice-squat.jpg`

#### Étape 2 : Référencer la Photo dans le JSON

Ouvrez `data/site-content.json` et trouvez la section où vous voulez la photo.

**Exemple : Photo de profil dans "À propos"**

Cherchez (vers la ligne 37) :
```json
"image": {
  "src": "",
  "alt": "Photo d'Alina"
}
```

Changez en :
```json
"image": {
  "src": "images/alina-portrait.jpg",
  "alt": "Photo d'Alina"
}
```

#### Étape 3 : Sauvegarder et Recharger
- Sauvegardez le fichier (Ctrl+S)
- Rechargez le site (F5)
- Votre photo apparaît ! 📸

---

## 📍 SECTIONS PRINCIPALES À MODIFIER

### 1. 🏠 HERO (Page d'accueil)

**Ligne 18-25** (pour le français) :
```json
"hero": {
  "title": "Révélez Votre Potentiel",           ← Titre principal
  "subtitle": "Coaching fitness personnalisé...", ← Sous-titre
  "description": "Transformez votre corps...",    ← Description
  "cta": "Réserver une séance",                   ← Bouton
  "discover": "Découvrir mes services",
  "scroll": "Défiler"
}
```

**À modifier :**
- `title` : Votre accroche principale
- `subtitle` : Votre proposition de valeur
- `cta` : Texte du bouton d'action

---

### 2. 👤 À PROPOS

**Ligne 26-42** :
```json
"about": {
  "title": "À Propos d'Alina",
  "subtitle": "Coach Fitness Certifiée",
  "bio1": "Lorem ipsum...",                    ← Votre biographie (paragraphe 1)
  "bio2": "Ma philosophie...",                 ← Votre philosophie (paragraphe 2)
  "cert1": "Certifiée Personal Trainer",       ← Certification 1
  "cert2": "Spécialiste Nutrition",            ← Certification 2
  "cert3": "Coach Bien-être",                  ← Certification 3
  "image": {
    "src": "",                                 ← Chemin de votre photo
    "alt": "Photo d'Alina"
  }
}
```

**À modifier :**
- `bio1` et `bio2` : Remplacez "Lorem ipsum" par votre vraie histoire
- `cert1`, `cert2`, `cert3` : Vos vraies certifications
- `image.src` : Ajoutez `"images/votre-photo.jpg"`

---

### 3. 💪 SERVICES

**Ligne 43-70** :
```json
"services": {
  "individual": {
    "title": "Coaching Individuel",
    "desc": "Lorem ipsum...",                  ← Description du service
    "feat1": "Programme sur mesure",           ← Avantage 1
    "feat2": "Suivi personnalisé",             ← Avantage 2
    "feat3": "Flexibilité horaires"            ← Avantage 3
  },
  "group": { ... },                            ← Séances en groupe
  "online": { ... }                            ← Programmes en ligne
}
```

**À modifier :**
- `desc` : Remplacez "Lorem ipsum" par une vraie description
- `feat1`, `feat2`, `feat3` : Les vrais avantages de votre service

---

### 4. 💬 TÉMOIGNAGES

**Ligne 103-129** :
```json
"testimonials": {
  "items": [
    {
      "name": "Marie D.",                      ← Nom du client
      "duration": "6 mois",                    ← Durée
      "rating": 5,                             ← Note (1-5)
      "text": "Lorem ipsum...",                ← Témoignage
      "image": ""                              ← Photo (optionnel)
    }
  ]
}
```

**À modifier :**
- `name` : Vrai nom ou initiales
- `text` : Remplacez "Lorem ipsum" par le vrai témoignage
- `image` : Ajoutez `"images/client-photo.jpg"` si vous avez une photo

**Pour ajouter un témoignage :**
Copiez-collez un bloc existant et modifiez les valeurs :
```json
{
  "name": "Sophie L.",
  "duration": "1 an",
  "rating": 5,
  "text": "Alina est une coach exceptionnelle !",
  "image": ""
}
```

---

### 5. 💰 TARIFS

**Ligne 131-179** :
```json
"pricing": {
  "plans": [
    {
      "name": "Découverte",                    ← Nom de la formule
      "price": "€45",                          ← Prix
      "period": "/ séance",                    ← Période
      "featured": false,                       ← Mettre en avant (true/false)
      "features": [                            ← Liste des avantages
        "1 séance individuelle",
        "Évaluation complète",
        "Programme personnalisé",
        "Conseils nutrition"
      ]
    }
  ]
}
```

**À modifier :**
- `price` : Vos vrais tarifs
- `features` : Liste de ce qui est inclus dans la formule
- `featured` : Mettez `true` pour la formule que vous recommandez

---

### 6. 📧 CONTACT

**Ligne 181-204** :
```json
"contact": {
  "locationValue": "Bratislava, Slovaquie",    ← Votre adresse
  "emailValue": "alina@coaching-bratislava.com", ← Votre email
  "phoneValue": "+421 XXX XXX XXX",            ← Votre téléphone
  "schedule": "Lun-Ven: 7h-20h<br>Sam: 9h-14h" ← Vos horaires
}
```

**À modifier :**
- `emailValue` : Votre vrai email
- `phoneValue` : Votre vrai numéro
- `schedule` : Vos vrais horaires

---

## 🌍 TRADUIRE DANS LES AUTRES LANGUES

### Après avoir modifié en français...

1. **Trouvez la section anglaise** (ligne ~220)
```json
"en": {
  "hero": {
    "title": "Reveal Your Potential",  ← Traduisez ici
    ...
  }
}
```

2. **Trouvez la section slovaque** (ligne ~432)
```json
"sk": {
  "hero": {
    "title": "Odhaľte Svoj Potenciál",  ← Traduisez ici
    ...
  }
}
```

3. **Trouvez la section ukrainienne** (ligne ~644)
```json
"ua": {
  "hero": {
    "title": "Розкрийте Свій Потенціал",  ← Traduisez ici
    ...
  }
}
```

**💡 Astuce :** Utilisez Google Translate si besoin, puis affinez la traduction.

---

## ✅ CHECKLIST DE MODIFICATION

### Textes à Remplacer Absolument

- [ ] Titre principal (hero.title)
- [ ] Sous-titre (hero.subtitle)
- [ ] Biographie (about.bio1 et about.bio2)
- [ ] Descriptions des services (remplacer tous les "Lorem ipsum")
- [ ] Témoignages (remplacer par de vrais témoignages)
- [ ] Email de contact
- [ ] Numéro de téléphone
- [ ] Horaires

### Photos à Ajouter

- [ ] Photo de profil (about.image.src)
- [ ] Photos des témoignages (optionnel)
- [ ] Logo (si vous en avez un)

### Traductions

- [ ] Français (fr) ✓
- [ ] Anglais (en)
- [ ] Slovaque (sk)
- [ ] Ukrainien (ua)

---

## 🎨 CONSEILS POUR LES PHOTOS

### Formats Acceptés
- ✅ JPG (recommandé)
- ✅ PNG
- ✅ WebP

### Taille Recommandée
- **Photo de profil** : 800x800 pixels minimum
- **Photos de galerie** : 1920x1080 pixels
- **Poids** : Maximum 2 MB par photo

### Nommage des Fichiers
Utilisez des noms simples sans espaces :
- ✅ `alina-portrait.jpg`
- ✅ `studio-bratislava.jpg`
- ✅ `exercice-squat.jpg`
- ❌ `Ma Photo de Profil 2024.jpg`

---

## 🔧 RÉSOLUTION DE PROBLÈMES

### ❌ Les modifications ne s'affichent pas

**Solution :**
1. Vérifiez que vous avez sauvegardé le fichier (Ctrl+S)
2. Rechargez la page avec Ctrl+Shift+R (vide le cache)
3. Vérifiez qu'il n'y a pas d'erreur de syntaxe JSON

### ❌ Erreur de syntaxe JSON

**Causes fréquentes :**
- Virgule manquante ou en trop
- Guillemets manquants
- Accolade `{ }` ou crochet `[ ]` non fermé

**Solution :**
Utilisez un validateur JSON en ligne : https://jsonlint.com/
Copiez-collez votre JSON pour vérifier les erreurs.

### ❌ Une photo ne s'affiche pas

**Vérifiez :**
1. Le fichier est bien dans `coaching-website/images/`
2. Le nom du fichier est correct (sensible à la casse)
3. Le chemin dans le JSON est : `"images/nom-fichier.jpg"`
4. Le format est JPG, PNG ou WebP

---

## 📱 TESTER VOS MODIFICATIONS

### Sur Ordinateur
1. Ouvrez `http://localhost:3000/index.html`
2. Testez chaque section
3. Vérifiez les 4 langues (sélecteur en haut à droite)

### Sur Mobile
1. Ouvrez le site sur votre téléphone
2. Vérifiez que tout s'affiche correctement
3. Testez le menu hamburger

---

## 💡 EXEMPLE COMPLET

Voici un exemple de modification complète de la section Hero en français :

**AVANT :**
```json
"hero": {
  "title": "Révélez Votre Potentiel",
  "subtitle": "Coaching fitness personnalisé pour femmes à Bratislava",
  "description": "Transformez votre corps et votre esprit avec un accompagnement bienveillant et professionnel",
  "cta": "Réserver une séance"
}
```

**APRÈS :**
```json
"hero": {
  "title": "Transformez Votre Corps et Votre Vie",
  "subtitle": "Coach fitness certifiée à Bratislava - Spécialiste femmes",
  "description": "Atteignez vos objectifs avec un programme personnalisé et un suivi professionnel",
  "cta": "Commencer maintenant"
}
```

---

## 🚀 PROCHAINES ÉTAPES

1. **Modifiez les textes** en suivant ce guide
2. **Ajoutez vos photos** dans le dossier images/
3. **Traduisez** dans les 4 langues
4. **Testez** sur le site
5. **Affinez** selon vos besoins

---

## 📞 BESOIN D'AIDE ?

Si vous avez des questions :
1. Relisez la section concernée de ce guide
2. Vérifiez la syntaxe JSON sur jsonlint.com
3. Consultez le fichier `ADMIN-SPECIFICATIONS.md` pour plus de détails

---

**Bon courage ! Vous allez y arriver ! 💪**

*Guide créé le 9 avril 2026*