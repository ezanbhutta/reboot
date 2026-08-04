# Phase 1 — Project Understanding: Intake Brief

Phase 1 requires reading the SRS line by line and extracting a fixed set of facts.
No SRS has been supplied, so this document does two things instead:

1. Defines the **extraction schema** — the structure the SRS will be read into, so
   that when it arrives the analysis is systematic rather than impressionistic.
2. Lists the **open questions** that must be closed before design begins, ranked by
   how much damage a wrong assumption would cause.

---

## 1. Required inputs

### 1.1 SRS / requirements document
The single most important artefact. Accepted in any format (PDF, DOCX, Notion
export, Google Doc, plain Markdown). If no formal SRS exists, say so — the intake
questionnaire in §3 is a workable substitute and takes about forty minutes to fill.

### 1.2 Brand logo files
Needed: primary lockup, horizontal variant, stacked variant, icon/monogram, and any
reversed (light-on-dark) versions. **Vector strongly preferred** (SVG or AI/EPS).

Why it matters beyond aesthetics: the logo's aspect ratio determines header height,
which determines the sticky-header offset, which determines above-the-fold budget on
mobile. A wide horizontal lockup and a square monogram produce materially different
headers. An SVG can be inlined and costs nothing; a 200 KB PNG competes with the hero
image for Largest Contentful Paint.

### 1.3 Brand fonts
Needed: the font files themselves (WOFF2 ideally), **and the licence**. Web-embedding
rights are a separate grant from desktop rights and are frequently missing.

Why it matters: type is the single largest lever on perceived quality, and also a
hard performance cost. Each weight is a network request in the critical path. Confirm
which weights genuinely exist and are licensed — designing a hierarchy around a Light
weight that turns out to be unlicensed means re-doing the type system.

If the licence does not cover web use, flag it immediately. There are two exits:
buy the web licence, or select a near-metric-match substitute. Both are fine; the
one unacceptable outcome is discovering the gap after the design is signed off.

### 1.4 Brand assets
Photography library, illustration, iconography, colour values (hex, and Pantone/CMYK
if print exists), any existing brand guidelines PDF, tone-of-voice documentation.

Photography is the decisive input for a premium storefront. A brand with a deep
library of art-directed lifestyle imagery supports an editorial layout language. A
brand with only white-background packshots needs a fundamentally different system —
typographic, spatial, and colour-led — because editorial composition without editorial
photography reads as a template with holes in it. **Please be honest about what
actually exists today versus what is planned.** Designing for a photo library that
never materialises is the most common way premium e-commerce projects fail.

### 1.5 Inspiration websites
Three to eight URLs. For each, one sentence on what specifically appeals. "The
Aesop site" is not usable; "the way Aesop's product pages read like editorial rather
than a spec sheet" is directly actionable.

### 1.6 Competitor websites
Direct competitors (same product, same buyer) and aspirational competitors (the tier
above). Both are needed and they serve different purposes — direct competitors define
the table stakes we must match, aspirational ones define the gap we intend to open.

---

## 2. Extraction schema

Once the SRS lands, it will be read into exactly this structure. Every field either
gets a sourced answer or is escalated as an open question. Nothing gets guessed.

### Business
- Business goals, ranked, with any numeric targets attached
- Revenue model — one-time purchase, subscription, hybrid, wholesale/B2B tier
- Conversion goals, primary and secondary, with current baselines if known
- Success metrics and how they are measured today
- Commercial constraints: margin structure, discounting policy, AOV targets

### Brand
- Positioning statement and the category it competes in
- Price tier relative to the market, and the justification for it
- Brand personality and voice
- Non-negotiables and prohibitions inherited from existing guidelines

### Audience
- Primary and secondary personas, with the evidence behind them
- Purchase context — considered vs. impulse, gifting vs. self-purchase, repeat vs. one-off
- Device and channel mix (the mobile/desktop split changes the entire layout strategy)
- Geography, currencies, languages, shipping regions
- Existing customer research, reviews, or support-ticket themes if any exist

