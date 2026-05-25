/** UI Play: nombres reales en src/assets/ui (ver assetCatalog.ts) */

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
    gameThumbBySlug('fireboy-and-watergirl-the-light-temple') ??
    gameThumbBySlug('thumb150-fbwg2-150x150') ??
    gameThumbBySlug('thumb150-fireboy-and-watergirl-7-and-friends-150x150') ??
    '',
} as const
