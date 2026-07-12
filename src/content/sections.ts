/**
 * Conteúdo das seções informativas.
 *
 * ⚠️  PLACEHOLDER — todo texto marcado com `todo: true` é provisório.
 * O conteúdo definitivo será fornecido pela cliente numa etapa seguinte.
 * A estrutura já está no formato final: basta preencher/editar os campos.
 */

export type SectionBlock =
  | { kind: 'lead'; text: string; todo?: boolean }
  | { kind: 'paragraph'; text: string; todo?: boolean }
  | { kind: 'quote'; text: string; author?: string; todo?: boolean }
  | { kind: 'list'; title?: string; items: string[]; todo?: boolean }
  | { kind: 'callout'; icon: string; title: string; text?: string; items?: string[]; todo?: boolean }

export interface Section {
  slug: string
  path: string
  menuLabel: string
  title: string
  kicker: string
  intro: string
  /** Frase curta usada no índice "Para conhecer" da home. */
  blurb: string
  blocks: SectionBlock[]
  todo?: boolean
}

const LOREM =
  'Conteúdo provisório. Este texto será substituído pelo material definitivo. ' +
  'Descreve, de forma breve e sensível, o essencial que o profissional precisa reter neste momento.'

export const sections: Section[] = [
  {
    slug: 'sobre',
    path: '/sobre',
    menuLabel: 'O que são cuidados paliativos',
    kicker: 'Antes de tudo',
    title: 'O que são cuidados paliativos',
    intro:
      'Cuidados paliativos não significam desistir. Significam cuidar melhor, e podem começar muito antes da terminalidade.',
    blurb: 'O conceito, os princípios e por que o cuidado pode começar cedo.',
    todo: true,
    blocks: [
      {
        kind: 'lead',
        text:
          '“uma abordagem que melhora a qualidade de vida de pacientes com doenças que ameacem a vida, ' +
          'integrando a família nesse contexto, para prevenção e alívio do sofrimento por meio da ' +
          'identificação precoce, avaliação correta e tratamento da dor e de outros problemas físicos, ' +
          'psicossociais e espirituais” (OMS, 2020)',
      },
      {
        kind: 'callout',
        icon: 'heart',
        title: 'Conceitos essenciais',
        items: [
          'Cuidado centrado na pessoa e na sua família',
          'Controle de sintomas e alívio do sofrimento',
          'Comunicação honesta e compassiva',
          'Planejamento compartilhado do cuidado',
        ],
      },
      { kind: 'paragraph', text: LOREM, todo: true },
    ],
  },
  {
    slug: 'por-que-aps',
    path: '/por-que-aps',
    menuLabel: 'Por que atuar em CP na APS',
    kicker: 'O seu papel',
    title: 'Por que você deve atuar em cuidados paliativos na APS',
    intro:
      'A Atenção Primária é o lugar do vínculo, da longitudinalidade e da proximidade. É onde o cuidado paliativo pode começar mais cedo.',
    blurb: 'Vínculo, longitudinalidade e o lugar da APS na linha de cuidado.',
    todo: true,
    blocks: [
      { kind: 'lead', text: LOREM, todo: true },
      { kind: 'paragraph', text: LOREM, todo: true },
      {
        kind: 'quote',
        text: 'O mais difícil nunca foi falar sobre a morte. Foi perceber que ninguém havia começado essa conversa.',
        author: 'Profissional entrevistado',
      },
      { kind: 'paragraph', text: LOREM, todo: true },
    ],
  },
  {
    slug: 'politica',
    path: '/politica',
    menuLabel: 'Política Nacional de CP',
    kicker: 'Marco normativo',
    title: 'Política Nacional de Cuidados Paliativos',
    intro:
      'O que diz a legislação e como ela ampara a sua prática na APS.',
    blurb: 'O que a legislação garante e como ampara a sua prática.',
    todo: true,
    blocks: [
      { kind: 'lead', text: LOREM, todo: true },
      {
        kind: 'list',
        title: 'Pontos-chave',
        items: [
          'Marco legal e diretrizes',
          'Organização da rede de atenção',
          'Papel da APS na linha de cuidado',
        ],
        todo: true,
      },
      { kind: 'paragraph', text: LOREM, todo: true },
    ],
  },
  {
    slug: 'ferramentas',
    path: '/ferramentas',
    menuLabel: 'Ferramentas de elegibilidade',
    kicker: 'Instrumentos',
    title: 'Ferramentas de elegibilidade',
    intro:
      'Instrumentos que ajudam a identificar quem se beneficia do cuidado paliativo, e quando.',
    blurb: 'PPS, Pergunta Surpresa e SPICT-BR: quem se beneficia, e quando.',
    todo: true,
    blocks: [
      { kind: 'lead', text: LOREM, todo: true },
      {
        kind: 'callout',
        icon: 'gauge',
        title: 'PPS: Palliative Performance Scale',
        text: 'Avalia a funcionalidade e ajuda a situar o paciente na linha do cuidado.',
        todo: true,
      },
      {
        kind: 'callout',
        icon: 'clipboard-question',
        title: 'Pergunta Surpresa & SPICT-BR',
        text: 'Instrumentos de triagem para identificar necessidade de cuidados paliativos.',
        todo: true,
      },
      {
        kind: 'paragraph',
        text: 'Estas ferramentas estão aplicadas de forma prática no Guia de direção clínica.',
      },
    ],
  },
  {
    slug: 'spikes',
    path: '/spikes',
    menuLabel: 'SPIKES',
    kicker: 'Comunicação',
    title: 'SPIKES',
    intro:
      'Um roteiro para conversas difíceis, não como aula, mas como apoio para comunicar más notícias com cuidado.',
    blurb: 'Um roteiro para conversas difíceis, sem transformar em aula.',
    todo: true,
    blocks: [
      { kind: 'lead', text: LOREM, todo: true },
      {
        kind: 'list',
        title: 'As seis etapas',
        items: [
          'S de Setting: prepare o ambiente',
          'P de Perception: o que o paciente já compreende',
          'I de Invitation: quanto ele deseja saber',
          'K de Knowledge: transmita a informação',
          'E de Emotions: acolha as emoções',
          'S de Strategy: combine os próximos passos',
        ],
        todo: true,
      },
      {
        kind: 'paragraph',
        text: 'O SPIKES também aparece como roteiro guiado dentro do Guia de direção clínica.',
      },
    ],
  },
]

export const sectionByPath = (path: string) => sections.find((s) => s.path === path)
