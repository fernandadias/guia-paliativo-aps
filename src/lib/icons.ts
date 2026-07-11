import {
  faHeart,
  faGauge,
  faClipboardQuestion,
  faHandHoldingMedical,
  faBrain,
  faPeopleGroup,
  faDove,
  faHouseUser,
  faClockRotateLeft,
  faCircleCheck,
  faCircleInfo,
  faStethoscope,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

/** Registro nome→ícone usado pelo conteúdo (que guarda só strings). */
const registry: Record<string, IconDefinition> = {
  heart: faHeart,
  gauge: faGauge,
  'clipboard-question': faClipboardQuestion,
  'hand-holding-medical': faHandHoldingMedical,
  brain: faBrain,
  'people-group': faPeopleGroup,
  dove: faDove,
  'house-user': faHouseUser,
  'clock-rotate-left': faClockRotateLeft,
  'circle-check': faCircleCheck,
  'circle-info': faCircleInfo,
  stethoscope: faStethoscope,
}

/** Resolve um nome de ícone; cai em stethoscope se não achar. */
export function getIcon(name: string): IconDefinition {
  return registry[name] ?? faStethoscope
}
