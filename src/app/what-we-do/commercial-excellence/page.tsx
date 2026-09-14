"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft, FileText, Target, BarChart3, Zap, ShieldCheck } from "lucide-react";

const accent = "#05aff2";
const accentBlue = "#3d5ad9";

interface Pillar {
  number: string;
  Icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  name: string;
  body: string;
  edge: string;
}

const PILLARS: Pillar[] = [
  {
    number: "01",
    Icon: FileText,
    name: "Precision RFP Development",
    body: "We don't compile feature checklists; we architect RFPs as strategic instruments. Our frameworks force vendors to respond to rigorous, objective criteria — eliminating ambiguity and protecting capital expenditure from day one.",
    edge: "We translate complex enterprise requirements into highly defined, measurable, and auditable procurement frameworks that protect your capital before contracts are signed.",
  },
  {
    number: "02",
    Icon: Target,
    name: "High-Yield Bid Management",
    body: "Win-loss ratios are rarely decided by product superiority — they are decided by proposal execution. We replace chaotic, last-minute bid scrambles with an institutionalised, high-velocity war room discipline.",
    edge: "From qualification (Go/No-Go matrices) to pricing optimisation and executive storytelling — compliant, commercially aggressive, and structurally unassailable.",
  },
  {
    number: "03",
    Icon: BarChart3,
    name: "Rigorous Vendor Evaluation & Scoring",
    body: "Evaluating complex enterprise bids requires deep operational expertise — not a spreadsheet. Our proprietary multi-weighted scoring matrix, built on TCO and risk profiling, strips away vendor marketing noise.",
    edge: "An unbiased, quantifiable recommendation balancing technical fit with financial sustainability — protecting your bottom line from legacy vendor cartels.",
  },
  {
    number: "04",
    Icon: Zap,
    name: "High-Conversion Presales Support",
    body: "We act as an extension of your elite sales team: designing solution architectures, leading high-impact technical discoveries, and building proof-of-concepts that close deals.",
    edge: "Every Northgate presales consultant is a veteran operator. We map your solution architecture directly to the prospect's business outcomes — not product features.",
  },
  {
    number: "05",
    Icon: ShieldCheck,
    name: "Margin-Preserving Postsales Support",
    body: "The most dangerous phase of any contract lifecycle is the transition from closed deal to operational delivery. We establish rigorous governance at this critical junction.",
    edge: "SOW compliance tracking and customer success frameworks that secure long-term accounts and prevent margin erosion post-signature.",
  },
];

const COMPARISON = [
  {
    criteria: "RFP Design",
    big4: "Overly academic, massive templates that result in vendor fatigue and inflated pricing.",
    northgate: "Sharp & Targeted: modular RFPs built on clear SLAs and objective, scorable outcomes that eliminate vendor ambiguity.",
  },
  {
    criteria: "Bid Execution",
    big4: "High-level process coordination without deep technical or domain-specific narrative shaping.",
    northgate: "Active Deal Structuring: we engineer technical architectures and optimise pricing strategies end-to-end.",
  },
  {
    criteria: "Vendor Selection",
    big4: "Subjective, relationship-driven evaluations that inadvertently favour legacy vendor cartels.",
    northgate: "Data-Driven TCO Analysis: multidimensional, mathematical scoring that protects your bottom line.",
  },
  {
    criteria: "Pre / Post Sales",
    big4: "Separate consulting arms create structural silos between what is sold and what is delivered.",
    northgate: "Unified Commercial Engine: continuous governance ensuring validation translates into high-margin delivery.",
  },
];

const MANDATE_P1 = "Commercial excellence is not an administrative cost.".split(" ");

