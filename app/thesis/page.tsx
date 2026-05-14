"use client"

import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { FileText } from "lucide-react"
import { ThesisHeader, ThesisSidebar, TimelinePhase, CollapsibleSection, CitationsSection } from "@/components/thesis"
import { thesisData } from "@/lib/thesis-data"
import { useTheme } from "@/lib/useTheme"

export default function ThesisPage() {
  const router = useRouter()
  const { theme, isDark } = useTheme()

  const handleBack = useCallback(() => {
    let hasVisitedHome = false
    try { hasVisitedHome = sessionStorage.getItem('visited-home') === '1' } catch {}

    if (hasVisitedHome) {
      router.back()
    } else {
      router.push('/')
    }
  }, [router])

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: theme.bg }}>
      {/* Fixed dot grid overlay - matches mobile nav menu */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage: `radial-gradient(circle, ${theme.text}cc 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Corner Frame Accents */}
      <div aria-hidden="true" className="fixed top-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 z-20" style={{ borderColor: `${theme.text}40` }} />
      <div aria-hidden="true" className="fixed top-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 z-20" style={{ borderColor: `${theme.text}40` }} />
      <div aria-hidden="true" className="fixed bottom-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 z-20" style={{ borderColor: `${theme.text}40` }} />
      <div aria-hidden="true" className="fixed bottom-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 z-20" style={{ borderColor: `${theme.text}40` }} />

      {/* Back Link */}
      <div className="fixed top-6 left-6 z-40 lg:left-[17rem] xl:left-[18rem]">
        <button
          onClick={handleBack}
          className="group inline-flex items-center gap-3 px-4 py-2 border rounded font-mono text-xs tracking-wider transition-all duration-200 cursor-pointer backdrop-blur-sm"
          style={{
            borderColor: theme.border,
            backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(232,232,232,0.8)',
            color: theme.textMuted,
          }}
        >
          <span className="group-hover:opacity-100 group-focus-visible:opacity-100 opacity-60 transition-opacity" style={{ color: theme.text }}>←</span>
          <span className="group-hover:opacity-100 group-focus-visible:opacity-100 opacity-70 transition-opacity uppercase" style={{ color: theme.textSoft }}>Back</span>
        </button>
      </div>

      {/* Sidebar */}
      <ThesisSidebar phases={thesisData.phases} />

      {/* Main Content */}
      <main id="main-content" className="relative z-10 pt-16 lg:pt-20 lg:pl-60 xl:pl-64">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <ThesisHeader
            title={thesisData.title}
            subtitle={thesisData.subtitle}
            lastUpdated={thesisData.lastUpdated}
          />

          {/* Timeline */}
          <div className="space-y-16">
            {thesisData.phases.map((phase) => (
              <TimelinePhase key={phase.id} phase={phase} />
            ))}
          </div>

          {/* Citations - kept as standalone reference since they span all phases */}
          <div id="reference-sections" className="mt-16 pt-8 scroll-mt-20" style={{ borderTop: `1px solid ${theme.border}` }}>
            <CollapsibleSection
              title="Related Work & Citations"
              icon={<FileText className="w-5 h-5" />}
            >
              <div className="space-y-3">
                <p className="font-mono text-xs" style={{ color: theme.textMuted }}>
                  30 papers reviewed during the foundational literature review. Categorized by method type, tagged by architectural pattern. Most relate to the pattern selection research — see the Literature Review entry in the Foundational Research phase for context.
                </p>
                <CitationsSection />
              </div>
            </CollapsibleSection>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-8 px-6" style={{ borderTop: `1px solid ${theme.border}` }}>
          <div className="max-w-4xl mx-auto lg:pl-60 xl:pl-64 text-center">
            <p className="font-mono text-xs" style={{ color: theme.textMuted }}>
              Dynamic Heterogeneous Flight Graphs for AAM Security
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
