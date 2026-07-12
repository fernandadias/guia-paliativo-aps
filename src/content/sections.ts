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
  | { kind: 'link'; text: string; href: string; todo?: boolean }

export interface Section {
  slug: string
  path: string
  menuLabel: string
  title: string
  kicker: string
  intro?: string
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
    ],
  },
  {
    slug: 'por-que-aps',
    path: '/por-que-aps',
    menuLabel: 'Por que atuar em cuidados paliativos na APS',
    kicker: 'O seu papel',
    title: 'Por que você deve atuar em cuidados paliativos na APS',
    blurb: 'Vínculo, longitudinalidade e o lugar da APS na linha de cuidado.',
    blocks: [
      {
        kind: 'paragraph',
        text:
          'O cuidado paliativo deve ser exercido na Atenção Primária à Saúde porque é nesse nível que ' +
          'se estabelece o vínculo mais próximo, contínuo e humanizado entre profissional e paciente, ' +
          'essencial para acompanhar a pessoa e sua família ao longo de todo o processo de adoecimento ' +
          'até o último dia de vida.',
      },
      {
        kind: 'callout',
        icon: 'house-user',
        title: 'Importância do cuidado paliativo na APS',
        items: [
          'Vínculo: proximidade humaniza o cuidado.',
          'Longitudinalidade: acompanhamento contínuo identifica necessidades cedo.',
          'Coordenação do cuidado: articula a rede e apoia a família no fim de vida.',
        ],
      },
      {
        kind: 'quote',
        text:
          'É cuidar de pessoas que estão tendo doenças terminais, né, pra dar uma qualidade de vida, ' +
          'cuidar da parte física, mental, psicológica e também espiritual também, né, entra. Então, ' +
          'eu acho muito importante, porque dá uma qualidade de vida, a pessoa se sente viva, né?',
        author: 'Agente Comunitário de Saúde 2',
      },
    ],
  },
  {
    slug: 'politica',
    path: '/politica',
    menuLabel: 'Política Nacional de Cuidados Paliativos',
    kicker: 'Marco normativo',
    title: 'Política Nacional de Cuidados Paliativos',
    blurb: 'O que a legislação garante e como ampara a sua prática.',
    blocks: [
      {
        kind: 'paragraph',
        text:
          'A Política Nacional de Cuidados Paliativos (PNCP), instituída pela Portaria GM/MS nº 3.681, ' +
          'de 7 de maio de 2024, organiza os cuidados paliativos no âmbito do SUS e estabelece as bases ' +
          'para a atuação dos profissionais de saúde, orientando a equipe multiprofissional na promoção ' +
          'de equidade, integralidade e atendimento digno ao paciente, com foco na qualidade de vida ' +
          'até o último dia.',
      },
      {
        kind: 'link',
        text: 'Conheça a política na íntegra aqui',
        href: 'https://www.in.gov.br/web/dou/-/portaria-gm/ms-n-3.681-de-7-de-maio-de-2024-561223717',
      },
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
