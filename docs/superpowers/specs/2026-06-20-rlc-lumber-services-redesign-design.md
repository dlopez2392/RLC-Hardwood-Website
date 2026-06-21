# RLC Lumber — Services Redesign Design Spec

**Date:** 2026-06-20
**Project:** RLC Lumber website (`C:\Users\danlo\RLC Lumber site`)
**Source:** Owner-completed intake form (`RLC_Hardwood_Website_Intake_Form (2).docx`, prepared 2026-06-18)

## Background & Rationale

The existing site is a **premium slab gallery / e-commerce store** (slab inventory grid,
per-species board-foot store pricing, slab detail pages, add-to-quote/cart). The owner's
completed intake form tells a different story:

- He left blank or marked N/A nearly all store-oriented sections: wood species (none
  selected), inventory size, gallery filters, per-board-foot slab pricing, slab detail
  spec fields, shipping/freight. He explicitly marked the store board-foot calculator
  "will not be used."
- He provided rich, specific detail only for the **milling services**: drop-off milling,
  on-site portable milling, and solar kiln drying — each with real pricing.
- His chosen tagline: *"Local and Portable sawmilling services."*

**Decision (approved):** Full pivot. Rebuild the site around the sawmilling services.
Retire the slab store as the center of gravity.

## Business Facts (from intake form)

- **Legal name:** RLC Lumber LLC
- **Wordmark:** RLC Lumber
- **Tagline:** Local & Portable Sawmilling Services
- **Location:** 17490 Co Rd 2, Chatfield, MN 55923 (single location)
- **Service area:** Southern Minnesota & Northern Iowa
- **Hours:** Mon–Fri 7am–7pm · Sat 7am–2pm · Sun closed
- **Phone:** 956-202-3455
- **Email:** rlclumber17@gmail.com
- **Facebook:** https://www.facebook.com/profile.php?id=100089117444800
- **Target customers:** professional furniture makers, interior designers/architects,
  DIY hobbyists / home builders
- **Reviews to feature later:** Google Reviews, Facebook Reviews

### Services & Pricing

1. **Drop-Off Milling — $0.65/board foot**
   Bring logs to the shop. A detailed cut list is required so logs are milled correctly.
   Lumber is stickered and stacked; customer is called when the job is complete.
2. **On-Site Portable Milling — $85/hour**
   $1.25/mile one-way from the shop · $100 setup fee · $30 per broken blade if metal is
   in the log. Averages ~20–30 minutes per log. Customer moving logs and stacking lumber
   considerably reduces time/cost.
3. **Solar Kiln Drying — $0.70/board foot**
   Eco-friendly solar kiln. Target moisture content 8–12%. Kiln capacity: 12' lumber
   length, 1,600 board feet total.

### Equipment

- **Norwood HD36V2** portable sawmill — 36" log diameter capacity, 31" cut width,
  13' log length.

## Scope

### In scope
1. Restructure `index.html` into a services-led single page.
2. Keep `calculator.html` but make it host **two** calculators (tabbed):
   - the existing **Board Foot Calculator** (unchanged behavior), and
   - a new **Milling Estimate Calculator**.
3. Update all contact details, social links, and CTAs sitewide to real values.
4. Remove `slab-detail.html` from navigation (file retained, unlinked).

### Out of scope (Phase 2 / wish list)
- Availability calendar, custom milling request form, quote-to-invoice workflow,
  live review-platform integration, e-commerce/payments, project gallery CMS.
- Drafting legal copy (Terms, Sustainability page content) — owner to supply later.

## Page Designs

### `index.html` (single-page, anchored nav)

Nav: Home · Services · Calculators · Equipment · Contact

1. **Hero** — logo + headline "Local & Portable Sawmilling Services", subhead naming the
   service area, CTAs: **Get an Estimate** (→ `calculator.html#milling`) and **Call** /
   **Email**.
2. **Services** — three cards using the pricing above. Each card: title, headline price,
   short description, key details.
3. **Equipment & Capabilities** — Norwood HD36V2 specs + solar kiln specs (MC range,
   capacity).
4. **Service Area & Hours** — address, hours table, service region (S. Minnesota &
   N. Iowa). Optional embedded map link.
5. **Our Work** — project/gallery photo grid with placeholders (owner to supply photos).
6. **Testimonials** — placeholder quotes now; layout ready for Google/Facebook reviews.
7. **Contact / Footer** — phone, email, Facebook link, hours, address.

### `calculator.html` (two calculators, tabbed)

- **Tab 1 — Board Foot Calculator:** preserve existing inputs and logic.
- **Tab 2 — Milling Estimate Calculator:**
  - Service selector: Drop-Off Milling / On-Site Portable Milling / Solar Kiln Drying.
  - **Drop-Off:** input board feet → `boardFeet × $0.65`.
  - **Solar Kiln:** input board feet → `boardFeet × $0.70`.
  - **On-Site:** inputs miles (one-way) + estimated hours → `$100 setup + ($85 × hours)
    + ($1.25 × miles)`. Show a note that broken-blade fees ($30/blade for metal in logs)
    may apply and that customer-supplied labor reduces time.
  - Optional combine: allow adding kiln drying to a milling estimate.
  - Output: itemized estimate with a "this is an estimate, not a quote" disclaimer.

### `slab-detail.html`

Removed from nav. File kept in repo as the future home of the Phase-2 custom milling
request page.

## Assumptions & Open Items

- **Mileage interpretation:** "$1.25/mile one way" is implemented as `miles × $1.25`
  using the one-way distance. If the owner means round-trip billing, this is a one-line
  change. **Confirm with owner.**
- **Placeholders remaining:** domain name (owner owns a domain, name not provided);
  project/gallery photos; real testimonials; legal/sustainability copy.

## Success Criteria

- Site reads as a sawmilling **service** business, not a slab store.
- All three services and their exact prices are presented accurately.
- Both calculators work; the milling estimate uses the owner's real rates.
- All contact info, email, phone, and Facebook link are correct and clickable.
- No dead links to the retired slab store from primary navigation.
