import { sections } from './sections'

export interface PageRef {
  path: string
  label: string
}

/**
 * Ordem de leitura das páginas estáticas — a mesma do índice "Para conhecer".
 * Alimenta a navegação Anterior/Próxima (ver PageNav).
 */
export const pageOrder: PageRef[] = [
  { path: '/e-agora-jose', label: 'E agora, José?' },
  ...sections.map((s) => ({ path: s.path, label: s.menuLabel })),
]
