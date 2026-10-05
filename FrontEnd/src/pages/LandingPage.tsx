import { Hero } from "../components/organisms/landing/Hero";
import { FeaturesSection } from "../components/organisms/landing/FeaturesSection";
import { HowItWorks } from "../components/organisms/landing/HowItWorks";
import { StatsSection } from "../components/organisms/landing/StatsSection";
import { PricingSection } from "../components/organisms/landing/PricingSection";
import { Testimonials } from "../components/organisms/landing/Testimonials";
import { CTASection } from "../components/organisms/landing/CTASection";

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
