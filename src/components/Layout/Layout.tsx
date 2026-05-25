import { useEffect } from 'react'
import { Outlet, useLocation } from '@tanstack/react-router'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import { useKiziLayout } from '../../hooks/useKiziLayout'
import './Layout.css'

export default function Layout() {
  const { gameDivWidth } = useKiziLayout()
  const { pathname } = useLocation()
  const isPlayPage = pathname.startsWith('/games/')

  useEffect(() => {
    const updateMinHeight = () => {
      const el = document.getElementById('thumbs_place_holder')
      if (!el) return
      /* En play-page el footer va al borde inferior vía CSS (grid); no forzar scrollHeight */
      if (isPlayPage) {
        el.style.minHeight = ''
        return
      }
      el.style.minHeight = `${document.documentElement.scrollHeight}px`
    }
    updateMinHeight()
    window.addEventListener('resize', updateMinHeight)
    return () => window.removeEventListener('resize', updateMinHeight)
  }, [isPlayPage, pathname])

  return (
    <div id="content" className={isPlayPage ? 'route-play' : 'route-home'}>
      <Header />
      <Sidebar />
      <main
        id="thumbs_place_holder"
        style={{ width: gameDivWidth }}
      >
        <Outlet />
      </main>
    </div>
  )
}
