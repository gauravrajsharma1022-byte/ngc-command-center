# Industry Signals — Complete Redesign Handoff
**Northgate Consulting · single-file handoff for Claude Code**

This one file contains everything needed to rebuild the redesigned *Industry Signals* page in your website: the full design documentation, then the complete, self-contained source. Hand this file to Claude Code and say: *"Recreate the page documented here in my site, using the embedded HTML as the reference and my existing components/tokens."*

---

# Handoff: Industry Signals Page (Northgate Consulting)

## Overview
A premium, single-page "Industry Signals" intelligence page for **Northgate Consulting**. It presents **30 board-level signals across three live sectors — Telecom, Healthcare, Fintech (10 each)** — each contrasting the market **consensus ("The Noise")** with the **ground reality ("The Ground Truth")** and the **board move ("The Response")**. Includes a sector switcher that re-skins the page with that sector's accent colour, an interactive **Signal Map** (scatter of signals by impact × time-to-impact), a dark hero, a closing CTA, and a footer.

## About the Design Files
The file in this bundle — **`industry-signals.html`** — is a **design reference**: a self-contained HTML/CSS/vanilla-JS prototype showing the intended look, content, and behavior. It is framework-agnostic and has **no build step or dependencies** (only Google Fonts via CDN), so it runs by opening it in a browser.

Your task is to **recreate this design inside your website's existing environment** (React/Next, Vue, Astro, plain HTML, a CMS template, etc.) using its established patterns, component conventions, and styling system. If your site has no component framework, the HTML/CSS here can be adapted directly. Treat the inline data array as content that likely belongs in your CMS or a data file.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, shadows, and interactions are all production-intent. Recreate pixel-for-pixel, mapping the values below onto your codebase's tokens/components where equivalents exist.

## Screens / Views
Single scrolling page. Top-to-bottom sections:

1. **Sticky navbar** — glass/blurred navy bar. Left: stacked wordmark `Northgate.` (the period is cyan) over mono `CONSULTING`. Right: two mono nav links (`THE MAP`, `SIGNALS`) + a blue pill button `Request a briefing`.
2. **Hero** (dark band) — eyebrow pill with blinking cyan dot; large headline ("Most of what you read about telecom is *noise.* We publish the *signal.*" — "noise" muted gray, "signal" cyan gradient); supporting paragraph; primary button + a 3-sector legend. Faint grid texture + 3 drifting dots.
3. **Sector toggle** — 3 large tab buttons (active = solid navy with a sector-coloured bottom inset bar; others = white). Switching sectors updates the page's `--accent` CSS variable (Telecom blue / Healthcare green / Fintech violet) and re-renders the map + feed with that sector's 10 signals.
4. **The Signal Map** — bordered white plot (420px tall, 4×4 grid). Each sector shows its 10 positioned dots in the sector accent colour; hover shows a tooltip, click smooth-scrolls to that signal's card. Y-axis = impact (top = high), X-axis = time-to-impact (left = now).
5. **Signals feed** — heading ("Telecom · 10 LIVE SIGNALS") then 10 **signal cards** (detailed below). Non-Telecom shows a centered "In preparation" stub with 4 upcoming-topic cells.
6. **Closing CTA** (dark band) — "Bring the signal into your boardroom." + primary button + cyan text link.
7. **Footer** (darkest) — wordmark + about paragraph + two link columns + legal line.

