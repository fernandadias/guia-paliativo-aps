import { StepShell } from '../StepShell'
import { useGuide } from '../useGuideState'
import { esasItems } from '@/content/edmonton'
import type { Step } from '@/content/guide'

type Values = Record<string, number>

/** Gradiente da escala (0→10), igual ao da dor (EVA). */
const ESAS_GRADIENT =
  'linear-gradient(to right,#3fae4a,#8fce3f,#f4d13d,#f39c3d,#e8642f,#e23b2e)'

/** Cor discreta por valor (0–10) para refletir no indicador selecionado. */
const ESAS_COLORS = [
  '#3fae4a',
  '#6cbf45',
  '#8fce3f',
  '#bcd23e',
  '#f4d13d',
  '#f4b93d',
  '#f39c3d',
  '#ef7e34',
  '#e8642f',
  '#e5502e',
  '#e23b2e',
]

export function EdmontonStep({ step }: { step: Extract<Step, { kind: 'edmonton' }> }) {
  const { answers, answer, next } = useGuide()
  const values = (answers[step.answerKey] as Values | undefined) ?? {}
  const outroNome = (answers.edmontonOutroNome as string | undefined) ?? ''

  const setValue = (id: string, v: number) => {
    answer(step.answerKey, { ...values, [id]: v })
  }

  return (
    <StepShell
      kicker={step.kicker}
      title={step.title}
      note={step.intro}
      continueLabel="Continuar"
      onContinue={next}
    >
      <div className="space-y-7">
        {esasItems.map((item) => (
          <SliderRow
            key={item.id}
            label={item.label}
            hint={item.hint}
            left={item.left}
            right={item.right}
            value={values[item.id]}
            onChange={(v) => setValue(item.id, v)}
          />
        ))}

        <div className="rounded-2xl border border-forest/15 bg-cream-50/60 p-4">
          <input
            type="text"
            value={outroNome}
            onChange={(e) => answer('edmontonOutroNome', e.target.value)}
            placeholder="Outro problema (ex.: prisão de ventre)"
            className="w-full rounded-xl border border-forest/15 bg-paper px-4 py-2.5 text-forest outline-none transition-colors placeholder:text-forest/30 focus:border-moss"
          />
          {outroNome.trim() && (
            <div className="mt-4">
              <SliderRow
                label={outroNome.trim()}
                left="Sem sintoma"
                right="Pior possível"
                value={values.outro}
                onChange={(v) => setValue('outro', v)}
                bare
              />
            </div>
          )}
        </div>
      </div>
    </StepShell>
  )
}

interface SliderRowProps {
  label: string
  hint?: string
  left: string
  right: string
  value: number | undefined
  onChange: (v: number) => void
  bare?: boolean
}

function SliderRow({ label, hint, left, right, value, onChange, bare }: SliderRowProps) {
  const set = value != null
  return (
    <div className={bare ? '' : 'rounded-2xl border border-forest/15 bg-cream-50/60 p-4'}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-medium text-forest">
          {label}
          {hint && <span className="ml-2 text-sm font-normal text-forest/45">{hint}</span>}
        </span>
        <span
          className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-semibold tabular-nums ${
            set ? 'text-cream-50' : 'bg-forest/10 text-forest/40'
          }`}
          style={value != null ? { backgroundColor: ESAS_COLORS[value] } : undefined}
        >
          {set ? value : '—'}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        step={1}
        value={set ? value : 0}
        onChange={(e) => onChange(Number(e.target.value))}
        className="esas-slider mt-3 w-full cursor-pointer"
        style={{ background: ESAS_GRADIENT }}
      />
      <div className="mt-1 flex justify-between text-xs text-forest/45">
        <span>{left}</span>
        <span className="text-right">{right}</span>
      </div>
    </div>
  )
}
