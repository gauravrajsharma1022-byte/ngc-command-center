"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  Zap,
  ChevronDown,
} from "lucide-react";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";

const accent = "#05aff2";
const accentBlue = "#3d5ad9";

// ─── Hero data streams (deterministic — no hydration mismatch) ───────────
const STREAMS = [
  { top: 9,  width: 42, opacity: 0.07, duration: 8.2, delay: 0 },
  { top: 17, width: 26, opacity: 0.10, duration: 6.0, delay: 1.6 },
  { top: 27, width: 58, opacity: 0.13, duration: 4.8, delay: 0.8 },
  { top: 38, width: 33, opacity: 0.08, duration: 7.6, delay: 2.4 },
  { top: 50, width: 65, opacity: 0.15, duration: 4.3, delay: 0.3 },
  { top: 61, width: 29, opacity: 0.07, duration: 9.1, delay: 3.2 },
  { top: 71, width: 47, opacity: 0.11, duration: 6.4, delay: 1.1 },
  { top: 81, width: 39, opacity: 0.10, duration: 6.9, delay: 2.9 },
  { top: 91, width: 21, opacity: 0.06, duration: 10.0, delay: 0.5 },
];

// ─── Domain Intelligence ─────────────────────────────────────────────────
type DomainKey = "telecom" | "healthcare" | "fintech";

interface DomainPart {
  phase: string;
  phaseColor: string;
  Icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  body: string;
  quote?: string;
}

interface Domain {
  label: string;
  sub: string;
  domainColor: string;
  parts: DomainPart[];
}

const DOMAINS: Record<DomainKey, Domain> = {
  telecom: {
    label: "Telecommunications",
    sub: "The Cognitive Infrastructure",
    domainColor: accentBlue,
    parts: [
      {
        phase: "Current Friction",
        phaseColor: "#f59e0b",
        Icon: AlertCircle,
        body: "Operators are drowning in network data complexity, using basic automation that only patches legacy bottlenecks instead of fixing them. The result is a network that reacts rather than anticipates.",
      },
      {
        phase: "Horizon Shift",
        phaseColor: accentBlue,
        Icon: TrendingUp,
        body: "The transition from traditional network operations to Autonomous, Intent-Based Networks. Generative AI will allow network architects to allocate bandwidth and self-heal outages in real-time using natural language commands.",
      },
      {
        phase: "Northgate Execution",
        phaseColor: accent,
        Icon: Zap,
        body: "We help telcos move away from legacy vendor lock-in by architecting decoupled, API-first integration meshes that allow open AI models to orchestrate network resources securely.",
        quote: "We help telcos move away from legacy vendor lock-in by architecting decoupled, API-first integration meshes.",
      },
    ],
  },
  healthcare: {
    label: "Healthcare",
    sub: "Precision Operations & Clinical Velocity",
    domainColor: "#10b981",
    parts: [
      {
        phase: "Current Friction",
        phaseColor: "#f59e0b",
        Icon: AlertCircle,
        body: "AI initiatives in healthcare are heavily stalled by fragmented data silos, strict compliance guardrails, and extreme clinician burnout from poorly designed software interfaces.",
      },
      {
        phase: "Horizon Shift",
        phaseColor: accentBlue,
        Icon: TrendingUp,
        body: "Localised, Sovereign Clinical Models. Hospitals will deploy highly specialised, small language models hosted on-premise to automate diagnostic workflows and patient synthesis securely — without public cloud exposure.",
      },
      {
        phase: "Northgate Execution",
        phaseColor: accent,
        Icon: Zap,
        body: "We map your operational workflows using APQC standards to safely embed AI enablers directly into clinical pathways, reducing administrative load while ensuring absolute data sovereignty.",
        quote: "We map operational workflows using APQC standards to safely embed AI enablers directly into clinical pathways.",
      },
    ],
  },
  fintech: {
    label: "Fintech",
    sub: "Hyper-Personalisation & Predictive Risk",
    domainColor: "#8b5cf6",
    parts: [
      {
        phase: "Current Friction",
        phaseColor: "#f59e0b",
        Icon: AlertCircle,
        body: "Traditional financial institutions are using AI reactively for fraud detection, missing out on real-time capital deployment and hyper-personalised customer asset allocation.",
      },
      {
        phase: "Horizon Shift",
        phaseColor: accentBlue,
        Icon: TrendingUp,
        body: "Autonomous Financial Agents. The shift from static banking apps to proactive, AI-driven agents that automatically manage corporate cash flows, optimise tax positioning, and hedge market risks in real-time based on live macro-data streams.",
      },
      {
        phase: "Northgate Execution",
        phaseColor: accent,
        Icon: Zap,
        body: "We design custom enterprise playbooks that allow financial institutions to modernise core legacy systems, enabling real-time data streaming that powers safe, agentic financial workflows.",
        quote: "We design enterprise playbooks enabling real-time data streaming that powers safe, agentic financial workflows.",
      },
    ],
  },
};

