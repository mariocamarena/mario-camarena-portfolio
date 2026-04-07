"use client"

import type { EntryType } from '@/lib/thesis-types'

const badgeConfig: Record<EntryType, { label: string; style: 'emphasis' | 'muted' | 'subtle' | 'outline' }> = {
  decision: { label: 'Decision', style: 'outline' },
  report: { label: 'Report', style: 'subtle' },
  pivot: { label: 'Pivot', style: 'outline' },
  result: { label: 'Result', style: 'emphasis' },
  failure: { label: 'Dropped', style: 'muted' },
  'data-collection': { label: 'Data Collection', style: 'subtle' },
  research: { label: 'Research', style: 'subtle' },
}

export function EntryTypeBadge({ type }: { type: EntryType }) {
  const config = badgeConfig[type]

  const styleMap = {
    emphasis: { backgroundColor: 'var(--th-bg-emphasis)', color: 'var(--th-text)', border: 'none' },
    outline: { backgroundColor: 'transparent', color: 'var(--th-text)', border: '1px solid var(--th-border)' },
    subtle: { backgroundColor: 'var(--th-bg-subtle)', color: 'var(--th-text-soft)', border: 'none' },
    muted: { backgroundColor: 'var(--th-bg-subtle)', color: 'var(--th-text-dim)', border: 'none' },
  }

  return (
    <span
      className="px-2 py-0.5 text-[10px] font-mono rounded"
      style={styleMap[config.style]}
    >
      {config.label}
    </span>
  )
}
