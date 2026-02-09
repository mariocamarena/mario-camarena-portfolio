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
  // Backgrounds
  bg: "#f8f8f8",
  surface: "#ffffff",
  elevated: "#eeeeee",

  // Text
  text: "#1a1a1a",
  textSoft: "#555555",
  textMuted: "#777777",

  // Borders
  border: "#d5d5d5",
  borderHover: "#b5b5b5",
  borderDim: "#e5e5e5",

  // Accents (monochrome)
  accent: "#1a1a1a",
  accentDim: "#444444",

  // Semantic colors
  success: "#22c55e",
  warning: "#666666",
  error: "#dc2626",

  // Overlay
  overlay: "#ffffff",

  // Terminal dots (macOS style - keep consistent)
  terminalDots: {
    red: "#ff5f56",
    yellow: "#ffbd2e",
    green: "#27ca40",
  },
}

// Default export for backward compatibility - this will be the "current" theme
// Components should use useTheme() hook instead for reactive updates
export const theme = darkTheme