const DOMAIN_KEYS: DomainKey[] = ["telecom", "healthcare", "fintech"];

const DOMAIN_META: Record<DomainKey, { num: string; imageHint: string; imageSrc?: string }> = {
  telecom:    { num: "01", imageHint: "AI-powered telecom network operations — landscape", imageSrc: "/images/sector-telecom.jpg" },
  healthcare: { num: "02", imageHint: "Clinical AI and digital health technology — landscape", imageSrc: "/images/sector-healthcare.jpg" },
  fintech:    { num: "03", imageHint: "Fintech AI and financial data visualization — landscape", imageSrc: "/images/sector-fintech.jpg" },
};

// ─── AI Maturity Simulator ────────────────────────────────────────────────
const SIM_PARAMS = [
  {
    key: "legacy",
    label: "Legacy Tech Debt",
    options: ["High", "Moderate", "Minimal"],
    scores: [15, 52, 95],
  },
  {
    key: "data",
    label: "Data Maturity",
    options: ["Siloed", "Maturing", "Unified"],
    scores: [18, 55, 95],
  },
  {
    key: "strategy",
    label: "AI Allocation Strategy",
    options: ["Reactive Patching", "Strategic Infrastructure", "Full Transformation"],
    scores: [20, 82, 95],
  },
];

function getAssessment(score: number): { heading: string; body: string; timeToValue: string } {
  if (score < 35) {
    return {
      heading: "Foundation Required",
      body: "Core data and system infrastructure must be addressed before AI initiatives can generate measurable value. Begin with data unification and legacy modernisation to create a viable AI substrate.",
      timeToValue: "20–24 Months",
    };
  }
  if (score < 55) {
    return {
      heading: "Emerging Capability",
      body: "Initial AI foundations exist but fragmentation between systems creates compounding inefficiencies. Prioritise cross-system data unification before scaling AI investment.",
      timeToValue: "14–20 Months",
    };
  }
  if (score < 72) {
    return {
      heading: "Strategic Fragmentation",
      body: "Reactive AI patching is creating pilot purgatory — small wins that never scale. Moving toward Strategic Infrastructure ensures your AI investments build compounding value over time, not isolated proofs of concept.",
      timeToValue: "10–14 Months",
    };
  }
  if (score < 85) {
    return {
      heading: "Strategic Infrastructure",
      body: "Your organisation has the foundations for scalable AI deployment. The priority is now connecting AI initiatives to concrete operational outcomes and accelerating time-to-value across workstreams.",
      timeToValue: "6–10 Months",
    };
  }
  return {
    heading: "Elite AI Readiness",
    body: "Your organisation is positioned for full AI transformation and autonomous workflow orchestration. The focus now is on compounding returns — connecting AI systems to build long-term, self-reinforcing value.",
    timeToValue: "4–8 Months",
  };
}

const PARAM_COLORS: [string, string, string] = [accentBlue, accent, "#8b5cf6"];
const PARAM_LABELS = ["Legacy Tech Debt", "Data Maturity", "AI Strategy"];

