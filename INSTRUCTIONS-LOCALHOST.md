# Localhost JSON Admin - Instructions

## Prérequis
- Node.js installé

## Lancement
Depuis le dossier `coaching-website` :

```bash
npm start
```

## URLs
- Site public : http://localhost:3000/index.html
- Admin : http://localhost:3000/admin.html
- API contenu JSON : http://localhost:3000/api/content

## Persistance
Les données sont stockées dans :

```text
data/site-content.json
```

## Fonctionnement actuel
- le serveur local sert le site
- le serveur expose une API JSON locale
- la lecture du contenu est disponible via `GET /api/content`
- la sauvegarde du contenu est disponible via `PUT /api/content`

## Mise en production - Points importants

### 1. Sécurité CORS (.htaccess)
⚠️ **IMPORTANT** : Avant la mise en production, modifier le fichier `.htaccess` ligne 23-28 :

```apache
# Remplacer ceci :
Header set Access-Control-Allow-Origin "*"

# Par ceci (avec votre domaine) :
Header set Access-Control-Allow-Origin "https://votre-domaine.com"
```

### 2. Permissions du dossier images/gallery/
Vérifier que le dossier a les bonnes permissions :
```bash
chmod 755 images/gallery/
```

### 3. Configuration PHP
Vérifier que votre hébergeur supporte :
- PHP 7.4+ avec extension GD (pour l'optimisation d'images)
- upload_max_filesize >= 5M
- post_max_size >= 6M

### 4. Test de l'upload
Après déploiement, tester l'upload d'image via l'admin pour vérifier :
- Les permissions du dossier
- Le fonctionnement de `upload-image.php`
- L'optimisation des images

## Étape suivante
Il reste à brancher l'admin (`admin.html` / `js/admin.js`) pour :
- charger le JSON depuis `/api/content`
- modifier les sections
- enregistrer les changements dans `data/site-content.json`