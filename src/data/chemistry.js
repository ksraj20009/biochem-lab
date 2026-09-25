// Chemistry — formulas, reactions, and the molecular world.
export const chemistryEntries = [
  {
    id: 'atoms-bonds',
    title: 'Atoms & Chemical Bonds',
    section: 'chemistry',
    icon: '⚛️',
    summary: 'All chemistry is electrons finding lower energy arrangements. Ionic bonds transfer electrons; covalent bonds share them; hydrogen bonds are the weak but vital glue of biology.',
    formula: 'H₂ (shared pair), Na⁺Cl⁻ (transferred electron), H₂O···H₂O (hydrogen bond, ~5% of covalent strength)',
    formulaType: 'concept',
    mechanism: [
      'Ionic bonds: a metal donates an electron to a non-metal; opposite charges stack into crystals (salt).',
      'Covalent bonds: atoms share electron pairs — strong, directional, the backbone of organic chemistry.',
      'Hydrogen bonds: a partially-positive H is attracted to a lone pair on O/N/F. Individually weak, collectively they hold water together and zip the DNA double helix.',
      'Shape + charge distribution = everything: a molecule\'s function in the body comes from its 3-D geometry.'
    ],
    whereItWorks: 'Everywhere — bonds are the entire subject of chemistry and the machinery of biology.',
    problem: 'How does matter stick together in exactly the arrangements that make water, DNA and proteins possible?',
    solution: 'Quantum mechanics of electron orbitals predicts which bonds form and their geometry (VSEPR); water\'s bent shape (104.5°) gives it life-enabling properties.',
    applications: ['Drug design (molecular fit)', 'Materials science', 'Understanding protein folding', 'Batteries and catalysis'],
    safety: 'Foundational, safe concept.',
    tags: ['atom', 'bond', 'ionic', 'covalent', 'hydrogen bond', 'electron', 'molecule', 'water'],
    diagram: null,
    model3d: 'molecule'
  },
  {
    id: 'acids-bases',
    title: 'Acids, Bases & pH',
    section: 'chemistry',
    icon: '🧪',
    summary: 'Acids donate protons (H⁺), bases accept them. Your blood holds pH 7.35–7.45 with buffers — drift by half a point is a medical emergency.',
    formula: 'pH = −log₁₀[H⁺]  ·  Henderson–Hasselbalch: pH = pKa + log([A⁻]/[HA])',
    formulaType: 'equation',
    mechanism: [
      'pH is logarithmic: pH 6 is 10× more acidic than pH 7.',
      'The blood buffer is CO₂/HCO₃⁻: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻. Lungs blow off CO₂, kidneys adjust HCO₃⁻.',
      'Enzymes each have a pH optimum (pepsin in stomach acid ~2, most cell enzymes ~7.4).',
      'Buffers resist change near their pKa — which is exactly where they are used.'
    ],
    whereItWorks: 'Blood, stomach, every cell; soil and oceans (CO₂ acidification); pharma formulations.',
    problem: 'Life is a narrow-pH phenomenon; metabolism constantly produces acid.',
    solution: 'Buffer systems (bicarbonate, phosphate, proteins) absorb or release H⁺ to hold pH steady — a chemical shock absorber.',
    applications: ['Blood-gas medicine', 'Antacid formulation', 'Soil treatment for crops', 'Ocean acidification research'],
    safety: 'Educational concept. Concentrated acids/bases are corrosive — this app teaches the chemistry without handling procedures.',
    tags: ['acid', 'base', 'ph', 'buffer', 'alkaline', 'henderson hasselbalch', 'bicarbonate'],
    diagram: null,
    model3d: null
  },
  {
    id: 'redox',
    title: 'Redox Reactions — Electron Economy',
    section: 'chemistry',
    icon: '🔄',
    summary: 'Oxidation is electron loss, reduction is gain (OIL RIG). Cellular respiration, batteries, rusting and photosynthesis are all redox chemistry.',
    formula: 'Oxidation: Fe → Fe²⁺ + 2e⁻ · Reduction: O₂ + 4e⁻ + 4H⁺ → 2H₂O',
    formulaType: 'equation',
    mechanism: [
      'Track oxidation numbers; whatever is oxidized loses electrons, whatever is reduced gains them.',
      'Energy is released when electrons fall toward more electronegative atoms (like O₂).',
      'Cells intercept that flow in small steps, storing it in NADH, then ATP.',
      'Antioxidants (vitamin C, E) are molecules that are oxidized easily, protecting your biomolecules.'
    ],
    whereItWorks: 'Mitochondria (respiration), chloroplasts (the reverse), batteries, metal corrosion, immune cells (oxidative burst against microbes).',
    problem: 'Uncontrolled electron flow = fire; too little = no energy.',
    solution: 'Stepwise electron transport chains harvest redox energy in controlled, harvestable increments.',
    applications: ['Metabolism medicine', 'Battery chemistry', 'Food preservation (antioxidants)', 'Water treatment'],
    safety: 'Foundational, safe concept.',
    tags: ['redox', 'oxidation', 'reduction', 'electron', 'rust', 'battery', 'antioxidant', 'nad'],
    diagram: null,
    model3d: null
  },
  {
    id: 'organic-chem',
    title: 'Organic Chemistry — The Chemistry of Life',
    section: 'chemistry',
    icon: '🧱',
    summary: 'Carbon\'s four bonds build chains and rings; functional groups (–OH, –COOH, –NH₂…) set reactivity. Biology is organic chemistry that copies itself.',
    formula: 'R–OH (alcohol) · R–COOH (acid) · R–NH₂ (amine) · R–CO–R (ketone)',
    formulaType: 'concept',
    mechanism: [
      'Carbon forms 4 stable covalent bonds — unmatched ability to build skeletons.',
      'Functional groups behave consistently: every –COOH is acidic, every –NH₂ is basic.',
      'Biochemistry is a handful of reactions repeated: nucleophilic attack, condensation (water out), hydrolysis (water in).',
      'Proteins, fats, sugars, DNA and most medicines are the same toolbox, differently assembled.'
    ],
    whereItWorks: 'Every living thing; every pharmaceutical lab on Earth.',
    problem: 'How do you build molecules with exactly the shape and reactivity you want?',
    solution: 'Retrosynthesis: design backwards from the target to commercially available starting materials; then build forwards with known, selective reactions.',
    applications: ['Pharmaceutical synthesis', 'Fragrances and dyes', 'Plastics and polymers', 'Agrochemicals'],
    safety: 'Educational concept. This app teaches how molecules are designed, not lab synthesis procedures for hazardous compounds.',
    tags: ['organic', 'carbon', 'functional group', 'synthesis', 'retrosynthesis', 'molecule', 'alcohol', 'ketone'],
    diagram: null,
    model3d: null
  },
  {
    id: 'water',
    title: 'Water — The Solvent of Life',
    section: 'chemistry',
    icon: '💧',
    summary: 'A bent, polar molecule with hydrogen bonds: high heat capacity, floating ice, powerful solvent. No water, no chemistry-as-we-know-it.',
    formula: 'H₂O · bond angle 104.5° · hydrogen-bond network',
    formulaType: 'concept',
    mechanism: [
      'Oxygen pulls electrons harder than hydrogen → the molecule is a dipole.',
      'Dipoles surround ions and polar molecules, dissolving them (salts, sugars, proteins).',
      'Hydrogen bonds absorb heat slowly → thermal buffering for cells and planets.',
      'Frozen water forms an open lattice → ice floats, insulating lakes so life survives winters.'
    ],
    whereItWorks: 'Every cell (you are ~60% water); blood plasma; every ecosystem.',
    problem: 'Life needs a medium where molecules can meet, react and be transported without being destroyed.',
    solution: 'Water\'s polarity + hydrogen bonding provide exactly this — a benign, temperature-stable, universal transport medium.',
    applications: ['Hydration science', 'Blood and urine analysis', 'Protein folding studies', 'Climate science'],
    safety: 'Safe, foundational concept.',
    tags: ['water', 'solvent', 'polar', 'hydrogen bond', 'hydration', 'h2o', 'ice'],
    diagram: null,
    model3d: 'molecule'
  },
  {
    id: 'polymers',
    title: 'Polymers — Molecules in Chains',
    section: 'chemistry',
    icon: '⛓️',
    summary: 'Small monomers link into giant chains. Your body is a polymer factory: proteins, DNA, starch and cellulose. Plastics are the same idea, engineered.',
    formula: 'n (CH₂=CH₂) → –(CH₂–CH₂)ₙ– (polyethylene)',
    formulaType: 'chemical',
    mechanism: [
      'Addition polymerization: double bonds open and chain together (polyethylene, PVC).',
      'Condensation polymerization: monomers join and release water (proteins, nylon, PET).',
      'Nature does it with enzymes — perfectly controlled sequence and length.',
      'Properties come from chain length, side groups and folding (crystalline vs amorphous).'
    ],
    whereItWorks: 'Plastics industry; every cell (proteins, nucleic acids); wood (cellulose); your clothes.',
    problem: 'How to make materials with tunable strength, flexibility and biodegradability?',
    solution: 'Choose monomer + reaction type + chain architecture; biodegradable polymers (PLA, PHA) now replace some petroplastics.',
    applications: ['Biodegradable packaging', 'Sutures and implants (PLA)', 'Elastomers and fibres', 'Drug-delivery microspheres'],
    safety: 'Educational concept; polymer chemistry is industry-scale and safe to learn.',
    tags: ['polymer', 'plastic', 'monomer', 'polymerization', 'protein', 'cellulose', 'starch', 'biodegradable'],
    diagram: null,
    model3d: null
  },
  {
    id: 'biochem-molecules',
    title: 'The Molecules of Biochemistry',
    section: 'chemistry',
    icon: '🍬',
    summary: 'Four families run life: carbohydrates (energy), lipids (membranes & storage), proteins (machines), nucleic acids (information). ATP is the energy coin that links them all.',
    formula: 'ATP → ADP + Pᵢ + ~30.5 kJ/mol (free energy)',
    formulaType: 'chemical',
    mechanism: [
      'Carbohydrates: sugars and polymers like glycogen — rapid energy, structural fibre (cellulose).',
      'Lipids: hydrophobic chains form membranes and fat stores; sterols (cholesterol) tune membrane fluidity.',
      'Proteins: 20 amino acids fold into machines — enzymes, motors, pumps, antibodies.',
      'Nucleotides: store information (DNA/RNA) and carry energy (ATP) — one alphabet, two jobs.'
    ],
    whereItWorks: 'Every cell in every organism.',
    problem: 'How does chemistry organize itself into something that eats, moves and reproduces?',
    solution: 'The four families self-assemble via non-covalent forces into cells; ATP couples energy-releasing reactions to energy-requiring ones.',
    applications: ['Nutrition science', 'Clinical blood panels (glucose, lipids, proteins)', 'Enzyme industry', 'Molecular biology'],
    safety: 'Safe, foundational concept.',
    tags: ['carbohydrate', 'lipid', 'protein', 'nucleic acid', 'atp', 'glucose', 'fat', 'amino acid', 'cholesterol'],
    diagram: null,
    model3d: 'molecule'
  }
]
