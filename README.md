# Site Ma Methode

Portfolio immersif de Yann Scheidegger et hub public des projets C2R Design.

Version officielle locale `v37` dans ce dossier. La version publique actuellement en ligne reste la `v33` sur [https://c2rdesign.com/](https://c2rdesign.com/); aucune publication `v37` n'a ete effectuee pendant son officialisation locale.

## Fonctions

- narration video controlee par le scroll;
- fiches interactives de la methode;
- projets explorables en vue Carte ou Liste;
- fiches projets generees depuis le registre de l'orchestrateur;
- contact WebGL avec formulaire PHP;
- service worker pour les ressources essentielles.

## Stack reelle

- HTML, CSS et JavaScript ES modules sans framework;
- serveur statique Node.js sans dependance applicative;
- API PHP pour le formulaire sur l'hebergement;
- WebGL natif pour la scene contact.

Vite n'est pas utilise.

## Demarrage

Pre-requis: Node.js 20 ou plus recent.

```powershell
git clone https://github.com/RYJITS/site_ma_methode.git
cd site_ma_methode
npm install
npm run check
npm test
npm run dev
```

Le site est alors disponible sur `http://127.0.0.1:4177/`. Si ce port est occupe, le serveur choisit automatiquement le suivant.

Pour un test sur le reseau local:

```powershell
npm run dev:iphone
```

### Qualite video adaptative 900p et 1080p

Au demarrage, le site mesure un echantillon de 384 Ko sur le serveur video. Il choisit la 1080p a partir de 6 Mbit/s mesures, sinon la 900p. Le mode economie de donnees, un reseau 3G ou une mesure impossible forcent aussi la 900p. Le choix reste fixe pendant le parcours pour ne pas interrompre le scroll.

La selection est entierement automatique et n'affiche aucun controle dans l'interface. La mesure reelle prime sur l'estimation generique du navigateur lorsqu'elles se contredisent.

### Simuler une connexion lente

Deux profils locaux sont disponibles, aussi depuis un iPhone connecte au meme Wi-Fi:

```powershell
npm run dev:slow
npm run dev:3g
```

- `dev:slow`: 1,6 Mbit/s et 180 ms de latence, port `4191`;
- `dev:3g`: 700 kbit/s et 320 ms de latence, port `4192`.

Le debit est limite par requete par le serveur de test; ce mode n'est jamais utilise en production. Il suffit d'ouvrir l'adresse affichee: la selection 900p/1080p se fait automatiquement.

Le serveur Node sert uniquement les fichiers publics autorises. Il n'execute pas `api/contact.php`; le formulaire complet doit etre verifie dans un environnement PHP de preproduction.

### Compression de transfert

Le serveur local compresse a la volee les fichiers texte de plus de 1 Ko quand le navigateur accepte Gzip. La configuration Apache applique la meme politique a l'hebergement. Les images, les videos et toutes les reponses partielles `Range` restent intactes afin de conserver la lecture et le scroll video.

Mesure de validation sur la version optimisee:

- JavaScript principal: 168 785 octets bruts, 38 597 octets transferes;
- CSS principal: 165 340 octets bruts, 26 376 octets transferes;
- total JavaScript + CSS: 334 125 octets bruts, 64 973 octets transferes, soit -80,6 %;
- aucun fichier source minifie et aucune logique d'interface modifiee.

### Decoupage JavaScript progressif

Les fonctions du formulaire Contact et le rendu complet d'une fiche Projet vivent dans deux modules secondaires. Ils ne sont ni telecharges ni analyses pendant l'ouverture du site:

- `src/contact-panel.js` est charge au premier clic sur Contact;
- `src/project-detail.js` est charge au premier affichage d'une fiche;
- le registre et les 18 vignettes restent disponibles comme avant;
- le service worker utilise la version `v37` pour ne jamais reutiliser l'ancien module principal.

Le module principal passe de 168 785 a 155 964 octets bruts (-7,6 %) et de 38 597 a 36 043 octets transferes en Gzip (-6,6 %). Le couple JavaScript principal + CSS passe ainsi de 64 973 a 62 419 octets transferes. Les deux modules differes representent 4 256 octets Gzip au total et ne sont demandes que si la fonction correspondante est utilisee.

### Finalisation performance v30

Les styles de la grille et des fiches Projet sont sortis du chemin critique. `src/project-grid.css` est charge a la premiere intention utilisateur (survol, focus, toucher ou clic), et l'ouverture attend sa disponibilite. Son insertion avant la feuille principale conserve l'ordre de cascade et le rendu mobile.

Autres optimisations finales:

- hauteur des dix scenes reservee en CSS avant leur injection JavaScript pour supprimer le decalage de mise en page;
- Google Fonts precharge sans bloquer le premier affichage, puis active par le module principal;
- premieres vignettes Projet et image principale de fiche priorisees uniquement quand la grille est demandee;
- HTML et service worker toujours revalides; ressources statiques versionnees mises en cache;
- CSP Apache appliquee et headers defensifs supplementaires;
- metadonnees Open Graph, Twitter, Schema.org et sitemap image completees.

### Synchronisation et publication v33

La version optimisee a ete resynchronisee avec le registre Ma Methode courant. Elle contient 18 fiches et leurs medias, dont Agent Design. La vue Liste desktop reprend exactement les couleurs de sections utilisees sur mobile, et les textes publics ont ete corriges pour conserver les accents hors libelles volontairement affiches en majuscules.

Le 3 septembre 2026, cette version `v37` a remplace localement l'ancien contenu du projet canonique `01_SITE_MA_METHODE`, apres sauvegarde Git et validation complete. L'ancien worktree d'optimisation est conserve sans suppression dans `99_Archive`. Cette officialisation locale ne modifie pas la version `v33` deja en ligne.

La publication Hostinger du 3 septembre 2026 a ete validee en ligne: videos 900p/1080p avec plages HTTP, formulaire PHP, ouverture des fiches, images desktop/iPhone, protections HTTP et absence d'erreur console. Lighthouse mesure 100/100 sur desktop dans les quatre categories; sur mobile, 91 en performance et 100 en accessibilite, bonnes pratiques et SEO.

Mesures finales locales:

- chemin initial JavaScript principal + CSS: 299 658 octets bruts et 59 777 octets Gzip;
- gain face a l'etape precedente: 21 646 octets bruts (-6,7 %) et 2 642 octets Gzip (-4,2 %);
- Lighthouse desktop: Performance 100, Accessibilite 100, Bonnes pratiques 100, SEO 100;
- Lighthouse mobile: Performance 97, Accessibilite 100, Bonnes pratiques 100, SEO 100;
- FCP mobile 1,1 s, LCP mobile 2,5 s, TBT 0 ms et CLS 0 dans la mesure locale Lighthouse.

La video reste volontairement la ressource la plus lourde afin de proteger la fluidite du scroll. Le compromis retenu est la selection automatique 900p/1080p et un tampon initial borne, pas une degradation supplementaire de la qualite.

## Verification

```powershell
npm run check
npm test
npm run assets:check
npm run deploy:check
npm run qa:iphone
```

Les tests couvrent notamment:

- URI malformees et plages HTTP invalides;
- compression Gzip reversible et negociation `Accept-Encoding`;
- absence de compression sur les videos et les reponses partielles;
- chargement differe de Contact et du rendu detaille Projet;
- chargement differe des styles Projet et priorisation des premieres vignettes;
- reservation de hauteur contre les decalages de mise en page;
- survie du serveur apres une requete invalide;
- refus des fichiers internes et des traversals;
- headers de securite;
- cache HTTP de production et CSP appliquee;
- coherence des metadonnees SEO, sociales, Schema.org et sitemap;
- contraintes du formulaire;
- politique de chargement video/WebGL/service worker;
- presence de toutes les ressources publiques referencees, y compris les medias ignores par Git;
- semantique des dialogues, focus et Escape;
- disponibilite des vues Carte et Liste.

## Securite

- Ne jamais publier la racine complete du depot.
- Ne jamais publier `.git`, `.env*`, archives, journaux ou rapports internes.
- Conserver la liste blanche du serveur et le manifeste du bundle Hostinger.
- Verifier `api/contact.php` avec PHP CLI et en preproduction.
- Conserver la CSP appliquee et verifier toute nouvelle source externe avant de l'ajouter a la liste blanche.
- Ne jamais publier sans audit securite vert et autorisation explicite.

La procedure complete est dans `DEPLOIEMENT_CHECKLIST_FR.md`.

## Architecture

- `index.html`: structure et contenu public;
- `src/main.js`: orchestration du parcours;
- `src/styles.css`: styles du parcours initial;
- `src/project-grid.css`: styles Projet charges a la premiere intention utilisateur;
- `src/contact-scene.js`: scene WebGL chargee a la demande;
- `src/contact-panel.js`: formulaire, envoi et redimensionnement charges au premier usage;
- `src/project-detail.js`: rendu securise d'une fiche Projet charge a la demande;
- `src/modal-accessibility.js`: focus et fond inerte des dialogues;
- `src/url-security.js`: liste blanche des schemas de liens;
- `src/project-registry.js`: registre genere par l'orchestrateur;
- `scripts/static-server.mjs`: serveur statique testable;
- `scripts/serve.mjs`: demarrage CLI;
- `scripts/check-deploy-surface.mjs`: controle en lecture seule de la surface publiable;
- `tests/`: tests Node sans dependance externe.

## Publication

Le site public cible est `https://cv.c2rdesign.com/`. La publication Hostinger n'est jamais automatique: suivre la checklist, sauvegarder la version active et utiliser le MCP Hostinger apres validation.
