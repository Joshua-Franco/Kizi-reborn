/**
 * Tamaño del visor de juego por slug y contexto (home / play).
 * Edita width y height (px) para cada juego instalado en src/games/games_html5/
 */

export type DisplayContext = 'home' | 'play'

export interface DisplaySize {
  width: number
  height: number
}

const DEFAULTS: Record<DisplayContext, DisplaySize> = {
  play: { width: 900, height: 510 },
  home: { width: 720, height: 405 },
}

/** slug del juego (carpeta en games_html5) → tamaños por pantalla */
const BY_SLUG: Record<string, Partial<Record<DisplayContext, DisplaySize>>> = {
  'fireboy-watergirl-7-and-friends': {
    play: { width: 900, height: 510 },
    home: { width: 720, height: 405 },
  },
}

export function getGameDisplaySize(
  slug: string,
  context: DisplayContext,
  maxWidth?: number,
): DisplaySize {
  const base = { ...DEFAULTS[context], ...BY_SLUG[slug]?.[context] }

  if (!maxWidth || base.width <= maxWidth) return base

  const scale = maxWidth / base.width
  return {
    width: maxWidth,
    height: Math.round(base.height * scale),
  }
}
