import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, FileText } from "lucide-react";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedText";
import { thinkingCategories, getThinkingCategory } from "@/lib/thinkingCategories";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return thinkingCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getThinkingCategory(slug);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
  };
}

export default async function ThinkingCategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getThinkingCategory(slug);
  if (!cat) notFound();

  const currentIndex = thinkingCategories.findIndex((c) => c.slug === slug);
  const prev = thinkingCategories[currentIndex - 1];
  const next = thinkingCategories[currentIndex + 1];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 relative overflow-hidden" style={{ background: "#030611" }}>
        <div
          className="absolute inset-0 opacity-25"
          style={{ background: `radial-gradient(ellipse 60% 80% at 20% 60%, ${cat.accentColor}, transparent)` }}
        />
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 font-heading font-bold select-none pointer-events-none"
          style={{ fontSize: "clamp(8rem, 20vw, 18rem)", color: "rgba(255,255,255,0.025)", lineHeight: 1 }}
          aria-hidden
        >
          {cat.number}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <Link
              href="/our-thinking"
              className="inline-flex items-center gap-1.5 font-body text-xs text-white/35 hover:text-white/60 transition-colors mb-8"
            >
              <ArrowLeft size={12} />
              Our Thinking
            </Link>
          </FadeUp>

          <FadeUp delay={0.05}>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="font-mono text-xs font-bold px-2.5 py-1 rounded-md"
                style={{ color: cat.accentColor, background: `${cat.accentColor}20`, border: `1px solid ${cat.accentColor}35` }}
              >
                {cat.number}
              </span>
              <span className="font-body text-xs font-semibold tracking-[0.14em] uppercase text-white/35">
                Content Category
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1
              className="font-heading font-bold text-white mb-5 leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)", letterSpacing: "-0.03em" }}
            >
              {cat.name}
            </h1>
          </FadeUp>

          <FadeUp delay={0.18}>
            <p className="font-body font-medium mb-6 text-lg" style={{ color: cat.accentColor }}>
              {cat.tagline}
            </p>
          </FadeUp>

          <FadeUp delay={0.24}>
            <p className="font-body text-white/55 max-w-2xl leading-relaxed text-lg">
              {cat.description}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* What you'll find here */}
      <section className="section-padding bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase mb-4" style={{ color: cat.accentColor }}>
              What You&apos;ll Find Here
            </span>
            <h2
              className="font-heading font-bold text-[#0c1945] mb-14"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}
            >
              Three things this section covers
            </h2>
          </FadeUp>

          <StaggerContainer>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {cat.whatToExpect.map((item, i) => (
                <StaggerItem key={item.heading}>
                  <div className="h-full p-7 rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#3d5ad9]/30 hover:shadow-[0_8px_32px_rgba(12,25,69,0.08)] transition-all duration-300 group">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-mono text-sm font-bold mb-5"
                      style={{ color: cat.accentColor, background: `${cat.accentColor}15`, border: `1px solid ${cat.accentColor}25` }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-heading font-bold text-[#0c1945] text-lg mb-3 group-hover:text-[#3d5ad9] transition-colors">
                      {item.heading}
                    </h3>
                    <p className="font-body text-sm text-[#334155]/65 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Articles placeholder */}
      <section className="section-padding bg-[#f8faff] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <FadeUp>
              <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase mb-4" style={{ color: cat.accentColor }}>
                Latest
              </span>
              <h2
                className="font-heading font-bold text-[#0c1945]"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}
              >
                Content from {cat.name}
              </h2>
            </FadeUp>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <StaggerItem key={n}>
                <div className="flex flex-col rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white h-full">
                  <div
                    className="aspect-video flex items-center justify-center"
                    style={{ background: `${cat.accentColor}08` }}
                  >
                    <FileText size={32} style={{ color: `${cat.accentColor}40` }} />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <span
                      className="inline-flex self-start items-center px-2.5 py-1 rounded-full text-xs font-body font-semibold mb-4"
                      style={{ background: `${cat.accentColor}12`, color: cat.accentColor }}
                    >
                      {cat.name}
                    </span>
                    <div className="flex-1 space-y-2.5 mb-5">
                      <div className="h-4 rounded bg-[#E2E8F0] w-full" />
                      <div className="h-4 rounded bg-[#E2E8F0] w-4/5" />
                      <div className="h-4 rounded bg-[#E2E8F0] w-3/5 mt-4" />
                      <div className="h-3 rounded bg-[#E2E8F0] w-full opacity-60" />
                      <div className="h-3 rounded bg-[#E2E8F0] w-5/6 opacity-60" />
                    </div>
                    <div className="pt-4 border-t border-[#E2E8F0]">
                      <p className="font-body text-xs text-[#334155]/40 italic">Content coming soon</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Image section */}
      <section className="section-padding bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImagePlaceholder
            label={cat.name}
            hint={cat.imageHint}
            aspectRatio="aspect-[21/9]"
            className="rounded-2xl shadow-[0_8px_40px_rgba(12,25,69,0.1)]"
          />
        </div>
      </section>

      {/* Prev / Next */}
      <section className="py-12 bg-[#f8faff] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/our-thinking/${prev.slug}`}
                className="flex items-center gap-3 p-5 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#3d5ad9]/30 hover:bg-[#f8faff] transition-all group"
              >
                <ArrowLeft size={16} className="text-[#334155]/40 group-hover:text-[#3d5ad9] transition-colors" />
                <div>
                  <p className="font-body text-xs text-[#334155]/40 mb-0.5">Previous</p>
                  <p className="font-heading font-semibold text-sm text-[#0c1945] group-hover:text-[#3d5ad9] transition-colors">{prev.name}</p>
                </div>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                href={`/our-thinking/${next.slug}`}
                className="flex items-center justify-end gap-3 p-5 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#3d5ad9]/30 hover:bg-[#f8faff] transition-all text-right group"
              >
                <div>
                  <p className="font-body text-xs text-[#334155]/40 mb-0.5">Next</p>
                  <p className="font-heading font-semibold text-sm text-[#0c1945] group-hover:text-[#3d5ad9] transition-colors">{next.name}</p>
                </div>
                <ArrowRight size={16} className="text-[#334155]/40 group-hover:text-[#3d5ad9] transition-colors" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#030611]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <FadeUp>
            <h2
              className="font-heading font-bold text-white mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}
            >
              Want to discuss what you&apos;ve read?
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-body text-white/45 text-lg mb-10 leading-relaxed">
              Our thinking is shaped by client conversations. If something resonates — or challenges your thinking — let&apos;s talk.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-heading font-semibold text-base text-white transition-all duration-200 hover:opacity-90 shadow-lg"
                style={{ background: cat.accentColor }}
              >
                Start a Conversation <ArrowRight size={17} />
              </Link>
              <Link
                href="/our-thinking"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/15 text-white/60 font-heading font-medium text-base hover:text-white hover:border-white/30 transition-all"
              >
                All Articles
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
