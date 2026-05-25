import { useEffect, useRef } from 'react'
import type { GameEngine } from '../../utils/gamePlayConfig'
import './GamePlayer.css'

declare global {
  interface Window {
    RufflePlayer?: {
      newest: () => {
        createPlayer: () => RufflePlayerElement
      }
    }
  }
}

interface RufflePlayerElement extends HTMLElement {
  width: number | string
  height: number | string
  load: (url: string) => void
}

interface GamePlayerProps {
  engine: GameEngine
  /** Ruta local servida desde src/games/games_html5/ (vía /game-files/...) */
  html5Url?: string
  swfUrl?: string
  title: string
  width: number
  height: number
}

export default function GamePlayer({
  engine,
  html5Url,
  swfUrl,
  title,
  width,
  height,
}: GamePlayerProps) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (engine !== 'flash' || !swfUrl || !hostRef.current) return

    const host = hostRef.current
    let cancelled = false

    void import('@ruffle-rs/ruffle').then(() => {
      if (cancelled || !hostRef.current) return
      host.innerHTML = ''

      const ruffle = window.RufflePlayer?.newest()
      const player = ruffle?.createPlayer()
      if (!player) return

      player.style.width = '100%'
      player.style.height = '100%'
      host.appendChild(player)
      player.load(swfUrl)
    })

    return () => {
      cancelled = true
      host.innerHTML = ''
    }
  }, [engine, swfUrl])

  if (engine === 'html5' && html5Url) {
    return (
      <div
        className="game-player game-player--html5"
        style={
          {
            '--game-display-width': `${width}px`,
            '--game-display-height': `${height}px`,
            width,
            height,
          } as React.CSSProperties
        }
      >
        <iframe
          src={html5Url}
          className="game-player__embed"
          title={title}
          aria-label={title}
          allow="fullscreen; gamepad; autoplay"
        />
      </div>
    )
  }

  return (
    <div
      className="game-player game-player--flash"
      ref={hostRef}
      style={
        {
          '--game-display-width': `${width}px`,
          '--game-display-height': `${height}px`,
          width,
          height,
        } as React.CSSProperties
      }
      aria-label={title}
    />
  )
}
