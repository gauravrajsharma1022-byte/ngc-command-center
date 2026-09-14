"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  VolumeX,
  AlertCircle,
  Zap,
  Radio,
  HeartPulse,
  Landmark,
} from "lucide-react";

// ─── Sector Data ─────────────────────────────────────────────────────────────

type Signal = {
  num: string;
  title: string;
  subtitle?: string;
  noise: string;
  reality: string;
  response: string;
  heatmap: { x: number; y: number };
};

type Sector = {
  key: string;
  label: string;
  color: string;
  Icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  signals: Signal[];
};

const SECTORS: Sector[] = [
  {
    key: "telecom",
    label: "Telecommunications",
    color: "#3d5ad9",
    Icon: Radio,
    signals: [
      {
        num: "01",
        title: "The API Monetization Imperative",
        subtitle: "CAMARA Gateway Alliance",
        noise: "Telcos must build better developer ecosystems to boost revenue.",
        reality:
          "Traditional carrier voice and data margins are dying. Growth relies entirely on exposing core network capabilities — like real-time location verification and SIM-swap detection — directly to banks and hyperscalers via standardized open APIs.",
        response:
          "We help telcos map their backend network elements to TM Forum/CAMARA standards, wrapping legacy nodes with low-latency API integration meshes.",
        heatmap: { x: 38, y: 19 },
      },
      {
        num: "02",
        title: "Legacy Copper & 3G Sunset Technical Debt",
        noise: "Shutting down old networks saves operational expenditure (OpEx).",
        reality:
          "Decommissioning legacy infrastructure is an operational nightmare. Enterprise clients are resisting migration due to custom legacy equipment, stalling capital reallocation to 5G Standalone and AI compute layers.",
        response:
          "We create step-by-step legacy decommissioning playbooks, using persona-driven migration strategies to transition enterprise clients without breaking SLAs.",
        heatmap: { x: 68, y: 23 },
      },
    ],
  },
  {
    key: "healthcare",
    label: "Healthcare",
    color: "#10b981",
    Icon: HeartPulse,
    signals: [
      {
        num: "01",
        title: "FHIR Enforcement",
        subtitle: "Fast Healthcare Interoperability Resources",
        noise: "Healthcare compliance is becoming tighter.",
        reality:
          "Interoperability is no longer optional. Regulatory frameworks are mandating real-time, secure patient data access across distinct hospital networks and external digital health applications.",
        response:
          "We architect localized API gateways that transform legacy EHR data into strict FHIR-compliant schemas without exposing core patient repositories.",
        heatmap: { x: 33, y: 20 },
      },
      {
        num: "02",
        title: "The Decentralized Clinical Trial (DCT) Architecture",
        noise: "Patients prefer remote clinical monitoring.",
        reality:
          "Hybrid and remote trials are failing because data collected from consumer wearables is unverified, unstructured, and completely disconnected from core pharmaceutical lab systems.",
        response:
          "We map Level 1-5 clinical process workflows using APQC models to build secure data-ingestion pipelines that filter and structure remote edge data for clinical compliance.",
        heatmap: { x: 65, y: 38 },
      },
    ],
  },
  {
    key: "fintech",
    label: "Fintech",
    color: "#8b5cf6",
    Icon: Landmark,
    signals: [
      {
        num: "01",
        title: "Real-Time Cross-Border Settlement Liquidity",
        noise: "Blockchain will disrupt traditional banking rails.",
        reality:
          "The true disruption is the modernisation of SWIFT and central bank digital corridors. Financial institutions that cannot settle cross-border transactions in under 10 seconds are losing enterprise liquidity management accounts to agile neobanks.",
        response:
          "We consult on the integration of legacy core banking engines with real-time gross settlement (RTGS) networks using modular, secure messaging wrappers.",
        heatmap: { x: 70, y: 16 },
      },
      {
        num: "02",
        title: "Open Banking & Third-Party Aggregator Vulnerabilities",
        noise: "Open banking improves consumer financial health options.",
        reality:
          "Financial institutions are exposing massive security perimeters through third-party financial apps accessing consumer account data via scraping or loose APIs, escalating identity fraud risks.",
        response:
          "We deploy zero-trust enterprise architecture blueprints that govern tokenized user access, completely cutting off unauthorized data scraping.",
        heatmap: { x: 26, y: 24 },
      },
    ],
  },
];

