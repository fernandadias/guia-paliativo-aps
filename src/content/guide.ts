/**
 * Guia de direção clínica — definição das etapas como DADOS.
 *
 * O motor (useGuideState) interpreta estes objetos; nenhuma tela é hardcoded.
 * Para ajustar texto ou regra depois, edita-se aqui — sem tocar em componente.
 *
 * ⚠️  Conteúdo clínico é PLACEHOLDER (campos `todo`). A LÓGICA de branching é real:
 *   - Etapa 2 "Não"  → fim provisório "reavaliar"
 *   - Etapa 3 (PPS)  → interpreta faixa (precoce / complementar / predominante / exclusivo)
 *   - Etapa 4 "Não"  → abre SPICT-BR
 *   - Etapa 10 (DAV) → ramo consciente vs. incapaz
 * Base: _refs/etapas.md
 */

export type StepId =
  | 'intro'
  | 'doenca'
  | 'pps'
  | 'surpresa'
  | 'spict'
  | 'resultado'
  | 'dimensoes'
  | 'verso'
  | 'spikes'
  | 'plano'
  | 'dav'
  | 'preparando'
  | 'resumo'
  | 'reavaliar'

export interface ChoiceOption {
  value: string
  label: string
  description?: string
}

interface StepCommon {
  id: StepId
  /** Conta na barra de progresso (telas terminais/interstícios podem não contar). */
  progress: boolean
}

export type Step = StepCommon &
  (
    | { kind: 'intro'; kicker: string; title: string; body: string; asideVerseKey?: string; todo?: boolean }
    | {
        kind: 'choice'
        kicker: string
        question: string
        options: ChoiceOption[]
        answerKey: string
        todo?: boolean
      }
    | {
        kind: 'scale'
        kicker: string
        question: string
        note: string
        answerKey: string
        options: { value: number; meaning: string; band: PpsBand }[]
        todo?: boolean
      }
    | {
        kind: 'checklist'
        kicker: string
        title: string
        intro: string
        answerKey: string
        items: { id: string; label: string }[]
        todo?: boolean
      }
    | { kind: 'result'; kicker: string; title: string; todo?: boolean }
    | {
        kind: 'dimensions'
        kicker: string
        title: string
        intro: string
        dimensions: { id: string; label: string; icon: string; fields: string[] }[]
        todo?: boolean
      }
    | { kind: 'verse'; verseKey: string; caption: string; todo?: boolean }
    | {
        kind: 'fields'
        kicker: string
        title: string
        fields: { id: string; label: string; placeholder: string; multiline?: boolean }[]
        todo?: boolean
      }
    | { kind: 'summary'; kicker: string; title: string; todo?: boolean }
    | { kind: 'terminal'; icon: string; title: string; body: string; todo?: boolean }
    | { kind: 'loading'; message: string; submessage: string }
  )

export type PpsBand = 'precoce' | 'complementar' | 'predominante' | 'exclusivo'

