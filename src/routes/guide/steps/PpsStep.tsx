import { AnimatePresence, motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { StepShell } from '../StepShell'
import { useGuide } from '../useGuideState'
import { gentleFast } from '@/lib/motion'
import {
  bandInfo,
  ppsColumns,
  ppsOptions,
  ppsValues,
  suggestPps,
  PPS_MORTE,
  type PpsColKey,
  type PpsSelection,
} from '@/content/pps'
import type { Step } from '@/content/guide'

const MORTE_KEY = '__morte'

export function PpsStep({ step }: { step: Extract<Step, { kind: 'pps' }> }) {
  const { answers, answer, next } = useGuide()

  const sel = (answers.ppsSelecao as Record<string, string> | undefined) ?? {}
  const ajustado = answers.ppsAjustado === true
  const effective = answers.pps as number | undefined

  const cleanSel: PpsSelection = {}
  for (const c of ppsColumns) if (sel[c.key]) cleanSel[c.key] = sel[c.key]
  const allChosen = ppsColumns.every((c) => sel[c.key])
  const suggested = suggestPps(cleanSel)

  const selectCell = (key: PpsColKey, text: string) => {
    const nextSel = { ...sel }
    delete nextSel[MORTE_KEY]
    nextSel[key] = text
    answer('ppsSelecao', nextSel)
    if (!ajustado) {
      const clean: PpsSelection = {}
      for (const c of ppsColumns) if (nextSel[c.key]) clean[c.key] = nextSel[c.key]
      const s = suggestPps(clean)
      if (s != null) answer('pps', s)
    }
  }

  const selectMorte = () => {
    // Óbito encerra a análise: registra e transita suave para o acolhimento.
    answer('ppsSelecao', { [MORTE_KEY]: '1' })
    answer('pps', 0)
    answer('ppsAjustado', false)
    next()
  }

  const setManual = (value: number) => {
    answer('pps', value)
    answer('ppsAjustado', true)
  }

  const backToSuggestion = () => {
    answer('ppsAjustado', false)
    if (suggested != null) answer('pps', suggested)
  }

  const band = effective != null && effective > 0 ? bandInfo(effective) : null
  const canContinue = allChosen

  return (
    <StepShell
      kicker={step.kicker}
      title={step.question}
      note={step.note}
      continueLabel="Continuar"
      onContinue={next}
      continueDisabled={!canContinue}
    >
      <div className="space-y-8">
          {ppsColumns.map((col) => {
            const options = ppsOptions(col.key)
            return (
              <fieldset key={col.key}>
                <legend className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-moss">
                  {col.label}
                </legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {options.map((text) => {
                    const active = sel[col.key] === text
                    return (
                      <button
                        key={text}
                        onClick={() => selectCell(col.key, text)}
                        className={`relative flex min-h-[4.5rem] items-center justify-center rounded-2xl border px-3 py-3 text-center text-sm leading-snug transition-colors duration-200 ${
                          active
                            ? 'border-moss bg-sage-100 font-medium text-forest'
                            : 'border-forest/15 bg-cream-50/60 text-forest/80 hover:border-forest/35'
                        }`}
                      >
                        {active && (
                          <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-moss text-cream-50">
                            <FontAwesomeIcon icon={faCheck} className="text-[0.55rem]" />
                          </span>
                        )}
                        {text}
                      </button>
                    )
                  })}

                  {col.key === 'deamb' && (
                    <button
                      onClick={selectMorte}
                      className="flex min-h-[4.5rem] items-center justify-center rounded-2xl border border-forest/15 bg-cream-50/60 px-3 py-3 text-center text-sm leading-snug text-forest/80 transition-colors duration-200 hover:border-forest/35"
                    >
                      {PPS_MORTE}
                    </button>
                  )}
                </div>
              </fieldset>
            )
          })}

          <AnimatePresence>
            {allChosen && effective != null && (
              <motion.div
                className="rounded-3xl border border-moss/25 bg-sage-100 p-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={gentleFast}
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-moss">
                      {ajustado ? 'PPS ajustado' : 'PPS sugerido'}
                    </p>
                    {band && (
                      <p className="mt-1 font-serif text-xl leading-tight text-forest">
                        {band.label}
                      </p>
                    )}
                  </div>
                  <span className="font-serif text-5xl leading-none text-forest tabular-nums">
                    {effective}
                  </span>
                </div>

                <p className="mt-5 text-xs text-forest/55">
                  Sugestão pelo método do instrumento. Ajuste conforme o julgamento clínico:
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ppsValues.map((v) => {
                    const active = effective === v
                    return (
                      <button
                        key={v}
                        onClick={() => setManual(v)}
                        className={`h-10 w-12 rounded-xl border text-sm font-medium tabular-nums transition-colors ${
                          active
                            ? 'border-forest bg-forest text-cream-50'
                            : 'border-forest/20 bg-paper text-forest hover:border-forest/45'
                        }`}
                      >
                        {v}
                      </button>
                    )
                  })}
                </div>

                {ajustado && suggested != null && suggested !== effective && (
                  <button
                    onClick={backToSuggestion}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-moss transition-colors hover:text-forest"
                  >
                    <FontAwesomeIcon icon={faRotateLeft} className="text-xs" />
                    Voltar à sugestão ({suggested})
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
    </StepShell>
  )
}