function MaturityPieChart({ score, paramScores }: { score: number; paramScores: number[] }) {
  const R = 82;
  const CX = 110;
  const CY = 110;
  const C = 2 * Math.PI * R;
  const MAX_TOTAL = 285; // 95 x 3
  const GAP = 6;

  const arcLens = paramScores.map((s) => Math.max(0, C * (s / MAX_TOTAL) - GAP));
  const cumulativeOffsets = arcLens.map((_, i) =>
    arcLens.slice(0, i).reduce((sum, l) => sum + l + GAP, 0)
  );

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Donut */}
      <div className="relative w-full max-w-[230px]">
        <svg viewBox="0 0 220 220" className="w-full" aria-hidden>
          {/* Outer glow ring */}
          <circle cx={CX} cy={CY} r={R + 12} fill="none" stroke="rgba(61,90,217,0.04)" strokeWidth={2} />
          {/* Background track */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(61,90,217,0.09)" strokeWidth={20} />
          {/* 3 parameter arcs */}
          <g transform={`rotate(-90, ${CX}, ${CY})`}>
            {paramScores.map((_, i) => (
              <motion.circle
                key={i}
                cx={CX}
                cy={CY}
                r={R}
                fill="none"
                stroke={PARAM_COLORS[i]}
                strokeWidth={20}
                strokeLinecap="butt"
                animate={{
                  strokeDasharray: `${arcLens[i]} ${C}`,
                  strokeDashoffset: -cumulativeOffsets[i],
                }}
                initial={{
                  strokeDasharray: `0 ${C}`,
                  strokeDashoffset: -cumulativeOffsets[i],
                }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
              />
            ))}
          </g>
          {/* Inner ring accent */}
          <circle cx={CX} cy={CY} r={R - 13} fill="none" stroke="rgba(61,90,217,0.05)" strokeWidth={1} />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={score}
              className="font-heading font-black text-[#0c1945] leading-none"
              style={{ fontSize: "2.5rem", letterSpacing: "-0.04em" }}
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.82 }}
              transition={{ duration: 0.28 }}
            >
              {score}%
            </motion.span>
          </AnimatePresence>
          <span className="font-body text-[10px] text-[#334155]/45 tracking-[0.15em] uppercase mt-1">
            AI Readiness
          </span>
        </div>
      </div>

      {/* Parameter legend */}
      <div className="w-full space-y-2.5">
        {paramScores.map((s, i) => {
          const pct = Math.round((s / 95) * 100);
          return (
            <div key={i} className="flex items-center gap-3">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: PARAM_COLORS[i] }}
              />
              <span className="font-body text-xs text-[#334155]/60 flex-1 truncate">
                {PARAM_LABELS[i]}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <div
                  className="h-1 rounded-full overflow-hidden"
                  style={{ width: "52px", background: "rgba(61,90,217,0.10)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: PARAM_COLORS[i] }}
                    animate={{ width: `${pct}%` }}
                    initial={{ width: "0%" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  />
                </div>
                <span className="font-mono text-[11px] font-bold w-8 text-right" style={{ color: PARAM_COLORS[i] }}>
                  {pct}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function TheAIEdgePage() {
  const [activeDomain, setActiveDomain] = useState<DomainKey>("telecom");
  const [paramIndices, setParamIndices] = useState([1, 1, 1]); // default: middle values

  const paramScores = SIM_PARAMS.map((p, i) => p.scores[paramIndices[i]]);
  const score = Math.round(paramScores.reduce((a, b) => a + b, 0) / SIM_PARAMS.length);
  const assessment = getAssessment(score);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);

  const simRef = useRef<HTMLDivElement>(null);
  const simInView = useInView(simRef, { once: true, margin: "-80px" });

  const activeDomainData = DOMAINS[activeDomain];

  return (
    <>
      {/* HERO — full-screen video */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "#030611" }}
      >
        {/* Video background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden
          >
            <source src="/videos/AI Edge.mp4" type="video/mp4" />
          </video>
          {/* Subtle vignette only — keeps video bright */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(3,6,17,0.18) 0%, rgba(3,6,17,0.06) 55%, rgba(3,6,17,0.02) 100%)",
            }}
          />
        </div>

      </section>

      {/* BEYOND THE HYPE — subtitle + intro content */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#030611" }}
      >
        {/* Data stream lines — carry over the AI pipeline aesthetic */}
        {STREAMS.map((s, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none rounded-full"
            style={{
              top: `${s.top}%`,
              height: "1px",
              width: `${s.width}%`,
              background: `rgba(5,175,242,${s.opacity})`,
            }}
            animate={{ x: ["-110%", "210%"] }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              ease: "linear",
              delay: s.delay,
            }}
          />
        ))}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          {/* "Beyond the Hype." */}
          <div style={{ overflow: "hidden" }}>
            <motion.div
              className="font-heading font-black leading-[1.0] mb-10"
              style={{
                fontSize: "clamp(2.8rem, 8vw, 9rem)",
                letterSpacing: "-0.044em",
                background: `linear-gradient(90deg, ${accent} 0%, #7be0f5 50%, ${accentBlue} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Beyond the Hype.
            </motion.div>
          </div>

          {/* Tagline + CTA */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end gap-8 max-w-4xl"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p
              className="font-body text-white/45 max-w-lg leading-relaxed"
              style={{ fontSize: "1.05rem" }}
            >
              Artificial Intelligence is no longer a boardroom talking point; it
              is an infrastructure rewrite. We strip away the marketing noise to
              deliver pragmatic, sector-specific blueprints for the modern enterprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-heading font-semibold text-sm text-[#030611] transition-all hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${accent}, #3d9fd9)` }}
              >
                Talk Architecture <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>

          {/* Domain chips */}
          <motion.div
            className="flex flex-wrap gap-2 mt-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
          >
            {[
              { label: "Telecom", color: accentBlue },
              { label: "Healthcare", color: "#10b981" },
              { label: "Fintech", color: "#8b5cf6" },
            ].map((d) => (
              <span
                key={d.label}
                className="font-body text-xs px-3 py-1.5 rounded-full"
                style={{
                  background: `${d.color}18`,
                  border: `1px solid ${d.color}35`,
                  color: d.color,
                }}
              >
                {d.label}
              </span>
            ))}
            <span
              className="font-body text-xs px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.30)",
              }}
            >
              + AI Maturity Simulator
            </span>
          </motion.div>
        </div>
      </section>

      {/* DOMAIN INTELLIGENCE GRID */}
      <section className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Section header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="font-body text-xs font-semibold tracking-[0.16em] uppercase block mb-3"
              style={{ color: accent }}
            >
              Domain Intelligence Grid
            </span>
            <h2
              className="font-heading font-bold text-[#0c1945] mb-4"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                letterSpacing: "-0.022em",
              }}
            >
              Sector-specific AI blueprints.
            </h2>
            <p className="font-body text-[#334155]/55 max-w-xl text-base leading-relaxed">
              Three domains. Three friction points. Three execution paths. Each
              built by practitioners who have operated inside these industries.
            </p>
          </motion.div>

          {/* Domain image cards */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {DOMAIN_KEYS.map((key) => {
              const d = DOMAINS[key];
              const meta = DOMAIN_META[key];
              const isActive = activeDomain === key;
              return (
                <motion.div
                  key={key}
                  className="relative rounded-2xl overflow-hidden cursor-pointer"
                  onClick={() => setActiveDomain(key)}
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.975 }}
                  style={{
                    outline: isActive ? `2px solid ${d.domainColor}` : "2px solid transparent",
                    boxShadow: isActive ? `0 0 28px ${d.domainColor}40` : "none",
                  }}
                >
                  <ImagePlaceholder
                    label={d.label}
                    hint={meta.imageHint}
                    aspectRatio="aspect-[4/3]"
                    className="w-full rounded-2xl"
                    src={meta.imageSrc}
                    alt={d.label}
                  />

                  {/* Bottom gradient */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(3,6,17,0.70) 0%, transparent 100%)" }}
                  />

                  {/* Frosted label chip — top-left */}
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span
                      className="font-heading font-black text-white leading-tight px-3 py-1.5 rounded-lg"
                      style={{
                        fontSize: "clamp(0.78rem, 1.3vw, 0.95rem)",
                        letterSpacing: "-0.01em",
                        background: "rgba(3,6,17,0.68)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        border: `1px solid ${d.domainColor}40`,
                      }}
                    >
                      {d.label}
                    </span>
                  </div>

                  {/* Active chevron */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute bottom-2.5 inset-x-0 flex justify-center pointer-events-none"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={14} style={{ color: d.domainColor }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Domain content — animated switch */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDomain}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Domain header */}
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-1 h-8 rounded-full"
                  style={{ background: activeDomainData.domainColor }}
                />
                <div>
                  <p
                    className="font-heading font-bold text-[#0c1945]"
                    style={{ fontSize: "1.25rem", letterSpacing: "-0.018em" }}
                  >
                    {activeDomainData.label}
                  </p>
                  <p
                    className="font-body text-xs font-semibold tracking-[0.14em] uppercase"
                    style={{ color: activeDomainData.domainColor }}
                  >
                    {activeDomainData.sub}
                  </p>
                </div>
              </div>

              {/* 3-part value loop */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {activeDomainData.parts.map((part, i) => {
                  const Icon = part.Icon;
                  return (
                    <motion.div
                      key={part.phase}
                      className="relative p-6 rounded-2xl overflow-hidden"
                      style={{
                        background:
                          i === 2 ? "#030611" : i === 1 ? "#f0f4ff" : "#fffbeb",
                        border: `1px solid ${
                          i === 2
                            ? "rgba(5,175,242,0.2)"
                            : i === 1
                            ? "rgba(61,90,217,0.18)"
                            : "rgba(245,158,11,0.25)"
                        }`,
                      }}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      {/* Phase label */}
                      <div className="flex items-center gap-2 mb-4">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{
                            background: `${part.phaseColor}18`,
                            border: `1px solid ${part.phaseColor}35`,
                          }}
                        >
                          <Icon size={13} style={{ color: part.phaseColor }} />
                        </div>
                        <span
                          className="font-body text-xs font-bold uppercase tracking-wider"
                          style={{ color: part.phaseColor }}
                        >
                          {String(i + 1).padStart(2, "0")} {part.phase}
                        </span>
                      </div>

                      <p
                        className={`font-body text-sm leading-relaxed ${
                          i === 2 ? "text-white/60" : "text-[#334155]/70"
                        }`}
                      >
                        {part.body}
                      </p>

                      {/* Northgate Execution quote */}
                      {part.quote && (
                        <div
                          className="mt-5 pt-5"
                          style={{
                            borderTop: "1px solid rgba(5,175,242,0.2)",
                          }}
                        >
                          <p
                            className="font-heading font-semibold text-sm italic leading-relaxed"
                            style={{ color: accent }}
                          >
                            &ldquo;{part.quote}&rdquo;
                          </p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* AI MATURITY SIMULATOR */}
      <section style={{ background: "#f8faff" }} className="border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="font-body text-xs font-semibold tracking-[0.16em] uppercase block mb-3"
              style={{ color: accent }}
            >
              Interactive Parameter Matrix
            </span>
            <h2
              className="font-heading font-bold text-[#0c1945] mb-3"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                letterSpacing: "-0.022em",
              }}
            >
              AI Transformation Maturity Simulator
            </h2>
            <p className="font-body text-[#334155]/55 max-w-xl text-base leading-relaxed">
              Adjust your organisation&apos;s parameters to visualise your AI
              readiness score and estimated time-to-value.
            </p>
          </motion.div>

          <div ref={simRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: Gauge + Assessment */}
            <motion.div
              className="p-8 rounded-2xl"
              style={{ background: "#ffffff", border: "1px solid #E2E8F0" }}
              animate={{ opacity: simInView ? 1 : 0, y: simInView ? 0 : 24 }}
              transition={{ duration: 0.7 }}
            >
              {/* Pie chart */}
              <MaturityPieChart score={score} paramScores={paramScores} />

              {/* Score + time metrics */}
              <div
                className="grid grid-cols-2 gap-4 my-6 pt-4"
                style={{ borderTop: "1px solid #E2E8F0" }}
              >
                <div className="text-center">
                  <p className="font-body text-xs text-[#334155]/45 uppercase tracking-wider mb-1">
                    AI Readiness Score
                  </p>
                  <motion.p
                    className="font-heading font-bold text-[#0c1945]"
                    style={{ fontSize: "1.5rem", letterSpacing: "-0.025em" }}
                    key={score}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {score}%
                  </motion.p>
                </div>
                <div className="text-center">
                  <p className="font-body text-xs text-[#334155]/45 uppercase tracking-wider mb-1">
                    Est. Time-to-Value
                  </p>
                  <motion.p
                    className="font-heading font-bold text-[#0c1945]"
                    style={{ fontSize: "1.5rem", letterSpacing: "-0.025em" }}
                    key={assessment.timeToValue}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {assessment.timeToValue}
                  </motion.p>
                </div>
              </div>

              {/* Strategic Assessment */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={assessment.heading}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="p-5 rounded-xl"
                  style={{
                    background: "rgba(5,175,242,0.05)",
                    border: "1px solid rgba(5,175,242,0.16)",
                  }}
                >
                  <p
                    className="font-heading font-bold mb-2"
                    style={{ color: accent, fontSize: "0.9rem" }}
                  >
                    Strategic Assessment: {assessment.heading}
                  </p>
                  <p className="font-body text-sm text-[#334155]/65 leading-relaxed">
                    {assessment.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Right: Parameter selectors */}
            <motion.div
              className="p-8 rounded-2xl"
              style={{ background: "#ffffff", border: "1px solid #E2E8F0" }}
              animate={{ opacity: simInView ? 1 : 0, y: simInView ? 0 : 24 }}
              transition={{ duration: 0.7, delay: 0.12 }}
            >
              <p
                className="font-heading font-bold text-[#0c1945] mb-6"
                style={{ fontSize: "1.05rem", letterSpacing: "-0.015em" }}
              >
                Adjust your parameters
              </p>

              {SIM_PARAMS.map((param, pi) => (
                <div
                  key={param.key}
                  className="flex items-center gap-3 py-4"
                  style={{
                    borderBottom:
                      pi < SIM_PARAMS.length - 1
                        ? "1px solid #F1F5F9"
                        : "none",
                  }}
                >
                  <span className="font-body text-sm font-medium text-[#334155] w-36 shrink-0 leading-snug">
                    {param.label}
                  </span>
                  <div className="flex items-center gap-2 flex-1">
                    <button
                      onClick={() =>
                        setParamIndices((prev) => {
                          const next = [...prev];
                          next[pi] = Math.max(0, prev[pi] - 1);
                          return next;
                        })
                      }
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[#f0f4ff] shrink-0"
                      style={{
                        color:
                          paramIndices[pi] > 0
                            ? accentBlue
                            : "rgba(0,0,0,0.2)",
                      }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <div
                      className="flex-1 px-3 py-2.5 rounded-xl text-center font-body font-semibold text-sm text-[#0c1945] min-w-0"
                      style={{ background: "#F1F5F9" }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={paramIndices[pi]}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="block truncate"
                        >
                          {param.options[paramIndices[pi]]}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <button
                      onClick={() =>
                        setParamIndices((prev) => {
                          const next = [...prev];
                          next[pi] = Math.min(
                            param.options.length - 1,
                            prev[pi] + 1
                          );
                          return next;
                        })
                      }
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[#f0f4ff] shrink-0"
                      style={{
                        color:
                          paramIndices[pi] < param.options.length - 1
                            ? accentBlue
                            : "rgba(0,0,0,0.2)",
                      }}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}

              <div
                className="mt-6 pt-6 flex flex-col gap-3"
                style={{ borderTop: "1px solid #F1F5F9" }}
              >
                <p className="font-body text-xs text-[#334155]/40 leading-relaxed">
                  This simulator models AI readiness based on three foundational
                  parameters. A Northgate practitioner can build a detailed,
                  organisation-specific assessment.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-heading font-semibold text-sm transition-colors"
                  style={{ color: accentBlue }}
                >
                  Request a full assessment <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section style={{ background: "#030611" }} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="font-body text-xs font-semibold tracking-[0.16em] uppercase block mb-3"
              style={{ color: accent }}
            >
              What You Will Find Here
            </span>
            <h2
              className="font-heading font-bold text-white"
              style={{
                fontSize: "clamp(1.75rem, 3.2vw, 3rem)",
                letterSpacing: "-0.025em",
              }}
            >
              Intelligence designed for operators.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                num: "01",
                heading: "Applied AI in Telecom & BSS",
                body: "Real use cases where AI is delivering measurable value — from churn prediction to billing automation to network intelligence. No academic speculation.",
              },
              {
                num: "02",
                heading: "Enterprise AI Adoption Playbooks",
                body: "Practical frameworks for evaluating, piloting, and scaling AI initiatives inside complex enterprise environments. Built for execution, not presentation.",
              },
              {
                num: "03",
                heading: "What Not To Do",
                body: "The AI implementations that looked good on paper and failed in practice — and the lessons that come from being close to the ground when they collapsed.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                className="relative p-6 rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div
                  className="absolute top-0 left-0 w-10 h-[2px]"
                  style={{ background: accent }}
                />
                <div
                  className="absolute -top-2 -right-1 font-heading font-black pointer-events-none select-none"
                  aria-hidden
                  style={{
                    fontSize: "7rem",
                    color: "rgba(5,175,242,0.05)",
                    lineHeight: 1,
                  }}
                >
                  {item.num}
                </div>
                <div className="relative">
                  <span
                    className="font-mono text-xs font-bold block mb-3"
                    style={{ color: accent }}
                  >
                    {item.num}
                  </span>
                  <h3
                    className="font-heading font-bold text-white mb-3"
                    style={{ fontSize: "1.05rem", letterSpacing: "-0.016em" }}
                  >
                    {item.heading}
                  </h3>
                  <p className="font-body text-sm text-white/38 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PREV / NEXT */}
      <section className="py-10 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4">
            <div />
            <Link
              href="/our-thinking/industry-signals"
              className="flex items-center justify-end gap-3 p-5 rounded-xl border border-[#E2E8F0] hover:border-[#3d5ad9]/30 hover:bg-[#f8faff] transition-all text-right group"
            >
              <div>
                <p className="font-body text-xs text-[#334155]/40 mb-0.5">Next</p>
                <p className="font-heading font-semibold text-sm text-[#0c1945] group-hover:text-[#3d5ad9] transition-colors">
                  Industry Signals
                </p>
              </div>
              <ArrowRight
                size={16}
                className="text-[#334155]/40 group-hover:text-[#3d5ad9] transition-colors"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden py-28"
        style={{ background: "#030611" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(5,175,242,0.09), transparent)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            className="font-body text-xs font-semibold tracking-[0.16em] uppercase block mb-6"
            style={{ color: accent }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Bypass the Generic Consulting Loop
          </motion.p>

          <motion.h2
            className="font-heading font-bold text-white mb-5 leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 3.8vw, 3.2rem)",
              letterSpacing: "-0.028em",
            }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            Tired of AI slide decks?
            <br />
            <span
              style={{
                background: `linear-gradient(90deg, ${accent}, ${accentBlue})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Let&apos;s talk architecture.
            </span>
          </motion.h2>

          <motion.p
            className="font-body text-white/38 text-lg mb-12 leading-relaxed max-w-lg mx-auto"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
          >
            If you are ready to move past proofs of concept and build a scalable AI
            engine for your business, speak directly with a Northgate principal
            practitioner.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-[#030611] font-heading font-semibold text-base transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${accent}, #3d9fd9)` }}
            >
              Speak With a Principal <ArrowRight size={17} />
            </Link>
            <Link
              href="/our-thinking"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/15 text-white/50 font-heading font-medium text-base hover:text-white hover:border-white/30 transition-all"
            >
              All Intelligence
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
