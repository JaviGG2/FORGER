import { Link } from 'react-router-dom'
import '../../css/Eventos.css'

export default function EventoShowdown() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <Link to="/eventos" className="evento-volver">← Volver a Eventos</Link>
        <div className="evento-detalle">
          <h1 className="evento-detalle-nombre">FORGER SHOWDOWN</h1>
          <p className="evento-detalle-fecha">22 Abril 2026</p>
          <p className="evento-detalle-desc">1v1, el mejor contra el mejor.</p>
          <div className="evento-video">
            {/* Pegar video aqui */}
          </div>
        </div>
      </div>
    </section>
  )
}