# Working agreement

Oakhaven is a mobile folk-mystery storybook game: plain HTML, CSS and JavaScript, hand-painted comic panels, built for phones first. It is meant to ship on itch.io and Google Play.

This repo is the single source of truth. If it is not in the repo, it does not exist. Chat is not memory.

## Who does what

| Who | Role |
|---|---|
| Owner (Shashi) | Decides story and scope, approves art, tests on a phone, merges |
| Claude | Plans: writes tasks, drafts story and page data, reviews PRs |
| Muse | Executes: code, images, wiring assets into the game |

Claude does not write game code or generate images unless a task says so. Muse does not change story, style or scope on its own.

When facts conflict, the higher item wins: `docs/STORY.md`, `docs/STYLE.md`, `docs/DATA.md`, `docs/TASKS.md`, code, chat. Only the Owner can change the first three.

## Who edits which file

One writer per file avoids merge conflicts.

| File | Edits | Approves |
|---|---|---|
| docs/STORY.md, docs/STYLE.md, docs/DATA.md | Claude, from Owner decisions | Owner |
| docs/TASKS.md | Claude writes tasks and updates Status after review. Muse does not edit it | Owner |
| docs/SHOTLIST.md | Muse adds a row for every image it commits | Claude reviews |
| data/story.json | Claude drafts page text and choices. Muse edits it only when a task says so | Owner |
| index.html, css/, js/, assets/ | Muse | Claude reviews, Owner merges |

## How the game is built

- `index.html` is the shell. `css/style.css` holds the look. `js/app.js` reads `data/story.json` and draws the pages.
- All story content is data, in the format described in `docs/DATA.md`.
- No framework and no build step. It must work from any host: GitHub Pages, itch.io and, later, inside an Android app. So paths are relative and nothing loads from the internet.
- The old Phaser version is archived on the branch `legacy/phaser-page1`.

## Workflow

1. Owner picks a task from `docs/TASKS.md`.
2. Muse reads this file and the task, then works on a branch named `task/T-003-short-name`.
3. Muse opens a PR using the template. One task, one PR, small diff.
4. Claude reviews the diff against the task and the checklist below.
5. Owner tests on the phone, then merges. Pages serves `main`.
6. Claude sets the task's Status. If a merge breaks the game, revert first and fix second.

Prompt to give Muse: "Read AGENTS.md and docs/TASKS.md, then do T-00X."

## Rules for everyone

- Touch only the files in the task's Scope. If you spot something else, say so in the PR and leave it. Claude adds it to "Found along the way" in `docs/TASKS.md`.
- If something is unclear, write the question in the PR. Do not guess and do not pad.
- No new dependencies, build tools or frameworks without Owner approval.
- Do not rewrite working code. No dead code, no commented-out blocks, no placeholder TODOs.
- Colors, font sizes and spacing live in CSS variables at the top of `css/style.css`, not as numbers scattered through the rules.
- No machine-specific paths or secrets in the repo.
- Every image has a row in `docs/SHOTLIST.md`. No image is generated without one.
- At most 3 attempts per image. After that, stop and say so in the PR.

## Anti-slop rules

**Writing**
- Voice: a plain folk-tale narrator. Short, concrete sentences. A caption is at most 2 sentences and 25 words. A speech bubble is at most 20 words.
- Every scene has one specific, slightly odd detail that matters later (the thirteenth bell, the clean boots). Detail that only adds mood gets cut.
- Banned words: ancient, eerie, mysterious, whisper, shiver, tapestry, "echoes of", "the air was thick with".
- No caption explains the theme. Show the object, not the lesson.
- Names are plausible for a central European village and start with different letters.

**Story**
- Every choice sets a flag or changes which panel comes next.
- A flag that no later page reads gets cut.

**Art**
- One fixed style block, in `docs/STYLE.md`, pasted word for word into every image prompt.
- Each character gets an approved reference sheet before any panel uses them.
- Generated images contain no text or lettering. The game draws all text.

**Code**
- Prefer data over code. Story content lives in `data/story.json`, and the engine in `js/` only reads it.
- Fix the cause. No wrapper that hides a bug.

## Definition of done

- Plays from the start through every changed path on a phone, with no white gaps, overlaps, clipped text or console errors.
- Checked in portrait at 360×740, 390×844 and 412×915.
- Body text is at least 16 px and buttons are at least 44 px tall.
- Images follow `docs/STYLE.md` and have a row in `docs/SHOTLIST.md`.
- Docs match the behaviour: flags in `docs/STORY.md` and `data/story.json`, status in `docs/TASKS.md`.

## Review checklist (Claude)

Send a PR back if it:
- changes files outside the task's Scope
- adds a feature, setting or abstraction nobody asked for
- adds an image with no SHOTLIST row, or one that breaks the style
- uses a banned word or exceeds the length limits
- leaves a flag that nothing reads
