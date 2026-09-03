import { Link } from 'react-router-dom'
import { productos } from '../datos.js'
import '../css/Home.css'

export default function Home() {
  const destacados = productos.slice(0, 3)

  return (
    <>
      <section className="seccion">
        <div className="contenedor">
          <h2 className="seccion-titulo">Productos mas Destacados</h2>
          <div className="grid-productos">
            {destacados.map(p => (
              <Link key={p.id} to={`/producto/${p.id}`} className="card">
                <img className="card-img" src={p.imagen} alt={p.nombre} />
                <h3 className="card-nombre">{p.nombre}</h3>
                <p className="card-precio">{p.precio}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}