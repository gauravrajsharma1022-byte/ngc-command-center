# Northgate Watchtower

An agentic pipeline that turns a raw topic or instinct into a publish-ready LinkedIn post — research, positioning, copy, adversarial review, on-brand visual, and a single human checkpoint at the end. Named for the thing Northgate's own brand story already describes: a watchtower scans the horizon for what's coming, and guards the gate before anything is let through.

## Why it's built this way

Six agents, not one, because the highest-value step in building the first post through this system was a genuinely adversarial review pass — a critic who didn't write the draft, reading it cold. Collapsing writing and critique into one agent loses exactly that. Every agent below has a narrow mandate and, where possible, its tool access technically enforces the boundary (Sentinel, for instance, has no ability to edit the draft it's reviewing — it can only write findings).

## The agents

| Stage | Agent | Role | Reads | Writes |
|---|---|---|---|---|
| 1 | **Scout** | Research & primary-source verification | topic / raw angle | `01-research.md` |
| 2 | **Strategist** | Picks the angle, locks a one-sentence thesis | `01-research.md` | `02-thesis.md` |
| 3 | **Scribe** | Drafts the post to Northgate's template | `02-thesis.md`, `01-research.md` | `03-draft.md` |
| 4 | **Sentinel** | Adversarial review — 20-year-veteran read, cold | `03-draft.md` | `04-sentinel-review.md` |
| 5 | **Mason** | Builds the on-brand visual | final caption | `05-mason-notes.md`, `06-visual.png` |
| 6 | **Warden** | Assembles the package, the one human checkpoint | everything above | `00-package.md` |

Full persona, do's and don'ts for each agent: see `agents/`. The **functional** definitions Claude Code actually loads live in `.claude/agents/northgate-*.md` (the harness only discovers subagents there) — the copies in `agents/` are synced mirrors for visibility inside this workspace.

All six agents are domain-briefed in Telecom, Healthcare and Fintech via `reference/domain-knowledge.md`, and bound by the same brand-voice rules in `reference/brand-voice.md` — both grounded in Northgate's real site content and the real corrections made while building the pipeline's first post, not invented best practice.

## Web UI

A local-only cockpit lives at `/internal/watchtower` in the Next.js app (`src/app/internal/watchtower/page.tsx`, backed by `src/app/api/watchtower/*`). Topic field, document upload, notes, a "Run Agents" button, live per-stage progress, and a review pane for every file a run produces.

Run it with `npm run dev` and open `http://localhost:3000/internal/watchtower`. **Never deploy this route publicly** — it shells out to the `claude` CLI on the server, which is only appropriate for local, trusted use.

**On manual revision loops:** if you (or Claude, driving it manually) are looping Scribe↔Sentinel by hand instead of stopping at Warden's first "needs revision," cap it at ~3 rounds. Two real multi-round tests (5 rounds, then another 4+) showed every finding was legitimate but revealed a whack-a-mole pattern where fixing one echo relocated it rather than removing it — Scribe was patching the exact flagged line without reasoning about the whole post. A holistic-reread-after-patching rule wasn't enough to stop this. The actual fix, now in Scribe's rules: two mandatory pre-writing checks (a structural-category outline, and a stat-to-source inventory with exact hedge language) before any prose gets written, and revisions are now full rewrites informed by the findings — not patches to the existing draft. If it still isn't converging after 3 rounds, stop and make the call yourself rather than continuing to iterate.

Mechanically: each stage is a real headless call — `claude -p --agent northgate-<stage> --allowedTools <that stage's declared tools> -- "<prompt>"` — run as a child process from `src/app/api/watchtower/run/route.ts`. There is no separate `ANTHROPIC_API_KEY` configured anywhere in this setup — every headless call authenticates through the same Claude Code session/subscription this project already uses, not a new metered billing source. The `--max-budget-usd` flag on each stage is a safety cap against runaway usage, not a real per-run dollar charge. Progress streams to the browser as newline-delimited JSON as each stage starts, logs, and finishes. Nothing is auto-looped: if Sentinel's verdict is "ready for revision," the pipeline still runs through to Warden, who is instructed to surface that gap in the package rather than paper over it — a human decides whether to re-run.

## How to run it

In a Claude Code session on this project, say something like:

> "Run Northgate Watchtower on [topic / angle]."

Claude orchestrates Scout → Strategist → Scribe → Sentinel → Mason in sequence, using the Agent tool, writing each stage's output to `outputs/<date>-<topic-slug>/`. Warden runs last and stops — that's the only point where you're asked to review anything. If Sentinel's verdict is "ready for revision," the loop goes back to Scribe before Mason ever touches the visual.

You can also invoke any single stage directly ("have Scout research X," "have Sentinel review this draft") if you want to run the pipeline manually or resume partway through.

## Folder map

```
Northgate Linkedin Post/
├── README.md                    — this file
├── agents/                      — reference mirrors of the 6 agent personas
├── reference/
│   ├── brand-voice.md           — binding tone, sourcing, and phase rules
│   ├── domain-knowledge.md      — Telecom / Healthcare / Fintech briefing
│   └── post-template.md         — the McKinsey/Gartner/Deloitte-derived structure
├── pipeline/
│   ├── watchtower_visuals.py    — Mason's toolkit: real brand fonts, logo, color helpers
│   └── fonts/                   — Lexend & Source Sans, extracted from the site's own build
└── outputs/
    └── <date>-<slug>/           — one folder per post: every stage's artifact, plus the final PNG
```

## Extending it tomorrow

- **New sector or updated domain knowledge:** edit `reference/domain-knowledge.md`. Every agent reads it fresh each run — no agent file needs to change.
- **New brand rule (tone, sourcing, phase change):** edit `reference/brand-voice.md`, same reason.
- **New pipeline stage** (e.g. a "Herald" agent that drafts the LinkedIn comment reply strategy, or a translation pass): add `.claude/agents/northgate-<name>.md` following the existing frontmatter pattern, mirror it into `agents/`, and note its place in the table above.
- **New visual template:** add a generation script alongside `pipeline/watchtower_visuals.py` that imports its helpers — don't duplicate the font/color/logo logic.
- **Change the phase rule** (e.g. month-one insight-only ends): update the phase rule at the top of `reference/brand-voice.md` explicitly — Strategist is instructed to check that file, not assume.

## Current phase

Month-one, insight-only. No Northgate pitching, no CTAs to services, no named case studies. See `reference/brand-voice.md` for the full rule.
