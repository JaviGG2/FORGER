import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react'
import { useRef, useState } from 'react'

interface TextPressureProps {
  text: string
  flex?: boolean
  alpha?: boolean
  stroke?: boolean
  width?: boolean
  weight?: boolean
  italic?: boolean
  textColor?: string
  strokeColor?: string
  minFontSize?: number
  style?: CSSProperties
  fontFamily?: string
  letterSpacing?: number
  fontSize?: number
}

/**
 * Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ
 * Font used - https://compressa.preusstype.com/
 *
 * Note:
 * Make sure the font you're using supports all the variable properties.
 * React Bits does not take responsibility for the fonts used.
 */
export default function TextPressure({
  text,
  stroke = false,
  width = false,
  weight = true,
  italic = true,
  textColor = '#ffffff',
  strokeColor = '#5227FF',
  minFontSize = 36,
  style,
  fontFamily = 'inherit',
  letterSpacing = 0,
  fontSize = 56,
}: TextPressureProps) {
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

  const chars = [...text]

  return (
    <span
      ref={wrapperRef}
      style={{
        position: 'relative',
        display: 'inline-block',
        ...style,
      } as CSSProperties}
      onPointerMove={handlePointerMove}
    >
      {[...chars].map((char, index) => {
  const influence = pointer
          ? 0.42 * (1 - Math.min(1, Math.hypot(pointer.x, pointer.y) * 0.38))
          : 0

        const strokeStyle: CSSProperties = {
          position: 'absolute',
          left: 0,
          top: 0,
          whiteSpace: 'nowrap',
          display: 'inline-block',
          fontFamily,
          fontWeight: weight ? 800 : 500,
          fontStyle: italic ? 'italic' : 'normal',
          color: stroke ? 'transparent' : textColor,
          textShadow: stroke
            ? `0 0 0 ${strokeColor}`
            : undefined,
          pointerEvents: 'none',
          userSelect: 'none',
        } as CSSProperties

        const innerStyle: CSSProperties = {
          display: 'inline-block',
          position: 'relative',
          color: textColor,
          fontFamily,
          fontWeight: weight ? 800 : 500,
          fontStyle: italic ? 'italic' : 'normal',
          letterSpacing: `${letterSpacing}em`,
          pointerEvents: 'none',
          userSelect: 'none',
          transition: 'transform 0.15s ease',
        } as CSSProperties

        const translateX =
          (pointer?.x ?? 0) * 2.4 * (1 + influence) +
          (width ? (pointer?.x ?? 0) * 1.6 * (1 + influence) : 0)
        const translateY =
          (pointer?.y ?? 0) * 2.4 * (1 + influence) +
          (width ? (pointer?.y ?? 0) * 1.6 * (1 + influence) : 0)
        const rotate =
          (pointer?.x ?? 0) * 0.35 * (1 + influence) -
          (pointer?.y ?? 0) * 0.35 * (1 + influence)
        const skew =
          (pointer?.x ?? 0) * 0.06 * (1 + influence) -
          (pointer?.y ?? 0) * 0.06 * (1 + influence)

        const baseFontSize = fontSize || minFontSize

        return (
          <span
            key={`${char}-${index}`}
            style={{
              display: 'inline-block',
              position: 'relative',
              marginRight: letterSpacing < 0 ? Math.abs(letterSpacing) * fontSize + 'px' : '0px',
            } as CSSProperties}
          >
            {stroke && (
              <span
                style={{
                  ...strokeStyle,
                  fontSize: `${baseFontSize}px`,
                  fontWeight: weight ? 800 : 500,
                  fontStyle: italic ? 'italic' : 'normal',
                }}
              >
                {char}
              </span>
            )}

            <span
              style={{
                ...innerStyle,
                fontSize: `${baseFontSize}px`,
                transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) skew(${skew}deg)`,
              }}
            >
              {char}
            </span>
          </span>
        )
      })}
    </span>
  )
}
