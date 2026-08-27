# Suivi SAV Aménagement

Application locale, fichier unique, sans serveur. Toutes les données (texte + photos) restent dans le navigateur jusqu'à export.

## Installation (GitHub Pages, 3 minutes)

1. Créer un nouveau dépôt GitHub (public ou privé).
2. Déposer `index.html` à la racine du dépôt.
3. Aller dans **Settings > Pages**, source = branche `main`, dossier `/root`.
4. Le lien fourni (ex. `https://tonpseudo.github.io/nom-du-repo/`) ouvre l'application sur n'importe quel téléphone ou ordinateur.

Aucune installation locale, aucun compte, aucune base de données : c'est une page web autonome.

## Installation sur téléphone (PWA)

Une fois le lien GitHub Pages ouvert dans le navigateur du téléphone :

- **Android (Chrome)** : menu ⋮ > "Installer l'application" (ou bannière automatique proposée par Chrome).
- **iPhone (Safari)** : bouton Partager > "Sur l'écran d'accueil".

L'application s'ouvre alors en plein écran comme une app native, fonctionne hors-ligne, et affiche une bannière "Mettre à jour" en haut de l'écran dès qu'une nouvelle version est publiée sur le dépôt. Il faut cliquer sur ce bouton pour activer la mise à jour : rien ne s'installe ou ne recharge tout seul en silence.

Fichiers requis à la racine du dépôt pour que l'installation fonctionne : `index.html`, `sw.js`, `manifest.json`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`.

## Utilisation

1. Renseigner rédacteur / magasin / date.
2. "+ Ajouter un meuble" : référence + photo de vue d'ensemble.
3. Dans le meuble (tiroir dépliable) : "+ Ajouter un SAV" pour chaque défaut (pièce, type, commentaire texte ou dicté, photos).
4. "Exporter fichier" à tout moment pour sauvegarder un `.json` réimportable et modifiable plus tard.
5. "Générer PDF" : crée le rapport (page de garde par meuble + une page par SAV), télécharge aussi le `.json` d'archive, et ouvre Outlook (mailto) avec le texte prêt. **Les pièces jointes ne peuvent pas être ajoutées automatiquement par un lien mailto** : il faut joindre les deux fichiers téléchargés manuellement avant l'envoi.

## Limites à connaître

- Compatible avec tous les navigateurs modernes. La dictée vocale utilise l'API Web Speech, disponible sur Chrome / Edge / Android ; sur iPhone, le micro du clavier natif fonctionne directement dans le champ commentaire, sans passer par le bouton.
- Les données sont conservées automatiquement dans le navigateur (brouillon local) tant que vous ne changez pas d'appareil ou ne videz pas le cache. Pensez à exporter le fichier `.json` régulièrement si le rapport est long.
