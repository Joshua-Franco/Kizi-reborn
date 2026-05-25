/** Assets Kizi: rutas resueltas por nombre real de archivo en src/assets/ui */

import { categoryIconUrls, ui, uiByPrefix } from './assetCatalog'

export const KIZI_UI = {
  topBar: uiByPrefix('top-bar') ?? '',
  bodyBg: uiByPrefix('body-bg') ?? '',
  expBarFill: uiByPrefix('bar-fill') ?? '',
  joinBtn: ui('join.png'),
  joinBtnHover: ui('join-hover.png'),
  loginBtn: ui('login.png'),
  loginBtnHover: ui('login-hover.png'),
  topBarOver: uiByPrefix('top-bar-over') ?? '',
  newRibbon: ui('new-ribbon.png'),
  logo: ui('logo.png'),
  avatar: ui('avatar.png'),
  coins: ui('coins.png'),
  addCoins: ui('add-coins.png'),
  magnifier: ui('magnifier.png'),
  shield: ui('shield.png'),
  envelope: ui('envelope.png'),
  info: ui('info.png'),
  gamepageBgTop: ui('gamepage-bg-top.jpg'),
  gamepageBgFooter: ui('gamepage-bg-footer.jpg'),
  gamePageSprite: ui('game-page-sprite.png'),
  backToGame: ui('back-to-game.png'),
  youtubeSubscribe: ui('youtube-subscribe.png'),
} as const

export const KIZI_COLLECTIONS_IMAGES = {
  homepage: categoryIconUrls('homepage'),
  food: categoryIconUrls('food'),
  'dress-up': categoryIconUrls('dress-up'),
  racing: categoryIconUrls('racing'),
  alien: categoryIconUrls('alien'),
  strategy: categoryIconUrls('strategy'),
  'action-arcade': categoryIconUrls('action-arcade'),
  puzzle: categoryIconUrls('puzzle'),
} as const

/** @deprecated Usar KIZI_UI */
export const KIZI_ASSETS = KIZI_UI
