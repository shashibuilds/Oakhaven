# Story bible

Owner approves every change here. Claude drafts, Owner decides.

## Premise (canon, from Page 1)

Oakhaven is a village with a chapel, a well and a ruined abbey. At dusk the chapel bell tolls thirteen times and the well water turns black as pitch. The player is an unnamed traveler who arrives at that moment. The traveler is never drawn.

Maren, the village archivist, says no one touched the seal and that the old forest curse woke on its own.

Objects already in the story: a broken crimson wax abbey seal, muddy boots, a heavy iron key, a hidden stair beneath the well.

## Decisions (Owner, 2026-11-16)

1. **The well:** unclear until the end. The story never settles whether the black water is supernatural or someone's doing.
2. **Maren:** she is the culprit.
3. **Endings:** decided by one trust choice.

## How these fit together (Claude's reading, for the Owner to confirm)

- **What Maren did.** She is guilty of something the player can prove: she broke the abbey seal and hid the stair beneath the well. Her ring matches the crimson wax. The story never explains the well, the thirteen bells or the black water, so a clue can point at Maren without solving the mystery.
- **One final choice.** On the last page the player decides what to do about Maren: trust her, expose her, or walk away. Three options give the three endings.
- **Earlier choices still matter.** They do not change which ending is reachable. They change what Maren says, which clues the player can show her, and how heavy the last choice feels. That is how flags such as `hasIronKey` get read.
- **Fair play.** By page 4 the player can prove Maren's guilt from clues shown on screen. The ring must appear in a panel before then.

## Cast

Add each character here before anyone draws them. These fixed traits feed the art prompts.

| Name | Role | Fixed traits |
|---|---|---|
| Maren | Village archivist | Woman, middle-aged, guarded, dark wool cloak, wears a ring that matches the crimson wax of the abbey seal |

## Tone

European folk-mystery told in comic-panel pages, in the manner of Wildermyth. Quiet, plain and specific. The dread comes from small wrong details, not from monsters.

## Shape

5 pages, about 1 to 2 minutes each, 5 to 8 minutes in total, with 3 endings. Page 1 exists and is the model for the format: a scene, a speaker with a choice, then a consequence.

## Flags

| Flag | Set by | Meaning |
|---|---|---|
| hasSealFragment | Page 1, choice A (inspect the seal) | Player holds a fragment of the broken abbey seal |
| marenCornered | Page 1, choice B (her muddy boots) | Maren is rattled and on guard |
| hasIronKey | Page 1, choice B | Maren dropped the iron key |

The game keeps these in memory. Add a flag here and in `data/story.json` before any page uses it.

## Still open

4. **Cast size.** Recommended: 6 named characters (Maren plus 5).
5. **Names and roles for the other 5.** Claude proposes a list and the Owner approves or changes it.
