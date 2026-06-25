# NAS

## Liens vers l'application
- Lien public: non detecte
- GitHub: non detecte

## A quoi sert le projet
NAS est une documentation d'exploitation pour l'infrastructure personnelle. Elle explique comment sont organises le serveur Debian, Docker Compose, n8n, PostgreSQL, Caddy, Tailscale, Nextcloud, les volumes et les sauvegardes.

## Fonctionnement de l'application ou du projet
Le projet ne lance pas une application publique: il sert de manuel operationnel. Les documents indiquent les chemins serveur, les commandes docker compose, les validations Caddy, les logs, les dossiers de donnees et les gestes de recuperation. Il permet donc de retrouver rapidement comment redemarrer les services, verifier l'etat du serveur ou comprendre la structure des sauvegardes.

## Comment le projet a ete construit
Il a ete concu comme un espace prive et pratique, indexe par l'orchestrateur mais non publie. La structure privilegie les procedures lisibles et les reperes de maintenance, car le contenu touche a l'infrastructure et peut contenir des informations sensibles.

## Fonctions disponibles dans l'application
- Retrouver les procedures serveur
- Comprendre l'organisation n8n et Nextcloud
- Verifier les commandes de maintenance
- Suivre les sauvegardes
- Documenter les chemins critiques
- Preparer la recuperation apres incident

## Outils, IA et moteurs en arriere-plan
- Serveur Debian
- Docker Compose
- n8n
- PostgreSQL
- Nextcloud
- Caddy reverse proxy
- Tailscale
- Script de backup
- Cron serveur
- Logs de sauvegarde

## Automatisations integrees
- Sauvegarde automatique par script shell
- Dump SQL Nextcloud/MariaDB
- Compression tar.gz des donnees
- Purge des sauvegardes de plus de 7 jours
- Journalisation dans /var/log/n8n_backup.log
- Execution planifiee par cron a 02:00
- Indexation dans le registre orchestrateur
- Blocage publication par statut prive

## Captures d'ecran
- Aucune capture validee pour cette fiche.

## Mises a jour
- Fiche actualisee depuis le registre orchestrateur et le catalogue projet.
- Changements locaux detectes: relire la fiche apres validation des modifications.
- Derniere mise a jour registre connue: 2026-06-21T21:46:01.402Z.

## Derniere mise a jour
2026-06-21T21:46:01.405Z

> Fichier genere par l'orchestrateur pour le hub Site Ma Methode.
