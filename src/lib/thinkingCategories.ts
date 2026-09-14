export type ThinkingCategory = {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  whatToExpect: { heading: string; body: string }[];
  accentColor: string;
  imageHint: string;
};

export const thinkingCategories: ThinkingCategory[] = [
  {
    slug: "perspectives",
    number: "01",
    name: "Perspectives",
    tagline: "Executive viewpoints from practitioners, not pundits.",
    description:
      "Strategic analysis and industry commentary from Northgate's leadership — written for people who have to make the decisions, not just read about them.",
    whatToExpect: [
      {
        heading: "Board-Level Strategic Analysis",
        body: "Deep-dive perspectives on the strategic choices facing Tier 1–3 operators and enterprise leaders in a rapidly shifting landscape.",
      },
      {
        heading: "Market Positioning Insights",
        body: "How leading organisations are positioning for growth, managing disruption, and making the big bets that define the next decade.",
      },
      {
        heading: "Leadership Commentary",
        body: "Honest takes from Northgate's leadership on what's working, what isn't, and where the industry needs to move faster.",
      },
    ],
    accentColor: "#3d5ad9",
    imageHint: "Executive leadership, strategic thinking, boardroom — 1200×600px landscape",
  },
  {
    slug: "the-ai-edge",
    number: "02",
    name: "The AI Edge",
    tagline: "Practical AI for enterprise — beyond the hype.",
    description:
      "How artificial intelligence is reshaping telecom, BSS, and enterprise operations. Grounded in what's actually deployable today — not what's on the horizon in five years.",
    whatToExpect: [
      {
        heading: "Applied AI in Telecom & BSS",
        body: "Real use cases where AI is delivering measurable value — from churn prediction to billing automation to network intelligence.",
      },
      {
        heading: "Enterprise AI Adoption Playbooks",
        body: "Practical frameworks for evaluating, piloting, and scaling AI initiatives inside complex enterprise environments.",
      },
      {
        heading: "What Not To Do",
        body: "The AI implementations that looked good on paper and failed in practice — and the lessons that come from being close to the ground.",
      },
    ],
    accentColor: "#05aff2",
    imageHint: "AI, data networks, machine learning, automation — 1200×600px landscape",
  },
  {
    slug: "industry-signals",
    number: "03",
    name: "Industry Signals",
    tagline: "Trends worth tracking. Noise worth ignoring.",
    description:
      "Market movements, regulatory shifts, and competitive dynamics across telecom and enterprise. Curated for decision-makers with limited time and high stakes.",
    whatToExpect: [
      {
        heading: "Telecom Market Trend Analysis",
        body: "Structured reads on where the market is heading — across segments, geographies, and technology layers — with a practitioner's eye for what matters.",
      },
      {
        heading: "Regulatory & Policy Updates",
        body: "The policy shifts, spectrum decisions, and compliance changes that will shape commercial and operational planning over the next 12–24 months.",
      },
      {
        heading: "Competitive Landscape Shifts",
        body: "Who's moving, who's falling behind, and what the emerging challengers are doing differently — distilled into clear strategic signals.",
      },
    ],
    accentColor: "#3d5ad9",
    imageHint: "Market signals, data analytics, trends, network — 1200×600px landscape",
  },
  {
    slug: "field-notes",
    number: "04",
    name: "Field Notes",
    tagline: "Lessons from the front line — anonymised, distilled.",
    description:
      "Practical insights drawn from real client engagements across Tier 1–3 operators, MVNOs, and enterprises. Confidential where it must be. Honest where it can be.",
    whatToExpect: [
      {
        heading: "Anonymised Transformation Stories",
        body: "How real programmes unfolded — the decisions, the pivots, the moments where things nearly went wrong, and what made the difference.",
      },
      {
        heading: "Lessons From Live Programmes",
        body: "Hard-won knowledge from running complex BSS migrations, MVNO launches, and enterprise digitisation programmes across high-growth markets.",
      },
      {
        heading: "Practitioner Frameworks",
        body: "Tools, templates, and mental models we've developed through years of delivery — packaged for practitioners who need to hit the ground running.",
      },
    ],
    accentColor: "#05aff2",
    imageHint: "Field notes, consulting session, project delivery, boardroom — 1200×600px landscape",
  },
];

export function getThinkingCategory(slug: string): ThinkingCategory | undefined {
  return thinkingCategories.find((c) => c.slug === slug);
}
