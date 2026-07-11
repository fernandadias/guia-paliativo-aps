import { motion } from 'motion/react'
import { verses } from '@/content/quotes'
import { Button } from '@/components/ui/Button'
import { useGuide } from '../useGuideState'
import { gentle } from '@/lib/motion'
import type { Step } from '@/content/guide'

/** Interstício poético — o poema dialoga com o percurso (não é epígrafe solta). */
export function VerseStep({ step }: { step: Extract<Step, { kind: 'verse' }> }) {
  const { next } = useGuide()
  const verse = verses[step.verseKey]

  return (
    <div className="flex min-h-[calc(100svh-3.5rem)] items-center bg-gradient-to-b from-sage-100 to-cream">
      <div className="mx-auto w-full max-w-2xl px-6 py-16 text-center">
        <motion.blockquote
          className="font-serif text-3xl italic leading-snug text-forest sm:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={gentle}
        >
          {verse?.text}
        </motion.blockquote>
        <motion.p
          className="mt-8 text-forest/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...gentle, delay: 0.3 }}
        >
          {step.caption}
        </motion.p>
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...gentle, delay: 0.5 }}
        >
          <Button onClick={next} variant="outline">
            Continuar
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
