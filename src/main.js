import { setModalBackgroundInert, setSiblingContentInert, trapFocusWithin } from "./modal-accessibility.js?v=optimisation-v19-20260903";
import { calculateMegabitsPerSecond, chooseAdaptiveVideoQuality } from "./video-quality.js?v=optimisation-v25-20260903";

const deferredFontStylesheet = document.getElementById("site-fonts");
if (deferredFontStylesheet instanceof HTMLLinkElement) deferredFontStylesheet.rel = "stylesheet";

const CONTACT_SCENE_MODULE = "./contact-scene.js?v=contact-lazy-20260616";
const CONTACT_PANEL_MODULE = "./contact-panel.js?v=contact-panel-lazy-v33-20260903";
const PROJECT_REGISTRY_MODULE = "./project-registry.js?v=resultat-global-fiches-v33-20260903";
const PROJECT_DETAIL_MODULE = "./project-detail.js?v=project-detail-lazy-v33-20260903";
const PROJECT_GRID_STYLESHEET = new URL("./project-grid.css?v=project-grid-lazy-v33-20260903", import.meta.url).href;
const PROJECT_THUMBNAIL_VERSION = "resultat-global-fiches-v33-20260903";
const PAGE_PARAMS = new URLSearchParams(window.location.search);
const DEBUG_MOBILE = PAGE_PARAMS.has("debugMobile");
const STORY_VIDEO_SOURCES = Object.freeze({
  900: "public/generated/videos/storyboard-7-scenes-v4-compress-block/kling-assembled/storyboard-kling-12-clips-900p-scroll-test-20260903.mp4?v=video-scroll-v23-20260903",
  1080: "public/generated/videos/storyboard-7-scenes-v4-compress-block/kling-assembled/storyboard-kling-12-clips-1080p-scroll-web-optimized-20260614.mp4?v=video-scroll-v23-20260903"
});
const VIDEO_SPEED_PROBE_BYTES = 384 * 1024;
const VIDEO_SPEED_PROBE_TIMEOUT = 3200;
const PROJECT_GRID_HASHES = Object.freeze(["#projets", "#projet", "#applications"]);
const STATIC_ANCHOR_IDS = Object.freeze(["ma-methode", "references-projets"]);
const METHOD_CARD_ASSET_SOURCES = Object.freeze([
  "public/generated/images/textures/method-card-edge-v2/method-card-edge-v2-plate.webp",
  "public/generated/images/textures/method-card-edge-v2/method-card-edge-v2-grain.webp"
]);
const METHOD_CARD_FIT_STYLE_PROPS = Object.freeze([
  "--card-copy-fit-size",
  "--card-copy-fit-leading",
  "--card-text-fit-gap",
  "--card-point-fit-gap",
  "--card-point-fit-padding"
]);

const video = document.getElementById("story-video");
const projectFinalImage = document.getElementById("project-final-image");
const contactMedia = document.getElementById("contact-media");
const contactTransitionVideo = document.getElementById("contact-transition-video");
const contactFinalImage = document.getElementById("contact-final-image");
const contactImageTrigger = document.getElementById("contact-image-trigger");
const story = document.getElementById("story-scroll");
const afterStory = document.getElementById("after-story");
const contactCanvas = document.getElementById("contact-webgl");
const contactDock = document.getElementById("contact-dock");
const contactTrigger = document.getElementById("contact-trigger");
const contactPanel = document.getElementById("contact-panel");
const contactClose = document.getElementById("contact-close");
const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");
const contactResizeHandle = document.getElementById("contact-resize-handle");
const contactReceived = document.getElementById("contact-received");
const bootLoader = document.getElementById("boot-loader");
const bootLoaderBar = document.getElementById("boot-loader-bar");
const bootLoaderPercent = document.getElementById("boot-loader-percent");
const bootLoaderLabel = document.getElementById("boot-loader-label");
const explorerPoint = document.getElementById("explorer-point");
const scrollCoach = document.getElementById("scroll-coach");
const guidedCursor = document.getElementById("guided-cursor");
const holographicTile = document.getElementById("holographic-tile");
const methodCards = Array.from(document.querySelectorAll(".method-card"));
const projectGridOverlay = document.getElementById("project-grid-overlay");
const projectGridStage = document.getElementById("project-grid-stage");
const projectGridTrack = document.getElementById("project-grid-track");
const projectMobilePage = document.getElementById("project-mobile-page");
const projectGridClose = document.getElementById("project-grid-close");
const projectGridZoomOut = document.getElementById("project-grid-zoom-out");
const projectGridZoomIn = document.getElementById("project-grid-zoom-in");
const projectGridZoomReset = document.getElementById("project-grid-zoom-reset");
const projectGridViewMap = document.getElementById("project-grid-view-map");
const projectGridViewList = document.getElementById("project-grid-view-list");
const projectGridCompassButtons = Array.from(document.querySelectorAll("[data-project-grid-focus]"));
const projectDetailPanel = document.getElementById("project-detail-panel");
const VIDEO_DISPLAY_SCALE = 0.64;
const VIDEO_FINAL_HOLD_FROM = 0.815;
const FINAL_VIDEO_FADE_START = 0.82;
const FINAL_VIDEO_FADE_END = 0.865;
const FINAL_PROJECT_IMAGE_IN_START = 0.875;
const FINAL_PROJECT_IMAGE_IN_END = 0.895;
const FINAL_PROJECT_IMAGE_OUT_START = 0.935;
const FINAL_PROJECT_IMAGE_OUT_END = 0.955;
const FINAL_CONTACT_IMAGE_IN_START = 0.97;
const FINAL_CONTACT_IMAGE_IN_END = 0.99;
const PROJECT_MEDIA_PRELOAD_FROM = 0.72;
const CONTACT_MEDIA_PRELOAD_FROM = 0.9;
const TEXT_HOLD_PROGRESS = 0.018;
const KLING_CLIP_PROGRESS = 1 / 12;
const GUIDED_SCROLL_DEMO_SECTION_ID = "methodologie";
const GUIDED_SCROLL_DEMO_RAW_START = clipAnchor(2.5) + 0.012;
const GUIDED_SCROLL_DEMO_RAW_END = GUIDED_SCROLL_DEMO_RAW_START + 0.3;
const GUIDED_SCROLL_DEMO_EXIT_PROGRESS = clipAnchor(2.5) + 0.02;
const GUIDED_SCROLL_DEMO_OPEN_AT = 0.18;
const GUIDED_SCROLL_DEMO_CLOSE_AT = 0.96;
const energy = {
  layer: document.getElementById("energy-links"),
  main: document.getElementById("energy-path-main"),
  secondary: document.getElementById("energy-path-secondary"),
  spark: document.getElementById("energy-path-spark"),
  core: document.getElementById("energy-impact-core"),
  ring: document.getElementById("energy-impact-ring")
};
const CARD_TITLES = ["MA PHILOSOPHIE", "MON APPROCHE", "APPLICATIONS"];
const CARD_POINT_TITLES = [
  ["Point de d\u00e9part", "Lecture", "Objectif"],
  ["Comprendre", "Structurer", "P\u00e9renniser"],
  ["Construction", "Outils", "R\u00e9sum\u00e9"]
];
const CARD_LAYOUT_CLASSES = [
  "card-layout-fan",
  "card-layout-left-rise",
  "card-layout-right-rise",
  "card-layout-crown",
  "card-layout-low-arc",
  "card-layout-tight-spread",
  "card-layout-deep-stack"
];
const METHOD_CARD_FRONT_ROTATIONS = [-2.6, 2.2, -1.7];
const METHOD_CARD_BACK_ROTATIONS = [0, 2.6, -2.4];
const METHOD_CARD_COPY_MIN_SCALE = 0.72;
const METHOD_CARD_FIT_TOLERANCE = 1;
const PROJECT_GRID_PAN_STEP = 72;
const PROJECT_GRID_MIN_CARD_DISTANCE = 460;
const PROJECT_GRID_MAX_CARD_OVERLAP = 0;
const PROJECT_GRID_LABEL_SAFE_PADDING = 88;
const PROJECT_GRID_INITIAL_THEME = "tools";
const PROJECT_GRID_ZOOM_MIN = 0.46;
const PROJECT_GRID_ZOOM_MAX = 1.85;
const PROJECT_GRID_ZOOM_STEP = 0.16;
const PROJECT_GRID_BASE_CELL_SIZE = 83.2;
const PROJECT_GRID_THEME_ZONES = {
  tools: { x: -1180, y: 170, width: 1500, height: 1320 },
  design: { x: 120, y: -860, width: 1180, height: 880 },
  ai: { x: 1190, y: 140, width: 1160, height: 1120 },
  supply: { x: 120, y: 920, width: 980, height: 760 }
};
const PROJECT_GRID_THEME_MARKERS = [
  { id: "tools", label: "Outils", x: -1260, y: -360 },
  { id: "design", label: "Design", x: 20, y: -1120 },
  { id: "ai", label: "IA", x: 1200, y: -340 }
];
const PROJECT_MOBILE_CATEGORY_ORDER = ["tools", "ai", "design"];
const methodCoreCards = [
  [
    "Je ne cherche pas \u00e0 tout r\u00e9inventer.",
    "Je commence par comprendre comment les personnes, les donn\u00e9es et les processus interagissent r\u00e9ellement.",
    "Mon objectif reste toujours le m\u00eame: plus clair, plus rapide, plus solide."
  ],
  [
    "Comprendre: observer le terrain, \u00e9couter les utilisateurs et analyser les donn\u00e9es.",
    "Structurer: organiser l'information pour rendre les d\u00e9cisions plus simples.",
    "Optimiser et p\u00e9renniser ce qui apporte une r\u00e9elle valeur."
  ],
  [
    "Je construis mes projets \u00e0 partir d'un besoin r\u00e9el: comprendre le flux, structurer l'information, puis cr\u00e9er l'outil utile.",
    "J'utilise SAP, Excel, JavaScript, Node.js, scripts locaux, IA, Markdown et interfaces web selon le probl\u00e8me.",
    "Le projet devient un syst\u00e8me clair: donn\u00e9es, automatisations, application et suivi restent reli\u00e9s."
  ]
];
const METHOD_CARD_VISUALS = {
  methodologie: {
    0: {
      mode: "cover",
      image: "/public/generated/images/method-cards/ma-philosophie-cyan-gold-v3-20260902.webp",
      alt: "Des sources dispersées passent dans un prisme d'analyse et deviennent un flux clair avec les chiffres 12, 4 et 1.",
      words: ["Comprendre", "Relier", "Simplifier"],
      phrase: "Observer les sources avant de choisir."
    },
    1: {
      mode: "cover",
      image: "/public/generated/images/method-cards/mon-approche-neutral-people-cyan-gold-v11-20260902.webp",
      alt: "Un audit terrain montre plusieurs personnes concernées, leurs points de vue et le tri des informations utiles.",
      words: ["Terrain", "Tri", "Utile"],
      phrase: "Trier le terrain pour garder le signal."
    },
    2: {
      mode: "cover",
      image: "/public/generated/images/method-cards/applications-cyan-gold-v10-20260902.webp",
      alt: "Des sources et outils disponibles sont triés, simplifiés puis reliés à une application avec suivi KPI continu.",
      words: ["Choisir", "Simplifier", "Suivre"],
      phrase: "Relier l'outil au suivi utile."
    }
  },
  "methode-01": {
    0: {
      mode: "cover",
      image: "/public/generated/images/method-cards/clarifier-board-philosophie-v1-20260902.webp",
      alt: "Un tableau de d\u00e9cision rassemble points de vue, documents et observations terrain avant de clarifier le probl\u00e8me.",
      words: ["Terrain", "Documents", "Processus"],
      phrase: "Tout part des points de vue réels."
    },
    1: {
      mode: "cover",
      image: "/public/generated/images/method-cards/clarifier-board-approche-v1-20260902.webp",
      alt: "Un tableau de d\u00e9cision croise les contradictions, \u00e9carte le bruit et garde le signal utile.",
      words: ["Trier", "Filtrer", "Analyser"],
      phrase: "Le bruit se sépare du signal."
    },
    2: {
      mode: "cover",
      image: "/public/generated/images/method-cards/clarifier-board-applications-v1-20260902.webp",
      alt: "Un tableau de d\u00e9cision transforme le signal utile en outils choisis, flux valid\u00e9 et suivi KPI.",
      words: ["Choisir", "Valider", "Suivre"],
      phrase: "La solution se vérifie par KPI."
    }
  },
  "methode-02": {
    0: {
      mode: "cover",
      image: "/public/generated/images/method-cards/accelerer-philosophie-flux-sans-friction-v1-20260902.webp",
      alt: "Un flux lumineux contourne puis élimine les blocages qui ralentissaient le parcours.",
      words: ["Vitesse", "Friction", "Flux"],
      phrase: "Les blocages sont localisés."
    },
    1: {
      mode: "cover",
      image: "/public/generated/images/method-cards/accelerer-approche-automatiser-etapes-v1-20260902.webp",
      alt: "Des étapes répétitives sont filtrées, simplifiées puis transformées en automatisation directe.",
      words: ["Identifier", "Simplifier", "Automatiser"],
      phrase: "Les gestes inutiles sortent du parcours."
    },
    2: {
      mode: "cover",
      image: "/public/generated/images/method-cards/accelerer-applications-pipeline-outils-v1-20260902.webp",
      alt: "Des outils, scripts et automatisations convergent vers un pipeline fluide avec suivi visible.",
      words: ["Scripts", "API", "Suivi"],
      phrase: "Les répétitions deviennent automatisation."
    }
  },
  "methode-03": {
    0: {
      mode: "cover",
      image: "/public/generated/images/method-cards/solidifier-philosophie-risque-amont-v2-20260902.webp",
      alt: "Un flux montre un signal de risque détecté en amont, puis un contrôle avant le système protégé.",
      words: ["Anticiper", "Protéger", "Prévenir"],
      phrase: "Les risques apparaissent avant l'urgence."
    },
    1: {
      mode: "cover",
      image: "/public/generated/images/method-cards/solidifier-approche-garde-fous-v1-20260902.webp",
      alt: "Un flux traverse plusieurs garde-fous simples qui bloquent les chemins instables.",
      words: ["Garde-fous", "Contrôle", "Standard"],
      phrase: "Des garde-fous stabilisent le flux."
    },
    2: {
      mode: "cover",
      image: "/public/generated/images/method-cards/solidifier-applications-controles-tests-v1-20260902.webp",
      alt: "Des contrôles, tests, sauvegardes et rapports entourent une plateforme validée.",
      words: ["Tests", "Logs", "Maintenir"],
      phrase: "Le système reste vérifiable."
    }
  },
  "methode-04": {
    0: {
      mode: "cover",
      image: "/public/generated/images/method-cards/donnees-philosophie-signal-action-v1-20260902.webp",
      alt: "Une masse de données se filtre en un seul signal d'action lumineux.",
      words: ["Données", "Signal", "Action"],
      phrase: "Le signal utile sort du bruit."
    },
    1: {
      mode: "cover",
      image: "/public/generated/images/method-cards/donnees-approche-structurer-indicateurs-v1-20260902.webp",
      alt: "Des flux de données centralisés deviennent des indicateurs simples et lisibles.",
      words: ["Collecter", "Structurer", "Visualiser"],
      phrase: "Les données deviennent indicateurs."
    },
    2: {
      mode: "cover",
      image: "/public/generated/images/method-cards/donnees-applications-decisions-nettes-v1-20260902.webp",
      alt: "Des couches de données, fichiers, graphiques et modèles convergent vers un tableau de décision priorisé.",
      words: ["Scores", "Statuts", "Décider"],
      phrase: "Les priorités deviennent visibles."
    }
  },
  "methode-05": {
    0: {
      mode: "cover",
      image: "/public/generated/images/method-cards/ameliorer-philosophie-retours-progres-v1-20260902.webp",
      alt: "Un système imparfait est transformé par des boucles de retour en version plus propre et plus stable.",
      words: ["Retour", "Apprendre", "Progrès"],
      phrase: "Chaque retour devient matière utile."
    },
    1: {
      mode: "cover",
      image: "/public/generated/images/method-cards/ameliorer-approche-mesurer-analyser-v1-20260902.webp",
      alt: "Un cycle mesure, analyse et améliore chaque version pour renforcer progressivement le système.",
      words: ["Mesurer", "Analyser", "Améliorer"],
      phrase: "Chaque cycle renforce la version."
    },
    2: {
      mode: "cover",
      image: "/public/generated/images/method-cards/ameliorer-applications-versions-validations-v1-20260902.webp",
      alt: "Des versions successives, validations et retours gardent un projet vivant sans perdre ce qui fonctionne.",
      words: ["Versions", "Valider", "Évoluer"],
      phrase: "Le projet évolue sans perdre l'acquis."
    }
  },
  "methode-06": {
    0: {
      mode: "cover",
      image: "/public/generated/images/method-cards/design-philosophie-minimaliser-bouton-v1-20260902.webp",
      alt: "Un bouton central isole l'action utile pendant que le bruit visuel reste en retrait.",
      words: ["Minimaliser", "Bouton", "Utile"],
      phrase: "L'action utile devient évidente."
    },
    1: {
      mode: "cover",
      image: "/public/generated/images/method-cards/design-approche-navigation-fonctions-v1-20260902.webp",
      alt: "Des fonctions d'interface sont triées puis placées sur le chemin de navigation le plus direct.",
      words: ["Fonctions", "Pertinence", "Navigation"],
      phrase: "Chaque fonction trouve sa place."
    },
    2: {
      mode: "cover",
      image: "/public/generated/images/method-cards/design-applications-navigation-optimisee-v2-20260902.webp",
      alt: "Une carte de navigation réduit plusieurs options en un chemin clair vers l'action principale.",
      words: ["Chemin", "Priorité", "Action"],
      phrase: "La navigation devient le chemin le plus court."
    }
  }
};
const holographicTiles = {
  methodologie: {
    label: "Ma mani\u00e8re de fonctionner",
    layout: "card-layout-fan",
    outcome: {
      value: "12 sources -> 4 étapes",
      label: "-> 1 flux clair",
      detail: "Le fil unique qui relie source, décision et suivi.",
      projectGuide: "Grille projet"
    },
    cards: methodCoreCards
  },
  "methode-01": {
    label: "Clarifier avant d'agir",
    layout: "card-layout-fan",
    outcome: {
      value: "3 vues -> 1 décision",
      label: "Problème lisible",
      detail: "Terrain, documents et indicateurs convergent avant l'action."
    },
    cards: [
      [
        "Je cherche les informations au plus pr\u00e8s du terrain.",
        "Je croise les personnes, les documents, les machines et les indicateurs.",
        "Je veux comprendre tous les points de vue avant de d\u00e9cider."
      ],
      [
        "Je rassemble ce qui a \u00e9t\u00e9 observ\u00e9.",
        "Je trie, filtre et analyse pour s\u00e9parer le signal du bruit.",
        "Je garde une lecture simple, v\u00e9rifiable et utile."
      ],
      [
        "Je choisis les outils adapt\u00e9s \u00e0 ce qui existe d\u00e9j\u00e0.",
        "Je simplifie le flux, supprime l'inutile et fais valider la solution.",
        "Les KPI et le suivi rendent l'am\u00e9lioration durable."
      ]
    ]
  },
  "methode-02": {
    label: "Acc\u00e9l\u00e9rer sans frictions",
    layout: "card-layout-left-rise",
    outcome: {
      value: "5 gestes -> 2 actions",
      label: "Parcours plus court",
      detail: "Les manipulations diminuent quand l'inutile sort du flux."
    },
    cards: [
      [
        "La vitesse seule ne suffit pas.",
        "Je cherche ce qui ralentit les personnes, les processus et les d\u00e9cisions.",
        "Moins de friction donne plus de mouvement utile."
      ],
      [
        "J'identifie les \u00e9tapes inutiles.",
        "Je simplifie les actions sans valeur ajout\u00e9e.",
        "J'automatise ce qui se r\u00e9p\u00e8te pour raccourcir le parcours."
      ],
      [
        "Le r\u00e9sultat doit supprimer les reprises manuelles et les gestes r\u00e9p\u00e9t\u00e9s.",
        "Scripts, Node.js, Excel, API, IA et automatisations locales deviennent un pipeline simple.",
        "On obtient moins de manipulations et un parcours plus fluide \u00e0 suivre."
      ]
    ]
  },
  "methode-03": {
    label: "Solidifier le syst\u00e8me en amont",
    layout: "card-layout-right-rise",
    outcome: {
      label: "Système vérifiable",
      detail: "Risques, contrôles et preuves restent visibles avant production."
    },
    cards: [
      [
        "Les meilleurs probl\u00e8mes sont ceux qui n'apparaissent jamais.",
        "Je cherche les risques avant qu'ils deviennent urgents.",
        "La robustesse se construit en amont, pas dans la panique."
      ],
      [
        "Je pr\u00e9viens les risques potentiels.",
        "Je contr\u00f4le avec des garde-fous simples.",
        "Je standardise ce qui doit rester stable dans le temps."
      ],
      [
        "Le r\u00e9sultat se joue aussi dans la partie invisible: contr\u00f4les, statuts, sauvegardes et logs.",
        "Git, scripts de v\u00e9rification, cron, rapports, checklists et tests navigateur gardent le syst\u00e8me lisible.",
        "Le projet devient v\u00e9rifiable, maintenable et corrigeable sans repartir de z\u00e9ro."
      ]
    ]
  },
  "methode-04": {
    label: "Donn\u00e9es utiles",
    layout: "card-layout-tight-spread",
    outcome: {
      label: "Signal -> décision nette",
      detail: "Les données se limitent au signal qui aide à agir."
    },
    cards: [
      [
        "Les donn\u00e9es n'ont de valeur que si elles aident \u00e0 agir.",
        "Je ne cherche pas \u00e0 produire plus de chiffres.",
        "Je cherche le signal qui rend la prochaine action evidente."
      ],
      [
        "Je collecte et centralise les informations pertinentes.",
        "Je structure les donn\u00e9es brutes en indicateurs.",
        "Je visualise seulement ce qui facilite l'action."
      ],
      [
        "Le r\u00e9sultat transforme les donn\u00e9es brutes en indicateurs, scores, statuts et synth\u00e8ses.",
        "JSON, Markdown, Excel, graphiques, exports, registres et mod\u00e8les IA servent \u00e0 lire plus vite.",
        "Le projet ne montre pas juste des donn\u00e9es: il aide \u00e0 d\u00e9cider, prioriser et agir."
      ]
    ]
  },
  "methode-05": {
    label: "Am\u00e9lioration continue",
    layout: "card-layout-low-arc",
    outcome: {
      value: "+1 version",
      label: "Progrès continu",
      detail: "Chaque retour alimente la suite sans perdre l'acquis."
    },
    cards: [
      [
        "Aucun syst\u00e8me n'est parfait au premier passage.",
        "Chaque retour montre ce qui doit progresser.",
        "L'am\u00e9lioration transforme l'erreur en valeur gagn\u00e9e."
      ],
      [
        "Je mesure les r\u00e9sultats obtenus.",
        "J'analyse ce qui fonctionne et ce qui bloque encore.",
        "J'am\u00e9liore, je recommence, puis je rends la version plus solide."
      ],
      [
        "Le r\u00e9sultat est un projet qui progresse par versions.",
        "Tests, retours, m\u00e9moire projet, rapports, validations et historiques gardent la continuit\u00e9.",
        "Le projet peut \u00e9voluer sans perdre ce qui fonctionne d\u00e9j\u00e0."
      ]
    ]
  },
  "methode-06": {
    label: "Design au service de la clart\u00e9",
    layout: "card-layout-deep-stack",
    outcome: {
      value: "1 action -> 1 bouton",
      label: "Usage évident",
      detail: "Une action claire, placée au bon endroit, guide tout le parcours."
    },
    cards: [
      [
        "Ma philosophie design est de minimaliser.",
        "Un bouton est un bouton: il doit rester évident, direct et utile.",
        "Je mets le minimum de choses pour obtenir le maximum d'effet utile."
      ],
      [
        "J'analyse les fonctions avant de dessiner l'interface.",
        "Je garde chaque élément là où il est le plus pertinent.",
        "La navigation devient plus courte, plus lisible et plus naturelle."
      ],
      [
        "L'application assemble la philosophie minimaliste et l'approche par fonctions.",
        "Le prototype montre le chemin le plus direct vers l'action utile.",
        "Le résultat doit rester propre, clair, épuré et optimisé."
      ]
    ]
  }
};

