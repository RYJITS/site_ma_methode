# Site Ma Methode

## Liens vers l'application
- Lien public: [https://cv.c2rdesign.com/](https://cv.c2rdesign.com/)
- GitHub: [https://github.com/RYJITS/site_ma_methode](https://github.com/RYJITS/site_ma_methode)

## A quoi sert le projet
Site Ma Methode est la vitrine centrale qui relie les projets du Cerveau IA. La page raconte la methode, propose une experience scroll/video, puis ouvre une carte interactive ou chaque application possede sa vignette, son statut, ses liens et sa fiche.

## Fonctionnement de l'application ou du projet
Le site importe un module project-registry.js genere par l'orchestrateur. A l'ouverture de la grille, il place les projets par zones, gere le zoom, le deplacement, les boutons de focus et le panneau detail. Quand une carte est ouverte, le panneau affiche l'image, le resume, les statuts, le lien public, le lien GitHub, la fiche, puis les sections Application, Fonctionnement, Conception, Techniques et Automatisations. Le contact passe par une scene interactive et une API PHP dediee.

## Comment le projet a ete construit
Il a ete concu comme un hub vivant plutot qu'une liste statique. Le design existant garde la narration immersive, mais la couche projet est maintenant alimentee par les donnees de l'orchestrateur pour eviter de recoder les cartes a la main et pour garder les projets synchronises.

## Installation et utilisation
### Installation
Pour installer le projet localement, Node.js doit être installé. Aucune dépendance applicative n'est requise. Les scripts disponibles permettent de lancer le serveur de développement ou de production.

### Utilisation
Après installation, accéder au site via un navigateur en local (par défaut sur `http://localhost:3000`). La grille s'affiche avec les projets positionnés. Utiliser la molette de la souris pour zoomer, les flèches ou un cliqué-glissé pour se déplacer, et cliquer sur une carte pour ouvrir sa fiche détaillée. Les fiches contiennent des sections comme 'Application', 'Fonctionnement', 'Conception', etc., ainsi que des liens publics et GitHub si disponibles. La scène de contact permet d'envoyer un message après interaction avec l'interface WebGL.

## Fonctions disponibles dans l'application
- Presenter la methode de travail
- Ouvrir une carte interactive des projets
- Filtrer visuellement par familles de projets
- Afficher une fiche detaillee par application
- Donner le lien public et GitHub quand ils sont autorises
- Afficher les vignettes generees
- Envoyer un message via le contact
- Garder les contenus sensibles hors de la vitrine

## Outils, IA et moteurs en arriere-plan
- Registre fourni par l'orchestrateur
- Fiches Markdown publiques
- Vignettes IA WebP
- Panneau detail dynamique
- Scene contact interactive
- API PHP de contact
- Verification navigateur automatisee
- Regles de non-exposition des secrets

## Automatisations integrees
- Generation automatique de project-registry.js
- Copie des fiches publiques vers public/orchestrator/fiches
- Synchronisation des statuts, liens et vignettes
- Verification du rendu par script Chromium
- Controle que les secrets ne sont pas exposes
- Ouverture QA via parametre qaScroll
- Import des vignettes IA depuis le dossier thumbnails-ai

## Captures d'ecran
![Capture 1 - SITE MA METHODE](../captures/01-site-ma-methode/01-site-ma-methode-2026-06-21_23-36-53-desktop.png)

![Capture 2 - SITE MA METHODE](../captures/01-site-ma-methode/01-site-ma-methode-2026-06-21_23-36-53-mobile.png)

## Mises a jour
- Intégration d'un registre de projets généré automatiquement par l'orchestrateur pour éviter la maintenance manuelle des cartes
- Ajout d'une scène de contact interactive basée sur WebGL pour une expérience immersive
- Optimisation des vignettes en format WebP pour un chargement plus rapide
- Mise en place d'une vérification automatisée des navigateurs via Playwright pour garantir la compatibilité
- Enrichissement de la documentation avec des rapports fonctionnels et des captures d'écran
