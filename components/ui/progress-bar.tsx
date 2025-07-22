"use client"

import { useState, useEffect } from "react"
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion"

const theme = {
  primary: "#00d4ff",
  secondary: "#7c3aed",
}

// Scroll progress indicator
export const ProgressBar = () => {
  const [progress, setProgress] = useState(0)
  const springValue = useSpring(progress, { stiffness: 400, damping: 40 })

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = document.documentElement.scrollTop
      const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollPercent = scrolled / maxScroll
      setProgress(scrollPercent)
    }

    window.addEventListener("scroll", updateProgress)
    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  const width = useTransform(springValue, [0, 1], ["0%", "100%"])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50" style={{ backgroundColor: `${theme.primary}20` }}>
      <motion.div
        className="h-full"
        style={{
          background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
          width,
          boxShadow: `0 0 10px ${theme.primary}80`,
        }}
      />
    </div>
  )
} 