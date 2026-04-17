# 📖 Guide d'Utilisation - Interface Admin

## 🎯 Comment Modifier les Textes et Photos de Votre Site

Ce guide vous explique étape par étape comment utiliser l'interface d'administration pour gérer le contenu de votre site de coaching.

---

## 🚀 Démarrage

### 1. Lancer le Serveur Local

Ouvrez un terminal dans le dossier `coaching-website` et tapez :

```bash
npm start
```

### 2. Accéder à l'Interface Admin

Ouvrez votre navigateur et allez sur :
```
http://localhost:3000/admin.html
```

---

## 📝 Modifier les Textes du Site

### Méthode 1 : Via l'Interface Admin (Recommandé)

#### Étape 1 : Accéder à la Section Contenu
1. Dans le menu latéral gauche, cliquez sur **📝 Contenu**
2. Vous verrez toutes les sections modifiables du site

#### Étape 2 : Choisir la Section à Modifier
Sélectionnez la section que vous voulez modifier :
- **Hero** : Titre principal et sous-titre de la page d'accueil
- **À propos** : Votre biographie et présentation
- **Services** : Description de vos services
- **Témoignages** : Avis de vos clients
- **Tarifs** : Vos formules et prix
- **Contact** : Informations de contact

#### Étape 3 : Modifier dans les 4 Langues
Pour chaque section, vous pouvez modifier le texte dans les 4 langues :
- 🇫🇷 **Français (FR)**
- 🇬🇧 **Anglais (EN)**
- 🇸🇰 **Slovaque (SK)**
- 🇺🇦 **Ukrainien (UA)**

**Comment faire :**
1. Cliquez sur l'onglet de la langue (ex: 🇫🇷 FR)
2. Modifiez le texte dans les champs
3. Passez à la langue suivante (ex: 🇬🇧 EN)
4. Répétez pour toutes les langues
5. Cliquez sur **Enregistrer**

#### Étape 4 : Prévisualiser
- Cliquez sur **Prévisualiser** pour voir vos modifications
- Cliquez sur **👁️ Voir le site** en haut à droite pour voir le site complet

---

### Méthode 2 : Modifier Directement le Fichier JSON

Si vous préférez modifier directement le fichier :

#### Étape 1 : Ouvrir le Fichier
Ouvrez le fichier : `coaching-website/data/site-content.json`

#### Étape 2 : Trouver la Section
Le fichier est organisé par langue, puis par section :

```json
{
  "content": {
    "fr": {
      "hero": {
        "title": "Révélez Votre Potentiel",
        "subtitle": "Coaching fitness personnalisé..."
      }
    }
  }
}
```

#### Étape 3 : Modifier le Texte
Changez le texte entre les guillemets :

**Avant :**
```json
"title": "Révélez Votre Potentiel"
```

**Après :**
```json
"title": "Transformez Votre Vie"
```

#### Étape 4 : Sauvegarder
- Sauvegardez le fichier (Ctrl+S ou Cmd+S)
- Rechargez la page du site pour voir les changements

---

## 🖼️ Modifier les Photos

### Option 1 : Via l'Interface Admin

#### Étape 1 : Accéder à la Section Médias
1. Cliquez sur **🖼️ Médias** dans le menu latéral
2. Vous verrez toutes vos photos actuelles

#### Étape 2 : Ajouter une Nouvelle Photo
1. Cliquez sur **[+ Upload Photos]**
2. **Glissez-déposez** vos photos dans la zone
   - OU cliquez sur **Choisir des fichiers**
3. Sélectionnez vos photos (JPG, PNG, WebP)
4. Attendez la fin de l'upload

#### Étape 3 : Organiser les Photos
Pour chaque photo, vous pouvez :
- **Renommer** : Cliquez sur ✏️ puis changez le nom
- **Ajouter une description** : Utile pour le référencement
- **Choisir une catégorie** :
  - Photos d'Alina
  - Photos du studio
  - Photos avant/après
  - Photos d'exercices
  - Photos partenaires
- **Supprimer** : Cliquez sur 🗑️

#### Étape 4 : Utiliser la Photo dans une Section
1. Allez dans **📝 Contenu**
2. Sélectionnez la section (ex: "À propos")
3. Cliquez sur **Choisir une image**
4. Sélectionnez votre photo uploadée
5. Cliquez sur **Enregistrer**

---

### Option 2 : Ajouter des Photos Manuellement

#### Étape 1 : Placer les Photos
Copiez vos photos dans le dossier :
```
coaching-website/images/
```

#### Étape 2 : Référencer dans le JSON
Ouvrez `data/site-content.json` et ajoutez le chemin :

