# Phases 2 & 3 — Competitive Landscape and Customer Psychology

Executed against the protocol in [`01-research-protocol.md`](01-research-protocol.md).
Every observation is recorded with its mechanism and a transferability judgement.

---

## 1. Market context

| Fact | Source |
|---|---|
| Global water flosser market ≈ **$1.06–1.17B (2025–26)**, growing ~4.7–5.8% CAGR | IMARC, Fortune Business Insights |
| **Waterpik leads decisively** — ~40% share by one estimate, far higher in "power flosser" specifically | Future Market Insights, Keychain |
| **Cordless leads product mix at ~46%** | Fact.MR |
| Named leaders: Waterpik, Philips (Sonicare), Panasonic, P&G, Burst, Church & Dwight, Colgate-Palmolive | Persistence Market Research |
| **Chinese OEM-turned-brands (Nicefeel, Fly Cat and peers) are taking share across both premium and value tiers** | Dataintelo |

Two things follow. First, this is a **mature category with an entrenched leader** —
reboot is not creating demand, it is taking it, which means the site's job is
comparative rather than educational about the category itself. Second, the segment
reboot is entering is **crowded with near-identical OEM-derived brands**, and the
default customer assumption will be that reboot is another one. Overcoming that
assumption is the central design problem.

---

## 2. feno.co — primary reference

Feno sells a $299–$519 connected "Smartbrush." Not a direct competitor — different
product class, different price tier — but the strongest structural reference.

### What works, and why

**Bundles at the very top, before any storytelling.** Three tiers ($299 / $399 / $519)
with the middle tier value-loaded. *Mechanism:* visitors arriving from paid social are
already qualified, and forcing them through a narrative before showing an offer costs
conversions. *Transferable:* the principle, not the pattern. reboot has one product in
two colours — no tier ladder exists. What transfers is **not making a ready buyer
scroll to buy**.

**Payment framing as friction removal.** Affirm instalments, HSA/FSA eligibility, and
a money-back guarantee sit adjacent to price, not buried. *Mechanism:* reframes a
$299 decision as $27/month and removes the "is this refundable" question at the moment
it forms. *Transferable:* yes — the guarantee and returns terms belong beside the price.
Instalments only if genuinely offered.

**Quantified health-stakes section.** 65% / 14% / 70% / 22% figures linking oral health
to systemic disease. *Mechanism:* raises the stakes of the purchase from cosmetic to
medical, justifying the price. *Transferable — with a hard caveat.* This is the most
attractive and most dangerous pattern on the site. Feno can gesture at published
research; reboot cannot make these claims for a water flosser without substantiation
(risk R9). **Adopt the intent — establish why this matters — reject the unsourced
statistical framing.**

**Professional endorsement with full credentials.** Four named practitioners with
practice names and locations. *Mechanism:* in a health category, professional
credibility outranks customer volume — one named dentist beats a hundred anonymous
five-stars. *Transferable: yes, and it is the single highest-value pattern on the page
for reboot*, because it is the one form of credible proof available to a brand with
zero customers. Corroborated by the customer research in §5, where "two dentists told
me" recurs constantly.

**Genuinely honest FAQ.** "Who is Feno not for?" — under-18s, braces, recent crowns,
pacemakers. Also "Am I locked into a subscription?" (no) and "Can I use my own
toothpaste?" (yes). *Mechanism:* volunteering disqualifying information is a costly
signal; a brand willing to lose a sale reads as trustworthy on everything else.
*Transferable: yes, emphatically.* This is the cheapest credibility available to reboot
and it costs nothing but nerve.

**Comparison table against category alternatives** — full-mouth brush vs. electric vs.
manual. *Mechanism:* frames the decision on axes where the product wins.
*Transferable: yes*, comparing against string floss and category norms rather than
named competitors — more useful to the buyer and legally safer.

### What does not work

- **Duplicated content.** The bundle block and the six-benefit grid each render twice
  in the DOM — desktop and mobile variants both present. Real weight cost, and exactly
  the sort of thing our performance budget forbids.
