/**
 * GET /api/agents
 *
 * Returns live agent statuses.
 * Currently returns mock data — replace with your Make/backend call.
 *
 * Example production implementation:
 *   const res = await fetch(process.env.MAKE_AGENTS_URL)
 *   const data = await res.json()
 *   return Response.json(data)
 */
export async function GET() {
  // Prototype: return empty so the client falls back to static data
  return Response.json({ agents: null, source: 'prototype' })
}

/**
 * POST /api/agents/trigger
 *
 * Triggers an agent run via Make webhook.
 * Body: { agentId: string, context?: string }
 */
export async function POST(request) {
  const body = await request.json()
  const { agentId, context = '' } = body

  const webhookUrl = process.env.MAKE_WEBHOOK_URL
  if (!webhookUrl) {
    return Response.json(
      { ok: true, simulated: true, message: 'MAKE_WEBHOOK_URL not set — trigger simulated' },
      { status: 200 }
    )
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentId, context, triggeredAt: new Date().toISOString() }),
    })
    const data = await res.json()
    return Response.json(data)
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
