# Phase 6 — Shopify Platform Constraints

Every limit below was verified against shopify.dev during the preparation of this
document and carries a source link. This is the feasibility envelope: designs that
breach it get rejected at build, and the expensive version of that discovery is
after client sign-off.

Verified 2026-08-04. Shopify moves — re-verify before final handoff.

---

## 1. Theme architecture

Online Store 2.0 themes use JSON templates composed of **sections**, each containing
**blocks**, with **section groups** for the header and footer areas. Sections are
available on every template, not just the homepage.

**Design consequence.** Design in sections, not in pages. Every page is an assembly
of reorderable, independently-configurable units. A layout that only works when three
specific components sit in one specific order is fragile — the merchant will reorder
it in the theme editor within a month of launch and it will break.

Practically: each section must be self-contained, must survive being moved, must
handle its own vertical rhythm, and must degrade sensibly when its optional content
is empty. Design the empty state of every section alongside the populated one.

Custom content beyond Shopify's built-in objects should be modelled with
**metafields** (a single custom field on an existing resource) or **metaobjects**
(standalone structured entities referenced from multiple places — size charts,
ingredient lists, author profiles, material specs). Metaobjects can also have their
own theme templates and render as real webpages, which is the correct way to build
things like a materials library or an ingredient glossary.

Source: [Metaobjects](https://shopify.dev/docs/apps/build/metaobjects) ·
[Metaobject theme templates](https://shopify.dev/docs/storefronts/themes/architecture/templates/metaobject)

---

## 2. Products, variants, options

| Constraint | Value |
|---|---|
| Maximum variants per product | **2,048** (raised from 100) |
| Maximum options per product | **3** |

The 3-option ceiling is the hard one and it is unchanged. A product varying by
colour, size, *and* material has used its full allocation — a fourth axis is not
available.

Source: [ProductVariant](https://shopify.dev/docs/api/admin-graphql/latest/objects/ProductVariant) ·
[productOptionsCreate — `OPTIONS_OVER_LIMIT`](https://shopify.dev/docs/api/admin-graphql/latest/mutations/productOptionsCreate)

**Design consequence.** Confirm the variant model in Phase 1 before designing the
product page. If the catalogue genuinely needs a fourth axis, the options are:
split into separate products linked by a product-relationship metafield; use line-item
properties for the non-inventoried axis (personalisation, engraving); or use combined
listings. Each produces a visibly different product page. This decision cannot be
deferred past the first product-page wireframe.

The variant selector design should also be driven by axis cardinality, established
in intake. Colour with 4 values wants swatches; size with 30 wants a different
control entirely. Designing a swatch grid before knowing the value counts is guessing.

---

## 3. Collections and filtering

Filters can be built from: availability, category, price, product tags, product type,
vendor, variant options, and metafields.

**Filter logic is fixed**: AND *between* filters, OR *within* a filter's values. Red
and size M; or red or blue. This logic is not customisable — a design implying any
other behaviour is misleading.

**Collections containing over 5,000 products do not display filters at all.** If the
catalogue approaches this, the merchandising architecture must break the catalogue
into smaller collections rather than relying on one large collection plus filtering.

Shopify's own UX guidance: horizontal toolbar filters work below roughly five filters;
a vertical sidebar is correct above that. Price ranges should use a dual-handle slider
*plus* labelled numeric inputs — the inputs are an accessibility requirement, not an
optional extra, and they must have labels even when visually hidden.

Source: [Storefront filtering](https://shopify.dev/docs/storefronts/themes/navigation-search/filtering/storefront-filtering) ·
[Storefront filtering UX guidelines](https://shopify.dev/docs/storefronts/themes/navigation-search/filtering/storefront-filtering/storefront-filtering-ux) ·
[Support storefront filtering](https://shopify.dev/docs/storefronts/themes/navigation-search/filtering/storefront-filtering/support-storefront-filtering)

**Design consequence.** Filter state lives in URL parameters, so filtered views are
shareable and back-button-safe — design should exploit this rather than fight it with
hidden state. Zero-result states must be designed explicitly, and must offer a route
out (loosen the last filter, clear all, view related), because a dead end at this
point in the funnel is pure lost revenue.

---

## 4. Navigation

Menus are built in the admin and nest to a **maximum of 3 levels**.

Source: [linklist object](https://shopify.dev/docs/api/liquid/objects/linklist) ·
[Add navigation to your theme](https://shopify.dev/docs/storefronts/themes/navigation-search/navigation)

**Design consequence.** Three levels is ample for a well-structured catalogue and a
warning sign if it feels tight. Needing a fourth level almost always indicates the
taxonomy is wrong rather than the platform being limiting. Mega-menus draw from the
same nested linklist — the visual richness comes from the theme's rendering, not from
extra menu depth, and any promotional imagery inside a mega-menu is a separate section
setting rather than part of the menu structure itself.

---

## 5. Checkout — Shopify Plus

> **Plan confirmed: Shopify Plus.** Checkout Extensibility is fully available. This
> section is written to that capability.

Checkout is not a theme template and never was. `checkout.liquid` is gone:
unsupported for the Information, Shipping and Payment steps since **13 August 2024**,
and sunset for the Thank You and Order Status pages — along with additional scripts
and script tags — on **28 August 2025**. Shopify Scripts continue to work alongside
Checkout Extensions until **30 June 2026**, which is a migration deadline to note if
any legacy Scripts are inherited.

Source: [checkout.liquid (deprecated)](https://shopify.dev/docs/storefronts/themes/architecture/layouts/checkout-liquid) ·
[Apps in checkout](https://shopify.dev/docs/apps/build/checkout) ·
[Deprecation changelog](https://shopify.dev/changelog/checkout-liquid-will-no-longer-work-for-in-checkout-pages-starting-august-13-2024)

### 5.1 What Plus gives us

**Checkout Branding API** (Plus or development store only). A real design-token
system, not a colour picker:

- A **design system** layer — global colours and colour schemes, typography, corner
  radius variables — applied consistently across the whole surface
- **Global** overrides for corner radius and typography
- **Typography** control including case and kerning across all font surfaces
- **Form controls** — corner radius, border presence, label position, label typography
- **Buttons** — background style, border, corner radius, block and inline padding,
  and typography, set independently for primary and secondary

Critically, these customisations are **automatically inherited by checkout UI
extensions**, so extension content does not look bolted on.

Source: [CheckoutBrandingDesignSystem](https://shopify.dev/docs/api/admin-graphql/latest/objects/CheckoutBrandingDesignSystem) ·
[CheckoutBrandingGlobal](https://shopify.dev/docs/api/admin-graphql/latest/objects/CheckoutBrandingGlobal) ·
[CheckoutBrandingButton](https://shopify.dev/docs/api/admin-graphql/latest/objects/CheckoutBrandingButton) ·
[Branding API changelog](https://shopify.dev/changelog/new-checkoutbranding-api-properties)

**Checkout UI extensions** add custom UI and logic into checkout steps and the Thank
You page. Three target types:

| Type | Behaviour |
|---|---|
| **Static** | Fixed positions — before actions, after contact fields, after cart line items. Render on load, cannot be moved |
| **Block** | Merchant-positionable via the checkout and accounts editor. **Maximum of three extensions per block target location** |
| **Runnable** | No UI — run on events such as address entry, returning data like autocomplete or formatting |

Extensions are built with **Polaris web components**, which is the significant design
constraint here.

Source: [Checkout UI extensions](https://shopify.dev/docs/api/checkout-ui-extensions/latest) ·
[Targets](https://shopify.dev/docs/api/checkout-ui-extensions/latest/targets)

### 5.2 What Plus still does not give us

This is the part that catches people. Even on Plus:

- **The checkout layout is not ours.** Step sequence, field order and page structure
  are Shopify's. We are theming and inserting, not composing.
- **Extension UI is Polaris components, branded** — not arbitrary markup. A bespoke
  visual treatment inside an extension is not available. Our type and colour tokens
  flow in via the Branding API; the component vocabulary does not change.
- **Custom fonts require the fonts to be available to checkout**, which is a separate
  configuration from the theme's font loading.

So: brand the checkout thoroughly, extend it where extension earns its place, and do
**not** design a bespoke checkout layout. A comp showing a custom-composed checkout
will not survive build.

### 5.3 Where the conversion work still belongs

Even with Plus, the cart and product page carry most of the load, because that is
where hesitation actually occurs:

- Total cost visibility — shipping thresholds, duties, delivery estimates — belongs in
  the cart. Late cost reveal is a leading abandonment cause, and revealing it *at*
  checkout is already too late even when checkout is beautiful.
- Returns policy, guarantees and payment-security signals belong in the cart.
- Express wallet buttons render in cart and product page and deserve deliberate design
  — for returning mobile buyers they *are* the checkout, bypassing everything else.

Plus additionally unlocks post-purchase surfaces: Thank You page extensions are the
correct home for order tracking expectations, referral, and first-order onboarding —
see the Post-purchase and Retention stages in
[`03-information-architecture.md §1`](03-information-architecture.md).

---

## 6. Cart

The AJAX Cart API supports cart manipulation without page reloads. The **Section
Rendering API** returns rendered section HTML for partial updates, and **bundled
section rendering** is the correct mechanism for cart-driven updates.

Two limits worth knowing:
- A maximum of **five sections** per Section Rendering API request.
- Section *settings* cannot be specified through the API — existing template settings
  or defaults apply.

Source: [Section Rendering API](https://shopify.dev/docs/api/ajax/section-rendering)

**Design consequence.** A cart drawer with live updates is straightforward and is the
right default for most catalogues. Anything that must update simultaneously — line
items, subtotal, free-shipping progress, cross-sell block, header count — should be
planned within the five-section budget. Beyond that it needs restructuring, not more
requests.

The free-shipping progress indicator is worth designing properly: it is one of the
few genuinely non-manipulative scarcity mechanics, because it states a real threshold
the customer can act on.

---

## 7. Performance

Shopify Theme Store submissions require a minimum average Lighthouse performance
score of **60** across home, product, and collection pages.

Source: [Performance best practices for Shopify themes](https://shopify.dev/docs/storefronts/themes/best-practices/performance)

**That is a floor for admission, not a standard for premium work.** Our own budget is
set considerably higher in [`04-quality-standards.md §3`](04-quality-standards.md).

Note also that stylesheet subsetting applies to dynamically fetched sections: the
Section Rendering API response includes a `<style data-section-stylesheet>` tag. If
only part of a response is inserted into the DOM, that style element must be extracted
and inserted too, or the section renders unstyled.

Source: [Stylesheet content subsetting](https://shopify.dev/docs/storefronts/themes/best-practices/performance/stylesheet-subsetting)

---

## 8. Feasibility checklist

Applied to every component before it reaches high fidelity.

- [ ] Does it map to a section with sensible, bounded merchant-editable settings?
- [ ] Does it survive being reordered, duplicated, or removed?
- [ ] Does it have a designed empty state and a designed overflow state?
- [ ] Does it respect 3 product options and 2,048 variants?
- [ ] Does it respect 3 levels of menu nesting?
- [ ] If it filters, does it respect AND-between / OR-within, and the 5,000-product cut-off?
- [ ] If it touches checkout, is it within plan capability?
- [ ] If it updates asynchronously, is it within 5 sections per request?
- [ ] Does it need an app? Which one, what does it cost, what does it do to page weight?
- [ ] Does it stay inside the performance budget?
- [ ] Can a non-technical merchant operate it without breaking the design?

That last one decides whether the storefront still looks like this in a year. A design
that only holds while an agency maintains it has not solved the problem.
