"use client"

import { useState, useEffect, useRef } from "react"
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

const taglineText = "CS Master’s student working on NASA-funded AAM flight-graph security thesis and enhancing autonomous-driving vision models"

// Hero landing section - merging technical ASCII aesthetic with existing functionality
export const HeroSection = ({ onScrollToProjects, onScrollToAbout, isVisible = true }: HeroSectionProps) => {
  const { theme, isDark } = useTheme()
  const shouldReduceMotion = useReducedMotion()
  const [displayedText, setDisplayedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const startDelayRef = useRef<NodeJS.Timeout | null>(null)

  // Fade scroll indicator once the user starts scrolling away from hero
  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Wait for visibility before starting animations
  useEffect(() => {
    if (!isVisible) return

    if (shouldReduceMotion) {
      setDisplayedText(taglineText)
      setIsTypingComplete(true)
      return
    }

    // Start typing after heading animation (0.7s delay)
    startDelayRef.current = setTimeout(() => {
      let currentIndex = 0
      typingIntervalRef.current = setInterval(() => {
        if (currentIndex < taglineText.length) {
          setDisplayedText(taglineText.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          if (typingIntervalRef.current) clearInterval(typingIntervalRef.current)
          setIsTypingComplete(true)
        }
      }, 25)
    }, 700)

    return () => {
      if (startDelayRef.current) clearTimeout(startDelayRef.current)
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current)
    }
  }, [isVisible, shouldReduceMotion])

  const skipTyping = () => {
    if (isTypingComplete) return
    if (startDelayRef.current) clearTimeout(startDelayRef.current)
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current)
    setDisplayedText(taglineText)
    setIsTypingComplete(true)
  }

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: isDark ? '#000000' : theme.bg }}
    >
      {/* ASCII Background Animation — invert in light mode (smooth flip on theme toggle) */}
      <div
        aria-hidden="true"
        style={{
          filter: isDark ? 'none' : 'invert(1)',
          opacity: isDark ? 1 : 0.5,
          transition: 'filter 0.3s ease, opacity 0.3s ease',
        }}
      >
        <HeroAsciiBackground />
      </div>

      {/* Mobile dim overlay — light enough to let ASCII background read through */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[5] lg:hidden"
        style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.15)' : 'rgba(232,232,232,0.25)' }}
      />

      {/* Corner Frame Accents */}
      <div aria-hidden="true" className="absolute top-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 z-20" style={{ borderColor: `${theme.text}40` }} />
      <div aria-hidden="true" className="absolute top-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 z-20" style={{ borderColor: `${theme.text}40` }} />
      <div aria-hidden="true" className="absolute bottom-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 z-20" style={{ borderColor: `${theme.text}40` }} />
      <div aria-hidden="true" className="absolute bottom-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 z-20" style={{ borderColor: `${theme.text}40` }} />

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
                translate="no"
                className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 lg:mb-6 leading-tight font-mono tracking-wider text-balance"
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

            {/* Description with typing animation — tap/click to skip while typing */}
            <div className="relative">
              <div
                className="text-base lg:text-lg mb-6 lg:mb-8 leading-relaxed font-mono min-h-[3.5rem] lg:min-h-[4rem]"
                onClick={skipTyping}
                onKeyDown={(e) => {
                  if (!isTypingComplete && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault()
                    skipTyping()
                  }
                }}
                role={!isTypingComplete ? "button" : undefined}
                tabIndex={!isTypingComplete ? 0 : undefined}
                aria-label={!isTypingComplete ? "Skip typing animation" : undefined}
                style={{ cursor: !isTypingComplete ? "pointer" : "default" }}
              >
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
                className="btn-outline relative px-5 lg:px-6 py-2.5 lg:py-3 font-mono text-sm group"
              >
                <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" style={{ borderColor: theme.text }} />
                <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" style={{ borderColor: theme.text }} />
                VIEW PROJECTS
              </button>

              <a
                href="/CS_Mario_Camarena_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-filled relative px-5 lg:px-6 py-2.5 lg:py-3 font-mono text-sm text-center group"
              >
                <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" style={{ borderColor: theme.text }} />
                <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" style={{ borderColor: theme.text }} />
                GET RESUME
              </a>

              <Link
                href="/thesis"
                className="inline-flex items-center justify-center lg:justify-start gap-1.5 px-2 py-2.5 lg:py-3 font-mono text-sm tracking-wide underline-offset-4 decoration-1 hover:underline transition-colors duration-200"
                style={{ color: theme.text }}
              >
                THESIS
                <span aria-hidden="true">→</span>
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

      {/* Scroll indicator — fades out once the user scrolls past the hero */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ delay: hasScrolled ? 0 : 1, duration: 0.4 }}
        style={{
          pointerEvents: hasScrolled ? "none" : "auto",
          bottom: "max(2rem, env(safe-area-inset-bottom))",
        }}
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
