"use client"

import { useState, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import Link from "next/link"
import HeroAsciiBackground from "@/components/ui/hero-ascii-one"
import { TextScramble } from "@/components/ui/text-scramble"
import { useTheme } from "@/lib/useTheme"

interface HeroSectionProps {
  onScrollToProjects: () => void
  onScrollToAbout: () => void
  isVisible?: boolean
}

const taglineText = "CS Master's student working on NASA-funded AAM flight-graph security thesis and enhancing autonomous-driving vision models"

// Hero landing section - merging technical ASCII aesthetic with existing functionality
export const HeroSection = ({ onScrollToProjects, onScrollToAbout, isVisible = true }: HeroSectionProps) => {
  const { theme, isDark } = useTheme()
  const shouldReduceMotion = useReducedMotion()
  const [displayedText, setDisplayedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  // Wait for visibility before starting animations
  useEffect(() => {
    if (!isVisible) return

    if (shouldReduceMotion) {
      setDisplayedText(taglineText)
      setIsTypingComplete(true)
      return
    }

    let typingInterval: NodeJS.Timeout | null = null

    // Start typing after heading animation (0.6s delay)
    const startDelay = setTimeout(() => {
      let currentIndex = 0
      typingInterval = setInterval(() => {
        if (currentIndex < taglineText.length) {
          setDisplayedText(taglineText.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          if (typingInterval) clearInterval(typingInterval)
          setIsTypingComplete(true)
        }
      }, 25)
    }, 700)

    return () => {
      clearTimeout(startDelay)
      if (typingInterval) clearInterval(typingInterval)
    }
  }, [isVisible, shouldReduceMotion])

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: isDark ? '#000000' : theme.bg }}
    >
      {/* ASCII Background Animation — invert in light mode */}
      <div
        aria-hidden="true"
        style={
          isDark ? undefined :
          { filter: 'invert(1)', opacity: 0.5 }
        }
      >
        <HeroAsciiBackground />
      </div>

      {/* Mobile blur overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 backdrop-blur-[2px] z-[5] lg:hidden"
        style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(232,232,232,0.4)' }}
      />

      {/* Corner Frame Accents */}
      <div aria-hidden="true" className="absolute top-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 z-20" style={{ borderColor: `${theme.text}4d` }} />
      <div aria-hidden="true" className="absolute top-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 z-20" style={{ borderColor: `${theme.text}4d` }} />
      <div aria-hidden="true" className="absolute bottom-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 z-20" style={{ borderColor: `${theme.text}4d` }} />
      <div aria-hidden="true" className="absolute bottom-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 z-20" style={{ borderColor: `${theme.text}4d` }} />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center lg:justify-end pt-16 lg:pt-0">
        <div className="w-full lg:w-[45%] px-6 lg:px-12 lg:pr-[8%]">
          <div className="max-w-xl relative lg:ml-auto text-center lg:text-left">
            {/* Top decorative line */}
            <motion.div
              aria-hidden="true"
              className="flex items-center gap-2 mb-4 opacity-60"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.6, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-8 h-px" style={{ backgroundColor: theme.text }} />
              <span className="text-[10px] font-mono tracking-wider" style={{ color: theme.text }}>∞</span>
              <div className="flex-1 h-px" style={{ backgroundColor: theme.text }} />
            </motion.div>

            {/* Title with dithered accent */}
            <div className="relative">
              <div className="hidden lg:block absolute -right-3 top-0 bottom-0 w-1 dither-pattern opacity-40"></div>
              <TextScramble
                as="h1"
                aria-label="Mario Camarena"
                className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 lg:mb-6 leading-tight font-mono tracking-wider"
                style={{ letterSpacing: '0.05em', color: theme.text }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                duration={3.5}
                speed={0.03}
                characterSet="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                trigger={isVisible}
              >
                MARIO CAMARENA
              </TextScramble>
            </div>

            {/* Decorative dots pattern - desktop only */}
            <motion.div
              aria-hidden="true"
              className="hidden lg:flex gap-1 mb-4 opacity-40 justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="w-0.5 h-0.5 rounded-full" style={{ backgroundColor: theme.text }} />
              ))}
            </motion.div>

            {/* Description with typing animation */}
            <div className="relative">
              <div className="text-base lg:text-lg mb-6 lg:mb-8 leading-relaxed font-mono min-h-[3.5rem] lg:min-h-[4rem]">
                <span className="opacity-80" style={{ color: theme.textSoft }}>{displayedText}</span>
                <motion.span
                  className="inline-block w-[2px] h-[1.1em] ml-0.5 align-middle"
                  style={{ backgroundColor: theme.text }}
                  aria-hidden="true"
                  animate={{ opacity: isTypingComplete && !shouldReduceMotion ? [1, 0] : 1 }}
                  transition={isTypingComplete && !shouldReduceMotion ? { duration: 0.8, repeat: Infinity, repeatType: "reverse" } : {}}
                />
              </div>

              {/* Technical corner accent - desktop only */}
              <div aria-hidden="true" className="hidden lg:block absolute -left-4 top-1/2 w-3 h-3 opacity-30" style={{ transform: 'translateY(-50%)', border: `1px solid ${theme.text}` }}>
                <div className="absolute top-1/2 left-1/2 w-1 h-1" style={{ transform: 'translate(-50%, -50%)', backgroundColor: theme.text }}></div>
              </div>
            </div>

            {/* CTA Buttons with technical accents */}
            <motion.div
              className="flex flex-col lg:flex-row gap-3 lg:gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <button
                onClick={onScrollToProjects}
                className="relative px-5 lg:px-6 py-2.5 lg:py-3 bg-transparent font-mono text-sm transition-all duration-200 group"
                style={{ border: `1px solid ${theme.text}`, color: theme.text }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.text; e.currentTarget.style.color = theme.bg }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = theme.text }}
                onFocus={(e) => { e.currentTarget.style.backgroundColor = theme.text; e.currentTarget.style.color = theme.bg }}
                onBlur={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = theme.text }}
              >
                <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: theme.text }} />
                <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: theme.text }} />
                VIEW PROJECTS
              </button>

              <a
                href="/CS_Mario_Camarena_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-5 lg:px-6 py-2.5 lg:py-3 font-mono text-sm transition-all duration-200 text-center group"
                style={{ backgroundColor: theme.text, border: `1px solid ${theme.text}`, color: theme.bg }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = theme.text }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = theme.text; e.currentTarget.style.color = theme.bg }}
                onFocus={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = theme.text }}
                onBlur={(e) => { e.currentTarget.style.backgroundColor = theme.text; e.currentTarget.style.color = theme.bg }}
              >
                <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: theme.text }} />
                <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: theme.text }} />
                GET RESUME
              </a>

              <Link
                href="/thesis"
                className="relative px-4 lg:px-5 py-2 lg:py-2.5 bg-transparent font-mono text-sm transition-all duration-200 text-center group"
                style={{ border: `1px solid ${theme.text}`, color: theme.text }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.text; e.currentTarget.style.color = theme.bg }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = theme.text }}
                onFocus={(e) => { e.currentTarget.style.backgroundColor = theme.text; e.currentTarget.style.color = theme.bg }}
                onBlur={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = theme.text }}
              >
                <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: theme.text }} />
                <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: theme.text }} />
                THESIS
              </Link>
            </motion.div>

            {/* Bottom technical notation - desktop only */}
            <motion.div
              aria-hidden="true"
              className="hidden lg:flex items-center gap-2 mt-8 opacity-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-[9px] font-mono" style={{ color: theme.text }}>∞</span>
              <div className="flex-1 h-px" style={{ backgroundColor: theme.text }} />
              <span className="text-[9px] font-mono" style={{ color: theme.text }}>PORTFOLIO.2026</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.button
          onClick={onScrollToAbout}
          className="p-2 rounded-full transition-colors"
          style={{ color: `${theme.text}80` }}
          animate={shouldReduceMotion ? { y: 0 } : { y: [0, 6, 0] }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Scroll to about"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  )
}
