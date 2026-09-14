import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import { FadeUp } from "@/components/shared/AnimatedText";
import { practiceAreas } from "@/lib/practiceAreas";

export const metadata: Metadata = {
  title: "What We Do",
  description: "Five practice areas covering the full transformation lifecycle — from board-level strategy to ground-level delivery.",
};

export default function WhatWeDoPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0c1945] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse 55% 80% at 25% 50%, #3d5ad9, transparent)" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#05aff2] mb-6">
              Our Practice Areas
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="font-heading font-bold text-white mb-6 leading-tight"
              style={{ fontSize: "clamp(2.25rem, 5vw, 5rem)", letterSpacing: "-0.025em" }}
            >
              Advisory across the full
              <br />
              <span className="text-gradient-amber">transformation lifecycle.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="font-body text-white/55 max-w-2xl leading-relaxed text-lg">
              Five integrated practice areas. One team. We engage where the problem is — and stay until the outcome is real.
            </p>
          </FadeUp>

          {/* Practice area chips */}
          <FadeUp delay={0.3}>
            <div className="flex flex-wrap gap-3 mt-10">
              {practiceAreas.map((pa) => (
                <Link
                  key={pa.slug}
                  href={`/what-we-do/${pa.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all font-body text-sm text-white/70 hover:text-white"
                >
                  <span className="text-[#05aff2] font-mono text-xs">{pa.number}</span>
                  {pa.name}
                </Link>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Practice area sections — alternating layout */}
      <div className="bg-white">
        {practiceAreas.map((pa, i) => {
          const isEven = i % 2 === 1;
          return (
            <section
              key={pa.slug}
              id={pa.slug}
              className={`section-padding border-b border-[#E2E8F0] ${isEven ? "bg-[#f8faff]" : "bg-white"}`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeUp>
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>

                    {/* Text block */}
                    <div className={isEven ? "lg:order-2" : ""}>
                      {/* Number + label */}
                      <div className="flex items-center gap-3 mb-6">
                        <span
                          className="font-mono text-xs font-bold tracking-widest px-2.5 py-1 rounded-md"
                          style={{ color: pa.accentColor, background: `${pa.accentColor}18`, border: `1px solid ${pa.accentColor}30` }}
                        >
                          {pa.number}
                        </span>
                        <span className="h-[1px] w-8 bg-[#E2E8F0]" />
                        <span className="font-body text-xs font-semibold tracking-[0.12em] uppercase text-[#334155]/50">
                          Practice Area
                        </span>
                      </div>

                      {/* Heading */}
                      <h2
                        className="font-heading font-bold text-[#0c1945] mb-3 leading-tight"
                        style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", letterSpacing: "-0.02em" }}
                      >
                        {pa.name}
                      </h2>

                      {/* Tagline */}
                      <p className="font-body font-medium mb-5" style={{ color: pa.accentColor, fontSize: "1rem" }}>
                        {pa.tagline}
                      </p>

                      {/* Description */}
                      <p className="font-body text-[#334155]/70 leading-relaxed mb-8" style={{ fontSize: "1.05rem" }}>
                        {pa.description}
                      </p>

                      {/* Services list */}
                      <ul className="space-y-3 mb-9">
                        {pa.services.map((s) => (
                          <li key={s.name} className="flex items-center gap-3">
                            <CheckCircle2 size={15} className="flex-shrink-0" style={{ color: pa.accentColor }} />
                            <span className="font-body text-sm font-medium text-[#0c1945]">{s.name}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <Link
                        href={`/what-we-do/${pa.slug}`}
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-heading font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                        style={{ background: pa.accentColor }}
                      >
                        Explore {pa.name}
                        <ArrowRight size={15} />
                      </Link>
                    </div>

                    {/* Image */}
                    <div className={isEven ? "lg:order-1" : ""}>
                      <ImagePlaceholder
                        label={pa.name}
                        hint={pa.imageHint}
                        aspectRatio="aspect-[16/10]"
                        className="rounded-2xl shadow-[0_8px_40px_rgba(12,25,69,0.1)]"
                        src={`/images/${pa.slug}.jpg`}
                        alt={pa.name}
                      />
                    </div>

                  </div>
                </FadeUp>
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <section className="py-24 bg-[#030611]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <FadeUp>
            <h2
              className="font-heading font-bold text-white mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.02em" }}
            >
              Not sure which practice area fits?
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-body text-white/50 text-lg mb-10 leading-relaxed">
              Tell us what&apos;s on your agenda. We&apos;ll be direct about how we can help — and honest if we can&apos;t.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#3d5ad9] text-white font-heading font-semibold text-base hover:bg-[#2f4bbf] transition-colors duration-200 shadow-lg"
            >
              Start a Conversation <ArrowRight size={17} />
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
