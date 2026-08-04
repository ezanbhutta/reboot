# Page Blueprints

Structural design: content hierarchy, layout rationale, interaction, responsive
behaviour, conversion strategy, accessibility, and Shopify implementation, per page.

**Not visual comps.** Those follow once the blockers close.

> ### Stated assumptions
> Two blockers remain open, so rather than stall, the blueprints proceed under
> explicit assumptions. Both are flagged where they bite.
>
> **A1 — Price band assumed $59–$89.** Above Coslus ($24–40), at or slightly above
> Waterpik ($50–100), consistent with "premium tech-lifestyle" and reachable for a Gen
> Z buyer. *If the real price lands below $45*, the product page should compress —
> less reassurance, faster path to cart. *If it lands above $120*, it needs an extra
> justification section and probably instalments. **Confirm before high fidelity.**
>
> **A2 — Specifications unknown (R8).** Every place a number belongs is marked
> `[SPEC]`. None will be invented, and copy will not be finalised around a claim that
> has no source.

---

# Home

### Goals
**User:** understand what this is, decide whether it's credible, and work out whether
it's for them — in under ninety seconds.
**Business:** convert a cold, sceptical visitor into a product-page visit, and
establish enough brand credibility that price is not the first objection.

### The argument, in order
Each section answers the question the previous one raises. That sequence is the design.

| # | Section | Answers | Why here |
|---|---|---|---|
| 1 | Hero | What is this? | — |
| 2 | Trust strip | Is this brand real? | Immediately, before scepticism sets |
| 3 | **The honest claim** | Does it replace floss? | **Second. The differentiator leads.** |
| 4 | How it works | How do I use it properly? | The claim raises "so how?" |
| 5 | Who it's for | Is this for me? | Technique understood, now self-identify |
| 6 | The object | What's it actually like? | Desire, after credibility |
| 7 | Comparison | Better than what I'd buy otherwise? | The buyer is now comparing |
| 8 | Why reboot | Why an unknown brand? | The final objection |
| 9 | Professionals | Does an expert back this? | Strongest available proof, near the decision |
| 10 | Reviews | What do buyers say? | Absent at zero count |
| 11 | FAQ | My specific worry? | Catches everything unresolved |
| 12 | Close | — | Final CTA + email |
| 13 | Footer | — | Navigation and trust |

### Section notes

**1 — Hero.** Product render on ink, occupying real space. One headline stating the
proposition, one line of support, one primary CTA, colourway indicator, price.

*Rationale:* the category's convention is a smiling model or a spec-laden banner.
Presenting the object alone, lit and quiet, does the tech-lifestyle positioning in one
move — and it is the only section where the CGI investment fully pays off.

*Critical:* the hero must not be full-viewport-height. That pattern hides the fact
that a page has content, and on mobile it pushes every trust signal below the fold.
Target roughly 78–85vh on mobile so the trust strip peeks — a deliberate scroll cue
that costs nothing.

**2 — Trust strip.** Warranty term `[SPEC]` · returns window · shipping · IPX rating
`[SPEC]`. Four facts, quiet, immediately under the hero.

*Rationale:* directly targets "evaluating a new brand" from the SRS. Coslus does this
in the masthead and it is their single best decision. Facts only — no badges, no
seals we do not hold.

**3 — The honest claim.** *The strategic centrepiece.* Large type, minimal
decoration: this does not replace string floss — it reaches what floss can't.

*Rationale:* the dominant objection in the category is disappointment born of
over-promising ([`07 §5`](07-competitive-landscape.md)). Every competitor makes it
worse. Volunteering the limitation is a costly signal, and it makes everything after
it believable. Placing it **second**, where competitors put a feature grid, is the
single most differentiating structural decision on the page.

*This is the section most likely to be argued about.* It looks like it weakens the
pitch. It does the opposite: it pre-empts the exact reason people abandon the category,
and it is the only claim on the page a competitor cannot copy without contradicting
their own marketing.

**4 — How it works.** The SRS-required animation, treated as a headline moment, not a
footnote. Technique-led: trace the gumline, don't blast the tooth face.

*Rationale:* people fail with water flossers because they use them wrong. Teaching
technique before purchase reduces returns, raises retention, and is the promise behind
"the one you'll still be using in six months."

*Interaction:* short silent loop, poster frame first, plays on scroll into view, pauses
out of view. Static diagram fallback under `prefers-reduced-motion`. Never autoplay
with sound.

**5 — Who it's for.** Braces · permanent retainers · implants and crowns · gum pockets
· gum recession · tight contacts · limited dexterity.

*Rationale:* drawn from real users describing why it worked for them. These are the
buyers who convert, retain and recommend. Most competitors bury them in generic
messaging; letting them recognise themselves in one glance is high-leverage and cheap.

*Honesty note:* the corresponding "not for" content lives in the FAQ. Feno's "who is
Feno not for?" is the best trust device on their site.