const textBlocks = [
  {
    id: "intro",
    side: "left",
    meta: "Système \u00b7 Design \u00b7 Impact",
    title: ["J'OPTIMISE", "L'EXISTANT", "PLUS CLAIR,", "PLUS RAPIDE,", "PLUS SOLIDE."],
    body: "Mon principe est simple : clarifier, accélérer, solidifier. Chaque optimisation doit produire un résultat réel et mesurable.",
    foot: "Clair \u00b7 Rapide \u00b7 Solide",
    signalLine: 2,
    anchor: 0,
    range: 0.05,
    copyLeft: "clamp(2rem, 5.8vw, 6rem)",
    copyTop: "42vh",
    motionX: 88,
    motionY: -150,
    target: { x: 0.73, y: 0.56, mobileX: 0.72, mobileY: 0.26 }
  },
  {
    id: "methodologie",
    side: "mid",
    meta: "Méthodologie",
    title: ["Ma manière", "de fonctionner"],
    body: "J'optimise ce qui existe déjà pour obtenir un système plus clair, plus rapide et plus solide.",
    foot: "",
    signalLine: 0,
    anchor: clipAnchor(2.5),
    range: 0.05,
    copyLeft: "clamp(12rem, 25vw, 40rem)",
    copyTop: "44vh",
    motionX: -72,
    motionY: -120,
    target: { x: 0.78, y: 0.45, mobileX: 0.68, mobileY: 0.25 }
  },
  {
    id: "methode-01",
    side: "mid",
    meta: "Méthode 01",
    title: ["Clarifier", "avant d'agir"],
    body: "Je rends une situation lisible en structurant les informations qui comptent.",
    foot: "Un problème complexe devient clair.",
    signalLine: 0,
    anchor: clipAnchor(3.5),
    range: 0.05,
    copyLeft: "clamp(12rem, 24vw, 39rem)",
    copyTop: "45vh",
    motionX: 78,
    motionY: -132,
    target: { x: 0.84, y: 0.43, mobileX: 0.68, mobileY: 0.28 }
  },
  {
    id: "methode-02",
    side: "mid",
    meta: "Méthode 03",
    title: ["Accélérer", "sans friction"],
    body: "J'élimine les étapes inutiles pour que les actions s'enchaînent naturellement.",
    foot: "Moins de gestes, plus de vitesse.",
    signalLine: 0,
    anchor: clipAnchor(8.2),
    range: 0.055,
    copyLeft: "clamp(13rem, 27vw, 43rem)",
    copyTop: "56vh",
    motionX: -88,
    motionY: -128,
    target: { x: 0.82, y: 0.56, mobileX: 0.7, mobileY: 0.3 }
  },
  {
    id: "methode-03",
    side: "mid",
    meta: "Méthode 04",
    title: ["Solidifier le", "système en amont"],
    body: "Je mets des garde-fous directement dans le flux pour éviter les erreurs avant production.",
    foot: "Un fonctionnement plus fiable dans le temps.",
    signalLine: 0,
    anchor: clipAnchor(9.5),
    range: 0.055,
    copyLeft: "clamp(13rem, 27vw, 43rem)",
    copyTop: "61vh",
    motionX: 76,
    motionY: -120,
    target: { x: 0.78, y: 0.61, mobileX: 0.68, mobileY: 0.28 }
  },
  {
    id: "methode-04",
    side: "mid",
    meta: "Méthode 05",
    title: ["Données utiles,", "décisions nettes"],
    body: "Je transforme les données en signaux d'action exploitables.",
    foot: "Chaque indicateur guide une décision.",
    signalLine: 0,
    anchor: clipAnchor(10.8),
    range: 0.045,
    copyLeft: "clamp(12rem, 25vw, 40rem)",
    copyTop: "46vh",
    motionX: -78,
    motionY: -118,
    target: { x: 0.82, y: 0.46, mobileX: 0.68, mobileY: 0.28 }
  },
  {
    id: "methode-05",
    side: "mid",
    meta: "Méthode 06",
    title: ["Améliorer", "en continu"],
    body: "Chaque itération sert à optimiser davantage ce qui existe déjà.",
    foot: "Le système progresse en permanence.",
    signalLine: 0,
    anchor: VIDEO_FINAL_HOLD_FROM,
    range: 0.055,
    hold: 0.018,
    copyLeft: "clamp(12rem, 24vw, 39rem)",
    copyTop: "42vh",
    motionX: 58,
    motionY: -96,
    target: { x: 0.78, y: 0.5, mobileX: 0.68, mobileY: 0.26 }
  },
  {
    id: "methode-06",
    side: "mid",
    meta: "Méthode 02",
    title: ["Design au service", "de la clarté"],
    body: "Le design rend le système lisible, intuitif et naturel à utiliser.",
    foot: "Une idée devient un usage concret.",
    signalLine: 1,
    anchor: clipAnchor(5.5),
    range: 0.05,
    copyLeft: "clamp(13rem, 26vw, 42rem)",
    copyTop: "43vh",
    motionX: -70,
    motionY: -108,
    target: { x: 0.75, y: 0.43, mobileX: 0.69, mobileY: 0.25 }
  },
  {
    id: "project-grid-final",
    side: "mid",
    meta: "Grille des projets",
    title: ["Explorer", "la map projets"],
    body: "Une carte interactive de mes applications : on se déplace librement, les vignettes sont dispersées par thèmes et chacune ouvre sa fiche.",
    foot: "Outils \u00b7 Design \u00b7 IA",
    signalLine: 0,
    anchor: 0.91,
    range: 0.035,
    hold: 0.018,
    copyLeft: "clamp(12rem, 24vw, 39rem)",
    copyTop: "45vh",
    motionX: 54,
    motionY: -96,
    target: { x: 0.79, y: 0.48, mobileX: 0.69, mobileY: 0.27 },
    explorerAction: "project-grid",
    returnSectionId: "project-grid-final"
  },
  {
    id: "contact-final",
    side: "mid",
    meta: "Contact",
    title: ["Un projet,", "une idée ?"],
    body: "Une optimisation à clarifier, une interface à construire ou une idée à structurer ? Envoyez-moi un message et je reviens vers vous rapidement.",
    foot: "",
    signalLine: 0,
    anchor: 0.99,
    range: 0.02,
    hold: 0.01,
    copyLeft: "clamp(12rem, 24vw, 39rem)",
    copyTop: "46vh",
    motionX: -58,
    motionY: -96,
    target: { x: 0.79, y: 0.52, mobileX: 0.69, mobileY: 0.29 },
    explorerAction: "contact"
  }
];

const cameraStops = [
  { x: 56, y: 18, scale: 1, brightness: 1.03 },
  { x: -72, y: -24, scale: 1.035, brightness: 1.08 },
  { x: 78, y: -34, scale: 1.015, brightness: 1.04 },
  { x: -86, y: 16, scale: 1.04, brightness: 1.09 },
  { x: 70, y: -42, scale: 1.025, brightness: 1.06 },
  { x: -48, y: -8, scale: 1, brightness: 1.02 },
  { x: 84, y: -36, scale: 1.025, brightness: 1.06 },
  { x: -28, y: -18, scale: 1, brightness: 1.04 }
];

let projectCards = [];
let projectGridReturnFocus = null;
let projectDetailReturnFocus = null;
let projectGridViewMode = "map";
let projectRegistryRequestId = 0;

let rafId = 0;
let contactPhase = -1;
let contactScene = createNoopContactScene();
let contactSceneReady = null;
let contactSceneLoaded = false;
let contactPanelController = null;
let contactPanelControllerReady = null;
let storyVideoWarmed = false;
let activeStoryVideoQuality = "";
let storyVideoSelectionPromise = null;
let storyVideoAnalysis = null;
let bootProgressValue = 0;
let projectRegistryWarmupScheduled = false;
let activeTileId = "";
let explorerPointState = null;
let storyStateLock = null;
let storyStateLockReleaseTimer = 0;
let mobileDebugPanel = null;
const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)") || null;
const guidedScrollDemo = {
  active: false,
  opened: false,
  progress: 0,
  stage: ""
};
let guidedDemoRetargetTimer = 0;
let activeMethodCardIndex = 0;
let methodCardStackOrder = methodCards.map((_, index) => index);
let methodCardSwipe = null;
let methodCardSwipeRaf = 0;
let methodCardSuppressClickUntil = 0;
let methodCardScrollLocked = false;
let methodCardScrollY = 0;
let methodCardScrollSectionId = "";
let methodCardScrollInlineStyles = null;
let methodCardFitRaf = 0;
let methodCardFitCache = new Map();
let projectGridBuilt = false;
let projectGridStylesReady = null;
let projectCardsReady = null;
let projectDetailRendererReady = null;
let projectDetailRequestId = 0;
let projectGridReturnSectionId = "";
let projectGridSuppressClickUntil = 0;
const projectGridPan = { x: 0, y: 0 };
const projectGridCurrent = { x: 0, y: 0 };
const projectGridTarget = { x: 0, y: 0 };
const projectGridZoom = { current: 1, target: 1 };
let projectGridFrame = 0;
let projectGridInstances = [];
let projectGridThemeInstances = [];
let projectGridBasePositions = [];
const projectGridDrag = {
  active: false,
  pointerId: -1,
  startX: 0,
  startY: 0,
  lastX: 0,
  lastY: 0,
  startProjectIndex: null,
  moved: false
};
buildStory();
bindContactPanelLoader();
bindHolographicTile();
bindProjectGrid();
initAdaptiveStoryVideo();
prepareVideoForScroll();
initMobileDebug();
scheduleProgressiveWarmup();
registerSiteWorker();
initBootLoader();
video.addEventListener("loadedmetadata", requestSync);
video.addEventListener("loadeddata", requestSync);
video.addEventListener("canplay", requestSync);
video.addEventListener("error", () => document.body.classList.add("video-missing"));
window.addEventListener("scroll", requestSync, { passive: true });
window.addEventListener("resize", requestViewportSync);
window.addEventListener("resize", scheduleMethodCardFit);
window.addEventListener("resize", syncProjectGridPresentationMode);
window.visualViewport?.addEventListener("resize", requestViewportSync);
window.addEventListener("hashchange", handleRouteChange);
window.addEventListener("popstate", handleRouteChange);
window.addEventListener("load", requestSync);
if (document.fonts?.ready) document.fonts.ready.then(scheduleMethodCardFit).catch(() => {});
requestSync();
setTimeout(requestSync, 500);
handleProjectGridRoute();
handleStaticAnchorRoute();

const qaScroll = Number(new URLSearchParams(window.location.search).get("qaScroll"));
if (Number.isFinite(qaScroll)) {
  const jumpToQaScroll = () => {
    window.scrollTo(0, getStoryTimelineMax() * clamp(qaScroll, 0, 1));
    requestSync();
  };
  requestAnimationFrame(jumpToQaScroll);
  setTimeout(jumpToQaScroll, 250);
  setTimeout(jumpToQaScroll, 900);
}

function requestSync() {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    rafId = 0;
    sync();
  });
}

function requestViewportSync() {
  if (storyStateLock?.active && explorerPointState) {
    positionHolographicTile(explorerPointState);
    scheduleMethodCardFit();
  }
  contactPanelController?.fitToViewport();
  requestSync();
  window.setTimeout(requestSync, 120);
  window.setTimeout(requestSync, 360);
}

function handleRouteChange() {
  requestSync();
  handleProjectGridRoute();
  handleStaticAnchorRoute();
}

function handleProjectGridRoute() {
  if (isProjectGridHash()) {
    if (!isProjectGridOpen()) void openProjectGridFromApplications({ updateHash: false });
    return;
  }
  if (isProjectGridOpen()) closeProjectGridToApplications({ updateHash: false });
}

function isProjectGridHash(hash = window.location.hash) {
  return PROJECT_GRID_HASHES.includes(String(hash || "").toLowerCase());
}

function setProjectGridHash() {
  if (isProjectGridHash()) return;
  window.history?.pushState?.(null, "", `${window.location.pathname}${window.location.search}#projets`);
}

function clearProjectGridHash() {
  if (!isProjectGridHash()) return;
  window.history?.pushState?.(null, "", `${window.location.pathname}${window.location.search}`);
}

function handleStaticAnchorRoute() {
  if (isProjectGridHash()) return;
  const targetId = String(window.location.hash || "").toLowerCase();
  if (!STATIC_ANCHOR_IDS.some((id) => targetId === `#${id}`)) return;
  const anchorId = targetId.slice(1);
  requestAnimationFrame(() => scrollToStaticAnchor(anchorId));
  window.setTimeout(() => scrollToStaticAnchor(anchorId), 260);
  window.setTimeout(() => scrollToStaticAnchor(anchorId), 920);
}

function scrollToStaticAnchor(anchorId) {
  if (String(window.location.hash || "").toLowerCase() !== `#${anchorId}`) return;
  document.getElementById(anchorId)?.scrollIntoView({ block: "start" });
  requestSync();
}

function prepareVideoForScroll() {
  video.muted = true;
  video.playsInline = true;
  video.autoplay = false;
  video.loop = false;
  video.removeAttribute("autoplay");
  video.removeAttribute("loop");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.pause();

  const keepScrollControlled = () => {
    if (!video.paused) video.pause();
    requestSync();
  };

  video.addEventListener("play", keepScrollControlled);
  video.addEventListener("playing", keepScrollControlled);
  requestAnimationFrame(keepScrollControlled);
}

function initAdaptiveStoryVideo() {
  if (!video) return;
  void ensureAdaptiveStoryVideo();
}

function ensureAdaptiveStoryVideo() {
  if (storyVideoSelectionPromise) return storyVideoSelectionPromise;
  setBootLoaderLabel("Analyse de la connexion");

  storyVideoSelectionPromise = analyzeStoryVideoConnection()
    .catch(() => ({
      quality: "900",
      mode: "auto",
      reason: "mesure de débit indisponible",
      measuredMbps: null
    }))
    .then((analysis) => {
      setStoryVideoQuality(analysis.quality, analysis);
      return analysis;
    });
  return storyVideoSelectionPromise;
}

async function analyzeStoryVideoConnection() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
  const signals = {
    saveData: connection?.saveData === true,
    effectiveType: String(connection?.effectiveType || ""),
    downlinkMbps: Number(connection?.downlink || 0),
    deviceMemoryGb: Number(navigator.deviceMemory || 0)
  };
  const skipProbe = signals.saveData
    || ["slow-2g", "2g", "3g"].includes(signals.effectiveType.toLowerCase())
    || (signals.deviceMemoryGb > 0 && signals.deviceMemoryGb <= 2);
  setBootProgress(12);

  if (skipProbe) {
    return {
      ...chooseAdaptiveVideoQuality({ ...signals, probeSucceeded: false }),
      mode: "auto",
      measuredMbps: null
    };
  }

  const probe = await measureStoryVideoThroughput();
  const decision = chooseAdaptiveVideoQuality({
    ...signals,
    measuredMbps: probe.mbps,
    probeSucceeded: probe.ok
  });
  return {
    ...decision,
    mode: "auto",
    measuredMbps: probe.ok ? probe.mbps : null
  };
}

async function measureStoryVideoThroughput() {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), VIDEO_SPEED_PROBE_TIMEOUT);
  const startedAt = performance.now();
  let receivedBytes = 0;

  try {
    const probeUrl = new URL(STORY_VIDEO_SOURCES[900], window.location.href);
    probeUrl.searchParams.set("speedProbe", String(Date.now()));
    const response = await fetch(probeUrl, {
      cache: "no-store",
      headers: { Range: `bytes=0-${VIDEO_SPEED_PROBE_BYTES - 1}` },
      signal: controller.signal
    });
    if (!response.ok || !response.body?.getReader) throw new Error("Mesure vidéo indisponible");

    const reader = response.body.getReader();
    while (receivedBytes < VIDEO_SPEED_PROBE_BYTES) {
      const { done, value } = await reader.read();
      if (done) break;
      receivedBytes += value?.byteLength || 0;
    }
    if (receivedBytes >= VIDEO_SPEED_PROBE_BYTES) await reader.cancel().catch(() => {});
    const elapsedMs = performance.now() - startedAt;
    const mbps = calculateMegabitsPerSecond(receivedBytes, elapsedMs);
    return { ok: receivedBytes >= 64 * 1024 && mbps > 0, mbps };
  } catch {
    return { ok: false, mbps: 0 };
  } finally {
    window.clearTimeout(timer);
  }
}

