import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
  buscarPistas,
  nombreArtista,
  obtenerBlobAudio,
  obtenerTendencias,
  urlAudio,
  urlPortada,
} from '../servicios/audius'
import type { AudiusTrack } from '../servicios/audius'
import {
  ESTACIONES_RAINWAVE,
  albumRainwave,
  artistasRainwave,
  cancionActual,
  estacionVecina,
  obtenerInfoRainwave,
  siguienteCancion,
  urlCaratulaRainwave,
  urlStreamRainwave,
} from '../servicios/rainwave'
import type { EstacionRainwave, RainwaveInfo } from '../servicios/rainwave'
import LiquidGlassCarousel from '../components/ui/LiquidGlassCarousel'
import type { LiquidGlassItem } from '../components/ui/LiquidGlassCarousel'
import '../css/Musica.css'

const CLAVE_DESCARGA = 'forger123'

const GENEROS = [
  'Electronic',
  'Hip-Hop/Rap',
  'House',
  'Techno',
  'Lo-Fi',
  'Rock',
  'Pop',
  'R&B/Soul',
  'Jazz',
  'Ambient',
  'Trap',
  'Latin',
]

function formatearTiempo(segundos: number): string {
  if (!Number.isFinite(segundos) || segundos < 0) return '0:00'
  const minutos = Math.floor(segundos / 60)
  const resto = Math.floor(segundos % 60)
  return `${minutos}:${String(resto).padStart(2, '0')}`
}

const ICONOS = {
  reproducir: <path d="M7 4l13 8-13 8z" />,
  pausa: <path d="M6 4h4v16H6zM14 4h4v16h-4z" />,
  anterior: <path d="M6 4h2v16H6zM20 4L9 12l11 8z" />,
  siguiente: <path d="M16 4h2v16h-2zM4 4l11 8L4 20z" />,
  descargar: (
    <>
      <path d="M11 4h2v7h3l-4 4-4-4h3z" />
      <path d="M5 18h14v2H5z" />
    </>
  ),
}

