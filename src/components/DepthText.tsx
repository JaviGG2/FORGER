import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import '../css/DepthText.css'

interface DepthTextProps {
  text: string
  layers?: number
  depth?: number
  faceColor?: string
  depthColor?: string
  tilt?: number
  pointerTracking?: boolean
  smoothing?: number
  perspective?: number
  autoOrbit?: boolean
  orbitSpeed?: number
  fontSize?: string
  fontWeight?: number
  shadow?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * Texto con efecto de profundidad: apila varias copias del texto en el eje Z
 * y las inclina en 3D. Puede seguir el puntero y/u "orbitar" automaticamente.
 */
export default function DepthText({
  text,
  layers = 24,
  depth = 2.4,
  faceColor = '#f8fafc',
  depthColor = '#7c3aed',
  tilt = 7.5,
  pointerTracking = false,
  smoothing = 0.15,
  perspective = 900,
  autoOrbit = false,
  orbitSpeed = 0.35,
  fontSize = 'clamp(2rem, 8vw, 4rem)',
  fontWeight = 900,
  shadow = false,
  className = '',
  style,
}: DepthTextProps) {
  const contenedorRef = useRef<HTMLSpanElement>(null)
  const rotadorRef = useRef<HTMLSpanElement>(null)
  const estadoRef = useRef({ x: -tilt, y: tilt })
  const punteroRef = useRef({ x: 0, y: 0 })

  const animar = autoOrbit || pointerTracking

  useEffect(() => {
    const rotador = rotadorRef.current
    if (!rotador) return

    // Sin animacion: deja el texto en su inclinacion base.
    if (!animar) {
      rotador.style.transform = `rotateX(${-tilt}deg) rotateY(${tilt}deg)`
      return
    }

    let frame = 0
    const inicio = performance.now()

    const alMover = (evento: PointerEvent) => {
      const caja = contenedorRef.current?.getBoundingClientRect()
      if (!caja) return
      const nx = ((evento.clientX - caja.left) / caja.width) * 2 - 1
      const ny = ((evento.clientY - caja.top) / caja.height) * 2 - 1
      punteroRef.current.x = Math.max(-1, Math.min(1, nx))
      punteroRef.current.y = Math.max(-1, Math.min(1, ny))
    }

    if (pointerTracking) window.addEventListener('pointermove', alMover)

    const paso = (ahora: number) => {
      const estado = estadoRef.current
      let objetivoX = -tilt
      let objetivoY = tilt

      if (autoOrbit) {
        const t = (ahora - inicio) / 1000
        objetivoY += Math.sin(t * orbitSpeed) * 12
        objetivoX += Math.cos(t * orbitSpeed * 0.8) * 6
      }

      if (pointerTracking) {
        objetivoX += -punteroRef.current.y * 14
        objetivoY += punteroRef.current.x * 14
      }

      estado.x += (objetivoX - estado.x) * smoothing
      estado.y += (objetivoY - estado.y) * smoothing
      rotador.style.transform = `rotateX(${estado.x}deg) rotateY(${estado.y}deg)`
      frame = requestAnimationFrame(paso)
    }

    frame = requestAnimationFrame(paso)

    return () => {
      cancelAnimationFrame(frame)
      if (pointerTracking) window.removeEventListener('pointermove', alMover)
    }
  }, [animar, autoOrbit, orbitSpeed, pointerTracking, smoothing, tilt])

  const total = Math.max(1, Math.round(layers))

  return (
    <span
      ref={contenedorRef}
      className={`depth-text ${className}`.trim()}
      style={{ perspective: `${perspective}px`, ...style }}
    >
      <span ref={rotadorRef} className="depth-text-rotador">
        {Array.from({ length: total }).map((_, i) => {
          const frente = i === total - 1
          const z = -(total - 1 - i) * depth
          const progreso = total > 1 ? i / (total - 1) : 1

          return (
            <span
              key={i}
              aria-hidden={!frente}
              className={`depth-text-capa ${
                frente ? 'depth-text-capa--frente' : 'depth-text-capa--fondo'
              }`}
              style={{
                transform: `translate3d(${-z * 0.25}px, ${-z * 0.25}px, ${z}px)`,
                color: frente ? faceColor : depthColor,
                opacity: frente ? 1 : 0.12 + progreso * 0.55,
                fontSize,
                fontWeight,
                textShadow: shadow && frente ? '0 12px 32px rgba(124, 58, 237, 0.45)' : undefined,
              }}
            >
              {text}
            </span>
          )
        })}
      </span>
    </span>
  )
}
