// The Formula Studio engine — matches a user's query against the knowledge
// base, adds body-profile context, and produces a structured "formula card".
// Works fully offline. (An optional AI Tutor mode lives in Settings.)
import { ALL_ENTRIES, SECTIONS } from '../data/index.js'

const ANIMALS = {
  tiger: 38, lion: 38, horse: 64, donkey: 62, zebra: 46, cow: 60,
  dog: 78, cat: 38, wolf: 78, fox: 34, pig: 38, sheep: 54, goat: 60,
  deer: 70, mouse: 40, rat: 42, rabbit: 44, chicken: 78, human: 46,
  giraffe: 62, elephant: 56, dolphin: 44, whale: 44, bear: 74, leopard: 38,
  jaguar: 38, cheetah: 38, camel: 70, kangaroo: 16, platypus: 52, rhino: 82,
  buffalo: 60, bison: 60, yak: 60, hippo: 36, gorilla: 48, chimpanzee: 48
}

const REAL_HYBRIDS = {
  'lion+tiger': 'liger (or tigon)',
  'tiger+lion': 'liger (or tigon)',
  'horse+donkey': 'mule (or hinny)',
  'donkey+horse': 'mule (or hinny)',
  'horse+zebra': 'zorse',
  'zebra+horse': 'zorse',
  'dolphin+whale': 'wholphin',
  'cow+buffalo': 'beefalo',
  'lion+leopard': 'leopon',
  'tiger+leopard': 'tigard'
}

const STOPWORDS = new Set(('a an the of in on to for and or is are was were be been with about how what which that this it its into from can could would should i me my we you your want need make made create build design convert change turn generate give show explain tell about new different hybrid cross breed between').split(' '))

function tokenize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s×x+\-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t))
}

function scoreEntry(entry, tokens) {
  const haystack = [
    entry.title.toLowerCase(),
    entry.summary.toLowerCase(),
    ...entry.tags,
    entry.whereItWorks.toLowerCase()
  ].join(' ')
  let score = 0
  for (const tok of tokens) {
    if (entry.tags.some((t) => t === tok)) score += 6
    else if (entry.tags.some((t) => t.includes(tok) || tok.includes(t))) score += 3
    else if (entry.title.toLowerCase().includes(tok)) score += 4
    else if (haystack.includes(tok)) score += 1
  }
  return score
}

// ---------- Body-profile derived educational estimates ----------
export function profileFacts(profile) {
  const p = {
    age: Number(profile.age) || 30,
    weightKg: Number(profile.weightKg) || 70,
    heightCm: Number(profile.heightCm) || 170,
    sex: profile.sex || 'unspecified'
  }
  const bmi = p.weightKg / Math.pow(p.heightCm / 100, 2)
  const waterPct = p.age < 18 ? 65 : p.age > 65 ? 50 : 60
  const bmr =
    p.sex === 'female'
      ? 10 * p.weightKg + 6.25 * p.heightCm - 5 * p.age - 161
      : p.sex === 'male'
        ? 10 * p.weightKg + 6.25 * p.heightCm - 5 * p.age + 5
        : 10 * p.weightKg + 6.25 * p.heightCm - 5 * p.age - 78
  return {
    ...p,
    bmi: Math.round(bmi * 10) / 10,
    bodyWaterL: Math.round(((waterPct / 100) * p.weightKg) * 10) / 10,
    bloodVolumeL: Math.round(0.07 * p.weightKg * 10) / 10,
    maxHeartRate: 220 - p.age,
    bmr: Math.round(bmr),
    neurons: '≈ 86 billion (brain) + ~500 million (gut enteric nervous system)',
    brainMassKg: 1.3,
    cellCount: '≈ 30 trillion human cells + ~38 trillion microbial partners'
  }
}

function profileContext(facts, entry) {
  const lines = [
    `Modelled for a ${facts.age}-year-old, ${facts.weightKg} kg, ${facts.heightCm} cm profile (BMI ${facts.bmi}).`,
    `Body water ≈ ${facts.bodyWaterL} L — this is the solvent every reaction below runs in. Blood volume ≈ ${facts.bloodVolumeL} L, so any molecule entering the bloodstream is distributed through roughly ${facts.bloodVolumeL} L before clearance.`,
    `Resting metabolism ≈ ${facts.bmr} kcal/day; maximum heart rate ≈ ${facts.maxHeartRate} bpm. Brain mass ≈ ${facts.brainMassKg} kg with ${facts.neurons}.`
  ]
  return lines
}

// ---------- Hybrid analysis ----------
function detectHybridQuery(query) {
  const q = query.toLowerCase()
  if (!/(hybrid|cross|breed|mix|combine|interbre|inter-spec|interspec)/.test(q)) return null
  const found = Object.keys(ANIMALS).filter((a) => new RegExp(`\\b${a}s?\\b`).test(q))
  if (found.length < 2) return null
  return { a: found[0], b: found[1] }
}

