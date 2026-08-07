# NAS

## Liens vers l'application
- Lien public: non detecte
- GitHub: [https://github.com/RYJITS/nas-showcase](https://github.com/RYJITS/nas-showcase)

## A quoi sert le projet
NAS est une documentation d'exploitation pour l'infrastructure personnelle. Elle explique comment sont organises le serveur Debian, Docker Compose, n8n, PostgreSQL, Caddy, Tailscale, Nextcloud, les volumes et les sauvegardes.

## Fonctionnement de l'application ou du projet
Le projet ne lance pas une application publique: il sert de manuel operationnel. Les documents indiquent les chemins serveur, les commandes docker compose, les validations Caddy, les logs, les dossiers de donnees et les gestes de recuperation. Il permet donc de retrouver rapidement comment redemarrer les services, verifier l'etat du serveur ou comprendre la structure des sauvegardes.

## Comment le projet a ete construit
Il a ete concu comme un espace prive et pratique. La structure privilegie les procedures lisibles, les reperes de maintenance et la separation entre documentation generale et parametres sensibles.

## Installation et utilisation
### Installation
Cette vitrine contient la documentation generale partageable du projet. Pour la consulter localement:

```powershell
git clone https://github.com/RYJITS/nas-showcase.git
cd nas-showcase
Get-Content README.md
```

Les configurations serveur, adresses reseau et sauvegardes operationnelles restent privees.

### Utilisation
Consulter le README, la fiche projet, le guide d'installation general et le changelog. Le deploiement reel necessite les fichiers prives qui ne font pas partie de cette vitrine.

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
- Purge des sauvegardes anciennes
- Journalisation des sauvegardes
- Execution nocturne planifiee par cron

## Captures d'ecran
- Aucune capture validee pour cette fiche.

## Mises a jour
- Synchronisation de la documentation pour Debian 12, n8n, PostgreSQL, Caddy, Tailscale et Nextcloud
- Ajout des procédures de sauvegarde automatique et de restauration
- Clarification des configurations réseau et des redirections de port
- Mise à jour des commandes utiles et des logs de maintenance
