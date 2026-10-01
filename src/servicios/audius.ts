/* ============================================================
   audius.ts · Cliente de la API de Audius para FORGER Music
   Audius no requiere API key y permite reproducir la canción
   completa desde el navegador.
   ============================================================ */

const HOST = 'https://api.audius.co'
const APP_NAME = 'FORGERMusic'

export interface AudiusUsuario {
  name: string
  handle: string
}

export interface AudiusTrack {
  id: string
  title: string
  duration: number
  genre: string | null
  play_count: number
  artwork: Record<string, string> | null
  user: AudiusUsuario | null
}

async function pedir<T>(ruta: string): Promise<T> {
  const separador = ruta.includes('?') ? '&' : '?'
  const respuesta = await fetch(`${HOST}${ruta}${separador}app_name=${APP_NAME}`)

  if (!respuesta.ok) {
    throw new Error(`Audius respondio ${respuesta.status}`)
  }

  const json = await respuesta.json()
  return json.data as T
}

/** Pistas en tendencia, opcionalmente filtradas por genero. */
export function obtenerTendencias(genero?: string, limite = 24): Promise<AudiusTrack[]> {
  const params = new URLSearchParams({ limit: String(limite) })
  if (genero) params.set('genre', genero)
  return pedir<AudiusTrack[]>(`/v1/tracks/trending?${params.toString()}`)
}

/** Busca pistas por titulo, artista o etiqueta. */
export function buscarPistas(consulta: string, limite = 24): Promise<AudiusTrack[]> {
  const params = new URLSearchParams({ query: consulta, limit: String(limite) })
  return pedir<AudiusTrack[]>(`/v1/tracks/search?${params.toString()}`)
}

/** URL de streaming del audio completo de una pista. */
export function urlAudio(id: string): string {
  return `${HOST}/v1/tracks/${id}/stream?app_name=${APP_NAME}`
}

/** Mejor portada disponible para la pista. */
export function urlPortada(track: AudiusTrack): string {
  const arte = track.artwork
  if (!arte) return ''
  return arte['480x480'] || arte['1000x1000'] || arte['150x150'] || ''
}

/** Nombre visible del artista/productor. */
export function nombreArtista(track: AudiusTrack): string {
  return track.user?.name || track.user?.handle || 'Artista desconocido'
}
