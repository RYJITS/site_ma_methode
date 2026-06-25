# Site Ma Methode

## Liens vers l'application
- Lien public: https://cv.c2rdesign.com/
- GitHub: non detecte

## A quoi sert le projet
Site Ma Methode est la vitrine centrale qui relie les projets du Cerveau IA. La page raconte la methode, propose une experience scroll/video, puis ouvre une carte interactive ou chaque application possede sa vignette, son statut, ses liens et sa fiche.

## Fonctionnement de l'application ou du projet
Le site importe un module project-registry.js genere par l'orchestrateur. A l'ouverture de la grille, il place les projets par zones, gere le zoom, le deplacement, les boutons de focus et le panneau detail. Quand une carte est ouverte, le panneau affiche l'image, le resume, les statuts, le lien public, le lien GitHub, la fiche, puis les sections Application, Fonctionnement, Conception, Techniques et Automatisations. Le contact passe par une scene interactive et une API PHP dediee.

## Comment le projet a ete construit
Il a ete concu comme un hub vivant plutot qu'une liste statique. Le design existant garde la narration immersive, mais la couche projet est maintenant alimentee par les donnees de l'orchestrateur pour eviter de recoder les cartes a la main et pour garder les projets synchronises.

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
- Fiche actualisee depuis le registre orchestrateur et le catalogue projet.
- Changements locaux detectes: relire la fiche apres validation des modifications.
- Derniere mise a jour registre connue: 2026-06-21T21:46:01.500Z.

## Derniere mise a jour
2026-06-21T21:46:01.503Z

> Fichier genere par l'orchestrateur pour le hub Site Ma Methode.
