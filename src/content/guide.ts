/**
 * Guia de direção clínica — definição das etapas como DADOS (v2).
 *
 * O motor (useGuideState) interpreta estes objetos; nenhuma tela é hardcoded.
 * Para ajustar texto ou regra depois, edita-se aqui, sem tocar em componente.
 *
 * Reestruturação v2 (ver .design-prototype/v2-planejamento/mapa.html):
 *   - Fluxo: intro > doença > (surpresa > [recomendação] > SPICT gerais > SPICT clínicos > PPS) > resultado
 *            > cinco dimensões (física, psicológica, social, espiritual, familiar, Edmonton)
 *            > SPIKES > plano > reflexão > DAV > resumo
 *   - Telas terminais: "reavaliar" (doença = não) e "acolhimento" (morte no PPS).
 *   - Telas do Épico C entram como PLACEHOLDER navegável (kind 'placeholder').
 *   - Conteúdo clínico é placeholder; parte da copy depende da cliente.
 */

export type StepId =
  | 'intro'
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
  | 'spikes'
  | 'plano'
  | 'reflexao'
  | 'dav'
  | 'davAplicar'
  | 'preparando'
  | 'resumo'

export interface ChoiceOption {
  value: string
  label: string
  description?: string
}

interface StepCommon {
  id: StepId
  /** Se a etapa conta na barra de progresso (terminais/interstícios não contam). */
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
    | { kind: 'pps'; kicker: string; question: string; note: string; answerKey: string; todo?: boolean }
    | { kind: 'clinicos'; kicker: string; title: string; intro: string; answerKey: string }
    | { kind: 'edmonton'; kicker: string; title: string; intro: string; answerKey: string }
    | { kind: 'familiar'; kicker: string; title: string; intro: string; answerKey: string }
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
    | { kind: 'terminal'; icon: string; title: string; body: string; todo?: boolean }
    | { kind: 'loading'; message: string; submessage: string }
    | { kind: 'placeholder'; kicker: string; title: string; body: string; epic: string }
  )

export type PpsBand = 'precoce' | 'complementar' | 'predominante' | 'exclusivo'

