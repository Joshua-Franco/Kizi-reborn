import type { DisplaySize } from '../config/game-display-sizes'

/** Escala el juego para ocupar todo el viewport en pantalla completa (sin assets de fondo). */
export function scaleDisplaySizeForFullscreen(
  base: DisplaySize,
  viewportW: number,
  viewportH: number,
): DisplaySize {
  const aspect = base.height / base.width
  let width = viewportW
  let height = width * aspect
  if (height > viewportH) {
    height = viewportH
    width = height / aspect
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
  }
}
