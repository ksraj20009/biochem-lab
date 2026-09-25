import React from 'react'

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'studio', label: 'Formula Studio', icon: '⚡' },
  { id: 'models', label: '3-D Models', icon: '🧊' },
  { id: 'gallery', label: 'Gallery', icon: '🖼️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' }
]

export function Nav({ current, onNavigate, sections }) {
  const activeBase = current.startsWith('section:') ? `section:${current.split(':')[1]}` : current
  return (
    <nav className="sidebar">
      <div className="brand" onClick={() => onNavigate('home')}>
        <svg viewBox="0 0 100 100" className="brand-logo" aria-hidden="true">
          <circle cx="38" cy="50" r="26" fill="#34d399" opacity="0.9" />
          <circle cx="62" cy="50" r="26" fill="#60a5fa" opacity="0.9" />
        </svg>
        <div>
          <strong>BioChem Lab</strong>
          <span>biology × chemistry</span>
        </div>
      </div>

      <div className="nav-group">
        <span className="nav-heading">Workspace</span>
        {NAV_ITEMS.map((n) => (
          <button key={n.id} className={`nav-item ${activeBase === n.id ? 'active' : ''}`} onClick={() => onNavigate(n.id)}>
            <span>{n.icon}</span> {n.label}
          </button>
        ))}
      </div>

      <div className="nav-group">
        <span className="nav-heading">Knowledge Sections</span>
        {sections.map((s) => (
          <button key={s.id} className={`nav-item ${current === `section:${s.id}` ? 'active' : ''}`} onClick={() => onNavigate(`section:${s.id}`)}>
            <span>{s.icon}</span> {s.name}
          </button>
        ))}
      </div>

      <div className="nav-foot">Educational platform — not medical advice. <button className="linkish" onClick={() => onNavigate('settings')}>Settings</button></div>
    </nav>
  )
}

export function MobileNav({ current, onNavigate, sections }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="mobile-nav">
      <div className="mobile-bar">
        <strong>BioChem Lab</strong>
        <button className="btn btn-ghost" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
      </div>
      {open && (
        <div className="mobile-menu">
          {NAV_ITEMS.map((n) => (
            <button key={n.id} className="nav-item" onClick={() => { onNavigate(n.id); setOpen(false) }}>{n.icon} {n.label}</button>
          ))}
          <div className="nav-heading">Sections</div>
          {sections.map((s) => (
            <button key={s.id} className="nav-item" onClick={() => { onNavigate(`section:${s.id}`); setOpen(false) }}>{s.icon} {s.name}</button>
          ))}
        </div>
      )}
    </div>
  )
}
