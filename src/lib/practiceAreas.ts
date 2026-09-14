export type PracticeArea = {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  services: { name: string; detail: string }[];
  differentiators: { heading: string; body: string }[];
  sectors: string[];
  accentColor: string;
  imageHint: string;
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "strategic-advisory",
    number: "01",
    name: "Strategic Advisory",
    tagline: "Board-level strategy with ground-level understanding.",
    description:
      "We work directly with Boards, Chairmen and C-suite executives to set direction, evaluate opportunities and navigate complex transformation decisions.",
    services: [
      {
        name: "Board & CXO Advisory",
        detail:
          "Direct counsel to Boards and executive teams on strategy, digital transformation, and major investment decisions — drawing on decades of hands-on operator experience.",
      },
      {
        name: "Enterprise Strategy",
        detail:
          "Market positioning, growth strategy, and portfolio optimisation for telecoms and enterprises competing across high-growth, complex markets.",
      },
      {
        name: "Competitive Intelligence",
        detail:
          "Structured market surveillance, competitor analysis, and landscape mapping so you can make confident strategic decisions — backed by data, not assumptions.",
      },
    ],
    differentiators: [
      {
        heading: "Operator DNA",
        body: "Hands-on experience with Tier 1–3 operators across Middle East, Africa, and Asia — not consulting theory.",
      },
      {
        heading: "Board-Ready Output",
        body: "Every deliverable is built for the room it needs to land in — crisp, evidence-based, and decision-ready.",
      },
      {
        heading: "Honest Counsel",
        body: "We will tell you what you need to hear, not what you want to hear. Our value is in the truth, not the validation.",
      },
    ],
    sectors: ["Telecom", "MVNO / MVNE", "Enterprise", "Fintech"],
    accentColor: "#3d5ad9",
    imageHint: "Executive boardroom, strategy meeting — 900×500px landscape",
  },
  {
    slug: "digital-transformation",
    number: "02",
    name: "Digital Transformation",
    tagline: "From vision to execution — without losing momentum.",
    description:
      "We design and deliver transformation programmes grounded in business reality. Technology follows strategy here — not the other way around.",
    services: [
      {
        name: "Transformation Roadmaps",
        detail:
          "Phased, actionable transformation plans with clear milestones, ownership, budgets, and success metrics — built to be executed, not filed away.",
      },
      {
        name: "Digital Playbooks",
        detail:
          "Practical, execution-ready playbooks that translate high-level strategy into step-by-step operational programmes your teams can own.",
      },
      {
        name: "Enterprise Architecture",
        detail:
          "Holistic architecture design that bridges business strategy and technology delivery — resilient, scalable, and built to sustain growth across your ecosystem.",
      },
    ],
    differentiators: [
      {
        heading: "Executable Plans",
        body: "Our roadmaps are designed to be executed on Monday morning, not presented once and shelved.",
      },
      {
        heading: "Technology-Agnostic",
        body: "We design for your needs, your constraints, and your team — not our vendor relationships.",
      },
      {
        heading: "End-to-End Presence",
        body: "From current-state assessment through post-go-live stabilisation, we stay the course with you.",
      },
    ],
    sectors: ["Telecom", "Enterprise", "Healthcare", "Fintech"],
    accentColor: "#05aff2",
    imageHint: "Digital transformation roadmap, strategic planning — 900×500px landscape",
  },
  {
    slug: "business-consulting",
    number: "03",
    name: "Process & Solution Consulting",
    tagline: "Fixing how the business works before changing what it runs on.",
    description:
      "We bring rigour and precision to complex business challenges — from process redesign to solution consulting to customer experience transformation.",
    services: [
      {
        name: "Business Process Consulting",
        detail:
          "End-to-end process assessment, redesign, and optimisation across operations, customer service, and back-office functions — with measurable efficiency gains.",
      },
      {
        name: "Solution Consulting",
        detail:
          "Technical and commercial solution design that bridges business requirements with vendor capabilities — from concept and architecture through to contract.",
      },
      {
        name: "Persona-Driven Journeys",
        detail:
          "Experience mapping for every persona in your ecosystem — retail customers, enterprise clients, billing teams, and channel partners — with actionable redesign outputs.",
      },
    ],
    differentiators: [
      {
        heading: "Real Journeys",
        body: "We map what actually happens in your business, not the idealised diagram from the vendor brochure.",
      },
      {
        heading: "Business-Led",
        body: "Process design always precedes technology selection. We fix the business problem first.",
      },
      {
        heading: "Immediately Actionable",
        body: "Every deliverable is built so your team can act on it the week it lands.",
      },
    ],
    sectors: ["Telecom", "MVNO / MVNE", "Healthcare", "Enterprise"],
    accentColor: "#3d5ad9",
    imageHint: "Business consulting session, whiteboard — 900×500px landscape",
  },
  {
    slug: "commercial-excellence",
    number: "04",
    name: "Commercial Excellence",
    tagline: "Procurement and commercial strategy that protects your interests.",
    description:
      "We bring independence and discipline to your commercial processes — from RFP development through vendor selection to contract governance.",
    services: [
      {
        name: "RFP Development",
        detail:
          "Airtight requirements, evaluation criteria, and scoring frameworks that attract the right vendors and give you the contractual leverage you need to negotiate from strength.",
      },
      {
        name: "Vendor Evaluation",
        detail:
          "Rigorous, independent vendor assessments across BSS, OSS, CRM, billing, and digital platforms — built from your requirements, not vendor marketing materials.",
      },
      {
        name: "Contract & Value Governance",
        detail:
          "End-to-end commercial support from solution positioning and proposal development through to contract governance and value realisation tracking.",
      },
    ],
    differentiators: [
      {
        heading: "Zero Conflicts",
        body: "No vendor relationships, no referral arrangements. Our only loyalty is to your outcome.",
      },
      {
        heading: "Operator Frameworks",
        body: "Procurement criteria built from decades of running — and buying from — the telecom vendor ecosystem.",
      },
      {
        heading: "We Stay Through Signing",
        body: "We do not hand over an evaluation report and disappear. We are there through contract and into delivery.",
      },
    ],
    sectors: ["Telecom", "MVNO / MVNE", "Enterprise", "Fintech"],
    accentColor: "#05aff2",
    imageHint: "Commercial procurement, vendor evaluation — 900×500px landscape",
  },
  {
    slug: "delivery-management",
    number: "05",
    name: "Delivery Management",
    tagline: "Delivery leadership that sits inside your programme, not above it.",
    description:
      "We bring PMO discipline and experienced delivery leadership to your most complex transformation programmes — integrating with your teams, not floating above them.",
    services: [
      {
        name: "Programme Management",
        detail:
          "End-to-end governance across complex, multi-workstream transformation initiatives — keeping teams aligned, dependencies managed, and executives accurately informed.",
      },
      {
        name: "Implementation Oversight",
        detail:
          "Independent assurance across vendor-led programmes — identifying risks before they become crises and maintaining quality standards throughout the delivery lifecycle.",
      },
      {
        name: "Project Governance",
        detail:
          "Lightweight but robust governance frameworks that give your organisation visibility, control, and confidence across every active initiative in the portfolio.",
      },
    ],
    differentiators: [
      {
        heading: "Integrated Delivery",
        body: "We sit inside your programmes, not above them. Our value is in doing, not reporting.",
      },
      {
        heading: "Early Risk Detection",
        body: "We identify programme risk before it escalates — giving leadership time to act, not react.",
      },
      {
        heading: "Executive Clarity",
        body: "Reporting designed for the people who need to make decisions, not the people running the Gantt chart.",
      },
    ],
    sectors: ["Telecom", "Enterprise", "Healthcare", "MVNO / MVNE"],
    accentColor: "#3d5ad9",
    imageHint: "Programme delivery, executive dashboard — 900×500px landscape",
  },
];

export function getPracticeArea(slug: string): PracticeArea | undefined {
  return practiceAreas.find((p) => p.slug === slug);
}
