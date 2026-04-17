# 📅 Guide de Gestion des Événements

## Vue d'ensemble

Le système de gestion des événements vous permet d'ajouter, modifier, activer/désactiver et supprimer facilement des événements sur votre site dans les 4 langues (FR, EN, SK, UA).

---

## 🚀 Accéder au Gestionnaire d'Événements

1. Ouvrez l'interface admin : `http://localhost:3000/admin.html`
2. Dans la barre latérale, cliquez sur **📅 Événements**
3. Le gestionnaire d'événements s'affiche avec tous vos événements actuels

---

## ➕ Ajouter un Nouvel Événement

### Étape 1 : Sélectionner la langue
- En haut de la page, choisissez la langue dans laquelle vous voulez créer l'événement
- **Important** : Vous devrez créer l'événement dans chaque langue séparément

### Étape 2 : Cliquer sur "Ajouter un événement"
- Cliquez sur le bouton **➕ Ajouter un événement**
- Un formulaire s'ouvre

### Étape 3 : Remplir les informations
Remplissez tous les champs obligatoires (*) :

| Champ | Description | Exemple |
|-------|-------------|---------|
| **Jour*** | Numéro du jour | `18` |
| **Mois*** | Nom du mois | `Mai` (FR), `May` (EN), `Máj` (SK), `Травень` (UA) |
| **Catégorie*** | Type d'événement | `Yoga au parc` |
| **Titre*** | Titre principal | `Session outdoor au lever du soleil` |
| **Heure*** | Heure de l'événement | `10h00` |
| **Lieu*** | Localisation | `Parc de Bratislava` |
| **Description*** | Description détaillée | `Une séance accessible à toutes pour bouger en plein air...` |
| **Lien du bouton** | URL du bouton (optionnel) | `#contact` (par défaut) |
| **Texte du bouton** | Texte affiché (optionnel) | `Réserver` (par défaut) |

### Étape 4 : Enregistrer
- Cliquez sur **💾 Ajouter**
- L'événement apparaît immédiatement dans la liste
- Une notification confirme l'enregistrement

### Étape 5 : Traduire dans les autres langues (FACILE !)

**Méthode automatique (Recommandée)** :
1. Cliquez sur le bouton **🌍 Traduire** sous l'événement
2. Sélectionnez la langue cible (ex: English)
3. Le formulaire s'ouvre pré-rempli avec les données de l'événement
4. Traduisez les champs (titre, description, etc.)
5. Cliquez sur **💾 Enregistrer**
6. ✅ La traduction est créée avec le même ID !

**Méthode manuelle** :
- Changez de langue en haut de la page
- Répétez les étapes 2-4 pour créer le même événement dans les autres langues
- ⚠️ Attention : l'ID sera différent, donc pas de correspondance automatique

---

## ✏️ Modifier un Événement

1. Dans la liste des événements, trouvez l'événement à modifier
2. Cliquez sur le bouton **✏️ Modifier**
3. Le formulaire s'ouvre avec les informations actuelles
4. Modifiez les champs souhaités
5. Cliquez sur **💾 Enregistrer**
6. Les modifications sont appliquées immédiatement

---

## 🚫 Activer / Désactiver un Événement

Vous pouvez désactiver temporairement un événement sans le supprimer :

