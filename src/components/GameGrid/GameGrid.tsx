import type { Game } from '../../types/game'
import type { KiziLayoutMetrics } from '../../hooks/useKiziLayout'
import GameCard from '../GameCard/GameCard'
import './GameGrid.css'

interface GameGridProps {
  games: Game[]
  layout: KiziLayoutMetrics
}

export default function GameGrid({ games, layout }: GameGridProps) {
  return (
    <div
      id="scrolling_games_div"
      style={{
        margin: `10px ${layout.wrapperMargin}px 0`,
        gridTemplateColumns: `repeat(${layout.thumbsPerRow}, ${layout.boxWidth}px)`,
      }}
    >
      {games.map((game) => (
        <GameCard key={game.rel_id} game={game} layout={layout} />
      ))}
    </div>
  )
}
