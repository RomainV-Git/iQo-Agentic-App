import { useState, useCallback } from 'react'
import { INIT_FIL } from '../data/fil'

export function useFil() {
  const [fil, setFil] = useState(INIT_FIL)

  const resolve = useCallback((item, action, comment = '') => {
    setFil((prev) =>
      prev.map((f) => (f.id === item.id ? { ...f, resolved: true, action, comment } : f))
    )
  }, [])

  const snooze = useCallback((id) => {
    setFil((prev) =>
      prev.map((f) => (f.id === id ? { ...f, resolved: true, action: 'later' } : f))
    )
  }, [])

  const pending  = fil.filter((f) => !f.resolved)
  const resolved = fil.filter((f) => f.resolved)
  const urgent   = pending.filter((f) => f.type === 'urgent')

  return { fil, setFil, pending, resolved, urgent, resolve, snooze }
}
