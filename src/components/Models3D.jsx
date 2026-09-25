import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// Interactive 3-D model viewer: a DNA double helix and a neuron.
// Drag to rotate, scroll/pinch to zoom. Auto-rotates when idle.
function buildDNA(scene) {
  const group = new THREE.Group()
  const majorRadius = 1.1
  const height = 7
  const turns = 3.2

  const makeSphere = (color) => new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 20, 20),
    new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.15 })
  )
  const backboneMatA = new THREE.MeshStandardMaterial({ color: 0x34d399, roughness: 0.4 })
  const backboneMatB = new THREE.MeshStandardMaterial({ color: 0x60a5fa, roughness: 0.4 })
  const baseMats = {
    A: new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.4 }),
    T: new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.4 }),
    G: new THREE.MeshStandardMaterial({ color: 0xa78bfa, roughness: 0.4 }),
    C: new THREE.MeshStandardMaterial({ color: 0x93c5fd, roughness: 0.4 })
  }
  const pairs = [['A', 'T'], ['G', 'C'], ['T', 'A'], ['C', 'G']]

  const steps = 140
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const angle = t * turns * Math.PI * 2
    const y = (t - 0.5) * height

    // backbones as small spheres
    const ax = Math.cos(angle) * majorRadius
    const az = Math.sin(angle) * majorRadius
    const bx = Math.cos(angle + Math.PI) * majorRadius
    const bz = Math.sin(angle + Math.PI) * majorRadius

    const sA = makeSphere(0x34d399)
    sA.position.set(ax, y, az)
    group.add(sA)
    const sB = makeSphere(0x60a5fa)
    sB.position.set(bx, y, bz)
    group.add(sB)

    // base pairs (rungs) every few steps
    if (i % 5 === 0) {
      const [b1, b2] = pairs[Math.floor(i / 5) % pairs.length]
      const rung = new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.055, majorRadius * 2 - 0.44, 10),
        baseMats[b1]
      )
      rung.rotation.z = Math.PI / 2
      rung.rotation.y = -angle
      rung.position.set((ax + bx) / 2, y, (az + bz) / 2)
      group.add(rung)
    }
  }

  // two glowing backbone tubes
  const curveA = new THREE.CatmullRomCurve3(
    Array.from({ length: 90 }, (_, i) => {
      const t = i / 89
      const angle = t * turns * Math.PI * 2
      return new THREE.Vector3(Math.cos(angle) * majorRadius, (t - 0.5) * height, Math.sin(angle) * majorRadius)
    })
  )
  const tubeA = new THREE.Mesh(new THREE.TubeGeometry(curveA, 200, 0.07, 8), backboneMatA)
  const curveB = new THREE.CatmullRomCurve3(
    Array.from({ length: 90 }, (_, i) => {
      const t = i / 89
      const angle = t * turns * Math.PI * 2 + Math.PI
      return new THREE.Vector3(Math.cos(angle) * majorRadius, (t - 0.5) * height, Math.sin(angle) * majorRadius)
    })
  )
  const tubeB = new THREE.Mesh(new THREE.TubeGeometry(curveB, 200, 0.07, 8), backboneMatB)
  group.add(tubeA, tubeB)
  scene.add(group)
  return group
}

function buildNeuron(scene) {
  const group = new THREE.Group()
  const pink = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.45 })
  const amber = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.5 })

  // soma
  const soma = new THREE.Mesh(new THREE.SphereGeometry(0.9, 32, 32), pink)
  group.add(soma)

  // dendrites — branching lines
  const dendrite = (dir) => {
    const points = [new THREE.Vector3(0, 0, 0)]
    let p = new THREE.Vector3(0, 0, 0)
    let d = dir.clone().normalize()
    for (let i = 0; i < 6; i++) {
      p = p.clone().addScaledVector(d, 0.45)
      d.applyAxisAngle(new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(), 0.5)
      points.push(p.clone())
    }
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: 0xf9a8d4 })
    )
    group.add(line)
  }
  for (let i = 0; i < 9; i++) {
    dendrite(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5 + 0.6, Math.random() - 0.5))
  }

  // axon + myelin segments
  const axon = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 7, 16), pink)
  axon.rotation.z = Math.PI / 2
  axon.position.x = 3.5
  group.add(axon)
  for (let i = 0; i < 8; i++) {
    const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.55, 16), amber)
    seg.rotation.z = Math.PI / 2
    seg.position.set(0.9 + i * 0.82, 0, 0)
    group.add(seg)
  }

  // terminals
  for (let i = 0; i < 5; i++) {
    const t = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), pink)
    t.position.set(7.2, (i - 2) * 0.35, (i - 2) * 0.18)
    group.add(t)
  }

  group.position.x = -2.5
  scene.add(group)
  return group
}

