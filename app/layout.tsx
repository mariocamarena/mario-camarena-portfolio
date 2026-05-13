import type React from "react"
import type { Metadata } from "next"
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Script to set theme before page renders to prevent flash
  const themeScript = `
    (function() {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    })();
  `

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#e8e8e8" media="(prefers-color-scheme: light)" />
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
