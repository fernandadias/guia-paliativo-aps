import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'ghost' | 'outline' | 'cream'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-full font-medium ' +
  'transition-[background-color,border-color,transform] duration-300 ease-gentle ' +
  'active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100 select-none'

const variants: Record<Variant, string> = {
  primary: 'bg-forest text-cream-50 hover:bg-forest-700',
  outline: 'border border-forest/25 text-forest hover:border-forest/50 hover:bg-forest/5',
  ghost: 'text-forest hover:bg-forest/5',
  cream: 'bg-cream-50 text-forest hover:bg-cream',
}

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-[0.95rem]',
  lg: 'px-8 py-4 text-base',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { to?: undefined }
type ButtonAsLink = CommonProps & { to: string }

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = 'primary', size = 'md', className, children } = props
  const classes = cn(base, variants[variant], sizes[size], className)

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    )
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as ButtonAsButton
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
