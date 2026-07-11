# Guia Paliativo APS

Site responsivo para profissionais da Atenção Primária à Saúde — conteúdo informativo
sobre cuidados paliativos + um **Guia de direção clínica** interativo, passo a passo.

**Esta é a v1**: linha visual + arquitetura navegável, com **conteúdo placeholder**.
A lógica do guia (branching, PPS, SPICT, resultado) já é real.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de produção em dist/
```

## Stack

React + Vite + TypeScript · Tailwind v4 · Motion (Framer) · React Router · FontAwesome
Fontes: **EB Garamond** (títulos/editorial) + **Figtree** (UI/corpo).

## Onde está o conteúdo (para trocar o placeholder)

Todo o texto vive em `src/content/` — a estrutura já está no formato final,
basta preencher/editar. Nenhum componente precisa ser tocado.

| Arquivo | O que contém |
|---|---|
| `src/content/sections.ts` | As 6 seções informativas (textos, listas, callouts) |
| `src/content/guide.ts` | As etapas do guia: perguntas, opções, PPS, checklists, campos |
| `src/content/quotes.ts` | Frases do José (Drummond) e narrativas de profissionais |

Campos marcados com `todo: true` aparecem no site com uma etiqueta discreta
"conteúdo provisório" — some sozinho quando você remove o `todo`.

## Linha visual (tokens)

Paleta e fontes ficam centralizadas em `src/index.css` (bloco `@theme`).
Trocar uma cor ou fonte é editar uma variável ali.

## Estrutura

```
src/
  content/       # ← todo o texto (placeholder) mora aqui
  components/
    ui/          # Button, Card, TodoTag
    layout/      # Header, MenuNav, Footer, PageShell, Logo, Layout
    motion/      # Reveal, PageTransition
  routes/
    Home.tsx           # hero "E agora, José?"
    sections/          # template das seções informativas
    guide/             # o guia interativo (motor + etapas)
      useGuideState    # estado/branching
      steps/           # uma tela por tipo de etapa
  lib/           # motion, ícones, helpers
```

## Fora do escopo da v1

Conteúdo definitivo · geração real de PDF/impressão · salvar respostas ·
integração com prontuário · login. (As ações do resumo já existem como stub.)
