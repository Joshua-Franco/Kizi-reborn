export interface Game {
  new?: boolean
  name: string
  rel_id: number
  unity: boolean
  thumb: string
  path: string
  render_play_icon: boolean
  is_video: boolean
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
