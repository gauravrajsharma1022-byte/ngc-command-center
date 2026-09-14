"use client";

import { useState, useRef, useEffect } from "react";
import { X, Clock, Calendar, Play, Pause, BookOpen, Headphones } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ──────────────────────────────────────────────────────────────────────

const ARTICLES = [
  {
    id: 1,
    hookLarge: "FAILING",
    hookSmall: "silently",
    hookLargeGold: false,
    date: "Apr 2026",
    readMin: "12 min",
    title: "Your BSS Transformation Will Fail Unless You Fix Your Business Journeys First",
    tags: ["Digital Transformation", "BSS", "Podcast"],
    audioSrc: "/founder/Portfolio/Podcast_Experience_1.mp3",
    content: `
<p>I've watched BSS transformation programs go sideways more times than I'd like to admit. And almost every time, the root cause is the same. The team picked the platform before they understood the business.</p>
<p>Not the business in some abstract strategy-deck sense. I mean the actual, step-by-step journeys that a customer, a retailer, or a call centre agent walks through every day. Prepaid activation. SIM swap. Plan transformation. Dunning. Number porting. The stuff that keeps a telecom service provider running.</p>
<p>When those journeys are not mapped, documented and agreed upon before transformation begins, you end up building a system that looks great in a demo and falls apart the moment real operations hit it.</p>
<h3>The pattern I keep seeing</h3>
<p>Here is how it usually goes. A telecom operator decides to replace their aging BSS. They run an RFP, evaluate three or four vendors, pick one based on feature checklists and pricing, and kick off the project. The implementation team starts configuring modules. Billing, CRM, product catalogue, OCS. Everyone is busy. Timelines are tight.</p>
<p>Six months in, someone from operations asks a simple question: "How does a customer who has been terminated get reactivated?" And nobody in the project room can answer it end to end. The CRM team knows their part. The billing and OCS team knows theirs. But the handoff between them, the notifications, the grace period logic, the outstanding balance check, the status update back to CRM? That lives in tribal knowledge. It was never written down. And the new system has no idea it exists.</p>
<p>This is where projects start bleeding time and money. Not because the technology is wrong, but because nobody forced the hard conversation about how the business actually works before they started configuring how it should work.</p>
<h3>Why technology selection is a terrible starting point</h3>
<p>Vendor demos are seductive. You see a clean UI, pre-built workflows, a catalogue that auto-provisions in seconds. It looks like the answer. But a demo environment has maybe five or six journeys configured, all running on clean data with no edge cases.</p>
<p>A real telecom service provider operates 25 to 35 distinct business journeys, sometimes more. Prepaid alone might have 15 to 20 if you count activations, top-ups, balance transfers, plan changes, SIM replacements, number porting, suspension, reactivation and the various flavours of barring and unbarring. Postpaid adds bill disputes, dunning sequences, credit limit adjustments and contract renewals.</p>
<p>When you select technology first, you are choosing an answer before you have finished writing the question. The inevitable result is that you discover gaps during UAT, which is the most expensive possible time to find them.</p>
<h3>What journey-first actually means in practice</h3>
<p>For every business journey your telecom service provider supports, you need four things documented before the transformation project starts configuring anything.</p>
<p>First, the end-to-end flow. Not just "customer activates SIM" but every system interaction, every API call, every status change, every notification. Who initiates it. What validates it. What happens when it fails.</p>
<p>Second, the business rules. What is the grace period after a payment fails? Can a barred customer still receive calls? Is a SIM swap allowed while a number port is in progress? These rules are almost never in a single document. Getting them out and onto paper is uncomfortable, slow work. It is also the most valuable thing you can do before spending a single pound on configuration.</p>
<p>Third, the exception paths. The happy path is easy. Every vendor can demo the happy path. What matters is what happens when the top-up gateway times out, or the MNP request gets rejected, or the eSIM profile download fails mid-provisioning. These exception scenarios cause the majority of post-go-live support tickets.</p>
<p>Fourth, testable acceptance criteria. Every journey needs clear, scenario-based test cases: positive ones that prove the journey works and negative ones that prove it fails gracefully.</p>
<h3>The uncomfortable truth</h3>
<p>Journey mapping is slow. It requires pulling busy people into workshops. It surfaces disagreements about how things should work. It forces decisions that teams have been deferring for years. But every BSS transformation I have seen succeed had this work done upfront. And every one that spiralled had skipped it.</p>
<p>The technology matters. But technology is the second decision, not the first. The first decision is whether you are willing to do the unglamorous, detail-heavy work of understanding your own business well enough to explain it to a new system.</p>`,
  },
  {
    id: 2,
    hookLarge: "HIDDEN",
    hookSmall: "revenue",
    hookLargeGold: true,
    date: "Apr 2026",
    readMin: "9 min",
    title: "Campaign Management Is the Most Undervalued Module in Your BSS Stack",
    tags: ["BSS", "Campaign Management", "Podcast"],
    audioSrc: "/founder/Portfolio/Podcast_Experience_2.mp3",
    content: `
<p>I have sat through a lot of BSS vendor demos. Billing gets a full session. OCS gets another — real-time charging, policy control, spending limits. The product catalogue team brings slides. Campaign Management usually gets twenty minutes at the end, when everyone is tired.</p>
<p>I want to talk about why that matters.</p>
<p>This module sits at the intersection of every commercially important thing your BSS does — pricing, customer lifecycle, retention, offer eligibility, revenue recovery. Most operators treat it like a tool for sending promotional SMS. It is not. Configured properly, it is how you keep customers from leaving, how you recover subscribers who have stopped recharging, how you move prepaid customers into higher-value segments.</p>
<h3>What operators think it does</h3>
<p>The standard assumption is that Campaign Management handles batch messaging. You upload a list, attach a message, schedule a send. Marketing uses it. The BSS team ignores it.</p>
<p>That assumption leaves most of the module's value sitting idle.</p>
<p>A proper implementation runs lifecycle-triggered campaigns in real time. Not weekly batch jobs. Not manual lists. Event-driven logic that monitors subscriber behaviour and responds: a prepaid customer whose balance drops below a threshold gets a targeted top-up offer within seconds. A postpaid customer who has been on the same plan for three years gets an upgrade path before a competitor does. A subscriber who has not recharged in 12 days gets a winback sequence calibrated to their history, not a generic promotional SMS.</p>
<p>This requires real-time integration between Campaign Management, the OCS and rating engine, the product catalogue and CRM. In most implementations I have reviewed, those connections exist in theory and are half-built in practice.</p>
<h3>The journey problem no one talks about</h3>
<p>Campaign logic cannot be configured in isolation. It depends on decisions that were supposed to be made earlier in the transformation — and usually were not.</p>
<p>Think about what a winback campaign actually requires. You need to know what triggers "at risk" status for a subscriber. Is it zero recharge in 10 days? 15? Does it vary by segment? You need to know what offer is eligible at that moment, which means product catalogue eligibility rules have to exist before campaign logic can reference them.</p>
<p>None of that is a Campaign Management question on its own. It is a business journey. And if you have not mapped that journey across every system and every status transition, you cannot configure the campaign correctly.</p>
<h3>Who actually owns this thing</h3>
<p>That ownership gap is its own problem. Campaign Management does not have a natural home in most operator org structures. Marketing wants to use it but does not understand the BSS dependencies underneath. The BSS team built it but considers it a marketing responsibility. Product owns some of the offer logic but is not in the room where campaigns are configured.</p>
<p>The result is a module everyone touches partially and nobody understands fully. Campaigns get created in silos. Eligibility rules get manually overridden because someone does not trust the system logic. Reporting is inconsistent because three teams measure campaign success differently and none of them talk to each other.</p>
<h3>A practical test</h3>
<p>Pick one campaign running in production right now — a winback sequence, a retention offer, a recharge promotion. Then trace it properly: what triggers it, what eligibility check runs before the message sends, how the offer is sourced, what happens when a customer responds, how the outcome gets recorded and who reviews that data.</p>
<p>If you can answer that end to end with confidence, your Campaign Management setup is in reasonable shape. If the answer involves "I think marketing manages that" or "we use a segment file that comes weekly," you are leaving revenue on the table and you probably do not know the number.</p>`,
  },
  {
    id: 3,
    hookLarge: "DATA",
    hookSmall: "first.",
    hookLargeGold: false,
    date: "Apr 2026",
    readMin: "8 min",
    title: "Telecom Operators Do Not Have an AI Problem. They Have a Data Problem.",
    tags: ["AI", "Data", "Telecom", "Podcast"],
    audioSrc: "/founder/Portfolio/Podcast_Experience_3.mp3",
    content: `
<p>Every telecom conference I have attended in the past two years has had the same energy. AI is going to predict churn. AI is going to optimise network slicing. AI is going to personalise offers in real time. AI is going to automate the contact centre.</p>
<p>Fine. But I have a question that tends to kill the mood: where is the data coming from?</p>
<p>In most telecom operators I have worked with, the answer is uncomfortable. Customer data sits in CRM. Usage data sits in the OCS. Billing records live in a separate system. Product definitions exist in the catalogue but do not always match what is actually provisioned. And the CDRs that feed mediation do not reconcile cleanly with what billing says the customer consumed.</p>
<p>You cannot build intelligence on top of that.</p>
<h3>The five-system problem</h3>
<p>I call it the five-system problem because that is roughly how many places a typical telecom operator stores information about a single customer. CRM has the profile and contact history. The OCS has the real-time balance, active offers and usage counters. Billing has the invoice records, payment history and dunning status. The product catalogue has what the customer should be subscribed to. And the provisioning layer has what is actually active on the network.</p>
<p>In theory, these systems sync. In practice, they drift. A customer changes their plan through the self-care portal and the catalogue updates, but the provisioning layer takes 48 hours to catch up. A payment comes in but the OCS does not clear the bar status because the integration between billing and charging has a known lag.</p>
<p>These are not hypothetical edge cases. They are Tuesday. And AI cannot learn to live with it. A churn prediction model trained on CRM data that does not reflect actual usage patterns will predict the wrong customers.</p>
<h3>Why this is a BSS problem, not an IT problem</h3>
<p>It is tempting to frame data quality as an IT issue. Get the DBAs involved. Run some ETL jobs. Build a data lake. But in telecom, the data mess is a BSS architecture problem. It is structural.</p>
<p>When BSS platforms were built 10 or 15 years ago, they were designed for a specific set of workflows: activate a SIM, rate a call, generate a bill, handle a complaint. Each module optimised for its own job. They were never designed to share a single, coherent view of the customer, because nobody needed them to. AI does not have a customer service agent's patience. It needs one truth, not five versions of it.</p>
<h3>What to fix before you fund an AI initiative</h3>
<p>If I were advising a telecom operator's CTO on AI readiness, I would not start with model selection or vendor evaluation. I would start with four questions.</p>
<p>Can you produce a single, accurate subscriber record that every system agrees on? If CRM, OCS, billing and provisioning show different statuses, products or balances for the same customer, that is your first problem.</p>
<p>Are your event pipelines real-time and reliable? Check your CDR flow, your notification triggers, your usage event streaming. If there are gaps, lags or dropped events, no real-time AI use case will work.</p>
<p>Is your product catalogue the source of truth, or just one of several opinions? If what is in the catalogue does not match what is provisioned, what is billed and what the customer sees in self-care, you have a catalogue integrity problem.</p>
<p>Do you have a data governance owner, or just data? Someone needs to own the definition of "active subscriber," "churn event," "revenue per user." If those definitions vary by department, your AI will inherit the confusion.</p>
<h3>The uncomfortable sequencing question</h3>
<p>The board wants AI. The CEO read a report. The vendor is showing demos with impressive dashboards. And the person who has to stand up and say "our data is not ready" looks like they are blocking progress. But it is true more often than it is not.</p>
<p>The operators who get AI right will not be the ones who adopted it first. They will be the ones who fixed their data first. That is less exciting than a demo. But it is what actually works.</p>`,
  },
];