### Customer psychology
- Pain points, in the customer's own words wherever possible
- Motivations and the emotional job the product is hired for
- Objections that block purchase, ranked by frequency
- Trust deficits specific to this category
- Emotional triggers that genuinely apply — not generic ones

### Product
- Catalogue size now, and projected in 24 months
- Product hierarchy: categories, sub-categories, collections, bundles, sets
- Variant structure — this maps directly onto a hard platform limit, see
  [`02-shopify-constraints.md §2`](02-shopify-constraints.md)
- Attributes that customers actually filter and compare on
- Product content available per SKU: images, video, copy depth, specifications, sizing
- Products needing special treatment: made-to-order, personalised, limited, pre-order

### Functional
- Required pages, exhaustively
- Required features, separated into must-have and nice-to-have
- Account functionality: guest checkout, order history, saved addresses, wishlists,
  reorder, subscription management
- Search and filtering expectations
- Third-party integrations: ERP, PIM, 3PL, CRM, email/SMS, reviews, loyalty, analytics
- Payment methods, and any local methods required by geography
- Legal and compliance: privacy, cookies, accessibility statement, category-specific rules

### Technical
- Shopify plan (Basic / Grow / Advanced / Plus) — **this gates checkout customisation
  entirely**, see [`02-shopify-constraints.md §5`](02-shopify-constraints.md)
- New build or replatform; if replatform, source system and migration scope
- Theme strategy: Dawn-derived custom theme, premium theme customisation, or headless
- Existing app stack and which apps are contractually locked in
- Domain, DNS, and any redirect map obligations from a legacy site
- Team capability for ongoing maintenance after launch

### Scalability
- Planned market expansion (Shopify Markets vs. separate stores is an architecture fork)
- Planned catalogue and category growth
- Planned channels: retail POS, marketplaces, wholesale
- Content ambitions: editorial, journal, lookbooks, guides

---

## 3. Open questions

These are unresolved and cannot be assumed. Ranked by cost of getting them wrong.

**Tier 1 — blocks all design work**

1. **What is the product, and who buys it?** Everything follows from this. There is
   no design decision that survives being wrong here.
2. **What is the price tier?** A £30 impulse purchase and a £3,000 considered purchase
   require opposite page architectures. The first optimises for speed to cart; the
   second optimises for depth of reassurance and may not want a fast add-to-cart at all.
3. **What is the catalogue size and shape?** Twelve SKUs and twelve thousand SKUs are
   different products. Small catalogues want curation and storytelling; large ones want
   search, filtering, and merchandising infrastructure.
4. **What is the Shopify plan?** Determines whether checkout is customisable.

**Tier 2 — blocks architecture**

5. Single market or multi-market at launch? Determines currency, language, and routing
   architecture, all of which are painful to retrofit.
6. One-time purchase, subscription, or both? Subscription changes the product page,
   the cart, and the entire account area.
7. Is there a B2B or wholesale requirement? A materially different storefront.
8. What is the actual mobile/desktop traffic split, if known?

**Tier 3 — blocks visual direction**

9. What photography exists *today*, and what is the budget to produce more?
10. Are the brand fonts licensed for web embedding?
11. Is there an existing brand guideline document, and is it binding or advisory?
12. Is there a legacy site being replaced? If so, what works about it? Replatforms
    routinely destroy value by discarding things that were quietly performing well.

**Tier 4 — refines execution**

13. Who are the direct competitors, in the client's own assessment?
14. What does the client believe is their unfair advantage?
15. What has been tried before and failed?
16. Who signs off, and what does that person care about?

---

## 4. How to supply the inputs

Any of these work:

- **Commit them to this repository** under `inputs/` — cleanest option, keeps
  everything versioned alongside the work.
- **Share links** (Drive, Dropbox, Figma, Notion) — I can fetch and read most sources.
- **Paste directly into chat** — fine for the SRS text and competitor URLs; not for fonts.

If the SRS does not exist in written form, answer §3 Tiers 1–2 in chat and I will
draft the SRS from your answers, return it for approval, and treat the approved
version as the source of truth from that point on.
