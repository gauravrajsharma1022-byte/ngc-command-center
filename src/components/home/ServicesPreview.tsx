"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  BarChart3,
  FileSearch,
  ClipboardList,
  Target,
  TrendingUp,
  Map,
  Network,
  Layers,
  ArrowRight,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerContainer, StaggerItem } from "@/components/shared/AnimatedText";

const services = [
  {
    icon: Brain,
    title: "Board & CXO Advisory",
    desc: "Strategic counsel for Boards, Chairmen, and C-suite executives navigating telecom's most complex decisions.",
    accent: "#3d5ad9",
  },
  {
    icon: BarChart3,
    title: "Business & Solution Consulting",
    desc: "End-to-end consulting across business, solution, presales, and postsales for telecom transformation programmes.",
    accent: "#05aff2",
  },
  {
    icon: FileSearch,
    title: "RFP Development & Support",
    desc: "Building airtight RFPs that attract the right vendors and protect your commercial interests.",
    accent: "#3d5ad9",
  },
  {
    icon: Target,
    title: "Competitive Intelligence",
    desc: "Market surveillance, vendor benchmarking, and landscape analysis to sharpen your competitive edge.",
    accent: "#05aff2",
  },
  {
    icon: ClipboardList,
    title: "Vendor Evaluation",
    desc: "Rigorous, unbiased assessment frameworks to select the right technology partners for your ecosystem.",
    accent: "#3d5ad9",
  },
  {
    icon: TrendingUp,
    title: "Project Management",
    desc: "Structured delivery governance to keep transformation programmes on track, on budget, and on purpose.",
    accent: "#05aff2",
  },
  {
    icon: Map,
    title: "Digital Transformation Playbooks",
    desc: "Customised, executable roadmaps that translate vision into phased, measurable transformation.",
    accent: "#3d5ad9",
  },
  {
    icon: Layers,
    title: "Persona-Driven Journeys",
    desc: "Designing experiences for Retail, Enterprise, Partner, and Operations users across the telecom ecosystem.",
    accent: "#05aff2",
  },
  {
    icon: Network,
    title: "Enterprise Architecture",
    desc: "Building resilient, scalable blueprints that align technology with business outcomes.",
    accent: "#3d5ad9",
  },
];

export default function ServicesPreview() {
  return (
    <section className="section-padding bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <SectionHeader
            eyebrow="What We Do"
            title="Advisory that spans the full transformation lifecycle."
            subtitle="From setting strategy in the boardroom to driving delivery on the ground — we bring the expertise that makes the difference."
            className="max-w-2xl"
          />
          <Link
            href="/what-we-do"
            className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-heading font-semibold text-[#3d5ad9] hover:text-[#0c1945] transition-colors group"
          >
            View all services
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.title}>
                <Link
                  href="/what-we-do"
                  className="group block p-6 rounded-2xl bg-white border border-[#E2E8F0] card-hover h-full"
                >
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
                    style={{
                      background: `${s.accent}15`,
                      border: `1px solid ${s.accent}30`,
                    }}
                  >
                    <Icon size={20} style={{ color: s.accent }} />
                  </div>

                  <h3 className="font-heading font-semibold text-base text-[#0c1945] mb-2 group-hover:text-[#3d5ad9] transition-colors">
                    {s.title}
                  </h3>
                  <p className="font-body text-sm text-[#334155]/70 leading-relaxed">
                    {s.desc}
                  </p>

                  {/* Hover arrow */}
                  <div className="mt-4 flex items-center gap-1 text-xs font-heading font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: s.accent }}>
                    Learn more <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
