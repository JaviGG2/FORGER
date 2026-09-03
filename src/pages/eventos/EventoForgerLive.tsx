import { Link } from 'react-router-dom'
import '../../css/Eventos.css'

export default function EventoForgerLan() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <Link to="/eventos" className="evento-volver">← Volver a Eventos</Link>
        <div className="evento-detalle">
          <h1 className="evento-detalle-nombre">FORGER LIVE 25</h1>
          <p className="evento-detalle-fecha">27 noviembre 2025</p>
          <p className="evento-detalle-desc">Presentación de productos.</p>
          <div className="evento-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/20NhofZUGuw" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}