1. Trouvez l'événement dans la liste
2. Cliquez sur le bouton **🚫 Désactiver** (ou **✅ Activer** s'il est déjà désactivé)
3. L'événement devient grisé et n'apparaît plus sur le site public
4. Pour le réactiver, cliquez à nouveau sur **✅ Activer**

**Avantage** : Vous pouvez réactiver l'événement plus tard sans avoir à le recréer.

---

## 🗑️ Supprimer un Événement

⚠️ **Attention** : La suppression est définitive !

1. Trouvez l'événement dans la liste
2. Cliquez sur le bouton **🗑️ Supprimer**
3. Confirmez la suppression dans la boîte de dialogue
4. L'événement est supprimé immédiatement

**Note** : Vous devez supprimer l'événement dans chaque langue séparément.

---

## 🌍 Gestion Multilingue

### Principe
Chaque langue a sa propre liste d'événements indépendante. Cela vous permet de :
- Adapter les dates selon les formats locaux
- Traduire correctement les noms de mois
- Personnaliser les descriptions pour chaque public

### 🎯 Système de Fallback Intelligent avec ID Unique (Nouveau !)

**Bonne nouvelle** : Vous n'êtes plus obligé de créer l'événement dans toutes les langues !

Le système utilise maintenant un **fallback intelligent avec correspondance par ID** :
- Chaque événement reçoit automatiquement un **ID unique** lors de sa création
- Quand vous modifiez un événement, il garde le même ID
- Le système sait quels événements sont des traductions les uns des autres
- Les visiteurs voient les événements dans leur langue, ou en fallback s'ils ne sont pas traduits

**Comment ça marche** :

1. **Création** : Vous créez un événement en français → il reçoit un ID (ex: `evt_1234567890_abc`)
2. **Traduction** : Vous créez le "même" événement en anglais → il reçoit le MÊME ID
3. **Affichage** :
   - Visiteur français → Voit la version française ✅
   - Visiteur anglais → Voit la version anglaise ✅
   - Visiteur slovaque → Voit la version française (fallback) ✅
   - Visiteur ukrainien → Voit la version française (fallback) ✅

**Indicateurs visuels dans l'admin** :

Chaque événement affiche des badges de traduction :
- 🇫🇷 🇬🇧 🇸🇰 🇺🇦 (vert = traduit, gris = non traduit)
- Vous voyez d'un coup d'œil quelles langues sont disponibles

**Exemples concrets** :

**Scénario 1** : Un événement, deux traductions (FR + EN)
- Vous créez "Yoga au parc" en FR
- Vous créez "Yoga in the park" en EN (même événement)
- Résultat :
  - Visiteur FR → "Yoga au parc" ✅
  - Visiteur EN → "Yoga in the park" ✅
  - Visiteur SK → "Yoga au parc" (fallback FR) ✅
  - Visiteur UA → "Yoga au parc" (fallback FR) ✅

**Scénario 2** : Deux événements différents
- Événement A : "Yoga" (FR + EN)
- Événement B : "Pilates" (FR uniquement)
- Résultat pour visiteur EN :
  - Voit "Yoga" en anglais ✅
  - Voit "Pilates" en français (fallback) ✅

**Scénario 3** : Trois événements, traductions partielles
- Événement A : FR + EN + SK + UA (complet)
- Événement B : FR + EN (partiel)
- Événement C : FR uniquement
- Résultat pour visiteur SK :
  - Voit événement A en slovaque ✅
  - Voit événement B en français (fallback) ✅
  - Voit événement C en français (fallback) ✅

**Avantage** : Le système affiche intelligemment les bonnes versions et évite les doublons !

### Workflow recommandé

#### Option 1 : Traduction progressive (Recommandé)
1. **Créez l'événement en français** (il sera visible dans toutes les langues)
2. **Traduisez progressivement** dans les autres langues quand vous avez le temps
3. Les visiteurs verront toujours quelque chose, même si ce n'est pas traduit

#### Option 2 : Traduction complète
1. **Créez l'événement en français**
2. **Changez de langue** avec les onglets en haut
3. **Créez immédiatement** le même événement dans les autres langues
4. **Vérifiez** que tous les événements sont bien créés

### Astuce
Pour vérifier rapidement :
- Cliquez sur chaque onglet de langue
- Les événements non traduits apparaîtront en français
- Vous pouvez les identifier facilement et les traduire si nécessaire

---

## 📋 Bonnes Pratiques

### Format des dates
- **Jour** : Utilisez uniquement le numéro (ex: `18`, pas `18ème`)
- **Mois** : Écrivez le nom complet du mois dans la langue appropriée
  - FR : `Janvier`, `Février`, `Mars`, etc.
  - EN : `January`, `February`, `March`, etc.
  - SK : `Január`, `Február`, `Marec`, etc.
  - UA : `Січень`, `Лютий`, `Березень`, etc.

### Format de l'heure
- Utilisez le format local de chaque pays
  - FR : `10h00` ou `14h30`
  - EN : `10:00 AM` ou `2:30 PM`
  - SK : `10:00` ou `14:30`
  - UA : `10:00` ou `14:30`

### Descriptions
- Soyez concis mais informatif
- Mentionnez le niveau requis si applicable
- Indiquez s'il faut réserver à l'avance
- Maximum 2-3 phrases

### Catégories
Exemples de catégories :
- `Yoga au parc` / `Yoga in the park`
- `Atelier nutrition` / `Nutrition workshop`
- `Séance découverte` / `Discovery session`
- `Bootcamp outdoor` / `Outdoor bootcamp`

---

## 🔍 Vérification sur le Site

Après avoir ajouté ou modifié des événements :

1. Cliquez sur **👁️ Voir le site** en haut à droite de l'admin
2. Faites défiler jusqu'à la section **Événements**
3. Vérifiez que vos événements s'affichent correctement
4. Testez le changement de langue avec les drapeaux en haut
5. Vérifiez que les événements sont bien traduits

---

## ❓ Questions Fréquentes

### Q : Combien d'événements puis-je créer ?
**R :** Il n'y a pas de limite technique, mais pour une meilleure lisibilité, nous recommandons 3-5 événements maximum.

### Q : Les événements passés disparaissent-ils automatiquement ?
**R :** Non, vous devez les supprimer ou les désactiver manuellement.

### Q : Puis-je ajouter des images aux événements ?
**R :** Pas pour le moment. Les événements utilisent un design uniforme avec des badges de date colorés.

### Q : Que se passe-t-il si je ne crée pas l'événement dans toutes les langues ?
**R :** Grâce au système de fallback avec ID, l'événement apparaîtra dans une autre langue disponible (priorité : FR → EN → SK → UA). Les visiteurs verront donc toujours vos événements, et le système évite les doublons grâce aux IDs uniques !

### Q : Comment le système sait-il que deux événements sont des traductions ?
**R :** Grâce au bouton "🌍 Traduire" ! Quand vous l'utilisez, l'événement traduit reçoit automatiquement le même ID que l'original. Le système sait alors qu'ils sont liés. Si vous créez manuellement, les IDs seront différents et il n'y aura pas de correspondance.

### Q : Dois-je utiliser le bouton "Traduire" obligatoirement ?
**R :** Non, mais c'est **fortement recommandé** ! Le bouton garantit que les traductions sont liées (même ID), pré-remplit le formulaire (gain de temps), et met à jour les badges automatiquement. Sans lui, vous devrez tout saisir manuellement et les événements ne seront pas liés.

### Q : Comment voir quelles langues sont traduites ?
**R :** Dans l'admin, sous chaque événement, vous voyez des badges de drapeaux : 🇫🇷 🇬🇧 🇸🇰 🇺🇦. Les badges verts indiquent les langues disponibles, les gris les langues manquantes.

### Q : Dans quelle langue dois-je créer mes événements en priorité ?
**R :** Créez-les dans la langue que vous maîtrisez le mieux. Le français est recommandé car c'est la première langue de fallback, mais vous pouvez créer en anglais, slovaque ou ukrainien si vous préférez.

### Q : Comment savoir dans quelle langue un événement est affiché ?
**R :** Ouvrez la console du navigateur (F12) et vous verrez un message détaillé, par exemple : "ℹ️ Showing 3 event(s): 2 in EN, 1 from fallback".

### Q : Que se passe-t-il si je supprime un événement dans une langue ?
**R :** Seule la version dans cette langue est supprimée. Les autres traductions restent intactes. Si vous voulez supprimer l'événement complètement, supprimez-le dans toutes les langues.

### Q : Comment changer l'ordre des événements ?
**R :** Les événements sont affichés dans l'ordre où ils ont été créés. Pour changer l'ordre, vous devez actuellement les supprimer et les recréer dans l'ordre souhaité.

### Q : Les modifications sont-elles sauvegardées automatiquement ?
**R :** Oui, dès que vous cliquez sur "Enregistrer", les modifications sont immédiatement sauvegardées dans le fichier `site-content.json`.

---

## 🆘 Besoin d'Aide ?

Si vous rencontrez un problème :

1. **Vérifiez la console du navigateur** (F12) pour voir les erreurs
2. **Rechargez la page** et réessayez
3. **Vérifiez que le serveur est bien démarré** (`npm start`)
4. **Consultez les logs du serveur** dans le terminal

---

## 📝 Exemple Complet

Voici un exemple d'événement complet dans les 4 langues :

### 🇫🇷 Français
- **Jour** : `25`
- **Mois** : `Juin`
- **Catégorie** : `Yoga au parc`
- **Titre** : `Session matinale de yoga`
- **Heure** : `8h00`
- **Lieu** : `Parc Sad Janka Kráľa`
- **Description** : `Commencez votre journée avec une séance de yoga relaxante en plein air. Tous niveaux bienvenus.`

### 🇬🇧 English
- **Jour** : `25`
- **Mois** : `June`
- **Catégorie** : `Yoga in the park`
- **Titre** : `Morning yoga session`
- **Heure** : `8:00 AM`
- **Lieu** : `Sad Janka Kráľa Park`
- **Description** : `Start your day with a relaxing outdoor yoga session. All levels welcome.`

### 🇸🇰 Slovenčina
- **Jour** : `25`
- **Mois** : `Jún`
- **Catégorie** : `Joga v parku`
- **Titre** : `Ranná joga lekcia`
- **Heure** : `8:00`
- **Lieu** : `Park Sad Janka Kráľa`
- **Description** : `Začnite svoj deň relaxačnou joga lekciou vonku. Vítané všetky úrovne.`

### 🇺🇦 Українська
- **Jour** : `25`
- **Mois** : `Червень`
- **Catégorie** : `Йога в парку`
- **Titre** : `Ранкова йога сесія`
- **Heure** : `8:00`
- **Lieu** : `Парк Sad Janka Kráľa`
- **Description** : `Почніть свій день з розслаблюючої йога-сесії на свіжому повітрі. Всі рівні вітаються.`

---

**Bonne gestion de vos événements ! 🎉**

---

*Guide créé avec Bob - Dernière mise à jour : Avril 2026*