import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-serif text-6xl text-forest">José?</p>
      <p className="mt-4 max-w-sm text-forest/60">
        Esta página não foi encontrada. Talvez tenha tomado outro caminho.
      </p>
      <div className="mt-8">
        <Button to="/">Voltar ao início</Button>
      </div>
    </div>
  )
}
