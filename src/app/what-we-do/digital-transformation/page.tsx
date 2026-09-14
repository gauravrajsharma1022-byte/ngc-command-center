"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft, Map, FileText, Cpu } from "lucide-react";

/* ─── Types ───────────────────────────────────────────────────────── */

interface PillarData {
  number: string;
  Icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  name: string;
  shortName: string;
  accent: string;
  tagline: string;
  body: string;
  edge: string;
  stats: { value: string; label: string }[];
  reversed: boolean;
}

interface QuoteLine {
  text: string;
  big: boolean;
  faded?: boolean;
  cyan?: boolean;
}

/* ─── Data ────────────────────────────────────────────────────────── */

const PILLARS: PillarData[] = [
  {
    number: "01",
    Icon: Map,
    name: "High-Velocity Transformation Roadmaps",
    shortName: "Transformation Roadmaps",
    accent: "#05aff2",
    tagline: "A roadmap is a strategic sequence of compounding advantages.",
    body: "We design phased, multi-year roadmaps that prioritise quick, high-impact wins to fund long-term infrastructural shifts. Each milestone is sequenced to deliver compounding commercial advantage — not just technical readiness milestones that look good on a Gantt chart.",
    edge: "We align your technology strategy directly with EBITDA growth, ensuring every milestone delivers measurable commercial value — not abstract technical progress that takes months to manifest on the P&L.",
    stats: [
      { value: "Multi-year", label: "horizon" },
      { value: "EBITDA", label: "aligned" },
      { value: "Quick wins", label: "sequenced" },
    ],
    reversed: false,
  },
  {
    number: "02",
    Icon: Cpu,
    name: "Frictionless Enterprise Architecture",
    shortName: "Enterprise Architecture",
    accent: "#3d5ad9",
    tagline: "Modern, cloud-native architectures that dissolve operational silos.",
    body: "We replace rigid, legacy tech stacks with modular, API-driven ecosystems built to adopt next-generation AI and automation seamlessly. Operational silos are dissolved by design — not patched around with middleware that creates new fragility.",
    edge: "We build for agility, mapping your business capabilities to technical systems so your organisation can pivot instantly when market disruptions strike — without a six-month change-request cycle.",
    stats: [
      { value: "API-first", label: "design" },
      { value: "AI-ready", label: "architecture" },
      { value: "Zero", label: "vendor lock-in" },
    ],
    reversed: true,
  },
  {
    number: "03",
    Icon: FileText,
    name: "Pragmatic Digital Playbooks",
    shortName: "Digital Playbooks",
    accent: "#05aff2",
    tagline: "Strategy your teams can actually follow.",
    body: "We deliver clear, contextual digital playbooks that empower your internal teams to execute, scale, and govern new digital capabilities independently. These are not slide decks — they are working documents with decision trees, escalation paths, and accountability matrices designed for the people who will use them.",
    edge: "Our playbooks focus entirely on operational clarity, cultural adoption, and repeatable execution — so your teams can own the transformation after we leave. We remove the jargon. We focus on what happens on Monday morning.",
    stats: [
      { value: "Role-specific", label: "guides" },
      { value: "Self-serve", label: "execution" },
      { value: "Zero", label: "jargon" },
    ],
    reversed: false,
  },
];

const COMPARISON = [
  {
    driver: "Pace to Value",
    big4: "Months spent on abstract discovery, billing by the hour to produce exhaustive, static reports that are obsolete before they are presented.",
    northgate: "Accelerated diagnostic. We identify core bottlenecks within weeks — moving rapidly from strategy to execution with commercial momentum from Day 1.",
  },
  {
    driver: "Architectural Philosophy",
    big4: "Heavy bias toward enterprise software monopolies and preferred vendor ecosystems, often resulting in costly lock-in that limits future flexibility.",
    northgate: "Vendor-agnostic and modular. We architect open, flexible ecosystems tailored entirely to your goals — not a partner ecosystem or referral arrangement.",
  },
  {
    driver: "Team Composition",
    big4: "Senior partners pitch the account. Junior associates with limited real-world operating experience execute the engagement.",
    northgate: "Elite practitioners only. Every Northgate team member is a seasoned operator who has successfully led transformations from the inside.",
  },
  {
    driver: "Deliverable Utility",
    big4: "Academic, overly complex frameworks designed to justify further consulting engagements and maintain long-term billing relationships.",
    northgate: "Lightweight and actionable. Clear playbooks and living architectures designed for internal ownership — so you can execute without us.",
  },
];

