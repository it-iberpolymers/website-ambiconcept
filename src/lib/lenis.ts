import Lenis from 'lenis'

// instância única de smooth scroll (criada pelo Layout) — outros módulos usam-na para scrollTo
export let lenis: Lenis | null = null

export function startLenis() {
  lenis = new Lenis({ lerp: 0.07 })
  let id = requestAnimationFrame(function raf(t) {
    lenis?.raf(t)
    id = requestAnimationFrame(raf)
  })
  return () => {
    cancelAnimationFrame(id)
    lenis?.destroy()
    lenis = null
  }
}
