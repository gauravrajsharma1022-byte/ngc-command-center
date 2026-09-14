import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Radio, Smartphone, Building2, HeartPulse, Landmark, CheckCircle2, ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/shared/AnimatedText";

export const metadata: Metadata = {
  title: "Sectors",
  description: "Practitioner-level expertise across Telecoms, MVNO/MVNE, Enterprise, Healthcare and Fintech.",
};

const sectors = [
  {
    id: "telecom",
    icon: Radio,
    title: "Telecom Operators",
    subtitle: "Tier 1, 2 & 3 Operators",
    desc: "Telecom operators face an unprecedented convergence of competitive pressure, legacy technology debt and rising customer expectations. We have worked across the full operator stack — from commercial strategy to BSS architecture — and we understand what it takes to transform at scale without disrupting operations.",
    capabilities: [
      "BSS / OSS modernisation advisory",
      "Digital channel strategy and CX transformation",
      "Network monetisation and product innovation",
      "Regulatory compliance and NPS programmes",
      "Merger, acquisition and integration support",
    ],
    imageSrc: "/images/sector-telecom.jpg",
    imageAlt: "Telecom network operations",
    color: "#3d5ad9",
  },
  {
    id: "mvno",
    icon: Smartphone,
    title: "MVNO / MVNE",
    subtitle: "Virtual Network Operators & Enablers",
    desc: "Launching or scaling a virtual network is complex — platform selection, host network negotiations, billing architecture and go-to-market all need to work in concert. We have supported MVNO launches across markets and bring tested playbooks to accelerate your time to market.",
    capabilities: [
      "MVNO business case and feasibility",
      "Platform and host network evaluation",
      "Billing and revenue management setup",
      "Go-to-market strategy and launch support",
      "Operational readiness and scaling",
    ],
    imageSrc: "/images/digital-transformation.jpg",
    imageAlt: "MVNO digital transformation",
    color: "#05aff2",
  },
  {
    id: "enterprise",
    icon: Building2,
    title: "Enterprise",
    subtitle: "Large Enterprises & Corporates",
    desc: "Enterprise digital transformation is a full-contact sport — competing priorities, legacy systems and change-resistant cultures all conspire against progress. We work alongside enterprise leadership teams to design realistic transformation programmes that deliver results, not just reports.",
    capabilities: [
      "Digital transformation strategy and playbooks",
      "Enterprise architecture and technology stack design",
      "RFP development and vendor evaluation",
      "Process re-engineering and operational design",
      "Sustainable ecosystem design",
    ],
    imageSrc: "/images/CXO Strategic.jpg",
    imageAlt: "Enterprise boardroom strategy",
    color: "#3d5ad9",
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    title: "Healthcare",
    subtitle: "Health Systems & Digital Health",
    desc: "Healthcare organisations are navigating digitisation, data privacy and patient experience challenges simultaneously. We bring a structured, compliance-aware approach to healthcare digital transformation — connecting clinical, operational and patient-facing systems with clarity.",
    capabilities: [
      "Digital health strategy and transformation",
      "Clinical and operational system integration",
      "Patient journey and CX design",
      "Regulatory and compliance advisory",
      "Healthcare technology vendor evaluation",
    ],
    imageSrc: "/images/sector-healthcare.jpg",
    imageAlt: "Healthcare digital transformation",
    color: "#05aff2",
  },
  {
    id: "fintech",
    icon: Landmark,
    title: "Fintech",
    subtitle: "Fintech Firms & Financial Services",
    desc: "Fintech organisations operate in a rapidly evolving landscape of regulation, competition and platform evolution. We help fintechs and financial institutions design the technology architectures, partnerships and customer experiences that support sustainable growth.",
    capabilities: [
      "Fintech platform and architecture strategy",
      "Regulatory and compliance framework design",
      "Digital product and customer experience advisory",
      "Partnership and ecosystem strategy",
      "Vendor evaluation for core fintech platforms",
    ],
    imageSrc: "/images/sector-fintech.jpg",
    imageAlt: "Fintech technology",
    color: "#3d5ad9",
  },
];

export default function SectorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0c1945] relative overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ background: "radial-gradient(ellipse 60% 80% at 70% 50%, #05aff2, transparent)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#05aff2] mb-6">
              Sectors
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-heading font-bold text-white mb-6 leading-tight" style={{ fontSize: "clamp(2.25rem, 5vw, 5rem)", letterSpacing: "-0.025em" }}>
              Domain expertise you can
              <br /><span className="text-gradient-amber">feel in every conversation.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="font-body text-white/60 max-w-2xl leading-relaxed text-lg">
              We do not generalise. Every engagement is grounded in practitioner knowledge built over decades in the field.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Sectors detail */}
      <section className="section-padding bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
          {sectors.map((s, i) => {
            const Icon = s.icon;
            const isEven = i % 2 === 1;
            return (
              <FadeUp key={s.id} delay={0.05}>
                <div id={s.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
                  <div className={isEven ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                        <Icon size={20} style={{ color: s.color }} />
                      </div>
                      <span className="font-body text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: s.color }}>{s.subtitle}</span>
                    </div>
                    <h2 className="font-heading font-bold text-[#0c1945] mb-4 leading-tight" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}>
                      {s.title}
                    </h2>
                    <p className="font-body text-[#334155]/75 leading-relaxed mb-7 text-base">{s.desc}</p>
                    <ul className="space-y-3 mb-8">
                      {s.capabilities.map((c) => (
                        <li key={c} className="flex items-start gap-3">
                          <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: s.color }} />
                          <span className="font-body text-sm text-[#334155]/80">{c}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-heading font-semibold transition-colors" style={{ color: s.color }}>
                      Discuss your sector <ArrowRight size={14} />
                    </Link>
                  </div>
                  <div className={isEven ? "lg:order-1" : ""}>
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(12,25,69,0.12)]">
                      <Image
                        src={s.imageSrc}
                        alt={s.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>
    </>
  );
}
