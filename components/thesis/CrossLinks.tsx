"use client"

import { ArrowRight, ArrowLeft } from "lucide-react"
import { thesisData } from "@/lib/thesis-data"

function findEntryTitle(id: string): string {
  for (const phase of thesisData.phases) {
    const entry = phase.entries.find(e => e.id === id)
    if (entry) return entry.title
  }
  return id
}

function scrollToEntry(id: string) {
  const el = document.getElementById(`entry-${id}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function CrossLinks({ ledTo, motivatedBy }: { ledTo?: string[]; motivatedBy?: string[] }) {
  if (!ledTo?.length && !motivatedBy?.length) return null

  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {motivatedBy?.map((id) => (
        <button
          key={`from-${id}`}
          onClick={() => scrollToEntry(id)}
          className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-mono rounded transition-colors"
          style={{
            backgroundColor: 'var(--th-bg-subtle)',
            border: '1px solid var(--th-border)',
            color: 'var(--th-text-dim)',
          }}
        >
          <ArrowLeft className="w-3 h-3" />
          {findEntryTitle(id)}
        </button>
      ))}
      {ledTo?.map((id) => (
        <button
          key={`to-${id}`}
          onClick={() => scrollToEntry(id)}
          className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-mono rounded transition-colors"
          style={{
            backgroundColor: 'var(--th-bg-subtle)',
            border: '1px solid var(--th-border)',
            color: 'var(--th-text-dim)',
          }}
        >
          {findEntryTitle(id)}
          <ArrowRight className="w-3 h-3" />
        </button>
      ))}
    </div>
  )
}
