import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenNib } from '@fortawesome/free-solid-svg-icons'

/** Selo sutil: parte do conteúdo desta tela ainda depende da cliente. */
export function PendingTag() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/70 px-3 py-1 text-xs font-medium text-amber-800">
      <FontAwesomeIcon icon={faPenNib} className="text-[0.65rem]" />
      Conteúdo da cliente
    </span>
  )
}
