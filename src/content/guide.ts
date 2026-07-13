/**
 * Guia de direção clínica — definição das etapas como DADOS (v2).
 *
 * O motor (useGuideState) interpreta estes objetos; nenhuma tela é hardcoded.
 * Para ajustar texto ou regra depois, edita-se aqui, sem tocar em componente.
 *
 * Reestruturação v2 (ver .design-prototype/v2-planejamento/mapa.html):
 *   - Fluxo: intro > doença > (surpresa > [recomendação] > SPICT gerais > SPICT clínicos > PPS) > resultado
 *            > cinco dimensões (física, psicológica, social, espiritual, familiar, Edmonton)
 *            > plano > reflexão > DAV > resumo
 *   - Telas terminais: "reavaliar" (doença = não) e "acolhimento" (morte no PPS).
 *   - Telas do Épico C entram como PLACEHOLDER navegável (kind 'placeholder').
 *   - Conteúdo clínico é placeholder; parte da copy depende da cliente.
 */

export type StepId =
  | 'consentimento'
  | 'doenca'
  | 'reavaliar'
  | 'surpresa'
  | 'recomendacao'
  | 'spictGerais'
  | 'spictClinicos'
  | 'pps'
  | 'acolhimento'
  | 'resultado'
  | 'fisica'
  | 'psicologica'
  | 'social'
  | 'espiritual'
  | 'familiar'
  | 'edmonton'
  | 'plano'
  | 'reflexao'
  | 'dav'
  | 'davConsciente'
  | 'davIncapaz'
  | 'preparando'
  | 'resumo'
  | 'final'

export interface ChoiceOption {
  value: string
  label: string
  description?: string
}

interface StepCommon {
  id: StepId
  /** Se a etapa conta na barra de progresso (terminais/interstícios não contam). */
  progress: boolean
  /** Sinaliza que parte do conteúdo desta tela depende da cliente. */
  pendingClient?: boolean
}

