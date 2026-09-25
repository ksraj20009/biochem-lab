import React, { useState } from 'react'
import { supabaseConfigured } from '../lib/supabaseClient.js'

export default function Settings() {
  const existing = JSON.parse(localStorage.getItem('biochem_ai_config') || 'null')
  const [cfg, setCfg] = useState(
    existing || {
      baseUrl: import.meta.env.VITE_AI_BASE_URL || 'https://api.openai.com/v1',
      model: import.meta.env.VITE_AI_MODEL || 'gpt-4o-mini',
      apiKey: ''
    }
  )
  const [saved, setSaved] = useState(false)

  function save() {
    localStorage.setItem('biochem_ai_config', JSON.stringify(cfg))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>Settings</h1>
        <p className="page-sub">Configure AI Tutor mode (optional). Everything is stored locally in your browser.</p>
      </div>

      <div className="settings-panel">
        <h3>AI Tutor — bring your own key</h3>
        <p>
          The Formula Studio works fully offline from a built-in knowledge base. Optionally, connect any
          OpenAI-compatible API (OpenAI, Groq, OpenRouter, Together, a local LLM…) for open-ended tutoring.
          Your key is kept only in this browser's localStorage and sent directly to the endpoint below — never to us.
          The tutor runs with an educational system prompt: real depth on mechanisms and formulas, no harmful
          synthesis or harm instructions.
        </p>
        <label>Base URL
          <input value={cfg.baseUrl} onChange={(e) => setCfg({ ...cfg, baseUrl: e.target.value })} placeholder="https://api.openai.com/v1" />
        </label>
        <label>Model
          <input value={cfg.model} onChange={(e) => setCfg({ ...cfg, model: e.target.value })} placeholder="gpt-4o-mini" />
        </label>
        <label>API key
          <input type="password" value={cfg.apiKey} onChange={(e) => setCfg({ ...cfg, apiKey: e.target.value })} placeholder="sk-…" />
        </label>
        <div className="settings-actions">
          <button className="btn btn-primary" onClick={save}>{saved ? '✓ Saved' : 'Save settings'}</button>
          <button className="btn btn-ghost" onClick={() => {
            localStorage.removeItem('biochem_ai_config')
            setCfg({ baseUrl: 'https://api.openai.com/v1', model: 'gpt-4o-mini', apiKey: '' })
          }}>Clear</button>
        </div>
      </div>

      <div className="settings-panel">
        <h3>Supabase (community gallery)</h3>
        <p>
          Status: <strong className={supabaseConfigured ? 'ok' : 'warn'}>{supabaseConfigured ? 'connected' : 'not configured'}</strong>.
          {supabaseConfigured
            ? ' Saving formula cards and the gallery are enabled.'
            : ' Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment (see .env.example), and run supabase/schema.sql once.'}
        </p>
      </div>

      <div className="settings-panel">
        <h3>What this app is</h3>
        <p>
          BioChem Lab is an educational platform for learning how biology and chemistry interact — formulas,
          mechanisms, diagrams, 3-D models. It is not a medical, veterinary or laboratory tool, and it will not
          provide instructions for harmful substances or harmful experimentation. For health decisions, consult
          qualified professionals.
        </p>
      </div>
    </div>
  )
}
