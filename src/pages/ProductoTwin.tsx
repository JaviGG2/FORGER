import { Link } from 'react-router-dom'
import '../css/Productos.css'

export default function ProductoTwin() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <Link to="/productos" className="producto-volver">← Volver a Productos</Link>
        <div className="producto-detalle">
          <img className="producto-detalle-img" src="/img/twin.jpg" alt="TWIN" />
          <div className="producto-detalle-info">
            <h1 className="producto-detalle-nombre">TWIN</h1>
            <p className="producto-detalle-precio">$979</p>
            <p className="producto-detalle-desc">Jugar con dos, siempre es mejor.</p>
            <ul className="producto-detalle-specs">
              <li>18 GB RAM - 512 GB Almacenamiento</li>
              <li>Chip T1 Pro - 4.7 GHz - 2nm - 2x mas rapido que el T1</li>
              <li>Dicipador de Calor</li>
              <li>XDisplay - OLED - 4K - 3600 nits</li>
              <li>Tasa de refresco: 120Hz</li>
              <li>HDR Dinamico</li>
              <li>6 horas de batería</li>
              <li>Ray Tracing</li>
              <li>Sistema de vibración: Haptic Pro</li>
              <li>Dolby Atmos</li>
              <li>Sistema Operativo: ROOT</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}