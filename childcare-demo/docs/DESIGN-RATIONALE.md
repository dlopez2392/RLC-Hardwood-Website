# Design rationale: Sunroom Early Learning Studio

*A short brief for client conversations: why this site looks, reads and behaves the way it does.*

---

## 1. The problem with childcare websites

Before designing anything, we reviewed seven best-in-class sites: Bright Horizons, Primrose, Goddard, Guidepost Montessori, KinderCare, Lovevery (as a benchmark for warmth) and an independent Montessori school. The same failures came up across all of them:

| What parents need | What the category gives them |
|---|---|
| "What will this cost me?" | Every chain hides tuition behind a locator or a lead form. KinderCare's form has ten fields. |
| "What would my child's day actually be like?" | Slogans ("Children thrive here") and stock photography |
| "Is it safe?" | "Safety is our priority," with no ratios, no license number and hedged accreditation claims |
| "Who will be with my child?" | Faceless pages and anonymous testimonials |
| Spanish (in Texas, often the language at home) | None of the sites we reviewed offers it, including one that *sells* Spanish immersion |

Sunroom is designed to beat the category on each of these, visibly, within the first scroll.

## 2. Brand concept: "Sunlit Atelier"

**Name.** *Sunroom* is warm, architectural and grown-up. It suggests natural light and the best room in a house, with no cutesy misspellings or crayon energy. Classrooms are named for birds that grow up here: Wrens, Finches, Larks, Kestrels and Swifts. Their Spanish names appear on the Spanish pages.

**The organizing idea: light moving through a day.** The sun is the logo, which shows a half-sun rising through an arched window. It is also the hero, the navigation metaphor, and the engine of the signature scroll story. Because one idea is repeated everywhere, the site reads as a brand rather than a template.

**Signature move: the site knows what time it is.** The hero's sky, sun position and "Right now at Sunroom" card follow the current time in San Antonio:
- 7:40 a.m.: *"Breakfast and free play. Elena is greeting families at the door."*
- 3:00 p.m.: the Kestrels are painting with watercolor.
- At night: the moon is up and *"the Wrens are dreaming."*

This is what makes the site feel alive in the first five seconds.

**Palette.**

| Role | Name | Hex |
|---|---|---|
| Page | Cream | `#FBF6EE` |
| Text | Evergreen Ink | `#1F3A33` |
| Accent graphics | Sun | `#E2683C` |
| Accent text and buttons | Sun Ink | `#A8431D` |
| Supporting | Apricot, Sage, Dusk, Sky, Blush | — |

Every text/background pair was verified at 4.5:1 or better. Bright Sun fails as small text (3.1:1), so it is reserved for graphics and Sun Ink carries the accent in text.

**Type.** **Fraunces** handles display. It is a soft, slightly wonky variable serif with real personality, and its italic carries the emotional words ("*whole day*", "*up front*"). **Instrument Sans** handles UI and body text, where it is crisp and highly legible. Both are subset and axis-instanced from about 317 KB to 99 KB.

**Illustration.** A kit of original **cut-paper shapes with a risograph grain**: suns, arches, a pecan tree, nests, blocks and parametric teacher portraits.

**Why illustration instead of photography?**
1. It owns a look that no chain can copy.
2. It never shows a real-looking child or adult who doesn't exist. For a fictional demo this is an ethical line, and it also avoids the uncanny quality of AI-generated faces.
3. It renders at any size for almost no bytes.

**Update: photography added.** Twelve AI-generated documentary frames (Higgsfield API) now sit *inside* the arched window, with the cut-paper sun collaged on top. The time-aware hero and the scroll story keep working, and the sun's arc is compressed into the top third of each frame so it crosses walls and windows, never people. Casting was corrected to reflect San Antonio families. Children appear from behind or as hands at work. Teachers keep their cut-paper portraits so no fictional employee is presented as a real-looking person.

**Voice.** Calm, specific and quietly confident, like a great head teacher talking to a parent. It uses concrete numbers instead of adjectives ("1 teacher for every 3 infants; Texas allows 4") and contains no exclamation points.

