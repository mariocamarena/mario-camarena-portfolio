"use client"

import { motion } from "framer-motion"

const theme = {
  primary: "#00d4ff",
  secondary: "#7c3aed",
}

// loading spinner
export const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <motion.div className="relative w-12 h-12">
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

        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ backgroundColor: theme.secondary }}
            animate={{
              x: [0, 20, 0, -20, 0],
              y: [0, -20, 0, 20, 0],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  )
} 