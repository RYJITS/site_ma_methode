# Memoire projet - 01_SITE_MA_METHODE

Extrait du journal central D:\00_Cerveau_IA\Memoire\Memoire projet\PROJET_JOURNAL.md.
Contient uniquement les entrees liees a AI_VIDEO_WEBGL_COMPETENCES_CLEAN et 01_SITE_MA_METHODE.

Nombre d'entrees: 95
## 2026-06-07T10:27:15.412Z - Recalage textes sur video Kling
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification de src/main.js avec constantes de progression 12 clips, ajustement des anchors et targets, cache script mis a jour dans index.html.
- Detail: Recalage des ancres texte sur la video Kling 12 clips: Clarifier sur l'oeil, Design sur etoiles/rouage, Ameliorer sur le cube final, Solidifier sur le dome, Donnees utiles sur les KPI.
- Ajout: Synchronisation texte/video adaptee au montage Kling 60,54s.
- Suppression: Aucune suppression.
- Apprentissage: Avec la video Kling 12 clips, les textes doivent utiliser des ancres basees sur 1/12 plutot que les anciennes ancres du montage 14 clips.


## 2026-06-07T10:37:07.331Z - Timeline parcours active avec role au-dessus de l'annee
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Ajustement UI de la timeline parcours et verification desktop/mobile sur le site local.
- Detail: La timeline basse affiche maintenant le texte du parcours directement au-dessus de l'annee active. L'annee active recoit une micro-animation de zoom synchronisee au changement de palier de scroll.
- Ajout: Role integre dans chaque etape active, zoom CSS sur l'annee active, cache busting des assets HTML.
- Suppression: Affichage separe des details employeur deja retire; conservation d'une timeline sobre.
- Apprentissage: L'utilisateur veut une timeline minimaliste mais toujours lisible, avec le texte colle au repere temporel actif plutot qu'un bloc d'information separe.


## 2026-06-07T10:50:47.951Z - Dock contact discret anime au scroll
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Integration HTML, synchronisation JS au scroll et styles CSS responsive avec reduced motion.
- Detail: Ajout d'un dock contact fixe en haut a gauche avec deux boutons: Me contacter par email et CV. Le dock change de micro-animation et de couleur selon six phases de scroll, tout en restant discret et accessible.
- Ajout: Boutons contact top-left, mailto info@c2rdesign.com, lien cv.c2rdesign.com, animations de phase scan/orbite/split/flux/verrouillage/ready.
- Suppression: Aucune suppression; ajout compact au-dessus de l'experience existante.
- Apprentissage: L'utilisateur prefere un contact accessible en haut a gauche, discret, avec une animation differente selon le scroll plutot qu'un CTA final uniquement.


## 2026-06-07T11:11:52.912Z - Contact formulaire Hostinger timeline et repo conception
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification HTML/CSS/JS, ajout endpoint api/contact.php pour Hostinger, captures Playwright, creation d'un repo local de conception en francais.
- Detail: Recalage du texte Ameliorer en continu a la fin du scroll sur le cube final. Timeline modifiee avec texte au-dessus de la ligne et zoom-in/zoom-out sur l'annee active. Dock contact remplace par une grande icone seule, sans deplacement, avec icone qui change selon le scroll et ouverture d'une tuile formulaire.
- Ajout: Formulaire contact connecte a api/contact.php pour email info@c2rdesign.com, fallback mailto local, repo local AI_VIDEO_WEBGL_COMPETENCES_CONCEPTION_PUBLIC avec README, docs et captures.
- Suppression: Suppression du bouton CV dans le dock contact et suppression du mouvement du bouton contact.
- Apprentissage: L'utilisateur veut un contact iconique discret mais grand, une timeline minimaliste lisible, et une documentation publique de conception avec captures en francais. Publication GitHub publique bloquee car gh n'est pas authentifie et le connecteur ne cree pas de repo.


## 2026-06-07T12:14:53.551Z - Scene contact WebGL interactive
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Integration WebGL dans index.html, src/main.js, src/styles.css et ajout de src/contact-scene.js
- Detail: Remplacement du bouton contact par une scene WebGL complete: cube 3D flottant avec icone contact, rotation pilotee par le scroll, energie rouge au survol, explosion en particules au clic, regroupement vers le formulaire, puis transformation en oiseau de donnees apres envoi avec le message Message recu. A bientot.
- Ajout: Canvas contact-webgl plein ecran, hitbox accessible, orchestration particules-formulaire, animation oiseau de donnees et texte final.
- Suppression: Ancien bouton contact iconographique statique et anciennes classes d'animation contact devenues inutiles.
- Apprentissage: L'utilisateur veut un contact discret mais narratif: l'interaction doit etre visuelle, synchronisee au scroll, puis se transformer en confirmation poetique apres l'envoi.


## 2026-06-07T12:40:32.963Z - Contact WebGL cube texture et flux serpent
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification de src/contact-scene.js, src/styles.css, src/main.js et index.html
- Detail: Ajustement de la scene contact WebGL selon la reference cube 3D: cube plus petit, faces mecaniques detaillees en metal et circuits orange/bleu, suppression du rouge et de l'anneau autour du cube, particules orange et bleues en trajectoire serpent traversant l'ecran avant de reconstruire progressivement un grand formulaire centre.
- Ajout: Texture procedurale du cube, flux serpent de 420 particules, formulaire central grand format avec animation de materialisation, cache-buster contact-webgl-02.
- Suppression: Effet rouge au survol, anneau WebGL autour du cube et petite tuile contact en haut a gauche.
- Apprentissage: Pour cette scene contact, l'utilisateur veut un cube technique discret, sans rouge ni cercle, et une reconstruction visuelle du formulaire par particules orange/bleu.


## 2026-06-07T13:20:14.148Z - Texture image sur les six faces du cube contact
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Ajout d'un shader texture WebGL, d'une geometrie cube 6 faces texturables, d'un chargement d'image texture et d'un cache-buster contact-webgl-03.
- Detail: Le cube WebGL de contact utilise maintenant l'image ChatGPT Image 7 juin 2026, 14_54_49.png comme texture reelle appliquee sur les six faces. L'image a ete copiee dans public/generated/images/contact/contact-cube-face.png et chargee comme texture GPU via le canvas contact-webgl.
- Ajout: Asset public contact-cube-face.png, attribut data-texture-src sur le canvas, programme texture WebGL, verification textureReady dans la sonde QA.
- Suppression: Le cube n'est plus seulement une texture procedurale lignes/points; les lignes restent seulement en contour discret.
- Apprentissage: Pour le bouton contact, l'utilisateur veut utiliser l'image de face contact fournie comme texture exacte sur chaque face du cube.


## 2026-06-07T13:31:46.102Z - Correction scintillement texture cube contact
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification de src/contact-scene.js
- Detail: Le scintillement du cube contact venait de la texture tres detaillee affichee en tres petit pendant une rotation continue. La texture est maintenant pre-lissee en 512px power-of-two, mipmappee avec LINEAR_MIPMAP_LINEAR, filtrage anisotropique si disponible, et la rotation automatique est fortement ralentie pour laisser le scroll piloter le mouvement.
- Ajout: createSmoothedTextureSource, mipmaps, textureFilter dans la sonde QA, applyAnisotropicFiltering, helper getCubeRotation.
- Suppression: Micro-rotation trop rapide et texture brute sans mipmap sur le petit cube.
- Apprentissage: Pour les textures tres fines sur petits elements WebGL, utiliser une version mipmappee/lissee et limiter les rotations idle pour eviter le scintillement.


## 2026-06-07T13:49:57.140Z - Flux contact porte a 2000 particules
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification de src/contact-scene.js, ajout d'un cache-buster dans src/main.js et index.html
- Detail: Le flux de particules de la scene contact WebGL utilise maintenant 2000 particules pour la reconstruction du formulaire. Les couleurs des particules sont alignees sur la palette existante du site: bleu #39bdf8, orange #ff8a18, ambre #ffc15a et clair #f8fafc.
- Ajout: Constante CONTACT_FORM_PARTICLE_COUNT=2000, palette SITE_PARTICLE_COLORS, echantillonnage dense des cibles du formulaire et couleur de particules finale alignee.
- Suppression: Ancien flux de particules limite a la densite de la silhouette initiale et palette approximative.
- Apprentissage: L'utilisateur veut un flux contact plus dense, avec exactement 2000 particules, et une palette strictement coherente avec le site.


## 2026-06-07T13:59:50.915Z - Rotation idle du cube contact reactivee
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification de src/contact-scene.js, src/main.js et index.html
- Detail: La rotation automatique du cube contact lorsque l'utilisateur ne scrolle pas a ete reactivee. La vitesse est maintenant lisible mais moderee avec CONTACT_IDLE_ROTATION_SPEED=0.00026, tout en conservant le filtrage mipmap pour limiter le scintillement.
- Ajout: Constante CONTACT_IDLE_ROTATION_SPEED, idleRotationSpeed dans la sonde QA, cache-buster contact-idle-rotation-01/contact-webgl-05.
- Suppression: Rotation idle quasi invisible a 0.00008.
- Apprentissage: L'utilisateur veut que le cube contact reste vivant meme sans scroll, mais sans revenir au scintillement precedent.


## 2026-06-07T17:27:42.339Z - Contact WebGL lignes energetiques au lieu des particules
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification de src/contact-scene.js, src/main.js et index.html
- Detail: Le flux d'ouverture du formulaire contact ne repose plus sur des particules. Il utilise maintenant environ 10 lignes energetiques WebGL qui tournoient entre elles, inspirees des lignes SVG deja utilisees pour lier le texte aux animations. La palette reste celle du site: bleu, orange, ambre et clair.
- Ajout: CONTACT_ENERGY_LINE_COUNT=10, createContactEnergyLines, drawContactEnergyLines, trajectoire Bezier type energy-path avec torsion, sonde energyLines.
- Suppression: Flux de 2000 particules pour la transition vers le formulaire.
- Apprentissage: Pour le contact, l'utilisateur prefere maintenant des lignes energetiques elegantes et coherentes avec les liens texte-animation, plutot qu'un nuage de particules.


