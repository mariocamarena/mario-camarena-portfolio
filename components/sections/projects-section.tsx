"use client"

import { motion } from "framer-motion"
import { ProjectCard } from "@/components/ui/project-card"
import { ThesisBanner } from "@/components/ui/thesis-banner"
import { useTheme } from "@/lib/useTheme"
import { portfolio } from "@/lib/constants"

export function ProjectsSection() {
  const { theme } = useTheme()

  return (
    <section
      id="projects"
      className="py-20 sm:py-24 lg:py-28 relative overflow-hidden scroll-mt-20"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Dot grid overlay - matches mobile nav menu */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage: `radial-gradient(circle, ${theme.text}cc 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Corner Frame Accents - medium on dark bg */}
      <div aria-hidden="true" className="hidden md:block absolute top-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 z-20" style={{ borderColor: `${theme.text}40` }}></div>
      <div aria-hidden="true" className="hidden md:block absolute top-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 z-20" style={{ borderColor: `${theme.text}40` }}></div>
      <div aria-hidden="true" className="hidden md:block absolute bottom-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 z-20" style={{ borderColor: `${theme.text}40` }}></div>
      <div aria-hidden="true" className="hidden md:block absolute bottom-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 z-20" style={{ borderColor: `${theme.text}40` }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block relative">
            <div className="flex items-center gap-3 mb-3 justify-center opacity-60">
              <div className="w-8 h-px" style={{ backgroundColor: theme.text }}></div>
              <span className="text-[10px] font-mono tracking-wider" style={{ color: theme.text }}>○</span>
              <div className="w-8 h-px" style={{ backgroundColor: theme.text }}></div>
            </div>
            <h2 className="sr-only">Projects</h2>
            <pre
              aria-hidden="true"
              translate="no"
              className="font-mono text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] leading-[1.1] tracking-tight"
              style={{ color: theme.text }}
            >{`█▀█ █▀█ █▀█ ░░█ █▀▀ █▀▀ ▀█▀ █▀
█▀▀ █▀▄ █▄█ █▄█ ██▄ █▄▄ ░█░ ▄█`}</pre>
            <div className="flex items-center gap-3 mt-3 justify-center opacity-60">
              <div className="flex-1 max-w-[80px] h-px" style={{ backgroundColor: theme.text }}></div>
              <span className="text-[9px] font-mono" style={{ color: theme.text }}>PORTFOLIO.2026</span>
              <div className="flex-1 max-w-[80px] h-px" style={{ backgroundColor: theme.text }}></div>
            </div>
          </div>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-2"
        >
          <ThesisBanner />
          {portfolio.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
