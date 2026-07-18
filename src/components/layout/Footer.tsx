import { Logo } from './Logo'

/** Assinatura manuscrita da Nanda (vetor). Herda a cor via currentColor. */
function NandaSignature({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 102 65"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={0.5}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M0.672446 20.1462C0.156767 22.8535 -0.440671 25.0359 2.56213 22.4033C3.75845 21.3545 10.5442 13.4251 10.5933 17.1542C10.6139 18.7197 9.69007 24.8914 12.0106 21.6685C12.9062 20.4246 12.1798 24.7087 12.5355 24.9754C12.8788 25.2329 23.1796 9.31753 23.7949 8.51938C24.4656 7.64924 33.5235 -3.04921 33.7158 1.27557C34.3755 16.1207 29.201 31.4855 25.3434 45.6045C23.9465 50.7172 22.5096 55.8951 22.0364 61.1945C21.7407 64.5062 22.7073 59.6735 22.8763 58.8848" />
      <path d="M38.9388 23.9256C32.8805 22.5539 29.26 21.7892 24.8186 26.8651C23.2572 28.6495 18.5841 37.9715 23.0864 39.3056C24.8448 39.8266 26.4659 38.2776 27.5481 37.1534C31.2363 33.3223 34.4619 29.0549 38.1514 25.2116C41.698 21.5173 38.8687 28.1664 38.3614 30.0146C38.0247 31.2411 35.0499 39.95 38.3089 35.3425C40.0595 32.8675 42.1885 27.7624 45.0803 26.3927C45.6527 26.1215 44.1063 33.4218 43.9517 34.1089C43.7821 34.8625 43.4742 35.8846 44.2404 34.6076C45.6506 32.2572 47.1597 29.891 49.0171 27.8624C52.0123 24.5913 49.4421 32.8158 49.3583 34.2401C49.1683 37.4694 51.7618 31.2339 52.639 30.1721C54.8399 27.5078 54.5287 31.5105 54.5287 32.9279C54.5287 33.8009 54.0028 39.6535 55.1061 36.6285C57.8663 29.0603 61.7345 21.5354 66.5755 15.0808C66.7509 14.8468 70.5896 9.66476 71.3522 10.6453C72.9317 12.6761 70.7738 20.3422 70.3811 22.4558C67.966 35.4533 64.051 48.1457 61.9037 61.1944C61.3915 64.3073 60.2947 65.3533 62.0875 62.6642" />
      <path d="M72.9532 29.5947C73.8385 25.5002 71.9732 34.1418 71.6409 35.1062C71.408 35.7822 70.5911 39.5453 70.5911 37.1534" />
      <path d="M74.3704 23.4532C78.472 25.6017 78.413 21.5635 74.3704 21.5635" />
      <path d="M83.8188 29.1223C80.2537 29.1807 77.7216 29.2494 76.365 32.9016C75.6732 34.7642 75.1373 37.7237 78.0185 36.0774C79.6532 35.1432 81.1737 33.8829 82.4803 32.5342C82.5328 32.48 83.678 30.7877 83.7926 31.5893C83.8899 32.271 83.2047 36.6822 83.5563 36.8385C84.8921 37.4321 89.9242 30.7366 90.5902 30.0146C91.7303 28.7785 92.8848 27.4392 94.2121 26.3927C95.9602 25.0144 95.6294 27.3323 95.6294 28.5449C95.6294 32.5547 96.5311 37.6675 95.3931 41.5365C95.0527 42.6938 96.0696 40.1211 96.5742 39.5155" />
      <path d="M90.4329 49.9088C92.5403 49.7295 99.2753 50.5148 100.826 48.964" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-forest/10 bg-cream-50/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <Logo />
        <div className="flex max-w-sm flex-col gap-5">
          <p className="text-sm leading-relaxed text-forest/60">
            Presença, ciência e cuidado: passo a passo. Material de apoio para profissionais da
            Atenção Primária à Saúde.
          </p>
          <img
            src="/imagens/logo_prof-saude-horizontal.png"
            alt="PROFSAÚDE — Mestrado Profissional em Saúde da Família. Realização: ABRASCO, Fiocruz e Ministério da Saúde."
            className="h-8 w-auto max-w-full"
          />
        </div>
      </div>

      {/* Assinatura mínima */}
      <div className="border-t border-forest/10">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-1.5 px-6 py-4 text-xs text-forest/45 sm:px-10">
          <span>design &amp; desenvolvimento |</span>
          <a
            href="https://www.nandadias.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-moss"
          >
            Nanda Dias
            <NandaSignature className="h-6 w-auto" />
          </a>
        </div>
      </div>
    </footer>
  )
}
