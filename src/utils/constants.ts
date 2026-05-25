import type { Category } from '../types/game'

const CATEGORY_DEFS: Category[] = [
  { id: 'homepage', name: 'Homepage', image: '', path: '/' },
  { id: 'food', name: 'Food', image: '', path: '/food' },
  { id: 'dress-up', name: 'Dress up', image: '', path: '/dress-up' },
  { id: 'racing', name: 'Racing', image: '', path: '/racing' },
  { id: 'alien', name: 'Alien', image: '', path: '/alien' },
  { id: 'strategy', name: 'Strategy', image: '', path: '/strategy' },
  { id: 'action-arcade', name: 'Action', image: '', path: '/action-arcade' },
  { id: 'puzzle', name: 'Puzzle', image: '', path: '/puzzle' },
]

/** Sidebar en homepage: icono home + 7 categorías. */
export const SIDEBAR_CATEGORY_IDS_HOME = [
  'homepage',
  'food',
  'dress-up',
  'racing',
  'alien',
  'strategy',
  'action-arcade',
  'puzzle',
] as const

/** Sidebar en play-page: home + mismas categorías que homepage. */
export const SIDEBAR_CATEGORY_IDS_PLAY = [
  'homepage',
  'food',
  'dress-up',
  'racing',
  'alien',
  'strategy',
  'action-arcade',
  'puzzle',
] as const

const byId = Object.fromEntries(CATEGORY_DEFS.map((c) => [c.id, c])) as Record<
  string,
  Category
>

export const CATEGORIES = CATEGORY_DEFS

export function sidebarCategoriesForRoute(isPlayPage: boolean): Category[] {
  const ids = isPlayPage ? SIDEBAR_CATEGORY_IDS_PLAY : SIDEBAR_CATEGORY_IDS_HOME
  return ids.map((id) => byId[id])
}

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'pl', name: 'Polski' },
  { code: 'he', name: 'עברית' },
]
