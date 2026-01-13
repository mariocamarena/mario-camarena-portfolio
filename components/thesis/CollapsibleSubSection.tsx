"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface CollapsibleSubSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function CollapsibleSubSection({ title, children, defaultOpen = false }: CollapsibleSubSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 md:p-4 bg-white/5 hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-white/60 rounded-full"></span>
          <h3 className="text-sm md:text-base font-mono font-semibold text-white">{title}</h3>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-white/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="p-3 md:p-4 border-t border-white/10"
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}
