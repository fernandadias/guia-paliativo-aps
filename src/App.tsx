import { Routes, Route } from 'react-router-dom'
import { SiteLayout } from '@/components/layout/Layout'
import Home from '@/routes/Home'
import SectionPage from '@/routes/sections/SectionPage'
import Guide from '@/routes/guide/Guide'
import FastGuide from '@/routes/guide/FastGuide'
import NotFound from '@/routes/NotFound'
import { sections } from '@/content/sections'

export default function App() {
  return (
    <Routes>
      {/* O guia é fullscreen — fora do layout do site informativo. */}
      <Route path="/guia" element={<Guide />} />
      <Route path="/guia/rapido" element={<FastGuide />} />

      {/* Site informativo com header/footer e transições de página. */}
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        {sections.map((s) => (
          <Route key={s.path} path={s.path} element={<SectionPage />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
