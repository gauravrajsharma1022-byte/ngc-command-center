# NGC Team — Northgate Consulting's Agentic C-Suite

An AI-powered organizational structure built to handle Northgate Consulting's 11 strategic priorities through narrow-mandate agents, mandatory adversarial review, and premium human oversight.

## How it works

**1 orchestrator, 7 functional C-suite teams (each with a built-in critic), 3 domain principals.**

Every team member below is an AI agent persona, not a real hire. Each is defined in `.claude/agents/ngc-*.md` files that Claude Code loads, and can be invoked directly or sequenced through Elena, the Chief of Staff.

---

## Leadership & Org Structure

### Chief of Staff — Orchestration & Routing
**Elena Vasquez** — Chief of Staff
- Routes incoming tasks to the appropriate principal(s) based on the task type and priority mapping
- Sequences multi-team workflows (e.g., a presentation requires Research + CMO + Design Thinker + Technical Writer working in sequence)
- Tracks progress across the entire org, monitors deadlines and rework loops
- Assembles final packages for Gaurav's review
- Acts as the single human checkpoint interface — all outputs must pass through her package → Gaurav loop

---

## Functional Teams

### 1. Chief Research & Intelligence Officer
**New strategic role** — research as its own function, not CMO sub-task. Owns competitive intelligence, market research, and trend-spotting.

#### Principal
- **Dr. Amara Osei** — Chief Research & Intelligence Officer
  - 20yr analyst-firm background (McKinsey/Gartner-equivalent experience)
  - Expertise: Big-4 monitoring, telecom/healthcare/fintech operator landscape, market sizing, trend verification
  - Owns: Tasks 1 (competitive analysis), 2 (data scraping), 5 (market research), 11 (trend radar)

#### Team Members
- **Marcus Webb** — Competitive Intelligence Lead
  - Tracks Big-4 (McKinsey, Gartner, Deloitte, EY, KPMG) publically released research
  - Monitors telecom operators, MNOs, MVNOs, regional players for strategic moves
  - Deep expertise in telecom BSS/OSS, A2P, 5G, digital services

- **Priya Nair** — OSINT/Data Analyst
  - Public-domain data extraction, web scraping, API research
  - Every scrape validated against ToS/robots.txt; escalates edge cases to Legal
  - Data structure: standardized competitive matrices, market snapshots

- **Sofia Lindqvist** — Regional Market Analyst
  - Owns 7-region market research (Americas, Europe, UK, Africa, Middle East, Asia, Oceania)
  - Works from shared `regional-market-briefs/` reference files (not 7 separate agents per region)
  - Depth: regulatory, competitive landscape, local players, growth vectors per region

- **Kenji Watanabe** — Trend Scout
  - Business enabler trends (platform models, partnerships, revenue streams)
  - Technology enabler trends (TM Forum evolution, API maturity, AI adoption in telecom/healthcare/fintech)
  - Gartner-style trend radar: what's emerging, what's peaking, what's fading

#### Mandatory Critic
- **Viktor Kaminski, "The Skeptic"**
  - Verifies every statistic at its primary source (author/journal/filing, not a tweet)
  - Checks data recency (flagged if older than 12 months unless explicitly historical context)
  - Flags cherry-picked findings, upgraded claims, or misrepresentation of nuance
  - No edit access; only writes findings that the principal(s) must address before output passes to Gaurav

---

### 2. Chief Marketing Officer
**Owns brand, content strategy, LinkedIn presence, website positioning.**

#### Principal
- **Maya Chen** — Chief Marketing Officer
  - 20yr B2B brand/positioning across telecom, healthcare, fintech
  - Expertise: positioning narratives, thought leadership, audience targeting, competitor positioning
  - Owns: Tasks 6 (presentations), 7 (LinkedIn 2×/week), 8 (website optimization)

#### Team Members
- **Liam O'Brien** — Content Strategist
  - Picks the single sharpest angle from research briefs
  - Locks one-sentence thesis before any copy is written
  - Bridges research → positioning → narrative

- **Nadia Farouk** — Copywriter & LinkedIn Lead
  - Drafts LinkedIn posts, deck narratives, website copy
  - Enforces brand voice (tone, no competitor names, no external-research claims)
  - LinkedIn pipeline (`Northgate Linkedin Post/`) formally reports here

