"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const theme = {
  bg: "#0a0a0a",
  surface: "#0f0f0f",
  border: "#ffffff",
  borderDim: "#333333",
  text: "#f5f5f5",
  textSoft: "#a0a0a0",
  textMuted: "#666666",
}

export const ThesisBanner = () => {
  const [isHovered, setIsHovered] = useState(false)

  // Only show hover effects on actual hover (not stuck on mobile)
  const showHoverState = isHovered

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="col-span-1 md:col-span-2"
    >
      <Link href="/thesis">
        <motion.div
          className="group relative overflow-hidden cursor-pointer"
          style={{
            backgroundColor: theme.surface,
            border: `1px solid ${theme.borderDim}`,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={showHoverState ? {
            y: -6,
            scale: 1.015,
            borderColor: theme.border,
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.8)",
          } : {
            y: 0,
            scale: 1,
            borderColor: theme.borderDim,
            boxShadow: "none",
          }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30 z-10" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30 z-10" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30 z-10" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30 z-10" />

          {/* Scan Double Effect */}
          {showHoverState && (
            <>
              <motion.div
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20 pointer-events-none"
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20 pointer-events-none"
                initial={{ top: "100%" }}
                animate={{ top: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </>
          )}

          {/* Grid Overlay on Hover */}
          <div
            className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: showHoverState ? 0.03 : 0,
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Banner Content */}
          <div className="px-4 py-3 md:px-8 md:py-8 flex flex-row items-center justify-between gap-3 md:gap-4">
            {/* Left Side - Title & Description */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/40" />
                <span className="text-[9px] md:text-[10px] font-mono tracking-wider text-white/40 uppercase">
                  Research Blog
                </span>
              </div>
              <h3
                className="text-sm md:text-2xl font-bold font-mono tracking-wide uppercase mb-0 md:mb-2 truncate md:whitespace-normal"
                style={{ color: theme.text }}
              >
                <span className="md:hidden">NASA AAM Thesis</span>
                <span className="hidden md:inline">NASA AAM Flight-Graph Security Thesis</span>
              </h3>
              <p
                className="text-sm leading-relaxed max-w-2xl hidden md:block"
                style={{ color: theme.textSoft }}
              >
                Follow the research journey exploring security vulnerabilities in Advanced Air Mobility flight-graph systems.
                Documenting methodologies, findings, and insights from NASA-funded research.
              </p>
            </div>

            {/* Right Side - CTA */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <span className="text-xs font-mono tracking-wider text-white/60 uppercase hidden md:block">
                Read More
              </span>
              <motion.div
                className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 border border-white/30 group-hover:border-white group-hover:bg-white transition-all duration-200"
                animate={{ x: showHoverState ? 4 : 0 }}
                transition={{ duration: 0.15 }}
              >
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-colors text-white group-hover:text-black" />
              </motion.div>
            </div>
          </div>

          {/* Bottom decorative dots */}
          <div className="absolute bottom-2 right-4 flex gap-1 opacity-30">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-0.5 h-0.5 bg-white rounded-full" />
            ))}
          </div>

          {/* Left decorative element */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-1 opacity-20">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-0.5 h-0.5 bg-white rounded-full" />
            ))}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
