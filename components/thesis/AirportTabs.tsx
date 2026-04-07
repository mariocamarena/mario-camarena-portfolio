"use client"

import { useState } from "react"
import Image from "next/image"
import { airportData } from "@/lib/thesis-data"

export function AirportTabs() {
  const [activeAirport, setActiveAirport] = useState(0)
  const airport = airportData[activeAirport]

  return (
    <div className="space-y-3">
      <h4 className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--th-text)' }}>Per-Airport Analysis</h4>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-1">
        {airportData.map((ap, i) => (
          <button
            key={ap.code}
            onClick={() => setActiveAirport(i)}
            className="px-3 py-1.5 text-[11px] font-mono rounded transition-colors"
            style={{
              backgroundColor: i === activeAirport ? 'var(--th-bg-emphasis)' : 'var(--th-bg-subtle)',
              color: i === activeAirport ? 'var(--th-text)' : 'var(--th-text-dim)',
              border: `1px solid ${i === activeAirport ? 'var(--th-border-hover)' : 'var(--th-border)'}`,
            }}
          >
            {ap.code}
            <span className="hidden sm:inline ml-1" style={{ color: 'var(--th-text-faint)' }}>({ap.name})</span>
          </button>
        ))}
      </div>

      {/* Plots grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {airport.plots.map((plot) => (
          <div key={plot.src} className="rounded-lg p-3" style={{ backgroundColor: 'var(--th-bg-subtle)', border: '1px solid var(--th-border)' }}>
            <Image
              src={plot.src}
              alt={`${airport.code} - ${plot.alt}`}
              width={600}
              height={450}
              className="w-full h-auto rounded"
              loading="lazy"
            />
            <p className="font-mono text-[11px] mt-2" style={{ color: 'var(--th-text-dim)' }}>{plot.caption}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
