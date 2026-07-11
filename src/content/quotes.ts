/**
 * Frases do José (Drummond) e narrativas de profissionais.
 *
 * ⚠️  PLACEHOLDER — os versos abaixo são provisórios/ilustrativos.
 * O "toque artístico" (ver _refs/etapas.md) pede que o poema DIALOGUE com o
 * percurso, aparecendo contextualizado em cada momento do guia — não como
 * epígrafe solta. As `key`s abaixo já amarram cada frase ao seu momento.
 */

export interface Verse {
  key: string
  text: string
  attribution?: string
  todo?: boolean
}

/** Versos "do José" — mapeados por momento do guia. */
export const verses: Record<string, Verse> = {
  abertura: {
    key: 'abertura',
    text: 'E agora, José?',
    attribution: 'Carlos Drummond de Andrade (provisório)',
    todo: true,
  },
  aposFuncionalidade: {
    key: 'aposFuncionalidade',
    text: 'Você marcha, José! José, para onde?',
    attribution: 'Carlos Drummond de Andrade (provisório)',
    todo: true,
  },
  aposPrognostico: {
    key: 'aposPrognostico',
    text: 'A festa não começou, / a luz não acendeu, / José, e agora?',
    attribution: 'Carlos Drummond de Andrade (provisório)',
    todo: true,
  },
  aposFamilia: {
    key: 'aposFamilia',
    text: 'Sozinho no escuro / qual bicho-do-mato, / sem teogonia, / sem parede nua / para se encostar.',
    attribution: 'Carlos Drummond de Andrade (provisório)',
    todo: true,
  },
  aposPlano: {
    key: 'aposPlano',
    text: 'Mas você não morre, / você é duro, José!',
    attribution: 'Carlos Drummond de Andrade (provisório)',
    todo: true,
  },
}

/** Caixas de reflexão — narrativas de profissionais entrevistados. */
export const reflections: Verse[] = [
  {
    key: 'reflexao-1',
    text: 'O mais difícil nunca foi falar sobre a morte. Foi perceber que ninguém havia começado essa conversa.',
    attribution: 'Profissional entrevistado (provisório)',
    todo: true,
  },
  {
    key: 'reflexao-2',
    text: 'Toda equipe também precisa saber para onde caminha.',
    attribution: 'Profissional entrevistado (provisório)',
    todo: true,
  },
]
