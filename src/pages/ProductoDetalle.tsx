import { useParams } from 'react-router-dom'
import { productos } from '../datos.js'
import '../css/Productos.css'

export default function ProductoDetalle() {
  const { id } = useParams()
  const producto = productos.find(p => p.id.toLowerCase() === id?.toLowerCase())

  if (!producto) {
    return (
      <section className="seccion">
        <div className="contenedor">
          <h1 className="seccion-titulo">Producto no encontrado</h1>
        </div>
      </section>
    )
  }

  return (
    <section className="seccion">
      <div className="contenedor">
        <div className="producto-detalle">
          <img className="producto-detalle-img" src={producto.imagen} alt={producto.nombre} />
          <div className="producto-detalle-info">
            <h1 className="producto-detalle-nombre">{producto.nombre}</h1>
            <p className="producto-detalle-precio">{producto.precio}</p>
            <p className="producto-detalle-desc">{producto.descripcion}</p>
            <ul className="producto-detalle-specs">
              {producto.specs.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}