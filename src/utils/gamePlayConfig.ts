import type { SelectedGame } from '../context/GameContext'
import type { GameEngine } from '../types/game'
import { displayNameFromSlug } from './assetCatalog'
import { resolveThumbForSlug } from './gameCatalog'
import {
  isThumbPlayable,
  resolveEngineForThumb,
  resolveInstalledGame,
  resolveInstallSlug,
} from './gameRegistry'

export type { GameEngine } from '../types/game'

export interface GamePlayConfig {
  slug: string
  installSlug: string
  name: string
  engine: GameEngine
  html5Url?: string
  swfUrl?: string
  thumb: string
  description: string
  tags: string[]
  playable: boolean
}

const DEFAULT_TAGS = ['Platform', '2 Players', 'Logic'] as const

export function resolveGamePlayConfig(
  thumbSlug: string,
  picked?: SelectedGame | null,
): GamePlayConfig {
  const installSlug = resolveInstallSlug(thumbSlug)
  const installed = resolveInstalledGame(installSlug)
  const usePicked = picked?.slug === thumbSlug

  const thumb = usePicked && picked.thumb ? picked.thumb : resolveThumbForSlug(thumbSlug)
  const name =
    usePicked && picked.name
      ? picked.name
      : installed?.name ?? displayNameFromSlug(thumbSlug)

  if (installed?.engine === 'flash' && installed.swfUrl) {
    return {
      slug: thumbSlug,
      installSlug: installed.slug,
      name,
      engine: 'flash',
      swfUrl: installed.swfUrl,
      thumb,
      description: 'Juego Flash local (Ruffle).',
      tags: ['Flash'],
      playable: true,
    }
  }

  if (installed?.engine === 'html5' && installed.html5Url) {
    return {
      slug: thumbSlug,
      installSlug: installed.slug,
      name,
      engine: 'html5',
      html5Url: installed.html5Url,
      thumb,
      description: 'Juego HTML5 local.',
      tags: [...DEFAULT_TAGS],
      playable: true,
    }
  }

  return {
    slug: thumbSlug,
    installSlug,
    name,
    engine: resolveEngineForThumb(thumbSlug),
    thumb,
    description:
      'Este juego no está instalado en src/games/games_html5 ni games_flashplayer. Añade la carpeta HTML o el archivo .swf y opcionalmente una entrada en thumb-to-game-map.ts.',
    tags: ['Games'],
    playable: false,
  }
}

/** @deprecated Usar resolveGamePlayConfig */
export function resolvePlayPageGameConfig(picked?: SelectedGame | null): GamePlayConfig {
  return resolveGamePlayConfig(
    picked?.slug ?? 'fireboy-watergirl-7-and-friends',
    picked,
  )
}

export { isThumbPlayable, resolveInstallSlug }
