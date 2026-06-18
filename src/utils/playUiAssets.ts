/** UI Play: rutas resueltas desde public/ui via assetCatalog */

import { KIZI_UI } from './kiziAssets'
import { gameThumbBySlug, ui } from './assetCatalog'

export const PLAY_UI = {
  sprite: KIZI_UI.gamePageSprite,
  bgTop: KIZI_UI.gamepageBgTop,
  bgFooter: KIZI_UI.gamepageBgFooter,
  logo: KIZI_UI.logo,
  avatar: KIZI_UI.avatar,
  coins: KIZI_UI.coins,
  addCoins: KIZI_UI.addCoins,
  magnifier: KIZI_UI.magnifier,
  flagEn: ui('en.png'),
  youtubeSubscribe: KIZI_UI.youtubeSubscribe,
  backToGame: KIZI_UI.backToGame,
  thumbFbw2:
    gameThumbBySlug('fireboy-watergirl-2-light-temple') ??
    gameThumbBySlug('fireboy-watergirl-7-and-friends') ??
    '',
} as const
