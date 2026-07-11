import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-forest/10 bg-cream-50/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <Logo />
        <p className="max-w-sm text-sm leading-relaxed text-forest/60">
          Presença, ciência e cuidado: passo a passo. Material de apoio para profissionais da
          Atenção Primária à Saúde.
        </p>
      </div>
    </footer>
  )
}
