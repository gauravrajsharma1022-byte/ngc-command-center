"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Layout, Target, User, Mail } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────

type DropdownItem = {
  label: string;
  description: string;
  href: string;
  icon: React.ElementType;
};

type StripItem = {
  label: string;
  href: string;
};

type NavLink = {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
  strip?: StripItem[];
};

// ── Nav config ─────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  {
    label: "Who We Are",
    href: "/who-we-are",
    dropdown: [
      {
        label: "Overview",
        description: "Who Northgate is and what we stand for",
        href: "/who-we-are",
        icon: Layout,
      },
      {
        label: "Mission, Vision & Values",
        description: "The principles that guide every engagement",
        href: "/our-values",
        icon: Target,
      },
      {
        label: "Meet the Founder",
        description: "Gaurav Sharma — 20+ years shaping telecom strategy",
        href: "/founder/index.html",
        icon: User,
      },
      {
        label: "Contact Us",
        description: "Start a conversation with our team",
        href: "/contact",
        icon: Mail,
      },
    ],
  },
  {
    label: "What We Do",
    href: "/what-we-do",
    strip: [
      { label: "Strategic Advisory",    href: "/what-we-do/strategic-advisory" },
      { label: "Digital Transformation", href: "/what-we-do/digital-transformation" },
      { label: "Process & Solution Consulting", href: "/what-we-do/business-consulting" },
      { label: "Commercial Excellence", href: "/what-we-do/commercial-excellence" },
      { label: "Delivery Management",   href: "/what-we-do/delivery-management" },
    ],
  },
  {
    label: "Our Thinking",
    href: "/our-thinking",
    strip: [
      { label: "The AI Edge",      href: "/our-thinking/the-ai-edge" },
      { label: "Industry Signals", href: "/our-thinking/industry-signals" },
    ],
  },
];

// ── Full-width mega menu panel ─────────────────────────────────────────────

function MegaMenu({
  items,
  onMouseEnter,
  onMouseLeave,
}: {
  items: DropdownItem[] | StripItem[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-full inset-x-0 z-50 border-b border-white/10"
      style={{ background: "#0a0f2e" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center gap-1">
          {items.map((item, i) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href.split("#")[0]));

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.18 }}
              >
                <Link
                  href={item.href}
                  className={`relative inline-block px-5 py-4 font-body text-sm font-medium transition-colors duration-150 group whitespace-nowrap ${
                    isActive ? "text-[#05aff2]" : "text-white/65 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-5 right-5 h-[2px] bg-[#05aff2] rounded-full transition-transform duration-200 origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobile]         = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setMobile(false);
  }, [pathname]);

  const isTransparent = isHome && !scrolled && !mobileOpen && !openDropdown;

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 140);
  };

  const activeLink = navLinks.find((l) => l.label === openDropdown);
  const activeItems = activeLink?.dropdown ?? activeLink?.strip;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isTransparent
            ? "bg-transparent"
            : "glass-nav border-b border-white/10 shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo — always on dark navbar */}
            <Link href="/" className="flex flex-col leading-none group select-none">
              <div className="flex items-baseline">
                <span
                  className="font-heading font-black text-white"
                  style={{ fontSize: "1.35rem", letterSpacing: "-0.04em" }}
                >
                  Northgate
                </span>
                <span style={{ fontSize: "1.55rem", lineHeight: 1, color: "#05aff2", marginLeft: "1px" }}>
                  .
                </span>
              </div>
              <span
                className="font-mono uppercase"
                style={{ fontSize: "0.52rem", letterSpacing: "0.26em", color: "rgba(255,255,255,0.45)", marginTop: "1px" }}
              >
                Consulting
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active   = pathname === link.href || pathname.startsWith(link.href + "/");
                const hasDD    = !!(link.dropdown || link.strip);
                const isOpen   = openDropdown === link.label;

                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => { cancelClose(); if (hasDD) setOpenDropdown(link.label); }}
                    onMouseLeave={() => { if (hasDD) scheduleClose(); }}
                  >
                    <Link
                      href={link.href}
                      className={`relative inline-flex items-center gap-1.5 px-4 py-2 text-sm font-body font-medium rounded-lg transition-colors duration-200 group select-none
                        ${isTransparent ? "text-white/80 hover:text-white" : "text-white/70 hover:text-white"}
                        ${active || isOpen ? "text-white" : ""}
                      `}
                    >
                      {link.label}
                      {hasDD && (
                        <motion.svg
                          width="11" height="11" viewBox="0 0 12 12" fill="none"
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="opacity-50 mt-px"
                        >
                          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </motion.svg>
                      )}
                      <span className={`absolute bottom-1 left-4 right-4 h-[2px] bg-[#05aff2] rounded-full transition-transform duration-300 origin-left
                        ${active || isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                      />
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-heading font-semibold rounded-lg bg-[#3d5ad9] text-white hover:bg-[#2f4bbf] transition-colors duration-200 shadow-sm"
              >
                Get in Touch
              </Link>
              <button
                onClick={() => setMobile(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mega menu — anchored inside the fixed header so it slides from below nav */}
        <AnimatePresence>
          {openDropdown && activeItems && (
            <MegaMenu
              items={activeItems}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            />
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden glass-nav border-t border-white/10"
            >
              <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.dropdown ? (
                      <div className="mb-1">
                        <p className="px-4 py-2 font-body text-xs font-semibold tracking-widest uppercase text-white/30">
                          {link.label}
                        </p>
                        {link.dropdown.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setMobile(false)}
                              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/8 transition-colors"
                            >
                              <Icon size={14} className="text-[#05aff2]" />
                              <span className="font-body text-sm">{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    ) : link.strip ? (
                      <div className="mb-1">
                        <Link
                          href={link.href}
                          onClick={() => setMobile(false)}
                          className="px-4 py-2 font-body text-xs font-semibold tracking-widest uppercase text-white/30 block hover:text-white/50 transition-colors"
                        >
                          {link.label}
                        </Link>
                        {link.strip.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobile(false)}
                            className="block px-4 py-2.5 rounded-lg font-body text-sm text-white/70 hover:text-white hover:bg-white/8 transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setMobile(false)}
                        className={`block px-4 py-3 text-base font-body font-medium rounded-lg transition-colors ${
                          pathname === link.href
                            ? "text-[#05aff2] bg-white/10"
                            : "text-white/80 hover:text-white hover:bg-white/8"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
                <div className="mt-3 pt-3 border-t border-white/10">
                  <Link
                    href="/contact"
                    onClick={() => setMobile(false)}
                    className="block w-full text-center px-5 py-3 text-sm font-heading font-semibold rounded-lg bg-[#3d5ad9] text-white hover:bg-[#2f4bbf] transition-colors"
                  >
                    Get in Touch
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop — dims the page when mega menu is open */}
      <AnimatePresence>
        {openDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50"
            style={{ top: "80px" }}
            onClick={() => setOpenDropdown(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
