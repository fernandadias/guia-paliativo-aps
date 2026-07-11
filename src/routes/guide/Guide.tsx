import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Step } from '@/content/guide'
import { GuideProvider, useGuide } from './useGuideState'
import { GuideChrome } from './GuideChrome'
import { GuideIntro } from './GuideIntro'
import { IntroStep } from './steps/IntroStep'
import { ChoiceStep } from './steps/ChoiceStep'
import { ScaleStep } from './steps/ScaleStep'
import { PpsStep } from './steps/PpsStep'
import { ChecklistStep } from './steps/ChecklistStep'
import { ResultStep } from './steps/ResultStep'
import { DimensionsStep } from './steps/DimensionsStep'
import { VerseStep } from './steps/VerseStep'
import { FieldsStep } from './steps/FieldsStep'
import { SummaryStep } from './steps/SummaryStep'
import { TerminalStep } from './steps/TerminalStep'
import { LoadingStep } from './steps/LoadingStep'
import { PlaceholderStep } from './steps/PlaceholderStep'
import { stepFade } from '@/lib/motion'

// Recebe a etapa por PROP (não lê do contexto): assim o elemento que está saindo
// no AnimatePresence mantém o conteúdo antigo durante a transição.
function CurrentStep({ step }: { step: Step }) {
  switch (step.kind) {
    case 'intro':
      return <IntroStep step={step} />
    case 'choice':
      return <ChoiceStep step={step} />
    case 'scale':
      return <ScaleStep step={step} />
    case 'pps':
      return <PpsStep step={step} />
    case 'checklist':
      return <ChecklistStep step={step} />
    case 'result':
      return <ResultStep step={step} />
    case 'dimensions':
      return <DimensionsStep step={step} />
    case 'verse':
      return <VerseStep step={step} />
    case 'fields':
      return <FieldsStep step={step} />
    case 'summary':
      return <SummaryStep step={step} />
    case 'terminal':
      return <TerminalStep step={step} />
    case 'loading':
      return <LoadingStep step={step} />
    case 'placeholder':
      return <PlaceholderStep step={step} />
  }
}

interface GuideInnerProps {
  musicOn: boolean
  onToggleMusic: () => void
}

function GuideInner({ musicOn, onToggleMusic }: GuideInnerProps) {
  const { current, step } = useGuide()
  return (
    <div className="min-h-[100svh] bg-paper">
      {step.kind !== 'loading' && (
        <GuideChrome musicOn={musicOn} onToggleMusic={onToggleMusic} />
      )}
      <AnimatePresence mode="wait">
        <motion.div key={current} variants={stepFade} initial="initial" animate="animate" exit="exit">
          <CurrentStep step={step} />
        </motion.div>
      </AnimatePresence>
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
