import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Logo } from './Logo'
import { MenuNav } from './MenuNav'

/** Header transparente que assenta sobre o conteúdo (papel ou degradê). */
export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <header className="pointer-events-none absolute inset-x-0 top-0 z-40">
        <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
          <Logo />
          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            className="inline-flex items-center gap-2 rounded-full border border-forest/10 bg-paper px-4 py-2 text-[0.8rem] font-medium text-forest transition-colors hover:bg-cream-50"
          >
            <FontAwesomeIcon icon={faBars} className="text-xs" />
            <span>Menu</span>
          </button>
        </div>
      </header>
      <MenuNav open={open} onClose={() => setOpen(false)} />
    </>
  )
}
