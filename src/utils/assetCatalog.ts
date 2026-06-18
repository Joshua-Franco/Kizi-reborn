const BASE_URL = import.meta.env.BASE_URL

const UI_FILES = [
  'action-arcade(1).png', 'action-arcade(2).png', 'action-arcade(3).png',
  'add-coins.png', 'alien(1).png', 'alien(2).png', 'alien(3).png',
  'avatar.png', 'back-to-game.png', 'coins-new.png', 'coins.png',
  'de.png', 'dress-up(1).png', 'dress-up(2).png', 'dress-up(3).png',
  'en.png', 'envelope.png', 'es.png',
  'food(1).png', 'food(2).png', 'food(3).png', 'fr.png',
  'game-page-sprite.png', 'gamepage-bg-footer.jpg', 'gamepage-bg-top.jpg',
  'he.png', 'homepage(1).png', 'homepage(2).png', 'homepage(3).png',
  'info.png', 'join-hover.png', 'join.png',
  'login-hover.png', 'login.png', 'logo.png',
  'magnifier.png', 'multiplayer.png',
  'new-ribbon.png', 'pl.png', 'pt.png',
  'puzzle(1).png', 'puzzle(2).png', 'puzzle(3).png',
  'racing(1).png', 'racing(2).png', 'racing(3).png', 'ru.png',
  'shield.png', 'strategy(1).png', 'strategy(2).png', 'strategy(3).png',
  'youtube-subscribe.png',
]

const GAME_THUMB_FILES = [
  '3-pandas-at-night.jpg', '3-pandas-in-brazil.jpg', '3-pandas-in-japan.jpg',
  '3pandas-in-fantasy.jpg', '3pandas.jpg',
  'bad-ice-cream.jpg', 'blue-creature.jpg',
  'bob-the-robber-2.jpg', 'bob-the-robber-3.jpg',
  'bob-the-robber-4-russia.jpg', 'bob-the-robber-4-temple.jpg',
  'bob-the-robber-4.jpg', 'bob-the-robber.jpg',
  'candy-crush-saga.jpg', 'candy-rain.jpg', 'car-eats-car.jpg',
  'cover-orange-players-pack-2.jpg', 'cover-oranges-pirates.jpg',
  'dead-tree-defender.jpg', 'dino-shift-2.jpg',
  'duck-life-3-evolution.jpg', 'duck-life-4.jpg', 'duck-life-space.jpg',
  'duck-life-treasure-hunt.jpg', 'ducklife3.jpg', 'dynamons.jpg',
  'fancy-pants-adventure-3.jpg', 'fancy-pants-adventure.jpg',
  'fancy-pants-world-1-remix.jpg', 'fancypants-adventure.jpg',
  'farm-days.jpg',
  'fireboy-watergirl-1-forest-temple.jpg', 'fireboy-watergirl-2-light-temple.jpg',
  'fireboy-watergirl-3-ice-temple.jpg', 'fireboy-watergirl-5-elements.jpg',
  'fireboy-watergirl-6-fairy-tales.jpg', 'fireboy-watergirl-7-and-friends.jpg',
  'fireboy-watergirl-classic.jpg', 'fish-always-online.jpg',
  'frogout.jpg', 'ghost.jpg', 'glance.jpg', 'goo-fighters.jpg',
  'goodgame-empire.jpg', 'headless-zombie.jpg', 'hippo-feeder.jpg',
  'home-sheep-home-2.jpg', 'hydrophobia.jpg',
  'idle-heroes.jpg', 'jacksmith.jpg',
  'knights-and-brides.jpg',
  'money-movers-2-kizi.jpg', 'money-movers-2.jpg', 'money-movers-3.jpg',
  'money-movers-maker-large.jpg', 'money-movers-maker.jpg', 'money-movers.jpg',
  'neogp.jpg', 'ninja-miner.jpg', 'ninja-painter-2.jpg',
  'papa-louie-character.jpg',
  'papas-bakeria.jpg', 'papas-burgeria.jpg', 'papas-cheeseria.jpg',
  'papas-cupcakeria.jpg', 'papas-donuteria.jpg', 'papas-freezeria.jpg',
  'papas-hot-doggeria.jpg',
  'papas-louie-1-when-pizzas-attack.jpg', 'papas-louie-2-when-burgers-attack.jpg',
  'papas-louie-3-when-sundaes-attack.jpg',
  'papas-pancakeria.jpg', 'papas-pastaria.jpg', 'papas-pizzeria.jpg',
  'papas-scooperia.jpg', 'papas-sushiria.jpg', 'papas-wingeria.jpg',
  'penguin-dinner.jpg',
  'red-ball-2.jpg', 'redball.jpg', 'redball3-original.jpg', 'redball3.jpg',
  'siege-hero.jpg', 'snail-bob-2.jpg', 'snail-bob-3.jpg',
  'soccer-brazil.jpg', 'spy-mouse.jpg', 'super-mechs.jpg',
  'sushi-cat-2.jpg',
  'the-last-survivors.jpg', 'twin-cat-warrior.jpg',
  'wheely-1.jpg', 'wheely-3.jpg', 'wheely-4.jpg', 'wheely-5.jpg',
  'wheely-6.jpg', 'wheely-7.jpg', 'wheely-8.jpg',
]

const UI_BY_FILE = new Map(UI_FILES.map((f) => [f, `${BASE_URL}ui/${f}`]))
const GAMES_BY_FILE = new Map(GAME_THUMB_FILES.map((f) => [f, `${BASE_URL}games_ui/${f}`]))

export function ui(fileName: string): string {
  const url = UI_BY_FILE.get(fileName)
  if (!url) {
    console.warn(`[assetCatalog] UI no encontrado: ${fileName}`)
  }
  return url ?? ''
}

export function gameThumb(fileName: string): string {
  const url = GAMES_BY_FILE.get(fileName)
  if (!url) {
    console.warn(`[assetCatalog] Thumb no encontrado: ${fileName}`)
  }
  return url ?? ''
}

export function listUiFiles(): string[] {
  return [...UI_FILES]
}

export function listGameThumbFiles(): string[] {
  return [...GAME_THUMB_FILES]
}

export function uiByPrefix(prefix: string): string | undefined {
  const key = UI_FILES.find((k) => k.startsWith(prefix))
  return key ? UI_BY_FILE.get(key) : undefined
}

export function gameThumbBySlug(slug: string): string | undefined {
  for (const fileName of GAME_THUMB_FILES) {
    if (fileNameToSlug(fileName) === slug) return GAMES_BY_FILE.get(fileName)
  }
  return undefined
}

export function fileNameToLabel(fileName: string): string {
  return fileName.replace(/\.[^.]+$/i, '')
}

export function fileNameToSlug(fileName: string): string {
  return fileNameToLabel(fileName)
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

export function displayNameFromSlug(slug: string): string {
  for (const fileName of GAME_THUMB_FILES) {
    if (fileNameToSlug(fileName) === slug) return fileNameToLabel(fileName)
  }
  return slug
}

export function fileNameFromSlug(slug: string): string | undefined {
  for (const fileName of GAME_THUMB_FILES) {
    if (fileNameToSlug(fileName) === slug) return fileName
  }
  return undefined
}

/** @deprecated Usar fileNameToLabel — mismo comportamiento. */
export function fileNameToDisplayName(fileName: string): string {
  return fileNameToLabel(fileName)
}

export function categoryIconUrls(categoryId: string): [string, string, string] {
  return [1, 2, 3].map((n) => ui(`${categoryId}(${n}).png`)) as [string, string, string]
}
