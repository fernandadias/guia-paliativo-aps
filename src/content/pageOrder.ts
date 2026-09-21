import { sections } from './sections'

export interface PageRef {
  path: string
  label: string
  /** Frase curta usada no índice "Para conhecer" da home. */
  blurb: string
}

/** O poema não é uma Section: entra na ordem logo depois desta seção. */
const poemaDepoisDe = 'sobre-o-mestrado'

const poema: PageRef = {
  path: '/e-agora-jose',
  label: 'E agora, José?',
  blurb: 'O poema de Drummond como fio condutor do cuidado.',
}

/**
 * Ordem de leitura das páginas estáticas, fonte única de três lugares:
 * o índice "Para conhecer" da home, o menu (MenuNav) e o Anterior/Próxima (PageNav).
 */
export const pageOrder: PageRef[] = sections.flatMap((s) => {
  const ref: PageRef = { path: s.path, label: s.menuLabel, blurb: s.blurb }
  return s.slug === poemaDepoisDe ? [ref, poema] : [ref]
})
