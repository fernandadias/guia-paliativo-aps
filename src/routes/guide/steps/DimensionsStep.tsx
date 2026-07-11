import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { StepShell } from '../StepShell'
import { useGuide } from '../useGuideState'
import { getIcon } from '@/lib/icons'
import { gentleFast } from '@/lib/motion'
import type { Step } from '@/content/guide'

export function DimensionsStep({ step }: { step: Extract<Step, { kind: 'dimensions' }> }) {
  const { answers, answer, next } = useGuide()
  const values = (answers.dimensoes as Record<string, string> | undefined) ?? {}
  const [open, setOpen] = useState<string | null>(step.dimensions[0]?.id ?? null)

  const setField = (key: string, value: string) => {
    answer('dimensoes', { ...values, [key]: value })
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
      <div className="space-y-3">
        {step.dimensions.map((dim) => {
          const isOpen = open === dim.id
          const filled = dim.fields.filter((_, i) => values[`${dim.id}:${i}`]?.trim()).length
          return (
            <div
              key={dim.id}
              className="overflow-hidden rounded-2xl border border-forest/15 bg-cream-50/60"
            >
              <button
                onClick={() => setOpen(isOpen ? null : dim.id)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <FontAwesomeIcon icon={getIcon(dim.icon)} className="text-lg text-moss" />
                <span className="flex-1 font-medium text-forest">{dim.label}</span>
                {filled > 0 && (
                  <span className="text-xs text-forest/45">{filled}/{dim.fields.length}</span>
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
                    <div className="space-y-4 px-5 pb-5">
                      {dim.fields.map((field, i) => (
                        <label key={i} className="block">
                          <span className="mb-1.5 block text-sm text-forest/60">{field}</span>
                          <input
                            type="text"
                            value={values[`${dim.id}:${i}`] ?? ''}
                            onChange={(e) => setField(`${dim.id}:${i}`, e.target.value)}
                            placeholder="Anotar…"
                            className="w-full rounded-xl border border-forest/15 bg-paper px-4 py-2.5 text-forest outline-none transition-colors placeholder:text-forest/30 focus:border-moss"
                          />
                        </label>
                      ))}
                    </div>
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
