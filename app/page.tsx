"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import { Menu, X, Github, Linkedin, Mail, ArrowUp } from "lucide-react"
import Link from "next/link"

// Component imports
import { LoadingScreen } from "@/components/ui/loading-screen"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ContactSection } from "@/components/sections/contact-section"
import { AsciiThemeToggle } from "@/components/ui/ascii-theme-toggle"

// Configuration imports
import { useTheme } from "@/lib/useTheme"
import { useDialogA11y } from "@/lib/useDialogA11y"
import { navigation } from "@/lib/constants"

// throttle helper
function throttle<T extends (...args: unknown[]) => void>(func: T, limit: number): T {
  let inThrottle = false
  return ((...args: unknown[]) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }) as T
}

// Module-level flag to track if boot animation has played
// This persists across client-side navigation but resets on hard refresh
let hasPlayedBootAnimation = false

export default function Portfolio() {
  // Theme hook for reactive color updates
  const { theme, isDark } = useTheme()

  // Only show loading if animation hasn't played yet in this JS context
  const [isLoading, setIsLoading] = useState(!hasPlayedBootAnimation)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { dialogRef: mobileMenuRef } = useDialogA11y({ open: menuOpen, onClose: () => setMenuOpen(false) })

  // cached section positions
  const sectionCacheRef = useRef<{ id: string; top: number; bottom: number }[]>([])

  // Loading animation - only show on initial site load, not on client-side navigation
  useEffect(() => {
    // Mark that the landing page has been visited this session
    try { sessionStorage.setItem('visited-home', '1') } catch {}

    if (hasPlayedBootAnimation) {
      // Skip animation on back navigation (JS context preserved)
      return
    }

    // Show animation and mark as played
    const timer = setTimeout(() => {
      setIsLoading(false)
      hasPlayedBootAnimation = true
    }, 1600)
    return () => clearTimeout(timer)
  }, [])

  const updateSectionCache = useCallback(() => {
    sectionCacheRef.current = navigation.map((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        return {
          id: item.id,
          top: element.offsetTop,
          bottom: element.offsetTop + element.offsetHeight,
        }
      }
      return { id: item.id, top: 0, bottom: 0 }
    })
  }, [])

  // scroll handler
  useEffect(() => {
    // Build initial cache after the next paint so offsets reflect post-layout state
    const rafId = requestAnimationFrame(updateSectionCache)

    const handleResize = throttle(updateSectionCache, 250)
    window.addEventListener("resize", handleResize)

    const handleScroll = throttle(() => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 50)

      const scrollPos = scrollY + 100
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const nearBottom = scrollPos + windowHeight >= docHeight - 100

      if (nearBottom) {
        setActiveSection("contact")
        return
      }

      const sections = sectionCacheRef.current
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.top >= 0 && scrollPos >= section.top - 200 && scrollPos < section.bottom) {
          setActiveSection(section.id)
          break
        }
      }
    }, 100)

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [isLoading, updateSectionCache])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      element.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" })
    }
    setMenuOpen(false)
  }

  const scrollToProjects = () => {
    scrollTo("projects")
  }

  const scrollToAbout = () => {
    scrollTo("about")
  }

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen relative" style={{ backgroundColor: theme.bg }}>
      {/* Loading screen overlay */}
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {/* Site header — semantic landmark wrapping the fixed nav */}
      <header role="banner">
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition duration-200 overflow-hidden"
        style={{
          backgroundColor: scrolled ? theme.bg : "transparent",
          borderBottom: scrolled ? `1px solid ${theme.border}` : "none",
          paddingTop: "env(safe-area-inset-top)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
        }}
      >
        {scrolled && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: isDark ? 0.04 : 0.14,
              backgroundImage: `radial-gradient(circle, ${theme.text}cc 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center py-4">
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey) return
                    e.preventDefault()
                    scrollTo(item.id)
                  }}
                  aria-current={activeSection === item.id ? "location" : undefined}
                  className="nav-link relative px-4 py-2 font-medium uppercase tracking-wider text-sm"
                >
                  {item.name}
                  {activeSection === item.id && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{ backgroundColor: theme.text }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center ml-auto gap-2">
              <button
                className="p-2 rounded-lg transition-colors duration-200"
                style={{ color: theme.textSoft }}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="md:hidden fixed inset-0 z-50"
            style={{ backgroundColor: theme.bg, overscrollBehavior: 'contain' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Dot grid overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: isDark ? 0.04 : 0.14,
                backgroundImage: `radial-gradient(circle, ${theme.text}cc 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />

            {/* Close button */}
            <button
              className="absolute p-2"
              style={{
                color: theme.textSoft,
                top: "max(1rem, env(safe-area-inset-top))",
                right: "max(1rem, env(safe-area-inset-right))",
              }}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center justify-center h-full space-y-6">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey) return
                    e.preventDefault()
                    scrollTo(item.id)
                  }}
                  aria-current={activeSection === item.id ? "location" : undefined}
                  className="nav-link text-xl font-medium uppercase tracking-wider px-6 py-3"
                >
                  {item.name}
                  {activeSection === item.id && (
                    <span
                      aria-hidden="true"
                      className="block w-4 h-0.5 mx-auto mt-1 rounded-full"
                      style={{ backgroundColor: theme.text }}
                    />
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content" aria-hidden={isLoading || undefined} {...(isLoading ? { inert: '' } : {})}>
        {/* Hero Section - blurred while loading, sharpens on complete */}
        <motion.div
          initial={{ filter: "blur(8px)", opacity: 0.6 }}
          animate={{
            filter: isLoading ? "blur(8px)" : "blur(0px)",
            opacity: isLoading ? 0.6 : 1,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <HeroSection onScrollToProjects={scrollToProjects} onScrollToAbout={scrollToAbout} isVisible={!isLoading} />
        </motion.div>

        {/* About Section */}
        <AboutSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Page footer — terminal signature panel */}
      <footer
        role="contentinfo"
        aria-labelledby="footer-heading"
        className="relative overflow-hidden border-t"
        style={{
          backgroundColor: theme.bg,
          borderColor: theme.border,
          color: theme.textMuted,
          paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
          paddingRight: "max(1.5rem, env(safe-area-inset-right))",
          paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
        }}
      >
        {/* Dot grid overlay — matches projects */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: isDark ? 0.04 : 0.14,
            backgroundImage: `radial-gradient(circle, ${theme.text}cc 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Corner Frame Accents */}
        <div aria-hidden="true" className="hidden md:block absolute top-2 left-2 w-4 h-4 lg:w-5 lg:h-5 border-t-2 border-l-2 z-20" style={{ borderColor: `${theme.text}40` }} />
        <div aria-hidden="true" className="hidden md:block absolute top-2 right-2 w-4 h-4 lg:w-5 lg:h-5 border-t-2 border-r-2 z-20" style={{ borderColor: `${theme.text}40` }} />
        <div aria-hidden="true" className="hidden md:block absolute bottom-2 left-2 w-4 h-4 lg:w-5 lg:h-5 border-b-2 border-l-2 z-20" style={{ borderColor: `${theme.text}40` }} />
        <div aria-hidden="true" className="hidden md:block absolute bottom-2 right-2 w-4 h-4 lg:w-5 lg:h-5 border-b-2 border-r-2 z-20" style={{ borderColor: `${theme.text}40` }} />

        <h2 id="footer-heading" className="sr-only">Site footer</h2>

        <div className="max-w-6xl mx-auto pt-5 pb-3 relative z-10 font-mono">
          {/* Top row: sitemap + socials */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <nav aria-label="Footer sitemap" className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] tracking-wide uppercase">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey) return
                    e.preventDefault()
                    scrollTo(item.id)
                  }}
                  className="nav-link"
                >
                  {item.name}
                </a>
              ))}
              <Link href="/thesis" className="nav-link">Thesis</Link>
            </nav>

            <address className="not-italic flex items-center gap-3">
              {[
                { Icon: Github, href: "https://github.com/mariocamarena", label: "GitHub", external: true },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/marioacamarena/", label: "LinkedIn", external: true },
                { Icon: Mail, href: "mailto:cs.mario.camarena@gmail.com", label: "Email", external: false },
              ].map(({ Icon, href, label, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="icon-link"
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              ))}
            </address>
          </div>

          {/* Bottom strip */}
          <div
            className="mt-3 pt-3 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] tracking-wider"
            style={{ borderColor: theme.border }}
          >
            <span translate="no" style={{ color: theme.textMuted }}>
              PORTFOLIO.2026 — © Mario Camarena
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  const prefersReduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
                  window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" })
                }}
                className="nav-link inline-flex items-center gap-1 uppercase tracking-wider"
                aria-label="Back to top"
              >
                <ArrowUp className="w-3 h-3" aria-hidden="true" />
                <span>Top</span>
              </button>
              <Link href="/admin" className="nav-link uppercase tracking-wider">
                Admin
              </Link>
              <span className="flex items-center gap-1" translate="no" aria-hidden="true" style={{ color: theme.textMuted }}>
                mario@portfolio:~$
                <motion.span
                  className="ml-0.5 w-1.5 h-2.5 inline-block"
                  style={{ backgroundColor: theme.text }}
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                />
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Theme toggle */}
      <AsciiThemeToggle />
    </div>
    </MotionConfig>
  )
}
