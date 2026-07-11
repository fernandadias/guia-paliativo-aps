import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { StepShell } from '../StepShell'
import { useGuide } from '../useGuideState'
import { resultReading } from '../interpret'
import type { Step } from '@/content/guide'

export function ResultStep({ step }: { step: Extract<Step, { kind: 'result' }> }) {
  const { answers, next } = useGuide()
  const reading = resultReading(answers)

  return (
    <StepShell
      kicker={step.kicker}
      todo={step.todo}
      continueLabel="Iniciar o cuidado"
      onContinue={next}
    >
      <div className="rounded-3xl border border-forest/10 bg-gradient-to-br from-sage-100 to-cream-50 p-8 sm:p-10">
        <FontAwesomeIcon icon={faCircleInfo} className="text-2xl text-moss" />
        <p className="mt-5 font-serif text-2xl leading-snug text-forest sm:text-3xl">
          {reading.title}
        </p>
        <p className="mt-4 leading-relaxed text-forest/70">{reading.body}</p>
      </div>
    </StepShell>
  )
}
