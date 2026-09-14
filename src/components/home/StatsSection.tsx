"use client";

import { CountUp, FadeUp } from "@/components/shared/AnimatedText";

const stats = [
  { value: 20,  suffix: "+", label: "Years of Telecom Expertise",       desc: "Deep domain knowledge across BSS, OSS, and digital platforms" },
  { value: 50,  suffix: "+", label: "Operators & Enterprises Served",   desc: "Tier 1–3 telecoms, MVNOs, and enterprise clients globally" },
  { value: 100, suffix: "+", label: "Transformation Projects Delivered", desc: "End-to-end advisory through strategy, architecture, and delivery" },
  { value: 15,  suffix: "+", label: "Countries of Engagement",          desc: "Middle East, South Asia, Africa, and Southeast Asia" },
];

export default function StatsSection() {
  return (
    <section className="bg-[#0c1945] py-20 md:py-24 relative overflow-hidden">
      {/* Decorative amber line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#05aff2] to-transparent opacity-60" />

      {/* Subtle background glow */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, #3d5ad9, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.1} className="flex flex-col items-start">
              {/* Big number */}
              <div
                className="font-heading font-bold text-white mb-1 leading-none"
                style={{ fontSize: "clamp(2.5rem, 4vw, 4.5rem)" }}
              >
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <div className="w-8 h-[3px] bg-[#05aff2] rounded-full mb-3" />
              <p className="font-heading font-semibold text-sm text-white/85 mb-1.5 leading-snug">
                {s.label}
              </p>
              <p className="font-body text-xs text-white/40 leading-relaxed hidden md:block">
                {s.desc}
              </p>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