**6 — The object.** Detail crops from the 3D asset: finish, control surface, tank,
tip mount, charge contacts. Noise level `[SPEC]`, battery `[SPEC]`, tank `[SPEC]`.

*Rationale:* where "tech-lifestyle" is proven instead of asserted. Noise is a
category-wide acknowledged weakness — **if reboot is measurably quieter, this is the
headline differentiator and it belongs here.** Requires R8; will not be claimed
otherwise.

**7 — Comparison.** Against **string floss and category norms** — never named
competitors. More useful to the buyer, and legally safer.

**8 — Why reboot.** Warranty, returns, real support, and the honesty commitment.
Answers the last objection: why buy from someone with no track record?

**9 — Professional endorsement.** Named practitioners, credentials, practice, location.

*Rationale:* the highest-value proof available at launch. In this category
professional recommendation outranks review volume — real buyers cite "two dentists
told me," and specifically credit the *absence of commercial interest*. Presentation
must therefore look earned, not bought: credentials visible, tone plain, no stock
portraits. **Sourcing task, and it gates this section.**

**10 — Reviews.** Renders **absent, not empty**, at zero count (R6). No placeholder,
no "be the first to review."

**11 — FAQ.** Built from the real objections in
[`07 §5`](07-competitive-landscape.md), including disqualifying ones. Accordion,
first item open.

**12 — Close.** Final CTA plus email capture. The newsletter earns its place here,
after value has been demonstrated — never as an arrival popup.

### Responsive
Desktop composition is a wide asymmetric grid with generous gutters. Mobile is not a
squeeze — three sections are genuinely rebuilt:

- **Hero:** side-by-side product and copy becomes stacked, product first, with type
  scaled by ratio rather than clamped.
- **Comparison:** a table cannot stack. Becomes a single-axis stepper comparing one
  attribute at a time, or a horizontally scrolling table inside its own
  `overflow-x: auto` container — never a page that scrolls sideways.
- **Who it's for:** a seven-item desktop grid becomes a two-column list, not a carousel.

Persistent buy CTA appears in the mobile header after the hero leaves the viewport.

### Accessibility
One `<h1>` (hero). Sections as `<section>` with accessible names. Animation respects
`prefers-reduced-motion` and is never the sole carrier of information — the technique
must also be readable as text. Trust strip is text, not images. Accordion is a real
disclosure pattern with correct ARIA and keyboard operation. Contrast per the verified
tokens in [`08-strategy.md §3`](08-strategy.md); **the prohibited combinations are
prohibited, not "avoided where convenient."**

### Shopify implementation
Thirteen sections, all merchant-configurable, all reorderable, each with a designed
empty state. Hero, trust strip, honest claim, how-it-works, who-it's-for, object,
comparison, why-reboot, professionals, reviews, FAQ, close.

Practitioner entries and FAQ items as **metaobjects** — repeating structured content
that must scale without a developer. Comparison rows as section blocks.

*Section count is a real cost at this budget.* Several sections are the same
underlying flexible section — a media-and-text section with alignment and background
settings covers 3, 4, 6 and 8. **Build four or five section types, not thirteen.**
That is the difference between this being deliverable at $400–500 and not.

---

# Product page

The conversion page, and per Flow A the most common entry point on the site. **It must
work as a landing page for someone who has never heard of reboot.**

### Goals
**User:** confirm this is legitimate, works, is right for me, and is safe to buy.
**Business:** convert. Secondary: attach replacement tips — the only repeat mechanic
the business has.

### Above the fold

| Left / top | Right / buy box |
|---|---|
| Gallery — CGI angle set, both colourways, usage animation | Product name |
| | Price `[A1]` |
| | Short proposition — one sentence |
| | Colourway selector — 2 swatches |
| | **Add to cart** — ink fill, white label, 17.71:1 |
| | Express wallet buttons |
| | Shipping estimate · returns window · warranty `[SPEC]` |

**Variant selector:** two colourways, so swatches — never a dropdown. Each swatch
carries a visible text label as well as colour, because colour alone cannot be the sole
carrier of meaning. Selecting a colourway swaps the gallery via variant-linked media.
Out-of-stock colourway stays visible, clearly marked, with notify capture.

**Reassurance sits *in* the buy box, not below it.** Shipping, returns and warranty
are what a first-time buyer from an unknown brand needs at the moment of decision.
Deferring cost and returns information to checkout is the classic abandonment cause,
and per [`02 §5`](02-shopify-constraints.md) checkout is largely outside our control
regardless.

### Below the fold
Same argument as Home, compressed, plus the depth that closes the sale:

1. The honest claim *(condensed)*
2. **How to use** — the animation, in full
3. **Specifications** — complete, scannable, linkable `[SPEC]`
4. **What's in the box** — tips, charger, manual `[SPEC]`
5. Who it's for
6. Comparison
7. Professional endorsement
8. Reviews *(absent at zero)*
9. FAQ
10. Warranty and returns detail

