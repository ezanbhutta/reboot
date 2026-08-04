# Phases 11–14 — Responsive, Accessibility, Performance, Quality Gate

Binding standards. These apply to every screen regardless of what the brand turns
out to be, and a design that fails any of them is not finished.

---

## 1. Responsive strategy

Design desktop-first for composition, then genuinely **redesign** at each breakpoint.
Shrinking a desktop layout produces cramped, low-confidence mobile experiences, and
since mobile is usually the majority of e-commerce traffic, that is where a "desktop
first" process most often destroys value.

| Breakpoint | Target | Design intent |
|---|---|---|
| ≥1440px | Large desktop | Full editorial composition; guard against measure exceeding readable line length |
| 1024–1439px | Laptop | The realistic desktop default; most desktop sessions land here |
| 768–1023px | Tablet | Genuinely distinct — neither hover-capable nor small |
| 480–767px | Large phone | Primary mobile target |
| <480px | Small phone | Must remain fully functional, not merely non-broken |

**Things that must be redesigned rather than reflowed:**

- Navigation — mega-menu to drawer is a rethink, not a media query
- Product gallery — the desktop thumbnail-plus-main pattern rarely translates
- Filtering — sidebar becomes a drawer or sheet with an explicit apply action
- Product page buy-box — desktop places it beside the gallery; mobile has to decide
  where it goes in the vertical sequence, and whether it becomes a sticky bar
- Multi-column data (comparison, specifications) — columns cannot simply stack
- Cart — drawer width and full-screen behaviour differ meaningfully

**Touch and pointer.** Hover is not available on touch, so no information may exist
only in a hover state. Any hover-revealed content needs a tap-accessible equivalent.
Test with a thumb, not a cursor: reachability on a large phone is a real constraint,
and primary actions belong within comfortable thumb range.

---

## 2. Accessibility

Target: **WCAG 2.2 Level AA**. Non-negotiable, for three converging reasons — it is
a legal exposure in most of our likely markets, it is a straightforward conversion
factor, and premium design that excludes people is not premium.

### Colour and contrast
- Body text: **4.5:1** minimum against its background
- Large text (≥24px, or ≥18.66px bold): **3:1** minimum
- UI components and meaningful graphics: **3:1** minimum
- Colour is never the sole carrier of meaning — error states, stock status, selected
  variants and sale badges all need a second signal (icon, text, shape, weight)

Contrast gets checked at palette definition, not at the end. Discovering that the
brand's accent colour fails against white after the design is approved forces either
a visible palette change or a documented exception, and both are avoidable.

### Typography
- Body text no smaller than 16px, and comfortably larger where the audience skews older
- Line height at least 1.5 for body copy
- Measure between roughly 45 and 75 characters
- Text must reflow to 320px equivalent without horizontal scrolling
- Text must survive 200% zoom without loss of content or function

### Interaction
- Every interactive element reachable and operable by keyboard alone
- Focus indicators clearly visible, meeting contrast requirements, and designed —
  never `outline: none` without a considered replacement
- Focus must not be obscured by sticky headers or drawers (WCAG 2.2, 2.4.11)
- Logical focus order; focus trapped correctly inside modals and drawers, and returned
  to the triggering element on close
- Minimum target size **24×24 CSS px** (WCAG 2.2, 2.5.8). Design to **44×44** on touch
  as the practical standard — the WCAG figure is a floor, not a target
- Any drag interaction needs a single-pointer alternative (WCAG 2.2, 2.5.7)
- `prefers-reduced-motion` respected throughout

### Structure and forms
- Semantic HTML, one `<h1>` per page, no heading levels skipped for visual effect
- Landmark regions correctly applied
- Meaningful alt text on product imagery; decorative images marked as such
- Skip link to main content
- Visible, persistent labels — placeholder-only labelling fails
- Errors identified in text, associated with their field, and describing the fix
- Autocomplete attributes on personal-data fields (WCAG 2.2 redundant entry)

### Verification
Automated tooling catches roughly a third of real failures. Every template also gets
a manual keyboard traversal and a screen-reader pass through the complete purchase
path. The purchase path specifically must be verified end to end — an inaccessible
checkout route makes every other accessibility investment worthless.

---

## 3. Performance budget

Shopify's Theme Store floor is a Lighthouse performance average of 60 (see
[`02-shopify-constraints.md §7`](02-shopify-constraints.md)). That is an admission
threshold. Ours:

