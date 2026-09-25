// Fusion — the intersection where chemistry meets biology.
export const fusionEntries = [
  {
    id: 'aspirin',
    title: 'Aspirin — From Willow Bark to Molecule',
    section: 'fusion',
    icon: '💊',
    summary: 'Hippocrates\'s willow-bark remedy became a pure molecule (acetylsalicylic acid) and then a mechanism: it permanently acetylates the COX enzyme, silencing prostaglandin signals.',
    formula: 'C₉H₈O₄ (acetylsalicylic acid) · COX-1 acetylation (irreversible) → ↓ prostaglandins → ↓ pain/inflammation',
    formulaType: 'chemical',
    mechanism: [
      'Willow bark (salicin) relieved pain for millennia; chemistry isolated and improved it (acetyl group → aspirin, 1897).',
      'Aspirin transfers its acetyl group onto a serine amino acid inside the COX enzyme — permanently switching it off.',
      'COX makes prostaglandins (pain/inflammation signals); without it, the alarm is never sounded.',
      'Platelets cannot regenerate COX (no nuclei) — a single 75 mg dose suppresses clotting for the platelets\' whole ~10-day life: the basis of low-dose aspirin therapy.'
    ],
    whereItWorks: 'Everywhere prostaglandins are made — injured tissue, uterus, blood platelets.',
    problem: 'Pain and inflammation are chemical signals; how to mute them without numbing the whole body?',
    solution: 'A small molecule that fits one enzyme\'s active site and locks it — chemistry solving a biological problem.',
    applications: ['Pain relief', 'Heart-attack and stroke prevention (anti-platelet)', 'Cancer-chemoprevention research', 'Textbook of medicinal chemistry'],
    safety: 'Educational. Aspirin is a real medicine with real risks (stomach bleeding, Reye\'s syndrome in children) — use only as a doctor directs.',
    tags: ['aspirin', 'pain', 'inflammation', 'prostaglandin', 'cox', 'willow', 'medicine', 'drug', 'nsaid'],
    diagram: null,
    model3d: 'molecule'
  },
  {
    id: 'neurotransmitter-chemistry',
    title: 'Neurotransmitter Chemistry — Molecules of Mood',
    section: 'fusion',
    icon: '🎭',
    summary: 'Thoughts and feelings are molecules crossing 20-nanometre gaps. Dopamine (reward), serotonin (mood), GABA (calm), glutamate (excitation) — and how medicines tune them.',
    formula: 'L-tyrosine → L-DOPA → dopamine → noradrenaline · L-tryptophan → serotonin',
    formulaType: 'chemical',
    mechanism: [
      'An action potential opens Ca²⁺ channels; vesicles fuse and dump neurotransmitter into the synaptic cleft.',
      'Molecules diffuse ~20 nm and bind receptors on the next neuron — lock and key at molecular scale.',
      'Reuptake pumps recycle the transmitter (SSRI antidepressants block serotonin\'s pump, prolonging the signal).',
      'Synthesis is dietary: tryptophan and tyrosine are amino acids from food; enzymes in the neurons build them up step by step.'
    ],
    whereItWorks: 'Brain synapses (~100 trillion), neuromuscular junctions, gut (95% of your serotonin is in the intestine).',
    problem: 'How do you make a feeling out of chemistry — and fix it when the chemistry drifts?',
    solution: 'Pathways, pumps and receptors — tunable at each step, which is where psychiatry\'s medicines act.',
    applications: ['Antidepressants (SSRIs)', 'Parkinson\'s therapy (L-DOPA)', 'Anaesthesia research', 'Psychedelic medicine trials'],
    safety: 'Educational. Brain chemistry is delicate — never self-adjust with drugs; psychiatric medication needs a physician.',
    tags: ['neurotransmitter', 'dopamine', 'serotonin', 'mood', 'ssri', 'gaba', 'glutamate', 'synapse', 'brain chemistry', 'depression'],
    diagram: null,
    model3d: null
  },
  {
    id: 'antibiotics',
    title: 'Antibiotics — Molecules vs Microbes',
    section: 'fusion',
    icon: '🧪',
    summary: 'Penicillin from a mould kills bacteria by jamming their cell-wall machinery — exploiting a difference between bacterial and human cells that nature handed us by accident.',
    formula: 'Penicillin: β-lactam ring → blocks peptidoglycan cross-linking → wall weakens → bacteria burst',
    formulaType: 'chemical',
    mechanism: [
      'Fleming noticed mould juice dissolving staphylococcus (1928); Florey & Chain purified and scaled it.',
      'The β-lactam ring mimics the peptide the wall enzyme normally links; the enzyme locks onto it and is disabled.',
      'Human cells have no cell wall — hence the selectivity: poison the bacterium, spare the patient.',
      'Resistance evolves: bacteria make β-lactamase (an enzyme that cuts the ring) — the molecular arms race continues.'
    ],
    whereItWorks: 'Bacterial cell walls; hospitals; agriculture (where overuse breeds resistance).',
    problem: 'How to kill a microbe inside a person without killing the person?',
    solution: 'Exploit target differences (walls, 70S ribosomes, folate synthesis) — selective toxicity, the core idea of antimicrobial medicine.',
    applications: ['Penicillins & cephalosporins', 'Surgery and chemotherapy safety', 'Phage therapy revival', 'Resistance surveillance'],
    safety: 'Educational. Antibiotic misuse breeds resistance — take them only as prescribed; never self-medicate.',
    tags: ['antibiotic', 'penicillin', 'resistance', 'bacteria', 'fleming', 'infection', 'beta lactam', 'amr'],
    diagram: null,
    model3d: 'molecule'
  },
  {
    id: 'anesthesia',
    title: 'Anaesthesia — Turning Off Consciousness, Safely',
    section: 'fusion',
    icon: '😴',
    summary: 'We still do not fully know how anaesthetics work — but they dissolve into nerve membranes and toggle the proteins that keep circuits firing in synchrony.',
    formula: 'Potency ∝ lipid solubility (Meyer–Overton correlation) — the classic mystery of anaesthesia',
    formulaType: 'concept',
    mechanism: [
      'Inhaled anaesthetics dissolve into the lipid membrane of neurons.',
      'There they boost inhibitory (GABA) signalling and dampen excitatory channels — circuits lose their synchrony.',
      'Pain signals stop reaching the thalamus; consciousness fails to integrate; memory stops recording.',
      'Modern practice balances 3 drugs: a hypnotic (asleep), an analgesic (no pain), and a muscle relaxant — each at a fraction of a toxic dose.'
    ],
    whereItWorks: 'Brain networks, spinal pain gates, nerve membranes throughout the body.',
    problem: 'How to suspend consciousness reversibly without stopping breathing or the heart?',
    solution: 'Selective circuit dampening at sub-toxic doses, with continuous monitoring — applied pharmacology.',
    applications: ['Modern surgery', 'ICU sedation', 'Veterinary medicine', 'Consciousness research'],
    safety: 'Educational. Anaesthesia is administered only by trained anaesthesiologists.',
    tags: ['anesthesia', 'anaesthesia', 'consciousness', 'surgery', 'gaba', 'sedation', 'pain'],
    diagram: null,
    model3d: null
  },
  {
    id: 'biomaterials',
    title: 'Biomaterials — Chemistry the Body Accepts',
    section: 'fusion',
    icon: '🦾',
    summary: 'Titanium that bone welds to, polymers that dissolve as they heal, heart-valve tissue grown on scaffolds — materials engineered to live inside you.',
    formula: 'e.g., PLA hydrolysis: –(C₃H₄O₂)ₙ– + n H₂O → n lactic acid (metabolized away)',
    formulaType: 'chemical',
    mechanism: [
      'Biocompatibility: the surface must not trigger immune attack or blood clotting (protein-adsorption design).',
      'Osseointegration: bone cells grow onto micro-rough titanium — implants become part of the skeleton.',
      'Bioresorption: PLA/PGA sutures hydrolyze slowly into lactic/glycolic acid (normal metabolites) and vanish.',
      'Tissue engineering: polymer scaffolds shaped like the target organ guide cells to rebuild it.'
    ],
    whereItWorks: 'Dental implants, hip replacements, dissolvable stitches, stent coatings, artificial hearts.',
    problem: 'The body treats every foreign material as debris — how to make it welcome?',
    solution: 'Surface chemistry + degradation timing + cell-guiding architecture: materials designed to be adopted, not rejected.',
    applications: ['Joint replacement', 'Dissolvable stents', 'Corneal and skin grafts', 'Nerve-guidance channels'],
    safety: 'Educational overview; all implants are regulated medical devices.',
    tags: ['biomaterial', 'implant', 'titanium', 'pla', 'suture', 'tissue engineering', 'scaffold', 'prosthesis'],
    diagram: null,
    model3d: null
  },
  {
    id: 'nutrition-science',
    title: 'Nutrition Science — Eating as Chemistry',
    section: 'fusion',
    icon: '🥗',
    summary: 'Macros (carbs, fat, protein) are fuel and parts; micros (vitamins, minerals) are enzyme cofactors. Everything you eat becomes molecules your body decides to burn, build or store.',
    formula: '4 kcal/g (carb, protein) · 9 kcal/g (fat) · 7 kcal/g (alcohol)',
    formulaType: 'equation',
    mechanism: [
      'Digestion hydrolyzes food polymers to monomers; the liver routes them (glycogen store, fat store, burn now).',
      'Vitamins are cofactors: vitamin C keeps collagen enzymes working; B vitamins shuttle electrons in metabolism.',
      'Minerals are structural and electrical: calcium (bone), iron (hemoglobin), sodium/potassium (nerve impulses).',
      'Excess energy is stored as fat (~9 kcal/g — the most compact battery biology has).'
    ],
    whereItWorks: 'The entire digestive and metabolic system.',
    problem: 'Food is the body\'s only input — the wrong mixture means slow failure (deficiency diseases, obesity, diabetes).',
    solution: 'Nutritional chemistry maps needs to sources; fortification (iodized salt, folate in flour) has prevented millions of deficiency diseases.',
    applications: ['Dietary guidelines', 'Sports nutrition', 'Clinical dietetics', 'Food fortification policy'],
    safety: 'Educational; for personal diet plans consult a registered dietitian.',
    tags: ['nutrition', 'calorie', 'vitamin', 'mineral', 'macro', 'diet', 'protein', 'fat', 'carbohydrate', 'metabolism'],
    diagram: null,
    model3d: null
  },
  {
    id: 'mrna-vaccines',
    title: 'mRNA Vaccines — Software for Cells',
    section: 'fusion',
    icon: '💉',
    summary: 'Decades of lipid chemistry plus a pandemic: a strand of mRNA wrapped in a fat nanoparticle, teaching cells to build the spike protein for a day — enough for lifelong immune memory.',
    formula: 'mRNA (coding spike) + lipid nanoparticle → cell makes antigen → immune memory',
    formulaType: 'process',
    mechanism: [
      'The mRNA sequence is designed in software; nucleosides are modified so the immune system does not shred it on arrival.',
      'Lipid nanoparticles fuse with cell membranes (pH-triggered) and release mRNA into the cytoplasm.',
      'Ribosomes translate it into spike protein; the protein is displayed, mRNA degrades within days.',
      'The immune system sees the antigen, builds antibodies + memory cells — protection without ever meeting the pathogen.'
    ],
    whereItWorks: 'Muscle (injection site) → draining lymph nodes → immune memory.',
    problem: 'How to deliver fragile, short-lived mRNA into cells without the immune system destroying it first?',
    solution: 'Ionizable lipids that are neutral in blood but positively charged in the endosome — chemistry that releases cargo exactly on target.',
    applications: ['COVID-19 vaccines', 'Cancer-vaccine trials', 'Rare-disease protein replacement', 'Rapid pandemic response'],
    safety: 'Educational overview; vaccines go through full clinical trials.',
    tags: ['mrna', 'vaccine', 'nanoparticle', 'covid', 'lipid', 'immune', 'biotechnology', 'moderna', 'pfizer'],
    diagram: null,
    model3d: null
  }
]
