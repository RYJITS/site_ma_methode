# Cerveau IA

## Liens vers l'application
- Lien public: non detecte
- GitHub: [https://github.com/RYJITS/cerveau_ia_local-showcase](https://github.com/RYJITS/cerveau_ia_local-showcase)

## A quoi sert le projet
Cerveau IA est un environnement local de travail assiste par IA. Il rassemble des instructions communes, des memoires persistantes, des competences reutilisables, des configurations API locales et un ensemble de projets independants. Son objectif est de conserver la continuite du travail entre les sessions et les outils sans melanger les donnees de chaque projet.

## Fonctionnement de l'application ou du projet
Le systeme separe les responsabilites en espaces dedies: les instructions definissent les regles de travail, la memoire conserve les decisions et apprentissages, les competences apportent des methodes reutilisables, les configurations API restent locales, et chaque projet garde ses propres sources et documents. Les assistants utilisent ce contexte commun pour travailler de maniere coherente tout en respectant les limites de chaque projet.

## Comment le projet a ete construit
Le projet suit une approche locale, modulaire et prudente. Les informations partagees entre projets sont centralisees uniquement lorsqu'elles sont reellement transverses; les sources, secrets et donnees metier restent separes. Une representation publique limitee permet de presenter le concept et les fonctions sans exposer la structure privee complete.

## Installation et utilisation
### Installation
Cette vitrine contient la documentation generale partageable du projet. Pour la consulter localement:

```powershell
git clone https://github.com/RYJITS/cerveau_ia_local-showcase.git
cd cerveau_ia_local-showcase
Get-Content README.md
```

Les configurations serveur, adresses reseau et sauvegardes operationnelles restent privees.

### Utilisation
Consulter le README, la fiche projet, le guide d'installation general et le changelog. Le deploiement reel necessite les fichiers prives qui ne font pas partie de cette vitrine.

## Fonctions disponibles dans l'application
- Conserver un contexte IA durable
- Maintenir une memoire utilisateur et des memoires projet
- Reutiliser des competences entre plusieurs projets
- Appliquer des instructions communes
- Separer les configurations sensibles
- Coordonner plusieurs projets sans melanger leurs donnees
- Garder les donnees privees hors des espaces publics

## Outils, IA et moteurs en arriere-plan
- Documents Markdown et JSON
- Scripts Node.js d'automatisation
- Assistants Codex et Mistral
- Index de memoire
- Competences reutilisables
- Configuration API locale

## Automatisations integrees
- Chargement des instructions communes au demarrage d'une session
- Enregistrement des decisions dans la memoire utilisateur ou projet
- Regeneration des index apres une mise a jour de memoire
- Mise a disposition des competences reutilisables
- Application des regles propres au projet actif
- Lecture locale des configurations API sans les publier

## Captures d'ecran
- Aucune capture validee pour cette fiche.

## Mises a jour
- Renommage de la representation locale en 89_cerveau_ia_local (2026-08-07)
- Separation explicite entre l'environnement prive et sa representation publique (2026-08-07)
- Consolidation des regles communes de memoire et de securite (2026-08-07)