## 2026-06-07T17:46:40.580Z - Animation contact zoom-in
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Ajout du zoom-in de la tuile contact et ajustement des trajectoires de lignes.
- Detail: Le bouton contact WebGL utilise maintenant 10 lignes energie orange et bleu qui se dispersent dans la page puis reviennent vers le centre avant ouverture du formulaire.
- Ajout: Trajectoires multi-phases cube -> dispersion pleine page -> retour formulaire; ouverture retardee; zoom-in plus lisible; lignes adoucies.
- Suppression: Ancien effet de particules remplace par des lignes energie.
- Apprentissage: Pour cette interface, l'utilisateur prefere une narration WebGL elegante: lignes orange/bleu, mouvement pleine page, puis reconstruction progressive de la tuile.


## 2026-06-07T17:47:23.810Z - Audit typographie 2026 2027
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Conserver direction typographique principale, corriger le debordement mobile story-copy, renforcer la lisibilite de la timeline et envisager une evolution variable/adaptive.
- Detail: Audit typographique du site WebGL: usage actuel Archivo Space Grotesk Fira Code, comparaison tendances 2026 et projection 2027, verification desktop et mobile via Playwright.
- Ajout: Captures Playwright typography-* dans output/playwright; constats: hero fort, systeme coherent, mobile hero coupe a droite quand width 100 avec left/right, timeline trop petite.
- Suppression: Aucune suppression.
- Apprentissage: La typographie actuelle est proche des codes 2026 kinetic/fluid/oversized, mais doit gagner en adaptabilite mobile et en systeme variable pour rester future-ready 2027.


## 2026-06-07T20:31:21.841Z - Contact WebGL trajectoire groupee
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Refonte de la trajectoire des lignes energie dans src/contact-scene.js et mise a jour cache main/index.
- Detail: Correction de l'animation contact: les lignes ne tournent plus sur le cube; elles s'echappent du cube, restent groupees en mouvement serpentain jusqu'a 50% du trajet, puis se separent pour entourer et constituer la tuile contact.
- Ajout: Trajet groupe cube -> point mi-chemin, separation vers points de contour/interieur de la tuile, ouverture retardee du formulaire.
- Suppression: Suppression de la spirale/orbite autour du cube contact.
- Apprentissage: Pour cette interaction, l'effet doit partir du cube sans l'habiller: le cube reste propre, l'animation se deroule apres la sortie.


## 2026-06-07T20:45:33.832Z - Ouverture fluide tuile contact
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Ajustement CSS contact-panel/contact-form-build et timing openContactPanel.
- Detail: L'ouverture de la tuile contact a ete lissee: transition plus longue, easing plus doux, reveal du formulaire plus progressif et focus du champ retarde.
- Ajout: Transition 1180ms, animation formulaire 2050ms, stagger champs adouci, focus a 1650ms, retrait materializing a 2250ms.
- Suppression: Reduction de l'effet pop et de l'overshoot trop marque.
- Apprentissage: Pour la tuile contact, preferer une ouverture fluide et progressive synchronisee avec la reconstruction par lignes.


## 2026-06-07T20:57:31.723Z - Suppression construction CSS tuile contact
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Retrait des animations clip-path/filter du formulaire et synchronisation du depart is-open/is-materializing.
- Detail: La saccade d'ouverture de la tuile contact venait probablement de la construction CSS par clip-path et filtre. La construction visuelle reste portee par les lignes WebGL, puis la tuile DOM apparait en opacity/scale uniquement.
- Ajout: Ouverture GPU-friendly avec opacity + transform; depart de transition force par offsetWidth; timing de focus et materializing reduit.
- Suppression: Animation clip-path du contact-form-build et filtre brightness/saturate pendant l'ouverture.
- Apprentissage: Quand une construction WebGL existe deja, eviter de reconstruire la meme tuile en CSS: garder le DOM fluide et simple pour eviter les saccades.


## 2026-06-07T21:14:29.889Z - Lignes contact uniquement courbes
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification de src/contact-scene.js: cible et surround passent par getContactCurvedTilePoint; augmentation de la resolution de segments.
- Detail: Les trajectoires des lignes contact ont ete ajustees pour eviter les angles: suppression des points rectangulaires/corners et remplacement par une couronne courbe autour de la tuile.
- Ajout: Points de destination distribues sur arcs/ellipse autour de la tuile; lignes plus courbes et plus douces.
- Suppression: Ancienne logique de points de tuile rectangulaires avec coins visuels.
- Apprentissage: Pour l'animation contact, toutes les lignes doivent rester courbes, sans angle ni cassure visible.


## 2026-06-07T21:28:25.554Z - Rendu Bezier des lignes contact
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Ajout du SVG contact-energy-curves, creation de chemins dynamiques via makeSmoothBezierPath, remplacement visuel des segments WebGL par des courbes Bezier.
- Detail: Les lignes contact ne sont plus rendues en GL_LINES. Un calque SVG contact-energy-curves dessine les trajectoires en chemins Bezier avec commandes C, stroke-linecap round et stroke-linejoin round.
- Ajout: Courbes SVG continues pour les lignes contact; verification navigateur: 10 chemins actifs, commande C presente, aucune commande L.
- Suppression: Rendu visible des lignes contact en petits segments droits WebGL.
- Apprentissage: Quand l'utilisateur demande uniquement des courbes, utiliser des chemins vectoriels Bezier plutot qu'une approximation en GL_LINES.


## 2026-06-07T22:29:27.332Z - Tuile holographique Methodologie
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Ajout du bouton Explorer, de la tuile holographique, du positionnement depuis updateEnergyLink, et des fonctions openTile closeTile reutilisables.
- Detail: Ajout du premier essai de tuile holographique interactive pour la section Ma maniere de fonctionner, declenchee par le point Explorer sur la ligne lumineuse centrale et non par la timeline.
- Ajout: ExplorerPoint accessible, HolographicTile style verre bleu noir, fermeture par reclic, bouton fermer, clic exterieur et Escape.
- Suppression: --learned
- Apprentissage: La tuile doit etre attachee au point lumineux de la ligne entre texte et visuel, pas a la timeline.


## 2026-06-07T23:06:32.535Z - Correction tuile holographique Methodologie v2
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Bouton Explorer transforme en hitbox invisible accessible; hover et clic pilotent le point SVG existant; tuile reconstruite en pur CSS avec cadre bleu, coins coupes, grille, orbites et blocs Plus clair Plus rapide Plus solide.
- Detail: Correction de la tuile Ma maniere de fonctionner apres retour utilisateur: suppression du point visuel ajoute, alignement de la hitbox Explorer sur le point SVG energy-impact-core existant, et refonte du panneau en grand style HUD holographique proche du PNG de reference.
- Ajout: Grand panneau HUD centre, ouverture depuis le point via variables CSS tile-open, test desktop sans scroll interne et test mobile dans le viewport.
- Suppression: Suppression du point visuel HTML redondant explorer-point-ring explorer-point-core dans le markup.
- Apprentissage: Quand un point lumineux existe deja dans la ligne centrale, il doit etre reutilise comme declencheur visuel; ne pas ajouter de second point. Le PNG alpha sert de direction visuelle pour un panneau HUD bleu futuriste.


## 2026-06-07T23:41:34.975Z - Cadre holographique bleu orange 50 alpha
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification CSS du HolographicTile: cadre reconstruit en gradients/pseudo-elements, coins reduits en chanfreins lumineux, bouton fermer rendu discret orange.
- Detail: Refonte du cadre de la tuile Ma maniere de fonctionner pour se rapprocher de la reference fournie: gauche en flux lumineux bleu, droite en flux lumineux orange, lignes fines centrales, suppression des coins blancs et fond sombre a alpha 50%.
- Ajout: Fond rgba(2,8,18,0.5), cadre asymetrique bleu/orange, capture de validation holographic-frame-blue-orange-v3.png.
- Suppression: Suppression visuelle des coins blancs/traits blancs dominants.
- Apprentissage: Pour ce panneau, la reference attend un cadre lumineux asymetrique: bleu cote gauche, orange cote droit, avec fond alpha 50%, pas un cadre blanc/bleu uniforme.


## 2026-06-07T23:45:34.586Z - Formulaire contact direct
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Suppression du fallback mailto dans src/main.js et durcissement du script api/contact.php.
- Detail: Le formulaire de contact envoie via api/contact.php vers info@c2rdesign.com sans fallback mailto ni ouverture du client mail.
- Ajout: Lecture JSON robuste et message d'erreur sur place; nettoyage des champs Reply-To et sujet dans le PHP.
- Suppression: Ouverture automatique du client mail via window.location.href mailto.
- Apprentissage: Pour ce projet, le contact doit rester dans la page et passer par l'endpoint PHP serveur vers info@c2rdesign.com.


## 2026-06-07T23:55:53.904Z - Publication cv.c2rdesign.com
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Creation du bundle output/cv_static_20260608_015121/cv_static_20260608_015121.zip puis deploiement Hostinger accepte.
- Detail: Publication du site WebGL CV sur https://cv.c2rdesign.com via Hostinger static website deploy avec archive selective incluant index.html, src, assets publies et api/contact.php.
- Ajout: Endpoint contact publie et verifie par POST reel; video MP4 publiee avec reponse range 206; rendu navigateur valide.
- Suppression: Aucune suppression projet; archive locale conservee.
- Apprentissage: Le sous-domaine cv.c2rdesign.com existe chez Hostinger sous /home/u471520258/domains/c2rdesign.com/public_html/CV et accepte le deploiement static website avec PHP api/contact.php execute.


## 2026-06-08T00:14:57.316Z - Suppression animation oiseau contact
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Remplacement de contactScene.launchDataBird par contactScene.showReceivedMessage, retrait des fonctions et etats bird/createBirdParticles/drawBird, puis republication sur cv.c2rdesign.com.
- Detail: Suppression de l'animation de particules en forme d'oiseau apres envoi du formulaire contact.
- Ajout: Confirmation simple Message recu conservee apres envoi du formulaire; cache-busting contact-confirm-01.
- Suppression: Animation oiseau et code associe dans src/contact-scene.js.
- Apprentissage: Le formulaire contact doit confirmer l'envoi sans animation oiseau, afin de rester plus sobre.


