# Imagery Strategy

> **Confirmed in intake:** almost no product photography exists today.
>
> **Revised after the SRS:** the product is a **consumer electronics device** (water
> flosser, one product, two colourways). That changes the correct answer materially —
> see §0. The general principles in §2 still hold and still govern the layout system,
> but the primary route to imagery is now **CGI, not photography**.

---

## 0. The consumer-electronics correction

This document was first drafted before the SRS arrived, when the product category was
unknown. It assumed photography was the only honest route and excluded rendered
imagery. **For consumer electronics that exclusion is wrong, and it is withdrawn.**

3D product rendering is the category norm, not a substitute for it. Premium
electronics brands present rendered product imagery as a matter of course, because a
render gives control over finish, lighting and geometry that a photograph of a small
glossy object cannot match. Nobody is deceived, and nothing is misrepresented — the
render depicts the actual manufactured object.

For reboot specifically, one 3D model resolves almost every open imagery problem at
once:

| Requirement | Delivered by the same model |
|---|---|
| "High-quality, glossy product visuals" (SRS) | Studio-lit renders, exactly the requested finish |
| "Multiple angles" (SRS) | Any angle, at no additional cost per view |
| Two colourways | A material swap, not a second shoot |
| **"An animation demonstrating how the product is used"** (SRS) | The same asset, animated |
| Exploded views, cutaways, tank and tip detail | Only possible with CGI |
| Future products | The pipeline and lighting rig are reusable |

It is also cheaper than a comparable photoshoot, and it is the only route that
delivers the required usage animation from the same source as the stills — which is
what makes the whole visual system feel coherent rather than assembled.

**Dependency, on the critical path:** this requires either a CAD/3D file from the
manufacturer, or a model built from the physical product. Confirming which exists is
blocker 3 in [`06-phase1-extraction.md §4`](06-phase1-extraction.md).

**What renders still cannot do:** they cannot show the product in a real bathroom, in
a real hand, at real scale, and they cannot carry the human warmth the brand needs
somewhere on the site. A small amount of real photography is still required — see §3,
revised.

---

## 1. The problem, stated honestly

This is the most consequential constraint on the project, and it is addressed here
rather than discovered later. It changes the visual system, and it changes it now —
not after wireframes.

---

## 1. The problem, stated honestly

*(Written pre-SRS. Still governs everything the renders do not cover — the layout
system, the type-led composition, and the human-facing sections.)*

Premium e-commerce conventionally rests on photography. Most of the storefronts that
would be cited as references in Phase 2 are carrying their quality on an art-directed
image library that cost more than the site did. We do not have that, and pretending
otherwise produces one of two well-known failures:

**Failure one — stock photography.** The fastest way to destroy a premium brand. Buyers
recognise stock imagery instantly, and the inference is not "this brand is polished",
it is "this brand is not real". A storefront with stock lifestyle imagery is less
trustworthy than one with honest packshots on a plain background. This is an absolute
prohibition, not a preference.

**Failure two — editorial layout with nothing to put in it.** Designing the
large-format, image-led composition system that the reference sites use, then filling
it with what we actually have, produces a layout visibly waiting for content it never
receives. It reads as a template with holes in it, which is worse than a system that
never promised the imagery in the first place.

So the system must be designed for what exists, and must **improve** as photography
arrives rather than depending on it to become coherent.

---

## 2. The strategy: shift the load-bearing work

In an image-led system, photography carries hierarchy, emotion, quality signalling and
brand differentiation. Each of those jobs can be reassigned. None of the substitutes
is a compromise — several of the most distinctive premium storefronts in the world are
deliberately typographic.

| Job usually done by photography | Reassigned to |
|---|---|
| Establishing hierarchy | Typographic scale and generous, asymmetric whitespace |
| Signalling quality | Craft in the details — optical alignment, considered type, restraint |
| Creating emotion | Language. Copy does real work here, and needs a real budget |
| Differentiating the brand | Colour, proportion, and a distinctive type pairing |
| Explaining the product | Structured specification, diagrams, comparison, materials data |
| Providing scale reference | Dimensional diagrams and explicit measurements |
| Building trust | Provenance, process, guarantees, and named people |

### What this means concretely

**Typography becomes the primary visual instrument.** Not merely "good type" — a
genuinely distinctive pairing with a wide, confident scale. Where an image-led site
opens with a photograph, this system opens with a typographic statement at a size that
would be excessive in a conventional layout. This is the single highest-leverage
decision in the whole visual system and it depends on the brand fonts, so it resolves
the moment the SRS and font files land.

**Whitespace becomes a material, not a gap.** In image-led design, whitespace frames
imagery. Here it *is* the composition. That demands more rigour, not less: a strict
spatial scale, deliberate asymmetry, and confidence in negative space. Generous
whitespace with nothing considered in it reads as unfinished; generous whitespace with
precise relationships reads as expensive.

**Colour carries emotional weight.** With no photography to set mood, the palette does
it. This argues for a more committed palette than an image-led site would use — where
photography dominates, a near-neutral system stays out of its way; where it does not,
neutrals alone leave the page inert.

**Structured product data becomes content, not fine print.** Materials, dimensions,
origin, construction, care. Presented properly — as designed, typographically
considered information rather than a specification dump — this is genuinely
persuasive for considered purchases and it fills the space photography would have
occupied. Model these as **metaobjects** so they scale without a developer, per
[`02-shopify-constraints.md §1`](02-shopify-constraints.md).

**Diagrams do the work of scale photography.** A precise dimensional line drawing
answers "how big is it" better than a lifestyle shot does, costs a fraction as much,
weighs almost nothing as an SVG, and reads as considered rather than cheap. This is
one of the few places where the constrained route is genuinely the better one.

