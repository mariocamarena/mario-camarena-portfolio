"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"

// Component imports
import { ProgressBar } from "@/components/ui/progress-bar"
import { HeroSection } from "@/components/sections/hero-section"
import { ProjectCard } from "@/components/ui/project-card"
import { ContactSection } from "@/components/sections/contact-section"

// Configuration imports
import { theme } from "@/lib/theme"
import { navigation, portfolio } from "@/lib/constants"

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
  }, [mounted])

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

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme.bg }}>
        <div className="relative w-12 h-12">
          <motion.div
            className="absolute inset-0 border-2 rounded-full"
            style={{ borderColor: `${theme.primary}40` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full"
            style={{ backgroundColor: theme.primary }}
            animate={{
              scale: [1, 0.8, 1.2, 1],
              rotate: [0, 180, 360],
              borderRadius: ["50%", "25%", "50%"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.bg }}>
      <ProgressBar />

      {/* Navigation */}
      <motion.nav
        className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "backdrop-blur-md shadow-2xl" : "bg-transparent"
        }`}
        style={{
          backgroundColor: scrolled ? `${theme.surface}95` : "transparent",
          borderBottom: scrolled ? `1px solid ${theme.border}` : "none",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="hidden md:flex space-x-8 mx-auto">
              {navigation.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="relative px-4 py-2 font-medium transition-all duration-200"
                  style={{
                    color: activeSection === item.id ? theme.text : theme.textSoft,
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  whileHover={{
                    scale: 1.05,
                    color: theme.primary,
                  }}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
                      style={{ backgroundColor: theme.primary }}
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <motion.button
              className="md:hidden p-2 rounded-lg transition-colors ml-auto"
              style={{ color: theme.textSoft }}
              onClick={() => setMenuOpen(!menuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-50 backdrop-blur-lg"
            style={{ backgroundColor: `${theme.surface}F0` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col items-center justify-center h-full space-y-8"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {navigation.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-2xl font-medium px-6 py-3 rounded-lg transition-all duration-200"
                  style={{
                    color: activeSection === item.id ? theme.text : theme.textSoft,
                    backgroundColor: activeSection === item.id ? `${theme.primary}20` : "transparent",
                    border: activeSection === item.id ? `1px solid ${theme.primary}40` : "1px solid transparent",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: `${theme.primary}30`,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <HeroSection onScrollToProjects={scrollToProjects} />

      {/* About Section */}
      <section id="about" className="py-20 px-6" style={{ backgroundColor: theme.surface }}>
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            className="font-mono text-3xl md:text-4xl font-bold mb-16 text-center"
            style={{ color: theme.text }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
            >
              <motion.p
                className="text-lg leading-relaxed"
                style={{ color: theme.textSoft }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                I've been interested in tech since the age of 10, spending countless hours researching computer hardware and building my first systems. Naturally, this curiosity evolved into pursuing a degree in Computer Science.
              </motion.p>

              <motion.p
                className="text-lg leading-relaxed"
                style={{ color: theme.textSoft }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                I'm currently pursuing my Master's in Computer Science at UTRGV, where I work as a Graduate Research Assistant. My interests span AI research, like my FT-SAM work improving urban scene segmentation on SAM, a segmentation foundational model, and building products that actually impact people's lives, such as leading the team that developed STABLES, a campus parking management app. I also believe it's important to stay knowledgeable across different fields, which is why I've been getting into DevOps and IT alongside my research.
              </motion.p>

              <motion.div className="mt-8 space-y-4">
                {/* Languages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
              >
                  <h4 className="text-sm font-medium mb-3" style={{ color: theme.textMuted }}>
                    Languages
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "TypeScript", "JavaScript", "Dart", "C++", "HTML", "CSS"].map((tech, index) => (
                  <motion.span
                    key={tech}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: theme.primary + "20",
                      color: theme.primary,
                      border: `1px solid ${theme.primary}40`,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.05, duration: 0.5, type: "spring" }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: theme.primary + "40",
                      boxShadow: `0 5px 15px ${theme.primary}30`,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech}
                  </motion.span>
                ))}
                  </div>
                </motion.div>

                {/* Frameworks & Libraries */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-sm font-medium mb-3" style={{ color: theme.textMuted }}>
                    Frameworks & Libraries
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["PyTorch", "TensorFlow", "Flutter", "Next.js", "Node.js", "Express", "Framer Motion", "Tailwind CSS"].map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: theme.secondary + "20",
                          color: theme.secondary,
                          border: `1px solid ${theme.secondary}40`,
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.0 + index * 0.05, duration: 0.5, type: "spring" }}
                        viewport={{ once: true }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: theme.secondary + "40",
                          boxShadow: `0 5px 15px ${theme.secondary}30`,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Tools & Platforms */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-sm font-medium mb-3" style={{ color: theme.textMuted }}>
                    Tools & Platforms
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["PostgreSQL", "Git & GitHub", "Google Cloud", "VSCode", "Linux", "HPC Clusters"].map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: theme.accent + "20",
                          color: theme.accent,
                          border: `1px solid ${theme.accent}40`,
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 + index * 0.05, duration: 0.5, type: "spring" }}
                        viewport={{ once: true }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: theme.accent + "40",
                          boxShadow: `0 5px 15px ${theme.accent}30`,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
            >
              <motion.div
                className="p-10 backdrop-blur-sm shadow-2xl border max-w-sm rounded-2xl w-full"
                style={{
                  backgroundColor: theme.elevated,
                  borderColor: theme.border,
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 25px 50px ${theme.primary}20`,
                  borderColor: theme.primary + "60",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="text-center space-y-8">
                  <div className="relative">
                    <motion.div
                      className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden shadow-lg border-2"
                      style={{ borderColor: `${theme.primary}60` }}
                      animate={{ rotate: 0 }}
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, 360, 720, 1080],
                        borderColor: theme.primary,
                      }}
                      transition={{ 
                        scale: { type: "spring", stiffness: 400, damping: 30 },
                        rotate: { duration: 1.5, ease: "linear" },
                        borderColor: { duration: 0.2 }
                      }}
                    >
                      <Image
                        src="/mc.png"
                        alt="Mario Camarena"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 shadow-sm"
                      style={{
                        backgroundColor: theme.success,
                        borderColor: theme.elevated,
                      }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </div>

                  <div>
                    <h3 className="font-mono text-xl font-bold" style={{ color: theme.text }}>
                      Mario Camarena
                    </h3>
                    <p style={{ color: theme.textSoft }}>Graduate Research Assistant @ UTRGV</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div className="text-center space-y-2">
                      <p style={{ color: theme.text }} className="font-semibold">Focus Areas</p>
                      <p style={{ color: theme.textSoft }}>Computer Vision</p>
                      <p style={{ color: theme.textSoft }}>Full-Stack Development</p>
                    </div>
                    <div className="text-center space-y-2">
                      <p style={{ color: theme.text }} className="font-semibold">Currently</p>
                      <p style={{ color: theme.textSoft }}>A.I. Research</p>
                      <p style={{ color: theme.textSoft }}>Exploring DevOps</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 text-sm" style={{ color: theme.textMuted }}>
                    <span className="inline-flex items-center gap-2">
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: theme.success }}
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                      Open to opportunities
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20"
        style={{ background: `linear-gradient(135deg, ${theme.bg}, ${theme.grad1})` }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            style={{ color: theme.text }}
          >
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {portfolio.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  )
}
