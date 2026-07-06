import { Hero } from "../components/Hero";
import { FeaturesSection } from "../components/FeaturesSection";
import { HowItWorks } from "../components/HowItWorks";
import { StatsSection } from "../components/StatsSection";
import { PricingSection } from "../components/PricingSection";
import { Testimonials } from "../components/Testimonials";
import { CTASection } from "../components/CTASection";

export function LandingPage() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <HowItWorks />
      <StatsSection />
      <PricingSection />
      <Testimonials />
      <CTASection />
    </>
  );
}
