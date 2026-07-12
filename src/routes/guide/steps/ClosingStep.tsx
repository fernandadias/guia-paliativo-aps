import { motion } from 'motion/react'
import { gentle } from '@/lib/motion'
import type { Step } from '@/content/guide'

/**
 * Encerramento do guia — retoma o vídeo de entrada como fundo, com o verso
 * final de José, a mensagem de fechamento e a assinatura.
 */
export function ClosingStep({ step }: { step: Extract<Step, { kind: 'closing' }> }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-forest px-6 text-center text-cream-50">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src="/videos/guia-intro-2-web.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/80 to-forest/55" />

      <motion.div
        className="relative z-10 flex max-w-xl flex-col items-center gap-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={gentle}
      >
        <h1 className="font-serif text-4xl italic leading-tight sm:text-5xl">
          {step.lines.map((linha, i) => (
            <span key={i} className="block">
              {linha}
            </span>
          ))}
        </h1>

        <p className="max-w-md leading-relaxed text-cream-50/85">{step.body}</p>

        <div className="mt-4 text-sm leading-relaxed text-cream-50/70">
          {step.signature.map((linha, i) => (
            <p key={i} className={i === 0 ? 'font-medium text-cream-50/90' : ''}>
              {linha}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
