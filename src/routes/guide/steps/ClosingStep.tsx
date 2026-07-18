import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/Button'
import { gentle } from '@/lib/motion'
import type { Step } from '@/content/guide'

/**
 * Encerramento do guia — retoma o vídeo de entrada como fundo, com o verso
 * final de José, a mensagem de fechamento, a assinatura e o rodapé
 * institucional. Um CTA leva de volta ao início do site.
 */
export function ClosingStep({ step }: { step: Extract<Step, { kind: 'closing' }> }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-forest px-6 text-center text-cream-50">
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
        className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8 pt-16"
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

        <div className="mt-4 space-y-4 text-sm leading-relaxed text-cream-50/65">
          {step.signature.map((pessoa, i) => (
            <div key={i}>
              <p className="font-medium text-cream-50/90">{pessoa.name}</p>
              <p className="mx-auto max-w-xs">{pessoa.role}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA de retorno */}
      <div className="relative z-10 flex flex-col items-center pb-10 pt-4">
        <Button to="/" variant="cream">
          <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
          Voltar para o início
        </Button>
      </div>

      {/* Rodapé institucional — barra clara, edge-to-edge, com os logos maiores */}
      <footer className="relative z-10 -mx-6 border-t border-forest/10 bg-cream-50">
        <div className="mx-auto flex max-w-3xl items-center justify-center px-6 py-6">
          <img
            src="/imagens/logo_prof-saude-horizontal.png"
            alt="PROFSAÚDE — Mestrado Profissional em Saúde da Família. Realização: ABRASCO, Fiocruz e Ministério da Saúde."
            className="h-auto w-full max-w-[340px]"
          />
        </div>
      </footer>
    </section>
  )
}
