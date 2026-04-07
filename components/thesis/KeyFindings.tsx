"use client"

export function KeyFindings({ findings }: { findings: string[] }) {
  return (
    <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--th-bg-subtle)', border: '1px solid var(--th-border)' }}>
      <h4 className="font-mono text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--th-text)' }}>Key Findings</h4>
      <ul className="space-y-1.5">
        {findings.map((finding, i) => (
          <li key={i} className="font-mono text-xs flex gap-2" style={{ color: 'var(--th-text-muted)' }}>
            <span className="shrink-0" style={{ color: 'var(--th-text-faint)' }}>•</span>
            <span>{finding}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