function hybridCard({ a, b }, profile) {
  const chromA = ANIMALS[a]
  const chromB = ANIMALS[b]
  const key = [a, b].sort().join('+')
  const realName = REAL_HYBRIDS[key]
  const sameCount = chromA === chromB
  const close = Math.abs(chromA - chromB) <= 2
  const verdict = sameCount
    ? 'Chromosome counts match — laboratory hybridization may be biologically conceivable, though it depends on whole-genome compatibility.'
    : close
      ? 'Chromosome counts are close — like the horse (64) × donkey (62) that makes a mule: possible, but offspring are usually sterile.'
      : 'Chromosome counts differ too much — the genomes cannot pair at meiosis. No chemical formula can force this cross; it fails at the level of genome architecture itself.'
  const facts = profileFacts(profile)
  return {
    id: `hybrid-${a}-${b}`,
    title: `Hybrid Analysis: ${capitalize(a)} × ${capitalize(b)}`,
    section: 'biology',
    matched: true,
    summary: `A chromosome-level compatibility analysis of a ${a} × ${b} cross — the honest biology of what can and cannot happen, and why.`,
    formula: `${capitalize(a)} (2n=${chromA}) × ${capitalize(b)} (2n=${chromB}) → ${sameCount || close ? 'theoretically possible pairing' : 'non-viable pairing'}`,
    formulaType: 'concept',
    mechanism: [
      `Chromosome check: ${capitalize(a)} carries ${chromA} chromosomes, ${capitalize(b)} carries ${chromB}.`,
      `Fertilization requires every paternal chromosome to find its maternal homologue during cell division. ${capitalize(verdict)}`,
      realName
        ? `This particular pair has a real-world precedent: the ${realName.split(' ')[0]} (${realName}). Hybrids like these are usually sterile because their mixed chromosome set cannot produce balanced eggs or sperm.`
        : `No natural hybrid of this pair is known — crosses between distant species almost always fail during early embryonic development.`,
      'Speciation is exactly this: genomes drifting apart until they no longer recognize each other. Chromosome number is a symptom; the underlying barrier is millions of accumulated DNA differences.',
      'What science does instead when it wants traits from two species: it transfers individual genes (genetic engineering — this is how bacteria manufacture human insulin) rather than whole genomes.'
    ],
    whereItWorks: 'Reproductive biology: fertilization, meiosis, early embryonic development.',
    problem: 'The dream of mixing two animals\' traits runs into the fact that a genome is one interdependent system, not a parts bin.',
    solution: `For ${a}- and ${b}-like traits: (1) study natural hybrids to understand what genomes allow, (2) selective breeding within each species, (3) targeted gene transfer for single traits — all established science; whole-genome chimera creation is neither possible nor ethically sanctioned.`,
    applications: ['Mule & liger biology (why hybrids are sterile)', 'Hybrid crops in agriculture', 'Conservation genetics', 'GMO protein production'],
    safety: 'Answered educationally. Deliberately creating hybrid animals raises serious welfare and legal issues — most countries prohibit it outside licensed research.',
    tags: ['hybrid', a, b],
    profileLines: profileContext(facts),
    diagram: null,
    model3d: null
  }
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// ---------- Main generate ----------
export function generateCard(query, profile) {
  const hybrid = detectHybridQuery(query)
  if (hybrid) return hybridCard(hybrid, profile)

  const tokens = tokenize(query)
  if (tokens.length === 0) return null

  const scored = ALL_ENTRIES.map((e) => ({ e, s: scoreEntry(e, tokens) })).sort((a, b) => b.s - a.s)
  const best = scored[0]
  if (!best || best.s < 3) {
    return {
      id: 'no-match',
      matched: false,
      title: 'No close match found',
      summary: `I could not match "${query}" confidently to the built-in knowledge base. Try one of the topics below, or switch on AI Tutor mode in Settings for open-ended questions.`,
      suggestions: ALL_ENTRIES.map((e) => e.title).slice(0, 12)
    }
  }

  const entry = best.e
  const facts = profileFacts(profile)
  const section = SECTIONS.find((s) => s.id === entry.section)
  const related = scored
    .slice(1, 4)
    .filter((x) => x.s > 2)
    .map((x) => x.e.title)

  return {
    ...entry,
    matched: true,
    profileLines: profileContext(facts, entry),
    sectionName: section ? section.name : 'General',
    related
  }
}

export const EXAMPLE_QUERIES = [
  'How can a neuron in its last stage go back to the first stage?',
  'Generate a hybrid formula for tiger and horse',
  'How does the body convert glucose into energy?',
  'What chemical formula makes plants produce oxygen?',
  'How do mRNA vaccines deliver their instructions?',
  'Explain how aspirin stops pain',
  'How do kidneys filter blood?',
  'What is the chemistry of mood and dopamine?'
]
