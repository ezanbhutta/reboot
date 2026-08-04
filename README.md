# reboot — Premium Shopify Commerce Experience

Design programme for **reboot**, a consumer electronics tech-lifestyle brand launching
its first product — a water flosser — on Shopify.

Strategy, research, architecture and standards. Everything here precedes visual design
and governs it.

## Status

**Phases 1–3 and 5–14 complete.** All project inputs received and read: SRS v1.0
(8 July 2026), brand package (`RebootMe_r2`), and both reference sites. Structural
design — sitemap, flows and page blueprints — is complete and committed.

**High-fidelity visual design is not started.** Three blockers change page *structure*
and *content*, not just styling, so designing before they clear would mean rework:

| # | Blocker | Why it changes the design |
|---|---|---|
| 1 | **Retail price** | Under $50 optimises for speed to cart; over $100 needs sustained reassurance. Different page architecture. |
| 2 | **Product specification sheet** | No claim gets written without a source. Several specs are candidate differentiators. |
| ~~3~~ | ~~**3D / CAD asset availability**~~ | **Resolved 4 Aug** — a CAD-derived Blender model (34 components, 172k faces, already UV-unwrapped) was supplied. The full CGI pipeline, including the required usage animation, is viable. |

Unblocked and running in parallel: font licence, practitioner sourcing, warranty and
shipping terms, plan confirmation, launch scope split.

Full detail: [`06-phase1-extraction.md §4`](docs/06-phase1-extraction.md).

## Documents

| Document | Phase | Contents |
|---|---|---|
| [`00-intake-brief.md`](docs/00-intake-brief.md) | 1 | Extraction schema and input checklist *(inputs now received)* |
| [`01-research-protocol.md`](docs/01-research-protocol.md) | 2–3 | Research method, teardown matrix, scoring rubric |
| [`02-shopify-constraints.md`](docs/02-shopify-constraints.md) | 6 | Platform feasibility envelope, verified against shopify.dev |
| [`03-information-architecture.md`](docs/03-information-architecture.md) | 7 | Journey model, navigation strategy, structural patterns |
| [`04-quality-standards.md`](docs/04-quality-standards.md) | 11–14 | Responsive, WCAG 2.2 AA, Core Web Vitals, quality gate |
| [`05-imagery-strategy.md`](docs/05-imagery-strategy.md) | 4, 8 | CGI-first asset strategy and launch asset list |
| [`06-phase1-extraction.md`](docs/06-phase1-extraction.md) | 1 | SRS extraction, brand decode, contrast audit, risk register |
| [`07-competitive-landscape.md`](docs/07-competitive-landscape.md) | 2–3 | Reference and competitor teardowns, customer psychology |
| [`08-strategy.md`](docs/08-strategy.md) | 5, 10 | Positioning, differentiation thesis, content architecture |
| [`09-sitemap-and-flows.md`](docs/09-sitemap-and-flows.md) | 7 | Sitemap, Shopify template mapping, user flows, failure states |
| [`10-page-blueprints.md`](docs/10-page-blueprints.md) | 7, 9–12 | Section-by-section blueprints for every page |

## The three findings that shape everything

**1. The brand blue fails WCAG on white.** `#089DE1` measures **3.03:1** on white —
failing AA for body text, and failing for white text on a blue button. On ink it
reaches **5.84:1**. The palette as delivered wants a dark canvas, and that finding
converges with product presentation, differentiation from a uniformly white category,
and the logo's strongest treatment. Derived accessible variant `#067EB4` (4.52:1 on
white) covers blue text on light grounds. Full audit in
[`06-phase1-extraction.md §2`](docs/06-phase1-extraction.md).

**2. The category manufactures its own disappointment.** The dominant customer
objection is not price — it is *"I bought one and it didn't seem to do anything, so I
stopped."* Three documented causes: over-promised visible payoff, replace-vs-supplement
confusion, and incorrect technique. Every competitor makes all three worse. reboot's
position is built in that gap, and it makes the SRS's required how-to-use animation
the strategic centrepiece rather than a nice-to-have. See
[`07-competitive-landscape.md §5`](docs/07-competitive-landscape.md).

**3. Seven of the briefed sections were cut.** Featured Collections, Product
Categories, Best Sellers, Before & After, Media Mentions, Social Gallery and
Sustainability have no strategic purpose for a one-product launch with no trading
history — several would actively signal "template." Adjudication in
[`08-strategy.md §4`](docs/08-strategy.md).

## Working rules

- The SRS is the source of truth. No invented features, no contradicted requirements.
- No claim without a source — product, health, or performance.
- No fabricated social proof, no fake urgency, no arrival popups.
- No AI or technology framing, per brief.
- Every component clears the Shopify feasibility checklist before high fidelity.
- Plan-agnostic: nothing depends on Shopify Plus.

## Inputs

Under [`inputs/`](inputs/) — brand source artwork and logo mockups. The SRS is held
with the project owner; its full extraction is in `06-phase1-extraction.md`.
