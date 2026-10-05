export function DashboardPreview() {
  return (
    <div className="mx-auto max-w-[1000px] bg-white rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-finscrybe-border overflow-hidden relative">
      <div className="bg-finscrybe-bg p-8 border-b border-finscrybe-border">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="text-finscrybe-muted text-sm mb-2 font-medium">Total Revenue</div>
            <div className="text-3xl font-bold text-finscrybe-text mb-2">$1.24M</div>
            <div className="text-emerald-500 text-sm font-semibold">+14.5% vs LY</div>
          </div>
          <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="text-finscrybe-muted text-sm mb-2 font-medium">Total Expenses</div>
            <div className="text-3xl font-bold text-finscrybe-text mb-2">$482.5k</div>
            <div className="text-red-500 text-sm font-semibold">+2.4% vs LY</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-[200px] flex items-end gap-4">
          {[40, 60, 45, 80, 100, 75].map((h, i) => (
            <div 
              key={i} 
              className={`flex-1 rounded-t-md transition-all duration-500 ${i === 4 ? 'bg-finscrybe-primary' : 'bg-indigo-200'}`} 
              style={{ height: `${h}%` }} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