### The Signal Card (the key component)
Layout, top to bottom:
- **Accent rail**: 4px full-width bar, `linear-gradient(90deg, #3d5ad9 → #05aff2)`.
- **Body** padding `30px`.
- **Header row** (space-between, wraps):
  - Left: a **number tile** (46×46, radius 13, navy gradient `linear-gradient(150deg,#1c3068,#0c1945)`, white Lexend 800 17px, inset white hairline + drop shadow), beside a stack of mono code `SIG · TEL · NN` (#8a96b4) and a **category chip** (mono 10.5px uppercase, blue text #3d5ad9 on #EDF0FE pill, border #DCE3FA).
  - Right: **horizon pill** (mono, gray on #F5F7FA pill; value in cyan #0489c4) + **conviction meter** (label + 5 segments, each 16×5 radius 3; filled = #6f8bff, empty = #E2E8F0).
- **Title**: Lexend 700, `clamp(22px,2.5vw,29px)`, color #0c1945, letter-spacing -.02em.
- **Contrast grid**: 2 columns (`repeat(auto-fit, minmax(290px,1fr))`, gap 16, equal height):
  - **Noise panel** (light): bg #F5F7FA, border #E8ECF1, radius 14, pad 22/24. Header = muted square icon `⌁` + kicker "THE NOISE" (#8794aa) + sub "Consensus view" (#aab3c4). Body text #7c879b, 15.5px/1.62.
  - **Ground Truth panel** (dark — this is the visual hero of the card): bg `linear-gradient(158deg,#0d2658,#0a1842)`, border `rgba(5,175,242,.28)`, radius 14, shadow `0 18px 44px -26px rgba(5,90,180,.85)`, a soft cyan radial **glow** in the top-right corner. Header = cyan square icon `◆` (cyan on translucent-cyan, inset cyan ring) + kicker "THE GROUND TRUTH" (#38d0f5) + sub "What is actually happening" (#7fa6d8). Body text #dce6fb.
- **Response** (`<details>`, collapsible): summary bar with top divider — "THE RESPONSE" (mono blue) + "— the board move" (gray) on the left, a circular chevron `↘` on the right (rotates 90° when open). Open content = list of response items, each a row: navy rounded number badge (27×27, radius 8, #0c1945, white mono) + text (#2a3650, 15.5px).
- **Card hover**: border → `rgba(111,139,255,.55)`, shadow → `0 24px 64px -18px rgba(12,25,69,.28)`.

## Interactions & Behavior
- **Sector tabs**: click sets active sector → toggles active class, swaps the `SELECT SECTOR` meta text + map blurb, and re-renders the map and feed. Telecom = live cards; Healthcare/Fintech = stub.
- **Map dots**: `mouseenter` shows a tooltip anchored at the dot (`translate(-50%,-140%)`); `mouseleave` removes it; `click` smooth-scrolls to `#sig-{code}-NN` (e.g. `#sig-tel-01`, `#sig-hlt-03`, `#sig-fin-07`) with a 90px top offset for the sticky nav.
- **Response disclosure**: native `<details>/<summary>`; chevron rotates on open.
- **Entrance animations**: cards `fadeUp` (.6s); map dots `dotIn` (.7s, staggered `0.05 + i*0.06`s); hero ambient dots `drift` (7/9/11s loops); eyebrow dot `blink`.
- **Responsive**: contrast grid collapses to 1 column under ~290px-per-column; nav links hide under 600px; container padding reduces. All clamp() type scales fluidly.

## State Management
Single piece of UI state: **`currentSector`** (`'telecom' | 'healthcare' | 'fintech'`, default `'telecom'`). Transitions triggered by tab clicks. On change → set the four `--accent*` CSS variables from `SECTOR_META`, then re-render the map dots + the card feed + the map blurb/feed name. No data fetching; all content is static in the file. The map tooltip is transient DOM, not persistent state.

## Design Tokens
Defined as CSS custom properties in `:root` (see top of the HTML). Brand kit:

**Colors**
- Navy `#0c1945` (headings, primary dark) · Dark `#050912` (darkest bg) · Blue `#3d5ad9` (CTAs, links) · Cyan `#05aff2` (highlights/"signal") · Slate `#334155` (body) · Muted `#E2E8F0` (borders) · Page `#F4F6FA`
- Muted text `#64748B` · Faint labels `#94A3B8`
- Sector accents: **Telecom `#6f8bff`**, **Healthcare `#34d8a6`**, **Fintech `#a78bfa`**
- Card-specific darks/cyans: panel gradient `#0d2658→#0a1842`, cyan label `#38d0f5`, truth body `#dce6fb`

**Typography** (Google Fonts)
- Headings: **Lexend** (600–800)
- Body: **Source Sans 3** (300–700)
- Mono (labels, codes, numbers): **Geist Mono** (400–600)

**Radii**: cards 20px · panels/tabs 14px · number tile 13px · pills 999px · badges 8px
**Shadows**: card rest `0 4px 24px rgba(12,25,69,.08)`; card hover `0 24px 64px -18px rgba(12,25,69,.28)`; truth panel `0 18px 44px -26px rgba(5,90,180,.85)`
**Spacing**: section vertical rhythm ~48–64px; card body padding 30px; panel padding 22–24px; max content width 1200px; container side padding 32px (20px on mobile)

## Sector theming (important)
The page is **single-accent at a time**: switching sector rewrites four CSS variables on `:root` — `--accent`, `--accent-rgb`, `--accent-tint`, `--accent-border` — from the `SECTOR_META` map. Cards (rail gradient, hover border), map dots, category chips, the conviction meter and the response chevron all read these, so the whole page recolours in one place. The **Ground Truth panel stays dark navy + cyan in every sector** on purpose — it's the shared "signal" brand thread. When porting to a component framework, expose the sector accent as a theme/context value rather than hard-coding per-sector classes.

## Content / Data
All 30 signals live in the `DATA` object near the bottom of the HTML, keyed by sector (`telecom`, `healthcare`, `fintech`), 10 each. Each signal object:
`{ num, short (category chip), title, horizon, c (conviction 1–5), x, y (map %), noise, truth, responses[] }`.
Sector display names, codes and accent colours live in `SECTOR_META`. **Source of the signal copy: the supplied Northgate Consulting strategic-briefing PDFs (Telecom, Healthcare, Fintech).** Move `DATA` into your CMS/data layer as appropriate.

## Assets
- **No image assets.** The wordmark is plain text; all icons are Unicode glyphs (`⌁ ◆ ↘ → ●`) and CSS shapes. Swap the `◆/⌁/↘` glyphs for your icon set if you have one.
- Fonts load from Google Fonts CDN — self-host if your site requires it.

## Files
- `industry-signals.html` — the complete self-contained design reference (HTML + CSS in `<style>` + vanilla JS render logic). Everything needed is in this one file.


---

## Complete source — `industry-signals.html`

The full, self-contained reference implementation (HTML + CSS + vanilla JS, no build step, all 30 signals across 3 sectors). Save the block below as `industry-signals.html` to run it standalone, or read it as the spec to port into your codebase.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Industry Signals — Northgate Consulting</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  /* ============================================================
     NORTHGATE CONSULTING — INDUSTRY SIGNALS
     Design tokens (brand kit)
     ============================================================ */
  :root{
    --navy:#0c1945;          /* primary dark, headings */
    --dark:#050912;          /* darkest backgrounds */
    --blue:#3d5ad9;          /* primary accent, CTAs, links */
    --cyan:#05aff2;          /* secondary accent, highlights ("the signal") */
    --slate:#334155;         /* body text */
    --muted:#E2E8F0;         /* borders, dividers */
    --page:#F4F6FA;          /* page background */
    --tel:#6f8bff;           /* sector: Telecom */
    --hc:#34d8a6;            /* sector: Healthcare */
    --fin:#a78bfa;           /* sector: Fintech */
    --ink-soft:#64748B;      /* muted text */
    --ink-faint:#94A3B8;     /* faint labels */
    --f-head:'Lexend',sans-serif;
    --f-body:'Source Sans 3',-apple-system,sans-serif;
    --f-mono:'Geist Mono',monospace;
    --radius-card:20px;
    --maxw:1200px;
    /* --accent / --accent-rgb / --accent-tint / --accent-border are set per-sector by JS */
    --accent:#6f8bff; --accent-rgb:111,139,255; --accent-tint:#EDF0FE; --accent-border:#DCE3FA;
  }
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;}
  body{background:var(--page);color:var(--navy);font-family:var(--f-body);-webkit-font-smoothing:antialiased;}
  ::selection{background:var(--cyan);color:var(--dark);}
  a{color:inherit;text-decoration:none;}
  summary::-webkit-details-marker{display:none;}
  summary::marker{content:"";}

  @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
  @keyframes dotIn{0%{opacity:0;transform:translate(-50%,-50%) scale(0);}60%{opacity:1;}100%{opacity:1;transform:translate(-50%,-50%) scale(1);}}
  @keyframes drift{0%{transform:translateY(0);}50%{transform:translateY(-14px);}100%{transform:translateY(0);}}
  @keyframes blink{0%,55%{opacity:1;}56%,100%{opacity:.25;}}

  .container{max-width:var(--maxw);margin:0 auto;padding-left:32px;padding-right:32px;}

  /* ---------- Navbar ---------- */
  .nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);background:rgba(12,25,69,.92);border-bottom:1px solid rgba(255,255,255,.08);}
  .nav__inner{display:flex;align-items:center;justify-content:space-between;padding-top:15px;padding-bottom:15px;}
  .brand{display:flex;flex-direction:column;gap:3px;line-height:1;}
  .brand__name{font-family:var(--f-head);font-weight:800;font-size:21px;letter-spacing:-.04em;color:#fff;}
  .brand__name span{color:var(--cyan);font-size:1.18em;}
  .brand__sub{font-family:var(--f-mono);font-size:9px;letter-spacing:.26em;color:rgba(255,255,255,.45);}
  .nav__links{display:flex;align-items:center;gap:34px;}
  .nav__link{font-family:var(--f-mono);font-size:12.5px;letter-spacing:.08em;color:rgba(255,255,255,.7);}
  .btn-primary{background:var(--blue);color:#fff;font-family:var(--f-head);font-weight:600;font-size:14px;padding:11px 20px;border-radius:9px;box-shadow:0 8px 22px -8px rgba(61,90,217,.9);border:none;cursor:pointer;}

  /* ---------- Hero ---------- */
  .hero-band{position:relative;overflow:hidden;background:
    radial-gradient(125% 80% at 72% 8%, rgba(5,175,242,.20), transparent 58%),
    radial-gradient(110% 130% at 12% 100%, rgba(61,90,217,.30), transparent 55%),
    linear-gradient(178deg,#0a1640 0%,#0c2350 42%,#0a1c4a 72%,#0b1846 100%);}
  .hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:64px 64px;-webkit-mask-image:linear-gradient(180deg,#000,transparent 80%);mask-image:linear-gradient(180deg,#000,transparent 80%);pointer-events:none;}
  .hero-dot{position:absolute;border-radius:50%;pointer-events:none;}
  .hero{position:relative;z-index:3;padding-top:64px;padding-bottom:96px;}
  .pill{display:inline-flex;align-items:center;gap:10px;background:rgba(5,175,242,.1);border:1px solid rgba(5,175,242,.32);border-radius:999px;padding:8px 16px;margin-bottom:30px;}
  .pill__dot{width:7px;height:7px;border-radius:50%;background:var(--cyan);animation:blink 2s steps(1) infinite;}
  .pill__txt{font-family:var(--f-mono);font-size:12px;letter-spacing:.16em;color:#5cc6f5;}
  .hero h1{font-family:var(--f-head);font-weight:800;font-size:clamp(44px,6.6vw,84px);line-height:1.02;letter-spacing:-.035em;margin:0;max-width:16ch;color:#fff;}
  .hero h1 .noise{color:#5f6f95;}
  .hero h1 .signal{background:linear-gradient(90deg,#05aff2,#38d0f5);-webkit-background-clip:text;background-clip:text;color:transparent;}
  .hero p{font-size:clamp(16px,1.6vw,20px);line-height:1.6;color:#aab4cc;max-width:64ch;margin:30px 0 0;}
  .hero__actions{display:flex;flex-wrap:wrap;align-items:center;gap:30px;margin-top:38px;}
  .btn-hero{display:inline-flex;align-items:center;gap:10px;background:var(--blue);color:#fff;font-family:var(--f-head);font-weight:600;font-size:16px;padding:16px 30px;border-radius:10px;box-shadow:0 0 40px rgba(5,175,242,.25),0 12px 30px -10px rgba(61,90,217,.85);}
  .hero__legend{display:flex;align-items:center;gap:22px;font-family:var(--f-mono);font-size:12px;letter-spacing:.04em;color:#8b97b5;}

  /* ---------- Section heads ---------- */
  .eyebrow{font-family:var(--f-mono);font-size:12px;letter-spacing:.16em;color:#5f6f95;}
  .section-pad{padding-top:52px;padding-bottom:24px;}

  /* ---------- Sector toggle ---------- */
  .toggle-head{display:flex;align-items:baseline;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:18px;}
  .tabs{display:flex;gap:12px;flex-wrap:wrap;}
  .tab{flex:1 1 200px;min-width:180px;text-align:left;padding:17px 22px;border-radius:14px;cursor:pointer;font-family:var(--f-body);transition:all .22s ease;border:1px solid var(--muted);background:#fff;color:var(--slate);box-shadow:0 4px 24px rgba(12,25,69,.06);}
  .tab__name{display:block;font-family:var(--f-head);font-weight:700;font-size:20px;letter-spacing:-.01em;margin-bottom:4px;}
  .tab__meta{font-family:var(--f-mono);font-size:11px;letter-spacing:.1em;opacity:.8;}
  .tab.is-active{background:var(--navy);color:#fff;border-color:var(--navy);}
  .tab.is-active.tab--tel{box-shadow:inset 0 -3px 0 0 var(--tel),0 14px 34px -14px rgba(12,25,69,.6);}
  .tab.is-active.tab--hc{box-shadow:inset 0 -3px 0 0 var(--hc),0 14px 34px -14px rgba(12,25,69,.6);}
  .tab.is-active.tab--fin{box-shadow:inset 0 -3px 0 0 var(--fin),0 14px 34px -14px rgba(12,25,69,.6);}

  /* ---------- Signal map ---------- */
  .map-head{display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:26px;}
  .map-head h2{font-family:var(--f-head);font-weight:700;font-size:clamp(28px,3.6vw,42px);margin:0;letter-spacing:-.025em;color:var(--navy);}
  .map-head p{color:#475569;font-size:16px;margin:8px 0 0;max-width:52ch;}
  .map-legend{display:flex;gap:18px;font-family:var(--f-mono);font-size:11px;letter-spacing:.06em;color:#475569;}
  .map-row{display:flex;gap:14px;}
  .map-yaxis{display:flex;flex-direction:column;justify-content:space-between;font-family:var(--f-mono);font-size:10px;letter-spacing:.1em;color:#5f6f95;padding:6px 0 28px;writing-mode:vertical-rl;text-orientation:mixed;transform:rotate(180deg);}
  .map-plot-wrap{flex:1;min-width:0;}
  .map-plot{position:relative;height:420px;border:1px solid var(--muted);border-radius:14px;background:#fff;background-image:linear-gradient(rgba(12,25,69,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(12,25,69,.05) 1px,transparent 1px);background-size:25% 25%;overflow:hidden;box-shadow:0 4px 24px rgba(12,25,69,.08);}
  .map-glow{position:absolute;inset:0;background:radial-gradient(60% 80% at 22% 18%, rgba(var(--accent-rgb),.07), transparent 60%);pointer-events:none;}
  .map-dot{position:absolute;width:17px;height:17px;border:2.5px solid #fff;border-radius:50%;background:var(--accent);cursor:pointer;transform:translate(-50%,-50%);box-shadow:0 0 0 4px rgba(var(--accent-rgb),.18),0 2px 8px rgba(var(--accent-rgb),.5);animation:dotIn .7s both;transition:transform .18s ease,box-shadow .18s ease;}
  .map-dot:hover{transform:translate(-50%,-50%) scale(1.32);box-shadow:0 0 0 8px rgba(var(--accent-rgb),.22),0 0 28px rgba(var(--accent-rgb),.45);}
  .map-tip{position:absolute;transform:translate(-50%,-140%);background:#fff;border:1px solid var(--muted);border-radius:10px;padding:10px 14px;pointer-events:none;white-space:nowrap;box-shadow:0 12px 28px -10px rgba(12,25,69,.3);z-index:10;}
  .map-tip__t{font-family:var(--f-head);font-weight:600;font-size:13px;color:var(--navy);margin-bottom:3px;}
  .map-tip__s{font-family:var(--f-mono);font-size:10.5px;letter-spacing:.02em;color:#5f6f95;}
  .map-xaxis{display:flex;justify-content:space-between;font-family:var(--f-mono);font-size:10px;letter-spacing:.1em;color:#5f6f95;margin-top:10px;}

  /* ---------- Signals feed ---------- */
  .feed-head{display:flex;align-items:baseline;gap:14px;margin-bottom:30px;}
  .feed-head__name{font-family:var(--f-head);font-weight:700;font-size:clamp(24px,3vw,32px);letter-spacing:-.02em;color:var(--navy);}
  .feed-head__meta{font-family:var(--f-mono);font-size:12px;letter-spacing:.08em;color:#5f6f95;}
  .feed{display:flex;flex-direction:column;gap:20px;}

  /* ---------- Signal card ---------- */
  .card{position:relative;border:1px solid var(--muted);border-radius:var(--radius-card);background:#fff;overflow:hidden;box-shadow:0 4px 24px rgba(12,25,69,.08);animation:fadeUp .6s both;transition:border-color .2s ease,box-shadow .2s ease;}
  .card:hover{border-color:rgba(var(--accent-rgb),.55);box-shadow:0 24px 64px -18px rgba(12,25,69,.28);}
  .card__rail{height:4px;background:linear-gradient(90deg,var(--accent) 0%,var(--cyan) 100%);}
  .card__body{padding:30px;}
  .card__head{display:flex;justify-content:space-between;flex-wrap:wrap;gap:16px;align-items:center;margin-bottom:20px;}
  .card__id{display:flex;align-items:center;gap:14px;}
  .numtile{flex:none;width:46px;height:46px;border-radius:13px;background:linear-gradient(150deg,#1c3068,#0c1945);color:#fff;display:flex;align-items:center;justify-content:center;font-family:var(--f-head);font-weight:800;font-size:17px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.12),0 6px 16px -6px rgba(12,25,69,.6);}
  .card__code{font-family:var(--f-mono);font-size:11.5px;letter-spacing:.1em;color:#8a96b4;}
  .chip{align-self:flex-start;font-family:var(--f-mono);font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);background:var(--accent-tint);border:1px solid var(--accent-border);border-radius:999px;padding:3px 10px;}
  .card__meta{display:flex;align-items:center;gap:14px;flex-wrap:wrap;}
  .horizon{display:inline-flex;align-items:center;gap:6px;font-family:var(--f-mono);font-size:11px;letter-spacing:.06em;color:#5f6f95;background:#F5F7FA;border:1px solid #E8ECF1;border-radius:999px;padding:6px 12px;}
  .horizon b{color:#0489c4;font-weight:500;}
  .horizon i{color:var(--navy);font-style:normal;}
  .conv{display:flex;align-items:center;gap:8px;}
  .conv__label{font-family:var(--f-mono);font-size:10.5px;letter-spacing:.06em;color:var(--ink-faint);}
  .conv__track{display:flex;gap:3px;}
  .conv__seg{width:16px;height:5px;border-radius:3px;background:var(--muted);}
  .conv__seg.is-on{background:var(--accent);}
  .card h3{font-family:var(--f-head);font-weight:700;font-size:clamp(22px,2.5vw,29px);line-height:1.16;margin:0 0 22px;letter-spacing:-.02em;color:var(--navy);}

  .contrast{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:16px;align-items:stretch;}
  .panel{border-radius:14px;padding:22px 24px;}
  .panel__head{display:flex;align-items:center;gap:10px;margin-bottom:14px;}
  .panel__icon{flex:none;width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;}
  .panel__labels{display:flex;flex-direction:column;gap:2px;line-height:1.1;}
  .panel__kicker{font-family:var(--f-mono);font-size:11px;letter-spacing:.14em;}
  .panel__sub{font-size:11px;}
  .panel__text{margin:0;font-size:15.5px;line-height:1.62;}
  .panel--noise{background:#F5F7FA;border:1px solid #E8ECF1;}
  .panel--noise .panel__icon{background:#E6EAF1;color:var(--ink-faint);}
  .panel--noise .panel__kicker{color:#8794aa;}
  .panel--noise .panel__sub{color:#aab3c4;}
  .panel--noise .panel__text{color:#7c879b;}
  /* Ground Truth panel stays dark + cyan across ALL sectors — the shared "signal" thread */
  .panel--truth{position:relative;overflow:hidden;background:linear-gradient(158deg,#0d2658 0%,#0a1842 100%);border:1px solid rgba(5,175,242,.28);box-shadow:0 18px 44px -26px rgba(5,90,180,.85);}
  .panel--truth .glow{position:absolute;top:-50px;right:-30px;width:160px;height:160px;background:radial-gradient(circle,rgba(5,175,242,.32),transparent 68%);pointer-events:none;}
  .panel--truth .panel__head,.panel--truth .panel__text{position:relative;}
  .panel--truth .panel__icon{background:rgba(5,175,242,.16);color:#38d0f5;font-size:12px;box-shadow:inset 0 0 0 1px rgba(5,175,242,.4);}
  .panel--truth .panel__kicker{color:#38d0f5;}
  .panel--truth .panel__sub{color:#7fa6d8;}
  .panel--truth .panel__text{color:#dce6fb;}

  .response{margin-top:18px;}
  .response__summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px;border-top:1px solid #EDF0F4;padding:16px 2px 0;}
  .response__title{display:flex;align-items:center;gap:11px;}
  .response__title b{font-family:var(--f-mono);font-weight:400;font-size:12px;letter-spacing:.12em;color:var(--blue);}
  .response__title span{font-size:13px;color:var(--ink-faint);}
  .response__chev{flex:none;width:26px;height:26px;border-radius:50%;border:1px solid var(--accent-border);color:var(--blue);display:flex;align-items:center;justify-content:center;font-size:13px;transition:transform .2s ease;}
  details[open] .response__chev{transform:rotate(90deg);}
  .response__list{display:flex;flex-direction:column;gap:10px;margin-top:14px;}
  .resp-item{display:flex;gap:14px;align-items:flex-start;background:#F5F7FA;border:1px solid #EAEEF3;border-radius:12px;padding:14px 16px;}
  .resp-item__n{flex:none;width:27px;height:27px;border-radius:8px;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-family:var(--f-mono);font-size:12px;font-weight:600;}
  .resp-item__t{font-size:15.5px;line-height:1.5;color:#2a3650;padding-top:3px;}

  /* ---------- CTA + footer ---------- */
  .cta{position:relative;margin-top:64px;overflow:hidden;background:
    radial-gradient(90% 120% at 85% 0%, rgba(5,175,242,.18), transparent 55%),
    radial-gradient(70% 100% at 0% 100%, rgba(61,90,217,.32), transparent 55%),
    linear-gradient(178deg,#0a1640,#050912);}
  .cta__inner{padding:clamp(56px,8vw,104px) 0;position:relative;}
  .cta h2{font-family:var(--f-head);font-weight:800;font-size:clamp(32px,5vw,58px);line-height:1.05;letter-spacing:-.03em;margin:16px 0 0;max-width:18ch;color:#fff;}
  .cta p{color:#aab4cc;font-size:17.5px;line-height:1.6;max-width:58ch;margin:20px 0 36px;}
  .cta__eyebrow{font-family:var(--f-mono);font-size:12px;letter-spacing:.16em;color:#5cc6f5;}
  .cta__actions{display:flex;flex-wrap:wrap;gap:18px;align-items:center;}
  .link-cyan{display:inline-flex;align-items:center;gap:9px;color:var(--cyan);font-family:var(--f-head);font-weight:600;font-size:16px;padding:16px 6px;}
  .footer{background:var(--dark);border-top:1px solid rgba(255,255,255,.08);}
  .footer__inner{padding:48px 0;display:flex;flex-wrap:wrap;gap:40px;justify-content:space-between;}
  .footer__about{max-width:34ch;}
  .footer__about p{color:#8b97b5;font-size:14.5px;line-height:1.6;margin:16px 0 0;}
  .footer__cols{display:flex;gap:56px;flex-wrap:wrap;}
  .footer__col h4{font-family:var(--f-mono);font-weight:400;font-size:11px;letter-spacing:.14em;color:#5f6f95;margin:0 0 14px;}
  .footer__col div{display:flex;flex-direction:column;gap:10px;font-size:14.5px;color:#aab4cc;}
  .footer__legal{padding:0 0 44px;font-family:var(--f-mono);font-size:11.5px;letter-spacing:.04em;color:#5f6f95;}

  @media(max-width:600px){
    .container{padding-left:20px;padding-right:20px;}
    .nav__links{gap:18px;}
    .nav__link{display:none;}
  }
</style>
</head>
<body>

  <!-- ============ NAVBAR ============ -->
  <header class="nav">
    <div class="nav__inner container">
      <a href="#top" class="brand">
        <span class="brand__name">Northgate<span>.</span></span>
        <span class="brand__sub">CONSULTING</span>
      </a>
      <nav class="nav__links">
        <a href="#map" class="nav__link">THE MAP</a>
        <a href="#signals" class="nav__link">SIGNALS</a>
        <a href="#brief" class="btn-primary">Request a briefing</a>
      </nav>
    </div>
  </header>

  <!-- ============ HERO ============ -->
  <div class="hero-band">
    <div class="hero-grid"></div>
    <div class="hero-dot" style="top:120px;left:6%;width:8px;height:8px;background:rgba(5,175,242,.7);animation:drift 7s ease-in-out infinite;"></div>
    <div class="hero-dot" style="top:220px;right:13%;width:6px;height:6px;background:rgba(111,139,255,.85);animation:drift 9s ease-in-out infinite .8s;"></div>
    <div class="hero-dot" style="top:90px;right:32%;width:5px;height:5px;background:rgba(167,139,250,.75);animation:drift 11s ease-in-out infinite 1.6s;"></div>
    <section id="top" class="hero container">
      <div class="pill"><span class="pill__dot"></span><span class="pill__txt">INDUSTRY SIGNALS · STRATEGIC BRIEFING Q2 2026</span></div>
      <h1>Most of what you read about your industry is <span class="noise">noise.</span> We publish the <span class="signal">signal.</span></h1>
      <p>Thirty board-level signals across Telecom, Healthcare and Fintech. Each pairs the consensus assumption with the ground reality — and the move it demands from your board. Cutting through the noise, from Northgate Consulting.</p>
      <div class="hero__actions">
        <a href="#signals" class="btn-hero">Read the signals <span>→</span></a>
        <div class="hero__legend">
          <span><span style="color:var(--tel)">●</span> TELECOM</span>
          <span><span style="color:var(--hc)">●</span> HEALTHCARE</span>
          <span><span style="color:var(--fin)">●</span> FINTECH</span>
        </div>
      </div>
    </section>
  </div>

  <!-- ============ SECTOR TOGGLE ============ -->
  <section class="container" style="padding:48px 32px 8px;">
    <div class="toggle-head">
      <span class="eyebrow">SELECT SECTOR</span>
      <span class="eyebrow">10 SIGNALS · UPDATED Q2 2026</span>
    </div>
    <div class="tabs" id="tabs">
      <button class="tab tab--tel is-active" data-sector="telecom"><span class="tab__name">Telecom</span><span class="tab__meta">10 SIGNALS · LIVE</span></button>
      <button class="tab tab--hc" data-sector="healthcare"><span class="tab__name">Healthcare</span><span class="tab__meta">10 SIGNALS · LIVE</span></button>
      <button class="tab tab--fin" data-sector="fintech"><span class="tab__name">Fintech</span><span class="tab__meta">10 SIGNALS · LIVE</span></button>
    </div>
  </section>

  <!-- ============ SIGNAL MAP ============ -->
  <section id="map" class="container section-pad">
    <div class="map-head">
      <div>
        <h2>The Signal Map</h2>
        <p id="mapBlurb">Ten telecom signals, plotted by board impact and time-to-impact. Hover to read, click to jump to the signal.</p>
      </div>
      <div class="map-legend">
        <span><span style="color:var(--tel)">●</span> TELECOM</span>
        <span><span style="color:var(--hc)">●</span> HEALTHCARE</span>
        <span><span style="color:var(--fin)">●</span> FINTECH</span>
      </div>
    </div>
    <div class="map-row">
      <div class="map-yaxis">
        <span style="color:var(--navy)">HIGH IMPACT</span>
        <span>↑ IMPACT</span>
        <span style="color:var(--navy)">MODERATE</span>
      </div>
      <div class="map-plot-wrap">
        <div class="map-plot" id="mapPlot">
          <div class="map-glow"></div>
          <!-- dots + tooltip injected by JS -->
        </div>
        <div class="map-xaxis">
          <span style="color:var(--navy)">NOW</span>
          <span>TIME TO IMPACT →</span>
          <span style="color:var(--navy)">18 MO+</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ SIGNALS FEED ============ -->
  <section id="signals" class="container section-pad">
    <div class="feed-head">
      <span class="feed-head__name" id="feedName">Telecom</span>
      <span class="feed-head__meta">10 LIVE SIGNALS</span>
    </div>
    <div class="feed" id="feedRoot"><!-- injected by JS --></div>
  </section>

  <!-- ============ CLOSING CTA ============ -->
  <section id="brief" class="cta">
    <div class="cta__inner container">
      <span class="cta__eyebrow">PRIVATE BRIEFINGS · DIFC, DUBAI</span>
      <h2>Bring the signal into your boardroom.</h2>
      <p>We brief boards and leadership teams privately — your sector, your portfolio, the decisions actually on the table. No generic commentary, no slideware. Just the signal and the move it demands.</p>
      <div class="cta__actions">
        <a href="#brief" class="btn-hero">Request a briefing <span>→</span></a>
        <a href="#top" class="link-cyan">Subscribe to the quarterly brief →</a>
      </div>
    </div>
  </section>

  <!-- ============ FOOTER ============ -->
  <footer class="footer">
    <div class="footer__inner container">
      <div class="footer__about">
        <a href="#top" class="brand">
          <span class="brand__name">Northgate<span>.</span></span>
          <span class="brand__sub">CONSULTING</span>
        </a>
        <p>Boutique advisory, Dubai. Independent intelligence across Telecom, Healthcare and Fintech. We separate consensus from reality — and tell you what to do about it.</p>
      </div>
      <div class="footer__cols">
        <div class="footer__col"><h4>SECTORS</h4><div><span>Telecom</span><span>Healthcare</span><span>Fintech</span></div></div>
        <div class="footer__col"><h4>THE BRIEF</h4><div><span>Method</span><span>Archive</span><span>Subscribe</span></div></div>
      </div>
    </div>
    <div class="footer__legal container">© 2026 Northgate Consulting · Dubai International Financial Centre (DIFC), UAE · Confidential strategic briefing</div>
  </footer>

<script>
/* ============================================================
   DATA — 30 signals across 3 sectors (source: Northgate
   strategic briefing PDFs). Per signal:
     x = time-to-impact (0 = now … 100 = 18mo+)
     y = impact axis    (0 = high impact … 100 = moderate)
     c = conviction (1–5)
   ============================================================ */
const SECTOR_META = {
  telecom:    { name:'Telecom',    code:'TEL', color:'#6f8bff', rgb:'111,139,255', tint:'#EDF0FE', border:'#DCE3FA' },
  healthcare: { name:'Healthcare', code:'HLT', color:'#34d8a6', rgb:'52,216,166',  tint:'#E3F7F0', border:'#C4ECDF' },
  fintech:    { name:'Fintech',    code:'FIN', color:'#a78bfa', rgb:'167,139,250', tint:'#F0EBFE', border:'#E0D6FB' },
};

const DATA = {
  telecom: [
    { num:'01', short:'Telco-as-a-Platform', title:'Telco-as-a-platform is a mirage without modern software', horizon:'12–18MO', c:4, x:68, y:20,
      noise:'Expose your network APIs and you become a digital platform giant overnight — standardised interfaces guarantee instant monetisation from enterprise developers.',
      truth:'Enterprise developers reject legacy pipelines dressed as modern APIs. Real platforms need sub-millisecond, self-service provisioning your billing and OSS can’t deliver — so monetisation stays negligible.',
      responses:['Treat API strategy as a radical restructuring of internal IT, not a sales campaign.','Build hyper-local, developer-friendly abstractions that solve concrete local problems — not generic global standards.'] },
    { num:'02', short:'African Mobile Money', title:'FinTech success in Africa cannot simply be copied elsewhere', horizon:'NOW', c:5, x:40, y:54,
      noise:'Mobile wallets are an infallible growth engine for every emerging-market operator — just replicate East African mobile money to offset falling voice revenue.',
      truth:'That success came from a banking vacuum and rare regulatory leniency. In markets with real banking penetration an operator wallet is an expensive, redundant commodity bought with brutal acquisition costs.',
      responses:['Pivot from consumer wallets to embedded B2B micro-finance and merchant trade credit.','Target unbanked niches inside your enterprise ecosystem, not retail banks head-on.'] },
    { num:'03', short:'Streaming Aggregation', title:'Aggregating streaming services is a margin-sucking race to the bottom', horizon:'NOW', c:4, x:18, y:62,
      noise:'Become the ultimate entertainment hub by bundling every streaming app — aggregation boosts stickiness and protects premium post-paid ARPU.',
      truth:'Bundling is a high-churn vanity game where global media giants take the value. You carry billing, support and bad debt for single-digit revenue share — and customers leave the moment a rival trims the connectivity price.',
      responses:['Drop broad bundles; focus on localised, exclusive lifestyle micro-services or gaming infrastructure.','Negotiate for deep data-sharing agreements, not crumbs of revenue share.'] },
    { num:'04', short:'Enterprise AI / Data', title:'Enterprise AI opportunity lies in data curation, not large models', horizon:'12MO', c:5, x:60, y:16,
      noise:'You must build or host your own massive language models to stay relevant — every quarterly report demands an aggressive corporate AI statement.',
      truth:'Operators have no edge in building foundation models. The goldmine is your messy, underused repository of behaviour, location and transaction data — enterprises want clean, compliant pipelines, not another operator-branded AI tool.',
      responses:['Monetise your position as a trusted sovereign data curator via privacy-preserving exchanges.','Leave compute and model-building to the giants; charge a premium for the fuel that feeds them.'] },
    { num:'05', short:'Hyper-Personalisation', title:'Hyper-personalised CX tools usually destroy operational efficiency', horizon:'NOW–6MO', c:3, x:24, y:40,
      noise:'Real-time, hyper-personalised context engines will magically double digital cross-sell — every customer expects a tailored journey at every touchpoint.',
      truth:'Chasing absolute personalisation creates an unmanageable tangle of conflicting rules and latency, bombarding users with irrelevant offers and driving up contact-centre volume. Customers don’t want a conversation — they want an app that just works.',
      responses:['Strip out complex predictive marketing engines; reinvest in radical journey simplification.','Make your top five transactions bulletproof, instant and self-contained within three clicks.'] },
    { num:'06', short:'Sovereign Cloud', title:'Sovereign cloud is an identity play, not a technology business', horizon:'12–18MO', c:4, x:82, y:30,
      noise:'Sovereign cloud is the next multi-billion-dollar gold rush — invest heavily in proprietary local infrastructure to fend off the global players.',
      truth:'Sovereign cloud is a regulatory and political chess game, not a technology race. Enterprises buy it purely to satisfy data-residency law. Competing on feature sets against hyperscalers is a guaranteed way to burn capital.',
      responses:['Position strictly as the local trust and compliance layer wrapping global hyperscaler tech.','Monetise government relationships and clearances; let the giants fund continuous innovation.'] },
    { num:'07', short:'IoT Connectivity', title:'Traditional IoT connectivity scaling is financial suicide', horizon:'6–12MO', c:4, x:50, y:34,
      noise:'Chase the billions of connected devices — massive machine-to-machine market share secures the future of your enterprise business.',
      truth:'Cheap sensors yield pennies of ARPU while loading signalling strain and support cost onto core systems. Without owning the data orchestration or analytics layers, basic IoT scaling is a loss-making vanity metric.',
      responses:['Refuse to bid on connectivity-only IoT tenders.','Sell end-to-end operational outcomes — hardware, data insight and security in one high-margin fee.'] },
    { num:'08', short:'Enterprise Marketplaces', title:'Enterprise marketplaces are ghost towns without sales transformation', horizon:'NOW', c:3, x:30, y:70,
      noise:'Build a digital corporate marketplace and effortlessly upsell SaaS to SMEs — an automated, friction-free stream of high-margin recurring revenue.',
      truth:'Most operator marketplaces are abandoned storefronts with zero organic traffic. SMEs don’t log into a telecom portal to find accounting software, and your sales teams are paid to chase connectivity, not cross-sell.',
      responses:['Overhaul sales compensation to reward SaaS adoption alongside data lines.','Wire the marketplace into core business onboarding so software setup happens automatically.'] },
    { num:'09', short:'MVNO Sub-Brands', title:'MVNO brands are strategic hedging assets, not standalone cash cows', horizon:'NOW–6MO', c:4, x:14, y:78,
      noise:'Niche digital sub-brands and MVNOs are agile vehicles to capture trendy youth segments and drive profitable new retail growth.',
      truth:'With fully loaded overheads, most sub-brands run on razor-thin or negative margins. Their real function is defensive — cannibalising your own low-value base before a rival does. Treat them as profit centres and you trigger internal price wars.',
      responses:['Run sub-brands as lean retention and capacity-offload utilities.','Keep them on public cloud with zero dedicated retail presence.'] },
    { num:'10', short:'Super-Apps', title:'Super-apps are a corporate vanity project for most operators', horizon:'18MO+', c:5, x:76, y:50,
      noise:'Build an all-encompassing lifestyle super-app — chat, retail, utility bills — to escape commoditisation and dominate consumer screen time.',
      truth:'Consumers reject clunky telecom apps masquerading as social networks. Building and constantly updating a super-app burns immense capital for terrible daily-active numbers — you lack the agile product culture to beat dedicated consumer-internet apps.',
      responses:['Abandon the from-scratch lifestyle ecosystem.','Optimise your core app for friction-free identity validation and one-click checkout inside popular third-party apps.'] },
  ],
  healthcare: [
    { num:'01', short:'AI & Workforce', title:'AI will not solve your clinical workforce shortages', horizon:'NOW', c:5, x:30, y:22,
      noise:'Generative tools and automated diagnostics will instantly ease clinician burnout by absorbing admin work — expanding workforce capacity with no extra headcount.',
      truth:'Unvalidated algorithms add governance burden: senior clinicians spend more time auditing machine output than treating patients. Fragmented legacy data and reluctance to shift clinical liability to software block real automation.',
      responses:['Deploy automation only to back-office scheduling and billing, where liability is low and ROI is immediate.','Stop treating tech as a substitute for clinical staff — fix the broken workflow designs instead.'] },
    { num:'02', short:'Patient Apps', title:'Patient apps are alienating consumers, not driving engagement', horizon:'NOW', c:4, x:18, y:46,
      noise:'Bespoke hospital apps empower patients to manage their own care and are the definitive gateway to consumer loyalty.',
      truth:'Patients have digital fatigue and resist a separate app per provider. Poorly integrated portals offer little beyond static document viewing, and clinical data fails to sync across services.',
      responses:['Abandon proprietary apps; integrate patient communication into existing everyday channels.','Deliver value through frictionless services — automated SMS booking links and unified web portals.'] },
    { num:'03', short:'Interoperability', title:'Interoperability is a commercial stand-off, not a technical puzzle', horizon:'6–12MO', c:5, x:48, y:18,
      noise:'Adopt modern data standards and hospitals, clinics and pharmacies connect seamlessly — open APIs automatically democratise health data.',
      truth:'Incumbent vendors deliberately wall off data extraction to protect market share. Connectivity is blocked by conflicting commercial incentives and fear of losing patients — not by any technical limit.',
      responses:['Enforce strict data-ownership clauses in procurement, with penalties for vendors that charge for data access.','Authorities must move past technical guidelines and actively penalise intentional data hoarding.'] },
    { num:'04', short:'Remote Monitoring', title:'Remote monitoring creates data deluges without saving beds', horizon:'NOW–6MO', c:4, x:36, y:40,
      noise:'Virtual wards and wearables move chronic-disease management home, dramatically cutting emergency admissions and overheads.',
      truth:'Unrefined biometric streams overwhelm clinical command centres with false alarms and drive defensive testing. Without dedicated response teams, patients default back to the emergency department.',
      responses:['Restrict remote monitoring to tightly defined high-risk cohorts with clear intervention pathways.','Staff virtual wards with dedicated autonomous clinical teams — not as an extra task for ward staff.'] },
    { num:'05', short:'Value-Based Care', title:'Value-based care is suffocating under administrative compliance', horizon:'12MO', c:4, x:60, y:30,
      noise:'Shifting from fee-for-service to outcomes-based reimbursement organically lowers cost and improves health — the ultimate alignment of money and care.',
      truth:'The cost of tracking, validating and disputing complex quality metrics often consumes the theoretical savings. Providers and insurers deadlock over data accuracy instead of delivering care.',
      responses:['Simplify reimbursement to a few undeniable, easily measured outcomes — not hundreds of micro-metrics.','Build shared insurer–provider data infrastructure to automate reporting and kill manual audit cost.'] },
    { num:'06', short:'Cyber Resilience', title:'Cyber security is an operational vulnerability, not an IT problem', horizon:'NOW', c:5, x:22, y:64,
      noise:'Sophisticated firewalls and encryption fully shield health networks — breaches are strictly IT-infrastructure failures.',
      truth:'Hospitals are prime targets because time-pressured staff routinely bypass controls to expedite care. One compromised password can cripple a whole group when internal systems lack isolation.',
      responses:['Design security around clinical reality — make authentication fast and seamless, not obstructive.','Shift from absolute prevention to resilience: isolate infected areas and keep operating safely during an outage.'] },
    { num:'07', short:'National EMR', title:'Centralised national records often paralyse local delivery', horizon:'12–18MO', c:4, x:78, y:26,
      noise:'A single monolithic national electronic record is the gold standard — a frictionless ecosystem for clinicians and researchers alike.',
      truth:'Massive multi-year rollouts force diverse specialties into rigid standardised workflows that slow consultations, and routinely ship outdated software late.',
      responses:['Adopt a modular architecture: specialised systems connected by a robust national integration layer.','Prioritise data liquidity and common standards over forcing every setting onto an identical UI.'] },
    { num:'08', short:'Digital Prevention', title:'Preventive digital medicine fails to cut short-term acute demand', horizon:'18MO+', c:3, x:84, y:58,
      noise:'Digital wellness and early screening dramatically curve demand on acute hospitals and pay for themselves within the first budget cycles.',
      truth:'Early screening surfaces a flood of minor, asymptomatic conditions that still need evaluation, driving up appointments. Prevention’s payoff takes decades — no relief to annual budgets.',
      responses:['Fund digital prevention from ring-fenced public-health budgets, not operational hospital funds.','Judge it on long-term demographic health trends, not short-term emergency-admission cuts.'] },
    { num:'09', short:'The Hospital Asset', title:'The physical hospital remains the anchor of healthcare strategy', horizon:'12–18MO', c:5, x:70, y:50,
      noise:'Physical hospitals will soon be obsolete as care goes fully virtual and local — asset-light models will dominate future delivery.',
      truth:'Aging populations and multi-morbidity keep demand rising for intensive care, complex surgery and specialised diagnostics that can’t be decentralised. Virtual models fail the moment patients need hands-on intervention.',
      responses:['Repurpose hospitals into high-acuity hubs for complex intervention, trauma and intensive care.','Use digital services to move stable patients out of high-cost beds as fast as possible.'] },
    { num:'10', short:'Big Tech Partners', title:'Large tech vendors lack the clinical empathy for transformation', horizon:'6–12MO', c:4, x:52, y:70,
      noise:'Partnering with global tech giants brings world-class innovation and rapid transformation — a shortcut to modernising health systems.',
      truth:'Big tech forces generic consumer software models into complex regulated clinical settings, underestimating clinical-safety workflows — resulting in expensive, abandoned custom builds.',
      responses:['Retain control of your architecture; treat large tech firms as utility infrastructure providers.','Build transformation around clinical co-design, with frontline staff driving all workflow engineering.'] },
  ],
  fintech: [
    { num:'01', short:'Embedded Finance', title:'Embedded finance is a distribution channel, not a business model', horizon:'NOW', c:5, x:26, y:24,
      noise:'Non-financial brands will effortlessly grab huge share by embedding lending and payments into everyday platforms — cutting traditional banks out entirely.',
      truth:'Most non-financial firms lack the risk appetite, balance sheet and compliance to manage real credit defaults. The liability and regulatory reporting still sit with licensed banks — tech firms are just front-end agents.',
      responses:['Treat embedded finance as an efficient customer-acquisition channel, not a standalone tech business.','Build robust, high-availability APIs that let your licensed balance sheet safely back third-party platforms.'] },
    { num:'02', short:'Telco Convergence', title:'Telecom operators are data goldmines but balance-sheet laggards', horizon:'6–12MO', c:4, x:44, y:20,
      noise:'Mobile operators will displace banks across emerging markets by leveraging their massive subscriber bases — owning the primary screen guarantees dominance.',
      truth:'Operators excel at high-volume, low-margin connectivity but struggle with the risk management of profitable lending, and rarely want to lock up capital to meet banking capital-adequacy rules.',
      responses:['Stop building standalone bank infrastructure inside a telecom operating model.','Form equity/JV alliances: the operator is the data-rich origination engine, the bank keeps risk and regulatory ownership.'] },
    { num:'03', short:'CBDCs', title:'CBDCs are about sovereignty, not consumer payments', horizon:'12–18MO', c:4, x:80, y:34,
      noise:'Sovereign digital currencies will revolutionise retail and displace mobile money with frictionless peer-to-peer payments — the ultimate financial-inclusion tool.',
      truth:'Consumers already have fast, trusted wallets and instant bank transfers. Central banks are really building these to bypass Western settlement networks and enforce monetary sovereignty.',
      responses:['Stop building retail CBDC use-cases nobody is asking for.','Pivot to wholesale cross-border clearing, corporate treasury and automated trade settlement.'] },
    { num:'04', short:'Open Banking', title:'Open banking has failed to commoditise consumer deposits', horizon:'NOW', c:4, x:20, y:52,
      noise:'Mandated data sharing sparks mass account switching to niche fintech apps — legacy banks lose deposits unless they match fintech UIs.',
      truth:'Consumer inertia is strong, with deep trust in established institutions in volatile times. Fintechs get used for budgeting and quick transfers, but salaries and core wealth stay anchored in tier-one banks.',
      responses:['Shift from defending attrition to using open-banking data to enrich internal credit scoring.','Partner with aggregators to ingest third-party data and cross-sell wealth and lending to your captive base.'] },
    { num:'05', short:'Agent Networks', title:'Mobile money agent networks are an expensive legacy liability', horizon:'NOW–6MO', c:4, x:34, y:64,
      noise:'Expanding physical merchant and agent networks is the key to winning emerging markets — value scales with cash-in/cash-out footprint.',
      truth:'Managing physical liquidity and agent commissions eats up to half of wallet transaction revenue. As smartphones and instant-transfer rails mature, profit belongs to those who eliminate cash handling.',
      responses:['Aggressively shift from physical cash-in networks to digital-only, merchant-driven ecosystems.','Keep money digital with zero-fee P2P, and monetise via value-added merchant software.'] },
    { num:'06', short:'Super-Apps', title:'Super-apps are fracturing under consumer fatigue', horizon:'NOW', c:5, x:16, y:38,
      noise:'Consumers want one massive app for everything — food, rides, insurance, wealth — and mastering data aggregation means owning the home screen.',
      truth:'Bloated multi-feature apps are confusing and slow on mid-range phones. Consumers are unbundling, preferring dedicated, hyper-efficient apps for distinct tasks.',
      responses:['Don’t burn capital on a catch-all super-app for your market.','Build modular micro-services that sit inside other ecosystems, staying relevant without owning the whole app.'] },
    { num:'07', short:'Core Banking', title:'Core banking migration is a trap; middleware is the cure', horizon:'12MO', c:5, x:62, y:28,
      noise:'Institutions must rip out and replace decades-old core systems — cloud-native core replacement is the only path to true agility.',
      truth:'Monolithic core replacements take years, blow budgets and add catastrophic operational risk. Winners wrap an agile middleware layer around stable engines for identical speed at a fraction of the cost.',
      responses:['Halt risky total-system overhauls that threaten daily operations.','Invest in decoupled micro-services and integration layers that isolate the stable core from fast-changing interfaces.'] },
    { num:'08', short:'Alt-Data Scoring', title:'Alternative data scoring is useless without behavioural context', horizon:'6–12MO', c:4, x:52, y:48,
      noise:'Telecom airtime and device history instantly create a foolproof credit score for the unbanked — no traditional bureau needed.',
      truth:'Raw telco metadata is noisy and fails to predict repayment in macro shocks. Without real-time transactional data, alternative scoring just drives high micro-loan default rates.',
      responses:['Stop underwriting on passive mobile-network data alone.','Combine telecom utility data with active merchant-side cash-flow monitoring for a dynamic credit engine.'] },
    { num:'09', short:'Instant Payment Rails', title:'Real-time domestic rails are killing card-network margins', horizon:'NOW–6MO', c:5, x:40, y:42,
      noise:'International card networks stay dominant for e-commerce indefinitely — premium reward points protect card dominance in emerging markets.',
      truth:'Central banks are launching zero-fee account-to-account instant payments that bypass international rails, and merchants push QR-code bank transfers to dodge interchange fees.',
      responses:['Accelerate integration with national account-to-account infrastructure to capture direct volume.','Move off card-interchange reliance; build value-added merchant services like instant reconciliation.'] },
    { num:'10', short:'Regulatory Arbitrage', title:'Regulatory arbitrage is vanishing as central banks force separation', horizon:'12–18MO', c:5, x:74, y:58,
      noise:'Fintechs and operators can bypass banking law indefinitely under light-touch e-money licences — agility wins share without compliance cost.',
      truth:'Central banks are aggressively closing loopholes to protect stability, forcing telecom financial subsidiaries to structurally decouple from parents and face the same scrutiny as banks.',
      responses:['Drop any strategy built on regulatory loopholes or light-touch licensing.','Structure digital-finance divisions as ring-fenced, fully compliant entities that withstand intense audits.'] },
  ],
};

/* ---------- helpers ---------- */
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const convTrack = n => Array.from({length:5}, (_,i)=>`<span class="conv__seg${i<n?' is-on':''}"></span>`).join('');

/* ---------- render a signal card ---------- */
function cardHTML(s, meta){
  return `
  <article class="card" id="sig-${meta.code.toLowerCase()}-${s.num}">
    <div class="card__rail"></div>
    <div class="card__body">
      <div class="card__head">
        <div class="card__id">
          <span class="numtile">${s.num}</span>
          <div style="display:flex;flex-direction:column;gap:7px;">
            <span class="card__code">SIG · ${meta.code} · ${s.num}</span>
            <span class="chip">${esc(s.short)}</span>
          </div>
        </div>
        <div class="card__meta">
          <span class="horizon">HORIZON <i>·</i> <b>${esc(s.horizon)}</b></span>
          <div class="conv"><span class="conv__label">CONVICTION</span><span class="conv__track">${convTrack(s.c)}</span></div>
        </div>
      </div>
      <h3>${esc(s.title)}</h3>
      <div class="contrast">
        <div class="panel panel--noise">
          <div class="panel__head">
            <span class="panel__icon">⌁</span>
            <div class="panel__labels"><span class="panel__kicker">THE NOISE</span><span class="panel__sub">Consensus view</span></div>
          </div>
          <p class="panel__text">${esc(s.noise)}</p>
        </div>
        <div class="panel panel--truth">
          <div class="glow"></div>
          <div class="panel__head">
            <span class="panel__icon">◆</span>
            <div class="panel__labels"><span class="panel__kicker">THE GROUND TRUTH</span><span class="panel__sub">What is actually happening</span></div>
          </div>
          <p class="panel__text">${esc(s.truth)}</p>
        </div>
      </div>
      <details class="response">
        <summary class="response__summary">
          <span class="response__title"><b>THE RESPONSE</b><span>— the board move</span></span>
          <span class="response__chev">↘</span>
        </summary>
        <div class="response__list">
          ${s.responses.map((r,i)=>`
            <div class="resp-item">
              <span class="resp-item__n">${String(i+1).padStart(2,'0')}</span>
              <span class="resp-item__t">${esc(r)}</span>
            </div>`).join('')}
        </div>
      </details>
    </div>
  </article>`;
}

/* ---------- render the map dots ---------- */
function renderMap(){
  const meta = SECTOR_META[currentSector];
  const plot = document.getElementById('mapPlot');
  plot.querySelectorAll('.map-dot, .map-tip').forEach(el=>el.remove());
  DATA[currentSector].forEach((s,i)=>{
    const dot = document.createElement('button');
    dot.className = 'map-dot';
    dot.style.left = s.x + '%';
    dot.style.top = s.y + '%';
    dot.style.animationDelay = (0.05 + i*0.06).toFixed(2) + 's';
    dot.setAttribute('aria-label', s.short);
    dot.addEventListener('mouseenter', ()=>showTip(s, meta));
    dot.addEventListener('mouseleave', hideTip);
    dot.addEventListener('click', ()=>{
      const el = document.getElementById('sig-'+meta.code.toLowerCase()+'-'+s.num);
      if(el){ const y = el.getBoundingClientRect().top + window.scrollY - 90; window.scrollTo({top:y, behavior:'smooth'}); }
    });
    plot.appendChild(dot);
  });
}
function showTip(s, meta){
  hideTip();
  const plot = document.getElementById('mapPlot');
  const tip = document.createElement('div');
  tip.className = 'map-tip';
  tip.id = 'mapTip';
  tip.style.left = s.x + '%';
  tip.style.top = s.y + '%';
  tip.innerHTML = `<div class="map-tip__t">${esc(s.short)}</div><div class="map-tip__s">SIG·${meta.code}·${s.num} — ${esc(s.horizon)}</div>`;
  plot.appendChild(tip);
}
function hideTip(){ const t = document.getElementById('mapTip'); if(t) t.remove(); }

/* ---------- render the feed ---------- */
function renderFeed(){
  const meta = SECTOR_META[currentSector];
  document.getElementById('feedName').textContent = meta.name;
  document.getElementById('feedRoot').innerHTML = DATA[currentSector].map(s=>cardHTML(s, meta)).join('');
}

/* ---------- sector switching ---------- */
let currentSector = 'telecom';
function setSector(sector){
  currentSector = sector;
  const meta = SECTOR_META[sector];
  // drive the per-sector accent variables (cards, dots, chips, conviction)
  const root = document.documentElement.style;
  root.setProperty('--accent', meta.color);
  root.setProperty('--accent-rgb', meta.rgb);
  root.setProperty('--accent-tint', meta.tint);
  root.setProperty('--accent-border', meta.border);
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('is-active', t.dataset.sector===sector));
  document.getElementById('mapBlurb').textContent =
    'Ten ' + meta.name.toLowerCase() + ' signals, plotted by board impact and time-to-impact. Hover to read, click to jump to the signal.';
  renderMap();
  renderFeed();
}
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click', ()=>setSector(t.dataset.sector)));

/* ---------- init ---------- */
setSector('telecom');
</script>
</body>
</html>

```
