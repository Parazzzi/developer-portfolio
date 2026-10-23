import type { TrackEventType } from "@/lib/visit-tracking"

const eventTitles: Record<TrackEventType, string> = {
  visit: "👀 Новий візит",
  cv: "📄 Завантажили CV",
}

const refPattern = /^[\p{L}\p{N}_.-]{1,64}$/u

const operatingSystems: [RegExp, string][] = [
  [/iPhone|iPad/, "iOS"],
  [/Android/, "Android"],
  [/Windows/, "Windows"],
  [/Mac OS X/, "macOS"],
  [/Linux/, "Linux"],
]

const browsers: [RegExp, string][] = [
  [/LinkedInApp/, "LinkedIn app"],
  [/Edg\/|EdgiOS/, "Edge"],
  [/OPR\//, "Opera"],
  [/Firefox\/|FxiOS/, "Firefox"],
  [/Chrome\/|CriOS/, "Chrome"],
  [/Safari\//, "Safari"],
]

type TrackPayload = {
  type?: unknown
  ref?: unknown
  referrer?: unknown
}

function isTrackEventType(value: unknown): value is TrackEventType {
  return typeof value === "string" && Object.hasOwn(eventTitles, value)
}

function countryFlag(countryCode: string) {
  if (!/^[A-Z]{2}$/.test(countryCode)) return "📍"

  return String.fromCodePoint(...[...countryCode].map((letter) => 0x1f1e6 + letter.charCodeAt(0) - 65))
}

// Vercel adds these geo headers in production; locally they are missing.
function describeLocation(headers: Headers) {
  const country = headers.get("x-vercel-ip-country")
  const encodedCity = headers.get("x-vercel-ip-city")

  if (!country) return "📍 Локація невідома"

  let city = encodedCity
  try {
    city = encodedCity && decodeURIComponent(encodedCity)
  } catch {}

  return `${countryFlag(country)} ${[city, country].filter(Boolean).join(", ")}`
}

function describeSource(referrer: unknown) {
  if (typeof referrer !== "string" || !referrer) return "🔗 Напряму"

  try {
    return `🔗 З ${new URL(referrer).hostname.replace(/^www\./, "")}`
  } catch {
    return "🔗 Напряму"
  }
}

function matchName(userAgent: string, patterns: [RegExp, string][]) {
  return patterns.find(([pattern]) => pattern.test(userAgent))?.[1]
}

function describeDevice(userAgent: string) {
  const icon = /Mobi|Android|iPhone/.test(userAgent) ? "📱" : "💻"
  const names = [matchName(userAgent, operatingSystems), matchName(userAgent, browsers)].filter(Boolean)

  return `${icon} ${names.join(" · ") || "Невідомий пристрій"}`
}

function formatMessage(type: TrackEventType, payload: TrackPayload, headers: Headers) {
  const lines = [eventTitles[type]]

  if (typeof payload.ref === "string" && refPattern.test(payload.ref)) {
    lines.push(`🔖 ref: ${payload.ref}`)
  }

  lines.push(
    describeLocation(headers),
    describeSource(payload.referrer),
    describeDevice(headers.get("user-agent") ?? ""),
  )

  return lines.join("\n")
}

async function sendToTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.info(`[track] Telegram is not configured, skipping message:\n${text}`)
    return
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  })

  if (!response.ok) {
    console.error(`[track] Telegram responded with ${response.status}: ${await response.text()}`)
  }
}

export async function POST(request: Request) {
  let payload: TrackPayload

  try {
    payload = await request.json()
  } catch {
    return new Response(null, { status: 400 })
  }

  if (!payload || !isTrackEventType(payload.type)) {
    return new Response(null, { status: 400 })
  }

  await sendToTelegram(formatMessage(payload.type, payload, request.headers))

  return new Response(null, { status: 204 })
}
