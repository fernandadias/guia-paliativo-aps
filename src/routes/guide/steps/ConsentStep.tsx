import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldHeart } from '@fortawesome/free-solid-svg-icons'
import { StepShell } from '../StepShell'
import { PendingTag } from '../PendingTag'
import { useGuide } from '../useGuideState'
import type { Step } from '@/content/guide'

export function ConsentStep({ step }: { step: Extract<Step, { kind: 'consent' }> }) {
  const { answers, answerAndNext } = useGuide()
  const current = answers[step.answerKey] as string | undefined

  const choose = (v: string) => answerAndNext(step.answerKey, v)

  return (
    <StepShell kicker={step.kicker} title={step.title}>
      {step.pendingClient && (
        <div className="mb-5">
          <PendingTag />
        </div>
      )}

      <div className="rounded-3xl border border-forest/10 bg-cream-50/60 p-5 sm:p-6">
        <FontAwesomeIcon icon={faShieldHeart} className="text-2xl text-moss" />
        <p className="mt-3 leading-relaxed text-forest/75">{step.body}</p>
        {step.note && <p className="mt-3 text-sm leading-relaxed text-forest/50">{step.note}</p>}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => choose('sim')}
          className={`rounded-2xl border p-5 text-left transition-colors ${
            current === 'sim'
              ? 'border-moss bg-sage-100 text-forest'
              : 'border-forest/15 bg-cream-50/60 text-forest/85 hover:border-forest/35'
          }`}
        >
          <span className="block font-medium text-forest">Aceito participar</span>
          <span className="mt-1 block text-sm text-forest/55">
            Meus dados anônimos podem ser guardados para pesquisa.
          </span>
        </button>

        <button
          onClick={() => choose('nao')}
          className={`rounded-2xl border p-5 text-left transition-colors ${
            current === 'nao'
              ? 'border-moss bg-sage-100 text-forest'
              : 'border-forest/15 bg-cream-50/60 text-forest/85 hover:border-forest/35'
          }`}
        >
          <span className="block font-medium text-forest">Prefiro não participar</span>
          <span className="mt-1 block text-sm text-forest/55">
            Sigo a avaliação; nada é enviado ao servidor.
          </span>
        </button>
      </div>
    </StepShell>
  )
}
