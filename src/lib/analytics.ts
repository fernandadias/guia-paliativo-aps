/**
 * Medição de uso do site: Google Analytics 4 (eventos e caminhos) e
 * Microsoft Clarity (mapa de calor e gravações).
 *
 * Nada carrega sem o aceite do aviso de cookies. Fora do domínio de produção
 * nenhum dado sai do navegador: os eventos só aparecem no console, para
 * conferir no preview da Vercel e no `npm run dev`.
 *
 * Nenhuma resposta do guia é enviada. O guia manda só a etapa em que a pessoa
 * está, e o Clarity grava as telas do guia mascaradas (data-clarity-mask).
 */

const GA_ID = 'G-WNSG52QS4W'
const CLARITY_ID = 'z48zqaxymj'
const PRODUCTION_HOSTS = ['www.guiapaliativoaps.com.br', 'guiapaliativoaps.com.br']

const CONSENT_KEY = 'gpa:cookies'
const OPEN_SETTINGS_EVENT = 'gpa:cookies-abrir'

/** O GA4 corta valores de parâmetro acima de 100 caracteres. */
const MAX_VALUE = 100

/** Links para arquivos do próprio site contam como "arquivo", não "interno". */
const FILE_RE = /\.(pdf|docx?|xlsx?|pptx?|zip|mp3|mp4)$/i

export type Consent = 'granted' | 'denied'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] }
  }
}

const isProduction = () => PRODUCTION_HOSTS.includes(window.location.hostname)

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

let loaded = false

function addScript(src: string) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

function loadTools() {
  if (loaded || !isProduction()) return
  loaded = true

  // Google Analytics 4. O gtag exige o objeto `arguments`, não um array.
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // oxlint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })
  addScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`)

  // Microsoft Clarity. Mesma fila do snippet oficial, até o script chegar.
  window.clarity =
    window.clarity ||
    function clarity() {
      // oxlint-disable-next-line prefer-rest-params
      ;(window.clarity!.q = window.clarity!.q || []).push(arguments)
    }
  addScript(`https://www.clarity.ms/tag/${CLARITY_ID}`)
  window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' })
}

/** Apaga os cookies do GA (_ga e _ga_*), que ficam no domínio raiz. */
function eraseGaCookies() {
  const root = window.location.hostname.replace(/^www\./, '')
  for (const part of document.cookie.split(';')) {
    const name = part.split('=')[0].trim()
    if (name === '_ga' || name.startsWith('_ga_')) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${root}`
      document.cookie = `${name}=; Max-Age=0; path=/`
    }
  }
}

export function setConsent(consent: Consent) {
  const before = getConsent()
  try {
    localStorage.setItem(CONSENT_KEY, consent)
  } catch {
    /* storage indisponível: vale só para esta visita */
  }
  if (consent === 'granted') {
    loadTools()
    return
  }
  // Quem aceitou e depois recusou: os scripts já estão na página. Apaga os
  // cookies e recarrega, e sem o aceite nada volta a carregar.
  if (before === 'granted' && loaded) {
    window.clarity?.('consent', false)
    eraseGaCookies()
    window.location.reload()
  }
}

/** Reabre o aviso de cookies (link "Preferências de cookies" do rodapé). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))
}

export function onOpenCookieSettings(fn: () => void) {
  window.addEventListener(OPEN_SETTINGS_EVENT, fn)
  return () => window.removeEventListener(OPEN_SETTINGS_EVENT, fn)
}

type Params = Record<string, string | undefined>

export function track(name: string, params: Params = {}) {
  const clean: Record<string, string> = {}
  for (const [k, v] of Object.entries(params)) {
    if (v) clean[k] = v.slice(0, MAX_VALUE)
  }
  if (!isProduction()) {
    const note = getConsent() === 'granted' ? '' : '(sem aceite, não seria enviado)'
    console.info('[analytics]', name, clean, note)
    return
  }
  if (getConsent() !== 'granted') return
  window.gtag?.('event', name, clean)
}

const tidy = (s: string) => s.replace(/\s+/g, ' ').trim()

function safeDecode(s: string) {
  try {
    return decodeURI(s)
  } catch {
    return s
  }
}

/**
 * Todo clique em link vira um evento `clique_link`, sem marcar link por link.
 * O contexto vem de atributos no HTML:
 * - `data-material` no link: o nome do material (senão, o texto do link);
 * - `data-lugar` num ancestral: menu, rodapé, índice da home... (senão, "corpo");
 * - `data-etapa` num ancestral: a etapa do guia em que o clique aconteceu.
 */
function onLinkClick(e: MouseEvent) {
  if (e.type === 'auxclick' && e.button !== 1) return
  const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
  if (!a) return

  let url: URL
  try {
    url = new URL(a.href)
  } catch {
    return
  }
  // Ignora blob: (o PDF do relatório é baixado por um link sintético) e afins.
  if (!['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)) return

  const internal = url.origin === window.location.origin
  const tipo = internal ? (FILE_RE.test(url.pathname) ? 'arquivo' : 'interno') : 'externo'

  track('clique_link', {
    link_tipo: tipo,
    link_origem: window.location.pathname,
    link_destino: safeDecode(internal ? url.pathname + url.hash : url.href),
    link_lugar: a.closest('[data-lugar]')?.getAttribute('data-lugar') ?? 'corpo',
    link_material: tidy(a.dataset.material || a.getAttribute('aria-label') || a.textContent || ''),
    etapa: a.closest('[data-etapa]')?.getAttribute('data-etapa') ?? undefined,
  })
}

/** Chamado uma vez, antes do primeiro render. */
export function initAnalytics() {
  // Fase de captura: registra antes do React Router trocar de página.
  document.addEventListener('click', onLinkClick, true)
  document.addEventListener('auxclick', onLinkClick, true)
  if (getConsent() === 'granted') loadTools()
}
