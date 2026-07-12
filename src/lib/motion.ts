import type { Variants, Transition } from 'motion/react'

/**
 * Vocabulário de movimento do Guia Paliativo APS.
 * Contido e sensível: fades curtos + deslocamentos pequenos, easing suave.
 * Nada de bounce/spring exagerado.
 */

export const gentle: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
}

export const gentleFast: Transition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
}

/** Entrada por scroll — fade + translate curto. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: gentle },
}

/** Container que escalona a entrada dos filhos. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: gentleFast },
}

/**
 * Transição de página (via AnimatePresence mode="wait").
 * Crossfade puro: a página atual some por completo antes de a próxima entrar —
 * sem deslocamento, para não haver "pulo" entre as telas.
 */
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
}

/**
 * Transição entre etapas do guia — apenas transparência (crossfade), sem
 * deslocamento lateral. Bem lenta e suave, com AnimatePresence mode="wait".
 */
export const stepFade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.1, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
}
