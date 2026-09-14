"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Arc } from "@/components/shared/Arc";

const HEADLINE = ["Turning Enterprise", "Complexity into Execution"];
const TRIO     = ["Reliable", "Resilient", "Resolute"];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const yText   = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="hero-bg relative flex min-h-screen flex-col overflow-hidden text-white"
    >
      {/* horizon sheen */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[34%] h-[32%]"
        style={{
          background:
            "linear-gradient(180deg,transparent,rgba(120,180,235,0.10) 50%,transparent)",
        }}
      />
      {/* scanline grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px)",
          backgroundSize: "100% 26px",
        }}
      />

      {/* video — increased opacity so it shows through */}
      <video
        autoPlay muted loop playsInline preload="auto"
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* subtle dark vignette so text stays readable over video */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,rgba(10,22,64,0.55) 0%,rgba(10,22,64,0.20) 45%,rgba(10,22,64,0.55) 100%)",
        }}
      />

      {/* content anchored to bottom — keeps it clear of the nav dropdown */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mt-auto w-full"
      >
        <div className="mx-auto max-w-[1320px] px-[clamp(24px,5vw,72px)] pb-[clamp(56px,8vh,120px)]">
          <div className="max-w-[820px]">

            <h1
              className="m-0 font-display font-extrabold leading-[0.97] tracking-[-0.032em] text-white"
              style={{ fontSize: "clamp(36px,4.8vw,78px)" }}
            >
              {HEADLINE.map((line, i) => (
                <motion.span
                  key={i}
                  className="block"
                  initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.95,
                    delay: 0.15 + i * 0.22,
                    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                  }}
                >
                  {i === HEADLINE.length - 1 ? (
                    <>
                      {line.split(" ").slice(0, -1).join(" ")}{" "}
                      <span style={{ color: "#05aff2" }}>
                        {line.split(" ").slice(-1)[0]}
                      </span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.div
              className="mt-[22px] font-display font-semibold tracking-[-0.01em] text-white/85"
              style={{ fontSize: "clamp(18px,2vw,30px)" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {TRIO.map((word) => (
                <span key={word}>
                  {word}
                  <span style={{ color: "#05aff2" }}>.</span>{" "}
                </span>
              ))}
            </motion.div>

            <motion.p
              className="mt-5 max-w-[480px] leading-[1.65] text-white/60"
              style={{ fontSize: "clamp(15px,1.1vw,18px)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
            >
              From board-level strategy to ground-level delivery &mdash; Northgate
              partners with Telecom, Healthcare and Fintech enterprises navigating
              complex, high-stakes transformations.
            </motion.p>

            <motion.div
              className="mt-[30px] flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.92, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/contact"
                className="flex items-center gap-2.5 rounded-full px-7 py-3.5 font-display font-bold text-[#06203a] shadow-[0_10px_30px_rgba(5,175,242,0.35)] transition hover:-translate-y-0.5"
                style={{ fontSize: "clamp(14px,1vw,16px)", background: "#05aff2" }}
              >
                Start a Conversation <ArrowRight size={17} />
              </Link>
              <Link
                href="/what-we-do"
                className="flex items-center gap-2.5 rounded-full border-[1.5px] border-white/30 px-7 py-3.5 font-display font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
                style={{ fontSize: "clamp(14px,1vw,16px)" }}
              >
                See Our Approach
              </Link>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* arc into ProofBand */}
      <Arc
        variant="hero"
        fill="#ffffff"
        heightClass="h-[clamp(50px,6vw,110px)]"
        className="relative z-[4]"
      />
    </section>
  );
}
