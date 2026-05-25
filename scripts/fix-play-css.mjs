import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const p = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'pages', 'Play', 'Play.css')
const sprite = '../../assets/ui/new_game_page_sprite-5e0d69d6c652a66b3f7ec1c5c4945ccd%20(1).png'

let c = fs.readFileSync(p, 'utf8')
c = c.replace(/https:\/\/web\.archive\.org[^)'"]+/g, (m) => {
  if (m.includes('gamepage_bg_top')) return '../../assets/ui/gamepage_bg_top_01-4df3eab5fa758e26fba83e64fbbf4b5e.jpg'
  if (m.includes('gamepage_bg_footer')) return '../../assets/ui/gamepage_bg_footer_01-f26a66fd71204f578a698d8d8eb4ec0d.jpg'
  if (m.includes('new_game_page_sprite')) return sprite
  if (m.includes('youtube_subscribe')) return '../../assets/ui/youtube_subscribe-50e0df78c6a4a7d13f5a96586f8a04b9.png'
  if (m.includes('new_back_to_game')) return '../../assets/ui/new_back_to_game-086e3bb00bb2857c9a77b45194fb634b.png'
  if (m.includes('join')) return '#ffb82b'
  if (m.includes('login')) return '#1a5276'
  if (m.includes('bar_fill')) return '#fcdb03'
  return '#0f75a5'
})
fs.writeFileSync(p, c)
console.log('remaining archive:', (c.match(/archive\.org/g) || []).length)
