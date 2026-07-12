import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { gentle } from '@/lib/motion'
import { PageNav } from './PageNav'

interface PageShellProps {
  kicker: string
  title: string
  intro?: string
  children: ReactNode
}

/**
 * Template de leitura das seções informativas.
 * Título editorial (EB Garamond), coluna de leitura confortável, muito respiro.
 */
export function PageShell({ kicker, title, intro, children }: PageShellProps) {
  return (
    <div className="relative">
      {/* Faixa de degradê suave no topo — assinatura visual */}
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-sage-100 to-paper" />

      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 sm:px-10 sm:pt-36">
        <PageNav />

        <motion.p
          className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-moss"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={gentle}
        >
          {kicker}
        </motion.p>
        <motion.h1
          className="font-serif text-4xl leading-[1.08] text-forest sm:text-5xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...gentle, delay: 0.05 }}
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            className="mt-6 font-serif text-xl italic leading-relaxed text-forest/70 sm:text-2xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...gentle, delay: 0.12 }}
          >
            {intro}
          </motion.p>
        )}

        <div className="mt-14 space-y-10">{children}</div>
      </div>
    </div>
  )
}
