# Tasks

Claude writes tasks and updates Status after reviewing each PR. Muse does not edit this file. Owner decides the order.

Status values: todo, doing, review, done, blocked.

Every task has a Goal (one sentence), a Scope (the only files that may change), a Done-when (checks someone can run on a phone) and an Out-of-scope line.

## Queue

### T-001 README that matches the repo (Muse) - blocked
- **Goal:** The README describes what is really in the repo and how to play it.
- **Scope:** README.md.
- **Done when:** Every command and path in the README exists. The Pages link `https://shashibuilds.github.io/Oakhaven/` is in it. The APK, `android/` and `www/` sections are marked "not in this repo".
- **Out of scope:** Any game, art or docs change.
- **Blocked on:** T-003, so the README is written once for the new structure. GitHub Pages is already live.

### T-002 Redo Maren's portrait (Muse) - done
- Merged in PR #2. The file is 992 KB, which T-004 shrinks.

### T-003 Rebuild Page 1 in HTML and CSS (Muse) - todo
- **Goal:** Page 1 plays from `data/story.json` in plain HTML, CSS and JavaScript, sharp on any phone, with no gaps or clipped text.
- **Scope:** index.html, css/style.css (new), js/app.js (new), and deleting game.js and phaser.min.js. Do not edit data/story.json or docs/.
- **Must:**
  - Read `data/story.json` with `fetch` and draw it as described in `docs/DATA.md`. If loading fails, show a plain-text error.
  - Reveal panels one at a time with a short fade, scroll the new panel into view, and skip panels whose `when` does not match.
  - After a choice is picked, highlight it and disable and dim the others.
  - Keep the current look: parchment page, ink borders, panel number tags, gold banner, the fonts already in `fonts/`. The header reads "Oakhaven" and the page title.
  - Remove the timer, progress dots and the "20 seconds · 1 page · 2 endings" footer. They were prototype scaffolding.
  - Single column up to 480 px, centered on wider screens. Images are `width: 100%`. In the split layout the portrait uses `aspect-ratio`, `object-fit: cover` and `object-position: top` so the face shows. No cropping maths in JavaScript.
  - Body text at least 16 px, buttons at least 44 px tall and real `<button>` elements, visible keyboard focus, panel number tags that never cover text.
  - Colors, sizes and spacing as CSS variables at the top of the stylesheet, using the colors in `docs/STYLE.md`.
  - Respect `prefers-reduced-motion`.
  - Keep flags in a state object in memory. Replay resets it and returns to the first panel.
  - Console warnings only (no on-screen debug) for: a flag used but not declared, a flag set but never read, an image that fails to load, and text over the length limits in `docs/DATA.md`.
  - Works offline: no CDN, local fonts only, relative paths, a single classic `<script>` with no ES modules.
  - No framework, no build step, no new dependencies.
  - Delete `game.js` and `phaser.min.js` only after the new version plays Page 1 to the end. The old version stays archived on the branch `legacy/phaser-page1`.
- **Done when:**
  1. Page 1 plays to the end through both choices on the Pages link, with no white gaps, nothing cut off and nothing overlapping.
  2. Text and borders are sharp at your phone's full resolution.
  3. The layout holds at 360×740 and 412×915, and stays a centered column on a desktop browser.
  4. Changing a caption in `data/story.json` changes it in the game after a reload.
  5. The console shows no errors. The only warning is the expected one for `hasIronKey`, which is set but not read until later pages exist.
- **Out of scope:** New pages, new art, sound, saving progress, a title screen, and any change to story text or to the JSON format. If the JSON or `docs/DATA.md` looks wrong, say so in the PR instead of editing it.

### T-004 Right-size the images (Muse) - blocked
- **Goal:** Images load quickly on mobile data with no visible loss of quality.
- **Scope:** assets/, data/story.json (image paths only), docs/SHOTLIST.md.
- **Done when:** Every image is WebP and at most 250 KB. Wide panels are 1200 px wide and portraits are 700×1400. The Owner compares old and new on a phone and sees no difference. The game still plays Page 1 to the end.
- **Out of scope:** Regenerating or repainting any image.
- **Blocked on:** T-003.

### T-005 Outline for pages 2 to 5 with shot list (Claude) - blocked
- **Goal:** A 5-page outline, the flags each page sets and reads, and a shot list of every image needed.
- **Scope:** docs/STORY.md, docs/SHOTLIST.md.
- **Done when:** Owner approves the outline.
- **Blocked on:** Owner answers the open decisions in `docs/STORY.md`.

### T-006 Character reference sheets (Muse) - blocked
- **Goal:** One approved reference sheet per character.
- **Scope:** assets/ref_*, docs/SHOTLIST.md.
- **Done when:** Owner approves each sheet on the phone.
- **Blocked on:** T-005 (names and traits in the Cast table).

### T-007 Release plan for itch.io and Google Play (Claude) - todo
- **Goal:** A checklist of what each store requires and what we must build to meet it.
- **Scope:** docs/RELEASE.md.
- **Done when:** Owner approves. Every requirement comes from the stores' current official documentation, with the date it was checked.
- **Out of scope:** Building anything.

## Open questions

None yet.

## Decisions

- 2026-11-15: Rebuild in HTML and CSS instead of patching Phaser (Owner chose). The canvas version left white gaps where images were cropped, blurred text, and needed hard-coded positions for every panel.

## Found along the way

- Both Page 1 choices used to lead to the same stair. The new data gives each its own result panel. (T-003, T-005)
- The ring that matches the wax seal is below the crop of Maren's portrait, so it never shows on Page 1. Show it in a later panel. (T-005)
- README describes `www/`, `android/`, `package.json` and a debug APK that are not in this repo. (T-001)
- Page 1 images are 0.3 to 1.0 MB each. (T-004)