```json
"about": {
  "image": {
    "src": "images/alina-photo.jpg",
    "alt": "Photo d'Alina"
  }
}
```

---

## 🎥 Ajouter des Vidéos

### Étape 1 : Accéder aux Vidéos
1. Cliquez sur **🖼️ Médias** dans le menu
2. Cliquez sur l'onglet **Vidéos**

### Étape 2 : Ajouter une Vidéo
1. Cliquez sur **[+ Ajouter une vidéo]**
2. Choisissez le type :
   - **Instagram** : Collez l'URL de votre post/reel
   - **YouTube** : Collez l'URL de votre vidéo
3. Sélectionnez une catégorie :
   - Tutoriels
   - Témoignages
   - Exercices
   - Présentation

### Étape 3 : Ajouter les Descriptions
Pour chaque langue, ajoutez :
- **Titre** : Nom de la vidéo
- **Description** : Courte description

### Étape 4 : Enregistrer
Cliquez sur **Enregistrer** - la vidéo apparaîtra sur votre site !

---

## 💬 Gérer les Témoignages

### Ajouter un Témoignage

#### Étape 1 : Accéder aux Témoignages
Cliquez sur **💬 Témoignages** dans le menu latéral

#### Étape 2 : Créer un Nouveau Témoignage
1. Cliquez sur **[+ Nouveau témoignage]**
2. Remplissez les informations :
   - **Nom du client** : Ex: "Marie D."
   - **Photo** : (optionnel) Uploadez une photo
   - **Note** : Sélectionnez le nombre d'étoiles (1-5)
   - **Durée** : Ex: "6 mois"

#### Étape 3 : Ajouter le Texte dans les 4 Langues
Pour chaque langue (FR, EN, SK, UA) :
1. Cliquez sur l'onglet de la langue
2. Écrivez le témoignage
3. Passez à la langue suivante

#### Étape 4 : Publier
1. Cliquez sur **Enregistrer**
2. Le témoignage apparaît sur votre site !

### Modifier un Témoignage Existant
1. Trouvez le témoignage dans la liste
2. Cliquez sur **✏️ Modifier**
3. Changez les informations
4. Cliquez sur **Enregistrer**

### Mettre en Avant un Témoignage
Cliquez sur **⭐ Featured** pour qu'il apparaisse en premier

---

## 💰 Gérer les Tarifs

### Modifier un Tarif Existant

#### Étape 1 : Accéder aux Tarifs
Cliquez sur **💰 Tarifs** dans le menu latéral

#### Étape 2 : Modifier une Formule
1. Trouvez la formule (Découverte, Premium, VIP)
2. Cliquez sur **✏️ Modifier**
3. Changez :
   - **Prix** : Ex: "€45" → "€50"
   - **Nom** : Dans les 4 langues
   - **Description** : Dans les 4 langues
   - **Avantages** : Liste des bénéfices

#### Étape 3 : Enregistrer
Cliquez sur **Enregistrer** - les nouveaux tarifs sont en ligne !

### Créer une Nouvelle Formule
1. Cliquez sur **[+ Nouvelle formule]**
2. Remplissez tous les champs
3. Cochez **Populaire** si c'est votre formule phare
4. Cliquez sur **Enregistrer**

---

## 🤝 Gérer les Partenaires

### Ajouter un Partenaire

#### Étape 1 : Accéder aux Partenaires
Cliquez sur **🤝 Partenaires** dans le menu latéral

#### Étape 2 : Créer un Nouveau Partenaire
1. Cliquez sur **[+ Nouveau partenaire]**
2. Remplissez :
   - **Nom** : Ex: "Sophie Martin"
   - **Photo** : Uploadez une photo
   - **Spécialité** : Ex: "Yoga & Pilates"
   - **Lien site web** : URL (optionnel)
   - **Réseaux sociaux** : Instagram, etc.

#### Étape 3 : Ajouter la Description
Pour chaque langue, écrivez une courte description du partenaire

#### Étape 4 : Enregistrer
Cliquez sur **Enregistrer**

---

## 📧 Gérer les Messages de Contact

### Consulter les Messages

#### Étape 1 : Accéder aux Messages
Cliquez sur **📧 Messages** dans le menu latéral

#### Étape 2 : Voir les Nouveaux Messages
Les messages non lus sont marqués avec un point bleu 🔵

#### Étape 3 : Lire un Message
1. Cliquez sur **👁️ Voir** pour ouvrir le message
2. Vous verrez :
   - Nom et email du client
   - Téléphone
   - Service demandé
   - Message complet
   - Langue du message

#### Étape 4 : Répondre
1. Cliquez sur **✉️ Répondre**
2. Votre client email s'ouvre automatiquement
3. Rédigez votre réponse
4. Envoyez !

