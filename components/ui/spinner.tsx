"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useTheme } from "@/lib/useTheme"

// loading spinner
export const Spinner = () => {
  const { theme } = useTheme()
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="flex items-center justify-center" role="status" aria-label="Loading">
      <motion.div className="relative w-12 h-12" aria-hidden="true">
        <motion.div
          className="absolute inset-0 border-2 rounded-full"
          style={{ borderColor: theme.border }}
          animate={shouldReduceMotion ? undefined : { rotate: 360 }}
          transition={shouldReduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute inset-2 rounded-full"
          style={{ backgroundColor: theme.text }}
          animate={shouldReduceMotion ? undefined : {
            scale: [1, 0.8, 1.2, 1],
            rotate: [0, 180, 360],
            borderRadius: ["50%", "25%", "50%"],
          }}
          transition={shouldReduceMotion ? undefined : {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  )
}
