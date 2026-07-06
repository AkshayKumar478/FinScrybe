export function StatsSection() {
  return (
    <section className="py-16 bg-white px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white border border-finscrybe-border rounded-2xl p-8 text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-finscrybe-primary mb-2">500+</div>
            <div className="text-finscrybe-muted font-medium text-sm">Global Companies</div>
          </div>
          <div className="bg-white border border-finscrybe-border rounded-2xl p-8 text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-finscrybe-primary mb-2">1M+</div>
            <div className="text-finscrybe-muted font-medium text-sm">Transactions Processed</div>
          </div>
          <div className="bg-white border border-finscrybe-border rounded-2xl p-8 text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-finscrybe-primary mb-2">98%</div>
            <div className="text-finscrybe-muted font-medium text-sm">OCR Accuracy</div>
          </div>
          <div className="bg-white border border-finscrybe-border rounded-2xl p-8 text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-finscrybe-primary mb-2">40%</div>
            <div className="text-finscrybe-muted font-medium text-sm">Reduced Overhead</div>
          </div>
        </div>
      </div>
    </section>
  );
}
