// Headless render test: mounts the bundled app in happy-dom, walks every view,
// and asserts the Formula Studio engine returns sensible cards.
import { Window } from 'happy-dom'

const win = new Window({ url: 'http://localhost/' })
global.window = win
global.document = win.document
// happy-dom starts with an empty document — build the mount point first
const rootEl = win.document.createElement('div')
rootEl.id = 'root'
win.document.body.appendChild(rootEl)
global.navigator = win.navigator
global.localStorage = win.localStorage
global.CustomEvent = win.CustomEvent
global.Event = win.Event
global.HTMLElement = win.HTMLElement
global.requestAnimationFrame = (cb) => setTimeout(cb, 0)
global.cancelAnimationFrame = clearTimeout
win.scrollTo = () => {}

let failures = 0
const check = (name, cond) => {
  console.log(`${cond ? 'PASS' : 'FAIL'} — ${name}`)
  if (!cond) failures++
}

// ---- import the bundle (mounts React app into #root) ----
await import('../dist-test/app.js')
await new Promise((r) => setTimeout(r, 400))

// ---- 1. Home view rendered ----
check('App mounts with hero', document.body.textContent.includes('Where Biology meets Chemistry'))

// ---- 2. Navigate through every sidebar view ----
const navButtons = [...document.querySelectorAll('.sidebar .nav-item')]
check('Sidebar has nav items', navButtons.length >= 9)

const viewsToTest = [
  ['Formula Studio', 'Body Profile'],
  ['3-D Models', 'DNA Double Helix'],
  ['Gallery', 'not connected yet'],
  ['Settings', 'AI Tutor'],
  ['Biology', 'Unit of Life'],
  ['Chemistry', 'Chemical Bonds'],
  ['Human Body', 'Maturation Stages'],
  ['Biotech & ChemTech', 'Copying DNA'],
  ['Fusion Lab', 'Willow Bark']
]
for (const [label, expectText] of viewsToTest) {
  const btn = navButtons.find((b) => b.textContent.trim().endsWith(label))
  if (!btn) { check(`navigate to ${label}`, false); continue }
  btn.click()
  await new Promise((r) => setTimeout(r, 250))
  check(`view "${label}" renders`, document.body.textContent.includes(expectText))
}

// ---- 3. Concept card expansion (Human Body -> neuron) ----
const humanBtn = navButtons.find((b) => b.textContent.trim().endsWith('Human Body'))
humanBtn.click()
await new Promise((r) => setTimeout(r, 200))
const neuronCard = [...document.querySelectorAll('.concept-card')].find((c) => c.textContent.includes('Neuron'))
check('Neuron concept card present', Boolean(neuronCard))
neuronCard.querySelector('.cc-head').click()
await new Promise((r) => setTimeout(r, 200))
check('Neuron card expands with stages', document.body.textContent.includes('STAGE 1'))
check('Neuron diagram rendered (SVG)', Boolean(document.querySelector('.diagram-svg')))

// ---- 4. Formula Studio engine (direct, logic-level) ----
const { generateCard } = await import('../src/lib/engine.js')

const t1 = generateCard('how can a neuron in its last stage go back to the first stage', { age: 28, sex: 'male', weightKg: 72, heightCm: 175 })
check('Engine: neuron query matches neuron-maturation', t1?.id === 'neuron-maturation' && t1.mechanism.length >= 4)

const t2 = generateCard('generate a hybrid formula for tiger and horse', { age: 30, sex: 'female', weightKg: 60, heightCm: 165 })
check('Engine: tiger x horse hybrid card', t2?.id === 'hybrid-tiger-horse' && t2.formula.includes('64'))

const t3 = generateCard('how do kidneys filter blood', {})
check('Engine: kidney query', t3?.id === 'kidneys')

const t4 = generateCard('what chemical formula makes plants produce oxygen', {})
check('Engine: photosynthesis query', t4?.id === 'photosynthesis')

const t5 = generateCard('zzz qqq completely unknown', {})
check('Engine: graceful no-match', t5?.matched === false)

const t6 = generateCard('neuron', { age: 65, sex: 'male', weightKg: 80, heightCm: 170 })
check('Engine: profile lines included', Array.isArray(t6.profileLines) && t6.profileLines.length === 3)

// ---- 5. Studio UI flow ----
const studioBtn = navButtons.find((b) => b.textContent.trim().endsWith('Formula Studio'))
studioBtn.click()
await new Promise((r) => setTimeout(r, 200))
const input = document.querySelector('.chat-input input')
check('Studio input exists', Boolean(input))

// React controlled inputs need the native setter to bypass the value tracker
const nativeSetter = Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, 'value')?.set
if (nativeSetter) nativeSetter.call(input, 'how can a neuron go back to its first stage')
else input.value = 'how can a neuron go back to its first stage'
input.dispatchEvent(new win.Event('input', { bubbles: true }))
await new Promise((r) => setTimeout(r, 100))
document.querySelector('.chat-input .btn-primary').click()
await new Promise((r) => setTimeout(r, 2200))
check('Studio generates a formula card', Boolean(document.querySelector('.formula-card')))
check('Card shows the formula block', document.body.textContent.includes('THE FORMULA'))

console.log(failures === 0 ? '\nALL TESTS PASSED' : `\n${failures} TEST(S) FAILED`)
process.exit(failures === 0 ? 0 : 1)
