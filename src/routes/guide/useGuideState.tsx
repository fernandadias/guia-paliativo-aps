import { createContext, useCallback, useContext, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import {
  FIRST_STEP,
  getNextStepId,
  getProgress,
  isInterstitial,
  steps,
  type Answers,
  type StepId,
} from '@/content/guide'

interface GuideState {
  current: StepId
  history: StepId[]
  answers: Answers
  /** +1 avançando, -1 voltando — para a direção da animação. */
  direction: number
  /** ID anônimo do preenchimento (representa o paciente, sem dado pessoal). */
  fillId: string
  /** Epoch ms do início do preenchimento. */
  startedAt: number
  /** Epoch ms do término (fixado ao chegar no fim). */
  finishedAt: number | null
}

type Action =
  | { type: 'answer'; key: string; value: unknown }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'finish' }
  | { type: 'reset' }

function newFillId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  // Fallback simples para ambientes sem crypto.randomUUID.
  return 'fill-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function createInitialState(): GuideState {
  return {
    current: FIRST_STEP,
    history: [],
    answers: {},
    direction: 1,
    fillId: newFillId(),
    startedAt: Date.now(),
    finishedAt: null,
  }
}

function reducer(state: GuideState, action: Action): GuideState {
  switch (action.type) {
    case 'answer':
      return { ...state, answers: { ...state.answers, [action.key]: action.value } }
    case 'next': {
      const next = getNextStepId(state.current, state.answers)
      if (!next) return state
      // Interstícios (loading) não entram no histórico: ao voltar, o usuário
      // pula direto para a etapa real anterior, sem ficar preso no loading.
      const history = isInterstitial(state.current)
        ? state.history
        : [...state.history, state.current]
      return { ...state, current: next, history, direction: 1 }
    }
    case 'back': {
      if (state.history.length === 0) return state
      const history = [...state.history]
      const prev = history.pop()!
      return { ...state, current: prev, history, direction: -1 }
    }
    case 'finish':
      return state.finishedAt ? state : { ...state, finishedAt: Date.now() }
    case 'reset':
      return createInitialState()
    default:
      return state
  }
}

interface GuideContextValue extends GuideState {
  step: (typeof steps)[StepId]
  answer: (key: string, value: unknown) => void
  next: () => void
  back: () => void
  reset: () => void
  answerAndNext: (key: string, value: unknown) => void
  /** Fixa o horário de término (idempotente). */
  finish: () => void
  canGoBack: boolean
  /** Posição no caminho atual (1-based). */
  progressIndex: number
  /** Total estimado do caminho atual (dinâmico por branch). */
  progressTotal: number
  /** Se a etapa atual encerra o guia. */
  atTerminal: boolean
}

const GuideContext = createContext<GuideContextValue | null>(null)

export function GuideProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState)

  const answer = useCallback((key: string, value: unknown) => {
    dispatch({ type: 'answer', key, value })
  }, [])
  const next = useCallback(() => dispatch({ type: 'next' }), [])
  const back = useCallback(() => dispatch({ type: 'back' }), [])
  const reset = useCallback(() => dispatch({ type: 'reset' }), [])
  const finish = useCallback(() => dispatch({ type: 'finish' }), [])

  // answer + next em um passo só. Os dispatches são aplicados em ordem:
  // o reducer de 'next' já enxerga a resposta gravada por 'answer'.
  const answerAndNext = useCallback((key: string, value: unknown) => {
    dispatch({ type: 'answer', key, value })
    dispatch({ type: 'next' })
  }, [])

  const value = useMemo<GuideContextValue>(() => {
    const step = steps[state.current]
    const progress = getProgress(state.current, state.history, state.answers)
    return {
      ...state,
      step,
      answer,
      next,
      back,
      reset,
      answerAndNext,
      finish,
      canGoBack: state.history.length > 0,
      progressIndex: progress.index,
      progressTotal: progress.total,
      atTerminal: progress.atTerminal,
    }
  }, [state, answer, next, back, reset, answerAndNext, finish])

  return <GuideContext.Provider value={value}>{children}</GuideContext.Provider>
}

export function useGuide() {
  const ctx = useContext(GuideContext)
  if (!ctx) throw new Error('useGuide precisa estar dentro de <GuideProvider>')
  return ctx
}
