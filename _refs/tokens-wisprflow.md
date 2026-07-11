# Referência de tokens — wisprflow.ai

Extraído do site em produção (CSS custom properties + estilos computados) como
referência de sistema. **Não copiamos a paleta** — mantivemos nossos verdes e
correlacionamos os papéis. Serve para lembrar as decisões de sistema adotadas.

## O que adotamos do sistema Wispr

- **Tipografia editorial**: títulos serifados com **tracking negativo** (letras
  apertadas) e **line-height fechado**. É a assinatura do visual.
- **Escala tipográfica ampla** (display 7.5rem → h4 2rem).
- **Neutros por transparência** (cor sobre opacidade, sem cinzas puros). Já usávamos.
- **Flat total**: zero sombras. Já usávamos.
- Mesmo par de fontes: **Figtree** (corpo) + **EB Garamond** (títulos).

## Correlação de cores (Wispr → nosso verde)

| Papel | Wispr | Nosso |
|---|---|---|
| Fundo cream | `lumen #ffffeb` | `paper #f8f5ee` / `cream #ece6d8` |
| Texto quase-preto | `vast #1a1a1a` | `forest #22392e` |
| Acento profundo | `fathom #034f46` | `pine #063d35` |
| Destaque suave | `dawn #f0d7ff` (lavanda) | `sage-100 #e6ecdf` |
| Acento quente | `glow #ffa946` (laranja) | — (só funcional, fora da UI) |
| Vinho/erro | `pulse #7f1c34` | — (usar funcional se preciso) |

---

## Tokens crus do Wispr (referência)

### Cores base
```
lumen        #ffffeb   (bg cream)
lumen-dark   #e4e4d0
vast         #1a1a1a   (texto)
fathom       #034f46   (verde-petróleo)
glow         #ffa946   (laranja)
dawn         #f0d7ff   (lavanda)
pulse        #7f1c34   (vinho)
white        #fff
neutros      #111 #222 #444 #666 #aaa #ccc #eee
sistema      success #cef5ca / warning #fcf8d8 / error #f8e4e4 / focus #2d62ff
alpha        dark/light de 2% a 90% (cor + opacidade em vez de cinza)
```

### Tipografia
```
corpo    Figtree, Arial, sans-serif
títulos  "EB Garamond", Arial, sans-serif
pesos    400 (dominante) · 500 · 600 (botões) · 700

headings h1 7.5rem (6rem mobile) · h2 4rem · h3 3rem · h4 2rem · h5 1.25rem · h6 1rem
corpo    xlarge 1.5 · large 1.25 · large-medium 1.375 · medium 1.125 · regular 1
         · small .875 · xsmall .8125rem

tracking h1 120px → -6px (~-0.05em) · h2 64px → -1.92px (~-0.03em)
         h3 32px → -0.96px (~-0.03em)     [line-height sempre fechado, ~0.95–1.0]
```

### Raios
```
principal 14px · 12px · 40px · 80px · pílula 1000px
```

### Sombras
```
nenhuma — 100% flat
```

### Espaçamento (seções)
```
paddings       6 / 8 / 10 / 14rem
section-radius 1 / 2 / 3 / 4 / 5rem
spacers        1.5 / 3 / 10rem
```
