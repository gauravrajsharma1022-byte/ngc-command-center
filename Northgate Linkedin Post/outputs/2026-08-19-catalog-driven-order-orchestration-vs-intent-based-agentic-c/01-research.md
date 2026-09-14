# Research Brief — Catalog-Driven Order Orchestration vs. Intent-Based Agentic Commerce

**Run date:** 2026-08-20  
**Scout session:** Full primary-source verification pass  
**Source document:** `00-source-document.pdf` — read and cross-checked  
**Output audience:** Strategist (angle selection), Mason (visual execution)

---

## 1. Source Document Audit

The source document makes a structurally coherent argument about a real architectural shift in telecom BSS. Several claims are technically grounded. Several are not sourced. Scout's job here is to separate the two before Strategist picks an angle.

### Claims that hold up (verified or consistent with established domain knowledge)

| Claim | Verification status |
|---|---|
| TMF620 = Product Catalog Management API; TMF622 = Product Order Management API | ✅ VERIFIED — Both are active TM Forum Open API standards. TMF620 is at v5.0.0 (re-released Jan 21, 2026); TMF622 exists in GitHub under the official tmforum-apis org. Source URLs below. |
| Mapping TMF620 to TMF622 as the basis for traditional order orchestration | ✅ CONSISTENT with how telecom BSS functions operate, confirmed by Salesforce Communications Cloud documentation and TM Forum materials |
| 5G network slicing, MEC, IoT bundles as drivers of BSS complexity | ✅ CONSISTENT — Real, established technology categories; confirmed in domain-knowledge.md vocabulary and GSMA/TM Forum literature |
| BSS and its sub-functions (billing, rating engine, provisioning) as the relevant operational layer | ✅ VERIFIED per domain-knowledge.md |
| TM Forum's Autonomous Networks framework (Level 4/5 autonomy) as the industry direction of travel | ✅ CONSISTENT — TM Forum report cited by Fierce Network (March 2026) confirms telcos reaching Level 4 milestone |

### Claims in the source document that are UNVERIFIED — must not be passed forward as fact

| Claim | Status |
|---|---|
| "Order-to-Cash cycle times slashed from days or weeks down to seconds" | ❌ UNVERIFIED — No source cited. The "days to weeks" baseline is plausible (see industry data below), but "seconds" for complex multi-site B2B orders is aspirational and unverified. Do not use the specific comparison without qualification. |
| "Near-zero manual exceptions" with agentic OMS | ❌ UNVERIFIED — No source. Industry data (see below) shows 5–10% fallout is typical today; "near-zero" is a vendor-level aspiration, not a verified outcome. |
| "Eliminating 6-month custom integration roadmaps" for partner monetisation | ❌ UNVERIFIED — No source. Plausible as an industry pain point but the specific "6-month" figure is not backed by any citable study in this research pass. |
| "Tens of thousands of static catalog rule permutations" | ❌ UNVERIFIED — No source. Plausible for large operators but not supported by any primary or secondary data found. |

---

## 2. What the Major Analyst Firms Are Actually Saying (Verified and Unverified)

### 2A. Deloitte — VERIFIED at primary source in this session

**Source 1:** Deloitte press release (via PRNewswire), June 18, 2025  
URL: https://www.prnewswire.com/news-releases/deloitte-launches-agentic-ai-blueprint-to-help-unlock-us150-billion-in-value-for-telecom-organizations-302484415.html

> **Exact claim:** "Agentic AI presents a US$150 billion opportunity for the telecom industry — and the race to capture that value has already begun."  
> **Timeframe:** 5 years  
> **Scope:** Network management, service delivery, customer care, billing and customer service  
> **Methodology:** Not disclosed in the press release  
> **Context:** Launch of Deloitte's "Agentic AI Blueprint for Telcos" in collaboration with TM Forum's Open Digital Architecture (ODA) framework  
> ✅ **VERIFIED at Deloitte's official press release channel**

