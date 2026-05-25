import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const p = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'pages', 'Play', 'Play.css')
let c = fs.readFileSync(p, 'utf8')
c = c.replace(
  /background:\s*var\(--play-sprite\)\s*([^;]+);/g,
  (_, rest) => {
    const r = rest.trim()
    if (r.startsWith('no-repeat')) return `background: var(--play-sprite) ${r};`
    return `background: var(--play-sprite) no-repeat ${r};`
  },
)
fs.writeFileSync(p, c)
