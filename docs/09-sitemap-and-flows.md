# Information Architecture — Sitemap, Templates, User Flows

Applies [`03-information-architecture.md`](03-information-architecture.md) to reboot
specifically. Governed by [`08-strategy.md`](08-strategy.md).

---

## 1. The defining structural fact

**One product, two colourways.** Almost every convention of Shopify IA assumes a
catalogue, and none of that machinery applies here. There is nothing to browse,
nothing to filter, nothing to compare, and no meaningful search.

This is not a limitation. It is the most favourable possible structure, because it
removes the hardest problem in e-commerce — getting the right person to the right
product — and leaves only the second-hardest: persuasion. **Every visitor already
knows what we sell within one second of arrival.** The entire site can be pointed at
a single decision.

The consequence: **the homepage and the product page are the same argument at two
lengths.** They must not be two different arguments, and they must not be identical
either. Home is the case for the brand and the category; Product is the case for the
purchase, with the specification depth that closes it.

### The trap to avoid
The single-product store's characteristic failure is padding — inventing collections,
categories and bestsellers to look like a real shop. That is exactly what
[`08-strategy.md §4`](08-strategy.md) cut. A confident single-product site reads as
focused; a padded one reads as a dropshipper. **Never simulate catalogue depth.**

---

## 2. Sitemap and Shopify template mapping

| Page | Shopify template | Priority | Notes |
|---|---|---|---|
| Home | `index.json` | Launch | Full section stack |
| Water Flosser | `product.json` | Launch | The conversion page |
| Cart | `cart.json` | Launch | Drawer primary; page as fallback |
| Contact | `page.contact.json` | Launch | Form + support routes |
| Shipping Policy | `page.policy.json` | Launch | Shared policy template |
| Returns Policy | `page.policy.json` | Launch | |
| Privacy Policy | `page.policy.json` | Launch | |
| Terms | `page.policy.json` | Launch | |
| About / Brand Story | `page.about.json` | Launch if time, else fast-follow | |
| Warranty Claim | `page.warranty-claim.json` | Fast-follow | Form-driven |
| Search results | `search.json` | Minimal | Must exist and not be broken |
| 404 | `404.json` | Launch | Designed, not default |

**Deliberately absent:** collection pages, blog, customer accounts.

- **Collection pages** — one product. `/collections/all` will exist because Shopify
  creates it; it gets a redirect to the product page rather than a designed template.
- **Blog** — the SRS does not request it and there is no budget for content
  production. An empty blog is worse than none. Architecture leaves room.
- **Customer accounts** — the SRS does not request them. **Guest checkout only at
  launch.** Forced registration is among the best-documented causes of checkout
  abandonment, and with no repeat-purchase mechanic there is nothing for an account to
  do yet. Shopify's accounts can be switched on later without redesign.

### Navigation

With four to six destinations, a mega-menu would be absurd. **Flat, single-level.**
Menus support three levels of nesting; using one is the correct answer here.

```
Header:   [oo]  reboot        Water Flosser · How It Works · Support        [Cart]
```

- **Water Flosser** → the product page. Named for the product, not "Shop" — with one
  product, "Shop" is a wasted click and an evasion.
- **How It Works** → anchor to the homepage technique section. Elevating this into
  primary navigation is a deliberate strategic statement: it is the brand's whole
  differentiator, per [`08-strategy.md §2`](08-strategy.md).
- **Support** → Contact, Warranty, Shipping, Returns, FAQ.

No search in the header at launch — one product makes it decorative, and it costs
space that matters on mobile. The `/search` template still exists and works.

**The persistent CTA.** Because there is one product at one price, the header can
carry a permanent buy action. This is unavailable to most stores and is a real
structural advantage: the decision is never more than one tap away, from any scroll
position, on any page.

### Future-catalogue readiness *(SRS: "room for future product launches")*

The architecture must absorb a second product without a rebuild:

- Every section built as a Shopify section with settings, never hard-coded to this SKU
- Product-specific content in **metafields**, so a second product inherits the template
- Repeating content — specifications, FAQ entries, practitioner endorsements — modelled
  as **metaobjects**, per [`02-shopify-constraints.md §1`](02-shopify-constraints.md)
