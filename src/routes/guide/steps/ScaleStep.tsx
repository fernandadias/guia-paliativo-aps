import { AnimatePresence, motion } from 'motion/react'
import { StepShell } from '../StepShell'
import { useGuide } from '../useGuideState'
import { ppsBand } from '../interpret'
import { gentleFast } from '@/lib/motion'
import type { Step } from '@/content/guide'

export function ScaleStep({ step }: { step: Extract<Step, { kind: 'scale' }> }) {
  const { answers, answer, next } = useGuide()
  const selected = answers[step.answerKey] as number | undefined
  const reading = ppsBand(answers)

  return (
    <StepShell
      kicker={step.kicker}
      title={step.question}
      note={step.note}
      todo={step.todo}
      continueLabel="Continuar"
      onContinue={next}
      continueDisabled={selected == null}
    >
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {step.options.map((opt) => {
          const active = selected === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => answer(step.answerKey, opt.value)}
              className={`flex aspect-square items-center justify-center rounded-2xl border text-lg font-medium tabular-nums transition-colors duration-200 ${
                active
                  ? 'border-forest bg-forest text-cream-50'
                  : 'border-forest/15 bg-cream-50/60 text-forest hover:border-forest/40'
              }`}
            >
              {opt.value}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {reading && (
          <motion.div
            key={reading.value}
            className="mt-6 rounded-2xl border border-moss/25 bg-sage-100 p-5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={gentleFast}
          >
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-moss">
              PPS {reading.value}
            </p>
            <p className="mt-1.5 font-serif text-xl text-forest">{reading.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-forest/60">
              {step.options.find((o) => o.value === reading.value)?.meaning}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </StepShell>
  )
}