## 2026-06-08T00:27:28.612Z - Amelioration delivrabilite formulaire contact
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification de api/contact.php pour utiliser From C2R Design <info@c2rdesign.com>, Return-Path info@c2rdesign.com, MIME headers et envelope sender -f info@c2rdesign.com; republication Hostinger.
- Detail: Les emails du formulaire cv.c2rdesign.com arrivent mais etaient classes en spam avec le sujet Contact portfolio - Diagnostic reception.
- Ajout: Headers email alignes sur info@c2rdesign.com pour ameliorer la delivrabilite avec PHP mail.
- Suppression: Expediteur no-reply@c2rdesign.com.
- Apprentissage: Le formulaire fonctionne mais la delivrabilite mail() PHP peut classer les messages en spam; SMTP authentifie sera la solution definitive si le spam persiste.


## 2026-06-08T00:36:54.001Z - Generation alpha native bloquee par cle API
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Retrait des references aux assets chroma-key du site et suppression des dossiers generes holographic-frame et holographic-frame-native dans public/generated/images/ui.
- Detail: L'utilisateur a demande de generer les cadres en alpha directement, sans chroma-key. Tentative via CLI imagegen gpt-image-1.5 avec background transparent, mais OPENAI_API_KEY dans D:\00_Cerveau_IA\API\env.Local est refusee par l'API avec invalid_api_key.
- Ajout: Aucun asset alpha natif final tant que la cle API n'est pas valide.
- Suppression: Suppression de l'integration picture holographic-frame-asset et nettoyage des fichiers chroma-key generes.
- Apprentissage: Pour ce cadre, utiliser uniquement une generation alpha native; ne pas utiliser chroma-key vert car cela cree des franges et un rendu non fiable.


## 2026-06-08T00:51:57.157Z - Identification email formulaire par CV
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification de api/contact.php: sujet CV - Contact - <nom>, From CV C2R Design <info@c2rdesign.com>, corps du mail avec Source: CV; republication Hostinger.
- Detail: Les messages envoyes depuis cv.c2rdesign.com doivent etre identifies comme provenant du CV.
- Ajout: Sujet et expediteur affiche orientes CV tout en conservant info@c2rdesign.com pour la delivrabilite.
- Suppression: Sujet Contact portfolio pour ce formulaire CV.
- Apprentissage: Pour cv.c2rdesign.com, les emails de contact doivent etre facilement reconnaissables comme Source: CV.


## 2026-06-08T01:04:56.491Z - Correctif video mobile publication CV WebGL
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Correction et republication mobile
- Detail: Diagnostic: la production cv.c2rdesign.com servait correctement le MP4 1080p et les Range requests, mais le site etait fragile sur vrais mobiles car il utilisait une seule video 1080p 65 Mo pilotee en currentTime. Correctif: source mobile 720p 13.9 Mo, playsinline webkit-playsinline autoplay et amorcage JS, archive cv_static_20260608_030219.zip deployee via Hostinger MCP.
- Ajout: storyboard-kling-12-clips-720p-mobile.mp4; sources video mobile desktop; prepareVideoForScroll; archive cv_static_20260608_030219.zip
- Suppression: Aucune
- Apprentissage: Pour les sites scroll-video publies, fournir une source mobile legere et amorcer le media muted rend le rendu plus robuste que de dependre uniquement du preload auto d'un MP4 desktop.


## 2026-06-08T01:15:16.786Z - Mobile video au-dessus du texte et recadrage gauche
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Adaptation mobile et publication
- Detail: Modification mobile demandee: la video est maintenant placee comme zone visuelle haute au-dessus du texte, avec source mobile recadree pour supprimer davantage la zone noire gauche. Deploiement Hostinger accepte avec archive output/cv_static_20260608_031317/cv_static_20260608_031317.zip et verification production WebKit OK.
- Ajout: Source storyboard-kling-12-clips-720p-mobile-crop.mp4; CSS mobile video top; texte mobile sous video; correction largeur texte mobile; publication Hostinger cv_static_20260608_031317.zip
- Suppression: Aucune
- Apprentissage: Pour ce site, le mobile doit separer spatialement video et texte: video en haut, texte dessous, et source mobile recadree pour ne pas conserver la grande reserve noire gauche prevue pour desktop.


## 2026-06-08T01:23:03.457Z - Mobile sans timeline et texte stable
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Ajustement UX mobile et publication
- Detail: Adaptation mobile publiee sur cv.c2rdesign.com: timeline parcours masquee en mobile, video et texte descendus via variables mobile-video-top/mobile-copy-top, mouvement vertical du texte neutralise pour supprimer l'effet de double scroll. Archive Hostinger publiee: output/cv_static_20260608_032100/cv_static_20260608_032100.zip.
- Ajout: CSS mobile-no-timeline-01; masquage career-overlay en mobile; video/top et copy/top descendus; transform mobile du texte fixe sur translate3d(0,0,0)
- Suppression: Timeline parcours visible sur mobile; mouvement vertical secondaire du texte mobile
- Apprentissage: Sur mobile, le storytelling doit rester plus calme: pas de timeline fixe en bas et pas de mouvement vertical du texte en plus du scroll utilisateur.


## 2026-06-08T01:31:35.055Z - Marge mobile video reduite a 10%
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Ajustement marge mobile et publication
- Detail: Apres test a 15svh juge trop haut, la marge supplementaire au-dessus de la video mobile a ete reduite a 10svh. Cache-buster CSS mobile-video-margin-10-01 et publication Hostinger acceptee avec archive output/cv_static_20260608_032922/cv_static_20260608_032922.zip. Verification production WebKit mobile OK.
- Ajout: --mobile-video-extra-top: 10svh; cache-buster mobile-video-margin-10-01
- Suppression: Valeur 15svh jugee trop grande
- Apprentissage: Pour cette page mobile, 10svh de marge supplementaire au-dessus de la video est plus equilibre que 15svh.


## 2026-06-08T17:53:57.870Z - Tuile methode en verre epais opaque
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification CSS et cache-busting index.html.
- Detail: La tuile holographique Ma maniere de fonctionner est passee sur une direction verre epais opaque: fond sombre 0.97, bords chanfreines, reflets internes, cadre lumineux plus discret, sans integration du cadre PNG imagegen.
- Ajout: Override Thick opaque glass tile dans src/styles.css; version assets holographic-thick-glass-01.
- Suppression: Abandon de l'integration cadre PNG alpha pour cette tuile.
- Apprentissage: Le rendu attendu est une plaque premium lisible et solide, pas une simple bordure lumineuse transparente.


## 2026-06-08T18:09:41.780Z - Tuile transformee en vitre vide
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Suppression du contenu HTML de la tuile et ajout d'un override CSS :empty pour une vitre seule.
- Detail: La tuile Ma maniere de fonctionner a ete videe dans index.html: seule la div holographic-tile-shell reste dans le dialog. Le style glass-pane-only-01 cree une vitre epaisse sombre translucide avec bord et blur.
- Ajout: Version cache glass-pane-only-01; CSS Glass pane only.
- Suppression: Textes, titre, orbit, piliers, footer, beacon et bouton fermer visibles dans la tuile.
- Apprentissage: La tuile doit d'abord valider la matiere verre seule avant de reintegrer du contenu eventuel.


## 2026-06-08T18:18:21.962Z - Vitre seule 80 pourcent transparente
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification du cache index.html et ajout override CSS final.
- Detail: La tuile vide passe en version glass-pane-only-02: fond rgba(3,10,18,0.2), border 0, pseudo-cadre ::after desactive, seules les reflections ::before et gradients doux restent.
- Ajout: Glass pane only v2: 80% transparent, reflections only.
- Suppression: Cadre visible, halos bleu/orange, ombres decoratives fortes.
- Apprentissage: La vitre doit etre presque invisible et servir de materiau/reflet, pas de panneau HUD.


## 2026-06-08T18:29:43.051Z - Vitre reglee a 70 pourcent de transparence
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Mise a jour index.html cache glass-pane-only-03 et src/styles.css alpha 0.3.
- Detail: Correction de l'interpretation: 70% de transparence signifie alpha 0.3. La vitre vide utilise maintenant rgba(3,10,18,0.3), sans cadre, avec seulement les reflets.
- Ajout: Version CSS Glass pane only v3: 70% transparent.
- Suppression: Ancien alpha 0.2 correspondant a 80% de transparence.
- Apprentissage: Quand l'utilisateur donne un pourcentage de transparence, convertir en alpha inverse: transparence 70% = opacite 30%.


## 2026-06-08T20:18:58.947Z - Vitre 70 transparente rendue visible
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Mise a jour cache glass-pane-only-04 et override CSS de la matiere vitre.
- Detail: La vitre a 70% de transparence restait invisible avec un noir rgba(3,10,18,0.3) sur fond video noir. Elle utilise maintenant une teinte verre claire rgba(178,215,235,0.3), sans bord, sans contenu, avec reflets seulement.
- Ajout: Teinte verre visible alpha 0.3; blur 28px, brightness 1.12, reflets blancs doux.
- Suppression: Teinte noire alpha 0.3 trop proche du fond.
- Apprentissage: Sur fond noir, une transparence alpha exacte peut etre imperceptible si la couleur est noire; utiliser une teinte verre claire a alpha identique pour rendre la matiere visible.


## 2026-06-08T20:26:50.436Z - Vitre transparence reelle alpha global
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Correction CSS et cache-busting index.html.
- Detail: La teinte claire ne donnait pas l'impression de plus de transparence. La version glass-pane-only-05 applique maintenant opacity:0.3 sur toute la vitre, background blanc tres faible 0.06, blur reduit a 7px, sans cadre ni contenu.
- Ajout: Opacite globale 0.3 pour vraie transparence 70%; reflets neutres uniquement.
- Suppression: Teinte verre bleutee rgba(178,215,235,0.3) et blur fort 28px.
- Apprentissage: Pour une transparence visuelle percue, appliquer l'opacite sur l'ensemble du calque et reduire le backdrop blur; une teinte alpha seule peut seulement changer la couleur.


