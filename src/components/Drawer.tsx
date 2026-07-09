import { FC, useEffect } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Drawer: FC<Props> = ({ isOpen, onClose, children }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.3)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
          zIndex: 100,
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(560px, 92vw)',
          background: '#faf9f7',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 101,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'sticky',
            top: 0,
            alignSelf: 'flex-end',
            margin: '1rem 1rem 0',
            background: 'transparent',
            color: '#2c2a2e',
            border: '0.5px solid var(--color-border-tertiary)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            padding: 0,
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
          aria-label="Stäng"
        >
          ✕
        </button>

        {/* Content */}
        <div style={{ padding: '0 1.5rem 2rem', flex: 1 }}>
          {children}
        </div>
      </div>
    </>
  )
}

export default Drawer
