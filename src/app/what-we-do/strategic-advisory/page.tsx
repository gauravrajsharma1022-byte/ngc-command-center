"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft, Shield, Layers, TrendingUp } from "lucide-react";

// ── Animated stat counter ─────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * to));
      if (t < 1) requestAnimationFrame(tick);
      else setCount(to);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Scrolling ticker ──────────────────────────────────────────────────────
function Ticker() {
  const items = [
    "Strategic Advisory", "CXO Intervention", "Board-Level Counsel",
    "Enterprise Strategy", "Architecture Alignment", "Market Intelligence",
    "Telecom", "Healthcare", "Fintech", "MVNO / MVNE", "Zero Conflicts",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="border-t border-white/[0.07] overflow-hidden">
      <div
        className="flex whitespace-nowrap py-4"
        style={{ animation: "ticker 30s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center font-body text-[11px] font-semibold tracking-[0.18em] uppercase text-white/20 px-6"
          >
            {item}
            <span className="ml-6 text-[#3d5ad9]/50">&middot;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function StrategicAdvisoryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity  = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // Trigger refs for whileInView-clipped text — observe the visible container, not the clipped span
  const quoteRef    = useRef<HTMLDivElement>(null);
  const signalRef   = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const quoteInView    = useInView(quoteRef,    { once: true, margin: "-80px" });
  const signalInView   = useInView(signalRef,   { once: true, margin: "-80px" });
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          HERO — full screen, split layout, cinematic text reveal
          ════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen bg-[#030611] overflow-hidden flex flex-col"
      >
        {/* Full-screen background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src="/videos/Strategic Advisory.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text visibility */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(3,6,17,0.82) 0%, rgba(12,25,69,0.72) 50%, rgba(3,6,17,0.78) 100%)",
            zIndex: 1,
          }}
        />

        {/* Content — parallaxes up on scroll */}
        <motion.div
          style={{ y: heroContentY, opacity: heroOpacity, zIndex: 2 }}
          className="relative flex-1 flex items-center"
        >
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-32 pb-12">
            <div className="flex flex-col justify-center min-h-[78vh]">

              {/* ── Left: Animated content ── */}
              <div>
                {/* Breadcrumb */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08, duration: 0.5 }}
                >
                  <Link
                    href="/what-we-do"
                    className="inline-flex items-center gap-1.5 font-body text-xs text-white/28 hover:text-white/60 transition-colors mb-10"
                  >
                    <ArrowLeft size={11} /> What We Do
                  </Link>
                </motion.div>

                {/* Practice badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.5 }}
                  className="flex items-center gap-3 mb-9"
                >
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md text-[#3d5ad9] bg-[#3d5ad9]/15 border border-[#3d5ad9]/28">
                    01
                  </span>
                  <span className="font-body text-xs font-semibold tracking-[0.16em] uppercase text-white/25">
                    Practice Area
                  </span>
                </motion.div>

                {/* ── HEADLINE — clip-reveal line by line ── */}
                <h1
                  className="font-heading font-bold text-white leading-[0.98] mb-8"
                  style={{ fontSize: "clamp(3.8rem, 7.5vw, 8.5rem)", letterSpacing: "-0.038em" }}
                >
                  {["Strategic", "Advisory."].map((word, i) => (
                    <div key={word} className="block" style={{ overflow: "hidden" }}>
                      <motion.span
                        className="block"
                        initial={{ y: "108%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        transition={{
                          delay: 0.42 + i * 0.24,
                          duration: 0.92,
                          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                        }}
                      >
                        {i === 1 ? (
                          <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: "linear-gradient(90deg, #05aff2, #38d0f5)" }}
                          >
                            {word}
                          </span>
                        ) : word}
                      </motion.span>
                    </div>
                  ))}
                </h1>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.96, duration: 0.65 }}
                  className="font-body font-semibold text-[#3d5ad9] text-lg mb-5 tracking-tight"
                >
                  Board-level strategy. No empire to protect.
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.08, duration: 0.65 }}
                  className="font-body text-white/42 text-lg leading-relaxed max-w-xl mb-10"
                >
                  When a high-stakes transformation hits a wall and the board is four weeks away, enterprise leaders need one thing their current advisors can&apos;t give them: the unfiltered truth.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 mb-14"
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#3d5ad9] font-heading font-semibold text-sm text-white hover:bg-[#2f4bbf] transition-all duration-200 shadow-[0_0_32px_rgba(61,90,217,0.38)] hover:shadow-[0_0_48px_rgba(61,90,217,0.55)]"
                  >
                    Request a Strategic Intervention
                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </Link>
                  <Link
                    href="/what-we-do"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/10 text-white/45 font-heading font-medium text-sm hover:text-white hover:border-white/22 transition-all"
                  >
                    All Practice Areas
                  </Link>
                </motion.div>

              </div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════
          THE MOMENT YOU NEED US
          ════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#04102c] overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(61,90,217,0.16), transparent)" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 55% 45% at 80% 80%, rgba(5,175,242,0.08), transparent)" }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
        </div>

        {/* ── ACT 1: Pull quote ── */}
        <div
          ref={quoteRef}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-36 pb-20 lg:pb-24 border-b border-white/[0.07]"
        >
          {/* Tiny label — simple fade, not clipped */}
          <motion.p
            animate={{ opacity: quoteInView ? 1 : 0, y: quoteInView ? 0 : 10 }}
            transition={{ duration: 0.5 }}
            className="font-body text-[11px] font-semibold tracking-[0.22em] uppercase text-[#05aff2] mb-10"
          >
            The Moment You Need Us
          </motion.p>

          {/* Quote lines — clip-reveal driven by quoteInView ref on parent */}
          <div className="max-w-5xl">
            {(
              [
                { node: <>&ldquo;The board meeting</>,  big: true,  cyan: false },
                { node: <>is four weeks away.</>,        big: true,  cyan: false },
                { node: <>The SI says on track.</>,      big: false, cyan: false },
                { node: <>It isn&apos;t.&rdquo;</>,      big: true,  cyan: true  },
              ] as { node: React.ReactNode; big: boolean; cyan: boolean }[]
            ).map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.span
                  className="block font-heading font-bold"
                  style={{
                    fontSize: line.big ? "clamp(3rem, 7vw, 7.5rem)" : "clamp(1.4rem, 3vw, 3.2rem)",
                    letterSpacing: line.big ? "-0.04em" : "-0.02em",
                    lineHeight: line.big ? 1.0 : 1.3,
                    marginBottom: line.big ? "0" : "0.1em",
                    ...(line.cyan
                      ? { backgroundImage: "linear-gradient(90deg, #05aff2, #38d0f5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }
                      : { color: line.big ? "#ffffff" : "rgba(255,255,255,0.45)" }),
                  }}
                  animate={{ y: quoteInView ? "0%" : "108%", opacity: quoteInView ? 1 : 0 }}
                  transition={{ delay: i * 0.16, duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
                >
                  {line.node}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Context line */}
          <motion.p
            animate={{ opacity: quoteInView ? 0.32 : 0, y: quoteInView ? 0 : 14 }}
            transition={{ delay: 0.72, duration: 0.65 }}
            className="font-body text-white text-base leading-relaxed mt-10 max-w-lg"
          >
            When the polished decks no longer match what is happening on the ground — that is the moment enterprise leaders call Northgate.
          </motion.p>
        </div>

        {/* ── ACT 2: Five warning signs ── */}
        <div
          ref={signalRef}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28"
        >
          {/* Sub-label + intro */}
          <div className="mb-16">
            <motion.p
              animate={{ opacity: signalInView ? 0.25 : 0, y: signalInView ? 0 : 10 }}
              transition={{ duration: 0.5 }}
              className="font-body text-[11px] font-semibold tracking-[0.22em] uppercase text-white mb-3"
            >
              Five warning signs we walk in to
            </motion.p>
            <div style={{ overflow: "hidden" }}>
              <motion.h2
                className="font-heading font-bold text-white"
                style={{ fontSize: "clamp(1.6rem, 3.2vw, 3rem)", letterSpacing: "-0.028em", lineHeight: 1.1 }}
                animate={{ y: signalInView ? "0%" : "105%", opacity: signalInView ? 1 : 0 }}
                transition={{ delay: 0.1, duration: 0.82, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
              >
                If any of these sound familiar,{" "}
                <span style={{ color: "rgba(255,255,255,0.38)", fontWeight: 300 }}>you already know what needs to happen.</span>
              </motion.h2>
            </div>
          </div>

          {/* 2-column editorial grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-0">
            {[
              { num: "01", title: "Vendor divergence",               body: "Your system integrator reports green across every dashboard. Your delivery leads tell a different story in private. You cannot reconcile the two.",                               accent: "#3d5ad9" },
              { num: "02", title: "Milestone slippage accelerating", body: "What began as a two-week delay is now four months. Each new forecast quietly moves the finish line. No one owns the root cause.",                                                  accent: "#05aff2" },
              { num: "03", title: "Board confidence eroding",        body: "Executives are losing faith in the transformation leadership. The next board meeting requires answers you do not yet have.",                                                        accent: "#3d5ad9" },
              { num: "04", title: "Advisor capture",                 body: "Your Big 4 partner has a $40M implementation contract at stake. Their strategic advice is filtered through that lens — not yours.",                                                 accent: "#05aff2" },
              { num: "05", title: "Technology–strategy misalignment", body: "The architecture chosen eighteen months ago no longer matches where the business is heading. No one wants to say it out loud.",                                              accent: "#3d5ad9" },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                animate={{ opacity: signalInView ? 1 : 0, y: signalInView ? 0 : 20 }}
                transition={{ delay: 0.15 + i * 0.09, duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                className="group py-8 border-t border-white/[0.08] hover:border-white/[0.18] transition-colors duration-300 cursor-default"
              >
                <div className="flex items-start gap-6">
                  <span
                    className="font-heading font-black select-none shrink-0 leading-none tabular-nums"
                    style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", color: item.accent, opacity: 0.18, letterSpacing: "-0.04em", transition: "opacity 0.3s" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.45")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "0.18")}
                  >
                    {item.num}
                  </span>
                  <div className="pt-1">
                    <p className="font-heading font-bold text-white group-hover:text-[#05aff2] transition-colors duration-200" style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)", letterSpacing: "-0.015em", lineHeight: 1.25 }}>
                      {item.title}
                    </p>
                    <p className="font-body text-white/35 text-sm leading-[1.8] mt-2 group-hover:text-white/55 transition-colors duration-200">
                      {item.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* CTA — 6th cell */}
            <motion.div
              animate={{ opacity: signalInView ? 1 : 0, y: signalInView ? 0 : 20 }}
              transition={{ delay: 0.62, duration: 0.65 }}
              className="py-8 border-t border-white/[0.08] flex flex-col justify-center"
            >
              <p className="font-body text-white/28 text-xs tracking-[0.15em] uppercase mb-4">
                Recognise your situation?
              </p>
              <Link href="/contact" className="group inline-flex items-center gap-3 w-fit">
                <span
                  className="font-heading font-bold text-white group-hover:text-[#05aff2] transition-colors duration-200"
                  style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)", letterSpacing: "-0.015em" }}
                >
                  Request a Strategic Intervention
                </span>
                <ArrowRight size={16} className="text-[#3d5ad9] group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          DELIVERY LIFECYCLE — animated timeline
          ════════════════════════════════════════════════════════ */}
      <section className="bg-white pt-24 pb-28 lg:pt-32 lg:pb-36 overflow-hidden">
        <div ref={timelineRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <motion.div
            animate={{ opacity: timelineInView ? 1 : 0, y: timelineInView ? 0 : 16 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <span className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#3d5ad9] mb-4 block">
              How We Engage
            </span>
            <div style={{ overflow: "hidden" }}>
              <motion.h2
                className="font-heading font-bold text-[#0c1945]"
                style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)", letterSpacing: "-0.022em" }}
                animate={{ y: timelineInView ? "0%" : "105%", opacity: timelineInView ? 1 : 0 }}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
              >
                Surgical clarity. Compressed timelines.
              </motion.h2>
            </div>
          </motion.div>

          {/* ── TIMELINE RAIL ── */}
          <div className="relative mb-0 hidden lg:block">

            {/* Labels row — Week XX above each dot */}
            <div className="grid grid-cols-3 mb-3">
              {["Week 01", "Week 04", "Week 08"].map((w, i) => (
                <motion.p
                  key={w}
                  animate={{ opacity: timelineInView ? 1 : 0, y: timelineInView ? 0 : 8 }}
                  transition={{ delay: 0.3 + i * 0.28, duration: 0.5 }}
                  className="font-mono text-[11px] font-bold tracking-[0.18em] uppercase"
                  style={{ color: i === 1 ? "#05aff2" : "#3d5ad9", paddingLeft: i === 0 ? "0" : undefined, textAlign: i === 0 ? "left" : i === 1 ? "center" : "right" }}
                >
                  {w}
                </motion.p>
              ))}
            </div>

            {/* Dots row */}
            <div className="grid grid-cols-3 mb-0 relative">
              {/* Track background */}
              <div className="absolute top-[10px] left-0 right-0 h-[2px] bg-[#E2E8F0]" />

              {/* Animated fill line — draws L→R */}
              <motion.div
                className="absolute top-[10px] left-0 h-[2px] origin-left"
                style={{ background: "linear-gradient(90deg, #3d5ad9, #05aff2, #3d5ad9)" }}
                animate={{ scaleX: timelineInView ? 1 : 0, opacity: timelineInView ? 1 : 0 }}
                transition={{ delay: 0.45, duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
              />

              {/* Dots */}
              {[
                { accent: "#3d5ad9", delay: 0.5 },
                { accent: "#05aff2", delay: 0.85 },
                { accent: "#3d5ad9", delay: 1.2 },
              ].map((dot, i) => (
                <div
                  key={i}
                  className="flex"
                  style={{ justifyContent: i === 0 ? "flex-start" : i === 1 ? "center" : "flex-end" }}
                >
                  <motion.div
                    animate={{
                      scale: timelineInView ? [0, 1.3, 1] : 0,
                      opacity: timelineInView ? 1 : 0,
                    }}
                    transition={{ delay: dot.delay, duration: 0.45, ease: "easeOut" }}
                    className="relative z-10 w-5 h-5 rounded-full border-2 border-white shadow-md flex items-center justify-center"
                    style={{ backgroundColor: dot.accent }}
                  >
                    {/* Pulse ring */}
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: dot.accent }}
                      animate={timelineInView ? { scale: [1, 2], opacity: [0.4, 0] } : {}}
                      transition={{ delay: dot.delay + 0.3, duration: 0.8, repeat: 2, ease: "easeOut" }}
                    />
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Vertical connectors */}
            <div className="grid grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex"
                  style={{ justifyContent: i === 0 ? "flex-start" : i === 1 ? "center" : "flex-end" }}
                >
                  <motion.div
                    className="w-[2px] bg-gradient-to-b from-[#3d5ad9]/40 to-transparent"
                    animate={{ height: timelineInView ? 36 : 0, opacity: timelineInView ? 1 : 0 }}
                    transition={{ delay: 0.9 + i * 0.18, duration: 0.4 }}
                    style={{ transformOrigin: "top" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── CARDS ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                week: "Week 01", label: "Surgical Diagnostics", accent: "#3d5ad9", num: "01",
                body: "No generic workshops. We embed immediately at the leadership level — auditing technical architecture, reviewing vendor delivery logs, and conducting confidential, blunt-force interviews. We bypass corporate politics to locate the structural friction points.",
              },
              {
                week: "Week 04", label: "The Honest Truth", accent: "#05aff2", num: "02",
                body: "We deliver an unvarnished strategic health check directly to the CXO. We map exactly where strategy is misaligned with ground-level delivery — surfacing what vendors aren't telling you and what your current advisors are sanitising to protect their accounts.",
              },
              {
                week: "Week 08", label: "The Blueprint", accent: "#3d5ad9", num: "03",
                body: "The finalised 90-day execution framework. We don't leave a slide deck and disappear — we run alignment sessions with the leadership team to ensure complete ownership and establish the metrics that will hold vendors and teams accountable.",
              },
            ].map((phase, i) => (
              <motion.div
                key={phase.week}
                animate={{ opacity: timelineInView ? 1 : 0, y: timelineInView ? 0 : 28 }}
                transition={{ delay: 1.05 + i * 0.14, duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                className="relative p-8 rounded-2xl border border-[#E2E8F0] bg-white hover:border-[#3d5ad9]/30 hover:shadow-[0_16px_56px_rgba(12,25,69,0.1)] transition-all duration-300 group overflow-hidden"
              >
                {/* Faded number watermark */}
                <div
                  className="absolute right-4 bottom-4 font-heading font-black select-none pointer-events-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500"
                  style={{ fontSize: "7rem", color: phase.accent, lineHeight: 1 }}
                  aria-hidden
                >
                  {phase.num}
                </div>
                {/* Top accent bar on hover */}
                <div
                  className="absolute top-0 left-8 right-8 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${phase.accent}, transparent)` }}
                />
                {/* Week badge — mobile only (hidden on lg since timeline shows it) */}
                <span
                  className="inline-block lg:hidden font-mono text-xs font-bold px-3 py-1.5 rounded-lg mb-5"
                  style={{ color: phase.accent, background: `${phase.accent}14`, border: `1px solid ${phase.accent}28` }}
                >
                  {phase.week}
                </span>
                <h3
                  className="font-heading font-bold text-[#0c1945] mb-4 group-hover:text-[#3d5ad9] transition-colors duration-300"
                  style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)", letterSpacing: "-0.018em" }}
                >
                  {phase.label}
                </h3>
                <p className="font-body text-[#334155]/60 leading-relaxed text-sm relative z-10">
                  {phase.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SERVICES — alternating image / text layout
          ════════════════════════════════════════════════════════ */}
      <section className="bg-[#030611]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="pt-20 pb-14 border-b border-white/[0.07]">
              <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#05aff2] mb-4">
                What This Covers
              </span>
              <h2
                className="font-heading font-bold text-white"
                style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)", letterSpacing: "-0.022em" }}
              >
                Three service lines. One mandate: your outcome.
              </h2>
            </div>
          </motion.div>

          {[
            {
              number: "01", icon: Shield, name: "CXO Strategic Intervention", accent: "#3d5ad9",
              body: "We act as the independent, trusted counsel for leadership the moment a high-stakes initiative is stalling. Rapid risk assessments, vendor dispute resolution, and raw strategic clarity — delivered before it reaches the board level. No filters. No agenda. No incentive to extend.",
              glow: "#3d5ad9", image: "/images/CXO Strategic.jpg",
            },
            {
              number: "02", icon: Layers, name: "Architecture & Digital Alignment", accent: "#05aff2",
              body: "We ensure your long-term business goals, technology infrastructure, and operational processes are completely synchronised. We eliminate legacy complexities, surface misalignments between strategy and delivery, and map lean frameworks that accelerate time-to-market without rebuilding everything from scratch.",
              glow: "#05aff2", image: "/images/Digital Alignment.jpg",
            },
            {
              number: "03", icon: TrendingUp, name: "Market Friction & Dynamics", accent: "#3d5ad9",
              body: "We don't hand over generic market share reports. We analyse deep industry shifts, regulatory hurdles, and competitor technology plays across global markets to help you identify blind spots and capture high-value growth opportunities — before your competition does.",
              glow: "#3d5ad9", image: "/images/Market Friction.jpg",
            },
          ].map((s, i) => {
            const Icon = s.icon;
            const reversed = i % 2 !== 0;
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 py-20 items-stretch ${i < 2 ? "border-b border-white/[0.06]" : "pb-28"}`}
              >
                {/* Text */}
                <div className={`flex flex-col justify-center ${reversed ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-4 mb-7">
                    <span className="font-mono text-xs font-bold tabular-nums" style={{ color: s.accent }}>{s.number}</span>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}28` }}
                    >
                      <Icon size={18} style={{ color: s.accent }} />
                    </div>
                  </div>
                  <h3
                    className="font-heading font-bold text-white mb-5 leading-tight"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", letterSpacing: "-0.022em" }}
                  >
                    {s.name}
                  </h3>
                  <p className="font-body text-white/40 leading-[1.92] text-base mb-8">{s.body}</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-body text-sm font-semibold group w-fit hover:gap-3 transition-all duration-200"
                    style={{ color: s.accent }}
                  >
                    Discuss this service <ArrowRight size={13} />
                  </Link>
                </div>

                {/* Service image */}
                <div
                  className={`relative rounded-2xl overflow-hidden min-h-[380px] lg:min-h-[440px] h-full ${reversed ? "lg:order-1" : ""}`}
                  style={{ boxShadow: `0 0 0 1px ${s.glow}18, 0 28px 72px rgba(0,0,0,0.45)` }}
                >
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Subtle dark gradient overlay so text-adjacent edge blends into dark bg */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: reversed
                        ? "linear-gradient(to right, rgba(3,6,17,0.18) 0%, transparent 40%)"
                        : "linear-gradient(to left, rgba(3,6,17,0.18) 0%, transparent 40%)",
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          THE NORTHGATE DIFFERENCE
          ════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#3d5ad9] mb-6">
                Why Northgate
              </span>
              <h2
                className="font-heading font-bold text-[#0c1945] mb-8 leading-tight"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)", letterSpacing: "-0.022em" }}
              >
                We tell the absolute truth because we have no empire to protect.
              </h2>
              <div className="space-y-5 font-body text-[#334155]/62 leading-[1.88] text-base">
                <p>In a traditional Big 4 model, the primary goal of a strategic advisory engagement is land-and-expand — use the strategy phase to secure a 50-person implementation team to bill thousands of hours for the next three years.</p>
                <p>Because of this, they will rarely tell a CXO that their core strategy needs a radical pivot or that their preferred vendor is a disaster — because doing so risks the larger implementation contract.</p>
                <p>Northgate does the opposite. We deliberately operate without an army of junior resources — which means we have zero financial incentive to extend a project, soften a finding, or protect a vendor relationship.</p>
              </div>
            </motion.div>

            <div className="space-y-4 lg:pt-16">
              {[
                { heading: "Operator DNA", body: "Nearly two decades of hands-on experience inside Tier 1–3 operators and enterprises across the Middle East, Africa, and Asia. Not consulting theory. Lived experience.", accent: "#3d5ad9" },
                { heading: "Board-Ready Output", body: "Every deliverable is built for the room it needs to land in — crisp, evidence-based, and decision-ready. Boards receive clarity, not more questions.", accent: "#05aff2" },
                { heading: "Zero Conflicts of Interest", body: "No vendor referral arrangements. No implementation pipeline to protect. Our only financial incentive is your outcome — which means our advice is always unfiltered.", accent: "#3d5ad9" },
                { heading: "Compressed Timelines", body: "Surgical diagnostics to executive blueprint in 8 weeks. We don't spend three months conducting stakeholder interviews. We move.", accent: "#05aff2" },
              ].map((d, i) => (
                <motion.div
                  key={d.heading}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="flex items-start gap-4 p-5 rounded-xl border border-[#E2E8F0] hover:border-[#3d5ad9]/28 hover:shadow-[0_4px_24px_rgba(12,25,69,0.08)] transition-all duration-300 group"
                >
                  <div className="w-2 h-2 rounded-full shrink-0 mt-2" style={{ backgroundColor: d.accent }} />
                  <div>
                    <p className="font-heading font-semibold text-[#0c1945] text-sm mb-1.5 group-hover:text-[#3d5ad9] transition-colors duration-200">{d.heading}</p>
                    <p className="font-body text-sm text-[#334155]/58 leading-relaxed">{d.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          BEFORE / AFTER
          ════════════════════════════════════════════════════════ */}
      <section className="bg-[#030611] py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, #0c1945, transparent)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#05aff2] mb-4">
              The Northgate Effect
            </span>
            <h2
              className="font-heading font-bold text-white"
              style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)", letterSpacing: "-0.022em" }}
            >
              What changes when we engage.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }} className="bg-[#030611] p-10"
            >
              <p className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-white/18 mb-8">Before</p>
              <div className="space-y-7">
                {[
                  "Exposed and isolated — operating in a black box with no reliable view of reality.",
                  "Trapped between a demanding board and a non-performing delivery ecosystem.",
                  "Receiving sanitised reports from advisors protecting their own accounts.",
                  "Driving at speed through heavy fog — knowing you must move fast, unable to see the hazards.",
                ].map((line, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-px min-h-[1.8rem] bg-white/8 shrink-0 mt-1.5" />
                    <p className="font-body text-white/32 text-sm leading-relaxed">{line}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }} className="bg-[#0c1945]/48 p-10"
            >
              <p className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#05aff2]/50 mb-8">After</p>
              <div className="space-y-7">
                {[
                  "Absolute control — a transparent view of exactly where the transformation stands.",
                  "A fortified 90-day roadmap with clear accountability structures and measurable milestones.",
                  "Walking into the next board meeting not defending a failure — but leading a calculated path to success.",
                  "A partner who has seen everything that can go wrong, and built the plan to prevent it.",
                ].map((line, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-px min-h-[1.8rem] shrink-0 mt-1.5" style={{ backgroundColor: "#05aff2", opacity: 0.38 }} />
                    <p className="font-body text-white/65 text-sm leading-relaxed">{line}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTORS + NEXT
          ════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#334155]/38 mb-4">Relevant Sectors</p>
            <div className="flex flex-wrap gap-3">
              {["Telecom", "MVNO / MVNE", "Enterprise", "Healthcare", "Fintech"].map((s) => (
                <span key={s} className="px-4 py-2 rounded-full border text-[#3d5ad9] border-[#3d5ad9]/22 bg-[#3d5ad9]/[0.06] font-body text-sm font-medium">{s}</span>
              ))}
            </div>
          </div>
          <Link
            href="/what-we-do/digital-transformation"
            className="flex items-center gap-3 p-4 rounded-xl border border-[#E2E8F0] hover:border-[#3d5ad9]/28 hover:bg-[#f8faff] transition-all group shrink-0"
          >
            <div className="text-right">
              <p className="font-body text-xs text-[#334155]/38 mb-0.5">Next Practice Area</p>
              <p className="font-heading font-semibold text-sm text-[#0c1945] group-hover:text-[#3d5ad9] transition-colors">Digital Transformation</p>
            </div>
            <ArrowRight size={15} className="text-[#334155]/38 group-hover:text-[#3d5ad9] transition-colors" />
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CTA
          ════════════════════════════════════════════════════════ */}
      <section className="py-32 bg-[#0c1945] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse 65% 70% at 50% 50%, #3d5ad9, transparent)" }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="font-heading font-light text-white/58 mb-6"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
          >
            The board meeting won&apos;t wait.
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="font-heading font-bold text-white mb-5 leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3.8vw, 3.5rem)", letterSpacing: "-0.028em" }}
          >
            Let&apos;s have the direct conversation
            <br />your current advisors won&apos;t.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-body text-white/38 text-lg mb-12 leading-relaxed max-w-lg mx-auto"
          >
            A 30-minute call with Northgate will tell you more about your strategic position than a 200-page report from a Big 4 firm.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#3d5ad9] text-white font-heading font-semibold text-base hover:bg-[#2f4bbf] transition-all duration-200 shadow-[0_0_40px_rgba(61,90,217,0.35)] hover:shadow-[0_0_60px_rgba(61,90,217,0.52)]"
            >
              Request a Strategic Intervention
              <ArrowRight size={17} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
            <Link
              href="/what-we-do"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/14 text-white/52 font-heading font-medium text-base hover:text-white hover:border-white/28 transition-all"
            >
              View All Practice Areas
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
