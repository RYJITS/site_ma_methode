// Fichier genere par 00_ORCHESTRATEUR. Ne pas modifier a la main.
export const orchestratorProjectCards = [
  {
    "id": "00-cerveau-ia",
    "category": "ai",
    "name": "Cerveau IA",
    "comment": "Racine centrale de travail IA. Elle organise les competences, instructions, memoires, API locales et tous les projets suivis par l'orchestrateur.",
    "image": "public/orchestrator/thumbnails/00-cerveau-ia.webp",
    "linkPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "securityStatus": "OK_PUBLIC"
    },
    "ficheUrl": "public/orchestrator/fiches/00-cerveau-ia.md",
    "localPath": "D:/00_Cerveau_IA/Projet/00_CERVEAU_IA",
    "stack": [
      "Dossier projet"
    ],
    "status": {
      "global": "PRIVATE_INTERNAL",
      "security": "OK_PUBLIC",
      "functionality": "NON_TESTABLE_MANQUE_INFO",
      "publication": "PRIVATE_INTERNAL"
    },
    "details": {
      "application": "Cerveau IA est la racine centrale locale du systeme. Elle regroupe les competences, instructions, memoires, API locales et projets. Le dossier `00_CERVEAU_IA` est une entree de representation pour que cette racine soit prise en compte comme projet par l'orchestrateur.",
      "fonctionnement": "La racine reste a son emplacement habituel. L'orchestrateur scanne le dossier dedie dans `Projet` pour produire une fiche, un statut et une carte de suivi, tandis que les contenus reels restent repartis dans `Conpetances`, `Instructions`, `Memoire`, `API` et `Projet`. Cette approche evite de rescanner toute la racine comme un projet unique et limite les risques de doublons ou d'exposition de donnees sensibles.",
      "conception": "Le projet a ete concu comme un pont documentaire: representer le systeme global dans le registre sans deplacer les fichiers, sans recopier les secrets, et sans rendre publique la structure interne detaillee. Il reste donc un projet prive/interne.",
      "capabilities": [
        "Representer la racine Cerveau IA dans le registre",
        "Documenter les dossiers transverses",
        "Relier les memoires et competences au suivi projet",
        "Eviter le scan direct trop large de la racine",
        "Rester compatible multi-projets",
        "Bloquer la publication directe du cerveau central"
      ],
      "tools": [
        "Dossier Projet/00_CERVEAU_IA",
        "Registre orchestrateur",
        "Memoire user et projet",
        "Index memoire",
        "Conpetances npm",
        "Instructions centrales",
        "Configuration API locale"
      ],
      "techniques": [
        "Projet-pont documentaire",
        "Classification PRIVATE_INTERNAL",
        "Generation de fiches Markdown",
        "Scan borne au dossier dedie",
        "Separation racine reelle et representation projet"
      ],
      "automations": [
        "Generation de FICHE_PROJET",
        "Synchronisation dans le registre global",
        "Controle documentation",
        "Mise a jour memoire apres evolution",
        "Regeneration des index memoire"
      ]
    },
    "highlights": [
      "Donner une vue projet au systeme global, meme si sa vraie racine est au-dessus du dossier Projet.",
      "Statut: PRIVATE_INTERNAL.",
      "Securite: OK_PUBLIC."
    ],
    "functions": [
      "Centralise les competences et scripts transverses.",
      "Stocke les instructions et memoires utilisateur/projet.",
      "Conserve les variables locales sensibles dans la configuration API locale.",
      "Contient la racine Projet suivie par l'orchestrateur.",
      "Sert de socle multi-projets au hub Site Ma Methode.",
      "Fiche projet synchronisee depuis l'orchestrateur."
    ],
    "screenshots": [],
    "mediaPolicy": {
      "exposure": "none",
      "publicationAllowed": false,
      "screenshotStatus": "NO_SCREENSHOTS"
    }
  },
  {
    "id": "00-orchestrateur",
    "category": "tools",
    "name": "Orchestrateur global",
    "comment": "Application locale de pilotage du Cerveau IA. Elle gere les taches, les responsables, les frequences, les routines jour/semaine/mois, les audits, les fiches et la synchronisation du hub Site Ma Methode.",
    "image": "public/orchestrator/thumbnails-ai/00-orchestrateur.webp",
    "linkPolicy": {
      "exposure": "blocked-by-security",
      "publicationAllowed": false,
      "securityStatus": "OK_PRIVATE"
    },
    "ficheUrl": "public/orchestrator/fiches/00-orchestrateur.md",
    "localPath": "D:/00_Cerveau_IA/Projet/00_ORCHESTRATEUR",
    "stack": [
      "Node.js"
    ],
    "status": {
      "global": "PRIVATE_INTERNAL",
      "security": "OK_PRIVATE",
      "functionality": "FONCTIONNEL",
      "publication": "PRIVATE_INTERNAL"
    },
    "details": {
      "application": "L'Orchestrateur global est l'application locale qui pilote tout le dossier Projet. Elle sert a savoir quelles taches existent, qui doit les appliquer, a quelle frequence, quels projets sont concernes, quels garde-fous bloquent les risques, et quelles commandes peuvent etre lancees depuis le dashboard.",
      "fonctionnement": "L'application lit deux sources: le registre des projets et le registre des taches. Le registre des taches definit les actions a faire, leur cadence, le responsable, la commande, les routines ou elles apparaissent et les conditions de securite. Le dashboard affiche ce plan de travail, permet de filtrer par frequence ou responsable, et lance uniquement les actions autorisees via l'API locale. Pour chaque action, l'utilisateur choisit l'executeur: script local, Codex superviseur, Mistral API ou Alibaba/Qwen API. Avant une action globale, le dashboard relance un scan de la racine projets pour inclure les nouveaux dossiers.",
      "conception": "Il a ete concu comme une couche prudente au-dessus de toute la racine projets. Chaque action importante est rattachee a une tache explicite, un responsable, une frequence, un executeur et des garde-fous: scanner avant modification, ne pas supprimer directement, ne pas publier sans audit securite OK, archiver ou sauvegarder avant intervention, et garder Site Ma Methode comme hub de lecture plutot que cible isolee.",
      "capabilities": [
        "Ouvrir le dashboard par raccourci Bureau",
        "Ajouter ou supprimer des taches",
        "Creer des sous-taches",
        "Mettre une tache ou sous-tache en pause",
        "Definir quand et par qui chaque action est faite",
        "Installer plus tard les taches depuis le store",
        "Choisir l'executeur par action",
        "Inclure les nouveaux projets par scan automatique",
        "Faire les repos GitHub comme tache active principale",
        "Servir de garde-fou avant diffusion"
      ],
      "tools": [
        "Raccourci Windows Bureau",
        "Registre des taches avec store",
        "Gestion sous-taches",
        "API locale du dashboard",
        "Executeur script local",
        "Executeur Codex superviseur",
        "Mistral API analyse-only",
        "Alibaba/Qwen API analyse-only",
        "Store reinstallable des anciennes taches",
        "Tache active GitHub repos"
      ],
      "techniques": [
        "Node.js en modules ESM",
        "Registre JSON central",
        "Schemas JSON",
        "Scripts npm multi-projets",
        "Rapports Markdown et JSON",
        "Playwright pour verifier le rendu du hub",
        "Sharp pour normaliser les vignettes",
        "Regles GitHub et publication publique separees"
      ],
      "automations": [
        "Scan global des projets",
        "Audit securite et blocage des secrets",
        "Audit nettoyage en dry-run",
        "Verification build/test/lint/dev selon scripts disponibles",
        "Generation des fiches FICHE_PROJET, INSTALLATION_FR et CHANGELOG_FR",
        "Synchronisation Site Ma Methode",
        "Import et optimisation des vignettes IA",
        "Routines daily, weekly et monthly"
      ]
    },
    "highlights": [
      "Savoir quoi faire, qui doit l'appliquer, tous les combien de temps, et bloquer les actions dangereuses avant diffusion.",
      "Statut: PRIVATE_INTERNAL.",
      "Securite: OK_PRIVATE."
    ],
    "functions": [
      "Centralise la liste des taches, responsables et frequences.",
      "Centralise la liste des projets et leurs statuts.",
      "Produit les fiches lisibles par projet.",
      "Controle securite, fonctionnement, GitHub, publication publique et synchronisation site.",
      "Alimente le hub Site Ma Methode avec des donnees propres.",
      "Fiche projet synchronisee depuis l'orchestrateur.",
      "Validation exacte du registre disponible via npm run registry:check.",
      "Controle automatisable detecte via npm run check."
    ],
    "screenshots": [],
    "mediaPolicy": {
      "exposure": "none",
      "publicationAllowed": false,
      "screenshotStatus": "NO_SCREENSHOTS"
    }
  },
  {
    "id": "01-nas",
    "category": "tools",
    "name": "Documentation d'infrastructure serveur personnel - NAS",
    "comment": "Manuel opérationnel pour l'administration, la maintenance et la récupération d'un serveur personnel sécurisé hébergeant n8n, Nextcloud, PostgreSQL et services associés via Docker Compose.",
    "image": "public/orchestrator/thumbnails-ai/01-nas.webp",
    "linkPolicy": {
      "exposure": "blocked-by-security",
      "publicationAllowed": false,
      "securityStatus": "OK_PRIVATE"
    },
    "ficheUrl": "public/orchestrator/fiches/01-nas.md",
    "localPath": "D:/00_Cerveau_IA/Projet/01_NAS",
    "stack": [
      "NAS/Documentation"
    ],
    "status": {
      "global": "PRIVATE_INTERNAL",
      "security": "OK_PRIVATE",
      "functionality": "NON_TESTABLE_MANQUE_INFO",
      "publication": "PRIVATE_INTERNAL"
    },
    "details": {
      "application": "Ce projet est une documentation technique structurée sous forme de fichiers Markdown et JSON, conçue pour centraliser les procédures d'administration, de maintenance et de récupération d'un serveur personnel sécurisé. Il couvre l'installation, la configuration, la gestion des services (n8n, Nextcloud, PostgreSQL, Caddy, Tailscale), les sauvegardes automatiques et manuelles, ainsi que les procédures de récupération après incident. L'objectif est de fournir un manuel opérationnel clair et reproductible pour les administrateurs système ou les utilisateurs techniques, tout en garantissant la sécurité et la confidentialité des données.",
      "fonctionnement": "Le projet fonctionne comme une documentation technique organisée en fichiers Markdown (README.md, documentation_n8n_server.md, etc.) et JSON (rapports, audits). Les services sont gérés via Docker Compose avec des fichiers YAML détaillés pour chaque composant (n8n, PostgreSQL, Caddy, Tailscale). Les sauvegardes sont automatisées via des scripts shell planifiés via cron, incluant des dumps SQL pour les bases de données et des compressions tar.gz des données. Les procédures incluent des commandes pour démarrer, arrêter, vérifier l'état des services, consulter les logs, et effectuer des sauvegardes ou restaurations. La documentation est indexée par l'orchestrateur pour une synchronisation centralisée et une traçabilité des mises à jour.",
      "conception": "Le projet a été conçu comme un espace privé et pratique, indexé par l'orchestrateur mais non publié, afin de répondre à un besoin de centralisation des procédures techniques pour un serveur personnel. La structure privilégie la lisibilité, l'efficacité et la sécurité, avec une séparation claire entre documentation technique et exécution des commandes. Les choix de conception incluent : une documentation modulaire (README, rapports, audits) pour faciliter la maintenance ; des procédures claires et reproductibles pour les tâches critiques (sauvegarde, restauration, récupération) ; une intégration avec l'orchestrateur pour la synchronisation et la traçabilité ; une approche conservative pour éviter toute exposition de données sensibles ou de secrets. La stack technique repose sur Docker Compose pour l'orchestration, des scripts shell pour les sauvegardes, et des outils comme Caddy pour le reverse proxy et HTTPS, Tailscale pour le réseau privé, et UFW pour le pare-feu.",
      "capabilities": [
        "Gestion centralisée des services via Docker Compose",
        "Automatisation des sauvegardes (dumps SQL, compression tar.gz)",
        "Configuration sécurisée (HTTPS via Caddy, pare-feu UFW)",
        "Réseau privé via Tailscale",
        "Procédures de récupération après incident",
        "Documentation modulaire et traçable",
        "Vérification de l'état des services (logs, commandes Docker)",
        "Maintenance et optimisation des services"
      ],
      "tools": [
        "Docker Compose",
        "Caddy (reverse proxy + HTTPS)",
        "Tailscale (réseau privé virtuel)",
        "PostgreSQL (base de données)",
        "n8n (automatisation de workflows)",
        "Nextcloud (stockage et collaboration)",
        "UFW (pare-feu)",
        "Bash (scripts de sauvegarde)",
        "Cron (planification des sauvegardes)",
        "VS Code / WinSCP (accès distant)"
      ],
      "techniques": [
        "Debian 12",
        "Docker",
        "Docker Compose",
        "Markdown",
        "JSON",
        "Bash",
        "Let's Encrypt (certificats HTTPS)",
        "Shell scripting"
      ],
      "automations": [
        "Sauvegardes automatiques planifiées via cron (exécution à 02:00)",
        "Dumps SQL pour Nextcloud/PostgreSQL",
        "Compression tar.gz des données",
        "Purge des sauvegardes de plus de 7 jours",
        "Journalisation des sauvegardes dans `un dossier local dedie`",
        "Indexation automatique dans l'orchestrateur"
      ]
    },
    "highlights": [
      "Centraliser et structurer les procédures d'installation, de configuration, de maintenance, de sauvegarde et de récupération pour un serveur personnel sécurisé, afin de faciliter la gestion opérationnelle et la résilience de l'infrastructure.",
      "Statut: PRIVATE_INTERNAL.",
      "Securite: OK_PRIVATE."
    ],
    "functions": [
      "Documentation des procédures d'installation et de configuration",
      "Centralisation des commandes Docker Compose",
      "Automatisation des sauvegardes (scripts shell et cron)",
      "Vérification de l'état des services (n8n, PostgreSQL, Caddy, Tailscale)",
      "Procédures de récupération après incident",
      "Maintenance et optimisation des services",
      "Gestion des certificats HTTPS via Caddy",
      "Configuration réseau sécurisée (Tailscale, UFW)",
      "Fiche projet synchronisee depuis l'orchestrateur."
    ],
    "screenshots": [],
    "mediaPolicy": {
      "exposure": "none",
      "publicationAllowed": false,
      "screenshotStatus": "NO_SCREENSHOTS"
    }
  },
  {
    "id": "01-site-ma-methode",
    "category": "design",
    "name": "Site Ma Methode",
    "comment": "Vitrine interactive et hub des projets. Elle presente la methode de travail, affiche la carte des applications et ouvre des fiches detaillees synchronisees par l'orchestrateur.",
    "image": "public/orchestrator/thumbnails-ai/01-site-ma-methode.webp",
    "url": "https://cv.c2rdesign.com/",
    "githubUrl": "https://github.com/RYJITS/site_ma_methode",
    "hostingerUrl": "https://cv.c2rdesign.com/",
    "linkPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "securityStatus": "OK_PUBLIC"
    },
    "ficheUrl": "public/orchestrator/fiches/01-site-ma-methode.md",
    "localPath": "D:/00_Cerveau_IA/Projet/01_SITE_MA_METHODE",
    "stack": [
      "Vite/Dev server",
      "Node.js"
    ],
    "status": {
      "global": "PUBLIC_READY",
      "security": "OK_PUBLIC",
      "functionality": "FONCTIONNEL",
      "publication": "PUBLIC_CANDIDATE"
    },
    "details": {
      "application": "Site Ma Methode est la vitrine centrale qui relie les projets du Cerveau IA. La page raconte la methode, propose une experience scroll/video, puis ouvre une carte interactive ou chaque application possede sa vignette, son statut, ses liens et sa fiche.",
      "fonctionnement": "Le site importe un module project-registry.js genere par l'orchestrateur. A l'ouverture de la grille, il place les projets par zones, gere le zoom, le deplacement, les boutons de focus et le panneau detail. Quand une carte est ouverte, le panneau affiche l'image, le resume, les statuts, le lien public, le lien GitHub, la fiche, puis les sections Application, Fonctionnement, Conception, Techniques et Automatisations. Le contact passe par une scene interactive et une API PHP dediee.",
      "conception": "Il a ete concu comme un hub vivant plutot qu'une liste statique. Le design existant garde la narration immersive, mais la couche projet est maintenant alimentee par les donnees de l'orchestrateur pour eviter de recoder les cartes a la main et pour garder les projets synchronises.",
      "capabilities": [
        "Presenter la methode de travail",
        "Ouvrir une carte interactive des projets",
        "Filtrer visuellement par familles de projets",
        "Afficher une fiche detaillee par application",
        "Donner le lien public et GitHub quand ils sont autorises",
        "Afficher les vignettes generees",
        "Envoyer un message via le contact",
        "Garder les contenus sensibles hors de la vitrine"
      ],
      "tools": [
        "Registre fourni par l'orchestrateur",
        "Fiches Markdown publiques",
        "Vignettes IA WebP",
        "Panneau detail dynamique",
        "Scene contact interactive",
        "API PHP de contact",
        "Verification navigateur automatisee",
        "Regles de non-exposition des secrets"
      ],
      "techniques": [
        "Vite",
        "JavaScript modulaire",
        "CSS responsive immersif",
        "Video controlee par le scroll",
        "WebGL pour la scene contact",
        "Registre JavaScript genere",
        "Fiches Markdown publiques",
        "Images WebP optimisees"
      ],
      "automations": [
        "Generation automatique de project-registry.js",
        "Copie des fiches publiques vers public/orchestrator/fiches",
        "Synchronisation des statuts, liens et vignettes",
        "Verification du rendu par script Chromium",
        "Controle que les secrets ne sont pas exposes",
        "Ouverture QA via parametre qaScroll",
        "Import des vignettes IA depuis le dossier thumbnails-ai"
      ]
    },
    "highlights": [
      "Transformer les projets locaux en presentation claire, navigable et diffusable.",
      "Statut: PUBLIC_READY.",
      "Securite: OK_PUBLIC.",
      "Lien Hostinger connu: https://cv.c2rdesign.com/."
    ],
    "functions": [
      "Affiche une grille navigable de tous les projets.",
      "Ouvre une fiche simple et lisible pour chaque application.",
      "Montre les liens publics disponibles quand ils sont autorises.",
      "Garde les informations sensibles hors de la vitrine.",
      "Fiche projet synchronisee depuis l'orchestrateur.",
      "Controle automatisable detecte via npm run check.",
      "Lancement local disponible via npm run dev."
    ],
    "screenshots": [
      "public/orchestrator/captures/01-site-ma-methode/01-site-ma-methode-2026-06-21_23-36-53-desktop.png",
      "public/orchestrator/captures/01-site-ma-methode/01-site-ma-methode-2026-06-21_23-36-53-mobile.png"
    ],
    "mediaPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "screenshotStatus": "HAS_SCREENSHOTS"
    }
  },
  {
    "id": "03-codex-mistral-subagent-skill",
    "category": "ai",
    "name": "Skill Codex Mistral Subagent",
    "comment": "Skill Codex qui encadre l'utilisation de Mistral comme sous-agent pour resumer, classer, extraire, relire ou produire des brouillons sous controle.",
    "image": "public/orchestrator/thumbnails-ai/03-codex-mistral-subagent-skill.webp",
    "githubUrl": "https://github.com/RYJITS/codex-mistral-subagent-skill",
    "linkPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "securityStatus": "OK_PUBLIC"
    },
    "ficheUrl": "public/orchestrator/fiches/03-codex-mistral-subagent-skill.md",
    "localPath": "D:/00_Cerveau_IA/Projet/03_codex-mistral-subagent-skill",
    "stack": [
      "Node.js"
    ],
    "status": {
      "global": "PUBLIC_READY",
      "security": "OK_PUBLIC",
      "functionality": "FONCTIONNEL",
      "publication": "PUBLIC_CANDIDATE"
    },
    "details": {
      "application": "Ce projet est un skill Codex qui permet d'utiliser Mistral comme sous-agent encadre. Il sert a confier des taches bornees comme resumer un dossier, classer des informations, extraire des points importants, relire un texte ou proposer un brouillon.",
      "fonctionnement": "Le skill decrit les cas d'usage autorises, les limites de delegation, les formats attendus et le protocole de securite. Le helper Node peut appeler Mistral pour une tache precise, puis renvoyer une sortie structuree que Codex doit relire avant toute decision ou modification.",
      "conception": "Il a ete concu pour ajouter une aide IA sans perdre le controle principal. Mistral peut accelerer l'analyse ou la redaction, mais il ne publie pas, ne supprime pas, ne pousse pas de code et ne remplace pas les validations de Codex.",
      "capabilities": [
        "Deleguer un resume a Mistral",
        "Demander une classification",
        "Extraire des informations importantes",
        "Produire un brouillon de documentation",
        "Obtenir un second avis",
        "Retourner des donnees structurees",
        "Limiter les taches aux actions non destructives"
      ],
      "tools": [
        "Mistral AI",
        "Helper local de delegation",
        "Catalogue de taches autorisees",
        "Protocole de delegation sure",
        "Validation du skill",
        "Controle de modeles",
        "Sorties JSON ou Markdown relues par Codex"
      ],
      "techniques": [
        "Format SKILL.md Codex",
        "Scripts Node.js",
        "Consignes Markdown",
        "Catalogue de taches",
        "Protocole de delegation sure",
        "Validation npm",
        "Controle des modeles disponibles"
      ],
      "automations": [
        "Validation du skill par npm run validate",
        "Verification syntaxique du helper",
        "Controle de selection des modeles",
        "Generation de sorties structurees",
        "Utilisation en dry-run depuis l'orchestrateur",
        "Separation entre proposition du sous-agent et action reelle"
      ]
    },
    "highlights": [
      "Ajouter un assistant secondaire utile sans lui laisser prendre des decisions risquee ou destructives.",
      "Statut: PUBLIC_READY.",
      "Securite: OK_PUBLIC."
    ],
    "functions": [
      "Decrit quand utiliser Mistral comme sous-agent.",
      "Encadre les taches non destructives.",
      "Produit des sorties structurees et controlables.",
      "Fiche projet synchronisee depuis l'orchestrateur.",
      "Validation automatisable detectee via npm run validate."
    ],
    "screenshots": [],
    "mediaPolicy": {
      "exposure": "none",
      "publicationAllowed": true,
      "screenshotStatus": "SKIPPED_NO_SERVER"
    }
  },
  {
    "id": "05-bord-planif",
    "category": "tools",
    "name": "Bord PLANIF",
    "comment": "Tableau de bord de planification autour d'un classeur metier. Il sert a organiser les lignes de suivi, les jalons, les priorites et les donnees utiles au pilotage.",
    "image": "public/orchestrator/thumbnails-ai/05-bord-planif.webp",
    "url": "https://planner.c2rdesign.com/",
    "githubUrl": "https://github.com/RYJITS/bord_planif",
    "hostingerUrl": "https://planner.c2rdesign.com/",
    "linkPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "securityStatus": "OK_PUBLIC"
    },
    "ficheUrl": "public/orchestrator/fiches/05-bord-planif.md",
    "localPath": "D:/00_Cerveau_IA/Projet/05_Bord_PLANIF",
    "stack": [
      "HTML statique"
    ],
    "status": {
      "global": "PUBLIC_READY",
      "security": "OK_PUBLIC",
      "functionality": "FONCTIONNEL",
      "publication": "PUBLIC_CANDIDATE"
    },
    "details": {
      "application": "Bord PLANIF est une application web locale qui reconstruit un cockpit de planification depuis l'analyse du classeur BORD_DEC_MRPC17.xlsm. Elle ne recopie pas les donnees reelles du fichier: elle reproduit la structure, les feuilles, les volumes, les familles de formules et les actions observables avec un jeu de donnees fictif.",
      "fonctionnement": "L'application ouvre une interface type Excel avec ruban d'actions, onglets de feuilles, barre de formule, grille paginee, filtres, mode compact/complet et edition de lignes. Elle genere environ 14 905 lignes fictives sur 18 feuilles: PLANING, BUFFER, CLIENT, SUIVI_MET, capacites CAPAMET, metteurs en train, archives, PRT, starts, machines, confirmations, gammes, nomenclature et versions production. Les calculs JavaScript simulent les taux de couverture, buffers, capacites, retards, statuts planif et heatmaps de charge. Les modifications restent dans le navigateur via localStorage et les tables peuvent etre importees/exportees en CSV.",
      "conception": "Le projet a ete concu comme un clone fonctionnel et prudent du classeur metier: garder l'ergonomie et la logique de pilotage sans publier les valeurs sensibles du fichier source. La page web separe les jeux fictifs, les calculs recalcules en JavaScript, les vues specialisees et les actions de simulation pour pouvoir presenter ou tester le fonctionnement sans ouvrir le classeur original.",
      "capabilities": [
        "Naviguer dans 18 feuilles de planification type Excel",
        "Lire un cockpit KPI avec risques, lignes actives, capacites et graphiques canvas",
        "Filtrer par statut, semaine, recherche et groupes de colonnes",
        "Consulter les vues Planning, Buffer, Capacite, MET, Sources et Audit",
        "Ajouter, modifier ou supprimer des lignes fictives",
        "Simuler une actualisation et creer un snapshot d'archive",
        "Importer et exporter des tables en CSV",
        "Conserver les changements locaux dans le navigateur"
      ],
      "tools": [
        "Classeur source BORD_DEC_MRPC17.xlsm analyse en structure seulement",
        "Interface HTML/CSS/JavaScript autonome",
        "Grille type Excel",
        "Ruban d'actions",
        "Barre de formule explicative",
        "Canvas pour graphiques KPI",
        "localStorage pour overrides et preferences",
        "Import/export CSV"
      ],
      "techniques": [
        "JavaScript vanilla",
        "Seed deterministe pour donnees fictives",
        "Recalcul de formules Excel en fonctions JS",
        "Pagination et tri cote client",
        "Filtres statut/semaine/recherche",
        "Edition CRUD en modale",
        "Canvas charts",
        "Persistance localStorage"
      ],
      "automations": [
        "Generation deterministe des donnees fictives au chargement",
        "Recalcul automatique des lignes planning et buffer apres edition",
        "Sauvegarde locale des ajouts, modifications et suppressions",
        "Simulation de refresh PowerQuery et journal d'actualisation",
        "Creation de snapshots d'archive depuis les lignes planning",
        "Import CSV avec materialisation dans les overrides",
        "Export CSV de la vue active",
        "Rendu automatique des graphiques selon la vue"
      ]
    },
    "highlights": [
      "Transformer un fichier de planification en cockpit lisible, suivi par l'orchestrateur et pret a etre relie au hub sans ecraser les donnees source.",
      "Statut: PUBLIC_READY.",
      "Securite: OK_PUBLIC.",
      "Lien Hostinger connu: https://planner.c2rdesign.com/."
    ],
    "functions": [
      "Reference le classeur de planification.",
      "Prepare une lecture plus visuelle des jalons et priorites.",
      "Garde le suivi orchestrateur et les statuts de publication separes.",
      "Peut etre presente dans le hub avec une vignette dediee.",
      "Fiche projet synchronisee depuis l'orchestrateur."
    ],
    "screenshots": [
      "public/orchestrator/captures/05-bord-planif/05-bord-planif-2026-06-20_1858-cockpit.png",
      "public/orchestrator/captures/05-bord-planif/05-bord-planif-2026-06-20_1858-planning.png"
    ],
    "mediaPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "screenshotStatus": "SKIPPED_NO_SERVER",
      "publicScreenshotReview": "SAFE_SYNTHETIC_UI"
    }
  },
  {
    "id": "05-generateur-image-c2r",
    "category": "ai",
    "name": "Generateur image C2R",
    "comment": "Studio local de generation d'images C2R. Il expose une interface web, lit le corpus Image valide, lance les generations et organise les retours utiles.",
    "image": "public/orchestrator/thumbnails-ai/05-generateur-image-c2r.webp",
    "githubUrl": "https://github.com/RYJITS/generateur-image-c2r",
    "linkPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "securityStatus": "OK_PUBLIC"
    },
    "ficheUrl": "public/orchestrator/fiches/05-generateur-image-c2r.md",
    "localPath": "D:/00_Cerveau_IA/Projet/05_Generateur image C2R",
    "stack": [
      "Vite/Dev server",
      "React",
      "Node.js"
    ],
    "status": {
      "global": "PUBLIC_READY",
      "security": "OK_PUBLIC",
      "functionality": "FONCTIONNEL",
      "publication": "PUBLIC_CANDIDATE"
    },
    "details": {
      "application": "Generateur image C2R est un studio local pour piloter la generation d'images. Il permet de consulter le corpus Image valide, lancer des generations, suivre les jobs, recuperer les images produites et indiquer celles qui doivent etre gardees ou rejetees.",
      "fonctionnement": "Le serveur Express expose des routes de sante, configuration, galerie, generation, assets, jobs et feedback. L'application lit un manifeste JSON du corpus Image valide, sert les images de facon controlee, cree un job quand une generation est demandee, peut lancer le script C2R historique ou fonctionner en dry-run, puis stocke le resultat et le retour utilisateur. Une image valide peut etre copiee dans le corpus et le manifeste est rafraichi.",
      "conception": "L'outil a ete concu comme une passerelle propre entre l'ancienne chaine C2R et une interface web plus confortable. Les donnees lourdes et le corpus existant ne sont pas dupliques dans le projet; ils sont references par configuration pour garder le depot plus propre.",
      "capabilities": [
        "Consulter la galerie Image valide",
        "Rafraichir le manifeste d'images",
        "Lancer une generation d'image",
        "Suivre les jobs en cours",
        "Servir les images generees",
        "Valider ou rejeter un resultat",
        "Ajouter une image validee au corpus",
        "Utiliser un mode dry-run avant generation reelle"
      ],
      "tools": [
        "Moteur C2R historique",
        "ComfyUI detecte par health check",
        "Manifestes Image valide",
        "Store local de jobs",
        "Journal feedback JSONL",
        "Configuration de chemins C2R",
        "Service local d'assets securise",
        "Runtime outputs/logs/feedback"
      ],
      "techniques": [
        "React/Vite pour l'interface",
        "Express pour l'API locale",
        "Manifestes JSON",
        "Adaptateurs C2R",
        "ComfyUI system_stats",
        "Gestion de jobs",
        "Service d'assets avec verification de chemin",
        "Runtime local pour outputs/logs/feedback"
      ],
      "automations": [
        "Refresh automatique du manifeste Image valide",
        "Controle health du projet, corpus, script legacy et ComfyUI",
        "Creation et suivi de jobs",
        "Mode dry-run de generation",
        "Execution asynchrone du script C2R",
        "Feedback valide/rejete en JSONL",
        "Copie des images validees dans le corpus",
        "Rafraichissement du manifeste apres validation"
      ]
    },
    "highlights": [
      "Creer rapidement des images coherentes avec les projets et transformer les essais visuels en assets reutilisables.",
      "Statut: PUBLIC_READY.",
      "Securite: OK_PUBLIC."
    ],
    "functions": [
      "Centralise une interface de generation d'images.",
      "Lit le corpus Image valide via manifeste.",
      "Lance des jobs de generation et suit leurs resultats.",
      "Aide a valider ou rejeter les images produites.",
      "Fiche projet synchronisee depuis l'orchestrateur.",
      "Controle automatisable detecte via npm run check.",
      "Controle compatibilite detecte via npm run compat:check.",
      "Lancement local disponible via npm run dev.",
      "Build automatisable detecte."
    ],
    "screenshots": [
      "public/orchestrator/captures/05-generateur-image-c2r/05-generateur-image-c2r-2026-06-21_23-36-58-desktop.png",
      "public/orchestrator/captures/05-generateur-image-c2r/05-generateur-image-c2r-2026-06-21_23-36-58-mobile.png"
    ],
    "mediaPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "screenshotStatus": "HAS_SCREENSHOTS"
    }
  },
  {
    "id": "05-gestions-commande-matiere",
    "category": "tools",
    "name": "Gestions Commande Matiere",
    "comment": "Outil de suivi des commandes matiere. Il organise les besoins, les quantites, les etats de stock et les flux de commande autour d'un classeur metier.",
    "image": "public/orchestrator/thumbnails-ai/05-gestions-commande-matiere.webp",
    "githubUrl": "https://github.com/RYJITS/gestions_commande_mati-re",
    "linkPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "securityStatus": "OK_PUBLIC"
    },
    "ficheUrl": "public/orchestrator/fiches/05-gestions-commande-matiere.md",
    "localPath": "D:/00_Cerveau_IA/Projet/05_Gestions_Commande_Matière",
    "stack": [
      "HTML statique"
    ],
    "status": {
      "global": "PUBLIC_READY",
      "security": "OK_PUBLIC",
      "functionality": "FONCTIONNEL",
      "publication": "PUBLIC_CANDIDATE"
    },
    "details": {
      "application": "Gestions Commande Matiere est une application web locale reconstruite depuis l'analyse du classeur COMMANDE_MATIERE.xlsm. Elle sert a piloter des commandes matiere fictives, les archives, les referentiels et le suivi galva sans reutiliser les donnees metier sensibles du fichier original.",
      "fonctionnement": "L'application demarre sur un module de commande matiere avec trois champs manuels: machine, nombre d'OF/laufnotes et type PROD ou MET. A partir de ces entrees, elle auto-remplit les champs gris comme item matiere, type matiere, quantites, couverture, statut planif et responsable fictif. L'utilisateur peut sauvegarder la commande, simuler la creation d'OF, lancer une disponibilite, generer un email fictif et archiver la ligne. Le tableau Archives est filtrable, triable, pagine et editable; le Suivi galva permet d'ajouter ou modifier des lignes; les Referentiels exposent SPC, options, MET, CW724R, seuils manco et articles de verification. Les donnees sont generees localement et conservees dans localStorage.",
      "conception": "Le projet a ete concu comme une reproduction securisee du flux de commande matiere: conserver le parcours utilisateur, les champs et les volumes du classeur, mais remplacer les valeurs reelles par des donnees fictives. Le code met en avant les modules utiles au quotidien: saisie rapide, auto-remplissage, archive exploitable, referentiels modifiables et audit de la structure Excel.",
      "capabilities": [
        "Creer une commande matiere fictive PROD ou MET",
        "Auto-remplir les champs calcules depuis machine, OF et type",
        "Simuler un email de commande puis ajouter la ligne aux archives",
        "Sauvegarder une commande et creer un OF fictif",
        "Lancer une verification de disponibilite fictive",
        "Filtrer, trier, paginer, selectionner et editer les archives",
        "Modifier le suivi galva et ajouter des lignes",
        "Consulter et enrichir les referentiels SPC, options, MET, CW724R, manco et articles de verification",
        "Exporter l'etat local en JSON"
      ],
      "tools": [
        "Classeur source COMMANDE_MATIERE.xlsm analyse en structure seulement",
        "Interface HTML/CSS/JavaScript autonome",
        "Module Commande matiere",
        "Table Archives",
        "Suivi galva editable",
        "Referentiels locaux",
        "Preview email fictif",
        "Export JSON",
        "localStorage"
      ],
      "techniques": [
        "JavaScript vanilla",
        "Donnees fictives seedees",
        "Auto-remplissage par hash des entrees",
        "Filtrage et tri cote client",
        "Pagination table",
        "Edition inline et formulaire",
        "SVG charts pour flux mensuel",
        "Persistance localStorage"
      ],
      "automations": [
        "Generation initiale de 1 525 lignes d'archives fictives",
        "Calcul automatique du statut planif selon couverture",
        "Auto-preview des champs gris pendant la saisie",
        "Creation automatique d'un identifiant de commande et d'OF fictif",
        "Archivage depuis le bouton email fictif",
        "Planification en masse des lignes selectionnees",
        "Sauvegarde automatique des changements localStorage",
        "Regeneration volontaire du jeu fictif"
      ]
    },
    "highlights": [
      "Rendre les commandes matiere plus lisibles, controlables et synchronisables avec le hub sans exposer les donnees sensibles du fichier source.",
      "Statut: PUBLIC_READY.",
      "Securite: OK_PUBLIC."
    ],
    "functions": [
      "Reference le classeur de commande matiere.",
      "Structure les besoins, stocks et commandes.",
      "Separe la presentation publique des donnees sensibles.",
      "Affiche une vignette abstraite au lieu d'une capture du classeur.",
      "Fiche projet synchronisee depuis l'orchestrateur."
    ],
    "screenshots": [],
    "mediaPolicy": {
      "exposure": "none",
      "publicationAllowed": true,
      "screenshotStatus": "SKIPPED_NO_SERVER",
      "publicScreenshotReview": "SAFE_SYNTHETIC_UI"
    }
  },
  {
    "id": "05-orbe-skyia",
    "category": "ai",
    "name": "Orbe SkyIA",
    "comment": "Prototype immersif de SkyIA avec orbe WebGL, selection de modeles, modes chat/jeu, voix, credits, sauvegardes et statistiques.",
    "image": "public/orchestrator/thumbnails-ai/05-orbe-skyia.webp",
    "url": "https://orbe.skyia.net/",
    "githubUrl": "https://github.com/RYJITS/orbe_skyia",
    "hostingerUrl": "https://orbe.skyia.net/",
    "linkPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "securityStatus": "OK_PUBLIC"
    },
    "ficheUrl": "public/orchestrator/fiches/05-orbe-skyia.md",
    "localPath": "D:/00_Cerveau_IA/Projet/05_Orbe_skyia",
    "stack": [
      "Vite/Dev server",
      "React",
      "Three.js/WebGL",
      "Node.js"
    ],
    "status": {
      "global": "NEEDS_REPAIR",
      "security": "OK_PUBLIC",
      "functionality": "NON_FONCTIONNEL_REPARABLE",
      "publication": "PUBLIC_CANDIDATE"
    },
    "details": {
      "application": "Orbe SkyIA est une version experimentale et immersive de SkyIA. L'utilisateur interagit avec une presence visuelle en forme d'orbe, choisit des modeles, lance des modes chat ou jeu, utilise la voix et peut sauvegarder ses sessions.",
      "fonctionnement": "L'application demarre un noyau SkyIA, prepare le backend, charge les modeles disponibles, gere les protocoles de partie, puis route les messages vers les services IA. Les composants gerent le profil, les sauvegardes, le magasin, les rapports, l'installation et le rendu WebGL de l'orbe. Les services audio ajoutent reconnaissance vocale, analyse micro, filtres, synthese vocale et visualisation.",
      "conception": "Le projet a ete concu comme laboratoire d'experience IA: meme logique de jugement et de modeles que SkyIA, mais avec une interface plus expressive. La partie visuelle, la voix, les credits et les sauvegardes servent a tester ce qui peut rendre l'assistant plus present et engageant.",
      "capabilities": [
        "Discuter avec SkyIA en mode immersif",
        "Choisir des modeles et protocoles",
        "Utiliser un mode chat ou jeu",
        "Activer la voix et la synthese vocale",
        "Sauvegarder et reprendre une session",
        "Consulter des rapports de fin de partie",
        "Gerer profil, credits et magasin",
        "Explorer des modeles OpenRouter"
      ],
      "tools": [
        "Gemini",
        "Gemini Live",
        "OpenRouter model discovery",
        "Firebase/Firestore",
        "Fonctions cloud Firebase",
        "Stripe checkout",
        "Web Speech API",
        "Proxy TTS",
        "Analyse micro et filtres audio",
        "Orbe WebGL"
      ],
      "techniques": [
        "React/Vite",
        "TypeScript",
        "Three.js/WebGL",
        "Services Gemini et Gemini Live",
        "OpenRouter model discovery",
        "Firebase/Firestore et fonctions cloud",
        "Stripe checkout",
        "Web Speech API"
      ],
      "automations": [
        "Warm-up du backend au demarrage",
        "Decouverte des modeles OpenRouter",
        "Chargement et filtrage des modeles",
        "Sauvegarde locale et Firestore des sessions",
        "Statistiques de parties via fonctions cloud",
        "Gestion des credits et codes promo",
        "Checkout Stripe",
        "Export PDF de rapports"
      ]
    },
    "highlights": [
      "Explorer une experience SkyIA plus visuelle, vivante et memorisable.",
      "Statut: NEEDS_REPAIR.",
      "Securite: OK_PUBLIC.",
      "Lien Hostinger connu: https://orbe.skyia.net/."
    ],
    "functions": [
      "Met en scene SkyIA sous forme d'orbe interactif.",
      "Permet de choisir des modeles et protocoles de jeu.",
      "Teste voix, audio, sauvegardes, credits et statistiques.",
      "Reste bloque cote diffusion tant que la securite n'est pas OK.",
      "Fiche projet synchronisee depuis l'orchestrateur.",
      "Controle automatisable detecte via npm run check.",
      "Lancement local disponible via npm run dev.",
      "Build automatisable detecte.",
      "Tests automatises detectes."
    ],
    "screenshots": [
      "public/orchestrator/captures/05-orbe-skyia/05-orbe-skyia-2026-06-25_03-17-04-desktop.png",
      "public/orchestrator/captures/05-orbe-skyia/05-orbe-skyia-2026-06-25_03-17-04-mobile.png"
    ],
    "mediaPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "screenshotStatus": "HAS_SCREENSHOTS"
    }
  },
  {
    "id": "05-skyia",
    "category": "ai",
    "name": "SkyIA",
    "comment": "Application principale de jugement IA adversarial. Elle compare des modeles, orchestre des duels, archive les rapports et suit les performances.",
    "image": "public/orchestrator/thumbnails-ai/05-skyia.webp",
    "url": "https://skyia.net/",
    "githubUrl": "https://github.com/RYJITS/skyia",
    "hostingerUrl": "https://skyia.net/",
    "linkPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "securityStatus": "OK_PUBLIC"
    },
    "ficheUrl": "public/orchestrator/fiches/05-skyia.md",
    "localPath": "D:/00_Cerveau_IA/Projet/05_skyia",
    "stack": [
      "Vite/Dev server",
      "React",
      "Node.js"
    ],
    "status": {
      "global": "PUBLIC_READY",
      "security": "OK_PUBLIC",
      "functionality": "FONCTIONNEL",
      "publication": "PUBLIC_CANDIDATE"
    },
    "details": {
      "application": "SkyIA est l'application principale de jugement IA adversarial. Elle met en face un humain ou une IA defensive avec un juge hostile, compare les modeles, archive les duels et transforme les resultats en observatoire de performance.",
      "fonctionnement": "Le frontend React pilote les conversations, les modeles, les sessions et les rapports. L'API PHP gere l'authentification, les modeles, le chat stream, les sauvegardes, les statistiques, les rapports de duel, les latences, les cles utilisateur et les modeles personnalises. Les services front choisissent le fournisseur, compactent le contexte quand le modele a peu de tokens, streament les reponses et extraient les metriques utiles.",
      "conception": "SkyIA a ete concu en deux couches: une interface de jeu/benchmark pour l'utilisateur et une API serveur qui conserve les donnees importantes. Le projet separe les modeles gratuits serveur, les modeles BYOK, les statistiques, les rapports publics et les donnees sensibles pour pouvoir evoluer vers une publication plus propre.",
      "capabilities": [
        "Lancer une conversation avec SkyIA",
        "Comparer plusieurs modeles IA",
        "Jouer un duel juge IA contre defenseur IA",
        "Utiliser des modeles serveur gratuits ou des cles BYOK",
        "Sauvegarder des sessions",
        "Archiver les rapports de duel",
        "Suivre les statistiques et classements",
        "Mesurer la latence des modeles",
        "Gerer des modeles personnalises"
      ],
      "tools": [
        "OpenRouter",
        "Groq",
        "Modeles serveur gratuits",
        "BYOK chiffre cote utilisateur",
        "API PHP/MySQL",
        "Streaming chat",
        "Base rapports dual_reports",
        "Benchmark de latence",
        "Benchmark duel multi-modeles",
        "Audit qualite texte"
      ],
      "techniques": [
        "React/Vite",
        "TypeScript",
        "API PHP",
        "PDO/MySQL",
        "Sessions applicatives",
        "OpenRouter et Groq",
        "Streaming SSE",
        "Stockage chiffre des cles BYOK"
      ],
      "automations": [
        "Warm-up backend",
        "Routage automatique provider/modeles",
        "Compaction de contexte pour modeles low TPM",
        "Migrations et creation de tables API",
        "Backfill de rapports archives",
        "Ingestion de resultats de parties",
        "Benchmark de latence des modeles",
        "Benchmark duel multi-modeles"
      ]
    },
    "highlights": [
      "Donner une interface claire a un protocole IA de jugement, benchmark et suivi de modeles.",
      "Statut: PUBLIC_READY.",
      "Securite: OK_PUBLIC.",
      "Lien Hostinger connu: https://skyia.net/."
    ],
    "functions": [
      "Organise des conversations et duels IA.",
      "Compare les modeles gratuits, serveur et BYOK.",
      "Archive les resultats, statistiques, latences et rapports.",
      "Expose un lien public connu tout en gardant un statut securite separe.",
      "Fiche projet synchronisee depuis l'orchestrateur.",
      "Lancement local disponible via npm run dev.",
      "Build automatisable detecte.",
      "Tests automatises detectes."
    ],
    "screenshots": [
      "public/orchestrator/captures/05-skyia/05-skyia-2026-06-21_23-37-02-desktop.png",
      "public/orchestrator/captures/05-skyia/05-skyia-2026-06-21_23-37-02-mobile.png"
    ],
    "mediaPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "screenshotStatus": "HAS_SCREENSHOTS"
    }
  },
  {
    "id": "10-garden-inn",
    "category": "design",
    "name": "Garden Inn",
    "comment": "Site vitrine multilingue pour Bukit Lawang Garden Inn. Il presente les chambres, le restaurant, les excursions, les transferts, les packages et le contact.",
    "image": "public/orchestrator/thumbnails-ai/10-garden-inn.webp",
    "url": "https://garden-inn.c2rdesign.com/",
    "githubUrl": "https://github.com/RYJITS/garden-inn",
    "hostingerUrl": "https://garden-inn.c2rdesign.com/",
    "linkPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "securityStatus": "OK_PUBLIC"
    },
    "ficheUrl": "public/orchestrator/fiches/10-garden-inn.md",
    "localPath": "D:/00_Cerveau_IA/Projet/10_garden-inn",
    "stack": [
      "Vite/Dev server",
      "React",
      "Node.js"
    ],
    "status": {
      "global": "PUBLIC_READY",
      "security": "OK_PUBLIC",
      "functionality": "FONCTIONNEL",
      "publication": "PUBLIC_CANDIDATE"
    },
    "details": {
      "application": "Garden Inn est le site vitrine de Bukit Lawang Garden Inn. Il presente l'hebergement, les chambres, le restaurant, les excursions, les transferts, les packages et les informations de contact pour convertir les visiteurs en reservations.",
      "fonctionnement": "L'application React affiche les sections principales et suit la section active pendant le scroll. Les donnees de chambres, excursions, transferts et packages sont traduites selon la langue choisie. Les prix en roupies peuvent etre convertis dans plusieurs devises. Les liens de reservation directe, email, itineraire Google Maps et notes Google Places guident l'utilisateur vers l'action.",
      "conception": "Le site a ete concu comme une vitrine touristique orientee reservation. Le contenu est structure par parcours visiteur: decouvrir le lieu, comprendre les offres, filtrer les transferts ou excursions, puis reserver ou contacter.",
      "capabilities": [
        "Presenter les chambres",
        "Presenter restaurant, excursions et packages",
        "Afficher les transferts",
        "Changer de langue",
        "Changer de devise",
        "Convertir les prix",
        "Ouvrir la reservation directe",
        "Creer un itineraire Google Maps",
        "Afficher une note Google Places avec fallback"
      ],
      "tools": [
        "Fichiers de traduction",
        "Convertisseur de devise",
        "Frankfurter exchange rates",
        "Google Maps route URL",
        "Google Places rating",
        "Lien booking direct",
        "Fallback image",
        "Navigation active au scroll"
      ],
      "techniques": [
        "React",
        "Vite",
        "TypeScript",
        "Contextes langue et devise",
        "Fichiers locales JSON",
        "Frankfurter API pour taux de change",
        "IntersectionObserver",
        "Images versionnees/cache-busting"
      ],
      "automations": [
        "Chargement automatique des traductions avec fallback anglais",
        "Sauvegarde langue/devise en localStorage",
        "Conversion dynamique des prix IDR vers EUR/USD/GBP/AUD/SGD/CHF",
        "Detection de section active par IntersectionObserver",
        "Cache-busting des images avec APP_VERSION",
        "Fallback image en cas d'erreur",
        "Rating Google Places avec fallback",
        "Generation de routes Google Maps pour les transferts"
      ]
    },
    "highlights": [
      "Valoriser l'hebergement et orienter les visiteurs vers la reservation directe.",
      "Statut: PUBLIC_READY.",
      "Securite: OK_PUBLIC.",
      "Lien Hostinger connu: https://garden-inn.c2rdesign.com/."
    ],
    "functions": [
      "Presente l'etablissement et ses offres.",
      "Structure les informations utiles pour les visiteurs.",
      "Adapte langue, devise et contenus touristiques.",
      "Relie le projet local a son site public.",
      "Fiche projet synchronisee depuis l'orchestrateur.",
      "Lancement local disponible via npm run dev.",
      "Build automatisable detecte."
    ],
    "screenshots": [
      "public/orchestrator/captures/10-garden-inn/10-garden-inn-2026-06-25_03-17-59-desktop.png",
      "public/orchestrator/captures/10-garden-inn/10-garden-inn-2026-06-25_03-17-59-mobile.png"
    ],
    "mediaPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "screenshotStatus": "HAS_SCREENSHOTS"
    }
  },
  {
    "id": "10-harmos-calc",
    "category": "tools",
    "name": "Harmos Calc",
    "comment": "Calculateur scolaire suisse. Il aide a saisir les notes, calculer les moyennes, lire l'orientation HarmoS et gerer un mode bonus lie au temps de jeu.",
    "image": "public/orchestrator/thumbnails-ai/10-harmos-calc.webp",
    "url": "https://mamoyenne.c2rdesign.com/",
    "githubUrl": "https://github.com/RYJITS/harmos-calc",
    "hostingerUrl": "https://mamoyenne.c2rdesign.com/",
    "linkPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "securityStatus": "OK_PUBLIC"
    },
    "ficheUrl": "public/orchestrator/fiches/10-harmos-calc.md",
    "localPath": "D:/00_Cerveau_IA/Projet/10_harmos-calc",
    "stack": [
      "Vite/Dev server",
      "React",
      "Node.js"
    ],
    "status": {
      "global": "PUBLIC_READY",
      "security": "OK_PUBLIC",
      "functionality": "FONCTIONNEL",
      "publication": "PUBLIC_CANDIDATE"
    },
    "details": {
      "application": "HarmoS Calc est un outil familial de suivi scolaire. Il permet de saisir les notes par matiere, choisir les niveaux A/B/C, calculer les moyennes et comprendre l'orientation possible dans le systeme suisse.",
      "fonctionnement": "L'utilisateur ajoute des notes et composants par matiere. L'application calcule les moyennes par discipline, la moyenne generale, le total des matieres principales et le nombre de niveaux A/B/C. Elle determine ensuite une orientation comme pre-gymnase, moderne ou general, affiche une progression et donne un conseil. Le mode bonus transforme les bonnes notes en temps de jeu et les mauvaises notes en retrait de temps.",
      "conception": "Le projet a ete concu comme un outil de decision simple pour les parents et l'eleve. Il combine calcul scolaire, visualisation immediate et mecanique de motivation, avec un espace parent protege pour gerer les regles sensibles.",
      "capabilities": [
        "Saisir les notes par matiere",
        "Calculer les moyennes",
        "Lire l'orientation HarmoS",
        "Compter les niveaux A/B/C",
        "Afficher progression et conseils",
        "Ajouter ou retirer du temps de jeu",
        "Proteger les reglages parent",
        "Reinitialiser notes, timer ou bonus"
      ],
      "tools": [
        "Moteur de calcul HarmoS",
        "Regles niveaux A/B/C",
        "Mode parent protege",
        "Timer de jeu",
        "Systeme bonus/malus",
        "Journal d'actions parent",
        "Stockage local",
        "Effets confetti et penalite"
      ],
      "techniques": [
        "React",
        "Vite",
        "TypeScript",
        "Calcul cote client",
        "Etat applicatif local",
        "Modal parent protegee par mot de passe",
        "Timer de temps de jeu",
        "Animations confetti et penalite"
      ],
      "automations": [
        "Recalcul automatique des moyennes",
        "Classification automatique de l'orientation",
        "Progression et conseils generes depuis les resultats",
        "Attribution automatique d'heures bonus selon les notes",
        "Retrait automatique si note inferieure a 4",
        "Timer play/pause",
        "Actions parent de reset et bonus/malus",
        "Journalisation des actions parent"
      ]
    },
    "highlights": [
      "Rendre les resultats scolaires plus faciles a comprendre et transformer les notes en suivi concret.",
      "Statut: PUBLIC_READY.",
      "Securite: OK_PUBLIC.",
      "Lien Hostinger connu: https://mamoyenne.c2rdesign.com/."
    ],
    "functions": [
      "Calcule les moyennes par matiere et moyenne generale.",
      "Evalue l'orientation scolaire selon les niveaux.",
      "Ajoute un mode parent et un mode bonus temps de jeu.",
      "Rend les resultats lisibles immediatement.",
      "Fiche projet synchronisee depuis l'orchestrateur.",
      "Lancement local disponible via npm run dev.",
      "Build automatisable detecte."
    ],
    "screenshots": [
      "public/orchestrator/captures/10-harmos-calc/10-harmos-calc-2026-06-25_01-33-15-desktop.png",
      "public/orchestrator/captures/10-harmos-calc/10-harmos-calc-2026-06-25_01-33-15-mobile.png"
    ],
    "mediaPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "screenshotStatus": "HAS_SCREENSHOTS"
    }
  },
  {
    "id": "20-chess-3d-ultimate",
    "category": "design",
    "name": "Chess 3D Ultimate",
    "comment": "Jeu d'echecs 3D dans le navigateur. Il combine plateau WebGL, pieces procedurales, regles chess.js, IA locale et option Gemini.",
    "image": "public/orchestrator/thumbnails-ai/20-chess-3d-ultimate.webp",
    "url": "https://chess.c2rdesign.com/",
    "githubUrl": "https://github.com/RYJITS/chess-3d-ultimate",
    "hostingerUrl": "https://chess.c2rdesign.com/",
    "linkPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "securityStatus": "OK_PUBLIC"
    },
    "ficheUrl": "public/orchestrator/fiches/20-chess-3d-ultimate.md",
    "localPath": "D:/00_Cerveau_IA/Projet/20_chess-3d-ultimate",
    "stack": [
      "Vite/Dev server",
      "React",
      "Three.js/WebGL",
      "Node.js"
    ],
    "status": {
      "global": "PUBLIC_READY",
      "security": "OK_PUBLIC",
      "functionality": "FONCTIONNEL",
      "publication": "PUBLIC_CANDIDATE"
    },
    "details": {
      "application": "Chess 3D Ultimate est un jeu d'echecs 3D jouable dans le navigateur. Il propose un plateau interactif, des pieces procedurales, plusieurs themes visuels et une IA adverse.",
      "fonctionnement": "La partie est geree par chess.js: selection d'une piece, affichage des coups valides, execution du coup, mise a jour du FEN et tour de l'IA noire. La scene Three.js reconstruit le plateau, les pieces, les effets de selection et les animations. L'IA peut jouer en local avec evaluation/minimax ou utiliser Gemini, avec validation du coup repondu et fallback si la reponse n'est pas jouable.",
      "conception": "Le projet a ete concu en separant la logique d'echecs de la scene 3D. Les regles restent fiables grace a chess.js, tandis que Three.js gere le rendu, les themes, les effets et l'interaction souris/raycast.",
      "capabilities": [
        "Jouer une partie d'echecs 3D",
        "Selectionner une piece et voir les coups legaux",
        "Changer de theme visuel",
        "Jouer contre une IA locale",
        "Tester une IA Gemini",
        "Regler la difficulte",
        "Reinitialiser la partie",
        "Voir captures, animations et effets de selection"
      ],
      "tools": [
        "Moteur de regles chess.js",
        "IA locale random/evaluation/minimax",
        "Gemini comme adversaire optionnel",
        "Evaluation de position",
        "Validation des coups Gemini",
        "Fallback si coup invalide",
        "Raycast de selection",
        "Plateau et pieces proceduraux",
        "Themes classic/disney/LEGO"
      ],
      "techniques": [
        "React",
        "Vite",
        "Three.js",
        "chess.js",
        "OrbitControls",
        "Raycaster",
        "Pieces Staunton procedurales",
        "Minimax alpha-beta"
      ],
      "automations": [
        "Generation procedurale du plateau et des pieces",
        "Detection des cases par raycast",
        "Affichage automatique des coups legaux",
        "Execution du tour IA apres le joueur",
        "IA locale random/evaluation/minimax selon difficulte",
        "Validation et fallback des coups Gemini",
        "Effets de capture et environnement anime",
        "Resize automatique de la scene"
      ]
    },
    "highlights": [
      "Creer un jeu d'echecs visuel, interactif et presentable.",
      "Statut: PUBLIC_READY.",
      "Securite: OK_PUBLIC.",
      "Lien Hostinger connu: https://chess.c2rdesign.com/."
    ],
    "functions": [
      "Affiche un plateau d'echecs 3D interactif.",
      "Valide les coups et gere la partie avec chess.js.",
      "Joue les reponses IA en mode local ou Gemini.",
      "Propose plusieurs themes et effets visuels.",
      "Fiche projet synchronisee depuis l'orchestrateur.",
      "Lancement local disponible via npm run dev.",
      "Build automatisable detecte."
    ],
    "screenshots": [
      "public/orchestrator/captures/20-chess-3d-ultimate/20-chess-3d-ultimate-2026-06-27_23-58-17-desktop.png",
      "public/orchestrator/captures/20-chess-3d-ultimate/20-chess-3d-ultimate-2026-06-27_23-58-17-mobile.png"
    ],
    "mediaPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "screenshotStatus": "HAS_SCREENSHOTS"
    }
  },
  {
    "id": "20-jeu3d",
    "category": "design",
    "name": "Jeu 3D",
    "comment": "Jeu navigateur 3D avec course, obstacles, score, niveaux, collisions, invincibilite, munitions, leaderboard local et codes promo SkyIA.",
    "image": "public/orchestrator/thumbnails-ai/20-jeu3d.webp",
    "url": "https://neon-rush.skyia.net/",
    "githubUrl": "https://github.com/RYJITS/jeu3d",
    "hostingerUrl": "https://neon-rush.skyia.net/",
    "linkPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "securityStatus": "OK_PUBLIC"
    },
    "ficheUrl": "public/orchestrator/fiches/20-jeu3d.md",
    "localPath": "D:/00_Cerveau_IA/Projet/20_jeu3d",
    "stack": [
      "Vite/Dev server",
      "React",
      "Three.js/WebGL",
      "Node.js"
    ],
    "status": {
      "global": "PUBLIC_READY",
      "security": "OK_PUBLIC",
      "functionality": "FONCTIONNEL",
      "publication": "PUBLIC_CANDIDATE"
    },
    "details": {
      "application": "Jeu 3D est un runner navigateur en 3D. Le joueur evite des obstacles, gagne des points, monte de niveau, charge une invincibilite, conserve des scores locaux et peut gagner des codes promo SkyIA.",
      "fonctionnement": "La scene React Three Fiber affiche le joueur, l'environnement, les obstacles et les projectiles. Le store Zustand gere le statut menu/playing/gameover, le score, la vitesse, le niveau, les munitions, l'invincibilite, le son, les highscores et les recompenses. Les collisions sont verifiees avec des boites 3D elargies pour eviter les collisions manquees a grande vitesse.",
      "conception": "Le projet a ete concu comme une base de gameplay rapide: un coeur de jeu simple, un rendu WebGL, une progression lisible et une connexion a l'ecosysteme SkyIA via les codes promo.",
      "capabilities": [
        "Jouer un runner 3D",
        "Changer de voie au clavier ou tactile",
        "Eviter les obstacles",
        "Monter de niveau",
        "Charger une invincibilite",
        "Utiliser des munitions",
        "Sauvegarder les meilleurs scores",
        "Copier un code promo SkyIA",
        "Activer ou couper le son"
      ],
      "tools": [
        "Moteur de jeu WebGL",
        "Store de partie",
        "Detection de collision continue",
        "Systeme niveau/vitesse",
        "Invincibilite et ammo",
        "Leaderboard local",
        "Generateur de codes promo",
        "Sauvegarde Firebase des promos",
        "Audio player et postprocessing visuel"
      ],
      "techniques": [
        "React",
        "Vite",
        "TypeScript",
        "Three.js",
        "@react-three/fiber",
        "Zustand",
        "Box3 collision detection",
        "Postprocessing Bloom/Vignette"
      ],
      "automations": [
        "Progression de niveau tous les 10 obstacles",
        "Courbe de vitesse avec limite apres niveau 20",
        "Detection continue des collisions",
        "Charge automatique de l'invincibilite",
        "Gestion ammo/charge et destruction d'obstacle en mode charge",
        "Sauvegarde des 50 meilleurs scores localement",
        "Generation de codes promo selon seuils de score",
        "Sauvegarde asynchrone du code promo Firebase"
      ]
    },
    "highlights": [
      "Tester une base de jeu 3D reutilisable et relier le gameplay a l'ecosysteme SkyIA.",
      "Statut: PUBLIC_READY.",
      "Securite: OK_PUBLIC.",
      "Lien Hostinger connu: https://neon-rush.skyia.net/."
    ],
    "functions": [
      "Lance une scene 3D jouable.",
      "Gere les deplacements, collisions, score et niveaux.",
      "Ajoute charge, invincibilite, munitions et recompenses.",
      "Transforme certains scores en codes promo.",
      "Fiche projet synchronisee depuis l'orchestrateur.",
      "Lancement local disponible via npm run dev.",
      "Build automatisable detecte."
    ],
    "screenshots": [
      "public/orchestrator/captures/20-jeu3d/20-jeu3d-2026-06-25_02-46-46-desktop.png",
      "public/orchestrator/captures/20-jeu3d/20-jeu3d-2026-06-25_02-46-46-mobile.png"
    ],
    "mediaPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "screenshotStatus": "HAS_SCREENSHOTS"
    }
  },
  {
    "id": "20-morphostyle",
    "category": "design",
    "name": "Morphostyle",
    "comment": "Application IA de conseil coiffure et style. Elle analyse une photo, propose des styles adaptes puis genere des apercus et angles supplementaires.",
    "image": "public/orchestrator/thumbnails-ai/20-morphostyle.webp",
    "url": "https://morphostyle.c2rdesign.com/",
    "githubUrl": "https://github.com/RYJITS/morphostyle",
    "hostingerUrl": "https://morphostyle.c2rdesign.com/",
    "linkPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "securityStatus": "OK_PUBLIC"
    },
    "ficheUrl": "public/orchestrator/fiches/20-morphostyle.md",
    "localPath": "D:/00_Cerveau_IA/Projet/20_morphostyle",
    "stack": [
      "Vite/Dev server",
      "React",
      "Node.js"
    ],
    "status": {
      "global": "PUBLIC_READY",
      "security": "OK_PUBLIC",
      "functionality": "FONCTIONNEL",
      "publication": "PUBLIC_CANDIDATE"
    },
    "details": {
      "application": "Morphostyle est une application IA de conseil visuel pour coiffure et style. Elle part d'une photo, recueille un profil de consultation, analyse la morphologie, propose des styles et genere des apercus realistes.",
      "fonctionnement": "L'utilisateur charge une image, renseigne le genre, l'age, le niveau d'entretien, le style de vie et la longueur souhaitee. Gemini analyse ensuite la morphologie avec un schema JSON strict et renvoie la forme du visage, le conseil professionnel et une liste de styles recommandes. L'utilisateur selectionne jusqu'a quatre styles, genere les looks, puis peut demander des angles supplementaires gauche, droite ou dos.",
      "conception": "Le projet a ete concu comme un assistant de consultation: il combine analyse structuree, recommandations lisibles et generation image-to-image. Les prompts insistent sur la conservation de l'identite, du fond, des vetements et de la lumiere afin de modifier surtout la coiffure ou la barbe.",
      "capabilities": [
        "Uploader une photo",
        "Renseigner un profil de consultation",
        "Analyser la morphologie",
        "Recevoir des conseils professionnels",
        "Proposer des styles adaptes",
        "Selectionner jusqu'a quatre looks",
        "Generer des apercus realistes",
        "Demander des angles supplementaires",
        "Eviter les suggestions barbe pour enfant/bebe"
      ],
      "tools": [
        "Gemini pour analyse morphologique",
        "Gemini image-to-image",
        "Schema JSON strict",
        "Prompts de conservation identite/fond/lumiere",
        "Generation quick preview",
        "Generation multi-angle",
        "Retry automatique",
        "Gestion saturation service"
      ],
      "techniques": [
        "React",
        "Vite",
        "TypeScript",
        "@google/genai",
        "Gemini pour analyse JSON",
        "Gemini image-to-image",
        "Upload base64",
        "Schemas stricts"
      ],
      "automations": [
        "Retry automatique avec delai exponentiel",
        "Analyse morphologique en JSON strict",
        "Regles age enfant/bebe sans barbe",
        "Generation rapide de previews",
        "Generation des looks selectionnes",
        "Conservation automatique de l'identite et du contexte dans le prompt",
        "Generation des angles front/left/right/back",
        "Messages de chargement et erreurs service sature"
      ]
    },
    "highlights": [
      "Transformer une photo et un besoin de style en recommandations visuelles exploitables.",
      "Statut: PUBLIC_READY.",
      "Securite: OK_PUBLIC.",
      "Lien Hostinger connu: https://morphostyle.c2rdesign.com/."
    ],
    "functions": [
      "Analyse la morphologie a partir d'une image.",
      "Propose des styles recommandes selon le profil.",
      "Genere des apercus et variantes de coiffure.",
      "Garde l'identite, la lumiere et le contexte pendant les transformations.",
      "Fiche projet synchronisee depuis l'orchestrateur.",
      "Lancement local disponible via npm run dev.",
      "Build automatisable detecte."
    ],
    "screenshots": [
      "public/orchestrator/captures/20-morphostyle/20-morphostyle-2026-06-25_03-17-30-desktop.png",
      "public/orchestrator/captures/20-morphostyle/20-morphostyle-2026-06-25_03-17-30-mobile.png"
    ],
    "mediaPolicy": {
      "exposure": "publication-ready",
      "publicationAllowed": true,
      "screenshotStatus": "HAS_SCREENSHOTS"
    }
  },
  {
    "id": "competance-recherche-emploie",
    "category": "tools",
    "name": "Competance Recherche Emploie",
    "comment": "Pipeline personnel de recherche d'emploi assiste par IA. Il collecte les offres, evalue les opportunites, prepare les dossiers et suit les candidatures.",
    "image": "public/orchestrator/thumbnails-ai/competance-recherche-emploie.webp",
    "linkPolicy": {
      "exposure": "blocked-by-security",
      "publicationAllowed": false,
      "securityStatus": "FAIL_SESSIONS"
    },
    "ficheUrl": "public/orchestrator/fiches/competance-recherche-emploie.md",
    "localPath": "D:/00_Cerveau_IA/Projet/Competance_Recherche_emploie",
    "stack": [
      "Dossier projet"
    ],
    "status": {
      "global": "SENSITIVE_BLOCKED",
      "security": "FAIL_SESSIONS",
      "functionality": "NON_TESTABLE_MANQUE_INFO",
      "publication": "PRIVATE_INTERNAL"
    },
    "details": {
      "application": "Competance Recherche Emploie est un cockpit personnel pour la recherche d'emploi. Il centralise les offres, sources, runs, validations, dossiers, postulations et archives pour transformer la recherche en pipeline suivi.",
      "fonctionnement": "Le flux principal part de l'inbox et des sources d'offres, lance des recherches ou scans, dedoublonne et normalise les donnees, evalue les opportunites, cree des dossiers valides puis suit les candidatures. L'interface web propose des vues recherche, candidatures spontanees, applications, tracking, settings, sources et runs. Les scripts career-ops verifient les donnees, generent des PDF, controlent les liens et analysent les patterns de reponse.",
      "conception": "Le projet a ete concu comme systeme personnel sensible: il melange CV, profil, scoring, sources, candidatures et automatisation IA. La prudence est donc prioritaire: l'orchestrateur l'indexe et le documente, mais bloque la publication automatique et signale les modifications Git existantes.",
      "capabilities": [
        "Centraliser les offres",
        "Scanner des sources",
        "Evaluer les opportunites",
        "Dedoublonner les candidatures",
        "Generer des dossiers valides",
        "Suivre les postulations",
        "Analyser les retours",
        "Creer des PDF de candidature",
        "Controler les offres expirees",
        "Rechercher des entreprises pour candidatures spontanees"
      ],
      "tools": [
        "Pipeline inbox/sources/runs/validations/dossiers/postulations",
        "Mistral search",
        "Gemini evaluation",
        "Playwright PDF et liveness",
        "Zefix lookup",
        "Scanners ATS Greenhouse/Ashby/Lever",
        "Doctor prerequisites",
        "Verifier/normalize/dedup/merge",
        "Analyse patterns",
        "Update rollback avec backup"
      ],
      "techniques": [
        "Node.js",
        "Playwright",
        "Scripts career-ops",
        "Markdown et TSV de suivi",
        "Profil YAML",
        "Portails et sources configurees",
        "Interface JavaScript",
        "API locale"
      ],
      "automations": [
        "Recherche et scan de sources d'offres",
        "Recherche assistee Mistral",
        "Optimisation, seed, discovery et import de sources",
        "Lookup entreprises via Zefix",
        "Validation d'une offre vers dossier de candidature",
        "Doctor des prerequis",
        "Verification integrite du pipeline",
        "Normalisation et deduplication des candidatures"
      ]
    },
    "highlights": [
      "Structurer la recherche d'emploi et transformer les offres en actions suivies.",
      "Statut: SENSITIVE_BLOCKED.",
      "Securite: FAIL_SESSIONS."
    ],
    "functions": [
      "Organise les offres, sources, runs et candidatures.",
      "Aide a valider les opportunites et dossiers.",
      "Suit les statuts, scores, rapports et sources.",
      "Reste traite avec prudence car il contient des donnees personnelles.",
      "Fiche projet synchronisee depuis l'orchestrateur."
    ],
    "screenshots": [],
    "mediaPolicy": {
      "exposure": "none",
      "publicationAllowed": false,
      "screenshotStatus": "NO_SCREENSHOTS"
    }
  }
];
