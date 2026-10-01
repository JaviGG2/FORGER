import { Link } from 'react-router-dom'
import '../css/SistemaOperativo.css'

export default function SistemaOperativo() {
  return (
    <section className="seccion">
      <div className="contenedor">
        <Link to="/" className="producto-volver">← Volver al Inicio</Link>

        <h1 className="seccion-titulo">ROOT</h1>
        <p className="so-subtitulo">Sistema Operativo para Consolas Portatiles</p>

        <div className="so-simulador">
          <div className="so-pantalla">
            <div className="so-status-bar">
              <span className="so-status-hora">12:30</span>
              <span className="so-status-bateria">100%</span>
            </div>

            <div className="so-contenido-pantalla">
              <div className="so-icono-grid">
                <div className="so-icono">
                  <div className="so-icono-img">&#9654;</div>
                  <span>Juegos</span>
                </div>
                <div className="so-icono">
                  <div className="so-icono-img">&#9881;</div>
                  <span>Ajustes</span>
                </div>
                <div className="so-icono">
                  <div className="so-icono-img">&#9783;</div>
                  <span>Menu</span>
                </div>
                <div className="so-icono">
                  <div className="so-icono-img">&#9733;</div>
                  <span>Tienda</span>
                </div>
              </div>
            </div>

            <div className="so-barcode-area">
              <div className="so-barcode">
                <div className="so-barcode-line" style={{width: '2px'}}></div>
                <div className="so-barcode-line" style={{width: '1px'}}></div>
                <div className="so-barcode-line" style={{width: '3px'}}></div>
                <div className="so-barcode-line" style={{width: '1px'}}></div>
                <div className="so-barcode-line" style={{width: '2px'}}></div>
                <div className="so-barcode-line" style={{width: '1px'}}></div>
                <div className="so-barcode-line" style={{width: '3px'}}></div>
                <div className="so-barcode-line" style={{width: '1px'}}></div>
                <div className="so-barcode-line" style={{width: '2px'}}></div>
                <div className="so-barcode-line" style={{width: '1px'}}></div>
                <div className="so-barcode-line" style={{width: '3px'}}></div>
                <div className="so-barcode-line" style={{width: '1px'}}></div>
                <div className="so-barcode-line" style={{width: '2px'}}></div>
                <div className="so-barcode-line" style={{width: '1px'}}></div>
                <div className="so-barcode-line" style={{width: '3px'}}></div>
                <div className="so-barcode-line" style={{width: '1px'}}></div>
                <div className="so-barcode-line" style={{width: '2px'}}></div>
                <div className="so-barcode-line" style={{width: '1px'}}></div>
                <div className="so-barcode-line" style={{width: '3px'}}></div>
                <div className="so-barcode-line" style={{width: '1px'}}></div>
              </div>
              <span className="so-barcode-texto">ROOT-2026-FORGER</span>
            </div>

            <div className="so-menu-inferior">
              <div className="so-menu-item so-menu-activo">&#9750; Inicio</div>
              <div className="so-menu-item">&#9654; Juegos</div>
              <div className="so-menu-item">&#9881; Ajustes</div>
              <div className="so-menu-item">&#9783; Perfil</div>
            </div>
          </div>
        </div>

        <div className="so-features">
          <div className="so-feature-card">
            <h3>Interfaz Intuitiva</h3>
            <p>Navegacion fluida con menu optimizado para tactil</p>
          </div>
          <div className="so-feature-card">
            <h3>Rendimiento</h3>
            <p>Sistema ligero disenado para maximo rendimiento</p>
          </div>
          <div className="so-feature-card">
            <h3>Seguridad</h3>
            <p>Proteccion avanzada para tus datos y juegos</p>
          </div>
        </div>

        <div className="so-galeria">
          <h2 className="so-galeria-titulo">Galeria</h2>
          <div className="so-galeria-grid">
            <div className="so-galeria-item">
              <div className="so-galeria-placeholder">
                <span>Pantalla Principal</span>
              </div>
            </div>
            <div className="so-galeria-item">
              <div className="so-galeria-placeholder">
                <span>Menu de Juegos</span>
              </div>
            </div>
            <div className="so-galeria-item">
              <div className="so-galeria-placeholder">
                <span>Ajustes del Sistema</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
