-- Guia Paliativo APS · armazenamento anonimizado dos preenchimentos (Épico F)
--
-- Nenhum dado pessoal do paciente ou do profissional é gravado aqui.
-- Cada linha é um preenchimento identificado apenas por um fill_id anônimo.
-- patient_id é opcional e reservado para uma feature futura (histórico por ID).

create extension if not exists "pgcrypto";

create table if not exists public.fills (
  id              uuid primary key default gen_random_uuid(),
  fill_id         text not null unique,
  patient_id      text,
  schema_version  integer not null default 1,
  started_at      timestamptz,
  finished_at     timestamptz,
  duration_ms     integer,
  answers         jsonb not null default '{}'::jsonb,
  derived         jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now()
);

create index if not exists fills_created_at_idx on public.fills (created_at);
create index if not exists fills_patient_id_idx on public.fills (patient_id);

-- Row Level Security: o app (chave anon) só pode INSERIR. Nada de leitura
-- pública; a análise dos dados é feita com a service key, fora do navegador.
alter table public.fills enable row level security;

drop policy if exists "anon insere preenchimento" on public.fills;
create policy "anon insere preenchimento"
  on public.fills
  for insert
  to anon
  with check (true);
