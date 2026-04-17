# 📋 TODO Liste - Mise en Ligne du Site

## 🎯 PRIORITÉ HAUTE - Contenu

- [ ] **Remplacer tous les "Lorem ipsum"** par du vrai contenu
  - [ ] Section About : bio1, bio2
  - [ ] Section Services : descriptions des 3 services
  - [ ] Section Partners : descriptions des 3 partenaires
  - [ ] Section Testimonials : textes des 3 témoignages
  - [ ] Vérifier dans les 4 langues (FR, EN, SK, UA)

- [ ] **Ajouter les vraies images**
  - [ ] Photo d'Alina dans la section About
  - [ ] Photos des partenaires (3 images)
  - [ ] Photos des témoignages (3 images)
  - [ ] Images de la galerie (photos et vidéos)
  - [ ] Image hero/background si nécessaire

- [ ] **Compléter les informations de contact**
  - [ ] Remplacer `alina@coaching-bratislava.com` par le vrai email
  - [ ] Remplacer `+421 XXX XXX XXX` par le vrai numéro
  - [ ] Vérifier l'adresse exacte à Bratislava

- [ ] **Finaliser les certifications**
  - [ ] Section About : cert2 et cert3 sont vides (à compléter ou supprimer)

## 🔧 PRIORITÉ HAUTE - Fonctionnalités

- [ ] **Formulaire de contact fonctionnel**
  - [ ] Option A : Intégrer EmailJS (gratuit, facile)
  - [ ] Option B : Utiliser un service backend (Netlify Forms, Formspree)
  - [ ] Option C : Configurer nodemailer sur le serveur
  - [ ] Tester l'envoi réel d'emails

- [ ] **Hébergement & Déploiement**
  - [ ] Choisir un hébergeur (Netlify, Vercel, ou serveur VPS)
  - [ ] Acheter un nom de domaine (ex: alinacoaching.com)
  - [ ] Configurer le DNS
  - [ ] Déployer le site

- [ ] **Backend pour l'admin**
  - [ ] Décider : garder le système JSON local ou migrer vers une base de données
  - [ ] Si hébergement : adapter server.js pour la production
  - [ ] Ajouter une authentification pour l'admin (login/password)
  - [ ] Sécuriser l'accès à /admin.html

## 🎨 PRIORITÉ MOYENNE - Design & UX

- [ ] **Optimisation des images**
  - [ ] Compresser toutes les images (TinyPNG, Squoosh)
  - [ ] Convertir en WebP pour de meilleures performances
  - [ ] Ajouter des images responsive (srcset)

- [ ] **Performance**
  - [ ] Minifier CSS et JS
  - [ ] Activer la mise en cache
  - [ ] Tester avec Lighthouse (score > 90)
  - [ ] Optimiser le temps de chargement

- [ ] **Responsive**
  - [ ] Tester sur mobile (iPhone, Android)
  - [ ] Tester sur tablette (iPad)
  - [ ] Tester sur différents navigateurs (Chrome, Firefox, Safari, Edge)

- [ ] **Accessibilité**
  - [ ] Vérifier les contrastes de couleurs
  - [ ] Ajouter des attributs alt à toutes les images
  - [ ] Tester la navigation au clavier
  - [ ] Vérifier avec un lecteur d'écran

## 🔒 PRIORITÉ MOYENNE - Sécurité & Légal

- [ ] **RGPD & Légal**
  - [ ] Créer une page "Politique de confidentialité"
  - [ ] Créer une page "Conditions d'utilisation"
  - [ ] Créer une page "Mentions légales"
  - [ ] Ajouter un bandeau cookies si nécessaire
  - [ ] Ajouter un lien de désinscription newsletter

- [ ] **Sécurité**
  - [ ] Configurer HTTPS (certificat SSL)
  - [ ] Ajouter des headers de sécurité
  - [ ] Protéger l'admin avec un mot de passe
  - [ ] Limiter les tentatives de connexion

## 📊 PRIORITÉ BASSE - Marketing & SEO

- [ ] **SEO**
  - [ ] Optimiser les balises meta (title, description)
  - [ ] Ajouter un fichier sitemap.xml
  - [ ] Ajouter un fichier robots.txt
  - [ ] Configurer Google Search Console
  - [ ] Ajouter des balises Open Graph (partage réseaux sociaux)

- [ ] **Analytics**
  - [ ] Intégrer Google Analytics ou alternative
  - [ ] Configurer le suivi des conversions
  - [ ] Ajouter des événements de tracking

- [ ] **Réseaux sociaux**
  - [ ] Ajouter des liens vers les profils sociaux
  - [ ] Créer des boutons de partage
  - [ ] Optimiser les images pour le partage

## 🧪 PRIORITÉ BASSE - Tests & Maintenance

- [ ] **Tests finaux**
  - [ ] Tester tous les liens (internes et externes)
  - [ ] Tester tous les formulaires
  - [ ] Vérifier l'orthographe dans les 4 langues
  - [ ] Tester le changement de langue
  - [ ] Vérifier que toutes les images se chargent

- [ ] **Documentation**
  - [ ] Créer un guide d'utilisation de l'admin
  - [ ] Documenter le processus de mise à jour du contenu
  - [ ] Créer une FAQ pour les questions techniques

- [ ] **Backup & Monitoring**
  - [ ] Configurer des sauvegardes automatiques
  - [ ] Mettre en place un monitoring (uptime)
  - [ ] Configurer des alertes en cas de problème

---

## 🚀 Ordre de priorité recommandé :

1. **Contenu** : Remplacer tous les Lorem ipsum et ajouter les vraies images
2. **Contact** : Rendre le formulaire fonctionnel
3. **Hébergement** : Choisir et configurer l'hébergement
4. **Sécurité** : HTTPS + protection admin
5. **Tests** : Vérifier que tout fonctionne
6. **SEO** : Optimiser pour les moteurs de recherche
7. **Lancement** : Mise en ligne ! 🎉

---

## 💡 Recommandations techniques :

### Pour l'hébergement :
- **Netlify** (recommandé) : Gratuit, facile, formulaires intégrés, HTTPS automatique
- **Vercel** : Similaire à Netlify, excellent pour les sites statiques
- **VPS** (DigitalOcean, Linode) : Plus de contrôle, mais nécessite configuration

### Pour le formulaire de contact :
- **EmailJS** : Gratuit jusqu'à 200 emails/mois, facile à intégrer
- **Netlify Forms** : Intégré si vous utilisez Netlify
- **Formspree** : Alternative simple et gratuite

### Pour l'admin en production :
- **Option 1** : Garder le système JSON + authentification basique
- **Option 2** : Migrer vers un CMS headless (Strapi, Contentful)
- **Option 3** : Utiliser un service comme Netlify CMS

---

**Estimation du temps :**
- Contenu : 2-3 jours
- Configuration technique : 1-2 jours
- Tests et optimisation : 1 jour
- **Total : ~1 semaine de travail**