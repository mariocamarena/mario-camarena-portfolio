import { patternCounts } from "@/lib/citations"

export function CitationLegend() {
  return (
    <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--th-bg-subtle)', border: '1px solid var(--th-border-dim)' }}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-mono text-sm font-semibold" style={{ color: 'var(--th-text)' }}>Pattern Categories</h4>
        <span className="font-mono text-xs" style={{ color: 'var(--th-text-soft)' }}>{patternCounts.total} papers total</span>
      </div>

      <div className="space-y-3">
        {/* Pattern 1 - NOT USED */}
        <div className="flex items-center gap-3 opacity-60">
          <span className="px-2 py-0.5 text-[10px] font-mono rounded line-through" style={{ backgroundColor: 'var(--th-bg-subtle)', color: 'var(--th-text-dim)' }}>snapshot</span>
          <div className="flex-1">
            <span className="font-mono text-xs line-through" style={{ color: 'var(--th-text-dim)' }}>Pattern 1: Discrete time windows</span>
            <span className="font-mono text-[10px] ml-2" style={{ color: 'var(--th-text-faint)' }}>NOT USED</span>
          </div>
          <span className="font-mono text-xs" style={{ color: 'var(--th-text-dim)' }}>{patternCounts.snapshot} papers</span>
        </div>

        {/* Pattern 2 - SELECTED */}
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 text-[10px] font-mono rounded" style={{ backgroundColor: 'var(--th-bg-emphasis)', color: 'var(--th-text)' }}>event-driven</span>
          <div className="flex-1">
            <span className="font-mono text-xs" style={{ color: 'var(--th-text)' }}>Pattern 2: Continuous-time updates</span>
            <span className="font-mono text-[10px] ml-2" style={{ color: 'var(--th-text-soft)' }}>BACKBONE</span>
          </div>
          <span className="font-mono text-xs" style={{ color: 'var(--th-text-soft)' }}>{patternCounts['event-driven']} papers</span>
        </div>

        {/* Pattern 3 - SELECTED */}
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 text-[10px] font-mono rounded" style={{ backgroundColor: 'var(--th-bg-muted)', color: 'var(--th-text)' }}>hybrid</span>
          <div className="flex-1">
            <span className="font-mono text-xs" style={{ color: 'var(--th-text)' }}>Pattern 3: Structural + Temporal encoders</span>
            <span className="font-mono text-[10px] ml-2" style={{ color: 'var(--th-text-soft)' }}>ENCODER</span>
          </div>
          <span className="font-mono text-xs" style={{ color: 'var(--th-text-soft)' }}>{patternCounts.hybrid} papers</span>
        </div>
      </div>

      {/* Legend for highlighting */}
      <div className="mt-4 pt-3 flex items-center gap-4 font-mono text-[10px]" style={{ borderTop: '1px solid var(--th-border)', color: 'var(--th-text-muted)' }}>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--th-text-soft)' }}></span>
          Primary reference
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--th-text-faint)' }}></span>
          Supporting reference
        </span>
      </div>
    </div>
  )
}
