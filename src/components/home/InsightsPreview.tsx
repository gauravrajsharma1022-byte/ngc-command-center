import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import { FadeUp } from "@/components/shared/AnimatedText";

// Placeholder insights — these will be replaced by Notion CMS data in production
const placeholderInsights = [
  {
    type: "Industry Insight",
    title: "The BSS Modernisation Imperative: Why Telecoms Can't Wait",
    excerpt:
      "Legacy billing and customer management systems are becoming the single biggest barrier to telecom growth. Here's what the path forward looks like.",
    readTime: "7 min read",
    date: "June 2026",
    imageHint: "Network modernisation / BSS architecture concept — 800×450px",
    color: "#3d5ad9",
    href: "/our-thinking",
  },
  {
    type: "White Paper",
    title: "MVNO Launch Playbook: From Licence to First Subscriber",
    excerpt:
      "A practitioner's guide to the critical decisions that determine MVNO success — platform selection, go-to-market strategy, and operational readiness.",
    readTime: "12 min read",
    date: "May 2026",
    imageHint: "Mobile MVNO launch concept — 800×450px",
    color: "#05aff2",
    href: "/our-thinking",
  },
  {
    type: "Case Study",
    title: "Digital Transformation in 90 Days: A Tier 2 Telecom Story",
    excerpt:
      "How we helped a regional operator accelerate their digital channel adoption by 3× through a targeted CX transformation programme.",
    readTime: "5 min read",
    date: "April 2026",
    imageHint: "Digital transformation success / growth chart — 800×450px",
    color: "#3d5ad9",
    href: "/our-thinking",
  },
];

const typeColor = (t: string) => (t === "White Paper" ? "#05aff2" : "#3d5ad9");

export default function InsightsPreview() {
  return (
    <section className="section-padding bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <SectionHeader
            eyebrow="Our Thinking"
            title="Perspectives that shape the industry."
            subtitle="Case studies, white papers, and insights from the front lines of telecom transformation."
          />
          <Link
            href="/our-thinking"
            className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-heading font-semibold text-[#3d5ad9] hover:text-[#0c1945] transition-colors group"
          >
            All insights
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {placeholderInsights.map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.1}>
              <Link href={item.href} className="group flex flex-col rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white card-hover h-full">
                {/* Image */}
                <ImagePlaceholder
                  label={item.title}
                  hint={item.imageHint}
                  aspectRatio="aspect-[16/9]"
                  className="rounded-none flex-shrink-0"
                />

                <div className="flex flex-col flex-1 p-6">
                  {/* Type badge */}
                  <span
                    className="inline-flex self-start items-center px-2.5 py-1 rounded-full text-xs font-body font-semibold mb-4"
                    style={{ background: `${typeColor(item.type)}15`, color: typeColor(item.type) }}
                  >
                    {item.type}
                  </span>

                  <h3 className="font-heading font-semibold text-[#0c1945] text-base leading-snug mb-3 group-hover:text-[#3d5ad9] transition-colors flex-1">
                    {item.title}
                  </h3>

                  <p className="font-body text-sm text-[#334155]/65 leading-relaxed mb-5">
                    {item.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs font-body text-[#334155]/45 border-t border-[#E2E8F0] pt-4 mt-auto">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} /> {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {item.readTime}
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-[#3d5ad9] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Read <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
