import { Citation, getDisplayUrl } from "@/lib/citations"

interface CitationCardProps {
  citation: Citation
}

export function CitationCard({ citation }: CitationCardProps) {
  const isSnapshot = citation.pattern === 'snapshot'

  const containerStyle: React.CSSProperties = isSnapshot
    ? { backgroundColor: 'var(--th-bg-subtle)', border: '1px solid var(--th-border-dim)', opacity: 0.5 }
    : citation.isPrimary
      ? { backgroundColor: 'var(--th-bg-muted)', borderLeft: '2px solid var(--th-text-dim)', border: '1px solid var(--th-border)' }
      : { backgroundColor: 'var(--th-bg-subtle)', border: '1px solid var(--th-border-dim)' }

  const titleColor = citation.isPrimary ? 'var(--th-text)' : 'var(--th-text-soft)'
  const descColor = citation.isPrimary ? 'var(--th-text-soft)' : 'var(--th-text-muted)'

  const tagStyle: React.CSSProperties = isSnapshot
    ? { backgroundColor: 'var(--th-bg-subtle)', color: 'var(--th-text-faint)', textDecoration: 'line-through' }
    : citation.isPrimary
      ? { backgroundColor: 'var(--th-bg-emphasis)', color: 'var(--th-text)', boxShadow: 'inset 0 0 0 1px var(--th-border-hover)' }
      : { backgroundColor: 'var(--th-bg-muted)', color: 'var(--th-text-soft)' }

  // Format the citation title with venue
  const formattedTitle = citation.venue
    ? `${citation.authors} (${citation.year}). "${citation.title}" ${citation.venue}`
    : `${citation.authors} (${citation.year}). "${citation.title}"`

  return (
    <div className="rounded-lg p-4" style={containerStyle}>
      <div className="flex items-start justify-between gap-4 mb-2">
        <p className="font-mono text-xs font-semibold" style={{ color: titleColor }}>{formattedTitle}</p>
        <span className="px-2 py-0.5 text-[9px] font-mono rounded whitespace-nowrap" style={tagStyle}>{citation.pattern}</span>
      </div>
      <p className="font-mono text-xs mb-2" style={{ color: descColor }}>{citation.description}</p>
      <a
        href={citation.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-xs transition-colors"
        style={{ color: 'var(--th-text-dim)' }}
      >
        {getDisplayUrl(citation.url)}
      </a>
    </div>
  )
}
