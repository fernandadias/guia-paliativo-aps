import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getIcon } from '@/lib/icons'
import { PageShell } from '@/components/layout/PageShell'
import { Card } from '@/components/ui/Card'
import { TodoTag } from '@/components/ui/TodoTag'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { sectionByPath, type SectionBlock } from '@/content/sections'
import NotFound from '@/routes/NotFound'

export default function SectionPage() {
  const { pathname } = useLocation()
  const section = sectionByPath(pathname)

  if (!section) return <NotFound />

  return (
    <PageShell kicker={section.kicker} title={section.title} intro={section.intro}>
      {section.todo && (
        <Reveal>
          <div className="flex items-center gap-3">
            <TodoTag />
            <span className="text-sm text-forest/45">
              Estrutura pronta. Texto definitivo entra depois.
            </span>
          </div>
        </Reveal>
      )}

      {section.blocks.map((block, i) => (
        <Reveal key={i} delay={0.02 * i}>
          <Block block={block} />
        </Reveal>
      ))}

      <Reveal>
        <div className="pt-6">
          <Button to="/guia" variant="outline">
            Ir para o Guia de direção clínica
          </Button>
        </div>
      </Reveal>
    </PageShell>
  )
}

function Block({ block }: { block: SectionBlock }) {
  switch (block.kind) {
    case 'lead':
      return (
        <p className="text-lg leading-relaxed text-forest/85">{block.text}</p>
      )
    case 'paragraph':
      return <p className="leading-relaxed text-forest/70">{block.text}</p>
    case 'quote':
      return (
        <figure className="border-l-2 border-moss/40 pl-6">
          <blockquote className="font-serif text-2xl italic leading-relaxed text-forest">
            “{block.text}”
          </blockquote>
          {block.author && (
            <figcaption className="mt-3 text-sm text-forest/50">{block.author}</figcaption>
          )}
        </figure>
      )
    case 'list':
      return (
        <div>
          {block.title && (
            <h2 className="mb-4 font-serif text-2xl text-forest">{block.title}</h2>
          )}
          <ul className="space-y-3">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-forest/75">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    case 'callout':
      return (
        <Card tone="sage">
          <div className="flex gap-4">
            <FontAwesomeIcon icon={getIcon(block.icon)} className="mt-1 text-lg text-moss" />
            <div>
              <h3 className="font-serif text-xl text-forest">{block.title}</h3>
              <p className="mt-1.5 leading-relaxed text-forest/70">{block.text}</p>
            </div>
          </div>
        </Card>
      )
  }
}
