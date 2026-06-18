export type GameEngine = 'html5' | 'flash'

export interface Game {
  new?: boolean
  /** Nombre exacto del archivo de thumb (sin extensión). */
  name: string
  /** Archivo de thumbnail en public/games_ui (ej. candy-rain.jpg). */
  fileName: string
  /** Slug de ruta /games/:slug (derivado del fileName). */
  slug: string
  rel_id: number
  unity: boolean
  thumb: string
  path: string
  render_play_icon: boolean
  is_video: boolean
  large?: boolean
  /** Slug del juego instalado (carpeta HTML5 o SWF). */
  installSlug: string
  engine: GameEngine
  playable: boolean
}

export interface FeaturedGame {
  item_id: number
  name: string
  countries: string | null
  new: boolean
  permalink: string
  thumb: string
}

export interface Category {
  id: string
  name: string
  image: string
  path: string
}

export interface HomepageGamesData {
  record_efficiency: boolean
  page: number
  total_pages: number
  rel: string
  collection_id: number
  selected_games: Game[]
  games: Game[]
  category?: string
}
