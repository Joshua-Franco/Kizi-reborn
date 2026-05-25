import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const p = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'pages', 'Play', 'Play.css')
let c = fs.readFileSync(p, 'utf8')
c = c.replace(/url\([^)]*new_game_page_sprite[^)]*\)/g, 'var(--play-sprite)')
fs.writeFileSync(p, c)
console.log('done')
