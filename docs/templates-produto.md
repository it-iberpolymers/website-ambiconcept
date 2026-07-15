# Templates de Produto

## Conceito

Cada categoria de produto pode ter um template dedicado com layout e experiência específicos. O `ProductDetail.tsx` actua como dispatcher — recebe o slug e a categoria e renderiza o template correcto.

---

## Template: Carga Vertical

**Ficheiros:**
- `src/templates/CargaVerticalTemplate.tsx`
- `src/styles/template-carga-vertical.css` (prefixo `cv-`)

### Secções

| Secção | Descrição |
|---|---|
| Showcase | Título grande + carrossel de imagens + 4 features em colunas laterais |
| Anatomy 1 | Imagem `anatomy_image` com callouts animados (Chars1) |
| Anatomy 2 | Imagem `anatomy_image_2` com callouts animados (Chars2) |
| Especificações | Tabela de ficha técnica sobre fundo grafite |
| Outros modelos | Grid de produtos relacionados da mesma categoria |
| CTA | Secção de contacto final |

### Sistema de callouts animados

Grid `240px 1fr 240px` — as colunas laterais contêm os callouts, a coluna central a imagem do produto.

Elementos de anotação posicionados sobre a imagem:
- `.cv-ann-dot` — ponto verde com efeito radar (ping)
- `.cv-ann-line` — linha horizontal de ligação dot → callout

Trigger: `IntersectionObserver` com `threshold: 0.25`. Ao entrar no viewport, aplica a classe `.cv-anatomy--visible` que activa as animações CSS.

Sequência de animação (por secção):
```
dot-esq    → 0ms    · spring  · 0.5s
linha-esq  → 80ms   · pen     · 0.55s
callout-esq→ 360ms  · expo    · 0.65s
dot-dir    → 170ms  · spring  · 0.5s
linha-dir  → 250ms  · pen     · 0.55s
callout-dir→ 530ms  · expo    · 0.65s
```

### Campos obrigatórios no produto

```ts
anatomy_image    // imagem Chars1 (secção anatomy 1)
anatomy_image_2  // imagem Chars2 (secção anatomy 2, opcional)
hero_images[]    // mínimo 1 imagem para o carrossel
specifications   // objecto chave-valor para a tabela técnica
```

---

## Templates a implementar

| Categoria | Estado |
|---|---|
| Carga Vertical | ✅ Implementado |
| Carga Traseira | ⬜ A fazer |
| Smart Box | ⬜ A fazer |
| Porta-a-porta | ⬜ A fazer |
| Baldes Domésticos | ⬜ A fazer |
| Papeleiras | ⬜ A fazer |

---

## Próximos conceitos (Carga Vertical)

Ver [conceitos/animacao-scroll-produto.md](conceitos/animacao-scroll-produto.md) — rotação 3D do contentor no scroll com callouts por fase.
