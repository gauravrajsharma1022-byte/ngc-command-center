"""
06-visual.png — generation script (REDESIGN, v2)
Post: 7 Signals Shaping Customer Experience in the Digital World (Telecom)
Run date: 2026-08-29 (redesign of the 2026-08-27 visual — rebuilt from scratch,
not a tweak, per direction: cut text volume, remove headline/subtitle
duplication, make numbers the hero inside the point cards, add more negative
space, keep the GAP/GAP/TM FORUM CATALYST distinction and the bottom proof
stat block's "huge number, tiny label" treatment).

Reuses every helper from pipeline/watchtower_visuals.py — no font-loading,
wrapping, blending or logo-pasting logic is duplicated here.

Every text string below is either verbatim from the locked caption
(03-draft.md, Round 6 manual fixes applied) or a straight subtraction of a
leading/trailing/minor-connective word from the caption's own sentence
(never a paraphrase, never new wording). See 05-mason-notes.md for the exact
before/after of every cut. Brand-furniture strings (WATCHTOWER label,
category pill, GAP / TM FORUM CATALYST tags, tagline) are not caption text,
matching prior Watchtower visuals.

Run from any directory:
  python3 "...outputs/2026-08-27-7-signals-shaping-customer-experience-in-digital-world-keep-/gen_visual.py"
"""

import sys, os

SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PIPELINE_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, "..", "..", "pipeline"))
sys.path.insert(0, PIPELINE_DIR)

from watchtower_visuals import (
    hx, blend, lexend, source, text_w, wrap, draw_lines,
    dot_grid, paste_logo, crop_to_content, new_canvas_light,
    NAVY, BLUE, CYAN, INK_SOFT, MUTED, BG_LIGHT, WHITE,
    LOGO_NAVY, LOGO_WHITE, MARK_400,
)
from PIL import Image, ImageDraw

# ── Sanitize helper — safe characters only ───────────────────────────────────
def s(text):
    return (text
        .replace("’", "'").replace("‘", "'")   # curly apostrophes
        .replace("“", '"').replace("”", '"')   # curly double quotes
        .replace("–", "—")                     # en-dash -> em-dash (safe)
        # em-dash U+2014 is confirmed safe in this pipeline; keep it.
        # Arrow glyph U+2192 is confirmed MISSING from the bundled font — never emit it.
    )

# ── Contrast check helper (reason about actual hex values, don't assume) ─────
def _linear(c):
    c = c / 255
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

def rel_luminance(rgb):
    r, g, b = rgb
    return 0.2126 * _linear(r) + 0.7152 * _linear(g) + 0.0722 * _linear(b)

def contrast_ratio(fg, bg):
    l1 = rel_luminance(hx(fg) if isinstance(fg, str) else fg)
    l2 = rel_luminance(hx(bg) if isinstance(bg, str) else bg)
    lighter, darker = max(l1, l2), min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)

CONTRAST_LOG = []
def check_contrast(label, fg, bg, min_ratio=4.5):
    ratio = contrast_ratio(fg, bg)
    ok = ratio >= min_ratio
    CONTRAST_LOG.append((label, round(ratio, 2), min_ratio, ok))
    return ratio

# ── Canvas constants ──────────────────────────────────────────────────────────
W       = 1080
H_TALL  = 3400          # generous tall draft; will crop to content
PAD     = 64
INNER_W = W - 2 * PAD   # 952px usable width
OUT     = os.path.join(SCRIPT_DIR, "06-visual.png")

# ── Derived brand colours — Navy/Blue/Cyan family only ────────────────────────
# Gravity technique (reused from the pipeline's first post, the People card):
# darker shade = heavier / resolving item. Card 3 (the operating model that
# closes the gap) gets full NAVY; cards 1-2 (the two open gaps) get BLUE and a
# darkened CYAN tint so white text clears 4.5:1 against it.
CARD1_BG   = hx(BLUE)                       # (61, 90, 217)
CARD2_BG   = blend(CYAN, NAVY, 0.45)        # darkened cyan tint, same hue family
CARD3_BG   = hx(NAVY)                       # (12, 25, 69) — heaviest, resolving item
STAT_BG    = blend(CYAN, WHITE, 0.88)       # light cyan tint, dark text sits on it
TOPBAR_BG  = hx(NAVY)
LABEL_TINT = blend(WHITE, CYAN, 0.20)       # icy tint for small labels on dark cards

