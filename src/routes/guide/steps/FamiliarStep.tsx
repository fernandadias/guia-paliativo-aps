import { AnimatePresence, motion } from 'motion/react'
import { StepShell } from '../StepShell'
import { PendingTag } from '../PendingTag'
import { useGuide } from '../useGuideState'
import { gentleFast } from '@/lib/motion'
import {
  zaritOptions,
  zaritQuestions,
  zaritScore,
  zaritComplete,
  zaritFaixa,
  type ZaritAnswers,
} from '@/content/zarit'
import type { Step } from '@/content/guide'

type Values = Record<string, string>

export function FamiliarStep({ step }: { step: Extract<Step, { kind: 'familiar' }> }) {
  const { answers, answer, next } = useGuide()
  const values = (answers[step.answerKey] as Values | undefined) ?? {}
  const zarit = (answers.zarit as ZaritAnswers | undefined) ?? {}

  const setField = (id: string, v: string) => answer(step.answerKey, { ...values, [id]: v })
  const setZarit = (id: string, v: number) => answer('zarit', { ...zarit, [id]: v })

  const sobrecarga = values.sobrecarga
  const score = zaritScore(zarit)
  const complete = zaritComplete(zarit)
  const faixa = complete ? zaritFaixa(score) : null

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
        {/* Dinâmica familiar */}
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-forest/70">Dinâmica familiar</span>
          <textarea
            rows={3}
            value={values.dinamica ?? ''}
            onChange={(e) => setField('dinamica', e.target.value)}
            placeholder="Anotar… (as opções com ícone virão da cliente)"
            className="w-full resize-none rounded-2xl border border-forest/15 bg-cream-50/60 px-4 py-3 leading-relaxed text-forest outline-none transition-colors placeholder:text-forest/30 focus:border-moss"
          />
        </label>

        {/* Sobrecarga do cuidador */}
        <div>
          <span className="mb-2 block text-sm font-medium text-forest/70">
            Há sobrecarga do cuidador?
          </span>
          <div className="grid grid-cols-2 gap-3">
            {[
              { v: 'sim', label: 'Sim' },
              { v: 'nao', label: 'Não' },
            ].map((opt) => {
              const active = sobrecarga === opt.v
              return (
                <button
                  key={opt.v}
                  onClick={() => setField('sobrecarga', opt.v)}
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
        </div>

        {/* Escala ZARIT, quando há sobrecarga */}
        <AnimatePresence initial={false}>
          {sobrecarga === 'sim' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={gentleFast}
              className="overflow-hidden"
            >
              <div className="rounded-3xl border border-forest/10 bg-cream-50/60 p-5">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-moss">
                  Escala de ZARIT
                </p>
                <p className="mt-1 text-sm text-forest/55">
                  1 Nunca · 2 Quase nunca · 3 Às vezes · 4 Frequentemente · 5 Quase sempre
                </p>

                <div className="mt-5 space-y-5">
                  {zaritQuestions.map((q, i) => (
                    <div key={q.id}>
                      <p className="text-sm leading-relaxed text-forest/85">
                        <span className="text-forest/40">{i + 1}.</span> {q.label}
                      </p>
                      <div className="mt-2 flex gap-2">
                        {zaritOptions.map((opt) => {
                          const active = zarit[q.id] === opt.value
                          return (
                            <button
                              key={opt.value}
                              onClick={() => setZarit(q.id, opt.value)}
                              title={opt.label}
                              className={`h-10 flex-1 rounded-xl border text-sm font-medium tabular-nums transition-colors ${
                                active
                                  ? 'border-forest bg-forest text-cream-50'
                                  : 'border-forest/20 bg-paper text-forest hover:border-forest/45'
                              }`}
                            >
                              {opt.value}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {faixa && (
                    <motion.div
                      className="mt-6 flex items-center justify-between rounded-2xl border border-moss/25 bg-sage-100 p-4"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={gentleFast}
                    >
                      <span className="font-serif text-lg text-forest">{faixa.label}</span>
                      <span className="text-sm text-forest/60 tabular-nums">{score} pontos</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conflitos */}
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-forest/70">Conflitos</span>
          <textarea
            rows={3}
            value={values.conflitos ?? ''}
            onChange={(e) => setField('conflitos', e.target.value)}
            placeholder="Anotar…"
            className="w-full resize-none rounded-2xl border border-forest/15 bg-cream-50/60 px-4 py-3 leading-relaxed text-forest outline-none transition-colors placeholder:text-forest/30 focus:border-moss"
          />
        </label>
      </div>
    </StepShell>
  )
}
