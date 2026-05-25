import { RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GameProvider } from './context/GameContext'
import { router } from './routes'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <RouterProvider router={router} />
      </GameProvider>
    </QueryClientProvider>
  )
}

export default App
