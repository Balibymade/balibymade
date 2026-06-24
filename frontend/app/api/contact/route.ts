import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// ── Rate limiting — in-memory (3 envíos por IP / 10 min) ───────────────────
interface RateEntry { count: number; resetAt: number }

const rateStore = new Map<string, RateEntry>()
const WINDOW_MS    = 10 * 60 * 1000
const MAX_REQUESTS = 3

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'unknown'
  )
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now()
  for (const [key, entry] of rateStore) {
    if (now >= entry.resetAt) rateStore.delete(key)
  }
  const entry = rateStore.get(ip)
  if (!entry) {
    rateStore.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, retryAfter: 0 }
  }
  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
  }
  entry.count++
  return { allowed: true, retryAfter: 0 }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const { allowed, retryAfter } = checkRateLimit(ip)

  if (!allowed) {
    return NextResponse.json(
      { error: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  const TO_EMAIL = process.env.CONTACT_EMAIL
  if (!TO_EMAIL) {
    console.error('[contact] CONTACT_EMAIL env var not configured')
    return NextResponse.json({ error: 'send_failed' }, { status: 500 })
  }

  try {
    const { name, email, message } = await req.json()

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
    }

    if (name.trim().length > 200)     return NextResponse.json({ error: 'name_too_long' },    { status: 400 })
    if (email.trim().length > 254)    return NextResponse.json({ error: 'email_too_long' },   { status: 400 })
    if (message.trim().length < 10)   return NextResponse.json({ error: 'message_too_short' }, { status: 400 })
    if (message.trim().length > 5000) return NextResponse.json({ error: 'message_too_long' }, { status: 400 })

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
    }

    const safeName    = escapeHtml(name.trim())
    const safeEmail    = escapeHtml(email.trim())
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br>')

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from:    'Bali By Made <noreply@balibymade.com>',
      to:      TO_EMAIL,
      replyTo: email.trim(),
      subject: `New message from ${safeName}`,
      html: `
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${safeMessage}</p>
      `,
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return NextResponse.json({ error: 'send_failed' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'send_failed' }, { status: 500 })
  }
}
