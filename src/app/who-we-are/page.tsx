import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, GitMerge, Zap } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedText";

export const metadata: Metadata = {
  title: "Who We Are",
  description: "Boutique advisory for Telecom, Healthcare and Fintech enterprises. Board-level strategy, ground-level delivery — and we stay until the outcome is secured.",
};

const differentiators = [
  {
    number: "01",
    icon: Layers,
    title: "Operator DNA",
    accentColor: "#3d5ad9",
    body: "Twenty years inside Tier 1 telecoms, healthcare systems and financial institutions means we understand the constraints that generic advisory never sees. We do not arrive with borrowed frameworks — we bring patterns from inside the same operating models you are trying to transform.",
  },
  {
    number: "02",
    icon: GitMerge,
    title: "Business-First, Technology-Second",
    accentColor: "#05aff2",
    body: "Technology decisions made without business clarity create debt, not progress. We diagnose the business problem first — then design the architecture and select the technology that solves it. The result is transformation that holds under pressure and delivers measurable returns.",
  },
  {
    number: "03",
    icon: Zap,
    title: "We Stay Through Delivery",
    accentColor: "#3d5ad9",
    body: "Most advisory firms hand over a roadmap and move on. We do not. We sit inside your delivery programme, govern your vendor relationships and stay until the outcome is secured. The engagement ends when the results are real — not when the document is signed.",
  },
];

