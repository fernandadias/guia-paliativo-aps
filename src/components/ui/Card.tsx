import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CardProps {
  children: ReactNode
  className?: string
  /** Superfície mais suave (sálvia) em vez de papel. */
  tone?: 'paper' | 'sage'
}

/** Superfície flat: profundidade por cor e hairline, sem sombra. */
export function Card({ children, className, tone = 'paper' }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border p-6 sm:p-8',
        tone === 'sage'
          ? 'border-forest/10 bg-sage-100'
          : 'border-forest/10 bg-cream-50/70',
        className,
      )}
    >
      {children}
    </div>
  )
}
