"use client";

import { useState } from "react";
import { MapPin, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedText";

const contactReasons = [
  "Board / CXO Advisory",
  "Business Consulting",
  "Digital Transformation",
  "RFP Development",
  "Vendor Evaluation",
  "Project Management",
  "Enterprise Architecture",
  "Other / General Enquiry",
];

const offices = [
  { city: "Dubai, UAE", address: "Business Bay, Dubai, UAE", flag: "🇦🇪" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", reason: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate async submit — replace with your form handler / API route
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0c1945] relative overflow-hidden">
        <div className="absolute inset-0 opacity-12" style={{ background: "radial-gradient(ellipse 60% 70% at 40% 50%, #3d5ad9, transparent)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-[0.15em] uppercase text-[#05aff2] mb-6">
              Contact
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-heading font-bold text-white mb-6 leading-tight" style={{ fontSize: "clamp(2.25rem, 5vw, 5rem)", letterSpacing: "-0.025em" }}>
              Let&apos;s start a
              <br /><span className="text-gradient-amber">conversation.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="font-body text-white/60 max-w-xl leading-relaxed text-lg">
              No pitches. No decks. Just a direct discussion about your challenges and how we might help.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="section-padding bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Info panel */}
            <div className="lg:col-span-2 space-y-8">
              <FadeUp>
                <div>
                  <h2 className="font-heading font-bold text-[#0c1945] mb-3" style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}>
                    Get in touch
                  </h2>
                  <p className="font-body text-[#334155]/65 leading-relaxed">
                    We typically respond within one business day. For urgent matters, reach us directly by email.
                  </p>
                </div>
              </FadeUp>

              {/* Contact details */}
              <FadeUp delay={0.1}>
                <div className="space-y-4">
                  <a href="mailto:marketing@northgate-consulting.co.uk" className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#3d5ad9]/30 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-[#3d5ad9]/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-[#3d5ad9]" />
                    </div>
                    <div>
                      <p className="font-heading font-medium text-sm text-[#0c1945] mb-0.5">Email</p>
                      <p className="font-body text-sm text-[#334155]/60 group-hover:text-[#3d5ad9] transition-colors">marketing@northgate-consulting.co.uk</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E2E8F0]">
                    <div className="w-10 h-10 rounded-lg bg-[#05aff2]/10 flex items-center justify-center flex-shrink-0">
                      <Clock size={18} className="text-[#05aff2]" />
                    </div>
                    <div>
                      <p className="font-heading font-medium text-sm text-[#0c1945] mb-0.5">Response Time</p>
                      <p className="font-body text-sm text-[#334155]/60">Within 1 business day</p>
                    </div>
                  </div>
                </div>
              </FadeUp>

              {/* Offices */}
              <FadeUp delay={0.2}>
                <div>
                  <h3 className="font-heading font-semibold text-sm text-[#0c1945] mb-4 flex items-center gap-2">
                    <MapPin size={14} className="text-[#05aff2]" />
                    Our offices
                  </h3>
                  <div className="space-y-3">
                    {offices.map((o) => (
                      <div key={o.city} className="p-4 rounded-xl bg-white border border-[#E2E8F0]">
                        <p className="font-heading font-medium text-sm text-[#0c1945] mb-0.5">{o.flag} {o.city}</p>
                        <p className="font-body text-xs text-[#334155]/55">{o.address}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <FadeUp delay={0.1}>
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-card">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mb-6">
                          <CheckCircle size={32} className="text-green-500" />
                        </div>
                        <h3 className="font-heading font-bold text-[#0c1945] text-xl mb-3">Message received.</h3>
                        <p className="font-body text-[#334155]/65 max-w-sm">
                          Thank you for reaching out. We&apos;ll be in touch within one business day.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="space-y-5"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {/* Name */}
                          <div>
                            <label className="font-body text-xs font-semibold text-[#334155] tracking-wide uppercase mb-2 block">
                              Full Name *
                            </label>
                            <input
                              required
                              type="text"
                              placeholder="Jane Smith"
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#ffffff] font-body text-sm text-[#0c1945] placeholder:text-[#334155]/35 focus:outline-none focus:ring-2 focus:ring-[#3d5ad9]/30 focus:border-[#3d5ad9] transition-all"
                            />
                          </div>
                          {/* Email */}
                          <div>
                            <label className="font-body text-xs font-semibold text-[#334155] tracking-wide uppercase mb-2 block">
                              Work Email *
                            </label>
                            <input
                              required
                              type="email"
                              placeholder="jane@company.com"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#ffffff] font-body text-sm text-[#0c1945] placeholder:text-[#334155]/35 focus:outline-none focus:ring-2 focus:ring-[#3d5ad9]/30 focus:border-[#3d5ad9] transition-all"
                            />
                          </div>
                        </div>

                        {/* Company */}
                        <div>
                          <label className="font-body text-xs font-semibold text-[#334155] tracking-wide uppercase mb-2 block">
                            Company / Organisation *
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Acme Telecom"
                            value={form.company}
                            onChange={(e) => setForm({ ...form, company: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#ffffff] font-body text-sm text-[#0c1945] placeholder:text-[#334155]/35 focus:outline-none focus:ring-2 focus:ring-[#3d5ad9]/30 focus:border-[#3d5ad9] transition-all"
                          />
                        </div>

                        {/* Reason */}
                        <div>
                          <label className="font-body text-xs font-semibold text-[#334155] tracking-wide uppercase mb-2 block">
                            How can we help?
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {contactReasons.map((r) => (
                              <button
                                key={r}
                                type="button"
                                onClick={() => setForm({ ...form, reason: r })}
                                className={`px-3 py-1.5 rounded-lg text-xs font-body font-medium border transition-all duration-150 cursor-pointer ${
                                  form.reason === r
                                    ? "border-[#3d5ad9] bg-[#3d5ad9] text-white"
                                    : "border-[#E2E8F0] bg-[#ffffff] text-[#334155]/70 hover:border-[#3d5ad9]/40"
                                }`}
                              >
                                {r}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label className="font-body text-xs font-semibold text-[#334155] tracking-wide uppercase mb-2 block">
                            Tell us about your challenge *
                          </label>
                          <textarea
                            required
                            rows={5}
                            placeholder="Briefly describe your situation or question. The more context you share, the better our initial response will be."
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#ffffff] font-body text-sm text-[#0c1945] placeholder:text-[#334155]/35 focus:outline-none focus:ring-2 focus:ring-[#3d5ad9]/30 focus:border-[#3d5ad9] transition-all resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#0c1945] text-white font-heading font-semibold text-base hover:bg-[#3d5ad9] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
                        >
                          {submitting ? (
                            <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                          ) : (
                            <Send size={16} />
                          )}
                          {submitting ? "Sending..." : "Send Message"}
                        </button>

                        <p className="font-body text-xs text-[#334155]/40 text-center">
                          We never share your information. By submitting you agree to our Privacy Policy.
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
