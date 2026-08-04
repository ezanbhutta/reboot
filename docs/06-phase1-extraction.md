# Phase 1 — Complete Project Understanding

Source of truth: `Reboot Shopify SRS v3.pdf` (v1.0, 8 July 2026, prepared by Muhammad
Shah for X Studios) and the `RebootMe_r2` brand package. Read in full. Everything
below is either extracted from those documents or explicitly flagged as a gap.

---

## 1. Extraction

### Business
| Field | Value |
|---|---|
| Brand | **reboot** — consumer electronics, tech-lifestyle |
| Project | Shopify store build, Water Flosser launch |
| Stage | First product, new brand, no trading history |
| Catalogue at launch | **1 product, 2 colour variants** |
| Budget | **$400–500** |
| Target launch | Early August 2026 |
| Deliverable | Live, fully styled Shopify store |

### Requirements, verbatim
- Sleek, minimal, premium visual design throughout
- High-quality, glossy product visuals
- Detailed product presentation (multiple angles, features, benefits)
- Smooth animations across the site — page transitions, hover effects, scroll reveals
- **An animation demonstrating how the product is used, featured on the product page**
- Fully mobile-responsive
- Fast page load performance
- Architected so there is room for future product launches

### Pages required
Home · Product · About / Brand Story · Contact · Warranty Claim · Policies (Shipping,
Returns, Privacy, Terms)

### Functional requirements
SEO basics (meta titles/descriptions, alt text, clean URLs) · GA4 · Meta Pixel ·
on-site email capture · reviews displayed on the product page

### Audience, verbatim
"Digitally native, health/wellness, tech-conscious, tech-savvy, Gen Z consumers
evaluating a new brand's high quality premium tech-lifestyle products. The site should
build trust quickly through visual polish, clarity, and strong product presentation."

The operative phrase is **"evaluating a new brand."** The SRS names the core problem
itself: reboot has no reputation, no reviews, no press, no trading history. Every
design decision is ultimately answering one question — *why should I believe you?*

---

## 2. Brand system decode

### Logo
Lowercase wordmark, geometric sans, with the double-`o` drawn as two counter-rotating
half-discs that lock together — a rotation/restart mark that reads as the "reboot"
idea without illustrating a power symbol literally. It detaches cleanly into a
monogram, supplied in a rounded-square app-icon lockup.

Assessment: genuinely good. The mark is symmetrical, works at favicon scale, and is
distinctive in a category where competitors use generic wordmarks. **The `oo` monogram
should be treated as a real brand asset** — favicon, loading indicator, section
markers, scroll cues — not just an app icon. It is the most ownable element in the
package.

Supplied variants: full colour on dark, on white, on black, on brand blue, on light
grey; monogram in white-on-blue and blue-on-grey.

### Colour, as supplied
Sampled directly from the delivered artwork:

| Role | Hex | Notes |
|---|---|---|
| Brand blue | `#089DE1` | Bright cyan-leaning blue. H 199° S 93% L 46% |
| Ink | `#15191A` | Near-black, very slightly cool |
| Light grey | `#E6E6E6` | Background tone |
| White | `#FFFFFF` | |
| True black | `#000000` | Used in one lockup |

### Contrast audit — a hard constraint, verified

Measured against WCAG 2.2 AA:

| Pair | Ratio | Body 4.5:1 | Large / UI 3:1 |
|---|---|---|---|
| Ink on white | **17.71:1** | PASS | PASS |
| White on ink | **17.71:1** | PASS | PASS |
| Ink on light grey | **14.19:1** | PASS | PASS |
| Brand blue on **ink** | **5.84:1** | PASS | PASS |
| Brand blue on white | **3.03:1** | **FAIL** | PASS |
| White on brand blue | **3.03:1** | **FAIL** | PASS |
| Brand blue on light grey | **2.43:1** | **FAIL** | **FAIL** |

Three consequences, and they shape the entire visual system:

1. **The brand blue cannot carry body-size text on white**, and **white text on a
   brand-blue button fails AA.** The single most common way this palette would be used
   in a default Shopify theme — a bright blue "Add to cart" with white text — is
   inaccessible. It has to be designed around, not discovered at QA.
2. **Brand blue on the light grey fails even the 3:1 UI threshold.** That combination
   is prohibited outright.
3. **The blue is at its strongest on ink — 5.84:1.** The palette, unprompted, is
   telling us it wants a dark canvas. This is developed in
   [`08-strategy.md`](08-strategy.md).

