import type { FC } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { CuratedData } from '../types'
import 'leaflet/dist/leaflet.css'
// @ts-ignore
import L from 'leaflet'



// Fix default marker icons broken by Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'


delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
})

interface CuratedEntry extends CuratedData {
    id: string
}

interface Props {
    curated: Record<string, CuratedData>
    onSelect: (id: string) => void
}

const CuratedMap: FC<Props> = ({ curated, onSelect }) => {
    const center: [number, number] = [57.7, 11.97]
    const entries: CuratedEntry[] = Object.entries(curated).map(([id, data]) => ({
        id,
        ...data,
    }))

    return (
        <div style={{ position: 'relative', zIndex: 0, marginBottom: '2.5rem' }}>
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
                    Kurerade platser
                </span>
                <div style={{
                    flex: 1,
                    height: '0.5px',
                    background: 'var(--color-border-tertiary)',
                }} />
            </div>



            <MapContainer
                center={center}
                zoom={10}
                style={{
                    height: '500px',
                    borderRadius: '10px',
                    border: '1px solid #ccc'
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                {entries.map(entry => (
                    <Marker
                        key={entry.id}
                        position={[entry.lat, entry.lon]}
                        eventHandlers={{
                            click: () => onSelect(entry.id),
                        }}
                    >
                        <Popup>
                            <div style={{ fontFamily: 'Georgia, serif', minWidth: '140px' }}>
                                <strong style={{ fontSize: '14px' }}>{entry.name}</strong>
                                <br />
                                <span style={{ fontSize: '12px', fontStyle: 'italic', color: '#888' }}>
                                    {entry.periodLabel}
                                </span>
                                <br />
                                <button
                                    onClick={() => onSelect(entry.id)}
                                    style={{
                                        marginTop: '6px',
                                        fontSize: '12px',
                                        padding: '3px 10px',
                                    }}
                                >
                                    Utforska
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default CuratedMap