function setStoryVideoQuality(quality, analysis) {
  const source = STORY_VIDEO_SOURCES[quality];
  if (!video || !source) return;
  activeStoryVideoQuality = quality;
  storyVideoAnalysis = analysis;
  storyVideoWarmed = true;
  video.dataset.selectedQuality = quality;
  video.dataset.selectionReason = String(analysis?.reason || "");
  video.dataset.measuredMbps = Number.isFinite(analysis?.measuredMbps)
    ? Number(analysis.measuredMbps).toFixed(2)
    : "";
  document.body.classList.remove("video-missing");
  setBootLoaderLabel(`${getConnectionLabel()} · vidéo ${quality}p`);

  if (video.getAttribute("src") !== source) {
    video.pause();
    video.src = source;
    video.preload = "auto";
    video.load();
  }
}

function getConnectionLabel() {
  const measured = Number(storyVideoAnalysis?.measuredMbps || 0);
  if (measured > 0) return `Connexion ${measured.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} Mbit/s`;
  return storyVideoAnalysis?.reason || "Connexion prudente";
}

function scheduleProgressiveWarmup() {
  preloadCriticalImages();
  bindStoryVideoWarmup();
}

function scheduleProjectRegistryWarmup() {
  if (projectRegistryWarmupScheduled) return;
  projectRegistryWarmupScheduled = true;
  runAfterIdleDelay(() => preloadProjectRegistryModule(), isMobileViewport() ? 900 : 500, 1800);
}

function warmStoryVideo() {
  if (!video || storyVideoWarmed) return;
  if (!video.getAttribute("src")) {
    void ensureAdaptiveStoryVideo();
    return;
  }
  storyVideoWarmed = true;
  video.preload = "auto";
  video.load();
}

function bindStoryVideoWarmup() {
  const warmOnIntent = () => warmStoryVideo();
  window.addEventListener("scroll", warmOnIntent, { once: true, passive: true });
  window.addEventListener("wheel", warmOnIntent, { once: true, passive: true });
  window.addEventListener("touchmove", warmOnIntent, { once: true, passive: true });
  window.addEventListener("keydown", (event) => {
    if (["ArrowDown", "PageDown", "End", " "].includes(event.key)) warmStoryVideo();
  }, { once: true });
}

function preloadCriticalImages() {
  [
    "public/generated/videos/storyboard-7-scenes-v4-compress-block/kling-assembled/poster/storyboard-kling-12-clips-poster.jpg",
    ...METHOD_CARD_ASSET_SOURCES
  ].forEach((href) => preloadAsset(href, "image"));
}

function preloadAsset(href, as) {
  if (!href || [...document.querySelectorAll('link[rel="preload"]')].some((link) => link.getAttribute("href") === href)) return;
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = as;
  link.href = href;
  document.head.appendChild(link);
}

function initBootLoader() {
  if (!bootLoader) {
    scheduleProjectRegistryWarmup();
    return;
  }
  const startedAt = performance.now();
  setBootLoaderLabel("Analyse de la connexion");
  setBootProgress(6);
  void withTimeout(runBootPreload(), isMobileViewport() ? 5600 : 6500)
    .catch((error) => {
      window.__bootLoaderError = String(error?.message || error);
    })
    .finally(() => {
      const remaining = Math.max(0, 720 - (performance.now() - startedAt));
      window.setTimeout(() => {
        setBootLoaderLabel("Prêt");
        setBootProgress(100);
        bootLoader.classList.add("is-done");
        window.setTimeout(() => {
          bootLoader.hidden = true;
          scheduleProjectRegistryWarmup();
        }, 420);
      }, remaining);
    });
}

async function runBootPreload() {
  const essentialAssets = Promise.all([
    waitForFonts(1600),
    preloadBootImages([
      "public/generated/videos/storyboard-7-scenes-v4-compress-block/kling-assembled/poster/storyboard-kling-12-clips-poster.jpg",
      ...METHOD_CARD_ASSET_SOURCES
    ], 1600)
  ]).then(() => setBootProgress(34));
  const videoBuffer = ensureAdaptiveStoryVideo()
    .then(() => waitForStoryVideoBuffer(isMobileViewport() ? 4600 : 5600));

  await Promise.all([essentialAssets, videoBuffer]);
  await waitForAnimationFrames(1);
  setBootProgress(94);
}

function setBootProgress(value) {
  const percent = Math.max(bootProgressValue, clamp(Math.round(value), 0, 100));
  bootProgressValue = percent;
  if (bootLoaderBar) bootLoaderBar.style.setProperty("--boot-progress", `${percent}%`);
  if (bootLoaderPercent) bootLoaderPercent.textContent = `${percent}%`;
}

function setBootLoaderLabel(value) {
  if (bootLoaderLabel) bootLoaderLabel.textContent = value;
}

function getStoryVideoBufferedSeconds() {
  if (!video?.buffered?.length) return 0;
  let bufferedEnd = 0;
  for (let index = 0; index < video.buffered.length; index += 1) {
    if (video.buffered.start(index) <= 0.25) bufferedEnd = Math.max(bufferedEnd, video.buffered.end(index));
  }
  return bufferedEnd;
}

function waitForStoryVideoBuffer(timeout = 5200) {
  if (!video) return Promise.resolve();
  warmStoryVideo();

  return new Promise((resolve) => {
    let settled = false;
    const targetSeconds = isMobileViewport() ? 3 : 5;
    const eventNames = ["loadedmetadata", "loadeddata", "progress", "canplay", "canplaythrough", "error"];
    const finish = (timedOut = false) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      eventNames.forEach((eventName) => video.removeEventListener(eventName, update));
      if (timedOut) setBootLoaderLabel("Ouverture · chargement vidéo en arrière-plan");
      resolve();
    };
    const update = () => {
      if (video.error) {
        finish();
        return;
      }
      const bufferedSeconds = getStoryVideoBufferedSeconds();
      const ratio = clamp(bufferedSeconds / targetSeconds, 0, 1);
      setBootProgress(34 + ratio * 58);
      setBootLoaderLabel(`Préparation vidéo · ${Math.round(ratio * 100)}%`);
      if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA && bufferedSeconds >= targetSeconds) finish();
    };
    const timer = window.setTimeout(() => finish(true), timeout);
    eventNames.forEach((eventName) => video.addEventListener(eventName, update));
    update();
  });
}

function waitForFonts(timeout = 2200) {
  if (!document.fonts?.ready) return Promise.resolve();
  return withTimeout(document.fonts.ready, timeout).catch(() => {});
}

function preloadBootImages(sources, timeout = 3200) {
  return Promise.all(sources.map((src) => preloadImage(src, timeout)));
}

function preloadImage(src, timeout = 3200) {
  if (!src) return Promise.resolve();
  return new Promise((resolve) => {
    const image = new Image();
    const done = () => {
      window.clearTimeout(timer);
      image.onload = null;
      image.onerror = null;
      resolve();
    };
    const timer = window.setTimeout(done, timeout);
    image.onload = () => {
      if (typeof image.decode === "function") {
        image.decode().then(done).catch(done);
        return;
      }
      done();
    };
    image.onerror = done;
    image.src = src;
  });
}

function withTimeout(promise, timeout = 3200) {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(resolve, timeout);
    Promise.resolve(promise)
      .then((value) => {
        window.clearTimeout(timer);
        resolve(value);
      })
      .catch((error) => {
        window.clearTimeout(timer);
        reject(error);
      });
  });
}

function runWhenIdle(callback, timeout = 900) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout });
    return;
  }
  window.setTimeout(callback, timeout);
}

function runAfterIdleDelay(callback, delay = 0, timeout = 900) {
  window.setTimeout(() => runWhenIdle(callback, timeout), delay);
}

function registerSiteWorker() {
  if (!("serviceWorker" in navigator)) return;
  const canRegister = window.isSecureContext || ["localhost", "127.0.0.1"].includes(window.location.hostname);
  if (!canRegister) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js?v=no-featured-list-v2-20260904")
      .then((registration) => registration.update?.())
      .catch((error) => {
        window.__siteWorkerError = String(error?.message || error);
      });
  }, { once: true });
}

function ensureDeferredMedia(progress) {
  if (progress >= PROJECT_MEDIA_PRELOAD_FROM) {
    loadDeferredImage(projectFinalImage);
  }

  if (progress >= CONTACT_MEDIA_PRELOAD_FROM) {
    loadDeferredImage(contactFinalImage);
    loadDeferredVideo(contactTransitionVideo);
  }
}

function loadDeferredImage(image) {
  if (!image || image.dataset.loaded === "true") return;
  const src = image.dataset.src;
  if (!src) return;
  image.src = src;
  image.dataset.loaded = "true";
}

function loadDeferredVideo(videoElement) {
  if (!videoElement || videoElement.dataset.loaded === "true") return;
  let hasSource = false;
  if (videoElement.dataset.poster) {
    videoElement.poster = videoElement.dataset.poster;
    videoElement.removeAttribute("data-poster");
  }
  videoElement.querySelectorAll("source[data-src]").forEach((source) => {
    source.src = source.dataset.src;
    source.removeAttribute("data-src");
    hasSource = true;
  });
  if (!hasSource) return;
  videoElement.preload = "auto";
  videoElement.load();
  videoElement.dataset.loaded = "true";
}

function buildStory() {
  story.innerHTML = textBlocks.map((block, index) => `
    <section class="story-section story-section-${block.side}" data-index="${index}" data-id="${block.id}" style="--copy-left: ${block.copyLeft}; --copy-top: ${block.copyTop};">
      <div class="story-copy">
        <p class="text-meta">${escapeHtml(block.meta)}</p>
        <h2 class="story-title">${block.title.map((line, lineIndex) => `<span class="${lineIndex === block.signalLine ? "signal-word" : ""}">${escapeHtml(line)}</span>`).join("")}</h2>
        ${block.body ? `<p class="story-body">${escapeHtml(block.body)}</p>` : ""}
        ${block.foot ? `<p class="text-foot">${escapeHtml(block.foot)}</p>` : ""}
      </div>
    </section>
  `).join("");
}

function sync() {
  const rawProgress = getScrollProgress();
  const progress = getEffectiveStoryProgress(rawProgress);
  ensureDeferredMedia(progress);
  setVideoProgress(progress);
  updateStoryExit(progress);
  updateAfterStoryState();

  const camera = sampleCamera(progress);
  const mobile = window.innerWidth <= 700;
  const x = 0;
  const y = 0;
  const scale = mobile ? Math.max(1, camera.scale * 0.99) : camera.scale;

  document.documentElement.style.setProperty("--camera-x", `${Math.round(x)}px`);
  document.documentElement.style.setProperty("--camera-y", `${Math.round(y)}px`);
  document.documentElement.style.setProperty("--camera-scale", (scale * VIDEO_DISPLAY_SCALE).toFixed(3));
  document.documentElement.style.setProperty("--camera-brightness", camera.brightness.toFixed(3));
  document.documentElement.style.setProperty("--page-progress", progress.toFixed(4));
  updateContactDock(progress);
  updateMobileDebug({ progress, rawProgress });

  let activeEnergy = null;
  document.querySelectorAll(".story-section").forEach((section) => {
    const block = textBlocks[Number(section.dataset.index)];
    const rect = section.getBoundingClientRect();
    const range = block.range || 0.075;
    const hold = Math.min(block.hold || TEXT_HOLD_PROGRESS, range * 0.48);
    const delta = progress - block.anchor;
    const movingDelta = Math.max(Math.abs(delta) - hold, 0) * Math.sign(delta);
    const activeRange = Math.max(0.001, range - hold);
    const centerDistance = movingDelta / activeRange;
    const focus = clamp(1 - Math.abs(centerDistance), 0, 1);
    const flow = clamp(1 - Math.abs(centerDistance) * 1.45, 0, 1);
    const opacity = focus < 0.08 ? 0 : Math.pow(smoothstep(clamp((focus - 0.08) / 0.92, 0, 1)), 1.55);
    const travel = clamp(centerDistance, -1.18, 1.18);
    const drift = Math.abs(delta) <= hold ? 0 : Math.sin((Number(section.dataset.index) + progress) * Math.PI) * 18;
    const copy = section.querySelector(".story-copy");
    copy.style.setProperty("--focus", focus.toFixed(3));
    copy.style.setProperty("--flow", flow.toFixed(3));
    copy.style.setProperty("--copy-opacity", opacity.toFixed(3));
    copy.style.setProperty("--flow-y", `${Math.round(travel * (block.motionY || -120))}px`);
    copy.style.setProperty("--flow-x", `${Math.round(travel * (block.motionX || 72) + drift)}px`);
    section.classList.toggle("is-active", focus > 0.52);

    if (!activeEnergy || focus > activeEnergy.focus) {
      activeEnergy = {
        section,
        block,
        focus,
        rect,
        sectionProgress: clamp((progress - (block.anchor - range)) / (range * 2), 0, 1)
      };
    }
  });
  updateEnergyLink(activeEnergy, progress);
  updateScrollCoach(rawProgress);
  updateGuidedScrollDemo(rawProgress);
}

function updateContactDock(progress) {
  if (!contactDock) return;

  const phaseCount = 6;
  const exactPhase = clamp(progress, 0, 1) * (phaseCount - 1);
  const phase = clamp(Math.round(exactPhase), 0, phaseCount - 1);

  contactDock.style.setProperty("--contact-scroll", progress.toFixed(4));
  contactScene.setScrollProgress(progress);
  contactScene.setActive(progress >= CONTACT_MEDIA_PRELOAD_FROM || !contactPanel?.hidden);
  if (progress >= CONTACT_MEDIA_PRELOAD_FROM && !contactSceneLoaded) ensureContactScene("contact-range");

  if (phase === contactPhase) return;
  contactPhase = phase;
  contactDock.dataset.phase = String(phase);
  contactScene.setPhase(phase);
  contactDock.classList.remove("is-switching");
  void contactDock.offsetWidth;
  contactDock.classList.add("is-switching");
}

function updateStoryExit(progress) {
  const videoOut = smoothstep(clamp((progress - FINAL_VIDEO_FADE_START) / (FINAL_VIDEO_FADE_END - FINAL_VIDEO_FADE_START), 0, 1));
  const projectIn = smoothstep(clamp((progress - FINAL_PROJECT_IMAGE_IN_START) / (FINAL_PROJECT_IMAGE_IN_END - FINAL_PROJECT_IMAGE_IN_START), 0, 1));
  const projectOut = smoothstep(clamp((progress - FINAL_PROJECT_IMAGE_OUT_START) / (FINAL_PROJECT_IMAGE_OUT_END - FINAL_PROJECT_IMAGE_OUT_START), 0, 1));
  const contactIn = smoothstep(clamp((progress - FINAL_CONTACT_IMAGE_IN_START) / (FINAL_CONTACT_IMAGE_IN_END - FINAL_CONTACT_IMAGE_IN_START), 0, 1));
  const storyVideoOpacity = 1 - videoOut;
  const projectImageOpacity = projectIn * (1 - projectOut);
  const contactImageFrameOpacity = contactIn;

  document.documentElement.style.setProperty("--story-video-opacity", storyVideoOpacity.toFixed(3));
  document.documentElement.style.setProperty("--project-image-opacity", projectImageOpacity.toFixed(3));
  document.body.classList.toggle("is-project-image-final", projectImageOpacity > 0.08 || contactImageFrameOpacity > 0.08);
  document.documentElement.style.setProperty("--contact-media-opacity", contactImageFrameOpacity.toFixed(3));
  document.documentElement.style.setProperty("--contact-transition-opacity", "0");
  document.documentElement.style.setProperty("--contact-image-opacity", "1");
  video.style.opacity = storyVideoOpacity.toFixed(3);
  if (projectFinalImage) projectFinalImage.style.opacity = projectImageOpacity.toFixed(3);

  if (contactMedia) contactMedia.style.opacity = contactImageFrameOpacity.toFixed(3);
  if (contactImageTrigger) {
    contactImageTrigger.disabled = true;
    contactImageTrigger.classList.remove("is-active");
    contactImageTrigger.style.opacity = "0";
  }
}

function updateAfterStoryState() {
  const isEntering = isAfterStoryVisible();
  const isAfter = window.scrollY > getStoryTimelineMax() + 8;

  document.body.classList.toggle("is-after-story-entering", isEntering);
  document.body.classList.toggle("is-after-story", isAfter);
}

function isAfterStoryVisible() {
  return [afterStory, document.getElementById("ma-methode"), document.getElementById("project-grid-entry"), document.getElementById("contact-entry")]
    .some((section) => {
      const rect = section?.getBoundingClientRect();
      return rect && rect.top < window.innerHeight * 0.94 && rect.bottom > 0;
    });
}

function bindContactPanelLoader() {
  if (!contactTrigger || !contactPanel || !contactForm) return;

  contactTrigger.addEventListener("click", () => {
    void requestContactPanel({
      direct: isAfterStoryVisible(),
      returnFocus: contactTrigger
    });
  });

  document.querySelectorAll("[data-contact-cta]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      void requestContactPanel({
        direct: Boolean(button.closest("#contact-entry") || isAfterStoryVisible()),
        returnFocus: button
      });
    });
  });
}

async function requestContactPanel(options = {}) {
  if (!contactPanel || !contactTrigger || !contactForm) return;
  void ensureContactScene("contact-request");
  const controller = await ensureContactPanelController();
  controller?.request(options);
}

function ensureContactPanelController() {
  if (contactPanelController) return Promise.resolve(contactPanelController);
  if (contactPanelControllerReady) return contactPanelControllerReady;

  contactPanelControllerReady = import(CONTACT_PANEL_MODULE)
    .then((module) => {
      contactPanelController = module.createContactPanelController({
        panel: contactPanel,
        trigger: contactTrigger,
        closeButton: contactClose,
        form: contactForm,
        status: contactStatus,
        resizeHandle: contactResizeHandle,
        getContactScene: () => contactScene,
        getEffectiveStoryProgress,
        contactMediaPreloadFrom: CONTACT_MEDIA_PRELOAD_FROM,
        isMobileViewport,
        clamp
      });
      contactPanelController.bind();
      window.__contactPanelModuleLoaded = true;
      return contactPanelController;
    })
    .catch((error) => {
      window.__contactPanelLoadError = String(error?.message || error);
      contactPanelControllerReady = null;
      return null;
    });

  return contactPanelControllerReady;
}

function sampleCamera(progress) {
  const maxIndex = cameraStops.length - 1;
  const scaled = clamp(progress, 0, 1) * maxIndex;
  const index = Math.min(maxIndex - 1, Math.floor(scaled));
  const local = smoothstep(scaled - index);
  const from = cameraStops[index];
  const to = cameraStops[index + 1];

  const sweepX = Math.sin(progress * Math.PI * 7) * 24;
  const sweepY = Math.cos(progress * Math.PI * 4.5) * 18;

  return {
    x: lerp(from.x, to.x, local) + sweepX,
    y: lerp(from.y, to.y, local) + sweepY,
    scale: lerp(from.scale, to.scale, local),
    brightness: lerp(from.brightness, to.brightness, local)
  };
}

function setVideoProgress(progress) {
  if (!Number.isFinite(video.duration) || video.duration <= 0) return;
  const videoProgress = progress >= VIDEO_FINAL_HOLD_FROM
    ? 1
    : clamp(progress / VIDEO_FINAL_HOLD_FROM, 0, 1);
  const target = Math.min(video.duration - 0.04, videoProgress * video.duration);
  const minSeekDelta = isMobileViewport() ? 0.08 : 0.035;
  if (Math.abs(video.currentTime - target) > minSeekDelta) video.currentTime = target;
}

function updateEnergyLink(state, progress) {
  if (!energy.layer || !energy.main || !energy.core || !energy.ring) return;

  const width = window.innerWidth;
  const height = window.innerHeight;
  energy.layer.setAttribute("viewBox", `0 0 ${width} ${height}`);

  if (!state || state.focus < 0.34) {
    setEnergyOpacity(0);
    updateExplorerPoint(null);
    return;
  }

  const signal = state.section.querySelector(".signal-word") || state.section.querySelector(".story-title span");
  if (!signal) {
    setEnergyOpacity(0);
    updateExplorerPoint(null);
    return;
  }

  const signalRect = signal.getBoundingClientRect();
  const isRightText = state.section.classList.contains("story-section-right");
  const isMobile = width <= 700;
  const source = getSourcePoint(signalRect, isRightText, isMobile);
  const target = getTargetPoint(state.block.target, width, height, isMobile);
  const sectionProgress = Number.isFinite(state.sectionProgress)
    ? state.sectionProgress
    : clamp((height - state.rect.top) / (height + state.rect.height), 0, 1);
  const reveal = smoothstep(clamp((sectionProgress - 0.08) / 0.34, 0, 1));
  const intensity = clamp((state.focus - 0.34) / 0.56, 0, 1);
  const opacity = intensity * (0.42 + reveal * 0.58);

  const wave = Math.sin((progress * 10 + Number(state.section.dataset.index)) * Math.PI) * 16;
  setEnergyPath(energy.main, makeEnergyPath(source, target, wave, 0), reveal);
  if (energy.secondary) setEnergyPath(energy.secondary, makeEnergyPath(source, target, wave, -24), reveal * 0.92);
  if (energy.spark) setEnergyPath(energy.spark, makeEnergyPath(source, target, -wave * 0.7, 18), reveal * 0.78);

  energy.core.setAttribute("cx", target.x);
  energy.core.setAttribute("cy", target.y);
  energy.ring.setAttribute("cx", target.x);
  energy.ring.setAttribute("cy", target.y);
  setEnergyOpacity(opacity);
  updateExplorerPoint({ block: state.block, target, focus: state.focus, reveal, opacity });
}