*Section 3 is the one this page has that Home does not, and it exists for Flow C — the
comparison shopper who will not read narrative and is hunting for a reason to
disqualify. Complete numbers win that visitor; benefit copy where a number belongs
loses them.*

### Interaction
- Gallery: click or tap to advance, keyboard-navigable thumbnails, pinch-zoom on
  mobile. **No hover-only behaviour** — unavailable on touch.
- Sticky buy bar on mobile once the primary CTA scrolls away: name, price, colourway,
  add to cart. Must not obscure focus (WCAG 2.4.11).
- Add to cart opens the cart drawer with a clear success state. No full page reload.
- Specification table: sticky column headers on desktop; own scroll container on mobile.

### Conversion strategy
- Trust in the first viewport, not two-thirds down
- Total cost visible early — shipping stated before checkout
- Objections answered in the order they arise, not grouped at the end
- Replacement tips offered as a cart add-on, not an upsell interstitial
- **No fake urgency.** Real stock states only.

### Shopify implementation
`product.json` with sections. Variant-linked media for colourway switching. AJAX Cart
API for add-to-cart; **bundled section rendering** for cart updates, within the
five-section-per-request limit ([`02 §6`](02-shopify-constraints.md)). Specifications
as **metafields** so a second product inherits the template. Reviews via a Shopify app
— chosen for page weight, since a heavy review widget is the most common way a fast
theme becomes slow.

---

# Cart

**Drawer**, not a page. Preserves context, and with a single product there is no
basket-management complexity to justify a full page.

Contents: line item with colourway and thumbnail · quantity · **replacement tips
add-on** · subtotal · shipping threshold or estimate · returns and warranty reminder ·
express wallets · checkout.

*Rationale:* per [`02 §5`](02-shopify-constraints.md) the cart carries the conversion
work checkout cannot. Total cost transparency belongs here.

**Empty state designed:** a route back to the product with a reason to return.

---

# About / Brand Story

**User:** who is behind this? **Business:** convert "unknown brand" into "new brand
with a point of view."

The name is the story. *reboot* — starting over, doing the ordinary thing properly.
That maps directly onto the strategy: a category full of over-promising, and a brand
choosing to be straight about what its product does.

*What to avoid:* founder mythology, invented heritage, stock office photography. A new
brand claiming legacy is transparently false, and this audience is the least
forgiving of it. Short, specific, honest — including that reboot is new. **Being new
is not a weakness to conceal; concealing it is.**

Ends with a route to the product. No dead ends.

---

# Contact & Warranty Claim

**Contact:** form plus real alternatives — email, response-time commitment, links to
shipping, returns and warranty. Response time is a trust signal for an unknown brand;
state it and honour it.

**Warranty Claim:** SRS-required, and correctly so. Order number, purchase date, issue
description, photo upload, contact details. Clear eligibility statement up front, and
an explicit "what happens next" with a timeline.

*Rationale:* this page is the proof behind the promise the product page makes. A
frictionless claim flow is a conversion asset — it is what makes the warranty
credible. Design it as carefully as the product page, not as an afterthought.

*Implementation:* Shopify's form handling covers this. If file upload is required, it
needs an app or a form service — **scope check against budget**.

---

# Policies

Shared template, four documents. Legally required, and read far more often than teams
expect — Flow C reads returns before buying.

Designed for reading, not compliance theatre: proper measure (45–75 characters),
clear headings, real hierarchy, anchor navigation. Plain-language summary at the top
of Shipping and Returns, with full terms below. **A returns policy that is easy to
read is a conversion asset**; one that looks like it is hiding something is a cost.

---

# 404 & Search

**404:** designed. Brand mark, plain language, two routes out — product and support.
**Search:** must work and never look broken. With one SKU, effectively every query
should resolve to the product page. Zero-results state routes there explicitly.

---

## Build order

Given the timeline (R2) and budget (R1):

**Launch:** Home · Product · Cart · Policies ×4 · Contact · 404
**Fast-follow:** About · Warranty Claim · Search refinement

Warranty Claim is fast-follow only if the warranty terms are clearly stated at launch
and claims can be handled by email in the interim. **The promise must be live at
launch even if the form is not.**

---

## Open items before high fidelity

| # | Item | Blocks |
|---|---|---|
| 1 | **Retail price** (A1) | Product page architecture |
| 2 | **Specification sheet** (A2 / R8) | Every `[SPEC]`, the object section, comparison |
| 3 | **3D/CAD asset** (R5) | Hero, gallery, the required animation |
| 4 | Aloevera files + web licence (R4) | Type system |
| 5 | Practitioner sourcing | Professional endorsement section |
| 6 | Warranty term, returns window, shipping terms | Trust strip, buy box, policies |

Items 1–3 remain the true blockers. Everything else proceeds in parallel.
