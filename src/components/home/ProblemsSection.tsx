"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SECTORS, type SectorKey } from "@/lib/content";

export default function ProblemsSection() {
  const [active, setActive] = useState<SectorKey>("telecom");
  const sector = SECTORS.find((s) => s.key === active)!;

  return (
    <section className="bg-ink px-[clamp(24px,5vw,72px)] py-[clamp(56px,7vw,110px)]">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-[22px] font-mono text-[12.5px] tracking-[0.26em] text-cyan">
          &mdash; THE PROBLEMS THAT MATTER
        </div>
        <h2
          className="m-0 mb-[22px] max-w-[20ch] text-balance font-display font-extrabold leading-none tracking-[-0.03em] text-white"
          style={{ fontSize: "clamp(34px,5vw,66px)" }}
        >
          Every sector has a sticking point.
          <br />
          <span className="text-cyan">These are the ones we work on.</span>
        </h2>
        <p
          className="m-0 mb-[clamp(34px,4vw,48px)] max-w-[620px] leading-[1.65] text-mute"
          style={{ fontSize: "clamp(15.5px,1.15vw,18px)" }}
        >
          We do not arrive with a methodology and a template. We arrive with a
          diagnosis &mdash; built from years inside the rooms where these decisions get
          made.
        </p>

        {/* Sector tabs */}
        <div className="mb-[clamp(34px,4vw,48px)] max-w-full overflow-x-auto">
        <div className="inline-flex min-w-max gap-1 rounded-full border border-white/[0.08] bg-white/5 p-[5px]">
          {SECTORS.map((s) => {
            const on = s.key === active;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setActive(s.key)}
                className={`rounded-full px-[26px] py-[11px] font-display font-semibold transition ${
                  on
                    ? "bg-blue text-white shadow-[0_6px_18px_rgba(61,90,217,0.4)]"
                    : "bg-transparent text-mute hover:text-white"
                }`}
                style={{ fontSize: "15px" }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {sector.cards.map((c, i) => (
              <motion.div
                key={`${active}-${c.n}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-[18px] border border-white/[0.09] p-[34px]"
                style={{
                  background: "linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0))",
                }}
              >
                <div
                  className="mb-[26px] h-[3px] w-[54px] rounded-[3px]"
                  style={{ background: sector.accent }}
                />
                <div
                  className="mb-[18px] font-mono text-[13px] tracking-[0.18em]"
                  style={{ color: sector.accent }}
                >
                  {c.n}
                </div>
                <h3
                  className="m-0 mb-[18px] text-balance font-display font-bold leading-[1.25] text-white"
                  style={{ fontSize: "clamp(19px,1.5vw,22px)" }}
                >
                  {c.title}
                </h3>
                <p className="m-0 mb-[26px] leading-[1.62] text-mute" style={{ fontSize: "15px" }}>
                  {c.body}
                </p>
                <Link
                  href={c.href}
                  className="inline-flex items-center gap-2 font-display font-bold"
                  style={{ color: sector.accent, fontSize: "14.5px" }}
                >
                  How we address this <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-[clamp(40px,5vw,60px)] flex flex-wrap items-center justify-between gap-[30px] border-t border-white/10 pt-[clamp(32px,4vw,44px)]">
          <span className="text-mute" style={{ fontSize: "clamp(16px,1.3vw,20px)" }}>
            Recognise your challenge? We should talk.
          </span>
          <Link
            href="/contact"
            className="flex items-center gap-2.5 rounded-full bg-blue px-[30px] py-[15px] font-display font-bold text-white shadow-[0_10px_30px_rgba(61,90,217,0.4)] transition hover:-translate-y-0.5"
            style={{ fontSize: "16px" }}
          >
            Start a conversation <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
