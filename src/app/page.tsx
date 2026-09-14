import HeroSection        from "@/components/home/HeroSection";
import ProofBand          from "@/components/home/ProofBand";
import IntelligenceSection from "@/components/home/IntelligenceSection";
import MethodSection       from "@/components/home/MethodSection";
import ProblemsSection     from "@/components/home/ProblemsSection";
import CTASection          from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProofBand />
      <IntelligenceSection />
      <MethodSection />
      <ProblemsSection />
      <CTASection />
    </>
  );
}