function getSourcePoint(rect, isRightText, isMobile) {
  if (isMobile) {
    return {
      x: rect.left + rect.width * 0.5,
      y: rect.top + rect.height * 0.06
    };
  }

  return {
    x: isRightText ? rect.left + rect.width * 0.08 : rect.right - rect.width * 0.08,
    y: rect.top + rect.height * 0.5
  };
}

function getTargetPoint(target, width, height, isMobile) {
  return {
    x: width * (isMobile ? target.mobileX : target.x),
    y: height * (isMobile ? target.mobileY : target.y)
  };
}

function makeEnergyPath(source, target, wave, offset) {
  const direction = target.x >= source.x ? 1 : -1;
  const distance = Math.abs(target.x - source.x);
  const bend = Math.min(260, distance * 0.34 + 70);
  const c1 = {
    x: source.x + bend * direction,
    y: source.y + wave + offset
  };
  const c2 = {
    x: target.x - bend * 0.72 * direction,
    y: target.y - wave * 0.42 + offset
  };

  return `M ${source.x.toFixed(1)} ${source.y.toFixed(1)} C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${target.x.toFixed(1)} ${target.y.toFixed(1)}`;
}

function setEnergyPath(path, d, reveal) {
  path.setAttribute("d", d);
  const length = path.getTotalLength();
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length * (1 - reveal)}`;
}

function setEnergyOpacity(value) {
  const opacity = clamp(value, 0, 1);
  energy.layer.style.setProperty("--energy-opacity", opacity.toFixed(3));
}

function updateScrollCoach(rawProgress) {
  if (!scrollCoach) return;
  const visible = !prefersReducedMotion()
    && rawProgress < 0.112
    && !activeTileId
    && !isProjectGridOpen()
    && (!contactPanel || contactPanel.hidden);
  scrollCoach.classList.toggle("is-visible", visible);
}

function updateGuidedScrollDemo(rawProgress) {
  if (!guidedCursor || !holographicTile || !explorerPoint || !isGuidedScrollDemoEnabled() || isProjectGridOpen() || contactPanel && !contactPanel.hidden) {
    if (guidedScrollDemo.active) stopGuidedScrollDemo();
    else clearGuidedDemoHighlights();
    updateGuidedCursor(null);
    return;
  }

  const inRange = rawProgress >= GUIDED_SCROLL_DEMO_RAW_START && rawProgress <= GUIDED_SCROLL_DEMO_RAW_END;
  if (!inRange) {
    if (guidedScrollDemo.active) stopGuidedScrollDemo();
    else {
      clearGuidedDemoHighlights();
      updateGuidedCursor(null);
    }
    return;
  }

  if (activeTileId && activeTileId !== GUIDED_SCROLL_DEMO_SECTION_ID && !guidedScrollDemo.active) return;

  const localProgress = getGuidedScrollDemoProgress(rawProgress);
  if (!guidedScrollDemo.active) startGuidedScrollDemo();
  guidedScrollDemo.progress = localProgress;
  document.documentElement.style.setProperty("--guided-demo-progress", localProgress.toFixed(4));

  if (localProgress >= GUIDED_SCROLL_DEMO_OPEN_AT && localProgress < GUIDED_SCROLL_DEMO_CLOSE_AT) {
    guidedScrollDemo.opened = ensureGuidedMethodTileOpen();
    document.body.classList.toggle("is-guided-demo-open", guidedScrollDemo.opened);
  } else if (guidedScrollDemo.opened || activeTileId === GUIDED_SCROLL_DEMO_SECTION_ID) {
    closeTile({ restoreScroll: false, releaseStory: false, allowGuidedClose: true });
    guidedScrollDemo.opened = false;
    document.body.classList.remove("is-guided-demo-open");
  }

  applyGuidedScrollDemoStage(getGuidedScrollDemoStage(localProgress), localProgress);
}

function startGuidedScrollDemo() {
  guidedScrollDemo.active = true;
  guidedScrollDemo.opened = activeTileId === GUIDED_SCROLL_DEMO_SECTION_ID;
  guidedScrollDemo.stage = "";
  document.body.classList.add("is-guided-demo-active");
  guidedCursor.hidden = false;
}

function stopGuidedScrollDemo() {
  if (guidedScrollDemo.opened && activeTileId === GUIDED_SCROLL_DEMO_SECTION_ID) {
    closeTile({ restoreScroll: false, releaseStory: false, allowGuidedClose: true });
  }
  if (guidedDemoRetargetTimer) {
    window.clearTimeout(guidedDemoRetargetTimer);
    guidedDemoRetargetTimer = 0;
  }
  guidedScrollDemo.active = false;
  guidedScrollDemo.opened = false;
  guidedScrollDemo.progress = 0;
  guidedScrollDemo.stage = "";
  document.body.classList.remove("is-guided-demo-active", "is-guided-demo-open");
  document.documentElement.style.removeProperty("--guided-demo-progress");
  clearGuidedDemoHighlights();
  updateGuidedCursor(null);
}

function getGuidedScrollDemoStage(localProgress) {
  if (localProgress < GUIDED_SCROLL_DEMO_OPEN_AT) {
    return {
      id: "explorer",
      type: "explorer",
      click: isGuidedClickPulse(localProgress, GUIDED_SCROLL_DEMO_OPEN_AT - 0.012, 0.018)
    };
  }

  if (localProgress < 0.4) {
    return {
      id: "card-0",
      type: "card",
      cardIndex: 0,
      click: isGuidedClickPulse(localProgress, 0.31, 0.032),
      xRatio: 0.52,
      yRatio: 0.48
    };
  }

  if (localProgress < 0.6) {
    return {
      id: "card-1",
      type: "card",
      cardIndex: 1,
      click: isGuidedClickPulse(localProgress, 0.505, 0.032),
      xRatio: 0.52,
      yRatio: 0.48
    };
  }

  if (localProgress < 0.76) {
    return {
      id: "card-2",
      type: "card",
      cardIndex: 2,
      click: isGuidedClickPulse(localProgress, 0.685, 0.032),
      xRatio: 0.52,
      yRatio: 0.48
    };
  }

  if (localProgress < 0.84) {
    return { id: "project-2", type: "project", cardIndex: 2 };
  }

  if (localProgress < 0.9) {
    return { id: "project-1", type: "project", cardIndex: 1 };
  }

  if (localProgress < GUIDED_SCROLL_DEMO_CLOSE_AT) {
    return { id: "project-0", type: "project", cardIndex: 0 };
  }

  return { id: "return", type: "return" };
}

function applyGuidedScrollDemoStage(stage, localProgress) {
  clearGuidedDemoHighlights();
  const previousStage = guidedScrollDemo.stage;
  guidedScrollDemo.stage = stage.id;
  if (previousStage !== stage.id) scheduleGuidedDemoRetarget();

  let target = null;
  let clicking = Boolean(stage.click);
  let pointOptions = stage;

  if (stage.type === "explorer") {
    target = explorerPoint;
    explorerPoint.classList.add("is-guided-hover");
    if (clicking) explorerPoint.classList.add("is-guided-click");
  } else if (stage.type === "card" && guidedScrollDemo.opened) {
    setActiveMethodCard(stage.cardIndex);
    const card = methodCards[stage.cardIndex];
    target = card;
    card?.classList.add("is-guided-hover", "is-guided-target");
    if (clicking) card?.classList.add("is-guided-click");
  } else if (stage.type === "project" && guidedScrollDemo.opened) {
    setActiveMethodCard(stage.cardIndex);
    const icon = methodCards[stage.cardIndex]?.querySelector(".method-card-project-icon");
    target = icon || methodCards[stage.cardIndex];
    icon?.classList.add("is-guided-hover");
    pointOptions = { xRatio: 0.5, yRatio: 0.5 };
  } else {
    target = explorerPoint && !explorerPoint.hidden ? explorerPoint : null;
    pointOptions = { xRatio: 0.5, yRatio: 0.5 };
    clicking = false;
  }

  updateGuidedCursor(getGuidedTargetPoint(target, pointOptions), {
    clicking,
    opacity: getGuidedCursorOpacity(localProgress)
  });
}

function clearGuidedDemoHighlights() {
  explorerPoint?.classList.remove("is-guided-hover", "is-guided-click");
  methodCards.forEach((card) => {
    card.classList.remove("is-guided-hover", "is-guided-target", "is-guided-click");
    card.querySelectorAll(".method-card-project-icon").forEach((icon) => {
      icon.classList.remove("is-guided-hover");
    });
  });
}

function updateGuidedCursor(point, options = {}) {
  if (!guidedCursor) return;
  if (!point) {
    guidedCursor.classList.remove("is-visible", "is-clicking");
    return;
  }

  const opacity = Number.isFinite(options.opacity) ? clamp(options.opacity, 0, 1) : 1;
  guidedCursor.style.setProperty("--guided-cursor-x", `${Math.round(point.x)}px`);
  guidedCursor.style.setProperty("--guided-cursor-y", `${Math.round(point.y)}px`);
  guidedCursor.style.setProperty("--guided-cursor-opacity", opacity.toFixed(3));
  guidedCursor.classList.toggle("is-visible", opacity > 0.04);
  guidedCursor.classList.toggle("is-clicking", Boolean(options.clicking));
}

function getGuidedTargetPoint(element, options = {}) {
  const rect = element?.getBoundingClientRect?.();
  if (rect && rect.width > 0 && rect.height > 0) {
    const xRatio = Number.isFinite(options.xRatio) ? options.xRatio : 0.5;
    const yRatio = Number.isFinite(options.yRatio) ? options.yRatio : 0.5;
    return {
      x: rect.left + rect.width * xRatio,
      y: rect.top + rect.height * yRatio
    };
  }

  if (explorerPointState) {
    return {
      x: explorerPointState.x,
      y: explorerPointState.y
    };
  }

  return {
    x: window.innerWidth * 0.58,
    y: window.innerHeight * 0.52
  };
}

function getGuidedCursorOpacity(localProgress) {
  const fadeIn = smoothstep(clamp(localProgress / 0.075, 0, 1));
  const fadeOut = 1 - smoothstep(clamp((localProgress - 0.94) / 0.06, 0, 1));
  return fadeIn * fadeOut;
}

function isGuidedClickPulse(localProgress, center, radius) {
  return Math.abs(localProgress - center) <= radius;
}

function scheduleGuidedDemoRetarget(delay = 360) {
  if (guidedDemoRetargetTimer) window.clearTimeout(guidedDemoRetargetTimer);
  guidedDemoRetargetTimer = window.setTimeout(() => {
    guidedDemoRetargetTimer = 0;
    if (guidedScrollDemo.active) requestSync();
  }, delay);
}

function updateExplorerPoint(data) {
  if (!explorerPoint) return;

  const block = data?.block;
  const hasTile = Boolean(holographicTiles[block?.id]);
  const directAction = block?.explorerAction || "";
  const hasProjectAction = directAction === "project-grid";
  const hasContactAction = directAction === "contact";
  const hasDirectAction = hasProjectAction || hasContactAction;
  const visible = data
    && (hasTile || hasDirectAction)
    && data.focus > 0.48
    && data.reveal > 0.42
    && data.opacity > 0.2;

  if (!visible) {
    if (isGuidedMethodTilePinned()) {
      keepGuidedMethodTilePinned();
      return;
    }
    if (storyStateLock?.active && explorerPointState) {
      positionHolographicTile(explorerPointState);
      return;
    }
    explorerPoint.classList.remove("is-visible", "is-active");
    if (!activeTileId) {
      energy.layer?.classList.remove("is-explorer-hover", "is-explorer-open");
      explorerPointState = null;
      explorerPoint.hidden = true;
      explorerPoint.removeAttribute("data-section-id");
      explorerPoint.removeAttribute("data-action");
      explorerPoint.removeAttribute("data-contact-cta");
    } else {
      explorerPoint.hidden = true;
    }
    return;
  }

  if (isGuidedMethodTilePinned()) {
    keepGuidedMethodTilePinned();
    return;
  }

  if (activeTileId && activeTileId !== block.id && (!hasDirectAction || hasContactAction)) closeTile();

  explorerPointState = {
    sectionId: block.id,
    action: directAction,
    returnSectionId: block.returnSectionId || "",
    x: data.target.x,
    y: data.target.y
  };
  explorerPoint.hidden = false;
  explorerPoint.dataset.sectionId = block.id;
  if (directAction) {
    explorerPoint.dataset.action = directAction;
  } else {
    explorerPoint.removeAttribute("data-action");
  }
  if (hasContactAction) {
    explorerPoint.dataset.contactCta = "";
  } else {
    explorerPoint.removeAttribute("data-contact-cta");
  }
  explorerPoint.style.left = `${Math.round(data.target.x)}px`;
  explorerPoint.style.top = `${Math.round(data.target.y)}px`;
  explorerPoint.setAttribute(
    "aria-label",
    hasProjectAction
      ? "Ouvrir la grille des projets"
      : hasContactAction
        ? "Ouvrir le formulaire de contact"
        : `Ouvrir les fiches ${holographicTiles[block.id]?.label || "Explorer"}`
  );
  explorerPoint.setAttribute("aria-controls", hasProjectAction ? "project-grid-overlay" : hasContactAction ? "contact-panel" : "holographic-tile");
  explorerPoint.setAttribute(
    "aria-expanded",
    (hasContactAction && contactPanel && !contactPanel.hidden && contactPanel.classList.contains("is-open"))
      || (!hasDirectAction && activeTileId === block.id)
      ? "true"
      : "false"
  );
  explorerPoint.classList.add("is-visible");
  explorerPoint.classList.toggle("is-active", activeTileId === block.id);
  positionHolographicTile(data.target);
}

function isGuidedMethodTilePinned() {
  return Boolean(
    guidedScrollDemo.active
    && isGuidedMethodTileOpen()
  );
}

function isGuidedMethodTileOpen() {
  return Boolean(
    activeTileId === GUIDED_SCROLL_DEMO_SECTION_ID
    && holographicTile
    && !holographicTile.hidden
    && holographicTile.classList.contains("is-open")
  );
}

function ensureGuidedMethodTileOpen() {
  if (!isGuidedMethodTileOpen()) {
    openTile(GUIDED_SCROLL_DEMO_SECTION_ID, { lockScroll: false, lockStory: false });
    scheduleGuidedDemoRetarget(520);
  }

  if (activeTileId !== GUIDED_SCROLL_DEMO_SECTION_ID || !holographicTile) return false;
  document.body.classList.add("is-tile-open");
  holographicTile.hidden = false;
  explorerPoint?.classList.add("is-active");
  explorerPoint?.setAttribute("aria-expanded", "true");
  energy.layer?.classList.add("is-explorer-open");
  if (!holographicTile.classList.contains("is-open")) {
    void holographicTile.offsetWidth;
    holographicTile.classList.add("is-open");
  }
  return true;
}

function keepGuidedMethodTilePinned() {
  if (!explorerPoint || !explorerPointState) return;
  explorerPoint.hidden = false;
  explorerPoint.dataset.sectionId = GUIDED_SCROLL_DEMO_SECTION_ID;
  explorerPoint.removeAttribute("data-action");
  explorerPoint.removeAttribute("data-contact-cta");
  explorerPoint.setAttribute("aria-controls", "holographic-tile");
  explorerPoint.setAttribute("aria-expanded", "true");
  explorerPoint.classList.add("is-visible", "is-active");
  positionHolographicTile(explorerPointState);
}

function bindHolographicTile() {
  explorerPoint?.addEventListener("pointerenter", () => energy.layer?.classList.add("is-explorer-hover"));
  explorerPoint?.addEventListener("pointerleave", () => energy.layer?.classList.remove("is-explorer-hover"));
  explorerPoint?.addEventListener("focus", () => energy.layer?.classList.add("is-explorer-hover"));
  explorerPoint?.addEventListener("blur", () => energy.layer?.classList.remove("is-explorer-hover"));

  methodCards.forEach((card, index) => {
    card.addEventListener("click", (event) => {
      if (event.target?.closest?.("[data-project-grid-link]")) return;
      if (Date.now() < methodCardSuppressClickUntil) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      event.stopPropagation();
      setActiveMethodCard(index);
    });

    card.addEventListener("keydown", (event) => {
      if (event.target !== card) return;
      if (event.key === "ArrowLeft" && isMobileMethodCardMode() && card.classList.contains("is-front")) {
        event.preventDefault();
        flingMethodCardBehind(index, { currentY: 0 });
        return;
      }
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      setActiveMethodCard(index);
    });

    card.addEventListener("pointerdown", (event) => {
      if (event.target?.closest?.("[data-project-grid-link]")) return;
      startMethodCardSwipe(event, index);
    });
    card.addEventListener("pointermove", (event) => updateMethodCardSwipe(event, index));
    card.addEventListener("pointerup", (event) => finishMethodCardSwipe(event, index));
    card.addEventListener("pointercancel", (event) => cancelMethodCardSwipe(event, index));
    card.addEventListener("lostpointercapture", (event) => cancelMethodCardSwipe(event, index));
  });

  explorerPoint?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const sectionId = explorerPoint.dataset.sectionId || explorerPointState?.sectionId;
    if (!sectionId) return;
    const action = explorerPoint.dataset.action || explorerPointState?.action;
    if (action === "project-grid") {
      void openProjectGridFromApplications({
        returnSectionId: explorerPointState?.returnSectionId || sectionId
      });
      return;
    }
    if (action === "contact") {
      void requestContactPanel({ direct: true, returnFocus: explorerPoint });
      return;
    }
    if (activeTileId === sectionId) {
      closeTile({ restoreFocus: true });
      return;
    }
    openTile(sectionId);
  });

  document.addEventListener("pointerdown", (event) => {
    if (!activeTileId || !holographicTile || holographicTile.hidden) return;
    if (isProjectGridOpen()) return;
    const target = event.target;
    if (holographicTile.contains(target) || explorerPoint?.contains(target)) return;
    event.preventDefault();
    closeTile();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isProjectGridOpen()) {
      event.preventDefault();
      if (projectDetailPanel && !projectDetailPanel.hidden) {
        closeProjectDetail();
        return;
      }
      closeProjectGridToApplications();
      return;
    }
    if (event.key === "Tab" && isProjectGridOpen()) {
      trapFocusWithin(
        event,
        projectDetailPanel && !projectDetailPanel.hidden ? projectDetailPanel : projectGridOverlay
      );
      return;
    }
    if (event.key === "Escape" && activeTileId) closeTile({ restoreFocus: true });
  });

  window.addEventListener("wheel", preventMethodCardPageScroll, { passive: false, capture: true });
  window.addEventListener("touchmove", preventMethodCardPageScroll, { passive: false, capture: true });
}

function openTile(sectionId, options = {}) {
  if (!holographicTile || !explorerPoint || !holographicTiles[sectionId]) return;
  const lockStory = options.lockStory !== false;
  const lockScroll = options.lockScroll !== false;
  if (lockStory) lockStoryState(sectionId);
  activeTileId = sectionId;
  document.body.classList.add("is-tile-open");
  if (explorerPointState) positionHolographicTile(explorerPointState);
  renderTileCards(sectionId, { scheduleFit: false });
  resetMethodCardStack();
  const usedCachedFit = applyCachedMethodCardFit(sectionId);
  holographicTile.hidden = false;
  explorerPoint.classList.add("is-active");
  explorerPoint.setAttribute("aria-expanded", "true");
  energy.layer?.classList.add("is-explorer-open");
  if (lockScroll) lockMethodCardPageScroll();
  void holographicTile.offsetWidth;
  holographicTile.classList.add("is-open");
  if (usedCachedFit) {
    window.setTimeout(scheduleMethodCardFit, 520);
  } else {
    scheduleMethodCardFit();
  }
}

function closeTile(options = {}) {
  if (!holographicTile || !explorerPoint) return;
  if (shouldKeepGuidedTileOpen(options)) return;
  const restoreFocus = options.restoreFocus === true;
  const restoreScroll = options.restoreScroll !== false;
  const releaseStory = options.releaseStory !== false;
  const closingId = activeTileId;
  activeTileId = "";
  document.body.classList.remove("is-tile-open");
  holographicTile.classList.remove("is-open", "has-front");
  holographicTile.classList.remove("is-card-swiping");
  methodCardSwipe = null;
  cancelMethodCardSwipeRender();
  if (methodCardFitRaf) {
    cancelAnimationFrame(methodCardFitRaf);
    methodCardFitRaf = 0;
  }
  methodCards.forEach((card) => {
    card.classList.remove("is-front", "is-swiping", "is-flying-left", "is-returning-behind");
    card.removeAttribute("data-stack-rank");
    card.style.removeProperty("--mobile-stack-x");
    card.style.removeProperty("--mobile-stack-y");
    card.style.removeProperty("--mobile-stack-rotate");
    card.style.removeProperty("--mobile-stack-scale");
    card.style.removeProperty("--mobile-stack-z");
    clearMethodCardSwipeStyle(card);
    card.removeAttribute("aria-pressed");
  });
  explorerPoint.classList.remove("is-active");
  explorerPoint.setAttribute("aria-expanded", "false");
  energy.layer?.classList.remove("is-explorer-open");
  if (methodCardScrollLocked) {
    unlockMethodCardPageScroll({ restoreScroll });
  } else {
    if (releaseStory) releaseStoryState();
    requestSync();
  }
  window.setTimeout(() => {
    if (!activeTileId) {
      if (shouldResumeGuidedTileAfterClose()) {
        requestSync();
        return;
      }
      holographicTile.hidden = true;
      requestSync();
    }
  }, 460);
  if (restoreFocus && closingId && !isMobileMethodCardMode()) explorerPoint.focus({ preventScroll: true });
}

function shouldKeepGuidedTileOpen(options = {}) {
  if (options.allowGuidedClose === true) return false;
  return Boolean(
    guidedScrollDemo.active
    && activeTileId === GUIDED_SCROLL_DEMO_SECTION_ID
    && guidedScrollDemo.progress >= GUIDED_SCROLL_DEMO_OPEN_AT
    && guidedScrollDemo.progress < GUIDED_SCROLL_DEMO_CLOSE_AT
  );
}

function shouldResumeGuidedTileAfterClose() {
  return Boolean(
    guidedScrollDemo.active
    && guidedScrollDemo.progress >= GUIDED_SCROLL_DEMO_OPEN_AT
    && guidedScrollDemo.progress < GUIDED_SCROLL_DEMO_CLOSE_AT
  );
}

function waitForAnimationFrames(count = 1) {
  return new Promise((resolve) => {
    let remaining = Math.max(1, Math.round(count));
    const step = () => {
      remaining -= 1;
      if (remaining <= 0) {
        resolve();
        return;
      }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

function positionHolographicTile(point) {
  if (!holographicTile || !point) return;
  const mobile = window.innerWidth <= 700;
  const margin = mobile ? 12 : 48;
  const maxWidth = Math.max(320, window.innerWidth - margin * 2);
  const maxHeight = Math.max(360, window.innerHeight - margin * 2);
  const width = mobile ? maxWidth : Math.min(920, maxWidth);
  const height = mobile ? Math.min(620, maxHeight) : Math.min(560, maxHeight);
  const left = Math.max(margin, (window.innerWidth - width) / 2);
  const top = Math.max(margin, (window.innerHeight - height) / 2);
  holographicTile.style.setProperty("--tile-x", `${Math.round(point.x)}px`);
  holographicTile.style.setProperty("--tile-y", `${Math.round(point.y)}px`);
  holographicTile.style.setProperty("--tile-width", `${Math.round(width)}px`);
  holographicTile.style.setProperty("--tile-height", `${Math.round(height)}px`);
  holographicTile.style.setProperty("--tile-open-x", `${Math.round(left - point.x)}px`);
  holographicTile.style.setProperty("--tile-open-y", `${Math.round(top - point.y)}px`);
}

function scheduleMethodCardFit() {
  if (!activeTileId || !holographicTile || holographicTile.hidden) return;
  if (methodCardFitRaf) cancelAnimationFrame(methodCardFitRaf);
  methodCardFitRaf = requestAnimationFrame(() => {
    methodCardFitRaf = 0;
    requestAnimationFrame(() => fitMethodCards());
  });
}

function fitMethodCards(options = {}) {
  if (!activeTileId || !holographicTile || holographicTile.hidden) return;
  methodCards.forEach(fitMethodCardText);
  storeMethodCardFit(options.sectionId || activeTileId);
}

function fitMethodCardText(card) {
  const text = card.querySelector(".method-card-text");
  const firstCopy = card.querySelector(".method-card-point-copy");
  if (!text || !firstCopy) return;

  resetMethodCardFit(card);
  const rect = card.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return;
  if (methodCardContentFits(card, text)) {
    card.dataset.fitScale = "1.00";
    return;
  }

  card.style.setProperty("--card-text-fit-gap", "0.14rem");
  card.style.setProperty("--card-point-fit-gap", "0.1rem");
  card.style.setProperty("--card-point-fit-padding", "0.12rem");
  card.style.setProperty("--card-copy-fit-leading", isMobileMethodCardMode() ? "1.08" : "1.09");

  if (methodCardContentFits(card, text)) {
    card.dataset.fitScale = "1.00";
    return;
  }

  const baseSize = parseFloat(getComputedStyle(firstCopy).fontSize) || 18;
  let low = METHOD_CARD_COPY_MIN_SCALE;
  let high = 1;
  let best = low;

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const scale = (low + high) / 2;
    card.style.setProperty("--card-copy-fit-size", `${(baseSize * scale).toFixed(2)}px`);
    if (methodCardContentFits(card, text)) {
      best = scale;
      low = scale;
    } else {
      high = scale;
    }
  }

  card.style.setProperty("--card-copy-fit-size", `${(baseSize * best).toFixed(2)}px`);
  card.dataset.fitScale = best.toFixed(2);
}

function methodCardContentFits(card, text) {
  return text.scrollHeight <= text.clientHeight + METHOD_CARD_FIT_TOLERANCE;
}

function resetMethodCardFit(card) {
  card.style.removeProperty("--card-copy-fit-size");
  card.style.removeProperty("--card-copy-fit-leading");
  card.style.removeProperty("--card-text-fit-gap");
  card.style.removeProperty("--card-point-fit-gap");
  card.style.removeProperty("--card-point-fit-padding");
  card.removeAttribute("data-fit-scale");
}

function getMethodCardFitCacheKey(sectionId) {
  return [
    sectionId,
    isMobileMethodCardMode() ? "mobile" : "desktop",
    Math.round(window.innerWidth || 0),
    Math.round(getViewportHeight() || 0)
  ].join(":");
}

function storeMethodCardFit(sectionId) {
  if (!sectionId) return;
  const entries = methodCards.map((card) => ({
    fitScale: card.dataset.fitScale || "",
    styles: METHOD_CARD_FIT_STYLE_PROPS.reduce((styles, prop) => {
      const value = card.style.getPropertyValue(prop);
      if (value) styles[prop] = value;
      return styles;
    }, {})
  }));
  methodCardFitCache.set(getMethodCardFitCacheKey(sectionId), entries);
}

function applyCachedMethodCardFit(sectionId) {
  const entries = methodCardFitCache.get(getMethodCardFitCacheKey(sectionId));
  if (!entries || entries.length !== methodCards.length) return false;
  entries.forEach((entry, index) => {
    const card = methodCards[index];
    if (!card) return;
    METHOD_CARD_FIT_STYLE_PROPS.forEach((prop) => {
      if (entry.styles?.[prop]) card.style.setProperty(prop, entry.styles[prop]);
    });
    if (entry.fitScale) card.dataset.fitScale = entry.fitScale;
  });
  return true;
}

function preventMethodCardPageScroll(event) {
  if (!activeTileId || isProjectGridOpen()) return;
  if (guidedScrollDemo.active) return;
  event.preventDefault();
}

function lockMethodCardPageScroll() {
  if (methodCardScrollLocked) return;
  methodCardScrollLocked = true;
  methodCardScrollY = window.scrollY || document.documentElement.scrollTop || 0;
  methodCardScrollSectionId = storyStateLock?.sectionId || activeTileId || explorerPointState?.sectionId || "";
  methodCardScrollInlineStyles = {
    htmlOverflow: document.documentElement.style.overflow,
    htmlOverscrollBehavior: document.documentElement.style.overscrollBehavior,
    bodyPosition: document.body.style.position,
    bodyTop: document.body.style.top,
    bodyLeft: document.body.style.left,
    bodyRight: document.body.style.right,
    bodyWidth: document.body.style.width,
    bodyOverflow: document.body.style.overflow,
    bodyOverscrollBehavior: document.body.style.overscrollBehavior
  };

  document.documentElement.classList.add("is-card-scroll-locked");
  document.body.classList.add("is-card-scroll-locked");
  document.documentElement.style.overflow = "hidden";
  document.documentElement.style.overscrollBehavior = "none";
  document.body.style.position = "fixed";
  document.body.style.top = `-${methodCardScrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";
  document.body.style.overscrollBehavior = "none";
}