/** Nombre de archivo seguro a partir del artista y el titulo. */
function nombreArchivo(track: AudiusTrack): string {
  const base = `${nombreArtista(track)} - ${track.title}`
  const limpio = base.replace(/[\\/:*?"<>|]+/g, '_').trim()
  return `${limpio || 'FORGER Music'}.mp3`
}

function Icono({ nombre, tamano = 20 }: { nombre: keyof typeof ICONOS; tamano?: number }) {
  return (
    <svg
      className="musica-icono"
      viewBox="0 0 24 24"
      width={tamano}
      height={tamano}
      fill="currentColor"
      aria-hidden="true"
    >
      {ICONOS[nombre]}
    </svg>
  )
}

export default function Musica() {
  const [consulta, setConsulta] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [genero, setGenero] = useState<string | null>(null)
  const [generoPrevio, setGeneroPrevio] = useState<string | null>(null)
  const [vista, setVista] = useState<'home' | 'juegos' | 'spotify'>('home')

  const [pistas, setPistas] = useState<AudiusTrack[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const [indice, setIndice] = useState(-1)
  const [suena, setSuena] = useState(false)
  const [progreso, setProgreso] = useState(0)
  const [duracion, setDuracion] = useState(0)
  const [descargando, setDescargando] = useState<string | null>(null)
  const [autorizado, setAutorizado] = useState(false)
  const [clavePendiente, setClavePendiente] = useState<AudiusTrack | null>(null)
  const [clave, setClave] = useState('')
  const [claveError, setClaveError] = useState('')

  const [modo, setModo] = useState<'audius' | 'radio'>('audius')
  const [estacion, setEstacion] = useState<EstacionRainwave>(ESTACIONES_RAINWAVE[0])
  const [conexionRadio, setConexionRadio] = useState(0)
  const [infoRadio, setInfoRadio] = useState<RainwaveInfo | null>(null)
  const [radioCargando, setRadioCargando] = useState(false)
  const [radioError, setRadioError] = useState('')

  const audioRef = useRef<HTMLAudioElement>(null)
  const pistaActual = indice >= 0 ? pistas[indice] ?? null : null
  const enRadio = modo === 'radio'
  const cancionRadio = cancionActual(infoRadio)
  const proximaRadio = siguienteCancion(infoRadio)
  const portadaRadio = urlCaratulaRainwave(cancionRadio)

  useEffect(() => {
    let activo = true
    setCargando(true)
    setError('')
    setIndice(-1)
    if (!enRadio) {
      setSuena(false)
      setProgreso(0)
      setDuracion(0)
    }

    const peticion = busqueda
      ? buscarPistas(busqueda)
      : obtenerTendencias(genero ?? undefined)

    peticion
      .then((datos) => {
        if (activo) setPistas(datos)
      })
      .catch(() => {
        if (activo) {
          setPistas([])
          setError('No se pudo conectar con FORGER Music. Intentalo de nuevo.')
        }
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [busqueda, genero])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || modo !== 'audius' || !pistaActual) return

    audio.src = urlAudio(pistaActual.id)
    audio.play().then(() => setSuena(true)).catch(() => setSuena(false))
    setProgreso(0)
  }, [pistaActual, modo])

  useEffect(() => {
    if (!enRadio || conexionRadio === 0) return
    const audio = audioRef.current
    if (!audio) return

    setRadioError('')
    setProgreso(0)
    setDuracion(0)
    audio.src = urlStreamRainwave(estacion)
    audio.play().then(() => setSuena(true)).catch(() => setSuena(false))
  }, [enRadio, conexionRadio, estacion])

  useEffect(() => {
    if (!enRadio) return
    let activo = true

    const cargar = () => {
      setRadioCargando(true)
      obtenerInfoRainwave(estacion.sid)
        .then((info) => {
          if (!activo) return
          setInfoRadio(info)
          setRadioError('')
        })
        .catch(() => {
          if (activo) setRadioError('No se pudieron cargar los datos de la emisora.')
        })
        .finally(() => {
          if (activo) setRadioCargando(false)
        })
    }

    setInfoRadio(null)
    cargar()
    const intervalo = window.setInterval(cargar, 45000)

    return () => {
      activo = false
      window.clearInterval(intervalo)
    }
  }, [enRadio, estacion.sid])

  const enviarBusqueda = (evento: FormEvent) => {
    evento.preventDefault()
    const limpio = consulta.trim()
    if (!limpio) return
    if (!busqueda) setGeneroPrevio(genero)
    setGenero(null)
    setBusqueda(limpio)
  }

  // Borra la busqueda y recupera la lista de canciones anterior.
  const limpiarBusqueda = () => {
    setConsulta('')
    setBusqueda('')
    setGenero(generoPrevio)
  }

  const elegirGenero = (valor: string | null) => {
    setConsulta('')
    setBusqueda('')
    setGenero(valor)
  }


  const reproducir = (posicion: number) => {
    if (!enRadio && posicion === indice) {
      alternarReproduccion()
      return
    }
    setModo('audius')
    setIndice(posicion)
  }

  const sintonizar = (nueva: EstacionRainwave) => {
    if (enRadio && nueva.sid === estacion.sid) {
      if (audioRef.current?.paused) {
        setConexionRadio((valor) => valor + 1)
      }
      return
    }
    setModo('radio')
    setIndice(-1)
    setRadioError('')
    setInfoRadio(null)
    setEstacion(nueva)
    setConexionRadio((valor) => valor + 1)
  }

  const cambiarEstacion = (delta: number) => {
    sintonizar(estacionVecina(estacion, delta))
  }

  const alternarReproduccion = () => {
    const audio = audioRef.current
    if (!audio) return

    if (enRadio) {
      if (audio.paused) {
        setConexionRadio((valor) => valor + 1)
      } else {
        audio.pause()
        setSuena(false)
      }
      return
    }

    if (!pistaActual) {
      if (pistas.length > 0) setIndice(0)
      return
    }
    if (audio.paused) {
      audio.play().then(() => setSuena(true)).catch(() => setSuena(false))
    } else {
      audio.pause()
      setSuena(false)
    }
  }

  const cambiarPista = (delta: number) => {
    if (pistas.length === 0) return
    if (indice < 0) {
      setIndice(0)
      return
    }
    setIndice((indice + delta + pistas.length) % pistas.length)
  }

  const saltarA = (valor: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = valor
    setProgreso(valor)
  }

  // Pide la clave si aun no se ha autorizado, o descarga directamente.
  const solicitarDescarga = (pista: AudiusTrack) => {
    if (descargando) return
    if (autorizado) {
      descargar(pista)
      return
    }
    setClave('')
    setClaveError('')
    setClavePendiente(pista)
  }

  const confirmarClave = (evento: FormEvent) => {
    evento.preventDefault()
    if (clave.trim() !== CLAVE_DESCARGA) {
      setClaveError('Clave incorrecta. Intentalo de nuevo.')
      return
    }
    setAutorizado(true)
    const pista = clavePendiente
    setClavePendiente(null)
    setClave('')
    setClaveError('')
    if (pista) descargar(pista)
  }

  const cerrarClave = () => {
    setClavePendiente(null)
    setClave('')
    setClaveError('')
  }

  // Descarga el audio como blob y lo guarda con el nombre de la pista.
  const descargar = async (pista: AudiusTrack) => {
    if (descargando) return
    setDescargando(pista.id)
    setError('')

    try {
      const blob = await obtenerBlobAudio(pista.id)
      const url = URL.createObjectURL(blob)
      const enlace = document.createElement('a')
      enlace.href = url
      enlace.download = nombreArchivo(pista)
      document.body.appendChild(enlace)
      enlace.click()
      enlace.remove()
      URL.revokeObjectURL(url)
    } catch {
      setError('No se pudo descargar la cancion. Intentalo de nuevo.')
    } finally {
      setDescargando(null)
    }
  }

  // Canciones mas cortas del catalogo actual, para el carrusel destacado.
  const cancionesCortas = [...pistas]
    .filter((pista) => pista.duration > 0)
    .sort((a, b) => a.duration - b.duration)
    .slice(0, 10)

  const itemsCortas: LiquidGlassItem[] = cancionesCortas.map((pista) => ({
    id: pista.id,
    titulo: pista.title,
    artista: nombreArtista(pista),
    portada: urlPortada(pista),
    duracion: pista.duration,
  }))

  return (
    <section className="musica">
      <div className="contenedor">
        

        <header className="musica-cabecera">
          <h1 className="musica-titulo">
            <img className="musica-logo" src="/img/Music-logo.png" alt="FORGER Music" />
          </h1>

          <a className="beta">BETA</a>
          
        </header>

        

        <form className="musica-buscador" onSubmit={enviarBusqueda}>
          <div className="musica-campo">
            <input
              className="musica-input"
              type="text"
              value={consulta}
              onChange={(evento) => setConsulta(evento.target.value)}
              placeholder="Busca canciones, artistas o generos..."
              aria-label="Buscar canciones"
            />
            {consulta && (
              <button
                type="button"
                className="musica-limpiar"
                onClick={limpiarBusqueda}
                aria-label="Borrar busqueda"
              >
                ×
              </button>
            )}
          </div>
          <button className="musica-boton" type="submit">Buscar</button>
        </form>

        <nav className="musica-tabs" role="tablist" aria-label="Vistas de musica">
          <button
            role="tab"
            type="button"
            className={`musica-tab ${vista === 'home' ? 'musica-tab-activa' : ''}`}
            onClick={() => setVista('home')}
            aria-selected={vista === 'home'}
            aria-controls="panel-home"
          >
            Home
          </button>
          <button
            role="tab"
            type="button"
            className={`musica-tab ${vista === 'juegos' ? 'musica-tab-activa' : ''}`}
            onClick={() => setVista('juegos')}
            aria-selected={vista === 'juegos'}
            aria-controls="panel-juegos"
          >
            Juegos
          </button>
          <button
            role="tab"
            type="button"
            className={`musica-tab ${vista === 'spotify' ? 'musica-tab-activa' : ''}`}
            onClick={() => setVista('spotify')}
            aria-selected={vista === 'spotify'}
            aria-controls="panel-spotify"
          >
            Spotify
          </button>
        </nav>

        {vista === 'home' && (
          <>
            <div className="musica-generos">
          <button
            type="button"
            className={`musica-genero ${genero === null && !busqueda ? 'musica-genero-activo' : ''}`}
            onClick={() => elegirGenero(null)}
          >
            Tendencias
          </button>
          {GENEROS.map((item) => (
            <button
              key={item}
              type="button"
              className={`musica-genero ${genero === item ? 'musica-genero-activo' : ''}`}
              onClick={() => elegirGenero(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {cargando && <div className="ld-pie" aria-label="Cargando pistas..." />}
        {!cargando && error && <p className="musica-estado musica-error">{error}</p>}
        {!cargando && !error && pistas.length === 0 && (
          <p className="musica-estado">No se encontraron canciones.</p>
        )}

        <div className="musica-lista">
          {pistas.map((pista, posicion) => (
            <div
              key={pista.id}
              role="button"
              tabIndex={0}
              className={`musica-pista ${posicion === indice ? 'musica-pista-activa' : ''}`}
              onClick={() => reproducir(posicion)}
              onKeyDown={(evento) => {
                if (evento.target !== evento.currentTarget) return
                if (evento.key === 'Enter' || evento.key === ' ') {
                  evento.preventDefault()
                  reproducir(posicion)
                }
              }}
            >
              <span className="musica-portada">
                {urlPortada(pista) ? (
                  <img src={urlPortada(pista)} alt={pista.title} loading="lazy" />
                ) : (
                  <span className="musica-portada-vacia">♪</span>
                )}
                <span className="musica-pista-accion">
                  {posicion === indice && suena ? (
                    <Icono nombre="pausa" tamano={16} />
                  ) : (
                    <Icono nombre="reproducir" tamano={16} />
                  )}
                </span>
                <span className="musica-pista-duracion">{formatearTiempo(pista.duration)}</span>
              </span>
              <span className="musica-pista-info">
                <span className="musica-pista-titulo">{pista.title}</span>
                <span className="musica-pista-artista">{nombreArtista(pista)}</span>
                <span className="musica-pista-genero">{pista.genre || 'Sin genero'}</span>
              </span>
              <button
                type="button"
                className="musica-pista-descarga"
                onClick={(evento) => {
                  evento.stopPropagation()
                  solicitarDescarga(pista)
                }}
                disabled={descargando === pista.id}
                aria-label={`Descargar ${pista.title}`}
                title="Descargar"
              >
                <Icono nombre="descargar" tamano={16} />
              </button>
            </div>
          ))}
        </div>

        {itemsCortas.length > 0 && (
          <section className="musica-cortas">
            <h2 className="musica-cortas-titulo">Canciones cortas</h2>
            <LiquidGlassCarousel
              items={itemsCortas}
              entry={false}
              onSelect={(item) => {
                const posicion = pistas.findIndex((pista) => pista.id === item.id)
                if (posicion >= 0) reproducir(posicion)
              }}
            />
          </section>
        )}
          </>
        )}

        {vista === 'juegos' && (
          <section className="musica-juegos" role="tabpanel" id="panel-juegos" aria-labelledby="tab-juegos">
            <div className="musica-juegos-cabecera">
              <h2 className="musica-spotify-titulo">Radio de videojuegos</h2>
              <p className="musica-juegos-sub">
                Bandas sonoras, remixes y chiptune en directo. Elige una emisora y deja que suene.
              </p>
            </div>

            <div className="musica-estaciones">
              {ESTACIONES_RAINWAVE.map((item) => {
                const activa = enRadio && estacion.sid === item.sid
                return (
                  <button
                    key={item.key}
                    type="button"
                    className={`musica-estacion ${activa ? 'musica-estacion-activa' : ''}`}
                    onClick={() => sintonizar(item)}
                  >
                    <span className="musica-estacion-fila">
                      <span className="musica-estacion-nombre">{item.nombre}</span>
                      {activa ? (
                        <span className="musica-live">EN VIVO</span>
                      ) : (
                        <span className="musica-estacion-play">
                          <Icono nombre="reproducir" tamano={14} />
                        </span>
                      )}
                    </span>
                    <span className="musica-estacion-desc">{item.descripcion}</span>
                    {activa && (
                      <span className="musica-estacion-ahora">
                        {radioCargando && !cancionRadio
                          ? 'Conectando...'
                          : cancionRadio
                            ? `${cancionRadio.title} · ${albumRainwave(cancionRadio)}`
                            : 'Sin metadatos'}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {enRadio && (
              <div className="musica-radio">
                <div className="musica-radio-portada">
                  {portadaRadio ? (
                    <img src={portadaRadio} alt={cancionRadio?.title ?? estacion.nombre} />
                  ) : (
                    <span className="musica-portada-vacia">♪</span>
                  )}
                  {suena && <span className="musica-live musica-radio-live">EN VIVO</span>}
                </div>

                <div className="musica-radio-detalle">
                  <span className="musica-radio-emisora">{estacion.nombre}</span>
                  <h3 className="musica-radio-titulo">
                    {cancionRadio?.title || 'Conectando con Rainwave...'}
                  </h3>
                  <p className="musica-radio-meta">
                    {cancionRadio
                      ? `${artistasRainwave(cancionRadio)} · ${albumRainwave(cancionRadio)}`
                      : estacion.descripcion}
                  </p>
                  {proximaRadio && (
                    <p className="musica-radio-siguiente">
                      A continuacion: {proximaRadio.title}
                      {albumRainwave(proximaRadio) ? ` · ${albumRainwave(proximaRadio)}` : ''}
                    </p>
                  )}
                  {radioError && <p className="musica-radio-error">{radioError}</p>}

                  <div className="musica-radio-acciones">
                    <button
                      type="button"
                      className="musica-control"
                      onClick={() => cambiarEstacion(-1)}
                      aria-label="Emisora anterior"
                    >
                      <Icono nombre="anterior" />
                    </button>
                    <button
                      type="button"
                      className="musica-control musica-control-principal"
                      onClick={alternarReproduccion}
                      aria-label={suena ? 'Pausar radio' : 'Reproducir radio'}
                    >
                      <Icono nombre={suena ? 'pausa' : 'reproducir'} tamano={22} />
                    </button>
                    <button
                      type="button"
                      className="musica-control"
                      onClick={() => cambiarEstacion(1)}
                      aria-label="Emisora siguiente"
                    >
                      <Icono nombre="siguiente" />
                    </button>
                  </div>

                  <p className="musica-radio-fuente">
                    Radio en directo por{' '}
                    <a href="https://rainwave.cc" target="_blank" rel="noreferrer">
                      Rainwave
                    </a>
                    . Contenido no disponible para descarga.
                  </p>
                </div>
              </div>
            )}
          </section>
        )}

        {vista === 'spotify' && (
          <section className="musica-spotify" role="tabpanel" id="panel-spotify" aria-labelledby="tab-spotify">
            <h2 className="musica-spotify-titulo">Spotify</h2>
            <div className="musica-spotify-card">
              <iframe
                data-testid="embed-iframe"
                src="https://open.spotify.com/embed/artist/1Xyo4u8uXC1ZmMpatF05PJ?utm_source=generator&theme=0&si=6c9c637cc3d44238"
                width="100%"
                height={352}
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="musica-spotify-iframe"
              />
            </div>
            <div className="musica-spotify-card" style={{ marginTop: '20px' }}>
              <iframe
                data-testid="embed-iframe"
                src="https://open.spotify.com/embed/playlist/37i9dQZEVXbNG2KDcFcKOF?utm_source=generator&theme=0&si=f463bf0863d34f1b"
                width="100%"
                height={352}
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="musica-spotify-iframe"
              />
            </div>
          </section>
        )}
      </div>

      {(pistaActual || enRadio) && (
        <div className="musica-player">
          <div className="contenedor musica-player-interno">
            <div className="musica-player-info">
              {enRadio
                ? portadaRadio && (
                    <img
                      className="musica-player-portada"
                      src={portadaRadio}
                      alt={cancionRadio?.title ?? estacion.nombre}
                    />
                  )
                : pistaActual &&
                  urlPortada(pistaActual) && (
                    <img
                      className="musica-player-portada"
                      src={urlPortada(pistaActual)}
                      alt={pistaActual.title}
                    />
                  )}
              <span className="musica-player-textos">
                <span className="musica-player-titulo">
                  {enRadio ? cancionRadio?.title || estacion.nombre : pistaActual?.title}
                </span>
                <span className="musica-player-artista">
                  {enRadio
                    ? cancionRadio
                      ? `${artistasRainwave(cancionRadio)} · ${estacion.nombre}`
                      : estacion.descripcion
                    : pistaActual && nombreArtista(pistaActual)}
                </span>
              </span>
            </div>

            {enRadio ? (
              <div className="musica-player-radio">
                <span className="musica-live">EN VIVO</span>
                <span className="musica-player-estacion">{estacion.nombre}</span>
                {radioError && <span className="musica-player-radio-error">{radioError}</span>}
              </div>
            ) : (
              <div className="musica-progreso">
                <span className="musica-tiempo">{formatearTiempo(progreso)}</span>
                <input
                  className="musica-barra"
                  type="range"
                  min={0}
                  max={duracion || 0}
                  step={1}
                  value={progreso}
                  onChange={(evento) => saltarA(Number(evento.target.value))}
                  aria-label="Progreso de la cancion"
                />
                <span className="musica-tiempo">{formatearTiempo(duracion)}</span>
              </div>
            )}

            <div className="musica-player-controles">
              {enRadio ? (
                <>
                  <button
                    type="button"
                    className="musica-control"
                    onClick={() => cambiarEstacion(-1)}
                    aria-label="Emisora anterior"
                  >
                    <Icono nombre="anterior" />
                  </button>
                  <button
                    type="button"
                    className="musica-control musica-control-principal"
                    onClick={alternarReproduccion}
                    aria-label={suena ? 'Pausar radio' : 'Reproducir radio'}
                  >
                    <Icono nombre={suena ? 'pausa' : 'reproducir'} tamano={22} />
                  </button>
                  <button
                    type="button"
                    className="musica-control"
                    onClick={() => cambiarEstacion(1)}
                    aria-label="Emisora siguiente"
                  >
                    <Icono nombre="siguiente" />
                  </button>
                </>
              ) : (
                pistaActual && (
                  <>
                    <button
                      type="button"
                      className="musica-control"
                      onClick={() => cambiarPista(-1)}
                      aria-label="Pista anterior"
                    >
                      <Icono nombre="anterior" />
                    </button>
                    <button
                      type="button"
                      className="musica-control musica-control-principal"
                      onClick={alternarReproduccion}
                      aria-label={suena ? 'Pausar' : 'Reproducir'}
                    >
                      <Icono nombre={suena ? 'pausa' : 'reproducir'} tamano={22} />
                    </button>
                    <button
                      type="button"
                      className="musica-control"
                      onClick={() => cambiarPista(1)}
                      aria-label="Pista siguiente"
                    >
                      <Icono nombre="siguiente" />
                    </button>
                    <button
                      type="button"
                      className="musica-control"
                      onClick={() => solicitarDescarga(pistaActual)}
                      disabled={descargando === pistaActual.id}
                      aria-label="Descargar cancion"
                      title="Descargar"
                    >
                      <Icono nombre="descargar" />
                    </button>
                  </>
                )
              )}
            </div>
          </div>

          <audio
            ref={audioRef}
            onTimeUpdate={(evento) => {
              if (!enRadio) setProgreso(evento.currentTarget.currentTime)
            }}
            onLoadedMetadata={(evento) => {
              if (!enRadio) setDuracion(evento.currentTarget.duration)
            }}
            onEnded={() => {
              if (!enRadio) cambiarPista(1)
            }}
            onPlay={() => setSuena(true)}
            onPause={() => setSuena(false)}
            onError={() => {
              if (enRadio) setRadioError('Se corto la senal. Pulsa reproducir para reconectar.')
            }}
          />
        </div>
      )}

      {clavePendiente && (
        <div className="musica-clave-fondo" role="dialog" aria-modal="true" aria-label="Clave de descarga">
          <form className="musica-clave" onSubmit={confirmarClave}>
            <h2 className="musica-clave-titulo">Descarga protegida</h2>
            <p className="musica-clave-texto">Introduce la clave para descargar esta cancion.</p>
            <input
              className="musica-clave-input"
              type="password"
              value={clave}
              onChange={(evento) => setClave(evento.target.value)}
              placeholder="Clave"
              aria-label="Clave de descarga"
              autoFocus
            />
            {claveError && <p className="musica-clave-error">{claveError}</p>}
            <div className="musica-clave-botones">
              <button type="button" className="musica-clave-cancelar" onClick={cerrarClave}>
                Cancelar
              </button>
              <button type="submit" className="musica-clave-aceptar">
                Descargar
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}