### The performance dividend

A low-imagery storefront is a fast storefront. The largest single obstacle to the
Core Web Vitals budget in [`04-quality-standards.md §3`](04-quality-standards.md) is
image weight. Working without a heavy library makes an LCP under 2.5 seconds
comfortably achievable rather than a fight — which is a real competitive advantage,
since the image-led competitors in Phase 2 will almost all be paying for their
photography in load time.

---

## 3. The launch asset list — revised for CGI

Replaces the generic photography priority list with what reboot actually needs.

### From the 3D model — the bulk of the site

**Priority 1 — Hero render, both colourways.** Studio-lit on ink, the object presented
as an object. This is the site's largest visual moment and its LCP element, so it gets
the most attention and the tightest file budget.

**Priority 2 — The usage animation.** SRS-required, and per
[`08-strategy.md §2`](08-strategy.md) the strategic centrepiece of the product page —
the direct remedy for the category's primary failure mode. It must show the technique
that makes the product work: tracing the gumline, not blasting the tooth face. This is
the single highest-value asset in the project.

Deliver as a short, silent, looping sequence. **Not** an autoplaying video file —
budget the weight against [`04-quality-standards.md §3`](04-quality-standards.md), and
provide a static poster frame plus a reduced-motion fallback.

**Priority 3 — Angle set, both colourways.** Front, three-quarter, side, rear, top.
The SRS's "multiple angles" requirement, satisfied properly.

**Priority 4 — Detail crops.** Finish, control surface, tip mount, tank seal, charge
contacts. **This is where "premium" is actually communicated** — a macro of a
well-resolved edge does more for perceived quality than a styled bathroom.

**Priority 5 — Exploded view and tank cutaway.** Explains construction and capacity,
supports the specification content, and is only possible with CGI. A genuine advantage
over every competitor in the tier, all of whom use flat marketplace photography.

**Priority 6 — Colourway comparison.** Both finishes together, for the variant selector.

### Real photography — small, specific, still necessary

Renders cannot show real scale, real context, or a human being. A short shoot covers it:

**Priority 7 — In-hand scale reference.** A real hand holding the real product.
"How big is it" is among the most common pre-purchase questions and return causes,
and a render is exactly the wrong tool for it.

**Priority 8 — One real bathroom-counter shot.** The "would I leave this out"
question, which is central to the tech-lifestyle positioning. One honest image beats
a styled set.

**Priority 9 — Customer review photography, from launch onward.** The most credible
imagery available, costing nothing but the mechanism to collect it. Configure photo
reviews at launch so the library compounds — per R6, this is also how the review
section stops being empty.

### Deliberately excluded
- **Stock photography of any kind**, above all stock imagery of people
- **Renders that misrepresent the manufactured object** — a render of the real product
  is honest; a render of an idealised product that differs from what ships is not, and
  it converts well then returns worse
- Lifestyle scenes that misrepresent scale, colour or finish
- Any imagery implying clinical or medical results (risk R9)

---

## 4. Interim tactics, before any shoot

The storefront has to work in the meantime:

1. **Design the packshot treatment as a system.** A consistent background field,
   consistent padding within the card, and a considered container. A plain packshot
   presented with rigour looks intentional; the same shot presented casually looks
   like a placeholder.
2. **Weight product cards toward type.** If the image is modest, the card's structure,
   name, and supporting detail carry it. Reconsider the conventional
   image-dominant-with-small-caption card entirely.
3. **Use colour fields where images would sit.** Considered flat colour or subtle
   material tone reads as a design decision. A grey placeholder box reads as a bug.
4. **Invest in copy immediately.** With no photography, language carries the emotional
   load. This needs to be budgeted as a real workstream now, not treated as filler
   written the week before launch.
5. **Build the review-photography engine from day one.** Customer photography is the
   most credible imagery available and it costs nothing but the mechanism to collect
   it. Configure photo reviews at launch so the library compounds. Within a year this
   can be the strongest visual asset the brand has — but only if collection starts
   at launch rather than being retrofitted.

---

## 5. Art direction brief — to be issued with the shoot

Written before the shoot is commissioned, so production serves the design rather than
the design accommodating whatever comes back. Completed once the brand is defined; the
structure is fixed now:

- **Background and surface treatment** — exact specification, held across every shot
- **Lighting direction** — one setup, documented, repeatable months later for new SKUs
- **Framing and product proportion within frame** — so the grid stays even
- **Aspect ratios** — locked to the design system's card and gallery ratios
- **Shot list per SKU** — derived from the priority order in §3
- **Colour accuracy requirements** — critical where colour drives selection and returns
- **File delivery spec** — dimensions, format, colour profile, naming convention
- **Extensibility rule** — the setup must be reproducible for future products by a
  different photographer, or the library fragments the first time the catalogue grows

That last point is the one most often missed, and it is what separates a photography
library from a folder of photographs.

---

## 6. Consequences to accept

Stated plainly so they are decisions rather than surprises:

- The design will be **more typographic and more structured** than the image-led
  references likely to be supplied as inspiration. That is the correct response to the
  constraint, not a shortfall against it.
- **Copy is now a critical path dependency.** Weak copy has nowhere to hide.
- **The type pairing matters more than usual.** It is carrying work photography would
  otherwise do, which is an argument for spending properly on the licence.
- The system must **absorb photography gracefully as it arrives** — meaning image
  slots are designed as enhancements to a composition that already works, never as
  load-bearing elements it depends on.

That last principle governs every layout decision in this project: **the page must be
complete without the photograph, and better with it.**
