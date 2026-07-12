# Status — Armazenamento, Relatório e Guia rápido

Branch: `features-dados-relatorio` (deriva de `v2-reestruturacao`, ainda não promovida para `main`).
Preview: deploy automático da Vercel a partir da branch.
Última atualização: 12/07/2026.

## Resumo

Três features novas do guia, organizadas em épicos F, G, H no GitHub. Código completo e
buildando; falta só ação da Nanda (Supabase na Vercel) e conteúdo da cliente (copy do termo).

---

## O que foi entregue

### Épico F — Armazenamento anonimizado
- **Resultado estruturado e versionado** em `src/lib/result.ts` (schema v1). Fonte única para
  tela, PDF e payload do servidor. Sem nenhum dado pessoal.
- **fillId** anônimo + **startedAt / finishedAt / duração** no motor (`useGuideState.tsx`).
- **Tela de consentimento** (`steps/ConsentStep.tsx`, kind `consent`) como primeira etapa;
  aceite libera o envio ao servidor. Copy curta e placeholder (aguardando cliente / CEP).
- **Supabase** (`src/lib/supabase.ts`, `src/lib/persist.ts`): envia no fim se houver
  consentimento e env configurada. No-op sem env. Fila offline (localStorage) com reenvio na
  abertura do guia. Insert idempotente (unique_violation conta como sucesso).
- **Migration** em `supabase/migrations/0001_fills.sql` (tabela `fills` + RLS só de inserção).
- Sessão em andamento salva em **sessionStorage** (resiste a reload; some ao fechar a aba, para
  não misturar pacientes).

### Épico G — Relatório e PDF
- **Tela de resultado** read-only (`steps/SummaryStep.tsx`): todas as seções + data/duração.
  Identificador discreto no rodapé. CTA "Baixar PDF" no topo e embaixo.
- **PDF editorial** (`src/lib/pdf/report.tsx`, `@react-pdf/renderer`) carregado sob demanda.
  Fontes EB Garamond + Figtree via CDN fontsource. Identificador só como "IDENTIFICADOR", à
  direita do título.

### Épico H — Guia simplificado
- Rota **`/guia/rapido`** (`FastGuide.tsx`): checklist em scroll único, sem transições.
- Reaproveita os mesmos steps via modo `fast` no provider; `StepShell` vira card e
  `next`/`answerAndNext` viram no-op nesse modo. Switch de render extraído para `StepView.tsx`.
- Revelação condicional pelo ramo ativo das respostas. Botão "Ver resultado" leva ao mesmo
  resultado + PDF. Entrada pela abertura do guia.

---

## Estado no GitHub

Épicos (milestones): F (#6), G (#7), H (#8).

- Fechadas (código pronto): #36, #39, #40, #41, #42, #43.
- Abertas por dependência:
  - **#37** — copy do termo de consentimento (cliente / CEP).
  - **#38** — criar projeto Supabase, rodar migration e configurar env na Vercel (Nanda).
- Futuro: **#44** — histórico por ID do paciente (schema já tem `patientId` opcional reservado).
- Substituídas e fechadas: #29, #30 (antigo Épico E).

---

## Pendências

### Nanda (para o armazenamento funcionar de verdade)
1. Criar projeto no Supabase.
2. Rodar `supabase/migrations/0001_fills.sql` no SQL Editor.
3. Colar nas Environment Variables da Vercel:
   - `VITE_SUPABASE_URL` = Project URL
   - `VITE_SUPABASE_ANON_KEY` = **Publishable key** (nunca a Secret key)
4. Limpar a linha de teste local, se ainda estiver lá:
   `delete from public.fills where fill_id = 'smoke-test-conexao';`

Local (.env) já testado: insert retornou HTTP 201.

### Cliente (conteúdo)
- Copy final do termo de consentimento + confirmação de CEP.
- Ilustrações do PAINAD (dimensão física).

---

## Como testar (preview / `npm run dev`)

- **Guia completo**: nova tela de consentimento no início; ao fim, tela de resultado com todas
  as respostas + identificador no rodapé; "Baixar PDF" (topo e base) com o mesmo identificador.
- **Não perder dados**: recarregar no meio mantém as respostas; fechar a aba zera.
- **Guia rápido**: `/guia/rapido` ou link na abertura; etapas aparecem conforme responde;
  "Ver resultado" abre o mesmo resultado/PDF.
- **Persistência** (só com env na Vercel): preenchimento COM consentimento aparece em
  Supabase > Table Editor > fills; SEM consentimento não aparece.

---

## Notas técnicas

- Chunks isolados: `report-*.js` (react-pdf) e `persist-*.js` (supabase) carregam sob demanda;
  bundle principal ~575 kB.
- `crypto.randomUUID()` para o fillId (fallback simples se indisponível).
- Restrição a lembrar: sem travessão na copy; ícones via FontAwesome (nunca emoji).

## Próximos passos sugeridos
1. Nanda configura env na Vercel e valida persistência no preview.
2. Cliente valida copy do consentimento e o fluxo geral.
3. Promover `features-dados-relatorio` (junto com o lote pendente do v2) para `main`.
4. Depois: feature de histórico por ID (#44).
