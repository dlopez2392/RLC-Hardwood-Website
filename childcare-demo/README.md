# Sunroom Early Learning Studio: bilingual childcare demo site

> **Portfolio demonstration.** Sunroom is a fictional business. Every review, statistic, staff member, tuition figure and the license number (`DEMO-000000`) is sample content and is labelled as such on the site.

A production-quality, fully static website for a premium bilingual (English/Spanish) early-learning center in San Antonio, Texas. It is built to show a prospective childcare client what a modern, trustworthy, conversion-focused site can feel like.

| | |
|---|---|
| **Stack** | [Astro 7](https://astro.build) (static output) · TypeScript (strict) · Tailwind CSS v4 · Preact islands · [Motion](https://motion.dev) |
| **Pages** | 10 page types × 2 languages, plus 404 (21 routes) |
| **Lighthouse (mobile, local prod build)** | 99–100 Performance · 100 Accessibility · 100 Best Practices · 100 SEO |
| **Accessibility** | 0 axe-core violations (WCAG 2.0/2.1/2.2 A + AA + best practice) on all 21 pages at 375 px and 1280 px |
| **JavaScript** | 0 KB on static content; islands hydrate only where interaction exists |

---

## Live demo

**https://sunroom-childcare-demo.vercel.app** (Vercel project `sunroom-childcare-demo`, public, Node 22).

- The project is linked to this repo with Root Directory `childcare-demo`. "Affected projects" builds are on, so changes outside this folder (the lumber site) never trigger a demo build.
- Production follows the repo's production branch (`main`). Pushes to other branches get preview URLs. Until this folder is merged to `main`, redeploy production from the feature branch in the Vercel dashboard ("Redeploy") or with the Vercel MCP/CLI.
- `SITE_URL` is set on the project, so canonical URLs, `hreflang`, Open Graph images and the sitemap use the live domain.

## Quick start

```bash
cd childcare-demo
npm install
npm run dev        # http://localhost:4321
```

```bash
npm run build      # static site → dist/
npm run preview    # serve dist/ locally
npm run check      # type-check (also fails if any Spanish string is missing)
```

Node 20+ is required (developed on Node 22).

## Deploy

The site is plain static files in `dist/`, so it deploys to any static host with no configuration beyond the root directory.

**Vercel**
1. Import the repository in Vercel.
2. Set **Root Directory** to `childcare-demo`. The framework preset auto-detects Astro, and the build command and output directory need no changes.
3. Optionally set the `SITE_URL` environment variable (for example `https://sunroom.example.com`) so canonical URLs, `hreflang`, Open Graph and the sitemap use your domain.

**Netlify**
1. Base directory: `childcare-demo` · Build command: `npm run build` · Publish directory: `childcare-demo/dist`.
2. Set `SITE_URL` as above.

> This folder lives inside the RLC Hardwood repository only for convenience. It has no dependency on the rest of the repo and can be moved to its own repository unchanged.

### Portable preview export

`node scripts/export-artifact.mjs` (after `npm run build`) writes `.artifact/`, a self-contained copy that runs under **any base path**. It makes three changes:
- Rewrites root-relative URLs to relative ones with explicit `index.html` files.
- Inlines the fonts and grain texture.
- Renames `_astro/` to `assets/`.

Client-side links stay portable through a `<meta name="site-root">` tag that `href()` reads at runtime. Normal builds are unaffected. This is how the private preview was published.

## Project structure

```
src/
  i18n/index.ts           Routes (localized slugs), UI strings, dict() helper that enforces ES/EN parity
  data/                   Typed bilingual content: programs, teachers, FAQ, calendar/menu/day, site facts
  components/
    brand/                Logo, cut-paper illustration kit (Illo), parametric teacher portraits
    layout/               Header (+ mobile dialog), Footer, DemoBanner
    sections/             Home + shared sections (Hero, HeroScene, ProgramCards, EventsStrip, MenuModule…)
    islands/              Preact: AgePicker, TuitionEstimator, EnrollForm, TourScheduler, ContactForm,
                          AssistantLauncher (~2 kB) → AssistantPanel (lazy-loaded on first open)
    ui/                   PageHero, SectionHead
  views/                  One file per page type; rendered for both languages by src/pages/**
  lib/
    assistant/            Provider interface, local FAQ retrieval engine, remote-LLM stub
    sky.ts                Shared sky/sun model (time-aware hero + A Day narrative)
    tour.ts               Mock tour availability
  scripts/                Tiny client scripts: reveal-on-scroll, accessible tabs
public/                   Subset fonts, OG images, icons, noise texture
scripts/                  Verification + asset tooling (see below)
docs/                     DESIGN-RATIONALE.md, verification-log.md
```

### Bilingual content model

Every user-facing string exists in both languages. Page copy uses `dict(en, es)`, where the Spanish argument is typed as the English shape, so `npm run check` fails if a key is missing or misspelled. Spanish pages live under `/es/` with localized slugs (`/es/colegiatura/`, `/es/visita/` and so on), and the header toggle preserves the current page.

## The "Ask Sunroom" assistant

The assistant UI talks only to an `AssistantProvider` (`src/lib/assistant/types.ts`):

```ts
interface AssistantProvider {
  ask(question: string, ctx: { lang; history; signal }): AsyncIterable<Chunk>;
}
```

- **Default: `localFaqProvider`.** BM25-style retrieval over the bilingual FAQ, with accent folding, English/Spanish synonyms and a **coverage check**: if the best answer ignores most of the question, the assistant declines and hands off to a tour or a call instead of guessing. Answers stream word by word and cite their source page.
- **Real LLM:** set `PUBLIC_ASSISTANT_ENDPOINT=/api/ask` at build time. `remoteLlmProvider` posts `{ question, lang, history }` and expects newline-delimited JSON `Chunk`s. Implement that endpoint as a small serverless function that calls the Claude Messages API with streaming, using `src/data/faq.ts` as grounding context in the system prompt. Keep the API key server-side. No UI changes are needed.

Nothing typed into the demo assistant or any form leaves the browser.

## Verification tooling

With `npm run preview` running in another terminal:

```bash
node scripts/screenshots.mjs http://localhost:4321 / /es/ /tuition/   # 375/768/1280/1920 + overflow check
```

```bash
node scripts/a11y.mjs http://localhost:4321 / /programs/ /es/        # axe-core WCAG 2.2 AA
```

```bash
FORM=mobile node scripts/lighthouse.mjs http://localhost:4321 / /a-day/   # or FORM=desktop
```

Environment knobs for `screenshots.mjs`: `WIDTHS=375,1280`, `FULL=0` (viewport only), `REDUCED=1` (prefers-reduced-motion), `HOUR=17` (pins the clock to see the golden-hour hero). The scripts use the Chromium bundled with Playwright. Set `CHROME_PATH` for Lighthouse if yours lives elsewhere.

## Assets

- **Photography:** 12 AI-generated frames from the Higgsfield API (`xai/grok-imagine-image-2.0`), disclosed in the footer. They are graded to one look by `scripts/grade-photos.mjs` and served by `astro:assets` as AVIF/WebP with a responsive `srcset`. The shot list, prompts and casting notes are in `docs/photo-shot-list.md`.
  - To regenerate, run `scripts/higgsfield-shots.mjs`. It has `estimate` and `run` modes and needs `NODE_USE_ENV_PROXY=1` when the API key is injected by a proxy, or `HF_KEY=<id>:<secret>` otherwise.
  - Photos sit inside the brand's arched window (`PhotoArch.astro`), and the time-aware cut-paper sun is collaged on top.
- **Illustrations** are original cut-paper SVG components (`src/components/brand/`). Teachers stay illustrated on purpose, so fictional staff are never shown as photoreal "real" people.
- **Fonts:** Fraunces and Instrument Sans (SIL OFL) are subset to Latin plus Spanish glyphs and axis-instanced to about 99 KB total. Regenerate them with `scripts/subset-fonts.sh` (requires `pip install fonttools brotli`).
- **Open Graph cards** (`public/og/*.png`, 1200×630, both languages) are generated by `scripts/og.mjs`. The brand fonts must be installed for librsvg first (convert the woff2 files to TTF into `~/.fonts`, as the script header notes).

## Known limitations

- All forms, the tour scheduler and the assistant are front-end mocks. Submissions show a confirmation, and nothing is sent or stored.
- Tour availability is deterministic mock data, and the events strip hides past events based on the visitor's date.
- The map is an illustrated placeholder. A production build would lazy-load an interactive map after consent.
- Lighthouse scores were measured on a local production build. Real-world CDN results vary slightly.
- The "Right now at Sunroom" hero uses San Antonio time (`America/Chicago`) by design.
