# 🔐 Interface Admin - Spécifications Techniques

## 📋 Vue d'ensemble
Interface d'administration pour gérer le contenu du site "Alina Coaching Bratislava" sans avoir besoin de coder.

---

## 🎯 Objectifs de l'Interface Admin

Permettre à l'administrateur (vous) de :
1. ✅ Uploader et gérer les photos
2. ✅ Uploader et gérer le logo
3. ✅ Ajouter/modifier des vidéos (liens Instagram/YouTube)
4. ✅ Gérer les témoignages clients
5. ✅ Modifier les textes dans les 4 langues
6. ✅ Gérer les tarifs
7. ✅ Voir et répondre aux messages du formulaire de contact
8. ✅ Gérer les partenariats
9. ✅ Modérer les commentaires

---

## 🔒 Sécurité

### Authentification
- **Login sécurisé** : Email + Mot de passe
- **Session** : Timeout après 30 minutes d'inactivité
- **Protection** : Hachage des mots de passe (bcrypt)
- **2FA** (optionnel Phase 2) : Authentification à deux facteurs

### Accès
- **URL Admin** : `https://alinacoaching.com/admin` (protégée)
- **Rôles** :
  - Super Admin (vous) : Accès complet
  - Modérateur (optionnel) : Gestion commentaires uniquement

---

## 📱 Interface Admin - Sections

### 1. 📊 Dashboard (Tableau de bord)
**Vue d'ensemble** :
- Nombre de visiteurs (derniers 7/30 jours)
- Nouveaux messages de contact
- Commentaires en attente de modération
- Statistiques rapides

**Widgets** :
- Graphique de trafic
- Derniers messages
- Actions rapides (ajouter photo, vidéo, etc.)

---

### 2. 🖼️ Gestion des Médias

#### 2.1 Photos
**Fonctionnalités** :
- ✅ Upload multiple (drag & drop)
- ✅ Formats acceptés : JPG, PNG, WebP
- ✅ Taille max : 5 MB par photo
- ✅ Compression automatique
- ✅ Aperçu avant upload
- ✅ Organisation par catégories :
  - Photos d'Alina
  - Photos du studio
  - Photos avant/après
  - Photos d'exercices
  - Photos partenaires
- ✅ Édition :
  - Renommer
  - Ajouter description (4 langues)
  - Ajouter tags
  - Définir comme photo de couverture
  - Supprimer
- ✅ Galerie visuelle avec miniatures
- ✅ Recherche et filtres

**Interface** :
```
┌─────────────────────────────────────┐
│  [+ Upload Photos]  [Catégories ▼]  │
├─────────────────────────────────────┤
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐           │
│  │ 📷│ │ 📷│ │ 📷│ │ 📷│           │
│  └───┘ └───┘ └───┘ └───┘           │
│  Photo1 Photo2 Photo3 Photo4        │
│  [✏️] [🗑️] [✏️] [🗑️] [✏️] [🗑️] [✏️] [🗑️]│
└─────────────────────────────────────┘
```

#### 2.2 Logo
**Fonctionnalités** :
- ✅ Upload logo principal
- ✅ Formats : PNG, SVG (transparent)
- ✅ Versions :
  - Logo couleur
  - Logo blanc (pour fond sombre)
  - Favicon
- ✅ Aperçu en temps réel sur différents fonds

#### 2.3 Vidéos
**Fonctionnalités** :
- ✅ Ajouter des liens vidéos :
  - Instagram (URL du post/reel)
  - YouTube (URL ou ID)
- ✅ Aperçu automatique (thumbnail)
- ✅ Catégorisation :
  - Tutoriels
  - Témoignages
  - Exercices
  - Présentation
- ✅ Ordre d'affichage (drag & drop)
- ✅ Activer/Désactiver
- ✅ Titre et description (4 langues)

**Formulaire d'ajout** :
```
┌─────────────────────────────────────┐
│ Ajouter une vidéo                   │
├─────────────────────────────────────┤
│ Type: [Instagram ▼] [YouTube ▼]    │
│ URL: [_________________________]    │
│ Catégorie: [Tutoriel ▼]            │
│                                     │
│ Titre (FR): [________________]      │
│ Titre (EN): [________________]      │
│ Titre (SK): [________________]      │
│ Titre (UA): [________________]      │
│                                     │
│ Description (FR): [___________]     │
│ ...                                 │
│                                     │
│ [Aperçu] [Annuler] [Enregistrer]   │
└─────────────────────────────────────┘
```

---

### 3. 📝 Gestion du Contenu

#### 3.1 Textes Multilingues
**Sections éditables** :
- Hero (titre, sous-titre, CTA)
- À propos (biographie, philosophie)
- Services (descriptions)
- Tarifs (descriptions des packs)
- Footer (mentions légales)

**Éditeur** :
- Éditeur WYSIWYG (What You See Is What You Get)
- Onglets pour chaque langue
- Prévisualisation en temps réel
- Sauvegarde automatique (brouillon)

