import { useEffect, useState } from 'react'

const SIDE_MENU = 60
const SCROLLBAR = 17
const RATIO_THUMB = 0.93

export interface KiziLayoutMetrics {
  gameDivWidth: number
  boxWidth: number
  wrapperMargin: number
  thumbsPerRow: number
  thumbDim: { width: number; height: number }
  marginSize: number
}

function calculateMetrics(windowWidth: number): KiziLayoutMetrics {
  const gameDivWidth = windowWidth - SCROLLBAR - SIDE_MENU

  const thumbsPerRow = 11
  const boxWidth = Math.floor(gameDivWidth / thumbsPerRow)

  let thumbW = Math.round(RATIO_THUMB * boxWidth)
  let thumbH = Math.round(RATIO_THUMB * boxWidth)
  if ((boxWidth - thumbW) % 2 !== 0) {
    thumbW -= 1
    thumbH -= 1
  }

  const wrapperMargin = Math.floor((gameDivWidth - boxWidth * thumbsPerRow) / 2)

  return {
    gameDivWidth,
    boxWidth,
    wrapperMargin,
    thumbsPerRow,
    thumbDim: { width: thumbW, height: thumbH },
    marginSize: Math.floor((boxWidth - thumbW) / 2),
  }
}

export function useKiziLayout() {
  const [metrics, setMetrics] = useState<KiziLayoutMetrics>(() =>
    calculateMetrics(typeof window !== 'undefined' ? window.innerWidth : 1200),
  )

  useEffect(() => {
    const update = () => setMetrics(calculateMetrics(window.innerWidth))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return metrics
}
