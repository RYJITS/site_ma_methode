# AI Video WebGL Competences Clean

Copie propre du projet `AI_VIDEO_WEBGL_COMPETENCES`.

Cette version garde uniquement le texte narratif et la video finale. Les anciens essais d'interface, de timeline, de canvas d'atmosphere et de micro-scenes ont ete retires de la page de production.

## Contenu garde

- `index.html` : structure de la narration scroll.
- `src/main.js` : synchronisation scroll, temps video, mouvements camera et apparition des textes.
- `src/styles.css` : direction artistique cinematic, responsive, sans HUD.
- `public/generated/images/keyframes-16x9/` : images 16:9 du storyboard.
- `public/generated/videos/optimized/storyboard-optimized.mp4` : video finale optimisee, coupee a 10.4 secondes.

## Lancer le site

```powershell
npm run dev
```

Puis ouvrir:

```text
http://127.0.0.1:4177
```

## Principe

Le scroll fait descendre une vraie page. Chaque section porte un bloc de narration, pendant que la video reste en fond fixe et avance sans pause avec la progression utilisateur.

La camera video traverse l'ecran avec des deplacements horizontaux, verticaux et des zooms doux pour que l'image accompagne le texte au lieu de rester bloque sur un cote. Le site ne montre plus les compteurs, labels techniques, timeline, boutons, cadres ou couches decoratives superflues.

Une couche SVG `energy-links` relie maintenant le mot actif du texte a une zone de la video. Les fils orange/bleu sont calcules a partir de la position reelle du texte au scroll, puis pointent vers le cube, les fragments, les circuits ou la tete selon la section active.

La timeline issue de `Parcours.md` est maintenant toujours affichee en bas de l'ecran. Elle est synchronisee avec le scroll global: `activeIndex = round(progress * 8)`, ce qui met en avant une periode du parcours pendant que la video et le texte avancent. Les avis employeurs restent en ticker discret sous cette timeline, melanges a chaque chargement.
