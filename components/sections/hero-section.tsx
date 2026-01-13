"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import Link from "next/link"
import HeroAsciiBackground from "@/components/ui/hero-ascii-one"
import { TextScramble } from "@/components/ui/text-scramble"

interface HeroSectionProps {
  onScrollToProjects: () => void
  onScrollToAbout: () => void
  isVisible?: boolean
}

const taglineText = "CS Master's student working on NASA-funded AAM flight-graph security thesis and enhancing autonomous-driving vision models"

// Hero landing section - merging technical ASCII aesthetic with existing functionality
export const HeroSection = ({ onScrollToProjects, onScrollToAbout, isVisible = true }: HeroSectionProps) => {
  const [displayedText, setDisplayedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  // Wait for visibility before starting animations
  useEffect(() => {
    if (!isVisible) return

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
      }, 35)
    }, 700)

    return () => {
      clearTimeout(startDelay)
      if (typingInterval) clearInterval(typingInterval)
    }
  }, [isVisible])

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* ASCII Background Animation */}
      <HeroAsciiBackground />

      {/* Mobile blur overlay */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-black/20 z-[5] lg:hidden" />

      {/* Corner Frame Accents */}
      <div className="absolute top-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 border-white/30 z-20"></div>
      <div className="absolute top-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 border-white/30 z-20"></div>
      <div className="absolute bottom-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 border-white/30 z-20"></div>
      <div className="absolute bottom-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 border-white/30 z-20"></div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center lg:justify-end pt-16 lg:pt-0">
        <div className="w-full lg:w-[45%] px-6 lg:px-12 lg:pr-[8%]">
          <div className="max-w-xl relative lg:ml-auto text-center lg:text-left">
            {/* Top decorative line */}
            <motion.div
              className="flex items-center gap-2 mb-4 opacity-60"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.6, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-8 h-px bg-white"></div>
              <span className="text-white text-[10px] font-mono tracking-wider">∞</span>
              <div className="flex-1 h-px bg-white"></div>
            </motion.div>

            {/* Title with dithered accent */}
            <div className="relative">
              <div className="hidden lg:block absolute -right-3 top-0 bottom-0 w-1 dither-pattern opacity-40"></div>
              <TextScramble
                as="h1"
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 lg:mb-6 leading-tight font-mono tracking-wider"
                style={{ letterSpacing: '0.05em' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                duration={1.5}
                speed={0.05}
                characterSet="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                trigger={isVisible}
              >
                MARIO CAMARENA
              </TextScramble>
            </div>

            {/* Decorative dots pattern - desktop only */}
            <motion.div
              className="hidden lg:flex gap-1 mb-4 opacity-40 justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="w-0.5 h-0.5 bg-white rounded-full"></div>
              ))}
            </motion.div>

            {/* Description with typing animation */}
            <div className="relative">
              <div className="text-base lg:text-lg text-gray-300 mb-6 lg:mb-8 leading-relaxed font-mono min-h-[3.5rem] lg:min-h-[4rem]">
                <span className="opacity-80">{displayedText}</span>
                <motion.span
                  className="inline-block w-[2px] h-[1.1em] bg-white ml-0.5 align-middle"
                  animate={{ opacity: isTypingComplete ? [1, 0] : 1 }}
                  transition={isTypingComplete ? { duration: 0.8, repeat: Infinity, repeatType: "reverse" } : {}}
                />
              </div>

              {/* Technical corner accent - desktop only */}
              <div className="hidden lg:block absolute -left-4 top-1/2 w-3 h-3 border border-white opacity-30" style={{ transform: 'translateY(-50%)' }}>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white" style={{ transform: 'translate(-50%, -50%)' }}></div>
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
                className="relative px-5 lg:px-6 py-2.5 lg:py-3 bg-transparent text-white font-mono text-sm border border-white hover:bg-white hover:text-black transition-all duration-200 group"
              >
                <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                VIEW PROJECTS
              </button>

              <a
                href="/CS_Mario_Camarena_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-5 lg:px-6 py-2.5 lg:py-3 bg-white border border-white text-black font-mono text-sm hover:bg-transparent hover:text-white transition-all duration-200 text-center group"
              >
                <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                GET RESUME
              </a>

              <Link
                href="/thesis"
                className="relative px-4 lg:px-5 py-2 lg:py-2.5 bg-transparent text-white font-mono text-sm border border-white hover:bg-white hover:text-black transition-all duration-200 text-center group"
              >
                <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                THESIS
              </Link>
            </motion.div>

            {/* Bottom technical notation - desktop only */}
            <motion.div
              className="hidden lg:flex items-center gap-2 mt-8 opacity-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-white text-[9px] font-mono">∞</span>
              <div className="flex-1 h-px bg-white"></div>
              <span className="text-white text-[9px] font-mono">PORTFOLIO.2026</span>
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
          className="p-2 rounded-full text-white/50 hover:text-white transition-colors"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Scroll to about"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  )
}
