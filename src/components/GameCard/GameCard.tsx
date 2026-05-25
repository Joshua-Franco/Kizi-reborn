import { Link } from '@tanstack/react-router'
import type { Game } from '../../types/game'
import type { KiziLayoutMetrics } from '../../hooks/useKiziLayout'
import { PLAY_PAGE_GAME_META, PLAY_PAGE_GAME_SLUG } from '../../config/play-page-game'
import { useGameContext } from '../../context/GameContext'
import { KIZI_UI } from '../../utils/kiziAssets'
import './GameCard.css'

interface GameCardProps {
  game: Game
  layout: Pick<KiziLayoutMetrics, 'boxWidth' | 'marginSize'>
}

export default function GameCard({ game, layout }: GameCardProps) {
  const { setSelectedGame } = useGameContext()
  const { boxWidth, marginSize } = layout
  const span = game.large ? 2 : 1
  const size = boxWidth * span
  const thumbInner = size - marginSize * 2

  return (
    <div
      className={`box${game.large ? ' large' : ''}`}
      style={{
        width: size,
        height: size,
        gridColumn: `span ${span}`,
        gridRow: `span ${span}`,
      }}
    >
      <Link
        to="/games/$slug"
        params={{ slug: PLAY_PAGE_GAME_SLUG }}
        className="thumb"
        style={{ width: size, height: size }}
        onClick={() =>
          setSelectedGame({
            slug: PLAY_PAGE_GAME_SLUG,
            name: PLAY_PAGE_GAME_META.name,
            thumb: PLAY_PAGE_GAME_META.thumb || game.thumb,
          })
        }
      >
        <img
          src={game.thumb}
          alt={game.name}
          className="thumb_image"
          style={{
            width: thumbInner,
            height: thumbInner,
            margin: marginSize,
          }}
          loading="lazy"
        />
        {game.new && (
          <span className="thumb_new_ribbon">
            <img src={KIZI_UI.newRibbon} alt="New" />
          </span>
        )}
        <span className="thumb_overlay" style={{ left: marginSize, right: marginSize }}>
          {game.name}
        </span>
      </Link>
    </div>
  )
}
