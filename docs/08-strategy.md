# Strategy — Positioning, Differentiation, Content Architecture

Derived from [`06-phase1-extraction.md`](06-phase1-extraction.md) and
[`07-competitive-landscape.md`](07-competitive-landscape.md). This is the argument the
site has to make. Every layout decision downstream answers to it.

---

## 1. The strategic problem

reboot is launching one OEM-class water flosser, at an undetermined price, with no
reviews, no press, no trading history, into a mature category with a dominant
incumbent and a crowded field of near-identical value brands.

On paper the product is comparable to competitors. **Specification will not win this.**
Anything reboot claims about pressure, modes or tank capacity, Coslus claims too, for
$29, with 604 reviews.

So the site cannot succeed by being a better spec sheet. It has to make the buyer
*want this one*, and it has to do it while the brand is a complete unknown.

---

## 2. The differentiation thesis

The research surfaced something every brand in this category is ignoring.

The dominant customer objection is not price, and it is not efficacy in the abstract.
It is **"I bought one and it didn't seem to do anything, so I stopped using it."**
That failure has three documented causes: people expect a dramatic visible payoff that
often never comes; people are told it replaces string floss when it complements it;
and people aim it at their teeth instead of tracing the gumline, so it genuinely does
not work for them.

Every competitor makes this worse. They over-promise the dramatic version, imply
replacement, and treat technique as an afterthought in a manual nobody reads. The
category is manufacturing its own disappointment, at scale.

### The position

> **reboot makes the water flosser you'll actually still be using in six months.**

Honest about what it does and doesn't do. Obvious about how to use it properly.
Designed well enough that you're happy to leave it on the counter.

Three pillars, each grounded in a research finding rather than an assertion:

**Honesty as the premium signal.** Say plainly that this works alongside string floss,
not instead of it. Say plainly that it's exceptional at the gumline and at the places
floss can't reach — braces, retainers, implants, gum pockets — and that it's not a
magic trick. A brand willing to tell you what its product *isn't* becomes believable
about what it is. This is the cheapest credibility available to a brand with no
reviews, and it costs nothing but nerve. Feno demonstrates the mechanism with its
"who is Feno not for?" FAQ; nobody in the water flosser tier does it at all.

**Technique as the product.** The SRS already requires a how-to-use animation. The
research elevates it from requirement to centrepiece: it is the direct remedy for the
category's primary failure mode. reboot should be the brand that actually teaches you
to use the thing properly — visibly, on the product page, before purchase, not in a
folded leaflet. This is a genuine competitive moat, because it is a content investment
rather than a hardware feature, and it is exactly what the budget can deliver well.

**An object, not equipment.** Waterpik owns efficacy and authority; it does not own
desire. Its products look like medical devices. For a Gen Z buyer in a small or shared
bathroom, how the object looks and how loud it is are real considerations, not
secondary ones. reboot's tech-lifestyle framing is the whole opening — provided the
site treats the product as a designed object rather than an appliance.

### What this rules out
Loudest, strongest, most-modes positioning. Clinical-authority positioning — Waterpik
owns it and reboot has no evidence. Price-led positioning — Coslus owns it and it caps
the brand permanently. And any technology framing, which is both explicitly out of
bounds and the exact trap Feno fell into.

---

## 3. Visual direction

Direction and rationale only. Layouts follow once the blockers in
[`06-phase1-extraction.md §4`](06-phase1-extraction.md) clear.

### The dark canvas — argued, not assumed
The contrast audit found the brand blue reaches only **3.04:1 on white** (failing AA
for body text and for white-on-blue buttons) but **5.83:1 on ink**. The palette as
delivered performs properly on a dark ground.

Four independent reasons converge on the same answer:

1. **Accessibility** — the blue is only fully usable on ink.
2. **Product presentation** — glossy consumer electronics read best against dark. It
   is how the category's best product photography has always been lit, and it is what
   "sleek, minimal, premium, glossy" in the SRS actually looks like when executed.
