import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { StepShell } from '../StepShell'
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

  const score = zaritScore(zarit)
  const complete = zaritComplete(zarit)
  const faixa = complete ? zaritFaixa(score) : null
  const [zaritOpen, setZaritOpen] = useState(() => Object.keys(zarit).length > 0)

  return (
    <StepShell
      kicker={step.kicker}
      title={step.title}
      note={step.intro}
      continueLabel="Continuar"
      onContinue={next}
    >
      <div className="space-y-6">
        {/* Dinâmica familiar */}
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-forest/70">Dinâmica familiar</span>
          <textarea
            rows={3}
            value={values.dinamica ?? ''}
            onChange={(e) => setField('dinamica', e.target.value)}
            placeholder="Anotar…"
            className="w-full resize-none rounded-2xl border border-forest/15 bg-cream-50/60 px-4 py-3 leading-relaxed text-forest outline-none transition-colors placeholder:text-forest/30 focus:border-moss"
          />
          <span className="mt-1.5 block text-xs leading-relaxed text-forest/45">
            Acompanhamento familiar / Ausência de cuidador apto / Conflitos
          </span>
        </label>

        {/* Sobrecarga do cuidador — ZARIT colapsado */}
        <div className="overflow-hidden rounded-2xl border border-forest/15 bg-cream-50/60">
          <button
            onClick={() => setZaritOpen((o) => !o)}
            aria-expanded={zaritOpen}
            className="flex w-full items-center gap-3 px-5 py-4 text-left"
          >
            <span className="flex-1 font-medium text-forest">Avaliar a sobrecarga do cuidador</span>
            {complete && faixa && (
              <span className="text-sm text-forest/55 tabular-nums">
                {score} · {faixa.label}
              </span>
            )}
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-sm text-forest/40 transition-transform duration-300 ease-gentle ${
                zaritOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {zaritOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={gentleFast}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5">
                  <p className="text-sm text-forest/55">
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
        </div>

        {/* Ações a serem desenvolvidas para o cuidador */}
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-forest/70">
            Ações a serem desenvolvidas para o cuidador
          </span>
          <textarea
            rows={3}
            value={values.conflitos ?? ''}
            onChange={(e) => setField('conflitos', e.target.value)}
            placeholder="Anotar…"
            className="w-full resize-none rounded-2xl border border-forest/15 bg-cream-50/60 px-4 py-3 leading-relaxed text-forest outline-none transition-colors placeholder:text-forest/30 focus:border-moss"
          />
          <span className="mt-1.5 block text-xs leading-relaxed text-forest/45">
            Sugestões: reunião com demais membros da família, rede de apoio, comunidade compassiva,
            revezamento de cuidadores…
          </span>
        </label>
      </div>
    </StepShell>
  )
}
