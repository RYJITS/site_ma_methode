# Cerveau IA

## Liens vers l'application
- Lien public: non detecte
- GitHub: non detecte

## A quoi sert le projet
Cerveau IA est la racine centrale locale du systeme. Elle regroupe les competences, instructions, memoires, API locales et projets. Le dossier `00_CERVEAU_IA` est une entree de representation pour que cette racine soit prise en compte comme projet par l'orchestrateur.

## Fonctionnement de l'application ou du projet
La racine reste a son emplacement habituel. L'orchestrateur scanne le dossier dedie dans `Projet` pour produire une fiche, un statut et une carte de suivi, tandis que les contenus reels restent repartis dans `Conpetances`, `Instructions`, `Memoire`, `API` et `Projet`. Cette approche evite de rescanner toute la racine comme un projet unique et limite les risques de doublons ou d'exposition de donnees sensibles.

## Comment le projet a ete construit
Le projet a ete concu comme un pont documentaire: representer le systeme global dans le registre sans deplacer les fichiers, sans recopier les secrets, et sans rendre publique la structure interne detaillee. Il reste donc un projet prive/interne.

## Fonctions disponibles dans l'application
- Representer la racine Cerveau IA dans le registre
- Documenter les dossiers transverses
- Relier les memoires et competences au suivi projet
- Eviter le scan direct trop large de la racine
- Rester compatible multi-projets
- Bloquer la publication directe du cerveau central

## Outils, IA et moteurs en arriere-plan
- Dossier Projet/00_CERVEAU_IA
- Registre orchestrateur
- Memoire user et projet
- Index memoire
- Conpetances npm
- Instructions centrales
- Configuration API locale

## Automatisations integrees
- Generation de FICHE_PROJET
- Synchronisation dans le registre global
- Controle documentation
- Mise a jour memoire apres evolution
- Regeneration des index memoire

## Captures d'ecran
- Aucune capture validee pour cette fiche.

## Mises a jour
- Fiche actualisee depuis le registre orchestrateur et le catalogue projet.

> Fichier genere par l'orchestrateur pour le hub Site Ma Methode.
