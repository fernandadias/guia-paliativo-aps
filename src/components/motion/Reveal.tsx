import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { reveal } from '@/lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Atraso extra em segundos. */
  delay?: number
  as?: 'div' | 'section' | 'article' | 'li'
}

/** Entrada sutil quando o elemento aparece no viewport. */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay }}
    >
      {children}
    </Comp>
  )
}
