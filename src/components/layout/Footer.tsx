import { Logo } from './Logo'

/** Assinatura manuscrita da Nanda (vetor). Herda a cor via currentColor. */
function NandaSignature({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 103 66"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M1.42245 20.8965C0.906767 23.6038 0.309329 25.7862 3.31213 23.1536C4.50845 22.1048 11.2942 14.1753 11.3433 17.9045C11.3639 19.4699 10.4401 25.6416 12.7606 22.4187C13.6562 21.1748 12.9298 25.4589 13.2855 25.7257C13.6288 25.9831 23.9296 10.0678 24.5449 9.26962C25.2156 8.39948 34.2735 -2.29897 34.4658 2.02582C35.1255 16.871 29.951 32.2357 26.0934 46.3548C24.6965 51.4674 23.2596 56.6454 22.7864 61.9447C22.4907 65.2564 23.4573 60.4237 23.6263 59.6351" />
      <path d="M39.6888 24.6758C33.6305 23.3041 30.01 22.5395 25.5686 27.6153C24.0072 29.3998 19.3341 38.7218 23.8364 40.0558C25.5948 40.5768 27.2159 39.0279 28.2981 37.9037C31.9863 34.0725 35.2119 29.8051 38.9014 25.9619C42.448 22.2675 39.6187 28.9167 39.1114 30.7648C38.7747 31.9914 35.7999 40.7002 39.0589 36.0927C40.8095 33.6177 42.9385 28.5127 45.8303 27.1429C46.4027 26.8718 44.8563 34.172 44.7017 34.8592C44.5321 35.6127 44.2242 36.6349 44.9904 35.3578C46.4006 33.0075 47.9097 30.6412 49.7671 28.6127C52.7623 25.3416 50.1921 33.5661 50.1083 34.9904C49.9183 38.2197 52.5118 31.9842 53.389 30.9223C55.5899 28.2581 55.2787 32.2607 55.2787 33.6781C55.2787 34.5511 54.7528 40.4038 55.8561 37.3787C58.6163 29.8105 62.4845 22.2857 67.3255 15.831C67.5009 15.5971 71.3396 10.415 72.1022 11.3955C73.6817 13.4263 71.5238 21.0924 71.1311 23.2061C68.716 36.2035 64.801 48.8959 62.6537 61.9447C62.1415 65.0576 61.0447 66.1035 62.8375 63.4145" />
      <path d="M73.7032 30.3449C74.5885 26.2505 72.7232 34.892 72.3909 35.8565C72.158 36.5324 71.3411 40.2956 71.3411 37.9037" />
      <path d="M75.1204 24.2034C79.222 26.3519 79.163 22.3137 75.1204 22.3137" />
      <path d="M84.5688 29.8725C81.0037 29.9309 78.4716 29.9997 77.115 33.6519C76.4232 35.5144 75.8873 38.474 78.7685 36.8276C80.4032 35.8935 81.9237 34.6331 83.2303 33.2844C83.2828 33.2303 84.428 31.538 84.5426 32.3396C84.6399 33.0213 83.9547 37.4324 84.3063 37.5887C85.6421 38.1824 90.6742 31.4869 91.3402 30.7649C92.4803 29.5288 93.6348 28.1895 94.9621 27.1429C96.7102 25.7646 96.3794 28.0825 96.3794 29.2951C96.3794 33.305 97.2811 38.4177 96.1431 42.2867C95.8027 43.4441 96.8196 40.8714 97.3242 40.2658" />
      <path d="M91.1829 50.6591C93.2903 50.4797 100.025 51.2651 101.576 49.7142" />
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

      {/* Assinatura mínima — Kode Mono (fonte de código da marca DesignIA) */}
      <div className="border-t border-forest/10">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-6 py-4 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-forest/45 sm:px-10">
          <span>design &amp; desenvolvimento |</span>
          <a
            href="https://www.nandadias.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold transition-colors hover:text-moss"
          >
            Nanda Dias
            <NandaSignature className="h-6 w-auto" />
          </a>
        </div>
      </div>
    </footer>
  )
}
