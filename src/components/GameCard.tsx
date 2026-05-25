import type { Game } from '../types/game'

interface GameCardProps {
  game: Game
  boxWidth?: number
}

export default function GameCard({ game, boxWidth = 150 }: GameCardProps) {
  const thumbDim = Math.round(0.93 * boxWidth)
  const marginSize = Math.floor((boxWidth - thumbDim) / 2)

  return (
    <div
      className="box float-left"
      style={{ width: boxWidth + 6, height: boxWidth + 6 }}
    >
      <div className="thumb relative overflow-hidden mx-auto z-5" style={{ width: boxWidth, height: boxWidth }}>
        <img
          src={game.thumb}
          alt={game.name}
          className="thumb_image float-left z-1"
          style={{ width: thumbDim, height: thumbDim, margin: marginSize }}
          loading="lazy"
        />
        {game.new && (
          <span className="new_ribbon absolute left-0 top-0 z-4" style={{ width: '50%', height: '50%' }}>
            <img
              src="https://web.archive.org/web/20160729021620im_/http://cdn0.kizi.com/assets/common/new_ribbon-f80a2cbe2ef811c18cdfd1af028aa6f0.png"
              alt="New"
              className="w-full h-full"
            />
          </span>
        )}
        <a
          href={game.path}
          className="thumb_overlay absolute block w-full h-full z-9 top-0 left-0 opacity-0"
        >
          {game.name}
        </a>
      </div>
    </div>
  )
}
