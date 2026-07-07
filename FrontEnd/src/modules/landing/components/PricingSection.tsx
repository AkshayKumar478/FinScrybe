import { PricingCard } from "./PricingCard";

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-finscrybe-bg px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-finscrybe-text mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-finscrybe-muted">Built for scale</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PricingCard 
            name="Monthly Plan"
            priceDisplay="₹999"
            priceSubtext=" / Month"
            subtitle="Suitable for small businesses."
            features={[
              "1 Administrator",
              "2 Executive Users",
              "2 Accountants",
              "OCR Invoice Processing",
              "Bank Statement Processing",
              "Revenue & Expense Management",
              "Employee Management",
              "Payroll Management",
              "Financial Reports",
              "AI Financial Insights",
              "Profit Forecasting",
              "Internal Team Chat",
              "Notifications",
              "Email Support"
            ]}
          />
          <PricingCard 
            name="Yearly Plan"
            priceDisplay="₹9,999"
            priceSubtext=" / Year"
            subtitle="Suitable for growing businesses."
            isPopular={true}
            features={[
              "Up to 5 Administrators",
              "Up to 10 Executive Users",
              "Up to 10 Accountants",
              "Everything included in the Monthly Plan",
              "Priority Email Support"
            ]}
          />
        </div>
      </div>
    </section>
  );
}
