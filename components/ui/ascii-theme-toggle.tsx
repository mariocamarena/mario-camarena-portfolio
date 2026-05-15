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
      title={isDark ? "Dark mode — click for light" : "Light mode — click for dark"}
      className="fixed z-50 group cursor-pointer flex items-center gap-2 outline-none focus-visible:opacity-100"
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom))",
        right: "max(1rem, env(safe-area-inset-right))",
      }}
    >
      {/* Terminal-style label — always visible */}
      <span
        aria-hidden="true"
        className="font-mono text-[9px] tracking-[0.15em] uppercase opacity-50 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 whitespace-nowrap"
        style={{ color: theme.textMuted }}
      >
        {isDark ? "drk" : "lht"}
      </span>

      {/* Glyph — a half-filled circle inside corner ticks. Rotates 180° on toggle. */}
      <span
        aria-hidden="true"
        className="relative block w-5 h-5 opacity-30 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200"
      >
        {/* Corner ticks */}
        <span className="absolute top-0 left-0 w-[3px] h-px" style={{ backgroundColor: theme.text }} />
        <span className="absolute top-0 left-0 h-[3px] w-px" style={{ backgroundColor: theme.text }} />
        <span className="absolute top-0 right-0 w-[3px] h-px" style={{ backgroundColor: theme.text }} />
        <span className="absolute top-0 right-0 h-[3px] w-px" style={{ backgroundColor: theme.text }} />
        <span className="absolute bottom-0 left-0 w-[3px] h-px" style={{ backgroundColor: theme.text }} />
        <span className="absolute bottom-0 left-0 h-[3px] w-px" style={{ backgroundColor: theme.text }} />
        <span className="absolute bottom-0 right-0 w-[3px] h-px" style={{ backgroundColor: theme.text }} />
        <span className="absolute bottom-0 right-0 h-[3px] w-px" style={{ backgroundColor: theme.text }} />

        {/* Half-filled disc */}
        <span
          className="absolute top-1/2 left-1/2 w-[11px] h-[11px] rounded-full transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{
            background: `linear-gradient(90deg, ${theme.text} 0 50%, transparent 50% 100%)`,
            border: `1px solid ${theme.text}`,
            transform: `translate(-50%, -50%) rotate(${isDark ? 0 : 180}deg)`,
          }}
        />
      </span>
    </button>
  )
}
