import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const EXTRACTION_PROMPT = `You are analyzing a Fujifilm camera screenshot or recipe card showing film simulation recipe settings.

Extract ALL visible settings and return a JSON object with exactly these keys:
- name (string: recipe or simulation name if visible)
- film_simulation (string: exact Fujifilm name, e.g. "Classic Negative", "Velvia / Vivid", "Provia / Standard")
- dynamic_range (string: "DR100", "DR200", "DR400", or "Auto")
- grain_effect (string: e.g. "Off", "Weak Small", "Weak Large", "Strong Small", "Strong Large")
- color_chrome_effect (string: "Off", "Weak", or "Strong")
- color_chrome_effect_blue (string: "Off", "Weak", or "Strong")
- white_balance (string: e.g. "Auto (AWB)", "Daylight", "Shade", "Color Temperature (K)")
- white_balance_k (number or null: color temperature in Kelvin if applicable)
- wb_red_shift (number or null: -9 to +9)
- wb_blue_shift (number or null: -9 to +9)
- highlight (number: integer from -2 to +4)
- shadow (number: integer from -2 to +4)
- color (number: integer from -4 to +4)
- sharpness (number: integer from -4 to +4)
- noise_reduction (number: integer from -4 to +4)
- clarity (number: integer from -5 to +5)
- iso (string: e.g. "Auto up to ISO 6400", "ISO 400", "Auto")
- exposure_compensation (string: e.g. "+1/3", "-2/3", "0")
- sensor (string: camera model or sensor if visible)

Rules:
- For numeric fields return 0 if not visible (not null)
- For string fields return "" if not visible
- Return null only for white_balance_k, wb_red_shift, wb_blue_shift when not applicable
- Return ONLY the JSON object, no explanation, no markdown fences`

export async function POST(req: Request) {
  try {
    const { image, mimeType } = await req.json()

    if (!image || !mimeType) {
      return NextResponse.json({ error: 'Missing image or mimeType' }, { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 })
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const response = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
                data: image,
              },
            },
            { type: 'text', text: EXTRACTION_PROMPT },
          ],
        },
      ],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''

    let recipe
    try {
      recipe = JSON.parse(text)
    } catch {
      // Try to extract JSON from response if it has extra text
      const match = text.match(/\{[\s\S]*\}/)
      if (match) {
        recipe = JSON.parse(match[0])
      } else {
        return NextResponse.json(
          { error: 'Could not parse recipe from image', raw: text },
          { status: 422 }
        )
      }
    }

    return NextResponse.json({ recipe })
  } catch (err: unknown) {
    console.error('Scan error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Scan failed' },
      { status: 500 }
    )
  }
}