## 2026-06-08T20:46:59.141Z - Texte remis dans la vitre methode
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification index.html et ajout CSS holographic-tile-shell-text / holographic-text-only.
- Detail: La tuile Ma maniere de fonctionner contient maintenant uniquement le texte du fichier instructions la tuile par sections.txt: titre, phrase d'entree et paragraphes explicatifs. Pas d'icones, pas de cartes, pas de footer, pas de bouton interne.
- Ajout: Version cache glass-pane-text-01; texte seul sur vitre transparente alpha 0.3 avec reflets legers.
- Suppression: Etat totalement vide de la vitre.
- Apprentissage: Pour cette section, reintegrer le contenu en texte pur uniquement, en gardant la vitre comme support visuel.


## 2026-06-08T21:13:56.333Z - Zone texte depolie dans la vitre
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Mise a jour index.html cache glass-pane-text-frost-01 et ajout CSS .holographic-text-only::before.
- Detail: Option 2 appliquee: la grande vitre reste transparente, mais l'article texte possede maintenant une zone locale de verre depoli sombre pour ameliorer la lisibilite sur fond anime/textuel.
- Ajout: Calque sous texte avec backdrop-filter blur(18px), degradé sombre progressif, clip-path discret, sans cadre ni icones.
- Suppression: Aucune suppression de contenu; conservation du texte seul.
- Apprentissage: Pour texte sur vitre, separer localement le fond sous le texte plutot que rendre toute la tuile opaque.


## 2026-06-08T21:37:07.217Z - Tuile texte 50 transparence ajustee au contenu
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification src/styles.css, src/main.js et cache index.html glass-pane-text-50-02.
- Detail: La tuile texte Ma maniere de fonctionner est passee a une vitre globale moins transparente: rgba(3,10,18,0.5). La plaque depolie locale sous le texte est desactivee et le gabarit desktop est reduit a 900x500 pour mieux s'adapter au texte.
- Ajout: Fond vitre 50%, dimensions desktop 900x500, texte sans sous-plaque, verification navigateur sans overflow.
- Suppression: Zone locale de verre depoli .holographic-text-only::before et grand format 1240/940 x 760/560.
- Apprentissage: Quand l'option depolie ne plait pas, preferer augmenter simplement l'opacite de toute la vitre et adapter la taille au texte.


## 2026-06-11T20:06:29.572Z - Interaction paquet de fiches Explorer
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Remplacement de la tuile vitre par un composant de fiches interactives reutilisable.
- Detail: La tuile Explorer de la section Ma maniere de fonctionner a ete remplacee par un paquet de trois fiches 2:3: Ma maniere, Exemple, Projet. Ouverture en eventail depuis le point Explorer, flou global du site, fiches nettes, clic sur une fiche pour la passer devant.
- Ajout: Markup card-pack dans index.html, gestion methodCards et setActiveMethodCard dans src/main.js, styles card-pack-tile et method-card dans src/styles.css.
- Suppression: Suppression visuelle de la tuile vitre pour cette interaction; les anciens styles vitre restent neutres car le nouveau markup ne les utilise plus.
- Apprentissage: L ouverture doit montrer les trois fiches sans fiche active par defaut; l etat devant doit etre declenche par le clic utilisateur.


## 2026-06-11T23:51:50.424Z - Fiches Explorer generalisees par section
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Generalisation de holographicTiles, rendu dynamique des cartes, variations card-layout, agrandissement Explorer et texte, verification navigateur progressive sur 8 sections.
- Detail: Le systeme Explorer est maintenant disponible sur toutes les sections narratives du site. Les fiches utilisent les titres MA PHILOSOPHIE, MON APPROCHE et APPLICATIONS, avec contenus tires/adaptes du fichier fiches_tuiles_holographiques.md. Les dispositions de paquets varient par section et le bouton Explorer ainsi que les textes de fiches ont ete agrandis.
- Ajout: CARD_TITLES, CARD_LAYOUT_CLASSES, contenus par section, renderTileCards, window.closeTile pour QA, styles card-layout-* et overrides de taille Explorer.
- Suppression: Titre APPLICATIONS CONCRETES remplace par APPLICATIONS selon demande utilisateur.
- Apprentissage: Les points Explorer proches de la fin doivent avoir une fenetre d apparition plus large pour rester accessibles au scroll.


## 2026-06-12T00:55:03.135Z - Agrandissement texte Explorer
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Mise a jour de la regle CSS finale .explorer-point-label et cache busting dans index.html.
- Detail: Le libelle Explorer a ete agrandi de 20 pour cent supplementaires, de 0.75rem a 0.9rem. Cache CSS/JS passe en card-pack-sections-02.
- Ajout: Texte Explorer calcule a 14.4px en navigateur.
- Suppression: Aucune suppression fonctionnelle.
- Apprentissage: Le libelle Explorer doit rester plus visible; appliquer les changements dans la regle finale car plusieurs anciens styles coexistent.


## 2026-06-12T01:33:05.784Z - Verification correspondance fiches Explorer
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Suppression des tuiles Explorer sur les sections sans source Markdown; conservation des tuiles pour Ma maniere, Design, Accelerer, Solidifier, Donnees et Amelioration.
- Detail: Controle du fichier fiches_tuiles_holographiques.md avec le mapping du site. Les sections intro et Clarifier avant d'agir n'ont pas de fiche dediee dans le Markdown et reutilisaient le contenu Ma maniere de fonctionner.
- Ajout: Cache-buster mis a jour en card-pack-sections-03 et verification navigateur des 6 rubriques valides.
- Suppression: Acces Explorer retire de J'optimise l'existant et Clarifier avant d'agir tant qu'aucun contenu dedie n'existe dans fiches_tuiles_holographiques.md.
- Apprentissage: Chaque tuile Explorer doit correspondre a une rubrique explicite du fichier Markdown source; ne pas reutiliser un contenu voisin pour une autre section sans validation.


## 2026-06-12T01:54:32.270Z - Lisibilite fiche 3 Explorer
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Ajustement de la variante method-card-ice vers un fond ice plus sombre et texte clair.
- Detail: La fiche 3 APPLICATIONS utilisait une variante ice claire avec texte sombre, ce qui rendait le titre et le corps moins lisibles sur la zone basse sombre de la carte.
- Ajout: Titre blanc, texte #f4fbff, section cyan #9feaff, ombre de texte discrete et cache-buster card-pack-sections-04.
- Suppression: Ancienne combinaison texte sombre sur degrade ice clair/sombre.
- Apprentissage: Pour les fiches 2:3 avec degrade sombre en bas, preferer un fond globalement profond et un texte clair pour conserver un contraste stable.


## 2026-06-12T02:30:48.962Z - Publication Hostinger cv.c2rdesign.com
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Archive de deploiement creee et envoyee avec index, src, api/contact.php, video 1080p, video mobile, poster et texture cube contact.
- Detail: Publication du site AI_VIDEO_WEBGL_COMPETENCES_CLEAN sur Hostinger via archive statique ciblee.
- Ajout: URL publique verifiee: https://cv.c2rdesign.com/ ; video 1080p chargee en 1920x1080, duree 60.54s, Explorer et contact presents.
- Suppression: Dossiers de travail lourds exclus de l'archive: logs, exports, output, docs, sources de generation, package.json et fichiers inutiles au runtime.
- Apprentissage: Pour ce site, deployer une archive statique/PHP ciblee plutot que tout le dossier projet afin d'eviter les fichiers de generation et un build Node inutile.


## 2026-06-12T07:13:20.680Z - Effet metal sur les fiches
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification de src/styles.css pour remplacer le rendu precedent des method-card par une matiere metal lisible desktop/mobile.
- Detail: Les fiches interactives du paquet Explorer ont ete retravaillees en rendu metal brosse avec reflets, biseaux internes et variantes acier bleu, cuivre et titane.
- Ajout: Variables CSS metal, gradients de brossage, reflets speculaires, bords biseautes, focus visible, densite typographique mobile et apercus lateraux sans texte masque.
- Suppression: Aucune suppression fonctionnelle.
- Apprentissage: Pour ce projet WebGL, les fiches metal doivent conserver un fort contraste et masquer le corps de texte des apercus lateraux mobile afin d'eviter les chevauchements.


## 2026-06-12T08:56:16.126Z - Publication Hostinger fiches metal
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Creation d'un bundle statique selectif, deploiement via MCP Hostinger hosting_deployStaticWebsite, puis verification production HTML/CSS/assets et ouverture des fiches.
- Detail: Publication reussie sur https://cv.c2rdesign.com avec l'archive selective output/cv_static_selective_20260612_105132/cv_static_selective_20260612_105132.zip apres ajout de l'effet metal sur les fiches Explorer.
- Ajout: Cache-buster index metal-cards-20260612; archive selective 77.35 Mo; CSS production contient les variables metal; assets video et texture contact repondent 200; fiches ouvertes en production sans erreur console.
- Suppression: Suppression du bundle temporaire non publie output/cv_static_20260612_104830 trop volumineux.
- Apprentissage: Pour ce projet, publier un bundle selectif index/src/api/assets references, pas tout public, et incrementer le query param CSS/JS a chaque changement visuel pour eviter le cache CDN/navigateur.


## 2026-06-12T10:56:50.199Z - Flou local Explorer publie
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification de src/styles.css avec pseudo-element .explorer-point::before, mise a jour du cache-buster CSS explorer-blur-20260612 dans index.html, creation du bundle selectif output/cv_static_selective_20260612_125456/cv_static_selective_20260612_125456.zip et deploiement Hostinger.
- Detail: Ajout d'un fond floute local derriere le bouton et le texte Explorer, puis republication sur https://cv.c2rdesign.com.
- Ajout: Backdrop-filter blur(14px) limite a la zone Explorer, fond semi-transparent local, verification desktop/mobile locale et verification production HTML/CSS/navigateur sans erreur console.
- Suppression: Aucune suppression fonctionnelle.
- Apprentissage: Pour les retouches visuelles publiees sur cv.c2rdesign.com, incrementer le cache-buster CSS et verifier le pseudo-element calcule en production pour eviter les effets caches par CDN/navigateur.


