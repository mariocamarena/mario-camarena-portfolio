"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import type { Phase } from '@/lib/thesis-types'
import { TimelineEntry } from './TimelineEntry'

const outcomeConfig: Record<string, { icon: string; label: string }> = {
  success: { icon: '✓', label: 'Validated' },
  failure: { icon: '✕', label: 'Dropped' },
  ongoing: { icon: '◌', label: 'In Progress' },
  foundation: { icon: '◈', label: 'Foundational' },
}

export function TimelinePhase({ phase, defaultOpen = true }: { phase: Phase; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const outcomeStyle = outcomeConfig[phase.outcomeType]

  return (
    <section id={`phase-${phase.id}`} className="scroll-mt-20">
      {/* Phase card — clickable header */}
      <div
        className="rounded-lg transition-colors"
        style={{
          border: `1px solid ${isOpen ? 'var(--th-border-hover)' : 'var(--th-border)'}`,
          backgroundColor: isOpen ? 'var(--th-elevated)' : 'var(--th-surface)',
        }}
      >
        <div className="p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 select-text">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-xl md:text-2xl font-mono font-bold" style={{ color: 'var(--th-text)' }}>
                  {phase.title}
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded" style={{ backgroundColor: 'var(--th-bg-muted)', color: 'var(--th-text-soft)' }}>
                  {outcomeStyle.icon} {outcomeStyle.label}
                </span>
              </div>
              <p className="font-mono text-xs mb-2" style={{ color: 'var(--th-text-muted)' }}>{phase.dateRange}</p>
              <p className="font-mono text-sm leading-relaxed" style={{ color: 'var(--th-text-soft)' }}>{phase.summary}</p>
              <p className="font-mono text-xs mt-2 italic" style={{ color: 'var(--th-text-dim)' }}>{phase.outcome}</p>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? `Collapse ${phase.title}` : `Expand ${phase.title}`}
              className="shrink-0 mt-1 w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2"
              style={{ backgroundColor: 'var(--th-bg-subtle)' }}
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                style={{ color: 'var(--th-text-muted)' }}
              />
            </button>
          </div>
          {!isOpen && (
            <p
              onClick={() => setIsOpen(true)}
              className="font-mono text-[11px] mt-3 cursor-pointer transition-colors"
              style={{ color: 'var(--th-text-dim)' }}
            >
              {phase.entries.length} entries — click to expand
            </p>
          )}
        </div>

        {/* Collapsible entries */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-6 pb-5 md:pb-6 pt-2">
              <div className="space-y-0">
                    {phase.entries.map((entry, idx) => {
                      const isLast = idx === phase.entries.length - 1
                      const marker =
                        entry.type === 'pivot' ? '*' :
                        entry.type === 'failure' ? 'x' :
                        entry.type === 'result' ? '#' :
                        entry.type === 'research' ? '~' :
                        'o'
                      return (
                        <div key={entry.id} className="flex gap-0">
                          {/* ASCII gutter */}
                          <div className="shrink-0 flex flex-col items-center font-mono select-none w-6 md:w-8" aria-hidden="true" style={{ color: 'var(--th-text-faint)' }}>
                            <span className="leading-none py-1">│</span>
                            <span className={`leading-none py-0.5`} style={{
                              color: entry.type === 'pivot' ? 'var(--th-text-soft)' :
                                     entry.type === 'failure' ? 'var(--th-text-faint)' :
                                     entry.type === 'result' ? 'var(--th-text-soft)' :
                                     entry.type === 'research' ? 'var(--th-text-dim)' :
                                     'var(--th-text-faint)'
                            }}>{marker}</span>
                            {!isLast && (
                              <span className="flex-1 flex flex-col items-center leading-none">
                                {Array.from({ length: 3 }).map((_, i) => (
                                  <span key={i} className="py-0.5">│</span>
                                ))}
                              </span>
                            )}
                            {isLast && <span className="leading-none py-0.5">╵</span>}
                          </div>
                          {/* Entry */}
                          <div className="flex-1 min-w-0 pb-4">
                            <TimelineEntry entry={entry} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
