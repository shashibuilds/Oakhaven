# Tasks

Claude writes tasks and updates Status after reviewing each PR. Muse does not edit this file. Owner decides the order.

Status values: todo, doing, review, done, blocked.

Every task has a Goal (one sentence), a Scope (the only files that may change), a Done-when (checks someone can run on a phone) and an Out-of-scope line.

## Queue

### T-001 README that matches the repo (Muse) - todo
- **Goal:** The README describes what is really in the repo and how to play it.
- **Scope:** README.md.
- **Done when:** Every command and path in the README exists. The Pages link `https://shashibuilds.github.io/Oakhaven/` is in it. The APK, `android/` and `www/` sections are marked "not in this repo".
- **Out of scope:** Any game, art or docs change.

### T-002 Redo Maren's portrait (Muse) - done
- Merged in PR #2. The file is 992 KB, which T-004 shrinks.

### T-003 Rebuild Page 1 in HTML and CSS (Muse) - done
- Merged in PR #3. Page 1 plays from `data/story.json` in plain HTML, CSS and JavaScript. Phaser is gone and archived on the branch `legacy/phaser-page1`.

### T-004 Right-size the images (Muse) - todo
- **Goal:** Images load quickly on mobile data with no visible loss of quality.
- **Scope:** assets/, data/story.json (image paths only), docs/SHOTLIST.md.
- **Done when:** Every image is WebP and at most 250 KB. Wide panels are 1200 px wide and portraits are 700×1400. The Owner compares old and new on a phone and sees no difference. The game still plays Page 1 to the end.
- **Out of scope:** Regenerating or repainting any image.

### T-005 Outline for pages 2 to 5 with shot list (Claude) - review
- **Goal:** A 5-page outline, the flags each page sets and reads, and a shot list of every image needed.
- **Scope:** docs/STORY.md, docs/SHOTLIST.md.
- **Done when:** Owner approves the outline.
- **Review:** Drafted in `docs/STORY.md` (outline and flags) and `docs/SHOTLIST.md` (24 new images, so 28 in total). Items A to D at the end of `docs/STORY.md` need the Owner's answer.

### T-006 Character reference sheets (Muse) - blocked
- **Goal:** One approved reference sheet per character, six in total.
- **Scope:** assets/ref_*, docs/SHOTLIST.md.
- **Done when:** Owner approves each sheet on the phone. Each shows full body, a 3/4 view, and two faces (neutral and alarmed), using the Cast table.
- **Blocked on:** T-005 being approved.

### T-007 Release plan for itch.io and Google Play (Claude) - todo
- **Goal:** A checklist of what each store requires and what we must build to meet it, including the AI disclosure that itch.io requires.
- **Scope:** docs/RELEASE.md.
- **Done when:** Owner approves. Every requirement comes from the stores' current official documentation, with the date it was checked.
- **Out of scope:** Building anything.

### T-008 Support more than one page (Muse) - blocked
- **Goal:** The engine plays a chain of pages from `data/story.json`.
- **Scope:** js/app.js, css/style.css (only if needed).
- **Done when:**
  1. In a throwaway copy of the JSON with a second page (not committed), the end panel of page 1 shows a Next page button when `next` is set.
  2. Flags set on page 1 still apply on page 2.
  3. Replay on a later page returns to page 1 with all flags reset, and "Page N complete" shows the right number.
  4. A tap anywhere on the page, not only on the latest panel, reveals the next panel, as `docs/DATA.md` says.
  5. Page 1 still plays exactly as before.
- **Out of scope:** Saving progress, a title screen, new story content.
- **Blocked on:** T-009, so both tasks do not edit the same files at once.

### T-009 Polish after the rebuild (Muse) - todo
- **Goal:** Remove the small rough edges found in the T-003 review.
- **Scope:** index.html, css/style.css, js/app.js.
- **Done when:**
  1. Images are preloaded at start, so a panel never grows after it appears and the scroll lands in the right place on a slow connection.
  2. On the phone, no pale paper strip shows above Maren's head. If one does, shift `object-position` down until it is gone.
  3. The repeated hover color is a CSS variable.
  4. The page keeps clear of notches and rounded corners with `env(safe-area-inset-*)`.
  5. The `<title>` says "Oakhaven" and does not name a page.
- **Out of scope:** Anything else. No new features.

### T-010 Write pages 2 to 5 as data (Claude) - blocked
- **Goal:** All story text and choices for pages 2 to 5, following the approved outline and the writing rules in `AGENTS.md`.
- **Scope:** data/story.json, docs/STORY.md (flags table only).
- **Done when:** The Owner has read every line on a phone and approves. Every flag is declared and read at least once.
- **Blocked on:** T-005 being approved, and T-008 so the pages can be played.

### T-011 Clue list on screen (Muse) - blocked
- **Goal:** The player can open a list of the clues they hold, one line each.
- **Scope:** to be set when the Owner decides.
- **Blocked on:** The Owner's answer to item C at the end of `docs/STORY.md`.

## Open questions

None yet.

## Decisions

- 2026-11-15: Rebuild in HTML and CSS instead of patching Phaser (Owner chose). The canvas version left white gaps where images were cropped, blurred text, and needed hard-coded positions for every panel.
- 2026-11-16: The well stays unexplained until the end. Maren is the culprit. Endings are decided by one trust choice. The cast of six is approved. Details are in `docs/STORY.md`.

## Found along the way

- The ring that matches the wax seal is below the crop of Maren's portrait, so it never shows on Page 1. It appears in a panel on page 3 (the signet clue). (T-005)
- README describes `www/`, `android/`, `package.json` and a debug APK that are not in this repo. (T-001)
- Page 1 images are 0.3 to 1.0 MB each. (T-004)
- Bold text uses a browser-made bold, because only the regular weight of IM Fell English is loaded. Check the look on a phone.
