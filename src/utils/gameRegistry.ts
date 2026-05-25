import { THUMB_TO_INSTALL_MAP } from '../config/thumb-to-game-map'
import type { GameEngine } from '../types/game'
import {
  findFlashGame,
  findHtml5Game,
  FLASH_GAMES,
  HTML5_GAMES,
  type InstalledFlashGame,
  type InstalledHtml5Game,
} from './gameCatalog'

export interface InstalledGame {
  engine: GameEngine
  slug: string
  name: string
  html5Url?: string
  swfUrl?: string
  folder?: string
  fileName?: string
}

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function fuzzyFindFlash(thumbSlug: string): InstalledFlashGame | undefined {
  const key = normalizeKey(thumbSlug)
  if (!key) return undefined

  return FLASH_GAMES.find((g) => {
    const gs = normalizeKey(g.slug)
    const gn = normalizeKey(g.name)
    return gs === key || gn === key || gs.includes(key) || key.includes(gs)
  })
}

function fuzzyFindHtml5(thumbSlug: string): InstalledHtml5Game | undefined {
  const key = normalizeKey(thumbSlug)
  if (!key) return undefined

  return HTML5_GAMES.find((g) => {
    const gs = normalizeKey(g.slug)
    const gn = normalizeKey(g.name)
    const gf = normalizeKey(g.folder)
    return (
      gs === key ||
      gn === key ||
      gf === key ||
      gs.includes(key) ||
      key.includes(gs) ||
      gf.includes(key) ||
      key.includes(gf)
    )
  })
}

/** Slug del thumb en la home → slug del juego instalado (mapa + heurística). */
export function resolveInstallSlug(thumbSlug: string): string {
  const mapped = THUMB_TO_INSTALL_MAP[thumbSlug]
  if (mapped) return mapped.installSlug

  if (findFlashGame(thumbSlug)) return thumbSlug
  if (findHtml5Game(thumbSlug)) return findHtml5Game(thumbSlug)!.slug

  const flash = fuzzyFindFlash(thumbSlug)
  if (flash) return flash.slug

  const html5 = fuzzyFindHtml5(thumbSlug)
  if (html5) return html5.slug

  return thumbSlug
}

export function resolveInstalledGame(installSlug: string): InstalledGame | null {
  const flash = findFlashGame(installSlug) ?? fuzzyFindFlash(installSlug)
  if (flash) {
    return {
      engine: 'flash',
      slug: flash.slug,
      name: flash.name,
      swfUrl: flash.swfUrl,
      fileName: flash.fileName,
    }
  }

  const html5 = findHtml5Game(installSlug) ?? fuzzyFindHtml5(installSlug)
  if (html5) {
    return {
      engine: 'html5',
      slug: html5.slug,
      name: html5.name,
      html5Url: html5.entryUrl,
      folder: html5.folder,
    }
  }

  return null
}

export function isThumbPlayable(thumbSlug: string): boolean {
  return resolveInstalledGame(resolveInstallSlug(thumbSlug)) !== null
}

export function resolveEngineForThumb(thumbSlug: string): GameEngine {
  const mapped = THUMB_TO_INSTALL_MAP[thumbSlug]
  if (mapped) return mapped.engine

  const installed = resolveInstalledGame(resolveInstallSlug(thumbSlug))
  if (installed) return installed.engine

  return 'html5'
}
