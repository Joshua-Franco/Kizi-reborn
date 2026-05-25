import type { Game } from '../types/game'
import GameCard from './GameCard'

interface GameGridProps {
  games: Game[]
}

export default function GameGrid({ games }: GameGridProps) {
  const boxWidth = 150

  return (
    <div id="scrolling_games_div" className="mx-auto">
      {games.map((game) => (
        <GameCard key={game.rel_id} game={game} boxWidth={boxWidth} />
      ))}
    </div>
  )
}
