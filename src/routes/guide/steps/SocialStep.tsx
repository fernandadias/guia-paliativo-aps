import { AnimatePresence, motion } from 'motion/react'
import { StepShell } from '../StepShell'
import { PendingTag } from '../PendingTag'
import { useGuide } from '../useGuideState'
import { gentleFast } from '@/lib/motion'
import type { Step } from '@/content/guide'

type Values = Record<string, string>

export function SocialStep({ step }: { step: Extract<Step, { kind: 'social' }> }) {
  const { answers, answer, next } = useGuide()
  const values = (answers[step.answerKey] as Values | undefined) ?? {}
  const setField = (id: string, v: string) => answer(step.answerKey, { ...values, [id]: v })

  return (
    <StepShell
      kicker={step.kicker}
      title={step.title}
      note={step.intro}
      continueLabel="Continuar"
      onContinue={next}
    >
      {step.pendingClient && (
        <div className="mb-5">
          <PendingTag />
        </div>
      )}
      <div className="space-y-6">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-forest/70">Quem cuida?</span>
          <input
            type="text"
            value={values.quemCuida ?? ''}
            onChange={(e) => setField('quemCuida', e.target.value)}
            placeholder="Anotar…"
            className="w-full rounded-2xl border border-forest/15 bg-cream-50/60 px-4 py-3 text-forest outline-none transition-colors placeholder:text-forest/30 focus:border-moss"
          />
        </label>

        <div>
          <span className="mb-2 block text-sm font-medium text-forest/70">
            Existe rede de apoio?
            <span className="mt-0.5 block text-xs font-normal text-forest/45">
              Ex.: igreja, ONG, vizinhos ou outros
            </span>
          </span>
          <div className="grid grid-cols-2 gap-3">
            {[
              { v: 'sim', label: 'Sim' },
              { v: 'nao', label: 'Não' },
            ].map((opt) => {
              const active = values.redeApoio === opt.v
              return (
                <button
                  key={opt.v}
                  onClick={() => setField('redeApoio', opt.v)}
                  className={`rounded-2xl border p-4 text-center font-medium transition-colors ${
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

          <AnimatePresence initial={false}>
            {values.redeApoio === 'sim' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={gentleFast}
                className="overflow-hidden"
              >
                <label className="mt-3 block">
                  <span className="mb-1.5 block text-sm text-forest/60">Quem é?</span>
                  <input
                    type="text"
                    value={values.redeApoioQuem ?? ''}
                    onChange={(e) => setField('redeApoioQuem', e.target.value)}
                    placeholder="Ex.: igreja, ONG, vizinhos, outros"
                    className="w-full rounded-2xl border border-forest/15 bg-cream-50/60 px-4 py-3 text-forest outline-none transition-colors placeholder:text-forest/30 focus:border-moss"
                  />
                </label>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-forest/70">
            Benefícios sociais
          </span>
          <input
            type="text"
            value={values.beneficios ?? ''}
            onChange={(e) => setField('beneficios', e.target.value)}
            placeholder="Anotar… (as opções virão da cliente)"
            className="w-full rounded-2xl border border-forest/15 bg-cream-50/60 px-4 py-3 text-forest outline-none transition-colors placeholder:text-forest/30 focus:border-moss"
          />
        </label>
      </div>
    </StepShell>
  )
}
