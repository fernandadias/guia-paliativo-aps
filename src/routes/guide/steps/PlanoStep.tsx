import { AnimatePresence, motion } from 'motion/react'
import { StepShell } from '../StepShell'
import { useGuide } from '../useGuideState'
import { gentleFast } from '@/lib/motion'
import { planoFields, reavaliarOpcoes } from '@/content/plano'
import type { Step } from '@/content/guide'

type Values = Record<string, string>

export function PlanoStep({ step }: { step: Extract<Step, { kind: 'plano' }> }) {
  const { answers, answer, next } = useGuide()
  const values = (answers[step.answerKey] as Values | undefined) ?? {}
  const setField = (id: string, v: string) => answer(step.answerKey, { ...values, [id]: v })

  return (
    <StepShell
      kicker={step.kicker}
      title={step.title}
      continueLabel="Continuar"
      onContinue={next}
    >
      <div className="space-y-6">
        {planoFields.map((field) => {
          if (field.kind === 'textarea') {
            return (
              <label key={field.id} className="block">
                <span className="mb-1.5 block text-sm font-medium text-forest/70">{field.label}</span>
                <textarea
                  rows={3}
                  value={values[field.id] ?? ''}
                  onChange={(e) => setField(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full resize-none rounded-2xl border border-forest/15 bg-cream-50/60 px-4 py-3 leading-relaxed text-forest outline-none transition-colors placeholder:text-forest/30 focus:border-moss"
                />
              </label>
            )
          }
          if (field.kind === 'text') {
            return (
              <label key={field.id} className="block">
                <span className="mb-1.5 block text-sm font-medium text-forest/70">{field.label}</span>
                <input
                  type="text"
                  value={values[field.id] ?? ''}
                  onChange={(e) => setField(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-2xl border border-forest/15 bg-cream-50/60 px-4 py-3 text-forest outline-none transition-colors placeholder:text-forest/30 focus:border-moss"
                />
              </label>
            )
          }
          if (field.kind === 'simnao') {
            return (
              <div key={field.id}>
                <span className="mb-2 block text-sm font-medium text-forest/70">{field.label}</span>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { v: 'sim', label: 'Sim' },
                    { v: 'nao', label: 'Não' },
                  ].map((opt) => {
                    const active = values[field.id] === opt.v
                    return (
                      <button
                        key={opt.v}
                        onClick={() => setField(field.id, opt.v)}
                        className={`rounded-2xl border p-3.5 text-center font-medium transition-colors ${
                          active
                            ? 'border-moss bg-sage-100 text-forest'
                            : 'border-forest/15 bg-cream-50/60 text-forest/80 hover:border-forest/35'
                        }`}
                      >
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          }
          // reavaliar
          return (
            <div key={field.id}>
              <span className="mb-2 block text-sm font-medium text-forest/70">{field.label}</span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {reavaliarOpcoes.map((opt) => {
                  const active = values.reavaliar === opt
                  return (
                    <button
                      key={opt}
                      onClick={() => setField('reavaliar', opt)}
                      className={`rounded-xl border p-3 text-center text-sm font-medium transition-colors ${
                        active
                          ? 'border-moss bg-sage-100 text-forest'
                          : 'border-forest/15 bg-cream-50/60 text-forest/80 hover:border-forest/35'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              <AnimatePresence initial={false}>
                {values.reavaliar === 'Outro' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={gentleFast}
                    className="overflow-hidden"
                  >
                    <input
                      type="text"
                      value={values.reavaliarOutro ?? ''}
                      onChange={(e) => setField('reavaliarOutro', e.target.value)}
                      placeholder="Quando?"
                      className="mt-2 w-full rounded-2xl border border-forest/15 bg-cream-50/60 px-4 py-3 text-forest outline-none transition-colors placeholder:text-forest/30 focus:border-moss"
                    />
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
