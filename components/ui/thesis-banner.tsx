"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/lib/useTheme"

export const ThesisBanner = () => {
  const { theme, isDark } = useTheme()
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
            backgroundColor: theme.bg,
            border: `1px solid ${theme.border}`,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={showHoverState ? {
            y: -6,
            scale: 1.015,
            borderColor: theme.text,
            boxShadow: isDark ? "0 12px 32px rgba(0, 0, 0, 0.8)" : "0 12px 32px rgba(0, 0, 0, 0.2)",
          } : {
            y: 0,
            scale: 1,
            borderColor: theme.border,
            boxShadow: "none",
          }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Terminal Header Bar */}
          <div
            className="px-4 py-2 border-b flex items-center justify-between"
            style={{
              backgroundColor: theme.bg,
              borderColor: theme.border,
            }}
          >
            <span
              className="text-[10px] font-mono tracking-wider"
              style={{ color: theme.textMuted }}
            >
              FEATURED — THESIS
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.terminalDots.red }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.terminalDots.yellow }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.terminalDots.green }} />
            </div>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l z-10" style={{ borderColor: `${theme.text}4d` }} />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r z-10" style={{ borderColor: `${theme.text}4d` }} />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l z-10" style={{ borderColor: `${theme.text}4d` }} />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r z-10" style={{ borderColor: `${theme.text}4d` }} />

          {/* Scan Double Effect */}
          {showHoverState && (
            <>
              <motion.div
                className="absolute left-0 right-0 h-[1px] z-20 pointer-events-none"
                style={{ background: `linear-gradient(to right, transparent, ${theme.text}66, transparent)` }}
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute left-0 right-0 h-[1px] z-20 pointer-events-none"
                style={{ background: `linear-gradient(to right, transparent, ${theme.text}66, transparent)` }}
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
                linear-gradient(${theme.text}80 1px, transparent 1px),
                linear-gradient(90deg, ${theme.text}80 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Banner Content - Expands on hover */}
          <motion.div
            className="px-4 md:px-8 flex flex-row items-center justify-between gap-3 md:gap-4"
            initial={false}
            animate={{
              paddingTop: showHoverState ? 24 : 12,
              paddingBottom: showHoverState ? 24 : 12,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Left Side - Title & Description */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2" style={{ backgroundColor: `${theme.text}66` }} />
                <span className="text-[9px] md:text-[10px] font-mono tracking-wider uppercase" style={{ color: `${theme.text}66` }}>
                  Research Blog
                </span>
              </div>
              <motion.h3
                className="font-bold font-mono tracking-wide uppercase mb-0 md:mb-2 truncate md:whitespace-normal"
                style={{ color: theme.text }}
                initial={false}
                animate={{
                  fontSize: showHoverState ? "1.75rem" : "1.5rem",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <span className="md:hidden">NASA AAM Thesis</span>
                <span className="hidden md:inline">NASA AAM Flight-Graph Security Thesis</span>
              </motion.h3>
              <p
                className="text-sm leading-relaxed max-w-2xl hidden md:block"
                style={{ color: theme.textSoft }}
              >
                Follow the research journey exploring security vulnerabilities in Advanced Air Mobility flight-graph systems.
                Documenting methodologies, findings, and insights from NASA-funded research.
              </p>
              {/* Extra details shown on hover */}
              <motion.div
                className="hidden md:flex flex-wrap gap-2 mt-3"
                initial={false}
                animate={{
                  opacity: showHoverState ? 1 : 0,
                  height: showHoverState ? "auto" : 0,
                  marginTop: showHoverState ? 12 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {["GNN", "AAM Security", "Flight Graphs", "NASA-Funded"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-mono tracking-wide uppercase"
                    style={{
                      backgroundColor: "transparent",
                      color: theme.textMuted,
                      border: `1px solid ${theme.borderDim}`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right Side - CTA */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <span className="text-xs font-mono tracking-wider uppercase hidden md:block" style={{ color: `${theme.text}99` }}>
                Read More
              </span>
              <motion.div
                className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 border transition-all duration-200"
                style={{
                  borderColor: showHoverState ? theme.text : `${theme.text}4d`,
                  backgroundColor: showHoverState ? theme.text : 'transparent',
                }}
                animate={{
                  x: showHoverState ? 4 : 0,
                  scale: showHoverState ? 1.1 : 1,
                }}
                transition={{ duration: 0.15 }}
              >
                <ArrowRight
                  className="w-3 h-3 md:w-4 md:h-4 transition-colors"
                  style={{ color: showHoverState ? theme.bg : theme.text }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom decorative dots */}
          <div className="absolute bottom-2 right-4 flex gap-1 opacity-30">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-0.5 h-0.5 rounded-full" style={{ backgroundColor: theme.text }} />
            ))}
          </div>

          {/* Left decorative element */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-1 opacity-20">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-0.5 h-0.5 rounded-full" style={{ backgroundColor: theme.text }} />
            ))}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
