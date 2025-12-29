"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

// scroll progress indicator
export const ProgressBar = () => {
  const progress = useMotionValue(0)
  const springValue = useSpring(progress, { stiffness: 400, damping: 40 })

  useEffect(() => {
    let ticking = false

    const updateProgress = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = document.documentElement.scrollTop
          const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
          const scrollPercent = maxScroll > 0 ? scrolled / maxScroll : 0
          progress.set(scrollPercent)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", updateProgress, { passive: true })
    return () => window.removeEventListener("scroll", updateProgress)
  }, [progress])

  const width = useTransform(springValue, [0, 1], ["0%", "100%"])

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50" style={{ backgroundColor: "#1a1a1a" }}>
      <motion.div
        className="h-full"
        style={{
          backgroundColor: "#f5f5f5",
          width,
        }}
      />
    </div>
  )
}
