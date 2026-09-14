"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Radio, Smartphone, Building2, HeartPulse, Landmark, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import { FadeUp } from "@/components/shared/AnimatedText";

const sectors = [
  {
    icon: Radio,
    title: "Telecom Operators",
    slug: "telecom",
    desc: "Tier 1, 2, and 3 operators. From NPS strategy to BSS modernisation, we understand the full telecom stack.",
    tags: ["BSS / OSS", "Digital Channels", "CX Transformation"],
    imageHint: "Telecom tower / data centre operations — 800×500px",
    color: "#3d5ad9",
  },
  {
    icon: Smartphone,
    title: "MVNO / MVNE",
    slug: "mvno",
    desc: "Launching or scaling a virtual network? We bring end-to-end playbooks for go-to-market, billing, and operations.",
    tags: ["Go-to-Market", "Billing Platform", "Partner Management"],
    imageHint: "Mobile SIM / virtual network concept — 800×500px",
    color: "#05aff2",
  },
  {
    icon: Building2,
    title: "Enterprise",
    slug: "enterprise",
    desc: "Digital transformation, ecosystem design, and technology strategy for large enterprises across sectors.",
    tags: ["Digital Transformation", "EA", "RFP Support"],
    imageHint: "Modern enterprise office / boardroom — 800×500px",
    color: "#3d5ad9",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    slug: "healthcare",
    desc: "Connecting clinical and operational systems with smart digital strategies that improve patient outcomes.",
    tags: ["Digital Health", "System Integration", "Compliance"],
    imageHint: "Healthcare technology / digital health — 800×500px",
    color: "#05aff2",
  },
  {
    icon: Landmark,
    title: "Fintech",
    slug: "fintech",
    desc: "Advisory for fintechs and financial institutions navigating regulation, platform modernisation, and scale.",
    tags: ["Platform Strategy", "Regulatory", "Ecosystem Design"],
    imageHint: "Fintech / financial data abstract — 800×500px",
    color: "#3d5ad9",
  },
];

export default function SectorsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Sectors"
          title="Deep expertise across five high-growth industries."
          subtitle="We don't generalize. Every sector engagement is backed by practitioner-level domain knowledge."
          align="center"
          className="mb-16"
        />

        {/* Featured two - large cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {sectors.slice(0, 2).map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeUp key={s.title} delay={i * 0.1}>
                <Link href={`/sectors#${s.slug}`} className="group block rounded-2xl overflow-hidden border border-[#E2E8F0] card-hover bg-[#ffffff]">
                  {/* Image */}
                  <ImagePlaceholder
                    label={s.title}
                    hint={s.imageHint}
                    aspectRatio="aspect-[16/7]"
                    className="rounded-none"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15` }}>
                        <Icon size={16} style={{ color: s.color }} />
                      </div>
                      <h3 className="font-heading font-semibold text-[#0c1945] text-lg group-hover:text-[#3d5ad9] transition-colors">
                        {s.title}
                      </h3>
                      <ArrowUpRight size={15} className="ml-auto text-[#334155]/40 group-hover:text-[#3d5ad9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="font-body text-sm text-[#334155]/70 leading-relaxed mb-4">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-full text-xs font-body font-medium" style={{ background: `${s.color}12`, color: s.color }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </FadeUp>
            );
          })}
        </div>

        {/* Remaining three - smaller cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {sectors.slice(2).map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeUp key={s.title} delay={0.2 + i * 0.1}>
                <Link href={`/sectors#${s.slug}`} className="group block rounded-2xl overflow-hidden border border-[#E2E8F0] card-hover bg-[#ffffff]">
                  <ImagePlaceholder
                    label={s.title}
                    hint={s.imageHint}
                    aspectRatio="aspect-[4/3]"
                    className="rounded-none"
                  />
                  <div className="p-5">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15` }}>
                        <Icon size={14} style={{ color: s.color }} />
                      </div>
                      <h3 className="font-heading font-semibold text-[#0c1945] text-base group-hover:text-[#3d5ad9] transition-colors">
                        {s.title}
                      </h3>
                    </div>
                    <p className="font-body text-xs text-[#334155]/70 leading-relaxed mb-3">{s.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-full text-[11px] font-body font-medium" style={{ background: `${s.color}12`, color: s.color }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
