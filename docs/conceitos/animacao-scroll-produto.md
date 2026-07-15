# Conceito — Animação de Produto no Scroll (AMBI 2.7)

## Ideia

O utilizador faz scroll e o contentor AMBI 2.7 roda, sobe e abre o alçapão. Em fases específicas da animação, surgem callouts que destacam características técnicas do produto.

Referência de experiência: páginas de produto Apple (iPhone, AirPods).

---

## Sequência de animação proposta

| Fase | Acção no contentor         | Callout sugerido                        |
|------|----------------------------|-----------------------------------------|
| 1    | Vista frontal estática     | Boca de deposição — cor e formato       |
| 2    | Rotação 90°                | Área de comunicação / adesivagem        |
| 3    | Rotação 180° (vista lateral)| Sistema de elevação — argola / Kinshoffer |
| 4    | Elevação do contentor      | Compatibilidade com volteador           |
| 5    | Abertura do alçapão        | Interior — capacidade 2.700 L           |

---

## Solução técnica

### Mecanismo de scroll

- Secção com altura aumentada (ex: `400vh`) e conteúdo interior em `position: sticky`
- Scroll progress mapeado para frame da animação: `frame = Math.floor(progress * totalFrames)`
- Callouts activados por threshold de progress (ex: fase 2 entre 20%–40% do scroll)

### Formato de asset — Sequência de PNGs (KeyShot)

A equipa de engenharia exporta a animação do KeyShot como sequência de frames PNG com fundo transparente.

**Especificações pedidas à equipa:**
- Formato: PNG com canal alpha (fundo transparente)
- Resolução: 1200 × 1200 px por frame
- Frames: 60 a 120 frames para a sequência completa
- Sem compressão com perdas

### Conversão para web (após receber os PNGs)

Opção A — Canvas frame-by-frame (mais controlo):
```bash
# Pré-carregamento de todos os frames como imagens
# Scroll listener mapeia progress → frame index → canvas.drawImage()
```

Opção B — WebM com alpha via FFmpeg (ficheiro único):
```bash
ffmpeg -framerate 30 -i frame_%04d.png -c:v libvpx-vp9 -pix_fmt yuva420p output.webm
```

---

## Implementação no site

**Stack:** React + scroll event listener (sem dependências externas)

```
Secção sticky
└── Canvas (exibe frame actual)
└── Overlay de callouts (opacity controlada por phase)
    ├── Callout esquerdo (slide-in da esquerda)
    └── Callout direito (slide-in da direita)
```

Os callouts reutilizam o sistema já implementado (`.cv-callout`, animações spring/expo-out).

---

## Próximos passos

- [ ] Engenharia exporta sequência PNG do KeyShot (60–120 frames, 1200×1200 px, alpha)
- [ ] Converter PNGs para WebM com alpha (FFmpeg) ou manter como sequência
- [ ] Implementar secção sticky com canvas no `CargaVerticalTemplate.tsx`
- [ ] Definir fases de callout e respectivos textos com equipa de produto
- [ ] Testar performance em mobile (reduzir resolução/frames se necessário)

---

## Notas

- KeyShot não exporta Lottie nem GLTF directamente — PNG sequence é o caminho nativo
- Em mobile, reduzir para 30 frames e 600×600 px para evitar problemas de memória
- Implementar `prefers-reduced-motion`: mostrar imagem estática + callouts sem animação
