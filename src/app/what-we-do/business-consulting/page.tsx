"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft, Layers, Users, GitMerge } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────── */

interface PillarData {
  number: string;
  Icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  name: string;
  accent: string;
  tagline: string;
  intro: string;
  methodology: string;
  edge: string;
  image: string;
  imgFallback: string;
  reversed: boolean;
  lightBg: boolean;
}

interface QuoteLine {
  text: string;
  big: boolean;
  faded?: boolean;
  blue?: boolean;
}

/* ─── Data ──────────────────────────────────────────────────────────── */

const PILLARS: PillarData[] = [
  {
    number: "01",
    Icon: Layers,
    name: "Industry-Standard Process Architecture",
    accent: "#3d5ad9",
    tagline: "Build the operational taxonomy before the technology stack.",
    intro: "We don't invent processes from scratch, nor map them in isolation. Northgate builds highly structured taxonomies using globally recognised operational standards — creating an auditable, scalable foundation before any technology decision is made.",
    methodology: "We anchor your business mapping to two established frameworks: APQC's Process Classification Framework (PCF) for cross-industry optimisation, and TM Forum's eTOM Business Process Framework for complex, tiered telecom operations.",
    edge: "By mapping your Level 1 through Level 5 workflows to global benchmarks, we identify operational redundancies within weeks — and build a standardised foundation for automation that any technology can be layered onto.",
    image: "/images/BC Process.jpg",
    imgFallback: "linear-gradient(135deg, #060e28 0%, #0d1d4a 50%, #040a1c 100%)",
    reversed: false,
    lightBg: false,
  },
  {
    number: "02",
    Icon: Users,
    name: "Persona-Driven Journey Mapping",
    accent: "#3d5ad9",
    tagline: "Processes are lived by employees and experienced by customers.",
    intro: "We overlay structured process maps with deep, ethnographic persona research. Not generic user stories — real friction mapping from the frontline up, tracking daily cognitive overload and the legacy bottlenecks nobody documents.",
    methodology: "We track daily employee friction, cognitive overload, and legacy bottlenecks to design target-state journeys that reflect how your organisation actually works — not how the org chart says it should.",
    edge: "Operational efficiency must never come at the cost of user adoption. By designing for the actual practitioner — not the idealised persona — we guarantee high-velocity alignment between human workflow and backend technology.",
    image: "/images/BC Journey.jpg",
    imgFallback: "linear-gradient(135deg, #eef3ff 0%, #dce8ff 50%, #f2f6ff 100%)",
    reversed: true,
    lightBg: true,
  },
  {
    number: "03",
    Icon: GitMerge,
    name: "Solution Consulting: Legacy & Digital Enablers",
    accent: "#3d5ad9",
    tagline: "A great process map is useless if your architecture cannot support it.",
    intro: "We look at your business through a dual lens: maximising the value of your current legacy systems while selectively introducing hyper-efficient digital enablers — AI, RPA, or API integration meshes where they genuinely add margin.",
    methodology: "We conduct thorough fit-gap analyses to determine exactly where to refactor legacy infrastructure and where to deploy modern solutions. Every recommendation is evidence-based, not vendor-motivated.",
    edge: "We are entirely vendor-agnostic. We don't recommend a software suite because of a strategic partnership — we engineer solutions solely to protect your margins and accelerate your speed-to-market.",
    image: "/images/BC Solution.jpg",
    imgFallback: "linear-gradient(135deg, #060e28 0%, #0d1d4a 50%, #040a1c 100%)",
    reversed: false,
    lightBg: false,
  },
];

