import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { pageOrder } from '@/content/pageOrder'

/**
 * Navegação entre as páginas estáticas, na ordem do índice "Para conhecer".
 * Na primeira página, "Anterior" vira "Início"; a última não exibe "Próxima".
 */
export function PageNav() {
  const { pathname } = useLocation()
  const i = pageOrder.findIndex((p) => p.path === pathname)

  const prev =
    i <= 0
      ? { to: '/', label: 'Início' }
      : { to: pageOrder[i - 1].path, label: 'Anterior' }
  const next =
    i >= 0 && i < pageOrder.length - 1
      ? { to: pageOrder[i + 1].path, label: 'Próxima' }
      : null

  return (
    <nav className="mb-10 flex items-center justify-between gap-4">
      <Link
        to={prev.to}
        className="group inline-flex items-center gap-2 text-sm text-forest/50 transition-colors hover:text-moss"
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="text-xs transition-transform duration-300 ease-gentle group-hover:-translate-x-0.5"
        />
        {prev.label}
      </Link>

      {next && (
        <Link
          to={next.to}
          className="group inline-flex items-center gap-2 text-sm text-forest/50 transition-colors hover:text-moss"
        >
          {next.label}
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-xs transition-transform duration-300 ease-gentle group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </nav>
  )
}
