# Orange Romania — Working Notes

Created: 2026-09-10

## Context
Assessing an inbound pitch from **Campaign Registry Inc. ("TCR" / The Campaign Registry)**
to **Orange Telecom Romania** (deck dated Aug 2025, "Orange Telecom Romania - Aug 2025.pdf").
TCR runs the US 10DLC A2P messaging registry and is expanding internationally (already
active in UK, Spain, France, Germany, Hungary, Italy, Ireland, Romania per deck).

## Key facts
- Subject: Orange Romania — MNO, target buyer of TCR's campaign-registry model.
- TCR = identity/registration layer for A2P SMS & RCS. Verifies WHO sends (brand/CSP/DCA)
  and WHAT they send (campaign/use case). NOT in the message path; does not block or
  compete with aggregators/senders.
- TCR scale claims: ~2.8M brands, +1,600 CPaaS/messaging companies, ~2.5M messaging programs.
  GDPR compliant, ISO 27001.
- Romania problem framing in deck: SMS scams up 6x in 2023; DNSC smishing alerts; gray-route
  revenue leakage; no sender transparency; no centralized campaign oversight.
- Stated MNO benefits: reduce spam/fraud, improve SMS trust, increase A2P SMS monetization,
  value-added services for verified senders.
- Deck "next steps": technical discovery -> pilot scope -> integration + stakeholder training
  -> align with ANCOM / regulator if needed.
- Deck is an early-stage template (placeholders "Operator Name", "mm/yy", duplicated text).
- TCR contacts: Miguel Lavin Segura (Carrier Relations Mgr, EU), Adrian Chavez (VP Intl Sales).

## The opportunity (working thesis)
Primary lever = **A2P revenue recovery**: force brands/aggregators to register, convert
gray-route / unbilled A2P traffic to billed white-route traffic. Registry + feedback loop
gives Orange the data to enforce ("carrots and sticks").
Secondary: fraud/smishing reduction -> regulatory goodwill (ANCOM), brand & customer trust.
Tertiary: new VAS — verified sender ID / branded sender, premium tiers for verified traffic.
Strategic: first-mover / market-shaping — Orange as anchor MNO could drive a Romania-wide
standard across Vodafone, Digi, Telekom (mirrors how US MNOs aligned), and co-own the
national registry.

## Open questions
- Which side is Northgate advising — Orange, TCR, or evaluating a partnership?
- Romania A2P SMS market size / gray-route leakage estimate?
- Does Orange RO already run an SMS firewall (Enea/AdaptiveMobile, Mavenir, Sinch, Infobip)?
  TCR is complementary (identity layer), not a firewall replacement — needs positioning.
- Network-effect risk: registry only works if aggregators + brands actually register.
- Regulatory posture of ANCOM toward a mandated/national registry.

## Case study (animated web page)
- 2026-09-10 — Built premium animated scrollytelling case study: tcr-mno-case-study.html.
  Anonymised **Tier-1 North American MNO**, 20M+ subs, deployment 2023. User's persona =
  **Senior A2P SMS Solutions Architect** (designed/integrated/delivered TCR into the MNO
  A2P stack). Dark cinematic theme, Lexend/Source Sans 3/IBM Plex Mono, kinetic hero,
  scroll reveals, animated 3-plane architecture diagram (built from the user's solution
  image: Register → Enrich/Enforce → Feedback), count-up-style metric cards (all
  placeholders "[ __% ]" — user gave NO real numbers), delivery timeline, lessons, close.
  `[ Your name ]` placeholder in the sign-off. `?still=1` URL param freezes all animations
  for screenshotting. Published Artifact:
  https://claude.ai/code/artifact/09f150e7-990c-4ce8-ad8e-c30c6a729057
  Preview PNGs: casestudy-hero.png, casestudy-architecture.png.
- 2026-09-10 — Reworked on user feedback (dark→bad, text-left/blank-right, tiny diagram,
  cut 3 sections): now **LIGHT** Northgate theme (navy logo), **two-column editorial**
  layout (sticky section header left, content fills right), **large full-width** 3-plane
  architecture diagram on a panel, hero has an abstract hub/fan-out/feedback SVG on the
  right. Sections now: Hero · Context · Challenge · Architecture · Integration · Role ·
  Delivery + footer sign-off. REMOVED: Outcomes, What made it work, Transferable.
  `?still=1` freezes animations + shrinks hero for screenshots. Same Artifact URL.
