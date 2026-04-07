"use client"

import type { Report } from '@/lib/thesis-types'

export function ReportList({ reports }: { reports: Report[] }) {
  return (
    <div className="space-y-2">
      <h4 className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--th-text)' }}>Reports</h4>
      {reports.map((report) => {
        const statusStyles: Record<string, { bg: string; color: string; label: string }> = {
          dropped: { bg: 'var(--th-bg-subtle)', color: 'var(--th-text-dim)', label: 'Dropped' },
          superseded: { bg: 'var(--th-bg-subtle)', color: 'var(--th-text-muted)', label: 'Superseded' },
          current: { bg: 'var(--th-bg-emphasis)', color: 'var(--th-text)', label: 'Current' },
        }
        const status = statusStyles[report.status]
        return (
          <div
            key={report.filename}
            className="rounded-lg p-3"
            style={{ backgroundColor: 'var(--th-bg-subtle)', border: '1px solid var(--th-border)' }}
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="font-mono text-xs font-semibold" style={{ color: 'var(--th-text-soft)' }}>{report.title}</span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono rounded shrink-0" style={{ backgroundColor: status.bg, color: status.color }}>
                {status.label}
              </span>
            </div>
            <p className="font-mono text-[11px]" style={{ color: 'var(--th-text-dim)' }}>{report.questionAnswered}</p>
            <p className="font-mono text-[10px] mt-1" style={{ color: 'var(--th-text-dim)' }}>{report.filename}</p>
          </div>
        )
      })}
    </div>
  )
}
