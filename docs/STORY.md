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
4. **Cast:** six characters. The names and roles below are approved. The looks are proposed and get approved with each reference sheet (T-006).

## How these fit together (Claude's reading, for the Owner to confirm)

- **What Maren did.** She is guilty of something the player can prove: she broke the abbey seal and hid the stair beneath the well. Her ring matches the crimson wax. The story never explains the well, the thirteen bells or the black water, so a clue can point at Maren without solving the mystery.
- **One final choice.** On the last page the player decides what to do about Maren: trust her, expose her, or walk away. Three options give the three endings.
- **Earlier choices still matter.** They do not change which ending is reachable. They change what Maren says, which clues the player can show her, and how heavy the last choice feels.
- **Fair play.** Pages 1 to 3 each give the player one clue, whichever way they choose. So by page 4 everyone holds three clues, and three is always enough to prove Maren's guilt. The ring must appear in a panel before then.

## Cast

Add each character here before anyone draws them. These fixed traits feed the art prompts.

| Name | Role | Fixed traits |
|---|---|---|
| Maren | Village archivist | Woman, middle-aged, guarded, dark wool cloak, wears a ring that matches the crimson wax of the abbey seal |
| Tomas | Abbey caretaker | Old man, stooped, short white beard, undyed wool habit with a rope belt, a ring of iron keys at his hip |
| Ilse | Innkeeper | Woman in her forties, round face, sleeves rolled up, flour-dusted apron, red headscarf |
| Joska | Well-keeper | Wiry man in his fifties, weathered face, flat cap, a knotted rope coiled over one shoulder |
| Katrin | A child of about ten | Two dark braids, an oversized yellow coat, mud on both knees |
| Wendel | Chapel priest and bell ringer | Tall man in his sixties, black cassock, white hair, round spectacles, rope-scarred hands |

## The truth behind the story (draft, never shown in full)

- Thirteen years ago Maren's daughter Liese fell into the well and was never found.
- The abbey's records, which Maren keeps, say the well gives back what it keeps if its seal is broken at the thirteenth stroke of the bell.
- Tonight is the thirteenth year. Maren broke the seal, opened the stair, and then told the traveler a curse had woken on its own.
- The story never settles whether the records are true, whether Maren caused the black water, or where the thirteenth stroke came from. It gives clues and no answers.

## Tone

European folk-mystery told in comic-panel pages, in the manner of Wildermyth. Quiet, plain and specific. The dread comes from small wrong details, not from monsters.

## Shape

5 pages, about 1 to 2 minutes each, 5 to 8 minutes in total, with 3 endings. It is one long night. Page 1 exists and is the model for the format: a scene, a speaker with a choice, then a consequence.

## Outline for pages 2 to 5 (draft for the Owner to approve, T-005)

Each page has one odd detail that pays off later, and one choice. Every choice sets a flag, and every flag is read at least once.

### Page 1: The Black Well (written)
- **Odd detail:** the bell tolled thirteen times.
- **Choice:** inspect the seal, or point out Maren's boots.
- **Sets:** `hasSealFragment`, or `marenCornered` and `hasIronKey`.

### Page 2: Two Places at the Table (the inn)
- **Panels:** the common room with a table set for two. Ilse tells the player Maren paid for two beds all week and sleeps in one. The player chooses. A result panel shows the clue.
- **Odd detail:** the second bowl is full and still warm.
- **Choice:** search Maren's room, or ask Katrin what she saw.
- **Sets:** `hasGreyClay` (grey clay on Maren's boots, not from the village), or `heardTwoLanterns` (Katrin saw her carry two lanterns, one unlit).
- **Reads:** `marenCornered` changes what Ilse says about Maren coming in.

### Page 3: Twelve Strokes (the chapel and the abbey)
- **Panels:** Wendel at the bell rope says he rang twelve, as he always does. In the abbey ruin, Tomas shows an empty bell frame and says the abbey bell was melted down for the chapel forty years ago. The player chooses. A result panel shows the clue.
- **Odd detail:** the village heard thirteen, but only twelve were rung, and the abbey has no bell.
- **Choice:** ask Tomas about the seal, or ask Wendel for the old ledger.
- **Sets:** `knowsSignet` (the oak-leaf ring is the abbey's signet and only the archivist wears it), or `knowsLiese` (the ledger has an entry for Liese, drowned thirteen years ago, never found).
- **Reads:** `hasSealFragment` makes Tomas fit the player's wax fragment to the ring's crest.

### Page 4: The Knotted Rope (the well, midnight)
- **Panels:** Joska measures the well with a knotted rope. It had thirteen knots last week and twelve now, so something is coming up. The player goes down the stair to an iron door. Maren waits beyond it with an unlit lantern at her feet. The player chooses how to speak to her.
- **Odd detail:** the knotted rope.
- **Choice:** speak gently, or speak plainly.
- **Sets:** `spokeGently` or `spokePlainly`.
- **Reads:** `hasIronKey` (the key turns in the door, or the door is already open). `hasGreyClay` and `heardTwoLanterns` (Maren sees what you know). `knowsSignet` and `knowsLiese` (she answers with duty, or with her daughter).

### Page 5: The Thirteenth Stroke (the crypt)
- **Panels:** a flooded crypt, black water at the foot of the steps, two lanterns. Maren answers in a way that depends on how the player spoke. Then the final choice. Each ending is two panels.
- **Odd detail:** the second lantern, unlit.
- **Final choice (three options):**
  - **Hold the lantern for her** (`endTrust`). She lights the second lantern and goes down. At dawn Ilse sets two bowls, and one is empty by noon.
  - **Wake the village** (`endExpose`). Tomas and Wendel seal the stair with new wax. Maren is led away and gives you the ring. Joska's rope has thirteen knots again, and nobody can say why.
  - **Leave her to it** (`endLeave`). You walk out at dawn. Behind you the bell tolls thirteen, then one more that no bell in Oakhaven could make.
- **Reads:** `heardTwoLanterns` and `knowsLiese` change what Maren says when she lights the lantern.

## Flags

| Flag | Set by | Read by |
|---|---|---|
| hasSealFragment | Page 1, choice A (inspect the seal) | Page 3 |
| marenCornered | Page 1, choice B (her muddy boots) | Page 2 |
| hasIronKey | Page 1, choice B | Page 4 |
| hasGreyClay | Page 2, search Maren's room | Page 4 |
| heardTwoLanterns | Page 2, ask Katrin | Pages 4 and 5 |
| knowsSignet | Page 3, ask Tomas | Page 4 |
| knowsLiese | Page 3, ask Wendel | Pages 4 and 5 |
| spokeGently, spokePlainly | Page 4 | Page 5 |
| endTrust, endExpose, endLeave | Page 5, final choice | The ending panels |

Add a flag here and in `data/story.json` before any page uses it. Only the first three exist in the data today.

## For the Owner to confirm when you merge

- A. Maren's reason: her daughter Liese, drowned thirteen years ago.
- B. The three endings and what each one shows.
- C. Whether to add a clue list on screen (T-011). It would show the clues the player holds, which suits an archivist game.
- D. The proposed looks in the Cast table. You can change any of them.
