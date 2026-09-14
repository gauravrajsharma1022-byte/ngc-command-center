export type SectorKey = "telecom" | "healthcare" | "fintech";

export type ProblemCard = {
  n: string;
  title: string;
  body: string;
  href: string;
};

export type Sector = {
  key: SectorKey;
  label: string;
  accent: string;
  cards: ProblemCard[];
};

export const SECTORS: Sector[] = [
  {
    key: "telecom",
    label: "Telecom",
    accent: "#6f8bff",
    cards: [
      {
        n: "01",
        title: "Your operations are automated on paper, not in practice.",
        body: "OSS/BSS stacks built across decades of vendor decisions do not communicate. Inventory does not match the network. AI initiatives stall before they start because the data foundation they depend on simply does not exist.",
        href: "/what-we-do/digital-transformation",
      },
      {
        n: "02",
        title: "You built the network. Someone else owns the customer.",
        body: "Digital-first players and virtual operators are capturing wallet share, ARPU, and customer engagement on top of your infrastructure — while you remain the invisible commodity underneath. The margin compression is already structural.",
        href: "/what-we-do/strategic-advisory",
      },
      {
        n: "03",
        title: "Connectivity revenue is declining. Platform revenue is not replacing it fast enough.",
        body: "The pivot from connectivity vendor to solution-led platform is not a strategy problem — it is an execution problem. APIs, network slicing, and enterprise ecosystems require architectural decisions most operators are not positioned to make.",
        href: "/what-we-do/business-consulting",
      },
    ],
  },
  {
    key: "healthcare",
    label: "Healthcare",
    accent: "#34d8a6",
    cards: [
      {
        n: "01",
        title: "Compliance is a deadline. Interoperability is a capability. They are not the same.",
        body: "FHIR and data-sharing mandates have fixed dates. The integration work that makes them real does not fit the same timeline. Most providers are closing the paper gap while the practical gap quietly widens.",
        href: "/what-we-do/digital-transformation",
      },
      {
        n: "02",
        title: "Your clinical data is everywhere and trusted nowhere.",
        body: "Records fragmented across EHRs, departments, and acquired systems mean every analytics and AI ambition starts with a data-quality problem no one owns. The foundation has to come first — and it rarely does.",
        href: "/what-we-do/digital-transformation",
      },
      {
        n: "03",
        title: "Patient experience is now a competitive market, not a service line.",
        body: "Digital-first entrants set the expectation for access, transparency, and convenience. Incumbents carry the trust and the infrastructure — but not yet the operating model to compete on experience.",
        href: "/what-we-do/strategic-advisory",
      },
    ],
  },
  {
    key: "fintech",
    label: "Fintech",
    accent: "#a78bfa",
    cards: [
      {
        n: "01",
        title: "You scaled the product faster than the controls.",
        body: "Growth outran governance. Risk, compliance, and reconciliation were bolted on rather than designed in — and regulators are no longer treating that as a startup excuse.",
        href: "/what-we-do/strategic-advisory",
      },
      {
        n: "02",
        title: "Every new market is a new licence, a new rail, a new integration.",
        body: "Expansion multiplies regulatory surface area and platform complexity at the same time. Without an architecture built for jurisdictional difference, each launch gets slower and more expensive than the last.",
        href: "/what-we-do/digital-transformation",
      },
      {
        n: "03",
        title: "Your platform is reliable until exactly the moment it cannot be.",
        body: "Volume spikes, settlement windows, and partner dependencies expose the gap between theory and production reality. Resilience is an architectural decision, not an SLA you negotiate after the fact.",
        href: "/what-we-do/business-consulting",
      },
    ],
  },
];

export const PHASES = [
  {
    n: "01",
    title: "Diagnose",
    body: "We map your current-state architecture, commercial pressures, and operational constraints before recommending a single thing. The diagnosis is the most important document we produce together.",
  },
  {
    n: "02",
    title: "Architect",
    body: "Strategy without system design is a vision board. We translate business objectives into precise blueprints — technology stack, integration points, vendor selection criteria, and the sequencing logic that determines what gets built and why.",
  },
  {
    n: "03",
    title: "Deliver",
    body: "We stay through delivery — not as oversight, but as co-owners of the outcome. Programme management, vendor governance, escalation frameworks, and milestone accountability. We have been on the other side of these contracts.",
  },
  {
    n: "04",
    title: "Sustain",
    body: "The project end date is not the value realisation date. We define operational success before we start and measure against it after we finish. Most programmes fail at adoption. We close that gap.",
  },
];
