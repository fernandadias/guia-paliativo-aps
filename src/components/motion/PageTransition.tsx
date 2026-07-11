import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { pageTransition } from '@/lib/motion'

/** Envelope de transição entre páginas (usado dentro de AnimatePresence). */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}