- **Section proliferation without hierarchy.** Insights, systemic benefits, tech,
  how-it-works, plaque comparison, professionals, FAQ, comparison — each individually
  good, cumulatively flattening. Everything is emphasised, so nothing is.
- **The AI framing is the whole identity.** "Harnessing Artificial Intelligence,"
  AI-powered tips, machine-learning analysis. It dates the brand to a moment and it is
  **explicitly out of bounds for reboot**. Feno's structure is worth studying; its
  positioning is the opposite of where reboot should go.
- **Before/after plaque imagery carries a disclaimer** — "Feno does not guarantee
  results" — which quietly undercuts the section it sits in.

### The single largest missed opportunity
Feno never really addresses **whether you will still be using it in three months.**
For a $299 device replacing an ingrained habit, that is the real risk the buyer is
carrying, and nobody in this category speaks to it. That gap is where reboot's strategy
is built.

---

## 3. coslus.com — direct competitor

Water flossers, $24–$40. The closest analogue to what reboot is launching, and the
clearest picture of the tier reboot must escape.

### What works
- **Warranty and shipping promises in the masthead** — 2-year warranty, free shipping,
  30-day returns, stated site-wide. Cheap, effective, and the correct instinct.
- **"10,000,000+ users"** — for an unknown brand, aggregate scale substitutes for
  brand recognition. reboot cannot use this and must find another anchor.
- **Colour variants surfaced on the collection card** — "Available in 4 colors" before
  the click. Small, genuinely useful.
- **Review counts and ratings on every card** — 4.3–5.0 across 10–604 reviews.
- **A brand story that names a belief**, not just a founding date.

### What fails
- **Performance.** The client identified this and the evidence supports it: the
  homepage carries multiple hero carousels, and the extracted DOM shows the entire
  brand-story block and best-seller grid **rendered twice** — once for desktop, once
  for mobile. The same product card appears four consecutive times in one rail. This
  is duplicated markup as a layout strategy, and it is the primary reason the site
  feels heavy.
- **The homepage is a catalogue dump, not an argument.** Best sellers, then brand
  story, then more product cards. No point of view, no reason to choose them.
- **Amazon-derived product naming leaks onto the site** — "COSLUS C20 (F5020E) Water
  Flosser 300ML for Teeth Cleaning." SKU-and-keyword naming reads as a marketplace
  seller, and it is one of the strongest signals that a brand is not premium.
- **Positioning is entirely price-led.** "Better experience at the same price." That is
  a value claim, and it caps the brand permanently.
- **Carousels for primary content.** Auto-rotating heroes are among the
  best-documented conversion-neutral-to-negative patterns in e-commerce, and they cost
  layout stability.

### Verdict
Coslus is competent and beatable. It is a well-run marketplace business with a website
attached. **The gap it leaves open is brand conviction** — there is no reason to
prefer Coslus other than price, which means anyone offering a genuine reason to care
can take its customers without competing on price.

---

## 4. Waterpik — category leader

The default. When someone decides to buy a water flosser, they usually mean "a
Waterpik" — the brand is a genericised category name, as the customer research
confirms.

**Strengths:** clinical credibility, ADA Seal on many models, dentist familiarity,
retail ubiquity, editorial dominance (Forbes and Wirecutter both place Waterpik first
in 2026).

**Weaknesses, and they are real:**
- **Design language is medical-device, not lifestyle.** Bulky countertop units,
  clinical white plastic, visible hoses. It looks like equipment.
- **Noise.** Forbes on the Aquarius: "undeniably loud, as were all water flossers we
  tested." A category-wide, universally-acknowledged, unaddressed weakness.
- **The digital experience is a legacy manufacturer site** — deep model hierarchies,
  spec-sheet presentation, little storytelling.
- **No relationship with a Gen Z buyer.** It is a brand people are told to buy by their
  dentist, not one they choose.

**The opening:** Waterpik owns *efficacy* and *authority*. It does not own *desire*.
There is no premium, design-led, lifestyle-positioned brand in this category the way
there is in almost every adjacent one. That is the position reboot is aiming at.

---

