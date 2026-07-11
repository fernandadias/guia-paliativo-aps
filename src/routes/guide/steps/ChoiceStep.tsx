import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { StepShell } from '../StepShell'
import { PendingTag } from '../PendingTag'
import { useGuide } from '../useGuideState'
import type { Step } from '@/content/guide'

export function ChoiceStep({ step }: { step: Extract<Step, { kind: 'choice' }> }) {
  const { answers, answerAndNext } = useGuide()
  const selected = answers[step.answerKey] as string | undefined

  return (
    <StepShell kicker={step.kicker} title={step.question} todo={step.todo}>
      {step.pendingClient && (
        <div className="mb-5">
          <PendingTag />
        </div>
      )}
      <div className="space-y-3">
        {step.options.map((opt) => {
          const active = selected === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => answerAndNext(step.answerKey, opt.value)}
              className={`group flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-colors duration-300 ease-gentle ${
                active
                  ? 'border-moss bg-sage-100'
                  : 'border-forest/15 bg-cream-50/60 hover:border-forest/35 hover:bg-cream-50'
              }`}
            >
              <FontAwesomeIcon
                icon={active ? faCircleDot : faCircle}
                className={`mt-0.5 text-lg ${active ? 'text-moss' : 'text-forest/25'}`}
              />
              <span>
                <span className="block text-lg font-medium text-forest">{opt.label}</span>
                {opt.description && (
                  <span className="mt-1 block text-sm leading-relaxed text-forest/60">
                    {opt.description}
                  </span>
                )}
              </span>
            </button>
          )
        })}
      </div>
    </StepShell>
  )
}