3. **Differentiation** — Coslus and Waterpik are both bright, white, clinical. A dark
   canvas separates reboot instantly, in the category's own visual language.
4. **The brand mark** — the `oo` monogram is strongest reversed.

**The critical distinction.** Dark here means *product stage* — a photographer's
sweep, deep neutral ink, one precise accent — not dark-mode SaaS. Explicitly excluded:
neon glows, violet gradients, glassmorphism, grid overlays, particle fields, and every
other cue that would read as a technology company. The reference points are premium
consumer-electronics presentation and gallery lighting, not software product pages.

Light sections are used deliberately for contrast — editorial passages, FAQ, policies
— so the dark is a decision rather than a default.

### Colour tokens

| Token | Value | Use | Verified |
|---|---|---|---|
| `ink` | `#15191A` | Primary canvas, primary CTA fill | 17.71:1 with white |
| `white` | `#FFFFFF` | Primary text on ink, light canvas | |
| `blue-display` | `#079DE0` | Accent on ink, large display type, the mark | 5.83:1 on ink |
| `blue-text` | `#067EB3` | Links and blue text at body size on light | 4.52:1 on white — derived |
| `grey-light` | `#E6E6E6` | Light section grounds, dividers | 14.19:1 with ink |

**Prohibited:** brand blue on light grey (2.44:1 — fails even 3:1); brand blue body
text on white; white text on a brand-blue fill.

**Primary CTA:** ink fill, white label — 17.71:1. Accessible, and more premium than a
saturated blue button. The blue stays a precise accent, which is what makes it read as
considered rather than decorative.

### Typography
Aloevera across the system once the files and licence land (risk R4). Geometric sans
with a single-storey `a` — friendly, modern, correct for the audience, and consistent
with the logo construction.

Six weights are supplied; **the build will use three at most** — likely Light or
Regular for body, Medium for interface, and Bold or Black for display. This is a
performance decision under the budget in
[`04-quality-standards.md §3`](04-quality-standards.md): each additional weight is a
request in the critical path, and the SRS demands fast load.

With minimal imagery at launch, the type scale carries the composition. It needs to be
wide — genuinely large display sizes against genuinely quiet body text — since that
contrast is what produces presence without photography.

### Motion
The SRS requires smooth animation throughout, and it is a stated brand expectation.
The discipline that keeps it from becoming decoration:

- `transform` and `opacity` only — nothing that triggers layout, so INP stays intact
- Motion reveals structure: sections resolve, they do not perform
- One signature interaction, not many — the `oo` monogram's counter-rotation is the
  natural candidate, used sparingly for loading and scroll cues
- `prefers-reduced-motion` honoured everywhere
- Anything that cannot be justified in one sentence about what the user understands
  better because of it does not ship

---

## 4. Content architecture — adjudicated

The brief supplied a candidate section list with the instruction that every section
must earn its place. Applied strictly against one product, two colours, zero reviews
and no trading history.

### Rejected

| Section | Why |
|---|---|
| **Featured Collections** | There is one product. A collections section misrepresents catalogue depth and reads as an unfilled template. |
| **Product Categories** | Same. One product, one category. |
| **Best Sellers** | A single product cannot have a bestseller. This is the clearest "template" signal on the list. |
| **Before & After** | reboot has no clinical or product testing. Feno shows plaque imagery and still disclaims it. Fabricating or borrowing this would be a trust catastrophe in a health-adjacent category. **Revisit when real data exists.** |
| **Media Mentions** | A pre-launch brand has none. Design the slot; hide the section until it is true. |
| **Instagram / Social Gallery** | No audience, no UGC. An empty or thin grid is worse than absence. **Phase 2**, once the review-photo engine has run. |
| **Sustainability** | Only with a genuine, specific commitment. A vague statement in this position actively reduces trust. Replaced by a **quality and warranty** commitment, which reboot can substantiate. |

Seven sections removed. That is the brief's own instruction applied honestly, and the
result is a site that never displays an empty shelf.