## 2026-06-12T11:05:38.053Z - Correction halo Explorer discret publie
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification de src/styles.css pour supprimer bordure/background/backdrop-filter du pseudo-element Explorer, ajout d'un halo radial filter: blur(12px), mise a jour cache-buster explorer-halo-20260612, creation et deploiement du bundle output/cv_static_selective_20260612_130351/cv_static_selective_20260612_130351.zip via Hostinger.
- Detail: Correction du flou Explorer: retrait du panneau rectangulaire visible et remplacement par un halo elliptique tres discret sous le bouton et le texte, puis republication sur https://cv.c2rdesign.com.
- Ajout: Halo diffus sans rectangle: border 0, border-radius 999px, background radial transparent, filter blur(12px), production verifiee avec cssLink explorer-halo-20260612 et aucune erreur console.
- Suppression: Suppression de l'apparence panneau/carre du flou Explorer; retrait du backdrop-filter rectangulaire sur ce pseudo-element.
- Apprentissage: Pour Explorer, ne pas utiliser de backdrop-filter sur une boite visible; preferer un halo radial floute et transparent sous la zone pour ameliorer la lisibilite sans cacher le point lumineux.


## 2026-06-12T11:24:22.289Z - Halo Explorer intensifie publie
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification de src/styles.css: halo radial plus large et plus sombre, filter blur(17px), aucun border/backdrop-filter; cache-buster index mis a jour en explorer-halo-strong-20260612; deploiement Hostinger avec output/cv_static_selective_20260612_132233/cv_static_selective_20260612_132233.zip.
- Detail: Le halo diffus sous Explorer a ete intensifie pour mieux faire ressortir le bouton et le texte sur la video, tout en conservant la transparence et sans panneau visible.
- Ajout: Verification locale desktop/mobile puis production: cssLink explorer-halo-strong-20260612, border 0, backdrop-filter none, filter blur(17px), aucune erreur console.
- Suppression: Aucune suppression fonctionnelle.
- Apprentissage: Pour rendre Explorer lisible sur la video, augmenter la densite du halo radial et le blur CSS sans utiliser de boite, bordure ou backdrop-filter visible.


## 2026-06-12T11:36:30.330Z - Empilement mobile des fiches
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification de index.html, src/main.js et src/styles.css; validation locale desktop et mobile sur http://127.0.0.1:4177/?qaScroll=0.2083&verify=cards-stack-mobile-20260612.
- Detail: Ajout d'un empilement mobile decale pour les fiches Explorer avec bouton Fermer sur la fiche active; la fermeture renvoie la fiche derriere et fait avancer la suivante; la fiche 01 revient devant a l'ouverture et apres cycle complet.
- Ajout: Boutons Fermer mobiles, gestion d'ordre de pile JS, variables CSS de transform/z-index mobiles, cache-busting cards-stack-mobile-20260612.
- Suppression: Aucune suppression fonctionnelle dans cette evolution.
- Apprentissage: Sur mobile, les selecteurs nth-child plus specifiques reprenaient le transform; les regles d'etat data-stack-rank doivent avoir une specificite equivalente ou superieure.


## 2026-06-12T11:47:01.694Z - Publication Hostinger empilement mobile fiches
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Creation de l'archive statique selective output/cv_static_selective_20260612_134433/cv_static_selective_20260612_134433.zip puis deploiement via Hostinger MCP hosting_deployStaticWebsite sur cv.c2rdesign.com; verification production desktop et mobile.
- Detail: Publication de la version avec fiches Explorer empilees en mobile, bouton Fermer mobile et premiere fiche devant en desktop/mobile.
- Ajout: Version production cards-stack-mobile-20260612; empilement mobile verifie, rotation de pile au clic Fermer verifiee, assets CSS/JS servis avec nouveau cache-buster.
- Suppression: Aucune suppression pendant la publication.
- Apprentissage: La publication selective du site CV WebGL reste la bonne methode: index/src/api/assets essentiels uniquement, puis verification du cache-buster en production avant controle navigateur.


## 2026-06-12T14:10:11.459Z - Swipe gauche mobile des fiches
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification de index.html, src/main.js et src/styles.css; cache-buster cards-swipe-mobile-20260612; validation locale mobile par drag CUA et desktop.
- Detail: Remplacement du bouton Fermer par un geste mobile: glisser la fiche active vers la gauche, avec inclinaison visible, sortie a gauche puis retour derriere la pile.
- Ajout: Gestion pointer swipe mobile, classes is-swiping/is-flying-left/is-returning-behind, variables CSS --swipe-x/--swipe-y/--swipe-rotate, touche ArrowLeft comme alternative clavier mobile.
- Suppression: Suppression des boutons Fermer et de leurs styles/listeners.
- Apprentissage: Pour l'illusion demandee, il faut separer la sortie gauche courte de la remise derriere la pile afin que le mouvement reste perceptible avant le reclassement.


## 2026-06-12T14:19:25.594Z - Publication fiches Clarifier et layout mobile uniforme
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Correction de src/main.js avec entree holographicTiles methode-01 et choix card-layout-fan en mobile; cache-buster cards-swipe-sections-20260612 dans index.html; archive selective output/cv_static_selective_20260612_161700/cv_static_selective_20260612_161700.zip deployee via Hostinger MCP.
- Detail: Ajout des fiches manquantes pour la section methode-01 Clarifier avant d'agir; uniformisation du layout mobile des fiches sur le modele de la premiere section; conservation des layouts desktop specifiques; publication sur cv.c2rdesign.com.
- Ajout: Fiches Clarifier avant d'agir; verification production mobile methodologie, methode-01 et methode-02; swipe gauche verifie en production.
- Suppression: Aucune suppression fonctionnelle additionnelle; le bouton Fermer restait deja retire.
- Apprentissage: L'absence de fiches sur Clarifier venait d'un id textBlocks methode-01 sans entree correspondante dans holographicTiles; pour ce systeme, chaque section interactive doit avoir une cle identique dans holographicTiles.


## 2026-06-12T14:37:37.570Z - Verrou scroll mobile pendant fiches
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Ajout d'un verrou de scroll mobile dans src/main.js via classes is-card-scroll-locked, prevention wheel/touchmove et restauration scrollY; ajout CSS overflow/overscroll et touch-action none; cache-buster cards-scroll-lock-20260612.
- Detail: Correction du conflit entre swipe gauche des fiches et scroll vertical du site: quand les fiches mobiles sont ouvertes, le scroll haut/bas de la page est bloque; le swipe horizontal reste actif; le scroll revient a la fermeture.
- Ajout: Fonctions preventMethodCardPageScroll, lockMethodCardPageScroll, unlockMethodCardPageScroll; verification locale sur methode-01: scrollY stable pendant scroll haut/bas, swipe gauche OK, unlock OK apres Escape.
- Suppression: Suppression de l'approche body position fixed testee car elle modifiait la geometrie et refermait la tuile.
- Apprentissage: Pour ce site scroll-sync, ne pas figer body en position fixed pendant une tuile: preferer overflow hidden + prevention d'evenements pour conserver la geometrie de section.


## 2026-06-12T14:40:45.409Z - Publication verrou scroll mobile fiches
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Archive selective output/cv_static_selective_20260612_163832/cv_static_selective_20260612_163832.zip creee et deployee via Hostinger MCP hosting_deployStaticWebsite; verification production mobile sur methode-01.
- Detail: Publication sur cv.c2rdesign.com du correctif qui bloque le scroll vertical de la page pendant l'ouverture des fiches mobiles tout en conservant le swipe gauche.
- Ajout: Version cards-scroll-lock-20260612 publiee; verification: classes is-card-scroll-locked actives, overflow hidden, touch-action none, scrollY stable pendant scroll haut/bas, swipe gauche OK, unlock OK apres Escape.
- Suppression: Aucune suppression pendant la publication.
- Apprentissage: Le verrou overflow hidden + preventDefault wheel/touchmove est valide en production pour bloquer le scroll mobile des fiches sans casser le swipe horizontal.


## 2026-06-12T16:21:56.494Z - Lisibilite des fiches metal
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification HTML CSS JS des fiches interactives apres validation utilisateur.
- Detail: Optimisation des fiches Explorer: titre regroupe avec le numero, texte principal agrandi, fiches mobiles plus larges, cadre interieur supprime, inclinaison discrete de la fiche active selon son index.
- Ajout: En-tete method-card-head, rotations front/back dediees, cache-buster cards-readability-20260612, typographie de texte agrandie, fiche mobile elargie.
- Suppression: Cadre interieur method-card::after visible sur les fiches.
- Apprentissage: Pour ce projet, les fiches doivent privilegier la lisibilite du texte principal tout en conservant l'effet metal, l'empilement mobile, le swipe gauche et la premiere fiche devant a l'ouverture.


## 2026-06-12T16:33:45.120Z - Publication fiches lisibles metal
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Deploiement static Hostinger accepte puis verification production HTML CSS JS mobile et desktop.
- Detail: Publication Hostinger de la version cards-readability-20260612 sur cv.c2rdesign.com avec archive selective output/cv_static_selective_20260612_183046/cv_static_selective_20260612_183046.zip.
- Ajout: Version publique avec titre des fiches a cote du numero, texte agrandi, fiche mobile plus large, cadre interieur supprime et inclinaison discrete de la fiche active.
- Suppression: Ancien rendu public des fiches avec titre bas, texte plus petit et cadre interieur.
- Apprentissage: Verifier apres publication que les transitions desktop sont stabilisees avant de lire les transformations calculees; le premier relevé peut tomber en debut d'animation.


## 2026-06-12T18:20:59.301Z - Fiches pleine hauteur et CTA contact final
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification locale HTML CSS JS; verification navigateur mobile et desktop, ouverture contact, absence overflow, swipe mobile et verrou scroll.
- Detail: Les fiches Explorer sont restructurees en trois zones avec mini-titres et paragraphes pour occuper toute la hauteur disponible. La section Ameliorer en continu ajoute le texte 'Un projet, une idee ? Parlons-en simplement.' et un bouton icone enveloppe a clignotement faible qui ouvre le formulaire de contact existant.
- Ajout: Blocs method-card-point, titres de points, CTA story-contact-cta, bouton story-contact-button avec icone enveloppe SVG, fonction requestContactPanel reutilisable, cache-buster cards-full-contact-20260612.
- Suppression: Ancien rendu des fiches avec simples lignes concentrees en haut de la fiche.
- Apprentissage: Pour les fiches metal de ce portfolio, le texte doit remplir la fiche avec une structure lisible en plusieurs zones, tout en conservant l'empilement mobile et le swipe gauche.


