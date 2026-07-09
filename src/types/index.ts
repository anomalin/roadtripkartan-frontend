// src/types/index.ts



export interface LiteraryWork {
  id: string | null
  title: string | null
  author: string | null
  authorBorn: string | null
  url: string | null
}

export interface MusicWork {
  id: string | null
  title: string | null
  composer: string | null
  date: string | null
  tags: string[]
}



export interface EnrichedSite extends SiteResult {
  curated?: CuratedData
}

export interface SiteResult {
  id: string | null
  name: string | null
  description: string | null
  thumbnail: string | null
  url: string | null
  lat: number | null
  lon: number | null
}

export interface CuratedData {
  name: string
  periodLabel: string
  dateRange: [number, number]
  editorialNote: string
  literature: LiteraryWork[]
  lat: number
  lon: number
  image?: string
}