import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faArrowLeft,
  faVolumeHigh,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { gentle } from '@/lib/motion'

interface GuideIntroProps {
  onStart: () => void
  musicOn: boolean
  onToggleMusic: () => void
}

/**
 * Abertura do guia — vídeo de fundo em loop e sem som, com música tocando.
 * Coloque o vídeo em: public/videos/guia-intro.mp4
 */
export function GuideIntro({ onStart, musicOn, onToggleMusic }: GuideIntroProps) {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-forest text-cream-50">
      {/* Vídeo de fundo (mudo, em loop). Enquanto não houver arquivo, fica o verde sólido. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src="/videos/guia-intro.mp4" type="video/mp4" />
      </video>

      {/* Véu para legibilidade do texto sobre o vídeo */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/75 to-forest/45" />

      {/* Sair */}
      <Link
        to="/"
        className="absolute left-6 top-6 z-20 inline-flex items-center gap-2 text-sm text-cream-50/70 transition-colors hover:text-cream-50 sm:left-10"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
        Início
      </Link>

      {/* Música */}
      <button
        onClick={onToggleMusic}
        aria-label={musicOn ? 'Desligar música' : 'Ligar música'}
        aria-pressed={musicOn}
        className="absolute right-6 top-6 z-20 rounded-full p-2 text-cream-50/70 transition-colors hover:bg-cream-50/10 hover:text-cream-50 sm:right-10"
      >
        <FontAwesomeIcon icon={musicOn ? faVolumeHigh : faVolumeXmark} className="text-sm" />
      </button>

      <div className="relative z-10 flex flex-1 flex-col px-6 pb-10 pt-24 sm:pb-12">
        <motion.div
          className="flex flex-1 flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={gentle}
        >
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-sage">
            Guia de direção clínica
          </p>
          <h1 className="display mt-5 font-serif text-5xl leading-[0.95] sm:text-7xl">
            E agora, José?
          </h1>
          <p className="mx-auto mt-6 max-w-md font-serif text-xl italic leading-relaxed text-sage-200 sm:text-2xl">
            Respire. Vamos conduzir este cuidado juntos, passo a passo.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...gentle, delay: 0.3 }}
        >
          <Button onClick={onStart} size="lg" variant="cream" className="w-full sm:w-auto">
            Começar
            <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
          </Button>
          <Link
            to="/guia/rapido"
            className="text-sm text-cream-50/70 underline-offset-4 transition-colors hover:text-cream-50 hover:underline"
          >
            Ir mais rápido: versão em checklist
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
