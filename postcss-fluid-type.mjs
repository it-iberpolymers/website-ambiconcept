// Em ecrãs grandes os textos (e a largura dos blocos onde estão) crescem todos pelo mesmo fator,
// para manter as hierarquias: abaixo de BASE_VW fica tudo como está escrito no CSS; acima cresce
// com a largura do ecrã até MAX_FACTOR. Corre sobre todo o CSS (ficheiros próprios e Tailwind).
const BASE_VW = 1480
const MAX_FACTOR = 1.35

const toPx = (num, unit) => (unit === 'rem' ? num * 16 : num)
const round = (n) => +n.toFixed(3)

// Os títulos grandes crescem menos do que o texto corrente (senão ficam enormes):
// até 24px cresce a 100 % do ritmo e com o teto de 1,35×; a partir de 48px a 60 % e teto de 1,15×.
function growth(px, shrinkBig) {
  if (!shrinkBig) return { rate: 1, cap: MAX_FACTOR }
  const t = Math.min(1, Math.max(0, (px - 24) / 24))
  return { rate: 1 - 0.4 * t, cap: MAX_FACTOR - 0.2 * t }
}

// tamanho = px no ecrã de BASE_VW, a crescer com a largura (vw) em proporção ao 'rate'
function fluid(px, shrinkBig = false) {
  const { rate, cap } = growth(px, shrinkBig)
  const vw = round((px / BASE_VW) * 100 * rate)
  const fixed = round(px * (1 - rate))
  const grow = fixed ? `calc(${vw}vw + ${fixed}px)` : `${vw}vw`
  return `max(${round(px)}px, min(${grow}, ${round(px * cap)}px))`
}

const LITERAL = /^(-?\d*\.?\d+)(px|rem)$/

function scaleLiteral(value, min = 0, shrinkBig = false) {
  const m = LITERAL.exec(value.trim())
  if (!m) return null
  const px = toPx(parseFloat(m[1]), m[2])
  return px > min ? fluid(px, shrinkBig) : null
}

// separa os argumentos de nível 1 de uma função, ex. clamp(a, b, c)
function splitArgs(inner) {
  const out = []
  let depth = 0, cur = ''
  for (const ch of inner) {
    if (ch === '(') depth++
    if (ch === ')') depth--
    if (ch === ',' && depth === 0) { out.push(cur); cur = '' } else cur += ch
  }
  out.push(cur)
  return out
}

function scaleFontSize(value) {
  const lit = scaleLiteral(value, 0, true)
  if (lit) return lit
  const m = /^clamp\((.*)\)$/s.exec(value.trim())
  if (m) {
    const args = splitArgs(m[1])
    if (args.length === 3) {
      const max = scaleLiteral(args[2], 0, true)
      if (max) return `clamp(${args[0].trim()}, ${args[1].trim()}, ${max})`
    }
  }
  return null
}

export default function fluidType() {
  return {
    postcssPlugin: 'fluid-type',
    Declaration(decl) {
      if (decl.__fluid) return
      let next = null
      const p = decl.prop
      if (p === 'font-size') next = scaleFontSize(decl.value)
      else if (p === 'line-height') next = scaleLiteral(decl.value)
      else if (p === 'max-width') next = scaleLiteral(decl.value, 280)
      else if (/^--text-(xs|sm|base|lg|xl|[2-9]xl)$/.test(p)) next = scaleLiteral(decl.value, 0, true)
      else if (/^--container-/.test(p)) next = scaleLiteral(decl.value, 280)
      if (next) { decl.value = next; decl.__fluid = true }
    },
  }
}
fluidType.postcss = true
