import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const p = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'pages', 'Play', 'Play.css')
let c = fs.readFileSync(p, 'utf8')

const fixes = [
  ['background: var(--play-sprite, var(--play-sprite).png")) no-repeat -275px -62px;', 'background: var(--play-sprite) no-repeat -275px -62px;'],
  ['background: var(--play-sprite).png") -0px -230px no-repeat;', 'background: var(--play-sprite) -0px -230px no-repeat;'],
  ['background: var(--play-sprite).png") -0px -150px no-repeat;', 'background: var(--play-sprite) -0px -150px no-repeat;'],
  ['background: var(--play-sprite).png") -30px -30px no-repeat;', 'background: var(--play-sprite) -30px -30px no-repeat;'],
  ['background: var(--play-sprite).png) -30px -60px no-repeat;', 'background: var(--play-sprite) -30px -60px no-repeat;'],
  ['background: var(--play-sprite).png) 0px -60px no-repeat;', 'background: var(--play-sprite) 0px -60px no-repeat;'],
  ['background: var(--play-sprite).png) -5px -36px no-repeat;', 'background: var(--play-sprite) -5px -36px no-repeat;'],
  ['background: var(--play-sprite).png) -6px -6px no-repeat;', 'background: var(--play-sprite) -6px -6px no-repeat;'],
  ['background: var(--play-sprite).png") -90px -30px no-repeat;', 'background: var(--play-sprite) -90px -30px no-repeat;'],
  ['background: var(--play-sprite).png") -90px -230px no-repeat;', 'background: var(--play-sprite) -90px -230px no-repeat;'],
  ['background: var(--play-sprite).png") -40px -150px no-repeat;', 'background: var(--play-sprite) -40px -150px no-repeat;'],
  ['background: var(--play-sprite).png") -60px -30px no-repeat;', 'background: var(--play-sprite) -60px -30px no-repeat;'],
]

for (const [from, to] of fixes) {
  if (!c.includes(from)) console.warn('missing:', from.slice(0, 60))
  c = c.replace(from, to)
}

fs.writeFileSync(p, c)
console.log('broken left:', (c.match(/play-sprite\)\.png/g) || []).length)
