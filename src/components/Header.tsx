import { Link } from 'react-router-dom'
import { navLinks } from '../datos'
import '../css/Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="contenedor header-interno">
        <Link to="/" className="header-logo">FORGER</Link>
        <nav className="header-nav">
          {navLinks.map(link => (
            <Link key={link.ruta} to={link.ruta} className="header-link">
              {link.texto}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}