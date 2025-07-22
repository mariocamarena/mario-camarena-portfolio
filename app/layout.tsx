import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mario Camarena - AI Researcher & Developer",
  description:
    "Mario Camarena's portfolio - Master's student at UTRGV researching computer vision and exploring DevOps",
  icons: {
    icon: '/icons/scale.png',
    shortcut: '/icons/scale.png',
    apple: '/icons/scale.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}


import './globals.css'