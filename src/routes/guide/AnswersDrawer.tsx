import { AnimatePresence, motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useGuide } from './useGuideState'
import { ppsBand, spictCount } from './interpret'
import { condicoesClinicas } from '@/content/clinicos'
import { esasItems } from '@/content/edmonton'
import { zaritScore, zaritComplete, zaritFaixa } from '@/content/zarit'
import { painadScore, painadComplete, painadFaixa, evaCategoria } from '@/content/dor'
import { planoFields, planoValorLegivel } from '@/content/plano'
import { beneficiosOpcoes } from '@/content/social'
import { zaritQuestions } from '@/content/zarit'
import { steps, type Answers, type StepId } from '@/content/guide'

interface Item {
  label: string
  value: string
}

function buildItems(answers: Answers): Item[] {
  const items: Item[] = []
  const push = (label: string, value: string) => value && items.push({ label, value })

  const pushFields = (stepId: StepId) => {
    const st = steps[stepId]
    if (st.kind !== 'fields') return
    const vals = (answers[st.answerKey] as Record<string, string> | undefined) ?? {}
    for (const f of st.fields) push(f.label, (vals[f.id] ?? '').trim())
  }

  if (answers.doencaAmeacadora)
    push('Doença ameaçadora a vida', answers.doencaAmeacadora === 'sim' ? 'Sim' : 'Não')

  if (answers.perguntaSurpresa)
    push(
      'Pergunta surpresa',
      answers.perguntaSurpresa === 'sim' ? 'Me surpreenderia' : 'Não me surpreenderia',
    )

  const spict = spictCount(answers)
  if (answers.spict) push('SPICT · indicadores gerais', `${spict} marcado(s)`)

  const clin = answers.indicadoresClinicos as Record<string, Record<string, boolean>> | undefined
  if (clin) {
    const total = condicoesClinicas.reduce(
      (sum, c) => sum + Object.values(clin[c.id] ?? {}).filter(Boolean).length,
      0,
    )
    if (total > 0) push('Indicadores clínicos', `${total} indicador(es)`)
  }

  if (answers.pps != null) {
    if (answers.pps === 0) push('PPS', 'Óbito')
    else {
      const b = ppsBand(answers)
      push('PPS', b ? `${b.value} · ${b.label}` : String(answers.pps))
    }
  }

  const fisica = answers.fisica as Record<string, string> | undefined
  if (fisica?.temDor) {
    if (fisica.temDor === 'nao') push('Dor', 'Sem dor')
    else if (fisica.consciente === 'sim' && answers.eva != null)
      push('Dor (EVA)', `${answers.eva} · ${evaCategoria(answers.eva as number)}`)
    else if (fisica.consciente === 'nao') {
      const p = answers.painad as Record<string, number> | undefined
      if (p && painadComplete(p)) push('Dor (PAINAD)', `${painadScore(p)} · ${painadFaixa(painadScore(p))}`)
      else push('Dor', 'Com dor')
    } else push('Dor', 'Com dor')
  }

  // Psicológica e Espiritual: campos de texto
  pushFields('psicologica')

  // Social
  const social = (answers.dimSocial as Record<string, string> | undefined) ?? {}
  push('Quem cuida?', (social.quemCuida ?? '').trim())
  if (social.redeApoio) push('Existe rede de apoio?', social.redeApoio === 'sim' ? 'Sim' : 'Não')
  push('Rede de apoio, quem é?', (social.redeApoioQuem ?? '').trim())
  const benef = answers.beneficiosSociais as Record<string, boolean> | undefined
  if (benef) {
    const labels = beneficiosOpcoes
      .filter((o) => benef[o.id] && o.id !== 'outro')
      .map((o) => o.label)
    if (benef.outro) {
      const outro = (social.beneficiosOutro ?? '').trim()
      labels.push(outro ? `Outro: ${outro}` : 'Outro')
    }
    if (labels.length) push('Benefícios sociais', labels.join(', '))
  }

  pushFields('espiritual')

  // Familiar
  const fam = (answers.dimFamiliar as Record<string, string> | undefined) ?? {}
  push('Dinâmica familiar', (fam.dinamica ?? '').trim())
  if (fam.sobrecarga) push('Sobrecarga do cuidador', fam.sobrecarga === 'sim' ? 'Sim' : 'Não')
  push('Conflitos', (fam.conflitos ?? '').trim())

  const zarit = answers.zarit as Record<string, number> | undefined
  if (zarit && zaritComplete(zarit)) {
    const s = zaritScore(zarit)
    push('ZARIT', `${s} · ${zaritFaixa(s).label}`)
  } else if (zarit && Object.keys(zarit).length > 0) {
    push('ZARIT', `${Object.keys(zarit).length}/${zaritQuestions.length} respondidas`)
  }

  const esas = answers.edmonton as Record<string, number> | undefined
  if (esas) {
    const n = esasItems.filter((i) => esas[i.id] != null).length
    if (n > 0) push('Edmonton', `${n} sintoma(s) avaliado(s)`)
  }

  const spikes = answers.spikes as Record<string, boolean> | undefined
  if (spikes) {
    const n = Object.values(spikes).filter(Boolean).length
    if (n > 0) push('SPIKES', `${n} de 6`)
  }

  const plano = (answers.plano as Record<string, string> | undefined) ?? {}
  planoFields.forEach((f) => {
    const val = planoValorLegivel(f, plano)
    if (val) push(f.label, val)
  })

  pushFields('reflexao')

  if (answers.dav)
    push('DAV', answers.dav === 'consciente' ? 'Consciente e capaz' : 'Incapaz de decidir')
  if (answers.davAplicar)
    push('Diretiva antecipada', answers.davAplicar === 'sim' ? 'É possível aplicar' : 'Programar a realização')

  return items
}

export function AnswersDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { answers } = useGuide()
  const items = buildItems(answers)

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-forest/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-paper shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex items-center justify-between border-b border-forest/10 px-6 py-4">
              <p className="font-serif text-xl text-forest">Respostas até agora</p>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="rounded-full p-2 text-forest transition-colors hover:bg-forest/10"
              >
                <FontAwesomeIcon icon={faXmark} className="text-sm" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <p className="mt-8 text-center leading-relaxed text-forest/50">
                  Ainda não há respostas registradas. Elas aparecem aqui conforme você avança.
                </p>
              ) : (
                <ul className="space-y-4">
                  {items.map((it, i) => (
                    <li key={i}>
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-moss/80">
                        {it.label}
                      </p>
                      <p className="mt-0.5 leading-relaxed text-forest/85">{it.value}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
