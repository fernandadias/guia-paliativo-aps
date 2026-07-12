import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faListCheck, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import {
  FIRST_STEP,
  getNextStepId,
  steps,
  type Answers,
  type StepId,
} from '@/content/guide'
import { getIcon } from '@/lib/icons'
import { GuideProvider, useGuide } from './useGuideState'
import { StepView } from './StepView'

/**
 * Caminho do checklist: percorre o fluxo a partir das respostas atuais,
 * revelando as etapas do ramo ativo. Para num terminal ou no resumo.
 */
function buildFastPath(answers: Answers): StepId[] {
  const out: StepId[] = []
  const seen = new Set<StepId>()
  let cursor: StepId = FIRST_STEP
  for (let i = 0; i < 80; i++) {
    if (seen.has(cursor)) break
    seen.add(cursor)
    out.push(cursor)
    if (steps[cursor].kind === 'terminal' || cursor === 'resumo') break
    const next = getNextStepId(cursor, answers)
    if (!next) break
    cursor = next
  }
  return out
}

function FastGuideInner() {
  const { answers, fillId, finish } = useGuide()
  const [showResult, setShowResult] = useState(false)
  const footerRef = useRef<HTMLDivElement>(null)

  // "Recomeçar" (dentro do resumo) gera novo fillId → volta ao checklist.
  const prevFill = useRef(fillId)
  useEffect(() => {
    if (prevFill.current !== fillId) {
      prevFill.current = fillId
      setShowResult(false)
      window.scrollTo({ top: 0 })
    }
  }, [fillId])

  const path = useMemo(() => buildFastPath(answers), [answers])
  const terminalId = path.find((id) => steps[id].kind === 'terminal')
  const cardIds = path.filter(
    (id) => !['loading', 'summary', 'terminal'].includes(steps[id].kind),
  )

  const verResultado = () => {
    finish()
    setShowResult(true)
    window.scrollTo({ top: 0 })
  }

  if (showResult) {
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-10">
        <button
          onClick={() => setShowResult(false)}
          className="mb-6 inline-flex items-center gap-2 text-sm text-forest/55 transition-colors hover:text-moss"
        >
          <FontAwesomeIcon icon={faListCheck} className="text-xs" />
          Voltar ao checklist
        </button>
        <StepView step={steps.resumo} />
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-10">
      <header className="mb-8">
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-moss">
          Versão rápida
        </span>
        <h1 className="mt-2 font-serif text-3xl leading-tight text-forest sm:text-4xl">
          Guia em checklist
        </h1>
        <p className="mt-3 leading-relaxed text-forest/60">
          Todas as etapas numa página só. Preencha na ordem que preferir; conforme responde, os
          próximos passos aparecem.
        </p>
        <Link
          to="/guia"
          className="mt-4 inline-flex items-center gap-2 text-sm text-forest/55 transition-colors hover:text-moss"
        >
          <FontAwesomeIcon icon={faWandMagicSparkles} className="text-xs" />
          Prefiro a versão guiada, passo a passo
        </Link>
      </header>

      <div className="space-y-5">
        {cardIds.map((id) => (
          <StepView key={id} step={steps[id]} />
        ))}

        {terminalId && (
          <div className="rounded-3xl border border-moss/20 bg-sage-100 p-6 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-paper text-xl text-moss">
              <FontAwesomeIcon icon={getIcon((steps[terminalId] as { icon: string }).icon)} />
            </span>
            <h2 className="mt-4 font-serif text-2xl text-forest">
              {(steps[terminalId] as { title: string }).title}
            </h2>
            <p className="mt-2 leading-relaxed text-forest/70">
              {(steps[terminalId] as { body: string }).body}
            </p>
          </div>
        )}
      </div>

      <div
        ref={footerRef}
        className="sticky bottom-0 mt-8 bg-gradient-to-t from-paper via-paper to-transparent pb-6 pt-4"
      >
        <button
          onClick={verResultado}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-4 font-medium text-cream-50 transition-colors hover:bg-pine sm:w-auto"
        >
          Ver resultado
          <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
        </button>
      </div>
    </div>
  )
}

export default function FastGuide() {
  return (
    <GuideProvider mode="fast">
      <div className="min-h-[100svh] bg-paper">
        <FastGuideInner />
      </div>
    </GuideProvider>
  )
}
