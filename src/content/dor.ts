/**
 * Dimensão física / Dor (T11).
 *  - EVA: escala visual de faces, 0 a 10.
 *  - PAINAD: 5 itens (0 a 2 cada), para paciente não consciente.
 *  - Medicações em uso: seleção múltipla.
 */

export const evaCategorias = [
  'Sem dor',
  'Dor leve',
  'Dor moderada',
  'Dor severa',
  'Dor muito severa',
  'Pior dor possível',
]

export function evaCategoria(value: number): string {
  if (value === 0) return evaCategorias[0]
  if (value <= 3) return evaCategorias[1]
  if (value <= 6) return evaCategorias[2]
  if (value <= 8) return evaCategorias[3]
  if (value === 9) return evaCategorias[4]
  return evaCategorias[5]
}

import {
  faLungs,
  faVolumeHigh,
  faFaceFrown,
  faHandFist,
  faHandHoldingHeart,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

export interface PainadItem {
  id: string
  label: string
  icon: IconDefinition
  niveis: { pts: number; label: string }[]
}

export const painadItems: PainadItem[] = [
  {
    id: 'respiracao',
    label: 'Respiração (independente da vocalização)',
    icon: faLungs,
    niveis: [
      { pts: 0, label: 'Normal' },
      { pts: 1, label: 'Ocasionalmente difícil, curtos períodos de hiperventilação' },
      { pts: 2, label: 'Difícil e ruidosa, longos períodos de hiperventilação' },
    ],
  },
  {
    id: 'vocalizacao',
    label: 'Vocalização negativa',
    icon: faVolumeHigh,
    niveis: [
      { pts: 0, label: 'Nenhuma' },
      { pts: 1, label: 'Gemidos ocasionais, discurso negativo' },
      { pts: 2, label: 'Gemido alto, choro repetido' },
    ],
  },
  {
    id: 'facial',
    label: 'Expressão facial',
    icon: faFaceFrown,
    niveis: [
      { pts: 0, label: 'Sorridente ou inexpressiva' },
      { pts: 1, label: 'Triste, com medo, sobrancelhas franzidas' },
      { pts: 2, label: 'Trejeitos, caretas' },
    ],
  },
  {
    id: 'corporal',
    label: 'Linguagem corporal',
    icon: faHandFist,
    niveis: [
      { pts: 0, label: 'Relaxado' },
      { pts: 1, label: 'Tenso, inquieto' },
      { pts: 2, label: 'Rígido, punhos cerrados, resiste ao cuidado' },
    ],
  },
  {
    id: 'consolabilidade',
    label: 'Consolabilidade',
    icon: faHandHoldingHeart,
    niveis: [
      { pts: 0, label: 'Sem necessidade de consolo' },
      { pts: 1, label: 'Distrai-se ou tranquiliza-se por voz ou toque' },
      { pts: 2, label: 'Não há como consolar ou tranquilizar' },
    ],
  },
]

export type PainadAnswers = Record<string, number>

export function painadScore(a: PainadAnswers): number {
  return painadItems.reduce((s, i) => s + (a[i.id] ?? 0), 0)
}
export function painadComplete(a: PainadAnswers): boolean {
  return painadItems.every((i) => a[i.id] != null)
}
export function painadFaixa(score: number): string {
  if (score === 0) return 'Ausência de dor'
  if (score <= 3) return 'Dor leve'
  if (score <= 6) return 'Dor moderada'
  if (score <= 9) return 'Dor intensa'
  return 'Dor insuportável'
}

export const medicacoesOpcoes = [
  { id: 'nenhuma', label: 'Nenhuma', exclusiva: true },
  { id: 'analgesico', label: 'Analgésico simples' },
  { id: 'opioide', label: 'Opióide' },
  { id: 'analgesico_opioide', label: 'Analgésico simples + opióide' },
  { id: 'outros', label: 'Outros' },
]
