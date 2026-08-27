# Suivi SAV Aménagement — V2.00.00

Application locale, fichier unique, sans serveur. Toutes les données (texte + photos) restent dans le navigateur jusqu'à export. Le fichier `.json` exporté sert aussi de support d'échange entre l'animateur, Antoine (responsable showroom) et le bureau d'études.

## Installation (GitHub Pages, 3 minutes)

1. Créer un nouveau dépôt GitHub (public ou privé).
2. Déposer à la racine du dépôt : `index.html`, `sw.js`, `manifest.json`, `users.csv`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`.
3. Aller dans **Settings > Pages**, source = branche `main`, dossier `/root`.
4. Le lien fourni (ex. `https://tonpseudo.github.io/nom-du-repo/`) ouvre l'application sur n'importe quel téléphone ou ordinateur.

## Installation sur téléphone ou ordinateur (PWA)

- **Android (Chrome)** : menu ⋮ > "Installer l'application".
- **iPhone (Safari)** : bouton Partager > "Sur l'écran d'accueil".
- **PC/Mac (Chrome/Edge)** : icône d'installation dans la barre d'adresse.

L'application fonctionne alors hors-ligne et affiche une bannière "Mettre à jour" dès qu'une nouvelle version est publiée sur le dépôt. Rien ne s'installe en silence : il faut cliquer sur le bouton pour activer la mise à jour.

## Comptes utilisateurs (`users.csv`)

Fichier à la racine du dépôt, indépendant de l'application : il n'est jamais modifié par une mise à jour de `index.html` ou `sw.js`.

Format (une ligne par utilisateur) :
```
nom,motdepasse,role
admin,adminquadro,admin
antoine,motdepasse123,utilisateur
```

Pour ajouter, modifier ou supprimer un accès : éditer directement ce fichier dans GitHub (bouton crayon sur la page du fichier) et valider (commit). Effectif immédiatement, sans redéploiement de l'app.

**Important : ceci est une identification, pas une protection.** Le fichier est servi en clair par GitHub Pages et son contenu est visible par quiconque en connaît l'URL ou ouvre les outils de développement du navigateur. Adapté à un usage interne entre personnes de confiance ; ne pas y stocker de mot de passe utilisé ailleurs.

Chaque utilisateur doit se connecter (nom + mot de passe) avant d'ouvrir ou créer un rapport. Son nom est ensuite utilisé automatiquement comme auteur du rapport et de chaque réponse ajoutée dans un fil de discussion, sans ressaisie. Le lien "Changer d'utilisateur" en haut de l'écran permet de se déconnecter (utile sur un poste partagé).

## Utilisation

1. Se connecter.
2. Renseigner auteur (préréempli) / magasin / date.
3. "+ Ajouter un meuble" : référence technique + désignation + photo de vue d'ensemble.
4. Dans le meuble (tiroir dépliable) : "+ Ajouter un SAV" pour chaque défaut (pièce, type, commentaire texte ou dicté, photos — bouton vert pour ajouter plusieurs photos d'un coup).
5. "Exporter le rapport" : popup avec PDF et JSON cochés par défaut. Le partage natif du téléphone/PC s'ouvre pour envoyer directement les fichiers, sinon ils sont téléchargés.

### Circuit de traitement d'un SAV

Le fichier `.json` circule de façon **strictement linéaire** : animateur → Antoine → bureau d'études/usine (ou retour animateur). Un seul destinataire à la fois travaille sur le fichier ; il le retransmet avant que quelqu'un d'autre n'y touche. C'est une règle de process, l'application ne peut pas fusionner deux fichiers modifiés en parallèle.

Quand un destinataire reçoit le `.json`, il se connecte avec son propre compte, l'importe, et peut :
- cliquer **Répondre** sur un SAV pour ajouter un message au fil de discussion (visible à l'écran et dans le PDF, sous les photos) ;
- cliquer **Marquer résolu** quand le point est traité — un filigrane "RÉSOLU" apparaît alors sur la page du SAV dans le PDF ; **Rouvrir** reste possible à tout moment ;
- régénérer le PDF et retransmettre le `.json` mis à jour à l'étape suivante de la chaîne.

Toutes ces actions sont horodatées et attribuées à l'auteur connecté, et s'accumulent dans le fil sans jamais écraser les réponses précédentes.

### Compatibilité entre versions

Chaque fichier exporté embarque un numéro de version de structure. Si un fichier plus récent est importé dans une app plus ancienne, un avertissement s'affiche invitant à mettre à jour (bandeau en haut de l'écran). Les anciens fichiers restent lisibles dans les versions plus récentes.

## Limites à connaître

- Dictée vocale : disponible sur Chrome / Edge / Android. Sur iPhone, utiliser le micro du clavier natif directement dans le champ commentaire.
- Les données sont conservées automatiquement dans le navigateur (brouillon local) tant que vous ne changez pas d'appareil ou ne videz pas le cache. Exportez régulièrement si le rapport est long.
- Numérotation de version de l'app : format V.MM.mm (Version.Majeure.mineure), affiché en haut de l'écran.
