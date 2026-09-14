"""
06-visual.png — generation script
Post: Vendor Lock-In Risk in Telecom BSS Platforms (2026-08-20)

Reuses all helpers from pipeline/watchtower_visuals.py.
Run from any directory:
  python3 "...outputs/2026-08-19-vendor-lock-in-risk-in-telecom-bss-platforms/gen_visual.py"
"""

import sys, os

SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PIPELINE_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, "..", "..", "pipeline"))
sys.path.insert(0, PIPELINE_DIR)

from watchtower_visuals import (
    hx, blend, lexend, source, text_w, wrap, draw_lines,
    dot_grid, paste_logo, crop_to_content,
    NAVY, BLUE, CYAN, INK_SOFT, MUTED, BG_LIGHT, WHITE,
    LOGO_WHITE, MARK_400,
)
from PIL import Image, ImageDraw

# ── Sanitize helper — safe characters only ───────────────────────────────────
def s(text):
    """Replace any non-ASCII-safe typographic characters."""
    return (text
        .replace("’", "'").replace("‘", "'")   # curly apostrophes
        .replace("“", '"').replace("”", '"')   # curly double quotes
        .replace("–", "—")                     # en-dash -> em-dash (safe)
        # em-dash U+2014 is confirmed safe; keep it
    )

# ── Canvas constants ──────────────────────────────────────────────────────────
W       = 1080
H_TALL  = 2600          # generous tall draft; will crop to content
PAD     = 60            # left / right margin
INNER_W = W - 2 * PAD  # 960px usable width
OUT     = os.path.join(SCRIPT_DIR, "06-visual.png")

# ── Derived brand colours (within Navy/Blue/Cyan palette only) ────────────────
#   All colours are tints/shades of the three brand primaries.
#   No new hue introduced.
TOPBAR_BG   = blend(NAVY, BLUE, 0.12)   # (19, 35, 91)  — slightly lifted navy
CARD_BG     = blend(NAVY, BLUE, 0.20)   # (24, 39, 99)  — card surface
STAT_BG     = blend(NAVY, CYAN, 0.08)   # (11, 37, 83)  — cyan-tinted card
BODY_TEXT   = BG_LIGHT                   # #eef2fb, 15.7:1 contrast on NAVY
LABEL_TEXT  = MUTED                      # #6b7494

# ── Font objects (loaded once) ─────────────────────────────────────────────
f_cat     = lexend(11, 600)   # category pill
f_wt      = lexend(11, 700)   # "WATCHTOWER" topbar label
f_title1  = lexend(52, 800)   # main title line 1
f_title2  = lexend(26, 600)   # main title line 2 / subtitle
f_hook    = source(19, 400)   # hook body
f_thesis  = source(19, 600)   # thesis (semibold)
f_ptnum   = lexend(10, 700)   # point number "01"
f_pthead  = lexend(18, 700)   # point card header
f_ptbody  = source(15, 400)   # point card body
f_stat_n  = lexend(78, 800)   # "71%" big number
f_stat_l  = source(18, 400)   # stat label line
f_stat_a  = source(13, 400)   # stat attribution
f_footer  = source(13, 400)   # footer tagline

# ── Build canvas ──────────────────────────────────────────────────────────────
img  = Image.new("RGBA", (W, H_TALL), hx(NAVY) + (255,))
img.alpha_composite(dot_grid((W, H_TALL), hx(WHITE), spacing=28, alpha=5, r=1))
draw = ImageDraw.Draw(img)

y = 0  # running Y cursor

# ── SECTION 1 — Top bar ───────────────────────────────────────────────────────
BAR_H = 84
draw.rectangle([(0, 0), (W, BAR_H)], fill=TOPBAR_BG + (255,))

