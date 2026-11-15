# Working agreement

Oakhaven is a mobile folk-mystery storybook game: Phaser 3, portrait 390×844, hand-painted comic panels.

This repo is the single source of truth. If it is not in the repo, it does not exist. Chat is not memory.

## Who does what

| Who | Role |
|---|---|
| Owner (Shashi) | Decides story and scope, approves art, tests on a phone, merges |
| Claude | Plans: writes tasks, drafts story and page data, reviews PRs |
| Muse | Executes: code, images, wiring assets into the game |

Claude does not write game code or generate images unless a task says so. Muse does not change story, style or scope on its own.

When facts conflict, the higher item wins: `docs/STORY.md`, `docs/STYLE.md`, `docs/TASKS.md`, code, chat. Only the Owner can change the first two.

## Who edits which file

One writer per file avoids merge conflicts.

| File | Edits | Approves |
|---|---|---|
| docs/STORY.md, docs/STYLE.md | Claude, from Owner decisions | Owner |
| docs/TASKS.md | Claude writes tasks. Muse changes only a task's Status | Owner |
| docs/SHOTLIST.md | Muse adds a row for every image it commits | Claude reviews |
| game.js, index.html, data/, assets/ | Muse | Claude reviews, Owner merges |

## Workflow

1. Owner picks a task from `docs/TASKS.md`.
2. Muse reads this file and the task, then works on a branch named `task/T-003-short-name`.
3. Muse opens a PR using the template. One task, one PR, small diff.
4. Claude reviews the diff against the task and the checklist below.
5. Owner tests on the phone, then merges. Pages serves `main`.
6. If a merge breaks the game, revert first and fix second.

Prompt to give Muse: "Read AGENTS.md and docs/TASKS.md, then do T-00X."

## Rules for everyone

- Touch only the files in the task's Scope. If you spot something else, add it to "Found along the way" in `docs/TASKS.md` and leave it.
- If something is unclear, write the question in the PR or under "Open questions" in `docs/TASKS.md`. Do not guess and do not pad.
- No new dependencies, build tools or frameworks without Owner approval. Phaser stays vendored in the repo.
- Do not rewrite working code. No dead code, no commented-out blocks, no placeholder TODOs.
- Layout numbers live in one `LAYOUT` object, not scattered through the scene.
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
- Prefer data over code. Pages, panels, choices and flags live in `data/`, and `game.js` only reads them.
- Fix the cause. No wrapper that hides a bug.

## Definition of done

- Plays from the start through every changed path on a phone, with no clipped text and no console errors.
- Checked at 390×844 and at least one other phone size.
- Images follow `docs/STYLE.md` and have a row in `docs/SHOTLIST.md`.
- Docs match the behaviour: flags in `docs/STORY.md`, status in `docs/TASKS.md`.

## Review checklist (Claude)

Send a PR back if it:
- changes files outside the task's Scope
- adds a feature, setting or abstraction nobody asked for
- adds an image with no SHOTLIST row, or one that breaks the style
- uses a banned word or exceeds the length limits
- leaves a flag that nothing reads
