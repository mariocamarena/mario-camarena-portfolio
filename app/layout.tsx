import type React from "react"
import type { Metadata, Viewport } from "next"
import './globals.css'
import { AnalyticsTracker } from '@/components/analytics-tracker'

export const metadata: Metadata = {
  title: "Mario Camarena - AI Researcher & Developer",
  description:
    "Mario Camarena's portfolio - Master's student at UTRGV researching computer vision and exploring DevOps",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Script to set theme + theme-color meta before page renders (prevents flash)
  // Also re-syncs theme-color whenever the theme toggles at runtime.
  const themeScript = `
    (function() {
      const DARK_BG = '#0a0a0a';
      const LIGHT_BG = '#e8e8e8';
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      function setMeta(color) {
        var meta = document.querySelector('meta[name="theme-color"]:not([media])');
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', 'theme-color');
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', color);
      }
      setMeta(shouldBeDark ? DARK_BG : LIGHT_BG);
      window.addEventListener('themeChange', function(e) {
        setMeta(e.detail && e.detail.mode === 'dark' ? DARK_BG : LIGHT_BG);
      });
    })();
  `

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js"
          as="script"
        />
      </head>
      <body className="font-mono">
        <a href="#main-content" className="skip-link">Skip to content</a>
        {/* <AnalyticsTracker /> — disabled until analytics backend is fixed */}
        {children}
      </body>
    </html>
  )
}
