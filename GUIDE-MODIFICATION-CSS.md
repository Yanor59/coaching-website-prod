# 🎨 Guide : Modifier les Couleurs et le CSS

## ✅ Oui, vous pouvez modifier le CSS directement !

Vous pouvez personnaliser complètement l'apparence de votre site en modifiant le fichier CSS.

---

## 📁 Fichier à Modifier

Le fichier CSS principal se trouve ici :
```
coaching-website/css/styles.css
```

Ouvrez-le avec VS Code (ou n'importe quel éditeur de texte).

---

## 🎨 Modifier les Couleurs

### 1. Variables CSS (Méthode Recommandée)

Au début du fichier `styles.css`, vous trouverez les variables de couleurs :

```css
:root {
    /* Couleurs principales */
    --primary-color: #2c3e50;      /* Bleu foncé */
    --secondary-color: #3498db;    /* Bleu clair */
    --accent-color: #e74c3c;       /* Rouge/Orange */
    --text-color: #333;            /* Texte principal */
    --bg-color: #ffffff;           /* Fond blanc */
}
```

**Pour changer les couleurs, modifiez simplement ces valeurs :**

#### Exemple 1 : Thème Rose/Violet
```css
:root {
    --primary-color: #8e44ad;      /* Violet */
    --secondary-color: #e91e63;    /* Rose */
    --accent-color: #ff6b9d;       /* Rose clair */
    --text-color: #2c3e50;         /* Texte foncé */
    --bg-color: #ffffff;           /* Fond blanc */
}
```

#### Exemple 2 : Thème Vert Nature
```css
:root {
    --primary-color: #27ae60;      /* Vert */
    --secondary-color: #2ecc71;    /* Vert clair */
    --accent-color: #f39c12;       /* Orange */
    --text-color: #2c3e50;         /* Texte foncé */
    --bg-color: #ffffff;           /* Fond blanc */
}
```

#### Exemple 3 : Thème Élégant Noir/Or
```css
:root {
    --primary-color: #1a1a1a;      /* Noir */
    --secondary-color: #d4af37;    /* Or */
    --accent-color: #c9a961;       /* Or clair */
    --text-color: #333333;         /* Texte foncé */
    --bg-color: #ffffff;           /* Fond blanc */
}
```

### 2. Trouver le Code Couleur

**Outils en ligne pour choisir des couleurs :**
- https://coolors.co/ (générateur de palettes)
- https://color.adobe.com/ (Adobe Color)
- https://htmlcolorcodes.com/ (sélecteur de couleurs)

**Format des couleurs :**
- Hexadécimal : `#3498db`
- RGB : `rgb(52, 152, 219)`
- RGBA (avec transparence) : `rgba(52, 152, 219, 0.8)`

---

## 🔧 Modifications Courantes

### Changer la Couleur du Header (Menu)

Cherchez cette section dans `styles.css` :

```css
.header {
    background: var(--primary-color);  /* Utilise la couleur principale */
    /* OU directement : */
    background: #2c3e50;
}
```

**Modifier en :**
```css
.header {
    background: #8e44ad;  /* Votre nouvelle couleur */
}
```

### Changer la Couleur des Boutons

Cherchez :
```css
.btn-primary {
    background: var(--secondary-color);
    color: white;
}
```

**Modifier en :**
```css
.btn-primary {
    background: #e91e63;  /* Rose */
    color: white;
}
```

### Changer la Couleur des Liens

Cherchez :
```css
a {
    color: var(--secondary-color);
}

a:hover {
    color: var(--accent-color);
}
```

**Modifier en :**
```css
a {
    color: #8e44ad;  /* Violet */
}

a:hover {
    color: #e91e63;  /* Rose au survol */
}
```

### Changer la Police de Caractères

Cherchez :
```css
body {
    font-family: 'Arial', sans-serif;
}
```

**Modifier en :**
```css
body {
    font-family: 'Montserrat', 'Helvetica', sans-serif;
}
```

**Pour utiliser Google Fonts :**
1. Allez sur https://fonts.google.com/
2. Choisissez une police (ex: Montserrat)
3. Copiez le lien fourni
4. Ajoutez-le dans `index.html` dans la section `<head>` :

```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap" rel="stylesheet">
```

### Changer la Taille du Texte

Cherchez :
```css
body {
    font-size: 16px;
}

h1 {
    font-size: 2.5rem;
}
```

**Modifier en :**
```css
body {
    font-size: 18px;  /* Texte plus grand */
}

h1 {
    font-size: 3rem;  /* Titres plus grands */
}
```

---

## 📐 Autres Modifications Possibles

### Arrondir les Coins (Border Radius)

```css
.card {
    border-radius: 8px;  /* Coins arrondis */
}

/* Pour des coins très arrondis : */
.card {
    border-radius: 20px;
}

/* Pour des coins carrés : */
.card {
    border-radius: 0;
}
```

### Ajouter des Ombres

```css
.card {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Ombre plus prononcée : */
.card {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Pas d'ombre : */
.card {
    box-shadow: none;
}
```

### Changer l'Espacement

```css
.section {
    padding: 60px 20px;  /* Espacement vertical et horizontal */
}

/* Plus d'espace : */
.section {
    padding: 100px 40px;
}

/* Moins d'espace : */
.section {
    padding: 40px 15px;
}
```

---

## 🎯 Workflow de Modification

### Étape 1 : Ouvrir le Fichier
```
coaching-website/css/styles.css
```

### Étape 2 : Modifier les Couleurs
Changez les variables CSS en haut du fichier :
```css
:root {
    --primary-color: #VOTRE_COULEUR;
    --secondary-color: #VOTRE_COULEUR;
    --accent-color: #VOTRE_COULEUR;
}
```

### Étape 3 : Sauvegarder
Appuyez sur **Ctrl+S** (Windows) ou **Cmd+S** (Mac)

### Étape 4 : Voir les Changements
1. Assurez-vous que le serveur est lancé (`npm start`)
2. Allez sur `http://localhost:3000/index.html`
3. Rechargez la page avec **Ctrl+Shift+R** (vide le cache)

### Étape 5 : Ajuster
Si ce n'est pas parfait, retournez au fichier CSS et ajustez !

---

## 💡 Astuces Pro

### 1. Utiliser l'Inspecteur du Navigateur

**Pour tester les couleurs en direct :**
1. Ouvrez votre site dans Chrome/Firefox
2. Appuyez sur **F12** (ouvre les outils de développement)
3. Cliquez sur l'icône de sélection (en haut à gauche)
4. Cliquez sur un élément de votre site
5. Dans le panneau de droite, vous voyez le CSS
6. Modifiez les couleurs en direct pour tester
7. Une fois satisfait, copiez les valeurs dans votre fichier CSS

### 2. Créer un Thème Cohérent

**Règle des 60-30-10 :**
- 60% : Couleur dominante (fond, grandes surfaces)
- 30% : Couleur secondaire (sections, cartes)
- 10% : Couleur d'accent (boutons, liens)

**Exemple :**
```css
:root {
    --primary-color: #2c3e50;      /* 60% - Fond header, footer */
    --secondary-color: #3498db;    /* 30% - Sections, cartes */
    --accent-color: #e74c3c;       /* 10% - Boutons, CTA */
}
```

### 3. Tester le Contraste

Assurez-vous que le texte est lisible sur le fond :
- Texte foncé sur fond clair ✅
- Texte clair sur fond foncé ✅
- Évitez : texte gris clair sur fond blanc ❌

**Outil de test :** https://webaim.org/resources/contrastchecker/

### 4. Mode Sombre (Optionnel)

Vous pouvez ajouter un mode sombre :

```css
/* Mode clair (par défaut) */
:root {
    --bg-color: #ffffff;
    --text-color: #333333;
}

/* Mode sombre */
@media (prefers-color-scheme: dark) {
    :root {
        --bg-color: #1a1a1a;
        --text-color: #f0f0f0;
        --primary-color: #3498db;
    }
}
```

---

## 🔍 Trouver les Éléments à Modifier

### Méthode 1 : Recherche dans le Fichier

Dans VS Code :
1. Ouvrez `styles.css`
2. Appuyez sur **Ctrl+F** (Windows) ou **Cmd+F** (Mac)
3. Cherchez par exemple : "button", "header", "card", etc.

### Méthode 2 : Inspecteur du Navigateur

1. Ouvrez votre site
2. **Clic droit** sur l'élément que vous voulez modifier
3. Cliquez sur **Inspecter**
4. Vous voyez le CSS appliqué à cet élément
5. Notez le nom de la classe (ex: `.btn-primary`)
6. Cherchez cette classe dans `styles.css`

---

## 📝 Exemple Complet de Personnalisation

Voici un exemple de modification complète pour un thème fitness rose/violet :

```css
:root {
    /* Couleurs */
    --primary-color: #8e44ad;      /* Violet */
    --secondary-color: #e91e63;    /* Rose */
    --accent-color: #ff6b9d;       /* Rose clair */
    --text-color: #2c3e50;         /* Texte foncé */
    --bg-color: #ffffff;           /* Fond blanc */
    --light-bg: #f8f9fa;           /* Fond clair */
    
    /* Polices */
    --font-main: 'Montserrat', sans-serif;
    --font-heading: 'Poppins', sans-serif;
    
    /* Espacements */
    --spacing-small: 1rem;
    --spacing-medium: 2rem;
    --spacing-large: 4rem;
    
    /* Bordures */
    --border-radius: 12px;
    --border-radius-small: 6px;
}

body {
    font-family: var(--font-main);
    color: var(--text-color);
    font-size: 16px;
    line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 700;
}

.btn-primary {
    background: linear-gradient(135deg, var(--secondary-color), var(--accent-color));
    color: white;
    padding: 1rem 2rem;
    border-radius: var(--border-radius-small);
    border: none;
    font-weight: 600;
    transition: transform 0.3s;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(233, 30, 99, 0.3);
}
```

---

## ⚠️ Conseils Importants

### ✅ À Faire :
- Sauvegarder une copie de `styles.css` avant de modifier
- Tester sur différents navigateurs (Chrome, Firefox, Safari)
- Tester sur mobile et desktop
- Utiliser des couleurs cohérentes
- Garder un bon contraste pour la lisibilité

### ❌ À Éviter :
- Trop de couleurs différentes (max 3-4 couleurs principales)
- Texte illisible (mauvais contraste)
- Modifications sans sauvegarde
- Supprimer du code sans savoir ce qu'il fait

---

## 🆘 En Cas de Problème

### Le site ne s'affiche plus correctement

**Solution :**
1. Restaurez la sauvegarde de `styles.css`
2. Ou utilisez **Ctrl+Z** pour annuler les modifications
3. Rechargez la page avec **Ctrl+Shift+R**

### Les couleurs ne changent pas

**Vérifiez :**
1. Avez-vous sauvegardé le fichier ? (Ctrl+S)
2. Avez-vous rechargé la page ? (Ctrl+Shift+R)
3. Le serveur est-il lancé ? (`npm start`)
4. Avez-vous modifié le bon fichier ? (`css/styles.css`)

---

## 📚 Ressources Utiles

**Palettes de Couleurs :**
- https://coolors.co/
- https://color.adobe.com/
- https://flatuicolors.com/

**Polices Google :**
- https://fonts.google.com/

**Générateurs de Dégradés :**
- https://cssgradient.io/
- https://uigradients.com/

**Inspiration Design :**
- https://dribbble.com/
- https://www.behance.net/
- https://www.awwwards.com/

---

**Amusez-vous bien avec la personnalisation de votre site ! 🎨✨**

*Date de création : 9 avril 2026*