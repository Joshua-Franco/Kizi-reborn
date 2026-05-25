import { gameThumb } from '../utils/assetCatalog'
import { GAME_FILES_BASE } from '../utils/gameCatalog'

/** Juego fijo de la play-page (HTML5 local en games_html5). */
export const PLAY_PAGE_GAME_SLUG = 'fireboy-watergirl-7-and-friends'

const FIREBOY_FOLDER = 'Fireboy & Watergirl 7_ and Friends'

/** HTML mínimo sin anuncios/cookies guardados (solo carga el SDK del juego). */
export const PLAY_PAGE_EMBED_URL = `${GAME_FILES_BASE}/games_html5/${encodeURIComponent(FIREBOY_FOLDER)}/play-embed.html`

export const PLAY_PAGE_THUMB_FILE = 'fireboy-watergirl-7-and-friends.jpg'

export const PLAY_PAGE_GAME_META = {
  name: 'Fireboy & Watergirl 7: and Friends',
  description:
    'Fireboy and Watergirl need help to explore this new temple. This time with 3 new friends that will help them solve the puzzles, beat the times and collect all the diamonds! Play alone or with a friend to join Fireboy and Watergirl in this new adventure!',
  tags: ['Platform', '2 Players', 'Logic'] as const,
  thumb: gameThumb(PLAY_PAGE_THUMB_FILE),
}
