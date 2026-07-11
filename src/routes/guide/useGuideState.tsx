import { createContext, useCallback, useContext, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import {
  FIRST_STEP,
  getNextStepId,
  progressOrder,
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
}

type Action =
  | { type: 'answer'; key: string; value: unknown }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'reset' }

const initialState: GuideState = {
  current: FIRST_STEP,
  history: [],
  answers: {},
  direction: 1,
}

function reducer(state: GuideState, action: Action): GuideState {
  switch (action.type) {
    case 'answer':
      return { ...state, answers: { ...state.answers, [action.key]: action.value } }
    case 'next': {
      const next = getNextStepId(state.current, state.answers)
      if (!next) return state
      return {
        ...state,
        current: next,
        history: [...state.history, state.current],
        direction: 1,
      }
    }
    case 'back': {
      if (state.history.length === 0) return state
      const history = [...state.history]
      const prev = history.pop()!
      return { ...state, current: prev, history, direction: -1 }
    }
    case 'reset':
      return initialState
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
  canGoBack: boolean
  /** Índice 1-based na barra de progresso, ou null se etapa não conta. */
  progressIndex: number | null
  progressTotal: number
}

const GuideContext = createContext<GuideContextValue | null>(null)

export function GuideProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const answer = useCallback((key: string, value: unknown) => {
    dispatch({ type: 'answer', key, value })
  }, [])
  const next = useCallback(() => dispatch({ type: 'next' }), [])
  const back = useCallback(() => dispatch({ type: 'back' }), [])
  const reset = useCallback(() => dispatch({ type: 'reset' }), [])

  // answer + next em um passo só. Os dispatches são aplicados em ordem:
  // o reducer de 'next' já enxerga a resposta gravada por 'answer'.
  const answerAndNext = useCallback((key: string, value: unknown) => {
    dispatch({ type: 'answer', key, value })
    dispatch({ type: 'next' })
  }, [])

  const value = useMemo<GuideContextValue>(() => {
    const step = steps[state.current]
    const idx = progressOrder.indexOf(state.current)
    return {
      ...state,
      step,
      answer,
      next,
      back,
      reset,
      answerAndNext,
      canGoBack: state.history.length > 0,
      progressIndex: step.progress && idx >= 0 ? idx + 1 : null,
      progressTotal: progressOrder.length,
    }
  }, [state, answer, next, back, reset, answerAndNext])

  return <GuideContext.Provider value={value}>{children}</GuideContext.Provider>
}

export function useGuide() {
  const ctx = useContext(GuideContext)
  if (!ctx) throw new Error('useGuide precisa estar dentro de <GuideProvider>')
  return ctx
}
