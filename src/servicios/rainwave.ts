/* ============================================================
   rainwave.ts · Radio de musica de videojuegos para FORGER Music
   Rainwave expone una API publica sin clave y permite escuchar
   sus emisoras desde el navegador.
   ============================================================ */

const BASE = 'https://rainwave.cc/api4'
const RELAY = 'https://relay.rainwave.cc'

export interface EstacionRainwave {
  sid: number
  key: string
  nombre: string
  descripcion: string
}

export interface RainwaveArtista {
  id: number
  name: string
}

export interface RainwaveAlbum {
  id: number
  name: string
  art: string | null
}

export interface RainwaveCancion {
  id: number
  title: string
  length: number
  artists: RainwaveArtista[]
  albums: RainwaveAlbum[]
  url?: string | null
}

export interface RainwaveEvento {
  id: number
  start: number
  end: number
  length: number
  type: string
  songs: RainwaveCancion[]
}

export interface RainwaveInfo {
  sched_current: RainwaveEvento | null
  sched_next: RainwaveEvento[]
  sched_history: RainwaveEvento[]
}

export const ESTACIONES_RAINWAVE: EstacionRainwave[] = [
  { sid: 1, key: 'game', nombre: 'Game', descripcion: 'Bandas sonoras originales de videojuegos.' },
  { sid: 2, key: 'ocremix', nombre: 'OC ReMix', descripcion: 'Los mejores remixes de videojuegos.' },
  { sid: 3, key: 'covers', nombre: 'Covers', descripcion: 'Versiones y remixes de musica de juegos.' },
  { sid: 4, key: 'chiptune', nombre: 'Chiptunes', descripcion: '8-bit, 16-bit y chiptune.' },
  { sid: 5, key: 'all', nombre: 'All', descripcion: 'Todo el catalogo de Rainwave.' },
  { sid: 6, key: 'chill', nombre: 'Chill', descripcion: 'Musica de juegos para relajarse.' },
]

/** URL del stream en vivo de una emisora. */
export function urlStreamRainwave(estacion: EstacionRainwave): string {
  return `${RELAY}/${estacion.key}.mp3`
}

/** Informacion en vivo: cancion actual, cola e historial. */
export async function obtenerInfoRainwave(sid: number): Promise<RainwaveInfo> {
  const respuesta = await fetch(`${BASE}/info?sid=${sid}`)

  if (!respuesta.ok) {
    throw new Error(`Rainwave respondio ${respuesta.status}`)
  }

  return (await respuesta.json()) as RainwaveInfo
}

/** Portada del album de una cancion. */
export function urlCaratulaRainwave(cancion: RainwaveCancion | null): string {
  const arte = cancion?.albums?.[0]?.art
  if (!arte) return ''
  return `https://rainwave.cc${arte}_320.jpg`
}

/** Artistas de una cancion separados por comas. */
export function artistasRainwave(cancion: RainwaveCancion | null): string {
  if (!cancion?.artists?.length) return 'Artista desconocido'
  return cancion.artists.map((artista) => artista.name).join(', ')
}

/** Nombre del album o juego al que pertenece la cancion. */
export function albumRainwave(cancion: RainwaveCancion | null): string {
  return cancion?.albums?.[0]?.name || ''
}

/** Cancion que esta sonando ahora en la emisora. */
export function cancionActual(info: RainwaveInfo | null): RainwaveCancion | null {
  return info?.sched_current?.songs?.[0] ?? null
}

/** Siguiente cancion programada en la emisora. */
export function siguienteCancion(info: RainwaveInfo | null): RainwaveCancion | null {
  return info?.sched_next?.[0]?.songs?.[0] ?? null
}

/** Emisora anterior o siguiente de la lista. */
export function estacionVecina(actual: EstacionRainwave, delta: number): EstacionRainwave {
  const posicion = ESTACIONES_RAINWAVE.findIndex((estacion) => estacion.sid === actual.sid)
  const base = posicion < 0 ? 0 : posicion
  const indice = (base + delta + ESTACIONES_RAINWAVE.length) % ESTACIONES_RAINWAVE.length
  return ESTACIONES_RAINWAVE[indice]
}
