"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Users,
  Activity,
  Zap,
} from "lucide-react";

const accent = "#3d5ad9";
const accentCyan = "#05aff2";

const STREAMS = [
  { label: "Strategy Intake", progress: 100 },
  { label: "Account Alignment", progress: 78 },
  { label: "Programme Governance", progress: 55 },
  { label: "Execution & Cutover", progress: 32 },
  { label: "Value Realisation", progress: 12 },
];

interface Pillar {
  number: string;
  Icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  name: string;
  tagline: string;
  body: string;
  edge: string;
}

const PILLARS: Pillar[] = [
  {
    number: "01",
    Icon: Users,
    name: "Strategic Account Management",
    tagline: "Customer advocacy and value-realisation at the executive level.",
    body: "We do not view account management as an administrative layer or a sales pipeline filler. For Northgate, it is an elite customer-advocacy and value-realisation framework. We embed deep within your ecosystem to cultivate radical alignment between your executive vision, internal business units, and external technical teams.",
    edge: "We protect your long-term interests by anticipating friction points and continuously measuring every phase of delivery against your core commercial business case — before misalignment becomes a programme crisis.",
  },
  {
    number: "02",
    Icon: Activity,
    name: "High-Predictability Programme Governance",
    tagline: "Proactive risk mitigation — not reactive issue logging.",
    body: "Managing large-scale, multi-million-dollar programmes requires more than updating Gantt charts and tracking cross-functional dependencies. It requires foresight. We replace bloated, bureaucratic steering committees with agile, high-velocity governance structures built for real-world enterprise complexity.",
    edge: "Our practitioners use real-time data modelling to spot project slippage, budgetary variances, or resourcing bottlenecks weeks before they impact your critical path — ensuring your transformation remains on schedule and on budget.",
  },
  {
    number: "03",
    Icon: Zap,
    name: "Flawless Delivery Execution",
    tagline: "Battle-tested delivery frameworks at the engineering front line.",
    body: "When it comes to technical cutovers, legacy migrations, and system rollouts, there is no substitute for operational experience. Our delivery managers are not career theoreticians; they are veteran operators. We roll up our sleeves to manage the day-to-day tactical execution — because strategy without execution is fiction.",
    edge: "Whether managing hybrid-agile workstreams, complex integration meshes, or global deployment schedules, we ensure clean handovers and 100% operational self-sufficiency for your teams long after our engagement concludes.",
  },
];

const LIFECYCLE = [
  { label: "Strategy Intake", sub: "Requirements & business case" },
  { label: "Account Alignment", sub: "Stakeholder & team integration" },
  { label: "Governance Sprint", sub: "Proactive risk management" },
  { label: "Execution Cutover", sub: "Technical delivery & migration" },
];

const COMPARISON = [
  {
    criteria: "Leadership Profile",
    big4: "Managed via remote oversight by senior partners, with daily execution left to junior associates.",
    northgate: "Practitioner-Led: Every initiative is directly owned and executed by a veteran industry operator — no delegation to inexperienced teams.",
  },
  {
    criteria: "Risk Management",
    big4: "Reactive logging of issues after milestones are missed, often hiding behind scope change orders.",
    northgate: "Predictive Unblocking: Proactive bottleneck isolation that resolves operational friction before it delays the critical path.",
  },
  {
    criteria: "Delivery Methodology",
    big4: "Rigid adherence to massive, dogmatic frameworks that slow down project momentum and frustrate delivery teams.",
    northgate: "Adaptive & Fluid: Tailored hybrid frameworks designed to match your organisation's cultural pace and technology maturity.",
  },
  {
    criteria: "Accountability",
    big4: "Retainers built around billing hours and slide production, rather than concrete deployment milestones.",
    northgate: "Outcome-Obsessed: Performance-tied metrics focused entirely on operational readiness and long-term team self-sufficiency.",
  },
];

const PROMISE_LINES = [
  "We do not define success",
  "by a project closing statement.",
  "We define success by how seamlessly",
  "your systems run.",
];