export const steps: Record<StepId, Step> = {
  intro: {
    id: 'intro',
    kind: 'intro',
    progress: true,
    kicker: 'Etapa 1 · Antes de tudo',
    title: 'O que são cuidados paliativos?',
    body: 'Cuidados paliativos não significam desistir. Significam cuidar melhor. Apenas os conceitos essenciais, sem texto enorme.',
    asideVerseKey: 'abertura',
    todo: true,
  },
  doenca: {
    id: 'doenca',
    kind: 'choice',
    progress: true,
    kicker: 'Etapa 2',
    question: 'Você está diante de uma doença ameaçadora da vida?',
    answerKey: 'doencaAmeacadora',
    options: [
      { value: 'sim', label: 'Sim' },
      { value: 'nao', label: 'Não' },
    ],
  },
  pps: {
    id: 'pps',
    kind: 'scale',
    progress: true,
    kicker: 'Etapa 3',
    question: 'Vamos avaliar a funcionalidade.',
    note: 'Palliative Performance Scale (PPS). Selecione o valor. O sistema interpreta automaticamente.',
    answerKey: 'pps',
    todo: true,
    options: [
      { value: 100, meaning: 'Deambulação plena, sem evidência de doença', band: 'precoce' },
      { value: 90, meaning: 'Deambulação plena, alguma evidência de doença', band: 'precoce' },
      { value: 80, meaning: 'Paciente em CP precoce', band: 'precoce' },
      { value: 70, meaning: 'Redução da capacidade para o trabalho', band: 'complementar' },
      { value: 60, meaning: 'Necessita assistência ocasional', band: 'complementar' },
      { value: 50, meaning: 'CP complementar', band: 'complementar' },
      { value: 40, meaning: 'Maior parte do tempo acamado', band: 'predominante' },
      { value: 30, meaning: 'CP predominante', band: 'predominante' },
      { value: 20, meaning: 'Totalmente acamado, ingesta mínima', band: 'exclusivo' },
      { value: 10, meaning: 'CP exclusivo', band: 'exclusivo' },
    ],
  },
  surpresa: {
    id: 'surpresa',
    kind: 'choice',
    progress: true,
    kicker: 'Etapa 4 · Pergunta Surpresa',
    question: 'Você se surpreenderia se este paciente morresse no próximo ano?',
    answerKey: 'perguntaSurpresa',
    options: [
      { value: 'sim', label: 'Sim, me surpreenderia' },
      { value: 'nao', label: 'Não me surpreenderia' },
    ],
  },
  spict: {
    id: 'spict',
    kind: 'checklist',
    progress: true,
    kicker: 'Etapa 4 · SPICT-BR',
    title: 'Indicadores de deterioração',
    intro: 'Marque os itens presentes. Ao final, o sistema interpreta.',
    answerKey: 'spict',
    todo: true,
    items: [
      { id: 'spict-1', label: 'Internações não planejadas recorrentes' },
      { id: 'spict-2', label: 'Declínio funcional (PPS baixo ou em queda)' },
      { id: 'spict-3', label: 'Dependência para cuidados por doença física ou mental' },
      { id: 'spict-4', label: 'Perda de peso significativa nos últimos meses' },
      { id: 'spict-5', label: 'Sintomas persistentes apesar do tratamento otimizado' },
      { id: 'spict-6', label: 'Paciente/família solicita cuidados paliativos ou limitação de terapias' },
    ],
  },
  resultado: {
    id: 'resultado',
    kind: 'result',
    progress: true,
    kicker: 'Etapa 5 · Resultado',
    title: 'Interpretação',
    todo: true,
  },
  dimensoes: {
    id: 'dimensoes',
    kind: 'dimensions',
    progress: true,
    kicker: 'Etapa 6 · O cuidado começa',
    title: 'As cinco dimensões',
    intro: 'O cuidado começa muito antes da morte. Vai formando, automaticamente, um Plano Terapêutico Singular.',
    todo: true,
    dimensions: [
      { id: 'fisica', label: 'Física', icon: 'hand-holding-medical', fields: ['Dor', 'Dispneia', 'Constipação'] },
      { id: 'psicologica', label: 'Psicológica', icon: 'brain', fields: ['Humor', 'Ansiedade', 'Medos'] },
      { id: 'social', label: 'Social', icon: 'people-group', fields: ['Quem cuida?', 'Existe rede de apoio?', 'Benefícios sociais?'] },
      { id: 'espiritual', label: 'Espiritual', icon: 'dove', fields: ['Existe alguma crença importante?', 'Desejos?', 'Valores?'] },
      { id: 'familiar', label: 'Familiar', icon: 'house-user', fields: ['Dinâmica familiar', 'Sobrecarga do cuidador', 'Conflitos'] },
    ],
  },
  verso: {
    id: 'verso',
    kind: 'verse',
    progress: false,
    verseKey: 'aposFamilia',
    caption: 'Toda equipe também precisa saber para onde caminha.',
    todo: true,
  },
  spikes: {
    id: 'spikes',
    kind: 'checklist',
    progress: true,
    kicker: 'Etapa 8 · Vamos conversar?',
    title: 'SPIKES: roteiro',
    intro: 'Não como aula, mas como roteiro para a conversa. Marque conforme avança.',
    answerKey: 'spikes',
    todo: true,
    items: [
      { id: 'spikes-s', label: 'S de Setting: prepare o ambiente' },
      { id: 'spikes-p', label: 'P de Perception: o paciente compreendeu sua doença?' },
      { id: 'spikes-i', label: 'I de Invitation: quanto ele deseja saber?' },
      { id: 'spikes-k', label: 'K de Knowledge: transmita a informação com clareza' },
      { id: 'spikes-e', label: 'E de Emotions: acolha as emoções' },
      { id: 'spikes-s2', label: 'S de Strategy: combine a estratégia e os próximos passos' },
    ],
  },
  plano: {
    id: 'plano',
    kind: 'fields',
    progress: true,
    kicker: 'Etapa 9 · Plano compartilhado',
    title: 'Plano compartilhado',
    todo: true,
    fields: [
      { id: 'desejos', label: 'Desejos do paciente', placeholder: 'O que importa para esta pessoa…', multiline: true },
      { id: 'objetivos', label: 'Objetivos do cuidado', placeholder: 'Para onde caminhamos juntos…', multiline: true },
      { id: 'sintomas', label: 'Controle de sintomas', placeholder: 'Prioridades de manejo…', multiline: true },
      { id: 'responsavel', label: 'Quem será responsável', placeholder: 'Profissional / cuidador de referência…' },
      { id: 'reavaliar', label: 'Quando reavaliar', placeholder: 'Ex.: em 30 dias…' },
    ],
  },
  dav: {
    id: 'dav',
    kind: 'choice',
    progress: true,
    kicker: 'Etapa 10 · DAV',
    question: 'Qual a capacidade de decisão do paciente neste momento?',
    answerKey: 'dav',
    options: [
      {
        value: 'consciente',
        label: 'Consciente e capaz',
        description: 'Planejamento antecipado de cuidados com o próprio paciente.',
      },
      {
        value: 'incapaz',
        label: 'Incapaz de decidir',
        description: 'Plano de cuidados construído com o representante.',
      },
    ],
  },
  preparando: {
    id: 'preparando',
    kind: 'loading',
    progress: false,
    message: 'Cada resposta se transformou em cuidado.',
    submessage: 'Reunindo o plano de José…',
  },
  resumo: {
    id: 'resumo',
    kind: 'summary',
    progress: true,
    kicker: 'Final',
    title: 'Resumo do atendimento',
    todo: true,
  },
  reavaliar: {
    id: 'reavaliar',
    kind: 'terminal',
    progress: false,
    icon: 'clock-rotate-left',
    title: 'Reavaliação periódica',
    body: 'Este paciente não apresenta critérios para avaliação neste momento. Lembre-se de reavaliá-lo periodicamente.',
    todo: true,
  },
}

