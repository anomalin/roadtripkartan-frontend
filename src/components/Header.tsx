// src/components/Header.tsx

import type { FC } from 'react'

const Header: FC = () => {
  return (
    <header className="site-header" style={{
      borderBottom: '0.5px solid var(--color-border-primary)',
      paddingBottom: '1rem',
      marginBottom: '2rem',
      paddingRight:'2rem',
      paddingLeft: '1rem',
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
    }}>
      <h1 style={{
        fontFamily: "'IM Fell English', Georgia, serif",
        fontSize: '28px',
        letterSpacing: '0.08em',
        margin: 0,
      }}>
        Roadtripkartan  
      </h1>

      <p style={{
        fontSize: '13px',
        fontStyle: 'italic',
        color: 'var(--color-text-secondary)',
        letterSpacing: '0.04em',
        margin: 0,
      }}>
        Upptäck platser med en historia att berätta
      </p>
    </header>
  )
}

export default Header