import type { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/Button'

interface StepShellProps {
  kicker?: string
  title?: string
  note?: string
  /** Mantido por compatibilidade com as etapas; não é mais exibido. */
  todo?: boolean
  children: ReactNode
  /** Rótulo do botão de continuar. Se ausente, não mostra rodapé. */
  continueLabel?: string
  onContinue?: () => void
  continueDisabled?: boolean
}

/** Moldura comum das etapas: kicker, título, conteúdo e continuar. */
export function StepShell({
  kicker,
  title,
  note,
  children,
  continueLabel,
  onContinue,
  continueDisabled,
}: StepShellProps) {
  return (
    <div className="mx-auto flex min-h-[calc(100svh-3.5rem)] w-full max-w-2xl flex-col px-6 pb-10 pt-10 sm:pt-16">
      <div className="flex-1">
        {kicker && (
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-moss">
              {kicker}
            </span>
          </div>
        )}
        {title && (
          <h1 className="font-serif text-3xl leading-tight text-forest sm:text-4xl">{title}</h1>
        )}
        {note && <p className="mt-4 leading-relaxed text-forest/60">{note}</p>}
        <div className="mt-8">{children}</div>
      </div>

      {continueLabel && (
        <div className="sticky bottom-0 mt-10 bg-gradient-to-t from-paper via-paper to-transparent pb-2 pt-4">
          <Button
            onClick={onContinue}
            disabled={continueDisabled}
            size="lg"
            className="w-full sm:w-auto"
          >
            {continueLabel}
            <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
          </Button>
        </div>
      )}
    </div>
  )
}
