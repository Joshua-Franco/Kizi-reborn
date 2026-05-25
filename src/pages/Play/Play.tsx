import { Link, useParams } from '@tanstack/react-router'
import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import GamePlayer from '../../components/GamePlayer/GamePlayer'
import { IconFullscreenEnter, IconFullscreenExit } from '../../components/PlayFullscreenIcons'
import {
  PLAY_FOOTER_GAP_TOP_PX,
  PLAY_GAME_SECTION_TOP_OFFSET_PX,
  PLAY_GAME_SECTION_WIDTH_PX,
  PLAY_VIDEO_BAR_PADDING_X_PX,
  PLAY_VIDEO_BAR_PADDING_Y_PX,
  PLAY_VIDEO_SECTION_WIDTH_PX,
  PLAY_WALKTHROUGH_GAP_BOTTOM_PX,
  PLAY_WALKTHROUGH_GAP_TOP_PX,
} from '../../config/play-page-layout'
import { getGameDisplaySize } from '../../config/game-display-sizes'
import { resolveGamePlayConfig } from '../../utils/gamePlayConfig'
import { useGameContext } from '../../context/GameContext'
import { PLAY_UI } from '../../utils/playUiAssets'
import { useKiziLayout } from '../../hooks/useKiziLayout'
import {
  exitDocumentFullscreen,
  isElementFullscreen,
  requestElementFullscreen,
} from '../../utils/fullscreen'
import { scaleDisplaySizeForFullscreen } from '../../utils/gameFullscreenSize'
import './Play.css'

const YOUTUBE_CHANNEL = 'https://www.youtube.com/channel/UCck7Z-kFLZRSjD6eAqqkLEA?sub_confirmation=1'
const WALKTHROUGH_VIDEO = 'https://www.youtube.com/embed/n4p8K_lq1eU'

