import { useEffect } from 'react'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons'
import { useGuide } from '../useGuideState'
import type { Step } from '@/content/guide'

/**
 * Interstício emotivo antes do resumo. Uma pausa de respiro: um anel que
 * "respira", uma frase sensível, e então revela o plano. Avança sozinho.
 */
export function LoadingStep({ step }: { step: Extract<Step, { kind: 'loading' }> }) {
  const { next } = useGuide()

  useEffect(() => {
    const t = setTimeout(next, 4200)
    return () => clearTimeout(t)
  }, [next])

  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center gap-12 overflow-hidden bg-gradient-to-b from-sage-100 to-cream px-6 text-center">
      {/* Anel que respira */}
      <div className="relative flex h-28 w-28 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-full border border-moss/40"
          animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="absolute inset-0 rounded-full border border-moss/50"
          animate={{ scale: [1, 1.18, 1], opacity: [0.9, 0.3, 0.9] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="text-moss"
          animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FontAwesomeIcon icon={faHandHoldingHeart} className="text-3xl" />
        </motion.span>
      </div>

      <div>
        <motion.p
          className="mx-auto max-w-md font-serif text-2xl italic leading-relaxed text-forest sm:text-3xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        >
          {step.message}
        </motion.p>
        <motion.p
          className="mt-5 text-sm text-forest/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          {step.submessage}
        </motion.p>
      </div>
    </div>
  )
}