| Metric | Target | Notes |
|---|---|---|
| Largest Contentful Paint | **≤2.5s** | Core Web Vitals "good" threshold, at the 75th percentile |
| Interaction to Next Paint | **≤200ms** | Core Web Vitals "good" threshold |
| Cumulative Layout Shift | **≤0.1** | Core Web Vitals "good" threshold |
| Lighthouse performance | **≥85** on home, collection, product | Well above the Theme Store floor |

Measured on throttled mobile, on the templates that carry the traffic. Field data
supersedes lab data wherever both exist.

### Design decisions that determine whether this is achievable

**Fonts.** Each weight is a request in the critical path. Budget: two families
maximum, and no more than four weights total across both. Subset to the character
sets actually needed, self-host as WOFF2, preload the weights used above the fold, and
use `font-display: swap` with a metric-matched fallback so the swap does not cause
layout shift. If the brand nominates six weights, that is a conversation to have in
Phase 1 — not a problem to discover at build.

**Imagery.** The hero image is almost always the LCP element, so it is the single
highest-leverage asset on the site. Explicit dimensions on every image to prevent
layout shift. Responsive `srcset` via Shopify's image filters. Lazy-load everything
below the fold, and never lazy-load the LCP image. Modern formats. Art direction —
different crops per breakpoint — where composition genuinely requires it, not by default.

**Motion.** Animate only `transform` and `opacity`. Anything animating layout
properties triggers reflow and shows up directly in INP. Scroll-linked effects are
permitted only where they carry meaning and only where they can be built without
janking the main thread. If an animation cannot be justified in one sentence about
what the user understands better because of it, it does not ship.

**Third-party scripts.** The most common cause of a fast theme becoming a slow site.
Every app and tag is a budget line item with an owner and a justification. Review the
full stack before launch, and again quarterly — app accretion is how storefronts decay.

---

## 4. Quality gate

Every screen clears all twelve before presentation. Any "no" sends it back.

1. Does it communicate trust immediately, before any scroll?
2. Is every element necessary — what happens if it is removed?
3. Is the hierarchy obvious at a glance, and does it survive squinting at the screen?
4. Is navigation effortless — does the user always know where they are and what is next?
5. Is the experience memorable — is there anything here a competitor could not have made?
6. Is it visually balanced across every breakpoint, not just the one it was designed at?
7. Is it conversion-focused — which stage of the journey does it serve, and how?
8. Does it outperform the competitor benchmark on the dimension it is competing on?
9. Does it respect the SRS — no invented features, no contradicted requirements?
10. Is it realistic in Shopify — has it passed the feasibility checklist in
    [`02-shopify-constraints.md §8`](02-shopify-constraints.md)?
11. Does it feel premium without relying on decoration to get there?
12. Would a leading global agency put its name on this?

### Additional standing checks

- **Empty, loading, error, and overflow states designed** — for every component, not
  just the happy path. This is the most common gap between a portfolio piece and a
  real storefront.
- **Longest and shortest realistic content tested** — the product title that runs to
  four lines, the collection with two items, the review with no photo.
- **Accessibility verified**, not assumed.
- **Performance impact assessed** before high fidelity, not after.
- **Merchant-operability confirmed** — can a non-technical person run this without
  breaking it?

---

## 5. Anti-patterns

Explicitly excluded, per Phase 4. Every visual and conceptual cue associated with AI
and technology-sector design language is out: neural-network motifs, circuit and node
graphics, robotic or humanoid illustration, chrome-and-gradient futurism, glowing
orbs, particle fields, dark-mode-plus-violet-gradient SaaS aesthetics, "intelligent"
or "powered by" language, and chat-assistant interface conventions.

Also excluded, on separate grounds:

- **Fake scarcity and fake urgency.** Countdown timers that reset, invented viewer
  counts, "only 2 left" that is not true. These convert marginally in the short run
  and destroy exactly the trust a premium brand is built on. Real scarcity — genuine
  low stock, a real deadline, a genuinely limited run — is stated plainly and is more
  persuasive because it is true.
- **Interstitial popups on arrival.** A modal before the user has seen anything is a
  cost extracted before any value is offered. Email capture is earned later, in
  context, after the visitor has a reason to want it.
- **Decoration standing in for substance.** Animation, texture, and ornament that do
  not clarify anything are the fastest route to a site that looks expensive and
  performs badly.

The house style is the opposite of all of it: material honesty, real photography,
confident typography, generous and intentional whitespace, restraint, and craft that
rewards attention without demanding it.
