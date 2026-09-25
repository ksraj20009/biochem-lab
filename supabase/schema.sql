-- BioChem Lab — Supabase schema
-- Run this in the Supabase SQL editor (or `supabase db push`), then set
-- VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env / host settings.

create table if not exists public.formula_cards (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  section text not null,
  query text,
  summary text,
  content jsonb not null,
  author_name text
);

alter table public.formula_cards enable row level security;

-- Community gallery: anyone can read and create cards, no updates/deletes.
-- Tighten these policies if you add authentication.
drop policy if exists "formula_cards_public_read" on public.formula_cards;
create policy "formula_cards_public_read"
  on public.formula_cards for select
  using (true);

drop policy if exists "formula_cards_public_insert" on public.formula_cards;
create policy "formula_cards_public_insert"
  on public.formula_cards for insert
  with check (true);

-- Helpful index for the gallery (newest first)
create index if not exists formula_cards_created_at_idx
  on public.formula_cards (created_at desc);
