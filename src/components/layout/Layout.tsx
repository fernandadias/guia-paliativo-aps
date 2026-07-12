import { AnimatePresence } from 'motion/react'
import { useEffect } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { PageTransition } from '@/components/motion/PageTransition'

/** Rola ao topo a cada mudança de rota. */
function useScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
}

/** Layout do site informativo: header + footer + transição de página. */
export function SiteLayout() {
  const location = useLocation()
  // useOutlet() resolve o elemento da rota no render atual, então a página que
  // está saindo mantém o conteúdo antigo durante o fade (o <Outlet /> refletiria
  // a rota nova imediatamente).
  const outlet = useOutlet()
  useScrollTop()
  return (
    <div className="flex min-h-[100svh] flex-col">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>{outlet}</PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
