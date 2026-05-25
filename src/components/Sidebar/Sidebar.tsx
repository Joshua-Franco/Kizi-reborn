import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { useGameContext } from '../../context/GameContext'
import { sidebarCategoriesForRoute } from '../../utils/constants'
import { KIZI_COLLECTIONS_IMAGES } from '../../utils/kiziAssets'
import './Sidebar.css'
import './category-icon-sizes.css'

function iconState(isSelected: boolean, isHovered: boolean): '1' | '2' | '3' {
  if (isSelected) return '3'
  if (isHovered) return '2'
  return '1'
}

export default function Sidebar() {
  const { currentCategory, setCurrentCategory } = useGameContext()
  const [fixed, setFixed] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const { pathname } = useLocation()
  const isPlayPage = pathname.startsWith('/games/')

  const categories = useMemo(
    () => sidebarCategoriesForRoute(isPlayPage),
    [isPlayPage],
  )

  useEffect(() => {
    const check = () => {
      const itemHeight = 60
      setFixed(window.innerHeight >= categories.length * itemHeight)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [categories.length])

  return (
    <div id="collections_wrapper" data-sidebar-mode={isPlayPage ? 'play' : 'home'}>
      <ul className={fixed ? 'fixed-sidebar' : undefined}>
        {categories.map((cat) => {
          const isSelected = currentCategory === cat.id
          const isHovered = hoveredId === cat.id
          const images = KIZI_COLLECTIONS_IMAGES[cat.id as keyof typeof KIZI_COLLECTIONS_IMAGES]
          const state = iconState(isSelected, isHovered)
          const imgSrc = images[Number(state) - 1]

          return (
            <li key={cat.id} id={`category-${cat.id}`} className="collection">
              <Link
                id={`category-${cat.id}-link`}
                to="/"
                title={cat.name}
                aria-label={cat.name}
                className={isSelected ? 'selected_category' : undefined}
                onClick={() => setCurrentCategory(cat.id)}
                rel="categorySidebar"
                onMouseEnter={() => setHoveredId(cat.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <span id={`category-${cat.id}-wrap`}>
                  <img
                    key={`${cat.id}-${state}`}
                    id={`category-${cat.id}-icon`}
                    data-state={state}
                    src={imgSrc}
                    alt=""
                  />
                </span>
                <div className="category_title">{cat.name}</div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