## 3. UX decisions that convert

1. **Tuition on the first page.** Program cards show "from $X/mo." The estimator gives a monthly, weekly and annual figure in three taps, with no form and the sibling discount applied automatically. Transparency is the single strongest trust signal available to a childcare center.
2. **"How old is your child?"** One tap personalizes the page: the right room, its ratio against the Texas minimum, the tuition range, and the next open tour slot linked directly into the scheduler. It is preselected to the most common age group, so the module demonstrates itself.
3. **Tours in three taps.** The flow is day, then time, then name and email, and it ends with an `.ics` calendar file. The competition's lead forms ask for up to ten fields.
4. **A Day in the Life.** A scroll-driven narrative from 7:00 to golden hour. A pinned arched window shows the sun travelling and the sky warming as you read. On phones, and for anyone who prefers reduced motion, the same story becomes an illustrated timeline with a progress rail.
5. **Safety as a checklist, not a promise.**
   - A ratio table against Texas minimums, cited to 26 TAC Ch. 746.
   - A five-step allergy protocol and safe-sleep rules.
   - The illness policy in plain language.
   - A license badge with a clearly placeholder number.
6. **The parent app, shown rather than described.** A phone mock of "Maya's day" covers meals with amounts eaten, nap length, the diaper and potty log, illustrated photos, and one real sentence from her teacher. The ordinary experience of the app is what parents buy.
7. **"Ask Sunroom."** A bilingual assistant that answers from the center's own FAQ, cites its source page, and **declines to guess**. When the best answer doesn't address the question, it hands off to a tour or a call. Its provider architecture means a real LLM can be wired in later without touching the UI.
8. **Honest by construction.** A persistent banner states that this is a fictional demo. Reviews, statistics, the rating and the license are badged as sample content, once per section rather than on every card.

## 4. Bilingual, properly

Spanish is a full twin of the English site:
- Localized URLs (`/es/colegiatura/`) and `hreflang` alternates.
- Open Graph cards in Spanish.
- Spanish dates, money and time formats.
- The tour scheduler, estimator, forms and assistant all work in Spanish.

The register is a respectful *usted*, with Texas usage parents actually use (*kínder*, *colegiatura*, *Prekínder*). The type system makes a missing translation a build error, not a production bug.

## 5. Quality commitments (measured, not claimed)

- **Accessibility, WCAG 2.2 AA:**
  - 0 axe-core violations on all 21 pages at mobile and desktop widths.
  - Semantic landmarks, a skip link, and visible 3 px focus rings.
  - ARIA tabs, dialogs and radio groups follow the APG patterns.
  - Form errors use a focusable summary plus inline messages linked with `aria-describedby`.
  - The assistant announces finished answers, not word-by-word fragments.
- **Motion:**
  - Restrained, at 150–900 ms.
  - Every animation degrades under `prefers-reduced-motion`.
  - Ambient loops pause and the scroll story becomes static.
- **Performance:**
  - Lighthouse mobile 99–100 on every page tested, with LCP of about 0.8–0.9 s, CLS of about 0 and TBT of about 0 ms.
  - Zero JavaScript for static content; islands hydrate only where there is interaction, and the assistant panel lazy-loads on first open.
  - Offscreen sections use `content-visibility`.
  - Fonts use metric-matched fallbacks computed from the real font files, so text doesn't jump.
- **SEO:**
  - Unique titles and descriptions per page and language.
  - Canonical URLs, `hreflang`, a sitemap, and OG/Twitter cards.
  - JSON-LD for `ChildCare` (a `LocalBusiness` type, with fictional data), `FAQPage`, `BreadcrumbList` and `Event`.

## 6. What a real client would add

- Their own photography, from a half-day shoot: rooms in use, hands at work, the outdoor space.
- Real reviews with permission. A live state inspection link.
- Form and CRM integration, live tour availability, and the assistant connected to an LLM endpoint grounded in their handbook.
- An interactive map loaded after consent.
