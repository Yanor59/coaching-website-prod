# 🏋️‍♀️ Alina Coaching Bratislava - Spécifications du Site Web

## 📋 Vue d'ensemble
Site web multilingue pour un coaching fitness féminin basé à Bratislava, proposant des programmes de remise en forme et de bien-être.

---

## 🎯 Objectifs du Site
1. Présenter Alina et son approche du coaching fitness
2. Montrer des exemples de formations et exercices
3. Intégrer du contenu vidéo (Instagram/YouTube)
4. Permettre aux clientes de prendre contact
5. Mettre en avant les partenariats avec d'autres coachs
6. Créer une communauté via les commentaires

---

## 👥 Public Cible
- **Principal** : Femmes souhaitant se remettre en forme
- **Localisation** : Bratislava et environs (+ international via online)
- **Âge** : 25-55 ans (estimation)
- **Besoins** : Remise en forme, bien-être, accompagnement personnalisé

---

## 🌍 Langues (Multilingue)
1. 🇺🇦 **Ukrainien** (langue maternelle d'Alina)
2. 🇸🇰 **Slovaque** (marché local Bratislava)
3. 🇬🇧 **Anglais** (international)
4. 🇫🇷 **Français** (marché francophone)

**Implémentation** : Sélecteur de langue visible en haut du site

---

## 🎨 Identité Visuelle

### Palette de Couleurs (Thème Relaxant & Calme)
- **Couleur principale** : Vert sauge / Bleu pastel (#8FB9A8 ou #A8DADC)
- **Couleur secondaire** : Rose poudré / Pêche doux (#F1C6B8 ou #FFB5A7)
- **Couleur d'accent** : Corail doux (#FF8B94)
- **Neutre** : Beige clair / Blanc cassé (#F8F5F2)
- **Texte** : Gris anthracite (#2D3142)

### Style
- ✨ Sobre et élégant
- 🧘‍♀️ Apaisant et relaxant
- 💪 Motivant sans être agressif
- 🌸 Féminin mais pas trop girly
- 📱 Moderne et épuré

### Typographie
- **Titres** : Police moderne et douce (ex: Poppins, Montserrat)
- **Corps** : Police lisible (ex: Open Sans, Roboto)

---

## 📄 Structure du Site

### 1. 🏠 Page d'Accueil (Hero)
- Photo/vidéo d'Alina en action
- Slogan accrocheur multilingue
- Bouton CTA : "Réserver une séance" / "Commencer maintenant"
- Aperçu des services principaux

### 2. 👤 À Propos / Qui suis-je
- Photo professionnelle d'Alina
- Parcours et certifications
- Philosophie de coaching
- Pourquoi choisir Alina

### 3. 💪 Services / Programmes
**Types de séances** :
- Coaching individuel (1-to-1)
- Séances en petit groupe
- Programmes en ligne
- Programmes spécialisés (post-partum, débutantes, etc.)

**Format** :
- En présentiel (Bratislava)
- En ligne (visio)
- Hybride

### 4. 📹 Galerie / Exemples de Formations
- **Vidéos intégrées** :
  - Embed Instagram (posts/reels)
  - Embed YouTube (tutoriels, témoignages)
- **Photos avant/après** (avec consentement)
- **Exemples d'exercices** en images/vidéos courtes
- **Programmes types** avec descriptions

### 5. 🤝 Partenariats
- Section dédiée aux coachs partenaires
- Photos et descriptions des collaborateurs
- Types de collaborations (événements, workshops)

### 6. 💬 Témoignages & Commentaires
- **Témoignages clients** :
  - Photos + texte
  - Vidéos témoignages (si disponibles)
- **Section commentaires** :
  - Système de commentaires modérés
  - Possibilité de laisser un avis
  - Note/étoiles (optionnel)

### 7. 💰 Tarifs
- Grille tarifaire claire
- Packs et abonnements
- Offres spéciales / promotions
- Possibilité de paiement en ligne (futur)

### 8. 📝 Blog / Actualités (Optionnel Phase 2)
- Conseils fitness
- Recettes santé
- Actualités du studio
- Événements à venir

### 9. 📞 Contact
- **Formulaire de contact** :
  - Nom, Email, Téléphone
  - Type de service souhaité
  - Message
  - Langue préférée
- **Informations** :
  - Adresse (Bratislava)
  - Téléphone / WhatsApp
  - Email
  - Réseaux sociaux
- **Carte Google Maps** (localisation studio)

---

## ⚙️ Fonctionnalités Techniques

### Phase 1 (MVP - Minimum Viable Product)
- [x] Site multilingue (4 langues)
- [x] Design responsive (mobile-first)
- [x] Sélecteur de langue
- [x] Formulaire de contact
- [x] Intégration vidéos Instagram/YouTube
- [x] Galerie photos
- [x] Section témoignages
- [ ] **Interface Admin (CMS)**
- [ ] Système de commentaires simple

### Phase 2 (Améliorations)
- [ ] Réservation en ligne (Calendly ou custom)
- [ ] Paiement en ligne (Stripe/PayPal)
- [ ] Espace membre/client
- [ ] Blog avec CMS
- [ ] Newsletter
- [ ] Chat en direct (WhatsApp Business)

### Phase 3 (Avancé)
- [ ] Application mobile
- [ ] Programmes d'entraînement en ligne
- [ ] Suivi de progression client
- [ ] Communauté privée

---

## 🔧 Technologies Proposées

### Frontend
- **HTML5** : Structure sémantique
- **CSS3** : Animations, Grid, Flexbox
- **JavaScript** : Interactivité, changement de langue
- **Framework CSS** (optionnel) : Bootstrap ou Tailwind

### Multilingue
- **Option 1** : Fichiers JSON pour les traductions
- **Option 2** : i18next (bibliothèque JS)
- **Option 3** : Pages séparées par langue

### Intégrations
- **Instagram API** : Affichage automatique des posts
- **YouTube API** : Embed vidéos
- **Google Maps API** : Carte interactive
- **Commentaires** : Disqus ou système custom

### Hébergement
- **Netlify** ou **Vercel** (gratuit, facile)
- **GitHub Pages** (gratuit)
- **Hébergement classique** (OVH, etc.)

---

## 📱 Réseaux Sociaux à Intégrer
- 📸 Instagram (principal)
- 🎥 YouTube
- 📘 Facebook (optionnel)
- 💼 LinkedIn (optionnel)
- 💬 WhatsApp Business (contact direct)

---

## 🎯 Parcours Utilisateur Type

### Scénario 1 : Nouvelle Cliente
1. Arrive sur la page d'accueil
2. Sélectionne sa langue (slovaque)
3. Découvre les services
4. Regarde des vidéos d'exemples
5. Lit les témoignages
6. Remplit le formulaire de contact
7. Reçoit une réponse d'Alina

### Scénario 2 : Cliente Intéressée
1. Voit une vidéo Instagram
2. Clique sur le lien du site
3. Consulte les tarifs
4. Vérifie la localisation
5. Réserve une séance (Phase 2)

---

## 📊 Métriques de Succès
- Nombre de visiteurs uniques
- Taux de conversion (formulaires remplis)
- Engagement sur les vidéos
- Temps passé sur le site
- Taux de rebond
- Réservations effectuées

---

## 🚀 Plan de Développement

### Sprint 1 (Semaine 1-2)
- [x] Spécifications détaillées
- [ ] Design mockups (Figma optionnel)
- [ ] Structure HTML de base
- [ ] Système multilingue
- [ ] Design CSS (couleurs, typographie)

### Sprint 2 (Semaine 3-4)
- [ ] Page d'accueil complète
- [ ] Section À propos
- [ ] Section Services
- [ ] Intégration vidéos

### Sprint 3 (Semaine 5-6)
- [ ] Galerie photos/vidéos
- [ ] Témoignages
- [ ] Formulaire de contact
- [ ] Section partenariats

### Sprint 4 (Semaine 7-8)
- [ ] Tarifs
- [ ] Optimisation mobile
- [ ] Tests multilingues
- [ ] Déploiement

---

## 📝 Contenu à Préparer

### Textes (4 langues)
- [ ] Slogan/accroche
- [ ] Biographie Alina
- [ ] Descriptions des services
- [ ] Témoignages clients
- [ ] Mentions légales / CGV

### Médias
- [ ] Photos professionnelles d'Alina
- [ ] Photos du studio/lieu
- [ ] Vidéos d'exercices
- [ ] Logo (si existant)
- [ ] Photos avant/après (avec autorisation)

### Informations
- [ ] Adresse exacte
- [ ] Horaires
- [ ] Tarifs détaillés
- [ ] Liens réseaux sociaux

---

## ✅ Checklist Avant Lancement
- [ ] Toutes les pages traduites dans les 4 langues
- [ ] Formulaire de contact testé
- [ ] Vidéos chargent correctement
- [ ] Site responsive sur tous appareils
- [ ] Vitesse de chargement optimisée
- [ ] SEO de base configuré
- [ ] Google Analytics installé
- [ ] Mentions légales / RGPD
- [ ] Certificat SSL (HTTPS)
- [ ] Nom de domaine configuré

---

## 💡 Idées Futures
- Programme d'affiliation
- Boutique en ligne (vêtements, accessoires)
- Challenges fitness mensuels
- Webinaires gratuits
- Podcast bien-être
- Application mobile dédiée

---

**Date de création** : 9 avril 2026  
**Dernière mise à jour** : 9 avril 2026  
**Version** : 1.0  
**Statut** : Spécifications validées - Prêt pour développement