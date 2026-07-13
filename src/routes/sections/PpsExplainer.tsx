import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator, faXmark } from '@fortawesome/free-solid-svg-icons'
import { gentleFast } from '@/lib/motion'

/**
 * Gatilho + modal que explica, de forma curta e técnica, como o Guia sugere o
 * PPS (regra lexicográfica). Espelha o comportamento de suggestPps em pps.ts.
 */
export function PpsExplainer() {
  const [open, setOpen] = useState(false)

  // Esc fecha; trava o scroll do body enquanto aberto.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2 font-medium text-moss transition-colors hover:text-forest"
      >
        <FontAwesomeIcon icon={faCalculator} className="text-sm" />
        Entenda como o Guia aplica o cálculo do PPS
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-forest/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: gentleFast }}
            exit={{ opacity: 0, transition: gentleFast }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Como o Guia aplica o cálculo do PPS"
              className="max-h-[90svh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-forest/10 bg-paper p-6 sm:rounded-3xl sm:p-8"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: gentleFast }}
              exit={{ y: 24, opacity: 0, transition: gentleFast }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-moss">
                    PPS · Palliative Performance Scale
                  </p>
                  <h3 className="mt-1 font-serif text-2xl text-forest">
                    Como o Guia sugere o valor
                  </h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fechar"
                  className="-mr-1 -mt-1 shrink-0 rounded-full p-2 text-forest/60 transition-colors hover:bg-forest/10 hover:text-forest"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              <div className="mt-5 space-y-4 leading-relaxed text-forest/80">
                <p>
                  Base: <strong>Palliative Performance Scale</strong> (Maciel, 2009 / Victoria
                  Hospice) — 5 colunas por 10 níveis (100% a 10%).
                </p>
                <p>
                  A leitura é <strong>lexicográfica, da esquerda para a direita</strong>. A{' '}
                  <strong>Deambulação</strong> define o bloco; cada coluna seguinte — Atividade,
                  Autocuidado, Ingestão e Consciência — apenas <strong>refina</strong> dentro do
                  que as anteriores já permitiram.
                </p>
                <p>
                  Se uma coluna <strong>não corresponde</strong> a nenhuma candidata do bloco
                  atual, ela é <strong>ignorada</strong>: colunas da direita nunca sobrepõem as de
                  maior prioridade. Em empate, arredonda-se para o nível{' '}
                  <strong>mais grave (menor %)</strong>.
                </p>
                <p className="text-sm text-forest/60">
                  A sugestão é sempre <strong>ajustável manualmente</strong> — o valor final cabe
                  ao julgamento clínico do profissional.
                </p>

                <div className="rounded-2xl border border-forest/10 bg-cream-50/60 p-4">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-moss">
                    Faixas de cuidado
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-forest/75">
                    <li>≥ 80% · cuidados paliativos precoces</li>
                    <li>50–79% · complementares</li>
                    <li>30–49% · predominantes</li>
                    <li>10–29% · exclusivos</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
