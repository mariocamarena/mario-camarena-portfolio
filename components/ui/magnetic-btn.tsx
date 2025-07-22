"use client"

import type React from "react"
import { useRef, useCallback } from "react"
import { motion, useMotionValue } from "framer-motion"

const theme = {
  accent: "#ff6b35",
  primary: "#00d4ff",
  textSoft: "#b4bcd0",
  border: "#2d3748",
}

interface MagneticBtnProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
  variant?: "primary" | "secondary"
  disabled?: boolean
}

// Mouse-following magnetic button effect
export const MagneticBtn = ({
  children,
  onClick,
  className = "",
  style = {},
  variant = "primary",
  disabled = false,
}: MagneticBtnProps) => {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || disabled) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY

      const distance = Math.sqrt(distX ** 2 + distY ** 2)
      const maxDist = 100

      if (distance < maxDist) {
        const strength = (maxDist - distance) / maxDist
        x.set(distX * strength * 0.3)
        y.set(distY * strength * 0.3)
      }
    },
    [x, y, disabled],
  )

  const handleLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  const btnStyle =
    variant === "primary"
      ? { background: `linear-gradient(135deg, ${theme.accent}, ${theme.primary})` }
      : {
          color: theme.textSoft,
          borderColor: theme.border,
          backgroundColor: "transparent",
          border: "2px solid",
        }

  return (
    <motion.button
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        ...btnStyle,
        ...style,
        x,
        y,
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      onClick={disabled ? undefined : onClick}
      onMouseMove={disabled ? undefined : handleMove}
      onMouseLeave={handleLeave}
      whileHover={disabled ? {} : {
        scale: 1.05,
        boxShadow: variant === "primary" ? `0 20px 40px ${theme.primary}40` : `0 10px 20px ${theme.border}40`,
      }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      disabled={disabled}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${theme.primary}40 0%, transparent 70%)`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        whileHover={disabled ? {} : { scale: 2, opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  )
} 