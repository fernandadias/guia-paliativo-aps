import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenRuler } from '@fortawesome/free-solid-svg-icons'
import { StepShell } from '../StepShell'
import { useGuide } from '../useGuideState'
import type { Step } from '@/content/guide'

/**
 * Tela ainda não construída (Épico C, telas complexas). Fica navegável no
 * esqueleto da v2 e sinaliza o que virá, para validar o fluxo de ponta a ponta.
 */
export function PlaceholderStep({ step }: { step: Extract<Step, { kind: 'placeholder' }> }) {
  const { next } = useGuide()

  return (
    <StepShell
      kicker={step.kicker}
      title={step.title}
      continueLabel="Continuar"
      onContinue={next}
    >
      <div className="rounded-3xl border border-dashed border-forest/25 bg-cream-50/50 p-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold text-moss">
          <FontAwesomeIcon icon={faPenRuler} className="text-[0.7rem]" />
          Em construção · Épico {step.epic}
        </span>
        <p className="mt-5 leading-relaxed text-forest/70">{step.body}</p>
      </div>
    </StepShell>
  )
}
