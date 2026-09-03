# Assurance maladie

## Projet
Application locale pour analyser les factures médicales suisses et estimer leur traitement par l'assurance obligatoire LAMal ou complémentaire LCA.

## À quoi il sert
Application web locale (React/Vite) conçue pour analyser les factures médicales suisses et estimer leur traitement par l'assurance obligatoire LAMal ou complémentaire LCA. L'application permet de configurer les membres de la famille, leurs contrats d'assurance, et d'importer des factures au format PDF ou texte pour une analyse automatique. Les estimations sont basées sur les règles configurées pour chaque contrat et chaque membre, avec une attention particulière aux franchises, quote-parts et limites annuelles. L'application ne stocke aucun mot de passe d'assureur et guide l'utilisateur pour l'envoi des justificatifs via les portails officiels.

## Fonctions
- Configuration des membres de la famille et de leurs contrats d'assurance
- Analyse automatique de factures médicales (PDF ou texte brut)
- Détection des champs clés : montant, date, prestataire, catégorie de soin, mode de facturation
- Estimation des remboursements LAMal et complémentaires selon les règles configurées
- Calcul des franchises et quote-parts restantes
- Présentation des montants estimés, des justificatifs requis et des raisons du choix de traitement
- Mode portable pour une utilisation locale sans dépendance à un chemin absolu

## Avancement
- État du projet: prêt côté usage public.
- Fonctionnement: fonctionnel.
- Sécurité: OK pour une présentation publique.
- Ma Méthode: fiche explicative visible.
- Publication externe: GitHub public actif.

## Liens
- Application: pas encore disponible.
- [GitHub](https://github.com/RYJITS/assurance_maladie)
