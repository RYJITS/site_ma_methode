# Site Ma Methode

## Statut de developpement
Projet canonique officiel local depuis le 3 septembre 2026. Les optimisations `v37` ont ete integrees dans `D:\00_Cerveau_IA\Projet\01_SITE_MA_METHODE` apres sauvegarde Git de l'ancien etat, fusion et validation complete.

Diffusion Ma Methode: **version `v33` active sur le domaine principal; version officielle locale `v37` non publiee**.

Validations principales:
- Audit securite central: `OK_PUBLIC`, aucune alerte.
- Verification fonctionnelle, tests desktop et iPhone: OK.
- Porte Hostinger: OK.
- Deploiement Hostinger `v33`: termine.
- Version officielle locale `v37`: optimisations mobile `v36` conservees et pied de page discret ajoute avec auteur, droits reserves, confidentialite repliable et Contact; non publiee.
- Ancienne copie d'optimisation archivee dans `D:\00_Cerveau_IA\Projet\99_Archive\01_SITE_MA_METHODE_OPTIMISATION_20260902_ARCHIVE_20260903`.

## Liens vers l'application
- Application: [https://c2rdesign.com/](https://c2rdesign.com/)
- GitHub: non detecte

## Avancement du projet
- Etat du projet: canonique local `v37`; public `v33`.
- Fonctionnement: `v37` fonctionnelle et validee localement; `v33` validee en ligne.
- Securite: `OK_PUBLIC`.
- Ma Methode: 18 fiches synchronisees.
- Publication externe: `v33` active sur `c2rdesign.com`; aucune publication `v37` effectuee pendant l'officialisation locale.

## A quoi sert le projet
Site Ma Methode est la vitrine centrale qui relie les projets du Cerveau IA. La page raconte la methode, propose une experience scroll/video, puis ouvre une carte interactive ou chaque application possede sa vignette, son statut, ses liens et sa fiche.

## Fonctionnement de l'application ou du projet
Le site importe un module project-registry.js genere par l'orchestrateur. A l'ouverture de la grille, il place les projets par zones, gere le zoom, le deplacement, les boutons de focus et le panneau detail. Quand une carte est ouverte, le panneau affiche l'image, le resume, les statuts, le lien public, le lien GitHub, la fiche, puis les sections Application, Fonctionnement, Conception, Techniques et Automatisations. Le contact passe par une scene interactive et une API PHP dediee.

## Comment le projet a ete construit
Il a ete concu comme un hub vivant plutot qu'une liste statique. Le design existant garde la narration immersive, mais la couche projet est maintenant alimentee par les donnees de l'orchestrateur pour eviter de recoder les cartes a la main et pour garder les projets synchronises.

## Installation et utilisation
### Installation
Pour installer le projet localement, Node.js doit être installé. Aucune dépendance applicative n'est requise. Les scripts disponibles permettent de lancer le serveur de développement ou de production.

### Utilisation
Après installation, accéder au site via un navigateur en local (par défaut sur `http://127.0.0.1:4177`). La grille s'affiche avec les projets positionnés. Utiliser la molette de la souris pour zoomer, les flèches ou un cliqué-glissé pour se déplacer, et cliquer sur une carte pour ouvrir sa fiche détaillée. Les fiches contiennent des sections comme 'Application', 'Fonctionnement', 'Conception', etc., ainsi que des liens publics et GitHub si disponibles. La scène de contact permet d'envoyer un message après interaction avec l'interface WebGL.

La vidéo de scroll choisit automatiquement la 1080p quand le débit mesuré atteint au moins 6 Mbit/s, et la 900p dans les autres cas. Le mode économie de données, un réseau 3G ou une mesure indisponible déclenchent également le repli 900p. Aucun sélecteur de qualité n'est affiché. Les commandes `npm run dev:slow` et `npm run dev:3g` permettent de tester cette sélection automatique avec un débit et une latence simulés, y compris depuis un iPhone sur le même Wi-Fi.

## Fonctions disponibles dans l'application
- Presenter la methode de travail
- Ouvrir une carte interactive des projets
- Filtrer visuellement par familles de projets
- Afficher une fiche detaillee par application
- Donner le lien public et GitHub quand ils sont autorises
- Afficher les vignettes generees
- Envoyer un message via le contact
- Garder les contenus sensibles hors de la vitrine

## Outils, IA et moteurs en arriere-plan
- Registre fourni par l'orchestrateur
- Fiches Markdown publiques
- Vignettes IA WebP
- Panneau detail dynamique
- Scene contact interactive
- API PHP de contact
- Verification navigateur automatisee
- Compression Gzip des ressources texte sur Node et Apache
- Modules Contact et detail Projet charges uniquement au premier usage
- Styles Projet charges a la premiere intention utilisateur
- Cache HTTP cible, CSP appliquee et metadonnees SEO/social completees
- Regles de non-exposition des secrets

## Automatisations integrees
- Generation automatique de project-registry.js
- Copie des fiches publiques vers public/orchestrator/fiches
- Synchronisation des statuts, liens et vignettes
- Verification du rendu par script Chromium
- Controle que les secrets ne sont pas exposes
- Ouverture QA via parametre qaScroll
- Import des vignettes IA depuis le dossier thumbnails-ai

## Captures d'ecran
- Aucune capture validee pour cette fiche.

## Mises a jour
- Officialisation locale de la v37 dans `01_SITE_MA_METHODE`, avec sauvegarde Git de l'ancien etat canonique, 55/55 tests, QA iPhone et audits centraux verts
- Archivage sans suppression du worktree d'optimisation sous `99_Archive`; branche Git de reprise conservee
- Publication v33 sur c2rdesign.com apres controles locaux, audit securite et validation Hostinger
- Synchronisation des 18 fiches et medias depuis le registre Ma Methode courant
- Couleurs de titres Liste desktop alignees sur mobile et accents publics corriges
- Lighthouse public: desktop 100/100 partout; mobile 91 performance et 100/100 sur les trois autres categories
- Finalisation v30: Lighthouse desktop 100/100 dans les quatre categories et mobile 97/100 performance, 100/100 accessibilite, bonnes pratiques et SEO
- Suppression du CLS initial par reservation CSS de la hauteur des dix scenes de scroll
- Styles Projet sortis du chemin critique, avec cascade mobile preservee et premieres vignettes prioritaires a l'ouverture
- Cache de production, CSP Apache appliquee, headers defensifs et sitemap image ajoutes
- Decoupage JavaScript progressif: Contact et rendu detaille Projet sortis du module initial
- Module principal reduit de 168 785 a 155 964 octets bruts, sans changement visuel ni fonctionnel
- Compression Gzip du HTML, CSS, JavaScript, SVG, texte et XML, sans toucher aux videos, images ni plages HTTP
- Transfert initial JavaScript + CSS reduit de 334 125 a 64 973 octets (-80,6 %) sans modification visuelle ou fonctionnelle
- Sélection automatique entre 900p et 1080p à partir d'une mesure réelle de débit
- Retrait de la 480p de la surface publique; fichier conservé dans l'archive de la copie isolée
- Préchargement vidéo déclenché pendant l'écran d'ouverture, avec attente bornée et poursuite en arrière-plan
- Suppression du comparateur provisoire après validation; sélection automatique invisible conservée
- Report de l'affiche Contact et du registre Projets après le chargement vidéo initial
- Profils réseau local lent/3G pour valider la sélection automatique
- Intégration d'un registre de projets généré automatiquement par l'orchestrateur pour éviter la maintenance manuelle des cartes
- Ajout d'une scène de contact interactive basée sur WebGL pour une expérience immersive
- Optimisation des vignettes en format WebP pour un chargement plus rapide
- Mise en place d'une vérification automatisée des navigateurs via Playwright pour garantir la compatibilité
- Enrichissement de la documentation avec des rapports fonctionnels et des captures d'écran
