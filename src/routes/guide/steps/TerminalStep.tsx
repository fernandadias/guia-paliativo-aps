import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/Button'
import { getIcon } from '@/lib/icons'
import { PendingTag } from '../PendingTag'
import { useGuide } from '../useGuideState'
import type { Step } from '@/content/guide'

/** Fim de percurso (ex.: paciente sem critérios — reavaliar). */
export function TerminalStep({ step }: { step: Extract<Step, { kind: 'terminal' }> }) {
  const { reset, back } = useGuide()

  return (
    <div className="mx-auto flex min-h-[calc(100svh-3.5rem)] w-full max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
      {step.pendingClient && (
        <div className="mb-6">
          <PendingTag />
        </div>
      )}
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-2xl text-moss">
        <FontAwesomeIcon icon={getIcon(step.icon)} />
      </span>
      <h1 className="mt-8 font-serif text-3xl leading-tight text-forest sm:text-4xl">
        {step.title}
      </h1>
      <p className="mt-5 leading-relaxed text-forest/70">{step.body}</p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={back} variant="outline">
          <FontAwesomeIcon icon={faRotateLeft} className="text-xs" />
          Rever resposta
        </Button>
        <Button onClick={reset} variant="ghost">
          Recomeçar
        </Button>
      </div>
    </div>
  )
}