**Derived token, computed not guessed:** `#067EB4` — the same hue and saturation
darkened to L 36.5% — reaches **4.52:1 on white**, making it the accessible variant
for links and blue text at body size on light backgrounds. The supplied `#089DE1`
remains the display/accent blue.

Primary CTA resolves to **ink with white text at 17.71:1** — which is both the
accessible answer and the more premium one. It keeps the cyan as a precise accent
instead of a shouting button colour.

### Typography
The supplied specimen is **Aloevera** — a geometric sans with a single-storey `a`,
circular bowls, and slightly rounded terminals, in six weights: Thin, Light, Regular,
Medium, Bold, Black. It matches the logo construction, so the wordmark is almost
certainly set in it.

**Gap: the font files were not supplied.** The `.ai` source contains outlined artwork
with no live text and no font references. What arrived is a specimen image, not a
usable webfont. See risk R4.

---

## 3. Risk and conflict register

Recorded rather than absorbed. Each needs a decision.

### R1 — Budget versus expectation · **Severe**
The SRS budget is **$400–500**. The creative brief asks for work "comparable to the
best digital agencies in the world" and "worthy of recognition on leading design
showcases." Those two statements are roughly two orders of magnitude apart; agency
work at that standard is a five-to-six-figure engagement.

This does not mean the outcome must be mediocre — a single-product store is the most
favourable possible case for punching above budget, because there is one page that
truly matters. But it does mean the build path must be **a Dawn-derived custom theme
with a tightly-scoped section library**, not a bespoke theme, and the design must be
specified so that execution is efficient rather than exploratory.

**Recommendation:** proceed on that basis. Design ambition stays high; build scope
stays disciplined. Flagged so the constraint is a decision, not a surprise.

### R2 — Timeline · **Severe**
Target launch is "earlier August." Today is **4 August 2026**. The window is now.
Recommend an explicit scope split: a launch set (Home, Product, Policies, Contact)
and a fast-follow set (About, Warranty Claim, editorial). Confirm which pages are
genuinely gating launch.

### R3 — Shopify Plus versus budget · **High**
Shopify Plus was confirmed in intake, but Plus is approximately **$2,300/month** —
irreconcilable with a $400–500 build budget. Most likely the answer was aspirational
or a misread.

**Recommendation:** design **plan-agnostic**. Everything in the conversion path lives
in the theme, the cart, and the product page, which work identically on Basic. If Plus
is genuinely in place, the Checkout Branding API and Thank-You-page extensions
described in [`02-shopify-constraints.md §5`](02-shopify-constraints.md) become
available upside. **Nothing will be designed that depends on Plus.** Needs
confirmation.

### R4 — Font files and licence missing · **High**
Only a specimen image arrived. Needed: the Aloevera web font files (WOFF2) **and
written confirmation of web-embedding rights** — a separate grant from desktop rights
and frequently absent. Blocks the type system.

If the licence does not cover web use, the fallback is a metric-similar geometric sans
with an open licence, chosen to sit correctly beside the outlined logo.

### R5 — No product photography versus the SRS's central visual requirement · **RESOLVED**

> **Update — 4 August 2026.** A **manufacturing-grade 3D model has been supplied** and
> this risk is closed. Details in §5 below; the analysis that follows is retained
> because its conclusion — CGI, not photography — is now confirmed rather than
> proposed.

The SRS requires "high-quality, glossy product visuals," "multiple angles," and a
usage animation. Intake confirmed almost no photography exists.

**This resolves better than it first appears, and the resolution is CGI.** For
consumer electronics, 3D product rendering is the category norm rather than a
substitute for photography — see [`05-imagery-strategy.md`](05-imagery-strategy.md),
which has been revised accordingly. One 3D model yields consistent packshots, both
colourways, every angle, exploded views, cutaways, **and the required usage
animation**, from a single asset. It is cheaper than a photoshoot, exactly matches
"glossy," and scales to future products.

**Dependency:** this requires either a CAD/3D file from the manufacturer or a model
built from the physical product. Confirm which exists — it is on the critical path.

### R6 — Reviews required, none exist · **High**
The SRS requires reviews on the product page. A pre-launch brand has none, and an
empty review module is worse than no module — it advertises that nobody has bought
the product.

**Recommendation:** the product page must be designed to be persuasive with **zero**
reviews at launch and to improve as they arrive. Concretely: a review section that is
absent rather than empty when the count is zero, with the trust load carried at launch
by warranty, returns, specification transparency, and the how-to-use demonstration.
Seed genuine reviews via a post-purchase request flow from day one. **No fabricated
reviews** — beyond the ethics, they are a documented enforcement risk and Gen Z is the
demographic most practised at spotting them.

