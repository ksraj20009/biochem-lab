import { biologyEntries } from './biology.js'
import { chemistryEntries } from './chemistry.js'
import { bodyEntries } from './body.js'
import { techEntries } from './tech.js'
import { fusionEntries } from './fusion.js'

export const SECTIONS = [
  {
    id: 'biology',
    name: 'Biology',
    subtitle: 'All life — cells, microbes, animals, plants, genetics',
    icon: '🧬',
    accent: '#34d399',
    blurb: 'From bacteria to blue whales: how life is built, how it copies itself, and how one species becomes two.'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    subtitle: 'Formulas, reactions, and the molecular world',
    icon: '⚗️',
    accent: '#60a5fa',
    blurb: 'Bonds, pH, redox, organic chemistry — the rules that molecules follow, inside and outside the body.'
  },
  {
    id: 'body',
    name: 'Human Body',
    subtitle: 'Head to toe — organs, nerves, neurons, every part',
    icon: '🫀',
    accent: '#f472b6',
    blurb: 'Every system explained: brain and neurons, heart and blood, lungs, digestion, kidneys, immunity, hormones, skin.'
  },
  {
    id: 'tech',
    name: 'Biotech & ChemTech',
    subtitle: 'Engineering with life and molecules',
    icon: '🔧',
    accent: '#fbbf24',
    blurb: 'PCR, CRISPR, fermentation, enzymes, bioreactors, green chemistry and the drug pipeline.'
  },
  {
    id: 'fusion',
    name: 'Fusion Lab',
    subtitle: 'Where biology × chemistry gets interesting',
    icon: '🧪',
    accent: '#a78bfa',
    blurb: 'The intersection: medicines, neurotransmitters, biomaterials, vaccines — real cases of chemistry answering biological questions.'
  }
]

export const ALL_ENTRIES = [
  ...biologyEntries,
  ...chemistryEntries,
  ...bodyEntries,
  ...techEntries,
  ...fusionEntries
]

export function entriesFor(sectionId) {
  return ALL_ENTRIES.filter((e) => e.section === sectionId)
}

export function entryById(id) {
  return ALL_ENTRIES.find((e) => e.id === id)
}
