\# Instructions Codex — Intégrer la timeline des compétences



\## Objectif



Modifier la timeline actuelle du site pour qu’elle ne raconte plus uniquement les postes ou les entreprises, mais l’évolution des compétences acquises.



La page explique déjà les méthodes d’optimisation utilisées.

La timeline doit donc rester légère et servir de rappel :



> Comment les compétences se sont construites dans le temps.



\---



\## Principe général



Ne pas supprimer les années.



La timeline doit fonctionner avec 3 niveaux :



1\. \*\*Période\*\* : repère chronologique discret

2\. \*\*Compétence principale\*\* : message principal

3\. \*\*Outils / compétences associées\*\* : uniquement dans la vue détaillée ou l’état actif



La timeline ne doit pas devenir un CV détaillé.



\---



\## Ce qu’il faut éviter



Ne pas afficher une timeline de type :



```txt

Responsable logistique

Planificateur / Key User

Responsable planning-méthode

Agent d’ordonnancement

```



Cela fait trop CV classique.



Ne pas afficher une timeline trop lourde avec :



```txt

défi + méthode + résultat + outils + chiffres + longue description

```



La page principale explique déjà les méthodes.

La timeline doit rester simple.



\---



\## Nouvelle logique de timeline



La timeline doit raconter cette progression :



```txt

Comprendre

→ Diagnostiquer

→ S’adapter

→ Structurer

→ Optimiser

→ Digitaliser

→ Coordonner

→ Automatiser

→ Augmenter

```



\---



\## Données à utiliser



Créer ou modifier le tableau de données de la timeline avec cette structure.



```ts

export const skillTimeline = \[

&#x20; {

&#x20;   id: "09",

&#x20;   period: "2026 → Demain",

&#x20;   title: "Augmenter",

&#x20;   subtitle: "IA \& systèmes existants",

&#x20;   sentence: "Faire évoluer l’existant avec l’IA.",

&#x20;   skills: \["IA appliquée", "Agents", "Applications intelligentes"],

&#x20;   tools: \["ChatGPT", "OpenAI API", "Mistral", "Claude", "WebGL"]

&#x20; },

&#x20; {

&#x20;   id: "08",

&#x20;   period: "2022 → Aujourd’hui",

&#x20;   title: "Automatiser",

&#x20;   subtitle: "Workflows \& productivité",

&#x20;   sentence: "Supprimer les tâches répétitives et connecter les outils.",

&#x20;   skills: \["Automatisation", "Workflows", "Connexion d’outils"],

&#x20;   tools: \["n8n", "Make", "Zapier", "Power Query", "API"]

&#x20; },

&#x20; {

&#x20;   id: "07",

&#x20;   period: "2022 → 2025",

&#x20;   title: "Coordonner",

&#x20;   subtitle: "Logistique \& priorités",

&#x20;   sentence: "Aligner les personnes, les priorités et les flux.",

&#x20;   skills: \["Leadership", "Logistique", "Communication interservices"],

&#x20;   tools: \["KPI", "Suivi urgences", "Planification", "Tableaux de pilotage"]

&#x20; },

&#x20; {

&#x20;   id: "06",

&#x20;   period: "2018 → 2022",

&#x20;   title: "Digitaliser",

&#x20;   subtitle: "ERP \& données",

&#x20;   sentence: "Transformer les données en décisions.",

&#x20;   skills: \["ERP", "Master Data", "Reporting", "Automatisation bureautique"],

&#x20;   tools: \["SAP", "Excel VBA", "Power BI", "SharePoint", "MRP"]

&#x20; },

&#x20; {

&#x20;   id: "05",

&#x20;   period: "2013 → 2018",

&#x20;   title: "Optimiser",

&#x20;   subtitle: "Performance \& méthodes",

&#x20;   sentence: "Simplifier les systèmes complexes.",

&#x20;   skills: \["Méthodes", "Capacités", "Amélioration continue"],

&#x20;   tools: \["Analyse de coûts", "Gammes", "Charges/capacités", "Données production"]

&#x20; },

&#x20; {

&#x20;   id: "04",

&#x20;   period: "2005 → 2012",

&#x20;   title: "Structurer",

&#x20;   subtitle: "Flux \& organisation",

&#x20;   sentence: "Transformer le désordre en structure claire.",

&#x20;   skills: \["Planification", "Ordonnancement", "Gestion des priorités"],

&#x20;   tools: \["ERP", "Ordres de fabrication", "Stocks", "Capacités"]

&#x20; },

&#x20; {

&#x20;   id: "03",

&#x20;   period: "2002 → 2004",

&#x20;   title: "S’adapter",

&#x20;   subtitle: "Terrain \& humains",

&#x20;   sentence: "Trouver des solutions dans des environnements réels.",

&#x20;   skills: \["Organisation", "Communication", "Adaptation"],

&#x20;   tools: \["Terrain", "Coordination", "Observation", "Formation"]

&#x20; },

&#x20; {

&#x20;   id: "02",

&#x20;   period: "2001 → 2002",

&#x20;   title: "Diagnostiquer",

&#x20;   subtitle: "Technique \& résolution",

&#x20;   sentence: "Identifier les causes avant de corriger.",

&#x20;   skills: \["Analyse", "Réparation", "Logique technique"],

&#x20;   tools: \["Électronique", "Câblage", "Dépannage", "Informatique matériel"]

&#x20; },

&#x20; {

&#x20;   id: "01",

&#x20;   period: "2000",

&#x20;   title: "Comprendre",

&#x20;   subtitle: "Fondation technique",

&#x20;   sentence: "Comprendre avant d’agir.",

&#x20;   skills: \["Diagnostic", "Analyse", "Logique système"],

&#x20;   tools: \["Électronique", "Instrumentation", "Audio-vidéo"]

&#x20; }

];

```