/** Ordem "principal" — usada para a barra de progresso. */
export const progressOrder: StepId[] = [
  'intro',
  'doenca',
  'pps',
  'surpresa',
  'spict',
  'resultado',
  'dimensoes',
  'spikes',
  'plano',
  'dav',
  'resumo',
]

export type Answers = Record<string, unknown>

/** Resolve a próxima etapa a partir da atual e das respostas (branching real). */
export function getNextStepId(current: StepId, answers: Answers): StepId | null {
  switch (current) {
    case 'intro':
      return 'doenca'
    case 'doenca':
      return answers.doencaAmeacadora === 'nao' ? 'reavaliar' : 'pps'
    case 'pps':
      return 'surpresa'
    case 'surpresa':
      // "Não me surpreenderia" abre o SPICT-BR; "Sim" segue direto ao resultado.
      return answers.perguntaSurpresa === 'nao' ? 'spict' : 'resultado'
    case 'spict':
      return 'resultado'
    case 'resultado':
      return 'dimensoes'
    case 'dimensoes':
      return 'verso'
    case 'verso':
      return 'spikes'
    case 'spikes':
      return 'plano'
    case 'plano':
      return 'dav'
    case 'dav':
      return 'preparando'
    case 'preparando':
      return 'resumo'
    case 'resumo':
    case 'reavaliar':
      return null
    default:
      return null
  }
}

export const FIRST_STEP: StepId = 'intro'
