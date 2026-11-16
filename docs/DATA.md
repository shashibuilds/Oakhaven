# Story data format

`data/story.json` holds all story content. The engine in `js/` only reads it, so a page can be added without touching code. Page 1 in that file is the working example, and its text is copied exactly from the original Phaser version.

Only Claude changes this format, and only through a task.

## Shape

```
{ "flags": { name: meaning, ... },
  "start": page id,
  "pages": [ { "id", "title", "panels": [ ... ] } ] }
```

## Panels

A page is a list of panels shown from top to bottom, revealed one at a time. A panel without choices waits for a tap anywhere on the page. A panel with choices waits until one is picked.

| Field | Meaning |
|---|---|
| `id` | Unique across the file, for example `p1-well` |
| `layout` | `wide`: image across the full width, text below. `split`: image on the left, choices on the right |
| `image` | Path to a file in `assets/` |
| `alt` | Describes the image for screen readers. Required whenever `image` is present |
| `caption` | Narrator line under a wide image. At most 25 words |
| `name` | Speaker label under a split image. The stylesheet shows it in capitals |
| `speech` | Speech bubble above a split panel, at most 20 words. The engine adds the quotation marks |
| `hint` | Small label above the choices |
| `choices` | List of choices, below |
| `banner` | Gold ribbon that states the consequence. Written in normal case. The engine shows it in capitals between two ✦ ornaments |
| `narration` | Text under a banner, at most 25 words |
| `thumb` | Small decorative image beside the narration. No `alt` needed |
| `when` | Show this panel only if every listed flag has that value, for example `{ "hasSealFragment": true }`. Otherwise skip it |
| `end` | `true` marks the last panel of a page. The engine then shows "Page N complete" and a Replay button, or a Next page button if `next` is set |
| `next` | Page `id` to go to after an `end` panel |

Each choice has:

| Field | Meaning |
|---|---|
| `id` | Unique within the panel |
| `label` | Button text, at most 6 words. The engine adds the square brackets seen in the old version, or drops them if the new design reads better |
| `set` | Flags to set when picked, for example `{ "marenCornered": true }` |

There is no jump. Branch by setting flags and using `when` on later panels.

## Rules

1. Every flag used in `set` or `when` is declared under `flags` with a one-line meaning. The Flags table in `docs/STORY.md` matches it. A change to one is a change to the other.
2. Flags are true or false for now. Counters, such as a clue count for the endings, are added by a task when the outline needs them.
3. A flag nothing reads is a bug, and the engine warns about it in the console. For now `hasIronKey` is set on Page 1 but not read, because pages 2 to 5 do not exist yet.
4. The text limits above come from `AGENTS.md`, and the engine warns when one is broken.
5. Text is plain. No HTML. Keep the typographic ’ and — exactly as written.
6. Every image path points to a real file, and the engine warns about one that fails to load.
7. To test locally, serve the folder over HTTP (for example `python3 -m http.server`). Opening `index.html` directly from disk will not load the JSON.
