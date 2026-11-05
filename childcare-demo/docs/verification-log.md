# Verification log

All checks were run against a local production build (`npm run build && npm run preview`) using the scripts in `/scripts`. Chromium is the Playwright-bundled build.

## 1. Competitive research (before design)

The review covered Bright Horizons, Primrose, Goddard, Guidepost Montessori, KinderCare, Lovevery and Fountainhead Montessori. The findings are summarized in `DESIGN-RATIONALE.md` §1.

## 2. Phase log

| Phase | Check | Result | Action taken |
|---|---|---|---|
| Shell | `astro build` smoke test on Astro 7 | Pass | — |
| Home v1 | Horizontal overflow at 375 and 1280 | **Fail**: about 2,600 px of hidden overflow | `sr-only` spans inside scrollers escaped their containing block. Made every `.scroll-x` a positioned container. |
| Home v1 | Art-director review | 10 issues | Rebuilt the pecan tree as layered cut paper. Trust row moved to a 2×2 grid. Removed the blurred glow ring. Age picker now preselected and framed. Day-ribbon dots trace the sun's arc. Fixed snap clipping. Fixed the "Jue" menu bug. CTA halos turned into crisp rings. Assistant button is icon-only on phones. Value-prop illustrations sit on tinted plates. |
| Home v1 | Lighthouse mobile | P93 · A100 · BP100 · SEO100 (TBT 280 ms, CLS 0.069) | WAAPI sun-rise replaces per-frame CSS-variable updates. Motion is kept only for the scroll story. IntersectionObserver reveals. Pre-rendered noise PNG replaces runtime `feTurbulence`. `content-visibility` for offscreen sections. Font fallbacks computed from the real metrics. Italic font preloaded. |
| Home v2 | Cold review by an agent with no access to the source | 3 weak points and 6 bugs | **Critical:** the mobile menu was unreadable because the blurred header became the fixed panel's containing block, so the dialog was moved outside it. Also: scrollers bleed to the viewport edge; the hero fits the desktop fold; family names, *Prekínder* and Spanish bird names are translated; quieter, de-duplicated SAMPLE badges; added a "Meet the grown-ups" portrait strip to answer "no humans"; the assistant button got a contrast ring and the footer got clearance for it. |
| Inner pages | Overflow at 4 widths × 21 routes | Tour page overflowed at 375 and 768 | `fieldset` and grid items default to min-content width. Fixed with a global `fieldset { min-inline-size: 0 }` and `min-w-0` grid children. |
| Inner pages | axe-core, 21 routes × 2 widths | 66 → 4 → **0** | Logo link's accessible name, demo banner moved into a landmark, eyebrow contrast on tinted heroes, duplicate landmark label. |
| Day page | Mid-scroll capture | Clock half a chapter ahead; clock pill over the sun; grain too heavy | Fixed the progress offset, moved the clock into the caption card, and lowered grain opacity. |
| Assistant | 9 realistic EN/ES questions | 6/9 → **9/9** | Added a coverage-based decline ("bring a puppy to the tour" now hands off instead of saying "Please do"), price and parking synonyms, and accent-folded stopwords. |

## 3. Final scores

### Lighthouse: mobile (Moto G Power emulation, slow 4G, 4× CPU)

| Page | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 100 | 100 | 100 | 100 | 0.9 s | 0 | 0 ms |
| `/programs/` | 100 | 100 | 100 | 100 | 0.8 s | 0 | 0 ms |
| `/a-day/` | 100 | 100 | 100 | 100 | 0.9 s | 0.001 | 0 ms |
| `/teachers/` | 100 | 100 | 100 | 100 | 0.8 s | 0.001 | 0 ms |
| `/safety/` | 100 | 100 | 100 | 100 | 0.8 s | 0.001 | 0 ms |
| `/tuition/` | 100 | 100 | 100 | 100 | 0.8 s | 0 | 0 ms |
| `/tour/` | 100 | 100 | 100 | 100 | 0.8 s | 0 | 70 ms |
| `/portal/` | 100 | 100 | 100 | 100 | 0.8 s | 0 | 0 ms |
| `/faq/` | 100 | 100 | 100 | 100 | 0.8 s | 0 | 0 ms |
| `/contact/` | 100 | 100 | 100 | 100 | 0.8 s | 0 | 0 ms |
| `/es/` | 100 | 100 | 100 | 100 | 0.9 s | 0.002 | 0 ms |
| `/es/un-dia/` | 100 | 100 | 100 | 100 | 0.9 s | 0.001 | 0 ms |
| `/es/colegiatura/` | 100 | 100 | 100 | 100 | 0.8 s | 0.001 | 0 ms |

### Lighthouse: desktop

See §4. The final run is appended there.

### Accessibility

- axe-core (WCAG 2.0/2.1/2.2 A and AA plus best practices): **0 violations** on all 21 routes at 375 px and 1280 px.
- Keyboard checks:
  - The skip link works.
  - The mobile menu moves focus to its close button, traps Tab, and closes on Escape with focus returned.
  - The assistant closes on Escape and returns focus to its launcher.
  - Menu and portal tabs support arrow keys, Home and End.
  - All radios in the estimator, scheduler and age picker are reachable and have visible focus rings.
- Reduced motion:
  - Hero entrance, sun-rise, reveals and ambient loops are disabled.
  - A Day in the Life becomes a static illustrated timeline.
  - View transitions are turned off.

### Responsive

There is no horizontal overflow at 375, 768, 1280 or 1920 px on any of the 21 routes.

## 4. Final runs

### Lighthouse: desktop (final)

| Page | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 100 | 100 | 100 | 100 | 0.2 s | 0.001 | 0 ms |
| `/a-day/` | 100 | 100 | 100 | 100 | 0.2 s | 0 | 0 ms |
| `/tuition/` | 100 | 100 | 100 | 100 | 0.2 s | 0 | 0 ms |
| `/tour/` | 100 | 100 | 100 | 100 | 0.2 s | 0.003 | 0 ms |
| `/portal/` | 100 | 100 | 100 | 100 | 0.2 s | 0 | 0 ms |
| `/es/` | 100 | 100 | 100 | 100 | 0.2 s | 0.001 | 0 ms |

After the italic-font preload, the English home page re-ran on mobile at **100 · 100 · 100 · 100 with CLS 0**.

### Spanish editorial review

An independent Spanish-language editor audited every Spanish string against the San Antonio market. The verdict was *"reads as professionally written Spanish, not a translation; register consistently usted."* All 8 errors and 15 improvements were applied:
- Decimal format.
- A leftover "pre-K".
- Lowercase *prekínder*.
- An inclusive plural for mixed-gender staff.
- *Usted* command forms on buttons.
- "Sin nueces ni cacahuates".
- HHSC's full name.
- a. m./p. m. on tour times.

The review also caught *Prekínder* leaking into three English strings, which has been fixed.

### Final regression (after all copy changes)

- `astro check`: 0 errors.
- Overflow: none on 21 routes × 4 widths.
- axe: 0 violations on 21 routes × 2 widths.
- Assistant: 9/9 test questions answered correctly or declined appropriately.
