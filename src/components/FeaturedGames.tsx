import type { FeaturedGame } from '../types/game'

interface FeaturedGamesProps {
  games: FeaturedGame[]
}

export default function FeaturedGames({ games }: FeaturedGamesProps) {
  return (
    <div id="category_banner_wrapper">
      <div className="flex flex-wrap gap-2 justify-center">
        {games.map((game) => (
          <a
            key={game.item_id}
            href={game.permalink}
            className="block relative overflow-hidden"
            style={{ width: 300, height: 300 }}
          >
            <img src={game.thumb} alt={game.name} className="w-full h-full object-cover" loading="lazy" />
          </a>
        ))}
      </div>
    </div>
  )
}
