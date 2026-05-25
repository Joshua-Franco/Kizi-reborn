import { Link } from '@tanstack/react-router'
import GamePlayer from '../GamePlayer/GamePlayer'
import { getGameDisplaySize, type DisplayContext } from '../../config/game-display-sizes'
import { resolveGamePlayConfig } from '../../utils/gamePlayConfig'
import './Html5GameStage.css'

interface Html5GameStageProps {
  slug: string
  context: DisplayContext
  maxWidth?: number
  showTitle?: boolean
}

/** Visor HTML5 local (src/games/games_html5) sin iframe; tamaño en game-display-sizes.ts */
export default function Html5GameStage({
  slug,
  context,
  maxWidth,
  showTitle = true,
}: Html5GameStageProps) {
  const game = resolveGamePlayConfig(slug)
  const size = getGameDisplaySize(slug, context, maxWidth)

  if (game.engine !== 'html5' || !game.html5Url) {
    return null
  }

  return (
    <section className={`html5-game-stage html5-game-stage--${context}`}>
      {showTitle && (
        <div className="html5-game-stage__header">
          <h2 className="html5-game-stage__title kizi_font">{game.name}</h2>
          {context === 'home' && (
            <Link to="/games/$slug" params={{ slug }} className="html5-game-stage__play-link">
              Jugar pantalla completa
            </Link>
          )}
        </div>
      )}
      <div className="html5-game-stage__viewport">
        <GamePlayer
          engine="html5"
          html5Url={game.html5Url}
          title={game.name}
          width={size.width}
          height={size.height}
        />
      </div>
    </section>
  )
}