export const steps: Record<StepId, Step> = {
  // ── Abertura ──────────────────────────────────────────────
  intro: {
    id: 'intro',
    kind: 'intro',
    progress: true,
    kicker: 'Antes de tudo',
    title: 'O que são cuidados paliativos?',
    body: 'Cuidados paliativos não significam desistir. Significam cuidar melhor. Apenas os conceitos essenciais, sem texto enorme. (Copy final virá da cliente.)',
    asideVerseKey: 'abertura',
    todo: true,
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
    body: 'Este paciente não apresenta critérios para avaliação neste momento. Lembre-se de reavaliá-lo periodicamente. (Copy final virá da cliente.)',
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
    body: 'Fase de acolhimento da família. Conteúdo e formato a serem definidos pela cliente. (Acionada quando a deambulação indica "Morte" no PPS.)',
    todo: true,
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
    kind: 'placeholder',
    progress: true,
    kicker: 'Dimensão física',
    title: 'Dor',
    body: 'Fluxo: "Tem dor?" Se sim, "Paciente consciente?" leva à EVA (faces) ou à PAINAD (ilustrações). Mais local da dor e medicações em uso. UI a ser construída no sandbox.',
    epic: 'C · Física / Dor (T11)',
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
    kind: 'fields',
    progress: true,
    kicker: 'Dimensão social',
    title: 'Social',
    answerKey: 'dimSocial',
    intro: 'Rede de apoio e benefícios sociais. A lógica condicional (rede de apoio sim/não) e as opções de benefícios entram na sequência (cliente).',
    fields: [
      { id: 'quemCuida', label: 'Quem cuida?', placeholder: 'Anotar…' },
      { id: 'redeApoio', label: 'Existe rede de apoio? Quem é?', placeholder: 'Anotar…', multiline: true },
      { id: 'beneficios', label: 'Benefícios sociais', placeholder: 'Anotar… (opções virão da cliente)' },
    ],
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
    kicker: 'Dimensão familiar',
    title: 'Familiar',
    answerKey: 'dimFamiliar',
    intro: 'Dinâmica familiar, sobrecarga do cuidador e conflitos. (As opções com ícone da dinâmica virão da cliente.)',
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

  // ── Comunicação e plano ───────────────────────────────────
  spikes: {
    id: 'spikes',
    kind: 'checklist',
    progress: true,
    kicker: 'Comunicação',
    title: 'SPIKES: Comunicação de más notícias',
    intro: 'Um roteiro para a conversa. Marque conforme avança; toque em "Mais detalhes" para ver a descrição.',
    answerKey: 'spikes',
    items: [
      {
        id: 'spikes-s',
        code: 'S',
        label: 'Setting up · Preparando-se para a conversa',
        detail: 'No contexto domiciliar o paciente costuma se sentir mais à vontade. Aproveite o ambiente para uma comunicação aberta e transparente.',
      },
      {
        id: 'spikes-p',
        code: 'P',
        label: 'Perception · Avaliação da percepção do paciente',
        detail: 'Observe o contexto domiciliar e pergunte o que já foi dito ao paciente, cuidador e família sobre a doença.',
      },
      {
        id: 'spikes-i',
        code: 'I',
        label: 'Invitation · Convidando para o diálogo',
        detail: 'Questione se o paciente quer entender mais sobre o processo de saúde e doença.',
      },
      {
        id: 'spikes-k',
        code: 'K',
        label: 'Knowledge · Transmitindo as informações',
        detail: 'Informação clara e adaptada ao nível de compreensão. Evite excesso de termos técnicos, permita perguntas e divida a informação em cada visita.',
      },
      {
        id: 'spikes-e',
        code: 'E',
        label: 'Emotions · Expressando e validando as informações',
        detail: 'Favoreça a expressão do paciente e da família e acolha os sentimentos. Se chorar, espere retomar. Evite dizer que tudo ficará bem.',
      },
      {
        id: 'spikes-s2',
        code: 'S',
        label: 'Summarize · Resumo e pactuação das ações',
        detail: 'Ao fim da visita, construam juntos um plano de cuidados que considere o que foi conversado, revisando pelo entendimento do paciente.',
      },
    ],
  },
  plano: {
    id: 'plano',
    kind: 'fields',
    progress: true,
    kicker: 'Plano compartilhado',
    title: 'Plano compartilhado',
    answerKey: 'plano',
    todo: true,
    fields: [
      { id: 'desejos', label: 'Desejos do paciente', placeholder: 'O que importa para esta pessoa…', multiline: true },
      { id: 'objetivos', label: 'Objetivos do cuidado', placeholder: 'Para onde caminhamos juntos…', multiline: true },
      { id: 'sintomas', label: 'Controle de sintomas', placeholder: 'Prioridades de manejo…', multiline: true },
      { id: 'responsavel', label: 'Quem será responsável', placeholder: 'Profissional ou cuidador de referência…' },
      { id: 'matriciado', label: 'Será matriciado o caso? (sim/não)', placeholder: 'Sim ou não… (vira Sim/Não na Trilha 1)' },
      { id: 'emad', label: 'Encaminhamento a EMAD? (sim/não)', placeholder: 'Sim ou não… (vira Sim/Não na Trilha 1)' },
      { id: 'reavaliar', label: 'Quando reavaliar', placeholder: 'Semanalmente / Quinzenalmente / Mensalmente / Outro…' },
    ],
  },
  reflexao: {
    id: 'reflexao',
    kind: 'fields',
    progress: true,
    kicker: 'Reflexão',
    title: 'O que levo desse atendimento?',
    answerKey: 'reflexao',
    fields: [
      { id: 'sentimento', label: 'Meu sentimento após esta avaliação é:', placeholder: 'Escreva livremente…', multiline: true },
      { id: 'paciente', label: 'O que o paciente me traz para registro?', placeholder: 'Escreva livremente…', multiline: true },
      { id: 'familia', label: 'O que a família me traz para registro?', placeholder: 'Escreva livremente…', multiline: true },
    ],
  },
  dav: {
    id: 'dav',
    kind: 'choice',
    progress: true,
    kicker: 'DAV',
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
        description: 'Planejamento antecipado de cuidados com o representante.',
      },
    ],
  },
  davAplicar: {
    id: 'davAplicar',
    kind: 'choice',
    progress: true,
    kicker: 'DAV',
    question: 'É possível aplicar a Diretiva Antecipada de Cuidado?',
    answerKey: 'davAplicar',
    options: [
      {
        value: 'sim',
        label: 'Sim',
        description: 'É possível aplicar a Diretiva Antecipada de Cuidado. (Conteúdo do desfecho: cliente.)',
      },
      {
        value: 'nao',
        label: 'Não',
        description: 'Programe a realização. (Conteúdo do desfecho: cliente.)',
      },
    ],
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
}

export type Answers = Record<string, unknown>

/** Resolve a próxima etapa a partir da atual e das respostas (branching real). */
export function getNextStepId(current: StepId, answers: Answers): StepId | null {
  switch (current) {
    case 'intro':
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
      return 'spikes'
    case 'spikes':
      return 'plano'
    case 'plano':
      return 'reflexao'
    case 'reflexao':
      return 'dav'
    case 'dav':
      return answers.dav === 'consciente' ? 'davAplicar' : 'preparando'
    case 'davAplicar':
      return 'preparando'
    case 'preparando':
      return 'resumo'
    case 'resumo':
    case 'reavaliar':
    case 'acolhimento':
      return null
    default:
      return null
  }
}

export const FIRST_STEP: StepId = 'intro'

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
