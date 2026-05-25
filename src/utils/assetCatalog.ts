/**
 * Catálogo de imágenes por nombre real de archivo en src/assets.
 * No hardcodear rutas con hash: usar ui('logo.png') o listUiFiles().
 */

const uiGlob = import.meta.glob<string>('../assets/ui/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

const gamesGlob = import.meta.glob<string>('../assets/games/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

function fileNameFromPath(globPath: string): string {
  return globPath.split(/[/\\]/).pop() ?? globPath
}

function buildFileMap(glob: Record<string, string>): Map<string, string> {
  const map = new Map<string, string>()
  for (const [globPath, url] of Object.entries(glob)) {
    map.set(fileNameFromPath(globPath), url)
  }
  return map
}

const uiByFile = buildFileMap(uiGlob)
const gamesByFile = buildFileMap(gamesGlob)

/** URL del asset UI por nombre exacto en disco (ej. `logo.png`). */
export function ui(fileName: string): string {
  const url = uiByFile.get(fileName)
  if (!url) {
    console.warn(`[assetCatalog] UI no encontrado: ${fileName}`)
  }
  return url ?? ''
}

/** URL del thumb por nombre exacto del archivo (ej. `dynamons.jpg`). */
export function gameThumb(fileName: string): string {
  const url = gamesByFile.get(fileName)
  if (!url) {
    console.warn(`[assetCatalog] Thumb no encontrado: ${fileName}`)
  }
  return url ?? ''
}

export function listUiFiles(): string[] {
  return [...uiByFile.keys()].sort()
}

export function listGameThumbFiles(): string[] {
  return [...gamesByFile.keys()].sort()
}

export function uiByPrefix(prefix: string): string | undefined {
  const key = [...uiByFile.keys()].find((k) => k.startsWith(prefix))
  return key ? uiByFile.get(key) : undefined
}

export function gameThumbBySlug(slug: string): string | undefined {
  for (const [fileName, url] of gamesByFile) {
    if (fileNameToSlug(fileName) === slug) return url
  }
  return undefined
}

/** Nombre del archivo sin extensión, exactamente como en disco. */
export function fileNameToLabel(fileName: string): string {
  return fileName.replace(/\.[^.]+$/i, '')
}

/** Slug de URL derivado del nombre de archivo (cambia si renombras el archivo). */
export function fileNameToSlug(fileName: string): string {
  return fileNameToLabel(fileName)
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
}

/** @deprecated Usar fileNameToLabel — mismo comportamiento. */
export function fileNameToDisplayName(fileName: string): string {
  return fileNameToLabel(fileName)
}

export function displayNameFromSlug(slug: string): string {
  for (const fileName of listGameThumbFiles()) {
    if (fileNameToSlug(fileName) === slug) return fileNameToLabel(fileName)
  }
  return slug
}

export function fileNameFromSlug(slug: string): string | undefined {
  for (const fileName of listGameThumbFiles()) {
    if (fileNameToSlug(fileName) === slug) return fileName
  }
  return undefined
}

/** Tres estados de icono de categoría: `(1).png`, `(2).png`, `(3).png` */
export function categoryIconUrls(categoryId: string): [string, string, string] {
  return [1, 2, 3].map((n) => ui(`${categoryId}(${n}).png`)) as [string, string, string]
}
