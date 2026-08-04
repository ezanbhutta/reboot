# Phases 2 & 3 — Research Protocol and Competitor Teardown

Method, defined before the subjects are known, so that findings are comparable and
the analysis cannot drift into post-hoc justification of a design we already like.

---

## 1. Principle

The purpose of studying other stores is **not** to assemble a mood board. It is to
build a causal model: *this decision exists because it solves that problem for that
buyer.* A pattern lifted without its cause is decoration, and decoration is the thing
that makes a premium storefront look expensive and convert badly.

Every observation gets recorded in three parts:

| Part | Question | Example |
|---|---|---|
| Observation | What is literally there? | Size guide opens in a side drawer, not a modal |
| Mechanism | What problem does it solve? | Keeps the variant selector visible while comparing, so the user does not lose their place |
| Transferability | Does that problem exist for us? | Only if our products have non-obvious sizing |

The third column is where most competitive research fails. A pattern that solves a
problem we do not have is a cost, not a feature.

---

## 2. Research scope

Four cohorts, each answering a different question.

**Direct competitors** — same product, same buyer, same price tier.
Question: *what are the table stakes?* Anything universal here is an expectation.
Violating an expectation costs conversion unless the replacement is clearly better.

**Category leaders** — the dominant players, possibly larger or better funded.
Question: *what has been proven at scale?* Their choices have been A/B tested against
volumes we do not have. Treat their patterns as evidence, not as gospel — large brands
also carry legacy decisions nobody has revisited.

**Aspirational / adjacent premium** — brands at the tier we intend to occupy, whether
or not they sell the same thing.
Question: *what does the quality bar look like?* This cohort is where the perceptual
gap gets opened. It is also the most dangerous to copy, because premium cues are
category-specific — the restraint that reads as luxury in skincare reads as sparse
and untrustworthy in technical equipment.

**Award-recognised builds** — Awwwards, FWA, CSSDA, and the Shopify Theme Store's
own top performers.
Question: *what is technically achievable and what does it cost?* This cohort is
sampled for craft and interaction quality, and audited hard for performance, because
award sites routinely trade Core Web Vitals for spectacle. Any pattern adopted from
here must survive the performance budget in
[`04-quality-standards.md §3`](04-quality-standards.md).

---

## 3. Teardown matrix

Every competitor is assessed against the same dimensions. Scored 1–5, with a written
note — the note carries the value, the score only enables sorting.

### Acquisition and first impression
| Dimension | What is assessed |
|---|---|
| Above-fold clarity | Can a first-time visitor state what is sold and for whom, in five seconds? |
| Value proposition | Is it specific, or interchangeable with any competitor? |
| Immediate trust | What signals appear before any scroll? |
| Load experience | What does the first second actually look like? Flash of unstyled text, layout shift, blank hold? |

### Navigation and discovery
| Dimension | What is assessed |
|---|---|
| Menu structure | Depth, breadth, labelling. Category names or marketing names? |
| Mega-menu use | Does it aid orientation or dump the sitemap on the user? |
| Search quality | Predictive? Typo-tolerant? Does it return content as well as products? |
| Filtering | Which facets, how presented, what happens on zero results |
| Sort defaults | What is the default order, and does it serve the user or the merchant? |
| Collection density | Products per row, card content, scannability |

### Product experience
| Dimension | What is assessed |
|---|---|
| Gallery | Image count, zoom behaviour, video, alternate angles, scale reference |
| Variant selection | Swatch vs. dropdown, out-of-stock handling, variant-linked imagery |
| Information depth | Where the detail lives: accordion, tabs, long scroll, separate page |
| Objection handling | Are the top three purchase objections answered on the page? |
| Social proof | Review placement, volume, quality, photo reviews, and whether it is credible |
| Cross-sell | Complements vs. alternatives, and whether it distracts from the primary action |
| Add-to-cart | Position, persistence on scroll, feedback on success |

### Conversion and checkout
| Dimension | What is assessed |
|---|---|
| Cart pattern | Drawer, page, or popup; and what it does to purchase intent |
| Cart reassurance | Shipping threshold, returns, security, delivery estimate |
| Checkout entry | How many clicks and how much friction from intent to payment |
| Express payments | Which wallets, and where they appear |
| Cost transparency | When shipping and tax become visible — late reveal is the classic abandonment cause |
| Post-purchase | Confirmation quality, tracking, what happens in the next 48 hours |

### Craft and technical
| Dimension | What is assessed |
|---|---|
| Typography | Scale, hierarchy, measure, rhythm |
| Spacing | Systematic or arbitrary |
| Motion | Purposeful, decorative, or actively obstructive |
| Mobile | Genuinely redesigned or a squeezed desktop layout |
| Accessibility | Contrast, focus visibility, keyboard operability, semantics |
| Performance | Core Web Vitals field data where available, lab data otherwise |

### Synthesis, per competitor
- Three genuine strengths, with the mechanism explained
- Three genuine weaknesses, with the cost to the customer named
- The single largest missed opportunity
- One sentence: what this brand *is* in the customer's head

---

## 4. Accessibility and performance auditing

Assessed with tooling, not opinion, because both are the dimensions competitors most
reliably neglect and therefore the cheapest places to build an advantage.

- **Performance**: Lighthouse for lab data on home, collection, and product templates.
  Chrome UX Report field data where the site has enough traffic to be included. Field
  data outranks lab data whenever both exist.
- **Accessibility**: automated pass with axe or equivalent to catch contrast and
  semantic failures, then a manual keyboard-only traversal of the full purchase path.
  Automated tooling reliably catches roughly a third of real WCAG failures — the
  keyboard traversal is where the meaningful findings come from.

Both feed directly into the standards in
[`04-quality-standards.md`](04-quality-standards.md).

---

## 5. Output

Two documents, produced once the competitor list is supplied:

**`docs/05-competitive-landscape.md`** — the completed matrix, per-competitor
teardowns, and a positioning map placing every player on the two axes that actually
matter in this category. Those axes are derived from the research, not assumed in
advance.

**`docs/06-strategy.md`** — the differentiation thesis. Specifically:
- The gap in the market, evidenced from the teardowns
- The experience principles we will hold, and what each one costs us
- Where we deliberately meet convention, because novelty in checkout is a tax on the user
- Where we deliberately break it, and the reasoning
- What we refuse to do, and why

The refusal list matters as much as the rest. A storefront that adopts every good
idea found in research becomes a collage. Strategy is the decision about what to
leave out.
