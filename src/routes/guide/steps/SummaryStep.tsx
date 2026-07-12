import { useEffect, useMemo, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faFilePdf, faRotateLeft, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { StepShell } from '../StepShell'
import { Button } from '@/components/ui/Button'
import { useGuide } from '../useGuideState'
import { buildResult, type GuideResult } from '@/lib/result'
import { formatDateTime, formatDuration } from '@/lib/format'
import type { Step } from '@/content/guide'

export function SummaryStep({ step }: { step: Extract<Step, { kind: 'summary' }> }) {
  const { answers, next, reset, finish, fillId, startedAt, finishedAt } = useGuide()
  const [downloading, setDownloading] = useState(false)
  const [pdfError, setPdfError] = useState(false)

  // Fixa o horário de término assim que a tela de resultado aparece.
  useEffect(() => {
    finish()
  }, [finish])

  const result: GuideResult = useMemo(() => {
    const end = finishedAt ?? Date.now()
    return buildResult(answers, {
      fillId,
      patientId: null,
      startedAt: new Date(startedAt).toISOString(),
      finishedAt: new Date(end).toISOString(),
      durationMs: Math.max(0, end - startedAt),
    })
  }, [answers, fillId, startedAt, finishedAt])

  // Envio anonimizado, apenas com consentimento. Uma vez por preenchimento.
  const submitted = useRef(false)
  useEffect(() => {
    if (submitted.current) return
    if (finishedAt == null) return
    if (answers.consentimento !== 'sim') return
    submitted.current = true
    void import('@/lib/persist').then((m) => m.submitResult(result))
  }, [answers.consentimento, finishedAt, result])

  const baixarPdf = async () => {
    setDownloading(true)
    setPdfError(false)
    try {
      const { buildReportBlob, reportFileName } = await import('@/lib/pdf/report')
      const blob = await buildReportBlob(result)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = reportFileName(result)
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch {
      setPdfError(true)
    } finally {
      setDownloading(false)
    }
  }

  const pdfButton = (
    <button
      onClick={baixarPdf}
      disabled={downloading}
      className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream-50 transition-colors hover:bg-pine disabled:opacity-60"
    >
      <FontAwesomeIcon
        icon={downloading ? faSpinner : faFilePdf}
        className={`text-sm ${downloading ? 'animate-spin' : ''}`}
      />
      {downloading ? 'Gerando PDF…' : 'Baixar PDF'}
    </button>
  )

  return (
    <StepShell kicker={step.kicker} title={step.title} todo={step.todo}>
      <p className="text-sm text-forest/55">
        {formatDateTime(result.finishedAt)} · {formatDuration(result.durationMs)}
      </p>

      {/* CTA principal (topo) */}
      <div className="mt-5">{pdfButton}</div>

      {/* Respostas estruturadas */}
      <div className="mt-8 space-y-8">
        {result.sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-serif text-xl text-forest">{section.title}</h2>
            <div className="mt-3 space-y-3 rounded-2xl border border-forest/10 bg-cream-50/60 p-5">
              {section.fields.map((f, i) => (
                <div key={i} className="sm:flex sm:gap-4">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-moss/80 sm:w-2/5 sm:shrink-0">
                    {f.label}
                  </p>
                  <p className="mt-0.5 leading-relaxed text-forest/85 sm:mt-0 sm:flex-1">{f.value}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Ações */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {pdfButton}
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 text-sm text-forest/55 transition-colors hover:text-moss"
        >
          <FontAwesomeIcon icon={faRotateLeft} className="text-xs" />
          Recomeçar o guia
        </button>
      </div>

      {pdfError && (
        <p className="mt-3 text-sm text-red-700/80">
          Não foi possível gerar o PDF agora. Verifique a conexão e tente novamente.
        </p>
      )}

      {/* Seguir para o encerramento */}
      <div className="mt-10">
        <Button onClick={next} size="lg" className="w-full sm:w-auto">
          Seguir
          <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
        </Button>
      </div>

      {/* Identificador — sutil, no rodapé do resumo */}
      <div className="mt-10 border-t border-forest/10 pt-4">
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-forest/40">
          Identificador
        </span>
        <p className="mt-0.5 font-mono text-xs text-forest/45">{fillId}</p>
      </div>
    </StepShell>
  )
}
