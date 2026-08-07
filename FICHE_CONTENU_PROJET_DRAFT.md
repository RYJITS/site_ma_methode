# Brouillon contenu fiche - Site Ma Methode

## Resume
Vitrine interactive et hub des projets. Elle presente la methode de travail, affiche la carte des applications et ouvre des fiches detaillees synchronisees par l'orchestrateur.

## A quoi sert le projet
Transformer les projets locaux en presentation claire, navigable et diffusable.

## Fonctionnement
Le site importe un module project-registry.js genere par l'orchestrateur. A l'ouverture de la grille, il place les projets par zones, gere le zoom, le deplacement, les boutons de focus et le panneau detail. Quand une carte est ouverte, le panneau affiche l'image, le resume, les statuts, le lien public, le lien GitHub, la fiche, puis les sections Application, Fonctionnement, Conception, Techniques et Automatisations. Le contact passe par une scene interactive et une API PHP dediee.

## Construction
Il a ete concu comme un hub vivant plutot qu'une liste statique. Le design existant garde la narration immersive, mais la couche projet est maintenant alimentee par les donnees de l'orchestrateur pour eviter de recoder les cartes a la main et pour garder les projets synchronises.

## Installation
Pour installer le projet localement, Node.js doit être installé. Aucune dépendance applicative n'est requise. Les scripts disponibles permettent de lancer le serveur de développement ou de production.

## Utilisation
Après installation, accéder au site via un navigateur en local (par défaut sur `http://localhost:3000`). La grille s'affiche avec les projets positionnés. Utiliser la molette de la souris pour zoomer, les flèches ou un cliqué-glissé pour se déplacer, et cliquer sur une carte pour ouvrir sa fiche détaillée. Les fiches contiennent des sections comme 'Application', 'Fonctionnement', 'Conception', etc., ainsi que des liens publics et GitHub si disponibles. La scène de contact permet d'envoyer un message après interaction avec l'interface WebGL.

## Fonctions
- Affiche une grille navigable de tous les projets.
- Ouvre une fiche simple et lisible pour chaque application.
- Montre les liens publics disponibles quand ils sont autorises.
- Garde les informations sensibles hors de la vitrine.
