# Content placeholders in this prototype

Everything below is a placeholder chosen so the design can be evaluated. None of it
is confirmed. Each item lists exactly where it appears so it can be swapped quickly.

## Blocking — must be confirmed before this goes live

| Item | Placeholder used | Appears in |
|---|---|---|
| **All 128 reviews** | fabricated placeholders | Product page reviews section, buy box rating, home page trust ladder, about page |
| **Retail price** | `$79` | Header CTA (all pages), hero, product buy box, sticky mobile bar, close section |
| **Runtime per charge** | "To be confirmed" | Product specification |
| **Weight** | not stated anywhere | — |
| **Colourway name** | "Soft White" | Product buy box, spec list, shop card |
| **GA4 measurement ID** | empty in `assets/js/analytics.js` | every page |
| **Meta Pixel ID** | empty in `assets/js/analytics.js` | every page |

Only one figure is still open. Everything else on the specification table now comes
from the manufacturer's own packaging artwork for model SK-CYQ-D, dated 2024-05-14:
40 to 120 PSI at 1600 pulses a minute, four modes, a 300 ml tank giving about ninety
seconds, IPX7, a 3.7 V lithium-ion cell charged over USB-C at 5 V / 8 W in two to
three hours, a ninety second cut-off, and roughly 65 dB running. Those are supplier
figures rather than independently measured ones, which is worth saying to the client
even though the site does not need to say it.

The remaining "to be confirmed" entry is deliberately visible rather than hidden. It
supports the honesty positioning and is safer than a guess.

## The reviews are not real

Every review on the product page is written copy, and so are the 4.6 average, the
128 count and the rating distribution. They exist so the section can be designed
and signed off, nothing more. **They must be replaced with real verified reviews,
or the section removed, before this goes anywhere near a customer.** Publishing
invented reviews is illegal in most of the markets this will sell into and it
would destroy the one thing the rest of the site is built on.

Two pieces of copy were reworded to stop the site contradicting itself once the
reviews appeared: the home page trust ladder used to say "no reviews we did not
earn", and the about page said "no reviews yet". Both need looking at again when
the real reviews land.

## Claims on the packaging that this site will not print

The retail box carries three claims the site is built to refuse: "removes up to 99.9%
of plaque", "dentists recommend daily use", and three separate "more effective than
string floss" claims. The last of those directly contradicts the site's central
argument, which is that a water flosser does not replace floss and that pretending
otherwise is why people give up. Packaging and website currently disagree. The client
has to decide which one is right; the site should not quietly adopt the box.

## Commercial terms — assumed, need sign-off

| Item | Placeholder | Appears in |
|---|---|---|
| Warranty term | 2 years, parts and labour | Trust strip, buy box, warranty page, footer |
| Returns window | 30 days, return postage paid | Trust strip, buy box, returns page |
| Shipping | Free, dispatched in 1 working day, 2–4 days delivery | Trust strip, buy box, shipping page |
| Support response | Within one working day | Trust strip, contact page |
| Shipping destinations | Not stated | Shipping page |
| Contact email | `hello@reboot.example` | Contact page |
| Company details | Not stated | Terms page |

## Deliberately empty

- **Reviews** — no review section exists anywhere. Per strategy, it renders absent
  rather than empty at zero count, and gets added once genuine reviews arrive.
- **Professional endorsement** — designed, and currently removed from the home page
  along with the rest of the flosser-specific argument. It needs three named
  practitioners with verifiable credentials before it goes back, on the product
  page rather than the home page. No anonymous quotes, no stock portraits.
- **Products 002 onward** — the catalogue lists Move, Work and Connect as shelves
  with nothing on them. That is deliberate and honest, but it does mean three
  quarters of the store's structure is currently empty. If the client would rather
  not show that publicly, the shelves can be collapsed to a single "more coming"
  line without touching the underlying structure.
- **Media mentions, social gallery, before/after** — not built. See `docs/08-strategy.md §4`.

## Imagery

Two sets, doing two different jobs.

**Glossy renders** are built from the manufacturer's own render mesh, shaded per
material group and lit on a three-point studio rig. Front, three-quarter (both
hands), profile and rear, all in Soft White. These carry the emotional moments:
hero, release section, shop card, and the full-bleed object.

**CAD line work** is traced from the engineering sheets: front, rear and side
elevations, the plan view of the nozzle socket, and the tank on its own. These sit
with the specification, because they answer a different question. The drawings'
own proportions agree with the stated 69 x 76 x 215 mm to within two per cent,
which is the closest thing to a verification we have.

**Only white appears anywhere.** Per client direction, no black product imagery is
used. Note that SRS §5 lists "Variants: 2 Colors" — the site and the SRS disagree
on this point and the client should confirm which is correct before launch.

Before launch this still needs photography: a studio pack of the unit, the five
nozzles laid out, and one in-hand frame for scale. Both existing sets should stay
when the photography arrives; they are doing work a photo cannot.

The **how-to-use animation** required by the SRS is represented by a static frame
and a labelled placeholder in both places it belongs.

## Analytics

GA4 and Meta Pixel are installed on every page via `assets/js/analytics.js`, wired
to `view_item`, `add_to_cart` and `sign_up`, and mapped to the Meta equivalents.
**Both IDs are empty**, so nothing is sent anywhere until the client fills them in
at the top of that file. The script also honours Do Not Track and Global Privacy
Control before loading either vendor.

On Shopify this becomes a snippet included from `theme.liquid` with the two IDs
coming from theme settings rather than being edited in the file.

## Not wired up

This is a static prototype. Add to cart, buy now, and all four forms are inert and
say so on submit. Cart, checkout and account flows are Shopify's and are not
reproduced here.