**Source 2:** Deloitte.com — "Unlocking exponential value with AI agent orchestration," November 18, 2025  
URL: https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2026/ai-agent-orchestration.html  
Sample: ~550 US cross-industry leaders (Deloitte's 2025 Tech Value Survey)

Key verified figures from this source:
- Autonomous AI agent market could reach **$35 billion by 2030**; with better orchestration, potentially **$45 billion by 2030**
- **80%** of respondents believe their organisation has mature basic automation capabilities
- **Only 28%** believe they have mature capabilities combining basic automation with AI agents
- **>40%** of today's agentic AI projects could be cancelled by 2027
- Only **12%** expect comparable ROI from automation-plus-agents within three years (vs. 45% for basic automation alone)
> ✅ **VERIFIED at Deloitte.com primary source**

**Scout note on the 80%/28% contrast:** This 52-percentage-point gap between perceived basic automation maturity and actual AI-agent readiness is the single most operationally relevant verified stat in this research pass. It is a self-assessed readiness gap from a cross-industry survey, not an external measurement — Strategist should characterise it accordingly.

---

### 2B. Gartner — URL CONFIRMED as Gartner newsroom; direct fetch returned 403 in this session

**Press release 1:** "Gartner Predicts 40% of Enterprise Apps Will Feature Task-Specific AI Agents by 2026," August 26, 2025  
URL: https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025  
Widely corroborated by UC Today, Process Excellence Network, Yahoo Finance, and cited in Deloitte's own TMT article

Key figures reported:
- **40%** of enterprise applications will feature task-specific AI agents by end of 2026, up from less than **5%** in 2025
- Agentic AI projected to drive approximately **30%** of enterprise application software revenue by **2035**, surpassing **$450 billion** (up from 2% in 2025)
> ⚠️ **UNVERIFIED — 403 on direct primary source fetch. Retry once failed. Widely reported but not page-fetched in this session. Flag as unverified if used; attribute softly per brand-voice rules.**

**Press release 2:** "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027," June 25, 2025  
URL: https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027  
Referenced in Deloitte's verified November 2025 article

Key figure: **33%** of enterprise software applications will include agentic AI by 2028, up from less than **1%** in 2024  
> ⚠️ **UNVERIFIED — 403 on direct primary source fetch. Cited within Deloitte's verified article. Same handling instruction as above.**

---

### 2C. McKinsey — Repeated timeouts on primary site; figures from secondary sources only

The McKinsey State of AI (November 2025) PDF and two telecom-specific articles timed out on multiple fetch attempts. Figures circulating in secondary sources:
- 88% of survey respondents regularly use AI in at least one function (Survey: June–July 2025, 1,993 participants, 105 countries)
- 23% scaling AI agents in at least one function
- 64% of telecom leaders expect AI to contribute >5% of revenues
- 40% of telecom leaders anticipate AI-driven cost reductions >10%
> ❌ **ALL McKINSEY FIGURES IN THIS BRIEF ARE UNVERIFIED AT PRIMARY SOURCE — primary PDF timed out twice; telecom article also timed out. Do not attribute to McKinsey without a new primary-source fetch.**

---

### 2D. BCG — 403 on all BCG primary pages in this session

BCG figures circulating in secondary sources:
- First agentic AI deployments showing 3× productivity increase, 80% reduction in cycle time, 60%+ long-term cost reductions
- Telecom example: agentic assistant sending 40,000+ messages/day across mobile/broadband/TV, resulting in 5× jump in digital sales
> ❌ **ALL BCG FIGURES UNVERIFIED — 403 on all BCG primary fetches. Do not use without a new primary-source fetch.**

---

### 2E. Industry / Trade Data (not primary analyst firms)

**TM Forum inform article** — "Winning the next wave of telecom innovation: the strategic imperative of agentic AI in BSS," March 13, 2026 (secondary source; attributes stats to Deloitte, Mordor Intelligence, McKinsey without direct links)  
URL: https://inform.tmforum.org/features-and-opinion/winning-the-next-wave-of-telecom-innovation-the-strategic-imperative-of-agentic-ai-in-bss

Within this article: OSS/BSS market cited as growing from **$24.7 billion (2025) to ~$48 billion (2030) at 14% CAGR** (attributed to Mordor Intelligence — a commercial aggregator, not a primary analyst firm). Vodafone Germany case: first contact resolution rate improved from **16% to 44%** with conversational AI — attributed but not linked to source.
> ⚠️ All stats in this article are **secondary attributions only**. Usable as directional context, not as citations.

**SequentialTech blog** (telecom vendor):
- Industry fallout rate: 5–10% of service orders fall out at some point in end-to-end journey
- Back-end fallout cost: ~$1M per each order fallout percentage
- Activation delays: 5–15 business days beyond technical readiness for mid-market operators
- Front-end fallout cost: $3–$10 per order; average correction time 4–10 minutes
> ⚠️ **Vendor content, not a primary analyst. Directionally useful for framing the pain point; do not pass forward as analyst-sourced data.**

---

## 3. Candidate Angles — Ranked by Strength

Scout does not select the angle. Rankings reflect: (a) quality of verified evidence, (b) alignment with Northgate's actual telecom/BSS/OSS expertise per domain-knowledge.md, (c) whether the angle avoids requiring the unverified source-doc superlatives to land.

---

### ANGLE 1 — The 52-Point Readiness Gap [STRONGEST]

**Core tension:** 80% of enterprises think they have mature automation. 28% actually have the capabilities needed to combine automation with AI agents. That 52-point gap is where agentic OMS projects collapse during transition — not in the architecture deck, but in production.

**Why this lands for Northgate:** "Business-first, technology-second" and "we stay through delivery" are Northgate's positioning lines. This angle is exactly the gap between architectural aspiration and operational delivery — the firm's natural territory. It doesn't require criticising vendors or the source document's vision; it adds the discipline layer that the source doc omits.

**Supporting stat (VERIFIED):**  
- Deloitte 2025 Tech Value Survey (~550 US leaders, November 2025): 80% mature basic automation / 28% mature automation-plus-agents  
- Deloitte (same source): >40% of agentic projects could be cancelled by 2027  
- Deloitte $150B telecom opportunity (June 2025): confirms the market direction is real, making the execution risk the relevant conversation

**Anchor vocabulary (domain-knowledge.md):** BSS/OSS, order-to-activation, provisioning, legacy BSS/OSS under a digital experience layer, CTO/CIO/Head of Network Operations as target room

**Tradeoff for Strategist:** This angle is a cautionary complement to the source doc's enthusiasm. It avoids every unverified superlative. It may read as "not bullish enough" if Strategist wants to lean fully into the future-state narrative.

---

### ANGLE 2 — The Pre-Defined Permutation Trap [TECHNICALLY STRONGEST]

**Core tension:** TMF620 and TMF622 are designed around pre-defined product dependency trees. A private 5G network slice with dynamic SLA requirements (99.999% uptime, <10ms latency, geographically distributed across hospital campuses) cannot be fully pre-catalogued. The architecture was never designed for this combinatorial surface area. That is a structural problem, not a configuration problem.

**Why this lands for Northgate:** This is the most technically credible angle because the vocabulary — TMF620, TMF622, BSS, provisioning, order-to-activation — is all explicitly in domain-knowledge.md. It sounds like it comes from someone who has been inside a telecom operator's BSS transformation, not a generalist opining on AI.

**Supporting stats (VERIFIED):**  
- TMF620 v5.0.0 (TM Forum, January 2026) and TMF622 as active standards confirm the source doc's technical framing is real, not invented  
- Deloitte $150B opportunity (June 2025): signals the business case for solving this is real  
- TM Forum's Autonomous Networks Level 4/5 trajectory (March 2026): confirms the industry direction

**Tradeoff for Strategist:** This is the most insider angle — strongest signal to the CTO/CIO/Head of BSS audience, but may need more translation for the broader LinkedIn feed. Also: the resolution direction (agentic orchestration) is correct but the source doc's specific performance claims (seconds, near-zero fallout) cannot be verified — the post would need to describe the direction without citing the unverified benchmarks.

---

### ANGLE 3 — O2C Unlocked: When the Buyer's Intent Becomes the Order [COMMERCIALLY RESONANT]

**Core tension:** B2B enterprise buyers in telecom don't shop from a catalog when buying complex, multi-site 5G or IoT solutions. They start with a business outcome ("continuous connectivity for surgical robotics across 3 campuses"). The gap between what the buyer can articulate and what a static OMS can parse is where revenue is lost — in fallout, manual exception handling, and weeks-long provisioning queues.

**Why this lands for Northgate:** Order-to-activation is a core vocabulary term in domain-knowledge.md. B2B telecom and MVNO/MVNE commercial complexity are Northgate's stated territory. This angle speaks directly to the Chief Commercial Officer and CTO simultaneously, translating architecture into revenue impact.

**Supporting data:**  
- Industry data (vendor source — not primary analyst): 5–10% of telecom service orders fall out; back-end fallout costs ~$1M per percentage point of fallout rate (SequentialTech). Flag as industry-level data, not analyst-verified.  
- Deloitte $150B telecom opportunity across billing, service delivery, network management (June 2025, VERIFIED) provides the market-level anchor  
- TM Forum's move toward autonomous order management (March 2026) confirms the trajectory

**Tradeoff for Strategist:** The most operationally specific angle. However, the specific financial data (fallout costs) comes from a telecom vendor blog, not a primary analyst — must be characterised as "industry data" not "according to analyst research." The source doc's "seconds" O2C claim cannot be used. Strategist would need to hold the tension without relying on the source doc's unverified benchmarks.

---

### ANGLE 4 — The B2B2X Monetisation Unlock [COMMERCIAL UPSIDE LENS]

**Core tension:** Static catalog-driven OMS cannot dynamically attach third-party partner services (IoT connectivity, edge security, private MEC resources) to an in-flight order without a custom integration cycle for each new partner or product type. This is not a feature gap — it is a revenue delay that compounds with each new partner relationship. Agentic order graphs that can dynamically pull in partner capabilities change what telecom operators can sell tomorrow vs. in six months.

**Why this lands for Northgate:** B2B2X monetisation and partner ecosystem strategy are part of Northgate's MVNO/MVNE and Telecom commercial excellence territory. This angle addresses the Chief Commercial Officer's speed-to-market problem directly.

**Supporting data:**  
- Deloitte $150B opportunity across network management and service delivery (VERIFIED)  
- TM Forum ODA framework (Deloitte's collaboration partner on their Blueprint) is a real initiative around dynamic partner monetisation

**Tradeoff for Strategist:** The source doc's specific "6-month custom integration roadmaps" claim is unverified — that exact figure cannot be used. The angle holds without it (the direction is real), but the sharpest supporting data point is the one we can't verify. Lower confidence than Angles 1–3.

---

### ANGLE 5 — The Cross-Sector Intent Pattern [MOST DIFFERENTIATED FOR NORTHGATE]

**Core tension:** The structural problem the source doc describes in telecom — rigid pre-defined rules collapsing under combinatorial complexity — maps cleanly to patterns Northgate works with in healthcare and fintech. In healthcare: prior authorisation workflows require matching clinical intent to payer rules that cannot be fully pre-defined. In fintech: payment orchestration requires routing based on real-time conditions that no static rule tree can fully anticipate. The shift from deterministic process to intent-based coordination is the same architectural change, in three different regulatory frames.

**Why this lands for Northgate:** This is the only angle that uses Northgate's cross-sector positioning explicitly. No competitor or peer firm is making this specific parallel between telecom OMS, healthcare prior auth, and fintech payment routing. It would position Northgate as the firm that sees the pattern others miss — consistent with "Business-first, technology-second."

**Tradeoff for Strategist:** This is the lowest-confidence angle in this research pass because the supporting data is almost entirely from telecom. The healthcare and fintech analogies are structurally sound per domain-knowledge.md, but Scout has not found verified primary-source data for the prior auth or payment routing parallels in this session. If Strategist picks this angle, a second research pass focused on healthcare prior auth digitisation and fintech payment orchestration would be needed before Sentinel clears it.

---

## 4. Flags for Strategist and Mason

### For Strategist (content angle selection)

1. **Do not carry any of the source document's unverified metrics into post copy.** The "seconds," "near-zero," "6-month," and "tens of thousands of permutations" figures have no primary source. The structural argument stands without them.
2. **The Deloitte $150B figure is verified** but carries a caveat: methodology was not disclosed in the press release. Use with "according to industry analysis" or soft attribution per brand-voice rules (no competitor names in copy).
3. **Gartner's 40% enterprise apps and 33% enterprise software figures are widely reported** but could not be fetched directly from Gartner's site in this session. They can be referenced softly ("analyst forecasts suggest…") but must not be hard-attributed to Gartner by name in post copy (brand-voice rule prohibits naming competitors; also unverified at primary source in this session).
4. **The 52-point Deloitte readiness gap** (80% vs. 28%) is the cleanest, most usable verified stat in the brief. It is self-assessed rather than externally measured, so the framing should reflect that.
5. **User note for Strategist:** The user instruction says to "use simple words." Angles 1 and 3 are more accessible for a general LinkedIn audience. Angle 2 is the most technically precise but may need translation.

### For Mason (visual execution)

- This topic has a clear two-part visual logic: **Static Tree vs. Dynamic Graph** (the architectural contrast the source doc describes)
- TMF620→TMF622 mapping can be shown as a rigid chain vs. a fluid mesh — strong whitepaper visual
- Brand colours apply per `brand-voice.md`: Navy `#0c1945`, Blue `#3d5ad9`, Cyan `#05aff2`; Fonts: Lexend (display), Source Sans 3 (body)
- The source document's four-component agentic architecture (Declarative Intent Capture → Agentic Context Parsing → Dynamic Dependency Graph → Closed-Loop Assurance) is a real, clean 4-step visual flow if Mason wants to illustrate the resolution side

---

## 5. Primary Source URLs (for Strategist / Mason reference)

| Source | URL | Verification status |
|---|---|---|
| Deloitte Agentic AI Blueprint press release (June 18, 2025) | https://www.prnewswire.com/news-releases/deloitte-launches-agentic-ai-blueprint-to-help-unlock-us150-billion-in-value-for-telecom-organizations-302484415.html | ✅ VERIFIED — fetched and confirmed |
| Deloitte AI Agent Orchestration (Nov 18, 2025) | https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2026/ai-agent-orchestration.html | ✅ VERIFIED — fetched and confirmed |
| TM Forum TMF620 v5.0 | https://www.tmforum.org/oda/open-apis/directory/product-catalog-management-api-TMF620/v5.0 | ✅ VERIFIED — confirmed as real standard |
| TM Forum TMF622 GitHub | https://github.com/tmforum-apis/TMF622_ProductOrder | ✅ VERIFIED — confirmed as real standard |
| Gartner 40% enterprise apps press release (Aug 26, 2025) | https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025 | ⚠️ UNVERIFIED — 403 on fetch; URL confirmed as Gartner newsroom |
| Gartner 33%/40% cancellation press release (Jun 25, 2025) | https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 | ⚠️ UNVERIFIED — 403 on fetch |
| TM Forum inform — Agentic AI in BSS (Mar 13, 2026) | https://inform.tmforum.org/features-and-opinion/winning-the-next-wave-of-telecom-innovation-the-strategic-imperative-of-agentic-ai-in-bss | ⚠️ Secondary source only — stats within are attributed to other firms, not independently verified |
| McKinsey State of AI 2025 PDF | https://www.mckinsey.com/~/media/mckinsey/business%20functions/quantumblack/our%20insights/the%20state%20of%20ai/november%202025/the-state-of-ai-2025-agents-innovation_cmyk-v1.pdf | ❌ UNVERIFIED — socket timeout on fetch |
| BCG — Agents accelerate next wave of AI (2025) | https://www.bcg.com/publications/2025/agents-accelerate-next-wave-of-ai-value-creation | ❌ UNVERIFIED — 403 on fetch |

---

*Research brief complete. Scout does not select the angle. All ranked angles above have honest tradeoffs stated. Strategist proceeds from here.*
