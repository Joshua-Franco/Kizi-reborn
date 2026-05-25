import {
  displayNameFromSlug,
  fileNameFromSlug,
  fileNameToDisplayName,
  fileNameToLabel,
  fileNameToSlug,
  gameThumb,
  gameThumbBySlug,
  listGameThumbFiles,
} from './assetCatalog'
import type { GameEngine } from '../types/game'

export const GAME_FILES_BASE = '/game-files'

const htmlGlobPaths = Object.keys(
  import.meta.glob('../games/games_html5/**/*.html', { eager: false }),
)

const htmlAllPaths = htmlGlobPaths

const flashGlobPaths = Object.keys(
  import.meta.glob('../games/games_flashplayer/**/*.{swf,crdownload}', { eager: false }),
)

function isMainHtml5Entry(globPath: string): boolean {
  if (globPath.includes('_files/')) return false
  const lower = globPath.toLowerCase()
  if (
    lower.includes('ads') ||
    lower.includes('saved_resource') ||
    lower.includes('bridge') ||
    lower.includes('zrt_lookup') ||
    lower.includes('aframe')
  ) {
    return false
  }
  const file = fileNameFromGlob(globPath)
  const parts = globPath.split(/[/\\]/)
  const folder = parts[parts.length - 2] ?? ''
  const base = file.replace(/\.html$/i, '')
  return base === folder || file.endsWith('.html') && !parts.includes('Nueva carpeta')
}

function fileNameFromGlob(globPath: string): string {
  return globPath.split(/[/\\]/).pop() ?? globPath
}

function globToGameFilesUrl(globPath: string): string {
  const rel = globPath.replace(/^\.\.\/games\//, '').replace(/\\/g, '/')
  return `${GAME_FILES_BASE}/${rel.split('/').map(encodeURIComponent).join('/')}`
}

function folderNameFromHtmlGlob(globPath: string): string {
  const parts = globPath.replace(/^\.\.\/games\/games_html5\//, '').split(/[/\\]/)
  return parts.length >= 2 ? parts[parts.length - 2] : parts[0] ?? ''
}

function pickHtml5EntryUrl(folder: string, mainGlobPath: string): string {
  const playEmbed = htmlAllPaths.find(
    (p) =>
      !p.includes('_files/') &&
      folderNameFromHtmlGlob(p) === folder &&
      fileNameFromGlob(p).toLowerCase() === 'play-embed.html',
  )
  if (playEmbed) return globToGameFilesUrl(playEmbed)
  return globToGameFilesUrl(mainGlobPath)
}

function slugFromFolderName(folder: string): string {
  return folder
    .replace(/&/g, 'and')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

export interface InstalledHtml5Game {
  slug: string
  name: string
  entryUrl: string
  folder: string
}

export interface InstalledFlashGame {
  slug: string
  name: string
  swfUrl: string
  fileName: string
}

export const HTML5_GAMES: InstalledHtml5Game[] = htmlGlobPaths
  .filter(isMainHtml5Entry)
  .map((globPath) => {
    const folder = folderNameFromHtmlGlob(globPath)
    const slug = slugFromFolderName(folder)
    return {
      slug,
      name: folder.replace(/_/g, ' ').trim(),
      entryUrl: pickHtml5EntryUrl(folder, globPath),
      folder,
    }
  })

const HTML5_BY_SLUG = new Map(HTML5_GAMES.map((g) => [g.slug, g]))

export const FLASH_GAMES: InstalledFlashGame[] = flashGlobPaths.map((globPath) => {
  const fileName = fileNameFromGlob(globPath)
  const base = fileName.replace(/\.(swf|crdownload)$/i, '')
  const slug = base
    .replace(/&/g, 'and')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
  return {
    slug,
    name: base,
    swfUrl: globToGameFilesUrl(globPath),
    fileName,
  }
})

const FLASH_BY_SLUG = new Map(FLASH_GAMES.map((g) => [g.slug, g]))

export function findHtml5Game(slug: string): InstalledHtml5Game | undefined {
  const direct = HTML5_BY_SLUG.get(slug)
  if (direct) return direct

  const lower = slug.toLowerCase()
  return HTML5_GAMES.find(
    (g) =>
      g.slug === lower ||
      g.slug.includes(lower) ||
      lower.includes(g.slug) ||
      g.folder.toLowerCase().includes(lower.replace(/-/g, ' ')),
  )
}

export function findFlashGame(slug: string): InstalledFlashGame | undefined {
  const direct = FLASH_BY_SLUG.get(slug)
  if (direct) return direct

  const lower = slug.toLowerCase()
  return FLASH_GAMES.find(
    (g) => g.slug === lower || g.slug.includes(lower) || lower.includes(g.slug),
  )
}

export function resolveThumbForSlug(slug: string): string {
  const fromSlug = gameThumbBySlug(slug)
  if (fromSlug) return fromSlug

  const lower = slug.toLowerCase()
  for (const fileName of listGameThumbFiles()) {
    const f = fileName.toLowerCase()
    if (f.includes(lower) || lower.includes(fileNameToSlug(fileName))) {
      return gameThumb(fileName)
    }
  }

  const first = listGameThumbFiles()[0]
  return first ? gameThumb(first) : ''
}

export function resolveEngineForSlug(slug: string): GameEngine {
  if (findFlashGame(slug)) return 'flash'
  if (findHtml5Game(slug)) return 'html5'
  if (slug.toLowerCase().includes('swf')) return 'flash'
  return 'html5'
}

export function defaultHtml5Game(): InstalledHtml5Game | undefined {
  return (
    HTML5_GAMES.find((g) => g.slug.includes('fireboy') || g.slug.includes('watergirl')) ??
    HTML5_GAMES[0]
  )
}

export {
  displayNameFromSlug,
  fileNameFromSlug,
  fileNameToDisplayName,
  fileNameToLabel,
  fileNameToSlug,
}
