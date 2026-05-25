import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'

const JS_MIME = 'application/javascript; charset=utf-8'

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': JS_MIME,
  '.mjs': JS_MIME,
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.swf': 'application/x-shockwave-flash',
  '.json': 'application/json; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.wasm': 'application/wasm',
}

/** Archivos guardados del navegador / GameDistribution con extensión incorrecta. */
function resolveMimeType(filePath: string): string {
  const base = path.basename(filePath)
  const lower = base.toLowerCase()
  const ext = path.extname(lower)

  if (lower.endsWith('.js.descarga') || ext === '.descarga') {
    return JS_MIME
  }

  if (/^f(\(\d+\))?\.txt$/.test(lower)) {
    return JS_MIME
  }

  if (lower === 'saved_resource' || lower === 'js' || lower === 'locus') {
    return JS_MIME
  }

  if (ext === '.crdownload' && /\.swf/i.test(lower)) {
    return 'application/x-shockwave-flash'
  }

  if (ext === '.crdownload') {
    return 'application/x-shockwave-flash'
  }

  if (MIME[ext]) {
    return MIME[ext]
  }

  return 'application/octet-stream'
}

export function serveGamesPlugin(): Plugin {
  const gamesRoot = path.resolve(process.cwd(), 'src/games')

  const serve = async (
    reqUrl: string,
    res: import('http').ServerResponse,
    next: () => void,
  ) => {
    if (!reqUrl.startsWith('/game-files/')) return next()

    const rel = decodeURIComponent(reqUrl.slice('/game-files/'.length).split('?')[0])
    const filePath = path.normalize(path.join(gamesRoot, rel))

    if (!filePath.startsWith(gamesRoot)) {
      res.statusCode = 403
      res.end()
      return
    }

    try {
      let stat = await fs.promises.stat(filePath)
      let target = filePath
      if (stat.isDirectory()) {
        target = path.join(filePath, 'index.html')
        stat = await fs.promises.stat(target)
      }
      res.setHeader('Content-Type', resolveMimeType(target))
      res.end(await fs.promises.readFile(target))
    } catch {
      next()
    }
  }

  const middleware = (
    req: import('http').IncomingMessage,
    res: import('http').ServerResponse,
    next: () => void,
  ) => {
    void serve(req.url ?? '', res, next)
  }

  return {
    name: 'serve-games',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
    closeBundle() {
      const out = path.resolve(process.cwd(), 'dist/game-files')
      fs.cpSync(gamesRoot, out, { recursive: true })
    },
  }
}