\---



\## Affichage dans la timeline fermée



La timeline fermée reste en bas de page.



Elle doit être très simple.



\### Inactif



Afficher principalement la période :



```txt

2018 → 2022

```



\### Actif ou survol



Afficher :



```txt

06 — Digitaliser

2018 → 2022

```



Optionnellement, afficher le sous-titre en petit :



```txt

ERP \& données

```



Ne pas afficher les outils directement sur la timeline fermée.



\---



\## Exemple visuel de la timeline fermée



```txt

PARCOURS



09 ─── 08 ─── 07 ─── 06 ─── 05 ─── 04 ─── 03 ─── 02 ─── 01



Augmenter

2026 → Demain

```



Important :



\* Garder les années comme repères.

\* Le numéro sert uniquement de repère visuel.

\* La compétence devient le vrai titre.

\* Les anciens intitulés de poste ne doivent plus dominer.



\---



\## Vue détaillée après clic sur “Explorer”



Quand l’utilisateur clique sur la timeline ou sur “Explorer”, ouvrir une vue détaillée plein écran.



La vue doit rester sobre.



Ne pas créer de gros carrousel compliqué.



\### Structure d’une carte détaillée



```txt

06 / 09



Digitaliser



Transformer les données en décisions.



Compétences

ERP · Master Data · Reporting · Automatisation bureautique



Outils

SAP · Excel VBA · Power BI · SharePoint · MRP



2018 → 2022

```



\---



\## Disposition desktop



Sur desktop :



\* La timeline fermée reste horizontale en bas.

\* La vue détaillée s’ouvre en plein écran.

\* Le contenu principal est centré ou légèrement à gauche.

\* Les visuels existants peuvent rester à droite.

\* Une seule carte détaillée doit être vraiment lisible à la fois.

\* Ne pas afficher trop de cartes inclinées ou superposées.



Disposition recommandée :



```txt

┌──────────────────────────────────────────────┐

│ ÉVOLUTION DES COMPÉTENCES                    │

│                                              │

│ 06 / 09                                      │

│ Digitaliser                                  │

│                                              │

│ Transformer les données en décisions.        │

│                                              │

│ Compétences                                  │

│ ERP · Master Data · Reporting                │

│                                              │

│ Outils                                       │

│ SAP · Excel VBA · Power BI · SharePoint      │

│                                              │

│ 2018 → 2022                                  │

└──────────────────────────────────────────────┘

```



\---



\## Disposition mobile



Sur mobile :



\* La timeline doit devenir verticale ou scrollable simplement.

\* Une seule étape doit être visible à la fois.

\* Les tags doivent passer à la ligne proprement.

\* Aucun débordement horizontal.

\* Le bouton fermer doit rester accessible.



\---



\## Style visuel



Respecter le style actuel du site :



\* Fond noir profond.

\* Texte blanc fort.

\* Accent orange/doré pour le point actif.

\* Accent bleu pour les petits titres.

\* Typographie actuelle.

\* Effets lumineux sobres.

\* Pas de surcharge visuelle.

\* Pas d’animation inutile.



Les tags doivent être simples :



```txt

SAP

Excel VBA

Power BI

SharePoint

```



Sous forme de petites capsules discrètes.



\---



\## Interaction



Ajouter ou conserver :



\* Clic sur “Explorer” pour ouvrir la vue détaillée.

\* Clic sur un point de timeline pour sélectionner l’étape.

\* Bouton de fermeture visible.

\* Touche `Escape` pour fermer.

\* Flèches clavier gauche/droite sur desktop.

\* Scroll vertical simple sur mobile.



\---



\## Règles importantes



La timeline ne doit pas répéter les sections de méthode comme :



```txt

Clarifier avant d’agir

Accélérer sans friction

Données utiles

Design au service de la clarté

```



Ces éléments appartiennent déjà à la page principale.



La timeline doit répondre à une autre question :



> Comment ces compétences se sont construites dans le temps ?



\---



\## Résultat attendu



Après modification, le visiteur doit comprendre :



```txt

Yann n’a pas seulement occupé des postes.

Il a construit progressivement une capacité :

comprendre, structurer, optimiser, digitaliser, automatiser et augmenter l’existant.

```



\---



\## Critères de validation



La modification est réussie si :



\* Les anciens titres de postes ne dominent plus la timeline.

\* Les années restent visibles mais secondaires.

\* Les compétences sont les titres principaux.

\* Les outils apparaissent seulement dans la vue active ou détaillée.

\* Le design reste léger.

\* La timeline ne ressemble pas à un CV classique.

\* L’expérience reste fluide sur desktop et mobile.

\* Le site conserve son style noir, bleu et orange.



