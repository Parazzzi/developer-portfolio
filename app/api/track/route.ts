import type { TrackEventType } from "@/lib/visit-tracking"

const eventTitles: Record<TrackEventType, string> = {
  visit: "👀 Новий візит",
  // The summary is written into the visit message, so it keeps its title.
  summary: "👀 Новий візит",
  cv: "📄 Завантажили CV",
}

const sectionNames: Record<string, string> = {
  hero: "Головна",
  "pet-project": "Scrap Orbit",
  book: "Книга",
  about: "Про мене",
  services: "Послуги",
  skills: "Навички",
  experience: "Досвід",
  projects: "Проєкти",
  achievements: "Досягнення",
  workflow: "Процес роботи",
  contact: "Контакти",
}

const refPattern = /^[\p{L}\p{N}_.-]{1,64}$/u
const sectionIdPattern = /^[\w-]{1,40}$/
const botPattern = /\bbot\b|bot\/|crawler|spider|HeadlessChrome|Lighthouse/i

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
  messageId?: unknown
  activeSeconds?: unknown
  sections?: unknown
  clicks?: unknown
}

function isTrackEventType(value: unknown): value is TrackEventType {
  return typeof value === "string" && Object.hasOwn(eventTitles, value)
}

function isPositiveNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0
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

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return minutes ? `${minutes} хв ${seconds} с` : `${seconds} с`
}

// Reads a { name: number } object sent by the browser, dropping anything malformed.
function readCounts(value: unknown, isValidKey: (key: string) => boolean) {
  if (!value || typeof value !== "object") return []

  return Object.entries(value)
    .filter((entry): entry is [string, number] => isValidKey(entry[0]) && isPositiveNumber(entry[1]))
    .slice(0, 30)
    .map(([key, count]) => [key, Math.round(count)] as const)
}

function describeSummary(payload: TrackPayload) {
  const activeSeconds = isPositiveNumber(payload.activeSeconds) ? Math.round(payload.activeSeconds) : 0
  const sections = readCounts(payload.sections, (id) => sectionIdPattern.test(id))
    .filter(([, seconds]) => seconds >= 2)
    .map(([id, seconds]) => `${Object.hasOwn(sectionNames, id) ? sectionNames[id] : id} ${formatDuration(seconds)}`)
  const clicks = readCounts(payload.clicks, (label) => label.length > 0 && label.length <= 80).map(
    ([label, count]) => (count > 1 ? `${label} ×${count}` : label),
  )

  const lines = [`⏱ ${formatDuration(activeSeconds)} на сайті`]
  if (sections.length) lines.push(`👁 ${sections.join(" → ")}`)
  if (clicks.length) lines.push(`🖱 ${clicks.join(", ")}`)

  return lines.join("\n")
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

  if (type === "summary") lines.push(describeSummary(payload))

  return lines.join("\n")
}

// Sends a new message, or edits an existing one when its id is given. Returns the message id.
async function sendToTelegram(text: string, editMessageId?: number) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.info(`[track] Telegram is not configured, skipping message:\n${text}`)
    return
  }

  const method = editMessageId ? "editMessageText" : "sendMessage"
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, message_id: editMessageId, text, disable_web_page_preview: true }),
  })
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    console.error(`[track] Telegram ${method} failed with ${response.status}: ${data?.description}`)
  }

  return data?.result?.message_id as number | undefined
}

export async function POST(request: Request) {
  // Crawlers and headless browsers (e.g. deployment screenshots) are not visitors.
  if (botPattern.test(request.headers.get("user-agent") ?? "")) {
    return new Response(null, { status: 204 })
  }

  let payload: TrackPayload

  try {
    payload = await request.json()
  } catch {
    return new Response(null, { status: 400 })
  }

  if (!payload || !isTrackEventType(payload.type)) {
    return new Response(null, { status: 400 })
  }

  const text = formatMessage(payload.type, payload, request.headers)

  if (payload.type === "summary") {
    if (isPositiveNumber(payload.messageId) && Number.isInteger(payload.messageId)) {
      await sendToTelegram(text, payload.messageId)
    }

    return new Response(null, { status: 204 })
  }

  return Response.json({ messageId: await sendToTelegram(text) })
}
