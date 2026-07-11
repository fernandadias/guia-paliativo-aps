/**
 * ESAS-r — Escala de Avaliação de Sintomas de Edmonton (T16).
 * Cada item é um slider de 0 a 10, da âncora esquerda (ausência) à direita (pior possível).
 */

export interface EsasItem {
  id: string
  label: string
  hint?: string
  left: string
  right: string
}

export const esasItems: EsasItem[] = [
  { id: 'dor', label: 'Dor', left: 'Sem dor', right: 'Pior dor possível' },
  { id: 'cansaco', label: 'Cansaço', hint: 'falta de energia', left: 'Sem cansaço', right: 'Pior cansaço possível' },
  { id: 'sonolencia', label: 'Sonolência', hint: 'sentir-se com sono', left: 'Sem sonolência', right: 'Pior sonolência possível' },
  { id: 'nausea', label: 'Náusea', left: 'Sem náusea', right: 'Pior náusea possível' },
  { id: 'apetite', label: 'Apetite', left: 'Com apetite', right: 'Pior falta de apetite possível' },
  { id: 'falta_ar', label: 'Falta de ar', left: 'Sem falta de ar', right: 'Pior falta de ar possível' },
  { id: 'depressao', label: 'Depressão', hint: 'sentir-se triste', left: 'Sem depressão', right: 'Pior depressão possível' },
  { id: 'ansiedade', label: 'Ansiedade', hint: 'sentir-se nervoso', left: 'Sem ansiedade', right: 'Pior ansiedade possível' },
  { id: 'bem_estar', label: 'Bem-estar', hint: 'como se sente em geral', left: 'Melhor bem-estar', right: 'Pior mal-estar possível' },
]
