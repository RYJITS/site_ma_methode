# Bord PLANIF - Cockpit de planification MRP

## Projet
Application web autonome simulant un cockpit de planification MRP à partir d'une structure métier analysée, avec interface type Excel et données fictives.

## A quoi il sert
Bord PLANIF est une application web locale qui reconstruit un cockpit de planification depuis l'analyse structurelle du classeur métier BORD_DEC_MRPC17.xlsm. Elle ne recopie pas les données réelles du fichier mais reproduit sa structure, ses feuilles, ses volumes, ses familles de formules et ses actions avec un jeu de données fictif. L'application permet de visualiser, éditer et analyser des données de planification MRP via une interface inspirée d'Excel, tout en garantissant la confidentialité des données sensibles.

## Fonctions
- Génération déterministe de 14 905 lignes fictives sur 18 feuilles
- Recalcul dynamique des indicateurs (taux de couverture, buffers, capacités, retards)
- Affichage de heatmaps de charge et graphiques KPI
- Filtrage multi-critères (statut, semaine, recherche, groupes de colonnes)
- Édition CRUD des lignes avec validation intégrée
- Persistance locale des modifications via localStorage
- Simulation de refresh PowerQuery et journalisation des actions

## Avancement
- Etat du projet: pret cote usage public.
- Fonctionnement: fonctionnel.
- Securite: OK pour une presentation publique.
- Ma Methode: fiche explicative visible.
- Publication externe: candidat public, validation finale separee.

## Liens
- Application: pas encore disponible.
- [GitHub](https://github.com/RYJITS/bord_planif)
