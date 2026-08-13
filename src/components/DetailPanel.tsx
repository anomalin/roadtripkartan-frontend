import type { FC } from 'react'
import type { EnrichedSite, LiteraryWork, MusicWork, Artifact } from '../types'

interface Props {
    site: EnrichedSite
    music: MusicWork[]
    isMusicLoading: boolean
    literature: LiteraryWork[]
    isLiteratureLoading: boolean
    artifacts: Artifact[]
    isArtifactsLoading: boolean
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

const DetailPanel: FC<Props> = ({ site, music, isMusicLoading, literature, isLiteratureLoading, artifacts, isArtifactsLoading }) => {
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
                     <SectionLabel text="Byggnaden" />

                <p style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontStyle: 'italic', margin: '0 0 0.75rem' }}>
                    Via{' '}
                    <a href="https://www.raa.se/hitta-information/k-samsok/" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                        K-Samsök
                    </a>
                </p>
                    {site.description && (
                        <p style={{
                            fontSize: '15px',
                            lineHeight: 1.75,
                            color: 'var(--color-text-secondary)',
                            fontStyle: 'italic',
                            borderLeft: '2px solid var(--color-border-tertiary)',
                            margin: '0 0 1.5rem',
                        }}>
                            {site.description.slice(0, 8000)}{site.description.length > 8000 ? '…' : ''}
                        </p>
                    )}
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.5rem',
                    marginBottom: '1.5rem',
                    padding: '1.25rem 1.5rem'
                }}>
                    <div>
                        <SectionLabel text="Litteratur" />
                        <p style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontStyle: 'italic', margin: '0 0 0.75rem' }}>
                            Via{' '}
                            <a href="https://litteraturbanken.se" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                                Litteraturbanken
                            </a>
                        </p>
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
                        <p style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', fontStyle: 'italic', margin: '0 0 0.75rem' }}>
                            Via{' '}
                            <a href="https://musicbrainz.org" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                                MusicBrainz
                            </a>
                        </p>
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

                {site.curated?.dateRange && (
                    <div style={{ marginTop: '1.5rem', padding: '1.25rem 1.5rem' }}>
                        <SectionLabel text="Föremål & konst" />
                        <p style={{
                            fontSize: '13px',
                            fontStyle: 'italic',
                            color: 'var(--color-text-tertiary)',
                            lineHeight: 1.6,
                            margin: '0 0 1rem',
                        }}>
                            Möbler och föremål från perioden, hämtade ur europeiska museisamlingar via{' '}
                            <a
                                href="https://www.europeana.eu"
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: 'inherit', textDecoration: 'underline' }}
                            >
                                Europeana
                            </a>
                            . Observera att vissa institutioner anger förvärvsdatum snarare än tillverkningsår,
                            vilket kan innebära att enstaka föremål inte är samtida med platsen.
                            Klicka på ett föremål för mer information.
                        </p>
                        {isArtifactsLoading ? (
                            <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--color-text-tertiary)', margin: 0 }}>
                                Hämtar föremål...
                            </p>
                        ) : artifacts.length === 0 ? (
                            <p style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--color-text-tertiary)', margin: 0 }}>
                                Inga föremål hittades.
                            </p>
                        ) : (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                                gap: '0.75rem',
                            }}>
                                {artifacts.map((artifact, i) => (
                                    <a key={i}
                                        href={artifact.sourceUrl ?? '#'}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <div style={{
                                            border: '0.5px solid var(--color-border-tertiary)',
                                            borderRadius: 'var(--border-radius-md)',
                                            overflow: 'hidden',
                                            transition: 'border-color 0.15s',
                                        }}>
                                            <img
                                                src={artifact.thumbnailUrl ?? ''}
                                                alt={artifact.title ?? ''}
                                                style={{
                                                    width: '100%',
                                                    aspectRatio: '1',
                                                    objectFit: 'cover',
                                                    display: 'block',
                                                }}
                                            />
                                            {artifact.title && (
                                                <p style={{
                                                    fontSize: '11px',
                                                    color: 'var(--color-text-tertiary)',
                                                    margin: 0,
                                                    padding: '6px 8px',
                                                    lineHeight: 1.3,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}>
                                                    {artifact.title}
                                                </p>
                                            )}
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}

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
                        Ingen kuraterad data tillgänglig för denna plats ännu.
                    </p>
                )}
                <a href={getDirectionsUrl(site.lat!, site.lon!)} target="_blank" rel="noreferrer" style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--color-text-tertiary)' }}>
                    Hitta hit
                </a>

            
        </div >
    )
}

export default DetailPanel