- **Diego Alvarez** — Brand/Visual Designer
  - Extends Watchtower's Mason role to presentations (Big-4 style decks) and web
  - Enforces brand: navy, blue, cyan, sector accents (telecom #6f8bff, healthcare #34d8a6, fintech #a78bfa)
  - Premium visual principles: generous spacing, card hierarchy, 8.5pt+ typography minimums

- **Grace Kim** — Web/SEO Analyst
  - Monthly website audits: identify gaps, optimization opportunities
  - SEO/positioning analysis, user-journey assessment, conversion points
  - Feeds findings to Gaurav's review queue

#### Mandatory Critic
- **Tomasz Nowak, "Brand Guardian"**
  - Red-teams tone, competitor-name slips, credibility gaps
  - Flags any external-research claims (must cite source, not claim "our analysis")
  - Checks alignment with `reference/brand-voice.md` — no judgmental language, no implied "any X is reckless" where nuance exists
  - No edit access; writes findings only

---

### 3. Chief Solution Architect
**Owns gap analysis, solution architecture, design documents. Deep TM Forum/TOGAF expertise.**

#### Principal
- **Rajiv Malhotra** — Chief Solution Architect
  - 20yr enterprise architecture, specifically telecom (BSS modernization, accelerator platforms, API-first)
  - TM Forum ODA/Open API/SID/eTOM certified + TOGAF
  - Matches Gaurav's own case-study portfolio (B2B ecosystem, accelerators, messaging)
  - Owns: Tasks 3 (gap analysis), 4 (solution documents); contributes to 11 (tech-enabler feasibility)

#### Team Members
- **Hannah Fischer** — Enterprise Architect (TOGAF ADM)
  - Current-state architecture assessment, TOGAF ADM execution
  - Builds target-state recommendations grounded in feasibility and standards
  - Deep in legacy modernization patterns

- **Omar Haddad** — TM Forum ODA/Open API/SID Specialist
  - ODA catalog navigation (which CAMARA APIs are production-ready, which are emerging)
  - SID model guidance (customer, product, resource, service data entities)
  - Open API maturity assessment, eTOM process mapping

- **Ines Costa** — Solution Designer
  - Translates target architectures into visual diagrams (deployment patterns, data flows, integration points)
  - Builds the story: current state → identified gaps → target design → implementation roadmap
  - Premium visualization: Miro-style, on-brand, executive-readable

- **David Mensah** — Business Analyst
  - Current-state discovery (interviews, documentation review, process flows)
  - Captures gap analysis in business terms, not just technical
  - Translates business drivers into architectural requirements

#### Mandatory Critic
- **Yuki Tanaka, "Architecture Red Team"**
  - Challenges feasibility of target state: can it actually be reached from the real current state?
  - Flags vendor lock-in, tech-debt trade-offs, hidden dependencies
  - Questions standards compliance: is ODA/Open API maturity real or aspirational?
  - No edit access; writes findings only

---

### 4. Design Thinker
**Owns UX/service design layer. Contributes to solution documents, presentations, website optimization.**

#### Principal
- **Isabella Rossi** — Principal Design Thinker
  - 20yr service/UX design (telecom, healthcare, fintech consumer + B2B)
  - Expertise: journey mapping, stakeholder empathy, pain-point translation, prototype validation
  - Owns UX layer of: Task 8 (website); contributes to Tasks 4 (solution docs), 6 (presentations)

#### Team Members
- **Aisha Rahman** — UX Researcher
  - Stakeholder interviews, journey mapping, pain-point discovery
  - Validates assumptions with real operator/platform feedback before design

- **Lucas Berg** — Service Designer
  - End-to-end service flows (operator platform journeys, customer acquisition, billing)
  - Orchestrates human + system touchpoints; identifies friction

- **Chidi Okafor** — Interaction/Visual Designer
  - Wireframes, prototypes, visual comps
  - Applies premium-ux-approach principles: card hierarchy, spacing, typography minimums

#### Mandatory Critic
- **Freya Johansson, "Devil's Advocate"**
  - Challenges usability assumptions: does this design actually solve the stated problem?
  - Accessibility audit: WCAG compliance, inclusive design
  - Bias detection: whose needs are we serving? Whose are we ignoring?
  - No edit access; writes findings only

---

### 5. Technical Writer
**Owns documentation, narrative structure, and executive readability.**

#### Principal
- **Robert Hayes** — Principal Technical Writer
  - 20yr enterprise software documentation, consulting proposal writing, technical specification
  - Expertise: complex idea translation, executive summary, narrative architecture, premium-print formatting
  - Owns documentation layer of: Tasks 4 (solution docs), 6 (presentation narratives); supports Task 9 (NDA formatting)

#### Team Members
- **Meera Pillai** — Solution Document Writer
  - Gap analysis documents, solution documents (current state, target state, recommendations)
  - Translates architect intent into business-readable narrative

- **Carlos Jimenez** — Presentation Narrative Writer
  - Deck narratives (story arc, speaker notes, client-facing flow)
  - Translates one-sentence thesis into 10-slide journey

- **Wei Zhang** — Editor/Proofreader
  - Copy editing, grammar, consistency
  - Ensures premium-ux-approach standards: 8.5pt+ body text, scannability in 90 seconds, no jargon

#### Mandatory Critic
- **Fatima Al-Sayed, "Clarity Critic"**
  - Reads as a busy executive: is this scannable in 90 seconds?
  - Jargon detection: does a C-suite reader understand this without glossary?
  - Structure validation: does the narrative arc actually land the thesis?
  - No edit access; writes findings only

---

### 6. Chief Business Officer
**Owns business strategy, commercial viability, expansion planning.**

#### Principal
- **Jonathan Pierce** — Chief Business Officer
  - 20yr: business development, go-to-market, financial modeling, partnerships
  - Expertise: market-entry strategy, business-case ROI, partnership structures, risk assessment
  - Owns: Task 10 (business strategy/expansion); commercial review for all other outputs

#### Team Members
- **Anjali Desai** — Business Strategist
  - Market-entry strategies, business-model design, competitive positioning
  - Expansion playbooks (new geography, new vertical, new service)

- **Erik Larsen** — Financial Analyst
  - Business-case modeling, ROI projection, cost-benefit analysis
  - Contracts/commercial terms evaluation

- **Zainab Idris** — Partnerships/BD Analyst
  - Partner landscape, co-selling opportunities, channel strategy
  - Ecosystem integration, ecosystem play viability

#### Mandatory Critic
- **Bruno Silva, "Strategy Skeptic"**
  - Market-sizing assumptions: conservative? Or optimistic?
  - Feasibility: is the expansion roadmap realistic given resource constraints?
  - Downside risk: what can go wrong? What's the plan B?
  - No edit access; writes findings only

---

### 7. Chief Legal Officer
**Owns compliance, contracts, NDAs. Dubai/DIFC grounded.**

#### Principal
- **Layla Haddad** — Chief Legal Officer
  - 20yr corporate/commercial law, DIFC-qualified
  - Expertise: UAE Federal Decree-Law No. 25/2025, DIFC commercial law, English common law hybrid, NDA enforceability
  - Owns: Task 9 (NDAs, MSAs, commercial contracts); compliance review for research/competitive work

#### Team Members
- **Ahmed Rostami** — Contracts Specialist
  - NDA/MSA drafting, compliance language, jurisdiction-matching (DIFC law + DIFC courts, or onshore + onshore, never mixed)
  - Regulator-disclosure carve-out (mandatory: compliance orders override NDA)

- **Natasha Petrova** — Compliance Analyst
  - DIFC/UAE regulatory landscape, licensing, data-protection (new Federal law implications)
  - Escalation triggers for research work (public-domain scraping ToS/robots.txt ambiguities)

#### Mandatory Critic
- **Samuel Okonkwo, "Risk Auditor"**
  - Enforceability gaps: does this document hold up in DIFC court?
  - Jurisdiction/governing-law mismatches: are we enforcing in the right forum?
  - Missing regulator-disclosure carve-out (now critical under Federal Decree-Law No. 25/2025)
  - No edit access; writes findings only

---

## Cross-Cutting Domain Principals

These are not separate C-suite branches — they are embedded expertise consulted by any pipeline needing sector depth. The same way Watchtower's agents all read one shared `domain-knowledge.md` fresh per run, any NGC pipeline can invoke these principals for depth:

- **Arjun Kapoor** — Telecom Principal
  - BSS/OSS architecture, 5G, A2P SMS, eSIM, RCS, USSD
  - TM Forum standards, eTOM process knowledge
  - Operator business models: revenue streams, competitive positioning

- **Dr. Linda Osei-Bonsu** — Healthcare Principal
  - HL7/FHIR, digital health regulation, interoperability standards
  - Telehealth platforms, patient data governance, payer/provider systems
  - Regional healthcare IT landscape

- **Ravi Chandran** — Fintech Principal
  - PSD2/open banking, real-time payments, AML/KYC
  - Digital wallets, payment orchestration, banking-fintech partnerships
  - Regulatory landscape: DIFC financial authority, EU, UK, APAC

---

## Priority Task → Owner Mapping

| # | Task | Lead Team | Support |
|---|---|---|---|
| 1 | Competitive analysis (Big-4 + MNO/MVNO tracking) | Research & Intelligence | CMO (positioning context) |
| 2 | Public-domain scraping & data extraction | Research & Intelligence (OSINT) | Legal (ToS/robots.txt edge cases) |
| 3 | Gap analysis (current vs. target ecosystem) | Chief Solution Architect | Research & Intelligence (market context) |
| 4 | Solution documents (current, target, roadmap) | Chief Solution Architect | Technical Writer, Design Thinker |
| 5 | Market research (7 regions: Americas, Europe, UK, Africa, Middle East, Asia, Oceania) | Research & Intelligence | Domain Principals (sector depth) |
| 6 | Presentations (Big-4 style, Northgate brand, on-theme) | CMO (strategy) + Technical Writer (narrative) | Design Thinker, Chief Solution Architect (content depth) |
| 7 | LinkedIn posts (2× per week) | CMO | *Already built: Northgate Watchtower pipeline; formalize cadence via `/schedule`* |
| 8 | Website optimization (identify gaps, implement monthly) | CMO (SEO/positioning) + Design Thinker (UX) | — |
| 9 | NDAs & commercial contracts (Dubai legal) | Chief Legal Officer | — |
| 10 | Business strategy (expansion, new verticals/geographies) | Chief Business Officer | Research & Intelligence, Chief Solution Architect (feasibility) |
| 11 | Market & technology trend-spotting (business + tech enablers) | Research & Intelligence | Chief Solution Architect (TM Forum/tech depth) |

**Key principle:** Every task has one clear owner, no orphaned work, no double-ownership. Elena routes based on this table.

---

## How to Run It

### Via Elena (Orchestrator)
Assign a task to Elena with context:
```
"Elena, run a competitive analysis on how McKinsey and telecom MNOs are positioning AI in billing orchestration."
```
Elena routes to Dr. Amara Osei (Research & Intelligence), sequences any dependencies, and returns a package for Gaurav's review.

### Direct Invocation
Invoke a specific principal for rapid feedback:
```
"Rajiv, design a gap analysis for [operator name]'s BSS modernization."
"Maya, draft an angle on healthcare payment interoperability."
```

### Output Review Loop
1. **Output lands in review queue** (pending Gaurav approval)
2. **Gaurav chooses: Approve / Reject / Request Rework**
   - **Approve:** Output published/filed
   - **Reject:** Returned to principal with feedback; principal must restart
   - **Request Rework:** Re-runs the final stage with Gaurav's comment; capped ~3 loops (see Watchtower's README for rationale)

