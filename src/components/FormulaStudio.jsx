import React, { useEffect, useRef, useState } from 'react'
import { generateCard, EXAMPLE_QUERIES } from '../lib/engine.js'
import { DiagramByName, GeneratingAnimation } from './Diagrams.jsx'
import { saveFormulaCard, supabaseConfigured } from '../lib/supabaseClient.js'

const AI_TUTOR_SYSTEM_PROMPT = `You are the AI Tutor inside BioChem Lab, an educational platform where biology meets chemistry.

Your job: explain with real depth and accuracy — mechanisms, formulas and equations, where things happen in the body, what the problem is, what the solution is, how it is used in research or industry, and current limits. Structure answers with clear headings. Use the body profile the user provides to personalize educational estimates (blood volume, body water, BMR) where relevant.

Hard boundaries (non-negotiable): you are an education tool. Never provide instructions, recipes or protocols for synthesizing dangerous substances, harming people or animals, or creating toxins or pathogens. For hybrid-organism questions, explain the real science of species barriers educationally rather than actionable protocols. For medical topics, explain the science and always note that decisions belong with qualified professionals. If a request crosses these lines, say so briefly and offer the educational version instead.`

function getAIConfig() {
  try {
    return JSON.parse(localStorage.getItem('biochem_ai_config') || 'null')
  } catch {
    return null
  }
}

