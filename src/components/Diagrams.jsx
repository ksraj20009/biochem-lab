import React from 'react'

// ---------- Neuron maturation stages (the user's flagship example) ----------
export function NeuronStagesDiagram() {
  return (
    <svg viewBox="0 0 920 400" className="diagram-svg" role="img" aria-label="Neuron maturation stages diagram">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
        </marker>
        <marker id="arrowGreen" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
        </marker>
        <marker id="arrowAmber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
        </marker>
      </defs>

      <text x="460" y="28" textAnchor="middle" className="diag-title">Neuron Maturation — and the Research Route Back</text>

      {/* Stage 1 */}
      <g>
        <rect x="30" y="60" width="250" height="200" rx="14" className="stage-box stage-1" />
        <circle cx="155" cy="145" r="34" fill="#34d399" opacity="0.9" />
        <circle cx="155" cy="145" r="16" fill="#0f172a" opacity="0.55" />
        <text x="155" y="192" textAnchor="middle" className="diag-stage-label">STAGE 1</text>
        <text x="155" y="210" textAnchor="middle" className="diag-text">Neural stem cell</text>
        <text x="155" y="228" textAnchor="middle" className="diag-sub">self-renewing · Nestin⁺ · Sox2⁺</text>
      </g>

      {/* Stage 2 */}
      <g>
        <rect x="335" y="60" width="250" height="200" rx="14" className="stage-box stage-2" />
        <circle cx="450" cy="140" r="22" fill="#60a5fa" />
        <path d="M438 128 L410 100 M462 128 L492 102 M448 162 L436 196 M460 160 L486 194" stroke="#60a5fa" strokeWidth="4" strokeLinecap="round" />
        <text x="460" y="192" textAnchor="middle" className="diag-stage-label">STAGE 2</text>
        <text x="460" y="210" textAnchor="middle" className="diag-text">Neuroblast (immature)</text>
        <text x="460" y="228" textAnchor="middle" className="diag-sub">grows axon · migrates · DCX⁺</text>
      </g>

      {/* Stage 3 */}
      <g>
        <rect x="640" y="60" width="250" height="200" rx="14" className="stage-box stage-3" />
        {/* dendrites */}
        <path d="M815 125 L795 95 M820 128 L838 92 M828 135 L856 108 M826 140 L858 138" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
        {/* soma */}
        <circle cx="815" cy="138" r="18" fill="#f472b6" />
        {/* axon with myelin */}
        <path d="M800 145 L662 145" stroke="#f472b6" strokeWidth="4" />
        {[792, 770, 748, 726, 704, 682].map((x) => (
          <rect key={x} x={x} y="134" width="14" height="22" rx="4" fill="#fbbf24" opacity="0.9" />
        ))}
        {/* terminals */}
        <path d="M662 145 L640 132 M662 145 L638 148 M662 145 L642 160" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
        <text x="765" y="192" textAnchor="middle" className="diag-stage-label">STAGE 3</text>
        <text x="765" y="210" textAnchor="middle" className="diag-text">Mature wired neuron</text>
        <text x="765" y="228" textAnchor="middle" className="diag-sub">synapses · myelin · NeuN⁺</text>
      </g>

      {/* forward arrows */}
      <line x1="285" y1="160" x2="330" y2="160" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#arrow)" />
      <line x1="590" y1="160" x2="635" y2="160" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#arrow)" />
      <text x="307" y="150" textAnchor="middle" className="diag-arrow-label">differentiate</text>
      <text x="612" y="150" textAnchor="middle" className="diag-arrow-label">wire up</text>

      {/* reversion arrow */}
      <path d="M765 270 C765 330, 155 330, 155 272" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="7 6" markerEnd="url(#arrowAmber)" />
      <rect x="330" y="308" width="260" height="44" rx="10" className="reversion-note" />
      <text x="460" y="326" textAnchor="middle" className="diag-rev-title">REVERSION (research frontier)</text>
      <text x="460" y="344" textAnchor="middle" className="diag-rev-sub">partial reprogramming (OSK) · BDNF · activity → youthful plasticity</text>

      <text x="460" y="388" textAnchor="middle" className="diag-foot">Nature runs left → right. Reversion toward Stage-1 youth is an active research area (partial reprogramming, neurogenesis) — not a home formula.</text>
    </svg>
  )
}

