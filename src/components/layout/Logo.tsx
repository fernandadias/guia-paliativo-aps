import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

/** Marca do produto — ícone + wordmark em versalete. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn(
        'inline-flex items-center gap-2.5 text-forest transition-opacity hover:opacity-70',
        className,
      )}
    >
      <FontAwesomeIcon icon={faHandHoldingHeart} className="text-[1.05rem] text-moss" />
      <span className="text-[0.78rem] font-semibold uppercase tracking-[0.18em]">
        Guia Paliativo APS
      </span>
    </Link>
  )
}
