import { useHomepageGames } from '../../hooks/useGames'
import { useKiziLayout } from '../../hooks/useKiziLayout'
import { useGameContext } from '../../context/GameContext'
import GameGrid from '../../components/GameGrid/GameGrid'
import './HomePage.css'

export default function HomePage() {
  const layout = useKiziLayout()
  const { data: homepageData } = useHomepageGames()
  const { searchQuery } = useGameContext()

  const filteredGames = homepageData?.games.filter((g) => {
    const q = searchQuery.toLowerCase()
    return (
      g.name.toLowerCase().includes(q) ||
      g.fileName.toLowerCase().includes(q)
    )
  })

  return (
    <div className="homepage-wrapper">
      {filteredGames && searchQuery && filteredGames.length === 0 && (
        <div style={{ color: '#fff', padding: 40, fontSize: 18 }}>No games found.</div>
      )}
      {filteredGames && filteredGames.length > 0 && (
        <div className="game-grid-wrapper">
          <GameGrid games={filteredGames} layout={layout} />
        </div>
      )}
    </div>
  )
}
