import Link from "next/link";

export const metadata = { title: "Terms of Use | Northgate Consulting" };

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-[820px] px-6 py-[clamp(80px,10vw,140px)]">
      <p className="mb-4 font-mono text-[12px] tracking-[0.22em] text-[#3d5ad9]">LEGAL</p>
      <h1
        className="m-0 mb-8 font-display font-extrabold leading-tight tracking-[-0.03em] text-[#0c1945]"
        style={{ fontSize: "clamp(28px,4vw,52px)" }}
      >
        Terms of Use
      </h1>
      <div className="space-y-6 leading-[1.8] text-[#334155]/75" style={{ fontSize: "clamp(15px,1.1vw,17px)" }}>
        <p>
          By accessing this website you agree to these terms. Northgate Consulting reserves the right to
          update this page at any time without prior notice.
        </p>
        <h2 className="text-lg font-bold text-[#0c1945]">Intellectual Property</h2>
        <p>
          All content on this site — including text, graphics, and branding — is the property of Northgate
          Consulting and may not be reproduced without written permission.
        </p>
        <h2 className="text-lg font-bold text-[#0c1945]">Limitation of Liability</h2>
        <p>
          Information on this site is provided for general informational purposes only. Northgate Consulting
          accepts no liability for decisions made based on content found here without a formal engagement.
        </p>
        <h2 className="text-lg font-bold text-[#0c1945]">Governing Law</h2>
        <p>
          These terms are governed by applicable law. For any questions, please{" "}
          <Link href="/contact" className="text-[#3d5ad9] underline underline-offset-2 hover:opacity-75">
            contact us
          </Link>
          .
        </p>
        <p className="text-sm text-[#334155]/40">Last updated: June 2026</p>
      </div>
    </main>
  );
}