export default function Models3D() {
  const mountRef = useRef(null)
  const [model, setModel] = useState('dna')
  const [webglError, setWebglError] = useState(false)
  const stateRef = useRef({})

  useEffect(() => {
    const onSelect = (e) => {
      if (e.detail === 'dna' || e.detail === 'neuron') setModel(e.detail)
    }
    window.addEventListener('biochem:select-model', onSelect)
    return () => window.removeEventListener('biochem:select-model', onSelect)
  }, [])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth || 640
    const height = mount.clientHeight || 480

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true })
    } catch {
      setWebglError(true)
      return
    }
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0b1220)
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.set(0, 0, 13)

    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, 0.55))
    const key = new THREE.DirectionalLight(0xffffff, 1.1)
    key.position.set(5, 8, 6)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0x60a5fa, 0.5)
    rim.position.set(-6, -4, -6)
    scene.add(rim)

    const groups = { dna: buildDNA(scene), neuron: buildNeuron(scene) }
    groups.dna.visible = model === 'dna'
    groups.neuron.visible = model === 'neuron'

    // interaction: drag to rotate, wheel to zoom
    let dragging = false
    let lastX = 0
    let lastY = 0
    let velX = 0.004
    let velY = 0
    let autoRotate = true

    const onDown = (e) => {
      dragging = true
      autoRotate = false
      lastX = e.clientX
      lastY = e.clientY
    }
    const onMove = (e) => {
      if (!dragging) return
      velY = (e.clientX - lastX) * 0.005
      velX = (e.clientY - lastY) * 0.005
      lastX = e.clientX
      lastY = e.clientY
    }
    const onUp = () => {
      dragging = false
      setTimeout(() => { autoRotate = true }, 1500)
    }
    const onWheel = (e) => {
      e.preventDefault()
      camera.position.z = Math.min(24, Math.max(6, camera.position.z + e.deltaY * 0.01))
    }
    const el = renderer.domElement
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    el.addEventListener('wheel', onWheel, { passive: false })

    let raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      const g = groups[model]
      if (g) {
        if (autoRotate) g.rotation.y += 0.004
        else {
          g.rotation.y += velY
          g.rotation.x += velX
          velY *= 0.92
          velX *= 0.92
        }
      }
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight || 480
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    stateRef.current.toggle = (name) => {
      Object.entries(groups).forEach(([k, grp]) => (grp.visible = k === name))
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('wheel', onWheel)
      renderer.dispose()
      if (el.parentNode === mount) mount.removeChild(el)
    }
  }, [model])

  return (
    <div className="page models-page">
      <div className="page-head">
        <h1>3-D Models</h1>
        <p className="page-sub">Interactive molecular and cellular models — drag to rotate, scroll to zoom. These update live as you explore topics in the Formula Studio.</p>
      </div>
      <div className="model-controls">
        <button className={model === 'dna' ? 'chip chip-active' : 'chip'} onClick={() => setModel('dna')}>🧬 DNA Double Helix</button>
        <button className={model === 'neuron' ? 'chip chip-active' : 'chip'} onClick={() => setModel('neuron')}>⚡ Neuron (myelinated axon)</button>
      </div>
      <div className="model-mount" ref={mountRef} />
      {webglError && (
        <div className="model-legend">
          <strong>3-D view unavailable.</strong> Your browser or device blocked WebGL — the diagrams in each
          knowledge section still show the same structures in 2-D. Try a recent Chrome, Firefox or Edge to
          rotate the models interactively.
        </div>
      )}
      <div className="model-legend">
        {model === 'dna' ? (
          <p>The green and blue tubes are the sugar-phosphate backbones; the colored rungs are A-T and G-C base pairs held together by hydrogen bonds. Three billion of these rungs make a human genome.</p>
        ) : (
          <p>The pink sphere is the soma (cell body), branching lines are dendrites, and the amber beads are myelin segments — the insulation that lets signals jump up to 120 m/s. Terminals on the right release neurotransmitters.</p>
        )}
      </div>
    </div>
  )
}
