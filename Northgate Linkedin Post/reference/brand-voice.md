# Northgate Brand Voice — LinkedIn Content Rules

Binding for every Watchtower agent. These rules exist because a specific mistake happened during this pipeline's development and got corrected — each one is load-bearing, not stylistic preference.

## Phase rule (revisit this line first, every run)

As of the pipeline's creation, Northgate is in **month-one, insight-only mode**: posts share industry insight and earn trust. No pitching Northgate's services, no CTA to "contact us," no case-study self-promotion. This phase rule has an end date the human owner sets — Strategist must check with the human before assuming the phase has changed.

## Sourcing integrity

- Never fabricate a statistic. Never attribute a claim to a firm (Gartner, Deloitte, McKinsey, BCG, etc.) without Scout having verified it at the primary source in the same pipeline run.
- Never claim externally-published research as "our own research and experience." If Scout can't verify a number firsthand, it doesn't go in the post — full stop, no exceptions for how well it fits the narrative.
- Do not name competing advisory/consulting firms in post copy, even when citing their real published research. Attribute softly instead ("according to industry forecasts," "recent analyst research") — see the `no-competitor-names` rule below for why.

## No competitor names

Northgate is a boutique advisory firm. Naming McKinsey/Deloitte/Gartner/BCG by name in Northgate's own thought-leadership content reads as borrowing a rival's credibility, not as citation. Keep the rigor (real, verified numbers), drop the name.

## Tone

- No negative or judgmental language about the reader or "the industry" — no "wrong," "mistake," "nightmare." Describe patterns forming, not people failing.
- No strawman assumptions. If the post states a belief someone holds, it must be the *defensible-sounding* version a competent leader would actually reason their way into — not a naive version that's easy to knock down. Defensible-sounding-but-wrong is what makes a governance gap dangerous; naive is not credible.
- Every "problem" beat needs at least a gesture at the fix. Diagnosis without any signal of a resolving discipline undercuts Northgate's actual positioning ("we stay through delivery," not "we point at things").
- Short paragraphs, line breaks between thoughts, mobile-scannable. This is written to be read in six seconds on a phone, not read like an article.

## Structural template (see reference/post-template.md for the full spec)

Hook (must work standalone in ~140–210 characters) → tension → one-sentence thesis on its own line → 3-point structure (never more than 3) → proof anchor → so-what / engagement question → 3–5 hashtags at the very end.

## Coherence check (non-negotiable, Sentinel enforces this)

Whatever the hook promises, the body must deliver in the same words. If the hook says "three things," the body must name those exact three things, and the closing line should echo them once more on the way out. This was missed once already in this pipeline's history — it does not get missed again.

## Locked facts about Northgate (do not deviate)

- Sectors: Telecom, Healthcare, Fintech (plus MVNO/MVNE and Enterprise as adjacent scope).
- Five practice areas: Strategic Advisory, Digital Transformation, Process & Solution Consulting, Commercial Excellence, Delivery Management.
- Positioning line: "Business-first, technology-second." Technology decisions follow business diagnosis, never precede it.
- Brand line: "Reliable. Resilient. Resolute."
- Founder: Gaurav Sharma.
- Palette: Navy `#0c1945`, Blue `#3d5ad9`, Cyan `#05aff2`. Fonts: Lexend (display), Source Sans 3 (body) — real files in `pipeline/fonts/`, not lookalikes.
