import type { Metadata } from "next";
import { Lexend, Source_Sans_3, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-lexend",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-source-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Northgate Consulting | Telecom, Healthcare & Fintech Advisory",
    template: "%s | Northgate Consulting",
  },
  description:
    "Strategic advisory and digital transformation for Telecom, Healthcare and Fintech enterprises. Board-level strategy to ground-level delivery — with clarity, speed, and conviction.",
  keywords: [
    "telecom consulting",
    "healthcare consulting",
    "fintech advisory",
    "BSS OSS advisory",
    "digital transformation",
    "enterprise architecture",
    "MVNO consulting",
    "telecom strategy",
    "healthcare digital transformation",
    "fintech strategy",
    "enterprise consulting Dubai",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Northgate Consulting",
    title: "Northgate Consulting | Telecom, Healthcare & Fintech Advisory",
    description:
      "Strategic advisory and digital transformation for Telecom, Healthcare and Fintech enterprises. Board-level strategy to ground-level delivery.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Northgate Consulting | Telecom, Healthcare & Fintech Advisory",
    description:
      "Strategic advisory and digital transformation for Telecom, Healthcare and Fintech enterprises.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isComingSoon = pathname === "/coming-soon";
  const isInternalTool = pathname.startsWith("/internal");
  const hideChrome = isComingSoon || isInternalTool;

  return (
    <html
      lang="en"
      className={`${lexend.variable} ${sourceSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-VJ5J1KKF75"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VJ5J1KKF75');
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased" style={{ backgroundColor: "#ffffff" }}>
        {!hideChrome && <Navbar />}
        <main className="flex-1">{children}</main>
        {!hideChrome && <Footer />}
      </body>
    </html>
  );
}
