import type { FeaturedGame } from '../../types/game'
import { KIZI_UI } from '../../utils/kiziAssets'
import '../GameCard/GameCard.css'
import './FeaturedGames.css'

interface FeaturedGamesProps {
  games: FeaturedGame[]
}

const FEATURED_SIZE = 300

export default function FeaturedGames({ games }: FeaturedGamesProps) {
  const outer = FEATURED_SIZE + 6

  return (
    <>
      {games.map((game) => (
        <div key={game.item_id} className="box featured_box" style={{ width: outer, height: outer }}>
          <div className="thumb" style={{ width: FEATURED_SIZE, height: FEATURED_SIZE }}>
            <img
              src={game.thumb}
              alt={game.name}
              className="thumb_image"
              style={{ width: FEATURED_SIZE, height: FEATURED_SIZE }}
              loading="lazy"
            />
            {game.new && (
              <span className="new_ribbon" style={{ position: 'absolute', left: 0, top: 0, zIndex: 4, width: '50%', height: '50%' }}>
                <img src={KIZI_UI.newRibbon} alt="New" style={{ width: '100%', height: '100%' }} />
              </span>
            )}
            <a href={game.permalink} className="thumb_overlay">
              {game.name}
            </a>
          </div>
        </div>
      ))}
      <div className="clr" />
    </>
  )
}
