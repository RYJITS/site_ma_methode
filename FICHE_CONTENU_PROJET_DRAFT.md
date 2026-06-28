# Brouillon contenu fiche - Site Ma Méthode - Hub des projets et vitrine interactive

## Resume
Un hub centralisé et immersif présentant les projets sous forme de grille navigable avec des fiches détaillées, synchronisé avec l'orchestrateur Cerveau IA.

## A quoi sert le projet
Centraliser et diffuser de manière claire et immersive les projets développés, en offrant une navigation intuitive et des informations structurées pour les visiteurs, partenaires et clients. Le projet transforme des données brutes en une présentation visuelle et cohérente, tout en garantissant la confidentialité des informations sensibles.

## Fonctionnement
Le site charge un registre de projets (project-registry.js) contenant les métadonnées des projets (noms, statuts, liens, familles, etc.). Une grille interactive affiche les projets sous forme de cartes positionnées dans des zones prédéfinies. L'utilisateur peut zoomer, se déplacer et cliquer sur une carte pour ouvrir une fiche détaillée. La scène de contact, basée sur WebGL, permet d'envoyer des messages via une API PHP dédiée. Toutes les interactions sont vérifiées pour éviter l'exposition de données sensibles.

## Construction
Le projet a été conçu comme un hub vivant plutôt qu'une simple liste statique, afin de faciliter la mise à jour et la synchronisation avec les données de l'orchestrateur. La structure repose sur un module JavaScript modulaire (main.js) qui gère la grille, les interactions et l'affichage des fiches. Le design immersif utilise du CSS responsive et des animations contrôlées par le scroll pour une expérience utilisateur fluide. Les choix techniques incluent l'utilisation de Vite pour le développement, Node.js pour le serveur local, et des outils comme Playwright pour les tests automatisés. Les vignettes sont générées par IA et optimisées en WebP pour un rendu performant.

## Installation
[object Object]

## Utilisation
Après installation, accéder au site via un navigateur en local (par défaut sur `http://localhost:3000`). La grille s'affiche avec les projets positionnés. Utiliser la molette de la souris pour zoomer, les flèches ou un cliqué-glissé pour se déplacer, et cliquer sur une carte pour ouvrir sa fiche détaillée. Les fiches contiennent des sections comme 'Application', 'Fonctionnement', 'Conception', etc., ainsi que des liens publics et GitHub si disponibles. La scène de contact permet d'envoyer un message après interaction avec l'interface WebGL.

## Fonctions
- Affichage d'une grille interactive des projets
- Navigation par zoom et déplacement dans la grille
- Ouverture de fiches détaillées pour chaque projet
- Affichage des statuts, liens publics et GitHub (quand autorisés)
- Présentation de la méthode de travail via une narration immersive
- Filtres visuels par familles de projets
- Intégration de vignettes générées par IA
- Module de contact interactif avec vérification navigateur
