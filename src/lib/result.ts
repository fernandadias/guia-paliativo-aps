/**
 * Resultado estruturado do preenchimento do guia.
 *
 * Fonte única de verdade para: tela de resultado (G1), PDF (G2) e o payload
 * anonimizado enviado ao Supabase (F3). Não contém nenhum dado pessoal do
 * paciente nem do profissional — apenas as respostas clínicas e metadados.
 */

import type { Answers } from '@/content/guide'
import { bandInfo } from '@/content/pps'
import { condicoesClinicas } from '@/content/clinicos'
import { esasItems } from '@/content/edmonton'
import {
  zaritScore,
  zaritComplete,
  zaritFaixa,
  zaritQuestions,
  type ZaritAnswers,
} from '@/content/zarit'
import {
  painadScore,
  painadComplete,
  painadFaixa,
  evaCategoria,
  medicacoesOpcoes,
  type PainadAnswers,
} from '@/content/dor'
import { planoFields, planoValorLegivel } from '@/content/plano'
import { beneficiosOpcoes } from '@/content/social'
import { spictCount, resultReading, davReading } from '@/routes/guide/interpret'

/** Versão do formato do resultado. Suba quando o schema mudar de forma incompatível. */
export const SCHEMA_VERSION = 1

export interface ResultField {
  label: string
  value: string
}

export interface ResultSection {
  title: string
  fields: ResultField[]
}

export interface ResultMeta {
  fillId: string
  /** ID opcional do paciente informado pelo profissional (feature futura). */
  patientId?: string | null
  startedAt: string
  finishedAt: string
  durationMs: number
}

export interface GuideResult extends ResultMeta {
  schemaVersion: number
  sections: ResultSection[]
  /** Escores calculados, para facilitar a análise depois (ciência de dados). */
  derived: Record<string, unknown>
  /** Respostas cruas, exatamente como capturadas pelo motor. */
  answers: Answers
}

// ── Helpers de leitura ────────────────────────────────────────
function asRecord<T = string>(v: unknown): Record<string, T> {
  return (v as Record<string, T> | undefined) ?? {}
}

function sim(v: unknown): string {
  return v === 'sim' ? 'Sim' : v === 'nao' ? 'Não' : ''
}

