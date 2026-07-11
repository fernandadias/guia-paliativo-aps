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
  faHeartPulse,
  faLungs,
  faRibbon,
  faWaveSquare,
  faDroplet,
  faEllipsis,
  faFlask,
  faPersonWalking,
  faPersonRunning,
  faHandsBubbles,
  faUtensils,
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
  'heart-pulse': faHeartPulse,
  lungs: faLungs,
  ribbon: faRibbon,
  'wave-square': faWaveSquare,
  droplet: faDroplet,
  ellipsis: faEllipsis,
  flask: faFlask,
  'person-walking': faPersonWalking,
  'person-running': faPersonRunning,
  'hands-bubbles': faHandsBubbles,
  utensils: faUtensils,
}

/** Resolve um nome de ícone; cai em stethoscope se não achar. */
export function getIcon(name: string): IconDefinition {
  return registry[name] ?? faStethoscope
}
