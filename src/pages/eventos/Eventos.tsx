import { Link } from 'react-router-dom'
import { eventos } from './eventosData'
import '../../css/Eventos.css'

export default function Eventos() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <h1 className="seccion-titulo">Eventos</h1>
        <div className="grid-eventos">
          {eventos.map(e => (
            <Link key={e.id} to={`/eventos/${e.id}`} className="evento-card">
              <div className="evento-card-body">
                <h3 className="evento-card-nombre">{e.nombre}</h3>
                <p className="evento-card-fecha">{e.fecha}</p>
                <p className="evento-card-desc">{e.descripcion}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}