## 5. Customer psychology — from real buyers

Drawn from unprompted consumer discussion rather than marketing research. This is the
most valuable input in the whole analysis, because it reveals the objections buyers
never put in a survey.

### Objection 1 — "It doesn't do anything." *The dominant objection.*
> "I have never seen anything come out of my teeth using this water flosser I got."
> "I feel the same after using this gimmicky ass water flosser even on max pressure."

Water flossing produces **no dramatic visible payoff** for many people, especially
those with tightly-packed teeth. String floss gives immediate tactile and visual
feedback; water flossing often gives none. The buyer's expectation was set by
marketing showing debris flying out, reality delivers nothing, conclusion: it's a gimmick.

**This is the single most important thing for reboot's site to address, and every
competitor gets it wrong by over-promising the dramatic version.**

### Objection 2 — replacement versus supplement confusion
Recurring, and stated bluntly by users:
> "Water flossers are not meant to replace flossing, but aid in gum health."
> "Dental Floss > Waterpik > Nothing at all."

The category markets water flossers as floss replacements. Experienced users and
dentists consistently describe them as complementary — superior at the **gumline and
in periodontal pockets**, inferior at the tight interproximal contact where string
floss excels. Brands that promise replacement manufacture their own disappointment.

### Objection 3 — technique
> "They work, they just require a strong amount of accuracy."
> "Run along the gum line and in between teeth, not along the middle of the teeth."

**People fail because they use it wrong.** They aim at the tooth face instead of
tracing the gumline, and get nothing.

This finding independently validates the SRS's required how-to-use animation. It is
not a nice-to-have or a decorative flourish — **it is the direct remedy for the
category's primary failure mode**, and it should be treated as the strategic centre of
the product page.

### Objection 4 — noise, mess, and countertop presence
Universal and acknowledged even by category champions. Loud motors, splashing,
refilling the tank, and a bulky object living permanently on a bathroom counter.

For a **Gen Z, design-conscious** buyer — often in shared flats or small bathrooms —
the object's presence and noise are not secondary concerns.

### Who genuinely needs one — the highest-intent segments
From users describing why it worked for them: **braces and permanent retainers**;
**gum pockets and periodontal treatment**; **gum recession** where brushing is
damaging; **wisdom-tooth gaps and awkward tooth positioning**; **dexterity
limitations**; **implants and crowns**.

These are not edge cases — they are the buyers who convert, retain and recommend.
The site should let them recognise themselves quickly rather than burying them in
generic messaging.

### What actually persuades
> "Two different dentists have told me that water flossers are actually more effective."
> "They both recommended using a waterpik, and they didn't sell them, so it wasn't like
> they were scamming me."

**Professional recommendation, from a source with nothing to gain, is the trust anchor
of this category.** Note the reasoning in the second quote — the absence of a
commercial interest is what made it credible. That has a direct design implication:
practitioner endorsement must be presented with verifiable credentials and without
looking bought.

---

## 6. Positioning map

Two axes that matter here — **price** and **design conviction** (whether the brand has
a point of view beyond specification).

```
                    HIGH DESIGN CONVICTION
                             │
                             │        ◆ Feno ($299–519)
                             │          design-led, but
              ○ ← reboot     │          AI-positioned
                (open)       │
                             │
   LOW PRICE ────────────────┼──────────────── HIGH PRICE
                             │
        ◆ Coslus             │   ◆ Waterpik ($50–100)
        ($24–40)             │     authority without desire
        price-led            │
                             │
                    LOW DESIGN CONVICTION
```

**The upper-left quadrant is empty**: attainable price with genuine design conviction.
No brand in this category occupies it. Feno proves a design-led oral care brand can
command attention, but at a price point and with a technology framing that excludes
most buyers.

That is reboot's position — and it is only defensible if the site actually carries
the conviction, because the product itself is likely OEM-derived and comparable to
competitors on paper. **The experience is the differentiator.** Which is precisely
why the design work matters more here than in a category where the hardware speaks
for itself.

→ Strategy in [`08-strategy.md`](08-strategy.md).
