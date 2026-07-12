import type { Step } from '@/content/guide'
import { ConsentStep } from './steps/ConsentStep'
import { IntroStep } from './steps/IntroStep'
import { ChoiceStep } from './steps/ChoiceStep'
import { ScaleStep } from './steps/ScaleStep'
import { PpsStep } from './steps/PpsStep'
import { ClinicosStep } from './steps/ClinicosStep'
import { EdmontonStep } from './steps/EdmontonStep'
import { FamiliarStep } from './steps/FamiliarStep'
import { FisicaStep } from './steps/FisicaStep'
import { SocialStep } from './steps/SocialStep'
import { PlanoStep } from './steps/PlanoStep'
import { ChecklistStep } from './steps/ChecklistStep'
import { ResultStep } from './steps/ResultStep'
import { DimensionsStep } from './steps/DimensionsStep'
import { VerseStep } from './steps/VerseStep'
import { FieldsStep } from './steps/FieldsStep'
import { SummaryStep } from './steps/SummaryStep'
import { TerminalStep } from './steps/TerminalStep'
import { LoadingStep } from './steps/LoadingStep'
import { PlaceholderStep } from './steps/PlaceholderStep'

/**
 * Renderiza uma etapa a partir do seu tipo. Recebe a etapa por PROP (não do
 * contexto), para o elemento que sai no AnimatePresence manter o conteúdo antigo.
 * Compartilhado entre o wizard (Guide) e o checklist (FastGuide).
 */
export function StepView({ step }: { step: Step }) {
  switch (step.kind) {
    case 'consent':
      return <ConsentStep step={step} />
    case 'intro':
      return <IntroStep step={step} />
    case 'choice':
      return <ChoiceStep step={step} />
    case 'scale':
      return <ScaleStep step={step} />
    case 'pps':
      return <PpsStep step={step} />
    case 'clinicos':
      return <ClinicosStep step={step} />
    case 'edmonton':
      return <EdmontonStep step={step} />
    case 'familiar':
      return <FamiliarStep step={step} />
    case 'fisica':
      return <FisicaStep step={step} />
    case 'social':
      return <SocialStep step={step} />
    case 'plano':
      return <PlanoStep step={step} />
    case 'checklist':
      return <ChecklistStep step={step} />
    case 'result':
      return <ResultStep step={step} />
    case 'dimensions':
      return <DimensionsStep step={step} />
    case 'verse':
      return <VerseStep step={step} />
    case 'fields':
      return <FieldsStep step={step} />
    case 'summary':
      return <SummaryStep step={step} />
    case 'terminal':
      return <TerminalStep step={step} />
    case 'loading':
      return <LoadingStep step={step} />
    case 'placeholder':
      return <PlaceholderStep step={step} />
  }
}
