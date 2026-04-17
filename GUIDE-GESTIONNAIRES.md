# 📚 Guide des Gestionnaires Dynamiques

Ce guide explique comment utiliser les trois nouveaux gestionnaires de contenu dynamique dans l'interface d'administration.

## 📋 Table des matières

1. [Gestionnaire de Partenariats](#-gestionnaire-de-partenariats)
2. [Gestionnaire de Tarifs](#-gestionnaire-de-tarifs)
3. [Gestionnaire de Témoignages](#-gestionnaire-de-témoignages)
4. [Masquage automatique des sections](#-masquage-automatique-des-sections)

---

## 🤝 Gestionnaire de Partenariats

### Accès
Dans le menu admin : **Partenariats** (icône 🤝)

### Fonctionnalités

#### Ajouter un partenaire
1. Cliquez sur **"➕ Ajouter un partenaire"**
2. Remplissez les informations :
   - **Nom** * (requis)
   - **Spécialité** * (requis) - Ex: "Coach sportif", "Nutritionniste"
   - **Site web** (optionnel) - URL complète
   - **Image** (optionnel) - Chemin vers l'image
3. Ajoutez la **description** dans les 4 langues (FR, EN, SK, UA)
4. Cliquez sur **"💾 Enregistrer"**

#### Modifier un partenaire
1. Cliquez sur l'icône **✏️** sur la carte du partenaire
2. Modifiez les informations
3. Enregistrez

#### Supprimer un partenaire
1. Cliquez sur l'icône **🗑️**
2. Confirmez la suppression

#### Réorganiser les partenaires
- Utilisez les boutons **↑** (monter) et **↓** (descendre)
- L'ordre est sauvegardé automatiquement

### Limitations
- **Maximum 10 partenaires**
- Si aucun partenaire n'est ajouté, la section ne s'affiche pas sur le site

---

## 💰 Gestionnaire de Tarifs

### Accès
Dans le menu admin : **Tarifs** (icône 💰)

### Fonctionnalités

#### Ajouter un tarif
1. Cliquez sur **"➕ Ajouter un tarif"**
2. Remplissez les informations communes :
   - **Prix** * (requis) - En euros
   - **Prix original** (optionnel) - Pour afficher une promotion avec réduction
   - **Durée** (optionnel) - Ex: "mois", "séance", "an"
   - **Marquer comme populaire** - Ajoute un badge "⭐ Populaire"
3. Pour chaque langue (FR, EN, SK, UA) :
   - **Nom de l'offre** * (requis)
   - **Description** * (requis)
   - **Avantages inclus** (optionnel) - Un avantage par ligne
4. Cliquez sur **"💾 Enregistrer"**

#### Promotions
Pour afficher une promotion :
1. Entrez le **Prix original** (prix barré)
2. Entrez le **Prix** actuel (prix réduit)
3. Le pourcentage de réduction sera calculé automatiquement

Exemple :
- Prix original : 100€
- Prix : 80€
- Affichage : ~~100€~~ **-20%** 80€

#### Modifier un tarif
1. Cliquez sur l'icône **✏️** sur la carte du tarif
2. Modifiez les informations
3. Enregistrez

#### Supprimer un tarif
1. Cliquez sur l'icône **🗑️**
2. Confirmez la suppression

#### Réorganiser les tarifs
- Utilisez les boutons **↑** (monter) et **↓** (descendre)
- L'ordre est sauvegardé automatiquement

### Limitations
- Si aucun tarif n'est ajouté, la section ne s'affiche pas sur le site

---

## 💬 Gestionnaire de Témoignages

### Accès
Dans le menu admin : **Témoignages** (icône 💬)

### Fonctionnalités

#### Système de modération
Le gestionnaire de témoignages inclut un système de modération avec 3 statuts :
- **⏳ En attente** - Témoignages non encore modérés
- **✅ Approuvé** - Témoignages visibles sur le site
- **❌ Rejeté** - Témoignages refusés (non visibles)

#### Statistiques
En haut de la page, vous voyez :
- Total de témoignages
- Nombre en attente
- Nombre approuvés
- Nombre rejetés

#### Filtres
Utilisez les boutons de filtre pour afficher :
- **📋 Tous** - Tous les témoignages
- **⏳ En attente** - Seulement ceux à modérer
- **✅ Approuvés** - Seulement ceux visibles sur le site
- **❌ Rejetés** - Seulement ceux refusés

#### Ajouter un témoignage manuellement
1. Cliquez sur **"➕ Ajouter un témoignage"**
2. Remplissez les informations :
   - **Auteur** * (requis)
   - **Rôle/Profession** (optionnel) - Ex: "Cliente depuis 2 ans"
   - **Note** - De 1 à 5 étoiles (défaut: 5)
   - **Statut** * - En attente / Approuvé / Rejeté
   - **Date** (optionnel)
3. Ajoutez le **texte du témoignage** dans les 4 langues
4. Cliquez sur **"💾 Enregistrer"**

#### Modérer un témoignage
Sur chaque carte de témoignage, vous pouvez :
- **✅** Approuver - Le témoignage devient visible sur le site
- **❌** Rejeter - Le témoignage est masqué du site
- **⏳** Mettre en attente - Retour au statut "en attente"
- **✏️** Modifier - Éditer le contenu
- **🗑️** Supprimer - Supprimer définitivement

#### Modifier un témoignage
1. Cliquez sur l'icône **✏️**
2. Modifiez les informations
3. Enregistrez

#### Supprimer un témoignage
1. Cliquez sur l'icône **🗑️**
2. Confirmez la suppression

### Important
- **Seuls les témoignages "Approuvés" sont visibles sur le site public**
- Si aucun témoignage n'est approuvé, la section ne s'affiche pas sur le site
- Les témoignages ne sont plus modifiables depuis l'éditeur de contenu (section dédiée uniquement)

---

## 🎭 Masquage automatique des sections

### Principe
Les sections **Partenariats**, **Tarifs** et **Témoignages** sont automatiquement masquées du site public si elles sont vides :

#### Partenariats
- **Masqué si** : Aucun partenaire ajouté
- **Visible si** : Au moins 1 partenaire

#### Tarifs
- **Masqué si** : Aucun tarif ajouté
- **Visible si** : Au moins 1 tarif

#### Témoignages
- **Masqué si** : Aucun témoignage avec le statut "Approuvé"
- **Visible si** : Au moins 1 témoignage approuvé

### Avantages
- Site toujours propre et professionnel
- Pas de sections vides visibles
- Activation progressive des fonctionnalités
- Pas besoin de gérer manuellement la visibilité

---

## 🌍 Multilingue

Tous les gestionnaires supportent les 4 langues du site :
- 🇫🇷 Français (FR)
- 🇬🇧 English (EN)
- 🇸🇰 Slovenčina (SK)
- 🇺🇦 Українська (UA)

### Bonnes pratiques
1. **Toujours remplir le français en premier** - C'est la langue principale
2. **Utiliser la traduction automatique** - Disponible dans l'éditeur de contenu pour les sections textuelles
3. **Vérifier les traductions** - La traduction automatique est un point de départ, vérifiez toujours
4. **Cohérence** - Gardez le même ton et style dans toutes les langues

---

## 💡 Conseils d'utilisation

### Partenariats
- Limitez-vous à vos partenaires les plus importants (max 10)
- Utilisez des images de bonne qualité
- Ajoutez un lien vers leur site web si possible
- Décrivez brièvement leur spécialité

### Tarifs
- Soyez clair et transparent sur les prix
- Utilisez les promotions avec parcimonie
- Marquez votre offre principale comme "Populaire"
- Listez les avantages de manière concise
- Réorganisez pour mettre en avant votre meilleure offre

### Témoignages
- Modérez rapidement les nouveaux témoignages
- N'approuvez que les témoignages authentiques
- Variez les profils (âge, objectifs, durée)
- Gardez les témoignages courts et impactants
- Mettez à jour régulièrement

---

## 🔧 Dépannage

### La section ne s'affiche pas sur le site
1. Vérifiez qu'il y a au moins un élément ajouté
2. Pour les témoignages, vérifiez qu'au moins un est "Approuvé"
3. Actualisez la page du site (Ctrl+F5)

### Les modifications ne sont pas visibles
1. Vérifiez que vous avez cliqué sur "Enregistrer"
2. Attendez quelques secondes pour la synchronisation
3. Actualisez la page du site

### Erreur lors de la sauvegarde
1. Vérifiez votre connexion internet
2. Vérifiez que tous les champs requis (*) sont remplis
3. Réessayez après quelques secondes

---

## 📞 Support

Pour toute question ou problème :
1. Consultez d'abord ce guide
2. Vérifiez les messages d'erreur affichés
3. Contactez le support technique si nécessaire

**Version du guide :** 1.0  
**Dernière mise à jour :** Avril 2026