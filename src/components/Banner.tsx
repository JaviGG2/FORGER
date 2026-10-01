import { Link } from 'react-router-dom'
import '../css/Banner.css'

export default function Banner() {
    return (
    <>
        <div className="banner-wrap">
            <img src="/img/FORGER-Music.png" alt="Banner" />
        </div>
        <Link className="banner-subtitulo" to="/musica">Escucha tu música favorita en cualquier lugar</Link>
    </>
    )
}