// ---------- Eukaryotic cell ----------
export function CellDiagram() {
  return (
    <svg viewBox="0 0 920 420" className="diagram-svg" role="img" aria-label="Eukaryotic cell anatomy">
      <text x="460" y="30" textAnchor="middle" className="diag-title">The Eukaryotic Cell — Biology\'s Chemical Factory</text>
      <ellipse cx="460" cy="225" rx="330" ry="160" fill="#0e2a24" stroke="#34d399" strokeWidth="3" />
      {/* nucleus */}
      <circle cx="460" cy="205" r="72" fill="#14532d" stroke="#34d399" strokeWidth="2.5" />
      <circle cx="460" cy="205" r="26" fill="#34d399" opacity="0.5" />
      <text x="460" y="209" textAnchor="middle" className="diag-label-strong">DNA</text>
      <text x="460" y="300" textAnchor="middle" className="diag-label">Nucleus</text>
      {/* mitochondria */}
      <g>
        <ellipse cx="240" cy="160" rx="52" ry="24" fill="#7c2d12" stroke="#fb923c" strokeWidth="2" />
        <path d="M200 160 q10 -12 20 0 q10 12 20 0 q10 -12 20 0" stroke="#fb923c" strokeWidth="2" fill="none" />
        <text x="240" y="212" textAnchor="middle" className="diag-label">Mitochondrion (ATP)</text>
      </g>
      <g>
        <ellipse cx="690" cy="140" rx="46" ry="20" fill="#7c2d12" stroke="#fb923c" strokeWidth="2" />
        <path d="M655 140 q9 -10 18 0 q9 10 18 0 q9 -10 18 0" stroke="#fb923c" strokeWidth="2" fill="none" />
        <text x="690" y="188" textAnchor="middle" className="diag-label">Mitochondrion</text>
      </g>
      {/* ER */}
      <path d="M560 250 q30 14 60 0 q30 -14 60 0 q30 14 60 0" stroke="#60a5fa" strokeWidth="4" fill="none" opacity="0.85" />
      <text x="665" y="285" textAnchor="middle" className="diag-label">Rough ER (ribosomes)</text>
      {/* ribosome dots */}
      {[[560, 244], [620, 258], [680, 244], [740, 258], [800, 244]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y - 8} r="4" fill="#93c5fd" />
      ))}
      {/* vesicles */}
      <circle cx="250" cy="300" r="14" fill="#a78bfa" opacity="0.8" />
      <circle cx="290" cy="318" r="10" fill="#a78bfa" opacity="0.6" />
      <text x="255" y="348" textAnchor="middle" className="diag-label">Vesicles (transport)</text>
      {/* membrane inset */}
      <g>
        <rect x="620" y="300" width="150" height="60" rx="8" fill="#0f172a" stroke="#334155" />
        <path d="M628 330 q8 -14 16 0 q8 14 16 0 q8 -14 16 0 q8 14 16 0 q8 -14 16 0 q8 14 16 0" stroke="#34d399" strokeWidth="3" fill="none" />
        <circle cx="690" cy="316" r="5" fill="#fbbf24" />
        <text x="695" y="353" textAnchor="middle" className="diag-sub">membrane + protein gate</text>
      </g>
      <text x="460" y="408" textAnchor="middle" className="diag-foot">DNA → RNA → protein → function: every part is a chemical reaction surface.</text>
    </svg>
  )
}

// ---------- Body map ----------
const ORGANS = [
  { x: 460, y: 78, label: 'Brain', note: '86B neurons' },
  { x: 460, y: 132, label: 'Lungs', note: '~70 m² exchange' },
  { x: 445, y: 168, label: 'Heart', note: '~5 L/min' },
  { x: 500, y: 185, label: 'Liver', note: '500+ reactions' },
  { x: 425, y: 205, label: 'Stomach', note: 'pH ~2' },
  { x: 505, y: 235, label: 'Kidneys', note: 'filter 180 L/day' },
  { x: 455, y: 250, label: 'Intestines', note: '9 m + microbiome' },
  { x: 380, y: 150, label: 'Nerves', note: 'up to 120 m/s' },
  { x: 540, y: 150, label: 'Muscles', note: 'ATP ratchets' }
]

