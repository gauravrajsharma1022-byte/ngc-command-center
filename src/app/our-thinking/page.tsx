import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { getInsights, type Insight } from "@/lib/notion";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedText";
import { thinkingCategories } from "@/lib/thinkingCategories";
import ArticlesSection from "@/components/our-thinking/ArticlesSection";

export const metadata: Metadata = {
  title: "Our Thinking",
  description: "Case studies, white papers, and industry insights from Northgate Consulting.",
};

// ISR — revalidate every 60 minutes so new Notion content auto-publishes
export const revalidate = 3600;

const typeColor = (t: string) => (t === "White Paper" ? "#05aff2" : "#3d5ad9");

// Fallback insights shown when Notion is not yet connected
const fallbackInsights: Insight[] = [
  {
    id: "1",
    title: "The BSS Modernisation Imperative: Why Telecoms Can't Wait",
    slug: "bss-modernisation-imperative",
    type: "Industry Insight",
    excerpt: "Legacy billing and customer management systems are becoming the single biggest barrier to telecom growth. Here's what the path forward looks like — and why speed matters.",
    publishedAt: "2026-06-01",
    readTime: "7 min read",
    tags: ["BSS", "Modernisation", "Telecom"],
    notionUrl: "#",
  },
  {
    id: "2",
    title: "MVNO Launch Playbook: From Licence to First Subscriber",
    slug: "mvno-launch-playbook",
    type: "White Paper",
    excerpt: "A practitioner's guide to the critical decisions that determine MVNO success — platform selection, go-to-market strategy, and operational readiness.",
    publishedAt: "2026-05-15",
    readTime: "12 min read",
    tags: ["MVNO", "Go-to-Market", "Strategy"],
    notionUrl: "#",
  },
  {
    id: "3",
    title: "Digital Transformation in 90 Days: A Tier 2 Telecom Story",
    slug: "digital-transformation-90-days",
    type: "Case Study",
    excerpt: "How we helped a regional operator accelerate their digital channel adoption by 3× through a targeted CX transformation programme with clear milestones.",
    publishedAt: "2026-04-20",
    readTime: "5 min read",
    tags: ["Case Study", "Digital Channels", "CX"],
    notionUrl: "#",
  },
  {
    id: "4",
    title: "Enterprise Architecture for Telecoms: A Framework for the Modern Era",
    slug: "enterprise-architecture-telecoms-framework",
    type: "White Paper",
    excerpt: "How to design a telecom enterprise architecture that is resilient, scalable, and aligned to business strategy — without starting from scratch.",
    publishedAt: "2026-03-10",
    readTime: "9 min read",
    tags: ["Enterprise Architecture", "Strategy", "Technology"],
    notionUrl: "#",
  },
  {
    id: "5",
    title: "Vendor Evaluation Done Right: Lessons from 50+ Telecom Selections",
    slug: "vendor-evaluation-lessons",
    type: "Industry Insight",
    excerpt: "Most vendor evaluations are broken from the start. Here are the eight mistakes we see most often — and how to avoid them.",
    publishedAt: "2026-02-28",
    readTime: "6 min read",
    tags: ["Vendor Evaluation", "Procurement", "Advisory"],
    notionUrl: "#",
  },
  {
    id: "6",
    title: "Persona-Driven CX in Telecom: Moving Beyond NPS",
    slug: "persona-driven-cx-telecom",
    type: "Industry Insight",
    excerpt: "Net Promoter Score alone doesn't tell you what to fix. Here's how leading telecoms are using persona-driven journey design to transform their customer experience.",
    publishedAt: "2026-02-05",
    readTime: "8 min read",
    tags: ["CX", "Persona Design", "Digital Channels"],
    notionUrl: "#",
  },
];

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    return new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(new Date(dateStr));
  } catch { return dateStr; }
}

