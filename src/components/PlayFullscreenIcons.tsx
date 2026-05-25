type IconProps = { className?: string }

export function IconFullscreenEnter({ className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="currentColor"
      aria-hidden
    >
      <path d="M3 9V3h6v2H5v4H3zm12-6h6v6h-2V5h-4V3zM3 15v6h6v-2H5v-4H3zm16 4h-4v2h6v-6h-2v4z" />
    </svg>
  )
}

export function IconFullscreenExit({ className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="currentColor"
      aria-hidden
    >
      <path d="M9 3H5v4H3V3h6v2zm10 0v2h-4V3h6v6h-2V5zM5 15H3v6h6v-2H5v-4zm14 4h-4v2h6v-6h-2v4z" />
    </svg>
  )
}
