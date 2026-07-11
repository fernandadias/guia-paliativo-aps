/**
 * Escala de ZARIT (versão reduzida, 7 itens) — sobrecarga do cuidador.
 * Cada item de 1 (nunca) a 5 (quase sempre). Soma de 7 a 35.
 */

export const zaritOptions = [
  { value: 1, label: 'Nunca' },
  { value: 2, label: 'Quase nunca' },
  { value: 3, label: 'Às vezes' },
  { value: 4, label: 'Frequentemente' },
  { value: 5, label: 'Quase sempre' },
]

export const zaritQuestions = [
  { id: 'z1', label: 'Sente que já não tem tempo para si por causa do tempo que dedica ao familiar?' },
  { id: 'z2', label: 'Sente-se estressado por cuidar do familiar e ainda ter outras responsabilidades?' },
  { id: 'z3', label: 'A situação afeta negativamente sua relação com amigos ou outros familiares?' },
  { id: 'z4', label: 'Sente-se exausto quando precisa estar junto do familiar?' },
  { id: 'z5', label: 'Sente que sua saúde foi afetada por cuidar do familiar?' },
  { id: 'z6', label: 'Sente que perdeu o controle da sua vida desde a doença do familiar?' },
  { id: 'z7', label: 'No geral, sente-se muito sobrecarregado por cuidar do familiar?' },
]

export type ZaritAnswers = Record<string, number>

export function zaritScore(answers: ZaritAnswers): number {
  return zaritQuestions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0)
}

export function zaritComplete(answers: ZaritAnswers): boolean {
  return zaritQuestions.every((q) => answers[q.id] != null)
}

export function zaritFaixa(score: number): { label: string; tone: 'leve' | 'moderada' | 'grave' } {
  if (score <= 14) return { label: 'Sobrecarga leve', tone: 'leve' }
  if (score <= 21) return { label: 'Sobrecarga moderada', tone: 'moderada' }
  return { label: 'Sobrecarga grave', tone: 'grave' }
}
