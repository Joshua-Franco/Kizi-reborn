export function getFullscreenElement(): Element | null {
  return (
    document.fullscreenElement ??
    (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement ??
    null
  )
}

export async function requestElementFullscreen(el: HTMLElement): Promise<void> {
  if (el.requestFullscreen) {
    await el.requestFullscreen()
    return
  }
  const webkit = el as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> }
  if (webkit.webkitRequestFullscreen) {
    await webkit.webkitRequestFullscreen()
  }
}

export async function exitDocumentFullscreen(): Promise<void> {
  if (document.exitFullscreen) {
    await document.exitFullscreen()
    return
  }
  const webkit = document as Document & { webkitExitFullscreen?: () => Promise<void> }
  if (webkit.webkitExitFullscreen) {
    await webkit.webkitExitFullscreen()
  }
}

export function isElementFullscreen(el: HTMLElement): boolean {
  return getFullscreenElement() === el
}
