"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ThesisHeaderProps {
  title: string
  subtitle: string
  lastUpdated: string
}

export function ThesisHeader({ title, subtitle, lastUpdated }: ThesisHeaderProps) {
  // Format date client-side using the user's locale; render a stable
  // ISO date during SSR to avoid hydration mismatches across timezones/locales.
  const [formattedDate, setFormattedDate] = useState(lastUpdated)

  useEffect(() => {
    const d = new Date(lastUpdated + 'T00:00:00')
    setFormattedDate(d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }))
  }, [lastUpdated])

  return (
    <header className="pb-12 mb-12" style={{ borderBottom: '1px solid var(--th-border)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'var(--th-text-dim)' }}>
            NASA-Funded Research
          </span>
          <span className="px-2 py-0.5 text-[10px] font-mono rounded" style={{ backgroundColor: 'var(--th-bg-emphasis)', color: 'var(--th-text)' }}>
            In Progress
          </span>
          <span className="text-[10px] font-mono" style={{ color: 'var(--th-text-dim)' }}>
            Updated <time dateTime={lastUpdated}>{formattedDate}</time>
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-mono font-bold mb-4" style={{ color: 'var(--th-text)' }}>
          {title}
        </h1>
        <p className="font-mono text-sm md:text-base max-w-2xl" style={{ color: 'var(--th-text-soft)' }}>
          {subtitle}
        </p>
      </motion.div>
    </header>
  )
}
