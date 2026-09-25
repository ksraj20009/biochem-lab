# BioChem Lab

**Where Biology meets Chemistry** — an interactive educational web application that generates structured *formula cards* for anything living or molecular: what it is, how it works, where in the body it happens, the problem, the solution, how it is used — with SVG diagrams and interactive 3-D models.

## Features

| Area | What you get |
| --- | --- |
| **Formula Studio** | A chat-style generator. Set a body profile (age, sex, weight, height) and ask anything — e.g. *"how can a neuron in its last stage go back to the first stage?"* — and get a full card: formula, step-by-step mechanism, where it works, problem, solution, applications, safety limits, and a diagram. Includes a hybrid-analysis engine (ask *"generate a hybrid formula for tiger and horse"*) that explains chromosome-level species barriers honestly. |
| **Biology** | Cells, bacteria, viruses, fungi, photosynthesis, DNA, hybridization, metabolism, microbiome. |
| **Chemistry** | Bonds, acids/bases & pH, redox, organic chemistry, water, polymers, biomolecules. |
| **Human Body** | Head to toe: neurons (maturation stages diagram), brain, nervous system, heart & blood, lungs, digestion & liver, kidneys, immune system, muscles & skeleton, endocrine system, skin. |
| **Biotech & ChemTech** | PCR, CRISPR, fermentation, enzyme engineering, synthetic biology, bioreactors, green chemistry, the drug pipeline. |
| **Fusion Lab** | The chemistry × biology intersection: aspirin, neurotransmitter chemistry, antibiotics, anaesthesia, biomaterials, nutrition, mRNA vaccines. |
| **3-D Models** | Interactive Three.js viewers: a DNA double helix and a myelinated neuron. Drag to rotate, scroll to zoom. |
| **Community Gallery** | Formula cards saved to a shared Supabase gallery (optional — the app works fully offline without it). |
| **AI Tutor mode** | Optional bring-your-own-key connection to any OpenAI-compatible API for open-ended tutoring. The key is stored only in your browser and the tutor runs with an educational system prompt. Off by default. |

> **Scope note:** BioChem Lab is an education platform. It explains real science in depth and does not provide instructions for harmful substances or harmful experimentation.

## Tech stack

- **React 18 + Vite 5** — fast dev experience, static production build
- **Three.js** — DNA and neuron 3-D viewers
- **Supabase (Postgres)** — community gallery storage
- No other runtime dependencies

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

The app runs fully offline in this mode — every feature except the community gallery works.

### Enable the Supabase gallery (optional)

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the SQL editor in your project and run the contents of [`supabase/schema.sql`](supabase/schema.sql).
3. Copy `.env.example` to `.env` and fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (Project Settings → API).
4. Restart `npm run dev`. Saving formula cards and the Gallery switch on automatically.

### Enable AI Tutor mode (optional)

In the app: **Settings → AI Tutor**. Enter any OpenAI-compatible base URL, model and API key (OpenAI, Groq, OpenRouter, Together, or a local LLM server). The key lives in your browser's localStorage only. If it is off or fails, the built-in offline knowledge engine answers instead.

## Deploy to Vercel

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com): **Add New → Project → Import** the repo.
3. Vercel auto-detects Vite (build `npm run build`, output `dist`). No configuration needed.
4. If you use Supabase, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in **Project → Settings → Environment Variables**, then redeploy.

(Netlify works identically: build command `npm run build`, publish directory `dist`.)

## Project structure

```
src/
  data/            # knowledge base: biology, chemistry, body, tech, fusion
  lib/
    engine.js      # Formula Studio engine: matching, hybrid analysis,
                   # body-profile estimates
    supabaseClient.js
  components/
    FormulaStudio.jsx   # the chat-style generator
    Diagrams.jsx        # SVG: neuron stages, cell, body map, animations
    Models3D.jsx        # Three.js DNA helix + neuron
    SectionView.jsx    # knowledge section browser
    Gallery.jsx        # Supabase community gallery
    Settings.jsx       # AI tutor config
    Home.jsx, Nav.jsx, App.jsx
supabase/schema.sql    # one-time database setup
```

## Adding your own knowledge

Every topic is a plain object in `src/data/*.js`. Add one, and the Formula Studio can find it automatically — tags drive the matching.

## License

MIT