// ── Seções para exibição (tela + PDF) ─────────────────────────
export function buildSections(answers: Answers): ResultSection[] {
  const sections: ResultSection[] = []

  const section = (title: string, build: (add: (label: string, value: string) => void) => void) => {
    const fields: ResultField[] = []
    build((label, value) => {
      if (value != null && String(value).trim()) fields.push({ label, value: String(value).trim() })
    })
    if (fields.length) sections.push({ title, fields })
  }

  // Triagem
  section('Triagem', (add) => {
    if (answers.doencaAmeacadora)
      add('Doença ameaçadora a vida', sim(answers.doencaAmeacadora))
    if (answers.perguntaSurpresa)
      add(
        'Pergunta surpresa',
        answers.perguntaSurpresa === 'sim' ? 'Me surpreenderia' : 'Não me surpreenderia',
      )
    if (answers.perguntaSurpresa === 'sim') add('Recomendação', 'Recomenda-se reavaliação periódica')
  })

  // SPICT
  section('SPICT', (add) => {
    const spict = spictCount(answers)
    if (answers.spict) add('Indicadores gerais', `${spict} marcado(s)`)

    const clin = asRecord<Record<string, boolean>>(answers.indicadoresClinicos)
    const porCondicao = condicoesClinicas
      .map((c) => {
        const n = Object.values(clin[c.id] ?? {}).filter(Boolean).length
        return n > 0 ? `${c.label} (${n})` : null
      })
      .filter(Boolean) as string[]
    if (porCondicao.length) add('Indicadores clínicos', porCondicao.join(' · '))
  })

  // Funcionalidade (PPS)
  section('Funcionalidade', (add) => {
    if (answers.pps != null) {
      if (answers.pps === 0) add('PPS', 'Óbito')
      else {
        const info = bandInfo(answers.pps as number)
        add('PPS', info ? `${answers.pps} · ${info.label}` : String(answers.pps))
      }
    }
  })

  // Dimensão física (dor)
  section('Dimensão física · Dor', (add) => {
    const fisica = asRecord(answers.fisica)
    if (fisica.temDor === 'nao') {
      add('Dor', 'Sem dor')
      return
    }
    if (fisica.temDor === 'sim') {
      if (fisica.consciente === 'sim' && answers.eva != null)
        add('EVA', `${answers.eva} · ${evaCategoria(answers.eva as number)}`)
      else if (fisica.consciente === 'nao') {
        const p = answers.painad as PainadAnswers | undefined
        if (p && painadComplete(p)) add('PAINAD', `${painadScore(p)} · ${painadFaixa(painadScore(p))}`)
        else add('Dor', 'Com dor')
      } else add('Dor', 'Com dor')

      if (fisica.local) add('Local da dor', fisica.local)

      const med = asRecord<boolean>(answers.dorMed)
      const labels = medicacoesOpcoes
        .filter((o) => med[o.id] && o.id !== 'outros')
        .map((o) => o.label)
      if (med.outros) labels.push(fisica.medOutro ? `Outros: ${fisica.medOutro}` : 'Outros')
      if (labels.length) add('Medicações em uso', labels.join(', '))
    }
  })

  // Dimensão psicológica
  section('Dimensão psicológica', (add) => {
    const v = asRecord(answers.dimPsicologica)
    add('Humor', v.humor)
    add('Ansiedade', v.ansiedade)
    add('Medos', v.medos)
  })

  // Dimensão social
  section('Dimensão social', (add) => {
    const s = asRecord(answers.dimSocial)
    add('Quem cuida', s.quemCuida)
    if (s.redeApoio) add('Existe rede de apoio', sim(s.redeApoio))
    add('Rede de apoio, quem é', s.redeApoioQuem)
    const benef = asRecord<boolean>(answers.beneficiosSociais)
    const labels = beneficiosOpcoes
      .filter((o) => benef[o.id] && o.id !== 'outro')
      .map((o) => o.label)
    if (benef.outro) labels.push(s.beneficiosOutro ? `Outro: ${s.beneficiosOutro}` : 'Outro')
    if (labels.length) add('Benefícios sociais', labels.join(', '))
  })

  // Dimensão espiritual
  section('Dimensão espiritual', (add) => {
    const v = asRecord(answers.dimEspiritual)
    add('Crença importante', v.crenca)
    add('Desejos', v.desejos)
    add('Valores', v.valores)
  })

  // Dimensão familiar
  section('Dimensão familiar', (add) => {
    const f = asRecord(answers.dimFamiliar)
    add('Dinâmica familiar', f.dinamica)
    const zarit = answers.zarit as ZaritAnswers | undefined
    if (zarit && zaritComplete(zarit)) {
      const sc = zaritScore(zarit)
      add('Sobrecarga do cuidador (ZARIT)', `${sc} · ${zaritFaixa(sc).label}`)
    } else if (zarit && Object.keys(zarit).length > 0) {
      add('ZARIT', `${Object.keys(zarit).length}/${zaritQuestions.length} respondidas`)
    }
    add('Ações para o cuidador', f.conflitos)
  })

  // Sintomas (Edmonton)
  section('Sintomas · Edmonton (ESAS)', (add) => {
    const esas = asRecord<number>(answers.edmonton)
    esasItems.forEach((i) => {
      if (esas[i.id] != null) add(i.label, String(esas[i.id]))
    })
    const outroNome = (answers.edmontonOutroNome as string | undefined)?.trim()
    if (outroNome && esas.outro != null) add(outroNome, String(esas.outro))
  })

  // Plano compartilhado
  section('Plano compartilhado', (add) => {
    const plano = asRecord(answers.plano)
    planoFields.forEach((f) => {
      const val = planoValorLegivel(f, plano)
      if (val) add(f.label, val)
    })
  })

  // Reflexão
  section('Reflexão', (add) => {
    const r = asRecord(answers.reflexao)
    add('O que familiar e paciente me trazem para registro / pendência', r.registro)
  })

  // DAV
  section('Diretiva Antecipada de Cuidado', (add) => {
    if (answers.dav)
      add('Capacidade de decisão', answers.dav === 'consciente' ? 'Consciente e capaz' : 'Incapaz de decidir')
    const reading = davReading(answers)
    if (reading) add('Planejamento', reading)
    if (answers.davAplicar)
      add(
        'É possível aplicar a DAV',
        answers.davAplicar === 'sim' ? 'Sim' : 'Não, programar a realização',
      )
  })

  return sections
}

// ── Escores derivados (para análise posterior) ────────────────
export function buildDerived(answers: Answers): Record<string, unknown> {
  const zarit = answers.zarit as ZaritAnswers | undefined
  const painad = answers.painad as PainadAnswers | undefined
  const esas = asRecord<number>(answers.edmonton)
  const info = answers.pps != null && answers.pps !== 0 ? bandInfo(answers.pps as number) : null

  return {
    doencaAmeacadora: answers.doencaAmeacadora ?? null,
    perguntaSurpresa: answers.perguntaSurpresa ?? null,
    spictGerais: spictCount(answers),
    pps: answers.pps ?? null,
    ppsBanda: info?.band ?? (answers.pps === 0 ? 'obito' : null),
    interpretacao: resultReading(answers).title,
    zarit: zarit && zaritComplete(zarit) ? zaritScore(zarit) : null,
    painad: painad && painadComplete(painad) ? painadScore(painad) : null,
    esasRespondidos: esasItems.filter((i) => esas[i.id] != null).length,
    dav: answers.dav ?? null,
    davAplicar: answers.davAplicar ?? null,
    consentimento: answers.consentimento ?? null,
  }
}

export function buildResult(answers: Answers, meta: ResultMeta): GuideResult {
  return {
    schemaVersion: SCHEMA_VERSION,
    ...meta,
    sections: buildSections(answers),
    derived: buildDerived(answers),
    answers,
  }
}
