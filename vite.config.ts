import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'
import { ruffleAssetsPlugin } from './src/plugins/ruffleAssetsPlugin'

// https://vite.dev/config/
export default defineConfig({
  base: '/Kizi-reborn/',
  plugins: [
    react(),
    tailwindcss(),
    ruffleAssetsPlugin(),
    {
      name: 'spa-fallback',
      apply: 'build',
      closeBundle() {
        const src = path.resolve(__dirname, 'dist', 'index.html')
        const dest = path.resolve(__dirname, 'dist', '404.html')
        fs.copyFileSync(src, dest)
      },
    } satisfies Plugin,
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
  },
})
