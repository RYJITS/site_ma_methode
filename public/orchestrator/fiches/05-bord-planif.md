# Bord PLANIF

## Liens vers l'application
- Lien public: https://planner.c2rdesign.com/
- GitHub: non detecte

## A quoi sert le projet
Bord PLANIF est une application web locale qui reconstruit un cockpit de planification depuis l'analyse du classeur BORD_DEC_MRPC17.xlsm. Elle ne recopie pas les donnees reelles du fichier: elle reproduit la structure, les feuilles, les volumes, les familles de formules et les actions observables avec un jeu de donnees fictif.

## Fonctionnement de l'application ou du projet
L'application ouvre une interface type Excel avec ruban d'actions, onglets de feuilles, barre de formule, grille paginee, filtres, mode compact/complet et edition de lignes. Elle genere environ 14 905 lignes fictives sur 18 feuilles: PLANING, BUFFER, CLIENT, SUIVI_MET, capacites CAPAMET, metteurs en train, archives, PRT, starts, machines, confirmations, gammes, nomenclature et versions production. Les calculs JavaScript simulent les taux de couverture, buffers, capacites, retards, statuts planif et heatmaps de charge. Les modifications restent dans le navigateur via localStorage et les tables peuvent etre importees/exportees en CSV.

## Comment le projet a ete construit
Le projet a ete concu comme un clone fonctionnel et prudent du classeur metier: garder l'ergonomie et la logique de pilotage sans publier les valeurs sensibles du fichier source. La page web separe les jeux fictifs, les calculs recalcules en JavaScript, les vues specialisees et les actions de simulation pour pouvoir presenter ou tester le fonctionnement sans ouvrir le classeur original.

## Fonctions disponibles dans l'application
- Naviguer dans 18 feuilles de planification type Excel
- Lire un cockpit KPI avec risques, lignes actives, capacites et graphiques canvas
- Filtrer par statut, semaine, recherche et groupes de colonnes
- Consulter les vues Planning, Buffer, Capacite, MET, Sources et Audit
- Ajouter, modifier ou supprimer des lignes fictives
- Simuler une actualisation et creer un snapshot d'archive
- Importer et exporter des tables en CSV
- Conserver les changements locaux dans le navigateur

## Outils, IA et moteurs en arriere-plan
- Classeur source BORD_DEC_MRPC17.xlsm analyse en structure seulement
- Interface HTML/CSS/JavaScript autonome
- Grille type Excel
- Ruban d'actions
- Barre de formule explicative
- Canvas pour graphiques KPI
- localStorage pour overrides et preferences
- Import/export CSV

## Automatisations integrees
- Generation deterministe des donnees fictives au chargement
- Recalcul automatique des lignes planning et buffer apres edition
- Sauvegarde locale des ajouts, modifications et suppressions
- Simulation de refresh PowerQuery et journal d'actualisation
- Creation de snapshots d'archive depuis les lignes planning
- Import CSV avec materialisation dans les overrides
- Export CSV de la vue active
- Rendu automatique des graphiques selon la vue

## Captures d'ecran
![Capture 1 - Bord PLANIF](../captures/05-bord-planif/05-bord-planif-2026-06-20_1858-cockpit.png)

![Capture 2 - Bord PLANIF](../captures/05-bord-planif/05-bord-planif-2026-06-20_1858-planning.png)

## Mises a jour
- Fiche actualisee depuis le registre orchestrateur et le catalogue projet.
- Changements locaux detectes: relire la fiche apres validation des modifications.
- Derniere mise a jour registre connue: 2026-06-21T21:46:01.602Z.

## Derniere mise a jour
2026-06-21T21:46:01.605Z

> Fichier genere par l'orchestrateur pour le hub Site Ma Methode.
