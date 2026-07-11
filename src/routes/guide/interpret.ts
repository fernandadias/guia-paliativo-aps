import type { Answers, PpsBand } from '@/content/guide'
import { bandInfo } from '@/content/pps'

/**
 * Interpretação das respostas → textos exibidos.
 * ⚠️  As mensagens são PLACEHOLDER clínico; a lógica de faixas/contagem é real.
 */

export function ppsBand(answers: Answers): { value: number; band: PpsBand; label: string } | null {
  const value = answers.pps as number | undefined
  if (value == null) return null
  const info = bandInfo(value)
  if (!info) return null // óbito (0) não tem faixa
  return { value, band: info.band, label: info.label }
}

export function spictCount(answers: Answers): number {
  const marked = answers.spict as Record<string, boolean> | undefined
  if (!marked) return 0
  return Object.values(marked).filter(Boolean).length
}

export interface ResultReading {
  title: string
  body: string
  tone: 'positivo' | 'atencao' | 'neutro'
}

/** Texto de resultado (etapa 5) a partir do conjunto de respostas. */
export function resultReading(answers: Answers): ResultReading {
  const pps = ppsBand(answers)
  const surprise = answers.perguntaSurpresa
  const spict = spictCount(answers)

  // Indicadores presentes → critérios para inclusão.
  if (surprise === 'nao' && spict >= 2) {
    return {
      tone: 'atencao',
      title: 'Este paciente apresenta critérios para inclusão em cuidados paliativos.',
      body: `${spict} indicador(es) presente(s)${
        pps ? `, com funcionalidade em ${pps.label.toLowerCase()}` : ''
      }. Recomenda-se elevada atenção ao planejamento compartilhado.`,
    }
  }

  if (surprise === 'nao') {
    return {
      tone: 'atencao',
      title: 'O paciente apresenta necessidade de planejamento compartilhado.',
      body: `${
        pps ? `Funcionalidade em ${pps.label.toLowerCase()}. ` : ''
      }Vale seguir com a avaliação das dimensões do cuidado.`,
    }
  }

  return {
    tone: 'neutro',
    title: 'Recomenda-se reavaliação periódica.',
    body: `${
      pps ? `Funcionalidade em ${pps.label.toLowerCase()}. ` : ''
    }Mantenha o acompanhamento e reavalie conforme a evolução do quadro.`,
  }
}

/** Ramo da DAV (etapa 10). */
export function davReading(answers: Answers): string | null {
  const dav = answers.dav
  if (dav === 'consciente') return 'Planejamento antecipado de cuidados com o próprio paciente.'
  if (dav === 'incapaz') return 'Plano de cuidados construído com o representante do paciente.'
  return null
}
