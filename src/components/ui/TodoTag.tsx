import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenRuler } from '@fortawesome/free-solid-svg-icons'

/**
 * Marca visual discreta de conteúdo PLACEHOLDER.
 * Sinaliza, sem gritar, o que ainda vai ser substituído pelo conteúdo final.
 */
export function TodoTag({ label = 'conteúdo provisório' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-moss/30 bg-sage-100 px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-wide text-moss">
      <FontAwesomeIcon icon={faPenRuler} className="text-[0.6rem]" />
      {label}
    </span>
  )
}
