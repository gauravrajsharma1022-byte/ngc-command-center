import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, Key, Target, Rocket, Anchor } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedText";

export const metadata: Metadata = {
  title: "Mission, Vision & Values",
  description: "The principles that guide every Northgate engagement — radical transparency, true ownership, and delivery above all.",
};

const values = [
  {
    number: "01",
    icon: Eye,
    title: "Truth Before Comfort",
    belief: "We will always tell you what you need to hear, not what you want to hear.",
    body: "In large consulting firms, truth is routinely sanitised to protect the account. At Northgate, we believe that honest, unvarnished assessment — however uncomfortable — is the only foundation resilient enterprise systems can be built on. We will never soften a critical finding to preserve the engagement. We are here to protect your business, not our billing cycle.",
    accentColor: "#05aff2",
  },
  {
    number: "02",
    icon: Key,
    title: "Ownership, Not Assignment",
    belief: "We treat your business as if our name is on the door.",
    body: "We do not lend out minds and move on. When Northgate engages, we take genuine ownership of outcomes — investing in your bottom-line success as deeply as you do. Your risks are our risks. Your milestones are our milestones. We stay until the work is irreversibly done.",
    accentColor: "#3d5ad9",
  },
  {
    number: "03",
    icon: Target,
    title: "Mastery Over Market Share",
    belief: "We go deep, not wide.",
    body: "We deliberately anchor ourselves in three high-complexity, high-regulation verticals — Telecom, Healthcare and Fintech. This is not a constraint; it is a conviction. Deep domain expertise is not transferable across every sector and we refuse to dilute ours chasing a broader pipeline. When you engage Northgate, you are engaging practitioners who have lived inside your industry's hardest problems.",
    accentColor: "#05aff2",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Delivery Above Declarations",
    belief: "We do not sell slides. We secure outcomes.",
    body: "Northgate was built as a direct response to the consulting industry’s most chronic failure: brilliant strategy that dies in implementation. We only engage where we can take architectural ownership, drive structural alignment, and produce measurable, bottom-line results. Theoretical advice is someone else’s business model. Ours is execution.",
    accentColor: "#3d5ad9",
  },
  {
    number: "05",
    icon: Anchor,
    title: "Integrity as Infrastructure",
    belief: "Our word is our architecture.",
    body: "Transparency, reliability and ethical conduct are not marketing values at Northgate — they are operational principles, embedded into every engagement from scoping through delivery. We believe the enterprise systems built to last are the ones built on complete trust. The same applies to every consulting relationship we enter.",
    accentColor: "#05aff2",
  },
];

const visionPillars = [
  {
    label: "Elite Boutique",
    body: "Not the biggest — the most trusted. We measure success by reputation, not headcount.",
  },
  {
    label: "Boardroom Reach",
    body: "The first name reached for when a must-win transformation cannot afford to fail.",
  },
  {
    label: "Guaranteed Success",
    body: "Unshakeable reliability and domain mastery that makes client success inevitable.",
  },
];

const domains = [
  { name: "Telecom", index: "01" },
  { name: "Healthcare", index: "02" },
  { name: "Fintech", index: "03" },
];

