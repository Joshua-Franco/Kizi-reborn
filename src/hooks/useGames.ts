import { useQuery } from '@tanstack/react-query'
import { fetchHomepageGames, fetchFeaturedGames } from '../services/gameService'

export function useHomepageGames() {
  return useQuery({
    queryKey: ['homepage-games'],
    queryFn: fetchHomepageGames,
  })
}

export function useFeaturedGames() {
  return useQuery({
    queryKey: ['featured-games'],
    queryFn: fetchFeaturedGames,
  })
}
