'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Generate a unique visitor ID and store in localStorage
function getVisitorId(): string {
  if (typeof window === 'undefined') return ''

  let visitorId = localStorage.getItem('visitor_id')
  if (!visitorId) {
    visitorId = crypto.randomUUID()
    localStorage.setItem('visitor_id', visitorId)
  }
  return visitorId
}

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Don't track admin pages
    if (pathname?.startsWith('/admin')) return

    const trackPageView = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page_path: pathname,
            referrer: document.referrer || null,
            screen_width: window.screen.width,
            screen_height: window.screen.height,
            language: navigator.language,
            visitor_id: getVisitorId(),
          }),
        })
      } catch {
        // Silently fail - analytics shouldn't break the site
      }
    }

    // Small delay to not block page load
    const timeout = setTimeout(trackPageView, 100)
    return () => clearTimeout(timeout)
  }, [pathname])

  return null
}
