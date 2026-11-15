# Art style

Owner approves any change. The look is locked from Page 1.

## Look

Hand-painted gouache and watercolor. Bold hand-inked outlines. Visible paper grain. Muted autumn earth tones: slate blue, moss green, burnt ochre. Warm lantern-gold highlights. Comic-panel framing in the manner of Wildermyth.

Not allowed: glossy or 3D rendering, anime, photorealism, neon, modern objects, and any text or lettering inside an image.

Game colors (from `game.js`): parchment #F4ECE1, ink #2B2623, lantern gold #C9A227 and #D9A441.

## Style block

Paste this word for word at the start of every image prompt. Add the subject after it and nothing else about style.

> Hand-painted gouache and watercolor illustration, bold hand-inked outlines, visible paper grain, muted autumn palette of slate blue, moss green and burnt ochre, warm lantern-gold highlights, European folk-tale mood, comic-panel composition. No text, no lettering, no watermark. Subject:

## Keeping characters the same

1. Make a reference sheet first: full body, a 3/4 view, and two faces (neutral and alarmed).
2. Owner approves it. Save it as `assets/ref_<name>.png`.
3. Every later image of that character is made from the approved sheet.
4. The character's fixed traits are written in the Cast table in `docs/STORY.md`. Repeat them in the subject line.

## Files

- Match the sizes of the existing files: wide panels are 1200 px wide and tall portraits are 1120×2240.
- Names are lowercase with underscores: `panel_well_dusk.png`, `portrait_maren_alarmed.png`. Prefixes are `panel_`, `portrait_` and `ref_`.
- PNG for now. Aim for at most 500 KB per image and 25 MB in total. Phones load these over mobile data.
- Rejected generations are not committed.
- Each committed image has a row in `docs/SHOTLIST.md`, including the subject line used.
