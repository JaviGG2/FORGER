import '../../css/LiquidGlassCarousel.css'

export interface LiquidGlassItem {
  id: string | number
  titulo: string
  artista?: string
  portada?: string
  duracion?: number
}

interface LiquidGlassCarouselProps {
  items?: LiquidGlassItem[]
  entry?: boolean
  onSelect?: (item: LiquidGlassItem, index: number) => void
  className?: string
}

function formatearTiempo(segundos?: number): string {
  if (!segundos || !Number.isFinite(segundos) || segundos < 0) return ''
  const minutos = Math.floor(segundos / 60)
  const resto = Math.floor(segundos % 60)
  return `${minutos}:${String(resto).padStart(2, '0')}`
}

/**
 * Carrusel de tarjetas con efecto "cristal liquido" (vidrio esmerilado con
 * brillos y profundidad). Cada tarjeta representa una cancion.
 */
export function LiquidGlassCarousel({
  items = [],
  entry = true,
  onSelect,
  className = '',
}: LiquidGlassCarouselProps) {
  return (
    <div className={`glass-carousel ${className}`.trim()}>
      <div className="glass-carousel-pista">
        {items.map((item, indice) => (
          <button
            key={item.id}
            type="button"
            className={`glass-card ${entry ? 'glass-card--entrada' : ''}`}
            style={entry ? { animationDelay: `${indice * 60}ms` } : undefined}
            onClick={() => onSelect?.(item, indice)}
          >
            <span className="glass-card-brillo" aria-hidden="true" />

            <span className="glass-card-portada">
              {item.portada ? (
                <img src={item.portada} alt={item.titulo} loading="lazy" />
              ) : (
                <span className="glass-card-vacia">♪</span>
              )}
              {item.duracion ? (
                <span className="glass-card-duracion">{formatearTiempo(item.duracion)}</span>
              ) : null}
            </span>

            <span className="glass-card-info">
              <span className="glass-card-titulo">{item.titulo}</span>
              {item.artista ? <span className="glass-card-artista">{item.artista}</span> : null}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default LiquidGlassCarousel
