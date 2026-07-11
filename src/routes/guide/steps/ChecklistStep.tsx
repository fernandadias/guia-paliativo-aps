import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { StepShell } from '../StepShell'
import { useGuide } from '../useGuideState'
import type { Step } from '@/content/guide'

export function ChecklistStep({ step }: { step: Extract<Step, { kind: 'checklist' }> }) {
  const { answers, answer, next } = useGuide()
  const marked = (answers[step.answerKey] as Record<string, boolean> | undefined) ?? {}

  const toggle = (id: string) => {
    answer(step.answerKey, { ...marked, [id]: !marked[id] })
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
      <ul className="space-y-3">
        {step.items.map((item) => {
          const active = !!marked[item.id]
          return (
            <li key={item.id}>
              <button
                onClick={() => toggle(item.id)}
                className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors duration-200 ${
                  active
                    ? 'border-moss bg-sage-100'
                    : 'border-forest/15 bg-cream-50/60 hover:border-forest/35'
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    active ? 'border-moss bg-moss text-cream-50' : 'border-forest/25'
                  }`}
                >
                  {active && <FontAwesomeIcon icon={faCheck} className="text-[0.7rem]" />}
                </span>
                <span className="leading-relaxed text-forest/85">{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </StepShell>
  )
}
