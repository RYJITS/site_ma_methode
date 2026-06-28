# Site Ma Méthode - Hub des projets et vitrine interactive

## Liens vers l'application
- Lien public: [https://cv.c2rdesign.com/](https://cv.c2rdesign.com/)
- GitHub: [https://github.com/RYJITS/site_ma_methode](https://github.com/RYJITS/site_ma_methode)

## A quoi sert le projet
Site web interactif conçu comme un hub centralisé pour présenter les projets développés. Il permet aux visiteurs de naviguer dans une grille de projets, d'accéder à des fiches détaillées pour chaque projet, et d'interagir avec une scène de contact immersive. Le projet s'appuie sur un registre généré automatiquement par l'orchestrateur Cerveau IA, garantissant une synchronisation en temps réel des données affichées.

## Fonctionnement de l'application ou du projet
Le site charge un registre de projets (project-registry.js) contenant les métadonnées des projets (noms, statuts, liens, familles, etc.). Une grille interactive affiche les projets sous forme de cartes positionnées dans des zones prédéfinies. L'utilisateur peut zoomer, se déplacer et cliquer sur une carte pour ouvrir une fiche détaillée. La scène de contact, basée sur WebGL, permet d'envoyer des messages via une API PHP dédiée. Toutes les interactions sont vérifiées pour éviter l'exposition de données sensibles.

## Comment le projet a ete construit
Le projet a été conçu comme un hub vivant plutôt qu'une simple liste statique, afin de faciliter la mise à jour et la synchronisation avec les données de l'orchestrateur. La structure repose sur un module JavaScript modulaire (main.js) qui gère la grille, les interactions et l'affichage des fiches. Le design immersif utilise du CSS responsive et des animations contrôlées par le scroll pour une expérience utilisateur fluide. Les choix techniques incluent l'utilisation de Vite pour le développement, Node.js pour le serveur local, et des outils comme Playwright pour les tests automatisés. Les vignettes sont générées par IA et optimisées en WebP pour un rendu performant.

## Installation et utilisation
### Installation
[object Object]

### Utilisation
Après installation, accéder au site via un navigateur en local (par défaut sur `http://localhost:3000`). La grille s'affiche avec les projets positionnés. Utiliser la molette de la souris pour zoomer, les flèches ou un cliqué-glissé pour se déplacer, et cliquer sur une carte pour ouvrir sa fiche détaillée. Les fiches contiennent des sections comme 'Application', 'Fonctionnement', 'Conception', etc., ainsi que des liens publics et GitHub si disponibles. La scène de contact permet d'envoyer un message après interaction avec l'interface WebGL.

## Fonctions disponibles dans l'application
- Affichage dynamique d'une grille de projets synchronisée avec l'orchestrateur
- Navigation immersive avec zoom et déplacement
- Ouverture de fiches détaillées par projet avec sections structurées
- Affichage des vignettes générées par IA
- Vérification automatique de la compatibilité des navigateurs
- Responsive design pour une utilisation sur mobile et desktop
- Module de contact interactif avec vérification navigateur
- Filtres visuels par familles de projets

## Outils, IA et moteurs en arriere-plan
- Vite (serveur de développement et bundler)
- Node.js (runtime pour le serveur local)
- Playwright (vérification automatisée des navigateurs)
- API PHP dédiée pour le module de contact
- WebGL (pour la scène de contact interactive)
- Registre de projets généré par l'orchestrateur (project-registry.js)
- JavaScript modulaire (ES Modules)
- CSS responsive immersif avec animations contrôlées par le scroll
- Format d'images WebP pour l'optimisation

## Automatisations integrees
- Génération automatique du registre de projets (project-registry.js) à partir des données de l'orchestrateur
- Copie des fiches Markdown publiques vers le dossier de publication
- Synchronisation des statuts, liens et vignettes avec les données de l'orchestrateur
- Vérification du rendu via Playwright pour garantir la compatibilité
- Contrôle des données sensibles pour éviter leur exposition

## Captures d'ecran
![Capture 1 - SITE MA METHODE](docs/captures/01-site-ma-methode-2026-06-21_23-36-53-desktop.png)

![Capture 2 - SITE MA METHODE](docs/captures/01-site-ma-methode-2026-06-21_23-36-53-mobile.png)

## Mises a jour
- Intégration d'un registre de projets généré automatiquement pour éviter la maintenance manuelle
- Ajout d'une scène de contact interactive basée sur WebGL
- Optimisation des vignettes en WebP pour un chargement plus rapide
- Mise en place d'une vérification automatisée des navigateurs via Playwright
- Enrichissement du README avec des rapports fonctionnels et des captures d'écran
- Intégration d'un registre de projets généré automatiquement par l'orchestrateur pour éviter la maintenance manuelle des cartes
- Ajout d'une scène de contact interactive basée sur WebGL pour une expérience immersive
- Optimisation des vignettes en format WebP pour un chargement plus rapide
- Mise en place d'une vérification automatisée des navigateurs via Playwright pour garantir la compatibilité
- Enrichissement du README avec des rapports fonctionnels et des captures d'écran pour une meilleure documentation

> Fichier genere par l'orchestrateur pour le hub Site Ma Methode.
