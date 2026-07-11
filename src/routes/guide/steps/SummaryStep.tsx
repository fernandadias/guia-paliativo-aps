import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint, faFilePdf, faFileMedical, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { StepShell } from '../StepShell'
import { useGuide } from '../useGuideState'
import { ppsBand, resultReading, davReading, spictCount } from '../interpret'
import { steps } from '@/content/guide'
import type { Step } from '@/content/guide'

export function SummaryStep({ step }: { step: Extract<Step, { kind: 'summary' }> }) {
  const { answers, reset } = useGuide()
  const pps = ppsBand(answers)
  const reading = resultReading(answers)
  const dav = davReading(answers)
  const plano = (answers.plano as Record<string, string> | undefined) ?? {}
  const dimensoes = (answers.dimensoes as Record<string, string> | undefined) ?? {}

  const planoFields = steps.plano.kind === 'fields' ? steps.plano.fields : []
  const dims = steps.dimensoes.kind === 'dimensions' ? steps.dimensoes.dimensions : []

  return (
    <StepShell kicker={step.kicker} title={step.title} todo={step.todo}>
      <p className="text-forest/60">
        Um retrato do que foi construído neste atendimento. O paciente é o José, e cada José tem
        seu próprio caminho.
      </p>

      <div className="mt-8 space-y-5 rounded-3xl border border-forest/10 bg-cream-50/60 p-6 sm:p-8">
        <Row label="Funcionalidade (PPS)">
          {pps ? `${pps.label} (PPS ${pps.value})` : 'Não informado'}
        </Row>
        <Row label="Interpretação">{reading.title}</Row>
        <Row label="Indicadores SPICT-BR">{spictCount(answers)} marcado(s)</Row>

        <Divider />

        <Row label="Dimensões avaliadas">
          {dims
            .filter((d) => d.fields.some((_, i) => dimensoes[`${d.id}:${i}`]?.trim()))
            .map((d) => d.label)
            .join(' · ') || 'Nenhuma anotação registrada'}
        </Row>

        <Divider />

        {planoFields.map((f) => (
          <Row key={f.id} label={f.label}>
            {plano[f.id]?.trim() || <span className="text-forest/35">Em aberto</span>}
          </Row>
        ))}

        {dav && (
          <>
            <Divider />
            <Row label="Diretiva antecipada (DAV)">{dav}</Row>
          </>
        )}
      </div>

      {/* Ações — stub na v1 */}
      <div className="mt-8 flex flex-wrap gap-3">
        <StubAction icon={faPrint} label="Imprimir" />
        <StubAction icon={faFilePdf} label="Salvar em PDF" />
        <StubAction icon={faFileMedical} label="Anexar ao prontuário" />
      </div>

      <button
        onClick={reset}
        className="mt-10 inline-flex items-center gap-2 text-sm text-forest/55 transition-colors hover:text-moss"
      >
        <FontAwesomeIcon icon={faRotateLeft} className="text-xs" />
        Recomeçar o guia
      </button>
    </StepShell>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-moss/80">
        {label}
      </p>
      <p className="mt-1 leading-relaxed text-forest/85">{children}</p>
    </div>
  )
}

function Divider() {
  return <div className="h-px bg-forest/10" />
}

function StubAction({ icon, label }: { icon: typeof faPrint; label: string }) {
  return (
    <span
      aria-disabled
      title="Disponível numa próxima versão"
      className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-forest/15 px-5 py-2.5 text-sm text-forest/40"
    >
      <FontAwesomeIcon icon={icon} className="text-xs" />
      {label}
    </span>
  )
}
