/**
 * src/lib/api.js — client-side API layer
 *
 * All browser → server calls go through here.
 * Calls Next.js API routes (/api/*) which proxy to Make / Anthropic server-side.
 * The API key is NEVER in the browser bundle.
 */

// ─── Agents ───────────────────────────────────────────────────────────────────

export async function fetchAgentStatuses() {
  const res = await fetch('/api/agents')
  if (!res.ok) throw new Error(`fetchAgentStatuses: ${res.status}`)
  return res.json()
}

export async function triggerAgent(agentId, context = '') {
  const res = await fetch('/api/agents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agentId, context }),
  })
  if (!res.ok) throw new Error(`triggerAgent: ${res.status}`)
  return res.json()
}

// ─── Fil ──────────────────────────────────────────────────────────────────────

export async function postDecision({ itemId, action, comment, agentId }) {
  const res = await fetch('/api/fil', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ itemId, action, comment, agentId }),
  })
  if (!res.ok) throw new Error(`postDecision: ${res.status}`)
  return res.json()
}

// ─── Chat (Anthropic, proxied through /api/chat) ──────────────────────────────

export async function chatWithAgent({ agentName, systemPrompt, messages }) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agentName, systemPrompt, messages }),
  })
  if (!res.ok) throw new Error(`chatWithAgent: ${res.status}`)
  return res.json()
}
