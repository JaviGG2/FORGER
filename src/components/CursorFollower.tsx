import { useEffect, useRef } from 'react'

const N = 6
const EASE = 0.26
const BLUR = 5

const tint = (a: number) => `rgba(255,255,255,${a})`

const arrowSvg = (c: string) =>
  `<svg viewBox="0 0 24 24" width="26" height="26"><path d="M5 2l14 7-6 1.7L11 18z" fill="${c}"/></svg>`

export default function CursorFollower() {
  const ghostsRef = useRef<{ el: HTMLDivElement; x: number; y: number; ease: number }[]>([])

  useEffect(() => {
    const ghosts = Array.from({ length: N }, (_, i) => {
      const t = i / (N - 1)
      const el = document.createElement('div')
      el.className = 'ghost'
      el.innerHTML = arrowSvg(tint(1 - t * 0.72))
      el.style.filter = `blur(${t * BLUR}px)`
      el.style.opacity = String(1 - t * 0.72)
      document.body.appendChild(el)
      return { el, x: 0, y: 0, ease: Math.max(EASE * (1 - t * 0.8), 0.03) }
    }).reverse()

    ghostsRef.current = ghosts

    let mx = 0
    let my = 0
    const onMove = (e: PointerEvent) => { mx = e.clientX; my = e.clientY }
    addEventListener('pointermove', onMove, { passive: true })

    let raf: number
    const loop = () => {
      for (const g of ghosts) {
        g.x += (mx - g.x) * g.ease
        g.y += (my - g.y) * g.ease
        g.el.style.transform = `translate3d(${g.x}px, ${g.y}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('pointermove', onMove)
      ghosts.forEach(g => g.el.remove())
    }
  }, [])

  return null
}