export default function Play() {
  const { slug: routeSlug } = useParams({ from: '/games/$slug' })
  const { selectedGame } = useGameContext()
  const game = useMemo(
    () => resolveGamePlayConfig(routeSlug, selectedGame),
    [routeSlug, selectedGame],
  )
  const layout = useKiziLayout()
  const gameBoxRef = useRef<HTMLDivElement>(null)
  const gameViewportRef = useRef<HTMLDivElement>(null)

  const [likes, setLikes] = useState(980815)
  const [dislikes, setDislikes] = useState(195299)
  const [userRating, setUserRating] = useState<'up' | 'down' | null>(null)
  const [isGameFullscreen, setIsGameFullscreen] = useState(false)

  const maxGameWidth = Math.min(
    PLAY_GAME_SECTION_WIDTH_PX - 24,
    layout.gameDivWidth - layout.wrapperMargin * 2 - 24,
  )
  const displaySize = useMemo(
    () => getGameDisplaySize(game.installSlug, 'play', maxGameWidth),
    [game.installSlug, maxGameWidth],
  )

  const [fullscreenSize, setFullscreenSize] = useState(displaySize)

  const activeGameSize = isGameFullscreen ? fullscreenSize : displaySize

  const syncFullscreenState = useCallback(() => {
    const el = gameViewportRef.current
    const active = el ? isElementFullscreen(el) : false
    setIsGameFullscreen(active)
    if (active) {
      setFullscreenSize(
        scaleDisplaySizeForFullscreen(displaySize, window.innerWidth, window.innerHeight),
      )
    }
  }, [displaySize])

  useEffect(() => {
    document.addEventListener('fullscreenchange', syncFullscreenState)
    document.addEventListener('webkitfullscreenchange', syncFullscreenState)
    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreenState)
      document.removeEventListener('webkitfullscreenchange', syncFullscreenState)
    }
  }, [syncFullscreenState])

  useEffect(() => {
    if (!isGameFullscreen) setFullscreenSize(displaySize)
  }, [displaySize, isGameFullscreen])

  useEffect(() => {
    if (!isGameFullscreen) return
    const onResize = () => {
      setFullscreenSize(
        scaleDisplaySizeForFullscreen(displaySize, window.innerWidth, window.innerHeight),
      )
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [isGameFullscreen, displaySize])

  const enterGameFullscreen = async () => {
    const el = gameViewportRef.current
    if (!el) return
    try {
      setFullscreenSize(
        scaleDisplaySizeForFullscreen(displaySize, window.innerWidth, window.innerHeight),
      )
      await requestElementFullscreen(el)
      syncFullscreenState()
    } catch {
      /* usuario canceló o API no disponible */
    }
  }

  const exitGameFullscreen = async () => {
    try {
      await exitDocumentFullscreen()
    } catch {
      /* ya salió */
    }
  }

  const hasPlayable = game.playable && Boolean(game.html5Url || game.swfUrl)

  useEffect(() => {
    document.title = `${game.name} | Kizi - Online Games - Life Is Fun!`
  }, [game.name])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleRateUp = () => {
    if (userRating === 'up') {
      setLikes((p) => p - 1)
      setUserRating(null)
    } else {
      if (userRating === 'down') setDislikes((p) => p - 1)
      setLikes((p) => p + 1)
      setUserRating('up')
    }
  }

  const handleRateDown = () => {
    if (userRating === 'down') {
      setDislikes((p) => p - 1)
      setUserRating(null)
    } else {
      if (userRating === 'up') setLikes((p) => p - 1)
      setDislikes((p) => p + 1)
      setUserRating('down')
    }
  }

  const contentMargin = `${layout.wrapperMargin}px`

  return (
    <div
      className="play-page"
      style={
        {
          '--play-sprite': `url(${PLAY_UI.sprite})`,
          '--play-game-section-width': `${PLAY_GAME_SECTION_WIDTH_PX}px`,
          '--play-video-section-width': `${PLAY_VIDEO_SECTION_WIDTH_PX}px`,
          '--play-footer-gap-top': `${PLAY_FOOTER_GAP_TOP_PX}px`,
          '--play-game-section-top-offset': `${PLAY_GAME_SECTION_TOP_OFFSET_PX}px`,
          '--play-walkthrough-gap-top': `${PLAY_WALKTHROUGH_GAP_TOP_PX}px`,
          '--play-walkthrough-gap-bottom': `${PLAY_WALKTHROUGH_GAP_BOTTOM_PX}px`,
          '--play-video-bar-padding-y': `${PLAY_VIDEO_BAR_PADDING_Y_PX}px`,
          '--play-video-bar-padding-x': `${PLAY_VIDEO_BAR_PADDING_X_PX}px`,
          margin: `0 ${contentMargin}px`,
        } as React.CSSProperties
      }
    >
      <img
        className="play-planets-scenery"
        src={PLAY_UI.bgTop}
        alt=""
        aria-hidden="true"
      />

      <div className="play-content-container">
        <section className="play-section play-section--game" aria-label="Juego">
        {/* Cabecera Kizi original: HOME + mascota | título | thumb */}
        <div id="game_data" className="game_data_container strips_bg">
          <Link to="/" title="Back to Home">
            <div className="kizi_games_back" />
          </Link>
          <div className="kizi_games_icon" />
          <div className="game_name_container fl">
            <h1>
              <div className="games_icon" />
              {game.name}
            </h1>
          </div>
          <img className="game_thumb" src={game.thumb} alt={game.name} />
        </div>

        {/* Controles centrados (flecha, estrellas, walkthrough, mobile) */}
        <div id="game_controls_row" className="game_data_container strips_bg">
          <div className="game_data_items">
            <div className="btn fl" id="back_to_hp_btn">
              <Link to="/" title="Back to Home">
                <div className="back_arrow icon_container" />
              </Link>
            </div>

            <div className={`btn rating_box ${userRating ?? ''}`}>
              <div className="up_button" title="Like" onClick={handleRateUp}>
                <div className="icon_container" />
              </div>
              <div className="rating_stars" title={`${likes} thumbs up out of ${likes + dislikes}`}>
                <div className="star_container"><div className="star_on" /></div>
                <div className="star_container"><div className="star_on" /></div>
                <div className="star_container"><div className="star_on" /></div>
                <div className="star_container"><div className="star_on" /></div>
                <div className="star_container">
                  <div className="star_on" style={{ width: '50%' }} />
                  <div className="star_off half_star" style={{ width: '50%' }} />
                </div>
              </div>
              <div className="down_button" title="Dislike" onClick={handleRateDown}>
                <div className="icon_container" />
              </div>
            </div>

            <div
              className="btn fl kizi_font btn_with_text"
              title="Walkthrough"
              onClick={() => scrollToSection('video_data')}
            >
              <a href="#video_data">
                <div className="walkthrough_icon icon_container icon_with_text" />
                Walkthrough
              </a>
            </div>

            <div className="btn fl kizi_font btn_with_text" title="Play on mobile">
              <a href="#game_box">
                <div className="play_on_mobile_icon icon_container icon_with_text" />
                Play on mobile
              </a>
            </div>

            <div className="btn fl kizi_font btn_with_text play-fullscreen-enter-wrap">
              <button
                type="button"
                className="play-fullscreen-toolbar-btn"
                title="Pantalla completa"
                aria-label="Pantalla completa"
                onClick={() => void enterGameFullscreen()}
              >
                <IconFullscreenEnter className="play-fullscreen-svg" />
                Pantalla completa
              </button>
            </div>
          </div>
        </div>

        <div className="game_strip strips_bg">
          <div ref={gameViewportRef} className="play-game-fullscreen-host">
            <button
              type="button"
              className="play-fullscreen-exit-btn"
              title="Salir de pantalla completa"
              aria-label="Salir de pantalla completa"
              onClick={() => void exitGameFullscreen()}
            >
              <IconFullscreenExit className="play-fullscreen-svg" />
              Salir
            </button>

            <div
              id="game_box"
              style={{ width: activeGameSize.width, height: activeGameSize.height }}
            >
              <div
                id="GameEmbed"
                className="swfs_container"
                style={{ width: activeGameSize.width, height: activeGameSize.height }}
              >
                <div id="GameEmbedDummy" ref={gameBoxRef}>
                  {hasPlayable ? (
                    <GamePlayer
                      engine={game.engine}
                      html5Url={game.html5Url}
                      swfUrl={game.swfUrl}
                      title={game.name}
                      width={activeGameSize.width}
                      height={activeGameSize.height}
                    />
                  ) : (
                    <div className="play-game-preview play-game-unavailable">
                      <img src={game.thumb} alt={game.name} />
                      <p className="play-game-unavailable__msg">{game.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="description_block" className="strips_bg">
          <img className="game_thumb" src={game.thumb} alt={game.name} />
          <div id="description_content">
            <h3>{game.name}</h3>
            <p className="play-description-text">{game.description}</p>
            <div id="description_tags">
              {game.tags.map((tag) => (
                <Link key={tag} className="game_collectios" to="/">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
        </section>

        <section className="play-section play-section--video" aria-label="Walkthrough">
        <div className="play-scenery-gap" aria-hidden="true" />

        <div id="video_data" className="game_data_container strips_bg">
          <div className="kizi_videos_icon" />
          <h2 className="kizi_font no_chapters fl">
            <div className="videos_icon" />
            Walkthrough &gt; {game.name}
          </h2>
          <img className="game_thumb" src={game.thumb} alt={game.name} />
        </div>

        <div id="video_on_gamepage" className="video_strip strips_bg play-video-row">
          <div className="banner_holder" id="video_left_banner">
            <a href={YOUTUBE_CHANNEL} target="_blank" rel="noreferrer">
              <div
                id="youtube_large_button"
                style={{ backgroundImage: `url(${PLAY_UI.youtubeSubscribe})` }}
              />
            </a>
          </div>

          <div id="video_box" style={{ width: displaySize.width }}>
            <div id="VideoEmbed" style={{ width: displaySize.width, height: displaySize.height }}>
              <iframe
                title="Walkthrough Video"
                width="100%"
                height="100%"
                src={WALKTHROUGH_VIDEO}
                data-ruffle-optout=""
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="banner_holder" id="video_right_banner">
            <button
              type="button"
              id="back_to_game"
              className="back-to-game-btn"
              onClick={() => scrollToSection('game_box')}
            >
              <div
                className="back_to_game_kizi_img"
                style={{ backgroundImage: `url(${PLAY_UI.backToGame})` }}
              />
              <img alt={game.name} id="back_to_game_thumb" src={game.thumb} />
            </button>
          </div>
        </div>
        </section>
      </div>

      <div className="play-footer-anchor" aria-hidden="true">
        <img
          className="play-footer-scenery"
          src={PLAY_UI.bgFooter}
          alt=""
        />
      </div>
    </div>
  )
}
