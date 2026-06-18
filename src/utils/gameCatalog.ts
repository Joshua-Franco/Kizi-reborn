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

export const GAME_FILES_BASE = '/Kizi-reborn/games'

// ── Static manifest ────────────────────────────────────────────

const HTML5_GAME_FOLDERS: Array<{ folder: string; mainHtml: string }> = [
  {
    folder: 'Fireboy & Watergirl 7_ and Friends',
    mainHtml: 'play-embed.html',
  },
]

const FLASH_SWF_FILES: string[] = [
  'papascheeseria_102.swf',
  'papasburgeria.swf',
  'papasbakeria.swf',
  'papalouie_v2.swf',
  'PapaLouie3.swf',
  'PapaLouie2.swf',
  'Mario_Combat.swf',
  'jacksmith.swf',
  'duck-life-4_20210406.swf',
  'cactusmccoy2.swf',
  'cactusmccoy.swf',
  'papaspastaria (1).swf',
  'papaspancakeria.swf',
  'papaspancakeria (1).swf',
  'papashotdoggeria.swf',
  'papashotdoggeria (1).swf',
  'papasfreezeria.swf',
  'papasdonuteria.swf',
  'papascupcakeria.swf',
  'papasscooperia_v102.swf',
  'papaspizzeria_v2.swf',
  'papaspastaria.swf',
  'snail-bob-2.swf',
  'snail-bob-3.swf',
  'snail-bob-6-winter-story.swf',
  'snail-bob-5-love-story.swf',
  'snail-bob-7-fantasy-story.swf',
  'snail-bob-8-island-story.swf',
  'snail-bob-space.swf',
  'snail-bob.swf',
  'Wheely.swf',
  'Wheely2.swf',
  'Wheely5.swf',
  'Wheely4.swf',
  'Wheely3.swf',
  'Wheely7.swf',
  'Wheely6.swf',
  'Wheely8.swf',
]

// ── URL builders ───────────────────────────────────────────────

function html5GameUrl(folder: string, file: string): string {
  const parts = ['games_html5', folder, file]
  return `${GAME_FILES_BASE}/${parts.map(encodeURIComponent).join('/')}`
}

function flashSwfUrl(fileName: string): string {
  return `${GAME_FILES_BASE}/games_flashplayer/${encodeURIComponent(fileName)}`
}

function slugFromFolderName(folder: string): string {
  return folder
    .replace(/&/g, 'and')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

function slugFromFlashFile(fileName: string): string {
  return fileName
    .replace(/\.(swf|crdownload)$/i, '')
    .replace(/&/g, 'and')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

// ── Exported interfaces ────────────────────────────────────────

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

// ── Built from static manifest ─────────────────────────────────

export const HTML5_GAMES: InstalledHtml5Game[] = HTML5_GAME_FOLDERS.map((entry) => {
  const slug = slugFromFolderName(entry.folder)
  return {
    slug,
    name: entry.folder.replace(/_/g, ' ').trim(),
    entryUrl: html5GameUrl(entry.folder, entry.mainHtml),
    folder: entry.folder,
  }
})

const HTML5_BY_SLUG = new Map(HTML5_GAMES.map((g) => [g.slug, g]))

export const FLASH_GAMES: InstalledFlashGame[] = FLASH_SWF_FILES.map((fileName) => {
  const slug = slugFromFlashFile(fileName)
  return {
    slug,
    name: fileName.replace(/\.(swf|crdownload)$/i, ''),
    swfUrl: flashSwfUrl(fileName),
    fileName,
  }
})

const FLASH_BY_SLUG = new Map(FLASH_GAMES.map((g) => [g.slug, g]))

// ── Lookup helpers ─────────────────────────────────────────────

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
