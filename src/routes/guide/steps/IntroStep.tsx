import { verses } from '@/content/quotes'
import { StepShell } from '../StepShell'
import { useGuide } from '../useGuideState'
import type { Step } from '@/content/guide'

export function IntroStep({ step }: { step: Extract<Step, { kind: 'intro' }> }) {
  const { next } = useGuide()
  const verse = step.asideVerseKey ? verses[step.asideVerseKey] : undefined

  return (
    <StepShell
      kicker={step.kicker}
      title={step.title}
      todo={step.todo}
      continueLabel="Continuar"
      onContinue={next}
    >
      <p className="text-lg leading-relaxed text-forest/80">{step.body}</p>

      {verse && (
        <figure className="mt-10 rounded-3xl bg-gradient-to-br from-sage-100 to-cream-50 p-8">
          <blockquote className="font-serif text-2xl italic leading-relaxed text-forest">
            {verse.text}
          </blockquote>
          <figcaption className="mt-4 text-sm text-forest/55">
            Cuidados paliativos não significam desistir. Significam cuidar melhor.
          </figcaption>
        </figure>
      )}
    </StepShell>
  )
}
