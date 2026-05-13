"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface CollapsibleSubSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function CollapsibleSubSection({ title, children, defaultOpen = false }: CollapsibleSubSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--th-border-dim)', backgroundColor: 'var(--th-bg)' }}>
      <div className="flex items-center justify-between p-3 md:p-4" style={{ backgroundColor: 'var(--th-surface)' }}>
        <div className="flex items-center gap-2 select-text">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--th-text-dim)' }}></span>
          <h3 className="text-sm md:text-base font-mono font-semibold" style={{ color: 'var(--th-text)' }}>{title}</h3>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? `Collapse ${title}` : `Expand ${title}`}
          className="shrink-0 w-7 h-7 flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 rounded"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            style={{ color: 'var(--th-text-dim)' }}
          />
        </button>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 md:p-4" style={{ borderTop: '1px solid var(--th-border)' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
