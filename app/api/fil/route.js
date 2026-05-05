/**
 * POST /api/fil
 *
 * Posts a decision (validate / reject / revision) to Make.
 * Body: { itemId, action, comment, agentId }
 */
export async function POST(request) {
  const body = await request.json()
  const { itemId, action, comment, agentId } = body

  const webhookUrl = process.env.MAKE_WEBHOOK_URL
  if (!webhookUrl) {
    return Response.json(
      { ok: true, simulated: true, message: 'MAKE_WEBHOOK_URL not set — decision simulated' },
      { status: 200 }
    )
  }

  try {
    const res = await fetch(`${webhookUrl}/decision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemId,
        action,
        comment,
        agentId,
        decidedAt: new Date().toISOString(),
      }),
    })
    const data = await res.json()
    return Response.json(data)
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
