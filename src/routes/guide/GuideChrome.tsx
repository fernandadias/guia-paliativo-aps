import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faXmark, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useGuide } from './useGuideState'
import { gentle } from '@/lib/motion'

interface GuideChromeProps {
  musicOn: boolean
  onToggleMusic: () => void
}

/** Barra superior do guia: voltar, progresso, música e sair. */
export function GuideChrome({ musicOn, onToggleMusic }: GuideChromeProps) {
  const { canGoBack, back, progressIndex, progressTotal, atTerminal } = useGuide()
  const pct = atTerminal ? 100 : Math.min(100, (progressIndex / progressTotal) * 100)

  return (
    <div className="sticky top-0 z-30 border-b border-forest/10 bg-paper/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-5 py-3.5 sm:px-6">
        <button
          onClick={back}
          disabled={!canGoBack}
          aria-label="Etapa anterior"
          className="rounded-full p-2 text-forest transition-colors hover:bg-forest/10 disabled:opacity-30"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
        </button>

        <div className="flex-1">
          <div className="h-1 overflow-hidden rounded-full bg-forest/10">
            <motion.div
              className="h-full rounded-full bg-moss"
              animate={{ width: `${pct}%` }}
              transition={gentle}
            />
          </div>
        </div>

        <span className="w-10 text-right text-xs tabular-nums text-forest/50">
          {progressIndex}/{progressTotal}
        </span>

        <button
          onClick={onToggleMusic}
          aria-label={musicOn ? 'Desligar música' : 'Ligar música'}
          aria-pressed={musicOn}
          className="rounded-full p-2 text-forest transition-colors hover:bg-forest/10"
        >
          <FontAwesomeIcon icon={musicOn ? faVolumeHigh : faVolumeXmark} className="text-sm" />
        </button>

        <Link
          to="/"
          aria-label="Sair do guia"
          className="rounded-full p-2 text-forest transition-colors hover:bg-forest/10"
        >
          <FontAwesomeIcon icon={faXmark} className="text-sm" />
        </Link>
      </div>
    </div>
  )
}
