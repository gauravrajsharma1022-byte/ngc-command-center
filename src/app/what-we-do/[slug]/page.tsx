import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedText";
import { practiceAreas, getPracticeArea } from "@/lib/practiceAreas";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return practiceAreas.map((pa) => ({ slug: pa.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pa = getPracticeArea(slug);
  if (!pa) return {};
  return {
    title: pa.name,
    description: pa.description,
  };
}

export default async function PracticeAreaPage({ params }: Props) {
  const { slug } = await params;
  const pa = getPracticeArea(slug);
  if (!pa) notFound();

  const currentIndex = practiceAreas.findIndex((p) => p.slug === slug);
  const prev = practiceAreas[currentIndex - 1];
  const next = practiceAreas[currentIndex + 1];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 relative overflow-hidden" style={{ background: "#030611" }}>
        <div
          className="absolute inset-0 opacity-25"
          style={{ background: `radial-gradient(ellipse 60% 80% at 20% 60%, ${pa.accentColor}, transparent)` }}
        />
        {/* Faint practice number watermark */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 font-heading font-bold select-none pointer-events-none"
          style={{ fontSize: "clamp(8rem, 20vw, 18rem)", color: "rgba(255,255,255,0.025)", lineHeight: 1 }}
          aria-hidden
        >
          {pa.number}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <FadeUp>
            <Link
              href="/what-we-do"
              className="inline-flex items-center gap-1.5 font-body text-xs text-white/35 hover:text-white/60 transition-colors mb-8"
            >
              <ArrowLeft size={12} />
              What We Do
            </Link>
          </FadeUp>

          <FadeUp delay={0.05}>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="font-mono text-xs font-bold px-2.5 py-1 rounded-md"
                style={{ color: pa.accentColor, background: `${pa.accentColor}20`, border: `1px solid ${pa.accentColor}35` }}
              >
                {pa.number}
              </span>
              <span className="font-body text-xs font-semibold tracking-[0.14em] uppercase text-white/35">
                Practice Area
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1
              className="font-heading font-bold text-white mb-5 leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)", letterSpacing: "-0.03em" }}
            >
              {pa.name}
            </h1>
          </FadeUp>

          <FadeUp delay={0.18}>
            <p className="font-body font-medium mb-6 text-lg" style={{ color: pa.accentColor }}>
              {pa.tagline}
            </p>
          </FadeUp>

          <FadeUp delay={0.24}>
            <p className="font-body text-white/55 max-w-2xl leading-relaxed text-lg">
              {pa.description}
            </p>
          </FadeUp>

          <FadeUp delay={0.32}>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-heading font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 shadow-lg"
              style={{ background: pa.accentColor }}
            >
              Discuss This Practice Area <ArrowRight size={15} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* What this covers */}
      <section className="section-padding bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase mb-4" style={{ color: pa.accentColor }}>
              What This Covers
            </span>
            <h2
              className="font-heading font-bold text-[#0c1945] mb-14"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}
            >
              Three core services within {pa.name}
            </h2>
          </FadeUp>

          <StaggerContainer>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {pa.services.map((s, i) => (
                <StaggerItem key={s.name}>
                  <div className="h-full p-7 rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#3d5ad9]/30 hover:shadow-[0_8px_32px_rgba(12,25,69,0.08)] transition-all duration-300 group">
                    {/* Service number */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-mono text-sm font-bold mb-5 transition-all"
                      style={{ color: pa.accentColor, background: `${pa.accentColor}15`, border: `1px solid ${pa.accentColor}25` }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-heading font-bold text-[#0c1945] text-lg mb-3 group-hover:text-[#3d5ad9] transition-colors">
                      {s.name}
                    </h3>
                    <p className="font-body text-sm text-[#334155]/65 leading-relaxed">
                      {s.detail}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Why Northgate */}
      <section className="section-padding bg-[#f8faff] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase mb-4" style={{ color: pa.accentColor }}>
                Why Northgate
              </span>
              <h2
                className="font-heading font-bold text-[#0c1945] mb-6"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}
              >
                What makes us different here
              </h2>
              <p className="font-body text-[#334155]/65 leading-relaxed text-lg">
                We&apos;ve seen what happens when {pa.name.toLowerCase()} is done well — and when it isn&apos;t. These are the things that matter.
              </p>
            </FadeUp>

            <div className="space-y-5">
              {pa.differentiators.map((d, i) => (
                <FadeUp key={d.heading} delay={i * 0.1}>
                  <div className="flex items-start gap-4 p-5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#3d5ad9]/25 transition-colors">
                    <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" style={{ color: pa.accentColor }} />
                    <div>
                      <p className="font-heading font-semibold text-[#0c1945] text-sm mb-1">{d.heading}</p>
                      <p className="font-body text-sm text-[#334155]/60 leading-relaxed">{d.body}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Relevant sectors */}
      <section className="py-16 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#334155]/40 mb-5">
              Relevant Sectors
            </p>
            <div className="flex flex-wrap gap-3">
              {pa.sectors.map((sector) => (
                <span
                  key={sector}
                  className="px-4 py-2 rounded-full border font-body text-sm font-medium"
                  style={{
                    borderColor: `${pa.accentColor}35`,
                    color: pa.accentColor,
                    background: `${pa.accentColor}0d`,
                  }}
                >
                  {sector}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Image section */}
      <section className="section-padding bg-[#f8faff] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImagePlaceholder
            label={pa.name}
            hint={pa.imageHint}
            aspectRatio="aspect-[21/9]"
            className="rounded-2xl shadow-[0_8px_40px_rgba(12,25,69,0.1)]"
          />
        </div>
      </section>

      {/* Prev / Next navigation */}
      <section className="py-12 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            {prev && (
              <Link
                href={`/what-we-do/${prev.slug}`}
                className="flex items-center gap-3 p-5 rounded-xl border border-[#E2E8F0] hover:border-[#3d5ad9]/30 hover:bg-[#f8faff] transition-all group"
              >
                <ArrowLeft size={16} className="text-[#334155]/40 group-hover:text-[#3d5ad9] transition-colors" />
                <div>
                  <p className="font-body text-xs text-[#334155]/40 mb-0.5">Previous</p>
                  <p className="font-heading font-semibold text-sm text-[#0c1945] group-hover:text-[#3d5ad9] transition-colors">{prev.name}</p>
                </div>
              </Link>
            )}

            {next && (
              <Link
                href={`/what-we-do/${next.slug}`}
                className={`flex items-center justify-end gap-3 p-5 rounded-xl border border-[#E2E8F0] hover:border-[#3d5ad9]/30 hover:bg-[#f8faff] transition-all text-right group${!prev ? " ml-auto" : ""}`}
              >
                <div>
                  <p className="font-body text-xs text-[#334155]/40 mb-0.5">Next</p>
                  <p className="font-heading font-semibold text-sm text-[#0c1945] group-hover:text-[#3d5ad9] transition-colors">{next.name}</p>
                </div>
                <ArrowRight size={16} className="text-[#334155]/40 group-hover:text-[#3d5ad9] transition-colors" />
              </Link>
            )}
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
              Ready to explore {pa.name}?
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-body text-white/45 text-lg mb-10 leading-relaxed">
              Let&apos;s have a direct conversation about your challenge and how this practice area can help.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-heading font-semibold text-base text-white transition-all duration-200 hover:opacity-90 shadow-lg"
                style={{ background: pa.accentColor }}
              >
                Start a Conversation <ArrowRight size={17} />
              </Link>
              <Link
                href="/what-we-do"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/15 text-white/60 font-heading font-medium text-base hover:text-white hover:border-white/30 transition-all"
              >
                View All Practice Areas
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
