# Competance Recherche Emploie

## Liens vers l'application
- Lien public: non detecte
- GitHub: non detecte

## A quoi sert le projet
Competance Recherche Emploie est un cockpit personnel pour la recherche d'emploi. Il centralise les offres, sources, runs, validations, dossiers, postulations et archives pour transformer la recherche en pipeline suivi.

## Fonctionnement de l'application ou du projet
Le flux principal part de l'inbox et des sources d'offres, lance des recherches ou scans, dedoublonne et normalise les donnees, evalue les opportunites, cree des dossiers valides puis suit les candidatures. L'interface web propose des vues recherche, candidatures spontanees, applications, tracking, settings, sources et runs. Les scripts career-ops verifient les donnees, generent des PDF, controlent les liens et analysent les patterns de reponse.

## Comment le projet a ete construit
Le projet a ete concu comme systeme personnel sensible: il melange CV, profil, scoring, sources, candidatures et automatisation IA. La prudence est donc prioritaire: l'orchestrateur l'indexe et le documente, mais bloque la publication automatique et signale les modifications Git existantes.

## Installation et utilisation
### Installation
Le projet ne declare pas d'installation applicative standard. Consulter le README public ou la fiche technique du depot si une version partageable existe.

### Utilisation
Utiliser le projet selon les instructions du README public ou de la documentation associee.

## Fonctions disponibles dans l'application
- Centraliser les offres
- Scanner des sources
- Evaluer les opportunites
- Dedoublonner les candidatures
- Generer des dossiers valides
- Suivre les postulations
- Analyser les retours
- Creer des PDF de candidature
- Controler les offres expirees
- Rechercher des entreprises pour candidatures spontanees

## Outils, IA et moteurs en arriere-plan
- Pipeline inbox/sources/runs/validations/dossiers/postulations
- Mistral search
- Gemini evaluation
- Playwright PDF et liveness
- Zefix lookup
- Scanners ATS Greenhouse/Ashby/Lever
- Doctor prerequisites
- Verifier/normalize/dedup/merge
- Analyse patterns
- Update rollback avec backup

## Automatisations integrees
- Recherche et scan de sources d'offres
- Recherche assistee Mistral
- Optimisation, seed, discovery et import de sources
- Lookup entreprises via Zefix
- Validation d'une offre vers dossier de candidature
- Doctor des prerequis
- Verification integrite du pipeline
- Normalisation et deduplication des candidatures
- Merge batch TSV
- Generation PDF via Playwright
- Controle de synchronisation CV
- Liveness check des offres
- Analyse de patterns et blocages
- Systeme update/check/apply/rollback avec backup

## Captures d'ecran
- Aucune capture validee pour cette fiche.

## Mises a jour
- Fiche actualisee depuis le registre orchestrateur et le catalogue projet.

> Fichier genere par l'orchestrateur pour le hub Site Ma Methode.