## 2026-06-12T18:25:19.352Z - Publication fiches pleine hauteur et CTA contact
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Deploiement static Hostinger accepte puis verification production HTML CSS JS, fiches mobile, swipe, verrou scroll et CTA contact final.
- Detail: Publication Hostinger de la version cards-full-contact-20260612 sur cv.c2rdesign.com avec archive selective output/cv_static_selective_20260612_202253/cv_static_selective_20260612_202253.zip.
- Ajout: Fiches structurees en trois zones pleine hauteur, texte agrandi, CTA final 'Un projet, une idee ? Parlons-en simplement.' avec bouton enveloppe clignotement faible ouvrant le formulaire.
- Suppression: Ancien rendu public ou le texte des fiches restait concentre en haut.
- Apprentissage: Apres publication, verifier a la fois le contenu des fiches via mesures de hauteur et l'action du CTA final jusqu'a l'ouverture du formulaire.


## 2026-06-12T18:38:22.823Z - Proposition A Explorer halo discret
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification CSS et cache-buster local cards-explorer-halo-20260612; verification navigateur mobile et desktop, absence overflow, clic Explorer ouvre toujours les fiches.
- Detail: Application locale de la proposition A pour rendre Explorer plus visible: halo elliptique diffus renforce autour de la zone bouton + texte, label Explorer plus blanc, plus grand et plus net, sans forme rectangulaire visible.
- Ajout: Variables explorer-halo, halo radial diffus plus large, label Explorer a 13.44px calcule, ombre noire nette et glow bleu leger.
- Suppression: Lisibilite trop faible du label Explorer et halo trop discret.
- Apprentissage: Pour ce site, le bouton Explorer doit rester epure: renforcer le contraste par halo diffus et text-shadow, sans ajouter de capsule ni de rectangle visible.


## 2026-06-12T18:50:34.247Z - Publication halo Explorer discret
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Deploiement static Hostinger accepte puis verification production HTML CSS JS et test navigateur mobile du bouton Explorer.
- Detail: Publication Hostinger de la version cards-explorer-halo-20260612 sur cv.c2rdesign.com avec archive selective output/cv_static_selective_20260612_204837/cv_static_selective_20260612_204837.zip.
- Ajout: Halo elliptique diffus renforce derriere Explorer, label Explorer plus blanc, plus grand et plus net, sans forme rectangulaire visible.
- Suppression: Ancienne lisibilite trop faible du libelle Explorer.
- Apprentissage: La solution retenue pour Explorer est un halo diffus + text-shadow fort, pas une capsule visible; verifier le clic d'ouverture apres chaque ajustement du bouton.


## 2026-06-12T19:00:51.623Z - Explorer plus vif et fermeture fiches corrigee
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification locale CSS et cache-buster explorer-vivid-close-20260612; verification navigateur mobile: ouverture, fermeture par Explorer, retour du texte, suppression du blur/fond verrouille.
- Detail: Le point orange et l'anneau bleu Explorer ont ete rendus plus visibles via les spans du bouton: anneau bleu lumineux, point orange plus vif, glow renforce. Correction du bug de fermeture: quand les fiches sont ouvertes, Explorer passe au-dessus des fiches avec z-index 13 et sans filtre, ce qui permet de retaper dessus pour fermer correctement et restaurer le texte de fond.
- Ajout: Anneau .explorer-point-ring visible, core orange .explorer-point-core visible, override body:has(.card-pack-tile.is-open) .explorer-point au-dessus des cartes.
- Suppression: Explorer non cliquable derriere les fiches ouvertes et rendu trop peu vif du point/anneau.
- Apprentissage: Si Explorer sert aussi a refermer les fiches, il doit rester au-dessus du paquet de fiches pendant l'etat ouvert; sinon le fond reste filtre et l'utilisateur pense que le texte a disparu.


## 2026-06-12T19:55:08.093Z - Publication Explorer vif et fermeture corrigee
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Deploiement static Hostinger accepte puis verification production HTML CSS JS et test navigateur mobile: point/anneau visibles, ouverture, fermeture par Explorer, texte restaure.
- Detail: Publication Hostinger de la version explorer-vivid-close-20260612 sur cv.c2rdesign.com avec archive selective output/cv_static_selective_20260612_215305/cv_static_selective_20260612_215305.zip.
- Ajout: Point orange et anneau bleu Explorer plus vifs, Explorer au-dessus des fiches ouvertes avec z-index 13, cache-buster explorer-vivid-close-20260612.
- Suppression: Bug ou Explorer restait derriere les fiches et ne refermait pas, laissant le fond floute et le texte difficile a voir.
- Apprentissage: En production, verifier la fermeture par Explorer et pas seulement le clic exterieur, car le z-index du bouton conditionne la restauration visuelle du texte de fond.


## 2026-06-12T20:18:40.848Z - Correction couche Explorer et restauration texte
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification CSS/JS de src/styles.css, src/main.js et cache-buster index.html; validation locale mobile sur methode-05.
- Detail: Le bouton Explorer a ete rendu environ 10% moins vif, replace sous les fiches pendant leur ouverture, et la fermeture des fiches resynchronise maintenant le scroll et l'opacite du texte principal.
- Ajout: Resynchronisation courte apres fermeture des fiches via requestStoryStateRefresh; Explorer floute sous les fiches avec pointer-events none; intensite ring/core reduite.
- Suppression: Suppression du remontage visuel Explorer au-dessus des fiches via z-index 13 et filter none.
- Apprentissage: Pour cette experience, Explorer doit rester sous les fiches ouvertes et la fermeture doit restaurer exactement l'affichage texte principal precedent.


## 2026-06-12T20:50:04.122Z - Publication Hostinger explorer-soft-restore
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Archive selective output/cv_static_selective_20260612_224425.zip creee puis publiee avec hosting_deployStaticWebsite; verification HTTP publique index/CSS/JS OK.
- Detail: Publication de la version explorer-soft-restore-20260612 sur cv.c2rdesign.com via Hostinger static website deploy.
- Ajout: Version publiee avec Explorer moins vif, sous les fiches, et restauration du texte principal apres fermeture des fiches.
- Suppression: Aucune suppression projet; tentative initiale hosting_deployJsApplication non adaptee au domaine statique, remplacee par hosting_deployStaticWebsite.
- Apprentissage: Pour cv.c2rdesign.com, utiliser Hostinger hosting_deployStaticWebsite; le domaine pointe vers /home/u471520258/domains/c2rdesign.com/public_html/CV.


## 2026-06-12T21:27:12.942Z - Corrections iPhone fiches et scene contact finale
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Remplacement du flou base sur :has() par body.is-tile-open pilote en JS; resynchronisation scroll renforcee apres fermeture; revelation du texte de la fiche suivante pendant le swipe; ajout d'une scene contact-final apres Ameliorer en continu.
- Detail: Traitement de trois retours: texte qui disparait apres fermeture des fiches sur iPhone, texte de la fiche suivante invisible pendant le swipe mobile, et message contact final a integrer dans la narration scroll.
- Ajout: Cache-buster iphone-card-contact-final-20260612, bloc final Contact avec titre Message recu / A bientot, et classe is-card-swiping pour previsualiser la fiche dessous.
- Suppression: Dependance a :has(.card-pack-tile.is-open) pour le flou de fond et CTA contact directement attache a Ameliorer en continu.
- Apprentissage: Sur iPhone, eviter de piloter un etat critique de fermeture uniquement avec :has(); preferer une classe JS explicite et plusieurs resynchronisations apres retrait du scroll lock.


## 2026-06-12T22:11:05.158Z - Section message finale et textures fiches metal
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification du scroll final, du texte contact final, des styles de fiches et du cache-buster local.
- Detail: La section contact finale est placee apres la fin de l animation video. La video reste figee sur sa derniere image pendant le message final. Le titre final devient Un projet, une idee. Les fiches utilisent les textures metal jointes bleu, dore et noir, et les lignes horizontales internes sont supprimees.
- Ajout: Constante VIDEO_FINAL_HOLD_FROM, filtre net sur contact-final, fonds image metal par fiche.
- Suppression: Traits horizontaux internes des fiches et ancien titre final Message recu A bientot sur la narration finale.
- Apprentissage: Pour cette section, le message final doit rester lisible et net au bas du scroll pendant que la video conserve sa derniere image.


## 2026-06-12T22:28:25.888Z - Transition finale trois scrolls
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Ajustement des ancres narratives, compression de la progression video avant la fin, ajout de hauteur scroll sur contact-final.
- Detail: La transition entre Ameliorer en continu et la section contact occupe maintenant environ trois hauteurs d ecran. La video atteint son image finale a 72 pour cent du scroll puis reste figee pendant la respiration finale avant le contact.
- Ajout: Fonction clipAnchor, VIDEO_FINAL_HOLD_FROM a 0.72, section contact-final a 330svh.
- Suppression: Transition trop courte entre Amelioration continue et contact.
- Apprentissage: Pour la fin du site, l utilisateur veut une transition perceptible en plusieurs scrolls avec la video figee sur l image finale avant le message contact.


## 2026-06-12T22:32:51.175Z - Video site vers transparence alpha
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Evaluer une solution alpha: source transparente, detourage/matte, ou shader WebGL video+masque.
- Detail: La video principale du site est actuellement un MP4 H.264 yuv420p sans canal alpha. Objectif exprime: retirer le fond pour pouvoir placer la video devant d'autres elements.
- Ajout: Preference technique recommandee: creer un masque alpha separe ou regenerer les clips avec fond uni/transparent, puis exporter WebM VP9 alpha + HEVC alpha ou composer via shader.
- Suppression: Aucune
- Apprentissage: Une simple conversion du MP4 actuel ne cree pas un vrai alpha; le fond est deja integre aux pixels.


