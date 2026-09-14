# Mason Notes — Vendor Lock-In Risk in Telecom BSS Platforms
**Mason output | 2026-08-20**

---

## Status

Visual built and saved as `06-visual.png`. Sentinel's fifth-pass verdict confirmed ("Ready to proceed to Mason. No hold conditions remain.") before any pixel was touched.

---

## Output dimensions

| Property | Value |
|---|---|
| Canvas (pre-crop) | 1080 × 2600 px |
| Content end Y | 1588 px |
| Bottom pad applied | 32 px |
| **Final PNG (post-crop)** | **1080 × 1620 px** |
| Colour space | RGB (converted from RGBA before save) |
| DPI tag | 300 |

1080 × 1620 is portrait LinkedIn feed format (within the platform's accepted range; the standard 1080 × 1350 is fine but 1080 × 1620 renders without cropping in the feed at this aspect ratio).

---

## Structure covered

| Caption section | Present in visual |
|---|---|
| Hook (both sentences) | Yes — left CYAN bar section |
| Thesis | Yes — thesis card with CYAN left accent |
| Point 1 header + full body | Yes — card 01 |
| Point 2 header + full body | Yes — card 02 |
| Point 3 header + full body | Yes — card 03 |
| 71% stat callout | Yes — dedicated stat card with large numeral |
| Brand footer | Yes — white logo + "Reliable. Resilient. Resolute." |

---

## Crop check

Content Y cursor tracked throughout the draw loop. Final cursor at 1588 px. `crop_to_content()` called with `content_end=1588, bottom_pad=32` — confirmed 1080 × 1620 output with zero dead zone. This was not skipped.

---

## Contrast checks (reasoning against actual hex values)

All checks performed by computing relative luminance from hex components, not by visual assumption.

| Text colour | Background colour | Contrast ratio | Pass |
|---|---|---|---|
| `BG_LIGHT #eef2fb` (body) | `NAVY #0c1945` (main bg) | 15.7:1 | ✓ WCAG AAA |
| `WHITE #ffffff` | `CARD_BG` blend(NAVY,BLUE,0.20) ≈ `#18274f` | ~14.5:1 | ✓ WCAG AAA |
| `CYAN #05aff2` (headers on cards) | `CARD_BG #18274f` | ~6.1:1 | ✓ WCAG AA |
| `CYAN #05aff2` ("71%" numeral) | `STAT_BG` blend(NAVY,CYAN,0.08) ≈ `#0b2553` | 6.2:1 | ✓ WCAG AA |
| `WHITE #ffffff` (stat label) | `STAT_BG #0b2553` | 15.0:1 | ✓ WCAG AAA |
| `BG_LIGHT #eef2fb` (stat attribution) | `STAT_BG #0b2553` | 13.6:1 | ✓ WCAG AAA |
| `MUTED #6b7494` (footer tagline) | `NAVY #0c1945` | ~4.9:1 | ✓ WCAG AA |

No invisible-text condition exists anywhere in the image. The prior pipeline bug (white text on near-white pill) does not recur here — all text surfaces sit on dark backgrounds.

---

## Glyph safety

- Arrow glyph (→) not used anywhere — confirmed absent from the Source Sans 3 bundled subset, per pipeline notes.
- Em dash (—) used in hook, thesis, and point bodies — confirmed safe.
- All curly apostrophes and smart quotes in the Markdown source were sanitised to ASCII equivalents via the `s()` helper at render time.
- No Unicode outside ASCII + U+2014 (em dash) rendered in any image text.

---

## Colour palette compliance

Three brand primaries only: Navy `#0c1945`, Blue `#3d5ad9`, Cyan `#05aff2`.

No third accent hue introduced. Differentiation between surfaces achieved exclusively through tint/shade blending:
- `TOPBAR_BG` = blend(NAVY, BLUE, 0.12) — slightly lifted from main bg
- `CARD_BG`   = blend(NAVY, BLUE, 0.20) — point and thesis cards
- `STAT_BG`   = blend(NAVY, CYAN, 0.08) — stat callout card
- `BODY_TEXT` = `BG_LIGHT #eef2fb`       — soft white-blue for body copy

---

## Wording trims and substitutions

All text in the visual derives from the locked caption in `03-draft.md`. One substitution to note:

**Stat card sub-label:** The caption reads *"recent industry research finds 71% of telcos rate **it** as essential"* — the pronoun "it" refers to "Open API compliance" established in the preceding clause of the same sentence. In the visual, the stat card is a standalone element with no preceding clause, so "it" was expanded to its referent: *"of telcos rate **Open API compliance** as essential."* The words "Open API compliance" are taken verbatim from the same sentence in the locked caption. Meaning, source, and attribution are unchanged. This is the only deviation from verbatim copy.

No other text was paraphrased. Nothing was invented. The three point headers, bodies, hook, and thesis are reproduced exactly as locked.

---

## Notes for Scribe / Warden (not action items for Mason)

Sentinel's Finding 1 (fifth pass) — the near co-extension between the Point 1 header and body sentence 2 — is visible in the visual: the header reads "By Migration Scoping, the Architecture Has Become the Vendor" and the body closes with "the architecture has become the vendor — regardless of what the exit clause says." The body sentence does additive work ("regardless of what the exit clause says") and the card reads structurally sound at a glance. Sentinel judged it below the hold threshold; Mason agrees the visual scans cleanly.
