import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { serveGamesPlugin } from './src/plugins/serveGamesPlugin'
import { ruffleAssetsPlugin } from './src/plugins/ruffleAssetsPlugin'

// https://vite.dev/config/
export default defineConfig({
  base: '/Kizi-reborn/',
  plugins: [react(), tailwindcss(), serveGamesPlugin(), ruffleAssetsPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
  },
})
