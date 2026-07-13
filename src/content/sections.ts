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
  | { kind: 'callout'; icon: string; title: string; text?: string; items?: string[]; href?: string; todo?: boolean }
  | { kind: 'link'; text: string; href: string; todo?: boolean }
  | { kind: 'links'; title?: string; items: { text: string; href: string }[]; todo?: boolean }
  | { kind: 'ppsExplainer' }

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
    blocks: [
      {
        kind: 'callout',
        icon: 'gauge',
        title: 'PPS: Palliative Performance Scale',
        text: 'Avalia a funcionalidade e ajuda a situar o paciente na linha do cuidado.',
        href: '/pdfs/pps-cuidados-paliativos.pdf',
      },
      {
        kind: 'callout',
        icon: 'clipboard-question',
        title: 'SPICT-BR',
        text:
          'Instrumento de triagem que ajuda os profissionais de saúde a identificar precocemente ' +
          'pacientes que podem se beneficiar de uma abordagem paliativa, antes que haja um declínio ' +
          'visível das condições de saúde.',
        href: '/pdfs/spict-br-cuidados-paliativos.pdf',
      },
      {
        kind: 'callout',
        icon: 'clipboard-question',
        title: 'SPICT-BR Acessível',
        href: '/pdfs/spict-br-versao-acessivel.pdf',
      },
      {
        kind: 'callout',
        icon: 'hand-holding-medical',
        title: 'Plano de cuidados paliativos',
        text:
          'O Plano de Cuidados Paliativos é o documento em que a equipe organiza, de forma ' +
          'individualizada, as ações voltadas ao alívio do sofrimento do paciente e da família.',
        href: '/pdfs/plano-de-cuidados-cuidados-paliativos.pdf',
      },
      {
        kind: 'callout',
        icon: 'dove',
        title: 'SPIKES — protocolo de comunicação de más notícias',
        text:
          'O SPIKES orienta profissionais na comunicação de más notícias, como um diagnóstico grave, ' +
          'o agravamento de uma doença ou o óbito de um paciente. Seu nome é um acrônimo que representa ' +
          'seis etapas sequenciais da conversa.',
        href: '/pdfs/spikes.pdf',
      },
      {
        kind: 'callout',
        icon: 'people-group',
        title: 'Escala de ZARIT',
        text:
          'A Escala de ZARIT é um instrumento para avaliar a sobrecarga do cuidador, ou seja, o quanto ' +
          'a rotina de cuidar de uma pessoa com doença crônica ou em cuidados paliativos está afetando ' +
          'a vida física, emocional, social e financeira de quem cuida.',
        href: '/pdfs/escala-de-zarit-cuidados-paliativos.pdf',
      },
      {
        kind: 'callout',
        icon: 'wave-square',
        title: 'ESAS',
        text:
          'O ESAS, sigla para Edmonton Symptom Assessment System, é um instrumento de avaliação de ' +
          'sintomas que mensura, em escala numérica, a intensidade de sintomas físicos e psicológicos ' +
          'apresentados pelo paciente em cuidados paliativos, como dor, fadiga, náusea, ansiedade, ' +
          'depressão, sonolência e falta de ar.',
        href: '/pdfs/esas-r-cuidados-paliativos.pdf',
      },
      {
        kind: 'links',
        title: 'Para mais informações, acesse:',
        items: [
          {
            text: 'Kit de Cuidados Paliativos',
            href: 'https://prefeitura.sp.gov.br/documents/d/saude/kit_cuidados_paliativos_v1_24-pdf',
          },
          {
            text: 'Instrumento de Avaliação de Necessidades de Cuidados Paliativos',
            href: 'https://prefeitura.sp.gov.br/documents/d/saude/incp-instrumento-de-avaliacao-de-necessidades-de-cuidados-paliativos-pdf',
          },
          {
            text: 'Diretriz Técnica de Cuidados Paliativos na Atenção Domiciliar',
            href: 'https://prefeitura.sp.gov.br/documents/d/saude/diretrizes_cuidados_paliativos_25_v2-pdf-1',
          },
        ],
      },
      {
        kind: 'paragraph',
        text: 'Algumas dessas ferramentas estão aplicadas de forma prática no Guia de direção clínica.',
      },
      { kind: 'ppsExplainer' },
    ],
  },
]

export const sectionByPath = (path: string) => sections.find((s) => s.path === path)
