import { useEffect, useRef, type RefObject } from 'react'

// Sequência de imagens controlada pelo scroll, desenhada em <canvas>.
// - imagens descodificadas antes de serem desenhadas (sem flicker)
// - frame atual interpolado (lerp) em direção ao alvo do scroll → movimento contínuo
// - sem setState por frame; `onFrame` só é chamado quando o frame inteiro muda
const LERP = 0.09

export function useScrollSequence(
  sectionRef: RefObject<HTMLElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  frames: string[],
  onFrame?: (frame: number) => void,
) {
  const onFrameRef = useRef(onFrame)
  onFrameRef.current = onFrame

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const n = frames.length
    const images = new Map<string, HTMLImageElement>()
    let alive = true
    let current = 0
    let shown = -1
    let reported = -1

    // frame mais próximo já carregado (anterior primeiro) — evita ecrã vazio enquanto carrega
    function pick(i: number) {
      for (let k = 0; k < n; k++) {
        const a = images.get(frames[i - k]); if (a) return a
        const b = images.get(frames[i + k]); if (b) return b
      }
      return null
    }

    function draw(i: number) {
      const img = pick(i)
      if (!img) return
      if (canvas!.width !== img.naturalWidth) {
        canvas!.width = img.naturalWidth
        canvas!.height = img.naturalHeight
      }
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.drawImage(img, 0, 0)
      shown = i
    }

    // primeiro frame primeiro, depois o resto em paralelo
    const unique = [...new Set([frames[0], ...frames])]
    unique.forEach((src) => {
      const img = new Image()
      img.src = src
      img.decode().then(() => {
        if (!alive) return
        images.set(src, img)
        shown = -1 // força redesenho com a nova imagem
      }).catch(() => {
        // sem o primeiro frame não há animação: esconde a secção em vez de deixar 300vh em branco
        if (alive && src === frames[0]) section!.style.display = 'none'
      })
    })

    function target() {
      const rect = section!.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
      return progress * (n - 1)
    }

    current = target()
    let raf = requestAnimationFrame(function loop() {
      const t = target()
      current = reduced || Math.abs(t - current) < 0.01 ? t : current + (t - current) * LERP
      const i = Math.round(current)
      if (i !== shown) draw(i)
      if (i !== reported) {
        reported = i
        onFrameRef.current?.(i)
      }
      raf = requestAnimationFrame(loop)
    })

    return () => {
      alive = false
      cancelAnimationFrame(raf)
    }
  }, [sectionRef, canvasRef, frames])
}