export default function DeliveryManagementPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "22%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);

  const pillarsRef = useRef<HTMLDivElement>(null);
  const pillarsInView = useInView(pillarsRef, { once: true, margin: "-60px" });

  const lifecycleRef = useRef<HTMLDivElement>(null);
  const lifecycleInView = useInView(lifecycleRef, { once: true, margin: "-80px" });

  const compRef = useRef<HTMLDivElement>(null);
  const compInView = useInView(compRef, { once: true, margin: "-60px" });

  const promiseRef = useRef<HTMLDivElement>(null);
  const promiseInView = useInView(promiseRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "#030611" }}
      >
        {/* Faint programme-stream Gantt decoration — right panel */}
        <div
          className="absolute right-8 lg:right-16 xl:right-28 top-1/2 pointer-events-none hidden lg:block"
          style={{ transform: "translateY(-50%)", opacity: 0.085, zIndex: 1 }}
        >
          <p className="font-mono text-[10px] text-white/60 uppercase tracking-[0.2em] mb-5">
            Programme Status Board
          </p>
          {STREAMS.map((s, i) => (
            <div key={i} className="flex items-center gap-4 mb-5">
              <span className="font-mono text-xs text-white w-44 text-right">{s.label}</span>
              <div className="relative w-52 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${s.progress}%`,
                    background:
                      s.progress === 100
                        ? "rgba(61,90,217,0.8)"
                        : s.progress > 50
                        ? "rgba(61,90,217,0.55)"
                        : "rgba(61,90,217,0.35)",
                  }}
                />
              </div>
              {/* Pulsing status dot */}
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background:
                    s.progress === 100
                      ? "#4ade80"
                      : s.progress > 50
                      ? "#3d5ad9"
                      : "rgba(255,255,255,0.3)",
                }}
                animate={
                  s.progress > 10 && s.progress < 100
                    ? { opacity: [1, 0.3, 1] }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              />
            </div>
          ))}
        </div>

        {/* Left edge glow */}
        <div
          className="absolute inset-y-0 left-0 w-[45%] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 10% 55%, rgba(61,90,217,0.11), transparent)",
          }}
        />

        {/* Large faint watermark */}
        <div
          className="absolute right-4 bottom-0 font-heading font-black pointer-events-none select-none"
          aria-hidden
          style={{
            fontSize: "clamp(12rem, 28vw, 32rem)",
            color: "rgba(61,90,217,0.035)",
            lineHeight: 0.85,
          }}
        >
          05
        </div>

        {/* Content */}
        <motion.div
          className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24"
          style={{ y: heroTextY, opacity: heroOpacity, zIndex: 2 }}
        >
          {/* Breadcrumb row */}
          <motion.div
            className="flex items-center gap-4 mb-10"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              href="/what-we-do"
              className="inline-flex items-center gap-1.5 font-body text-xs text-white/30 hover:text-white/55 transition-colors"
            >
              <ArrowLeft size={12} />
              What We Do
            </Link>
            <span className="text-white/15">|</span>
            <span
              className="font-mono text-xs font-bold px-2.5 py-1 rounded-md"
              style={{
                color: accent,
                background: "rgba(61,90,217,0.12)",
                border: "1px solid rgba(61,90,217,0.28)",
              }}
            >
              05
            </span>
            <span className="font-body text-xs font-semibold tracking-[0.16em] uppercase text-white/28">
              Practice Area
            </span>
          </motion.div>

          {/* Headline */}
          <div
            className="font-heading font-black text-white leading-[1.0] mb-8"
            style={{ fontSize: "clamp(3.2rem, 8.5vw, 9.5rem)", letterSpacing: "-0.044em" }}
          >
            {[
              { text: "Forged in", gradient: false },
              { text: "the Delivery.", gradient: true },
            ].map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.div
                  className="block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    delay: 0.25 + i * 0.2,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line.gradient ? (
                    <span
                      style={{
                        background: `linear-gradient(90deg, ${accent} 0%, #6b85f5 55%, ${accentCyan} 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {line.text}
                    </span>
                  ) : (
                    line.text
                  )}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Tagline + CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end gap-8 max-w-4xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72 }}
          >
            <p
              className="font-body text-white/45 max-w-md leading-relaxed"
              style={{ fontSize: "1.05rem" }}
            >
              Practitioner-led delivery management that safeguards your capital
              investments and turns complex roadmaps into operational realities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-heading font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${accent}, #5b75f0)` }}
              >
                Start a Conversation <ArrowRight size={15} />
              </Link>
              <Link
                href="/what-we-do"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/15 text-white/45 font-heading font-medium text-sm hover:text-white hover:border-white/30 transition-all"
              >
                All Practice Areas
              </Link>
            </div>
          </motion.div>

          {/* Pillar chips */}
          <motion.div
            className="flex flex-wrap gap-2 mt-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95 }}
          >
            {PILLARS.map((p) => (
              <span
                key={p.number}
                className="font-body text-xs px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                <span style={{ color: accent, marginRight: "5px" }}>{p.number}</span>
                {p.name}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* BRIDGE STATEMENT */}
      <section style={{ background: "#ffffff" }} className="border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr] gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span
                className="font-body text-xs font-semibold tracking-[0.16em] uppercase block mb-4"
                style={{ color: accent }}
              >
                Delivery Management
              </span>
              <div
                className="w-8 h-[3px] rounded-full"
                style={{ background: `linear-gradient(90deg, ${accent}, ${accentCyan})` }}
              />
            </motion.div>
            <motion.p
              className="font-heading font-bold text-[#0c1945] leading-snug"
              style={{
                fontSize: "clamp(1.5rem, 2.8vw, 2.65rem)",
                letterSpacing: "-0.024em",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              Value isn&apos;t generated in the pitch&nbsp;—&nbsp;it is forged in
              the delivery. We provide practitioner-led services that safeguard
              your capital and turn complex roadmaps into operational realities.
            </motion.p>
          </div>
        </div>
      </section>

      {/* THREE PILLARS — full-width horizontal rows */}
      <section style={{ background: "#030611" }} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="font-body text-xs font-semibold tracking-[0.16em] uppercase block mb-3"
              style={{ color: accent }}
            >
              Three Interconnected Disciplines
            </span>
            <h2
              className="font-heading font-bold text-white"
              style={{
                fontSize: "clamp(1.75rem, 3.2vw, 3rem)",
                letterSpacing: "-0.025em",
              }}
            >
              Delivery Excellence in practice.
            </h2>
          </motion.div>

          <div ref={pillarsRef} className="space-y-5">
            {PILLARS.map((p, i) => {
              const Icon = p.Icon;
              return (
                <motion.div
                  key={p.number}
                  className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-0 rounded-2xl overflow-hidden"
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                  animate={{
                    opacity: pillarsInView ? 1 : 0,
                    y: pillarsInView ? 0 : 32,
                  }}
                  transition={{
                    delay: i * 0.13,
                    duration: 0.75,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Left: number + icon column */}
                  <div
                    className="flex lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-4 p-5 lg:p-7"
                    style={{
                      background: "rgba(61,90,217,0.07)",
                      borderRight: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span
                      className="font-heading font-black leading-none"
                      style={{
                        fontSize: "3rem",
                        color: "rgba(61,90,217,0.55)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {p.number}
                    </span>
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(61,90,217,0.18)",
                        border: "1px solid rgba(61,90,217,0.28)",
                      }}
                    >
                      <Icon size={16} style={{ color: accent }} />
                    </div>
                  </div>

                  {/* Right: content */}
                  <div
                    className="p-6 lg:p-8"
                    style={{ background: "rgba(255,255,255,0.025)" }}
                  >
                    <p
                      className="font-body text-xs font-bold uppercase tracking-wider mb-2"
                      style={{ color: accent }}
                    >
                      {p.tagline}
                    </p>
                    <h3
                      className="font-heading font-bold text-white mb-3"
                      style={{
                        fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)",
                        letterSpacing: "-0.018em",
                      }}
                    >
                      {p.name}
                    </h3>
                    <p className="font-body text-sm text-white/38 leading-relaxed mb-5 max-w-3xl">
                      {p.body}
                    </p>
                    <div
                      className="inline-flex items-start gap-3 p-4 rounded-xl max-w-3xl"
                      style={{
                        background: "rgba(61,90,217,0.10)",
                        border: "1px solid rgba(61,90,217,0.2)",
                      }}
                    >
                      <div
                        className="w-[3px] self-stretch rounded-full shrink-0"
                        style={{ background: `linear-gradient(180deg, ${accent}, ${accentCyan})` }}
                      />
                      <div>
                        <p
                          className="font-body text-xs font-bold uppercase tracking-wider mb-1.5"
                          style={{ color: accent }}
                        >
                          The Northgate Edge
                        </p>
                        <p className="font-body text-xs text-white/50 leading-relaxed">
                          {p.edge}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DELIVERY LIFECYCLE */}
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
              The Northgate Delivery Lifecycle
            </span>
            <h2
              className="font-heading font-bold text-[#0c1945]"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                letterSpacing: "-0.022em",
              }}
            >
              A continuous quality loop.
            </h2>
            <p className="font-body text-[#334155]/55 mt-3 max-w-xl text-base leading-relaxed">
              Our delivery framework stabilises volatile enterprise initiatives and
              accelerates time-to-value — with a value realisation loop that sustains
              outcomes long after cutover.
            </p>
          </motion.div>

          <div ref={lifecycleRef}>
            {/* Four lifecycle stages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {LIFECYCLE.map((stage, i) => (
                <motion.div
                  key={stage.label}
                  className="relative"
                  animate={{
                    opacity: lifecycleInView ? 1 : 0,
                    y: lifecycleInView ? 0 : 20,
                  }}
                  transition={{ delay: 0.1 + i * 0.13, duration: 0.7 }}
                >
                  <div
                    className="p-5 rounded-xl h-full"
                    style={{
                      background: "rgba(61,90,217,0.05)",
                      border: "1px solid rgba(61,90,217,0.18)",
                    }}
                  >
                    {/* Step number + connector arrow */}
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                        style={{
                          color: accent,
                          background: "rgba(61,90,217,0.12)",
                          border: "1px solid rgba(61,90,217,0.2)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {i < LIFECYCLE.length - 1 && (
                        <div
                          className="flex-1 h-[1px] hidden lg:block"
                          style={{ background: "rgba(61,90,217,0.22)" }}
                        />
                      )}
                    </div>
                    <p
                      className="font-heading font-bold text-[#0c1945] mb-1"
                      style={{ fontSize: "1rem", letterSpacing: "-0.015em" }}
                    >
                      {stage.label}
                    </p>
                    <p className="font-body text-xs text-[#334155]/50 leading-relaxed">
                      {stage.sub}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Value Realization Loop connector */}
            <motion.div
              className="mt-4"
              animate={{ opacity: lifecycleInView ? 1 : 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div
                className="flex items-center rounded-xl p-4"
                style={{
                  background: `linear-gradient(90deg, rgba(61,90,217,0.07), rgba(5,175,242,0.07))`,
                  border: "1px solid rgba(61,90,217,0.15)",
                  borderTop: "none",
                  borderRadius: "0 0 12px 12px",
                }}
              >
                <div
                  className="text-lg mr-3 font-mono"
                  style={{ color: accent }}
                >
                  ↩
                </div>
                <div>
                  <span
                    className="font-body text-xs font-bold uppercase tracking-wider"
                    style={{ color: accent }}
                  >
                    Value Realisation Loop
                  </span>
                  <span className="font-body text-xs text-[#334155]/50 ml-3">
                    Continuous governance ensuring operational self-sufficiency and long-term value capture
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section style={{ background: "#030611" }} className="overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="font-body text-xs font-semibold tracking-[0.16em] uppercase"
              style={{ color: accent }}
            >
              Why Leading Enterprises Bypass the Big 4
            </span>
            <h2
              className="font-heading font-bold text-white mt-3 mb-3"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 3.2rem)",
                letterSpacing: "-0.028em",
              }}
            >
              The Delivery Management Landscape.
            </h2>
            <p className="font-body text-white/38 max-w-xl text-base leading-relaxed">
              The difference between a programme that lands and one that doesn&apos;t
              is rarely technical. It is a governance gap.
            </p>
          </motion.div>

          {/* Column headers — desktop only */}
          <div className="hidden lg:grid lg:grid-cols-[200px_1fr_1fr] gap-3 mb-3">
            <div />
            <div
              className="px-5 py-3 rounded-xl text-center"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p className="font-body text-xs font-semibold tracking-[0.13em] uppercase text-white/25">
                The Big 4 Governance Model
              </p>
            </div>
            <div
              className="px-5 py-3 rounded-xl text-center"
              style={{
                background: "rgba(61,90,217,0.09)",
                border: "1px solid rgba(61,90,217,0.22)",
              }}
            >
              <p
                className="font-body text-xs font-semibold tracking-[0.13em] uppercase"
                style={{ color: accent }}
              >
                The Northgate Execution Model
              </p>
            </div>
          </div>

          <div ref={compRef} className="space-y-3">
            {COMPARISON.map((row, i) => (
              <motion.div
                key={row.criteria}
                className="grid grid-cols-1 lg:grid-cols-[200px_1fr_1fr] gap-3"
                animate={{
                  opacity: compInView ? 1 : 0,
                  y: compInView ? 0 : 24,
                }}
                transition={{
                  delay: 0.06 + i * 0.09,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="flex items-center">
                  <span
                    className="font-heading font-semibold text-white/65"
                    style={{ fontSize: "0.92rem" }}
                  >
                    {row.criteria}
                  </span>
                </div>
                <div
                  className="p-5 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.055)",
                  }}
                >
                  <p className="font-body text-xs font-bold uppercase tracking-wider text-white/22 mb-2 lg:hidden">
                    The Big 4
                  </p>
                  <p className="font-body text-sm text-white/32 leading-relaxed">
                    {row.big4}
                  </p>
                </div>
                <div
                  className="relative p-5 rounded-xl overflow-hidden"
                  style={{
                    background: "rgba(61,90,217,0.09)",
                    border: "1px solid rgba(61,90,217,0.2)",
                  }}
                >
                  <div
                    className="absolute top-0 left-0 bottom-0 w-[2px]"
                    style={{
                      background: `linear-gradient(180deg, ${accent}, ${accentCyan})`,
                    }}
                  />
                  <p
                    className="font-body text-xs font-bold uppercase tracking-wider mb-2 pl-3 lg:hidden"
                    style={{ color: accent, opacity: 0.7 }}
                  >
                    Northgate
                  </p>
                  <p className="font-body text-sm text-white/72 leading-relaxed pl-3">
                    {row.northgate}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PROMISE — line-by-line reveal */}
      <section
        className="relative overflow-hidden py-32"
        style={{ background: "#0c1945" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 65% at 50% 50%, rgba(61,90,217,0.13), transparent)",
          }}
        />
        {/* Subtle vertical lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,0.025) 79px, rgba(255,255,255,0.025) 80px)",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            className="font-body text-xs font-semibold tracking-[0.16em] uppercase block mb-12"
            style={{ color: accent }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Northgate Delivery Promise
          </motion.span>

          {/* Multi-line reveal */}
          <div
            ref={promiseRef}
            className="font-heading font-bold text-white text-center"
            style={{
              fontSize: "clamp(2rem, 5vw, 5.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.15,
            }}
          >
            {PROMISE_LINES.map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.div
                  className="block"
                  animate={{
                    y: promiseInView ? "0%" : "105%",
                    opacity: promiseInView ? 1 : 0,
                  }}
                  transition={{
                    delay: i * 0.14,
                    duration: 0.75,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={
                    i >= 2
                      ? {
                          background: `linear-gradient(90deg, ${accent}, ${accentCyan})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }
                      : {}
                  }
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </div>

          <motion.p
            className="font-body text-white/40 mt-12 max-w-2xl mx-auto leading-[1.85] text-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            How deeply your staff adopts new workflows, how much value your bottom line
            captures long after our engagement concludes&nbsp;— that is how we
            measure the quality of our delivery.
          </motion.p>
        </div>
      </section>

      {/* SECTORS */}
      <section className="py-16 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-body text-xs font-semibold tracking-[0.16em] uppercase text-[#334155]/40 mb-5">
              Relevant Sectors
            </p>
            <div className="flex flex-wrap gap-3">
              {["Telecom", "Enterprise", "Healthcare", "MVNO / MVNE"].map(
                (sector) => (
                  <span
                    key={sector}
                    className="px-5 py-2.5 rounded-full border font-body text-sm font-medium"
                    style={{
                      borderColor: "rgba(61,90,217,0.3)",
                      color: accent,
                      background: "rgba(61,90,217,0.06)",
                    }}
                  >
                    {sector}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PREV / NEXT */}
      <section className="py-10 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/what-we-do/commercial-excellence"
              className="flex items-center gap-3 p-5 rounded-xl border border-[#E2E8F0] hover:border-[#3d5ad9]/30 hover:bg-[#f8faff] transition-all group"
            >
              <ArrowLeft
                size={16}
                className="text-[#334155]/40 group-hover:text-[#3d5ad9] transition-colors"
              />
              <div>
                <p className="font-body text-xs text-[#334155]/40 mb-0.5">
                  Previous
                </p>
                <p className="font-heading font-semibold text-sm text-[#0c1945] group-hover:text-[#3d5ad9] transition-colors">
                  Commercial Excellence
                </p>
              </div>
            </Link>
            <Link
              href="/what-we-do"
              className="flex items-center justify-end gap-3 p-5 rounded-xl border border-[#E2E8F0] hover:border-[#3d5ad9]/30 hover:bg-[#f8faff] transition-all text-right group"
            >
              <div>
                <p className="font-body text-xs text-[#334155]/40 mb-0.5">
                  All Services
                </p>
                <p className="font-heading font-semibold text-sm text-[#0c1945] group-hover:text-[#3d5ad9] transition-colors">
                  What We Do
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
        className="py-28 relative overflow-hidden"
        style={{ background: "#030611" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(61,90,217,0.10), transparent)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            className="font-heading font-light text-white/55 mb-7"
            style={{
              fontSize: "clamp(1.15rem, 2vw, 1.75rem)",
              letterSpacing: "-0.01em",
            }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Govern<span style={{ color: accent }}>.</span>{" "}
            Deliver<span style={{ color: accent }}>.</span>{" "}
            Sustain<span style={{ color: accent }}>.</span>
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
            transition={{ delay: 0.1 }}
          >
            Bring certainty to your
            <br />
            next enterprise initiative.
          </motion.h2>

          <motion.p
            className="font-body text-white/38 text-lg mb-12 leading-relaxed max-w-lg mx-auto"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Execution risk is the single largest tax on corporate innovation.
            Stop hoping your initiatives cross the finish line&nbsp;— let&apos;s connect
            to discuss how Northgate can bring predictability, structure, and
            elite execution to your most critical programmes.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-white font-heading font-semibold text-base transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${accent}, #5b75f0)` }}
            >
              Start a Conversation <ArrowRight size={17} />
            </Link>
            <Link
              href="/what-we-do"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/15 text-white/50 font-heading font-medium text-base hover:text-white hover:border-white/30 transition-all"
            >
              View All Practice Areas
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