#### Étape 5 : Archiver
Une fois traité, cliquez sur **Archiver** pour ranger le message

---

## ⚙️ Paramètres du Site

### Modifier les Informations Générales

#### Étape 1 : Accéder aux Paramètres
Cliquez sur **⚙️ Paramètres** dans le menu latéral

#### Étape 2 : Modifier les Informations
Vous pouvez changer :
- **Nom du site** : "Alina Coaching"
- **Adresse** : Votre adresse à Bratislava
- **Téléphone** : Votre numéro
- **Email** : Votre email de contact
- **Horaires** : Vos heures d'ouverture

#### Étape 3 : Réseaux Sociaux
Ajoutez vos liens :
- Instagram
- YouTube
- Facebook
- TikTok
- LinkedIn

#### Étape 4 : Enregistrer
Cliquez sur **Enregistrer les modifications**

---

## 🎨 Conseils pour de Belles Photos

### Qualité des Photos
- **Résolution** : Minimum 1920x1080 pixels
- **Format** : JPG ou PNG (WebP pour plus léger)
- **Taille** : Maximum 5 MB par photo
- **Compression** : L'admin compresse automatiquement

### Types de Photos Recommandées
1. **Photo de profil** : Portrait professionnel, souriant
2. **Photos d'action** : Vous en train de coacher
3. **Photos du studio** : Votre espace de travail
4. **Avant/Après** : Transformations de clients (avec permission)
5. **Photos d'exercices** : Démonstrations

### Conseils de Prise de Vue
- ✅ Bonne lumière naturelle
- ✅ Arrière-plan propre et professionnel
- ✅ Photos nettes (pas floues)
- ✅ Visage visible et souriant
- ❌ Éviter les photos sombres
- ❌ Éviter les photos pixelisées

---

## 📱 Workflow Recommandé

### Routine Hebdomadaire
1. **Lundi** : Vérifier les nouveaux messages
2. **Mercredi** : Ajouter 2-3 nouvelles photos
3. **Vendredi** : Publier une nouvelle vidéo
4. **Dimanche** : Vérifier et modérer les commentaires

### Routine Mensuelle
1. Mettre à jour les témoignages
2. Vérifier les tarifs
3. Ajouter du nouveau contenu
4. Vérifier les traductions

---

## 🆘 Résolution de Problèmes

### Le serveur ne démarre pas
```bash
# Vérifier que Node.js est installé
node --version

# Réinstaller les dépendances
npm install

# Relancer
npm start
```

### Les modifications ne s'affichent pas
1. Vérifiez que vous avez cliqué sur **Enregistrer**
2. Rechargez la page du site (F5 ou Ctrl+R)
3. Videz le cache du navigateur (Ctrl+Shift+R)

### Une photo ne s'affiche pas
1. Vérifiez le format (JPG, PNG, WebP)
2. Vérifiez la taille (max 5 MB)
3. Vérifiez le chemin dans le JSON
4. Rechargez la page

### Les traductions sont incomplètes
1. Allez dans **📝 Contenu**
2. Vérifiez chaque onglet de langue
3. Remplissez les champs vides
4. Enregistrez

---

## 💡 Astuces Pro

### 1. Sauvegarde Automatique
L'admin sauvegarde automatiquement vos modifications toutes les 30 secondes

### 2. Prévisualisation
Utilisez toujours **Prévisualiser** avant de publier

### 3. Multilingue
Gardez le même ton et message dans toutes les langues

### 4. SEO
Ajoutez des descriptions détaillées à vos photos pour le référencement

### 5. Cohérence
Utilisez le même style de photos pour un look professionnel

---

## 📞 Besoin d'Aide ?

Si vous avez des questions ou rencontrez des problèmes :

1. **Consultez ce guide** en premier
2. **Vérifiez les fichiers** :
   - `ADMIN-SPECIFICATIONS.md` : Spécifications complètes
   - `INSTRUCTIONS-LOCALHOST.md` : Instructions techniques
3. **Contactez le support technique**

---

## ✅ Checklist de Démarrage

Avant de lancer votre site, assurez-vous d'avoir :

- [ ] Modifié tous les textes "Lorem ipsum"
- [ ] Ajouté votre photo de profil
- [ ] Ajouté au moins 5 photos du studio
- [ ] Traduit tout le contenu dans les 4 langues
- [ ] Ajouté 3-5 témoignages réels
- [ ] Vérifié les tarifs
- [ ] Ajouté vos liens de réseaux sociaux
- [ ] Testé le formulaire de contact
- [ ] Ajouté 2-3 vidéos
- [ ] Vérifié sur mobile et desktop

---

**Bon courage avec votre site ! 💪**

*Dernière mise à jour : 9 avril 2026*