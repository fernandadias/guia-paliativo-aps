import { StepShell } from '../StepShell'
import { useGuide } from '../useGuideState'
import type { Step } from '@/content/guide'

export function FieldsStep({ step }: { step: Extract<Step, { kind: 'fields' }> }) {
  const { answers, answer, next } = useGuide()
  const values = (answers[step.answerKey] as Record<string, string> | undefined) ?? {}

  const setField = (id: string, value: string) => {
    answer(step.answerKey, { ...values, [id]: value })
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
      <div className="space-y-5">
        {step.fields.map((field) => (
          <label key={field.id} className="block">
            <span className="mb-1.5 block text-sm font-medium text-forest/70">{field.label}</span>
            {field.multiline ? (
              <textarea
                rows={3}
                value={values[field.id] ?? ''}
                onChange={(e) => setField(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="w-full resize-none rounded-2xl border border-forest/15 bg-cream-50/60 px-4 py-3 leading-relaxed text-forest outline-none transition-colors placeholder:text-forest/30 focus:border-moss"
              />
            ) : (
              <input
                type="text"
                value={values[field.id] ?? ''}
                onChange={(e) => setField(field.id, e.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-2xl border border-forest/15 bg-cream-50/60 px-4 py-3 text-forest outline-none transition-colors placeholder:text-forest/30 focus:border-moss"
              />
            )}
          </label>
        ))}
      </div>
    </StepShell>
  )
}
