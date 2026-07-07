import { 
  ScanLine, 
  Building2, 
  BrainCircuit, 
  LineChart, 
  Users, 
  FileText 
} from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const featuresData = [
  {
    icon: <ScanLine size={24} />,
    title: "OCR Processing",
    description: "Automatically extract data from invoices and receipts with high precision, saving hours of manual data entry."
  },
  {
    icon: <Building2 size={24} />,
    title: "Bank Analysis",
    description: "Seamlessly connect and analyze transactions from global bank accounts across multiple currencies."
  },
  {
    icon: <BrainCircuit size={24} />,
    title: "AI Insights",
    description: "Identify anomalies, discover trends and uncover hidden opportunities instantly with predictive machine learning."
  },
  {
    icon: <LineChart size={24} />,
    title: "Financial Forecasting",
    description: "Simulate cash flow scenarios and project your profitability with our time-series forecasting models."
  },
  {
    icon: <Users size={24} />,
    title: "Payroll Intelligence",
    description: "Integrate payroll data effortlessly to manage costs and analyze your workforce financial distribution."
  },
  {
    icon: <FileText size={24} />,
    title: "Financial Reporting",
    description: "Generate beautiful P&L, Balance Sheets, and Cash Flow statements ready for board meetings."
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-finscrybe-bg px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-finscrybe-text mb-4">Everything your finance team needs</h2>
          <p className="text-lg text-finscrybe-muted">Built for scale. Designed for accuracy. Trusted by CFOs managing global enterprises.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, idx) => (
            <FeatureCard 
              key={idx}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
