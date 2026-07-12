import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { gentle } from '@/lib/motion'

/** Versos de Carlos Drummond de Andrade que dão o fio condutor do guia. */
const poema = [
  'E agora, José',
  'A festa acabou,',
  'a luz apagou,',
  'o povo sumiu,',
  'a noite esfriou,',
  'e agora, José?',
]

/**
 * Interlúdio poético — "E agora, José?".
 * Imagem de fundo suave no topo e o poema em serifada, seguido da leitura
 * que a pergunta ganha ao longo do guia.
 */
export default function EAgoraJose() {
  return (
    <div className="relative">
      {/* Imagem de fundo suave no topo — esmaece no papel */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[75vh] overflow-hidden">
        <img
          src="/imagens/imagem-02.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/35 via-paper/75 to-paper" />
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 sm:px-10 sm:pt-36">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-forest/50 transition-colors hover:text-moss"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          Início
        </Link>

        <motion.p
          className="mb-6 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-moss"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={gentle}
        >
          O fio condutor
        </motion.p>

        <motion.figure
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...gentle, delay: 0.08 }}
        >
          <blockquote className="font-serif text-3xl italic leading-[1.5] text-forest sm:text-4xl">
            {poema.map((linha, i) => (
              <span key={i} className="block">
                {i === 0 && '“'}
                {linha}
                {i === poema.length - 1 && '”'}
              </span>
            ))}
          </blockquote>
          <figcaption className="mt-6 text-sm text-forest/50">
            Carlos Drummond de Andrade
          </figcaption>
        </motion.figure>

        <motion.p
          className="mt-16 leading-relaxed text-forest/75 sm:text-lg"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...gentle, delay: 0.16 }}
        >
          Ao longo deste guia, a pergunta “E agora, José?” simboliza os desafios e as
          incertezas vivenciados pelos profissionais diante do cuidado paliativo. Cada
          etapa foi construída para transformar essa pergunta em possibilidades de cuidado.
        </motion.p>
      </div>
    </div>
  )
}
