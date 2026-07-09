import { useState } from 'react'
import type { SiteResult, EnrichedSite, CuratedData, MusicWork, LiteraryWork } from './types'
import { fetchMusicByDateRange, searchSites, fetchLiteratureByDateRange, fetchSiteById } from './services/sitesService'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import SiteGrid from './components/SiteGrid'
import DetailPanel from './components/DetailPanel'
import CURATED_JSON from './data/curated.json'
import CuratedMap from './components/CuratedMap'
import Drawer from './components/Drawer'

const CURATED = CURATED_JSON as unknown as Record<string, CuratedData>

function enrich(site: SiteResult): EnrichedSite {
  return {
    ...site,
    curated: site.id ? CURATED[site.id] : undefined,
  }
}

function App() {
  const [sites, setSites] = useState<SiteResult[]>([])
  const [activeSite, setActiveSite] = useState<EnrichedSite | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [music, setMusic] = useState<MusicWork[]>([])
  const [isMusicLoading, setIsMusicLoading] = useState(false)
  const [literature, setLiterature] = useState<LiteraryWork[]>([])
  const [isLiteratureLoading, setIsLiteratureLoading] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleSearch = async (query: string) => {
    setIsLoading(true)
    setError(null)
    setActiveSite(null)
    setMusic([])
    setLiterature([])

    try {
      const results = await searchSites(query)
      setSites(results)
    } catch (e) {
      setError('Sökningen misslyckades. Försök igen.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelect = async (site: SiteResult) => {
    const enriched = enrich(site)
    setActiveSite(enriched)
    setMusic([])
    setLiterature([])
    setIsDrawerOpen(true)

    const dateRange = enriched.curated?.dateRange ?? [1700, 1980]

    setIsMusicLoading(true)
    setIsLiteratureLoading(true)

    const [musicResult, literatureResult] = await Promise.allSettled([
      fetchMusicByDateRange(dateRange[0], dateRange[1]),
      fetchLiteratureByDateRange(dateRange[0], dateRange[1]),
    ])

    if (musicResult.status === 'fulfilled') {
      setMusic(musicResult.value)
    } else {
      console.error('Music fetch failed:', musicResult.reason)
    }
    setIsMusicLoading(false)

    if (literatureResult.status === 'fulfilled') {
      setLiterature(literatureResult.value)
    } else {
      console.error('Literature fetch failed:', literatureResult.reason)
    }
    setIsLiteratureLoading(false)
  }

const handleMapSelect = async (id: string) => {
  setIsLoading(true)
  setMusic([])
  setLiterature([])
  setSites([])
  setIsDrawerOpen(true)

  try {
    const site = await fetchSiteById(id)

    setSites([site])

    await handleSelect(site)
    

  } catch (err) {
    console.error('Map site fetch failed', err)
  } finally {
    setIsLoading(false)
  }
}

  return (
    <div>
      <Header />
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      {error && (
        <p style={{
          fontSize: '14px',
          fontStyle: 'italic',
          color: 'var(--color-text-danger)',
          marginBottom: '1.5rem',
        }}>
          {error}
        </p>
      )}
          <CuratedMap curated={CURATED} onSelect={handleMapSelect} />
      <SiteGrid
        sites={sites}
        activeSite={activeSite}
        onSelect={handleSelect}
      />
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
      {activeSite && (
        <DetailPanel
          site={activeSite}
          music={music}
          isMusicLoading={isMusicLoading}
          literature={literature}
          isLiteratureLoading={isLiteratureLoading}
        />
      )}</Drawer>
    </div>
  )
}

export default App
