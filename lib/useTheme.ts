"use client"

import { useState, useEffect, useCallback } from "react"
import { darkTheme, lightTheme } from "./theme"

export type Theme = typeof darkTheme

export function useTheme() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const shouldBeDark = savedTheme ? savedTheme === "dark" : prefersDark
    setIsDark(shouldBeDark)
    document.documentElement.classList.toggle("dark", shouldBeDark)

    // Listen for theme changes from the toggle button
    const handleThemeChange = (e: CustomEvent<{ darkMode: boolean }>) => {
      setIsDark(e.detail.darkMode)
    }

    window.addEventListener("themeChange", handleThemeChange as EventListener)
    return () => {
      window.removeEventListener("themeChange", handleThemeChange as EventListener)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    document.documentElement.classList.toggle("dark", newIsDark)
    localStorage.setItem("theme", newIsDark ? "dark" : "light")
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { darkMode: newIsDark } }))
  }, [isDark])

  // Return the appropriate theme object based on current mode
  const theme: Theme = isDark ? darkTheme : lightTheme

  return {
    theme,
    isDark,
    mounted,
    toggleTheme,
  }
}