- Header navigation designed so "Water Flosser" becomes a two-item menu without
  restructuring
- A collection template stubbed but unpublished

Costs a little now. Saves the entire build later.

---

## 3. User flows

Four flows carry essentially all traffic. Each is documented with its decision points
and its failure branch.

### Flow A — Paid social arrival → product page → purchase
**The dominant flow.** A Gen Z audience for a new DTC brand arrives overwhelmingly
from Meta and TikTok, on mobile, landing directly on the product page.

```
Ad → Product page → [scroll: is this real?] → Colourway → Add to cart
   → Cart drawer → Checkout → Confirmation
```

Critical property: **the product page must work as a landing page.** The visitor has
skipped the homepage, has never heard of reboot, and arrives sceptical. Within the
first viewport the page must establish what it is, what it costs, and why an unknown
brand is safe to buy from.

*Decision points:* Is this legitimate? · Does it actually work? · What if it's wrong?
*Failure branch:* bounce before first scroll — mitigated by trust signals in the
first viewport, not two-thirds down the page.

### Flow B — Homepage → education → product → purchase
The considered path. Organic, referral, or word of mouth.

```
Home → honest claim → how it works → who it's for → comparison
     → professional endorsement → Product → Add to cart → Checkout
```

The homepage's job is to convert scepticism into interest before the price is the
question. By the time this visitor reaches the product page they are pre-sold and
need only specification confirmation.

*Failure branch:* scroll-depth drop-off — mitigated by placing the strongest
differentiator (the honest claim) second, not eighth.

### Flow C — Comparison shopper
Has a Waterpik tab and an Amazon tab already open.

```
Arrival → straight to specs → comparison → reviews → FAQ → price → decision
```

This visitor is hunting for reasons to disqualify. They want numbers, warranty terms
and returns policy fast, and they will not read narrative.

*Design implication:* the specification block must be **linkable, scannable and
complete.** Vague benefit copy where a number belongs actively loses this visitor.
This is the buyer most damaged by risk R8 — a missing spec sheet costs the sale.

### Flow D — Post-purchase → support / warranty
```
Order → confirmation → delivery → [problem?] → Support → Warranty Claim → resolution
```

The SRS requires a dedicated Warranty Claim page, which signals correctly that the
brand expects to stand behind the product. **A frictionless warranty flow is a
conversion asset, not a cost centre** — it is the proof behind the promise made on the
product page, and for a brand nobody has heard of that promise is doing a great deal
of work.

### Failure states — designed, not defaulted
Per the no-dead-ends rule:

| State | Requirement |
|---|---|
| Out of stock | Email notify capture. **Realistic for a single-SKU launch** — must be designed, not discovered. |
| One colourway out of stock | Variant remains visible and clearly unavailable, with notify. Never silently hidden. |
| Empty cart | Route back to the product with a reason to return. |
| 404 | Designed. Two routes out: product, support. |
| Search, no results | Route to the product page — with one SKU, every search should end there. |
| Form error | Inline, specific, adjacent to the field. |

---

## 4. The journey, mapped to sections

The eleven-stage model from `03`, applied. Note how few stages the homepage owns
before handing over — the site is short by design.

| Stage | Where it happens | The question |
|---|---|---|
| Landing | Hero | What is this? |
| Trust | Trust strip, warranty terms | Is this brand real? |
| Education | Honest claim, how it works | Does it work, and will it work *for me*? |
| Exploration | Who it's for, the object | Is this for someone like me? |
| Comparison | Comparison, specifications | Better than what I'd otherwise buy? |
| Decision | Professional endorsement, reviews, FAQ | Any reason not to? |
| Purchase | Buy box, cart | Is this safe and complete? |
| Post-purchase | Confirmation, support | What happens now? |
| Retention | Tip replacement, email | Why come back? |

**Retention is the weak stage and it needs naming.** A water flosser is a one-time
purchase; the only recurring revenue is replacement tips. That should be built in from
launch — tips as an add-on in the cart, and a replacement reminder in the email flow —
because it is the only repeat mechanic the business has, and retrofitting it later
means re-approaching customers who have already forgotten the brand.

→ Section-by-section blueprints: [`10-page-blueprints.md`](10-page-blueprints.md)
