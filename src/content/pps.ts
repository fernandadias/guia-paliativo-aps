/**
 * PPS — Palliative Performance Scale (base: Maciel, 2009 / Victoria Hospice).
 *
 * A tabela tem 5 colunas e 10 níveis (100% a 10%). O profissional seleciona uma
 * opção em cada coluna e o sistema SUGERE o PPS.
 *
 * Regra de cálculo: leitura LEXICOGRÁFICA da esquerda para a direita, como no
 * instrumento oficial. A Deambulação define o bloco; cada coluna seguinte só
 * REFINA dentro do que as anteriores permitiram — se conflitar (não casar
 * nenhuma candidata), é ignorada, nunca sobrepõe uma coluna mais forte.
 *
 * Com a tabela fiel ao instrumento, o refinamento clínico normalmente já fixa a
 * linha (o caso do paciente acamado mas lúcido e alimentando-se cai em 30% por
 * correspondência real). O desempate residual é só uma REDE DE SEGURANÇA para
 * seleções contraditórias: mantém o valor no topo do bloco fixado pelas colunas
 * fortes (maior %), sem subir acima nem descer abaixo dele. A sugestão é sempre
 * ajustável manualmente pelo profissional.
 */

import type { PpsBand } from './guide'

export const ppsColumns = [
  { key: 'deamb', label: 'Deambulação', icon: 'person-walking' },
  { key: 'ativ', label: 'Atividade / Evidência de doença', icon: 'person-running' },
  { key: 'auto', label: 'Autocuidado', icon: 'heart' },
  { key: 'ing', label: 'Ingesta', icon: 'utensils' },
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
      consc: 'Completo',
    },
  },
  {
    value: 90,
    cells: {
      deamb: 'Completa',
      ativ: 'Normal, alguma evidência de doença',
      auto: 'Completo',
      ing: 'Normal',
      consc: 'Completo',
    },
  },
  {
    value: 80,
    cells: {
      deamb: 'Completa',
      ativ: 'Normal com esforço, alguma evidência de doença',
      auto: 'Completo',
      ing: 'Normal ou reduzida',
      consc: 'Completo',
    },
  },
  {
    value: 70,
    cells: {
      deamb: 'Reduzida',
      ativ: 'Incapaz para trabalho normal, alguma evidência de doença',
      auto: 'Completo',
      ing: 'Normal ou reduzida',
      consc: 'Completo',
    },
  },
  {
    value: 60,
    cells: {
      deamb: 'Reduzida',
      ativ: 'Incapaz para hobbies/trabalho doméstico, doença significativa',
      auto: 'Assistência ocasional',
      ing: 'Normal ou reduzida',
      consc: 'Completo ou confuso',
    },
  },
  {
    value: 50,
    cells: {
      deamb: 'Sentado/deitado a maior parte do tempo',
      ativ: 'Incapaz para qualquer trabalho, doença extensa',
      auto: 'Assistência considerável',
      ing: 'Normal ou reduzida',
      consc: 'Completo ou confuso',
    },
  },
  {
    value: 40,
    cells: {
      deamb: 'Principalmente acamado',
      ativ: 'Incapaz para qualquer trabalho, doença extensa',
      auto: 'Assistência quase total',
      ing: 'Normal ou reduzida',
      consc: 'Completo, sonolento ou confuso',
    },
  },
  {
    value: 30,
    cells: {
      deamb: 'Totalmente acamado',
      ativ: 'Incapaz para qualquer trabalho, doença extensa',
      auto: 'Cuidado total',
      ing: 'Normal ou reduzida',
      consc: 'Completo, sonolento ou confuso',
    },
  },
  {
    value: 20,
    cells: {
      deamb: 'Totalmente acamado',
      ativ: 'Incapaz para qualquer trabalho, doença extensa',
      auto: 'Cuidado total',
      ing: 'Mínima, goles',
      consc: 'Completo, sonolento ou confuso',
    },
  },
  {
    value: 10,
    cells: {
      deamb: 'Totalmente acamado',
      ativ: 'Incapaz para qualquer trabalho, doença extensa',
      auto: 'Cuidado total',
      ing: 'Cuidados com a boca apenas',
      consc: 'Sonolento ou coma',
    },
  },
]

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
 * Sugere o PPS por leitura lexicográfica da esquerda para a direita. Cada coluna
 * (na ordem deamb → ativ → auto → ing → consc) refina o conjunto de candidatas;
 * se não casar nenhuma, é ignorada (não sobrepõe as colunas mais fortes). Retorna
 * null enquanto nada foi selecionado. É uma SUGESTÃO: o profissional pode ajustar
 * manualmente.
 */
export function suggestPps(sel: PpsSelection): number | null {
  const keys = ppsColumns.map((c) => c.key)
  if (!keys.some((k) => sel[k])) return null

  let candidates = ppsRows
  for (const k of keys) {
    const v = sel[k]
    if (!v) continue
    const matches = candidates.filter((r) => r.cells[k] === v)
    // Só refina se houver correspondência dentro do bloco atual; conflito com
    // coluna mais forte (matches vazio) é ignorado.
    if (matches.length > 0) candidates = matches
  }

  // Rede de segurança (empate residual por seleção contraditória): mantém no
  // topo do bloco fixado pelas colunas fortes (maior %). No fluxo clínico normal
  // as colunas já reduziram a uma única linha.
  return Math.max(...candidates.map((r) => r.value))
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
