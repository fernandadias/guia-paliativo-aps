import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { StepShell } from '../StepShell'
import { useGuide } from '../useGuideState'
import { gentleFast } from '@/lib/motion'
import type { Step } from '@/content/guide'

export function ChecklistStep({ step }: { step: Extract<Step, { kind: 'checklist' }> }) {
  const { answers, answer, next } = useGuide()
  const marked = (answers[step.answerKey] as Record<string, boolean> | undefined) ?? {}
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => {
    answer(step.answerKey, { ...marked, [id]: !marked[id] })
  }
  const toggleDetail = (id: string) => {
    setExpanded((e) => ({ ...e, [id]: !e[id] }))
  }

  return (
    <StepShell
      kicker={step.kicker}
      title={step.title}
      note={step.intro}
      todo={step.todo}
      continueLabel="Continuar"
      onContinue={next}
    >
      <ul className="space-y-3">
        {step.items.map((item) => {
          const active = !!marked[item.id]
          const isOpen = !!expanded[item.id]
          return (
            <li
              key={item.id}
              className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
                active ? 'border-moss bg-sage-100' : 'border-forest/15 bg-cream-50/60'
              }`}
            >
              <div className="flex items-start gap-4 p-4">
                <button
                  onClick={() => toggle(item.id)}
                  aria-pressed={active}
                  className="flex flex-1 items-start gap-4 text-left"
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors ${
                      active ? 'border-moss bg-moss text-cream-50' : 'border-forest/25'
                    }`}
                  >
                    {active && <FontAwesomeIcon icon={faCheck} className="text-[0.7rem]" />}
                  </span>
                  <span className="flex items-start gap-2.5 leading-relaxed text-forest/85">
                    {item.code && (
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-forest/85 text-xs font-semibold text-cream-50">
                        {item.code}
                      </span>
                    )}
                    <span>{item.label}</span>
                  </span>
                </button>

                {item.detail && (
                  <button
                    onClick={() => toggleDetail(item.id)}
                    aria-expanded={isOpen}
                    className="mt-0.5 flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 text-xs text-forest/50 transition-colors hover:text-moss"
                  >
                    Mais detalhes
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`text-[0.65rem] transition-transform duration-300 ease-gentle ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                )}
              </div>

              {item.detail && (
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={gentleFast}
                    >
                      <p className="px-5 pb-4 pl-16 text-sm leading-relaxed text-forest/60">
                        {item.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </li>
          )
        })}
      </ul>
    </StepShell>
  )
}