### R7 — No price point defined · **High**
The SRS never states the retail price, and this is the most consequential missing
fact after the product spec itself. The category spans:

- Value tier: Coslus and similar, **$24–$40**
- Mainstream: Waterpik, **$50–$100**
- Premium adjacent: Feno Smartbrush, **$299–$519** (different product class)

Where reboot sits determines the entire page architecture. Under $50 the design should
optimise for speed to cart. Above $100 it needs sustained reassurance and a much
deeper justification narrative. **Required before wireframing.**

### R8 — Product specifications unavailable · **High**
No spec sheet was supplied: pressure range, modes, tank capacity, battery life,
charge time, IPX rating, noise level, dimensions, weight, tip types, warranty term.

This is not a detail. In a category where buyers compare on numbers, the
specification *is* product content, and several of these — particularly noise and
IPX rating — are candidate differentiators. **No claim will be written without a
source.** Required before the product page can be designed.

### R9 — Health claims and regulatory exposure · **Medium**
Oral health sits close to regulated claim territory. reboot can describe what the
device does mechanically; it cannot claim to treat or prevent gum disease without
substantiation. Competitor pages lean on clinical framing backed by their own testing
— reboot has none yet.

**Recommendation:** claim only what is mechanically true and independently verifiable,
and treat that restraint as a positioning asset rather than a limitation. Developed in
[`08-strategy.md`](08-strategy.md).

### R10 — Single product versus a multi-product content brief · **Medium**
The creative brief requests Featured Collections, Product Categories and Best Sellers.
With one product these sections are structurally impossible and would actively signal
"template." Adjudicated section by section in
[`08-strategy.md §4`](08-strategy.md).

### R11 — "Room for future launches" · **Medium**
An architecture requirement, and it conflicts with the cheapest possible build. Handled
by designing every section as catalogue-agnostic from the start, so a second product
does not force a rebuild. Costs a little now, saves a lot later.

---

## 5. Product asset audit — 4 August 2026

Two further files were supplied and analysed.

### 3D model — `RebootMe` product mesh
A Wavefront OBJ exported from **Blender 4.2.4 LTS**, with an accompanying material
library named for a **black colourway render** — confirming both a black finish and
that renders were already being produced from this asset.

| Property | Value |
|---|---|
| Origin | Engineering CAD — STEP / Parasolid, dated 2024-02-21 |
| Geometry | 115,956 vertices · 171,667 faces · 98,671 normals |
| Components | 34 named objects, including a helical part (spring or coil) |
| UVs | 110,257 — the model is already unwrapped for texturing |

This is production geometry converted from real manufacturing data, not a placeholder
or a marketplace asset. **The full CGI pipeline described in
[`05-imagery-strategy.md §0`](05-imagery-strategy.md) is therefore viable**, including
the SRS-required usage animation, both colourways, exploded views and cutaways.

**One item to verify.** The mesh's bounding box scales to roughly 215 × 28 × 25 mm,
which does not match the 69 × 76 × 215 mm product envelope below. The geometry is also
concentrated in a small volume with sparse vertices extending along one axis. Two
likely explanations: the file is a **sub-assembly** rather than the complete product,
or it contains stray or mis-scaled helper objects from the CAD conversion — both
common in STEP-to-Blender workflows. **This needs a Blender render to settle; it is
not resolvable by inspecting coordinates.** It does not change the strategy, only the
production brief.

### Packaging dieline
A print-ready carton unfold with dimensions annotated. First hard specification data
received:

| Item | Value |
|---|---|
| **Product** | **69 × 76 × 215 mm** |
| **Packaging** | **71 × 78 × 217 mm** |
| Die detail | 0.8 mm / 0.4 mm shaped cut-out specified |

Only a 2 mm clearance between product and carton — a tight, deliberately-specified
pack. Worth noting for the unboxing narrative if that becomes part of the story.

**R8 remains open** for everything else: pressure, modes, tank capacity, battery life,
charge time, IPX rating, noise level, weight, tip types and warranty term. Dimensions
alone do not unblock the product page.

---

## 4. Confirmed before wireframing

Blocking, in priority order:

1. **Retail price** (R7)
2. **Full product specification sheet** (R8)
3. **3D/CAD asset availability** (R5)
4. **Aloevera web font files + licence** (R4)
5. **Actual Shopify plan** (R3)
6. **Launch page scope** given the date (R2)
7. **Warranty term and returns window** — load-bearing trust content
8. **Shipping origin, destinations, cost and lead times**

Items 1, 2 and 3 are the true blockers. Everything else can proceed in parallel.
