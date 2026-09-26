"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { X, Clock, Calendar, Play, Pause, BookOpen, Headphones } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ──────────────────────────────────────────────────────────────────────
// ADDING NEW BLOGS: When you write a new blog:
// 1. Create as id: 0 with hookLargeGold: true (cyan color)
// 2. Increment all existing articles by 1 (id: 0→1, id: 1→2, etc)
// 3. Toggle hookLargeGold pattern: true, false, true, false, true, false
// 4. Copy image to public/images/ and reference it
// 5. Use <!-- IMAGE_BREAK --> to split content before/after the image

type ArticleType = {
  id: number;
  hookLarge: string;
  hookSmall: string;
  hookLargeGold: boolean;
  date: string;
  readMin: string;
  title: string;
  tags: string[];
  audioSrc?: string;
  imageSrc?: string;
  content: string;
};

const ARTICLES: ArticleType[] = [
  // ─── BLOG 3 (LATEST - Always First) ───────────────────────────────────
  {
    id: 0,
    hookLarge: "AI-NATIVE TELCO",
    hookSmall: "PROVE IT WORKS",
    hookLargeGold: true,
    date: "Sep 2026",
    readMin: "14 min",
    title: "AI-Native Telco: The Demo Is Easy. Proving It Works Across Your Systems Is Hard.",
    tags: ["AI", "Telecom", "BSS/OSS", "Strategy"],
    imageSrc: "/images/ai-native-telco-foundations.png",
    content: `
<p>A customer buys a new mobile plan. The app says it is active, but the data service does not work. An AI assistant reads the complaint, checks the account and suggests a fix. In a product demonstration, the answer appears in seconds.</p>

<p>Now follow the problem through your actual operator environment.</p>

<p>CRM shows the new plan. Order management says the request is complete. Provisioning shows a partial failure. Charging still holds the old allowance. The network reports another state altogether.</p>

<p>Which record should the assistant trust? What is it allowed to change? Who takes responsibility if it makes the wrong change?</p>

<p>These questions expose two linked challenges that we're seeing across the industry. Operators need BSS/OSS foundations that support reliable AI decisions. They also need a way to distinguish products that can work safely across those foundations from products that merely present an impressive AI interface.</p>

<h3>SCOPE OF THIS ARTICLE</h3>

<p>This article focuses specifically on AI agents designed to complete end-to-end actions across multiple systems—agents that take action, not just recommend it. If you're evaluating AI for narrower use cases (anomaly detection, recommendations, summarisation, customer service), some of these five foundations apply differently. The key is knowing which ones matter for your specific use case.</p>

<p>Here's how we think about it: Can intelligence move from understanding a problem to completing and verifying the right action in a live customer journey? Everything between those two points matters.</p>

<h3>The Gap Between an Answer and an Outcome</h3>

<p>AI can summarise calls, recommend offers, detect anomalies and help teams investigate faults. These are useful capabilities. But a customer whose service is down needs more than a good explanation.</p>

<p>Resolving that customer's issue may require the operator to confirm the purchased product, inspect the order, compare inventory with network state, check charging, correct provisioning, verify the result and communicate it back. The action crosses business and operational systems, each with its own rules and owner.</p>

<p>A model can recommend a correction. Your surrounding architecture determines whether that correction is valid, authorised, completed and recorded. If those controls are missing, adding AI can accelerate confusion as easily as it accelerates resolution.</p>

<p>What we've learned from emerging industry standards like TM Forum's AI-Native Blueprint: the critical word is governed. An agent must operate alongside dependable systems of record, within clear permissions and with evidence of what it did.</p>

<h3>Five Foundations Operators Should Examine First</h3>

<p>Before asking what an AI product can do, ask what your environment allows it to know and do. These five foundations apply specifically to AI agents that take autonomous or semi-autonomous actions across multiple systems.</p>

<p><strong>1. A trustworthy service view.</strong></p>

<p>Can you connect customer, product, order, inventory, charging and network state in a single authoritative view? Where records disagree (and they will), is there an identified system of record for each decision, a timestamp and a documented way to resolve the conflict?</p>

<p>Most operators we talk to have this in pieces, but not unified. Building this clarity upfront determines everything that follows. This is foundational work, but it's also the work that prevents an AI agent from making decisions based on stale or conflicting data.</p>

<p><strong>2. Controlled actions.</strong></p>

<p>Are tasks like changing an allowance, retrying provisioning or issuing a credit exposed through managed services with validation, permissions, status updates and audit trails? An accepted request is not proof of a restored service.</p>

<p>This is where we see vendors oversell. They show an AI agent submitting a request and stopping there. They don't show whether that request actually completed in the downstream system or failed halfway through. Completion is what matters, not submission.</p>

<p><strong>3. End-to-end ownership.</strong></p>

<p>Who owns the customer outcome when care, IT, network operations, finance and a delivery partner are all involved? An AI agent cannot repair an accountability gap through orchestration alone.</p>

<p>This conversation needs to happen before you select any product. If ownership is unclear today, adding AI won't clarify it. If anything, it will make it worse by introducing another actor (the AI) into an already ambiguous accountability chain.</p>

<p><strong>4. Boundaries and recovery.</strong></p>

<p>Which decisions can run automatically? Which require approval? Can you stop an agent, review its basis for action and recover when a downstream task fails? Can you rollback a partial change or reverse a decision that turned out to be wrong?</p>

<p>These are the questions that separate proof-of-concept from production-ready. Budget real time for this conversation because the answers will shape how you deploy the AI and how much manual oversight you'll need.</p>

<p><strong>5. Outcome measures.</strong></p>

<p>Are teams measuring completed resolutions, failed orders, repeat contacts, manual effort, revenue leakage and customer impact? A high-quality model response is only one step in the journey.</p>

<p>This matters because it forces the conversation from "can it generate a good answer?" to "does it improve outcomes that matter to the business?" Revenue leakage, for example, includes orders that fail to complete fully, discounts issued in error, manual rework effort and customer churn due to service failures. Track these before and after AI implementation to measure real impact.</p>

<p>These foundations do not require a wholesale replacement of every legacy system. What they do require is an honest view of which data, interfaces and controls must improve for your specific use case to work. And importantly, you can build these incrementally, starting with one critical journey rather than betting the entire BSS/OSS.</p>

<!-- IMAGE_BREAK -->

<h3>What Should "AI-Native" Actually Mean in a Telecom Purchase?</h3>

<p>There is no single marketing label that proves a product is AI-native. We've looked at vendors using excellent third-party models, vendors building their own models and combinations of both. The choice of model matters far less than how intelligence is designed into the product's workflows, data access, controls and operations.</p>

<p>Here's what we've seen work: a credible AI-native product should sense, decide, act, verify and learn under your control. It should make those capabilities transparent to you. This framework reflects how production AI systems are being designed across the industry today.</p>

<p>This is a buyer's framework, not an industry certification. It aligns with emerging standards like TM Forum's AI-Native Blueprint and reflects established AI risk-management principles that demand documented testing, governance and monitoring throughout the system lifecycle.</p>

<h3>What to Ask Vendors and What Evidence to Request</h3>

<p><strong>Buyer question: What does the AI know?</strong></p>

<p>Evidence to request: Data sources, freshness, lineage, access controls and how you handle conflicting BSS/OSS records. If a vendor can't explain how their agent decides which system of record to trust, that's a red flag.</p>

<p><strong>Buyer question: What can it do?</strong></p>

<p>Evidence to request: A live list of permitted actions, policy checks, approval points and service-specific limits. "It can do whatever the model suggests" is not acceptable. "It can retry provisioning only if the original order is confirmed and approval is granted" is what you're looking for.</p>

<p><strong>Buyer question: How does it work across our systems?</strong></p>

<p>Evidence to request: An end-to-end flow through your order, provisioning, charging and assurance systems. Show documented interfaces and failure states. Walk through what happens when a downstream system is unavailable or behaves unexpectedly.</p>

<p><strong>Buyer question: How can we trust the result?</strong></p>

<p>Evidence to request: Decision and action logs showing WHAT it did and WHEN it did it. Important note: Modern AI may not be able to fully explain WHY it made a decision—this is a known limitation of current technology. Focus on auditing actions and verifying outcomes rather than demanding explainability of reasoning. Ask for test results, monitoring capabilities, human overrides, rollback options and proof of completion. "Request submitted" is not sufficient; proof of completion is what matters.</p>

<p><strong>Buyer question: Can we operate it over time?</strong></p>

<p>Evidence to request: Model and prompt versioning, change controls, performance monitoring, incident ownership, cost visibility and support commitments. Understand who owns the product when something goes wrong in production.</p>

<p><strong>Buyer question: Can we retain choice?</strong></p>

<p>Evidence to request: Clarity on where your data lives, how it flows and what integration effort would be required to switch vendors in the future. Full data portability may not be realistic (vendors understandably want to protect IP and security), but you should understand integration boundaries and switching costs upfront. This matters because AI vendor relationships matter, and vendor lock-in is a real risk in this space.</p>

<h3>Ask for One Uncomfortable Demonstration</h3>

<p>Product evaluations often begin with the vendor's best-designed scenario. Insist on testing both success cases AND failure cases.</p>

<p>Give each shortlisted vendor the same scenario: a bundle purchase succeeded, but provisioning failed and charging has already changed. Provide a realistic, controlled test environment with conflicting records. Ask the vendor to show the full journey, including the failure.</p>

<p>Watch what the product actually does:</p>

<p><strong>1. Detect:</strong> Does it identify the conflict rather than accept the first "completed" status? Can it see that provisioning failed while charging succeeded?</p>

<p><strong>2. Explain:</strong> Can it show which records informed the decision and how current they are? Can it articulate the contradiction it discovered?</p>

<p><strong>3. Constrain:</strong> Does it check entitlement, permissions and policy before changing anything? Or does it recommend changes to systems it isn't authorised to access?</p>

<p><strong>4. Act:</strong> Can it invoke a controlled action across the required systems, or must a person re-enter the recommendation elsewhere? If the answer is "must a person re-enter," understand the cost and where that manual step will happen.</p>

<p><strong>5. Verify:</strong> Does it confirm the network and charging outcome, rather than stopping at "request submitted"? Stopping at the request is not sufficient.</p>

<p><strong>6. Recover:</strong> If the correction fails halfway through, does it pause, escalate and preserve a clear audit trail? Can you understand what it tried and what went wrong?</p>

<p>Why test edge cases? Because vendor demos typically showcase success. Edge cases reveal whether the product has been designed to handle complexity predictably. If it can handle this difficult scenario, you've found a robust solution. If it can't, you've saved yourself from a fragile implementation.</p>

<p>Run the same case with incomplete data, an unavailable downstream system and a request outside the agent's authority. The point is not to demand full autonomy on day one. It is to see whether the product behaves predictably when your telecom environment does not cooperate.</p>

<p>An AI assistant that only recommends a next step can still be worth buying. The issue is buying it as an autonomous, end-to-end solution when it has demonstrated only assisted decision-making. Contract and price for the capability proven.</p>

<h3>From Theory to Implementation: Start With One Journey</h3>

<p>Here's what we see get stuck: operators try to implement five foundations across their entire BSS/OSS at once. It's too expensive. It's too slow. It feels like ripping everything out and starting over.</p>

<p>That's not necessary.</p>

<p>Instead: Start with one critical journey. Not the easiest one—the one where you lose money today. Define exactly what that journey needs: which data, which interfaces, which controls.</p>

<p>This pragmatic approach means:</p>

<ul style="margin-left: 1.25rem; color: #8892b0;">
  <li>Pick one valuable journey (ask yourself: where do we bleed money today?)</li>
  <li>Define success clearly (what does "resolved" look like for this journey?)</li>
  <li>Pilot the AI product in a controlled environment</li>
  <li>Learn what foundation gaps exist for THAT journey</li>
  <li>Fix those gaps incrementally</li>
  <li>Measure impact (did this actually improve outcomes?)</li>
  <li>Then expand to the next journey</li>
</ul>

<p>You don't need perfect foundations everywhere. You need sufficient foundations for each specific use case you're deploying AI into. Build from there.</p>

<h3>The Vendor Perspective</h3>

<p>We acknowledge that vendors operate within real constraints—technical limitations, IP protection, security boundaries and business models. They can't simply expose all data, all interfaces and all controls. This guide isn't about being adversarial. It's about asking vendors to be transparent within their constraints.</p>

<p>A vendor that can articulate their constraints AND show how they've solved within those constraints is exactly the kind of partner you want. Vendor maturity isn't about having no constraints; it's about being honest about them and having engineering to work around them.</p>

<p>Similarly, some vendors claim their AI works with legacy systems through abstraction layers rather than requiring BSS/OSS modernisation. This IS possible, but there's a trade-off: abstraction layers add complexity, latency and integration effort. For some use cases, it's worth it. For others, selective modernisation of key systems is cleaner. There's no universal answer—it depends on your architecture and tolerance for complexity.</p>

<h3>Put Proof Into Your Procurement Process</h3>

<p>A useful evaluation starts before you send the request for proposal. Select two or three valuable journeys (the ones where you lose money today), record their current performance and define what successful outcomes mean.</p>

<p>Involve your business owners, enterprise architecture, BSS/OSS, security, data governance, operations and procurement in the same assessment. This is not an IT decision. It's a business decision that IT must validate.</p>

<p>Then ask vendors to separate available today, configuration required, custom development required and on the roadmap for every claimed capability. Request evidence in an operator-controlled environment. Agree on acceptance criteria covering completion, exceptions, auditability, security, operating cost and time to change.</p>

<p>One more thing: clarify liability upfront. Ask your vendor directly: "If your AI makes a decision that causes a customer outage, who bears the cost and responsibility?" Their answer reveals how confident they are in their product. This is a negotiation—you may not get full indemnity—but clarity BEFORE you sign is critical.</p>

<p>This is where an independent, end-to-end assessment adds value. The commercial owner can test the promised outcome, architects can inspect the integration, operations teams can challenge failure handling and procurement can turn demonstrated capability into enforceable commitments.</p>

<h3>The Question Leaders Should Take Into the Next Vendor Meeting</h3>

<p>Do not ask only, "What can your AI agent do?"</p>

<p>Ask this instead:</p>

<p>"Show us what happens when our customer's order, charging and network records disagree. Show us what your product knows, what it is authorised to change, how it handles failure and how you prove the customer's service is restored."</p>

<p>The answer will reveal far more than a polished chatbot demonstration.</p>

<p>Operators have a genuine opportunity to use AI to improve service, speed and economics. To capture it, you must modernise the parts of BSS/OSS that prevent reliable action and buy products against evidence rather than labels. The operators who can do both will move beyond AI pilots toward outcomes customers can feel and leaders can measure.</p>

<p>That's where transformation happens. Not in the demos. In the difficult conversations about architecture, ownership and proof.</p>

<div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1);">
  <p style="font-size: 0.85rem; color: #8892b0;">
    © Northgate Consulting | All rights reserved
  </p>
</div>
    `,
  },

  // ─── BLOG 2 ────────────────────────────────────────────────────────────
  {
    id: 1,
    hookLarge: "NETWORK",
    hookSmall: "ISN'T JUST A PIPE",
    hookLargeGold: false,
    date: "Sep 2026",
    readMin: "7 min",
    title: "Turning Networks into Experience Platforms",
    tags: ["Strategy", "Telecom", "Network APIs", "AI"],
    imageSrc: "/images/network-experience-platform.png",
    content: `
<p>Telecom operators are under pressure to move beyond connectivity. The direction is familiar: become a TechCo, build platforms, create ecosystems, expose network capabilities and develop new revenue streams.</p>

<p>The ambition makes sense. But it also creates a contradiction.</p>

<p><strong>If operators follow the same platform playbook as cloud and software companies, what makes the telecom platform different?</strong></p>

<p>The answer may be closer to home than the industry sometimes assumes. Operators already own an asset that can become the foundation of a differentiated platform: the network itself.</p>

<h3>The Network Is More Than Infrastructure</h3>

<p>It operates in real time across millions of customers, devices and interactions. It has visibility into identity, location, connectivity, quality and network conditions. More importantly, operators can act on many of those capabilities directly.</p>

<p>Historically, most of this value has remained inside the network. Customers bought voice, data and connectivity. Applications simply used the network underneath.</p>

<p>That model is changing.</p>

<p>The opportunity now is to make selected network capabilities <strong>programmable, consumable and commercially accessible</strong> to enterprises, developers and partners.</p>

<p>This is where the network begins to move from infrastructure to an <strong>experience platform</strong>.</p>

<h3>From Selling Connectivity to Enabling Outcomes</h3>

<p>The value of an experience platform is not in exposing telecom complexity. It is in hiding it.</p>

<ul style="margin-left: 1.25rem; color: #8892b0;">
  <li>A bank does not need to understand mobile network architecture to use network intelligence for identity verification or fraud prevention.</li>
  <li>A gaming company does not need to understand 5G architecture to request improved network performance for a latency-sensitive session.</li>
  <li>An enterprise should not need to navigate multiple network systems to consume location, device or connectivity capabilities.</li>
</ul>

<p>The customer consumes an outcome. The operator manages the complexity behind it.</p>

<p><strong>That is a very different proposition from simply selling an API.</strong></p>

<!-- IMAGE_BREAK -->

<h3>Standardisation Creates Another Challenge</h3>

<p>Initiatives such as <strong>CAMARA</strong> and <strong>GSMA Open Gateway</strong> are helping create common ways for developers and enterprises to access network capabilities.</p>

<p>This is important for scale. Developers cannot build global services if every operator exposes the same capability differently.</p>

<p>But standardisation also creates another strategic question:</p>

<p><strong>If operators expose increasingly standardised network APIs, where will differentiation come from?</strong></p>

<p>Not from the API alone. Differentiation moves into what sits <strong>below and above the API</strong>:</p>

<ul style="margin-left: 1.25rem; color: #8892b0;">
  <li><strong>Below the API</strong> — the operator's ability to deliver the capability reliably: network quality, automation, orchestration, intelligence and real-time execution.</li>
  <li><strong>Above the API</strong> — the ability to turn that capability into something customers actually want: simple consumption, strong developer experience, relevant use cases, flexible commercial models and the right ecosystem partnerships.</li>
</ul>

<p>The API connects the two. <strong>The experience creates the value.</strong></p>

<h3>This Changes the Meaning of Telco-to-TechCo</h3>

<p>Becoming a TechCo should not mean leaving the network business behind. Nor should it mean turning every operator into a smaller version of a hyperscaler.</p>

<p>The stronger opportunity is to combine the operator's network advantage with the characteristics of successful technology platforms. That means:</p>

<ul style="margin-left: 1.25rem; color: #8892b0;">
  <li>Making network capabilities programmable</li>
  <li>Making services composable</li>
  <li>Making provisioning near real time</li>
  <li>Making it easier for developers and partners to build on the network</li>
  <li>Combining connectivity with cloud, edge, AI, security and industry solutions to create new propositions</li>
</ul>

<p>The result is not simply a better telecom network. <strong>It is a platform on which new experiences and business models can be built.</strong></p>

<h3>The Harder Transformation Starts Here</h3>

<p>Technology is only part of the challenge.</p>

<p>Operators also need to rethink product management, commercial models, partnerships, developer engagement and the way network capabilities are packaged. A technically perfect API that nobody can easily discover, consume or monetise creates little value.</p>

<p>That is why the next phase of Telco-to-TechCo transformation needs to move beyond the question: <strong>"How many network APIs can we expose?"</strong></p>

<p>The more important question is: <strong>"What experiences and businesses can others build because our network capabilities are available to them?"</strong></p>

<p>That distinction matters.</p>

<p>The operators that make this transition successfully will not move beyond connectivity by abandoning their network advantage. They will move beyond connectivity by <strong>turning that advantage into a platform others can build on.</strong></p>

<p><strong>That is when the network stops being just infrastructure and starts becoming an experience platform.</strong></p>

<div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1);">
  <p style="font-size: 0.85rem; color: #8892b0;">
    © Northgate Consulting | All rights reserved
  </p>
</div>
    `,
  },

  // ─── BLOG 1 ────────────────────────────────────────────────────────────
  {
    id: 2,
    hookLarge: "API-FIRST",
    hookSmall: "ARCHITECTURE-LAST",
    hookLargeGold: true,
    date: "Sep 2026",
    readMin: "6 min",
    title: "Why Operators Stall on NaaS Adoption—and How ODA Changes That",
    tags: ["NaaS", "ODA", "Network APIs"],
    imageSrc: "/images/naas-architecture.png",
    content: `
<p>Network-as-a-Service sounds straightforward: expose network capabilities through APIs and allow enterprises and developers to consume connectivity on demand.</p>

<p>Operators understand the opportunity. Yet many struggle to move beyond pilots and presentations.</p>

<p>The problem is not the NaaS vision. It is the architecture underneath it.</p>

<h3>The legacy architecture problem</h3>

<p>Most traditional BSS/OSS environments were built around tightly coupled platforms, proprietary integrations and long release cycles. They were designed to provision telecom services—not to expose network capabilities dynamically to an external ecosystem.</p>

<p>When operators try to build NaaS on top of this environment, they often add an API layer without changing the systems behind it. The front end may look modern, but every request still travels through complex workflows, duplicated data and vendor-specific interfaces.</p>

<p>The result is predictable:</p>

<ul style="margin-left: 1.25rem; color: #8892b0;">
  <li>Slow service launches</li>
  <li>Expensive integrations</li>
  <li>Limited automation</li>
  <li>Difficult partner onboarding</li>
  <li>Continued dependence on incumbent vendors</li>
</ul>

<p>This is why simply "adding APIs" does not create NaaS. If the underlying architecture remains rigid, the APIs only hide the complexity—they do not remove it.</p>

<h3>The business impact is bigger than IT</h3>

<p>NaaS depends on speed.</p>

<p>An operator should be able to expose a network capability, package it commercially, onboard partners and scale consumption without launching a major transformation project each time.</p>

<p>But when every new use case requires custom development across BSS, OSS and network domains, the economics quickly fall apart. Opportunities such as Quality on Demand, device location, number verification, SIM-swap detection and edge discovery may exist technically. The operator's architecture determines whether they can become repeatable, commercially viable services.</p>

<p>That is the real bottleneck.</p>

<!-- IMAGE_BREAK -->

<h3>ODA changes the foundation</h3>

<p>TM Forum's Open Digital Architecture provides a more practical foundation for NaaS by breaking the traditional stack into interoperable business and technology components. Instead of treating BSS/OSS as one large platform, operators can organize capabilities into modular components with clearly defined responsibilities and interfaces.</p>

<p>This creates four important shifts:</p>

<p><strong>1. Components can evolve independently</strong><br/>Catalog, order management, charging, assurance and partner management no longer need to move as one tightly coupled release. Operators can modernize priority areas progressively, without waiting for a complete replacement of the existing estate.</p>

<p><strong>2. Standard APIs reduce integration friction</strong><br/>TM Forum Open APIs provide consistent interfaces between business and operational components. This does not eliminate integration work, but it reduces the need to reinvent interfaces for every system, vendor and use case.</p>

<p><strong>3. Vendor independence becomes achievable</strong><br/>ODA does not automatically remove vendor lock-in. It creates the conditions to reduce it. When components follow standard interfaces and data contracts, operators gain more freedom to replace, upgrade or introduce capabilities without rebuilding the entire architecture.</p>

<p><strong>4. Automation becomes part of the design</strong><br/>NaaS requires more than API exposure. It needs automated fulfilment, policy control, charging, assurance, consent and lifecycle management behind those APIs. A componentized architecture makes these functions easier to coordinate and scale across multiple products and partners.</p>

<h3>Where CAMARA and GSMA Open Gateway fit</h3>

<p>ODA helps modernize the operator's internal business and operational architecture. CAMARA and GSMA Open Gateway help standardize how network capabilities are exposed externally.</p>

<p>CAMARA develops open, interoperable APIs for capabilities such as Number Verification, SIM Swap, Device Location and Quality on Demand. GSMA Open Gateway provides the industry framework for making these APIs consistently available across operator networks and markets.</p>

<p>Together, they address a major barrier to NaaS adoption: fragmentation.</p>

<p><strong>CAMARA and Open Gateway standardize the external doorway. ODA helps organize what sits behind it.</strong></p>

<h3>The action operators should take</h3>

<p>Operators should stop treating NaaS as a standalone API project. The starting point should be a focused architecture assessment:</p>

<ul style="margin-left: 1.25rem; color: #8892b0;">
  <li>Which network capabilities have real market demand?</li>
  <li>Which ODA components are needed to commercialize them?</li>
  <li>Where do legacy dependencies prevent automation?</li>
  <li>Which interfaces can move to TM Forum Open APIs?</li>
  <li>How will CAMARA APIs connect to fulfilment, charging, assurance and consent?</li>
  <li>Which components must remain strategic, and which should be replaceable?</li>
</ul>

<p>Then start with one commercially meaningful use case. Prove the complete journey—from API request to network execution, charging and assurance. Use that implementation to establish reusable architectural patterns for the next service.</p>

<h3>The takeaway</h3>

<p>Operators do not stall on NaaS because they lack network capabilities. They stall because legacy BSS/OSS environments make those capabilities difficult to expose, fulfil and monetize at ecosystem speed.</p>

<p>ODA provides the componentization and standard interfaces needed to modernize that foundation. CAMARA and GSMA Open Gateway provide a common way to expose network capabilities to developers and partners.</p>

<p>NaaS succeeds when these pieces work together—not as another layer added to the legacy stack, but as a deliberate change to how the operator is built.</p>

<div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1);">
  <p style="font-size: 0.85rem; color: #8892b0;">
    © Northgate Consulting | All rights reserved
  </p>
</div>
    `,
  },

  // ─── EXISTING BLOGS (Shifted IDs) ───────────────────────────────────
  {
    id: 3,
    hookLarge: "FAILING",
    hookSmall: "silently",
    hookLargeGold: false,
    date: "Apr 2026",
    readMin: "12 min",
    title: "Your BSS Transformation Will Fail Unless You Fix Your Business Journeys First",
    tags: ["Digital Transformation", "BSS", "Podcast"],
    audioSrc: "/founder/Portfolio/Podcast_Experience_1.mp3",
    content: `
<p>I've watched BSS transformation programs go sideways more times than I'd like to admit. And almost every time, the root cause is the same. The team picked the platform before they understood the business.</p>
<p>Not the business in some abstract strategy-deck sense. I mean the actual, step-by-step journeys that a customer, a retailer, or a call centre agent walks through every day. Prepaid activation. SIM swap. Plan transformation. Dunning. Number porting. The stuff that keeps a telecom service provider running.</p>
<p>When those journeys are not mapped, documented and agreed upon before transformation begins, you end up building a system that looks great in a demo and falls apart the moment real operations hit it.</p>
<h3>The pattern I keep seeing</h3>
<p>Here is how it usually goes. A telecom operator decides to replace their aging BSS. They run an RFP, evaluate three or four vendors, pick one based on feature checklists and pricing, and kick off the project. The implementation team starts configuring modules. Billing, CRM, product catalogue, OCS. Everyone is busy. Timelines are tight.</p>
<p>Six months in, someone from operations asks a simple question: "How does a customer who has been terminated get reactivated?" And nobody in the project room can answer it end to end. The CRM team knows their part. The billing and OCS team knows theirs. But the handoff between them, the notifications, the grace period logic, the outstanding balance check, the status update back to CRM? That lives in tribal knowledge. It was never written down. And the new system has no idea it exists.</p>
<p>This is where projects start bleeding time and money. Not because the technology is wrong, but because nobody forced the hard conversation about how the business actually works before they started configuring how it should work.</p>
<h3>Why technology selection is a terrible starting point</h3>
<p>Vendor demos are seductive. You see a clean UI, pre-built workflows, a catalogue that auto-provisions in seconds. It looks like the answer. But a demo environment has maybe five or six journeys configured, all running on clean data with no edge cases.</p>
<p>A real telecom service provider operates 25 to 35 distinct business journeys, sometimes more. Prepaid alone might have 15 to 20 if you count activations, top-ups, balance transfers, plan changes, SIM replacements, number porting, suspension, reactivation and the various flavours of barring and unbarring. Postpaid adds bill disputes, dunning sequences, credit limit adjustments and contract renewals.</p>
<p>When you select technology first, you are choosing an answer before you have finished writing the question. The inevitable result is that you discover gaps during UAT, which is the most expensive possible time to find them.</p>
<h3>What journey-first actually means in practice</h3>
<p>For every business journey your telecom service provider supports, you need four things documented before the transformation project starts configuring anything.</p>
<p>First, the end-to-end flow. Not just "customer activates SIM" but every system interaction, every API call, every status change, every notification. Who initiates it. What validates it. What happens when it fails.</p>
<p>Second, the business rules. What is the grace period after a payment fails? Can a barred customer still receive calls? Is a SIM swap allowed while a number port is in progress? These rules are almost never in a single document. Getting them out and onto paper is uncomfortable, slow work. It is also the most valuable thing you can do before spending a single pound on configuration.</p>
<p>Third, the exception paths. The happy path is easy. Every vendor can demo the happy path. What matters is what happens when the top-up gateway times out, or the MNP request gets rejected, or the eSIM profile download fails mid-provisioning. These exception scenarios cause the majority of post-go-live support tickets.</p>
<p>Fourth, testable acceptance criteria. Every journey needs clear, scenario-based test cases: positive ones that prove the journey works and negative ones that prove it fails gracefully.</p>
<h3>The uncomfortable truth</h3>
<p>Journey mapping is slow. It requires pulling busy people into workshops. It surfaces disagreements about how things should work. It forces decisions that teams have been deferring for years. But every BSS transformation I have seen succeed had this work done upfront. And every one that spiralled had skipped it.</p>
<p>The technology matters. But technology is the second decision, not the first. The first decision is whether you are willing to do the unglamorous, detail-heavy work of understanding your own business well enough to explain it to a new system.</p>`,
  },
  {
    id: 4,
    hookLarge: "HIDDEN",
    hookSmall: "revenue",
    hookLargeGold: true,
    date: "Apr 2026",
    readMin: "9 min",
    title: "Campaign Management Is the Most Undervalued Module in Your BSS Stack",
    tags: ["BSS", "Campaign Management", "Podcast"],
    audioSrc: "/founder/Portfolio/Podcast_Experience_2.mp3",
    content: `
<p>I have sat through a lot of BSS vendor demos. Billing gets a full session. OCS gets another — real-time charging, policy control, spending limits. The product catalogue team brings slides. Campaign Management usually gets twenty minutes at the end, when everyone is tired.</p>
<p>I want to talk about why that matters.</p>
<p>This module sits at the intersection of every commercially important thing your BSS does — pricing, customer lifecycle, retention, offer eligibility, revenue recovery. Most operators treat it like a tool for sending promotional SMS. It is not. Configured properly, it is how you keep customers from leaving, how you recover subscribers who have stopped recharging, how you move prepaid customers into higher-value segments.</p>
<h3>What operators think it does</h3>
<p>The standard assumption is that Campaign Management handles batch messaging. You upload a list, attach a message, schedule a send. Marketing uses it. The BSS team ignores it.</p>
<p>That assumption leaves most of the module's value sitting idle.</p>
<p>A proper implementation runs lifecycle-triggered campaigns in real time. Not weekly batch jobs. Not manual lists. Event-driven logic that monitors subscriber behaviour and responds: a prepaid customer whose balance drops below a threshold gets a targeted top-up offer within seconds. A postpaid customer who has been on the same plan for three years gets an upgrade path before a competitor does. A subscriber who has not recharged in 12 days gets a winback sequence calibrated to their history, not a generic promotional SMS.</p>
<p>This requires real-time integration between Campaign Management, the OCS and rating engine, the product catalogue and CRM. In most implementations I have reviewed, those connections exist in theory and are half-built in practice.</p>
<h3>The journey problem no one talks about</h3>
<p>Campaign logic cannot be configured in isolation. It depends on decisions that were supposed to be made earlier in the transformation — and usually were not.</p>
<p>Think about what a winback campaign actually requires. You need to know what triggers "at risk" status for a subscriber. Is it zero recharge in 10 days? 15? Does it vary by segment? You need to know what offer is eligible at that moment, which means product catalogue eligibility rules have to exist before campaign logic can reference them.</p>
<p>None of that is a Campaign Management question on its own. It is a business journey. And if you have not mapped that journey across every system and every status transition, you cannot configure the campaign correctly.</p>
<h3>Who actually owns this thing</h3>
<p>That ownership gap is its own problem. Campaign Management does not have a natural home in most operator org structures. Marketing wants to use it but does not understand the BSS dependencies underneath. The BSS team built it but considers it a marketing responsibility. Product owns some of the offer logic but is not in the room where campaigns are configured.</p>
<p>The result is a module everyone touches partially and nobody understands fully. Campaigns get created in silos. Eligibility rules get manually overridden because someone does not trust the system logic. Reporting is inconsistent because three teams measure campaign success differently and none of them talk to each other.</p>
<h3>A practical test</h3>
<p>Pick one campaign running in production right now — a winback sequence, a retention offer, a recharge promotion. Then trace it properly: what triggers it, what eligibility check runs before the message sends, how the offer is sourced, what happens when a customer responds, how the outcome gets recorded and who reviews that data.</p>
<p>If you can answer that end to end with confidence, your Campaign Management setup is in reasonable shape. If the answer involves "I think marketing manages that" or "we use a segment file that comes weekly," you are leaving revenue on the table and you probably do not know the number.</p>`,
  },
  {
    id: 5,
    hookLarge: "DATA",
    hookSmall: "first.",
    hookLargeGold: false,
    date: "Apr 2026",
    readMin: "8 min",
    title: "Telecom Operators Do Not Have an AI Problem. They Have a Data Problem.",
    tags: ["AI", "Data", "Telecom", "Podcast"],
    audioSrc: "/founder/Portfolio/Podcast_Experience_3.mp3",
    content: `
<p>Every telecom conference I have attended in the past two years has had the same energy. AI is going to predict churn. AI is going to optimise network slicing. AI is going to personalise offers in real time. AI is going to automate the contact centre.</p>
<p>Fine. But I have a question that tends to kill the mood: where is the data coming from?</p>
<p>In most telecom operators I have worked with, the answer is uncomfortable. Customer data sits in CRM. Usage data sits in the OCS. Billing records live in a separate system. Product definitions exist in the catalogue but do not always match what is actually provisioned. And the CDRs that feed mediation do not reconcile cleanly with what billing says the customer consumed.</p>
<p>You cannot build intelligence on top of that.</p>
<h3>The five-system problem</h3>
<p>I call it the five-system problem because that is roughly how many places a typical telecom operator stores information about a single customer. CRM has the profile and contact history. The OCS has the real-time balance, active offers and usage counters. Billing has the invoice records, payment history and dunning status. The product catalogue has what the customer should be subscribed to. And the provisioning layer has what is actually active on the network.</p>
<p>In theory, these systems sync. In practice, they drift. A customer changes their plan through the self-care portal and the catalogue updates, but the provisioning layer takes 48 hours to catch up. A payment comes in but the OCS does not clear the bar status because the integration between billing and charging has a known lag.</p>
<p>These are not hypothetical edge cases. They are Tuesday. And AI cannot learn to live with it. A churn prediction model trained on CRM data that does not reflect actual usage patterns will predict the wrong customers.</p>
<h3>Why this is a BSS problem, not an IT problem</h3>
<p>It is tempting to frame data quality as an IT issue. Get the DBAs involved. Run some ETL jobs. Build a data lake. But in telecom, the data mess is a BSS architecture problem. It is structural.</p>
<p>When BSS platforms were built 10 or 15 years ago, they were designed for a specific set of workflows: activate a SIM, rate a call, generate a bill, handle a complaint. Each module optimised for its own job. They were never designed to share a single, coherent view of the customer, because nobody needed them to. AI does not have a customer service agent's patience. It needs one truth, not five versions of it.</p>
<h3>What to fix before you fund an AI initiative</h3>
<p>If I were advising a telecom operator's CTO on AI readiness, I would not start with model selection or vendor evaluation. I would start with four questions.</p>
<p>Can you produce a single, accurate subscriber record that every system agrees on? If CRM, OCS, billing and provisioning show different statuses, products or balances for the same customer, that is your first problem.</p>
<p>Are your event pipelines real-time and reliable? Check your CDR flow, your notification triggers, your usage event streaming. If there are gaps, lags or dropped events, no real-time AI use case will work.</p>
<p>Is your product catalogue the source of truth, or just one of several opinions? If what is in the catalogue does not match what is provisioned, what is billed and what the customer sees in self-care, you have a catalogue integrity problem.</p>
<p>Do you have a data governance owner, or just data? Someone needs to own the definition of "active subscriber," "churn event," "revenue per user." If those definitions vary by department, your AI will inherit the confusion.</p>
<h3>The uncomfortable sequencing question</h3>
<p>The board wants AI. The CEO read a report. The vendor is showing demos with impressive dashboards. And the person who has to stand up and say "our data is not ready" looks like they are blocking progress. But it is true more often than it is not.</p>
<p>The operators who get AI right will not be the ones who adopted it first. They will be the ones who fixed their data first. That is less exciting than a demo. But it is what actually works.</p>`,
  },
];