function unlockMethodCardPageScroll(options = {}) {
  const shouldRestoreScroll = methodCardScrollLocked && options.restoreScroll !== false;
  const restoreY = methodCardScrollY;
  const restoreSectionId = methodCardScrollSectionId;
  const inlineStyles = methodCardScrollInlineStyles;
  methodCardScrollLocked = false;
  methodCardScrollInlineStyles = null;

  document.documentElement.classList.remove("is-card-scroll-locked");
  document.body.classList.remove("is-card-scroll-locked");
  if (inlineStyles) {
    document.documentElement.style.overflow = inlineStyles.htmlOverflow;
    document.documentElement.style.overscrollBehavior = inlineStyles.htmlOverscrollBehavior;
    document.body.style.position = inlineStyles.bodyPosition;
    document.body.style.top = inlineStyles.bodyTop;
    document.body.style.left = inlineStyles.bodyLeft;
    document.body.style.right = inlineStyles.bodyRight;
    document.body.style.width = inlineStyles.bodyWidth;
    document.body.style.overflow = inlineStyles.bodyOverflow;
    document.body.style.overscrollBehavior = inlineStyles.bodyOverscrollBehavior;
  }
  if (shouldRestoreScroll) restoreStoryScroll({ sectionId: restoreSectionId, y: restoreY });
  requestStoryStateRefresh(shouldRestoreScroll ? { sectionId: restoreSectionId, y: restoreY } : null);
  releaseStoryState({ delay: shouldRestoreScroll ? 520 : 0 });
}

function requestStoryStateRefresh(restore = null) {
  const restoreY = typeof restore === "number" ? restore : restore?.y;
  const restoreProgress = typeof restore === "object" && restore ? restore.progress : null;
  const restoreSectionId = typeof restore === "object" && restore ? restore.sectionId : "";
  const hasRestoreY = Number.isFinite(restoreY);
  const hasRestoreProgress = Number.isFinite(restoreProgress);
  const syncAtStableScroll = () => {
    if (hasRestoreProgress) {
      restoreStoryScroll({ progress: restoreProgress, sectionId: restoreSectionId, y: restoreY });
    } else if (hasRestoreY) {
      window.scrollTo(0, restoreY);
    }
    requestSync();
  };

  syncAtStableScroll();
  requestAnimationFrame(() => {
    syncAtStableScroll();
    requestAnimationFrame(requestSync);
  });
  window.setTimeout(syncAtStableScroll, 90);
  window.setTimeout(syncAtStableScroll, 220);
}

function restoreStoryScroll(options = {}) {
  const progress = Number(options.progress);
  if (Number.isFinite(progress)) {
    window.scrollTo(0, Math.round(getStoryTimelineMax() * getRawProgressForStoryProgress(progress)));
    return;
  }

  if (options.sectionId) {
    const sectionProgress = getSectionAnchorProgress(options.sectionId);
    if (Number.isFinite(sectionProgress)) {
      window.scrollTo(0, Math.round(getStoryTimelineMax() * getRawProgressForStoryProgress(sectionProgress)));
      return;
    }
  }

  if (Number.isFinite(options.y)) window.scrollTo(0, options.y);
}

function lockStoryState(sectionId) {
  const rawProgress = getScrollProgress();
  const effectiveProgress = getGuidedDemoEffectiveProgress(rawProgress);
  const sectionProgress = getSectionAnchorProgress(sectionId);
  const safeProgress = Number.isFinite(effectiveProgress) ? effectiveProgress : sectionProgress;
  if (storyStateLockReleaseTimer) {
    window.clearTimeout(storyStateLockReleaseTimer);
    storyStateLockReleaseTimer = 0;
  }
  storyStateLock = {
    active: true,
    sectionId,
    progress: Number.isFinite(safeProgress) ? safeProgress : 0,
    y: window.scrollY || document.documentElement.scrollTop || 0,
    viewportHeight: getViewportHeight(),
    startedAt: performance.now()
  };
  document.body.classList.add("is-story-state-locked");
  document.documentElement.style.setProperty("--locked-story-progress", storyStateLock.progress.toFixed(4));
  updateMobileDebug({ progress: storyStateLock.progress, rawProgress: getScrollProgress() });
}

function releaseStoryState(options = {}) {
  if (!storyStateLock?.active) return;
  const delay = Number.isFinite(options.delay) ? options.delay : 0;
  if (storyStateLockReleaseTimer) window.clearTimeout(storyStateLockReleaseTimer);
  storyStateLockReleaseTimer = window.setTimeout(() => {
    storyStateLock = null;
    storyStateLockReleaseTimer = 0;
    document.body.classList.remove("is-story-state-locked");
    document.documentElement.style.removeProperty("--locked-story-progress");
    requestSync();
    updateMobileDebug();
  }, delay);
}

function getEffectiveStoryProgress(rawProgress = getScrollProgress()) {
  if (storyStateLock?.active && Number.isFinite(storyStateLock.progress)) return storyStateLock.progress;
  return getGuidedDemoEffectiveProgress(rawProgress);
}

function getGuidedDemoEffectiveProgress(rawProgress) {
  const progress = clamp(rawProgress, 0, 1);
  if (!isGuidedScrollDemoEnabled()) return progress;
  if (progress < GUIDED_SCROLL_DEMO_RAW_START) return progress;

  if (progress <= GUIDED_SCROLL_DEMO_RAW_END) {
    const localProgress = getGuidedScrollDemoProgress(progress);
    return lerp(
      GUIDED_SCROLL_DEMO_RAW_START,
      GUIDED_SCROLL_DEMO_EXIT_PROGRESS,
      smoothstep(clamp(localProgress / 0.26, 0, 1))
    );
  }

  return lerp(
    GUIDED_SCROLL_DEMO_EXIT_PROGRESS,
    1,
    clamp((progress - GUIDED_SCROLL_DEMO_RAW_END) / Math.max(0.001, 1 - GUIDED_SCROLL_DEMO_RAW_END), 0, 1)
  );
}

function getRawProgressForStoryProgress(effectiveProgress) {
  const progress = clamp(effectiveProgress, 0, 1);
  if (!isGuidedScrollDemoEnabled() || progress < GUIDED_SCROLL_DEMO_RAW_START) return progress;
  if (progress <= GUIDED_SCROLL_DEMO_EXIT_PROGRESS) return GUIDED_SCROLL_DEMO_RAW_END;

  return lerp(
    GUIDED_SCROLL_DEMO_RAW_END,
    1,
    clamp((progress - GUIDED_SCROLL_DEMO_EXIT_PROGRESS) / Math.max(0.001, 1 - GUIDED_SCROLL_DEMO_EXIT_PROGRESS), 0, 1)
  );
}

function getGuidedScrollDemoProgress(rawProgress) {
  return clamp(
    (rawProgress - GUIDED_SCROLL_DEMO_RAW_START) / Math.max(0.001, GUIDED_SCROLL_DEMO_RAW_END - GUIDED_SCROLL_DEMO_RAW_START),
    0,
    1
  );
}

function prefersReducedMotion() {
  return Boolean(reducedMotionQuery?.matches);
}

function isGuidedScrollDemoEnabled() {
  return !isMobileMethodCardMode() && !prefersReducedMotion();
}

function getSectionAnchorProgress(sectionId) {
  const block = textBlocks.find((item) => item.id === sectionId);
  return block ? clamp(block.anchor, 0, 1) : null;
}

function getViewportHeight() {
  return window.visualViewport?.height || window.innerHeight || 0;
}

function isMobileMethodCardMode() {
  return window.innerWidth <= 760;
}

function clearMethodCardSwipeStyle(card) {
  card.style.removeProperty("--swipe-x");
  card.style.removeProperty("--swipe-y");
  card.style.removeProperty("--swipe-rotate");
  card.style.removeProperty("--swipe-progress");
}

function scheduleMethodCardSwipeRender() {
  if (methodCardSwipeRaf) return;
  methodCardSwipeRaf = requestAnimationFrame(() => {
    methodCardSwipeRaf = 0;
    applyMethodCardSwipeStyle(methodCardSwipe);
  });
}

function cancelMethodCardSwipeRender() {
  if (!methodCardSwipeRaf) return;
  cancelAnimationFrame(methodCardSwipeRaf);
  methodCardSwipeRaf = 0;
}

function applyMethodCardSwipeStyle(state) {
  if (!state?.card) return;
  state.card.style.setProperty("--swipe-x", `${state.currentX.toFixed(1)}px`);
  state.card.style.setProperty("--swipe-y", `${state.currentY.toFixed(1)}px`);
  state.card.style.setProperty("--swipe-rotate", `${state.currentRotate.toFixed(2)}deg`);
  state.card.style.setProperty("--swipe-progress", state.currentProgress.toFixed(3));
}

function startMethodCardSwipe(event, cardIndex) {
  const card = methodCards[cardIndex];
  if (!card || !activeTileId || !isMobileMethodCardMode() || !card.classList.contains("is-front")) return;
  if (event.button !== undefined && event.button !== 0) return;
  cancelMethodCardSwipeRender();

  methodCardSwipe = {
    card,
    index: cardIndex,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    currentX: 0,
    currentY: 0,
    currentRotate: 0,
    currentProgress: 0,
    velocityX: 0,
    lastX: event.clientX,
    lastTime: performance.now(),
    locked: false,
    moved: false
  };

  card.classList.remove("is-flying-left", "is-returning-behind");
  card.classList.add("is-swiping");
  holographicTile?.classList.add("is-card-swiping");
  clearMethodCardSwipeStyle(card);
  card.setPointerCapture?.(event.pointerId);
}

function updateMethodCardSwipe(event, cardIndex) {
  if (!methodCardSwipe || methodCardSwipe.pointerId !== event.pointerId || methodCardSwipe.index !== cardIndex) return;

  const dx = event.clientX - methodCardSwipe.startX;
  const dy = event.clientY - methodCardSwipe.startY;
  const absX = Math.abs(dx);
  const absY = Math.abs(dy);

  if (!methodCardSwipe.locked) {
    if (Math.max(absX, absY) < 7) return;
    if (absY > absX) return;
    methodCardSwipe.locked = true;
  }

  event.preventDefault();
  methodCardSwipe.moved = true;

  const now = performance.now();
  if (now > methodCardSwipe.lastTime) {
    methodCardSwipe.velocityX = (event.clientX - methodCardSwipe.lastX) / (now - methodCardSwipe.lastTime);
  }
  methodCardSwipe.lastX = event.clientX;
  methodCardSwipe.lastTime = now;

  const leftLimit = -window.innerWidth * 0.82;
  const swipeX = clamp(dx, leftLimit, 18);
  const swipeY = clamp(dy * 0.14, -18, 18);
  const progress = clamp(Math.abs(Math.min(swipeX, 0)) / Math.max(120, window.innerWidth * 0.42), 0, 1);
  const rotate = clamp(swipeX / 12, -10, 2) + clamp(dy / 48, -2, 2);

  methodCardSwipe.currentX = swipeX;
  methodCardSwipe.currentY = swipeY;
  methodCardSwipe.currentRotate = rotate;
  methodCardSwipe.currentProgress = progress;
  scheduleMethodCardSwipeRender();
}

