import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Modern Dark Retro-Tech Color Palette
        background: "#0a0a0f", // Very dark navy/black
        surface: "#1a1a2e", // Dark navy - cards, elevated surfaces
        elevated: "#16213e", // Slightly lighter navy - hover states
        accent: "#00d4ff", // Bright cyan - main accent
        secondary: "#7c3aed", // Electric purple - secondary actions
        success: "#00ff88", // Bright green - success states
        textPrimary: "#ffffff", // Pure white - headings
        textSecondary: "#b4bcd0", // Light gray-blue - body text
        textMuted: "#6b7280", // Medium gray - subtle text
        border: "#2d3748", // Dark gray - borders
        cta: "#ff6b35", // Bright orange - CTA buttons
        warning: "#fbbf24", // Amber - warnings
        error: "#ef4444", // Red - errors
        overlay: "#000000", // Pure black for overlays

        // Shadcn compatibility (dark theme variants)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "bounce-in": {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "neon-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 212, 255, 0.8)" },
        },
        "cyber-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(0, 212, 255, 0.4), inset 0 0 20px rgba(124, 58, 237, 0.2)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(0, 212, 255, 0.8), inset 0 0 40px rgba(124, 58, 237, 0.4)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in-left": "slide-in-left 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.6s ease-out",
        "bounce-in": "bounce-in 0.6s ease-out",
        "neon-glow": "neon-glow 2s ease-in-out infinite",
        "cyber-pulse": "cyber-pulse 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-cyber": "linear-gradient(135deg, #00d4ff, #7c3aed)",
        "gradient-dark": "linear-gradient(135deg, #0a0a0f, #1a1a2e)",
      },
      boxShadow: {
        neon: "0 0 20px rgba(0, 212, 255, 0.4)",
        "neon-lg": "0 0 40px rgba(0, 212, 255, 0.6)",
        cyber: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 212, 255, 0.2)",
        dark: "0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
