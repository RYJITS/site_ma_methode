# Bord PLANIF - Cockpit de planification MRP

## Liens vers l'application
- Lien public: [https://planner.c2rdesign.com/](https://planner.c2rdesign.com/)
- GitHub: [https://github.com/RYJITS/bord_planif](https://github.com/RYJITS/bord_planif)

## A quoi sert le projet
Bord PLANIF est une application web locale qui reconstruit un cockpit de planification depuis l'analyse structurelle du classeur métier BORD_DEC_MRPC17.xlsm. Elle ne recopie pas les données réelles du fichier mais reproduit sa structure, ses feuilles, ses volumes, ses familles de formules et ses actions avec un jeu de données fictif. L'application permet de visualiser, éditer et analyser des données de planification MRP via une interface inspirée d'Excel, tout en garantissant la confidentialité des données sensibles.

## Fonctionnement de l'application ou du projet
L'application s'exécute dans un navigateur moderne et présente une interface composée d'un ruban d'actions, de 18 onglets de feuilles (PLANING, BUFFER, CLIENT, SUIVI_MET, CAPAMET, etc.), d'une barre de formule, d'une grille paginée, de filtres, d'un mode compact/complet et d'une édition de lignes. Elle génère environ 14 905 lignes fictives réparties sur les feuilles, avec des calculs JavaScript simulant les taux de couverture, buffers, capacités, retards et heatmaps de charge. Les modifications sont sauvegardées localement via localStorage et peuvent être importées/exportées en CSV.

## Comment le projet a ete construit
Le projet a été conçu comme un clone fonctionnel et prudent du classeur métier, en séparant les jeux de données fictifs, les calculs recalculés en JavaScript, les vues spécialisées et les actions de simulation. L'architecture repose sur une interface HTML/CSS/JavaScript autonome, avec une séparation claire entre la logique métier (simulée) et l'interface utilisateur. Les choix de design incluent une grille type Excel, un ruban d'actions, une barre de formule explicative, des graphiques Canvas pour les KPI, et une persistance locale des overrides. Le projet utilise une seed déterministe pour générer les données fictives et recalcule dynamiquement les indicateurs après chaque édition. L'approche CRUD avec modales permet une édition intuitive des lignes.

## Installation et utilisation
### Installation
Aucune installation applicative standard n'est requise. L'application est conçue pour être exécutée localement en ouvrant le fichier index.html dans un navigateur moderne. Prérequis : navigateur web (Chrome, Firefox, Edge, Safari) avec JavaScript activé. Pour une utilisation avancée, il est possible de servir le projet via un serveur local (ex: Live Server dans VS Code) pour éviter les restrictions de sécurité liées au chargement de fichiers locaux.

### Utilisation
1. Ouvrir index.html dans un navigateur. 2. Utiliser le ruban d'actions pour naviguer entre les feuilles (onglets). 3. Appliquer des filtres (statut, semaine, recherche) pour affiner l'affichage. 4. Cliquer sur une ligne pour l'éditer via la modale dédiée. 5. Utiliser les commandes du ruban pour importer/export CSV, simuler un refresh ou créer un snapshot. 6. Les modifications sont sauvegardées automatiquement dans le navigateur et persistent entre les sessions.

## Fonctions disponibles dans l'application
- Génération déterministe de 14 905 lignes fictives sur 18 feuilles
- Recalcul dynamique des indicateurs (taux de couverture, buffers, capacités, retards)
- Affichage de heatmaps de charge et graphiques KPI
- Filtrage multi-critères (statut, semaine, recherche, groupes de colonnes)
- Édition CRUD des lignes avec validation intégrée
- Persistance locale des modifications via localStorage
- Simulation de refresh PowerQuery et journalisation des actions
- Création de snapshots d'archive depuis les lignes planning
- Import/export CSV des tables
- Design responsive et compatible Windows 11 / Fluent

## Outils, IA et moteurs en arriere-plan
- HTML5, CSS3, JavaScript vanilla
- Canvas pour les graphiques KPI
- localStorage pour la persistance
- Seed déterministe pour les données fictives
- Import/export CSV natif
- Icônes Lucide (via CDN)
- Architecture statique HTML/CSS/JS

## Automatisations integrees
- Génération automatique des données fictives au chargement
- Recalcul des indicateurs après chaque édition
- Sauvegarde automatique des modifications dans localStorage
- Rendu dynamique des graphiques selon la vue active
- Simulation de refresh et journalisation des actions

## Captures d'ecran
![Capture 1 - Bord PLANIF](../captures/05-bord-planif/05-bord-planif-2026-06-20_1858-cockpit.png)

![Capture 2 - Bord PLANIF](../captures/05-bord-planif/05-bord-planif-2026-06-20_1858-planning.png)

## Mises a jour
- Premiere fiche projet documentee.
