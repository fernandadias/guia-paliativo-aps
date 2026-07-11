import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { StepShell } from '../StepShell'
import { useGuide } from '../useGuideState'
import { getIcon } from '@/lib/icons'
import { gentleFast } from '@/lib/motion'
import { condicoesClinicas } from '@/content/clinicos'
import type { Step } from '@/content/guide'

type Marks = Record<string, Record<string, boolean>>

export function ClinicosStep({ step }: { step: Extract<Step, { kind: 'clinicos' }> }) {
  const { answers, answer, next } = useGuide()
  const marks = (answers[step.answerKey] as Marks | undefined) ?? {}
  const [open, setOpen] = useState<Record<string, boolean>>({})

  const countFor = (condId: string) =>
    Object.values(marks[condId] ?? {}).filter(Boolean).length

  const toggleOpen = (condId: string) => setOpen((o) => ({ ...o, [condId]: !o[condId] }))

  const toggleMicro = (condId: string, microId: string) => {
    const cond = { ...(marks[condId] ?? {}) }
    cond[microId] = !cond[microId]
    answer(step.answerKey, { ...marks, [condId]: cond })
  }

  return (
    <StepShell
      kicker={step.kicker}
      title={step.title}
      note={step.intro}
      continueLabel="Continuar"
      onContinue={next}
    >
      <div className="space-y-3">
        {condicoesClinicas.map((cond) => {
          const isOpen = !!open[cond.id]
          const count = countFor(cond.id)
          const active = count > 0
          return (
            <div
              key={cond.id}
              className={`overflow-hidden rounded-2xl border transition-colors ${
                active ? 'border-moss bg-sage-100' : 'border-forest/15 bg-cream-50/60'
              }`}
            >
              <button
                onClick={() => toggleOpen(cond.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <FontAwesomeIcon icon={getIcon(cond.icon)} className="text-lg text-moss" />
                <span className="flex-1 font-medium text-forest">{cond.label}</span>
                {count > 0 && (
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-moss px-1.5 text-xs font-semibold text-cream-50">
                    {count}
                  </span>
                )}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-sm text-forest/40 transition-transform duration-300 ease-gentle ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={gentleFast}
                  >
                    <ul className="space-y-2 px-5 pb-5">
                      {cond.indicadores.map((ind) => {
                        const checked = !!marks[cond.id]?.[ind.id]
                        return (
                          <li key={ind.id}>
                            <button
                              onClick={() => toggleMicro(cond.id, ind.id)}
                              aria-pressed={checked}
                              className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm leading-relaxed transition-colors ${
                                checked
                                  ? 'border-moss bg-paper text-forest'
                                  : 'border-forest/15 bg-paper/60 text-forest/80 hover:border-forest/35'
                              }`}
                            >
                              <span
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                                  checked ? 'border-moss bg-moss text-cream-50' : 'border-forest/25'
                                }`}
                              >
                                {checked && (
                                  <FontAwesomeIcon icon={faCheck} className="text-[0.6rem]" />
                                )}
                              </span>
                              {ind.label}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </StepShell>
  )
}
