import type { FC } from 'react'
import type { SiteResult } from '../types'

interface Props {
  site: SiteResult
  isActive: boolean
  onClick: (site: SiteResult) => void | Promise<void>
}

const SiteCard: FC<Props> = ({ site, isActive, onClick }) => {
  const formatCoord = (val: number | null, pos: 'lat' | 'lon') => {
    if (val === null) return '—'
    const dir = pos === 'lat' ? (val >= 0 ? 'N' : 'S') : (val >= 0 ? 'Ö' : 'V')
    return `${Math.abs(val).toFixed(3)}° ${dir}`
  }

  return (
    <div
      onClick={() => onClick(site)}
      style={{
        background: 'var(--color-background-primary)',
        border: isActive
          ? '1px solid var(--color-border-primary)'
          : '0.5px solid var(--color-border-tertiary)',
        borderRadius: 'var(--border-radius-lg)',
        padding: '1rem 1.25rem',
        cursor: 'pointer',
        transition: 'border-color 0.15s',
      }}
    >
      <p style={{
        fontFamily: "'IM Fell English', Georgia, serif",
        fontSize: '15px',
        margin: '0 0 4px',
        color: 'var(--color-text-primary)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
        title={site.name ?? ''}
      >
        {site.name ?? '—'}
      </p>
      <p style={{
        fontSize: '12px',
        fontStyle: 'italic',
        color: 'var(--color-text-tertiary)',
        margin: '0 0 10px',
      }}>
        Bebyggelse
      </p>
      <p style={{
        fontSize: '12px',
        color: 'var(--color-text-tertiary)',
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '0.02em',
        margin: 0,
      }}>
        {formatCoord(site.lat, 'lat')} · {formatCoord(site.lon, 'lon')}
      </p>
    </div>
  )
}

export default SiteCard