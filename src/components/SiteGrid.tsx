// src/components/SiteGrid.tsx

import type { FC } from 'react'
import type { SiteResult } from '../types'
import SiteCard from './SiteCard'

interface Props {
  sites: SiteResult[]
  activeSite: SiteResult | null
  onSelect: (site: SiteResult) => void | Promise<void>
}

const SiteGrid: FC<Props> = ({ sites, activeSite, onSelect }) => {
  if (sites.length === 0) return null

  return (
    <div style={{ marginBottom: '2.5rem', marginLeft: '0.5rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '1.25rem',
      }}>
        <span style={{
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--color-text-tertiary)',
          whiteSpace: 'nowrap',
        }}>
          Sökresultat · {sites.length} platser
        </span>
        <div style={{
          flex: 1,
          height: '0.5px',
          background: 'var(--color-border-tertiary)',
        }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
      }}>
        {sites.map(site => (
          <SiteCard
            key={site.id}
            site={site}
            isActive={activeSite?.id === site.id}
            onClick={onSelect}
          />
        ))}
      </div>
    </div>
  )
}

export default SiteGrid