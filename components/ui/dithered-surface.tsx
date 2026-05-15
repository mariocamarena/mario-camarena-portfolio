"use client"

import { useReducedMotion } from "framer-motion"
import dynamic from "next/dynamic"
import { useTheme } from "@/lib/useTheme"

const Dithering = dynamic(
  () => import("@paper-design/shaders-react").then((m) => ({ default: m.Dithering })),
  { ssr: false }
)

export function DitheredSurface() {
  const { theme, isDark } = useTheme()
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: isDark ? 0.25 : 0.3 }}
    >
      <Dithering
        style={{ height: "100%", width: "100%" }}
        colorBack={theme.bg}
        colorFront={isDark ? "#4a4a4a" : "#8a8a8a"}
        shape="simplex"
        type="4x4"
        pxSize={3}
        offsetX={0}
        offsetY={0}
        scale={2}
        rotation={0}
        speed={shouldReduceMotion ? 0 : 0.05}
      />
    </div>
  )
}
