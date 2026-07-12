import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/motion/Reveal'
import { sections } from '@/content/sections'
import { verses } from '@/content/quotes'
import { gentle } from '@/lib/motion'

export default function Home() {
  return (
    <>
      <Hero />
      <SectionsIndex />
    </>
  )
}

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-cream">
      {/* Fundo: fotografia (retrato no mobile, paisagem no desktop) */}
      <div className="absolute inset-0">
        <img
          src="/imagens/hero-mobile.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-[45%_center] sm:hidden"
        />
        <img
          src="/imagens/hero.png"
          alt=""
          aria-hidden="true"
          className="hidden h-full w-full object-cover object-[72%_center] sm:block"
        />
        {/* Mobile: véu de baixo pra cima — texto no rodapé fica legível */}
        <div className="absolute inset-0 bg-gradient-to-t from-paper from-10% via-paper/80 via-50% to-transparent to-90% sm:hidden" />
        {/* Desktop: véu à esquerda */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-paper from-5% via-paper/85 via-45% to-transparent to-80% sm:block" />
        {/* Desktop: emenda inferior com o restante da página */}
        <div className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-paper to-transparent sm:block" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 sm:px-10">
        {/* Bloco do título — no mobile desce pro rodapé e centraliza; no desktop fica ao centro à esquerda */}
        <div className="flex flex-1 flex-col items-center justify-end pt-28 pb-6 text-center sm:items-start sm:justify-center sm:pb-10 sm:text-left">
          <motion.h1
            className="display max-w-2xl font-serif text-[2rem] leading-[1.02] text-forest sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...gentle, delay: 0.1 }}
          >
            Guia de direção clínica para os cuidados paliativos na APS
          </motion.h1>

          <motion.p
            className="mx-auto mt-8 max-w-md font-serif text-xl italic leading-relaxed text-forest/75 sm:mx-0 sm:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...gentle, delay: 0.25 }}
          >
            Nem todo sofrimento precisa esperar a terminalidade para ser cuidado.
          </motion.p>
        </div>

        {/* Rodapé do hero: CTA */}
        <motion.div
          className="pb-10 sm:pb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...gentle, delay: 0.4 }}
        >
          <Button to="/guia" size="lg" className="w-full sm:w-auto">
            Acessar o guia
            <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
          </Button>
          <p className="mt-5 text-center text-sm text-forest/55 sm:text-left">
            Presença, ciência e cuidado: passo a passo.
          </p>
          <img
            src="/imagens/logo_prof-saude-horizontal.png"
            alt="PROFSAÚDE — Mestrado Profissional em Saúde da Família. Realização: ABRASCO, Fiocruz e Ministério da Saúde."
            className="mx-auto mt-8 h-8 w-auto max-w-full sm:mx-0 sm:h-10"
          />
        </motion.div>
      </div>
    </section>
  )
}

/**
 * Índice editorial "Para conhecer" (direção D1).
 * Sumário numerado das seções (01–05); o Guia entra como destinação 06,
 * acentuada em pine — o clímax da lista de leitura.
 */
function SectionsIndex() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 sm:px-10 sm:py-32">
      <Reveal>
        <p className="mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-moss">
          Para conhecer
        </p>
        <h2 className="max-w-2xl font-serif text-4xl leading-[1.02] text-forest sm:text-5xl">
          O essencial dos cuidados paliativos na Atenção Primária.
        </h2>
      </Reveal>

      <ol className="mt-14 border-t border-forest/12">
        {sections.map((s, i) => (
          <IndexRow
            key={s.path}
            n={String(i + 1).padStart(2, '0')}
            to={s.path}
            title={s.menuLabel}
            blurb={s.blurb}
            delay={i * 0.05}
          />
        ))}

        {/* 06 — o Guia interativo como destinação acentuada */}
        <IndexRow
          n="06"
          to="/guia"
          title="Guia de direção clínica"
          blurb="Passo a passo para conduzir o cuidado, do primeiro sinal ao plano."
          verse={verses.aposFuncionalidade.text}
          guide
          delay={sections.length * 0.05}
        />
      </ol>
    </section>
  )
}

interface IndexRowProps {
  n: string
  to: string
  title: string
  blurb: string
  verse?: string
  guide?: boolean
  delay: number
}

function IndexRow({ n, to, title, blurb, verse, guide, delay }: IndexRowProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...gentle, delay }}
    >
      <Link
        to={to}
        className={`group flex items-baseline gap-6 border-b border-forest/12 py-7 sm:gap-10 sm:py-8 ${
          guide ? 'mt-2 rounded-2xl border border-transparent bg-pine px-6 text-cream-50 sm:px-8' : ''
        }`}
      >
        <span
          className={`font-serif text-2xl tabular-nums sm:text-3xl ${
            guide ? 'text-sage' : 'text-moss/50'
          }`}
        >
          {n}
        </span>
        <span className="flex-1">
          <span
            className={`block font-serif text-2xl leading-tight transition-colors sm:text-[2rem] ${
              guide ? 'text-cream-50' : 'text-forest group-hover:text-moss'
            }`}
          >
            {title}
          </span>
          <span
            className={`mt-1.5 block max-w-xl leading-relaxed ${
              guide ? 'text-sage-200' : 'text-forest/55'
            }`}
          >
            {blurb}
          </span>
          {verse && (
            <span className="mt-3 block max-w-md font-serif text-lg italic leading-relaxed text-sage">
              {verse}
            </span>
          )}
        </span>
        <FontAwesomeIcon
          icon={faArrowRight}
          className={`mt-2 shrink-0 text-sm transition-transform duration-300 ease-gentle group-hover:translate-x-1 ${
            guide ? 'text-sage' : 'text-forest/40 group-hover:text-moss'
          }`}
        />
      </Link>
    </motion.li>
  )
}
