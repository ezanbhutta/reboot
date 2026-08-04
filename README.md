# Reboot — Premium Shopify Commerce Experience

Design programme repository. This holds the strategy, research, architecture and
quality standards that govern the storefront before a single screen is designed.

## Current status

**Phase 1 (Project Understanding) is blocked.** The repository contains no project
inputs. Nothing has been designed, and nothing will be, until the source-of-truth
material arrives — inventing a brand would violate the first rule of this engagement.

| Input | Status | Blocks |
|---|---|---|
| SRS / requirements document | **Missing** | Everything downstream |
| Brand logo files | **Missing** | Identity, header lockup, favicon, OG assets |
| Brand fonts + licences | **Missing** | Type system, performance budget |
| Brand assets (photography, illustration, palette) | **Missing** | Visual language, art direction |
| Inspiration references | **Missing** | Calibration of the quality bar |
| Competitor list | **Missing** | Phase 3 teardown |

See [`docs/00-intake-brief.md`](docs/00-intake-brief.md) for exactly what is needed
and why each item changes design decisions.

## What is complete

Work that is genuinely independent of the brand has been done in full:

| Document | Phase | Contents |
|---|---|---|
| [`00-intake-brief.md`](docs/00-intake-brief.md) | 1 | Extraction schema, open questions, input checklist |
| [`01-research-protocol.md`](docs/01-research-protocol.md) | 2–3 | Research method, competitor teardown matrix, scoring rubric |
| [`02-shopify-constraints.md`](docs/02-shopify-constraints.md) | 6 | Verified platform limits and their design consequences |
| [`03-information-architecture.md`](docs/03-information-architecture.md) | 7 | Journey model, page inventory, navigation patterns |
| [`04-quality-standards.md`](docs/04-quality-standards.md) | 11–14 | Responsive, accessibility, performance, QA gate |

Every platform limit cited in `02-shopify-constraints.md` was verified against
shopify.dev at time of writing and carries a source link. None of it is recalled
from memory.

## What is deliberately absent

No colour palette, no type scale, no hero copy, no wireframes, no component
specifications. Those are Phases 4, 5, 8, 9 and 10, and all of them are downstream
of the SRS. Producing them now would mean designing for a brand that has not been
described — which is the exact failure this process exists to prevent.
