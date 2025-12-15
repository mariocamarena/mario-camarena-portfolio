"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

// Component imports
import { ProgressBar } from "@/components/ui/progress-bar"
import { LoadingScreen } from "@/components/ui/loading-screen"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ContactSection } from "@/components/sections/contact-section"

// Configuration imports
import { theme } from "@/lib/theme"
import { navigation } from "@/lib/constants"

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  // Loading timer - matches boot sequence duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }))

      const scrollPos = window.scrollY + 100
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      const nearBottom = scrollPos + windowHeight >= docHeight - 100

      if (nearBottom) {
        setActiveSection("contact")
        return
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element) {
          const sectionTop = section.element.offsetTop
          const sectionHeight = section.element.offsetHeight
          const sectionBottom = sectionTop + sectionHeight

          if (scrollPos >= sectionTop - 200 && scrollPos < sectionBottom) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isLoading])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
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
    <div className="min-h-screen relative" style={{ backgroundColor: theme.bg }}>
      {/* Loading screen overlay */}
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <ProgressBar />

      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-200"
        style={{
          backgroundColor: scrolled ? theme.bg : "transparent",
          borderBottom: scrolled ? `1px solid ${theme.border}` : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="hidden md:flex space-x-8 mx-auto">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="relative px-4 py-2 font-medium transition-colors duration-200 focus:outline-none"
                  style={{
                    color: activeSection === item.id ? theme.text : theme.textSoft,
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== item.id) {
                      e.currentTarget.style.color = theme.text
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== item.id) {
                      e.currentTarget.style.color = theme.textSoft
                    }
                  }}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{ backgroundColor: theme.text }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              className="md:hidden p-2 rounded-lg transition-colors duration-200 ml-auto focus:outline-none"
              style={{ color: theme.textSoft }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-50"
            style={{ backgroundColor: theme.bg }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Dot grid overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 0.04,
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />

            {/* Close button */}
            <button
              className="absolute top-4 right-4 p-2 focus:outline-none"
              style={{ color: theme.textSoft }}
              onClick={() => setMenuOpen(false)}
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center justify-center h-full space-y-6">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-xl font-medium px-6 py-3 transition-colors duration-200 focus:outline-none"
                  style={{
                    color: activeSection === item.id ? theme.text : theme.textSoft,
                  }}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <span
                      className="block w-4 h-0.5 mx-auto mt-1 rounded-full"
                      style={{ backgroundColor: theme.text }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
    </div>
  )
}