export default function OurValuesPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="pt-36 pb-32 bg-[#030611] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{ background: "radial-gradient(ellipse 60% 55% at 30% 60%, #3d5ad9, transparent)" }}
        />
        <div
          className="absolute right-[-2%] bottom-0 font-heading font-black select-none pointer-events-none leading-[0.85]"
          style={{ fontSize: "clamp(6rem, 18vw, 18rem)", color: "rgba(255,255,255,0.025)" }}
          aria-hidden
        >
          PRIN
          <br />CIPLE
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-flex items-center gap-3 font-body text-xs font-semibold tracking-[0.18em] uppercase text-[#05aff2] mb-8">
              Mission <span className="opacity-40">&middot;</span> Vision <span className="opacity-40">&middot;</span> Values
            </span>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1
              className="font-heading font-bold text-white leading-[1.02] mb-8"
              style={{ fontSize: "clamp(3rem, 7vw, 7.5rem)", letterSpacing: "-0.036em" }}
            >
              The Principles
              <br />
              <span className="text-gradient-amber">That Do Not Bend.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.22}>
            <p className="font-body text-white/50 max-w-lg leading-relaxed text-lg">
              Every engagement we take on is governed by five beliefs &mdash; not aspirations pinned to a wall, but operating principles that determine how we work, what we accept and what we refuse.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeUp className="mb-20">
            <div className="border-l-[3px] border-[#05aff2] pl-8 sm:pl-12 max-w-4xl">
              <p
                className="font-heading font-light text-[#0c1945] leading-snug"
                style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.4rem)", letterSpacing: "-0.015em" }}
              >
                &ldquo;We exist for the enterprise leader who has run out of patience for consulting theatre.&rdquo;
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeUp>
              <div>
                <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#3d5ad9] mb-6">
                  Our Mission
                </span>
                <h2
                  className="font-heading font-bold text-[#0c1945] mb-8 leading-tight"
                  style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)", letterSpacing: "-0.02em" }}
                >
                  Purpose in
                  <br />plain language.
                </h2>
                <div className="space-y-5 font-body text-[#334155]/70 leading-[1.85] text-base">
                  <p>
                    Northgate partners with CXOs at the exact friction point where transformation stalls &mdash; where a multimillion-dollar roadmap collides with legacy complexity, organisational inertia, or the absence of a partner willing to speak the unfiltered truth.
                  </p>
                  <p>
                    Our mandate is singular: architectural clarity, radical honesty and secured delivery &mdash; in Telecom, Healthcare and Fintech &mdash; where the stakes are too high to settle for anything less.
                  </p>
                  <p>
                    These leaders do not need another massive firm to sell them more slides. They need a trusted partner to fix the framework and secure delivery. That is what Northgate exists to do.
                  </p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="lg:pt-16">
                <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#3d5ad9] mb-6">
                  Domain Focus
                </span>
                <div className="space-y-3">
                  {domains.map((d) => (
                    <div
                      key={d.name}
                      className="flex items-center gap-5 p-5 rounded-2xl border border-[#E2E8F0] group hover:border-[#05aff2]/40 hover:bg-[#05aff2]/[0.03] transition-all duration-300"
                    >
                      <span className="font-mono text-xs font-bold tabular-nums text-[#05aff2]/50 shrink-0">
                        {d.index}
                      </span>
                      <span className="font-heading font-semibold text-[#0c1945] text-base group-hover:text-[#3d5ad9] transition-colors">
                        {d.name}
                      </span>
                      <span className="ml-auto font-body text-xs text-[#334155]/40 group-hover:text-[#334155]/60 transition-colors hidden sm:block whitespace-nowrap">
                        High-complexity &amp; high-regulation
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-8 font-body text-sm text-[#334155]/50 leading-relaxed">
                  We do not pretend to be sector-agnostic. True resilience requires deep domain expertise &mdash; and that is what we bring.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Vision ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-36 bg-[#0c1945]">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(ellipse 70% 80% at 50% 50%, #3d5ad9, transparent)" }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-black select-none pointer-events-none text-center leading-[0.88] whitespace-nowrap"
          style={{ fontSize: "clamp(6rem, 20vw, 22rem)", color: "rgba(255,255,255,0.025)" }}
          aria-hidden
        >
          VISION
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <FadeUp>
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.18em] uppercase text-[#05aff2] mb-10">
              The Long Game
            </span>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2
              className="font-heading font-bold text-white leading-[1.06] mb-10"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)", letterSpacing: "-0.03em" }}
            >
              To become the global benchmark
              <br />for{" "}
              <span className="text-gradient-amber">high-integrity</span>
              {" "}enterprise transformation.
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="font-body text-white/50 text-xl leading-relaxed max-w-3xl mx-auto mb-16">
              Not the largest firm. The most respected. When a global enterprise faces a must-win digital pivot, we intend to be the first name its board reaches for.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.08] rounded-2xl overflow-hidden">
              {visionPillars.map((p) => (
                <div
                  key={p.label}
                  className="bg-[#0c1945]/90 px-8 py-10 text-left hover:bg-[#0c1945]/70 transition-colors duration-300"
                >
                  <h3 className="font-heading font-semibold text-white text-base mb-3">{p.label}</h3>
                  <p className="font-body text-white/45 text-sm leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────── */}
      <section className="bg-[#030611]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeUp>
            <div className="pt-20 pb-14 border-b border-white/[0.07]">
              <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#05aff2] mb-4">
                What We Stand By
              </span>
              <h2
                className="font-heading font-bold text-white"
                style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)", letterSpacing: "-0.022em" }}
              >
                Five principles. No exceptions.
              </h2>
            </div>
          </FadeUp>

          {values.map((v, i) => {
            const Icon = v.icon;
            const isLast = i === values.length - 1;
            return (
              <FadeUp key={v.title} delay={i * 0.08}>
                <div
                  className={`relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 py-20 group cursor-default overflow-hidden ${
                    isLast ? "pb-28" : "border-b border-white/[0.06]"
                  }`}
                >
                  {/* Giant watermark number */}
                  <span
                    className="absolute right-0 top-1/2 -translate-y-1/2 font-heading font-black select-none pointer-events-none tabular-nums transition-opacity duration-700 opacity-[0.04] group-hover:opacity-[0.09]"
                    style={{ fontSize: "clamp(8rem, 15vw, 13rem)", color: v.accentColor, lineHeight: 1 }}
                    aria-hidden
                  >
                    {v.number}
                  </span>

                  {/* Left: number badge + icon + title + belief */}
                  <div className="flex gap-5 items-start relative z-10">
                    <span
                      className="font-mono text-xs font-bold shrink-0 mt-1.5 tabular-nums"
                      style={{ color: v.accentColor }}
                    >
                      {v.number}
                    </span>
                    <div>
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `${v.accentColor}18`,
                          border: `1px solid ${v.accentColor}30`,
                        }}
                      >
                        <Icon size={20} style={{ color: v.accentColor }} />
                      </div>
                      <h3
                        className="font-heading font-bold text-white mb-4 transition-colors duration-300 group-hover:text-[#05aff2]"
                        style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)", letterSpacing: "-0.02em" }}
                      >
                        {v.title}
                      </h3>
                      <p className="font-body text-sm italic text-white/35 leading-relaxed transition-colors duration-300 group-hover:text-white/60 max-w-xs">
                        &ldquo;{v.belief}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Right: body */}
                  <div className="lg:pt-[5rem] relative z-10">
                    <p className="font-body text-white/40 leading-[1.9] text-base transition-colors duration-300 group-hover:text-white/65">
                      {v.body}
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
          style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, #3d5ad9, transparent)" }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">

          <FadeUp>
            <p
              className="font-heading font-light text-white/70 mb-6"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
            >
              Talk is cheap. So are slides.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2
              className="font-heading font-bold text-white mb-5 leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3.8vw, 3.2rem)", letterSpacing: "-0.028em" }}
            >
              Let us prove these principles
              <br />to you &mdash; in practice.
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="font-body text-white/45 text-lg mb-12 leading-relaxed max-w-lg mx-auto">
              Start a conversation. See firsthand what it means to work with a partner who takes genuine ownership.
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
