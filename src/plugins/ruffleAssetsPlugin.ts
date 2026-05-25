import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'

function ruffleSourceDir(): string {
  return path.resolve(process.cwd(), 'node_modules/@ruffle-rs/ruffle')
}

function listRuffleAssetFiles(): string[] {
  const source = ruffleSourceDir()
  if (!fs.existsSync(source)) return []
  return fs.readdirSync(source).filter(
    (name) =>
      name === 'ruffle.js' ||
      (name.startsWith('core.ruffle.') && name.endsWith('.js')),
  )
}

function copyRuffleTo(targetDir: string): void {
  const source = ruffleSourceDir()
  fs.mkdirSync(targetDir, { recursive: true })

  for (const name of listRuffleAssetFiles()) {
    const from = path.join(source, name)
    if (!fs.existsSync(from)) {
      console.warn(`[ruffle-assets] Falta ${name} en ${source}`)
      continue
    }
    fs.copyFileSync(from, path.join(targetDir, name))
  }
}

function sendRuffleFile(
  filePath: string,
  res: import('http').ServerResponse,
  next: () => void,
): void {
  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      next()
      return
    }
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
    fs.createReadStream(filePath).pipe(res)
  })
}

/** Sirve /ruffle/* desde node_modules (dev) y copia a dist/ruffle (build). */
export function ruffleAssetsPlugin(): Plugin {
  const source = ruffleSourceDir()

  return {
    name: 'ruffle-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? ''
        if (!url.startsWith('/ruffle/')) return next()

        const rel = decodeURIComponent(url.slice('/ruffle/'.length))
        if (!rel || rel.includes('..')) {
          next()
          return
        }

        sendRuffleFile(path.join(source, rel), res, next)
      })
    },
    closeBundle() {
      copyRuffleTo(path.resolve(process.cwd(), 'dist/ruffle'))
    },
  }
}