- 2026-09-10 — Hero graphic replaced (user: "is this complete?" — it wasn't): now a
  verified-message-bubble motif (✓ badge + faded "anonymous · blocked" bubble on a
  network line). Project facts updated per user: "North America operator", "3M subscriber
  base", "Deployment 2025", "Role · Solution Architect" (dropped "Tier-1" / "Senior"
  everywhere). Footer "Designed & delivered by [Your name]" line removed — footer is now
  just the centred Northgate logo.
- 2026-09-10 — Removed the "— " hairline rule before every section eyebrow (user: "so
  claude native"). Added a live info-flow animation to the architecture diagram: each
  connector is now a solid wire (`.d-rail`) with a continuously flowing dashed packet
  overlay (`.d-flow` → `@keyframes dpacket` on stroke-dashoffset), plus a gentle opacity
  pulse halo around the TCR core (`.d-hub-ring`). All gated on `.diagram.in` +
  prefers-reduced-motion.

## One-page briefing (PDF)
- 2026-09-10 — Built Orange-Romania-Briefing.pdf — a single A4-portrait premium briefing
  doc (Northgate light brand, navy logo) that combines: title → **01 the opportunity**
  (Register/Verify & Share/Act + Orange benefits + Next steps, all from the user's
  "Orange Romania - Analysis" deck) → **02 how I contribute** (Drive workshops / Define
  pilot scope / Deliver to go-live + the bridge) → **CTA** with a clickable button +
  URL + live thumbnail linking to the case-study Artifact
  (https://claude.ai/code/artifact/09f150e7-990c-4ce8-ad8e-c30c6a729057).
  Source: Orange-Romania-Briefing.source.html; regenerate via Chrome --print-to-pdf.
  Link annotation verified present in the PDF.

## Decisions / progress log
- 2026-09-10 — Folder created.
- 2026-09-10 — Logged TCR -> Orange Romania deck analysis.
- 2026-09-10 — Built premium one-pager pitch SLIDE in Northgate brand system
  (tcr-orange-romania-onepager.html; Lexend/Source Sans 3, navy #0c1945 + cyan #05aff2,
  16:9 container-query-scaled). Published as Artifact:
  https://claude.ai/code/artifact/1937afa7-420b-4365-a8c4-c994623317eb
  4 `[ proof point ]` placeholders still need the user's real credentials.
- 2026-09-10 — Expanded to a WHITE-theme 3-slide deck (Northgate dark logo), same file/URL,
  title now "Orange Romania Delivery Pitch":
  (1) The opportunity — my read of what TCR wants to build with Orange RO (Register → Verify
      & share → Act; TCR out of message path; prize = fraud down + grey-route A2P recaptured);
  (2) How I contribute — workshops → pilot scope → go-live + the bridge band;
  (3) Case study — ANONYMISED Tier-1 European MNO, user's role = Solution & Scope Lead,
      headline outcome = A2P revenue recovery. Metric on slide is a "[ +__% ]" fill-in —
      user still needs to supply the real figure (they gave no numbers).
  Slide PNGs saved in folder (opportunity-slide-1 / contribution-slide-2 / casestudy-slide-3).
- 2026-09-10 — Also produced editable PowerPoint: Orange-Romania-Delivery-Pitch.pptx
  (16:9, 3 slides, speaker notes on each). Generated by build-pptx.py (python-pptx) —
  re-run that script to regenerate after edits. Fonts set to Lexend / Source Sans 3;
  PowerPoint substitutes if they're not installed (TTFs are in
  "Northgate Linkedin Post/pipeline/fonts/"). Metric on slide 3 is still "[ +__% ]".
- 2026-09-10 — Redesigned slide (user: "too clumsy, too much text"). Now ONE idea:
  "From solution design to go-live — I own that path." Left-to-right pipeline of 3 steps
  (Drive technical workshops / Define pilot scope / Deliver to go-live), each = title + 3
  terse items, connected by a cyan rail + chevrons. Foundation band underneath = area #1,
  "The bridge — Orange business ⇄ TCR technical, runs across every step." No sentences,
  no proof-point clutter. Same Artifact URL.
- 2026-09-10 — User is being asked by TCR how their 20yr telecom experience can help
  execute the Orange RO next steps. Drafted TCR-contribution-brief.md (memo to TCR
  int'l sales / carrier relations). Angle: operator-side execution is the missing piece —
  P&L translation, firewall coexistence, ANCOM/DNSC regulatory path, cold-start sequencing,
  30/60/90 plan, scale to Orange Group framework agreement.