## 2026-06-12T22:38:58.802Z - Transition finale reduite a deux scrolls
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Ajustement de l ancre CONTACT_FINAL_ANCHOR a 0.90 et mise a jour du cache-buster.
- Detail: La transition entre Ameliorer en continu et la section contact a ete reduite de trois scrolls a environ deux hauteurs d ecran. Mesure locale: 2.03 ecrans entre les ancres 0.72 et 0.90.
- Ajout: Constante CONTACT_FINAL_ANCHOR.
- Suppression: Timing contact trop tardif a 0.985 pour cette transition finale.
- Apprentissage: L utilisateur prefere une respiration finale plus courte: deux scrolls suffisent entre amelioration continue et contact.


## 2026-06-12T22:56:05.160Z - Contact en fin de scroll et fiches HUD pleines
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Ajustement des constantes de timing final et refonte CSS des fiches methode.
- Detail: Le contact est recale tout en fin de scroll avec seulement 0.056 hauteur d ecran apres son ancre. La transition Ameliorer en continu vers Contact reste a environ 2.03 hauteurs d ecran. Les fiches utilisent maintenant un style HUD plein sans texture photo, avec fond noir profond, bordure lumineuse couleur par fiche, coins coupes et marques techniques discretes.
- Ajout: CONTACT_FINAL_ANCHOR a 0.995, VIDEO_FINAL_HOLD_FROM a 0.815, style HUD plein avec clip-path et fonds CSS.
- Suppression: Textures photo sur les fiches et zone morte importante apres contact.
- Apprentissage: L utilisateur veut un contact sans scroll mort apres la section et prefere des fiches HUD pleines sobres, futuristes et lisibles aux textures photo.


## 2026-06-12T23:43:57.910Z - Propositions visuelles fiches interactives
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Proposition visuelle avant choix et implementation.
- Detail: Generation d une planche image avec trois nouvelles directions de design pour les fiches interactives: A Monolith, B Signal, C Orbit. Objectif: remplacer le style HUD plein precedent qui ne satisfait pas l utilisateur.
- Ajout: Trois pistes de design: Monolith, Signal, Orbit.
- Suppression: Aucune suppression code pour cette etape de proposition.
- Apprentissage: L utilisateur veut comparer les designs de fiches en image avant implementation et n est pas convaincu par la version HUD pleine actuelle.


## 2026-06-13T00:03:17.930Z - Trois propositions fiches desktop mobile distinctes
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Generation image de trois directions plus differenciees apres retour utilisateur indiquant que les propositions precedentes etaient trop similaires.
- Detail: Generation de trois propositions visuelles separees pour les fiches interactives, chacune avec presentation desktop et mobile: Dossier Strategique, Prisme Liquide, Panneaux de Commande.
- Ajout: Proposition 1 editorial dossier, proposition 2 verre spatial/liquid glass, proposition 3 panneaux de commande cockpit.
- Suppression: Aucune modification du site pour cette etape de decision visuelle.
- Apprentissage: L utilisateur a besoin de propositions vraiment distinctes, montrees en desktop et mobile avant implementation.


## 2026-06-13T08:56:17.483Z - Fiches plaques metal noir fines
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Refonte CSS des method-card: suppression des decorations HUD, des clips de coins coupes et des fonds complexes; ajout d un halo radial derriere la plaque noire.
- Detail: Les fiches interactives sont simplifiees en plaques fines de metal noir avec une lumiere coloree derriere chaque plaque. La plaque elle-meme contient uniquement le texte, sans lignes ni marques HUD internes.
- Ajout: Halo couleur arriere via pseudo-element, plaque noire sobre, cache-buster thin-black-metal-cards.
- Suppression: Marques HUD, coins coupes, texture photo, lignes et details decoratifs sur la plaque.
- Apprentissage: L utilisateur prefere des fiches tres simples: metal noir fin, lumiere coloree derriere, texte uniquement sur la plaque.


## 2026-06-13T09:41:06.180Z - Publication Hostinger 2026-06-13
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Creation d une copie de publication propre, ajustement serveur Node pour ecouter 0.0.0.0, compression et deploiement Hostinger.
- Detail: Publication de la version actuelle du site sur c2rdesign.com via Hostinger JS deployment. Build Hostinger UUID 019ec053-ead9-70ad-b918-afc1b9ae9cb8, etat completed. Verification HTTP directe: c2rdesign.com et www.c2rdesign.com retournent le titre J optimise l existant - Video WebGL; assets JS CSS image et video disponibles.
- Ajout: Archive ai_video_webgl_competences_clean_20260613_112308.zip et dossier hostinger_publish_20260613_112308.
- Suppression: Aucune suppression projet.
- Apprentissage: Pour publier ce site sur Hostinger JS deployment, utiliser une copie propre minimale et remplacer l ecoute locale 127.0.0.1 par 0.0.0.0 dans la copie de publication.


## 2026-06-13T11:01:08.753Z - Texture AmbientCG Metal046B sur fiches
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Telechargement du pack Metal046B 1K JPG depuis AmbientCG, integration locale dans public/generated/images/textures/ambientcg-metal046b, mise a jour CSS des method-card et cache-buster HTML.
- Detail: Les fiches utilisent maintenant la texture AmbientCG Metal046B en fond de plaque, assombrie par CSS pour conserver la lisibilite. L effet lumineux reste derriere la plaque via pseudo-element, avec couleur par fiche bleu, orange et blanc acier.
- Ajout: Texture Metal046B_1K-JPG_Color.jpg, variable CSS plate-texture, halo arriere plus fort.
- Suppression: Aucune ligne ni decoration ajoutee sur la plaque; les pseudo-elements visibles sur la face restent desactives.
- Apprentissage: L utilisateur veut une plaque fine en metal noir avec texture AmbientCG Metal046B, et une lumiere couleur qui eclaire depuis l arriere, en gardant uniquement le texte sur la plaque.


## 2026-06-13T11:20:47.794Z - Fiches 4-3 texture metal visible
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification CSS des method-card et neutralisation du mobile-stack-scale dans main.js.
- Detail: Les fiches methode sont maintenant forcees au format 4/3, avec scale fixe a 1 dans les etats ouverts, front et mobile. La texture AmbientCG Metal046B est rendue plus visible sur une plaque opaque, et la lumiere couleur reste diffusee derriere la fiche.
- Ajout: Aspect-ratio 4/3, texture Metal046B en couche normale, cache-buster ambientcg-metal046b-4x3-fixed.
- Suppression: Changements de taille front/mobile et rendu de texture trop masque par transparence/blend.
- Apprentissage: L utilisateur veut des fiches fixes en 4/3, sans changement de taille, avec texture metal visible sur plaque opaque et faisceau lumineux uniquement derriere.


## 2026-06-13T13:24:30.366Z - Correction format fiches 3-4
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Modification CSS aspect-ratio de 4/3 vers 3/4 et mise a jour du cache-buster HTML.
- Detail: Correction du format des fiches methode: le ratio attendu est 3/4 et non 4/3. Les fiches restent fixes en taille, sans scale variable, avec texture AmbientCG Metal046B visible.
- Ajout: Cache-buster ambientcg-metal046b-3x4-fixed.
- Suppression: Ancienne interpretation 4/3 horizontale.
- Apprentissage: L utilisateur voulait un format vertical 3/4 pour les fiches, pas un format horizontal 4/3.


## 2026-06-13T15:42:35.271Z - Propositions typographiques UI
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Proposer 3 directions typographiques avant choix final.
- Detail: Trois directions typographiques proposees pour le projet: 1) Archivo + Space Grotesk pour un portfolio minimal/creatif; 2) Space Grotesk + DM Sans pour une identite AI/WebGL plus technique; 3) Outfit + Work Sans pour un rendu moderne, lisible et plus accessible.
- Ajout: Options de typographie candidates pour l'interface.
- Suppression: Aucune
- Apprentissage: Le projet s'oriente vers une interface portfolio/video/WebGL sombre avec typographie moderne, lisible et expressive.


## 2026-06-13T15:47:04.973Z - Liens de visualisation typographique
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Fournir des liens cliquables de visualisation pour comparer les propositions typographiques.
- Detail: Liens Google Fonts prepares pour visualiser les trois directions typographiques: Space Grotesk + DM Sans, Space Grotesk + Archivo, Outfit + Work Sans.
- Ajout: Liens Google Fonts associes aux options typo.
- Suppression: Aucune
- Apprentissage: La comparaison typographique doit etre facilitee par des liens visuels directs avant selection finale.


## 2026-06-13T15:49:17.242Z - Direction typographique a tester: Sora + Inter
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Retenir Sora + Inter comme combinaison typographique candidate a tester dans l'interface.
- Detail: L'utilisateur souhaite essayer Sora et Inter pour la typographie du projet. Proposition d'usage: Sora pour les titres, accroches et labels forts; Inter pour les paragraphes, navigation, boutons et UI dense.
- Ajout: Direction typo Sora + Inter.
- Suppression: Aucune
- Apprentissage: Preference actuelle du projet: typographie futuriste mais lisible, avec Sora pour l'identite visuelle et Inter pour la clarte UI.


## 2026-06-13T15:49:37.752Z - Texture custom plaques noires sur fiches
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Copie de l asset dans public/generated/images/textures/custom-black-plates et mise a jour CSS plate-texture plus cache-buster HTML.
- Detail: Remplacement de la texture AmbientCG Metal046B par l image fournie par l utilisateur ChatGPT Image 13 juin 2026 17_38_00, copiee en black-tech-plates.png. Les fiches gardent le ratio 3/4, la texture est visible sur la plaque, et la lumiere couleur reste derriere.
- Ajout: Texture custom-black-plates/black-tech-plates.png.
- Suppression: Reference visuelle active a Metal046B pour les fiches.
- Apprentissage: L utilisateur prefere la texture techno plaques noires fournie comme image pour les fiches, avec halo arriere et format vertical 3/4.


