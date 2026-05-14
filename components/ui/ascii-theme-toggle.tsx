"use client"

import { useCallback } from "react"
import { flushSync } from "react-dom"
import { useTheme } from "@/lib/useTheme"
import type { ThemeMode } from "@/lib/theme"

const cycle: ThemeMode[] = ["dark", "light"]

function applyModeClasses(mode: ThemeMode) {
  const cl = document.documentElement.classList
  cl.remove("dark")
  if (mode === "dark") cl.add("dark")
}

export function AsciiThemeToggle() {
  const { isDark, theme, mode } = useTheme()

  const handleToggle = useCallback(() => {
    const idx = cycle.indexOf(mode)
    const next = cycle[(idx + 1) % cycle.length]

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    if (!document.startViewTransition || prefersReduced) {
      applyModeClasses(next)
      localStorage.setItem("theme", next)
      window.dispatchEvent(new CustomEvent("themeChange", { detail: { mode: next } }))
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        applyModeClasses(next)
        localStorage.setItem("theme", next)
        window.dispatchEvent(new CustomEvent("themeChange", { detail: { mode: next } }))
      })
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            "inset(50% 0 50% 0)",
            "inset(0 0 0 0)",
          ],
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })
  }, [mode])

  return (
    <button
      onClick={handleToggle}
      aria-label={`Switch theme — currently ${mode === "dark" ? "dark mode" : "light mode"}`}
      aria-pressed={isDark}
      className="fixed z-50 font-mono text-[10px] leading-none cursor-pointer opacity-60 hover:opacity-100 transition duration-300 group py-[7px] px-[10px]"
      style={{
        backgroundColor: `${theme.bg}99`,
        backdropFilter: "blur(4px)",
        border: `1px solid ${theme.borderDim}`,
        bottom: "max(1rem, env(safe-area-inset-bottom))",
        right: "max(1rem, env(safe-area-inset-right))",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.text }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.borderDim }}
    >
      {/* Corner accents on hover */}
      <span className="absolute -top-px -left-px w-1.5 h-1.5 border-t border-l opacity-0 group-hover:opacity-60 transition-opacity" style={{ borderColor: theme.text }} />
      <span className="absolute -bottom-px -right-px w-1.5 h-1.5 border-b border-r opacity-0 group-hover:opacity-60 transition-opacity" style={{ borderColor: theme.text }} />

      <pre className="tracking-wide" style={{ color: theme.textSoft }}>
        {isDark ? "[█░] DRK" : "[░█] LHT"}
      </pre>
    </button>
  )
}
