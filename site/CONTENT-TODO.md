# Content placeholders in this prototype

## Corrected against the client's own documents

The warranty card, user manual and packaging artwork arrived after the site was
built, and several things the site stated turned out to be wrong. All of these
are now taken from those documents rather than assumed:

| Was | Now | Source |
|---|---|---|
| 2 year warranty | **12 months** | warranty card |
| Shuts off at 90 seconds | **about 2 minutes** | manual §08 |
| Runtime "to be confirmed" | **~70 minutes on Soft** | manual §02 |
| Weight not stated | **260 g ±5%** | manual §02 |
| Battery "3.7 V" | **1100 mAh / 3.7 V** | packaging |
| Model SK-CYQ-D | **R01 (SK-CYQ-D1)** | packaging |
| `hello@reboot.example` | **hello@reboot-lifestyle.com** | card, manual, box |
| Company details "to be published" | **REBOOTME (SMC-PRIVATE) LIMITED**, Kohat, Pakistan | packaging |
| Standard jet ×2 + four others | **five distinct tips**, incl. a plaque brush | manual §06 |
| "Clean where brushing stops" | **"Clean beyond brushing"** | box, manual |

Newly added from the manual because the site had never mentioned them: the
three second crescendo on start-up, mode memory, and the 45° angle and lowest
pressure for the periodontal tip.

## Photography

The product images are now the **manufacturer's own product photograph**, lifted
at full resolution from the packaging artwork (`Reboot_Packaging_Design_.pdf`,
848 × 2608 with its alpha channel intact). It carries the printed `reboot`
wordmark on the body and shows the true finish: a white upper shell over a
smoke-grey translucent tank. The three detail views on the product page —
controls, tank, nozzle — are crops of that same frame, so nothing on the site is
a render any more. The CAD line drawings remain, but only in the specification
inspector where they answer a question a photograph cannot.

Still outstanding: the lifestyle photography listed further down this file, and
a second colourway shot if Matte Carbon or Sage is ever costed.

## The "In use" wall needs assets

The home page carries a reserved media section between the marquee and the
object shot. Nothing in it is invented — every frame is an empty slot at the
aspect the finished asset will be delivered in, and dropping a file in is a
`src` swap with no reflow.

| Slot | Aspect | What it is |
|---|---|---|
| The brand film | 16:9, 1920 × 1080 | Thirty seconds. What the R01 is for. |
| Creator cut ×2 | 9:16 | Vertical, thirty seconds, sound on. |
| Press still ×2 | 9:16 | Vertical, product held, colour unretouched. |

Put `<img>` or `<video>` straight inside `.story-media` — it is already set to
`object-fit:cover` and clipped to the frame's corner radius. If a recognisable
person appears, the caption must name them and state plainly whether they were
paid; that is the line the copy in that section commits to.

## Both grounds

The site now ships a **light and a dark theme**, toggled from the masthead and
remembered per visitor. The pale ground is pure white, and the footer always
runs inverted — black under the light theme, paper under the dark one. A first-time visitor gets whichever their operating
system asks for. The two are one token set, not two stylesheets: `--tint`,
`--white` and `--on-white` invert and every component rule follows. The CAD line
drawings are inverted by filter on the pale ground; the inline anatomical
diagrams keep a dark plate on both, because their fills are baked in.

**The warranty change matters commercially.** The site had been promising two
years in six places, including the buy box and the warranty page. The card the
customer gets in the box says twelve months. Twelve is now what the site says.

## Still to resolve

**The mode names still disagree inside the manual itself.** Its table calls
them Massage, Soft, Normal and Clean; the diagram on the same page labels the
same four positions Pulse, Soft, Standard and Strong. **The site now follows the
table** — the set printed in words — and uses Massage, Soft, Normal and Clean
everywhere: the pressure simulator, the specification list, the diagnosis
matcher, the home page hotspot and the nozzle guidance. The diagram on page 04
of the manual should be relabelled to match before the next print run, or the
box and the site will say different things.

**The registration number** for REBOOTME (SMC-PRIVATE) LIMITED is still missing
from the terms page.

**The domain** on all printed material is reboot-lifestyle.com. The site should
be deployed there rather than to the Vercel preview URL.

## The primary typeface is a stand-in, and needs licensing

The brand book's specimen page names **Aloevera** as the primary typeface. It is
a commercial licence and cannot be redistributed in a repository, so the site
ships **Poppins** in its place: the same genre — geometric, single-storey a,
circular bowls — in the three weights the book specifies, Regular, Medium and
Bold. Azeret Mono is the brand's own secondary face and is used exactly as the
book sets it out.

**To swap in the real face:** drop Aloevera's woff2 files into `assets/fonts/`
and change the three `@font-face` blocks and the one `font-family` line at the
top of `site.css`. Nothing else refers to the family by name.

If Aloevera cannot be licensed for web use, **Outfit** is the closer free match
on the details — Aloevera's angled terminals on t, f and e are Outfit's too,
where Poppins cuts them flat. Poppins matches better on width and weight colour.
Either is defensible; this is a call for whoever owns the brand.

Note the hierarchy page of the book names "Nohemi" in its table while the
specimen page names Aloevera, and it labels four different levels "H3". The
sizes and line heights on that page are used as given; the typeface name on it
is treated as a leftover from the template it was built in.

## Invented in this prototype, needs the client's word

| Item | Where it came from | Appears in |
|---|---|---|
| **The product name "Gloss"** | supplied in the brief, not in the SRS or on the packaging | nav, page titles, PDP heading, shop card, cart, footer |
| **"Matte Carbon" and "Sage" colourways** | supplied in the brief | PDP swatch row, marked *Considered* |
| **Nozzle four-pack at $12** | invented, needed a second SKU for the cart upsell | cart drawer |
| **SKU codes `RB-001-WHT`, `RB-NOZ-4`** | invented | cart, analytics events |

The two extra colourways are shown as *Considered* and cannot be selected,
because the site's whole argument is that it does not claim things it cannot
back. If the client has not costed them, take them out rather than soften the
label. Note also that SRS §5 says "Variants: 2 Colors" and the site ships one.

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

The **how-to-use animation** required by the SRS is the animated technique
diagram, available inline and in a modal from the product gallery
("Watch the technique"). It is a drawn sequence, not film. The modal says so in
as many words. A filmed fifteen second sequence should replace it before launch;
we would rather show our own drawing than stock footage of another product.

## Analytics

GA4 and Meta Pixel are installed on every page via `assets/js/analytics.js`, wired
to `view_item`, `add_to_cart` and `sign_up`, and mapped to the Meta equivalents.
**Both IDs are empty**, so nothing is sent anywhere until the client fills them in
at the top of that file. The script also honours Do Not Track and Global Privacy
Control before loading either vendor.

On Shopify this becomes a snippet included from `theme.liquid` with the two IDs
coming from theme settings rather than being edited in the file.

## The cart is real, the checkout is not

The slide-over cart is a working client-side cart: quantities, removal, the free
shipping meter, the nozzle upsell and the subtotal all calculate correctly. State
lives in memory only and is deliberately not persisted, because there is no back
end and a cart that survived a reload would imply one. "Checkout now" says
plainly that checkout is Shopify's and is not reproduced here.

Two SKUs exist in the prototype catalogue: `RB-001-WHT` at $79 and `RB-NOZ-4` at
$12. **The $12 nozzle set is a placeholder price and the SKU codes are invented.**
Both need confirming before launch.

## Not wired up

All four forms are inert and say so on submit. Checkout and account flows are
Shopify's and are not reproduced here.
