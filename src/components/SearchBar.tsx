// src/components/SearchBar.tsx

import { FC, useState } from 'react'

interface Props {
  onSearch: (query: string) => void
  isLoading: boolean
}

const SearchBar: FC<Props> = ({ onSearch, isLoading }) => {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    if (value.trim()) onSearch(value.trim())
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '2.5rem', marginLeft: '1rem' }}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Sök efter en plats..."
        style={{
          flex: 1,
          fontFamily: "'Crimson Pro', Georgia, serif",
          fontSize: '16px',
          paddingLeft: '0.2rem'
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        style={{
          fontFamily: "'Crimson Pro', Georgia, serif",
          fontSize: '15px',
          padding: '0 1.25rem',
          height: '36px',
          opacity: isLoading ? 0.5 : 1,
          marginRight: '1rem'
        }}
      >
        {isLoading ? 'Söker...' : 'Sök'}
      </button>
    </div>
  )
}

export default SearchBar