function finishMethodCardSwipe(event, cardIndex) {
  if (!methodCardSwipe || methodCardSwipe.pointerId !== event.pointerId || methodCardSwipe.index !== cardIndex) return;

  const state = methodCardSwipe;
  state.card.releasePointerCapture?.(event.pointerId);
  cancelMethodCardSwipeRender();
  applyMethodCardSwipeStyle(state);
  methodCardSwipe = null;

  if (state.moved) methodCardSuppressClickUntil = Date.now() + 460;

  const distanceThreshold = -Math.max(86, window.innerWidth * 0.24);
  const velocityThreshold = state.velocityX < -0.45 && state.currentX < -38;
  if (state.currentX <= distanceThreshold || velocityThreshold) {
    flingMethodCardBehind(cardIndex, state);
    return;
  }

  state.card.classList.remove("is-swiping");
  holographicTile?.classList.remove("is-card-swiping");
  clearMethodCardSwipeStyle(state.card);
}

function cancelMethodCardSwipe(event, cardIndex) {
  if (!methodCardSwipe || methodCardSwipe.pointerId !== event.pointerId || methodCardSwipe.index !== cardIndex) return;
  const { card, moved } = methodCardSwipe;
  cancelMethodCardSwipeRender();
  methodCardSwipe = null;
  if (moved) methodCardSuppressClickUntil = Date.now() + 460;
  card.classList.remove("is-swiping");
  holographicTile?.classList.remove("is-card-swiping");
  clearMethodCardSwipeStyle(card);
}

function flingMethodCardBehind(cardIndex, state = {}) {
  const card = methodCards[cardIndex];
  if (!card || !isMobileMethodCardMode()) return;

  const rect = card.getBoundingClientRect();
  const exitX = -(window.innerWidth + rect.width * 1.2);
  const exitY = clamp(Number(state.currentY) || 0, -42, 42);

  methodCardSuppressClickUntil = Date.now() + 760;
  card.classList.remove("is-swiping", "is-returning-behind");
  card.classList.add("is-flying-left");
  card.style.setProperty("--swipe-x", `${Math.round(exitX)}px`);
  card.style.setProperty("--swipe-y", `${exitY.toFixed(1)}px`);
  card.style.setProperty("--swipe-rotate", "-24deg");
  card.style.setProperty("--swipe-progress", "1");

  window.setTimeout(() => {
    sendMethodCardBehind(cardIndex);
    card.classList.remove("is-flying-left");
    card.classList.add("is-returning-behind");
    holographicTile?.classList.remove("is-card-swiping");
    clearMethodCardSwipeStyle(card);
    window.setTimeout(() => card.classList.remove("is-returning-behind"), 380);
  }, 220);
}

function resetMethodCardStack() {
  methodCardStackOrder = methodCards.map((_, index) => index);
  setActiveMethodCard(0, { preserveStack: true });
}

function setActiveMethodCard(activeIndex, options = {}) {
  const normalizedIndex = clamp(Math.round(Number(activeIndex) || 0), 0, Math.max(0, methodCards.length - 1));
  activeMethodCardIndex = normalizedIndex;

  if (!options.preserveStack) {
    methodCardStackOrder = [
      normalizedIndex,
      ...methodCardStackOrder.filter((index) => index !== normalizedIndex)
    ];
  }

  applyMethodCardStack();
}

function sendMethodCardBehind(cardIndex) {
  const normalizedIndex = clamp(Math.round(Number(cardIndex) || 0), 0, Math.max(0, methodCards.length - 1));
  const nextOrder = methodCardStackOrder.filter((index) => index !== normalizedIndex);
  nextOrder.push(normalizedIndex);
  methodCardStackOrder = nextOrder;
  activeMethodCardIndex = methodCardStackOrder[0] ?? 0;
  applyMethodCardStack();
}

function applyMethodCardStack() {
  methodCards.forEach((card, index) => {
    const rank = methodCardStackOrder.indexOf(index);
    const safeRank = rank >= 0 ? rank : index;
    const isFront = index === activeMethodCardIndex;
    const stackRotation = isFront
      ? METHOD_CARD_FRONT_ROTATIONS[index] ?? -2
      : METHOD_CARD_BACK_ROTATIONS[safeRank] ?? safeRank * 2.4;

    card.classList.toggle("is-front", isFront);
    card.dataset.stackRank = String(safeRank);
    card.style.setProperty("--mobile-stack-x", `${safeRank * 0.82}rem`);
    card.style.setProperty("--mobile-stack-y", `${-1 + safeRank * 1.25}rem`);
    card.style.setProperty("--mobile-stack-rotate", `${stackRotation}deg`);
    card.style.setProperty("--mobile-stack-scale", "1");
    card.style.setProperty("--mobile-stack-z", String(10 - safeRank));
    card.setAttribute("aria-pressed", isFront ? "true" : "false");
  });

  holographicTile?.classList.add("has-front");
  holographicTile?.style.setProperty("--active-card", String(activeMethodCardIndex));
}