// ─── Podcast player ────────────────────────────────────────────────────────────

function PodcastPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play(); setPlaying(true); }
  };

  return (
    <div className="flex items-center gap-3 my-6 px-4 py-3 rounded-xl"
      style={{ background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.2)" }}>
      <audio ref={audioRef} src={src} onEnded={() => setPlaying(false)} />
      <button onClick={toggle}
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-105"
        style={{ background: "#D4AF37" }}>
        {playing
          ? <Pause size={13} className="text-black" />
          : <Play size={13} className="text-black ml-0.5" />}
      </button>
      <div>
        <p className="font-heading font-semibold text-white text-xs">Listen as a Podcast</p>
        <p className="text-xs mt-0.5" style={{ color: "#8892b0" }}>
          {playing ? "Playing…" : "Press play to listen"}
        </p>
      </div>
      <Headphones size={15} className="ml-auto shrink-0" style={{ color: "rgba(212,175,55,0.4)" }} />
    </div>
  );
}

// ─── Modal ─────────────────────────────────────────────────────────────────────

function ArticleModal({ article, onClose }: { article: typeof ARTICLES[0]; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(3,6,17,0.88)", backdropFilter: "blur(10px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className="relative w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col"
        style={{ background: "#0D1525", border: "1px solid rgba(212,175,55,0.2)", boxShadow: "0 32px 80px rgba(0,0,0,0.85), 0 0 36px rgba(212,175,55,0.1)" }}
        initial={{ y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="px-7 pt-7 pb-5 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              {article.tags.map((t) => (
                <span key={t}
                  className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md tracking-widest uppercase"
                  style={{ color: "#D4AF37", background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}>
                  {t}
                </span>
              ))}
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "#8892b0" }}>
              <X size={15} />
            </button>
          </div>
          <h2 className="font-heading font-bold text-white leading-tight"
            style={{ fontSize: "clamp(1.05rem, 2vw, 1.35rem)", letterSpacing: "-0.016em" }}>
            {article.title}
          </h2>
          <p className="text-xs mt-2 flex items-center gap-1" style={{ color: "#4A5568" }}>
            <Calendar size={10} /> {article.date}
            <span className="mx-1">·</span>
            <Clock size={10} /> {article.readMin}
          </p>
        </div>
        <div className="overflow-y-auto flex-1 px-7 pb-8">
          <PodcastPlayer src={article.audioSrc} />
          <div className="article-modal-body" dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────────

function ArticleCard({ article, onClick }: { article: typeof ARTICLES[0]; onClick: () => void }) {
  return (
    <motion.div
      className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{ background: "#000", border: "1px solid rgba(212,175,55,0.15)", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
      whileHover={{
        y: -8,
        borderColor: "rgba(212,175,55,0.55)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.12)",
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
    >
      {/* Hook area */}
      <div className="relative h-[200px] flex items-end px-7 pb-6 overflow-hidden" style={{ background: "#000" }}>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            background: article.hookLargeGold
              ? "radial-gradient(ellipse at 20% 80%, rgba(0,245,255,0.08) 0%, transparent 65%)"
              : "radial-gradient(ellipse at 20% 80%, rgba(212,175,55,0.12) 0%, transparent 65%)",
          }}
        />
        <motion.div
          className="absolute top-0 left-7"
          style={{ height: "2px", background: "linear-gradient(90deg, #D4AF37, #f5d76e)", boxShadow: "0 0 8px rgba(212,175,55,0.5)" }}
          initial={{ width: "40px" }}
          whileHover={{ width: "calc(100% - 28px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
        />
        <div className="flex flex-col gap-1 relative z-10 w-full overflow-hidden">
          <span className="block font-black leading-none select-none"
            style={{
              fontSize: "72px",
              letterSpacing: "-3px",
              lineHeight: 0.9,
              background: article.hookLargeGold
                ? "linear-gradient(90deg, #D4AF37 30%, #fff8e1 50%, #D4AF37 70%)"
                : "linear-gradient(90deg, #F0F4FF 30%, #D4AF37 50%, #F0F4FF 70%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
            {article.hookLarge}
          </span>
          <span className="block font-light uppercase select-none"
            style={{
              fontSize: "32px",
              letterSpacing: "5px",
              marginLeft: "4px",
              color: article.hookLargeGold ? "#F0F4FF" : "#D4AF37",
            }}>
            {article.hookSmall}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-7 pt-5 pb-6">
        <div className="flex items-center gap-2 text-xs mb-3" style={{ color: "#4A5568" }}>
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readMin}</span>
        </div>
        <h3 className="font-heading font-bold text-white leading-snug mb-3 flex-1 group-hover:text-[#D4AF37] transition-colors duration-200"
          style={{ fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
          {article.title}
        </h3>
        <p className="text-xs mb-5" style={{ color: "#8892b0" }}>
          {article.tags.join(" · ")}
        </p>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 text-[11px] font-semibold px-4 py-2 rounded-full transition-all hover:brightness-110"
            style={{ background: "#D4AF37", color: "#000" }}
            onClick={(e) => { e.stopPropagation(); onClick(); }}>
            <BookOpen size={11} /> Read
          </button>
          <button
            className="flex items-center gap-1.5 text-[11px] font-medium px-4 py-2 rounded-full transition-all hover:border-[#00F5FF] hover:text-[#00F5FF]"
            style={{ background: "transparent", color: "#8892b0", border: "1px solid rgba(255,255,255,0.12)" }}
            onClick={(e) => { e.stopPropagation(); onClick(); }}>
            <Headphones size={11} /> Listen
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────

export default function ArticlesSection() {
  const [open, setOpen] = useState<typeof ARTICLES[0] | null>(null);

  return (
    <>
      <section className="py-20" style={{ background: "#050A18" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase mb-4"
              style={{ color: "#D4AF37" }}>
              Latest Articles
            </span>
            <h2 className="font-heading font-bold text-white leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.022em" }}>
              Thinking from the front line.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES.map((a) => (
              <ArticleCard key={a.id} article={a} onClick={() => setOpen(a)} />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && <ArticleModal article={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>

      <style>{`
        .article-modal-body h3 {
          font-size: 1rem;
          font-weight: 700;
          color: #F0F4FF;
          margin: 1.75rem 0 0.75rem;
          letter-spacing: -0.012em;
        }
        .article-modal-body p {
          font-size: 0.93rem;
          color: #8892b0;
          line-height: 1.85;
          margin-bottom: 1rem;
        }
      `}</style>
    </>
  );
}
