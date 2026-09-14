import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";

export default function IntelligenceSection() {
  return (
    <section className="bg-ink px-[clamp(24px,5vw,72px)] py-[clamp(56px,7vw,110px)]">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <div className="mb-[clamp(40px,5vw,64px)] flex flex-wrap items-end justify-between gap-10">
            <div className="max-w-[680px]">
              <div className="mb-[22px] flex items-center gap-2.5 font-mono text-[12.5px] tracking-[0.26em] text-cyan">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan shadow-[0_0_12px_#05aff2]" />
                ACTIVE INTELLIGENCE
              </div>
              <h2
                className="m-0 mb-[22px] max-w-[15ch] text-balance font-display font-extrabold leading-[1.02] tracking-[-0.03em] text-white"
                style={{ fontSize: "clamp(32px,4.6vw,60px)" }}
              >
                What is moving
                <br />
                <span className="text-cyan">in your market right now.</span>
              </h2>
              <p
                className="m-0 max-w-[600px] leading-[1.65] text-mute"
                style={{ fontSize: "clamp(15.5px,1.15vw,18px)" }}
              >
                We track the signals most firms miss &mdash; regulatory shifts,
                architectural pivots, competitive moves &mdash; and translate them into
                operational implications for your business.
              </p>
            </div>
            <Link
              href="/our-thinking/industry-signals"
              className="flex items-center gap-2.5 whitespace-nowrap rounded-full border-[1.5px] border-white/20 px-[26px] py-3.5 font-display font-semibold text-white transition hover:border-cyan/60 hover:bg-cyan/10"
              style={{ fontSize: "15.5px" }}
            >
              View all active signals <ArrowRight size={17} />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid auto-rows-auto grid-cols-1 gap-[22px] lg:grid-cols-[1.32fr_1fr]">

            {/* Featured — Telecom */}
            <Link
              href="/our-thinking/industry-signals"
              className="group flex flex-col overflow-hidden rounded-[20px] border border-white/[0.09] bg-panel no-underline transition duration-300 hover:-translate-y-1 hover:border-blue/50 hover:shadow-[0_26px_60px_rgba(0,0,0,0.45)] lg:row-span-2"
            >
              <div
                className="relative overflow-hidden"
                style={{ height: "clamp(240px,26vw,360px)" }}
              >
                <Image
                  src="/images/signal-telecom.jpg"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover"
                  alt="Telecom network infrastructure representing API monetisation signals"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(130% 120% at 22% 18%,rgba(120,160,255,0.55),transparent 56%),linear-gradient(150deg,rgba(40,67,168,0.75),rgba(11,23,64,0.85))",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)",
                    backgroundSize: "46px 46px",
                  }}
                />
                <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-[70%] w-full opacity-55">
                  <path d="M0,160 C90,150 120,80 200,90 C280,100 320,40 400,30" fill="none" stroke="#9fc4ff" strokeWidth="2.5" />
                  <path d="M0,185 C100,180 150,120 230,128 C310,136 350,90 400,78" fill="none" stroke="rgba(5,175,242,0.8)" strokeWidth="2" />
                </svg>
                <div className="absolute left-[22px] top-[22px] inline-flex items-center gap-2.5 rounded-full border border-[#7896ff]/40 bg-ink/55 px-[15px] py-2 backdrop-blur-[6px]">
                  <span className="h-[7px] w-[7px] rounded-full bg-telecom shadow-[0_0_10px_#6f8bff]" />
                  <span className="font-mono text-[11px] tracking-[0.2em] text-[#bcccff]">
                    TELECOM &middot; FEATURED SIGNAL
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-[clamp(26px,2.4vw,38px)]">
                <h3
                  className="m-0 mb-4 max-w-[20ch] text-balance font-display font-extrabold leading-[1.12] tracking-[-0.02em] text-white"
                  style={{ fontSize: "clamp(24px,2.5vw,34px)" }}
                >
                  API monetisation: operators are announcing programmes, not
                  revenue.
                </h3>
                <p
                  className="m-0 mb-[26px] max-w-[52ch] leading-[1.62] text-mute"
                  style={{ fontSize: "clamp(15px,1.1vw,17px)" }}
                >
                  The architectural decisions that determine success are being
                  deferred. Most operators have named an API strategy &mdash; very few
                  have built the integration infrastructure to make it generate
                  returns. The window to lead, rather than follow, is measured in
                  quarters.
                </p>
                <span className="mt-auto inline-flex items-center gap-2.5 font-bold text-telecom" style={{ fontSize: "15.5px" }}>
                  Read the full signal <ArrowRight size={17} />
                </span>
              </div>
            </Link>

            {/* Healthcare */}
            <Link
              href="/our-thinking/industry-signals"
              className="flex overflow-hidden rounded-[20px] border border-white/[0.09] bg-panel no-underline transition duration-300 hover:-translate-y-1 hover:border-healthcare/50 hover:shadow-[0_22px_50px_rgba(0,0,0,0.4)]"
            >
              <div className="relative w-[38%] min-w-[130px] flex-none overflow-hidden">
                <Image
                  src="/images/signal-healthcare.jpg"
                  fill
                  sizes="20vw"
                  className="object-cover"
                  alt="Healthcare technology representing FHIR interoperability signals"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(130% 120% at 30% 20%,rgba(52,216,166,0.55),transparent 58%),linear-gradient(150deg,rgba(15,107,80,0.75),rgba(10,26,48,0.85))",
                  }}
                />
                <svg viewBox="0 0 120 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-60">
                  <path d="M-5,120 H30 L42 96 L58 138 L72 110 H125" fill="none" stroke="#7df2cc" strokeWidth="2.5" />
                </svg>
                <span className="absolute left-4 top-4 rounded-full bg-ink/50 px-2.5 py-[5px] font-mono text-[10px] tracking-[0.18em] text-[#a8f0d6]">
                  HEALTHCARE
                </span>
              </div>
              <div className="flex flex-col p-[clamp(20px,1.6vw,28px)]">
                <h3
                  className="m-0 mb-3 text-balance font-display font-bold leading-[1.22] text-white"
                  style={{ fontSize: "clamp(18px,1.4vw,21px)" }}
                >
                  FHIR mandates are arriving faster than integration budgets.
                </h3>
                <p className="m-0 mb-[18px] leading-[1.55] text-mute" style={{ fontSize: "14.5px" }}>
                  Regulatory timelines are set; architecture decisions are not.
                  The gap between compliance on paper and interoperability in
                  practice is widening.
                </p>
                <span className="mt-auto inline-flex items-center gap-2 font-bold text-healthcare" style={{ fontSize: "14.5px" }}>
                  Read the signal <ArrowRight size={16} />
                </span>
              </div>
            </Link>

            {/* Fintech */}
            <Link
              href="/our-thinking/industry-signals"
              className="flex overflow-hidden rounded-[20px] border border-white/[0.09] bg-panel no-underline transition duration-300 hover:-translate-y-1 hover:border-fintech/[0.55] hover:shadow-[0_22px_50px_rgba(0,0,0,0.4)]"
            >
              <div className="relative w-[38%] min-w-[130px] flex-none overflow-hidden">
                <Image
                  src="/images/signal-fintech.jpg"
                  fill
                  sizes="20vw"
                  className="object-cover"
                  alt="Fintech infrastructure representing stablecoin settlement signals"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(130% 120% at 30% 20%,rgba(167,139,250,0.55),transparent 58%),linear-gradient(150deg,rgba(76,44,147,0.75),rgba(21,15,51,0.85))",
                  }}
                />
                <svg viewBox="0 0 120 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-55">
                  <path d="M-5,150 C25,150 30,80 55,82 C80,84 85,120 125,108" fill="none" stroke="#c9b3ff" strokeWidth="2.5" />
                  <circle cx="55" cy="82" r="3.5" fill="#c9b3ff" />
                </svg>
                <span className="absolute left-4 top-4 rounded-full bg-ink/50 px-2.5 py-[5px] font-mono text-[10px] tracking-[0.18em] text-[#d3c4ff]">
                  FINTECH
                </span>
              </div>
              <div className="flex flex-col p-[clamp(20px,1.6vw,28px)]">
                <h3
                  className="m-0 mb-3 text-balance font-display font-bold leading-[1.22] text-white"
                  style={{ fontSize: "clamp(18px,1.4vw,21px)" }}
                >
                  Stablecoin rails are reaching production faster than risk teams
                  can model them.
                </h3>
                <p className="m-0 mb-[18px] leading-[1.55] text-mute" style={{ fontSize: "14.5px" }}>
                  Settlement is moving on-chain in live corridors. The controls,
                  reconciliation, and capital treatment are still being
                  retrofitted around it.
                </p>
                <span className="mt-auto inline-flex items-center gap-2 font-bold text-fintech" style={{ fontSize: "14.5px" }}>
                  Read the signal <ArrowRight size={16} />
                </span>
              </div>
            </Link>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
