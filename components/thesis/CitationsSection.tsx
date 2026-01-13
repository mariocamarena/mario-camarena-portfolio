"use client"

import { citationCategories } from "@/lib/citations"
import { CitationCard } from "./CitationCard"
import { CitationLegend } from "./CitationLegend"
import { CollapsibleSubSection } from "./CollapsibleSubSection"

export function CitationsSection() {
  return (
    <div className="space-y-6">
      <CitationLegend />

      {citationCategories.map((category) => (
        <CollapsibleSubSection key={category.id} title={category.title}>
          <div className="space-y-3">
            {category.citations.map((citation) => (
              <CitationCard key={citation.id} citation={citation} />
            ))}
          </div>
        </CollapsibleSubSection>
      ))}
    </div>
  )
}
