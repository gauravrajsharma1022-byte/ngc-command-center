# Mason Notes — 06-visual.png (REDESIGN, v2)

**Post:** 7 Signals Shaping Customer Experience in the Digital World (Telecom)
**Run date:** 2026-08-29 — full redesign of the 2026-08-27 visual, requested directly
because the v1 visual read as a text dump in colored boxes rather than an editorial
piece. Rebuilt `gen_visual.py` from scratch (new layout logic throughout); no wording
in the underlying caption was touched.

**Caption source:** `03-draft.md`, "Round 6 — manual fixes" section (bottom of file) — same
locked caption v1 was built from. Not re-opened, not re-worded.

---

## Gate check (re-confirmed, not re-litigated)

`04-sentinel-review.md` on disk is still Round 5 and still says "Ready for revision" —
that verdict is stale by design, same as it was for v1. I re-verified, line by line
against the current `03-draft.md` text, that Sentinel's five Round-5 findings are all
addressed by the "Round 6 — manual fixes" applied directly to the draft:

1. Closing question no longer lists "the operating model" as a third item parallel to
   measurement/ownership — confirmed split into two sentences, used verbatim.
2. Hook/bridge no longer promise an enumerable "7 signals... two are X, one is Y" —
   confirmed reworded to "seven signals... collapse into two gaps and one model."
3. Hook's "proven" is "already demonstrated," matching Beat 3's own hedge — no
   contradiction.
4. German-study scope bridge sentence is present in Beat 1.
5. "Domain-specific AI agents" (not just "agents") grounds the thesis's "have... the AI"
   claim.

No wording problems were found in the locked caption itself that need flagging back to
Scribe. This redesign only changes how the already-approved words are composed
visually — it does not add, remove, or reword a single caption claim; it only chooses
which subset of the caption's own words appears on the canvas.

---

## What changed from v1, and why

The brief's five directives, and what was done for each:

