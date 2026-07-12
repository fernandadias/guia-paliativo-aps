/**
 * Persistência anonimizada do resultado (F3 + F4).
 *
 * Envia o resultado ao Supabase no fim do preenchimento, desde que:
 *   - haja consentimento (checado por quem chama), e
 *   - as variáveis de ambiente do Supabase estejam configuradas.
 *
 * Se o envio falhar (offline, etc.), o resultado fica numa fila local e é
 * reenviado numa próxima abertura. Nenhum dado pessoal é gravado.
 */
import { supabase, persistenceEnabled } from './supabase'
import type { GuideResult } from './result'

const QUEUE_KEY = 'gpa:sync-queue'

function rowFromResult(result: GuideResult) {
  return {
    fill_id: result.fillId,
    patient_id: result.patientId ?? null,
    schema_version: result.schemaVersion,
    started_at: result.startedAt,
    finished_at: result.finishedAt,
    duration_ms: result.durationMs,
    answers: result.answers,
    derived: result.derived,
  }
}

function readQueue(): GuideResult[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) ?? '[]') as GuideResult[]
  } catch {
    return []
  }
}

function writeQueue(items: GuideResult[]) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(items))
  } catch {
    /* storage cheio/indisponível: ignora */
  }
}

function enqueue(result: GuideResult) {
  const q = readQueue().filter((r) => r.fillId !== result.fillId)
  q.push(result)
  writeQueue(q)
}

async function insert(result: GuideResult): Promise<boolean> {
  if (!supabase) return false
  const { error } = await supabase.from('fills').insert(rowFromResult(result))
  // 23505 = unique_violation: já foi gravado antes, então consideramos sucesso.
  return !error || error.code === '23505'
}

export interface SubmitOutcome {
  status: 'ok' | 'queued' | 'skipped'
}

/** Envia um resultado; enfileira em caso de falha. */
export async function submitResult(result: GuideResult): Promise<SubmitOutcome> {
  if (!persistenceEnabled) return { status: 'skipped' }
  try {
    const ok = await insert(result)
    if (ok) return { status: 'ok' }
  } catch {
    /* cai no enfileiramento abaixo */
  }
  enqueue(result)
  return { status: 'queued' }
}

/** Tenta reenviar o que ficou na fila (chamar na abertura do guia). */
export async function flushQueue(): Promise<void> {
  if (!persistenceEnabled) return
  const items = readQueue()
  if (!items.length) return
  const remaining: GuideResult[] = []
  for (const item of items) {
    try {
      const ok = await insert(item)
      if (!ok) remaining.push(item)
    } catch {
      remaining.push(item)
    }
  }
  writeQueue(remaining)
}
