import { Link } from 'react-router-dom'
import '../css/Productos.css'

export default function ProductoGuru() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <Link to="/productos" className="producto-volver">← Volver a Productos</Link>
        <div className="producto-detalle">
          <img className="producto-detalle-img" src="/img/guru.jpg" alt="GURUIBAMI" />
          <div className="producto-detalle-info">
            <h1 className="producto-detalle-nombre">GURUIBAMI</h1>
            <p className="producto-detalle-precio">$569</p>
            <p className="producto-detalle-desc">La potencia que te mereces.</p>
            <ul className="producto-detalle-specs">
              <li>12 GB RAM - 320 GB Almacenamiento</li>
              <li>Chip: T1 - 4.5 GHz - 2nm</li>
              <li>Ray Tracing</li>
              <li>Pantalla: XDisplay - OLED - 4K - 3400 nits</li>
              <li>Tasa de refresco: 120Hz</li>
              <li>HDR Dinamico</li>
              <li>6 horas de batería</li>
              <li>Sistema Operativo: ROOT</li>
              <li>Colores: Negro, Blanco</li>
              
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}