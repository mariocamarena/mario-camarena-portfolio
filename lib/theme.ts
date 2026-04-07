// Theme configuration - Dual Mode Support

export const darkTheme = {
  // Backgrounds
  bg: "#0a0a0a",
  surface: "#1a1a1a",
  elevated: "#252525",

  // Text
  text: "#f5f5f5",
  textSoft: "#a0a0a0",
  textMuted: "#808080",

  // Borders
  border: "#2a2a2a",
  borderHover: "#3a3a3a",
  borderDim: "#222222",

  // Accents (monochrome)
  accent: "#ffffff",
  accentDim: "#cccccc",

  // Semantic colors (kept subtle)
  success: "#4ade80",
  warning: "#a0a0a0",
  error: "#ef4444",

  // Overlay
  overlay: "#000000",

  // Terminal dots (macOS style)
  terminalDots: {
    red: "#ff5f56",
    yellow: "#ffbd2e",
    green: "#27ca40",
  },
}

export const lightTheme = {
  // Backgrounds — cold CRT gray, like terminal phosphor
  bg: "#e8e8e8",
  surface: "#dcdcdc",
  elevated: "#d0d0d0",

  // Text — softened for comfort on gray
  text: "#2e2e2e",
  textSoft: "#4a4a4a",
  textMuted: "#666666",

  // Borders — neutral gray
  border: "#c4c4c4",
  borderHover: "#a8a8a8",
  borderDim: "#cfcfcf",

  // Accents (monochrome)
  accent: "#2e2e2e",
  accentDim: "#4a4a4a",

  // Semantic colors
  success: "#2e7d32",
  warning: "#666666",
  error: "#c62828",

  // Overlay
  overlay: "#e8e8e8",

  // Terminal dots (macOS style - keep consistent)
  terminalDots: {
    red: "#ff5f56",
    yellow: "#ffbd2e",
    green: "#27ca40",
  },
}

export type ThemeMode = "dark" | "light"

// Default export for backward compatibility - this will be the "current" theme
// Components should use useTheme() hook instead for reactive updates
export const theme = darkTheme
