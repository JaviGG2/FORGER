import { Link } from 'react-router-dom'
import { lema } from '../datos'
import '../css/Footer.css'

const COLUMNAS = [
  {
    titulo: 'Navegacion',
    enlaces: [
      { ruta: '/', texto: 'Inicio' },
      { ruta: '/productos', texto: 'Productos' },
      { ruta: '/musica', texto: 'Music' },
      { ruta: '/sistema-operativo', texto: 'Sistema Operativo' },
      { ruta: '/eventos', texto: 'Eventos' },
    ],
  },
  {
    titulo: 'Productos',
    enlaces: [
      { ruta: '/productos/twin', texto: 'FORGER TWIN' },
      { ruta: '/productos/guru', texto: 'GURU IBAMI' },
      { ruta: '/productos/boss', texto: 'FORGER BOSS' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="pie">
      <div className="contenedor pie-interno">
        <div className="pie-bloque">
          <div className="pie-marca">FORGER</div>
          <p className="pie-frase">{lema}</p>
        </div>

        <div className="pie-grupo">
          {COLUMNAS.map((columna) => (
            <div key={columna.titulo} className="pie-columna">
              <span className="pie-titulo">{columna.titulo}</span>
              {columna.enlaces.map((enlace) => (
                <Link key={enlace.ruta} to={enlace.ruta}>
                  {enlace.texto}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="contenedor pie-final">
        <span>© 2026 FORGER</span>
        <span>Todos los derechos reservados</span>
      </div>
    </footer>
  )
}
