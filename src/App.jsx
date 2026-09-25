import React, { useState } from 'react'
import { Nav, MobileNav } from './components/Nav.jsx'
import Home from './components/Home.jsx'
import SectionView from './components/SectionView.jsx'
import FormulaStudio from './components/FormulaStudio.jsx'
import Models3D from './components/Models3D.jsx'
import Gallery from './components/Gallery.jsx'
import Settings from './components/Settings.jsx'
import { SECTIONS } from './data/index.js'

export default function App() {
  const [view, setView] = useState('home')

  function navigate(target) {
    setView(target)
    window.scrollTo({ top: 0 })
  }

  function openModel(modelKey) {
    navigate('models')
    // Models3D reads its initial state on mount; pass selection via hash of state
    window.dispatchEvent(new CustomEvent('biochem:select-model', { detail: modelKey }))
  }

  let body
  if (view === 'home') body = <Home onNavigate={navigate} />
  else if (view === 'studio') body = <FormulaStudio />
  else if (view === 'models') body = <Models3D />
  else if (view === 'gallery') body = <Gallery />
  else if (view === 'settings') body = <Settings />
  else if (view.startsWith('section:')) {
    body = (
      <SectionView
        sectionId={view.split(':')[1]}
        onOpenModel={openModel}
        onGoStudio={() => navigate('studio')}
      />
    )
  }

  return (
    <div className="app-shell">
      <Nav current={view} onNavigate={navigate} sections={SECTIONS} />
      <MobileNav current={view} onNavigate={navigate} sections={SECTIONS} />
      <main className="main">{body}</main>
      <footer className="app-footer">
        BioChem Lab — an educational project. Not medical or professional advice. Built with React, Three.js and Supabase.
      </footer>
    </div>
  )
}
