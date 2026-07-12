import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { GuideProvider, useGuide } from './useGuideState'
import { GuideChrome } from './GuideChrome'
import { GuideIntro } from './GuideIntro'
import { AnswersDrawer } from './AnswersDrawer'
import { StepView } from './StepView'
import { stepFade } from '@/lib/motion'

interface GuideInnerProps {
  musicOn: boolean
  onToggleMusic: () => void
}

function GuideInner({ musicOn, onToggleMusic }: GuideInnerProps) {
  const { current, step } = useGuide()
  const [respostasOpen, setRespostasOpen] = useState(false)
  return (
    <div className="min-h-[100svh] bg-paper">
      {step.kind !== 'loading' && step.kind !== 'closing' && (
        <GuideChrome
          musicOn={musicOn}
          onToggleMusic={onToggleMusic}
          onOpenRespostas={() => setRespostasOpen(true)}
        />
      )}
      <AnimatePresence mode="wait">
        <motion.div key={current} variants={stepFade} initial="initial" animate="animate" exit="exit">
          <StepView step={step} />
        </motion.div>
      </AnimatePresence>
      <AnswersDrawer open={respostasOpen} onClose={() => setRespostasOpen(false)} />
    </div>
  )
}

export default function Guide() {
  const [started, setStarted] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const manualOff = useRef(false) // usuário desligou de propósito

  // A música começa já na intro. Como navegadores bloqueiam áudio com som antes
  // de uma interação, tentamos tocar no load e, se falhar, no primeiro gesto.
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.volume = 0.35
    a.play().catch(() => {})

    const onFirstGesture = () => {
      if (!manualOff.current && a.paused) a.play().catch(() => {})
      window.removeEventListener('pointerdown', onFirstGesture)
      window.removeEventListener('keydown', onFirstGesture)
    }
    window.addEventListener('pointerdown', onFirstGesture)
    window.addEventListener('keydown', onFirstGesture)
    return () => {
      window.removeEventListener('pointerdown', onFirstGesture)
      window.removeEventListener('keydown', onFirstGesture)
    }
  }, [])

  // Reenvia preenchimentos que ficaram na fila (offline em atendimento anterior).
  useEffect(() => {
    void import('@/lib/persist').then((m) => m.flushQueue())
  }, [])

  const start = () => setStarted(true)

  const toggleMusic = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      manualOff.current = false
      a.play().catch(() => {})
    } else {
      manualOff.current = true
      a.pause()
    }
  }

  return (
    <GuideProvider>
      {/* Música de fundo em loop. Coloque o arquivo em: public/audio/music-bg.mp3.
          O estado do ícone segue os eventos reais play/pause do áudio. */}
      <audio
        ref={audioRef}
        src="/audio/music-bg.mp3"
        loop
        preload="auto"
        onPlay={() => setMusicOn(true)}
        onPause={() => setMusicOn(false)}
      />
      {started ? (
        <GuideInner musicOn={musicOn} onToggleMusic={toggleMusic} />
      ) : (
        <GuideIntro onStart={start} musicOn={musicOn} onToggleMusic={toggleMusic} />
      )}
    </GuideProvider>
  )
}
