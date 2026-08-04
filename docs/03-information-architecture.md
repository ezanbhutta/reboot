# Phase 7 — Information Architecture

The journey model and the structural patterns that will carry it. Page-level
specifics — actual category names, actual page inventory — are downstream of the SRS
and marked as such throughout.

---

## 1. Journey model

The eleven-stage journey is a sequence of **questions in the customer's head**. Each
stage exists because the customer has a question, and the page's job is to answer it
and hand over the next one. A stage that does not answer its question produces a
drop-off; a stage that answers a question nobody asked produces friction.

| Stage | The customer is asking | The page must deliver | Failure looks like |
|---|---|---|---|
| Landing | What is this, and is it for me? | Category, positioning, and audience fit within one viewport | Beautiful hero, no idea what is sold |
| Discovery | What is here? | A legible route into the catalogue | Users bounce to search because navigation is opaque |
| Trust | Can I believe this? | Evidence — proof, provenance, guarantees | Claims with nothing behind them |
| Exploration | What are the options? | Scannable comparison and filtering that works | Endless grid, no way to narrow |
| Education | How does this work, and is it right for me? | Substantive answers before the product page | Objections surface at checkout instead |
| Comparison | Which one? | Genuine differentiation between similar products | Six products, one description, paralysis |
| Decision | Is this the right choice, at this price? | Objection resolution at the point of hesitation | Add-to-cart with unanswered doubt |
| Purchase | Is this safe and complete? | Total cost, delivery, returns, security — early | Cost surprise at checkout |
| Post-purchase | Did it work? What now? | Confirmation, tracking, expectation-setting | Silence, then support tickets |
| Retention | Why come back? | A reason grounded in product, not discounting | Discount treadmill that erodes the brand |
| Advocacy | Would I recommend this? | Something worth telling people about | Nothing memorable |

Two structural rules follow.

**No dead ends.** Every terminal state needs an exit: zero search results, empty cart,
out-of-stock product, 404, filtered-to-nothing collection, cancelled order. These are
the highest-intent moments on the site — the user wanted something specific and did
not get it — and they are almost universally under-designed. They will be designed
here as first-class screens, not afterthoughts.

**Non-linearity is normal.** Real customers arrive from search or paid social directly
onto a product page, having skipped Landing, Discovery, Trust and Education entirely.
The product page therefore has to work as a *landing* page: it must independently
establish what the brand is, why it is credible, and what else exists. This is a
central design requirement, not an edge case, and for many stores the product page is
the single highest-traffic entry point on the site.

---

## 2. Structural patterns

### Global header
Persistent, and the primary orientation device. Contains: logo, primary navigation,
search, account, cart with item count. Sticky behaviour must be decided against the
mobile viewport budget — a tall sticky header on a small phone can consume a
meaningful share of the above-fold area on every scroll.

Constraint: 3 levels of menu nesting (see
[`02-shopify-constraints.md §4`](02-shopify-constraints.md)).

### Navigation strategy
Selected on catalogue shape, once known:

- **Small catalogue (under ~50 SKUs)** — flat navigation, curation-led. Collections
  become editorial statements rather than filing cabinets. Storytelling carries the
  weight that filtering would otherwise carry.
- **Medium (~50–500)** — two-level navigation, mega-menu with category imagery,
  filtering becomes genuinely necessary.
- **Large (500+)** — full three-level taxonomy, search becomes a primary path rather
  than a fallback, filtering and merchandising infrastructure become central. Watch
  the 5,000-product filtering cut-off.

Labels come from customer vocabulary, not internal vocabulary. This gets validated
with a card sort or tree test if any budget for research exists — navigation labelling
is the single cheapest research intervention available and it consistently finds
mismatches that internal teams cannot see.

### Product discovery
Collection pages as merchandising surfaces, not just grids. Card content decided by
what actually drives selection in this category — for some products the differentiator
is colour, for others it is price, capacity, material, or review count. This is
determined in intake, not assumed.

Quick-view is deliberately held as an open question. It reduces clicks but also
reduces the depth of information reaching the customer, and for considered purchases
it can suppress conversion by short-circuiting exactly the education the buyer needed.
Decision deferred until the price tier is known.

### Product page
The most important template. Structure resolves once product complexity is known,
but the invariants are:

- Gallery and buy-box above the fold on desktop; buy-box reachable without hunting on mobile
- Variant selection that never leaves the user uncertain about what is selected or available
- Out-of-stock states that offer a route forward — notify, alternative variant, similar product
- The top three purchase objections answered *on the page*, in the order they arise
- Reviews positioned as evidence, not decoration
- Cross-sell that complements rather than competes with the primary action

### Cart
Carries the conversion work that checkout cannot (see
[`02-shopify-constraints.md §5`](02-shopify-constraints.md)): total cost transparency,
delivery expectation, returns terms, security signals, express payment.

Drawer versus page decided on catalogue and basket behaviour. Drawer preserves
browsing context and suits multi-item baskets; a full page gives room for reassurance
and suits single-item considered purchases.

### Account
Scope entirely dependent on the SRS. Order history, tracking, addresses, reorder,
wishlist, subscription management — each is a requirement to confirm, not to assume.
Guest checkout availability is a Tier 1 question, since forced registration is one of
the most reliably documented causes of checkout abandonment.

### Content and editorial
Justified only where it does commercial work: answering objections, demonstrating
use, establishing provenance, or capturing search demand. Editorial that exists to
make the brand feel substantial, without answering a question anyone has, is cost.

Where a content type has repeating structure — guides, materials, ingredients,
techniques, people — it should be modelled as metaobjects with their own templates
rather than as one-off pages, so the content library scales without a developer.

---

## 3. Deliverables, once inputs land

**`docs/07-sitemap.md`** — full page inventory mapped to Shopify template types
(`index`, `collection`, `product`, `page`, `blog`, `article`, `search`, `cart`,
`customers/*`, `metaobject/*`, `404`), with template variants identified where
different product types need different treatments.

**`docs/08-user-flows.md`** — the critical paths, documented with decision points and
failure branches:
- First-time visitor → purchase
- Paid-social arrival → product page → purchase
- Returning customer → reorder
- Search-driven → filtered collection → comparison → purchase
- Gift purchase (if applicable — a materially different flow, since buyer and recipient differ)
- Out-of-stock recovery
- Cart abandonment and return

**`docs/09-wireframes.md`** — structural reasoning per template: content hierarchy,
section order, and the argument for each, before any visual treatment is applied.
