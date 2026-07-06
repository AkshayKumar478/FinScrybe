export function Testimonials() {
  const testimonials = [
    {
      quote: "FinScrybe introduced a completely new level of visibility into our financials. The OCR is incredibly accurate and predictive forecasting is spot on.",
      author: "Jane Smith",
      title: "CFO at TechCorp",
      initials: "JS"
    },
    {
      quote: "The AI insights alone have paid for the subscription 10x over. We discovered significant inefficiencies we hadn't noticed before.",
      author: "Michael Roberts",
      title: "VP Finance, GlobalTrade",
      initials: "MR"
    },
    {
      quote: "It seamlessly connected with our bank accounts and automated all our manual data entry. Our finance team couldn't be happier.",
      author: "Sarah Chen",
      title: "Director of Ops, RetailMax",
      initials: "SC"
    }
  ];

  return (
    <section className="py-24 bg-white px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-finscrybe-text">Trusted by modern finance leaders</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white border border-finscrybe-border rounded-2xl p-8">
              <p className="text-finscrybe-text leading-relaxed mb-8">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-finscrybe-muted">
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-finscrybe-text">{t.author}</h4>
                  <p className="text-xs text-finscrybe-muted">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