function InsightCard({ insight, featured = false }: { insight: Insight; featured?: boolean }) {
  const color = typeColor(insight.type);

  if (featured) {
    return (
      <div className="group flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white card-hover">
        <div className="lg:w-1/2">
          {insight.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={insight.coverUrl} alt={insight.title} className="w-full h-full object-cover aspect-video lg:aspect-auto" />
          ) : (
            <ImagePlaceholder
              label={insight.title}
              hint={`Featured article image — 900×550px landscape. Topic: ${insight.tags.join(", ")}`}
              aspectRatio="aspect-video lg:aspect-auto"
              className="rounded-none h-full"
            />
          )}
        </div>
        <div className="lg:w-1/2 p-8 flex flex-col justify-center">
          <span className="inline-flex self-start items-center px-2.5 py-1 rounded-full text-xs font-body font-semibold mb-5" style={{ background: `${color}15`, color }}>
            {insight.type}
          </span>
          <h2 className="font-heading font-bold text-[#0c1945] mb-4 leading-tight group-hover:text-[#3d5ad9] transition-colors" style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}>
            {insight.title}
          </h2>
          <p className="font-body text-[#334155]/65 text-base leading-relaxed mb-6">{insight.excerpt}</p>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {insight.tags.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-full text-xs font-body bg-[#ffffff] text-[#334155]/60 border border-[#E2E8F0]">{t}</span>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs font-body text-[#334155]/45 border-t border-[#E2E8F0] pt-4">
            <span className="flex items-center gap-1.5"><Calendar size={12} /> {formatDate(insight.publishedAt)}</span>
            {insight.readTime && <span className="flex items-center gap-1.5"><Clock size={12} /> {insight.readTime}</span>}
            <Link href={`/our-thinking/${insight.slug}`} className="flex items-center gap-1 text-[#3d5ad9] font-semibold hover:gap-2 transition-all">
              Read <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white card-hover h-full">
      {insight.coverUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={insight.coverUrl} alt={insight.title} className="w-full aspect-video object-cover" />
      ) : (
        <ImagePlaceholder
          label={insight.title}
          hint={`Article image — 800×450px landscape. Topic: ${insight.tags.join(", ")}`}
          aspectRatio="aspect-video"
          className="rounded-none flex-shrink-0"
        />
      )}
      <div className="flex flex-col flex-1 p-6">
        <span className="inline-flex self-start items-center px-2.5 py-1 rounded-full text-xs font-body font-semibold mb-4" style={{ background: `${color}15`, color }}>
          {insight.type}
        </span>
        <h3 className="font-heading font-semibold text-[#0c1945] text-base leading-snug mb-3 group-hover:text-[#3d5ad9] transition-colors flex-1">
          {insight.title}
        </h3>
        <p className="font-body text-sm text-[#334155]/65 leading-relaxed mb-4">{insight.excerpt}</p>
        <div className="flex items-center gap-3 text-xs font-body text-[#334155]/45 border-t border-[#E2E8F0] pt-4 mt-auto">
          <span className="flex items-center gap-1"><Calendar size={11} /> {formatDate(insight.publishedAt)}</span>
          {insight.readTime && <span className="flex items-center gap-1"><Clock size={11} /> {insight.readTime}</span>}
          <Link href={`/our-thinking/${insight.slug}`} className="ml-auto flex items-center gap-1 text-[#3d5ad9] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            Read <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function OurThinkingPage() {
  const notionInsights = await getInsights();
  const hasInsights = notionInsights.length > 0;
  const [featured, ...rest] = notionInsights;

  return (
    <>
      {/* Hero — full-page image */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "100vh" }}>
        <Image
          src="/images/CXO Strategic.jpg"
          alt="Northgate — Our Thinking"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient: strong at bottom for text, light at top */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(3,6,17,0.92) 0%, rgba(3,6,17,0.55) 40%, rgba(3,6,17,0.18) 75%, rgba(3,6,17,0.05) 100%)",
          }}
        />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-40">
          <FadeUp>
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#05aff2] mb-6">
              Our Thinking
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="font-heading font-bold text-white mb-6 leading-tight"
              style={{ fontSize: "clamp(2.25rem, 5vw, 5rem)", letterSpacing: "-0.025em" }}
            >
              Perspectives that shape
              <br /><span className="text-gradient-amber">the industry.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="font-body text-white/70 max-w-2xl leading-relaxed text-lg">
              Case studies, white papers, and insights from the front lines of telecom transformation — written by practitioners, for decision-makers.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Articles from founder portfolio */}
      <ArticlesSection />

      {/* Content — only shown when Notion insights are live */}
      {hasInsights && (
        <section className="section-padding bg-[#ffffff]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Featured */}
            <FadeUp className="mb-8">
              <InsightCard insight={featured} featured />
            </FadeUp>

            {/* Grid */}
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((insight) => (
                <StaggerItem key={insight.id}>
                  <InsightCard insight={insight} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}
    </>
  );
}