# White logo: height 30px, vertically centred in bar, left-aligned at PAD
logo_tw = paste_logo(img, LOGO_WHITE, target_h=30, right_x=PAD + 230, cy=BAR_H // 2)
draw = ImageDraw.Draw(img)  # refresh draw after alpha_composite inside paste_logo

# "WATCHTOWER" label right-aligned
wt_label = "WATCHTOWER"
wt_w = text_w(draw, wt_label, f_wt)
draw.text((W - PAD - wt_w, BAR_H // 2 - 7), wt_label, font=f_wt, fill=CYAN)

y = BAR_H

# ── SECTION 2 — Hero title ────────────────────────────────────────────────────
y += 44

# Category pill
cat_text  = "TELECOM BSS"
cat_w     = text_w(draw, cat_text, f_cat)
pill_pad  = 14
pill_h    = 26
pill_x0   = PAD
pill_x1   = PAD + cat_w + 2 * pill_pad
pill_y0   = y
pill_y1   = y + pill_h
draw.rounded_rectangle([(pill_x0, pill_y0), (pill_x1, pill_y1)], radius=4,
                        fill=blend(NAVY, BLUE, 0.55) + (255,))
draw.text((pill_x0 + pill_pad, pill_y0 + 5), cat_text, font=f_cat, fill=CYAN)
y = pill_y1 + 20

# Title line 1
title1 = s("Vendor Lock-In Risk")
draw.text((PAD, y), title1, font=f_title1, fill=WHITE)
y += 64

# Title line 2
title2 = s("in Telecom BSS Platforms")
draw.text((PAD, y), title2, font=f_title2, fill=CYAN)
y += 36

# Thin accent rule under title
y += 16
draw.rectangle([(PAD, y), (PAD + 280, y + 3)], fill=hx(BLUE) + (255,))
y += 3 + 36

# ── SECTION 3 — Hook ──────────────────────────────────────────────────────────
# Left CYAN vertical bar + hook text
HOOK_TEXT = s(
    "The vendor lock-in that surfaces during BSS migration scoping wasn't built "
    "into the exit clause. It was built into the architecture — and standard "
    "RFP processes weren't built to surface it."
)
hook_lines = wrap(draw, HOOK_TEXT, f_hook, INNER_W - 24)  # 24px reserve for bar gutter
hook_lh    = 28
hook_h     = len(hook_lines) * hook_lh

bar_x  = PAD
text_x = PAD + 20   # 20px gutter from bar

# Vertical cyan bar
draw.rectangle([(bar_x, y), (bar_x + 4, y + hook_h)], fill=hx(CYAN) + (255,))
# Hook text
draw_lines(draw, (text_x, y), hook_lines, f_hook, fill=BODY_TEXT, line_h=hook_lh)
y += hook_h + 44

# ── SECTION 4 — Thesis card ───────────────────────────────────────────────────
THESIS_TEXT = s(
    "BSS vendor lock-in is an architecture debt problem, not a contract problem "
    "— and it only becomes visible when the process layer is mapped before "
    "the vendor shortlist begins."
)
T_PAD_X = 32
T_PAD_Y = 28
T_BAR_W = 5
thesis_text_w = INNER_W - T_PAD_X * 2 - T_BAR_W
thesis_lines  = wrap(draw, THESIS_TEXT, f_thesis, thesis_text_w)
thesis_lh     = 30
thesis_h      = len(thesis_lines) * thesis_lh
card_h        = T_PAD_Y * 2 + thesis_h

# Card background
draw.rounded_rectangle(
    [(PAD, y), (PAD + INNER_W, y + card_h)],
    radius=10,
    fill=CARD_BG + (255,),
)
# Left CYAN accent bar
draw.rounded_rectangle(
    [(PAD, y), (PAD + T_BAR_W, y + card_h)],
    radius=2,
    fill=hx(CYAN) + (255,),
)
# Thesis text
draw_lines(
    draw,
    (PAD + T_BAR_W + T_PAD_X, y + T_PAD_Y),
    thesis_lines, f_thesis, fill=WHITE, line_h=thesis_lh,
)
y += card_h + 52

# ── SECTION 5 — Three point cards ────────────────────────────────────────────
POINTS = [
    (
        "01",
        s("By Migration Scoping, the Architecture Has Become the Vendor"),
        s(
            "Decades of customisations, integrations, and workarounds embedded in "
            "billing and charging logic don't accumulate in an SLA. By the time "
            "migration scoping begins, the architecture has become the vendor "
            "— regardless of what the exit clause says."
        ),
    ),
    (
        "02",
        s("Open API Procurement Criteria Don't Reach Where Lock-In Hides"),
        s(
            "Proprietary dependencies live in OSS connector layers, data models, "
            "and charging logic — none of which appear on a standard "
            "procurement scorecard. Checking Open API compliance as a pass/fail "
            "scorecard item is not the same as verifying it as an architectural "
            "guarantee."
        ),
    ),
    (
        "03",
        s("Process-Layer Mapping Must Precede Platform Selection"),
        s(
            "eTOM-grounded decomposition of the current BSS integration surface, "
            "before any vendor shortlist begins, reveals what's genuinely portable "
            "and what the actual switching cost is. Architecture exit ramps are "
            "designed before contract signature — not discovered after."
        ),
    ),
]

CP_X     = 32   # inner left pad after bar
CP_Y     = 24   # inner top/bottom pad
CP_BAR   = 5    # left accent bar width
CP_LH_H  = 26   # header line height
CP_LH_B  = 22   # body line height
CP_GAP   = 16   # gap between cards

for num, header, body in POINTS:
    # Measure content
    head_avail = INNER_W - CP_BAR - CP_X - PAD  # pad on right side (reuse CP_X)
    head_lines = wrap(draw, header, f_pthead, head_avail - CP_X)
    body_lines = wrap(draw, body,   f_ptbody, head_avail - CP_X)

    head_h   = len(head_lines) * CP_LH_H
    body_h   = len(body_lines) * CP_LH_B
    num_h    = 18   # "01" label height
    num_gap  = 8
    gap_hb   = 10   # gap between header and body

    card_h_pt = CP_Y + num_h + num_gap + head_h + gap_hb + body_h + CP_Y

    # Card
    draw.rounded_rectangle(
        [(PAD, y), (PAD + INNER_W, y + card_h_pt)],
        radius=10,
        fill=CARD_BG + (255,),
    )
    # Left BLUE accent bar
    draw.rounded_rectangle(
        [(PAD, y), (PAD + CP_BAR, y + card_h_pt)],
        radius=2,
        fill=hx(BLUE) + (255,),
    )

    tx = PAD + CP_BAR + CP_X
    ty = y + CP_Y

    # Point number
    draw.text((tx, ty), num, font=f_ptnum, fill=CYAN)
    ty += num_h + num_gap

    # Header
    draw_lines(draw, (tx, ty), head_lines, f_pthead, fill=CYAN, line_h=CP_LH_H)
    ty += head_h + gap_hb

    # Body
    draw_lines(draw, (tx, ty), body_lines, f_ptbody, fill=BODY_TEXT, line_h=CP_LH_B)

    y += card_h_pt + CP_GAP

y += 36   # extra breathing room after last card

# ── SECTION 6 — 71% stat callout ─────────────────────────────────────────────
STAT_PAD_X = 48
STAT_PAD_Y = 40

# Measure stat content
stat_num_text = "71%"
stat_lbl_text = s(
    "of telcos rate Open API compliance as essential"
)
stat_attr_text = s("recent industry research")

stat_num_w = text_w(draw, stat_num_text, f_stat_n)
stat_lbl_lines = wrap(draw, stat_lbl_text, f_stat_l, INNER_W - 2 * STAT_PAD_X)
stat_lbl_lh = 27
stat_lbl_h  = len(stat_lbl_lines) * stat_lbl_lh
stat_attr_h = 20

stat_card_h = (STAT_PAD_Y + 96 + 12 + stat_lbl_h + 10 + stat_attr_h + STAT_PAD_Y)

draw.rounded_rectangle(
    [(PAD, y), (PAD + INNER_W, y + stat_card_h)],
    radius=12,
    fill=STAT_BG + (255,),
)
# Thin CYAN top rule on stat card
draw.rectangle(
    [(PAD, y), (PAD + INNER_W, y + 3)],
    fill=hx(CYAN) + (255,),
)

# "71%" centred
stat_n_x = PAD + (INNER_W - stat_num_w) // 2
draw.text((stat_n_x, y + STAT_PAD_Y), stat_num_text, font=f_stat_n, fill=CYAN)

ty_s = y + STAT_PAD_Y + 96 + 12

# Label lines centred
draw_lines(
    draw,
    (PAD + STAT_PAD_X, ty_s),
    stat_lbl_lines, f_stat_l, fill=WHITE, line_h=stat_lbl_lh,
    align="center", box_w=INNER_W - 2 * STAT_PAD_X,
)
ty_s += stat_lbl_h + 10

# Attribution line centred
attr_w = text_w(draw, stat_attr_text, f_stat_a)
draw.text(
    (PAD + STAT_PAD_X + (INNER_W - 2 * STAT_PAD_X - attr_w) // 2, ty_s),
    stat_attr_text, font=f_stat_a, fill=BODY_TEXT,
)

y += stat_card_h + 52

# ── SECTION 7 — Footer ────────────────────────────────────────────────────────
# Thin divider
draw.rectangle([(PAD, y), (W - PAD, y + 1)], fill=blend(NAVY, BLUE, 0.55) + (255,))
y += 24

# White logo left, tagline right, both vertically centred on same row
FOOTER_H  = 40
logo_cy   = y + FOOTER_H // 2
logo_tw_f = paste_logo(img, LOGO_WHITE, target_h=28, right_x=PAD + 190, cy=logo_cy)
draw = ImageDraw.Draw(img)

tagline = s("Reliable. Resilient. Resolute.")
tag_w   = text_w(draw, tagline, f_footer)
tag_y   = y + (FOOTER_H - 16) // 2
draw.text((W - PAD - tag_w, tag_y), tagline, font=f_footer, fill=LABEL_TEXT)

y += FOOTER_H + 40   # content_end

# ── Save & crop ───────────────────────────────────────────────────────────────
img_rgb = img.convert("RGB")
img_rgb.save(OUT, "PNG", dpi=(300, 300))

final_w, final_h = crop_to_content(OUT, content_end=y, bottom_pad=32)
print(f"Saved: {OUT}")
print(f"Final dimensions: {final_w} x {final_h} px")
print(f"Content end Y: {y}")
