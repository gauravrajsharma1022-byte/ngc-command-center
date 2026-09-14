import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { PHASES } from "@/lib/content";

export default function MethodSection() {
  return (
    <section
      id="engage"
      className="relative overflow-hidden bg-panel px-[clamp(24px,5vw,72px)] py-[clamp(56px,7vw,110px)]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="relative mx-auto max-w-[1240px]">
        <Reveal>
          <div className="mb-[clamp(44px,5vw,68px)] flex flex-wrap items-end justify-between gap-10">
            <div className="max-w-[680px]">
              <div className="mb-[22px] font-mono text-[12.5px] tracking-[0.26em] text-cyan">
                &mdash; HOW WE ENGAGE
              </div>
              <h2
                className="m-0 mb-[22px] text-balance font-display font-extrabold leading-none tracking-[-0.03em] text-white"
                style={{ fontSize: "clamp(34px,5vw,66px)" }}
              >
                Four phases.
                <br />
                <span className="text-cyan">No wasted motion.</span>
              </h2>
              <p
                className="m-0 max-w-[560px] leading-[1.65] text-mute"
                style={{ fontSize: "clamp(15.5px,1.15vw,18px)" }}
              >
                Most firms hand you a report. We hand you a running system &mdash; with
                principals present at every stage, not just the kickoff and the
                final slide.
              </p>
            </div>
            <Link
              href="/what-we-do"
              className="flex items-center gap-2.5 whitespace-nowrap rounded-full border-[1.5px] border-white/20 px-[26px] py-3.5 font-display font-semibold text-white transition hover:border-cyan/60 hover:bg-cyan/10"
              style={{ fontSize: "15.5px" }}
            >
              Explore our practice areas <ArrowRight size={17} />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 border-t border-white/[0.12] sm:grid-cols-2 lg:grid-cols-4">
            {PHASES.map((phase, i) => (
              <div
                key={phase.n}
                className={`relative px-[clamp(20px,2vw,32px)] pb-10 pt-9 ${
                  i < PHASES.length - 1 ? "lg:border-r lg:border-white/[0.12]" : ""
                }`}
              >
                <span className="pointer-events-none absolute bottom-2 right-3.5 font-display font-extrabold leading-none text-white/[0.035]" style={{ fontSize: "90px" }}>
                  {phase.n}
                </span>
                <div className="mb-[30px] flex items-center gap-2.5">
                  <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] border-cyan font-display font-bold text-cyan" style={{ fontSize: "14px" }}>
                    {i + 1}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.22em] text-mute-deep">
                    PHASE {phase.n}
                  </span>
                </div>
                <h3 className="m-0 mb-4 font-display font-bold text-white" style={{ fontSize: "26px" }}>
                  {phase.title}
                </h3>
                <div className="mb-[18px] h-0.5 w-[34px] bg-blue" />
                <p className="m-0 leading-[1.6] text-mute" style={{ fontSize: "15px" }}>
                  {phase.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <p className="m-0 mt-[clamp(36px,4vw,56px)] text-center italic text-mute-deep" style={{ fontSize: "15px" }}>
          Northgate principals have operated on both sides of these engagements &mdash;
          as operators, as architects, as programme directors. We translate
          experience, not theory.
        </p>
      </div>
    </section>
  );
}
