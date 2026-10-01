import { Link } from 'react-router-dom'
import '../css/Banner.css'

export default function Banner() {
    return (
    <>
        <Link className="banner-wrap" to="/musica">
            <img src="/img/FORGER-Music.png" alt="Banner" />
        </Link>
        <Link className="banner-subtitulo" to="/musica">Escucha tu música favorita en cualquier lugar</Link>
        <Link className="btn-music" to="/musica">Escuchar</Link>
    </>
    )
}
