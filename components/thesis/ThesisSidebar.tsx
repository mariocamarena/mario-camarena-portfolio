"use client"

import { useState, useEffect, useCallback } from "react"
import type { Phase } from "@/lib/thesis-types"
import { ChevronDown, List, X } from "lucide-react"

const phaseIcons: Record<string, string> = {
  'foundational-research': '◈',
  'synthetic-data': '✕',
  'surrogate-pivot': '✓',
  'graph-build-out': '◌',
}

interface ThesisSidebarProps {
  phases: Phase[]
}

export function ThesisSidebar({ phases }: ThesisSidebarProps) {
  const [activeEntry, setActiveEntry] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)

  // Scrollspy: track which entry is in viewport
  useEffect(() => {
    const entryIds = phases.flatMap(p => p.entries.map(e => `entry-${e.id}`))
    const phaseIds = phases.map(p => `phase-${p.id}`)
    const allIds = [...phaseIds, ...entryIds]

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (id.startsWith('entry-')) {
              setActiveEntry(id.replace('entry-', ''))
            }
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )

    allIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [phases])

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close on Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    if (mobileOpen) {
      window.addEventListener('keydown', handleKey)
      return () => window.removeEventListener('keydown', handleKey)
    }
  }, [mobileOpen])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileOpen(false)
    }
  }, [])

  // Find which phase the active entry belongs to
  const activePhase = phases.find(p => p.entries.some(e => e.id === activeEntry))?.id || phases[0]?.id

  return (
    <>
      {/* Mobile: floating action button (bottom-right) */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-11 h-11 backdrop-blur-md flex items-center justify-center shadow-lg transition-all"
        style={{
          backgroundColor: 'var(--th-bg)',
          border: '1px solid var(--th-border-hover)',
        }}
        aria-label="Open timeline navigation"
      >
        <List className="w-5 h-5" style={{ color: 'var(--th-text-soft)' }} />
      </button>

      {/* Mobile: bottom sheet overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Bottom sheet */}
          <div
            className="absolute bottom-0 left-0 right-0 max-h-[70vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-200"
            style={{
              backgroundColor: 'var(--th-bg)',
              borderTop: '1px solid var(--th-border)',
            }}
            role="dialog"
            aria-label="Timeline navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3 shrink-0" style={{ borderBottom: '1px solid var(--th-border-dim)' }}>
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--th-text-muted)' }}>
                Navigate Timeline
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-7 h-7 flex items-center justify-center transition-colors"
                style={{ border: '1px solid var(--th-border)' }}
                aria-label="Close navigation"
              >
                <X className="w-3.5 h-3.5" style={{ color: 'var(--th-text-muted)' }} />
              </button>
            </div>

            {/* Scrollable nav content */}
            <nav className="overflow-y-auto overscroll-contain p-5 space-y-5" aria-label="Thesis timeline phases">
              {phases.map((phase) => (
                <div key={phase.id} style={{ borderLeft: '1px solid var(--th-border)' }} className="pl-3">
                  <button
                    onClick={() => scrollTo(`phase-${phase.id}`)}
                    className="flex items-center gap-2 font-mono text-sm font-semibold transition-colors mb-2"
                    style={{ color: activePhase === phase.id ? 'var(--th-text)' : 'var(--th-text-soft)' }}
                  >
                    <span style={{ color: 'var(--th-text-muted)' }}>{phaseIcons[phase.id]}</span>
                    {phase.title}
                  </button>
                  <div className="space-y-1">
                    {phase.entries.map((entry) => (
                      <button
                        key={entry.id}
                        onClick={() => scrollTo(`entry-${entry.id}`)}
                        className="block text-left w-full font-mono text-xs py-1.5 px-2 transition-colors"
                        style={{
                          color: activeEntry === entry.id ? 'var(--th-text)' : 'var(--th-text-dim)',
                          backgroundColor: activeEntry === entry.id ? 'var(--th-bg-muted)' : 'transparent',
                        }}
                      >
                        {entry.title}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-3" style={{ borderTop: '1px solid var(--th-border)' }}>
                <button
                  onClick={() => scrollTo('reference-sections')}
                  className="font-mono text-sm font-semibold transition-colors"
                  style={{ color: 'var(--th-text-muted)' }}
                >
                  Citations
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop: fixed sidebar */}
      <aside
        className="hidden lg:block fixed left-0 top-0 bottom-0 w-60 xl:w-64 overflow-y-auto z-30 pt-20 pb-8 px-4"
        style={{
          backgroundColor: 'var(--th-bg)',
          borderRight: '1px solid var(--th-border)',
        }}
      >
        <nav className="space-y-5" aria-label="Thesis timeline phases">
          {phases.map((phase) => (
            <div key={phase.id}>
              <button
                onClick={() => scrollTo(`phase-${phase.id}`)}
                className="flex items-center gap-2 font-mono text-xs font-semibold transition-colors mb-2"
                style={{ color: activePhase === phase.id ? 'var(--th-text)' : 'var(--th-text-muted)' }}
              >
                <span style={{ color: 'var(--th-text-soft)' }}>{phaseIcons[phase.id]}</span>
                {phase.title}
              </button>
              <div className="pl-4 space-y-0.5" style={{ borderLeft: '1px solid var(--th-border)' }}>
                {phase.entries.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => scrollTo(`entry-${entry.id}`)}
                    className="block text-left w-full font-mono text-[11px] py-1 pl-3 transition-colors border-l-2 -ml-px"
                    style={{
                      color: activeEntry === entry.id ? 'var(--th-text)' : 'var(--th-text-faint)',
                      borderLeftColor: activeEntry === entry.id ? 'var(--th-text-soft)' : 'transparent',
                    }}
                  >
                    {entry.title}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-3" style={{ borderTop: '1px solid var(--th-border)' }}>
            <button
              onClick={() => scrollTo('reference-sections')}
              className="font-mono text-xs font-semibold transition-colors"
              style={{ color: 'var(--th-text-dim)' }}
            >
              Citations
            </button>
          </div>
        </nav>
      </aside>
    </>
  )
}
