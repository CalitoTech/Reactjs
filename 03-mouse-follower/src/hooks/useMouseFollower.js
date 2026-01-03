import { useEffect, useState } from 'react'

export function useMouseFollower() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) return

    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [enabled])

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
    return () => document.body.classList.remove('no-cursor')
  }, [enabled])

  return { enabled, position, toggle: () => setEnabled(e => !e) }
}