import React, { useEffect, useState } from 'react'
import { listFormulaCards, supabaseConfigured } from '../lib/supabaseClient.js'
import { SECTIONS } from '../data/index.js'

export default function Gallery() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(supabaseConfigured)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!supabaseConfigured) return
    listFormulaCards(60)
      .then((rows) => setCards(rows || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const sectionName = (id) => SECTIONS.find((s) => s.id === id)?.name || 'General'

  return (
    <div className="page">
      <div className="page-head">
        <h1>Community Gallery</h1>
        <p className="page-sub">Formula cards generated in the Studio and saved by users. Stored in Supabase — see the README for the one-time schema setup.</p>
      </div>

      {!supabaseConfigured && (
        <div className="setup-note">
          <h3>Supabase is not connected yet</h3>
          <ol>
            <li>Create a free project at <strong>supabase.com</strong>.</li>
            <li>Run <code>supabase/schema.sql</code> in the project's SQL editor.</li>
            <li>Copy <code>.env.example</code> to <code>.env</code> and fill in <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> from Project Settings → API.</li>
            <li>Restart the dev server (or redeploy) — saving and the gallery switch on automatically.</li>
          </ol>
        </div>
      )}

      {loading && <p className="empty-note">Loading gallery…</p>}
      {error && <p className="empty-note">Could not load gallery: {error}</p>}
      {!loading && !error && supabaseConfigured && cards.length === 0 && (
        <p className="empty-note">No cards saved yet — generate one in the Formula Studio and press “Save to community gallery”.</p>
      )}

      <div className="gallery-grid">
        {cards.map((c) => (
          <article key={c.id} className="gallery-card" data-section={c.section}>
            <div className="gc-top">
              <span className="gc-section">{sectionName(c.section)}</span>
              <span className="gc-author">{c.author_name || 'Anonymous'}</span>
            </div>
            <h3>{c.title}</h3>
            <p>{c.summary}</p>
            {c.content?.formula && <code className="gc-formula">{c.content.formula}</code>}
            <span className="gc-date">{new Date(c.created_at).toLocaleDateString()}</span>
          </article>
        ))}
      </div>
    </div>
  )
}