export type Step = StepCommon &
  (
    | {
        kind: 'intro'
        kicker: string
        title?: string
        body?: string
        continueLabel?: string
        asideVerseKey?: string
        todo?: boolean
      }
    | {
        kind: 'choice'
        kicker: string
        question: string
        body?: string
        poem?: { lines: string[]; author?: string }
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
    | { kind: 'pps'; kicker: string; question: string; note: string; answerKey: string; todo?: boolean }
    | { kind: 'clinicos'; kicker: string; title: string; intro: string; answerKey: string }
    | { kind: 'edmonton'; kicker: string; title: string; intro: string; answerKey: string }
    | { kind: 'familiar'; kicker: string; title: string; intro: string; answerKey: string }
    | { kind: 'fisica'; kicker: string; title: string; intro: string; answerKey: string }
    | { kind: 'social'; kicker: string; title: string; intro: string; answerKey: string }
    | { kind: 'plano'; kicker: string; title: string; answerKey: string }
    | {
        kind: 'checklist'
        kicker: string
        title: string
        intro: string
        answerKey: string
        items: { id: string; label: string; code?: string; detail?: string }[]
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
        answerKey: string
        intro?: string
        fields: { id: string; label: string; placeholder: string; multiline?: boolean }[]
        todo?: boolean
      }
    | { kind: 'summary'; kicker: string; title: string; todo?: boolean }
    | { kind: 'closing'; lines: string[]; body: string; signature: string[] }
    | { kind: 'terminal'; icon: string; title: string; body: string; todo?: boolean }
    | { kind: 'loading'; message: string; submessage: string }
    | { kind: 'placeholder'; kicker: string; title: string; body: string; epic: string }
    | {
        kind: 'consent'
        kicker: string
        title: string
        body: string
        answerKey: string
        note?: string
      }
  )

export type PpsBand = 'precoce' | 'complementar' | 'predominante' | 'exclusivo'

export const steps: Record<StepId, Step> = {
  // ── Consentimento ─────────────────────────────────────────
  consentimento: {
    id: 'consentimento',
    kind: 'consent',
    progress: false,
    kicker: 'Antes de começar',
    title: 'Uso dos dados desta avaliação',
    body: 'Podemos guardar este preenchimento de forma anônima, apenas com um identificador, para pesquisa. Nenhum dado pessoal é armazenado.',
    answerKey: 'consentimento',
  },

  // ── Triagem ───────────────────────────────────────────────
  doenca: {
    id: 'doenca',
    kind: 'choice',
    progress: true,
    kicker: 'Doença',
    question: 'Você está diante de uma doença ameaçadora a vida?',
    answerKey: 'doencaAmeacadora',
    options: [
      { value: 'sim', label: 'Sim' },
      { value: 'nao', label: 'Não' },
    ],
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
  surpresa: {
    id: 'surpresa',
    kind: 'choice',
    progress: true,
    kicker: 'Pergunta surpresa',
    question: 'Você se surpreenderia se este paciente morresse nos próximos 12 meses?',
    answerKey: 'perguntaSurpresa',
    options: [
      { value: 'sim', label: 'Sim, me surpreenderia' },
      { value: 'nao', label: 'Não me surpreenderia' },
    ],
  },
  recomendacao: {
    id: 'recomendacao',
    kind: 'intro',
    progress: true,
    kicker: 'Recomendação',
    title: 'Recomenda-se reavaliação periódica',
    body: 'Ainda assim, vale seguir com a avaliação. Esta recomendação será registrada no resumo final do atendimento.',
  },
  spictGerais: {
    id: 'spictGerais',
    kind: 'checklist',
    progress: true,
    kicker: 'SPICT',
    title: 'Procure por indicadores gerais de saúde em deterioração',
    intro: 'Marque os indicadores presentes.',
    answerKey: 'spict',
    todo: true,
    items: [
      { id: 'spict-1', label: 'Internações hospitalares não programadas.' },
      { id: 'spict-2', label: 'Declínio funcional progressivo, por exemplo na cama ou na cadeira mais da metade do tempo.' },
      { id: 'spict-3', label: 'Depende de outros para cuidados pessoais; o cuidador precisa de mais apoio.' },
      { id: 'spict-4', label: 'Perda de peso progressiva, baixa massa muscular.' },
      { id: 'spict-5', label: 'Sintomas persistentes apesar do tratamento otimizado.' },
      { id: 'spict-6', label: 'Paciente ou família pede cuidados paliativos, ou quer focar na qualidade de vida.' },
    ],
  },
  spictClinicos: {
    id: 'spictClinicos',
    kind: 'clinicos',
    progress: true,
    kicker: 'Indicadores clínicos',
    title: 'Procure por indicadores clínicos de uma ou mais condições de saúde que limitam a vida',
    intro: 'Toque na condição para ver os indicadores e marque os presentes. Pode marcar em mais de uma condição.',
    answerKey: 'indicadoresClinicos',
  },
  pps: {
    id: 'pps',
    kind: 'pps',
    progress: true,
    kicker: 'PPS',
    question: 'Vamos avaliar a funcionalidade.',
    note: 'Palliative Performance Scale. Selecione uma opção em cada coluna. O sistema sugere o PPS (base: Maciel 2009); ajuste se o julgamento clínico indicar.',
    answerKey: 'pps',
    todo: true,
  },
  acolhimento: {
    id: 'acolhimento',
    kind: 'terminal',
    progress: false,
    icon: 'hand-holding-heart',
    title: 'Acolhimento da família',
    body: 'Acolher os familiares no pós-óbito por meio de escuta ativa, apoio emocional, esclarecimento de dúvidas e orientações sobre os procedimentos necessários e redes disponíveis.',
  },
  resultado: {
    id: 'resultado',
    kind: 'result',
    progress: true,
    kicker: 'Resultado',
    title: 'Interpretação',
    todo: true,
  },

  // ── Cinco dimensões ───────────────────────────────────────
  fisica: {
    id: 'fisica',
    kind: 'fisica',
    progress: true,
    kicker: 'Diagrama de abordagem multidimensional',
    title: 'Dor',
    intro: 'A avaliação começa pela dor.',
    answerKey: 'fisica',
  },
  psicologica: {
    id: 'psicologica',
    kind: 'fields',
    progress: true,
    kicker: 'Dimensão psicológica',
    title: 'Psicológica',
    answerKey: 'dimPsicologica',
    fields: [
      { id: 'humor', label: 'Humor', placeholder: 'Anotar…', multiline: true },
      { id: 'ansiedade', label: 'Ansiedade', placeholder: 'Anotar…', multiline: true },
      { id: 'medos', label: 'Medos', placeholder: 'Anotar…', multiline: true },
    ],
  },
  social: {
    id: 'social',
    kind: 'social',
    progress: true,
    kicker: 'Dimensão social',
    title: 'Social',
    answerKey: 'dimSocial',
    intro: 'Rede de apoio e benefícios sociais.',
  },
  espiritual: {
    id: 'espiritual',
    kind: 'fields',
    progress: true,
    kicker: 'Dimensão espiritual',
    title: 'Espiritual',
    answerKey: 'dimEspiritual',
    fields: [
      { id: 'crenca', label: 'Existe alguma crença importante?', placeholder: 'Anotar…', multiline: true },
      { id: 'desejos', label: 'Desejos?', placeholder: 'Anotar…', multiline: true },
      { id: 'valores', label: 'Valores?', placeholder: 'Anotar…', multiline: true },
    ],
  },
  familiar: {
    id: 'familiar',
    kind: 'familiar',
    progress: true,
    kicker: 'Dinâmica familiar',
    title: 'Familiar',
    answerKey: 'dimFamiliar',
    intro: 'Dinâmica familiar, sobrecarga do cuidador e conflitos.',
  },
  edmonton: {
    id: 'edmonton',
    kind: 'edmonton',
    progress: true,
    kicker: 'Sintomas',
    title: 'Avaliação de Sintomas de Edmonton',
    intro: 'Para cada sintoma, arraste de 0 a 10 conforme como o paciente está agora.',
    answerKey: 'edmonton',
  },

  // ── Plano ─────────────────────────────────────────────────
  plano: {
    id: 'plano',
    kind: 'plano',
    progress: true,
    kicker: 'Plano compartilhado',
    title: 'Plano compartilhado',
    answerKey: 'plano',
  },
  reflexao: {
    id: 'reflexao',
    kind: 'fields',
    progress: true,
    kicker: 'Reflexão',
    title: 'O que familiar e paciente me trazem para registro / pendência?',
    answerKey: 'reflexao',
    fields: [
      { id: 'registro', label: '', placeholder: 'Escreva livremente…', multiline: true },
    ],
  },
  dav: {
    id: 'dav',
    kind: 'choice',
    progress: true,
    kicker: 'DAV',
    question: 'Qual a capacidade de decisão do paciente neste momento?',
    body: 'Nem sempre é possível mudar o curso da doença. Mas ainda é possível conversar sobre escolhas, desejos e o que faz sentido para cada pessoa.',
    poem: {
      lines: [
        'Com a chave na mão',
        'quer abrir a porta,',
        'não existe porta;',
        'quer morrer no mar,',
        'mas o mar secou;',
      ],
      author: 'Carlos Drummond de Andrade',
    },
    answerKey: 'dav',
    options: [
      { value: 'consciente', label: 'Consciente e capaz' },
      { value: 'incapaz', label: 'Incapaz de decidir' },
    ],
  },
  davConsciente: {
    id: 'davConsciente',
    kind: 'intro',
    progress: true,
    kicker: 'DAV',
    title:
      'Programe a aplicação da DAV (Diretivas Antecipadas de Vontade) juntamente com o paciente e a família.',
    continueLabel: 'Finalizar',
  },
  davIncapaz: {
    id: 'davIncapaz',
    kind: 'intro',
    progress: true,
    kicker: 'Plano Antecipado de Cuidados',
    title:
      'Programe com a família ou o cuidador responsável a aplicação do Plano Antecipado de Cuidados.',
    continueLabel: 'Finalizar',
  },

  // ── Fechamento ────────────────────────────────────────────
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
  final: {
    id: 'final',
    kind: 'closing',
    progress: false,
    lines: ['você marcha, José!', 'José, para onde?'],
    body: 'Que este percurso ajude a transformar a dúvida em caminho e o conhecimento em cuidado.',
    signature: ['Thais Cristina da Silva', 'Mestranda em Saúde da Família — PROFSAÚDE'],
  },
}

export type Answers = Record<string, unknown>

/** Resolve a próxima etapa a partir da atual e das respostas (branching real). */
export function getNextStepId(current: StepId, answers: Answers): StepId | null {
  switch (current) {
    case 'consentimento':
      return 'doenca'
    case 'doenca':
      return answers.doencaAmeacadora === 'nao' ? 'reavaliar' : 'surpresa'
    case 'surpresa':
      // "Sim, me surpreenderia" passa pela recomendação; "Não" vai direto ao SPICT.
      return answers.perguntaSurpresa === 'sim' ? 'recomendacao' : 'spictGerais'
    case 'recomendacao':
      return 'spictGerais'
    case 'spictGerais':
      return 'spictClinicos'
    case 'spictClinicos':
      return 'pps'
    case 'pps':
      // Branch "Morte" na deambulação → acolhimento (a ser habilitado no Épico C).
      return answers.pps === 0 ? 'acolhimento' : 'resultado'
    case 'resultado':
      return 'fisica'
    case 'fisica':
      return 'psicologica'
    case 'psicologica':
      return 'social'
    case 'social':
      return 'espiritual'
    case 'espiritual':
      return 'familiar'
    case 'familiar':
      return 'edmonton'
    case 'edmonton':
      return 'plano'
    case 'plano':
      return 'reflexao'
    case 'reflexao':
      return 'dav'
    case 'dav':
      return answers.dav === 'consciente' ? 'davConsciente' : 'davIncapaz'
    case 'davConsciente':
    case 'davIncapaz':
      return 'preparando'
    case 'preparando':
      return 'resumo'
    case 'resumo':
      return 'final'
    case 'final':
    case 'reavaliar':
    case 'acolhimento':
      return null
    default:
      return null
  }
}

export const FIRST_STEP: StepId = 'consentimento'

/** Etapas que são interstício (não entram no histórico de navegação). */
export function isInterstitial(id: StepId): boolean {
  return steps[id].kind === 'loading'
}

/**
 * Progresso dinâmico do caminho atual.
 * Conta as etapas que já contam (history + atual) e projeta o restante do
 * caminho via getNextStepId. Nos terminais, fecha em 100%.
 */
export function getProgress(
  current: StepId,
  history: StepId[],
  answers: Answers,
): { index: number; total: number; atTerminal: boolean } {
  const done =
    history.filter((id) => steps[id].progress).length + (steps[current].progress ? 1 : 0)

  let total = done
  const seen = new Set<StepId>([current, ...history])
  let cursor: StepId = current
  for (let i = 0; i < 60; i++) {
    const next = getNextStepId(cursor, answers)
    if (!next || seen.has(next)) break
    seen.add(next)
    if (steps[next].progress) total++
    cursor = next
  }

  const atTerminal = getNextStepId(current, answers) === null
  return { index: done, total: Math.max(total, done, 1), atTerminal }
}
