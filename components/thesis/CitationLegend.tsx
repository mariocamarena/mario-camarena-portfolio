import { patternCounts } from "@/lib/citations"

export function CitationLegend() {
  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-white/80 font-mono text-sm font-semibold">Pattern Categories</h4>
        <span className="text-white/60 font-mono text-xs">{patternCounts.total} papers total</span>
      </div>

      <div className="space-y-3">
        {/* Pattern 1 - NOT USED */}
        <div className="flex items-center gap-3 opacity-50">
          <span className="px-2 py-0.5 text-[10px] font-mono bg-white/10 text-white/40 rounded line-through">snapshot</span>
          <div className="flex-1">
            <span className="text-white/40 font-mono text-xs line-through">Pattern 1: Discrete time windows</span>
            <span className="text-red-400/60 font-mono text-[10px] ml-2">NOT USED - computationally complex for irregular data</span>
          </div>
          <span className="text-white/30 font-mono text-xs">{patternCounts.snapshot} papers</span>
        </div>

        {/* Pattern 2 - SELECTED */}
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/20 text-emerald-400 rounded">event-driven</span>
          <div className="flex-1">
            <span className="text-white/80 font-mono text-xs">Pattern 2: Continuous-time updates</span>
            <span className="text-emerald-400/80 font-mono text-[10px] ml-2">BACKBONE</span>
          </div>
          <span className="text-white/60 font-mono text-xs">{patternCounts['event-driven']} papers</span>
        </div>

        {/* Pattern 3 - SELECTED */}
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 text-[10px] font-mono bg-blue-500/20 text-blue-400 rounded">hybrid</span>
          <div className="flex-1">
            <span className="text-white/80 font-mono text-xs">Pattern 3: Structural + Temporal encoders</span>
            <span className="text-blue-400/80 font-mono text-[10px] ml-2">ENCODER</span>
          </div>
          <span className="text-white/60 font-mono text-xs">{patternCounts.hybrid} papers</span>
        </div>
      </div>

      {/* Legend for highlighting */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-4 text-white/40 font-mono text-[10px]">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-400/60"></span>
          Primary reference
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-white/20"></span>
          Supporting reference
        </span>
      </div>
    </div>
  )
}
