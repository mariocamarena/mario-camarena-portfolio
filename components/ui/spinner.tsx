"use client"

import { motion } from "framer-motion"

const theme = {
  accent: "#f5f5f5",
  border: "#3a3a3a",
}

// loading spinner
export const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <motion.div className="relative w-12 h-12">
        <motion.div
          className="absolute inset-0 border-2 rounded-full"
          style={{ borderColor: theme.border }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute inset-2 rounded-full"
          style={{ backgroundColor: theme.accent }}
          animate={{
            scale: [1, 0.8, 1.2, 1],
            rotate: [0, 180, 360],
            borderRadius: ["50%", "25%", "50%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  )
}
