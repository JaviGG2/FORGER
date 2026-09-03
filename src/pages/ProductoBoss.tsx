import { Link } from 'react-router-dom'
import '../css/Productos.css'

export default function ProductoBoss() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <Link to="/productos" className="producto-volver">← Volver a Productos</Link>
        <div className="producto-detalle">
          <img className="producto-detalle-img" src="/img/boss.png" alt="FORGER BOSS" />
          <div className="producto-detalle-info">
            <h1 className="producto-detalle-nombre">FORGER BOSS</h1>
            <p className="producto-detalle-precio">$199</p>
            <p className="producto-detalle-desc">Escucha el sonido de la acción.</p>
            <ul className="producto-detalle-specs">
              <li>Audio Spacial</li>
              <li>Space Noise</li>
              <li>48 horas de uso</li>
              <li>USB-C</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}