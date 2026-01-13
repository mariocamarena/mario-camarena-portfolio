import { Citation, getDisplayUrl } from "@/lib/citations"

interface CitationCardProps {
  citation: Citation
}

export function CitationCard({ citation }: CitationCardProps) {
  const isSnapshot = citation.pattern === 'snapshot'
  const isEventDriven = citation.pattern === 'event-driven'
  const isHybrid = citation.pattern === 'hybrid'

  // Container classes based on pattern and primary status
  const containerClasses = isSnapshot
    ? "bg-white/5 rounded-lg p-4 border border-white/10 opacity-50"
    : citation.isPrimary
      ? "bg-white/10 rounded-lg p-4 border-l-2 border-l-amber-400/60 border border-white/20"
      : "bg-white/5 rounded-lg p-4 border border-white/10"

  // Tag classes based on pattern and primary status
  const getTagClasses = () => {
    if (isSnapshot) {
      return "px-2 py-0.5 text-[9px] font-mono bg-white/10 text-white/30 rounded whitespace-nowrap line-through"
    }
    if (isEventDriven) {
      return citation.isPrimary
        ? "px-2 py-0.5 text-[9px] font-mono bg-emerald-500/30 text-emerald-400 rounded whitespace-nowrap ring-1 ring-amber-400/50"
        : "px-2 py-0.5 text-[9px] font-mono bg-emerald-500/20 text-emerald-400/80 rounded whitespace-nowrap"
    }
    // hybrid
    return citation.isPrimary
      ? "px-2 py-0.5 text-[9px] font-mono bg-blue-500/30 text-blue-400 rounded whitespace-nowrap ring-1 ring-amber-400/50"
      : "px-2 py-0.5 text-[9px] font-mono bg-blue-500/20 text-blue-400/80 rounded whitespace-nowrap"
  }

  // Title classes based on primary status
  const titleClasses = citation.isPrimary
    ? "text-white font-mono text-xs font-semibold"
    : "text-white/80 font-mono text-xs font-semibold"

  // Description classes based on primary status
  const descriptionClasses = citation.isPrimary
    ? "text-white/60 font-mono text-xs mb-2"
    : "text-white/50 font-mono text-xs mb-2"

  // Format the citation title with venue
  const formattedTitle = citation.venue
    ? `${citation.authors} (${citation.year}). "${citation.title}" ${citation.venue}`
    : `${citation.authors} (${citation.year}). "${citation.title}"`

  return (
    <div className={containerClasses}>
      <div className="flex items-start justify-between gap-4 mb-2">
        <p className={titleClasses}>{formattedTitle}</p>
        <span className={getTagClasses()}>{citation.pattern}</span>
      </div>
      <p className={descriptionClasses}>{citation.description}</p>
      <a
        href={citation.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/40 font-mono text-xs hover:text-white/70 transition-colors"
      >
        {getDisplayUrl(citation.url)}
      </a>
    </div>
  )
}
