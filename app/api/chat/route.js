/**
 * POST /api/chat
 *
 * Proxies messages to Anthropic API — server-side only.
 * The API key is NEVER exposed to the browser.
 *
 * Body: { agentName, systemPrompt, messages }
 */
export async function POST(request) {
  const { agentName, systemPrompt, messages } = await request.json()

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    // Prototype fallback
    return Response.json({
      content: [
        {
          type: 'text',
          text: `[Prototype] Bien reçu. Je traite votre demande et vous reviens rapidement.`,
        },
      ],
    })
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5',
        max_tokens: 1024,
        system:
          systemPrompt ||
          `Tu es ${agentName}, un agent IA spécialisé au sein du cabinet de conseil iQo.`,
        messages,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      return Response.json({ error }, { status: res.status })
    }

    const data = await res.json()
    return Response.json(data)
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
