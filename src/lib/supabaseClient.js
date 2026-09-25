// Supabase client — optional. The app works fully offline without it.
// Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (see .env.example)
// to enable the community gallery and saving formula cards.
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigured = Boolean(url && anonKey && /^https?:\/\//.test(url))

export const supabase = supabaseConfigured ? createClient(url, anonKey) : null

export async function saveFormulaCard(card, authorName) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { data, error } = await supabase
    .from('formula_cards')
    .insert({
      title: card.title,
      section: card.section || 'general',
      query: card.query || null,
      summary: card.summary || null,
      content: card,
      author_name: authorName || null
    })
    .select()
  if (error) throw error
  return data?.[0]
}

export async function listFormulaCards(limit = 50) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { data, error } = await supabase
    .from('formula_cards')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}
