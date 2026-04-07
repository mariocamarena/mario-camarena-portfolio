"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface CollapsibleSectionProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  variant?: 'section' | 'subsection'
  id?: string
}

export function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = false,
  variant = 'section',
  id,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const isSection = variant === 'section'

  return (
    <div
      id={id}
      className="rounded-lg overflow-hidden"
      style={{
        border: `1px solid ${isSection ? 'var(--th-border)' : 'var(--th-border-dim)'}`,
        backgroundColor: isSection ? 'var(--th-bg)' : undefined,
      }}
    >
      <div
        className={isSection ? 'p-4 md:p-6' : 'p-3 md:p-4'}
        style={{ backgroundColor: 'var(--th-surface)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 select-text">
            {icon ? (
              <span style={{ color: 'var(--th-text-soft)' }}>{icon}</span>
            ) : (
              !isSection && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--th-text-soft)' }} />
            )}
            {isSection ? (
              <h2 className="text-lg md:text-xl font-mono font-semibold" style={{ color: 'var(--th-text)' }}>{title}</h2>
            ) : (
              <h3 className="text-sm md:text-base font-mono font-semibold" style={{ color: 'var(--th-text)' }}>{title}</h3>
            )}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? `Collapse ${title}` : `Expand ${title}`}
            className={`shrink-0 flex items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 rounded ${
              isSection ? 'w-8 h-8' : 'w-7 h-7'
            }`}
          >
            <ChevronDown
              className={`${isSection ? 'w-5 h-5' : 'w-4 h-4'} transition-transform ${isOpen ? 'rotate-180' : ''}`}
              style={{ color: 'var(--th-text-dim)' }}
            />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={isSection ? 'p-4 md:p-6' : 'p-3 md:p-4'}
            style={{
              borderTop: '1px solid var(--th-border)',
              backgroundColor: isSection ? 'var(--th-bg)' : undefined,
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