export function BodyDiagram() {
  return (
    <svg viewBox="0 0 920 520" className="diagram-svg" role="img" aria-label="Human body systems map">
      <text x="460" y="28" textAnchor="middle" className="diag-title">The Human Body — A Guided Chemical Map</text>
      {/* silhouette */}
      <g className="body-silhouette">
        <circle cx="460" cy="55" r="26" />
        <path d="M460 82 L460 100 M460 100 L360 180 M460 100 L560 180 M460 100 L460 330 M460 330 L400 460 M460 330 L520 460" fill="none" stroke="#f472b6" strokeWidth="26" strokeLinecap="round" opacity="0.25" />
        <path d="M460 110 L415 130 L410 190 M460 110 L505 130 L510 190" fill="none" stroke="#f472b6" strokeWidth="30" strokeLinecap="round" opacity="0.45" />
        <rect x="415" y="105" width="90" height="145" rx="38" fill="#f472b6" opacity="0.3" />
      </g>
      {ORGANS.map((o, i) => (
        <g key={i} className="organ-marker">
          <circle cx={o.x} cy={o.y} r="7" fill="#fbbf24" />
          <circle cx={o.x} cy={o.y} r="13" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5" />
          <text x={o.x + (o.x < 460 ? -20 : 20)} y={o.y - 2} textAnchor={o.x < 460 ? 'end' : 'start'} className="diag-label-strong">{o.label}</text>
          <text x={o.x + (o.x < 460 ? -20 : 20)} y={o.y + 14} textAnchor={o.x < 460 ? 'end' : 'start'} className="diag-sub">{o.note}</text>
        </g>
      ))}
      {/* spine / nerve line */}
      <path d="M460 90 L460 325" stroke="#60a5fa" strokeWidth="3" strokeDasharray="2 6" />
      <text x="460" y="505" textAnchor="middle" className="diag-foot">Dashed blue: spinal cord & nerve trunk — the body\'s wiring. Hover any marker in a real browser; every organ page expands from here.</text>
    </svg>
  )
}

export function DiagramByName({ name }) {
  if (name === 'neuron-stages') return <NeuronStagesDiagram />
  if (name === 'cell') return <CellDiagram />
  if (name === 'body') return <BodyDiagram />
  return null
}

// ---------- Generating animation (the "demo" while a formula is built) ----------
export function GeneratingAnimation() {
  return (
    <div className="generating-anim" aria-label="Generating formula">
      <svg viewBox="0 0 200 140" width="180" height="126">
        <path d="M70 40 L70 60 M130 40 L130 60 M60 60 L60 70 Q60 78 70 78 L130 78 Q140 78 140 70 L140 60 L130 40 L70 40 Z" fill="none" stroke="#60a5fa" strokeWidth="4" strokeLinejoin="round" />
        <path d="M60 72 L140 72 L130 108 Q128 118 100 118 Q72 118 70 108 Z" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="3" />
        <path d="M62 92 L138 92" stroke="#3b82f6" strokeWidth="5" opacity="0.8" />
        <circle cx="88" cy="70" r="4" fill="#34d399">
          <animate attributeName="cy" values="70;66;70" dur="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="102" cy="68" r="5" fill="#fbbf24">
          <animate attributeName="cy" values="68;62;68" dur="0.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="116" cy="71" r="4" fill="#f472b6">
          <animate attributeName="cy" values="71;65;71" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <g>
          <circle cx="55" cy="30" r="6" fill="#34d399">
            <animateTransform attributeName="transform" type="rotate" from="0 100 60" to="360 100 60" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="145" cy="30" r="6" fill="#f472b6">
            <animateTransform attributeName="transform" type="rotate" from="360 100 60" to="0 100 60" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
      <div className="gen-text">
        <span>C</span><span>o</span><span>n</span><span>f</span><span>i</span><span>g</span><span>u</span><span>r</span><span>i</span><span>n</span><span>g</span>
        &nbsp;<span>m</span><span>o</span><span>l</span><span>e</span><span>c</span><span>u</span><span>l</span><span>a</span><span>r</span>
        &nbsp;<span>f</span><span>o</span><span>r</span><span>m</span><span>u</span><span>l</span><span>a</span><span>.</span><span>.</span><span>.</span>
      </div>
    </div>
  )
}
