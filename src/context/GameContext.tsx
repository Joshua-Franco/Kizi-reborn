import { createContext, useContext, useState, type ReactNode } from 'react'

interface UserState {
  coins: number
  level: number
  xp: number
  isLoggedIn: boolean
  username: string
}

interface GameContextType {
  user: UserState
  addCoins: (amount: number) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  currentCategory: string
  setCurrentCategory: (category: string) => void
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

  const addCoins = (amount: number) => {
    setUser((prev) => ({ ...prev, coins: prev.coins + amount }))
  }

  return (
    <GameContext.Provider value={{ user, addCoins, searchQuery, setSearchQuery, currentCategory, setCurrentCategory }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGameContext() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGameContext must be used within GameProvider')
  return ctx
}
