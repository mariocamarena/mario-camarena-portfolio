'use client';

import { useEffect, useRef } from 'react';

export default function HeroAsciiBackground() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Load and initialize Unicorn Studio
    const loadScript = (attempt = 1) => {
      // Check if already loaded and initialized
      if (window.UnicornStudio?.isInitialized) {
        window.UnicornStudio.init();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js';

      script.onload = () => {
        if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };

      script.onerror = () => {
        // Retry up to 3 times with increasing delay
        if (attempt < 3) {
          setTimeout(() => loadScript(attempt + 1), attempt * 500);
        }
      };

      document.head.appendChild(script);
    };

    loadScript();

    // CSS to hide branding and crop canvas
    const style = document.createElement('style');
    style.id = 'unicorn-studio-styles';
    style.textContent = `
      [data-us-project] {
        position: relative !important;
        overflow: hidden !important;
      }
      [data-us-project] canvas {
        clip-path: inset(0 0 10% 0) !important;
      }
      [data-us-project] * {
        pointer-events: none !important;
      }
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
    `;

    if (!document.getElementById('unicorn-studio-styles')) {
      document.head.appendChild(style);
    }

    // Hide branding elements
    const hideBranding = () => {
      document.querySelectorAll('[data-us-project] *').forEach(el => {
        const text = (el.textContent || '').toLowerCase();
        const href = el.getAttribute('href') || '';
        if (text.includes('unicorn') || text.includes('made with') || href.includes('unicorn')) {
          (el as HTMLElement).style.display = 'none';
        }
      });
    };

    const interval = setInterval(hideBranding, 100);
    setTimeout(() => clearInterval(interval), 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <div
        data-us-project="OMzqyUv6M3kSnv0JeAtC"
        style={{ width: '100%', height: '100%', minHeight: '100vh' }}
      />
    </div>
  );
}

// Type declaration for UnicornStudio
declare global {
  interface Window {
    UnicornStudio?: {
      init: () => void;
      isInitialized?: boolean;
    };
  }
}