const COMPARISON = [
  {
    criteria: "Mapping Depth",
    big4: "High-level Level 1-2 generic capability maps that rarely account for frontline operational realities.",
    northgate: "Rigorous Level 1-5 decomposition: granular, auditable workflows anchored to APQC and eTOM standards.",
  },
  {
    criteria: "User Alignment",
    big4: "Change management treated as a post-implementation afterthought, leading to poor system adoption.",
    northgate: "Persona-Driven Design: workflows built from the user outward, mapping emotional friction to system touchpoints.",
  },
  {
    criteria: "Technology Objectivity",
    big4: "Strong commercial bias toward monolithic SaaS partners, frequently leading to multi-million dollar vendor lock-ins.",
    northgate: "True Solution Agnosticism: wrapping legacy core assets with targeted digital enablers to minimise capital expenditure.",
  },
  {
    criteria: "Execution Velocity",
    big4: "Protracted, billable-by-the-hour alignment cycles led by junior resources using cookie-cutter templates.",
    northgate: "Practitioner-Led Sprints: led by seasoned industry consultants who deliver execution-ready blueprints in half the time.",
  },
];

const QUOTE_LINES: QuoteLine[] = [
  { text: "Academic strategy.", big: false, faded: true },
  { text: "Or rushed deployment.", big: true },
  { text: "Northgate eliminates", big: true },
  { text: "the compromise.", big: true, blue: true },
];

const PHILOSOPHY_WORDS = "Technology is an amplifier, not a savior.".split(" ");

/* ─── Page ──────────────────────────────────────────────────────────── */

