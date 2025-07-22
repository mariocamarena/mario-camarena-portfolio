"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const theme = {
  text: "#ffffff",
  primary: "#00d4ff",
}

// typewriter effect that cycles through phrases
export const TypeWriter = () => {
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)

  const phrases = [
    "Hi, I'm Mario Camarena.",
    "I'm pursuing my Master's at UTRGV.",
    "I'm exploring DevOps and IT.",
    "I research computer vision.",
  ]

  useEffect(() => {
    const currentPhrase = phrases[textIndex]
    const typeSpeed = deleting ? 50 : 100
    const pauseDuration = deleting ? 500 : 2000

    if (paused) {
      const timer = setTimeout(() => {
        setPaused(false)
        if (deleting) {
          setDeleting(false)
          setTextIndex((prev) => (prev + 1) % phrases.length)
        } else {
          setDeleting(true)
        }
      }, pauseDuration)

      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      if (!deleting && charIndex < currentPhrase.length) {
        setCharIndex((prev) => prev + 1)
      } else if (deleting && charIndex > 0) {
        setCharIndex((prev) => prev - 1)
      } else {
        setPaused(true)
      }
    }, typeSpeed)

    return () => clearTimeout(timer)
  }, [charIndex, textIndex, deleting, paused, phrases])

  const displayText = phrases[textIndex].substring(0, charIndex)

  return (
    <div className="min-h-[200px] flex items-center justify-center">
      <h1 className="text-5xl md:text-7xl font-bold text-center" style={{ color: theme.text }}>
        {displayText}
        <motion.span
          style={{ color: theme.primary }}
          animate={{
            opacity: [1, 0, 1],
            scaleY: [1, 0.8, 1],
            scaleX: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          |
        </motion.span>
      </h1>
    </div>
  )
} 