**1. Cut text volume hard.** V1 put full explanatory sentences inside each point
card ("96% of companies measure customer satisfaction — but only 20% convert that
measurement into financial impact."). V2 pulls only the two headline figures out
of each beat and renders them as a huge-number / tiny-label pair — the sentence
stays in the caption; the visual teases the number only. Card 1 and Card 2 each
dropped their explanatory sentence and their "the gap closes when..." payoff line
entirely (both fully covered in the caption's own text; the visual's job here is to
support, not restate).

**2. Removed duplication.** V1 had a title ("Two structural gaps — and one operating
model that closes them.") immediately followed by a subtitle restating the same
thing with the two gap names spelled out again ("Seven signals. Two structural gaps:
data without a closed loop, intent without ownership. One operating model that
closes them."). V2 keeps only the title. The subtitle paragraph is gone — the two
gap names now live only where they're introduced properly, in the point-card headers
below.

**3. Numbers as the hero everywhere, not just at the bottom.** V1's bottom proof
stat block (50-70% / 15-25%) was already doing "huge number, tiny label" — that's
untouched. V2 extends the identical treatment two more places: (a) inside Card 1
and Card 2, each beat's two figures now render as large Lexend numerals with a
short Source Sans label underneath, via a new shared `stat_pair_row()` helper so the
pattern is implemented once, not copy-pasted three times; (b) the bottom stat
block's secondary figures (15% operating-cost drop, 5% upsell/cross-sell lift),
which were a single dense prose sentence in v1, now get the same number-hero
treatment at a visibly smaller scale, so the primary 50-70%/15-25% pair still reads
as the strongest claim on the page (a deliberate size hierarchy: card numbers at
42px, secondary bottom-block numbers at 32px, primary bottom-block numbers at 60px).

**4. More negative space.** Every section gap was increased versus v1 (e.g. gap
after the top bar 40px → 52px, after the headline 22px → 36px, after the thesis
card 44px → 56px, between point cards 20px → 32px, before the closing question
48px → 56px). Card internal padding also increased (24px → 32px). Combined with
directive 1's text cuts, the page now reads as a small number of large, deliberate
elements rather than many small text-filled boxes.

**5. Kept what was working.** The GAP / GAP / TM FORUM CATALYST tag distinction is
unchanged — Card 3 is still never labelled a "gap." The Navy/Blue/Cyan palette and
the gravity technique (Blue → dark-Cyan tint → Navy, lightest to heaviest, signaling
the resolving card's weight) are unchanged. The proof stat's hedge line — "It's one
consortium's proof of concept, not an industry average." — is unchanged, verbatim.
The closing question is unchanged, verbatim.

---

## Content covered

- Headline (thesis-level claim, single treatment, no restated subtitle)
- Thesis card (locked one-sentence thesis, verbatim, in full)
- Card 1 "Data without a closed loop" (GAP) — 96% / 20% as hero stats
- Card 2 "Intent without ownership" (GAP) — 83% / 54% as hero stats
- Card 3 "The operating model that actually closes the gap" (TM FORUM CATALYST) —
  two short noun-phrases (consortium composition; the three-part care model)
- Proof stat block — 50-70% / 15-25% (primary hero pair) + 15% / 5% (secondary hero
  pair) + the proof-of-concept hedge, verbatim
- Closing engagement question, verbatim, in full

## Wording discipline — every string traced to the caption or flagged as furniture

All of the following are either **verbatim** substrings of the locked caption, or a
**straight subtraction** (leading/trailing clause or an interior connective word
dropped — never reworded, never reordered):

| On-canvas text | Cut from caption's own words |
|---|---|
| "Two structural gaps — and one operating model that closes them." | Bridge line, dropped leading "They collapse into," capitalized "Two." (unchanged from v1) |
| "96%" / "measure customer satisfaction" | "96% of companies measure customer satisfaction" — dropped interior "of companies" |
| "20%" / "convert into financial impact" | "...convert that measurement into financial impact" — dropped "only," "that measurement" |
| "83%" / "expect CX investment to grow" | "83% of CX experts expect CX investment to grow" — dropped interior "of CX experts" |
| "54%" / "have a dedicated team responsible for it" | "Only 54% have a dedicated team responsible for it." — dropped leading "Only" |
| "Eleven-organisation consortium — Vodafone, TELUS and Verizon." | "An eleven-organisation consortium — including Vodafone, TELUS and Verizon — ran one live deployment..." — dropped leading "An," interior "including," trailing clause; capitalized "Eleven" (sentence-initial only) |
| "Concierge, orchestration and domain-specific AI agents." | "The care model shifted from reactive, CRM-driven queues to concierge, orchestration and domain-specific AI agents." — dropped leading clause; capitalized "Concierge" |
| "15%" / "drop in operating cost" | "...a 15% drop in operating cost and a 5% lift..." — dropped leading "a" |
| "5%" / "lift in upsell and cross-sell revenue" | "...and a 5% lift in upsell and cross-sell revenue." — dropped leading "and a" |
| "It's one consortium's proof of concept, not an industry average." | Verbatim (trailing "— but it's the clearest evidence..." clause already cut in v1; unchanged here) |
| "Where's your gap — measurement or ownership? And is there an operating model in place to actually close it?" | Verbatim, unchanged |
| Thesis card text | Verbatim, unchanged |

Furniture-only text not sourced from the caption (unchanged from v1, consistent with
prior Watchtower visuals): "WATCHTOWER" bar label, "TELECOM CUSTOMER EXPERIENCE"
category pill, "GAP" / "GAP" / "TM FORUM CATALYST" card tags, and the brand tagline
"Reliable. Resilient. Resolute."

No new claims, numbers, or paraphrased sentences were introduced anywhere in this
redesign.

---

## Brand system

- Light theme, Navy `#0c1945` / Blue `#3d5ad9` / Cyan `#05aff2` only — no third hue.
- Gravity technique unchanged: Card 1 Blue, Card 2 a darkened Cyan tint
  (`blend(CYAN, NAVY, 0.45)`), Card 3 full Navy — lightest to heaviest, signaling the
  resolving operating-model card's weight without introducing a new color.
- New shared helper `stat_pair_row()` added to the generation script (not to
  `watchtower_visuals.py` — it's specific to this layout, not a general-purpose
  primitive worth promoting yet) so the "huge number / tiny label" pattern is
  written once and reused for both the card-level stats and the bottom block's
  secondary stats, instead of being copy-pasted three times.
- Fonts: Lexend (display/numerals) and Source Sans 3 (body/labels), loaded via
  `pipeline/watchtower_visuals.py`'s `lexend()`/`source()` helpers — no other fonts.
- Real Northgate logo files (`northgate-logo-white-transparent.png` top bar,
  `northgate-logo-navy-transparent.png` footer) via `paste_logo()`.

## Contrast verification

Every text/background pairing was computed with WCAG relative-luminance contrast
ratios inside `gen_visual.py` (not assumed) — 22 pairings checked on the final
render, **all PASS**. Notably:

- Card hero-stat labels use a light icy tint (`blend(WHITE, CYAN, 0.20)`) rather
  than pure white, to create a visible number/label hierarchy on the dark card
  backgrounds — verified at 4.74:1 and 4.75:1 against Card 1's Blue and Card 2's
  dark-Cyan tint respectively, clearing even the stricter 4.5:1 body-text
  threshold, not just the 3.0:1 large-text one.
- The "GAP" / "TM FORUM CATALYST" tag pills remain solid opaque white with Navy
  text (16.93:1) — the specific invisible-text failure mode this pipeline shipped
  once before (translucent white pill + white text) does not recur here; this was
  fixed in v1 and carried forward unchanged in v2.
- Full pass/fail log is printed by the script on every run.

## Glyph safety

Only ASCII, em dash "—", and straight quotes appear in rendered text. No arrow
glyphs, no middle dots, no curly quotes (sanitized via the `s()` helper on every
string before drawing).

## Crop / dimensions

Built tall at 1080 x 3400px, measured actual content end (y = 1918px after the
footer), then cropped via `crop_to_content()` with 32px bottom padding.

**Final saved dimensions: 1080 x 1950px** (portrait, LinkedIn-feed-ready). This is
taller than v1's 1080x1700 despite having meaningfully less text — that's the
direct, intended result of directive 4 (more negative space) plus the new
secondary hero-stat row (directive 3), not unused dead space: content runs to
within 32px of the crop line, verified against the render, no trailing gap at the
bottom.

## Files

- Generation script: `gen_visual.py` (in this folder) — rewritten from scratch,
  reuses every helper from `pipeline/watchtower_visuals.py` (`hx`, `blend`,
  `lexend`, `source`, `wrap`, `draw_lines`, `text_w`, `dot_grid`, `paste_logo`,
  `crop_to_content`, `new_canvas_light`); adds one new local helper
  (`stat_pair_row`) specific to this visual's layout.
- Output: `06-visual.png`, 1080 x 1950px, overwritten in place.
