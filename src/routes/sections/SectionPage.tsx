import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { getIcon } from '@/lib/icons'
import { PageShell } from '@/components/layout/PageShell'
import { Card } from '@/components/ui/Card'
import { TodoTag } from '@/components/ui/TodoTag'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { sectionByPath, type SectionBlock } from '@/content/sections'
import { PpsExplainer } from './PpsExplainer'
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
    case 'ppsExplainer':
      return <PpsExplainer />
    case 'link':
      return (
        <a
          href={encodeURI(block.href)}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-medium text-moss transition-colors hover:text-forest"
        >
          {block.text}
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="text-xs transition-transform duration-300 ease-gentle group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      )
    case 'links':
      return (
        <div>
          {block.title && (
            <p className="mb-4 leading-relaxed text-forest/70">{block.title}</p>
          )}
          <ul className="space-y-3">
            {block.items.map((item, i) => (
              <li key={i}>
                <a
                  href={encodeURI(item.href)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-baseline gap-2 font-medium text-moss transition-colors hover:text-forest"
                >
                  {item.text}
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="text-xs transition-transform duration-300 ease-gentle group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )
    case 'callout': {
      const inner = (
        <Card
          tone="sage"
          className={
            block.href
              ? 'transition-colors group-hover:border-moss/40 group-hover:bg-sage-100'
              : undefined
          }
        >
          <div className="flex gap-4">
            <FontAwesomeIcon icon={getIcon(block.icon)} className="mt-1 text-lg text-moss" />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-xl text-forest">{block.title}</h3>
                {block.href && (
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="mt-1.5 shrink-0 text-sm text-moss transition-transform duration-300 ease-gentle group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                )}
              </div>
              {block.text && (
                <p className="mt-1.5 leading-relaxed text-forest/70">{block.text}</p>
              )}
              {block.items && (
                <ul className="mt-3 space-y-2.5">
                  {block.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-forest/70">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Card>
      )
      return block.href ? (
        <a
          href={encodeURI(block.href)}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          {inner}
        </a>
      ) : (
        inner
      )
    }
  }
}
