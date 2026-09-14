"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";


const LAUNCH = new Date("2026-07-01T00:00:00.000Z");

function getTimeLeft() {
  const diff = LAUNCH.getTime() - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

function Tile({ value, label }: { value: number; label: string }) {
  const str = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-[clamp(10px,1.5vw,18px)]">
      <div
        className="relative flex h-[clamp(80px,11vw,130px)] w-[clamp(80px,11vw,130px)] items-center justify-center rounded-[18px]"
        style={{
          background: "linear-gradient(145deg,rgba(255,255,255,0.09) 0%,rgba(255,255,255,0.03) 100%)",
          border: "1px solid rgba(255,255,255,0.13)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Top shimmer line */}
        <div
          className="pointer-events-none absolute inset-x-4 top-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(5,175,242,0.7),transparent)" }}
        />
        <span
          suppressHydrationWarning
          className="font-display font-black tabular-nums text-white"
          style={{ fontSize: "clamp(30px,5vw,58px)", letterSpacing: "-0.04em", lineHeight: 1 }}
        >
          {str}
        </span>
      </div>
      <span
        className="font-mono uppercase tracking-[0.25em] text-white/35"
        style={{ fontSize: "clamp(9px,0.75vw,11px)" }}
      >
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <div
      className="mb-[clamp(24px,3.5vw,44px)] self-center font-display font-bold text-white/20"
      style={{ fontSize: "clamp(24px,3.5vw,44px)" }}
    >
      :
    </div>
  );
}

export default function ComingSoonPage() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTime(getTimeLeft());
    setMounted(true);
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  });

  return (
    <main
      className="hero-bg relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden px-6 py-[clamp(48px,7vw,80px)]"
    >
      {/* Scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px)",
          backgroundSize: "100% 30px",
        }}
      />
      {/* Radial glows */}
      <div
        className="pointer-events-none absolute left-1/2 top-[-15%] h-[600px] w-[800px] -translate-x-1/2"
        style={{ background: "radial-gradient(ellipse,rgba(5,175,242,0.12),transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-20 h-[500px] w-[500px]"
        style={{ background: "radial-gradient(ellipse,rgba(61,90,217,0.16),transparent 65%)" }}
      />

      <div className="relative z-10 flex w-full max-w-[680px] flex-col items-center text-center">

        {/* ── Logo ── */}
        <motion.div {...fade(0)} className="mb-[clamp(6px,1vw,12px)]">
          <div className="flex items-baseline justify-center gap-px">
            <span
              className="font-display font-black text-white"
              style={{ fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-0.04em" }}
            >
              Northgate
            </span>
            <span style={{ fontSize: "clamp(33px,4.8vw,60px)", lineHeight: 1, color: "#05aff2" }}>.</span>
          </div>
          <p className="mt-1 text-center font-mono text-white/35" style={{ fontSize: "clamp(7px,0.65vw,9px)", letterSpacing: "0.3em" }}>
            CONSULTING
          </p>
        </motion.div>

        {/* ── Tagline ── */}
        <motion.p {...fade(0.12)}
          className="mb-[clamp(20px,3vw,36px)] max-w-[480px] font-display font-light leading-[1.6] text-white/45"
          style={{ fontSize: "clamp(12px,1.1vw,15px)", letterSpacing: "0.01em" }}
        >
          Enterprise strategy. Digital transformation.
          Delivered with clarity, speed, and conviction.
        </motion.p>

        {/* ── Separator ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mb-[clamp(20px,3vw,36px)] h-px w-full max-w-[320px]"
          style={{ background: "linear-gradient(90deg,transparent,rgba(5,175,242,0.5) 40%,rgba(5,175,242,0.5) 60%,transparent)" }}
        />

        {/* ── LAUNCHING label ── */}
        <motion.div {...fade(0.3)}
          className="mb-[clamp(4px,0.6vw,8px)] flex items-center gap-3"
        >
          <div className="h-px w-8 bg-white/15" />
          <span
            className="font-mono tracking-[0.32em] text-white/40"
            style={{ fontSize: "clamp(9px,0.85vw,12px)" }}
          >
            LAUNCHING
          </span>
          <div className="h-px w-8 bg-white/15" />
        </motion.div>

        {/* ── Date ── */}
        <motion.h1 {...fade(0.38)}
          className="m-0 mb-[clamp(24px,3.5vw,44px)] font-display font-black leading-none tracking-[-0.04em]"
          style={{ fontSize: "clamp(44px,7vw,92px)" }}
        >
          <span style={{ color: "#05aff2" }}>1 July</span>
          <span className="text-white"> 2026</span>
        </motion.h1>

        {/* ── Countdown ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-[clamp(24px,3.5vw,44px)] flex items-start gap-[clamp(6px,1.2vw,16px)]"
        >
          <Tile value={time.d} label="Days" />
          <Colon />
          <Tile value={time.h} label="Hours" />
          <Colon />
          <Tile value={time.m} label="Minutes" />
          <Colon />
          <Tile value={time.s} label="Seconds" />
        </motion.div>

        {/* ── Separator ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mb-[clamp(20px,2.5vw,32px)] h-px w-full max-w-[320px]"
          style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.1) 40%,rgba(255,255,255,0.1) 60%,transparent)" }}
        />

        {/* ── Contact ── */}
        <motion.div {...fade(0.72)} className="flex flex-col items-center gap-4">
          <p
            className="font-display font-light text-white/35"
            style={{ fontSize: "clamp(12px,1vw,15px)", letterSpacing: "0.02em" }}
          >
            In the meantime, reach us directly
          </p>
          <a
            href="mailto:marketing@northgate-consulting.co.uk"
            className="group flex items-center gap-2.5 rounded-full px-[clamp(18px,2vw,28px)] py-[clamp(10px,1.2vw,14px)] font-display font-semibold text-white/75 transition-all duration-200 hover:text-white"
            style={{
              fontSize: "clamp(13px,1.1vw,15.5px)",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.03)",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(5,175,242,0.45)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
          >
            <Mail size={15} className="text-cyan flex-shrink-0" />
            marketing@northgate-consulting.co.uk
          </a>

        </motion.div>

      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-5 font-mono text-[10px] tracking-[0.2em] text-white/12"
      >
        &copy; {new Date().getFullYear()} NORTHGATE CONSULTING
      </motion.p>
    </main>
  );
}
