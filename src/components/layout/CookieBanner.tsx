import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { getConsent, onOpenCookieSettings, setConsent, type Consent } from '@/lib/analytics'
import { gentleFast } from '@/lib/motion'

/**
 * Aviso de cookies. Aparece até a pessoa escolher e volta pelo link
 * "Preferências de cookies" do rodapé. Sem o aceite, nada de medição carrega.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(() => getConsent() === null)

  useEffect(() => onOpenCookieSettings(() => setOpen(true)), [])

  const choose = (consent: Consent) => {
    setOpen(false)
    setConsent(consent)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          aria-label="Aviso de cookies"
          className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-xl rounded-3xl border border-forest/10 bg-paper p-5 shadow-xl shadow-forest/10 sm:p-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: gentleFast }}
          exit={{ opacity: 0, y: 16, transition: gentleFast }}
        >
          <p className="text-sm leading-relaxed text-forest/75">
            Usamos cookies do Google Analytics e do Microsoft Clarity para entender como o site é
            usado e melhorar este material. As respostas do guia não são enviadas a essas
            ferramentas.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button onClick={() => choose('granted')}>Aceitar</Button>
            <Button onClick={() => choose('denied')} variant="outline">
              Recusar
            </Button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
