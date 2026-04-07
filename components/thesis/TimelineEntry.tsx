"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import type { TimelineEntry as TimelineEntryType } from '@/lib/thesis-types'
import { EntryTypeBadge } from './EntryTypeBadge'
import { KeyFindings } from './KeyFindings'
import { FigureGallery } from './FigureGallery'
import { ReportList } from './ReportList'
import { CrossLinks } from './CrossLinks'
import { AirportTabs } from './AirportTabs'

function formatDate(dateStr: string) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function TimelineEntry({ entry, defaultOpen = false }: { entry: TimelineEntryType; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const showAirportTabs = entry.id === 'scaled-data-collection'

  const hasDetails = entry.body || entry.keyFindings?.length || entry.reports?.length || entry.figures?.length || entry.ledTo?.length || entry.motivatedBy?.length || showAirportTabs

  return (
    <div id={`entry-${entry.id}`} className="relative scroll-mt-24">
      <div
        className="rounded-lg transition-colors"
        style={{
          border: `1px solid ${isOpen ? 'var(--th-border)' : 'var(--th-border-dim)'}`,
          backgroundColor: isOpen ? 'var(--th-surface)' : 'var(--th-bg)',
        }}
      >
        {/* Header — always visible */}
        <div className="p-4 md:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0 select-text">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs" style={{ color: 'var(--th-text-muted)' }}>{formatDate(entry.date)}</span>
                <EntryTypeBadge type={entry.type} />
              </div>
              <h3 className="font-mono font-semibold text-base md:text-lg mb-1" style={{ color: 'var(--th-text)' }}>
                {entry.title}
              </h3>
              <p className="font-mono text-sm leading-relaxed" style={{ color: 'var(--th-text-soft)' }}>
                {entry.summary}
              </p>
            </div>
            {hasDetails && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label={isOpen ? `Collapse ${entry.title}` : `Expand ${entry.title}`}
                className="shrink-0 mt-1 w-7 h-7 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 rounded transition-colors"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  style={{ color: 'var(--th-text-faint)' }}
                />
              </button>
            )}
          </div>
        </div>

        {/* Collapsible details */}
        <AnimatePresence>
          {isOpen && hasDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="px-4 md:px-6 pb-4 md:pb-6 pt-4 space-y-4" style={{ borderTop: '1px solid var(--th-border)' }}>
                {entry.body && (
                  <p className="font-mono text-xs leading-relaxed pl-3" style={{ color: 'var(--th-text-soft)', borderLeft: '2px solid var(--th-border)' }}>
                    {entry.body}
                  </p>
                )}

                {entry.keyFindings && entry.keyFindings.length > 0 && (
                  <KeyFindings findings={entry.keyFindings} />
                )}

                {entry.reports && entry.reports.length > 0 && (
                  <ReportList reports={entry.reports} />
                )}

                {entry.figures && entry.figures.length > 0 && (
                  <FigureGallery figures={entry.figures} />
                )}

                {showAirportTabs && <AirportTabs />}

                <CrossLinks ledTo={entry.ledTo} motivatedBy={entry.motivatedBy} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