function FormulaCardView({ card, onSave, saved }) {
  if (!card.matched) {
    return (
      <div className="assistant-bubble no-match">
        <h3>{card.title}</h3>
        <p>{card.summary}</p>
        {card.suggestions && (
          <>
            <p className="suggest-label">Topics I know well:</p>
            <div className="chips">
              {card.suggestions.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
          </>
        )}
      </div>
    )
  }
  return (
    <div className="formula-card" data-section={card.section}>
      <div className="fc-head">
        <span className="fc-icon">{card.icon}</span>
        <div>
          <h3 className="fc-title">{card.title}</h3>
          <span className="fc-section">{card.sectionName || card.section}</span>
        </div>
      </div>

      <p className="fc-summary">{card.summary}</p>

      <div className="fc-formula">
        <span className="fc-label">THE FORMULA</span>
        <code>{card.formula}</code>
      </div>

      <div className="fc-block">
        <span className="fc-label">HOW IT WORKS — MECHANISM</span>
        <ol className="fc-mechanism">
          {card.mechanism.map((m, i) => <li key={i}>{m}</li>)}
        </ol>
      </div>

      <div className="fc-grid">
        <div className="fc-block"><span className="fc-label">WHERE IT WORKS</span><p>{card.whereItWorks}</p></div>
        <div className="fc-block"><span className="fc-label">THE PROBLEM</span><p>{card.problem}</p></div>
        <div className="fc-block"><span className="fc-label">THE SOLUTION</span><p>{card.solution}</p></div>
        <div className="fc-block"><span className="fc-label">HOW IT IS USED</span><p>{card.applications.join(' · ')}</p></div>
      </div>

      {card.profileLines && card.profileLines.length > 0 && (
        <div className="fc-block fc-profile">
          <span className="fc-label">PERSONALIZED FOR YOUR PROFILE</span>
          {card.profileLines.map((l, i) => <p key={i}>{l}</p>)}
        </div>
      )}

      {card.diagram && (
        <div className="fc-block">
          <span className="fc-label">DIAGRAM</span>
          <DiagramByName name={card.diagram} />
        </div>
      )}

      <div className="fc-safety">
        <span className="fc-label">SAFETY & LIMITS</span>
        <p>{card.safety}</p>
      </div>

      {card.related && card.related.length > 0 && (
        <div className="fc-related">
          <span className="fc-label">RELATED</span>
          <div className="chips">{card.related.map((r) => <span key={r} className="chip">{r}</span>)}</div>
        </div>
      )}

      {supabaseConfigured && (
        <button className="btn btn-save" onClick={onSave} disabled={saved}>
          {saved ? '✓ Saved to gallery' : 'Save to community gallery'}
        </button>
      )}
    </div>
  )
}

export default function FormulaStudio() {
  const [query, setQuery] = useState('')
  const [profile, setProfile] = useState({ age: 30, sex: 'unspecified', weightKg: 70, heightCm: 170 })
  const [messages, setMessages] = useState([])
  const [generating, setGenerating] = useState(false)
  const [aiMode, setAiMode] = useState(false)
  const [aiNote, setAiNote] = useState(null)
  const [savedIds, setSavedIds] = useState(new Set())
  const logRef = useRef(null)

  useEffect(() => {
    const cfg = getAIConfig()
    if (cfg && cfg.apiKey && cfg.baseUrl && cfg.model) {
      setAiMode(true)
      setAiNote('AI Tutor mode is ON (configured in Settings).')
    }
  }, [])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [messages, generating])

  async function callAITutor(q, prof) {
    const cfg = getAIConfig()
    const profileText = `User body profile: age ${prof.age}, sex ${prof.sex}, weight ${prof.weightKg} kg, height ${prof.heightCm} cm.`
    const res = await fetch(`${cfg.baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cfg.apiKey}`
      },
      body: JSON.stringify({
        model: cfg.model,
        messages: [
          { role: 'system', content: AI_TUTOR_SYSTEM_PROMPT },
          { role: 'user', content: `${profileText}\n\nQuestion: ${q}` }
        ]
      })
    })
    if (!res.ok) throw new Error(`AI endpoint responded ${res.status}`)
    const data = await res.json()
    const text = data?.choices?.[0]?.message?.content
    if (!text) throw new Error('Empty response from AI endpoint')
    return text
  }

  async function handleSubmit(e) {
    e?.preventDefault?.()
    const q = query.trim()
    if (!q || generating) return
    setQuery('')
    setMessages((m) => [...m, { role: 'user', text: q }])
    setGenerating(true)
    const started = Date.now()

    let card = null
    let aiError = null
    if (aiMode) {
      try {
        const text = await callAITutor(q, profile)
        card = { matched: true, aiText: text }
      } catch (err) {
        aiError = err.message
      }
    }
    if (!card) {
      card = generateCard(q, profile)
      if (!card) card = { matched: false, title: 'Ask me something', summary: 'Describe a topic, a body system, or a conversion you want to understand — e.g. "how does the kidney filter blood?"' }
    }

    // keep the demo animation on screen a moment for effect
    const elapsed = Date.now() - started
    if (elapsed < 1100) await new Promise((r) => setTimeout(r, 1100 - elapsed))
    setGenerating(false)
    setMessages((m) => [...m, { role: 'assistant', card, query: q, aiFallback: aiError && aiMode }])
    if (aiError && aiMode) setAiNote(`AI Tutor failed (${aiError}) — answered from the built-in engine instead.`)
  }

  async function handleSave(msg, idx) {
    const card = msg.card
    if (!card || !card.matched) return
    try {
      await saveFormulaCard({ ...card, query: msg.query }, profile.name || 'Anonymous')
      setSavedIds((s) => new Set([...s, idx]))
    } catch (err) {
      setAiNote(`Could not save: ${err.message}`)
    }
  }

  return (
    <div className="page studio-page">
      <div className="page-head">
        <h1>Formula Studio</h1>
        <p className="page-sub">Describe anything — a neuron conversion, a hybrid, a body process — and the studio builds a full formula card: what it is, how it works, where in the body, the problem, the solution, and a diagram.</p>
        {aiNote && <div className="ai-note">{aiNote}</div>}
      </div>

      <div className="studio-layout">
        <aside className="profile-panel">
          <h3>Body Profile</h3>
          <p className="panel-sub">The studio personalizes its explanations for this profile (educational estimates only).</p>
          <label>Age
            <input type="number" min="1" max="120" value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: e.target.value })} />
          </label>
          <label>Sex (for metabolic estimates)
            <select value={profile.sex} onChange={(e) => setProfile({ ...profile, sex: e.target.value })}>
              <option value="unspecified">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label>Weight (kg)
            <input type="number" min="2" max="300" value={profile.weightKg}
              onChange={(e) => setProfile({ ...profile, weightKg: e.target.value })} />
          </label>
          <label>Height (cm)
            <input type="number" min="60" max="230" value={profile.heightCm}
              onChange={(e) => setProfile({ ...profile, heightCm: e.target.value })} />
          </label>
          <label>Your name (for the gallery)
            <input type="text" placeholder="Anonymous" value={profile.name || ''}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          </label>

          <div className="mode-row">
            <button className={aiMode ? 'chip chip-active' : 'chip'} onClick={() => setAiMode(!aiMode)}>
              {aiMode ? 'AI Tutor: ON' : 'AI Tutor: OFF'}
            </button>
          </div>
          <p className="panel-foot">
            {aiMode
              ? 'AI Tutor uses your own API key (Settings) for open-ended questions, with educational guardrails.'
              : 'Offline mode: answers come from the built-in knowledge base — fully private, no network.'}
          </p>
        </aside>

        <div className="chat-panel">
          <div className="chat-log" ref={logRef}>
            {messages.length === 0 && (
              <div className="chat-empty">
                <div className="chips examples">
                  {EXAMPLE_QUERIES.map((ex) => (
                    <button key={ex} className="chip example" onClick={() => setQuery(ex)}>{ex}</button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) =>
              m.role === 'user' ? (
                <div key={i} className="user-row"><div className="user-bubble">{m.text}</div></div>
              ) : (
                <div key={i} className="assistant-row">
                  {m.card.aiText ? (
                    <div className="assistant-bubble ai-text">
                      <span className="fc-label">AI TUTOR</span>
                      {m.card.aiText.split('\n').map((line, j) => line.trim() ? <p key={j}>{line}</p> : null)}
                    </div>
                  ) : (
                    <FormulaCardView
                      card={m.card}
                      onSave={() => handleSave(m, i)}
                      saved={savedIds.has(i)}
                    />
                  )}
                </div>
              )
            )}
            {generating && (
              <div className="assistant-row"><GeneratingAnimation /></div>
            )}
          </div>

          <form className="chat-input" onSubmit={handleSubmit}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. how can a neuron go back to its first stage?"
              disabled={generating}
            />
            <button type="submit" className="btn btn-primary" disabled={generating || !query.trim()}>
              Generate
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