// ─── Podcast player ────────────────────────────────────────────────────────────

function PodcastPlayer({ src }: { src?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  if (!src) return null;

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play(); setPlaying(true); }
  };

  return (
    <div className="flex items-center gap-3 my-6 px-4 py-3 rounded-xl"
      style={{ background: "rgba(5,175,242,0.07)", border: "1px solid rgba(5,175,242,0.2)" }}>
      <audio ref={audioRef} src={src} onEnded={() => setPlaying(false)} />
      <button onClick={toggle}
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-105"
        style={{ background: "#05aff2" }}>
        {playing
          ? <Pause size={13} className="text-black" />
          : <Play size={13} className="text-black ml-0.5" />}
      </button>
      <div>
        <p className="font-heading font-semibold text-white text-xs">Listen as a Podcast</p>
        <p className="text-xs mt-0.5" style={{ color: "#8892b0" }}>
          {playing ? "Playing…" : "Press play to listen"}
        </p>
      </div>
      <Headphones size={15} className="ml-auto shrink-0" style={{ color: "rgba(5,175,242,0.4)" }} />
    </div>
  );
}

// ─── Modal ─────────────────────────────────────────────────────────────────────

function ArticleModal({ article, onClose }: { article: ArticleType; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(3,6,17,0.88)", backdropFilter: "blur(10px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className="relative w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col"
        style={{ background: "#0D1525", border: "1px solid rgba(5,175,242,0.2)", boxShadow: "0 32px 80px rgba(0,0,0,0.85), 0 0 36px rgba(5,175,242,0.1)" }}
        initial={{ y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="px-7 pt-7 pb-5 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              {article.tags.map((t) => (
                <span key={t}
                  className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md tracking-widest uppercase"
                  style={{ color: "#05aff2", background: "rgba(5,175,242,0.08)", border: "1px solid rgba(5,175,242,0.2)" }}>
                  {t}
                </span>
              ))}
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "#8892b0" }}>
              <X size={15} />
            </button>
          </div>
          <h2 className="font-heading font-bold text-white leading-tight"
            style={{ fontSize: "clamp(1.05rem, 2vw, 1.35rem)", letterSpacing: "-0.016em" }}>
            {article.title}
          </h2>
          <p className="text-xs mt-2 flex items-center gap-1" style={{ color: "#4A5568" }}>
            <Calendar size={10} /> {article.date}
            <span className="mx-1">·</span>
            <Clock size={10} /> {article.readMin}
          </p>
        </div>
        <div className="overflow-y-auto flex-1 px-7 pb-8">
          <PodcastPlayer src={article.audioSrc} />
          <div className="article-modal-body" dangerouslySetInnerHTML={{ __html: article.content.split('<!-- IMAGE_BREAK -->')[0] }} />
          {article.imageSrc && (
            <img
              src={article.imageSrc}
              alt={article.title}
              className="w-full rounded-lg my-8"
              style={{ objectFit: "contain", maxWidth: "100%", height: "auto" }}
            />
          )}
          <div className="article-modal-body" dangerouslySetInnerHTML={{ __html: article.content.split('<!-- IMAGE_BREAK -->')[1] || '' }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────────

function ArticleCard({ article, onClick }: { article: ArticleType; onClick: () => void }) {
  return (
    <motion.div
      className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{ background: "#000", border: "1px solid rgba(5,175,242,0.15)", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
      whileHover={{
        y: -8,
        borderColor: "rgba(5,175,242,0.55)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(5,175,242,0.12)",
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
    >
      {/* Hook area */}
      <div className="relative h-[200px] flex items-end px-7 pb-6 overflow-hidden" style={{ background: "#000" }}>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            background: article.hookLargeGold
              ? "radial-gradient(ellipse at 20% 80%, rgba(5,175,242,0.12) 0%, transparent 65%)"
              : "radial-gradient(ellipse at 20% 80%, rgba(5,175,242,0.12) 0%, transparent 65%)",
          }}
        />
        <motion.div
          className="absolute top-0 left-7"
          style={{ height: "2px", background: "linear-gradient(90deg, #05aff2, #4dd9ff)", boxShadow: "0 0 8px rgba(5,175,242,0.5)" }}
          initial={{ width: "40px" }}
          whileHover={{ width: "calc(100% - 28px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
        />
        <div className="flex flex-col gap-1 relative z-10 w-full">
          <span className="block font-black leading-tight select-none whitespace-normal"
            style={{
              fontSize: "clamp(38px, 5.5vw, 60px)",
              letterSpacing: "-2px",
              lineHeight: 0.95,
              wordBreak: "break-word",
              overflowWrap: "break-word",
              textAlign: "left",
              color: article.hookLargeGold ? "#05aff2" : "#F0F4FF",
            }}>
            {article.hookLarge}
          </span>
          <span className="block font-light uppercase select-none"
            style={{
              fontSize: "32px",
              letterSpacing: "5px",
              marginLeft: "4px",
              color: article.hookLargeGold ? "#F0F4FF" : "#05aff2",
            }}>
            {article.hookSmall}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-7 pt-5 pb-6">
        <div className="flex items-center gap-2 text-xs mb-3" style={{ color: "#4A5568" }}>
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readMin}</span>
        </div>
        <h3 className="font-heading font-bold text-white leading-snug mb-3 flex-1 group-hover:text-[#05aff2] transition-colors duration-200"
          style={{ fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
          {article.title}
        </h3>
        <p className="text-xs mb-5" style={{ color: "#8892b0" }}>
          {article.tags.join(" · ")}
        </p>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 text-[11px] font-semibold px-4 py-2 rounded-full transition-all hover:brightness-110"
            style={{ background: "#05aff2", color: "#000" }}
            onClick={(e) => { e.stopPropagation(); onClick(); }}>
            <BookOpen size={11} /> Read
          </button>
          {article.audioSrc && (
            <button
              className="flex items-center gap-1.5 text-[11px] font-medium px-4 py-2 rounded-full transition-all hover:border-[#00F5FF] hover:text-[#00F5FF]"
              style={{ background: "transparent", color: "#8892b0", border: "1px solid rgba(255,255,255,0.12)" }}
              onClick={(e) => { e.stopPropagation(); onClick(); }}>
              <Headphones size={11} /> Listen
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────

export default function ArticlesSection() {
  const [open, setOpen] = useState<ArticleType | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const articleId = searchParams.get("article");
    if (articleId !== null) {
      const article = ARTICLES.find(a => a.id === parseInt(articleId));
      if (article) {
        setOpen(article);
      }
    }
  }, [searchParams]);

  return (
    <>
      <section className="py-20" style={{ background: "#050A18" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase mb-4"
              style={{ color: "#D4AF37" }}>
              Latest Articles
            </span>
            <h2 className="font-heading font-bold text-white leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.022em" }}>
              Thinking from the front line.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES.map((a) => (
              <ArticleCard key={a.id} article={a} onClick={() => setOpen(a)} />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && <ArticleModal article={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>

      <style>{`
        .article-modal-body {
          font-family: 'Source Sans 3', sans-serif;
        }
        .article-modal-body h3 {
          font-family: 'Lexend', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #F0F4FF;
          margin: 1.75rem 0 0.75rem;
          letter-spacing: -0.012em;
        }
        .article-modal-body p {
          font-size: 0.93rem;
          color: #8892b0;
          line-height: 1.85;
          margin-bottom: 1rem;
          font-family: 'Source Sans 3', sans-serif;
        }
        .article-modal-body ul {
          font-size: 0.93rem;
          line-height: 1.85;
          margin-bottom: 1rem;
          list-style-type: disc;
          list-style-position: inside;
        }
        .article-modal-body ul li {
          margin-bottom: 0.5rem;
          color: #8892b0;
        }
        .article-modal-body strong {
          color: #F0F4FF;
          font-family: 'Lexend', sans-serif;
        }
      `}</style>
    </>
  );
}
