import type { FC } from 'react'
import type { EnrichedSite, LiteraryWork, MusicWork } from '../types'

interface Props {
  site: EnrichedSite
  music: MusicWork[]
  isMusicLoading: boolean
  literature: LiteraryWork[]
  isLiteratureLoading: boolean
}

const SectionLabel: FC<{ text: string }> = ({ text }) => (
  <p style={{
    fontSize: '10px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--color-text-tertiary)',
    margin: '0 0 0.75rem',
  }}>
    {text}
  </p>
)

const getDirectionsUrl = (lat: number, lon: number) => 
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`

const DetailPanel: FC<Props> = ({ site, music, isMusicLoading, literature, isLiteratureLoading }) => {
  return (
    <div style={{
      border: '0.5px solid var(--color-border-tertiary)',
      borderRadius: 'var(--border-radius-lg)',
      overflow: 'hidden',
      marginBottom: '2rem',
    }}>
      <div style={{
        padding: '1.25rem 1.5rem 1rem',
        borderBottom: '0.5px solid var(--color-border-tertiary)',
        background: 'var(--color-background-secondary)',
      }}>
        {site.curated?.image && (
          <img
            src={site.curated.image}
            alt={site.name ?? ''}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              display: 'block',
              borderRadius: 'var(--border-radius-lg) var(--border-radius-lg) 0 0',
              marginBottom: '0.5rem'
            }}
          />
        )}
        <h2 style={{
          fontFamily: "'IM Fell English', Georgia, serif",
          fontSize: '22px',
          margin: '0 0 4px',
          color: 'var(--color-text-primary)',
          fontWeight: 400,
        }}>
          {site.name ?? '—'}
        </h2>
        <p style={{
          fontSize: '13px',
          fontStyle: 'italic',
          color: 'var(--color-text-secondary)',
          margin: 0,
        }}>
          Bebyggelse
          {site.curated && ` · ${site.curated.dateRange[0]}–${site.curated.dateRange[1]}`}
          {site.curated && (
            <span style={{
              marginLeft: '8px',
              fontSize: '11px',
              background: 'var(--color-background-primary)',
              border: '0.5px dashed var(--color-border-secondary)',
              borderRadius: 'var(--border-radius-md)',
              padding: '2px 10px',
              fontStyle: 'italic',
              color: 'var(--color-text-tertiary)',
            }}>
              {site.curated.periodLabel}
            </span>
          )}
        </p>
      </div>

      <div style={{ padding: '1.25rem 1.5rem' }}>
        {site.description && (
          <p style={{
            fontSize: '15px',
            lineHeight: 1.75,
            color: 'var(--color-text-secondary)',
            fontStyle: 'italic',
            borderLeft: '2px solid var(--color-border-tertiary)',
            paddingLeft: '1rem',
            margin: '0 0 1.5rem',
          }}>
            {site.description.slice(0, 8000)}{site.description.length > 8000 ? '…' : ''}
          </p>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          marginBottom: '1.5rem',
        }}>
          <div>
            <SectionLabel text="Litteratur" />
            {isLiteratureLoading ? (
              <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--color-text-tertiary)', margin: 0 }}>
                Hämtar litteratur...
              </p>
            ) : literature.length === 0 ? (
              <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--color-text-tertiary)', margin: 0 }}>
                Ingen litteratur hittades.
              </p>
            ) : (
              literature.map((work, i) => (
                <div key={i} style={{ marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-primary)', margin: '0 0 2px', lineHeight: 1.4 }}>
                    {work.url ? (
                      <a href={work.url} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: 'var(--color-border-secondary)' }}>
                        {work.title}
                      </a>
                    ) : work.title}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', fontStyle: 'italic', margin: 0 }}>
                    {work.author}{work.authorBorn && ` · f. ${work.authorBorn}`}
                  </p>
                </div>
              ))
            )}
          </div>

          <div>
            <SectionLabel text="Musik" />
            {isMusicLoading ? (
              <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--color-text-tertiary)', margin: 0 }}>
                Hämtar musik...
              </p>
            ) : music.length === 0 ? (
              <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--color-text-tertiary)', margin: 0 }}>
                Ingen musik hittades.
              </p>
            ) : (
              music.map((work, i) => (
                <div key={i} style={{ marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-primary)', margin: '0 0 2px', lineHeight: 1.4 }}>
                    {work.title}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', fontStyle: 'italic', margin: 0 }}>
                    {work.composer ?? '—'} · {work.date ?? '—'}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {site.curated?.editorialNote && (
          <div style={{
            background: 'var(--color-background-secondary)',
            borderRadius: 'var(--border-radius-md)',
            padding: '1rem 1.25rem',
          }}>
            <SectionLabel text="Tidsanda" />
            <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--color-text-secondary)', fontStyle: 'italic', margin: 0 }}>
              {site.curated.editorialNote}
            </p>
          </div>
        )}

        {!site.curated && (
          <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--color-text-tertiary)' }}>
            Ingen kurerad data tillgänglig för denna plats ännu.
          </p>
        )}
        <a href={getDirectionsUrl(site.lat!, site.lon!)} target="_blank" rel="noreferrer" style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--color-text-tertiary)' }}>
          Hitta hit
        </a>

      </div>
    </div>
  )
}

export default DetailPanel
