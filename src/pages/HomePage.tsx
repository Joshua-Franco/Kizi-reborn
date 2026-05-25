import { useHomepageGames, useFeaturedGames } from '../hooks/useGames'
import GameGrid from '../components/GameGrid'
import FeaturedGames from '../components/FeaturedGames'

export default function HomePage() {
  const { data: homepageData, isLoading: loadingGames } = useHomepageGames()
  const { data: featured, isLoading: loadingFeatured } = useFeaturedGames()

  if (loadingGames || loadingFeatured) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#fcdb03] border-t-transparent" />
      </div>
    )
  }

  return (
    <>
      {featured && featured.length > 0 && <FeaturedGames games={featured} />}
      <div id="selected_category_div_wrapper" className="bg-[#0ea1ce]">
        <div id="selected_category_div" className="mx-auto" />
      </div>
      {homepageData && <GameGrid games={homepageData.games} />}
    </>
  )
}