const QUOTE_LINES: QuoteLine[] = [
  { text: "Most transformations fail", big: true },
  { text: "before a single line of code is written.", big: false, faded: true },
  { text: "Not from lack of vision.", big: true },
  { text: "From frameworks that crumble in the trenches.", big: true, cyan: true },
];

/* ─── Page ────────────────────────────────────────────────────────── */

export default function DigitalTransformationPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(heroScroll, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: "-120px" });

  const compRef = useRef<HTMLDivElement>(null);
  const compInView = useInView(compRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* ═══════════════════════════════════════════ HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "#030611" }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(5,175,242,0.10) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glow orb — top left */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: "55vw",
            height: "55vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(5,175,242,0.12) 0%, transparent 70%)",
            top: "-18%",
            left: "-8%",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Glow orb — bottom right */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: "38vw",
            height: "38vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(61,90,217,0.16) 0%, transparent 70%)",
            bottom: "-8%",
            right: "-4%",
          }}
          animate={{ scale: [1, 1.09, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Watermark */}
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 font-heading font-bold select-none pointer-events-none leading-none"
          style={{ fontSize: "clamp(8rem, 22vw, 20rem)", color: "rgba(255,255,255,0.022)", zIndex: 0 }}
          aria-hidden
        >
          02
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #030611)" }}
        />

        {/* Content */}
        <motion.div
          className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-28"
          style={{ y: heroContentY, opacity: heroOpacity, zIndex: 2 }}
        >
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <Link
              href="/what-we-do"
              className="inline-flex items-center gap-1.5 font-body text-xs text-white/30 hover:text-white/55 transition-colors mb-10"
            >
              <ArrowLeft size={12} />
              What We Do
            </Link>
          </motion.div>

          {/* Badge */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <span
              className="font-mono text-xs font-bold px-2.5 py-1 rounded-md"
              style={{
                color: "#05aff2",
                background: "rgba(5,175,242,0.12)",
                border: "1px solid rgba(5,175,242,0.28)",
              }}
            >
              02
            </span>
            <span className="font-body text-xs font-semibold tracking-[0.16em] uppercase text-white/30">
              Practice Area
            </span>
          </motion.div>

          {/* Headline — clip reveal */}
          <div
            className="font-heading font-bold text-white leading-[1.0]"
            style={{ fontSize: "clamp(3rem, 7.5vw, 8rem)", letterSpacing: "-0.04em" }}
          >
            {[
              { text: "Beyond the", cyan: false },
              { text: "Blueprint.", cyan: true },
            ].map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.div
                  initial={{ y: "108%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ delay: 0.35 + i * 0.18, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line.cyan ? (
                    <span
                      style={{
                        background: "linear-gradient(90deg, #05aff2 0%, #7bb8f5 55%, #3d5ad9 100%)",
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

          {/* Tagline */}
          <motion.p
            className="font-body text-white/45 mt-8 max-w-2xl leading-relaxed"
            style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.76, duration: 0.7 }}
          >
            Why tomorrow&apos;s market leaders choose Northgate for Digital Transformation.
            We design and deliver transformation programmes grounded in business reality.
            Technology follows strategy here — not the other way around.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-10"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-heading font-semibold text-sm text-[#030611] transition-all hover:opacity-90 shadow-lg"
              style={{ background: "linear-gradient(135deg, #05aff2, #3d9fd9)" }}
            >
              Start a Conversation <ArrowRight size={15} />
            </Link>
            <Link
              href="/what-we-do"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/15 text-white/50 font-heading font-medium text-sm hover:text-white hover:border-white/30 transition-all"
            >
              All Practice Areas
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════ PULL QUOTE */}
      <section style={{ background: "#ffffff" }} className="overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <motion.span
            className="font-body text-xs font-semibold tracking-[0.16em] uppercase block mb-12"
            style={{ color: "#05aff2" }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Transformation Reality
          </motion.span>

          <div ref={quoteRef}>
            {QUOTE_LINES.map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.div
                  style={{
                    display: "block",
                    fontSize: line.big ? "clamp(2.2rem, 5.5vw, 6rem)" : "clamp(1.1rem, 2.4vw, 2.6rem)",
                    letterSpacing: "-0.032em",
                    lineHeight: line.big ? 1.05 : 1.45,
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    color: line.faded ? "rgba(12,25,69,0.25)" : "rgba(12,25,69,0.85)",
                    ...(line.cyan
                      ? ({
                          background: "linear-gradient(90deg, #05aff2, #3d5ad9)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        } as React.CSSProperties)
                      : {}),
                  }}
                  animate={{
                    y: quoteInView ? "0%" : "110%",
                    opacity: quoteInView ? 1 : 0,
                  }}
                  transition={{ delay: i * 0.14, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line.text}
                </motion.div>
              </div>
            ))}
          </div>

          <motion.div
            className="mt-14 pt-10 border-t border-[#E2E8F0] grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="font-body text-[#334155]/55 leading-[1.85] text-base">
              At Northgate, we don&apos;t sell slides. We build the operational architecture of tomorrow — translating complex corporate ambitions into high-velocity digital realities.
            </p>
            <p className="font-body text-[#334155]/55 leading-[1.85] text-base">
              Three core disciplines: Bespoke Transformation Roadmaps, Living Enterprise Architecture, and Actionable Digital Playbooks — each designed to be owned by your organisation, not us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════ THREE PILLARS */}
      <section style={{ background: "#f8faff" }} className="border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="font-body text-xs font-semibold tracking-[0.16em] uppercase"
              style={{ color: "#05aff2" }}
            >
              Our Core Pillars of Expertise
            </span>
            <h2
              className="font-heading font-bold text-[#0c1945] mt-3"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", letterSpacing: "-0.022em" }}
            >
              Three disciplines. One transformation.
            </h2>
          </motion.div>
        </div>

        {PILLARS.map((p, idx) => {
          const Icon = p.Icon;
          return (
            <div
              key={p.number}
              className="border-t border-[#E2E8F0]"
              style={{ background: idx % 2 === 0 ? "#f8faff" : "#ffffff" }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                  {/* Text block */}
                  <motion.div
                    className={p.reversed ? "lg:order-2" : ""}
                    initial={{ opacity: 0, x: p.reversed ? 28 : -28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="font-mono text-xs font-bold px-2.5 py-1 rounded-md"
                        style={{ color: p.accent, background: `${p.accent}18`, border: `1px solid ${p.accent}30` }}
                      >
                        {p.number}
                      </span>
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${p.accent}14`, border: `1px solid ${p.accent}25` }}
                      >
                        <Icon size={16} style={{ color: p.accent }} />
                      </div>
                    </div>

                    <h3
                      className="font-heading font-bold text-[#0c1945] mb-2 leading-tight"
                      style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.3rem)", letterSpacing: "-0.022em" }}
                    >
                      {p.name}
                    </h3>

                    <p
                      className="font-body font-medium mb-5"
                      style={{ color: p.accent, fontSize: "0.95rem" }}
                    >
                      {p.tagline}
                    </p>

                    <p className="font-body text-[#334155]/65 leading-[1.85] mb-7 text-base">
                      {p.body}
                    </p>

                    {/* Northgate Edge */}
                    <div
                      className="rounded-xl p-5"
                      style={{
                        background: `${p.accent}08`,
                        border: `1px solid ${p.accent}22`,
                        boxShadow: `inset 3px 0 0 ${p.accent}`,
                      }}
                    >
                      <p
                        className="font-body text-xs font-bold tracking-[0.13em] uppercase mb-2"
                        style={{ color: p.accent }}
                      >
                        The Northgate Edge
                      </p>
                      <p className="font-body text-sm text-[#0c1945]/70 leading-relaxed">
                        {p.edge}
                      </p>
                    </div>
                  </motion.div>

                  {/* Visual card */}
                  <motion.div
                    className={p.reversed ? "lg:order-1" : ""}
                    initial={{ opacity: 0, x: p.reversed ? -28 : 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div
                      className="relative rounded-2xl overflow-hidden"
                      style={{
                        background:
                          p.accent === "#05aff2"
                            ? "linear-gradient(135deg, #030f2e 0%, #061a3a 45%, #020b1e 100%)"
                            : "linear-gradient(135deg, #02060f 0%, #060e28 45%, #020712 100%)",
                        boxShadow: `0 0 0 1px ${p.accent}20, 0 32px 80px rgba(0,0,0,0.4)`,
                        minHeight: "420px",
                      }}
                    >
                      {/* Dot pattern */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: `radial-gradient(circle, ${p.accent}15 1px, transparent 1px)`,
                          backgroundSize: "32px 32px",
                        }}
                      />
                      {/* Glow */}
                      <div
                        className="absolute pointer-events-none"
                        style={{
                          width: "300px",
                          height: "300px",
                          borderRadius: "50%",
                          background: `radial-gradient(circle, ${p.accent}1a 0%, transparent 70%)`,
                          top: "-80px",
                          right: "-80px",
                        }}
                      />

                      <div
                        className="relative p-8 flex flex-col justify-between"
                        style={{ minHeight: "420px" }}
                      >
                        {/* Top */}
                        <div className="flex items-start justify-between">
                          <span
                            className="font-mono font-bold leading-none"
                            style={{
                              fontSize: "clamp(4rem, 9vw, 7rem)",
                              color: `${p.accent}1e`,
                              letterSpacing: "-0.05em",
                            }}
                          >
                            {p.number}
                          </span>
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: `${p.accent}18`, border: `1px solid ${p.accent}35` }}
                          >
                            <Icon size={22} style={{ color: p.accent }} />
                          </div>
                        </div>

                        {/* Bottom */}
                        <div>
                          <h4
                            className="font-heading font-bold text-white mb-1"
                            style={{ fontSize: "clamp(1.15rem, 1.9vw, 1.6rem)", letterSpacing: "-0.018em" }}
                          >
                            {p.shortName}
                          </h4>
                          <p className="font-body text-sm mb-7" style={{ color: `${p.accent}cc` }}>
                            {p.tagline}
                          </p>

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-3">
                            {p.stats.map((stat) => (
                              <div
                                key={stat.label}
                                className="p-3 rounded-xl text-center"
                                style={{
                                  background: "rgba(255,255,255,0.04)",
                                  border: `1px solid ${p.accent}1e`,
                                }}
                              >
                                <p
                                  className="font-heading font-bold text-white"
                                  style={{
                                    fontSize: "clamp(0.82rem, 1.4vw, 1.05rem)",
                                    letterSpacing: "-0.015em",
                                    marginBottom: "2px",
                                  }}
                                >
                                  {stat.value}
                                </p>
                                <p
                                  className="font-body uppercase tracking-wide"
                                  style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)" }}
                                >
                                  {stat.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ════════════════════════════ NORTHGATE DIFFERENCE */}
      <section style={{ background: "#030611" }} className="overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">

          {/* Header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="font-body text-xs font-semibold tracking-[0.16em] uppercase"
              style={{ color: "#05aff2" }}
            >
              Why We Outpace the Big 4
            </span>
            <h2
              className="font-heading font-bold text-white mt-3 mb-3"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3.2rem)", letterSpacing: "-0.028em" }}
            >
              The Northgate Difference.
            </h2>
            <p className="font-body text-white/40 max-w-xl text-base leading-relaxed">
              When companies outgrow cookie-cutter advice, they leave the Big 4 behind.
              Here is how we differ — fundamentally.
            </p>
          </motion.div>

          {/* Column headers — desktop only */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_1fr_1fr] gap-4 mb-4">
            <div />
            <div
              className="px-5 py-3 rounded-xl text-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="font-body text-xs font-semibold tracking-[0.13em] uppercase text-white/30">
                The Big 4 Approach
              </p>
            </div>
            <div
              className="px-5 py-3 rounded-xl text-center"
              style={{ background: "rgba(5,175,242,0.08)", border: "1px solid rgba(5,175,242,0.22)" }}
            >
              <p
                className="font-body text-xs font-semibold tracking-[0.13em] uppercase"
                style={{ color: "#05aff2" }}
              >
                The Northgate Edge
              </p>
            </div>
          </div>

          {/* Comparison rows */}
          <div ref={compRef} className="space-y-4">
            {COMPARISON.map((row, i) => (
              <motion.div
                key={row.driver}
                className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-4"
                animate={{ opacity: compInView ? 1 : 0, y: compInView ? 0 : 28 }}
                transition={{ delay: 0.08 + i * 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Driver */}
                <div className="flex items-center lg:pr-6">
                  <span
                    className="font-heading font-semibold text-white/70"
                    style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)", letterSpacing: "-0.01em" }}
                  >
                    {row.driver}
                  </span>
                </div>

                {/* Big 4 */}
                <div
                  className="p-5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="font-body text-xs font-semibold tracking-[0.12em] uppercase text-white/22 mb-2 lg:hidden">
                    The Big 4 Approach
                  </p>
                  <p className="font-body text-sm text-white/35 leading-relaxed">
                    {row.big4}
                  </p>
                </div>

                {/* Northgate */}
                <div
                  className="relative p-5 rounded-xl overflow-hidden"
                  style={{ background: "rgba(5,175,242,0.07)", border: "1px solid rgba(5,175,242,0.2)" }}
                >
                  <div
                    className="absolute top-0 left-0 bottom-0 w-[2px]"
                    style={{ background: "linear-gradient(180deg, #05aff2, #3d5ad9)" }}
                  />
                  <p
                    className="font-body text-xs font-semibold tracking-[0.12em] uppercase mb-2 lg:hidden"
                    style={{ color: "#05aff2", opacity: 0.7 }}
                  >
                    The Northgate Edge
                  </p>
                  <p className="font-body text-sm text-white/75 leading-relaxed pl-3">
                    {row.northgate}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ THE MANDATE */}
      <section
        className="relative overflow-hidden py-32"
        style={{ background: "#0c1945" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 65% 80% at 15% 60%, rgba(5,175,242,0.10), transparent)",
          }}
        />
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.span
            className="font-body text-xs font-semibold tracking-[0.16em] uppercase block mb-8"
            style={{ color: "#05aff2" }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Northgate Mandate
          </motion.span>

          <motion.p
            className="font-heading font-bold text-white leading-snug"
            style={{ fontSize: "clamp(2rem, 5vw, 5rem)", letterSpacing: "-0.03em" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            We do not believe
            <br />
            in perpetual consulting.
          </motion.p>

          <motion.p
            className="font-body text-white/45 mt-8 max-w-2xl leading-[1.85] text-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28 }}
          >
            Our ultimate metric of success is how fast and effectively your organisation can
            run, innovate, and dominate — without us. We build internal capability, not
            dependency. Every engagement ends with your teams stronger than when we arrived.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-14"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {[
              {
                number: "01",
                label: "Internal Capability",
                body: "We transfer knowledge into your team — not create a billing dependency that never ends.",
              },
              {
                number: "02",
                label: "Speed to Independence",
                body: "Your teams own the outcome from Day 1. We design every deliverable for handover, not retention.",
              },
              {
                number: "03",
                label: "Real Transformation",
                body: "We stay until the change is visible in the business — not just signed off in a steering committee.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="p-6 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
              >
                <span
                  className="font-mono text-xs font-bold block mb-3"
                  style={{ color: "#05aff2" }}
                >
                  {item.number}
                </span>
                <p className="font-heading font-semibold text-white text-sm mb-2">{item.label}</p>
                <p className="font-body text-sm text-white/40 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════ SECTORS */}
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
              {["Telecom", "Enterprise", "Healthcare", "Fintech"].map((sector) => (
                <span
                  key={sector}
                  className="px-5 py-2.5 rounded-full border font-body text-sm font-medium"
                  style={{
                    borderColor: "rgba(5,175,242,0.3)",
                    color: "#05aff2",
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

      {/* ═══════════════════════════════════ PREV / NEXT */}
      <section className="py-10 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/what-we-do/strategic-advisory"
              className="flex items-center gap-3 p-5 rounded-xl border border-[#E2E8F0] hover:border-[#3d5ad9]/30 hover:bg-[#f8faff] transition-all group"
            >
              <ArrowLeft size={16} className="text-[#334155]/40 group-hover:text-[#3d5ad9] transition-colors" />
              <div>
                <p className="font-body text-xs text-[#334155]/40 mb-0.5">Previous</p>
                <p className="font-heading font-semibold text-sm text-[#0c1945] group-hover:text-[#3d5ad9] transition-colors">
                  Strategic Advisory
                </p>
              </div>
            </Link>
            <Link
              href="/what-we-do/business-consulting"
              className="flex items-center justify-end gap-3 p-5 rounded-xl border border-[#E2E8F0] hover:border-[#3d5ad9]/30 hover:bg-[#f8faff] transition-all text-right group"
            >
              <div>
                <p className="font-body text-xs text-[#334155]/40 mb-0.5">Next</p>
                <p className="font-heading font-semibold text-sm text-[#0c1945] group-hover:text-[#3d5ad9] transition-colors">
                  Business Consulting
                </p>
              </div>
              <ArrowRight size={16} className="text-[#334155]/40 group-hover:text-[#3d5ad9] transition-colors" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ CTA */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: "#0c1945" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 65% 65% at 50% 50%, rgba(5,175,242,0.10), transparent)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">

          <motion.p
            className="font-heading font-light text-white/65 mb-7"
            style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.85rem)", letterSpacing: "-0.01em" }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Strategy<span style={{ color: "#05aff2" }}>.</span>{" "}
            Architecture<span style={{ color: "#05aff2" }}>.</span>{" "}
            Execution<span style={{ color: "#05aff2" }}>.</span>
          </motion.p>

          <motion.h2
            className="font-heading font-bold text-white mb-5 leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3.8vw, 3.2rem)", letterSpacing: "-0.028em" }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Ready to turn strategy
            <br />
            into execution?
          </motion.h2>

          <motion.p
            className="font-body text-white/40 text-lg mb-12 leading-relaxed max-w-lg mx-auto"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Digital transformation isn&apos;t about adopting more software. It&apos;s about
            building a faster, more resilient organisation. Let&apos;s discuss how Northgate
            can architect your next competitive advantage.
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
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-[#030611] font-heading font-semibold text-base transition-all hover:opacity-90 shadow-lg"
              style={{ background: "linear-gradient(135deg, #05aff2, #3d9fd9)" }}
            >
              Start a Conversation <ArrowRight size={17} />
            </Link>
            <Link
              href="/what-we-do"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/15 text-white/55 font-heading font-medium text-base hover:text-white hover:border-white/30 transition-all"
            >
              View All Practice Areas
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
