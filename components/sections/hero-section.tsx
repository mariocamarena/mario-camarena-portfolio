"use client"

import { motion } from "framer-motion"
import { Github, Download } from "lucide-react"
import { TypeWriter } from "@/components/ui/typewriter"
import { MagneticBtn } from "@/components/ui/magnetic-btn"
import { FloatingShapes } from "./floating-shapes"

interface HeroSectionProps {
  onScrollToProjects: () => void
}

// Hero landing section
export const HeroSection = ({ onScrollToProjects }: HeroSectionProps) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <FloatingShapes />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <TypeWriter />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10 flex flex-col items-center"
        >
          <MagneticBtn
            onClick={onScrollToProjects}
            className="px-8 py-4 rounded-full text-lg font-semibold text-white shadow-2xl"
          >
            See My Work
          </MagneticBtn>

          <motion.div
            className="flex gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <MagneticBtn
              onClick={() => window.open("https://github.com/mariocamarena", "_blank")}
              className="px-5 py-2 rounded-full font-medium text-sm"
              variant="secondary"
            >
              <Github className="w-4 h-4 inline mr-2" />
              GitHub
            </MagneticBtn>

            <MagneticBtn
              onClick={() => {
                const link = document.createElement("a")
                link.href = "/updated_resume_MarioCamarena.pdf"
                link.download = "Mario_Camarena_Resume.pdf"
                link.click()
              }}
              className="px-5 py-2 rounded-full font-medium text-sm"
              variant="secondary"
            >
              <Download className="w-4 h-4 inline mr-2" />
              Resume
            </MagneticBtn>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 