import { createContext, useContext, useState, type ReactNode } from 'react'

interface UserState {
  coins: number
  level: number
  xp: number
  isLoggedIn: boolean
  username: string
}

export interface SelectedGame {
  slug: string
  name: string
  thumb: string
}

interface GameContextType {
  user: UserState
  addCoins: (amount: number) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  currentCategory: string
  setCurrentCategory: (category: string) => void
  selectedGame: SelectedGame | null
  setSelectedGame: (game: SelectedGame) => void
}

const defaultUser: UserState = {
  coins: 8000,
  level: 1,
  xp: 0,
  isLoggedIn: false,
  username: 'Guest',
}

const GameContext = createContext<GameContextType | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserState>(defaultUser)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentCategory, setCurrentCategory] = useState('homepage')
  const [selectedGame, setSelectedGame] = useState<SelectedGame | null>(null)

  const addCoins = (amount: number) => {
    setUser((prev) => ({ ...prev, coins: prev.coins + amount }))
  }

  return (
    <GameContext.Provider
      value={{
        user,
        addCoins,
        searchQuery,
        setSearchQuery,
        currentCategory,
        setCurrentCategory,
        selectedGame,
        setSelectedGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGameContext() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGameContext must be used within GameProvider')
  return ctx
}
