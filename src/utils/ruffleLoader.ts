declare global {
  interface Window {
    RufflePlayer?: {
      config?: { publicPath?: string }
      newest: () => {
        createPlayer: () => HTMLElement & { load: (url: string) => void }
      }
    }
  }
}

let loadPromise: Promise<void> | null = null

function rufflePublicPath(): string {
  const base = import.meta.env.BASE_URL || '/'
  return new URL('ruffle/', base).href
}

function ruffleScriptUrl(): string {
  const base = import.meta.env.BASE_URL || '/'
  return new URL('ruffle/ruffle.js', base).href
}

/** Carga Ruffle con publicPath absoluto (evita ChunkLoadError en /games/:slug). */
export function ensureRuffleLoaded(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()

  try {
    window.RufflePlayer?.newest()
    return Promise.resolve()
  } catch {
    /* aún no cargado */
  }

  if (loadPromise) return loadPromise

  loadPromise = new Promise<void>((resolve, reject) => {
    const ruffle = (window.RufflePlayer ?? {}) as any
    ruffle.config = { ...ruffle.config, publicPath: rufflePublicPath() }
    window.RufflePlayer = ruffle

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-ruffle-loader="true"]',
    )
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Ruffle load failed')), {
        once: true,
      })
      return
    }

    const script = document.createElement('script')
    script.src = ruffleScriptUrl()
    script.async = true
    script.dataset.ruffleLoader = 'true'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`No se pudo cargar ${script.src}`))
    document.head.appendChild(script)
  })

  return loadPromise
}
