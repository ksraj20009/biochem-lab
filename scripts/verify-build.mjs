// Local verification build (sandbox-compatible alternative to `vite build`,
// which cannot run here because the sandbox blocks WebAssembly allocations).
// Produces a working bundle in dist-test/ that we render in a headless DOM.
import { build } from 'esbuild'
import { mkdirSync } from 'fs'

mkdirSync('dist-test', { recursive: true })

const result = await build({
  entryPoints: ['src/main.jsx'],
  bundle: true,
  format: 'iife',
  outfile: 'dist-test/app.js',
  minify: false,
  sourcemap: false,
  logLevel: 'info',
  jsx: 'automatic',
  loader: { '.jsx': 'jsx', '.js': 'jsx', '.css': 'css' },
  define: {
    'import.meta.env.VITE_SUPABASE_URL': '""',
    'import.meta.env.VITE_SUPABASE_ANON_KEY': '""',
    'import.meta.env.VITE_AI_BASE_URL': '""',
    'import.meta.env.VITE_AI_MODEL': '""',
    'import.meta.env.DEV': 'false',
    'import.meta.env.PROD': 'true'
  }
})

console.log('BUNDLE OK —', result.outputFiles?.length ?? 'see dist-test/app.js')