**Interface** :
```
┌─────────────────────────────────────┐
│ Section: [Hero ▼]                   │
│ [🇫🇷 FR] [🇬🇧 EN] [🇸🇰 SK] [🇺🇦 UA]  │
├─────────────────────────────────────┤
│ Titre:                              │
│ [Révélez votre potentiel___]        │
│                                     │
│ Sous-titre:                         │
│ [Accompagnement fitness_____]       │
│                                     │
│ Bouton CTA:                         │
│ [Réserver une séance________]       │
│                                     │
│ [Prévisualiser] [Enregistrer]      │
└─────────────────────────────────────┘
```

#### 3.2 Services / Programmes
**Gestion** :
- ✅ Ajouter/Modifier/Supprimer des services
- ✅ Titre, description, prix (4 langues)
- ✅ Icône ou image
- ✅ Ordre d'affichage
- ✅ Activer/Désactiver

---

### 4. 💬 Témoignages

**Fonctionnalités** :
- ✅ Ajouter un témoignage :
  - Nom du client
  - Photo (optionnel)
  - Texte du témoignage (4 langues)
  - Note (étoiles)
  - Date
- ✅ Modérer (approuver/rejeter)
- ✅ Mettre en avant (featured)
- ✅ Ordre d'affichage

**Liste des témoignages** :
```
┌─────────────────────────────────────┐
│ [+ Nouveau témoignage]              │
├─────────────────────────────────────┤
│ ⭐⭐⭐⭐⭐ Marie D.                    │
│ "Excellente coach..."               │
│ [✏️ Modifier] [🗑️ Supprimer] [⭐ Featured]│
├─────────────────────────────────────┤
│ ⭐⭐⭐⭐⭐ Sophie L.                   │
│ "Très professionnelle..."           │
│ [✏️ Modifier] [🗑️ Supprimer] [⭐ Featured]│
└─────────────────────────────────────┘
```

---

### 5. 🤝 Partenariats

**Gestion des partenaires** :
- ✅ Ajouter un coach partenaire :
  - Nom
  - Photo
  - Spécialité
  - Description (4 langues)
  - Lien site web / réseaux sociaux
- ✅ Modifier/Supprimer
- ✅ Ordre d'affichage

---

### 6. 💰 Tarifs

**Gestion** :
- ✅ Créer des packs/formules :
  - Nom (4 langues)
  - Prix (€)
  - Description (4 langues)
  - Durée
  - Nombre de séances
  - Avantages (liste)
- ✅ Promotions :
  - Prix barré
  - Badge "Offre spéciale"
  - Date de début/fin
- ✅ Activer/Désactiver

---

### 7. 📧 Messages de Contact

**Fonctionnalités** :
- ✅ Liste des messages reçus :
  - Nom, Email, Téléphone
  - Message
  - Date de réception
  - Statut (nouveau, lu, traité)
  - Langue du message
- ✅ Filtres :
  - Par statut
  - Par date
  - Par langue
- ✅ Actions :
  - Marquer comme lu
  - Répondre (ouvre client email)
  - Archiver
  - Supprimer
- ✅ Notifications :
  - Email lors d'un nouveau message
  - Badge sur le dashboard

**Interface** :
```
┌─────────────────────────────────────┐
│ Messages [Tous ▼] [Rechercher...]  │
├─────────────────────────────────────┤
│ 🔵 Marie Dubois - 09/04/2026 10:30 │
│    "Je souhaite des infos sur..."   │
│    [👁️ Voir] [✉️ Répondre] [🗑️]      │
├─────────────────────────────────────┤
│ ⚪ Sophie Martin - 08/04/2026 15:20│
│    "Quels sont vos tarifs..."       │
│    [👁️ Voir] [✉️ Répondre] [🗑️]      │
└─────────────────────────────────────┘
```

---

### 8. 💬 Modération des Commentaires

**Fonctionnalités** :
- ✅ Liste des commentaires :
  - En attente de modération
  - Approuvés
  - Rejetés
- ✅ Actions :
  - Approuver
  - Rejeter
  - Répondre
  - Supprimer
- ✅ Filtres anti-spam automatiques
- ✅ Notifications des nouveaux commentaires

---

### 9. ⚙️ Paramètres

#### 9.1 Informations Générales
- Nom du site
- Adresse (Bratislava)
- Téléphone / WhatsApp
- Email de contact
- Horaires d'ouverture

#### 9.2 Réseaux Sociaux
- Liens Instagram, YouTube, Facebook, etc.
- Afficher/Masquer chaque réseau

#### 9.3 SEO
- Meta titre (4 langues)
- Meta description (4 langues)
- Mots-clés
- Google Analytics ID

#### 9.4 Langues
- Langue par défaut
- Activer/Désactiver des langues

