/**
 * Indicadores clínicos (T08) — condições que limitam a vida (base: SPICT, print verde).
 *
 * Seleção múltipla de condições (macro) e, dentro de cada uma, N indicadores (micro).
 * Copy dos micro reescrita para leitura rápida.
 */

export interface CondicaoClinica {
  id: string
  label: string
  icon: string
  indicadores: { id: string; label: string }[]
}

export const condicoesClinicas: CondicaoClinica[] = [
  {
    id: 'cancer',
    label: 'Câncer',
    icon: 'ribbon',
    indicadores: [
      { id: 'cancer-1', label: 'Dificuldade crescente com as atividades do dia a dia.' },
      { id: 'cancer-2', label: 'Não está bem para o tratamento, ou o tratamento é só para os sintomas.' },
    ],
  },
  {
    id: 'demencia',
    label: 'Demência ou fragilidade',
    icon: 'brain',
    indicadores: [
      { id: 'dem-1', label: 'Não consegue se vestir, andar ou comer sem ajuda.' },
      { id: 'dem-2', label: 'Come e bebe menos, dificuldade para engolir.' },
      { id: 'dem-3', label: 'Perda de controle urinário ou intestinal.' },
      { id: 'dem-4', label: 'Não se comunica mais.' },
      { id: 'dem-5', label: 'Quedas frequentes ou fratura de quadril.' },
      { id: 'dem-6', label: 'Infecções frequentes, pneumonia.' },
    ],
  },
  {
    id: 'nervoso',
    label: 'Sistema nervoso',
    icon: 'wave-square',
    indicadores: [
      { id: 'nerv-1', label: 'Declínio físico e mental (Parkinson, esclerose múltipla, AVC, neurônio motor).' },
      { id: 'nerv-2', label: 'Fala e deglutição piorando.' },
      { id: 'nerv-3', label: 'Infecções respiratórias recorrentes.' },
      { id: 'nerv-4', label: 'AVC grave com incapacidade contínua.' },
    ],
  },
  {
    id: 'cardiaco',
    label: 'Cardíaco ou circulatório',
    icon: 'heart-pulse',
    indicadores: [
      { id: 'card-1', label: 'Insuficiência cardíaca ou dor no peito ao repouso ou esforço.' },
      { id: 'card-2', label: 'Falta de ar ao repousar ou se mover.' },
      { id: 'card-3', label: 'Má circulação nas pernas, sem cirurgia possível.' },
    ],
  },
  {
    id: 'pulmonar',
    label: 'Pulmonar',
    icon: 'lungs',
    indicadores: [
      { id: 'pulm-1', label: 'Doença pulmonar de longo prazo, falta de ar mesmo no melhor estado.' },
      { id: 'pulm-2', label: 'Precisa de oxigênio a maior parte do dia.' },
      { id: 'pulm-3', label: 'Precisa de ventilação no hospital.' },
    ],
  },
  {
    id: 'renal',
    label: 'Renal',
    icon: 'droplet',
    indicadores: [
      { id: 'renal-1', label: 'Rins falhando e saúde piorando.' },
      { id: 'renal-2', label: 'Parar a diálise, ou optar por cuidados de suporte em vez de iniciá-la.' },
    ],
  },
  {
    id: 'figado',
    label: 'Fígado',
    icon: 'stethoscope',
    indicadores: [
      { id: 'fig-1', label: 'Agravamento recente com complicações (líquido na barriga, confusão, infecções, sangramento).' },
      { id: 'fig-2', label: 'Transplante não é possível.' },
    ],
  },
  {
    id: 'outras',
    label: 'Outras condições',
    icon: 'ellipsis',
    indicadores: [
      { id: 'out-1', label: 'Pode falecer de outros problemas de saúde.' },
      { id: 'out-2', label: 'Sem tratamento disponível ou eficaz.' },
    ],
  },
]
