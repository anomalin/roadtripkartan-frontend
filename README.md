# locus-client

React + Vite + TypeScript single-page client for [Locus](../README.md). Search for a Swedish historic place, browse a curated Leaflet map, and open a detail drawer that shows period-appropriate music and literature alongside an editorial note.

## Stack

- **Vite 8** as build tool and dev server
- **React 19** + TypeScript
- **react-leaflet 5** / **leaflet 1.9** for the map
- All HTTP traffic uses the platform `fetch` (no `axios` or other client)

## Scripts

```bash
npm install
npm run dev      # start Vite at http://localhost:5173 (proxies /api → :5236)
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # ESLint over the project
```

Requires Node 20+ (Vite 8 baseline).

## Talking to the API

The Vite dev server proxies `/api/*` to `http://localhost:5236` (see `vite.config.ts`). All HTTP traffic to the backend goes through `src/services/sitesService.ts` — three thin functions returning typed promises:

```ts
searchSites(query: string): Promise<SiteResult[]>
fetchMusicByDateRange(fromYear, toYear): Promise<MusicWork[]>
fetchLiteratureByDateRange(fromYear, toYear): Promise<LiteraryWork[]>
```

If you need to point the client at a deployed API, change the proxy target (dev) or read a `VITE_API_BASE_URL` env var and prefix it to the fetch URLs (prod). That env var doesn't exist yet — adding it is on the deploy checklist.

## State flow

State lives in `App.tsx`. There's no Redux/Zustand/etc — the app is small enough that `useState` is fine.

```
User searches              ─►  handleSearch
                                  ├─ searchSites(q) → setSites
                                  └─ resets activeSite/music/literature

User clicks a SiteCard     ─►  handleSelect(site)
                                  ├─ enrich(site)  → setActiveSite
                                  ├─ open Drawer
                                  └─ Promise.allSettled([
                                       fetchMusicByDateRange(...),
                                       fetchLiteratureByDateRange(...),
                                     ])

User clicks a map marker   ─►  handleMapSelect(id)
                                  ├─ searchSites(curated.name)
                                  └─ handleSelect(matchById ?? firstResult)
```

The date range passed to the music/literature calls comes from `curated.json` for the selected site; if the site isn't curated, it falls back to `[1700, 1980]`.

## Curated data

`src/data/curated.json` is a hand-maintained dictionary keyed by K-Samsök item ID:

```json
"http://kulturarvsdata.se/raa/bbr/21400000580062": {
  "name": "Nääs slott",
  "periodLabel": "Nationalromantiken",
  "dateRange": [1850, 1920],
  "editorialNote": "Under 1800-talets senare hälft ...",
  "literature": [],
  "lat": 57.814,
  "lon": 12.394,
  "image": "/images/naas.png"
}
```

Two things use this:

- `CuratedMap` renders one Leaflet marker per entry on initial load.
- `enrich()` in `App.tsx` attaches the curated record to a `SiteResult` when one of its IDs matches, so `DetailPanel` can show the editorial note, period label, and image.

A site that isn't in `curated.json` still works — it just shows the raw K-Samsök data without editorial context.

## Components

```
src/components/
├── Header.tsx       — "Roadtripkartan / Upptäck platser med en historia att berätta" banner
├── SearchBar.tsx    — Free-text input, submits on Enter or button click
├── CuratedMap.tsx   — Leaflet map of curated sites, calls onSelect(id)
├── SiteGrid.tsx     — Grid of SiteCards from search results
├── SiteCard.tsx     — Single site preview (name, coords, thumbnail)
├── Drawer.tsx       — Slide-in panel that hosts the detail view
└── DetailPanel.tsx  — Site details + music list + literature list
```

## Types

Shared types live in `src/types/index.ts` and mirror the API DTOs:

- `SiteResult` — what `/api/sites/search` returns
- `MusicWork` — what `/api/music` returns
- `LiteraryWork` — what `/api/literature` returns
- `CuratedData` — shape of one `curated.json` entry
- `EnrichedSite extends SiteResult` — a `SiteResult` with an optional `curated: CuratedData`

## Styling

CSS variables are defined globally in `src/index.css` (`--color-background-primary`, `--color-border-primary`, `--border-radius-lg`, etc.) and consumed inline via `style={{ ... }}` in components. Typography is Crimson Pro / IM Fell English (load via your preferred font host, or add to `index.html`).

