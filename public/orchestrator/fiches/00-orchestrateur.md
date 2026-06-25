# Orchestrateur global

## Liens vers l'application
- Lien public: non detecte
- GitHub: non detecte

## A quoi sert le projet
L'Orchestrateur global est l'application locale qui pilote tout le dossier Projet. Elle sert a savoir quelles taches existent, qui doit les appliquer, a quelle frequence, quels projets sont concernes, quels garde-fous bloquent les risques, et quelles commandes peuvent etre lancees depuis le dashboard.

## Fonctionnement de l'application ou du projet
L'application lit deux sources: le registre des projets et le registre des taches. Le registre des taches definit les actions a faire, leur cadence, le responsable, la commande, les routines ou elles apparaissent et les conditions de securite. Le dashboard affiche ce plan de travail, permet de filtrer par frequence ou responsable, et lance uniquement les actions autorisees via l'API locale. Pour chaque action, l'utilisateur choisit l'executeur: script local, Codex superviseur, Mistral API ou Alibaba/Qwen API. Avant une action globale, le dashboard relance un scan de la racine projets pour inclure les nouveaux dossiers.

## Comment le projet a ete construit
Il a ete concu comme une couche prudente au-dessus de toute la racine projets. Chaque action importante est rattachee a une tache explicite, un responsable, une frequence, un executeur et des garde-fous: scanner avant modification, ne pas supprimer directement, ne pas publier sans audit securite OK, archiver ou sauvegarder avant intervention, et garder Site Ma Methode comme hub de lecture plutot que cible isolee.

## Fonctions disponibles dans l'application
- Ouvrir le dashboard par raccourci Bureau
- Ajouter ou supprimer des taches
- Creer des sous-taches
- Mettre une tache ou sous-tache en pause
- Definir quand et par qui chaque action est faite
- Installer plus tard les taches depuis le store
- Choisir l'executeur par action
- Inclure les nouveaux projets par scan automatique
- Faire les repos GitHub comme tache active principale
- Servir de garde-fou avant diffusion

## Outils, IA et moteurs en arriere-plan
- Raccourci Windows Bureau
- Registre des taches avec store
- Gestion sous-taches
- API locale du dashboard
- Executeur script local
- Executeur Codex superviseur
- Mistral API analyse-only
- Alibaba/Qwen API analyse-only
- Store reinstallable des anciennes taches
- Tache active GitHub repos

## Automatisations integrees
- Scan global des projets
- Audit securite et blocage des secrets
- Audit nettoyage en dry-run
- Verification build/test/lint/dev selon scripts disponibles
- Generation des fiches FICHE_PROJET, INSTALLATION_FR et CHANGELOG_FR
- Synchronisation Site Ma Methode
- Import et optimisation des vignettes IA
- Routines daily, weekly et monthly
- Controles GitHub/publication sans publication automatique
- Rapports memoire, subagents et sauvegardes controlees

## Captures d'ecran
- Aucune capture validee pour cette fiche.

## Mises a jour
- Fiche actualisee depuis le registre orchestrateur et le catalogue projet.
- Changements locaux detectes: relire la fiche apres validation des modifications.
- Derniere mise a jour registre connue: 2026-06-21T21:46:01.353Z.

## Derniere mise a jour
2026-06-21T21:46:01.361Z

> Fichier genere par l'orchestrateur pour le hub Site Ma Methode.