export default function BusinessConsultingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "22%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.72], [1, 0]);

  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: "-120px" });

  const philoRef = useRef<HTMLDivElement>(null);
  const philoInView = useInView(philoRef, { once: true, margin: "-100px" });

  const compRef = useRef<HTMLDivElement>(null);
  const compInView = useInView(compRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* ══════════════════════════ HERO — SPLIT SCREEN */}
      <section
        ref={heroRef}
        className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
      >
        {/* Left — dark text panel */}
        <div
          className="relative flex items-center overflow-hidden"
          style={{ background: "#030611" }}
        >
          {/* Diagonal line grid — distinguishes from DT's dot grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(61,90,217,0.06) 0px, rgba(61,90,217,0.06) 1px, transparent 1px, transparent 64px)",
            }}
          />
          {/* Glow */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: "55%",
              height: "55%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(61,90,217,0.13) 0%, transparent 70%)",
              top: "-8%",
              right: "-5%",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Content */}
          <motion.div
            className="relative w-full px-8 sm:px-12 lg:px-14 xl:px-20 pt-36 pb-20 lg:pt-0 lg:pb-0"
            style={{ y: heroTextY, opacity: heroOpacity }}
          >
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <span
                className="font-mono text-xs font-bold px-2.5 py-1 rounded-md"
                style={{
                  color: "#3d5ad9",
                  background: "rgba(61,90,217,0.12)",
                  border: "1px solid rgba(61,90,217,0.28)",
                }}
              >
                03
              </span>
              <span className="font-body text-xs font-semibold tracking-[0.16em] uppercase text-white/28">
                Practice Area
              </span>
            </motion.div>

            {/* Headline — clip reveal */}
            <div
              className="font-heading font-bold text-white leading-[1.0] mb-8"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 6.5rem)", letterSpacing: "-0.038em" }}
            >
              {[
                { text: "Operational", blue: false },
                { text: "Integrity", blue: false },
                { text: "by Design.", blue: true },
              ].map((line, i) => (
                <div key={i} style={{ overflow: "hidden" }}>
                  <motion.div
                    initial={{ y: "108%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ delay: 0.35 + i * 0.16, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line.blue ? (
                      <span
                        style={{
                          background: "linear-gradient(90deg, #3d5ad9 0%, #7b9ef5 50%, #05aff2 100%)",
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
              className="font-body text-white/40 mb-10 max-w-md leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.6vw, 1.15rem)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
            >
              Practitioner-led consulting that establishes structural operational excellence before technology is ever introduced.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.97 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-heading font-semibold text-sm text-white transition-all hover:opacity-90 shadow-lg"
                style={{ background: "#3d5ad9" }}
              >
                Start a Conversation <ArrowRight size={15} />
              </Link>
              <Link
                href="/what-we-do"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/15 text-white/45 font-heading font-medium text-sm hover:text-white hover:border-white/30 transition-all"
              >
                All Practice Areas
              </Link>
            </motion.div>

            {/* Framework badges */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              {["APQC PCF", "TM Forum eTOM", "Level 1-5 Mapping", "Vendor-Agnostic"].map((badge) => (
                <span
                  key={badge}
                  className="font-body text-xs px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "rgba(255,255,255,0.38)",
                  }}
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right — large editorial image */}
        <div
          className="relative min-h-[55vw] lg:min-h-0 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0a1634 0%, #1a2e60 50%, #0a1228 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(61,90,217,0.12) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              width: "70%",
              height: "70%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(61,90,217,0.17) 0%, transparent 70%)",
              bottom: "0",
              right: "10%",
            }}
          />
          <Image
            src="/images/BC Hero.jpg"
            fill
            className="object-cover"
            alt="Business Consulting — Northgate"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {/* Left-edge blend into text panel */}
          <div
            className="absolute inset-y-0 left-0 w-32 pointer-events-none hidden lg:block"
            style={{ background: "linear-gradient(to right, #030611, transparent)" }}
          />
          {/* Practice number watermark */}
          <div
            className="absolute bottom-6 right-6 font-heading font-bold select-none pointer-events-none leading-none"
            style={{ fontSize: "clamp(6rem, 12vw, 11rem)", color: "rgba(255,255,255,0.055)" }}
            aria-hidden
          >
            03
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ BRIDGE — BOLD STATEMENT */}
      <section style={{ background: "#ffffff" }} className="border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span
                className="font-body text-xs font-semibold tracking-[0.16em] uppercase block mb-4"
                style={{ color: "#3d5ad9" }}
              >
                Our Approach
              </span>
              <div
                className="w-10 h-[3px] rounded-full"
                style={{ background: "linear-gradient(90deg, #3d5ad9, #05aff2)" }}
              />
            </motion.div>
            <motion.p
              className="font-heading font-bold text-[#0c1945] leading-snug"
              style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.6rem)", letterSpacing: "-0.025em" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              We bridge the gap between human execution and digital scale through three pillars:
              Standardised Process Architecture, Persona-Driven Journey Mapping,
              and Pragmatic Solution Consulting.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════ PULL QUOTE */}
      <section style={{ background: "#f8faff" }} className="overflow-hidden border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <motion.span
            className="font-body text-xs font-semibold tracking-[0.16em] uppercase block mb-14"
            style={{ color: "#3d5ad9" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Consulting Gap
          </motion.span>

          <div ref={quoteRef}>
            {QUOTE_LINES.map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.div
                  style={{
                    display: "block",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: line.big
                      ? "clamp(2.4rem, 6vw, 6.5rem)"
                      : "clamp(1.1rem, 2.2vw, 2.2rem)",
                    letterSpacing: "-0.034em",
                    lineHeight: line.big ? 1.04 : 1.5,
                    color: line.faded ? "rgba(12,25,69,0.22)" : "rgba(12,25,69,0.88)",
                    ...(line.blue
                      ? ({
                          background: "linear-gradient(90deg, #3d5ad9 0%, #05aff2 100%)",
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
                  transition={{ delay: i * 0.13, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line.text}
                </motion.div>
              </div>
            ))}
          </div>

          <motion.p
            className="font-body text-[#334155]/50 mt-12 max-w-2xl leading-relaxed"
            style={{ fontSize: "1.05rem" }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55 }}
          >
            Large enterprises are forced to choose between academic advisory firms — high-level, generic strategies — or systems integrators who rush into deployment without understanding core business mechanics. At Northgate, we eliminate this false choice.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════ PILLARS SECTION LABEL */}
      <div style={{ background: "#030611" }} className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center gap-5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="font-body text-xs font-semibold tracking-[0.16em] uppercase shrink-0"
              style={{ color: "#3d5ad9" }}
            >
              Core Pillars of Our Business Practice
            </span>
            <div className="hidden sm:block h-[1px] flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
            <div className="flex gap-3 flex-wrap">
              {["Process Architecture", "Journey Mapping", "Solution Consulting"].map((label, i) => (
                <span
                  key={label}
                  className="font-body text-xs px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(61,90,217,0.12)",
                    border: "1px solid rgba(61,90,217,0.22)",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  <span style={{ color: "#3d5ad9", marginRight: "5px" }}>0{i + 1}</span>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════ THREE PILLAR SECTIONS (full-bleed) */}
      {PILLARS.map((p) => {
        const Icon = p.Icon;
        return (
          <section
            key={p.number}
            className="border-b border-[#E2E8F0]/20"
            style={{ background: p.lightBg ? "#ffffff" : "#030611" }}
          >
            <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[640px] items-stretch`}>

              {/* Text column */}
              <motion.div
                className={`flex flex-col justify-center py-20 px-8 sm:px-12 lg:px-16 xl:px-20 ${p.reversed ? "lg:order-2" : ""}`}
                initial={{ opacity: 0, x: p.reversed ? 32 : -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="max-w-[560px] mx-auto lg:mx-0">
                  {/* Badge row */}
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="font-mono text-xs font-bold px-2.5 py-1 rounded-md"
                      style={{
                        color: p.accent,
                        background: `${p.accent}18`,
                        border: `1px solid ${p.accent}30`,
                      }}
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
                    className="font-heading font-bold mb-2 leading-tight"
                    style={{
                      fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                      letterSpacing: "-0.022em",
                      color: p.lightBg ? "#0c1945" : "#ffffff",
                    }}
                  >
                    {p.name}
                  </h3>

                  <p
                    className="font-body font-medium mb-5"
                    style={{ color: p.accent, fontSize: "0.95rem" }}
                  >
                    {p.tagline}
                  </p>

                  <p
                    className="font-body leading-[1.85] mb-7 text-base"
                    style={{
                      color: p.lightBg ? "rgba(51,65,85,0.65)" : "rgba(255,255,255,0.48)",
                    }}
                  >
                    {p.intro}
                  </p>

                  {/* Methodology box — top bar accent */}
                  <div
                    className="relative rounded-xl p-5 mb-4 overflow-hidden"
                    style={{
                      background: p.lightBg ? `${p.accent}07` : "rgba(61,90,217,0.09)",
                      border: `1px solid ${p.accent}20`,
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl"
                      style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }}
                    />
                    <p
                      className="font-body text-xs font-bold tracking-[0.13em] uppercase mb-2"
                      style={{ color: p.accent }}
                    >
                      The Methodology
                    </p>
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={{
                        color: p.lightBg ? "rgba(51,65,85,0.68)" : "rgba(255,255,255,0.42)",
                      }}
                    >
                      {p.methodology}
                    </p>
                  </div>

                  {/* Edge box — left bar accent */}
                  <div
                    className="relative rounded-xl p-5 overflow-hidden"
                    style={{
                      background: p.lightBg ? `${p.accent}0d` : "rgba(61,90,217,0.12)",
                      border: `1px solid ${p.accent}28`,
                    }}
                  >
                    <div
                      className="absolute top-0 bottom-0 left-0 w-[3px]"
                      style={{ background: `linear-gradient(180deg, ${p.accent}, #05aff2)` }}
                    />
                    <p
                      className="font-body text-xs font-bold tracking-[0.13em] uppercase mb-2 pl-3"
                      style={{ color: p.accent }}
                    >
                      The Northgate Edge
                    </p>
                    <p
                      className="font-body text-sm leading-relaxed pl-3"
                      style={{
                        color: p.lightBg ? "rgba(12,25,69,0.70)" : "rgba(255,255,255,0.60)",
                      }}
                    >
                      {p.edge}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Image column — full-bleed editorial */}
              <motion.div
                className={`relative min-h-[440px] lg:min-h-0 overflow-hidden ${p.reversed ? "lg:order-1" : ""}`}
                style={{ background: p.imgFallback }}
                initial={{ opacity: 0, x: p.reversed ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Dot pattern fallback texture */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle, ${p.accent}${p.lightBg ? "22" : "18"} 1px, transparent 1px)`,
                    backgroundSize: "28px 28px",
                  }}
                />
                {/* Radial glow */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    width: "70%",
                    height: "70%",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${p.accent}18 0%, transparent 70%)`,
                    top: "15%",
                    left: "15%",
                  }}
                />
                <Image
                  src={p.image}
                  fill
                  className="object-cover"
                  alt={p.name}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Edge blend — fade toward text panel */}
                {p.reversed ? (
                  <div
                    className="absolute inset-y-0 right-0 w-28 pointer-events-none hidden lg:block"
                    style={{
                      background: `linear-gradient(to left, ${p.lightBg ? "#ffffff" : "#030611"}, transparent)`,
                    }}
                  />
                ) : (
                  <div
                    className="absolute inset-y-0 left-0 w-28 pointer-events-none hidden lg:block"
                    style={{
                      background: `linear-gradient(to right, ${p.lightBg ? "#ffffff" : "#030611"}, transparent)`,
                    }}
                  />
                )}
                {/* Oversized number watermark */}
                <div
                  className="absolute bottom-6 right-7 font-heading font-bold select-none pointer-events-none leading-none"
                  style={{
                    fontSize: "clamp(7rem, 14vw, 13rem)",
                    color: p.lightBg ? `${p.accent}14` : `${p.accent}22`,
                  }}
                  aria-hidden
                >
                  {p.number}
                </div>
              </motion.div>

            </div>
          </section>
        );
      })}

      {/* ═════════════════════════════════ COMPARISON TABLE */}
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
              style={{ color: "#3d5ad9" }}
            >
              The Business Consulting Landscape
            </span>
            <h2
              className="font-heading font-bold text-white mt-3 mb-3"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3.2rem)", letterSpacing: "-0.028em" }}
            >
              Northgate vs. The Big 4.
            </h2>
            <p className="font-body text-white/38 max-w-xl text-base leading-relaxed">
              Not all business consulting is equal. Here is exactly how the engagement models differ — in practice, not on a website.
            </p>
          </motion.div>

          {/* Desktop column labels */}
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
                The Big 4 Engagement Model
              </p>
            </div>
            <div
              className="px-5 py-3 rounded-xl text-center"
              style={{
                background: "rgba(61,90,217,0.08)",
                border: "1px solid rgba(61,90,217,0.22)",
              }}
            >
              <p
                className="font-body text-xs font-semibold tracking-[0.13em] uppercase"
                style={{ color: "#3d5ad9" }}
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
                animate={{ opacity: compInView ? 1 : 0, y: compInView ? 0 : 24 }}
                transition={{ delay: 0.06 + i * 0.09, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Criteria label */}
                <div className="flex items-center">
                  <span
                    className="font-heading font-semibold text-white/65"
                    style={{ fontSize: "0.95rem", letterSpacing: "-0.01em" }}
                  >
                    {row.criteria}
                  </span>
                </div>

                {/* Big 4 cell */}
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

                {/* Northgate cell */}
                <div
                  className="relative p-5 rounded-xl overflow-hidden"
                  style={{
                    background: "rgba(61,90,217,0.08)",
                    border: "1px solid rgba(61,90,217,0.2)",
                  }}
                >
                  <div
                    className="absolute top-0 left-0 bottom-0 w-[2px]"
                    style={{ background: "linear-gradient(180deg, #3d5ad9, #05aff2)" }}
                  />
                  <p
                    className="font-body text-xs font-bold uppercase tracking-wider mb-2 pl-3 lg:hidden"
                    style={{ color: "#3d5ad9", opacity: 0.7 }}
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

      {/* ═══════════════════════════ PHILOSOPHY — WORD ANIMATION */}
      <section
        className="relative overflow-hidden py-32 text-center"
        style={{ background: "#0c1945" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(61,90,217,0.13), transparent)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.span
            className="font-body text-xs font-semibold tracking-[0.16em] uppercase block mb-12"
            style={{ color: "#3d5ad9" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Northgate Operational Philosophy
          </motion.span>

          {/* Word-by-word reveal — premium animation */}
          <div
            ref={philoRef}
            className="font-heading font-bold text-white text-center"
            style={{
              fontSize: "clamp(2.5rem, 6.5vw, 7rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            {PHILOSOPHY_WORDS.map((word, i) => (
              <span
                key={i}
                style={{ display: "inline-block", overflow: "hidden", marginRight: "0.24em" }}
              >
                <motion.span
                  style={{ display: "inline-block" }}
                  animate={{
                    y: philoInView ? "0%" : "100%",
                    opacity: philoInView ? 1 : 0,
                  }}
                  transition={{ delay: i * 0.09, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          <motion.p
            className="font-body text-white/40 mt-10 max-w-2xl mx-auto leading-[1.85] text-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.75 }}
          >
            If you automate a broken, unstructured business process, you simply accelerate inefficiency.
            We fix the architecture first. Then — and only then — we scale it.
          </motion.p>

          {/* Three mandate pillars */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
          >
            {[
              { label: "Process First", body: "Design the business architecture before any technology selection." },
              { label: "User-Centred", body: "Efficiency gains mean nothing without human adoption." },
              { label: "Vendor-Agnostic", body: "Solutions chosen for your margins — not our referral fees." },
            ].map((item) => (
              <div
                key={item.label}
                className="p-5 rounded-2xl text-left"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                <p className="font-heading font-semibold text-white text-sm mb-2">{item.label}</p>
                <p className="font-body text-xs text-white/38 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ SECTORS */}
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
              {["Telecom", "MVNO / MVNE", "Healthcare", "Enterprise"].map((sector) => (
                <span
                  key={sector}
                  className="px-5 py-2.5 rounded-full border font-body text-sm font-medium"
                  style={{
                    borderColor: "rgba(61,90,217,0.3)",
                    color: "#3d5ad9",
                    background: "rgba(61,90,217,0.06)",
                  }}
                >
                  {sector}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════ PREV / NEXT */}
      <section className="py-10 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/what-we-do/digital-transformation"
              className="flex items-center gap-3 p-5 rounded-xl border border-[#E2E8F0] hover:border-[#3d5ad9]/30 hover:bg-[#f8faff] transition-all group"
            >
              <ArrowLeft size={16} className="text-[#334155]/40 group-hover:text-[#3d5ad9] transition-colors" />
              <div>
                <p className="font-body text-xs text-[#334155]/40 mb-0.5">Previous</p>
                <p className="font-heading font-semibold text-sm text-[#0c1945] group-hover:text-[#3d5ad9] transition-colors">
                  Digital Transformation
                </p>
              </div>
            </Link>
            <Link
              href="/what-we-do/commercial-excellence"
              className="flex items-center justify-end gap-3 p-5 rounded-xl border border-[#E2E8F0] hover:border-[#3d5ad9]/30 hover:bg-[#f8faff] transition-all text-right group"
            >
              <div>
                <p className="font-body text-xs text-[#334155]/40 mb-0.5">Next</p>
                <p className="font-heading font-semibold text-sm text-[#0c1945] group-hover:text-[#3d5ad9] transition-colors">
                  Commercial Excellence
                </p>
              </div>
              <ArrowRight size={16} className="text-[#334155]/40 group-hover:text-[#3d5ad9] transition-colors" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ CTA */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: "#030611" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(61,90,217,0.04) 0px, rgba(61,90,217,0.04) 1px, transparent 1px, transparent 64px)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(61,90,217,0.10), transparent)",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            className="font-heading font-light text-white/60 mb-7"
            style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.85rem)", letterSpacing: "-0.01em" }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Map<span style={{ color: "#3d5ad9" }}>.</span>{" "}
            Optimise<span style={{ color: "#3d5ad9" }}>.</span>{" "}
            Execute<span style={{ color: "#3d5ad9" }}>.</span>
          </motion.p>

          <motion.h2
            className="font-heading font-bold text-white mb-5 leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3.8vw, 3.2rem)", letterSpacing: "-0.028em" }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Architect your next
            <br />
            operational advantage.
          </motion.h2>

          <motion.p
            className="font-body text-white/38 text-lg mb-12 leading-relaxed max-w-lg mx-auto"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Exceptional business consulting isn&apos;t about telling you what your business does —
            it&apos;s about re-engineering how it performs at peak efficiency.
            Let&apos;s connect and discuss your enterprise workflows.
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
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-white font-heading font-semibold text-base transition-all hover:opacity-90 shadow-lg"
              style={{ background: "#3d5ad9" }}
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
