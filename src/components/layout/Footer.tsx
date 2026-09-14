import Link from "next/link";
import { ExternalLink, Mail, MapPin, ArrowUpRight } from "lucide-react";

// LinkedIn SVG icon (lucide-react v1.x doesn't include it)
function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const services = [
  "Board & CXO Advisory",
  "Business Consulting",
  "Presales & Postsales",
  "Competitive Intelligence",
  "Vendor Evaluation",
  "Project Management",
  "Digital Transformation",
  "Enterprise Architecture",
];

const sectors = [
  { label: "Telecom Operators", href: "/sectors#telecom" },
  { label: "MVNO / MVNE",       href: "/sectors#mvno" },
  { label: "Enterprise",         href: "/sectors#enterprise" },
  { label: "Healthcare",         href: "/sectors#healthcare" },
  { label: "Fintech",            href: "/sectors#fintech" },
];

const company = [
  { label: "Who We Are",   href: "/who-we-are" },
  { label: "Our Values",   href: "/our-values" },
  { label: "Our Thinking", href: "/our-thinking" },
  { label: "Contact",      href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0c1945] text-white">
      {/* Top band */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex flex-col leading-none mb-6 select-none">
                <div className="flex items-baseline">
                  <span
                    className="font-heading font-black text-white"
                    style={{ fontSize: "1.45rem", letterSpacing: "-0.04em" }}
                  >
                    Northgate
                  </span>
                  <span style={{ fontSize: "1.65rem", lineHeight: 1, color: "#05aff2", marginLeft: "1px" }}>.</span>
                </div>
                <span
                  className="font-mono uppercase text-white/45"
                  style={{ fontSize: "0.52rem", letterSpacing: "0.26em", marginTop: "2px" }}
                >
                  Consulting
                </span>
              </div>
              <p className="font-body text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
                Empowering telecoms and enterprises to navigate digital transformation with clarity, speed, and confidence.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/company/northgate-consulting/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center hover:bg-[#3d5ad9] transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon size={16} />
                </a>
                <a
                  href="mailto:marketing@northgate-consulting.co.uk"
                  className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center hover:bg-[#05aff2] transition-colors duration-200"
                  aria-label="Email"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-heading font-semibold text-sm tracking-wider uppercase text-[#05aff2] mb-5">
                Services
              </h3>
              <ul className="space-y-2.5">
                {services.map((s) => (
                  <li key={s}>
                    <Link
                      href="/what-we-do"
                      className="font-body text-sm text-white/55 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#05aff2]/40 group-hover:bg-[#05aff2] transition-colors flex-shrink-0" />
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sectors + Company */}
            <div>
              <h3 className="font-heading font-semibold text-sm tracking-wider uppercase text-[#05aff2] mb-5">
                Sectors
              </h3>
              <ul className="space-y-2.5 mb-8">
                {sectors.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="font-body text-sm text-white/55 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#05aff2]/40 group-hover:bg-[#05aff2] transition-colors flex-shrink-0" />
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <h3 className="font-heading font-semibold text-sm tracking-wider uppercase text-[#05aff2] mb-5">
                Company
              </h3>
              <ul className="space-y-2.5">
                {company.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      className="font-body text-sm text-white/55 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#05aff2]/40 group-hover:bg-[#05aff2] transition-colors flex-shrink-0" />
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h3 className="font-heading font-semibold text-sm tracking-wider uppercase text-[#05aff2] mb-5">
                Get in Touch
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={15} className="text-[#05aff2] mt-0.5 flex-shrink-0" />
                  <span className="font-body text-sm text-white/55 leading-relaxed">
                    Business Bay, Dubai, UAE
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={15} className="text-[#05aff2] mt-0.5 flex-shrink-0" />
                  <a
                    href="mailto:marketing@northgate-consulting.co.uk"
                    className="font-body text-sm text-white/55 hover:text-white transition-colors"
                  >
                    marketing@northgate-consulting.co.uk
                  </a>
                </li>
              </ul>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-heading font-semibold rounded-lg border border-[#05aff2]/50 text-[#05aff2] hover:bg-[#05aff2] hover:text-white transition-all duration-200"
              >
                Start a Conversation
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-body text-xs text-white/30">
          © {new Date().getFullYear()} Northgate Consulting. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="font-body text-xs text-white/30 hover:text-white/60 transition-colors">Privacy Policy</Link>
          <Link href="/terms"   className="font-body text-xs text-white/30 hover:text-white/60 transition-colors">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}