export default function WhoWeArePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="pt-32 pb-28 bg-[#0c1945] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse 65% 70% at 25% 65%, #3d5ad9, transparent)" }}
        />
        {/* Watermark */}
        <div
          className="absolute right-0 bottom-0 font-heading font-bold select-none pointer-events-none text-right leading-[0.88]"
          style={{ fontSize: "clamp(5rem, 16vw, 15rem)", color: "rgba(255,255,255,0.03)" }}
          aria-hidden
        >
          NORTH
          <br />GATE
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#05aff2] mb-6">
              Who We Are
            </span>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1
              className="font-heading font-bold text-white leading-[1.04] mb-8"
              style={{ fontSize: "clamp(2.8rem, 6.5vw, 6.5rem)", letterSpacing: "-0.033em" }}
            >
              Built for
              <br />
              <span className="text-gradient-amber">Strength.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.22}>
            <p className="font-body text-white/55 max-w-xl leading-relaxed text-lg">
              In ancient architecture, the north gate was built to be a city&apos;s most resilient structure — designed to withstand the elements and protect what lay within.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Our Story ─────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Pull quote — full width */}
          <FadeUp className="mb-20">
            <div className="border-l-[3px] border-[#05aff2] pl-8 sm:pl-12 max-w-4xl">
              <p
                className="font-heading font-light text-[#0c1945] leading-snug"
                style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.4rem)", letterSpacing: "-0.015em" }}
              >
                &ldquo;Most consulting firms disappear when the strategy document is done. We built Northgate for the leaders who need someone to stay through the hard part.&rdquo;
              </p>
              <p className="mt-5 font-body text-sm font-semibold text-[#3d5ad9] tracking-[0.05em]">
                — Gaurav Sharma, Founder
              </p>
            </div>
          </FadeUp>

          {/* 2-col: body + image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeUp>
              <div>
                <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#3d5ad9] mb-6">
                  Our Story
                </span>
                <h2
                  className="font-heading font-bold text-[#0c1945] mb-8 leading-tight"
                  style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", letterSpacing: "-0.02em" }}
                >
                  The philosophy behind<br />the practice.
                </h2>
                <div className="space-y-5 font-body text-[#334155]/70 leading-[1.85] text-base">
                  <FadeUp delay={0.1}>
                    <p>
                      Northgate was built from a single conviction. After two decades inside the world&apos;s most complex telecom, healthcare and fintech transformations, one truth became clear: the firms that shape strategy rarely stay to secure the outcome. The gap between a brilliant plan and measurable results is where most transformations fail.
                    </p>
                  </FadeUp>
                  <FadeUp delay={0.2}>
                    <p>
                      We built Northgate to own that gap. We are a boutique advisory practice that brings genuine operator experience — not borrowed frameworks — to the problems that actually stall enterprise growth. We engage at board level, design for execution and stay through delivery.
                    </p>
                  </FadeUp>
                  <FadeUp delay={0.25}>
                    <p>
                      Our practice is deliberately narrow. Telecom, Healthcare and Fintech. Three sectors we know from the inside. That depth is not a limitation — it is the reason our clients trust us with their most critical transformations.
                    </p>
                  </FadeUp>
                  <FadeUp delay={0.3}>
                    <Link
                      href="/founder/index.html"
                      className="inline-flex items-center gap-2 mt-4 font-body text-sm font-semibold text-[#3d5ad9] hover:gap-3 transition-all"
                    >
                      Meet the Founder <ArrowRight size={14} />
                    </Link>
                  </FadeUp>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-[0_12px_48px_rgba(12,25,69,0.14)]">
                <Image
                  src="/images/Overview.jpg"
                  alt="Northgate — Built for Strength"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Differentiators ───────────────────────────────────────── */}
      <section className="bg-[#030611]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <FadeUp>
            <div className="pt-20 pb-14 border-b border-white/[0.07]">
              <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#05aff2] mb-4">
                What Sets Us Apart
              </span>
              <h2
                className="font-heading font-bold text-white"
                style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)", letterSpacing: "-0.022em" }}
              >
                Three pillars of our practice.
              </h2>
            </div>
          </FadeUp>

          {/* Editorial rows */}
          {differentiators.map((d, i) => {
            const Icon = d.icon;
            const isLast = i === differentiators.length - 1;
            return (
              <FadeUp key={d.title} delay={i * 0.12}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 py-16 group cursor-default ${
                    isLast ? "pb-24" : "border-b border-white/[0.07]"
                  }`}
                >
                  {/* Left: number + icon + title */}
                  <div className="flex gap-5 items-start">
                    <span
                      className="font-mono text-xs font-bold shrink-0 mt-1.5 tabular-nums"
                      style={{ color: d.accentColor }}
                    >
                      {d.number}
                    </span>
                    <div>
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `${d.accentColor}18`,
                          border: `1px solid ${d.accentColor}30`,
                        }}
                      >
                        <Icon size={20} style={{ color: d.accentColor }} />
                      </div>
                      <h3
                        className="font-heading font-bold text-white transition-colors duration-300 group-hover:text-[#05aff2]"
                        style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)", letterSpacing: "-0.02em" }}
                      >
                        {d.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right: body */}
                  <div className="lg:pt-[4.5rem]">
                    <p className="font-body text-white/45 leading-[1.85] text-base transition-colors duration-300 group-hover:text-white/70">
                      {d.body}
                    </p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#0c1945] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, #3d5ad9, transparent)" }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">

          {/* Trio tagline */}
          <FadeUp>
            <p
              className="font-heading font-light text-white/75 mb-8"
              style={{ fontSize: "clamp(1.35rem, 2.4vw, 2rem)", letterSpacing: "-0.01em" }}
            >
              Reliable<span style={{ color: "#05aff2" }}>.</span>
              {" "}Resilient<span style={{ color: "#05aff2" }}>.</span>
              {" "}Resolute<span style={{ color: "#05aff2" }}>.</span>
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2
              className="font-heading font-bold text-white mb-5 leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3.8vw, 3.2rem)", letterSpacing: "-0.028em" }}
            >
              Fortifying Operations.
              <br />Securing Growth.
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="font-body text-white/45 text-lg mb-12 leading-relaxed max-w-lg mx-auto">
              If you have a transformation that cannot afford to fail, let us talk. No pitch decks, no junior teams. Just a direct conversation about your challenge.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#3d5ad9] text-white font-heading font-semibold text-base hover:bg-[#2f4bbf] transition-colors duration-200 shadow-lg"
              >
                Start a Conversation <ArrowRight size={17} />
              </Link>
              <Link
                href="/what-we-do"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/15 text-white/60 font-heading font-medium text-base hover:text-white hover:border-white/30 transition-all"
              >
                See Our Approach
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
