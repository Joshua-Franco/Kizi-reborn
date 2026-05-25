import type { GameEngine } from '../types/game'

export interface ThumbInstallLink {
  engine: GameEngine
  /** Slug del juego en games_flashplayer o games_html5 (carpeta/SWF). */
  installSlug: string
}

/**
 * Enlaces explícitos thumb (slug del JPG) → juego instalado.
 * Añade entradas cuando el nombre del thumb no coincide con la carpeta/SWF.
 */
export const THUMB_TO_INSTALL_MAP: Record<string, ThumbInstallLink> = {
  'fireboy-watergirl-7-and-friends': {
    engine: 'html5',
    installSlug: 'fireboy-watergirl-7-and-friends',
  },
  'fireboy-watergirl-classic': {
    engine: 'html5',
    installSlug: 'fireboy-watergirl-7-and-friends',
  },
}
