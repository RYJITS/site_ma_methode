# Checklist de publication — Site Ma Methode

Cette copie n'est pas publiee. Une publication exige une autorisation explicite du proprietaire.

## Gate obligatoire

1. Travailler depuis le worktree isole et identifier le commit exact.
2. Executer `npm run check`, `npm test` puis `npm run deploy:check`.
3. Executer la QA navigateur desktop et mobile.
4. Executer `php -l api/contact.php` dans un environnement PHP compatible.
5. Verifier les requetes valides, invalides, trop longues et limitees sur une preproduction.
6. Verifier que le bundle ne contient que:
   - `index.html`;
   - `.htaccess`;
   - `sw.js`, `robots.txt`, `sitemap.xml`, `llms.txt` et fichiers de verification publics;
   - `src/`, `public/` et `api/contact.php`.
7. Refuser explicitement les dossiers Git, fichiers environnement, ZIP, journaux, rapports et documentation interne.
8. Executer `hostinger:check` et l'audit securite de l'orchestrateur.
9. Creer une sauvegarde de la version publique courante.
10. Publier uniquement via le MCP Hostinger apres accord explicite.

## Verification apres publication

- accueil HTTP 200;
- JavaScript, CSS, images et videos HTTP 200/206;
- URI malformee sans indisponibilite;
- fichiers sensibles HTTP 403/404;
- formulaire valide puis erreurs 400, 413 et 429;
- aucun blocage CSP legitime;
- parcours accueil, carte, liste, fiche et contact sur desktop et mobile;
- retour arriere immediat si une condition echoue.
