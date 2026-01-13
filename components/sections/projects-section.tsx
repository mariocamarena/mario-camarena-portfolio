"use client"

import { motion } from "framer-motion"
import { ProjectCard } from "@/components/ui/project-card"
import { ThesisBanner } from "@/components/ui/thesis-banner"
import { theme } from "@/lib/theme"
import { portfolio } from "@/lib/constants"

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Corner Frame Accents - medium on dark bg */}
      <div className="absolute top-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 border-white/25 z-20"></div>
      <div className="absolute top-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 border-white/25 z-20"></div>
      <div className="absolute bottom-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 border-white/25 z-20"></div>
      <div className="absolute bottom-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 border-white/25 z-20"></div>

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

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
              <div className="w-8 h-px bg-white"></div>
              <span className="text-white text-[10px] font-mono tracking-wider">○</span>
              <div className="w-8 h-px bg-white"></div>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono tracking-wider uppercase"
              style={{ color: theme.text, letterSpacing: '0.05em' }}
            >
              FEATURED PROJECTS
            </h2>
            <div className="flex items-center gap-3 mt-3 justify-center opacity-60">
              <div className="flex-1 max-w-[100px] h-px bg-white"></div>
              <span className="text-white text-[9px] font-mono">PORTFOLIO.2026</span>
              <div className="flex-1 max-w-[100px] h-px bg-white"></div>
            </div>
          </div>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
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
