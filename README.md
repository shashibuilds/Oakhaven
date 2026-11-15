# Oakhaven — Page 1: The Black Well

20-second playable mobile story prototype, portrait **390×844**, Phaser 3.
Wildermyth-inspired hand-painted comic-panel storytelling, European folk-mystery.

## Play it on the web

```bash
cd oakhaven-well-mystery
python3 -m http.server 8080
# open http://localhost:8080/ on a phone / browser at 390×844
```

## Play it on Android (debug APK)

Download **`Oakhaven-Page1-debug.apk`** from the Library root
(`~/workspace/your_files/Oakhaven-Page1-debug.apk`, 17 MB) and install it
on the phone (allow "Install unknown apps" for the browser/files app once).
App ID `com.shashibuilds.oakhaven`, version 1.0 (versionCode 1), minSdk 22,
targetSdk 34. Signed with a local debug key (v1/v2/v3 verified).

## 100% offline

No CDN, no Google Fonts link, no Base64 inlining. Everything is local:
- `phaser.min.js` — Phaser 3.80.1, downloaded from jsDelivr (1,181,917 bytes)
- `fonts/` — local `.woff2` files, linked via `@font-face` in `index.html`:
  IM Fell English (regular + italic), Cormorant Garamond (500, 600, italic 500).
  Note: Cormorant 500 and 600 share one variable-font file from Google Fonts,
  so the two files are byte-identical — that is expected.
- `index.html` waits for `document.fonts.ready` (3s fallback) before starting
  the game, so the storybook fonts render instead of a fallback.

Do NOT use a single-file HTML export: inlining Phaser 3 as a giant Base64
string bloats/truncates the file and it fails to render from a local file.
Keep the split layout below and serve it over HTTP instead.

## Layout fit

Phaser `Scale.FIT` + `autoCenter`. The page is laid out to end at ~796px
inside the 844px canvas (footer at y786), so the "Page 1 Complete — Replay"
button (bottom-right) and the footer fit without clipping or scrolling on
tall portrait phones. The middle-right panel caption is the shortened
"Mud at the well · broken abbey seal" with 14px inner padding on the
choice buttons, so text has breathing room from the panel border.

## Flow (~20 seconds)

1. **Panel 1 — Top:** mossy well at dusk + caption
   “The chapel bell tolled thirteen times—and Oakhaven's well water turned black as pitch.”
   Tap anywhere to continue.
2. **Panel 2 — Middle split:** Maren the archivist (left) with speech bubble
   “No one touched the seal, traveler. The old forest curse woke on its own.”
   + two parchment choices (right):
   - A — [Inspect the Broken Wax Seal]
   - B — [Point Out Her Muddy Boots]
3. **Panel 3 — Bottom:** hidden staircase panel + Wildermyth-style gold banner
   - A → **Clue Gained: Abbey Seal Fragment** — “You match the crimson wax to the archivist's ring—revealing a hidden stair beneath the well.”
   - B → **Maren: Cornered & Suspicious** — “She flinches, dropping a heavy iron key that unlocks the stair beneath the well.”
   - Ends with “Page 1 Complete — [time]s” + **Replay** button (bottom-right).

A live timer (top-right) and progress dots (●○○ → ●●●) track the page.

## Files

```
index.html            — 390×844 page shell, local phaser.min.js + local @font-face;
                      waits for document.fonts.ready (3s fallback) before starting
game.js               — all game logic (one scene, 3 steps, no framework beyond Phaser);
                      exposes window.startOakhavenGame(), called by index.html
phaser.min.js         — Phaser 3.80.1 (local, 1.2 MB)
fonts/                — 5 local .woff2 files (IM Fell English, Cormorant Garamond)
assets/panel_well.png        — ancient mossy well, foggy village at dusk
assets/portrait_maren.png    — Maren, village archivist, parchment #F4ECE1
assets/panel_clue.png        — muddy boots + broken crimson wax abbey seal
assets/panel_staircase.png   — hidden stone staircase beneath the well
www/                  — Capacitor webDir: synced copy of index.html, game.js,
                      phaser.min.js, assets/, fonts/ (re-sync after editing root files,
                      then `npx cap sync android`)
android/              — Capacitor Android project (appId com.shashibuilds.oakhaven)
capacitor.config.json — appId com.shashibuilds.oakhaven, appName Oakhaven, webDir www
package.json          — @capacitor/core, @capacitor/cli, @capacitor/android 6.2.3
```

