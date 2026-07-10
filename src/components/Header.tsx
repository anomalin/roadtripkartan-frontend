// src/components/Header.tsx

import type { FC } from 'react'

const Header: FC = () => {
  return (
    <header className="site-header">
      <h1 className="site-title">
        Roadtripkartan
      </h1>

      <span className="site-subtitle">
        Upptäck platser med en historia att berätta
      </span>
    </header>
  )
}

export default Header