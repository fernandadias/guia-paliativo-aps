import { AnimatePresence, motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faImage,
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
  faFaceFrownOpen,
  faFaceTired,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { StepShell } from '../StepShell'
import { useGuide } from '../useGuideState'
import { gentleFast } from '@/lib/motion'
import {
  evaCategoria,
  evaCategorias,
  painadItems,
  painadScore,
  painadComplete,
  painadFaixa,
  medicacoesOpcoes,
  type PainadAnswers,
} from '@/content/dor'
import type { Step } from '@/content/guide'

type Meta = Record<string, string>
type Marks = Record<string, boolean>

const EVA_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function evaFace(value: number): IconDefinition {
  if (value === 0) return faFaceSmile
  if (value <= 3) return faFaceMeh
  if (value <= 6) return faFaceFrown
  if (value <= 9) return faFaceFrownOpen
  return faFaceTired
}

export function FisicaStep({ step }: { step: Extract<Step, { kind: 'fisica' }> }) {
  const { answers, answer, next } = useGuide()
  const meta = (answers[step.answerKey] as Meta | undefined) ?? {}
  const eva = answers.eva as number | undefined
  const painad = (answers.painad as PainadAnswers | undefined) ?? {}
  const med = (answers.dorMed as Marks | undefined) ?? {}

  const setMeta = (k: string, v: string) => answer(step.answerKey, { ...meta, [k]: v })
  const setPainad = (id: string, pts: number) => answer('painad', { ...painad, [id]: pts })
  const toggleMed = (id: string, exclusiva?: boolean) => {
    if (exclusiva) {
      answer('dorMed', { [id]: !med[id] })
      return
    }
    const nextMed = { ...med, nenhuma: false, [id]: !med[id] }
    answer('dorMed', nextMed)
  }

  const temDor = meta.temDor
  const consciente = meta.consciente
  const pScore = painadScore(painad)
  const pComplete = painadComplete(painad)

  return (
    <StepShell
      kicker={step.kicker}
      title={step.title}
      note={step.intro}
      continueLabel="Continuar"
      onContinue={next}
      continueDisabled={!temDor}
    >
      <div className="space-y-6">
        <figure className="border-l-2 border-moss/40 pl-5">
          <blockquote className="font-serif text-lg italic leading-relaxed text-forest/80 sm:text-xl">
            {[
              'E agora, José?',
              'Sua doce palavra,',
              'seu instante de febre,',
              'sua gula e jejum',
              '[...] seu ódio — e agora?',
            ].map((linha, i) => (
              <span key={i} className="block">
                {linha}
              </span>
            ))}
          </blockquote>
        </figure>

        <ChoiceRow
          label="Há dor?"
          value={temDor}
          onSelect={(v) => setMeta('temDor', v)}
        />

        <AnimatePresence initial={false}>
          {temDor === 'sim' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={gentleFast}
              className="overflow-hidden"
            >
              <div className="space-y-6">
                <ChoiceRow
                  label="Paciente consciente?"
                  value={consciente}
                  onSelect={(v) => setMeta('consciente', v)}
                />

                {/* EVA */}
                {consciente === 'sim' && (
                  <div className="rounded-3xl border border-forest/10 bg-cream-50/60 p-5">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-moss">
                      EVA · Escala Visual Analógica
                    </p>
                    <div className="mt-4 flex flex-col items-center">
                      <FontAwesomeIcon
                        icon={evaFace(eva ?? 0)}
                        className={`text-5xl ${eva != null ? 'text-moss' : 'text-forest/20'}`}
                      />
                      <p className="mt-2 font-serif text-xl text-forest">
                        {eva != null ? evaCategoria(eva) : 'Selecione'}
                      </p>
                    </div>

                    {/* Escala de cor de referência */}
                    <div className="mt-5">
                      <div
                        className="relative h-3 w-full rounded-full"
                        style={{
                          background:
                            'linear-gradient(to right,#3fae4a,#8fce3f,#f4d13d,#f39c3d,#e8642f,#e23b2e)',
                        }}
                      >
                        {eva != null && (
                          <span
                            className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-paper bg-forest shadow"
                            style={{ left: `${(eva / 10) * 100}%` }}
                          />
                        )}
                      </div>
                      <div className="mt-2 flex justify-between gap-1 text-center text-[0.6rem] leading-tight text-forest/55">
                        {evaCategorias.map((c) => (
                          <span key={c} className="flex-1">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      {EVA_VALUES.map((v) => {
                        const active = eva === v
                        return (
                          <button
                            key={v}
                            onClick={() => answer('eva', v)}
                            className={`h-10 w-10 rounded-xl border text-sm font-medium tabular-nums transition-colors ${
                              active
                                ? 'border-forest bg-forest text-cream-50'
                                : 'border-forest/20 bg-paper text-forest hover:border-forest/45'
                            }`}
                          >
                            {v}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* PAINAD */}
                {consciente === 'nao' && (
                  <div className="rounded-3xl border border-forest/10 bg-cream-50/60 p-5">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-moss">
                      PAINAD · dor em demência avançada
                    </p>
                    <div className="mt-5 space-y-6">
                      {painadItems.map((item) => (
                        <div key={item.id}>
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-dashed border-forest/25 text-forest/30">
                              <FontAwesomeIcon icon={faImage} className="text-sm" />
                            </span>
                            <p className="text-sm font-medium text-forest">{item.label}</p>
                          </div>
                          <div className="mt-2 space-y-1.5">
                            {item.niveis.map((n) => {
                              const active = painad[item.id] === n.pts
                              return (
                                <button
                                  key={n.pts}
                                  onClick={() => setPainad(item.id, n.pts)}
                                  className={`flex w-full items-center gap-3 rounded-xl border p-2.5 text-left text-sm transition-colors ${
                                    active
                                      ? 'border-moss bg-sage-100 text-forest'
                                      : 'border-forest/15 bg-paper/60 text-forest/80 hover:border-forest/35'
                                  }`}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-forest/85 text-xs font-semibold text-cream-50">
                                    {n.pts}
                                  </span>
                                  {n.label}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                    {pComplete && (
                      <div className="mt-5 flex items-center justify-between rounded-2xl border border-moss/25 bg-sage-100 p-4">
                        <span className="font-serif text-lg text-forest">{painadFaixa(pScore)}</span>
                        <span className="text-sm text-forest/60 tabular-nums">{pScore} pontos</span>
                      </div>
                    )}
                    <p className="mt-3 text-xs text-forest/45">
                      As ilustrações de cada item entram quando a cliente enviar os assets.
                    </p>
                  </div>
                )}

                {/* Local da dor */}
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-forest/70">
                    Local da dor
                  </span>
                  <input
                    type="text"
                    value={meta.local ?? ''}
                    onChange={(e) => setMeta('local', e.target.value)}
                    placeholder="Onde dói…"
                    className="w-full rounded-2xl border border-forest/15 bg-cream-50/60 px-4 py-3 text-forest outline-none transition-colors placeholder:text-forest/30 focus:border-moss"
                  />
                </label>

                {/* Medicações */}
                <div>
                  <span className="mb-2 block text-sm font-medium text-forest/70">
                    Medicações em uso
                  </span>
                  <div className="space-y-2">
                    {medicacoesOpcoes.map((opt) => {
                      const active = !!med[opt.id]
                      return (
                        <button
                          key={opt.id}
                          onClick={() => toggleMed(opt.id, opt.exclusiva)}
                          className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left text-sm transition-colors ${
                            active
                              ? 'border-moss bg-sage-100 text-forest'
                              : 'border-forest/15 bg-cream-50/60 text-forest/80 hover:border-forest/35'
                          }`}
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                              active ? 'border-moss bg-moss text-cream-50' : 'border-forest/25'
                            }`}
                          >
                            {active && <FontAwesomeIcon icon={faCheck} className="text-[0.6rem]" />}
                          </span>
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                  {med.outros && (
                    <input
                      type="text"
                      value={meta.medOutro ?? ''}
                      onChange={(e) => setMeta('medOutro', e.target.value)}
                      placeholder="Qual medicação?"
                      className="mt-2 w-full rounded-2xl border border-forest/15 bg-cream-50/60 px-4 py-3 text-forest outline-none transition-colors placeholder:text-forest/30 focus:border-moss"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StepShell>
  )
}

function ChoiceRow({
  label,
  value,
  onSelect,
}: {
  label: string
  value: string | undefined
  onSelect: (v: string) => void
}) {
  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-forest/70">{label}</span>
      <div className="grid grid-cols-2 gap-3">
        {[
          { v: 'sim', label: 'Sim' },
          { v: 'nao', label: 'Não' },
        ].map((opt) => {
          const active = value === opt.v
          return (
            <button
              key={opt.v}
              onClick={() => onSelect(opt.v)}
              className={`rounded-2xl border p-4 text-center font-medium transition-colors ${
                active
                  ? 'border-moss bg-sage-100 text-forest'
                  : 'border-forest/15 bg-cream-50/60 text-forest/80 hover:border-forest/35'
              }`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
