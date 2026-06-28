# Documentation d'infrastructure serveur personnel - NAS

## Liens vers l'application
- Lien public: non detecte
- GitHub: non detecte

## A quoi sert le projet
Ce projet est une documentation technique structurée sous forme de fichiers Markdown et JSON, conçue pour centraliser les procédures d'administration, de maintenance et de récupération d'un serveur personnel sécurisé. Il couvre l'installation, la configuration, la gestion des services (n8n, Nextcloud, PostgreSQL, Caddy, Tailscale), les sauvegardes automatiques et manuelles, ainsi que les procédures de récupération après incident. L'objectif est de fournir un manuel opérationnel clair et reproductible pour les administrateurs système ou les utilisateurs techniques, tout en garantissant la sécurité et la confidentialité des données.

## Fonctionnement de l'application ou du projet
Le projet fonctionne comme une documentation technique organisée en fichiers Markdown (README.md, documentation_n8n_server.md, etc.) et JSON (rapports, audits). Les services sont gérés via Docker Compose avec des fichiers YAML détaillés pour chaque composant (n8n, PostgreSQL, Caddy, Tailscale). Les sauvegardes sont automatisées via des scripts shell planifiés via cron, incluant des dumps SQL pour les bases de données et des compressions tar.gz des données. Les procédures incluent des commandes pour démarrer, arrêter, vérifier l'état des services, consulter les logs, et effectuer des sauvegardes ou restaurations. La documentation est indexée par l'orchestrateur pour une synchronisation centralisée et une traçabilité des mises à jour.

## Comment le projet a ete construit
Le projet a été conçu comme un espace privé et pratique, indexé par l'orchestrateur mais non publié, afin de répondre à un besoin de centralisation des procédures techniques pour un serveur personnel. La structure privilégie la lisibilité, l'efficacité et la sécurité, avec une séparation claire entre documentation technique et exécution des commandes. Les choix de conception incluent : une documentation modulaire (README, rapports, audits) pour faciliter la maintenance ; des procédures claires et reproductibles pour les tâches critiques (sauvegarde, restauration, récupération) ; une intégration avec l'orchestrateur pour la synchronisation et la traçabilité ; une approche conservative pour éviter toute exposition de données sensibles ou de secrets. La stack technique repose sur Docker Compose pour l'orchestration, des scripts shell pour les sauvegardes, et des outils comme Caddy pour le reverse proxy et HTTPS, Tailscale pour le réseau privé, et UFW pour le pare-feu.

## Installation et utilisation
### Installation
L'installation est manuelle et nécessite un serveur Debian 12 avec les prérequis suivants : Docker et Docker Compose installés, accès SSH et droits sudo, espace disque suffisant pour les conteneurs et les sauvegardes. Étapes générales : 1. Cloner le dépôt dans un répertoire dédié (ex. `un dossier local dedie`). 2. Vérifier les permissions et les chemins dans les fichiers Docker Compose. 3. Configurer les variables d'environnement (ex. mots de passe PostgreSQL, clés n8n) dans les fichiers appropriés. 4. Démarrer les services avec `docker compose up -d`. 5. Vérifier l'état des conteneurs avec `docker compose ps`. Pour les sauvegardes, s'assurer que le script de sauvegarde est exécutable et que les chemins de destination sont corrects.

### Utilisation
Après installation, l'utilisation consiste principalement à : consulter la documentation pour les procédures (ex. `README.md`, `documentation_n8n_server.md`) ; exécuter les commandes Docker Compose pour gérer les services (démarrage, arrêt, vérification) ; vérifier les logs avec `docker logs -f <nom_du_conteneur>` ; lancer les sauvegardes manuelles ou vérifier les sauvegardes automatiques ; appliquer les mises à jour des services via les fichiers Docker Compose. Exemple de commandes utiles : `docker compose up -d` (démarre les services), `sudo systemctl status caddy` (vérifie l'état de Caddy), `docker compose ps` (liste les conteneurs actifs), `docker logs -f n8n_app` (affiche les logs de n8n).

## Fonctions disponibles dans l'application
- Gestion centralisée des services via Docker Compose
- Automatisation des sauvegardes (dumps SQL, compression tar.gz)
- Configuration sécurisée (HTTPS via Caddy, pare-feu UFW)
- Réseau privé via Tailscale
- Procédures de récupération après incident
- Documentation modulaire et traçable
- Vérification de l'état des services (logs, commandes Docker)
- Maintenance et optimisation des services

## Outils, IA et moteurs en arriere-plan
- Docker Compose
- Caddy (reverse proxy + HTTPS)
- Tailscale (réseau privé virtuel)
- PostgreSQL (base de données)
- n8n (automatisation de workflows)
- Nextcloud (stockage et collaboration)
- UFW (pare-feu)
- Bash (scripts de sauvegarde)
- Cron (planification des sauvegardes)
- VS Code / WinSCP (accès distant)
- SSH (accès sécurisé)

## Automatisations integrees
- Sauvegardes automatiques planifiées via cron (exécution à 02:00)
- Dumps SQL pour Nextcloud/PostgreSQL
- Compression tar.gz des données
- Purge des sauvegardes de plus de 7 jours
- Journalisation des sauvegardes dans `un dossier local dedie`
- Indexation automatique dans l'orchestrateur

## Captures d'ecran
- Aucune capture validee pour cette fiche.

## Mises a jour
- Synchronisation de la documentation avec l'orchestrateur global (statut PRIVATE_INTERNAL)
- Ajout de rapports fonctionnels et de sécurité (CHANGELOG_FR.md, AUDIT_SECURITE.md)
- Documentation des procédures de sauvegarde et de restauration
- Mise à jour des audits d'architecture, nettoyage et optimisation
- Clarification des procédures de récupération après incident
- Ajout de détails sur la configuration réseau et les redirections de port
- Synchronisation de la documentation avec l'orchestrateur global (statut PRIVATE_INTERNAL)
- Ajout de rapports fonctionnels et de sécurité (CHANGELOG_FR.md, AUDIT_SECURITE.md)
- Documentation des procédures de sauvegarde et de restauration
- Mise à jour des audits d'architecture, nettoyage et optimisation
- Clarification des procédures de récupération après incident
- Ajout de détails sur la configuration réseau et les redirections de port

> Fichier genere par l'orchestrateur pour le hub Site Ma Methode.
