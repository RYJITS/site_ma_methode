# Compétence Recherche Emploi

## Liens vers l'application
- Lien public: non detecte
- GitHub: non detecte

## A quoi sert le projet
Ce projet est un pipeline automatisé et structuré pour la recherche d'emploi, conçu pour des profils hybrides combinant expérience industrielle (supply chain, planification, ERP/SAP, KPI) et une transition vers l'IA appliquée, l'automatisation et le développement d'outils métiers. Il permet de centraliser, filtrer, valider et suivre les candidatures de manière systématique, en réduisant les tâches manuelles répétitives.

## Fonctionnement de l'application ou du projet
Le projet fonctionne comme un pipeline en 7 étapes :
1. **Inbox** : Collecte manuelle ou automatisée d'offres brutes (liens, notes).
2. **Sources Offres** : Vérification et catalogage des sources d'offres.
3. **Runs** : Exécution de recherches automatisées horodatées selon des critères configurés.
4. **Validations Telegram** : Interface de validation manuelle des offres via un bot Telegram.
5. **Dossiers Valides** : Constitution de dossiers de candidature pour les offres retenues.
6. **Postulations** : Envoi des candidatures et suivi des relances.
7. **Archives** : Archivage des offres non retenues ou obsolètes.

Les données sensibles (offres brutes, validations, postulations) sont ignorées par Git et stockées localement.

## Comment le projet a ete construit
Le projet a été conçu comme un pipeline modulaire et versionné pour garantir une traçabilité des évolutions. La structure en dossiers est pensée pour séparer clairement les données brutes, les processus automatisés, les validations manuelles et les archives. Les choix de conception incluent :
- **Versioning** : Utilisation de Git pour versionner la structure, les configurations et la documentation, avec des règles strictes pour les commits et les tags.
- **Modularité** : Séparation des étapes du pipeline en dossiers distincts pour faciliter la maintenance et les mises à jour.
- **Automatisation** : Intégration de services locaux (ex: SearXNG pour la recherche) et d'interfaces de validation (ex: Telegram) pour réduire l'intervention manuelle.
- **Traçabilité** : Système de mémoire projet pour enregistrer les décisions clés et les apprentissages.

## Installation et utilisation
### Installation
Pour installer le projet localement :
1. Cloner le dépôt Git : `git clone <url_du_depot>`.
2. Installer les dépendances locales si nécessaire (ex: services comme SearXNG pour la recherche).
3. Configurer les fichiers de configuration dans le dossier `config/` selon les besoins (critères de recherche, scoring, sources).
4. Initialiser les dossiers vides selon la structure définie (ex: `00_inbox/`, `01_sources_offres/`).

Prérequis : Git, Python (si des scripts Python sont utilisés), et les outils nécessaires pour les services locaux (ex: Docker pour SearXNG).

### Utilisation
Après installation, l'utilisation du projet suit ces étapes :
1. **Collecte** : Ajouter des offres brutes dans `00_inbox/` ou configurer des sources automatiques.
2. **Exécution** : Lancer les recherches automatisées (ex: via des scripts ou services configurés) pour peupler `02_runs/`.
3. **Validation** : Utiliser l'interface Telegram pour valider les offres dans `03_validations_telegram/`.
4. **Dossiers** : Les offres validées sont automatiquement déplacées dans `04_dossiers_valides/` pour constitution des dossiers de candidature.
5. **Postulation** : Envoyer les candidatures via les scripts ou outils configurés, et suivre les relances dans `05_postulations/`.
6. **Archivage** : Archiver les offres non retenues ou obsolètes dans `06_archives/`.

Les commandes utiles incluent : `git status`, `git add`, `git commit`, et `git tag` pour versionner les changements.

## Fonctions disponibles dans l'application
- Collecte automatisée d'offres depuis des sources configurables
- Filtrage et scoring des offres selon des critères métiers (ex: mots-clés, technologies, localisation)
- Validation manuelle des offres via une interface dédiée (ex: Telegram)
- Génération de dossiers de candidature structurés (CV, lettre de motivation, liens pertinents)
- Suivi des candidatures envoyées avec relances automatiques
- Archivage des offres non retenues ou obsolètes
- Versioning de la structure du projet et des configurations
- Traçabilité des décisions via un système de mémoire projet

## Outils, IA et moteurs en arriere-plan
- Git (versioning et traçabilité)
- SearXNG (moteur de recherche local pour la collecte d'offres)
- Telegram (interface de validation manuelle des offres)
- Python (scripts d'automatisation et de traitement)
- Docker (si des services locaux comme SearXNG sont utilisés)

## Automatisations integrees
- Collecte automatisée d'offres depuis des sources configurées
- Exécution de recherches horodatées pour peupler le pipeline
- Déplacement automatique des offres validées vers les dossiers de candidature
- Relances automatiques pour le suivi des candidatures

## Captures d'ecran
- Aucune capture validee pour cette fiche.

## Mises a jour
- Initialisation du projet avec une structure de pipeline en 7 étapes
- Ajout d'un système de versioning pour la structure et les configurations
- Documentation des conventions de commit et de versioning (MAJOR/MINOR/PATCH)
- Intégration d'un système de mémoire projet pour tracer les décisions clés
- Configuration des services locaux (ex: SearXNG) pour la collecte automatisée d'offres
- Initialisation du projet avec une structure de pipeline en 7 étapes (inbox → archives)
