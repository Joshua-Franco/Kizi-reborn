import type { Game, HomepageGamesData } from '../types/game'
import {
  fileNameToDisplayName,
  fileNameToSlug,
  gameThumb,
  listGameThumbFiles,
} from '../utils/assetCatalog'

function simulateNetwork<T>(data: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), 300))
}

const ALL_GAMES: Game[] = listGameThumbFiles().map((fileName, i) => {
  const isThumb = /^thumb\d+_/i.test(fileName)
  return {
    new: i < 5,
    name: fileNameToDisplayName(fileName),
    rel_id: 10000 + i,
    unity: false,
    thumb: gameThumb(fileName),
    path: `/games/${fileNameToSlug(fileName)}`,
    render_play_icon: false,
    is_video: false,
    large: !isThumb,
  }
})

function interleaveGames(interval = 8): Game[] {
  const thumbs = ALL_GAMES.filter((g) => !g.large)
  const large = ALL_GAMES.filter((g) => g.large)
  const result: Game[] = []
  let thumbIdx = 0
  let largeIdx = 0
  while (thumbIdx < thumbs.length || largeIdx < large.length) {
    for (let i = 0; i < interval && thumbIdx < thumbs.length; i++) {
      result.push(thumbs[thumbIdx++])
    }
    if (largeIdx < large.length) {
      result.push(large[largeIdx++])
    }
  }
  return result
}

const GAMES = interleaveGames(8)

export function fetchHomepageGames(): Promise<HomepageGamesData> {
  return simulateNetwork({
    record_efficiency: true,
    page: 1,
    total_pages: 1,
    rel: 'CollectionItem',
    collection_id: 111,
    selected_games: [],
    games: GAMES,
  })
}

export function fetchFeaturedGames(): Promise<Game[]> {
  return simulateNetwork(GAMES.slice(0, 4))
}
