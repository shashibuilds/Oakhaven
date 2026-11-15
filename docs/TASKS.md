# Tasks

Claude writes tasks. Muse changes only a task's Status. Owner decides the order.

Status values: todo, doing, review, done, blocked.

Every task has a Goal (one sentence), a Scope (the only files that may change), a Done-when (checks someone can run on a phone) and an Out-of-scope line.

## Queue

### T-001 Publish on GitHub Pages (Owner, then Muse) - todo
- **Goal:** Every merge to `main` is playable from a phone link.
- **Scope:** README.md (setup section only). Repo Settings, Pages (Owner).
- **Done when:** `https://shashibuilds.github.io/Oakhaven/` loads on the phone and plays Page 1 to the end.
- **Out of scope:** Any game or art change.
- **Notes:** Owner turns on Pages: Settings, Pages, deploy from a branch, `main`, root folder. Muse then corrects the README: the `cd oakhaven-well-mystery` step, and the APK and `android/` sections, which describe files that are not in this repo.

### T-002 Redo Maren's portrait (Muse) - todo
- **Goal:** Maren looks like the woman the script describes.
- **Scope:** assets/portrait_maren.png, docs/SHOTLIST.md.
- **Done when:** Owner approves the new portrait on the phone: guarded, middle-aged woman, dark wool cloak, same style as the other images.
- **Out of scope:** Other images, layout.

### T-003 Move Page 1 into data and store flags (Muse) - blocked
- **Goal:** Page 1 is read from `data/story.json`, and choices set flags in a game state object.
- **Scope:** game.js, data/story.json (new).
- **Done when:** Page 1 plays exactly as before. Changing a caption in `story.json` changes it in the game after a reload. After choice A, `hasSealFragment` is true. After choice B, `marenCornered` and `hasIronKey` are true.
- **Out of scope:** New pages, new art, layout changes.
- **Blocked on:** Claude writes `docs/DATA.md` with the schema first, so Muse does not invent one.

### T-004 Readable text and one LAYOUT object (Muse) - todo
- **Goal:** Body text is readable on a phone, and layout numbers live in one place.
- **Scope:** game.js.
- **Done when:** Body text is at least 14 px. No clipped text at 390×844, 360×740 and 412×915.
- **Out of scope:** Story, art.

### T-005 Outline for pages 2 to 5 with shot list (Claude) - blocked
- **Goal:** A 5-page outline, the flags each page sets and reads, and a shot list of every image needed.
- **Scope:** docs/STORY.md, docs/SHOTLIST.md.
- **Done when:** Owner approves the outline.
- **Blocked on:** Owner answers the open decisions in `docs/STORY.md`.

### T-006 Character reference sheets (Muse) - blocked
- **Goal:** One approved reference sheet per character.
- **Scope:** assets/ref_*.png, docs/SHOTLIST.md.
- **Done when:** Owner approves each sheet on the phone.
- **Blocked on:** T-005 (names and traits in the Cast table).

## Open questions

None yet.

## Found along the way

- README describes `www/`, `android/`, `package.json` and a debug APK that are not in this repo. (T-001)
- Body text is 10 to 13 px on a 390-wide canvas. (T-004)
- Both Page 1 choices lead to the same stair, so the "2 endings" line in the game overstates it. (T-003, T-005)
- Page 1 images are 0.3 to 1.2 MB each. Check load time on mobile data as the image count grows.