### Retained, each with its job

| Section | The question it answers | Notes |
|---|---|---|
| **Hero** | What is this and who is it for? | Product as object, on ink. One proposition, one action. |
| **Value proposition** | Why this one? | The three pillars, stated plainly. |
| **The honest claim** | Does it replace floss? | *New, and the strategic centrepiece.* Answers the category's core confusion before it becomes distrust. No competitor has this. |
| **How it works** | How do I use it properly? | The SRS-required animation. The remedy for the primary failure mode — treated as a headline section, not a footnote. |
| **Who it's for** | Is this for me? | Braces, retainers, implants, gum pockets, recession, dexterity. Lets high-intent buyers self-identify fast. |
| **Product benefits** | What do I get? | Mechanical truth only. Pending spec sheet (R8). |
| **Product highlights** | What is it actually like? | Object-led: finish, form, noise, tank, charge. Where "tech-lifestyle" is proven rather than claimed. |
| **Comparison** | How does it compare? | Against **string floss and category norms**, not named competitors — more useful and legally safer. |
| **Why choose us** | Why an unknown brand? | Warranty, returns, support, honesty. Directly targets "evaluating a new brand." |
| **Professional endorsement** | Does a credible expert back this? | *Highest-value proof available at launch* — the research shows dentist recommendation is the category's trust anchor. Requires genuine practitioners with verifiable credentials. **Sourcing task.** |
| **Reviews** | What do buyers say? | SRS-required. Must render **absent, not empty**, at zero count (R6). |
| **Trust indicators** | Is this safe to buy? | Warranty term, returns window, shipping, IPX rating. |
| **FAQ** | My specific worry? | Built directly from the objections in `07 §5`, including the disqualifying ones. |
| **Shipping** | When does it arrive? | Above the fold in cart, not deferred to checkout. |
| **Returns & warranty** | What if it's wrong? | Plus the SRS's dedicated Warranty Claim page. |
| **Newsletter** | — | SRS-required email capture. Earned in context, never an arrival popup. |
| **CTA sections** | — | Rhythmic, at natural decision points. |
| **Footer** | — | Real navigation and trust content, not a link dump. |

### Conditional
**Certifications** — include only what is genuinely held. IPX waterproof rating is
likely real and worth showing. ADA Seal only if actually awarded. Pending R8.

---

## 5. What we refuse to do

Recorded so these stay decisions rather than drifting:

- **No fabricated social proof.** No invented reviews, stock "customers," or borrowed
  press logos. Gen Z is the demographic most practised at detecting this, and the
  downside is unrecoverable.
- **No unsubstantiated health claims.** Mechanical truth only, until there is evidence.
- **No fake urgency.** No countdown timers, no invented stock counts, no fabricated
  viewer numbers.
- **No arrival popup.** Email capture is earned after value is shown.
- **No AI or technology framing.** Explicitly out of bounds, and it is the trap the
  primary reference fell into.
- **No auto-rotating hero carousel.** Coslus's weakest pattern, and among the
  best-documented conversion-neutral-to-negative devices in e-commerce.
- **No duplicated desktop/mobile markup.** The specific mechanism making both reference
  sites heavy. One DOM, responsive.
- **No named-competitor comparison.** Compare against string floss and category norms.

---

## 6. Next

Content architecture is settled. **Wireframing does not begin until the three true
blockers clear**, because each one changes the structure rather than the styling:

1. **Retail price** — determines whether the product page optimises for speed to cart
   or for sustained reassurance
2. **Product specification sheet** — no claim gets written without a source
3. **3D/CAD asset availability** — determines whether the hero and the required usage
   animation are achievable, and on what timeline

Immediately actionable in parallel, and not blocked:
- Aloevera font files and web licence (R4)
- Practitioner sourcing for professional endorsement
- Warranty term, returns window, shipping terms
- Confirmation of the actual Shopify plan (R3)
- Launch scope split given the August date (R2)
