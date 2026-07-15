# Design System

## Paleta de cores

| Nome | Hex | Uso |
|---|---|---|
| Verde Ambiconcept | `#7ab929` | CTA primário, destaque, dots de anotação |
| Grafite | `#303f49` | Texto principal, títulos |
| Grafite escuro | `#1c2b1f` | Fundo de secções CTA |
| Cinzento claro | `#f4f6f4` | Fundo de secções secundárias |
| Branco | `#ffffff` | Fundo base, cards |

---

## Tipografia

**Família:** Poppins (Google Fonts — carregada em `index.html`)

| Papel | Peso | Tamanho |
|---|---|---|
| Título hero produto | 700 | `clamp(60px, 11vw, 120px)` |
| Títulos de secção | 600–700 | `clamp(22px, 2.8vw, 34px)` |
| Corpo / descrição | 400 | `15–16px` |
| Labels uppercase | 600 | `11px · letter-spacing: 0.14em` |
| Callout título | 700 | `11.5px · uppercase` |
| Callout texto | 400 | `13px` |

---

## Botões

Definidos em `src/styles/buttons.css`.

| Classe | Estilo |
|---|---|
| `.btn-primary` | Fundo `#7ab929`, texto branco |
| `.btn-ghost` | Borda fina, texto grafite, hover verde |

---

## Convenções CSS

- Prefixo por módulo para evitar colisões de cascata:
  - `cv-` → template Carga Vertical (`template-carga-vertical.css`)
  - `pc-` → catálogo de produtos (`products-catalog.css`)
  - `hp-` → homepage premium (`home-premium.css`)
- Grid padrão de produto (anatomy): `240px 1fr 240px` (callout | imagem | callout)
- Espaçamento de secção: `padding: 80px 20px`
- `max-width` de conteúdo: `1140–1200px`, centrado com `margin: 0 auto`
- Animar apenas `opacity` e `transform` — composited layers, sem layout thrashing

---

## Sistema de animação (Carga Vertical)

| Nome | Curva | Uso |
|---|---|---|
| Spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Dots — overshoot/pop |
| Pen | `cubic-bezier(0.87, 0, 0.13, 1)` | Linhas — traço de caneta |
| Expo-out | `cubic-bezier(0.16, 1, 0.3, 1)` | Callouts — aterragem suave |

Sequência de entrada por secção anatomy: dot-esq (0ms) → linha-esq (80ms) → callout-esq (360ms) → dot-dir (170ms) → linha-dir (250ms) → callout-dir (530ms).

---

## Referências

Ver [analise/design-premium.md](analise/design-premium.md) — padrões extraídos de Porsche, Apple, Ferrari, Maserati e Aston Martin.