export default function CommercialExcellencePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "22%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);

  const pillarsRef = useRef<HTMLDivElement>(null);
  const pillarsInView = useInView(pillarsRef, { once: true, margin: "-60px" });

  const frameworkRef = useRef<HTMLDivElement>(null);
  const frameworkInView = useInView(frameworkRef, { once: true, margin: "-80px" });

  const compRef = useRef<HTMLDivElement>(null);
  const compInView = useInView(compRef, { once: true, margin: "-60px" });

  const mandateRef = useRef<HTMLDivElement>(null);
  const mandateInView = useInView(mandateRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "#030611" }}
      >
        {/* Horizontal scanline grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg, transparent, transparent 3px, rgba(5,175,242,0.018) 3px, rgba(5,175,242,0.018) 4px)",
          }}
        />

        {/* Animated concentric rings — right side */}
        {([1, 0.65, 0.4] as const).map((scale, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{
              width: "80vmin",
              height: "80vmin",
              borderRadius: "50%",
              border: `1px solid rgba(5,175,242,${0.07 - i * 0.02})`,
              right: "-18%",
              top: "50%",
              translateY: "-50%",
              scale,
            }}
            animate={{ opacity: [0.35, 0.75, 0.35] }}
            transition={{ duration: 5 + i * 1.8, repeat: Infinity, delay: i * 1.1 }}
          />
        ))}

        {/* Radial glow — right */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "55%",
            height: "75%",
            right: 0,
            top: "12%",
            background:
              "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(5,175,242,0.12), transparent)",
          }}
        />

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
                background: "rgba(5,175,242,0.12)",
                border: "1px solid rgba(5,175,242,0.28)",
              }}
            >
              04
            </span>
            <span className="font-body text-xs font-semibold tracking-[0.16em] uppercase text-white/28">
              Practice Area
            </span>
          </motion.div>

          {/* Headline — two lines */}
          <div
            className="font-heading font-black text-white leading-[1.0] mb-8"
            style={{ fontSize: "clamp(3.2rem, 8.5vw, 9.5rem)", letterSpacing: "-0.044em" }}
          >
            {[
              { text: "Protecting Margins.", gradient: false },
              { text: "Winning Markets.", gradient: true },
            ].map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.div
                  className="block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line.gradient ? (
                    <span
                      style={{
                        background: `linear-gradient(90deg, ${accent} 0%, #7be0f5 50%, ${accentBlue} 100%)`,
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
              Enterprise commercial excellence — where precision procurement, high-yield bid execution, and margin-preserving delivery converge.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-heading font-semibold text-sm text-[#030611] transition-all hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${accent}, #3d9fd9)` }}
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

          {/* 5 pillar chips */}
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
                {p.name.split(" ").slice(1, 3).join(" ")}
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
                Commercial Excellence
              </span>
              <div
                className="w-8 h-[3px] rounded-full"
                style={{ background: `linear-gradient(90deg, ${accent}, ${accentBlue})` }}
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
              At Northgate, we turn commercial vulnerability into a competitive
              asset&nbsp;— bridging strategic intent and bulletproof execution
              across five core disciplines.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 5 PILLARS — dark card grid */}
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
              Five Core Disciplines
            </span>
            <h2
              className="font-heading font-bold text-white"
              style={{
                fontSize: "clamp(1.75rem, 3.2vw, 3rem)",
                letterSpacing: "-0.025em",
              }}
            >
              The Commercial Excellence stack.
            </h2>
          </motion.div>

          <div ref={pillarsRef}>
            {/* Row 1: 3 equal cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
              {PILLARS.slice(0, 3).map((p, i) => {
                const Icon = p.Icon;
                return (
                  <motion.div
                    key={p.number}
                    className="relative p-6 rounded-2xl overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.032)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    animate={{
                      opacity: pillarsInView ? 1 : 0,
                      y: pillarsInView ? 0 : 28,
                    }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {/* Watermark number */}
                    <div
                      className="absolute -top-2 -right-1 font-heading font-black pointer-events-none select-none"
                      aria-hidden
                      style={{ fontSize: "8rem", color: "rgba(5,175,242,0.055)", lineHeight: 1 }}
                    >
                      {p.number}
                    </div>
                    {/* Top accent bar */}
                    <div
                      className="absolute top-0 left-0 w-12 h-[2px]"
                      style={{ background: accent }}
                    />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center"
                          style={{
                            background: "rgba(5,175,242,0.12)",
                            border: "1px solid rgba(5,175,242,0.22)",
                          }}
                        >
                          <Icon size={16} style={{ color: accent }} />
                        </div>
                        <span
                          className="font-mono text-xs font-bold"
                          style={{ color: accent }}
                        >
                          {p.number}
                        </span>
                      </div>
                      <h3
                        className="font-heading font-bold text-white mb-3"
                        style={{ fontSize: "1.05rem", letterSpacing: "-0.016em" }}
                      >
                        {p.name}
                      </h3>
                      <p className="font-body text-sm text-white/38 leading-relaxed mb-5">
                        {p.body}
                      </p>
                      <div
                        className="pl-4 py-0.5"
                        style={{ borderLeft: "2px solid rgba(5,175,242,0.4)" }}
                      >
                        <p
                          className="font-body text-xs font-bold uppercase tracking-wider mb-1.5"
                          style={{ color: accent }}
                        >
                          The Northgate Edge
                        </p>
                        <p className="font-body text-xs text-white/45 leading-relaxed">
                          {p.edge}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Row 2: 2 wider cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PILLARS.slice(3).map((p, i) => {
                const Icon = p.Icon;
                return (
                  <motion.div
                    key={p.number}
                    className="relative p-6 rounded-2xl overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.032)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    animate={{
                      opacity: pillarsInView ? 1 : 0,
                      y: pillarsInView ? 0 : 28,
                    }}
                    transition={{
                      delay: 0.3 + i * 0.1,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <div
                      className="absolute -top-2 -right-1 font-heading font-black pointer-events-none select-none"
                      aria-hidden
                      style={{ fontSize: "8rem", color: "rgba(5,175,242,0.055)", lineHeight: 1 }}
                    >
                      {p.number}
                    </div>
                    <div
                      className="absolute top-0 left-0 w-12 h-[2px]"
                      style={{ background: accent }}
                    />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center"
                          style={{
                            background: "rgba(5,175,242,0.12)",
                            border: "1px solid rgba(5,175,242,0.22)",
                          }}
                        >
                          <Icon size={16} style={{ color: accent }} />
                        </div>
                        <span
                          className="font-mono text-xs font-bold"
                          style={{ color: accent }}
                        >
                          {p.number}
                        </span>
                      </div>
                      <h3
                        className="font-heading font-bold text-white mb-3"
                        style={{ fontSize: "1.05rem", letterSpacing: "-0.016em" }}
                      >
                        {p.name}
                      </h3>
                      <p className="font-body text-sm text-white/38 leading-relaxed mb-5">
                        {p.body}
                      </p>
                      <div
                        className="pl-4 py-0.5"
                        style={{ borderLeft: "2px solid rgba(5,175,242,0.4)" }}
                      >
                        <p
                          className="font-body text-xs font-bold uppercase tracking-wider mb-1.5"
                          style={{ color: accent }}
                        >
                          The Northgate Edge
                        </p>
                        <p className="font-body text-xs text-white/45 leading-relaxed">
                          {p.edge}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* LIFECYCLE FRAMEWORK */}
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
              The Commercial Lifecycle Framework
            </span>
            <h2
              className="font-heading font-bold text-[#0c1945]"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                letterSpacing: "-0.022em",
              }}
            >
              Full-lifecycle commercial governance.
            </h2>
            <p className="font-body text-[#334155]/55 mt-3 max-w-xl text-base leading-relaxed">
              Our engagement model systematically eliminates risk and optimises
              capital at every stage&nbsp;— buy-side and sell-side, unified
              through a single alignment mesh.
            </p>
          </motion.div>

          <div ref={frameworkRef}>
            {/* BUY-SIDE ROW */}
            <motion.div
              className="flex items-stretch gap-0 mb-2"
              animate={{ opacity: frameworkInView ? 1 : 0, y: frameworkInView ? 0 : 20 }}
              transition={{ delay: 0.1, duration: 0.7 }}
            >
              <div
                className="hidden sm:flex items-center justify-center w-24 shrink-0 rounded-l-xl"
                style={{
                  background: "rgba(5,175,242,0.07)",
                  border: "1px solid rgba(5,175,242,0.18)",
                  borderRight: "none",
                }}
              >
                <span
                  className="font-body text-xs font-bold tracking-[0.14em] uppercase"
                  style={{
                    color: accent,
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  Buy-Side
                </span>
              </div>
              <div
                className="flex-1 grid grid-cols-1 sm:grid-cols-3 rounded-xl sm:rounded-l-none overflow-hidden"
                style={{ border: "1px solid rgba(5,175,242,0.18)" }}
              >
                {[
                  { num: "01", label: "RFP Development", sub: "Procurement framework design" },
                  { num: "03", label: "Vendor Evaluation", sub: "TCO-driven scoring & selection" },
                  { num: "--", label: "Contract Governance", sub: "SOW compliance & protection" },
                ].map((item, i, arr) => (
                  <motion.div
                    key={item.label}
                    className="p-5"
                    style={{
                      borderRight:
                        i < arr.length - 1 ? "1px solid rgba(5,175,242,0.14)" : "none",
                      background:
                        i === arr.length - 1
                          ? "rgba(5,175,242,0.07)"
                          : "rgba(5,175,242,0.03)",
                    }}
                    animate={{
                      opacity: frameworkInView ? 1 : 0,
                      y: frameworkInView ? 0 : 16,
                    }}
                    transition={{ delay: 0.2 + i * 0.12, duration: 0.65 }}
                  >
                    <span
                      className="font-mono text-xs font-bold block mb-1.5"
                      style={{ color: accent }}
                    >
                      {item.num}
                    </span>
                    <p className="font-heading font-semibold text-[#0c1945] text-sm mb-0.5">
                      {item.label}
                    </p>
                    <p className="font-body text-xs text-[#334155]/50">{item.sub}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Alignment connector */}
            <motion.div
              className="flex items-center justify-center py-3"
              animate={{ opacity: frameworkInView ? 1 : 0 }}
              transition={{ delay: 0.68, duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-[1px] w-16"
                  style={{ background: "rgba(61,90,217,0.22)" }}
                />
                <span
                  className="font-body text-xs font-semibold px-4 py-1.5 rounded-full"
                  style={{
                    color: accentBlue,
                    background: "rgba(61,90,217,0.08)",
                    border: "1px solid rgba(61,90,217,0.2)",
                  }}
                >
                  Alignment Mesh
                </span>
                <div
                  className="h-[1px] w-16"
                  style={{ background: "rgba(61,90,217,0.22)" }}
                />
              </div>
            </motion.div>

            {/* SELL-SIDE ROW */}
            <motion.div
              className="flex items-stretch gap-0"
              animate={{ opacity: frameworkInView ? 1 : 0, y: frameworkInView ? 0 : 20 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              <div
                className="hidden sm:flex items-center justify-center w-24 shrink-0 rounded-l-xl"
                style={{
                  background: "rgba(61,90,217,0.07)",
                  border: "1px solid rgba(61,90,217,0.18)",
                  borderRight: "none",
                }}
              >
                <span
                  className="font-body text-xs font-bold tracking-[0.14em] uppercase"
                  style={{
                    color: accentBlue,
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  Sell-Side
                </span>
              </div>
              <div
                className="flex-1 grid grid-cols-1 sm:grid-cols-3 rounded-xl sm:rounded-l-none overflow-hidden"
                style={{ border: "1px solid rgba(61,90,217,0.18)" }}
              >
                {[
                  { num: "02", label: "Bid Management", sub: "War-room proposal engineering" },
                  { num: "04", label: "Presales Support", sub: "Solution architecture & discovery" },
                  { num: "05", label: "Postsales Delivery", sub: "SOW governance & margin guard" },
                ].map((item, i, arr) => (
                  <motion.div
                    key={item.label}
                    className="p-5"
                    style={{
                      borderRight:
                        i < arr.length - 1 ? "1px solid rgba(61,90,217,0.14)" : "none",
                      background:
                        i === arr.length - 1
                          ? "rgba(61,90,217,0.06)"
                          : "rgba(61,90,217,0.025)",
                    }}
                    animate={{
                      opacity: frameworkInView ? 1 : 0,
                      y: frameworkInView ? 0 : 16,
                    }}
                    transition={{ delay: 0.9 + i * 0.12, duration: 0.65 }}
                  >
                    <span
                      className="font-mono text-xs font-bold block mb-1.5"
                      style={{ color: accentBlue }}
                    >
                      {item.num}
                    </span>
                    <p className="font-heading font-semibold text-[#0c1945] text-sm mb-0.5">
                      {item.label}
                    </p>
                    <p className="font-body text-xs text-[#334155]/50">{item.sub}</p>
                  </motion.div>
                ))}
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
              Why Enterprises Bypass the Big 4
            </span>
            <h2
              className="font-heading font-bold text-white mt-3 mb-3"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 3.2rem)",
                letterSpacing: "-0.028em",
              }}
            >
              The Commercial Excellence Landscape.
            </h2>
            <p className="font-body text-white/38 max-w-xl text-base leading-relaxed">
              Leading enterprises leave the Big 4 behind when margins are at stake. Here is why.
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
                The Big 4 Advisory Model
              </p>
            </div>
            <div
              className="px-5 py-3 rounded-xl text-center"
              style={{
                background: "rgba(5,175,242,0.08)",
                border: "1px solid rgba(5,175,242,0.22)",
              }}
            >
              <p
                className="font-body text-xs font-semibold tracking-[0.13em] uppercase"
                style={{ color: accent }}
              >
                The Northgate Operational Model
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
                    background: "rgba(5,175,242,0.08)",
                    border: "1px solid rgba(5,175,242,0.2)",
                  }}
                >
                  <div
                    className="absolute top-0 left-0 bottom-0 w-[2px]"
                    style={{
                      background: `linear-gradient(180deg, ${accent}, ${accentBlue})`,
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

      {/* MANDATE — word-by-word animation */}
      <section
        className="relative overflow-hidden py-32 text-center"
        style={{ background: "#0c1945" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(5,175,242,0.10), transparent)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.span
            className="font-body text-xs font-semibold tracking-[0.16em] uppercase block mb-12"
            style={{ color: accent }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Northgate Commercial Mandate
          </motion.span>

          {/* Line 1: word by word */}
          <div
            ref={mandateRef}
            className="font-heading font-bold text-white text-center"
            style={{
              fontSize: "clamp(1.9rem, 5vw, 5.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            {MANDATE_P1.map((word, i) => (
              <span
                key={i}
                style={{ display: "inline-block", overflow: "hidden", marginRight: "0.22em" }}
              >
                <motion.span
                  style={{ display: "inline-block" }}
                  animate={{
                    y: mandateInView ? "0%" : "105%",
                    opacity: mandateInView ? 1 : 0,
                  }}
                  transition={{
                    delay: i * 0.07,
                    duration: 0.62,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          {/* Line 2: gradient reveal */}
          <div style={{ overflow: "hidden" }}>
            <motion.p
              className="font-heading font-bold text-center"
              style={{
                fontSize: "clamp(1.9rem, 5vw, 5.5rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                background: `linear-gradient(90deg, ${accent}, ${accentBlue})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              animate={{
                y: mandateInView ? "0%" : "105%",
                opacity: mandateInView ? 1 : 0,
              }}
              transition={{
                delay: MANDATE_P1.length * 0.07 + 0.08,
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              It is a revenue multiplier.
            </motion.p>
          </div>

          <motion.p
            className="font-body text-white/40 mt-10 max-w-2xl mx-auto leading-[1.85] text-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
          >
            Whether we are helping you buy complex infrastructure or sell it, our sole
            metric of success is the optimisation of your bottom-line profitability.
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
              {["Telecom", "MVNO / MVNE", "Enterprise", "Fintech"].map((sector) => (
                <span
                  key={sector}
                  className="px-5 py-2.5 rounded-full border font-body text-sm font-medium"
                  style={{
                    borderColor: "rgba(5,175,242,0.3)",
                    color: accent,
                    background: "rgba(5,175,242,0.06)",
                  }}
                >
                  {sector}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PREV / NEXT */}
      <section className="py-10 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/what-we-do/business-consulting"
              className="flex items-center gap-3 p-5 rounded-xl border border-[#E2E8F0] hover:border-[#3d5ad9]/30 hover:bg-[#f8faff] transition-all group"
            >
              <ArrowLeft
                size={16}
                className="text-[#334155]/40 group-hover:text-[#3d5ad9] transition-colors"
              />
              <div>
                <p className="font-body text-xs text-[#334155]/40 mb-0.5">Previous</p>
                <p className="font-heading font-semibold text-sm text-[#0c1945] group-hover:text-[#3d5ad9] transition-colors">
                  Business Consulting
                </p>
              </div>
            </Link>
            <Link
              href="/what-we-do/delivery-management"
              className="flex items-center justify-end gap-3 p-5 rounded-xl border border-[#E2E8F0] hover:border-[#3d5ad9]/30 hover:bg-[#f8faff] transition-all text-right group"
            >
              <div>
                <p className="font-body text-xs text-[#334155]/40 mb-0.5">Next</p>
                <p className="font-heading font-semibold text-sm text-[#0c1945] group-hover:text-[#3d5ad9] transition-colors">
                  Delivery Management
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
      <section className="py-28 relative overflow-hidden" style={{ background: "#030611" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(5,175,242,0.09), transparent)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            className="font-heading font-light text-white/55 mb-7"
            style={{ fontSize: "clamp(1.15rem, 2vw, 1.75rem)", letterSpacing: "-0.01em" }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Bid<span style={{ color: accent }}>.</span>{" "}
            Win<span style={{ color: accent }}>.</span>{" "}
            Deliver<span style={{ color: accent }}>.</span>
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
            Secure your next
            <br />
            commercial victory.
          </motion.h2>

          <motion.p
            className="font-body text-white/38 text-lg mb-12 leading-relaxed max-w-lg mx-auto"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            In competitive enterprise markets, you don&apos;t win on luck&nbsp;— you win on
            structural superiority. Let&apos;s engineer your next RFP, scale your bid management
            engine, or bulletproof your pre- and postsales operations.
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
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-[#030611] font-heading font-semibold text-base transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${accent}, #3d9fd9)` }}
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
