"use client"

import { useState, useEffect, useCallback } from "react"
import { darkTheme, lightTheme } from "./theme"
import type { ThemeMode } from "./theme"

export type Theme = typeof darkTheme

const themeMap: Record<ThemeMode, Theme> = {
  dark: darkTheme,
  light: lightTheme,
}

const cycle: ThemeMode[] = ["dark", "light"]

function applyModeClasses(mode: ThemeMode) {
  const cl = document.documentElement.classList
  cl.remove("dark")
  if (mode === "dark") cl.add("dark")
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Read stored mode or default to dark
    const stored = localStorage.getItem("theme") as ThemeMode | null
    const initial = stored && cycle.includes(stored) ? stored : "dark"
    setMode(initial)
    applyModeClasses(initial)

    // Listen for theme changes from other components
    const handleThemeChange = (e: CustomEvent<{ mode: ThemeMode }>) => {
      setMode(e.detail.mode)
    }

    window.addEventListener("themeChange", handleThemeChange as EventListener)
    return () => {
      window.removeEventListener("themeChange", handleThemeChange as EventListener)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const idx = cycle.indexOf(mode)
    const next = cycle[(idx + 1) % cycle.length]
    setMode(next)
    applyModeClasses(next)
    localStorage.setItem("theme", next)
    window.dispatchEvent(new CustomEvent("themeChange", { detail: { mode: next } }))
  }, [mode])

  const theme: Theme = themeMap[mode]
  const isDark = mode === "dark"

  return {
    theme,
    isDark,
    mode,
    mounted,
    toggleTheme,
  }
}
