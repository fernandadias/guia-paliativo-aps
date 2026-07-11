/**
 * PPS — Palliative Performance Scale (base: Maciel, 2009 / Victoria Hospice).
 *
 * A tabela tem 5 colunas e 11 níveis (100% a 0%). O profissional seleciona uma
 * opção em cada coluna e o sistema SUGERE o PPS.
 *
 * ⚠️  A regra de cálculo é PROVISÓRIA até validação clínica da cliente.
 * Ela segue o instrumento: melhor ajuste do conjunto com PRECEDÊNCIA das colunas
 * da esquerda (Deambulação pesa mais, depois Atividade, e assim por diante),
 * em passos de 10%. Como o método oficial pede julgamento clínico, a sugestão é
 * sempre ajustável manualmente pelo profissional.
 */

import type { PpsBand } from './guide'

export const ppsColumns = [
  { key: 'deamb', label: 'Deambulação', icon: 'person-walking' },
  { key: 'ativ', label: 'Atividade e evidência de doença', icon: 'person-running' },
  { key: 'auto', label: 'Autocuidado', icon: 'hands-bubbles' },
  { key: 'ing', label: 'Ingestão', icon: 'utensils' },
  { key: 'consc', label: 'Nível de consciência', icon: 'brain' },
] as const

export type PpsColKey = (typeof ppsColumns)[number]['key']

export interface PpsRow {
  value: number
  cells: Record<PpsColKey, string>
}

/** Marcador de óbito, encerra a análise (branch "acolhimento da família"). */
export const PPS_MORTE = 'Morte'

export const ppsRows: PpsRow[] = [
  {
    value: 100,
    cells: {
      deamb: 'Completa',
      ativ: 'Normal, sem evidência de doença',
      auto: 'Completo',
      ing: 'Normal',
      consc: 'Completa',
    },
  },
  {
    value: 90,
    cells: {
      deamb: 'Completa',
      ativ: 'Normal, alguma evidência de doença',
      auto: 'Completo',
      ing: 'Normal',
      consc: 'Completa',
    },
  },
  {
    value: 80,
    cells: {
      deamb: 'Completa',
      ativ: 'Normal com esforço, alguma doença',
      auto: 'Completo',
      ing: 'Normal ou reduzida',
      consc: 'Completa',
    },
  },
  {
    value: 70,
    cells: {
      deamb: 'Reduzida',
      ativ: 'Incapaz de trabalhar, doença significativa',
      auto: 'Completo',
      ing: 'Normal ou reduzida',
      consc: 'Completa',
    },
  },
  {
    value: 60,
    cells: {
      deamb: 'Reduzida',
      ativ: 'Incapaz de hobbies, doença significativa',
      auto: 'Assistência ocasional',
      ing: 'Normal ou reduzida',
      consc: 'Completa ou confusão',
    },
  },
  {
    value: 50,
    cells: {
      deamb: 'Sentado ou deitado',
      ativ: 'Incapaz de trabalhar, doença extensa',
      auto: 'Assistência considerável',
      ing: 'Normal ou reduzida',
      consc: 'Completa ou confusão',
    },
  },
  {
    value: 40,
    cells: {
      deamb: 'Muito tempo acamado',
      ativ: 'Incapaz de trabalhar, doença extensa',
      auto: 'Assistência quase total',
      ing: 'Normal ou reduzida',
      consc: 'Completa ou sonolência',
    },
  },
  {
    value: 30,
    cells: {
      deamb: 'Totalmente acamado',
      ativ: 'Incapaz de trabalhar, doença extensa',
      auto: 'Dependência completa',
      ing: 'Reduzida',
      consc: 'Completa ou sonolência',
    },
  },
  {
    value: 20,
    cells: {
      deamb: 'Totalmente acamado',
      ativ: 'Incapaz de trabalhar, doença extensa',
      auto: 'Dependência completa',
      ing: 'Mínima',
      consc: 'Completa ou sonolência',
    },
  },
  {
    value: 10,
    cells: {
      deamb: 'Totalmente acamado',
      ativ: 'Incapaz de trabalhar, doença extensa',
      auto: 'Dependência completa',
      ing: 'Cuidados com a boca',
      consc: 'Sonolência ou coma',
    },
  },
]

/** Pesos por coluna: as da esquerda pesam mais (precedência do instrumento). */
const WEIGHTS: Record<PpsColKey, number> = { deamb: 5, ativ: 4, auto: 3, ing: 2, consc: 1 }

/** Opções distintas de uma coluna (deduplica as células repetidas / "idem"). */
export function ppsOptions(key: PpsColKey): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const r of ppsRows) {
    if (!seen.has(r.cells[key])) {
      seen.add(r.cells[key])
      out.push(r.cells[key])
    }
  }
  return out
}

export type PpsSelection = Partial<Record<PpsColKey, string>>

/**
 * Sugere o PPS pelo melhor ajuste do conjunto, com precedência das colunas da
 * esquerda. Retorna null enquanto nada foi selecionado. É uma SUGESTÃO: o
 * profissional pode ajustar manualmente.
 */
export function suggestPps(sel: PpsSelection): number | null {
  const keys = ppsColumns.map((c) => c.key)
  if (!keys.some((k) => sel[k])) return null

  let best: { value: number; score: number; deambMatch: boolean } | null = null
  for (const r of ppsRows) {
    let score = 0
    for (const k of keys) if (sel[k] && sel[k] === r.cells[k]) score += WEIGHTS[k]
    const deambMatch = !!sel.deamb && sel.deamb === r.cells.deamb
    // Maior pontuação vence; empate → prioriza a linha que casa com a
    // Deambulação (coluna mais forte); persistindo o empate, mantém a de maior %.
    if (!best || score > best.score || (score === best.score && deambMatch && !best.deambMatch)) {
      best = { value: r.value, score, deambMatch }
    }
  }
  return best ? best.value : null
}

/** Todos os valores selecionáveis manualmente (100 a 10). */
export const ppsValues = ppsRows.map((r) => r.value)

const bandLabel: Record<PpsBand, string> = {
  precoce: 'Cuidados paliativos precoces',
  complementar: 'Cuidados paliativos complementares',
  predominante: 'Cuidados paliativos predominantes',
  exclusivo: 'Cuidados paliativos exclusivos',
}

export function bandFromValue(value: number): PpsBand | null {
  if (value >= 80) return 'precoce'
  if (value >= 50) return 'complementar'
  if (value >= 30) return 'predominante'
  if (value >= 10) return 'exclusivo'
  return null
}

export function bandInfo(value: number): { band: PpsBand; label: string } | null {
  const band = bandFromValue(value)
  return band ? { band, label: bandLabel[band] } : null
}
