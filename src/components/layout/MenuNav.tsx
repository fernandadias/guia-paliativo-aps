import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { sections } from '@/content/sections'
import { gentle, gentleFast } from '@/lib/motion'

const items = [
  ...sections.map((s) => ({ label: s.menuLabel, path: s.path })),
  { label: 'Guia de direção clínica', path: '/guia' },
]

interface MenuNavProps {
  open: boolean
  onClose: () => void
}

export function MenuNav({ open, onClose }: MenuNavProps) {
  const location = useLocation()

  // Fecha ao trocar de rota.
  useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // Trava o scroll do body enquanto aberto.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-sage to-cream"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: gentleFast }}
          exit={{ opacity: 0, transition: gentleFast }}
        >
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6 sm:px-10">
            <span className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-forest">
              Navegação
            </span>
            <button
              onClick={onClose}
              aria-label="Fechar menu"
              className="rounded-full p-2 text-forest transition-colors hover:bg-forest/10"
            >
              <span className="block h-5 w-5 text-2xl leading-none">×</span>
            </button>
          </div>

          <nav className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-1 px-6 pb-16 sm:px-10">
            {items.map((item, i) => {
              const active = location.pathname === item.path
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...gentle, delay: 0.06 + i * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className="group flex items-baseline justify-between gap-4 border-b border-forest/10 py-4"
                  >
                    <span
                      className={`font-serif text-2xl leading-tight transition-colors sm:text-4xl ${
                        active ? 'text-moss italic' : 'text-forest group-hover:text-moss'
                      }`}
                    >
                      {item.label}
                    </span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="shrink-0 translate-x-0 text-sm text-forest/40 transition-transform duration-300 ease-gentle group-hover:translate-x-1 group-hover:text-moss"
                    />
                  </Link>
                </motion.div>
              )
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
