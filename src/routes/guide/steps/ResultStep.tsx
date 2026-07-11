import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { StepShell } from '../StepShell'
import { useGuide } from '../useGuideState'
import { resultReading } from '../interpret'
import type { Step } from '@/content/guide'

export function ResultStep({ step }: { step: Extract<Step, { kind: 'result' }> }) {
  const { answers, next } = useGuide()
  const reading = resultReading(answers)

  return (
    <StepShell
      kicker={step.kicker}
      todo={step.todo}
      continueLabel="Iniciar o cuidado"
      onContinue={next}
    >
      <div className="rounded-3xl border border-forest/10 bg-gradient-to-br from-sage-100 to-cream-50 p-8 sm:p-10">
        <FontAwesomeIcon icon={faCircleInfo} className="text-2xl text-moss" />
        <p className="mt-5 font-serif text-2xl leading-snug text-forest sm:text-3xl">
          {reading.title}
        </p>
        <p className="mt-4 leading-relaxed text-forest/70">{reading.body}</p>
      </div>

      <div className="mt-6 rounded-3xl border border-forest/10 bg-cream-50/60 p-6 sm:p-8">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-moss">
          Revisar o cuidado atual e o plano
        </p>
        <ul className="mt-4 space-y-3">
          {CONDUTA.map((item) => (
            <li key={item} className="flex items-start gap-3 leading-relaxed text-forest/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </StepShell>
  )
}

const CONDUTA = [
  'Revise tratamento e medicações para um cuidado otimizado, reduzindo a polifarmácia.',
  'Considere encaminhar para equipe de Cuidados Paliativos se os sintomas forem complexos.',
  'Elabore o plano de cuidados com a pessoa e a família, apoiando os cuidadores.',
  'Planeje com antecedência caso haja risco de perda da capacidade de decisão.',
  'Registre, compartilhe e revise os planos de cuidados.',
]