function renderTileCards(sectionId, options = {}) {
  const tile = holographicTiles[sectionId];
  if (!tile || !holographicTile) return;
  const outcome = normalizeMethodSectionOutcome(tile.outcome);
  const outcomeSummary = outcome ? [outcome.value, outcome.label].filter(Boolean).join(" ") : "";

  holographicTile.dataset.sectionId = sectionId;
  holographicTile.setAttribute(
    "aria-label",
    outcome
      ? `Fiches interactives ${tile.label}. Résultat: ${outcomeSummary}.`
      : `Fiches interactives ${tile.label}`
  );
  holographicTile.classList.remove(...CARD_LAYOUT_CLASSES);
  holographicTile.classList.add(isMobileMethodCardMode() ? CARD_LAYOUT_CLASSES[0] : tile.layout || CARD_LAYOUT_CLASSES[0]);
  renderMethodSectionOutcome(outcome);

  methodCards.forEach((card, index) => {
    const lines = tile.cards[index] || [];
    const title = CARD_TITLES[index] || `FICHE ${index + 1}`;
    const visual = getMethodCardVisual(sectionId, index);
    const existingGridLink = card.querySelector(".method-card-grid-link");
    const existingProjectIcon = card.querySelector(".method-card-project-icon");
    const text = card.querySelector(".method-card-text");
    const visualCover = Boolean(visual?.mode === "cover" && visual.image);
    resetMethodCardFit(card);
    existingGridLink?.remove();
    existingProjectIcon?.remove();
    card.classList.toggle("method-card-has-visual", Boolean(visual));
    card.classList.toggle("method-card-visual-cover", visualCover);
    card.classList.toggle("method-card-has-grid-link", false);
    const showProjectIcon = sectionId === "methodologie" || visualCover;
    card.classList.toggle("method-card-has-project-icon", showProjectIcon);
    if (visualCover) {
      card.style.setProperty("--method-card-visual-image", `url("${escapeCssUrl(visual.image)}")`);
    } else {
      card.style.removeProperty("--method-card-visual-image");
    }
    card.setAttribute("aria-label", visual?.alt ? `Afficher la fiche ${title}. ${visual.alt}` : `Afficher la fiche ${title} - ${tile.label}`);
    card.querySelector(".method-card-number").textContent = String(index + 1).padStart(2, "0");
    const sectionLabel = card.querySelector(".method-card-section");
    if (sectionLabel) {
      sectionLabel.textContent = visualCover ? "" : tile.label;
      sectionLabel.hidden = visualCover;
    }
    card.querySelector(".method-card-title").textContent = title;
    if (text) {
      text.classList.toggle("method-card-text-visual", Boolean(visual));
      text.hidden = false;
      text.innerHTML = visual
        ? renderMethodCardVisual(visual)
        : lines
          .map((line, lineIndex) => `
            <span class="method-card-point">
              <span class="method-card-point-title">${escapeHtml(getCardPointTitle(index, lineIndex))}</span>
              <span class="method-card-point-copy">${escapeHtml(line)}</span>
            </span>
          `)
          .join("");
    }

    if (showProjectIcon) {
      const projectIcon = document.createElement("button");
      projectIcon.type = "button";
      projectIcon.className = "method-card-project-icon";
      projectIcon.dataset.projectGridLink = "";
      projectIcon.title = "Projet";
      projectIcon.setAttribute("aria-label", `Ouvrir la grille projet depuis la fiche ${title}`);
      projectIcon.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3.5 7.5h5.6l2 2H20.5v8.5H3.5z"></path>
          <path d="M3.5 7.5v-2h5l2 2"></path>
        </svg>
      `;
      card.appendChild(projectIcon);
    }
  });
  if (options.scheduleFit !== false) scheduleMethodCardFit();
}

function normalizeMethodSectionOutcome(outcome) {
  if (!outcome) return null;
  const value = String(outcome.value || "").trim();
  const label = String(outcome.label || "").trim();
  const detail = String(outcome.detail || "").trim();
  const projectGuide = String(outcome.projectGuide || "").trim();
  if (!value && !label && !detail && !projectGuide) return null;
  return { value, label, detail, projectGuide };
}

function ensureMethodSectionOutcome() {
  if (!holographicTile) return null;
  let outcome = holographicTile.querySelector(".method-section-outcome");
  if (!outcome) {
    outcome = document.createElement("div");
    outcome.className = "method-section-outcome";
    outcome.setAttribute("role", "note");
    holographicTile.appendChild(outcome);
  }
  return outcome;
}

function ensureMethodSectionProjectGuide() {
  if (!holographicTile) return null;
  let guide = holographicTile.querySelector(".method-section-project-guide");
  if (!guide || guide.tagName !== "BUTTON") {
    const nextGuide = document.createElement("button");
    nextGuide.className = "method-section-project-guide";
    if (guide) {
      guide.replaceWith(nextGuide);
    } else {
      holographicTile.appendChild(nextGuide);
    }
    guide = nextGuide;
  }
  guide.type = "button";
  guide.dataset.projectGridLink = "";
  guide.title = "Projet";
  guide.setAttribute("aria-label", "Ouvrir la grille projet");
  return guide;
}

function renderMethodSectionOutcome(outcome) {
  const outcomeElement = ensureMethodSectionOutcome();
  if (!outcomeElement) return;
  renderMethodSectionProjectGuide(outcome?.projectGuide || "");

  if (!outcome) {
    outcomeElement.hidden = true;
    outcomeElement.innerHTML = "";
    return;
  }

  outcomeElement.hidden = false;
  outcomeElement.classList.toggle("has-value", Boolean(outcome.value));
  outcomeElement.innerHTML = `
    <span class="method-section-outcome-kicker">Résultat</span>
    ${outcome.value ? `<strong class="method-section-outcome-value">${escapeHtml(outcome.value)}</strong>` : ""}
    ${outcome.label ? `<span class="method-section-outcome-label">${escapeHtml(outcome.label)}</span>` : ""}
    ${outcome.detail ? `<span class="method-section-outcome-detail">${escapeHtml(outcome.detail)}</span>` : ""}
  `;
}

function renderMethodSectionProjectGuide(label) {
  const guide = ensureMethodSectionProjectGuide();
  if (!guide) return;

  if (!label) {
    guide.hidden = true;
    guide.innerHTML = "";
    return;
  }

  guide.hidden = false;
  guide.innerHTML = `
      <span class="method-section-project-label">${escapeHtml(label)}</span>
      <svg class="method-section-project-arrow" viewBox="0 0 24 24" focusable="false">
        <path d="M4 12h13"></path>
        <path d="m12 7 5 5-5 5"></path>
      </svg>
      <span class="method-section-project-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M3.5 7.5h5.6l2 2H20.5v8.5H3.5z"></path>
          <path d="M3.5 7.5v-2h5l2 2"></path>
        </svg>
      </span>
  `;
}

function getMethodCardVisual(sectionId, cardIndex) {
  return METHOD_CARD_VISUALS[sectionId]?.[cardIndex] || null;
}

function renderMethodCardVisual(visual) {
  const words = Array.isArray(visual.words) ? visual.words.slice(0, 3) : [];
  const phrase = String(visual.phrase || "").trim();
  const image = String(visual.image || "").trim();
  const alt = String(visual.alt || words.join(", ")).trim();
  const cover = Boolean(visual.mode === "cover" && image);
  const overlay = Boolean(visual.mode === "overlay" && image);
  const artClass = image ? "method-card-visual-art method-card-visual-art-image" : "method-card-visual-art";
  const artAttributes = image ? "" : ` role="img" aria-label="${escapeHtml(words.join(", "))}"`;
  const artContent = image
    ? `<img class="method-card-visual-image" src="${escapeHtml(image)}" alt="${escapeHtml(alt)}" loading="eager" decoding="async">`
    : `
      <svg class="method-card-visual-map" viewBox="0 0 320 220" aria-hidden="true" focusable="false">
        <path class="method-card-visual-path is-muted" d="M38 54 C86 28 119 70 158 96"></path>
        <path class="method-card-visual-path is-muted" d="M34 156 C88 184 120 138 158 119"></path>
        <path class="method-card-visual-path is-muted" d="M50 104 C98 96 125 102 158 106"></path>
        <path class="method-card-visual-path is-main" d="M188 108 C222 104 246 94 284 70"></path>
        <path class="method-card-visual-path is-main" d="M188 108 C224 116 246 130 284 150"></path>
        <circle class="method-card-visual-node is-small" cx="39" cy="54" r="7"></circle>
        <circle class="method-card-visual-node is-small" cx="34" cy="156" r="7"></circle>
        <circle class="method-card-visual-node is-small" cx="50" cy="104" r="7"></circle>
        <circle class="method-card-visual-ring" cx="174" cy="108" r="36"></circle>
        <circle class="method-card-visual-core" cx="174" cy="108" r="13"></circle>
        <circle class="method-card-visual-node is-clear" cx="284" cy="70" r="8"></circle>
        <circle class="method-card-visual-node is-clear" cx="284" cy="150" r="8"></circle>
      </svg>
    `;
  return `
    <span class="method-card-visual ${overlay ? "method-card-visual-overlay-mode" : ""}">
      ${cover && alt ? `<span class="visually-hidden">${escapeHtml(alt)}</span>` : ""}
      ${cover ? "" : `<span class="${artClass}"${artAttributes}>
        ${artContent}
        ${overlay ? renderMethodCardVisualOverlay(words, phrase) : ""}
      </span>`}
      ${overlay ? "" : renderMethodCardVisualOverlay(words, phrase)}
    </span>
  `;
}

function renderMethodCardVisualOverlay(words, phrase) {
  return `
    <span class="method-card-visual-overlay">
      <span class="method-card-visual-words">
        ${words.map((word) => `<span class="method-card-visual-word">${escapeHtml(word)}</span>`).join("")}
      </span>
      ${phrase ? `<span class="method-card-visual-caption">${escapeHtml(phrase)}</span>` : ""}
    </span>
  `;
}

function getCardPointTitle(cardIndex, lineIndex) {
  return CARD_POINT_TITLES[cardIndex]?.[lineIndex] || `Point ${lineIndex + 1}`;
}

function escapeCssUrl(value) {
  return String(value || "").replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
}

window.openTile = openTile;
window.closeTile = closeTile;
window.openProjectGrid = openProjectGridFromApplications;

async function preloadProjectRegistryModule(options = {}) {
  const refresh = Boolean(options.refresh);
  if (!refresh && (projectCardsReady || projectCards.length)) return projectCardsReady;
  const requestId = projectRegistryRequestId + 1;
  projectRegistryRequestId = requestId;
  const importUrl = refresh ? cacheBustedProjectRegistryModule() : PROJECT_REGISTRY_MODULE;
  projectCardsReady = import(importUrl)
    .then((module) => {
      const nextProjectCards = Array.isArray(module.orchestratorProjectCards)
        ? module.orchestratorProjectCards
        : [];
      if (requestId === projectRegistryRequestId) projectCards = nextProjectCards;
      return projectCards;
    })
    .catch((error) => {
      window.__projectRegistryError = String(error?.message || error);
      if (requestId === projectRegistryRequestId) projectCards = [];
      return projectCards;
    });
  return projectCardsReady;
}

function cacheBustedProjectRegistryModule() {
  const separator = PROJECT_REGISTRY_MODULE.includes("?") ? "&" : "?";
  return `${PROJECT_REGISTRY_MODULE}${separator}refresh=${Date.now()}`;
}

async function buildProjectGrid(options = {}) {
  const refreshRegistry = Boolean(options.refreshRegistry);
  if (!projectGridTrack || projectGridBuilt && !refreshRegistry) return;
  await preloadProjectRegistryModule({ refresh: refreshRegistry });
  if (!projectCards.length) return;
  projectGridBasePositions = createProjectGridBasePositions();

  projectGridTrack.innerHTML = `
    ${PROJECT_GRID_THEME_MARKERS
      .map((marker) => `
        <span
          class="project-theme-marker"
          data-theme-marker="${escapeHtml(marker.id)}"
          style="--project-x: ${marker.x}px; --project-y: ${marker.y}px;">
          ${escapeHtml(marker.label)}
        </span>
      `)
      .join("")}
    ${projectCards
      .map((project, index) => {
      const position = projectGridBasePositions[index] || { x: 0, y: 0, rotate: 0, scale: 1 };
      const imageSrc = getProjectImageSrc(project);
      const priority = index < 6;
      return `
        <button
          class="project-grid-card"
          type="button"
          data-project-index="${index}"
          data-project-featured="${project.featured ? "true" : "false"}"
          style="--project-x: ${position.x}px; --project-y: ${position.y}px; --project-rotate: ${position.rotate}deg; --project-scale: ${position.scale};"
          aria-label="Ouvrir le projet ${escapeHtml(project.name)}">
          <img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(project.name)}" width="640" height="640" loading="${priority ? "eager" : "lazy"}" decoding="async" fetchpriority="${index < 3 ? "high" : "auto"}" draggable="false">
          <span class="project-card-category">${escapeHtml(getProjectCategoryLabel(project.category))}</span>
          <strong>${escapeHtml(project.name)}</strong>
        </button>
      `;
    })
    .join("")}
  `;

  projectGridInstances = projectCards.map((project, index) => {
    const position = projectGridBasePositions[index] || { x: 0, y: 0, rotate: 0, scale: 1 };
    return {
      id: `project-${index}`,
      index,
      project,
      x: position.x,
      y: position.y,
      rotate: position.rotate,
      scale: position.scale,
      element: projectGridTrack.querySelector(`[data-project-index="${index}"]`)
    };
  });

  projectGridThemeInstances = PROJECT_GRID_THEME_MARKERS.map((marker) => ({
    id: marker.id,
    x: marker.x,
    y: marker.y,
    element: projectGridTrack.querySelector(`[data-theme-marker="${marker.id}"]`)
  }));

  projectGridBuilt = true;
  applyProjectGridItemPositions();
  buildProjectMobilePage();
  runWhenIdle(() => void preloadProjectDetailRenderer(), 700);
}

function ensureProjectGridStyles() {
  if (projectGridStylesReady) return projectGridStylesReady;

  const existing = document.querySelector("link[data-project-grid-styles]");
  if (existing?.sheet) return Promise.resolve(true);

  projectGridStylesReady = new Promise((resolve) => {
    const link = existing || document.createElement("link");
    const finish = (loaded) => {
      link.removeEventListener("load", handleLoad);
      link.removeEventListener("error", handleError);
      if (loaded) {
        window.__projectGridStylesLoaded = true;
      } else {
        window.__projectGridStylesError = `Impossible de charger ${PROJECT_GRID_STYLESHEET}`;
        projectGridStylesReady = null;
      }
      resolve(loaded);
    };
    const handleLoad = () => finish(true);
    const handleError = () => finish(false);

    link.addEventListener("load", handleLoad, { once: true });
    link.addEventListener("error", handleError, { once: true });
    if (!existing) {
      link.rel = "stylesheet";
      link.href = PROJECT_GRID_STYLESHEET;
      link.dataset.projectGridStyles = "";
      const criticalStyles = document.querySelector('link[href*="src/styles.css"]');
      document.head.insertBefore(link, criticalStyles || null);
    }
  });

  return projectGridStylesReady;
}

function buildProjectMobilePage() {
  if (!projectMobilePage || !projectCards.length) return;
  const sections = getMobileProjectSections();
  projectMobilePage.innerHTML = sections
    .map((section, sectionIndex) => `
      <section class="project-mobile-section project-mobile-section-${escapeHtml(section.id)}" data-project-mobile-section="${escapeHtml(section.id)}">
        <header class="project-mobile-section-head">
          <span>${String(sectionIndex + 1).padStart(2, "0")}</span>
          <h3>${escapeHtml(section.label)}</h3>
        </header>
        <div class="project-mobile-card-grid">
          ${section.projects
            .map(({ project, index }) => renderProjectMobileCard(project, index))
            .join("")}
        </div>
      </section>
    `)
    .join("");
}

function getMobileProjectSections() {
  const grouped = projectCards.reduce((groups, project, index) => {
    const id = project.category || "tools";
    const projects = groups.get(id) || [];
    projects.push({ project, index });
    groups.set(id, projects);
    return groups;
  }, new Map());

  const orderedIds = [
    ...PROJECT_MOBILE_CATEGORY_ORDER,
    ...Array.from(grouped.keys()).filter((id) => !PROJECT_MOBILE_CATEGORY_ORDER.includes(id)).sort()
  ];

  const sections = orderedIds
    .map((id) => ({
      id,
      label: getProjectCategoryLabel(id),
      projects: grouped.get(id) || []
    }))
    .filter((section) => section.projects.length);
  return sections;
}

function renderProjectMobileCard(project, index) {
  const imageSrc = getProjectImageSrc(project);
  const priority = index < 6;
  return `
    <button
      class="project-mobile-card"
      type="button"
      data-project-index="${index}"
      aria-label="Ouvrir le projet ${escapeHtml(project.name)}">
      <img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(project.name)}" width="640" height="720" loading="${priority ? "eager" : "lazy"}" decoding="async" fetchpriority="${index < 3 ? "high" : "auto"}" draggable="false">
      <span class="project-card-category">${escapeHtml(getProjectCategoryLabel(project.category))}</span>
      <strong>${escapeHtml(project.name)}</strong>
    </button>
  `;
}

function bindProjectGrid() {
  const warmProjectGridStyles = (event) => {
    if (!event.target?.closest?.("[data-project-grid-link]")) return;
    void ensureProjectGridStyles();
  };
  document.addEventListener("pointerover", warmProjectGridStyles, { passive: true });
  document.addEventListener("focusin", warmProjectGridStyles);
  document.addEventListener("touchstart", warmProjectGridStyles, { passive: true });

  document.addEventListener("click", (event) => {
    const trigger = event.target?.closest?.("[data-project-grid-link]");
    if (!trigger) return;
    event.preventDefault();
    event.stopPropagation();
    projectGridReturnFocus = trigger instanceof HTMLElement ? trigger : null;
    void openProjectGridFromApplications({ updateHash: true });
  });

  projectGridClose?.addEventListener("click", closeProjectGridToHome);
  projectGridViewMap?.addEventListener("click", () => setProjectGridView("map"));
  projectGridViewList?.addEventListener("click", () => setProjectGridView("list"));
  projectGridZoomOut?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    adjustProjectGridZoom(-PROJECT_GRID_ZOOM_STEP);
  });
  projectGridZoomIn?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    adjustProjectGridZoom(PROJECT_GRID_ZOOM_STEP);
  });
  projectGridZoomReset?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    setProjectGridZoom(1);
  });
  projectGridCompassButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      focusProjectGridTheme(button.dataset.projectGridFocus);
    });
  });

  projectGridStage?.addEventListener("pointerdown", startProjectGridDrag);
  projectGridStage?.addEventListener("pointermove", moveProjectGridDrag);
  projectGridStage?.addEventListener("pointerup", finishProjectGridDrag);
  projectGridStage?.addEventListener("pointercancel", cancelProjectGridDrag);
  projectGridStage?.addEventListener("wheel", moveProjectGridWithWheel, { passive: false });

  projectGridStage?.addEventListener("keydown", (event) => {
    if (!isProjectGridOpen()) return;
    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      adjustProjectGridZoom(PROJECT_GRID_ZOOM_STEP);
      return;
    }
    if (event.key === "-" || event.key === "_") {
      event.preventDefault();
      adjustProjectGridZoom(-PROJECT_GRID_ZOOM_STEP);
      return;
    }
    if (event.key === "0") {
      event.preventDefault();
      setProjectGridZoom(1);
      return;
    }

    const keyMap = {
      ArrowLeft: { x: PROJECT_GRID_PAN_STEP, y: 0 },
      ArrowRight: { x: -PROJECT_GRID_PAN_STEP, y: 0 },
      ArrowUp: { x: 0, y: PROJECT_GRID_PAN_STEP },
      ArrowDown: { x: 0, y: -PROJECT_GRID_PAN_STEP }
    };
    const delta = keyMap[event.key];
    if (!delta) return;
    event.preventDefault();
    setProjectGridPan(projectGridPan.x + delta.x, projectGridPan.y + delta.y);
  });

  projectGridTrack?.addEventListener("click", (event) => {
    const card = event.target?.closest?.("[data-project-index]");
    if (!card || Date.now() < projectGridSuppressClickUntil) return;
    const project = projectCards[Number(card.dataset.projectIndex)];
    if (!project) return;
    void openProjectDetail(project, card);
  });

  projectMobilePage?.addEventListener("click", (event) => {
    const card = event.target?.closest?.("[data-project-index]");
    if (!card) return;
    const project = projectCards[Number(card.dataset.projectIndex)];
    if (!project) return;
    void openProjectDetail(project, card);
  });

  projectDetailPanel?.addEventListener("click", (event) => {
    const closeDetail = event.target?.closest?.("[data-project-detail-close]");
    if (closeDetail) {
      event.preventDefault();
      closeProjectDetail();
    }
  });
}

async function openProjectGridFromApplications(options = {}) {
  if (!projectGridOverlay) return;
  const [stylesReady] = await Promise.all([
    ensureProjectGridStyles(),
    buildProjectGrid({ refreshRegistry: true })
  ]);
  if (!stylesReady || !projectGridBuilt) return;
  if (options.updateHash !== false) setProjectGridHash();
  const mobileMode = isMobileProjectGridMode();
  projectGridReturnSectionId = options.returnSectionId || activeTileId || holographicTile?.dataset.sectionId || explorerPointState?.returnSectionId || explorerPointState?.sectionId || "methodologie";
  setActiveMethodCard(2);
  closeProjectDetail();
  document.body.classList.add("is-project-grid-open");
  projectGridOverlay.hidden = false;
  projectGridOverlay.classList.add("is-open");
  projectGridOverlay.classList.toggle("is-mobile-list", mobileMode);
  if (mobileMode) {
    projectGridOverlay.classList.remove("is-list-view");
    stopProjectGridAnimation();
    syncProjectGridViewButtons("list");
    if (projectMobilePage) projectMobilePage.scrollTop = 0;
    projectMobilePage?.focus({ preventScroll: true });
    setModalBackgroundInert(projectGridOverlay, true);
    return;
  }
  randomizeProjectGridLayout();
  resetProjectGridMap(PROJECT_GRID_INITIAL_THEME);
  setProjectGridView(projectGridViewMode);
  setModalBackgroundInert(projectGridOverlay, true);
}

function closeProjectGridToApplications(options = {}) {
  if (!projectGridOverlay) return;
  if (options.updateHash !== false) clearProjectGridHash();
  hideProjectGridOverlay();
  restoreApplicationsCard();
  restoreProjectGridTriggerFocus();
}

function closeProjectGridToHome(options = {}) {
  if (!projectGridOverlay) return;
  if (options.updateHash !== false) clearProjectGridHash();
  hideProjectGridOverlay();
  closeTile({ restoreScroll: false });
  projectGridReturnSectionId = "intro";
  requestStoryStateRefresh({ progress: 0, sectionId: "intro", y: 0 });
  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    requestSync();
  });
  restoreProjectGridTriggerFocus();
}

function hideProjectGridOverlay() {
  cancelProjectGridDrag();
  stopProjectGridAnimation();
  closeProjectDetail({ restoreFocus: false });
  setModalBackgroundInert(projectGridOverlay, false);
  projectGridOverlay.classList.remove("is-open");
  projectGridOverlay.classList.remove("is-mobile-list");
  projectGridOverlay.classList.remove("is-list-view");
  projectGridOverlay.hidden = true;
  document.body.classList.remove("is-project-grid-open");
}

function restoreApplicationsCard() {
  const sectionId = projectGridReturnSectionId || activeTileId || holographicTile?.dataset.sectionId || explorerPointState?.sectionId;
  if (sectionId && holographicTiles[sectionId]) {
    if (!activeTileId) openTile(sectionId);
    setActiveMethodCard(2);
    scheduleMethodCardFit();
    requestAnimationFrame(() => methodCards[2]?.focus({ preventScroll: true }));
  } else if (sectionId) {
    closeTile();
    const progress = getSectionAnchorProgress(sectionId);
    requestStoryStateRefresh({
      progress: Number.isFinite(progress) ? progress : null,
      sectionId
    });
    requestAnimationFrame(() => explorerPoint?.focus({ preventScroll: true }));
    return;
  }
  requestStoryStateRefresh();
}

function restoreProjectGridTriggerFocus() {
  const target = projectGridReturnFocus;
  projectGridReturnFocus = null;
  if (!(target instanceof HTMLElement) || !target.isConnected || target.closest("[hidden]")) return;
  requestAnimationFrame(() => target.focus({ preventScroll: true }));
}

function isProjectGridOpen() {
  return Boolean(projectGridOverlay && !projectGridOverlay.hidden);
}

function isMobileProjectGridMode() {
  return window.innerWidth <= 760;
}

function syncProjectGridPresentationMode() {
  if (!isProjectGridOpen() || !projectGridOverlay) return;
  const mobileMode = isMobileProjectGridMode();
  projectGridOverlay.classList.toggle("is-mobile-list", mobileMode);
  if (mobileMode) {
    projectGridOverlay.classList.remove("is-list-view");
    syncProjectGridViewButtons("list");
    stopProjectGridAnimation();
    cancelProjectGridDrag();
    return;
  }
  setProjectGridView(projectGridViewMode, { moveFocus: false });
  if (projectGridViewMode === "map" && !projectGridFrame) {
    resetProjectGridMap(PROJECT_GRID_INITIAL_THEME);
    startProjectGridAnimation();
  }
}

function setProjectGridView(mode, options = {}) {
  if (!projectGridOverlay) return;
  const requestedMode = mode === "list" ? "list" : "map";
  if (!isMobileProjectGridMode()) projectGridViewMode = requestedMode;
  const effectiveMode = isMobileProjectGridMode() ? "list" : requestedMode;
  const listMode = effectiveMode === "list";

  projectGridOverlay.classList.toggle("is-list-view", listMode && !isMobileProjectGridMode());
  syncProjectGridViewButtons(effectiveMode);
  if (listMode) {
    stopProjectGridAnimation();
    cancelProjectGridDrag();
    if (options.moveFocus !== false) projectMobilePage?.focus({ preventScroll: true });
    return;
  }

  startProjectGridAnimation();
  if (options.moveFocus !== false) projectGridStage?.focus({ preventScroll: true });
}

function syncProjectGridViewButtons(mode) {
  [
    [projectGridViewMap, "map"],
    [projectGridViewList, "list"]
  ].forEach(([button, value]) => {
    const active = mode === value;
    button?.classList.toggle("is-active", active);
    button?.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function startProjectGridDrag(event) {
  if (!isProjectGridOpen() || event.button !== undefined && event.button !== 0) return;
  if (event.target?.closest?.(".project-grid-zoom-controls, .project-grid-compass")) return;
  const startCard = event.target?.closest?.("[data-project-index]");
  projectGridDrag.active = true;
  projectGridDrag.pointerId = event.pointerId;
  projectGridDrag.startX = event.clientX;
  projectGridDrag.startY = event.clientY;
  projectGridDrag.lastX = event.clientX;
  projectGridDrag.lastY = event.clientY;
  projectGridDrag.startProjectIndex = startCard ? Number(startCard.dataset.projectIndex) : null;
  projectGridDrag.moved = false;
  projectGridStage?.classList.add("is-dragging");
  projectGridStage?.setPointerCapture?.(event.pointerId);
}

function moveProjectGridDrag(event) {
  if (!projectGridDrag.active || projectGridDrag.pointerId !== event.pointerId) return;
  const deltaX = event.clientX - projectGridDrag.lastX;
  const deltaY = event.clientY - projectGridDrag.lastY;
  const totalX = event.clientX - projectGridDrag.startX;
  const totalY = event.clientY - projectGridDrag.startY;
  projectGridDrag.lastX = event.clientX;
  projectGridDrag.lastY = event.clientY;

  if (Math.hypot(totalX, totalY) > 8) {
    projectGridDrag.moved = true;
    projectGridSuppressClickUntil = Date.now() + 260;
  }

  if (!projectGridDrag.moved) return;
  event.preventDefault();
  setProjectGridPan(projectGridTarget.x + deltaX * 1.22, projectGridTarget.y + deltaY * 1.22);
}

function finishProjectGridDrag(event) {
  if (!projectGridDrag.active || projectGridDrag.pointerId !== event.pointerId) return;
  const clickedProjectIndex = projectGridDrag.startProjectIndex;
  const wasClick = !projectGridDrag.moved && Number.isInteger(clickedProjectIndex);
  if (projectGridDrag.moved) projectGridSuppressClickUntil = Date.now() + 260;
  projectGridStage?.releasePointerCapture?.(event.pointerId);
  cancelProjectGridDrag();
  if (wasClick) {
    const project = projectCards[clickedProjectIndex];
    if (project) openProjectDetail(project);
  }
}

function cancelProjectGridDrag() {
  projectGridDrag.active = false;
  projectGridDrag.pointerId = -1;
  projectGridDrag.startProjectIndex = null;
  projectGridDrag.moved = false;
  projectGridStage?.classList.remove("is-dragging");
}

function setProjectGridPan(x, y) {
  projectGridTarget.x = x;
  projectGridTarget.y = y;
  projectGridPan.x = x;
  projectGridPan.y = y;
  startProjectGridAnimation();
}

function moveProjectGridWithWheel(event) {
  if (!isProjectGridOpen() || projectGridOverlay?.classList.contains("has-project-detail")) return;
  event.preventDefault();
  const unit = event.deltaMode === 1 ? 16 : 1;

  const wantsPan = !event.ctrlKey && (event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.15);
  if (!wantsPan) {
    const wheelDelta = -event.deltaY * unit;
    const zoomFactor = Math.exp(wheelDelta * 0.0014);
    setProjectGridZoom(projectGridZoom.target * zoomFactor, {
      clientX: event.clientX,
      clientY: event.clientY
    });
    return;
  }

  const panDeltaX = event.shiftKey && Math.abs(event.deltaX) < Math.abs(event.deltaY)
    ? event.deltaY
    : event.deltaX;
  const panDeltaY = event.shiftKey ? event.deltaX : event.deltaY;
  setProjectGridPan(
    projectGridTarget.x - panDeltaX * unit,
    projectGridTarget.y - panDeltaY * unit
  );
}

function adjustProjectGridZoom(delta) {
  setProjectGridZoom(projectGridZoom.target + delta);
}

function setProjectGridZoom(nextZoom, anchor = null) {
  const previousZoom = projectGridZoom.target;
  const zoom = clamp(nextZoom, PROJECT_GRID_ZOOM_MIN, PROJECT_GRID_ZOOM_MAX);
  if (Math.abs(zoom - previousZoom) < 0.001) return;

  if (anchor && projectGridStage && previousZoom > 0) {
    const rect = projectGridStage.getBoundingClientRect();
    const anchorX = anchor.clientX - rect.left - rect.width / 2;
    const anchorY = anchor.clientY - rect.top - rect.height / 2;
    const ratio = zoom / previousZoom;
    const nextPanX = projectGridTarget.x + (1 - ratio) * (anchorX - projectGridTarget.x);
    const nextPanY = projectGridTarget.y + (1 - ratio) * (anchorY - projectGridTarget.y);
    projectGridTarget.x = nextPanX;
    projectGridTarget.y = nextPanY;
    projectGridPan.x = nextPanX;
    projectGridPan.y = nextPanY;
  }

  projectGridZoom.target = zoom;
  updateProjectGridZoomControls();
  startProjectGridAnimation();
}

function updateProjectGridZoomControls() {
  const percent = `${Math.round(projectGridZoom.target * 100)}%`;
  if (projectGridZoomReset) projectGridZoomReset.textContent = percent;
  if (projectGridZoomOut) projectGridZoomOut.disabled = projectGridZoom.target <= PROJECT_GRID_ZOOM_MIN + 0.01;
  if (projectGridZoomIn) projectGridZoomIn.disabled = projectGridZoom.target >= PROJECT_GRID_ZOOM_MAX - 0.01;
}

function focusProjectGridTheme(themeId) {
  const target = getProjectGridThemeTarget(themeId);
  if (!target) return;

  const zoom = Math.max(0.001, projectGridZoom.target);
  setProjectGridPan(-target.x * zoom, -target.y * zoom);
  setProjectGridActiveTheme(themeId);
}

function setProjectGridInstantFocus(themeId) {
  const target = getProjectGridThemeTarget(themeId);
  if (!target) return;

  const zoom = Math.max(0.001, projectGridZoom.target);
  const x = -target.x * zoom;
  const y = -target.y * zoom;
  projectGridTarget.x = x;
  projectGridTarget.y = y;
  projectGridCurrent.x = x;
  projectGridCurrent.y = y;
  projectGridPan.x = x;
  projectGridPan.y = y;
  setProjectGridActiveTheme(themeId);
}

function getProjectGridThemeTarget(themeId) {
  return projectGridThemeInstances.find((instance) => instance.id === themeId)
    || PROJECT_GRID_THEME_MARKERS.find((marker) => marker.id === themeId);
}

function setProjectGridActiveTheme(themeId) {
  projectGridCompassButtons.forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.projectGridFocus === themeId);
  });
}

function randomizeProjectGridLayout() {
  projectGridBasePositions = createProjectGridBasePositions();
  projectGridInstances.forEach((instance) => {
    const position = projectGridBasePositions[instance.index] || { x: 0, y: 0, rotate: 0, scale: 1 };
    instance.x = position.x;
    instance.y = position.y;
    instance.rotate = position.rotate;
    instance.scale = position.scale;
  });
  applyProjectGridItemPositions();
}

function createProjectGridBasePositions() {
  const positions = new Array(projectCards.length);
  const cardMetrics = getProjectGridCardMetrics();
  const markerSafeAreas = getProjectGridThemeMarkerSafeAreas();
  const placed = [];
  const groupedProjects = new Map();

  projectCards.forEach((project, index) => {
    const category = project.category || "tools";
    const items = groupedProjects.get(category) || [];
    items.push({ project, index });
    groupedProjects.set(category, items);
  });

  Object.keys(PROJECT_GRID_THEME_ZONES).forEach((category) => {
    const items = groupedProjects.get(category);
    if (!items?.length) return;
    placeProjectGridCategoryItems(items, PROJECT_GRID_THEME_ZONES[category], positions, placed, cardMetrics, markerSafeAreas);
  });

  groupedProjects.forEach((items, category) => {
    if (PROJECT_GRID_THEME_ZONES[category]) return;
    placeProjectGridCategoryItems(items, PROJECT_GRID_THEME_ZONES.tools, positions, placed, cardMetrics, markerSafeAreas);
  });

  return positions.map((position) => position || createProjectGridCandidate(PROJECT_GRID_THEME_ZONES.tools, cardMetrics));
}

function placeProjectGridCategoryItems(items, zone, positions, placed, cardMetrics, markerSafeAreas) {
  const minDistance = window.innerWidth <= 760
    ? PROJECT_GRID_MIN_CARD_DISTANCE * 0.78
    : PROJECT_GRID_MIN_CARD_DISTANCE;
  const sampleFootprint = getProjectGridCardFootprint({ rotate: 0, scale: 1 }, cardMetrics);
  const columns = Math.max(1, Math.ceil(Math.sqrt(items.length * zone.width / zone.height)));
  const rows = Math.max(1, Math.ceil(items.length / columns));
  const gapX = Math.max(minDistance, sampleFootprint.width + 180);
  const gapY = Math.max(minDistance * 0.82, sampleFootprint.height + 160);
  const startX = zone.x - (columns - 1) * gapX / 2;
  const startY = zone.y - (rows - 1) * gapY / 2;

  items.forEach((item, localIndex) => {
    const row = Math.floor(localIndex / columns);
    const column = localIndex % columns;
    const alternateOffset = rows > 1 ? (row % 2 === 0 ? -gapX * 0.08 : gapX * 0.12) : 0;
    const rotateDirection = item.index % 2 === 0 ? -1 : 1;
    const candidate = {
      x: Math.round(startX + column * gapX + alternateOffset),
      y: Math.round(startY + row * gapY),
      rotate: rotateDirection * (1.4 + item.index % 4 * 0.62),
      scale: 0.96 + item.index % 5 * 0.018
    };
    const position = resolveProjectGridSpacing(candidate, placed, markerSafeAreas, cardMetrics, minDistance);
    positions[item.index] = position;
    placed.push(position);
  });
}

function resolveProjectGridSpacing(candidate, placed, markerSafeAreas, cardMetrics, minDistance) {
  const position = { ...candidate };
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const overlap = getProjectGridMaxOverlap(position, placed, cardMetrics);
    const labelOverlap = getProjectGridMaxProtectedOverlap(position, markerSafeAreas, cardMetrics);
    const spacing = placed.length
      ? Math.min(...placed.map((item) => distance2d(position, item)))
      : minDistance * 2;
    if (overlap <= PROJECT_GRID_MAX_CARD_OVERLAP && labelOverlap <= 0 && spacing >= minDistance * 0.82) break;
    const direction = attempt % 2 === 0 ? 1 : -1;
    position.x += direction * minDistance * (0.18 + attempt * 0.025);
    position.y += minDistance * 0.2;
  }
  position.x = Math.round(position.x);
  position.y = Math.round(position.y);
  return position;
}

function createProjectGridCandidate(zone, cardMetrics) {
  const rotate = randomBetween(-4.2, 4.2);
  const scale = randomBetween(0.92, 1.05);
  const footprint = getProjectGridCardFootprint({ rotate, scale }, cardMetrics);
  const halfWidth = zone.width / 2;
  const halfHeight = zone.height / 2;
  const minX = zone.x - halfWidth + footprint.width / 2;
  const maxX = zone.x + halfWidth - footprint.width / 2;
  const minY = zone.y - halfHeight + footprint.height / 2;
  const maxY = zone.y + halfHeight - footprint.height / 2;

  return {
    x: Math.round(randomBetween(Math.min(minX, maxX), Math.max(minX, maxX))),
    y: Math.round(randomBetween(Math.min(minY, maxY), Math.max(minY, maxY))),
    rotate,
    scale
  };
}

function getProjectGridThemeMarkerSafeAreas() {
  return PROJECT_GRID_THEME_MARKERS.map((marker) => {
    const footprint = getProjectGridThemeMarkerFootprint(marker);
    const width = footprint.width + PROJECT_GRID_LABEL_SAFE_PADDING * 2;
    const height = footprint.height + PROJECT_GRID_LABEL_SAFE_PADDING * 2;
    return {
      left: marker.x - width / 2,
      right: marker.x + width / 2,
      top: marker.y - height / 2,
      bottom: marker.y + height / 2,
      area: width * height
    };
  });
}

function getProjectGridThemeMarkerFootprint(marker) {
  const rem = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const fontSize = clamp(window.innerWidth * 0.08, 3.2 * rem, 8.5 * rem);
  const label = String(marker.label || "").toUpperCase();
  const fallbackWidthRatio = ({ tools: 3.55, design: 4.62, ai: 1.34 })[marker.id] || Math.max(label.length * 0.74, 1.4);
  let width = fontSize * fallbackWidthRatio;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext?.("2d");
  if (context) {
    const headingFont = getComputedStyle(document.documentElement).getPropertyValue("--font-heading").trim() || "sans-serif";
    context.font = `900 ${fontSize}px ${headingFont}`;
    const measured = context.measureText(label).width;
    if (Number.isFinite(measured) && measured > 0) width = Math.max(width, measured);
  }

  return {
    width,
    height: fontSize * 0.92
  };
}

function getProjectGridCardMetrics() {
  const card = projectGridTrack?.querySelector(".project-grid-card");
  if (card) {
    const styles = getComputedStyle(card);
    const width = Number.parseFloat(styles.width);
    const height = Number.parseFloat(styles.height);
    if (Number.isFinite(width) && Number.isFinite(height)) return { width, height };
  }

  const rem = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  if (window.innerWidth <= 760) return { width: 9.7 * rem, height: 9.7 * rem };

  const size = clamp(window.innerWidth * 0.16, 10.8 * rem, 13.2 * rem);
  return { width: size, height: size };
}

function getProjectGridCardFootprint(position, cardMetrics) {
  const width = cardMetrics.width * (position.scale || 1);
  const height = cardMetrics.height * (position.scale || 1);
  const radians = Math.abs((position.rotate || 0) * Math.PI / 180);
  const cos = Math.abs(Math.cos(radians));
  const sin = Math.abs(Math.sin(radians));
  return {
    width: cos * width + sin * height,
    height: sin * width + cos * height
  };
}

function getProjectGridCardBounds(position, cardMetrics) {
  const footprint = getProjectGridCardFootprint(position, cardMetrics);
  return {
    left: position.x - footprint.width / 2,
    right: position.x + footprint.width / 2,
    top: position.y - footprint.height / 2,
    bottom: position.y + footprint.height / 2,
    area: footprint.width * footprint.height
  };
}

function getProjectGridMaxOverlap(candidate, placed, cardMetrics) {
  if (!placed.length) return 0;
  const candidateBounds = getProjectGridCardBounds(candidate, cardMetrics);

  return Math.max(...placed.map((position) => {
    const bounds = getProjectGridCardBounds(position, cardMetrics);
    const width = Math.max(0, Math.min(candidateBounds.right, bounds.right) - Math.max(candidateBounds.left, bounds.left));
    const height = Math.max(0, Math.min(candidateBounds.bottom, bounds.bottom) - Math.max(candidateBounds.top, bounds.top));
    const overlapArea = width * height;
    return overlapArea / Math.min(candidateBounds.area, bounds.area);
  }));
}

function getProjectGridMaxProtectedOverlap(candidate, protectedAreas, cardMetrics) {
  if (!protectedAreas.length) return 0;
  const candidateBounds = getProjectGridCardBounds(candidate, cardMetrics);

  return Math.max(...protectedAreas.map((area) => {
    const width = Math.max(0, Math.min(candidateBounds.right, area.right) - Math.max(candidateBounds.left, area.left));
    const height = Math.max(0, Math.min(candidateBounds.bottom, area.bottom) - Math.max(candidateBounds.top, area.top));
    return width * height / candidateBounds.area;
  }));
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function distance2d(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function resetProjectGridMap(initialThemeId = "") {
  projectGridTarget.x = 0;
  projectGridTarget.y = 0;
  projectGridCurrent.x = 0;
  projectGridCurrent.y = 0;
  projectGridPan.x = 0;
  projectGridPan.y = 0;
  projectGridZoom.current = 1;
  projectGridZoom.target = 1;

  projectGridInstances.forEach((instance) => {
    const position = projectGridBasePositions[instance.index] || { x: 0, y: 0, rotate: 0, scale: 1 };
    instance.x = position.x;
    instance.y = position.y;
    instance.rotate = position.rotate;
    instance.scale = position.scale;
  });

  projectGridThemeInstances.forEach((instance) => {
    const marker = PROJECT_GRID_THEME_MARKERS.find((item) => item.id === instance.id);
    if (!marker) return;
    instance.x = marker.x;
    instance.y = marker.y;
  });

  if (initialThemeId) setProjectGridInstantFocus(initialThemeId);
  applyProjectGridItemPositions();
  applyProjectGridTransform();
  updateProjectGridZoomControls();
  updateProjectGridCompass();
}

function startProjectGridAnimation() {
  if (projectGridFrame || !isProjectGridOpen()) return;
  projectGridFrame = requestAnimationFrame(animateProjectGrid);
}

function stopProjectGridAnimation() {
  if (!projectGridFrame) return;
  cancelAnimationFrame(projectGridFrame);
  projectGridFrame = 0;
}

function animateProjectGrid() {
  projectGridFrame = 0;
  if (!isProjectGridOpen()) return;

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const ease = reducedMotion ? 1 : 0.14;
  const dx = projectGridTarget.x - projectGridCurrent.x;
  const dy = projectGridTarget.y - projectGridCurrent.y;
  const dz = projectGridZoom.target - projectGridZoom.current;

  projectGridCurrent.x += dx * ease;
  projectGridCurrent.y += dy * ease;
  projectGridZoom.current += dz * ease;

  if (Math.abs(dx) < 0.05) projectGridCurrent.x = projectGridTarget.x;
  if (Math.abs(dy) < 0.05) projectGridCurrent.y = projectGridTarget.y;
  if (Math.abs(dz) < 0.001) projectGridZoom.current = projectGridZoom.target;

  applyProjectGridTransform();

  if (
    projectGridDrag.active
    || Math.abs(projectGridTarget.x - projectGridCurrent.x) > 0.05
    || Math.abs(projectGridTarget.y - projectGridCurrent.y) > 0.05
    || Math.abs(projectGridZoom.target - projectGridZoom.current) > 0.001
  ) {
    projectGridFrame = requestAnimationFrame(animateProjectGrid);
  }
}

function applyProjectGridItemPositions() {
  [...projectGridThemeInstances, ...projectGridInstances].forEach((instance) => {
    instance.element?.style.setProperty("--project-x", `${instance.x.toFixed(1)}px`);
    instance.element?.style.setProperty("--project-y", `${instance.y.toFixed(1)}px`);
    if (Number.isFinite(instance.rotate)) {
      instance.element?.style.setProperty("--project-rotate", `${instance.rotate.toFixed(2)}deg`);
    }
    if (Number.isFinite(instance.scale)) {
      instance.element?.style.setProperty("--project-scale", instance.scale.toFixed(3));
    }
  });
}

function applyProjectGridTransform() {
  const zoom = Math.max(0.001, projectGridZoom.current);
  const gridCellSize = PROJECT_GRID_BASE_CELL_SIZE * zoom;
  const bgX = projectGridCurrent.x % gridCellSize;
  const bgY = projectGridCurrent.y % gridCellSize;
  projectGridTrack?.style.setProperty("--grid-pan-x", `${projectGridCurrent.x.toFixed(1)}px`);
  projectGridTrack?.style.setProperty("--grid-pan-y", `${projectGridCurrent.y.toFixed(1)}px`);
  projectGridTrack?.style.setProperty("--grid-zoom", zoom.toFixed(4));
  projectGridStage?.style.setProperty("--grid-bg-x", `${bgX.toFixed(1)}px`);
  projectGridStage?.style.setProperty("--grid-bg-y", `${bgY.toFixed(1)}px`);
  projectGridStage?.style.setProperty("--grid-bg-size", `${gridCellSize.toFixed(1)}px`);
  updateProjectGridCompass();
}

function updateProjectGridCompass() {
  if (!projectGridCompassButtons.length) return;
  const zoom = Math.max(0.001, projectGridZoom.current);

  projectGridCompassButtons.forEach((button) => {
    const id = button.dataset.projectGridFocus;
    const marker = projectGridThemeInstances.find((instance) => instance.id === id)
      || PROJECT_GRID_THEME_MARKERS.find((item) => item.id === id);
    if (!marker) return;

    const screenX = marker.x * zoom + projectGridCurrent.x;
    const screenY = marker.y * zoom + projectGridCurrent.y;
    const angle = Math.atan2(screenY, screenX) * 180 / Math.PI + 90;
    const distance = Math.hypot(screenX, screenY);
    button.style.setProperty("--compass-angle", `${angle.toFixed(1)}deg`);
    button.style.setProperty("--compass-distance", Math.min(distance / 900, 1).toFixed(3));
    button.classList.toggle("is-near", distance < 190);
  });
}

function getProjectCategoryLabel(category) {
  return ({
    ai: "IA",
    design: "Design",
    supply: "Terrain",
    tools: "Outils"
  })[category] || category;
}

async function openProjectDetail(project, returnFocus = null) {
  if (!projectDetailPanel) return;
  const requestId = projectDetailRequestId + 1;
  projectDetailRequestId = requestId;
  projectDetailReturnFocus = returnFocus instanceof HTMLElement ? returnFocus : document.activeElement;
  const renderer = await preloadProjectDetailRenderer();
  if (!renderer || requestId !== projectDetailRequestId || !isProjectGridOpen()) return;
  projectDetailPanel.innerHTML = renderer.renderProjectDetail(project, { getImageSrc: getProjectImageSrc });
  projectDetailPanel.hidden = false;
  projectGridOverlay?.classList.add("has-project-detail");
  setSiblingContentInert(projectDetailPanel.parentElement, projectDetailPanel, true);
  const detailCard = projectDetailPanel.querySelector(".project-detail-card");
  if (detailCard) detailCard.scrollTop = 0;
  projectDetailPanel.querySelector("[data-project-detail-close]")?.focus({ preventScroll: true });
}

function closeProjectDetail(options = {}) {
  if (!projectDetailPanel) return;
  projectDetailRequestId += 1;
  const wasOpen = !projectDetailPanel.hidden;
  setSiblingContentInert(projectDetailPanel.parentElement, projectDetailPanel, false);
  projectDetailPanel.hidden = true;
  projectDetailPanel.innerHTML = "";
  projectGridOverlay?.classList.remove("has-project-detail");
  if (wasOpen && options.restoreFocus !== false) {
    const fallback = isMobileProjectGridMode() ? projectMobilePage : projectGridStage;
    const focusTarget = projectDetailReturnFocus?.isConnected ? projectDetailReturnFocus : fallback;
    focusTarget?.focus({ preventScroll: true });
  }
  projectDetailReturnFocus = null;
}

function preloadProjectDetailRenderer() {
  if (projectDetailRendererReady) return projectDetailRendererReady;
  projectDetailRendererReady = import(PROJECT_DETAIL_MODULE)
    .catch((error) => {
      window.__projectDetailLoadError = String(error?.message || error);
      projectDetailRendererReady = null;
      return null;
    });
  return projectDetailRendererReady;
}

function createNoopContactScene() {
  return {
    setScrollProgress() {},
    setPhase() {},
    setHover() {},
    setActive() {},
    explodeToForm(callback) {
      callback?.();
    },
    showReceivedMessage() {}
  };
}

function ensureContactScene(reason = "") {
  if (contactSceneLoaded) return Promise.resolve(contactScene);
  if (contactSceneReady) return contactSceneReady;

  document.body.classList.add("is-contact-scene-loading");
  contactSceneReady = import(CONTACT_SCENE_MODULE)
    .then((module) => {
      contactScene = module.initContactScene({
        canvas: contactCanvas,
        trigger: contactTrigger,
        panel: contactPanel,
        received: contactReceived
      });
      contactSceneLoaded = true;
      contactScene.setScrollProgress(getEffectiveStoryProgress());
      contactScene.setPhase(contactPhase < 0 ? 0 : contactPhase);
      contactScene.setActive(
        reason === "contact-request"
        || getEffectiveStoryProgress() >= CONTACT_MEDIA_PRELOAD_FROM
        || !contactPanel?.hidden
      );
      document.body.classList.remove("is-contact-scene-loading");
      document.body.classList.add("is-contact-scene-ready");
      window.__contactSceneLoadReason = reason;
      return contactScene;
    })
    .catch((error) => {
      window.__contactSceneLoadError = String(error?.message || error);
      document.body.classList.remove("is-contact-scene-loading");
      return contactScene;
    });

  return contactSceneReady;
}

function initMobileDebug() {
  if (!DEBUG_MOBILE) return;
  mobileDebugPanel = document.createElement("output");
  mobileDebugPanel.className = "mobile-debug-panel";
  mobileDebugPanel.setAttribute("aria-live", "polite");
  document.body.appendChild(mobileDebugPanel);
  updateMobileDebug();
}

function updateMobileDebug(state = {}) {
  if (!mobileDebugPanel) return;
  const activeCopy = [...document.querySelectorAll(".story-copy")]
    .map((copy) => ({
      id: copy.closest(".story-section")?.dataset.id || "",
      opacity: Number(getComputedStyle(copy).opacity || 0)
    }))
    .sort((a, b) => b.opacity - a.opacity)[0];
  const viewport = window.visualViewport;
  const progress = Number.isFinite(state.progress) ? state.progress : getEffectiveStoryProgress();
  const rawProgress = Number.isFinite(state.rawProgress) ? state.rawProgress : getScrollProgress();
  mobileDebugPanel.value = [
    `w:${window.innerWidth} h:${window.innerHeight}`,
    `vv:${viewport ? Math.round(viewport.height) : "-"}`,
    `y:${Math.round(window.scrollY)}`,
    `p:${progress.toFixed(4)} raw:${rawProgress.toFixed(4)}`,
    `lock:${storyStateLock?.sectionId || "-"}`,
    `active:${activeCopy?.id || "-"} ${activeCopy ? activeCopy.opacity.toFixed(2) : "-"}`,
    `tile:${activeTileId || "-"}`,
    `demo:${guidedScrollDemo.active ? guidedScrollDemo.stage || guidedScrollDemo.progress.toFixed(2) : "-"}`,
    `webgl:${contactSceneLoaded ? "on" : "lazy"}`
  ].join(" | ");
}

function isMobileViewport() {
  return window.innerWidth <= 760;
}

function getScrollProgress() {
  return clamp(window.scrollY / getStoryTimelineMax(), 0, 1);
}

function getMaxScroll() {
  return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
}

function getStoryTimelineMax() {
  if (!story) return getMaxScroll();
  return Math.max(1, story.offsetTop + story.offsetHeight - window.innerHeight);
}

function clipAnchor(clipIndex) {
  return clipIndex * KLING_CLIP_PROGRESS * VIDEO_FINAL_HOLD_FROM;
}

function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  })[char]);
}

function getProjectImageSrc(project) {
  const image = String(project?.image || "");
  if (!/public\/orchestrator\/thumbnails(?:-ai)?\//.test(image)) return image;
  if (image.includes(PROJECT_THUMBNAIL_VERSION)) return image;
  const separator = image.includes("?") ? "&" : "?";
  return `${image}${separator}v=${PROJECT_THUMBNAIL_VERSION}`;
}

window.__videoProbe = () => ({
  currentTime: Number(video.currentTime.toFixed(3)),
  duration: Number.isFinite(video.duration) ? Number(video.duration.toFixed(3)) : null,
  currentSrc: video.currentSrc,
  activeQuality: activeStoryVideoQuality || "900",
  measuredMbps: Number(storyVideoAnalysis?.measuredMbps?.toFixed?.(2) || 0),
  qualityReason: storyVideoAnalysis?.reason || "",
  videoWidth: video.videoWidth,
  videoHeight: video.videoHeight,
  readyState: video.readyState,
  bufferedSeconds: Number(getStoryVideoBufferedSeconds().toFixed(3)),
  scrollY: Math.round(window.scrollY),
  maxScroll: Math.round(getMaxScroll()),
  storyTimelineMax: Math.round(getStoryTimelineMax()),
  progress: Number(getScrollProgress().toFixed(4)),
  effectiveProgress: Number(getEffectiveStoryProgress().toFixed(4)),
  storyLock: storyStateLock ? {
    sectionId: storyStateLock.sectionId,
    progress: Number(storyStateLock.progress.toFixed(4)),
    viewportHeight: Math.round(storyStateLock.viewportHeight)
  } : null,
  afterStory: document.body.classList.contains("is-after-story"),
  cameraX: getComputedStyle(document.documentElement).getPropertyValue("--camera-x").trim(),
  cameraY: getComputedStyle(document.documentElement).getPropertyValue("--camera-y").trim(),
  cameraScale: getComputedStyle(document.documentElement).getPropertyValue("--camera-scale").trim(),
  energyOpacity: energy.layer ? getComputedStyle(energy.layer).getPropertyValue("--energy-opacity").trim() : null,
  storyVideoOpacity: getComputedStyle(document.documentElement).getPropertyValue("--story-video-opacity").trim(),
  contactMediaOpacity: getComputedStyle(document.documentElement).getPropertyValue("--contact-media-opacity").trim(),
  contactTransitionOpacity: getComputedStyle(document.documentElement).getPropertyValue("--contact-transition-opacity").trim(),
  contactImageOpacity: getComputedStyle(document.documentElement).getPropertyValue("--contact-image-opacity").trim(),
  contactImageTrigger: contactImageTrigger ? {
    disabled: contactImageTrigger.disabled,
    active: contactImageTrigger.classList.contains("is-active"),
    left: contactImageTrigger.style.left,
    top: contactImageTrigger.style.top,
    width: contactImageTrigger.style.width,
    opacity: contactImageTrigger.style.opacity,
    expanded: contactImageTrigger.getAttribute("aria-expanded")
  } : null,
  guidedDemo: {
    active: guidedScrollDemo.active,
    opened: guidedScrollDemo.opened,
    stage: guidedScrollDemo.stage,
    progress: Number(guidedScrollDemo.progress.toFixed(4)),
    rawStart: Number(GUIDED_SCROLL_DEMO_RAW_START.toFixed(4)),
    rawEnd: Number(GUIDED_SCROLL_DEMO_RAW_END.toFixed(4))
  },
  contactPhase: contactDock?.dataset.phase || null,
  deferredMedia: {
    projectImageLoaded: projectFinalImage?.dataset.loaded === "true",
    contactImageLoaded: contactFinalImage?.dataset.loaded === "true",
    contactVideoLoaded: contactTransitionVideo?.dataset.loaded === "true"
  },
  source: video.currentSrc
});
