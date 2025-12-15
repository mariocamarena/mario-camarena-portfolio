"use client"

import { useState, useEffect } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

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
