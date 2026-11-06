# Photography shot list (Higgsfield)

Generate these when the Higgsfield workspace has credits. The estimated cost is **about 12 credits**, at 1 credit per image with `gpt_image_2_6`, `quality: medium`, `resolution: 2k`. Budget **15** to allow for retakes.

## Locked style (append to every prompt)

> Candid documentary photograph, soft natural window light, cream plaster walls, oak and linen materials, muted sage-green and terracotta accents, gentle film grain, Kodak Portra 400 color, 35mm lens, shallow depth of field, calm and warm, no text, no logos.

## Art direction rules

- **Children:** shown from behind, in mid-distance, or as hands at work. Avoid frontal close-up faces of children. This avoids uncanny AI faces and matches how privacy-conscious centers photograph kids.
- **Teachers** may face the camera. Cast a diverse group of adults.
- **Grade:** every image gets the same warm grade in post, using `sharp` (shared tone curve), so the set reads as one shoot.
- **Disclosure:** a footer note will say the photography is AI-generated for this fictional demo.

## Shots

| # | Slot | Aspect | Prompt (before the style suffix) |
|---|---|---|---|
| 1 | Home hero, inside the arch | 3:4 | Sunlit early-learning classroom, two toddlers seen from behind at a low oak table stacking natural wooden blocks, a teacher's hands helping, tall arched window |
| 2 | Day · Arrival 7:00 | 3:2 | Parent kneeling to hug a preschooler goodbye at a classroom cubby with name labels, morning light, seen from the side |
| 3 | Day · Morning circle 8:30 | 3:2 | Small group of preschoolers sitting on a round woven rug seen from behind, a teacher with a guitar facing them, smiling |
| 4 | Day · Outdoors 9:45 | 3:2 | Children in rain boots at a wooden mud kitchen under a large pecan tree in a garden yard, seen from behind |
| 5 | Day · Lunch 11:30 | 3:2 | Long low oak table set family style, small hands pouring water from a little glass pitcher, bowls of soup and tortillas |
| 6 | Day · Rest 12:30 | 3:2 | Quiet nap room with low cots and linen sheets, curtains drawn, warm dim light, a teacher reading softly in a chair |
| 7 | Day · Atelier 2:45 | 3:2 | Child's hands painting with watercolor at an easel in an art studio, jars of brushes, paint palette |
| 8 | Day · Pick-up 4:30 | 3:2 | Golden-hour light, a parent and toddler walking hand in hand away from a cream building with an arched blue door |
| 9 | Programs · Infants | 4:3 | Teacher in her forties gently holding a baby during floor play on a sage mat, wooden mirror, soft light |
| 10 | Safety | 4:3 | Calm teacher checking a photo-ID pickup list on a tablet at a bright entry with a blue door, parent in soft focus |
| 11 | Portal · photo card | 1:1 | Toddler's hands holding a small watering can over a raised garden bed, droplets in the light |
| 12 | Home · gallery band | 21:9 | Wide view of a light-filled classroom with low shelves of natural materials, plants and children at play in soft focus |

## Pipeline once credits exist

1. Submit shots 1–12 with `generate_image_batch` (model `gpt_image_2_6`, `quality: medium`, `resolution: 2k`, the aspect from the table) and wait with `jobs_wait`.
2. Review every frame for artifacts (hands, faces, stray text) and regenerate any that fail.
3. Download the frames to `src/assets/photos/` and apply the shared grade with `sharp`.
4. Wire each frame into its slot with `astro:assets` `<Picture>` (AVIF/WebP, responsive `srcset`, lazy loading except the hero).
5. Re-run screenshots, axe and Lighthouse, then commit and republish the preview.
