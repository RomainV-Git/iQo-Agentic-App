import { useState, useEffect } from 'react'
import { DESKTOP_BREAKPOINT } from '../lib/constants'

/**
 * Returns [isDesktop, setIsDesktop].
 * setIsDesktop allows manual override (toggle button in Admin).
 */
export function useResponsive() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return [isDesktop, setIsDesktop]
}
