import { Link } from 'react-router-dom'
import { productos } from '../datos.js'
import '../css/Productos.css'

const rutaPorId: Record<string, string> = {
  TWIN: 'twin',
  GURUIBAMI: 'guru',
  BOSS: 'boss',
}

export default function Productos() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <h1 className="seccion-titulo">Nuestros Productos</h1>
        <div className="grid-productos">
          {productos.map(p => (
            <Link key={p.id} to={`/productos/${rutaPorId[p.id]}`} className="card">
              <img className="card-img" src={p.imagen} alt={p.nombre} />
              <div className="card-contenido">
                <h3 className="card-nombre">{p.nombre}</h3>
                <p className="card-descripcion">{p.descripcion}</p>
                <p className="card-precio">{p.precio}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}