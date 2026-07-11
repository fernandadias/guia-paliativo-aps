import { AnimatePresence, motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { StepShell } from '../StepShell'
import { useGuide } from '../useGuideState'
import { getIcon } from '@/lib/icons'
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
              <div
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  sel[col.key] ? 'border-moss bg-sage-100' : 'border-forest/15 bg-cream-50/60'
                }`}
              >
                <div className="flex items-center gap-2.5 px-5 pt-4">
                  <FontAwesomeIcon icon={getIcon(col.icon)} className="text-base text-moss" />
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-moss">
                    {col.label}
                  </p>
                </div>
                <ul className="space-y-2 px-4 pb-4 pt-3">
                  {options.map((text) => {
                    const isSel = sel[col.key] === text
                    return (
                      <li key={text}>
                        <button
                          onClick={() => selectCell(col.key, text)}
                          aria-pressed={isSel}
                          className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm leading-relaxed transition-colors ${
                            isSel
                              ? 'border-moss bg-paper text-forest'
                              : 'border-forest/15 bg-paper/60 text-forest/80 hover:border-forest/35'
                          }`}
                        >
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                              isSel ? 'border-moss bg-moss text-cream-50' : 'border-forest/25'
                            }`}
                          >
                            {isSel && <FontAwesomeIcon icon={faCheck} className="text-[0.6rem]" />}
                          </span>
                          {text}
                        </button>
                      </li>
                    )
                  })}

                  {col.key === 'deamb' && (
                    <li>
                      <button
                        onClick={selectMorte}
                        className="flex w-full items-start gap-3 rounded-xl border border-forest/15 bg-paper/60 p-3 text-left text-sm leading-relaxed text-forest/80 transition-colors hover:border-forest/35"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-forest/25" />
                        {PPS_MORTE}
                      </button>
                    </li>
                  )}
                </ul>
              </div>
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
