export type PhaseId = 'foundational-research' | 'synthetic-data' | 'surrogate-pivot' | 'graph-build-out' | 'model-training' | 'forecast-head'
export type EntryType = 'decision' | 'report' | 'pivot' | 'result' | 'failure' | 'data-collection' | 'research'
export type FigureLayout = 'full' | 'half' | 'grid-2' | 'grid-4'

export interface Figure {
  src: string
  alt: string
  caption: string
  layout?: FigureLayout
}

export interface Report {
  filename: string
  title: string
  questionAnswered: string
  status: 'dropped' | 'superseded' | 'current'
}

export interface TimelineEntry {
  id: string
  date: string
  title: string
  type: EntryType
  summary: string
  body?: string
  keyFindings?: string[]
  figures?: Figure[]
  reports?: Report[]
  ledTo?: string[]
  motivatedBy?: string[]
  tags?: string[]
}

export interface Phase {
  id: PhaseId
  title: string
  dateRange: string
  summary: string
  outcome: string
  outcomeType: 'success' | 'failure' | 'ongoing' | 'foundation'
  entries: TimelineEntry[]
}

export interface ThesisData {
  title: string
  subtitle: string
  lastUpdated: string
  phases: Phase[]
}