## 2026-06-13T15:50:31.262Z - Choix typographique valide: Sora + Inter
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Fixer la direction typographique principale du projet.
- Detail: Decision validee par l'utilisateur: utiliser Sora pour les titres et Inter pour les textes du projet.
- Ajout: Sora comme police de titres; Inter comme police de textes et interface.
- Suppression: Anciennes options typo non retenues comme direction principale.
- Apprentissage: Preference definitive actuelle: identite visuelle futuriste avec Sora en headings, lisibilite UI avec Inter en body.


## 2026-06-13T16:01:34.090Z - Typographie appliquee au site: Sora + Inter
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Appliquer le choix typographique valide dans le code du site.
- Detail: Modification appliquee dans le site local: import Google Fonts Sora + Inter dans src/styles.css, variables CSS --font-heading et --font-body, Sora appliquee aux titres, Inter appliquee aux textes et composants. index.html met a jour le cache-busting CSS.
- Ajout: Sora pour les titres; Inter pour les textes; version CSS sora-inter-typography-20260613.
- Suppression: Anciennes references typographiques Archivo, Space Grotesk et Fira Code dans la feuille principale.
- Apprentissage: Le site doit utiliser Sora comme police d'identite/titres et Inter comme police de lecture/interface.


## 2026-06-13T16:03:52.882Z - Texture Metal029 et texte fiches
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: mise a jour UI
- Detail: Les fiches interactives utilisent maintenant la texture ambientCG Metal029 en map couleur 1K-JPG, avec le texte courant des fiches agrandi de 20% sans modifier les titres.
- Ajout: Asset public/generated/images/textures/ambientcg-metal029 et liaison CSS vers Metal029_1K-JPG_Color.jpg; taille .method-card-point-copy augmentee de 20%.
- Suppression: Ancienne liaison CSS vers custom-black-plates/black-tech-plates.png pour les fiches.
- Apprentissage: Pour les fiches, utiliser une texture metal sombre subtile et augmenter seulement le texte courant, pas les titres ni les libelles.


## 2026-06-13T16:09:56.058Z - Texture fiches Metal029 rendue visible
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: correction UI
- Detail: La texture Metal029 etait techniquement chargee mais trop subtile; ajout d'une couche de grain Roughness visible sous les textes des fiches.
- Ajout: Variable CSS --plate-grain vers Metal029_1K-JPG_Roughness.jpg et pseudo-element .method-card::after avec contraste, brightness, mix-blend-mode screen et opacity 0.48.
- Suppression: Pseudo-element .method-card::after desactive par content:none pour les fiches.
- Apprentissage: Pour cette interface, une texture doit etre perceptible visuellement, pas seulement presente dans le CSS; utiliser la roughness Metal029 pour rendre la matiere visible.


## 2026-06-13T16:16:49.682Z - Fiches sans bordure et texte agrandi
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: correction UI
- Detail: Suppression des bordures visibles des fiches et augmentation supplementaire de 20% du texte courant, sans modifier les titres.
- Ajout: Texte .method-card-point-copy augmente a clamp(1.13rem, 1.24vw, 1.38rem), mobile a clamp(1.24rem, 5.54vw, 1.44rem); bordure .method-card supprimee.
- Suppression: Bordure CSS .method-card et ring interne 1px en box-shadow normal/hover.
- Apprentissage: Quand l'utilisateur demande d'agrandir le texte des fiches sans les titres, ne modifier que .method-card-point-copy et conserver les titres/mini-libelles.


## 2026-06-13T16:29:34.593Z - Effet lumineux fiches reduit
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: correction UI
- Detail: Diminution de 15% de l'effet lumineux des fiches interactives sans modifier la texture, les bordures supprimees ni les tailles de texte.
- Ajout: Opacites --metal-glow, --plate-light et halo .method-card::before reduites de 15%; hover/focus before passe a 0.85.
- Suppression: Intensite lumineuse precedente plus forte sur les halos de fiches.
- Apprentissage: Pour ajuster l'effet lumineux des fiches, reduire les variables de glow et plate-light plutot que la texture Metal029 ou la typographie.


## 2026-06-13T16:37:01.151Z - Publication Hostinger cv.c2r.design
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Creer site parent c2r.design, creer sous-domaine cv, uploader et deployer l'archive statique via Hostinger MCP, verifier resolution publique.
- Detail: Archive ai_video_webgl_competences_clean_20260613_183151.zip deployee via MCP Hostinger sur le site cv.c2r.design. Site parent c2r.design et sous-domaine cv crees sur l'hebergement u471520258, racine /home/u471520258/domains/c2r.design/public_html/CV. Blocage restant: le domaine c2r.design n'est pas dans le portefeuille de domaines Hostinger et cv.c2r.design ne resout pas encore en DNS public.
- Ajout: Dossier hostinger_publish_20260613_183151 et archive ai_video_webgl_competences_clean_20260613_183151.zip dans le projet local.
- Suppression: Aucune suppression.
- Apprentissage: Pour activer cv.c2r.design publiquement, ajouter chez le gestionnaire DNS de c2r.design un record cv vers cv.c2r.design.cdn.hstgr.net ou basculer les nameservers vers ns1.dns-parking.com/ns2.dns-parking.com puis creer la zone DNS Hostinger.


## 2026-06-13T17:20:12.480Z - Correction publication CV Hostinger
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Deployer sur cv.c2rdesign.com, supprimer le sous-domaine cv de c2r.design, supprimer les artefacts locaux de la mauvaise tentative, verifier le HTTP 200 et les marqueurs de version.
- Detail: La cible correcte de publication est https://cv.c2rdesign.com/ et non cv.c2r.design. Archive de publication deployee avec succes sur le sous-domaine existant cv.c2rdesign.com. Le sous-domaine errone cv.c2r.design a ete supprime via Hostinger MCP. Les artefacts locaux crees pour la mauvaise tentative hostinger_publish_20260613_183151 et ai_video_webgl_competences_clean_20260613_183151.zip ont ete supprimes. Le site addon c2r.design cree par erreur reste liste chez Hostinger, car aucun outil MCP expose ne permet de supprimer un site addon complet; suppression a faire dans hPanel si souhaite.
- Ajout: Publication acceptee sur /home/u471520258/domains/c2rdesign.com/public_html/CV.
- Suppression: Sous-domaine Hostinger cv.c2r.design supprime; dossier local hostinger_publish_20260613_183151 supprime; archive locale ai_video_webgl_competences_clean_20260613_183151.zip supprimee.
- Apprentissage: Pour ce projet CV, publier sur cv.c2rdesign.com. Ne pas utiliser cv.c2r.design.


## 2026-06-13T17:28:55.545Z - Publication export final cv.c2rdesign.com
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Publier output/cv_static_selective_20260612_224425.zip sur cv.c2rdesign.com et verifier les hashes distants contre l'export local.
- Detail: Correction apres constat utilisateur: la publication precedente avait envoye la racine courante, mais les dernieres modifications attendues etaient dans l'export output/cv_static_selective_20260612_224425.zip. Cet export a ete deployee sur https://cv.c2rdesign.com/ via Hostinger MCP. Verification publique: HTTP 200, ContentLength 8201, marqueurs explorer-soft-restore-20260612 presents, marqueurs custom-black-plates-3x4-20260613 absents. Hashes distants conformes a l'export pour index.html, src/styles.css, src/main.js et src/contact-scene.js.
- Ajout: Publication Hostinger acceptee avec fichier cv_static_selective_20260612_224425.zip.
- Suppression: Aucune suppression supplementaire.
- Apprentissage: Quand un export output/cv_static_selective_* existe, verifier s'il s'agit de la version finale a publier plutot que la racine du projet.


## 2026-06-13T17:38:43.249Z - Publication racine actuelle cv.c2rdesign.com
- Source IA: Codex
- Scope: projet
- Projet: AI_VIDEO_WEBGL_COMPETENCES_CLEAN
- Action: Mettre a jour les query strings CSS/JS, packager la racine actuelle avec textures manquantes, deployer via Hostinger MCP, verifier page publique et assets.
- Detail: Correction de publication: l'export du 12/06 etait trop ancien. La racine actuelle du projet a ete publiee sur https://cv.c2rdesign.com/ avec cache-bust publish-root-20260613-193433. Archive utilisee: cv_c2rdesign_root_current_20260613_193433.zip, dossier source hostinger_publish_root_20260613_193433. La publication inclut index.html, src/styles.css, src/main.js, src/contact-scene.js, api/contact.php, image contact, videos utilisees et textures ambientcg-metal029 necessaires au rendu des plaques/cube.
- Ajout: Cache-bust publish-root-20260613-193433 dans index.html; archive cv_c2rdesign_root_current_20260613_193433.zip; dossier hostinger_publish_root_20260613_193433.
- Suppression: Aucune suppression.
- Apprentissage: La derniere version attendue est la racine actuelle du projet, pas l'export output/cv_static_selective_20260612_224425. Les textures ambientcg-metal029 doivent etre incluses dans les bundles Hostinger.


## 2026-06-13T22:51:17.107Z - Migration site Ma Methode
- Source IA: Codex
- Scope: projet
- Projet: 01_SITE_MA_METHODE
- Action: Copie selective du site propre puis archivage des elements non necessaires
- Detail: Creation du dossier D:\00_Cerveau_IA\Projet\01_SITE_MA_METHODE avec uniquement le site actif et ses dependances directes: index, src, api contact, script serveur, videos, poster, texture contact et textures Metal029. Le reste du dossier AI_VIDEO_WEBGL_COMPETENCES_CLEAN a ete deplace dans D:\00_Cerveau_IA\Projet\99_Archive\AI_VIDEO_WEBGL_COMPETENCES_CLEAN_RESTE_20260614_005053; seul le dossier .git est reste dans l ancien workspace car verrouille par l environnement Codex.
- Ajout: Nouveau projet propre 01_SITE_MA_METHODE et archive datee AI_VIDEO_WEBGL_COMPETENCES_CLEAN_RESTE_20260614_005053.
- Suppression: Aucune suppression definitive; deplacement en archive des fichiers non essentiels.
- Apprentissage: Pour garder le cerveau central multi-projets lisible, isoler le site exploitable dans un dossier projet dedie et archiver les generations, logs, exports et publications volumineuses hors du dossier actif.

