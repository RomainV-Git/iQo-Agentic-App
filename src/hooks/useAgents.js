import { useState, useCallback } from 'react'
import { INIT_AGENTS } from '../data/agents'

export function useAgents() {
  const [agents, setAgents] = useState(INIT_AGENTS)

  const toggleAgent = useCallback((id) => {
    setAgents((prev) => {
      const next = {}
      Object.keys(prev).forEach((dept) => {
        next[dept] = prev[dept].map((a) => (a.id === id ? { ...a, active: !a.active } : a))
      })
      return next
    })
  }, [])

  const updateAgent = useCallback((id, patch) => {
    setAgents((prev) => {
      const next = {}
      Object.keys(prev).forEach((dept) => {
        next[dept] = prev[dept].map((a) => (a.id === id ? { ...a, ...patch } : a))
      })
      return next
    })
  }, [])

  const addAgent = useCallback((agent) => {
    setAgents((prev) => ({
      ...prev,
      [agent.dept]: [...(prev[agent.dept] || []), agent],
    }))
  }, [])

  const removeAgent = useCallback((id) => {
    setAgents((prev) => {
      const next = {}
      Object.keys(prev).forEach((dept) => {
        next[dept] = prev[dept].filter((a) => a.id !== id)
      })
      return next
    })
  }, [])

  const allAgents = Object.values(agents).flat()

  return { agents, setAgents, allAgents, toggleAgent, updateAgent, addAgent, removeAgent }
}