const QUADRANTS = [
  { label: "IMMEDIATE ACTION", x: "left", y: "top", color: "rgba(16,185,129,0.06)" },
  { label: "STRATEGIC PRIORITY", x: "right", y: "top", color: "rgba(61,90,217,0.06)" },
  { label: "MONITOR", x: "left", y: "bottom", color: "rgba(100,116,139,0.04)" },
  { label: "REASSESS", x: "right", y: "bottom", color: "rgba(239,68,68,0.04)" },
];

// ─── Signal Card ─────────────────────────────────────────────────────────────

function SignalCard({ signal, color, idx }: { signal: Signal; color: string; idx: number }) {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.14, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top accent stripe */}
      <div className="h-[3px]" style={{ background: color }} />

      {/* Card header */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-[#E2E8F0]" style={{ background: "#f8faff" }}>
        <span
          className="font-mono text-[11px] font-bold px-2.5 py-1 rounded-md shrink-0"
          style={{ color, background: `${color}14`, border: `1px solid ${color}30` }}
        >
          SIGNAL {signal.num}
        </span>
        <div>
          <h3 className="font-heading font-bold text-[#0c1945] leading-tight" style={{ fontSize: "0.98rem", letterSpacing: "-0.015em" }}>
            {signal.title}
          </h3>
          {signal.subtitle && (
            <p className="font-body text-[11px] text-[#334155]/45 mt-0.5">{signal.subtitle}</p>
          )}
        </div>
      </div>

      {/* Three-column triptych */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0]">
        {/* The Noise */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <VolumeX size={13} className="text-[#94a3b8] shrink-0" />
            <span className="font-body text-[10px] font-bold tracking-[0.16em] uppercase text-[#94a3b8]">
              The Noise
            </span>
          </div>
          <div className="relative pl-3 border-l-2 border-[#E2E8F0]">
            <p className="font-body text-sm text-[#94a3b8] leading-relaxed italic">
              &ldquo;{signal.noise}&rdquo;
            </p>
          </div>
        </div>

        {/* The Reality */}
        <div className="p-6" style={{ background: "rgba(245,158,11,0.03)" }}>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={13} style={{ color: "#f59e0b" }} className="shrink-0" />
            <span className="font-body text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color: "#f59e0b" }}>
              The Reality
            </span>
          </div>
          <p className="font-heading font-semibold text-[#0c1945] text-sm leading-relaxed" style={{ letterSpacing: "-0.01em" }}>
            {signal.reality}
          </p>
        </div>

        {/* Northgate Response */}
        <div className="p-6" style={{ background: `${color}06` }}>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={13} style={{ color }} className="shrink-0" />
            <span className="font-body text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color }}>
              Northgate Response
            </span>
          </div>
          <p className="font-body text-sm text-[#334155]/75 leading-relaxed">
            {signal.response}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IndustrySignalsPage() {
  const [activeSector, setActiveSector] = useState(0);
  const matrixRef = useRef<HTMLDivElement>(null);
  const heatmapRef = useRef<HTMLDivElement>(null);
  const heatmapInView = useInView(heatmapRef, { once: true, margin: "-80px" });

  const sector = SECTORS[activeSector];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#030611" }}
      >
        {/* Animated grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(61,90,217,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(61,90,217,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Sector color radial glow — morphs per sector */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ background: `radial-gradient(ellipse 55% 70% at 80% 50%, ${sector.color}18, transparent)` }}
          transition={{ duration: 0.7 }}
        />

        {/* Watermark number */}
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 font-heading font-black select-none pointer-events-none leading-none"
          aria-hidden
          style={{ fontSize: "clamp(10rem, 22vw, 20rem)", color: "rgba(255,255,255,0.022)" }}
        >
          03
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16">
          {/* Breadcrumb */}
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Link
              href="/our-thinking"
              className="inline-flex items-center gap-1.5 font-body text-xs text-white/30 hover:text-white/55 transition-colors"
            >
              <ArrowLeft size={12} /> Our Thinking
            </Link>
            <span className="text-white/12">|</span>
            <span
              className="font-mono text-xs font-bold px-2.5 py-1 rounded-md"
              style={{ color: sector.color, background: `${sector.color}18`, border: `1px solid ${sector.color}30` }}
            >
              03
            </span>
            <span className="font-body text-xs font-semibold tracking-[0.14em] uppercase text-white/28">
              Industry Intelligence
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mb-6">
            {["Industry Signals:", "Market Volatility, De-noised."].map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.div
                  className="font-heading font-black leading-[1.0]"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 7rem)",
                    letterSpacing: "-0.044em",
                    color: i === 0 ? "#ffffff" : sector.color,
                    transition: "color 0.5s ease",
                  }}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.18, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Intro copy */}
          <motion.p
            className="font-body text-white/45 max-w-xl leading-relaxed text-base mb-12"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            We track macro shifts, regulatory updates, and architectural changes across core
            enterprise sectors. Choose your domain to isolate critical operational signals
            from the marketing noise.
          </motion.p>

          {/* Sector selector */}
          <div className="max-w-full overflow-x-auto pb-1">
          <motion.div
            className="inline-flex min-w-max items-center rounded-2xl p-1.5 gap-1"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68 }}
          >
            {SECTORS.map((s, i) => {
              const Icon = s.Icon;
              const isActive = activeSector === i;
              return (
                <button
                  key={s.key}
                  onClick={() => setActiveSector(i)}
                  className="relative flex items-center gap-2.5 px-5 py-3 rounded-xl font-heading font-semibold text-sm transition-colors"
                  style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.38)" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sector-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: s.color }}
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={14} style={{ opacity: isActive ? 1 : 0.55 }} />
                    {s.label}
                  </span>
                </button>
              );
            })}
          </motion.div>
          </div>
        </div>
      </section>

      {/* ── INTELLIGENCE MATRIX ──────────────────────────────────────────── */}
      <section className="bg-[#f8faff] border-b border-[#E2E8F0]" ref={matrixRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Section label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={sector.key + "-header"}
              className="mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <span
                className="font-body text-xs font-semibold tracking-[0.16em] uppercase block mb-3"
                style={{ color: sector.color }}
              >
                {sector.label} Intelligence
              </span>
              <div className="flex items-end gap-6 flex-wrap">
                <h2
                  className="font-heading font-black text-[#0c1945] leading-tight"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", letterSpacing: "-0.025em" }}
                >
                  Active Sector Signals
                </h2>
                <p className="font-body text-[#334155]/50 text-sm max-w-md pb-1 leading-relaxed">
                  Three zones per signal: the narrative, the operational truth, and our architectural response.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Signal cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={sector.key + "-signals"}
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {sector.signals.map((signal, i) => (
                <SignalCard key={signal.num} signal={signal} color={sector.color} idx={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── RISK / OPPORTUNITY HEATMAP ───────────────────────────────────── */}
      <section style={{ background: "#0c1945" }} ref={heatmapRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={heatmapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-body text-xs font-semibold tracking-[0.16em] uppercase text-white/35 block mb-3">
              Interactive Signal Matrix
            </span>
            <h2
              className="font-heading font-black text-white leading-tight mb-3"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", letterSpacing: "-0.028em" }}
            >
              Risk &amp; Opportunity Heatmap
            </h2>
            <p className="font-body text-white/40 text-sm max-w-lg leading-relaxed">
              Each signal is plotted by business impact and implementation complexity. Switch sectors above to reposition the signals.
            </p>
          </motion.div>

          {/* Heatmap grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-8 items-start">
            {/* Quadrant plot */}
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: "16/9", border: "1px solid rgba(255,255,255,0.08)" }}
              initial={{ opacity: 0 }}
              animate={heatmapInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              {/* Quadrant backgrounds */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                {QUADRANTS.map((q) => (
                  <div
                    key={q.label}
                    className="relative flex"
                    style={{
                      background: q.color,
                      alignItems: q.y === "top" ? "flex-start" : "flex-end",
                      justifyContent: q.x === "left" ? "flex-start" : "flex-end",
                      padding: "14px 16px",
                    }}
                  >
                    <span className="font-mono text-[10px] font-bold tracking-[0.14em] text-white/18">
                      {q.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Grid lines */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "10% 10%",
                }}
              />

              {/* Axis dividers */}
              <div className="absolute top-0 bottom-0 left-1/2 w-px" style={{ background: "rgba(255,255,255,0.12)" }} />
              <div className="absolute left-0 right-0 top-1/2 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />

              {/* Axis labels */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-between px-4 pointer-events-none">
                <span className="font-mono text-[10px] text-white/25">LOW COMPLEXITY</span>
                <span className="font-mono text-[10px] text-white/25">HIGH COMPLEXITY</span>
              </div>
              <div
                className="absolute left-2 top-0 bottom-6 flex flex-col justify-between pointer-events-none"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                <span className="font-mono text-[10px] text-white/25">LOW IMPACT</span>
                <span className="font-mono text-[10px] text-white/25">HIGH IMPACT</span>
              </div>

              {/* Signal bubbles */}
              <AnimatePresence>
                {sector.signals.map((signal, i) => (
                  <motion.div
                    key={sector.key + signal.num}
                    className="absolute flex flex-col items-center gap-1.5"
                    style={{
                      left: `${signal.heatmap.x}%`,
                      top: `${signal.heatmap.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ delay: i * 0.15 + 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Pulse ring */}
                    <div className="absolute w-14 h-14 rounded-full" style={{ background: `${sector.color}15`, animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite" }} />
                    {/* Bubble */}
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center font-mono text-xs font-black text-white relative z-10 shadow-lg"
                      style={{ background: sector.color, boxShadow: `0 0 20px ${sector.color}60` }}
                    >
                      {signal.num}
                    </div>
                    {/* Label */}
                    <div
                      className="font-body text-[10px] font-semibold text-white px-2.5 py-1 rounded-lg text-center relative z-10 whitespace-nowrap max-w-[120px] leading-tight"
                      style={{ background: "rgba(3,6,17,0.75)", border: `1px solid ${sector.color}35` }}
                    >
                      Signal {signal.num}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Legend */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 16 }}
              animate={heatmapInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.55 }}
            >
              <p className="font-body text-[10px] font-semibold tracking-[0.14em] uppercase text-white/30 mb-5">
                Active Signals
              </p>
              {sector.signals.map((signal) => (
                <div
                  key={signal.num}
                  className="p-4 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${sector.color}22` }}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-black text-white shrink-0"
                      style={{ background: sector.color }}
                    >
                      {signal.num}
                    </div>
                    <span className="font-heading font-bold text-white text-xs leading-tight">
                      {signal.title}
                    </span>
                  </div>
                  <div className="flex gap-3 mt-2.5">
                    <div className="flex-1">
                      <p className="font-mono text-[9px] text-white/30 uppercase mb-1">Impact</p>
                      <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                        <div className="h-full rounded-full" style={{ width: `${100 - signal.heatmap.y * 1.8}%`, background: sector.color }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-mono text-[9px] text-white/30 uppercase mb-1">Complexity</p>
                      <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                        <div className="h-full rounded-full" style={{ width: `${signal.heatmap.x}%`, background: "rgba(245,158,11,0.8)" }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Quadrant key */}
              <div className="pt-4 space-y-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="font-body text-[10px] font-semibold tracking-[0.14em] uppercase text-white/25 mb-3">
                  Quadrant Key
                </p>
                {[
                  { label: "Immediate Action", color: "#10b981" },
                  { label: "Strategic Priority", color: "#3d5ad9" },
                  { label: "Monitor", color: "#64748b" },
                  { label: "Reassess", color: "#ef4444" },
                ].map((q) => (
                  <div key={q.label} className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: q.color }} />
                    <span className="font-body text-xs text-white/40">{q.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER ───────────────────────────────────────────────────── */}
      <section style={{ background: "#030611" }} className="border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-body text-xs font-semibold tracking-[0.18em] uppercase text-white/28 block mb-6">
              Operational Readiness
            </span>
            <h2
              className="font-heading font-black text-white leading-tight mb-6"
              style={{ fontSize: "clamp(1.8rem, 4.5vw, 4.2rem)", letterSpacing: "-0.035em" }}
            >
              Don&apos;t wait for market signals<br />
              to disrupt your operations.
            </h2>
            <p
              className="font-heading font-semibold mb-4"
              style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)", color: sector.color, transition: "color 0.5s ease" }}
            >
              Build the capability to respond to them.
            </p>
            <p className="font-body text-white/40 max-w-2xl mx-auto leading-relaxed text-base mb-12">
              If a signal in your sector matches a current bottleneck or vulnerability in your
              enterprise architecture, skip the exploratory committees. Talk directly with a
              Northgate principal consultant to architect your operational response.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-heading font-semibold text-base text-white transition-all hover:opacity-90 shadow-lg"
                style={{ background: sector.color, transition: "background 0.5s ease, opacity 0.2s" }}
              >
                Talk to a Principal Consultant <ArrowRight size={17} />
              </Link>
              <Link
                href="/our-thinking"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/12 text-white/50 font-heading font-medium text-base hover:text-white hover:border-white/28 transition-all"
              >
                All Intelligence
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ping animation for heatmap bubbles */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </>
  );
}
