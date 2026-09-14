import Link from "next/link";

export const metadata = { title: "Privacy Policy | Northgate Consulting" };

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-[820px] px-6 py-[clamp(80px,10vw,140px)]">
      <p className="mb-4 font-mono text-[12px] tracking-[0.22em] text-[#3d5ad9]">LEGAL</p>
      <h1
        className="m-0 mb-8 font-display font-extrabold leading-tight tracking-[-0.03em] text-[#0c1945]"
        style={{ fontSize: "clamp(28px,4vw,52px)" }}
      >
        Privacy Policy
      </h1>
      <div className="space-y-6 leading-[1.8] text-[#334155]/75" style={{ fontSize: "clamp(15px,1.1vw,17px)" }}>
        <p>
          Northgate Consulting is committed to protecting your personal information. This policy explains
          what data we collect, how we use it, and your rights as a visitor or client.
        </p>
        <h2 className="text-lg font-bold text-[#0c1945]">Information We Collect</h2>
        <p>
          We collect information you voluntarily provide through our contact form, including your name,
          email address, and any message content. We do not collect data through cookies beyond what is
          strictly necessary for the site to function.
        </p>
        <h2 className="text-lg font-bold text-[#0c1945]">How We Use Your Information</h2>
        <p>
          Information submitted via our contact form is used solely to respond to your enquiry. We do not
          sell, share, or transfer your personal data to third parties.
        </p>
        <h2 className="text-lg font-bold text-[#0c1945]">Contact</h2>
        <p>
          For any privacy-related questions, please{" "}
          <Link href="/contact" className="text-[#3d5ad9] underline underline-offset-2 hover:opacity-75">
            contact us directly
          </Link>
          .
        </p>
        <p className="text-sm text-[#334155]/40">Last updated: June 2026</p>
      </div>
    </main>
  );
}
