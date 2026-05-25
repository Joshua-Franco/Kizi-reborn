import type { SelectedGame } from '../context/GameContext'
import {
  PLAY_PAGE_EMBED_URL,
  PLAY_PAGE_GAME_META,
  PLAY_PAGE_GAME_SLUG,
} from '../config/play-page-game'
import {
  findFlashGame,
  findHtml5Game,
  defaultHtml5Game,
  resolveEngineForSlug,
  resolveThumbForSlug,
} from './gameCatalog'
import { fileNameToDisplayName } from './assetCatalog'

export type GameEngine = 'html5' | 'flash'

export interface GamePlayConfig {
  slug: string
  name: string
  engine: GameEngine
  html5Url?: string
  swfUrl?: string
  thumb: string
  description: string
  tags: string[]
}

/** Configuración fija de la play-page: siempre Fireboy & Watergirl 7. */
export function resolvePlayPageGameConfig(picked?: SelectedGame | null): GamePlayConfig {
  const slug = PLAY_PAGE_GAME_SLUG
  const usePicked = picked?.slug === slug
  const thumb = usePicked && picked.thumb ? picked.thumb : PLAY_PAGE_GAME_META.thumb || resolveThumbForSlug(slug)
  const name = usePicked && picked.name ? picked.name : PLAY_PAGE_GAME_META.name

  const html5 = findHtml5Game(slug) ?? defaultHtml5Game()
  if (html5) {
    return {
      slug,
      name: html5.name || name,
      engine: 'html5',
      html5Url: PLAY_PAGE_EMBED_URL,
      thumb,
      description: PLAY_PAGE_GAME_META.description,
      tags: [...PLAY_PAGE_GAME_META.tags],
    }
  }

  const flash = findFlashGame(slug)
  if (flash) {
    return {
      slug,
      name,
      engine: 'flash',
      swfUrl: flash.swfUrl,
      thumb,
      description: PLAY_PAGE_GAME_META.description,
      tags: [...PLAY_PAGE_GAME_META.tags],
    }
  }

  return {
    slug,
    name,
    engine: resolveEngineForSlug(slug),
    thumb,
    description: PLAY_PAGE_GAME_META.description,
    tags: [...PLAY_PAGE_GAME_META.tags],
  }
}

export function resolveGamePlayConfig(slug: string, picked?: SelectedGame | null): GamePlayConfig {
  const usePicked = picked?.slug === slug
  const thumb = usePicked ? picked.thumb : resolveThumbForSlug(slug)
  const name = usePicked ? picked.name : fileNameToDisplayName(slug)

  const flash = findFlashGame(slug)
  if (flash) {
    return {
      slug,
      name,
      engine: 'flash',
      swfUrl: flash.swfUrl,
      thumb,
      description: 'Flash game',
      tags: ['Flash'],
    }
  }

  const html5 = findHtml5Game(slug)
  if (html5) {
    return {
      slug,
      name: html5.name,
      engine: 'html5',
      html5Url: html5.entryUrl,
      thumb,
      description: 'Play this HTML5 game locally.',
      tags: ['HTML5'],
    }
  }

  return {
    slug,
    name,
    engine: resolveEngineForSlug(slug),
    thumb,
    description: 'Play this game on Kizi.',
    tags: ['Games'],
  }
}
