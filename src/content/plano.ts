/** Plano compartilhado (T18) — campos usados pela tela e pelo resumo. */

export type PlanoFieldKind = 'textarea' | 'text' | 'simnao' | 'reavaliar'

export interface PlanoField {
  id: string
  label: string
  kind: PlanoFieldKind
  placeholder?: string
}

export const planoFields: PlanoField[] = [
  { id: 'desejos', label: 'Desejos do paciente', kind: 'textarea', placeholder: 'O que importa para esta pessoa…' },
  { id: 'objetivos', label: 'Objetivos do cuidado', kind: 'textarea', placeholder: 'Para onde caminhamos juntos…' },
  { id: 'sintomas', label: 'Controle de sintomas', kind: 'textarea', placeholder: 'Prioridades de manejo…' },
  { id: 'responsavel', label: 'Quem será responsável', kind: 'text', placeholder: 'Profissional ou cuidador de referência…' },
  { id: 'matriciado', label: 'Será matriciado o caso?', kind: 'simnao' },
  { id: 'emad', label: 'Encaminhamento a EMAD?', kind: 'simnao' },
  { id: 'reavaliar', label: 'Quando reavaliar', kind: 'reavaliar' },
]

export const reavaliarOpcoes = ['Semanalmente', 'Quinzenalmente', 'Mensalmente', 'Outro']

/** Rótulo legível de um valor salvo, para exibir no resumo. */
export function planoValorLegivel(field: PlanoField, values: Record<string, string>): string {
  const raw = values[field.id]
  if (field.kind === 'simnao') {
    if (raw === 'sim') return 'Sim'
    if (raw === 'nao') return 'Não'
    return ''
  }
  if (field.kind === 'reavaliar') {
    if (raw === 'Outro') return values.reavaliarOutro?.trim() || 'Outro'
    return raw ?? ''
  }
  return raw ?? ''
}