#### 9.5 Sécurité
- Changer mot de passe
- Activer 2FA
- Historique des connexions

---

## 🛠️ Technologies Recommandées

### Option 1 : CMS Headless (Recommandé)
**Strapi** (Open Source, gratuit)
- ✅ Interface admin moderne
- ✅ API REST/GraphQL automatique
- ✅ Gestion médias intégrée
- ✅ Multilingue natif
- ✅ Rôles et permissions
- ✅ Facile à héberger

**Avantages** :
- Pas besoin de coder l'admin
- Sécurisé par défaut
- Évolutif
- Documentation complète

### Option 2 : CMS Traditionnel
**WordPress** avec plugins
- ✅ Très populaire
- ✅ Nombreux plugins
- ✅ WPML pour multilingue

**Inconvénients** :
- Plus lourd
- Moins moderne
- Nécessite maintenance

### Option 3 : Custom (Développement sur mesure)
**Stack technique** :
- **Backend** : Node.js + Express
- **Base de données** : MongoDB ou PostgreSQL
- **Frontend Admin** : React Admin ou Vue.js
- **Upload** : Multer + Cloudinary/AWS S3
- **Auth** : JWT + bcrypt

**Avantages** :
- 100% personnalisé
- Contrôle total

**Inconvénients** :
- Plus long à développer
- Maintenance à prévoir

---

## 📊 Architecture Proposée (avec Strapi)

```
┌─────────────────────────────────────────┐
│         Site Public (Frontend)          │
│    alinacoaching.com                    │
│    (HTML/CSS/JS - 4 langues)           │
└──────────────┬──────────────────────────┘
               │ API REST/GraphQL
               │
┌──────────────▼──────────────────────────┐
│         Strapi CMS (Backend)            │
│    alinacoaching.com/admin              │
│    - Gestion contenu                    │
│    - Upload médias                      │
│    - API automatique                    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Base de Données                 │
│    (PostgreSQL ou MongoDB)              │
│    - Contenu multilingue                │
│    - Médias                             │
│    - Utilisateurs                       │
└─────────────────────────────────────────┘
```

---

## 🚀 Plan de Développement Admin

### Phase 1 : Setup (Semaine 1)
- [ ] Installation et configuration Strapi
- [ ] Configuration base de données
- [ ] Création des modèles de contenu (Content Types)
- [ ] Configuration multilingue

### Phase 2 : Gestion Médias (Semaine 2)
- [ ] Configuration upload photos
- [ ] Intégration Cloudinary (stockage cloud)
- [ ] Gestion vidéos (liens)
- [ ] Upload logo

### Phase 3 : Gestion Contenu (Semaine 3)
- [ ] Éditeur de textes multilingues
- [ ] Gestion services/programmes
- [ ] Gestion tarifs
- [ ] Gestion partenariats

### Phase 4 : Interactions (Semaine 4)
- [ ] Système de témoignages
- [ ] Formulaire de contact (backend)
- [ ] Modération commentaires
- [ ] Notifications email

### Phase 5 : Sécurité & Finalisation (Semaine 5)
- [ ] Authentification sécurisée
- [ ] Rôles et permissions
- [ ] Backup automatique
- [ ] Documentation utilisateur

---

## 📚 Documentation Utilisateur

Un guide complet sera créé avec :
- 📖 Comment se connecter
- 📸 Comment uploader des photos
- 🎥 Comment ajouter des vidéos
- ✏️ Comment modifier les textes
- 💬 Comment gérer les témoignages
- 📧 Comment répondre aux messages
- ⚙️ Comment configurer les paramètres

---

## 💡 Fonctionnalités Avancées (Phase 2)

### Statistiques Avancées
- Google Analytics intégré
- Heatmaps (où cliquent les visiteurs)
- Taux de conversion

### Automatisation
- Publication programmée
- Emails automatiques
- Backup automatique quotidien

### Marketing
- Newsletter intégrée
- Codes promo
- Suivi des conversions

---

## 💰 Estimation des Coûts

### Hébergement
- **Strapi + Base de données** : 10-20€/mois (Heroku, DigitalOcean)
- **Stockage médias** : Gratuit jusqu'à 10GB (Cloudinary)
- **Domaine** : 10-15€/an

### Développement
- **Avec Strapi** : 2-3 semaines de développement
- **Custom** : 6-8 semaines de développement

---

## ✅ Checklist Avant Lancement Admin

- [ ] Interface admin accessible et sécurisée
- [ ] Tous les types de contenu créés
- [ ] Upload de médias fonctionnel
- [ ] Multilingue opérationnel
- [ ] Formulaire de contact connecté
- [ ] Notifications email configurées
- [ ] Backup automatique activé
- [ ] Documentation utilisateur rédigée
- [ ] Formation admin effectuée
- [ ] Tests de sécurité passés

---

**Date de création** : 9 avril 2026  
**Version** : 1.0  
**Statut** : Spécifications Admin complètes