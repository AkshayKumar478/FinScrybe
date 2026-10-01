export function FinScrybeWordmark() {
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      {/* Small cyan and pink accent strokes above the wordmark */}
      <div className="flex items-center gap-1.5 mb-1" aria-hidden="true">
        <span className="w-3.5 h-[3px] rounded-full bg-[#00d2ff] -rotate-12" />
        <span className="w-3.5 h-[3px] rounded-full bg-[#ff4081] rotate-12" />
      </div>
      <div className="text-3xl font-extrabold tracking-tight select-none">
        <span className="text-[#0f172a]">Fin</span>
        <span className="text-[#635BFF]">Scrybe</span>
      </div>
    </div>
  );
}
