export type Signal = {
  num: string;
  short: string;
  title: string;
  horizon: string;
  c: number;
  x: number;
  y: number;
  noise: string;
  truth: string;
  responses: string[];
};

export type SectorKey = "telecom" | "healthcare" | "fintech";

export type SectorMeta = {
  name: string;
  code: string;
  color: string;
  rgb: string;
  tint: string;
  border: string;
};

export const SECTOR_META: Record<SectorKey, SectorMeta> = {
  telecom:    { name: "Telecom",    code: "TEL", color: "#6f8bff", rgb: "111,139,255", tint: "#EDF0FE", border: "#DCE3FA" },
  healthcare: { name: "Healthcare", code: "HLT", color: "#34d8a6", rgb: "52,216,166",  tint: "#E3F7F0", border: "#C4ECDF" },
  fintech:    { name: "Fintech",    code: "FIN", color: "#a78bfa", rgb: "167,139,250", tint: "#F0EBFE", border: "#E0D6FB" },
};

export const DATA: Record<SectorKey, Signal[]> = {
  telecom: [
    {
      num: "01", short: "Telco-as-a-Platform",
      title: "Telco-as-a-platform is a mirage without modern software",
      horizon: "12–18MO", c: 4, x: 68, y: 20,
      noise: "Expose your network APIs and you become a digital platform giant overnight — standardised interfaces guarantee instant monetisation from enterprise developers.",
      truth: "Enterprise developers reject legacy pipelines dressed as modern APIs. Real platforms need sub-millisecond, self-service provisioning your billing and OSS cannot deliver — so monetisation stays negligible.",
      responses: [
        "Treat API strategy as a radical restructuring of internal IT, not a sales campaign.",
        "Build hyper-local, developer-friendly abstractions that solve concrete local problems — not generic global standards.",
      ],
    },
    {
      num: "02", short: "African Mobile Money",
      title: "FinTech success in Africa cannot simply be copied elsewhere",
      horizon: "NOW", c: 5, x: 40, y: 54,
      noise: "Mobile wallets are an infallible growth engine for every emerging-market operator — just replicate East African mobile money to offset falling voice revenue.",
      truth: "That success came from a banking vacuum and rare regulatory leniency. In markets with real banking penetration an operator wallet is an expensive, redundant commodity bought with brutal acquisition costs.",
      responses: [
        "Pivot from consumer wallets to embedded B2B micro-finance and merchant trade credit.",
        "Target unbanked niches inside your enterprise ecosystem, not retail banks head-on.",
      ],
    },
    {
      num: "03", short: "Streaming Aggregation",
      title: "Aggregating streaming services is a margin-sucking race to the bottom",
      horizon: "NOW", c: 4, x: 18, y: 62,
      noise: "Become the ultimate entertainment hub by bundling every streaming app — aggregation boosts stickiness and protects premium post-paid ARPU.",
      truth: "Bundling is a high-churn vanity game where global media giants take the value. You carry billing, support and bad debt for single-digit revenue share — and customers leave the moment a rival trims the connectivity price.",
      responses: [
        "Drop broad bundles; focus on localised, exclusive lifestyle micro-services or gaming infrastructure.",
        "Negotiate for deep data-sharing agreements, not crumbs of revenue share.",
      ],
    },
    {
      num: "04", short: "Enterprise AI / Data",
      title: "Enterprise AI opportunity lies in data curation, not large models",
      horizon: "12MO", c: 5, x: 60, y: 16,
      noise: "You must build or host your own massive language models to stay relevant — every quarterly report demands an aggressive corporate AI statement.",
      truth: "Operators have no edge in building foundation models. The goldmine is your messy, underused repository of behaviour, location and transaction data — enterprises want clean, compliant pipelines, not another operator-branded AI tool.",
      responses: [
        "Monetise your position as a trusted sovereign data curator via privacy-preserving exchanges.",
        "Leave compute and model-building to the giants; charge a premium for the fuel that feeds them.",
      ],
    },
    {
      num: "05", short: "Hyper-Personalisation",
      title: "Hyper-personalised CX tools usually destroy operational efficiency",
      horizon: "NOW–6MO", c: 3, x: 24, y: 40,
      noise: "Real-time, hyper-personalised context engines will magically double digital cross-sell — every customer expects a tailored journey at every touchpoint.",
      truth: "Chasing absolute personalisation creates an unmanageable tangle of conflicting rules and latency, bombarding users with irrelevant offers and driving up contact-centre volume. Customers do not want a conversation — they want an app that just works.",
      responses: [
        "Strip out complex predictive marketing engines; reinvest in radical journey simplification.",
        "Make your top five transactions bulletproof, instant and self-contained within three clicks.",
      ],
    },
    {
      num: "06", short: "Sovereign Cloud",
      title: "Sovereign cloud is an identity play, not a technology business",
      horizon: "12–18MO", c: 4, x: 82, y: 30,
      noise: "Sovereign cloud is the next multi-billion-dollar gold rush — invest heavily in proprietary local infrastructure to fend off the global players.",
      truth: "Sovereign cloud is a regulatory and political chess game, not a technology race. Enterprises buy it purely to satisfy data-residency law. Competing on feature sets against hyperscalers is a guaranteed way to burn capital.",
      responses: [
        "Position strictly as the local trust and compliance layer wrapping global hyperscaler tech.",
        "Monetise government relationships and clearances; let the giants fund continuous innovation.",
      ],
    },
    {
      num: "07", short: "IoT Connectivity",
      title: "Traditional IoT connectivity scaling is financial suicide",
      horizon: "6–12MO", c: 4, x: 50, y: 34,
      noise: "Chase the billions of connected devices — massive machine-to-machine market share secures the future of your enterprise business.",
      truth: "Cheap sensors yield pennies of ARPU while loading signalling strain and support cost onto core systems. Without owning the data orchestration or analytics layers, basic IoT scaling is a loss-making vanity metric.",
      responses: [
        "Refuse to bid on connectivity-only IoT tenders.",
        "Sell end-to-end operational outcomes — hardware, data insight and security in one high-margin fee.",
      ],
    },
    {
      num: "08", short: "Enterprise Marketplaces",
      title: "Enterprise marketplaces are ghost towns without sales transformation",
      horizon: "NOW", c: 3, x: 30, y: 70,
      noise: "Build a digital corporate marketplace and effortlessly upsell SaaS to SMEs — an automated, friction-free stream of high-margin recurring revenue.",
      truth: "Most operator marketplaces are abandoned storefronts with zero organic traffic. SMEs do not log into a telecom portal to find accounting software, and your sales teams are paid to chase connectivity, not cross-sell.",
      responses: [
        "Overhaul sales compensation to reward SaaS adoption alongside data lines.",
        "Wire the marketplace into core business onboarding so software setup happens automatically.",
      ],
    },
    {
      num: "09", short: "MVNO Sub-Brands",
      title: "MVNO brands are strategic hedging assets, not standalone cash cows",
      horizon: "NOW–6MO", c: 4, x: 14, y: 78,
      noise: "Niche digital sub-brands and MVNOs are agile vehicles to capture trendy youth segments and drive profitable new retail growth.",
      truth: "With fully loaded overheads, most sub-brands run on razor-thin or negative margins. Their real function is defensive — cannibalising your own low-value base before a rival does. Treat them as profit centres and you trigger internal price wars.",
      responses: [
        "Run sub-brands as lean retention and capacity-offload utilities.",
        "Keep them on public cloud with zero dedicated retail presence.",
      ],
    },
    {
      num: "10", short: "Super-Apps",
      title: "Super-apps are a corporate vanity project for most operators",
      horizon: "18MO+", c: 5, x: 76, y: 50,
      noise: "Build an all-encompassing lifestyle super-app — chat, retail, utility bills — to escape commoditisation and dominate consumer screen time.",
      truth: "Consumers reject clunky telecom apps masquerading as social networks. Building and constantly updating a super-app burns immense capital for terrible daily-active numbers — you lack the agile product culture to beat dedicated consumer-internet apps.",
      responses: [
        "Abandon the from-scratch lifestyle ecosystem.",
        "Optimise your core app for friction-free identity validation and one-click checkout inside popular third-party apps.",
      ],
    },
  ],
  healthcare: [
    {
      num: "01", short: "AI & Workforce",
      title: "AI will not solve your clinical workforce shortages",
      horizon: "NOW", c: 5, x: 30, y: 22,
      noise: "Generative tools and automated diagnostics will instantly ease clinician burnout by absorbing admin work — expanding workforce capacity with no extra headcount.",
      truth: "Unvalidated algorithms add governance burden: senior clinicians spend more time auditing machine output than treating patients. Fragmented legacy data and reluctance to shift clinical liability to software block real automation.",
      responses: [
        "Deploy automation only to back-office scheduling and billing, where liability is low and ROI is immediate.",
        "Stop treating tech as a substitute for clinical staff — fix the broken workflow designs instead.",
      ],
    },
    {
      num: "02", short: "Patient Apps",
      title: "Patient apps are alienating consumers, not driving engagement",
      horizon: "NOW", c: 4, x: 18, y: 46,
      noise: "Bespoke hospital apps empower patients to manage their own care and are the definitive gateway to consumer loyalty.",
      truth: "Patients have digital fatigue and resist a separate app per provider. Poorly integrated portals offer little beyond static document viewing, and clinical data fails to sync across services.",
      responses: [
        "Abandon proprietary apps; integrate patient communication into existing everyday channels.",
        "Deliver value through frictionless services — automated SMS booking links and unified web portals.",
      ],
    },
    {
      num: "03", short: "Interoperability",
      title: "Interoperability is a commercial stand-off, not a technical puzzle",
      horizon: "6–12MO", c: 5, x: 48, y: 18,
      noise: "Adopt modern data standards and hospitals, clinics and pharmacies connect seamlessly — open APIs automatically democratise health data.",
      truth: "Incumbent vendors deliberately wall off data extraction to protect market share. Connectivity is blocked by conflicting commercial incentives and fear of losing patients — not by any technical limit.",
      responses: [
        "Enforce strict data-ownership clauses in procurement, with penalties for vendors that charge for data access.",
        "Authorities must move past technical guidelines and actively penalise intentional data hoarding.",
      ],
    },
    {
      num: "04", short: "Remote Monitoring",
      title: "Remote monitoring creates data deluges without saving beds",
      horizon: "NOW–6MO", c: 4, x: 36, y: 40,
      noise: "Virtual wards and wearables move chronic-disease management home, dramatically cutting emergency admissions and overheads.",
      truth: "Unrefined biometric streams overwhelm clinical command centres with false alarms and drive defensive testing. Without dedicated response teams, patients default back to the emergency department.",
      responses: [
        "Restrict remote monitoring to tightly defined high-risk cohorts with clear intervention pathways.",
        "Staff virtual wards with dedicated autonomous clinical teams — not as an extra task for ward staff.",
      ],
    },
    {
      num: "05", short: "Value-Based Care",
      title: "Value-based care is suffocating under administrative compliance",
      horizon: "12MO", c: 4, x: 60, y: 30,
      noise: "Shifting from fee-for-service to outcomes-based reimbursement organically lowers cost and improves health — the ultimate alignment of money and care.",
      truth: "The cost of tracking, validating and disputing complex quality metrics often consumes the theoretical savings. Providers and insurers deadlock over data accuracy instead of delivering care.",
      responses: [
        "Simplify reimbursement to a few undeniable, easily measured outcomes — not hundreds of micro-metrics.",
        "Build shared insurer-provider data infrastructure to automate reporting and kill manual audit cost.",
      ],
    },
    {
      num: "06", short: "Cyber Resilience",
      title: "Cyber security is an operational vulnerability, not an IT problem",
      horizon: "NOW", c: 5, x: 22, y: 64,
      noise: "Sophisticated firewalls and encryption fully shield health networks — breaches are strictly IT-infrastructure failures.",
      truth: "Hospitals are prime targets because time-pressured staff routinely bypass controls to expedite care. One compromised password can cripple a whole group when internal systems lack isolation.",
      responses: [
        "Design security around clinical reality — make authentication fast and seamless, not obstructive.",
        "Shift from absolute prevention to resilience: isolate infected areas and keep operating safely during an outage.",
      ],
    },
    {
      num: "07", short: "National EMR",
      title: "Centralised national records often paralyse local delivery",
      horizon: "12–18MO", c: 4, x: 78, y: 26,
      noise: "A single monolithic national electronic record is the gold standard — a frictionless ecosystem for clinicians and researchers alike.",
      truth: "Massive multi-year rollouts force diverse specialties into rigid standardised workflows that slow consultations, and routinely ship outdated software late.",
      responses: [
        "Adopt a modular architecture: specialised systems connected by a robust national integration layer.",
        "Prioritise data liquidity and common standards over forcing every setting onto an identical UI.",
      ],
    },
    {
      num: "08", short: "Digital Prevention",
      title: "Preventive digital medicine fails to cut short-term acute demand",
      horizon: "18MO+", c: 3, x: 84, y: 58,
      noise: "Digital wellness and early screening dramatically curve demand on acute hospitals and pay for themselves within the first budget cycles.",
      truth: "Early screening surfaces a flood of minor, asymptomatic conditions that still need evaluation, driving up appointments. Prevention's payoff takes decades — no relief to annual budgets.",
      responses: [
        "Fund digital prevention from ring-fenced public-health budgets, not operational hospital funds.",
        "Judge it on long-term demographic health trends, not short-term emergency-admission cuts.",
      ],
    },
    {
      num: "09", short: "The Hospital Asset",
      title: "The physical hospital remains the anchor of healthcare strategy",
      horizon: "12–18MO", c: 5, x: 70, y: 50,
      noise: "Physical hospitals will soon be obsolete as care goes fully virtual and local — asset-light models will dominate future delivery.",
      truth: "Ageing populations and multi-morbidity keep demand rising for intensive care, complex surgery and specialised diagnostics that cannot be decentralised. Virtual models fail the moment patients need hands-on intervention.",
      responses: [
        "Repurpose hospitals into high-acuity hubs for complex intervention, trauma and intensive care.",
        "Use digital services to move stable patients out of high-cost beds as fast as possible.",
      ],
    },
    {
      num: "10", short: "Big Tech Partners",
      title: "Large tech vendors lack the clinical empathy for transformation",
      horizon: "6–12MO", c: 4, x: 52, y: 70,
      noise: "Partnering with global tech giants brings world-class innovation and rapid transformation — a shortcut to modernising health systems.",
      truth: "Big tech forces generic consumer software models into complex regulated clinical settings, underestimating clinical-safety workflows — resulting in expensive, abandoned custom builds.",
      responses: [
        "Retain control of your architecture; treat large tech firms as utility infrastructure providers.",
        "Build transformation around clinical co-design, with frontline staff driving all workflow engineering.",
      ],
    },
  ],
  fintech: [
    {
      num: "01", short: "Embedded Finance",
      title: "Embedded finance is a distribution channel, not a business model",
      horizon: "NOW", c: 5, x: 26, y: 24,
      noise: "Non-financial brands will effortlessly grab huge share by embedding lending and payments into everyday platforms — cutting traditional banks out entirely.",
      truth: "Most non-financial firms lack the risk appetite, balance sheet and compliance to manage real credit defaults. The liability and regulatory reporting still sit with licensed banks — tech firms are just front-end agents.",
      responses: [
        "Treat embedded finance as an efficient customer-acquisition channel, not a standalone tech business.",
        "Build robust, high-availability APIs that let your licensed balance sheet safely back third-party platforms.",
      ],
    },
    {
      num: "02", short: "Telco Convergence",
      title: "Telecom operators are data goldmines but balance-sheet laggards",
      horizon: "6–12MO", c: 4, x: 44, y: 20,
      noise: "Mobile operators will displace banks across emerging markets by leveraging their massive subscriber bases — owning the primary screen guarantees dominance.",
      truth: "Operators excel at high-volume, low-margin connectivity but struggle with the risk management of profitable lending, and rarely want to lock up capital to meet banking capital-adequacy rules.",
      responses: [
        "Stop building standalone bank infrastructure inside a telecom operating model.",
        "Form equity or JV alliances: the operator is the data-rich origination engine, the bank keeps risk and regulatory ownership.",
      ],
    },
    {
      num: "03", short: "CBDCs",
      title: "CBDCs are about sovereignty, not consumer payments",
      horizon: "12–18MO", c: 4, x: 80, y: 34,
      noise: "Sovereign digital currencies will revolutionise retail and displace mobile money with frictionless peer-to-peer payments — the ultimate financial-inclusion tool.",
      truth: "Consumers already have fast, trusted wallets and instant bank transfers. Central banks are really building these to bypass Western settlement networks and enforce monetary sovereignty.",
      responses: [
        "Stop building retail CBDC use-cases nobody is asking for.",
        "Pivot to wholesale cross-border clearing, corporate treasury and automated trade settlement.",
      ],
    },
    {
      num: "04", short: "Open Banking",
      title: "Open banking has failed to commoditise consumer deposits",
      horizon: "NOW", c: 4, x: 20, y: 52,
      noise: "Mandated data sharing sparks mass account switching to niche fintech apps — legacy banks lose deposits unless they match fintech UIs.",
      truth: "Consumer inertia is strong, with deep trust in established institutions in volatile times. Fintechs get used for budgeting and quick transfers, but salaries and core wealth stay anchored in tier-one banks.",
      responses: [
        "Shift from defending attrition to using open-banking data to enrich internal credit scoring.",
        "Partner with aggregators to ingest third-party data and cross-sell wealth and lending to your captive base.",
      ],
    },
    {
      num: "05", short: "Agent Networks",
      title: "Mobile money agent networks are an expensive legacy liability",
      horizon: "NOW–6MO", c: 4, x: 34, y: 64,
      noise: "Expanding physical merchant and agent networks is the key to winning emerging markets — value scales with cash-in/cash-out footprint.",
      truth: "Managing physical liquidity and agent commissions eats up to half of wallet transaction revenue. As smartphones and instant-transfer rails mature, profit belongs to those who eliminate cash handling.",
      responses: [
        "Aggressively shift from physical cash-in networks to digital-only, merchant-driven ecosystems.",
        "Keep money digital with zero-fee P2P, and monetise via value-added merchant software.",
      ],
    },
    {
      num: "06", short: "Super-Apps",
      title: "Super-apps are fracturing under consumer fatigue",
      horizon: "NOW", c: 5, x: 16, y: 38,
      noise: "Consumers want one massive app for everything — food, rides, insurance, wealth — and mastering data aggregation means owning the home screen.",
      truth: "Bloated multi-feature apps are confusing and slow on mid-range phones. Consumers are unbundling, preferring dedicated, hyper-efficient apps for distinct tasks.",
      responses: [
        "Do not burn capital on a catch-all super-app for your market.",
        "Build modular micro-services that sit inside other ecosystems, staying relevant without owning the whole app.",
      ],
    },
    {
      num: "07", short: "Core Banking",
      title: "Core banking migration is a trap; middleware is the cure",
      horizon: "12MO", c: 5, x: 62, y: 28,
      noise: "Institutions must rip out and replace decades-old core systems — cloud-native core replacement is the only path to true agility.",
      truth: "Monolithic core replacements take years, blow budgets and add catastrophic operational risk. Winners wrap an agile middleware layer around stable engines for identical speed at a fraction of the cost.",
      responses: [
        "Halt risky total-system overhauls that threaten daily operations.",
        "Invest in decoupled micro-services and integration layers that isolate the stable core from fast-changing interfaces.",
      ],
    },
    {
      num: "08", short: "Alt-Data Scoring",
      title: "Alternative data scoring is useless without behavioural context",
      horizon: "6–12MO", c: 4, x: 52, y: 48,
      noise: "Telecom airtime and device history instantly create a foolproof credit score for the unbanked — no traditional bureau needed.",
      truth: "Raw telco metadata is noisy and fails to predict repayment in macro shocks. Without real-time transactional data, alternative scoring just drives high micro-loan default rates.",
      responses: [
        "Stop underwriting on passive mobile-network data alone.",
        "Combine telecom utility data with active merchant-side cash-flow monitoring for a dynamic credit engine.",
      ],
    },
    {
      num: "09", short: "Instant Payment Rails",
      title: "Real-time domestic rails are killing card-network margins",
      horizon: "NOW–6MO", c: 5, x: 40, y: 42,
      noise: "International card networks stay dominant for e-commerce indefinitely — premium reward points protect card dominance in emerging markets.",
      truth: "Central banks are launching zero-fee account-to-account instant payments that bypass international rails, and merchants push QR-code bank transfers to dodge interchange fees.",
      responses: [
        "Accelerate integration with national account-to-account infrastructure to capture direct volume.",
        "Move off card-interchange reliance; build value-added merchant services like instant reconciliation.",
      ],
    },
    {
      num: "10", short: "Regulatory Arbitrage",
      title: "Regulatory arbitrage is vanishing as central banks force separation",
      horizon: "12–18MO", c: 5, x: 74, y: 58,
      noise: "Fintechs and operators can bypass banking law indefinitely under light-touch e-money licences — agility wins share without compliance cost.",
      truth: "Central banks are aggressively closing loopholes to protect stability, forcing telecom financial subsidiaries to structurally decouple from parents and face the same scrutiny as banks.",
      responses: [
        "Drop any strategy built on regulatory loopholes or light-touch licensing.",
        "Structure digital-finance divisions as ring-fenced, fully compliant entities that withstand intense audits.",
      ],
    },
  ],
};