Art direction (locked across all 4 images): hand-painted gouache + watercolor,
bold hand-inked outlines, paper grain, muted autumn earth tones
(slate blue, moss green, burnt ochre), warm lantern-gold highlights.
No glossy 3D, no anime. Page: parchment #F4ECE1, ink borders #2B2623,
serif storybook type (IM Fell English / Cormorant Garamond, Georgia fallback).

## Known issue to fix before submission

`portrait_maren.png` as generated reads as a bearded man, while the script
uses she/her for Maren (“Her Muddy Boots”, “She flinches”). Regenerate that
one portrait as a guarded middle-aged woman in a dark wool cloak before
showing it to an interviewer — everything else in the prototype is locked.

## How the APK was built (and how to rebuild it)

Gradle does **not** run in this VM: the sandbox intercepts every TCP
connection a JVM process makes, so the Gradle daemon IPC fails
("Unexpected type tag 109" — the socket receives a sandbox message instead
of daemon data) and sdkmanager fails the same way. The APK was therefore
built manually with native tools only:

- JDK: Temurin 17.0.21 (`/usr/lib/jvm/jdk-17.0.21+9`) — apt was unusable
  (its update hung for 12+ minutes on a slow mirror), so the JDK came
  from Adoptium via curl.
- Android SDK: `~/Android/Sdk` — cmdline-tools 19.0, platform-tools,
  `platforms;android-34`, `build-tools;34.0.0`, licences accepted.
  sdkmanager could not download (JVM TCP blocked), so the three packages
  were fetched with curl from `dl.google.com` (URLs from repository2-1.xml)
  and unzipped by hand. Note: `/tmp` is a 512 MB tmpfs — unzip SDK zips
  under `~/workspace`, not `/tmp`.
- Dependencies: `~/workspace/.apk-build/resolve.py` resolves the runtime
  AAR/JAR closure from POMs (Google Maven + Maven Central) and downloads
  them with curl — 47 artifacts (androidx appcompat/activity/fragment/
  webkit, Cordova framework 10.1.1, Kotlin stdlib, …).
- Build: `~/workspace/.apk-build/build.sh` runs aapt2 compile/link
  (with a hand-merged manifest, `~/workspace/.apk-build/merge_manifest.py`),
  javac (`-encoding UTF-8`, Java 17), d8 (multidex: classes.dex + classes2.dex),
  zipalign, apksigner (local debug keystore in `~/workspace/.apk-build/work/`).
  Gradle fixes applied along the way: the app's `AppTheme.NoActionBar`
  wins over Capacitor's identically-named style (stripped from the lib copy),
  and kotlin-stdlib-jdk7/jdk8 1.6.21 jars are excluded from dexing because
  kotlin-stdlib 1.9.10 already contains those classes (duplicate-type error).

Rebuild after editing web files:
```bash
cd oakhaven-well-mystery
# 1. re-sync web assets into www/ + android assets, then:
npx cap sync android
# 2. rebuild (no Gradle needed):
~/workspace/.apk-build/build.sh
# 3. copy out:
cp ~/workspace/.apk-build/work/app-debug.apk ~/workspace/your_files/Oakhaven-Page1-debug.apk
```

## Next steps (not done yet)

- Page 2 script + new panels (same art lock, same 390×844 layout)
- Sound: chapel bell, page-turn, lantern flicker (WebAudio, no assets yet)
- Install-on-phone test of the debug APK — only Shashi can do this
