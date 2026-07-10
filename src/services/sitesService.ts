// src/services/sitesService.ts
const API_URL = import.meta.env.VITE_API_URL

import type { LiteraryWork, MusicWork, SiteResult } from '../types'

export async function searchSites(query: string): Promise<SiteResult[]> {
  const response = await fetch(`${API_URL}/api/sites/search?q=${encodeURIComponent(query)}`)
  
  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`)
  }

  return response.json()
}

export async function fetchSiteById(id: string): Promise<SiteResult> {
  const response = await fetch(
    `${API_URL}/api/sites/by-id?id=${encodeURIComponent(id)}`
  )

  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.statusText}`)
  }

  return response.json()
}

export async function fetchMusicByDateRange(
  fromYear: number,
  toYear: number
): Promise<MusicWork[]> {
  const response = await fetch(`${API_URL}/api/music?fromYear=${fromYear}&toYear=${toYear}`)
  if (!response.ok) throw new Error('Music fetch failed')
  return response.json()
}

export async function fetchLiteratureByDateRange(
  fromYear: number,
  toYear: number
): Promise<LiteraryWork[]> {
  const response = await fetch(`${API_URL}/api/literature?fromYear=${fromYear}&toYear=${toYear}`)
  if (!response.ok) throw new Error('Literature fetch failed')
  return response.json()
}