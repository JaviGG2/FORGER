import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react'
import { useRef, useState } from 'react'

interface WarpTextProps {
  text: string
  color?: string
  warpStrength?: number
  warpScale?: number
  speed?: number
  pointerInfluence?: number
  pointerStrength?: number
  refraction?: number
  ripple?: boolean
  fontSize?: number
  fontWeight?: number
  style?: CSSProperties
  fontFamily?: string
  letterSpacing?: number
  lineHeight?: number
}

function genWave(t: number, speed: number, amplitude: number) {
  return Math.sin(t * speed + amplitude)
}

export default function WarpText({
  text,
  color = '#ffffff',
  warpStrength = 0.08,
  warpScale = 1.7,
  speed = 0.55,
  pointerInfluence = 0.42,
  pointerStrength = 0.38,
  refraction = 0.018,
  ripple = false,
  fontSize = 116,
  fontWeight = 800,
  style,
  fontFamily = 'inherit',
  letterSpacing = -0.06,
  lineHeight = 0.9,
}: WarpTextProps) {
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null)
  const wrapperRef = useRef<HTMLSpanElement>(null)

  const handlePointerMove = (event: ReactMouseEvent<HTMLSpanElement>) => {
    const el = wrapperRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPointer({
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    })
  }

  return (
    <span
      ref={wrapperRef}
      style={{
        position: 'relative',
        display: 'inline-block',
        lineHeight,
        ...style,
      } as CSSProperties}
      onPointerMove={handlePointerMove}
    >
      <span
        style={{
          position: 'relative',
          fontFamily,
          fontSize: `${fontSize}px`,
          fontWeight,
          letterSpacing: `${letterSpacing}em`,
          color: color,
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
          transform: `scale(${warpScale})`,
          transformOrigin: 'center',
        } as CSSProperties}
      >
        {text}
      </span>

      <span
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          display: 'inline-block',
          lineHeight,
        } as CSSProperties}
      >
        {[...text].map((char, index) => {
          const t = Date.now() / 1000 * speed + index * 0.15
          const wave = genWave(t, speed, refraction * 12)
          const influence = pointer
            ? pointerStrength * (1 - Math.min(1, Math.hypot(pointer.x, pointer.y) * pointerInfluence))
            : 0
          const offset =
            wave * warpStrength * 12 * (1 + influence) +
            (ripple ? Math.sin(t * 2) * 2 : 0)

          const letterSpacingPx =
            letterSpacing < 0 ? Math.abs(letterSpacing) * fontSize + 'px' : '0px'

          return (
            <span
              key={`${char}-${index}`}
              style={{
                display: 'inline-block',
                position: 'relative',
                color: color,
                marginRight: letterSpacingPx,
                transform: `translateY(${offset}px)`,
              } as CSSProperties}
            >
              {char}
            </span>
          )
        })}
      </span>
    </span>
  )
}
