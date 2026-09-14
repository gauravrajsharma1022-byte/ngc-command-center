# Domain Knowledge — Telecom, Healthcare, Fintech

Reference sheet every Watchtower agent reads before touching a topic. Sourced from Northgate's own site content (`src/lib/practiceAreas.ts`, `src/app/sectors`) — not invented. Extend this file as Northgate's real expertise grows; every agent reads it fresh each run, so edits here take effect immediately across the whole pipeline.

## Telecom (Tier 1–3 operators, MVNO/MVNE)

- **Core systems vocabulary:** BSS/OSS, CRM, billing and revenue management, provisioning, order-to-activation, network fault escalation, charging systems.
- **Real standards to anchor claims to, if citing a framework:** TM Forum eTOM (Business Process Framework), APQC PCF (cross-industry process classification). Do not invent framework names.
- **MVNO/MVNE specifics:** host network negotiations, platform/billing setup, go-to-market and launch playbooks, operational readiness.
- **Live pressure points:** legacy BSS/OSS carrying a decade of patches under a modern digital experience layer; network monetisation beyond connectivity; regulatory compliance and NPS programmes; M&A integration.
- **Who's in the room:** CTO/CIO, Chief Commercial Officer, Head of Network Operations, regulatory/compliance leads.

## Healthcare (health systems, digital health)

- **Core systems vocabulary:** EHR/EMR, clinical and operational system integration, claims adjudication, prior authorization, care coordination, patient journey.
- **Live pressure points:** simultaneous pressure from digitisation, data privacy, and patient experience; connecting clinical, operational and patient-facing systems without breaking compliance.
- **Regulatory frame:** data privacy and compliance obligations are load-bearing, not optional — a governance gap here has patient-outcome and regulatory-filing consequences, not just an efficiency cost.
- **Who's in the room:** CMIO/CNIO, Chief Compliance Officer, Head of Patient Experience, clinical operations leadership.

## Fintech (fintech firms, financial services)

- **Core systems vocabulary:** core banking/fintech platforms, payments infrastructure, digital product and CX, partnership/ecosystem strategy.
- **Live pressure points:** operating inside fast-evolving regulation while competing on platform speed; vendor evaluation for core platforms carrying real switching-cost and compliance risk.
- **Regulatory frame:** compliance and risk functions (AML/KYC-adjacent) are usually the actual blocker on speed, not the technology itself.
- **Who's in the room:** CRO (Chief Risk Officer), Head of Compliance, Head of Product, CTO.

## Cross-sector pattern Northgate is positioned to speak to

All three sectors share the same shape of problem the firm exists to solve: high-complexity, high-regulation environments where a process failure isn't an inconvenience — it's a compliance breach, a patient outcome, or a regulatory filing. Any post grounded in "we've seen this pattern across telecom, healthcare and fintech" must actually match this shared shape — don't force a sector reference that doesn't fit the specific claim being made.

## Hard rule for every agent

Never invent a statistic, framework name, regulation name, or system name that isn't either (a) confirmed at a primary source by Scout, or (b) already established as real in this file or in Northgate's own site content. "Sounds plausible" is not sourcing.
