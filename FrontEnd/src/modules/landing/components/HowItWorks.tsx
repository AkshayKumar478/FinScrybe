export function HowItWorks() {
  const steps = [
    { num: "1", title: "Data Upload", desc: "Sync bank or upload manually" },
    { num: "2", title: "Smart Process", desc: "OCR and AI categorizes data" },
    { num: "3", title: "Validation", desc: "Review and approve data points" },
    { num: "4", title: "Consolidate", desc: "Project financials against budget" },
    { num: "5", title: "Insights", desc: "Auto-generated finance reports" },
    { num: "6", title: "Advise & Act", desc: "Make decisions confidently" }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-finscrybe-text mb-4">A seamless path to clarity</h2>
          <p className="text-lg text-finscrybe-muted">From raw data to actionable business intelligence.</p>
        </div>

        <div className="relative max-w-5xl mx-auto hidden md:block">
          {/* Timeline connecting line */}
          <div className="absolute top-[24px] left-0 right-0 h-0.5 bg-finscrybe-border z-0" />
          
          <div className="flex justify-between relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center w-[140px]">
                <div className="w-12 h-12 bg-white border-2 border-finscrybe-border rounded-full flex items-center justify-center font-semibold text-finscrybe-muted mb-4">
                  {step.num}
                </div>
                <h4 className="font-semibold text-sm text-finscrybe-text mb-2">{step.title}</h4>
                <p className="text-xs text-finscrybe-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View Timeline */}
        <div className="md:hidden space-y-8 pl-4 border-l-2 border-finscrybe-border ml-4">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[35px] top-0 w-8 h-8 bg-white border-2 border-finscrybe-border rounded-full flex items-center justify-center font-semibold text-finscrybe-muted text-sm">
                {step.num}
              </div>
              <h4 className="font-semibold text-finscrybe-text mb-1">{step.title}</h4>
              <p className="text-sm text-finscrybe-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
