"use client"

import { motion } from "framer-motion"
import { ProjectCard } from "@/components/ui/project-card"
import { ThesisBanner } from "@/components/ui/thesis-banner"
import { useTheme } from "@/lib/useTheme"
import { portfolio } from "@/lib/constants"
import DelicateAsciiDots from "@/components/ui/delicate-ascii-dots"

export function ProjectsSection() {
  const { theme, isDark } = useTheme()

  return (
    <section
      id="projects"
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Animated ASCII dots background */}
      <DelicateAsciiDots
        backgroundColor={theme.bg}
        textColor={isDark ? "255, 255, 255" : "80, 80, 80"}
        gridSize={45}
        animationSpeed={0.3}
        targetCellSize={42}
      />

      {/* Corner Frame Accents - medium on dark bg */}
      <div className="absolute top-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 z-20" style={{ borderColor: `${theme.text}40` }}></div>
      <div className="absolute top-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 z-20" style={{ borderColor: `${theme.text}40` }}></div>
      <div className="absolute bottom-2 left-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 z-20" style={{ borderColor: `${theme.text}40` }}></div>
      <div className="absolute bottom-2 right-2 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 z-20" style={{ borderColor: `${theme.text}40` }}></div>

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
            <pre
              className="font-mono text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] leading-[1.1] tracking-tight"
              style={{ color: theme.text }}
            >{`█▀█ █▀█ █▀█ ░░█ █▀▀ █▀▀ ▀█▀ █▀
█▀▀ █▀▄ █▄█ █▄█ ██▄ █▄▄ ░█░ ▄█`}</pre>
            <div className="flex items-center gap-3 mt-3 justify-center opacity-60">
              <div className="flex-1 max-w-[100px] h-px" style={{ backgroundColor: theme.text }}></div>
              <span className="text-[9px] font-mono" style={{ color: theme.text }}>PORTFOLIO.2026</span>
              <div className="flex-1 max-w-[100px] h-px" style={{ backgroundColor: theme.text }}></div>
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
