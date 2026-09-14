"""
Northgate Watchtower — visual generation toolkit (Mason's tool).

Renders Gartner-grid-style LinkedIn post visuals using Northgate's real,
self-hosted brand fonts (extracted from the site's own Next.js build,
not lookalikes) and real logo files. Pure PIL — no external services.

Usage: import this module from a generation script placed alongside it,
or run one of the scripts in pipeline/scripts/.
"""

import os
from PIL import Image, ImageDraw, ImageFont

PIPELINE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(PIPELINE_DIR, "..", ".."))
FONTS_DIR = os.path.join(PIPELINE_DIR, "fonts")
BRAND_DIR = os.path.join(PROJECT_ROOT, "public", "brand")

LEXEND = os.path.join(FONTS_DIR, "Lexend-Variable.ttf")
SOURCE = os.path.join(FONTS_DIR, "SourceSans3-Variable.ttf")

LOGO_NAVY = os.path.join(BRAND_DIR, "northgate-logo-navy-transparent.png")
LOGO_WHITE = os.path.join(BRAND_DIR, "northgate-logo-white-transparent.png")
MARK_400 = os.path.join(BRAND_DIR, "northgate-mark-400.png")

# Brand tokens — keep in sync with src/app/globals.css if the palette changes.
NAVY = "#0c1945"
BLUE = "#3d5ad9"
CYAN = "#05aff2"
INK_SOFT = "#45507a"
MUTED = "#6b7494"
BG_LIGHT = "#eef2fb"
WHITE = "#ffffff"


def hx(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def blend(hex1, hex2, t):
    a = hx(hex1)
    b = hx(hex2)
    return tuple(int(a[i] * (1 - t) + b[i] * t) for i in range(3))


def font(path, size, wght=None):
    f = ImageFont.truetype(path, size)
    if wght is not None:
        try:
            f.set_variation_by_axes([wght])
        except Exception:
            pass
    return f


def lexend(size, wght=700):
    return font(LEXEND, size, wght)


def source(size, wght=400):
    return font(SOURCE, size, wght)


def text_w(draw, txt, f):
    b = draw.textbbox((0, 0), txt, font=f)
    return b[2] - b[0]


def wrap(draw, txt, f, max_w):
    words = txt.split()
    lines, cur = [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if text_w(draw, trial, f) <= max_w or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def draw_lines(draw, xy, lines, f, fill, line_h, align="left", box_w=None):
    x, y = xy
    for ln in lines:
        lw = text_w(draw, ln, f)
        dx = x
        if align == "center" and box_w:
            dx = x + (box_w - lw) / 2
        elif align == "right" and box_w:
            dx = x + (box_w - lw)
        draw.text((dx, y), ln, font=f, fill=fill)
        y += line_h
    return y


def dot_grid(size, color_rgb, spacing=26, alpha=14, r=1):
    W, H = size
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for gx in range(0, W, spacing):
        for gy in range(0, H, spacing):
            d.ellipse((gx - r, gy - r, gx + r, gy + r), fill=color_rgb + (alpha,))
    return layer


def paste_logo(img, path, target_h, right_x, cy):
    logo = Image.open(path).convert("RGBA")
    scale = target_h / logo.height
    tw = int(logo.width * scale)
    logo = logo.resize((tw, target_h), Image.LANCZOS)
    x = right_x - tw
    y = int(cy - target_h / 2)
    img.alpha_composite(logo, (x, y))
    return tw


def new_canvas_light(W, H, dot_alpha=12):
    img = Image.new("RGBA", (W, H), hx(BG_LIGHT) + (255,))
    img.alpha_composite(dot_grid((W, H), hx(NAVY), spacing=26, alpha=dot_alpha, r=1.4))
    return img


def crop_to_content(img_path, content_end, bottom_pad=20):
    img = Image.open(img_path)
    W = img.width
    cropped = img.crop((0, 0, W, min(img.height, content_end + bottom_pad)))
    cropped.save(img_path)
    return cropped.size
