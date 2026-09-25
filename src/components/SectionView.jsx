import React, { useState } from 'react'
import { SECTIONS, entriesFor } from '../data/index.js'
import { DiagramByName } from './Diagrams.jsx'

function ConceptCard({ entry, onOpenModel }) {
  const [open, setOpen] = useState(false)
  return (
    <article className={`concept-card sec-${entry.section}`} data-open={open}>
      <header className="cc-head" onClick={() => setOpen(!open)}>
        <span className="cc-icon">{entry.icon}</span>
        <div className="cc-title-wrap">
          <h3>{entry.title}</h3>
          <p>{entry.summary}</p>
        </div>
        <span className="cc-chevron">{open ? '−' : '+'}</span>
      </header>
      {open && (
        <div className="cc-body">
          <div className="fc-formula">
            <span className="fc-label">FORMULA / PROCESS</span>
            <code>{entry.formula}</code>
          </div>
          <div className="fc-block">
            <span className="fc-label">MECHANISM</span>
            <ol className="fc-mechanism">{entry.mechanism.map((m, i) => <li key={i}>{m}</li>)}</ol>
          </div>
          <div className="fc-grid">
            <div className="fc-block"><span className="fc-label">WHERE IT WORKS</span><p>{entry.whereItWorks}</p></div>
            <div className="fc-block"><span className="fc-label">THE PROBLEM</span><p>{entry.problem}</p></div>
            <div className="fc-block"><span className="fc-label">THE SOLUTION</span><p>{entry.solution}</p></div>
            <div className="fc-block"><span className="fc-label">USED IN</span><p>{entry.applications.join(' · ')}</p></div>
          </div>
          {entry.diagram && (
            <div className="fc-block">
              <span className="fc-label">DIAGRAM</span>
              <DiagramByName name={entry.diagram} />
            </div>
          )}
          {entry.model3d && (
            <button className="btn btn-ghost" onClick={() => onOpenModel(entry.model3d)}>
              View in 3-D →
            </button>
          )}
          <div className="fc-safety"><span className="fc-label">SAFETY & LIMITS</span><p>{entry.safety}</p></div>
        </div>
      )}
    </article>
  )
}

export default function SectionView({ sectionId, onOpenModel, onGoStudio }) {
  const [filter, setFilter] = useState('')
  const section = SECTIONS.find((s) => s.id === sectionId)
  if (!section) return null

  const entries = entriesFor(sectionId).filter(
    (e) =>
      !filter ||
      (e.title + e.summary + e.tags.join(' ')).toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="page">
      <div className="page-head" style={{ '--accent': section.accent }}>
        <h1><span className="page-icon">{section.icon}</span> {section.name}</h1>
        <p className="page-sub">{section.subtitle} — {section.blurb}</p>
        <div className="section-tools">
          <input
            className="search-input"
            placeholder={`Search ${section.name.toLowerCase()}…`}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button className="btn btn-primary" onClick={onGoStudio}>Ask the Formula Studio about this →</button>
        </div>
      </div>
      <div className="concept-grid">
        {entries.map((e) => <ConceptCard key={e.id} entry={e} onOpenModel={onOpenModel} />)}
        {entries.length === 0 && <p className="empty-note">Nothing matches “{filter}”. Try the Formula Studio for open questions.</p>}
      </div>
    </div>
  )
}