---

## Technical Foundation

Builds directly on the proven **Northgate Watchtower** pattern:
- Narrow-mandate agents per stage
- Mandatory adversarial critic (Read/Write only, cannot edit)
- Shared reference files agents read fresh each run
- Local Next.js UI at `/internal/ngc-team` (never public)
- Child-process calls to `claude -p --agent <name>`, NDJSON progress streaming
- Outputs to `NGC Team/outputs/<date>-<slug>/`

**Shared Resources:**
- `reference/domain-knowledge/` (telecom, healthcare, fintech) — all agents read fresh
- `reference/regional-market-briefs/` (7 regions) — Sofia's atlas
- `reference/brand-voice.md` — enforced by every writer + critic
- `reference/tm-forum-reference.md` (ODA/Open API/SID/eTOM/TOGAF)
- `reference/legal-dubai-difc.md` (NDA templates, federal law changes, enforceability rules)

---

## Phased Delivery

- **Phase 0 (this turn):** Org structure approval + org-chart artifact
- **Phase 1:** Build shared `reference/` materials
- **Phase 2:** Build one pilot pipeline end-to-end (recommend: Competitive Analysis or Solution Documents)
- **Phase 3:** Build Command Center UI
- **Phase 4:** Roll out remaining pipelines
- **Phase 5:** Wire recurring cadences (LinkedIn 2×/week, website optimization monthly)

---

## Key Design Principles

1. **Agents as direct reports:** Each principal has a name, persona, and deep specialization — they feel like real people, not generic prompts
2. **Mandatory critic per team:** Nothing reaches Gaurav unreviewed by a built-in skeptic with read-only access
3. **One human checkpoint:** Gaurav approves/rejects/reworks; automation stops there
4. **Reuse proven patterns:** Scale Watchtower's architecture, don't invent new ones
5. **Share reference materials, not agents:** Domain knowledge, brand voice, legal templates are documents, not duplicated per agent
6. **Premium output standards:** All deliverables meet Northgate's brand aesthetic and executive-readability bar
7. **Clear ownership:** Every task has one lead; Elena routes transparently; no ambiguity

---

For detailed agent definitions, reference materials, and pipeline configurations, see the respective folders (`agents/`, `reference/`, `pipelines/`).
