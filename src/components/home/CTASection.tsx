import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-[clamp(24px,5vw,72px)] py-[clamp(70px,9vw,140px)] text-center"
      style={{ background: "linear-gradient(180deg,#0c1945,#050912)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.035) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[-30%] h-[500px] w-[760px] -translate-x-1/2"
        style={{ background: "radial-gradient(circle,rgba(5,175,242,0.18),transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-[920px]">
        <div className="mb-[34px] inline-flex items-center gap-2 rounded-full border border-cyan/50 px-[18px] py-[9px] font-mono text-[12px] tracking-[0.22em] text-cyan">
          <MessageCircle size={14} />
          LET&apos;S TALK
        </div>

        <h2
          className="mx-auto m-0 max-w-[14ch] text-balance font-display font-extrabold leading-[0.98] tracking-[-0.035em] text-white"
          style={{ fontSize: "clamp(38px,6vw,86px)" }}
        >
          Ready to transform your{" "}
          <span className="text-cyan">enterprise?</span>
        </h2>

        <p
          className="mx-auto mt-[30px] max-w-[620px] leading-[1.6] text-mute"
          style={{ fontSize: "clamp(16px,1.3vw,19px)" }}
        >
          Whether you are planning a major transformation, evaluating vendors,
          or looking for a trusted strategic partner &mdash; we are the call you
          should make first.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="flex items-center gap-2.5 rounded-full bg-cyan px-8 py-4 font-display font-bold text-[#06203a] shadow-[0_10px_30px_rgba(5,175,242,0.35)] transition hover:-translate-y-0.5"
            style={{ fontSize: "16px" }}
          >
            Start a Conversation <ArrowRight size={18} />
          </Link>
          <Link
            href="/our-thinking"
            className="flex items-center gap-2.5 rounded-full border-[1.5px] border-white/30 px-[30px] py-4 font-display font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
            style={{ fontSize: "16px" }}
          >
            Read Our Thinking
          </Link>
        </div>

        <p className="mt-[42px] italic text-mute-deep" style={{ fontSize: "15px" }}>
          &ldquo;Empowering telecoms and enterprises to navigate digital transformation with clarity, speed, and confidence.&rdquo;
        </p>
      </div>
    </section>
  );
}