# ── Font objects ────────────────────────────────────────────────────────────
f_wt         = lexend(12, 700)
f_cat        = lexend(12, 600)
f_title      = lexend(44, 800)
f_thesis     = source(20, 600)
f_ptnum      = lexend(12, 700)
f_pthead     = lexend(23, 700)
f_pill       = lexend(11, 700)
f_card_stat_n = lexend(42, 800)
f_card_stat_l = source(13, 600)
f_card_phrase = source(18, 500)
f_stat_n     = lexend(60, 800)
f_stat_l     = source(15, 600)
f_stat_n2    = lexend(32, 800)
f_stat_l2    = source(13, 600)
f_attr       = source(14, 400)
f_footer_q   = lexend(20, 600)
f_footer_t   = source(13, 400)

# ── Build canvas (light theme, matches the pipeline's first post) ────────────
img  = new_canvas_light(W, H_TALL, dot_alpha=10)
draw = ImageDraw.Draw(img)

y = 0

# ── SECTION 1 — Top bar ───────────────────────────────────────────────────────
BAR_H = 76
draw.rectangle([(0, 0), (W, BAR_H)], fill=TOPBAR_BG + (255,))
paste_logo(img, LOGO_WHITE, target_h=26, right_x=PAD + 210, cy=BAR_H // 2)
draw = ImageDraw.Draw(img)

wt_label = "WATCHTOWER"
wt_w = text_w(draw, wt_label, f_wt)
draw.text((W - PAD - wt_w, BAR_H // 2 - 7), wt_label, font=f_wt, fill=CYAN)
check_contrast("topbar WATCHTOWER (cyan on navy)", CYAN, NAVY)
y = BAR_H + 52

# ── SECTION 2 — Hero (single headline, no restated subtitle) ─────────────────
cat_text = "TELECOM CUSTOMER EXPERIENCE"
cat_w = text_w(draw, cat_text, f_cat)
pill_pad, pill_h = 14, 26
draw.rounded_rectangle([(PAD, y), (PAD + cat_w + 2 * pill_pad, y + pill_h)],
                        radius=4, fill=blend(NAVY, BLUE, 0.15) + (255,))
draw.text((PAD + pill_pad, y + 5), cat_text, font=f_cat, fill=CYAN)
check_contrast("hero category pill (cyan on navy tint)", CYAN, blend(NAVY, BLUE, 0.15))
y += pill_h + 32

# Headline — the ONLY headline-level statement in the visual (subtitle that
# used to restate this in different words has been removed per redesign brief).
# Substring of the bridge line (03-draft.md line 49), case-adjusted only:
# "...They collapse into two structural gaps — and one operating model that
# closes them." -> leading "They collapse into" cut, "Two" capitalized.
HEADLINE = s("Two structural gaps — and one operating model that closes them.")
head_lines = wrap(draw, HEADLINE, f_title, INNER_W)
head_lh = 54
y = draw_lines(draw, (PAD, y), head_lines, f_title, fill=hx(NAVY), line_h=head_lh)
check_contrast("headline (navy on light bg)", NAVY, BG_LIGHT)
y += 36

draw.rectangle([(PAD, y), (PAD + 280, y + 3)], fill=hx(BLUE) + (255,))
y += 3 + 48

# ── SECTION 3 — Thesis card (single locked sentence, verbatim) ───────────────
THESIS_TEXT = s(
    "Telecom operators have the data, the AI, and the investment intent — "
    "but until the operating model closes the loop from measurement to "
    "action, none of it converts to loyalty."
)
T_PAD_X, T_PAD_Y, T_BAR_W = 36, 30, 5
thesis_text_w = INNER_W - T_PAD_X * 2 - T_BAR_W
thesis_lines = wrap(draw, THESIS_TEXT, f_thesis, thesis_text_w)
thesis_lh = 30
thesis_h = len(thesis_lines) * thesis_lh
card_h = T_PAD_Y * 2 + thesis_h

draw.rounded_rectangle([(PAD, y), (PAD + INNER_W, y + card_h)], radius=10,
                        fill=hx(WHITE) + (255,),
                        outline=blend(NAVY, BLUE, 0.75) + (60,))
draw.rounded_rectangle([(PAD, y), (PAD + T_BAR_W, y + card_h)], radius=2,
                        fill=hx(CYAN) + (255,))
draw_lines(draw, (PAD + T_BAR_W + T_PAD_X, y + T_PAD_Y), thesis_lines,
           f_thesis, fill=hx(NAVY), line_h=thesis_lh)
check_contrast("thesis card (navy text on white)", NAVY, WHITE)
y += card_h + 56

# ── Helper: hero stat pair (huge number / tiny label), N columns in a row ────
def stat_pair_row(draw, x, top_y, width, pairs, num_font, lbl_font,
                   num_fill, lbl_fill, num_h, gap_after_num=8, align="center"):
    """Draws len(pairs) evenly-spaced columns of (big number / small label).
    Returns the total height consumed."""
    col_w = width // len(pairs)
    lbl_line_groups = [wrap(draw, lbl, lbl_font, col_w - 16) for _, lbl in pairs]
    lbl_h_lines = max(len(g) for g in lbl_line_groups)
    lbl_lh = 18
    for i, (num_txt, _) in enumerate(pairs):
        cx0 = x + i * col_w
        nw = text_w(draw, num_txt, num_font)
        draw.text((cx0 + (col_w - nw) / 2, top_y), num_txt, font=num_font, fill=num_fill)
    ty2 = top_y + num_h + gap_after_num
    for i, g in enumerate(lbl_line_groups):
        cx0 = x + i * col_w
        for ln in g:
            lw = text_w(draw, ln, lbl_font)
            draw.text((cx0 + (col_w - lw) / 2, ty2), ln, font=lbl_font, fill=lbl_fill)
            ty2 += lbl_lh
    return (num_h + gap_after_num + lbl_h_lines * lbl_lh)

# ── SECTION 4 — Three point cards (gravity technique, numbers as hero) ───────
# Each open-gap card (01/02) leads with the two headline figures from its beat
# as a huge-number/tiny-label pair instead of the full explanatory sentence —
# the sentence stays in the caption; the visual teases the number only.
# Card 03 (the resolving operating model) is not a stat card — its beat never
# frames itself as a measurement, so it carries two short noun-phrases instead
# (never call this card a "gap").

CARD1_STATS = [("96%", s("measure customer satisfaction")),
               ("20%", s("convert into financial impact"))]
CARD2_STATS = [("83%", s("expect CX investment to grow")),
               ("54%", s("have a dedicated team responsible for it"))]
CARD3_PHRASES = [
    s("Eleven-organisation consortium — Vodafone, TELUS and Verizon."),
    s("Concierge, orchestration and domain-specific AI agents."),
]

CP_X, CP_Y = 36, 32
CP_LH_H = 30
NUM_GAP, HEAD_GAP, STAT_GAP_AFTER = 10, 26, 0

def measure_card_stats_h(pairs):
    lbl_groups = [wrap(draw, lbl, f_card_stat_l, 300) for _, lbl in pairs]
    lbl_lines = max(len(g) for g in lbl_groups)
    return 42 + 10 + lbl_lines * 18  # num_h + gap + label lines

def measure_card_phrases_h(phrases, avail_w):
    total = 0
    groups = []
    for p in phrases:
        g = wrap(draw, p, f_card_phrase, avail_w)
        groups.append(g)
        total += len(g) * 25
    total += 12 * (len(phrases) - 1)
    return total, groups

CARDS = [
    ("01", CARD1_BG, "GAP", s("Data without a closed loop"), "stats", CARD1_STATS),
    ("02", CARD2_BG, "GAP", s("Intent without ownership"), "stats", CARD2_STATS),
    ("03", CARD3_BG, "TM FORUM CATALYST", s("The operating model that actually closes the gap"), "phrases", CARD3_PHRASES),
]

for num, bg, tag, header, kind, payload in CARDS:
    avail_w = INNER_W - CP_X * 2
    head_lines = wrap(draw, header, f_pthead, avail_w - 150)
    head_h = len(head_lines) * CP_LH_H

    if kind == "stats":
        body_h = measure_card_stats_h(payload)
    else:
        body_h, phrase_groups = measure_card_phrases_h(payload, avail_w)

    num_h, num_gap = 16, 12
    card_h_pt = CP_Y + num_h + num_gap + head_h + HEAD_GAP + body_h + CP_Y

    draw.rounded_rectangle([(PAD, y), (PAD + INNER_W, y + card_h_pt)],
                            radius=12, fill=bg + (255,))

    tx = PAD + CP_X
    ty = y + CP_Y
    draw.text((tx, ty), num, font=f_ptnum, fill=CYAN)

    # Tag pill, top-right of card — solid opaque white bg + navy text so it
    # reads against BLUE, dark-CYAN and NAVY card backgrounds alike (this is
    # the exact "translucent-white-pill + white-text" bug this pipeline
    # shipped once before; verified opaque here, not assumed safe).
    tag_w = text_w(draw, tag, f_pill)
    tag_pad = 10
    tpx1 = PAD + INNER_W - CP_X
    tpx0 = tpx1 - tag_w - 2 * tag_pad
    tpy0 = y + CP_Y - 4
    tpy1 = tpy0 + 22
    draw.rounded_rectangle([(tpx0, tpy0), (tpx1, tpy1)], radius=11,
                            fill=hx(WHITE) + (255,))
    draw.text((tpx0 + tag_pad, tpy0 + 5), tag, font=f_pill, fill=hx(NAVY))
    check_contrast(f"card tag pill '{tag}' (navy on white)", NAVY, WHITE)

    ty += num_h + num_gap
    draw_lines(draw, (tx, ty), head_lines, f_pthead, fill=hx(WHITE), line_h=CP_LH_H)
    check_contrast(f"card '{header}' header (white on card bg)", WHITE, bg)
    ty += head_h + HEAD_GAP

    if kind == "stats":
        stat_pair_row(draw, tx, ty, avail_w, payload,
                      f_card_stat_n, f_card_stat_l,
                      hx(WHITE), LABEL_TINT, num_h=42, gap_after_num=10)
        check_contrast(f"card '{header}' stat numbers (white on card bg)", WHITE, bg)
        check_contrast(f"card '{header}' stat labels (icy tint on card bg)", LABEL_TINT, bg, min_ratio=3.0)
    else:
        py = ty
        for g in phrase_groups:
            draw_lines(draw, (tx, py), g, f_card_phrase, fill=hx(WHITE), line_h=25)
            py += len(g) * 25 + 12
        check_contrast(f"card '{header}' phrases (white on card bg)", WHITE, bg)

    y += card_h_pt + 32

y += 32

# ── SECTION 5 — Proof stat callout (the strongest element — kept and echoed) ─
STAT_PAD_X, STAT_PAD_Y = 48, 40

stats_primary = [("50-70%", "fewer billing calls"), ("15-25%", "less churn")]
# Secondary figures get the SAME huge-number/tiny-label treatment as the
# primary pair (direction: numbers are heroes everywhere, not prose) — just
# at a smaller scale so the primary pair still reads as the strongest claim.
stats_secondary = [("15%", s("drop in operating cost")),
                    ("5%", s("lift in upsell and cross-sell revenue"))]
stat_attr = s("It's one consortium's proof of concept, not an industry average.")

stat_attr_lines = wrap(draw, stat_attr, f_attr, INNER_W - 2 * STAT_PAD_X)

primary_h = 70
lbl_groups_p = [wrap(draw, lbl, f_stat_l, (INNER_W // 2) - 16) for _, lbl in stats_primary]
primary_lbl_h = max(len(g) for g in lbl_groups_p) * 22

secondary_h_total = measure_card_stats_h(stats_secondary) if False else None
lbl_groups_s = [wrap(draw, lbl, f_stat_l2, (INNER_W // 2) - 16) for _, lbl in stats_secondary]
secondary_lbl_h = max(len(g) for g in lbl_groups_s) * 18
secondary_h = 32 + 8 + secondary_lbl_h

stat_attr_h = len(stat_attr_lines) * 19

stat_card_h = (STAT_PAD_Y + primary_h + 10 + primary_lbl_h + 30 +
               secondary_h + 26 + stat_attr_h + STAT_PAD_Y)

draw.rounded_rectangle([(PAD, y), (PAD + INNER_W, y + stat_card_h)], radius=12,
                        fill=STAT_BG + (255,))
draw.rectangle([(PAD, y), (PAD + INNER_W, y + 3)], fill=hx(CYAN) + (255,))

col_w = INNER_W // 2
ty_s = y + STAT_PAD_Y
for i, (num_txt, lbl_txt) in enumerate(stats_primary):
    cx0 = PAD + i * col_w
    nw = text_w(draw, num_txt, f_stat_n)
    draw.text((cx0 + (col_w - nw) / 2, ty_s), num_txt, font=f_stat_n, fill=hx(NAVY))
    lw = text_w(draw, lbl_txt, f_stat_l)
    draw.text((cx0 + (col_w - lw) / 2, ty_s + primary_h + 6), lbl_txt,
               font=f_stat_l, fill=hx(BLUE))
check_contrast("stat numbers primary (navy on light-cyan tint)", NAVY, STAT_BG)
check_contrast("stat labels primary (blue on light-cyan tint)", BLUE, STAT_BG)

ty_s += primary_h + 10 + primary_lbl_h + 30

# thin divider between primary and secondary hero pairs
draw.rectangle([(PAD + STAT_PAD_X, ty_s - 15),
                (PAD + INNER_W - STAT_PAD_X, ty_s - 14)],
               fill=blend(NAVY, BLUE, 0.7) + (60,))

for i, (num_txt, lbl_txt) in enumerate(stats_secondary):
    cx0 = PAD + i * col_w
    nw = text_w(draw, num_txt, f_stat_n2)
    draw.text((cx0 + (col_w - nw) / 2, ty_s), num_txt, font=f_stat_n2, fill=hx(NAVY))
    lw = text_w(draw, lbl_txt, f_stat_l2)
    draw.text((cx0 + (col_w - lw) / 2, ty_s + 32 + 8), lbl_txt,
               font=f_stat_l2, fill=hx(BLUE))
check_contrast("stat numbers secondary (navy on light-cyan tint)", NAVY, STAT_BG)
check_contrast("stat labels secondary (blue on light-cyan tint)", BLUE, STAT_BG)

ty_s += secondary_h + 26

draw_lines(draw, (PAD + STAT_PAD_X, ty_s), stat_attr_lines, f_attr,
           fill=hx(MUTED), line_h=19, align="center", box_w=INNER_W - 2 * STAT_PAD_X)
check_contrast("stat attribution (muted on light-cyan tint)", MUTED, STAT_BG, min_ratio=3.0)

y += stat_card_h + 56

# ── SECTION 6 — Closing question (verbatim, unchanged) ───────────────────────
CLOSING_Q = s(
    "Where's your gap — measurement or ownership? And is there an "
    "operating model in place to actually close it?"
)
cq_lines = wrap(draw, CLOSING_Q, f_footer_q, INNER_W - 24)
cq_lh = 28
cq_h = len(cq_lines) * cq_lh

draw.rectangle([(PAD, y), (PAD + 4, y + cq_h)], fill=hx(BLUE) + (255,))
draw_lines(draw, (PAD + 24, y), cq_lines, f_footer_q, fill=hx(NAVY), line_h=cq_lh)
check_contrast("closing question (navy on light bg)", NAVY, BG_LIGHT)
y += cq_h + 48

# ── SECTION 7 — Footer ────────────────────────────────────────────────────────
draw.rectangle([(PAD, y), (W - PAD, y + 1)], fill=blend(NAVY, BLUE, 0.55) + (255,))
y += 28

FOOTER_H = 40
logo_cy = y + FOOTER_H // 2
paste_logo(img, LOGO_NAVY, target_h=28, right_x=PAD + 190, cy=logo_cy)
draw = ImageDraw.Draw(img)

tagline = s("Reliable. Resilient. Resolute.")
tag_w = text_w(draw, tagline, f_footer_t)
tag_y = y + (FOOTER_H - 16) // 2
draw.text((W - PAD - tag_w, tag_y), tagline, font=f_footer_t, fill=hx(MUTED))
check_contrast("footer tagline (muted on light bg)", MUTED, BG_LIGHT, min_ratio=3.0)

y += FOOTER_H + 44  # content_end

# ── Save & crop ───────────────────────────────────────────────────────────────
img_rgb = img.convert("RGB")
img_rgb.save(OUT, "PNG", dpi=(300, 300))

final_w, final_h = crop_to_content(OUT, content_end=y, bottom_pad=32)
print(f"Saved: {OUT}")
print(f"Final dimensions: {final_w} x {final_h} px")
print(f"Content end Y: {y}")
print()
print("Contrast checks (WCAG ratio, >=4.5 body text / >=3.0 large or muted furniture):")
all_ok = True
for label, ratio, minr, ok in CONTRAST_LOG:
    all_ok = all_ok and ok
    print(f"  [{'PASS' if ok else 'FAIL'}] {label}: {ratio}:1 (min {minr}:1)")
print()
print("ALL PASS" if all_ok else "SOME FAILED — fix before shipping")
