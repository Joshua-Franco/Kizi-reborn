/**
 * Renombra assets UI con sufijos hash a nombres legibles.
 * La web indexa por nombre de archivo real (assetCatalog.ts).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const uiDir = path.join(root, 'src', 'assets', 'ui')

/** nombre actual → nombre normal en disco */
const RENAME_MAP = {
  'logo-5de3c5c1780841bd6b51a8ca36bce9c7.png': 'logo.png',
  'missing_avatar_medium-392dc8ea63046044f92b68fae656614d.png': 'avatar.png',
  'coins-b0c4a9e2dd40550e61f8ead802d16d6a.png': 'coins.png',
  'coins_new-57fd8099557e00ffbf32832eedfed910.png': 'coins-new.png',
  'add_coins-64cadcd2c044bd9d071dbad85b5f26f5.png': 'add-coins.png',
  'magnifier-39e99762ce03caaa937c3500ec1f863e.png': 'magnifier.png',
  'small_shield-e53da49caa2900535c33f8aa8840e2cc.png': 'shield.png',
  'small_envlope-1ea7ccd3166e293a7a8dd0640f0aa376.png': 'envelope.png',
  'small_info-8ae78864e78dd46d7179236434a17301.png': 'info.png',
  'en-d44f81705c19a6f9731b6312a579b6ed.png': 'en.png',
  'es-907a4f2b14c8babde49de3704ebdfef5.png': 'es.png',
  'pt-91285b64d1e1673086154985f8511cbe.png': 'pt.png',
  'ru-3f46a127965e7806150437f8e0145804.png': 'ru.png',
  'de-81e11949506188316e316776a2f3c9e8.png': 'de.png',
  'fr-a11694018bc019ad66d33bcdd8c2085f.png': 'fr.png',
  'pl-3abcd64dc663ac1bc1f8c9e254826d64.png': 'pl.png',
  'he-d2311a2eb179790ed2013382f2eacbc3.png': 'he.png',
  'gamepage_bg_top_01-4df3eab5fa758e26fba83e64fbbf4b5e.jpg': 'gamepage-bg-top.jpg',
  'gamepage_bg_footer_01-f26a66fd71204f578a698d8d8eb4ec0d.jpg': 'gamepage-bg-footer.jpg',
  'new_game_page_sprite-5e0d69d6c652a66b3f7ec1c5c4945ccd (1).png': 'game-page-sprite.png',
  'new_back_to_game-086e3bb00bb2857c9a77b45194fb634b.png': 'back-to-game.png',
  'new_ribbon_new_img-69cacfca2a3c970477aa01146098ee1b.png': 'new-ribbon.png',
  'youtube_subscribe-50e0df78c6a4a7d13f5a96586f8a04b9.png': 'youtube-subscribe.png',
  'multiplayer-978206bf4a9520467fe7dde6aef62124.png': 'multiplayer.png',
}

/** Ya en disco con nombre legible; no renombrar */
const SKIP_IF_DEST_EXISTS = new Set([
  'join.png',
  'join-hover.png',
  'login.png',
  'login-hover.png',
])

function renameFlashDownloads() {
  const flashDir = path.join(root, 'src', 'games', 'games_flashplayer')
  if (!fs.existsSync(flashDir)) return
  for (const name of fs.readdirSync(flashDir)) {
    if (!name.endsWith('.crdownload')) continue
    const src = path.join(flashDir, name)
    const base = name.replace(/\.crdownload$/i, '').trim()
    const dest = path.join(flashDir, `${base}.swf`)
    if (!fs.existsSync(dest)) {
      fs.renameSync(src, dest)
      console.log('flash:', name, '→', `${base}.swf`)
    }
  }
}

function main() {
  for (const [from, to] of Object.entries(RENAME_MAP)) {
    const src = path.join(uiDir, from)
    const dest = path.join(uiDir, to)
    if (!fs.existsSync(src)) {
      if (fs.existsSync(dest) || SKIP_IF_DEST_EXISTS.has(to)) continue
      console.warn('skip (missing):', from)
      continue
    }
    if (fs.existsSync(dest) && path.resolve(src) !== path.resolve(dest)) {
      fs.unlinkSync(src)
      console.log('removed duplicate:', from)
      continue
    }
    fs.renameSync(src, dest)
    console.log('ui:', from, '→', to)
  }
  renameFlashDownloads()
}

main()
