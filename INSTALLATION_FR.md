# Installation - SITE MA METHODE OPTIMISATION 20260902

Dossier local: `01_SITE_MA_METHODE_OPTIMISATION_20260902`

```powershell
cd "01_SITE_MA_METHODE_OPTIMISATION_20260902"
npm install
npm run check
npm test
npm run dev
```

Validation locale complete:

```powershell
npm run deploy:check
npm run qa:iphone -- --port 4190
npm run dev:slow
npm run qa:iphone -- --port 4191
```

La version `v30` charge automatiquement la 1080p sur une connexion mesuree suffisante et la 900p sur une connexion lente. Les styles Projet sont charges au premier usage; aucune action manuelle n'est requise.

Avant toute publication, suivre `DEPLOIEMENT_CHECKLIST_FR.md`. La copie isolee doit rester separee du site d'origine tant que les validations visuelles, fonctionnelles et de securite ne sont pas terminees.
