import { StepShell } from '../StepShell'
import { useGuide } from '../useGuideState'
import { esasItems } from '@/content/edmonton'
import type { Step } from '@/content/guide'

type Values = Record<string, number>

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
          <div className="mt-4">
            <SliderRow
              label={outroNome.trim() || 'Outro problema'}
              left="Sem sintoma"
              right="Pior possível"
              value={values.outro}
              onChange={(v) => setValue('outro', v)}
              bare
            />
          </div>
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
            set ? 'bg-moss text-cream-50' : 'bg-forest/10 text-forest/40'
          }`}
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
        className="mt-3 w-full cursor-pointer accent-moss"
      />
      <div className="mt-1 flex justify-between text-xs text-forest/45">
        <span>{left}</span>
        <span className="text-right">{right}</span>
      </div>
    </div>
  )
}
