import { petProject, profile } from "@/lib/portfolio-data"

export type TrackEventType = "visit" | "cv" | "summary"

// Open the site once with ?notrack to stop notifications from this browser, ?notrack=0 to undo.
const optOutKey = "portfolio-notrack"
const visitKey = "portfolio-visit"
const summaryIntervalMs = 15_000
// Fast scrolling or clicking still makes at most one summary request per this window.
const summaryThrottleMs = 5_000

const linkNames: Record<string, string> = {
  [profile.links.linkedin]: "LinkedIn",
  [profile.links.telegram]: "Telegram",
  [profile.links.cv]: "CV",
  [profile.links.funPortfolio3d]: "3D-портфоліо",
  [petProject.link]: "Scrap Orbit на itch.io",
}

type Visit = {
  // Telegram message of this visit; the summary is written into it.
  messageId?: number
  activeMs: number
  sections: Record<string, number>
  clicks: Record<string, number>
}

let visit: Visit = { activeMs: 0, sections: {}, clicks: {} }
let activeSince: number | null = null
let currentSection: string | null = null
let lastSummary = ""
let lastSummaryAt = -Infinity
let summaryTimer: number | undefined

function isOptedOut() {
  try {
    return window.localStorage.getItem(optOutKey) === "1"
  } catch {
    return false
  }
}

function setOptedOut(optedOut: boolean) {
  try {
    if (optedOut) window.localStorage.setItem(optOutKey, "1")
    else window.localStorage.removeItem(optOutKey)
  } catch {}
}

function loadVisit(): Visit | null {
  try {
    return JSON.parse(window.sessionStorage.getItem(visitKey) ?? "null")
  } catch {
    return null
  }
}

function saveVisit() {
  try {
    window.sessionStorage.setItem(visitKey, JSON.stringify(visit))
  } catch {
    // Storage can be blocked (e.g. private mode); tracking still works for this page load.
  }
}

function isTrackingDisabled() {
  return navigator.webdriver || isOptedOut()
}

function serialize(body: Record<string, unknown>) {
  return JSON.stringify({
    ...body,
    ref: new URLSearchParams(window.location.search).get("ref"),
    referrer: document.referrer.startsWith(window.location.origin) ? "" : document.referrer,
  })
}

function post(body: Record<string, unknown>) {
  return fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: serialize(body),
    keepalive: true,
  })
}

// Safari often drops a keepalive fetch started while the tab is closing, but delivers beacons.
// A string beacon goes out as text/plain; the API parses the body as JSON regardless.
function beacon(body: Record<string, unknown>) {
  if (!navigator.sendBeacon("/api/track", serialize(body))) post(body).catch(() => {})
}

export function trackEvent(type: TrackEventType) {
  if (!isTrackingDisabled()) post({ type }).catch(() => {})
}

// Adds the time since the last call to the total and to the section in the middle of the screen.
function settleTime() {
  if (activeSince === null) return

  const now = performance.now()
  visit.activeMs += now - activeSince
  if (currentSection) visit.sections[currentSection] = (visit.sections[currentSection] ?? 0) + now - activeSince
  activeSince = now
}

function sendSummary() {
  window.clearTimeout(summaryTimer)
  summaryTimer = undefined
  settleTime()
  saveVisit()
  if (!visit.messageId) return

  const summary = {
    type: "summary",
    messageId: visit.messageId,
    activeSeconds: Math.round(visit.activeMs / 1000),
    sections: Object.fromEntries(Object.entries(visit.sections).map(([id, ms]) => [id, Math.round(ms / 1000)])),
    clicks: visit.clicks,
  }
  const serialized = JSON.stringify(summary)
  if (serialized === lastSummary) return

  lastSummary = serialized
  lastSummaryAt = performance.now()
  beacon(summary)
}

// Sends the summary as soon as something changes, since quitting the browser (⌘Q) can skip the final one.
function scheduleSummary() {
  if (summaryTimer !== undefined) return

  const wait = Math.max(0, lastSummaryAt + summaryThrottleMs - performance.now())
  summaryTimer = window.setTimeout(sendSummary, wait)
}

function describeClick(target: Element) {
  const link = target.closest("a[href]")
  const href = link?.getAttribute("href")

  if (link instanceof HTMLAnchorElement && href) {
    if (href.startsWith("#")) return null
    if (href.startsWith("mailto:")) return "Email"
    return linkNames[href] ?? link.href.replace(/^https?:\/\/(www\.)?/, "").slice(0, 80)
  }

  const button = target.closest("button")
  const label = button?.getAttribute("aria-label") || button?.textContent

  return label?.replace(/\s+/g, " ").trim().slice(0, 40) || null
}

function recordClick(label: string | null) {
  if (!label) return

  visit.clicks[label] = (visit.clicks[label] ?? 0) + 1
  scheduleSummary()
}

export function startVisitTracking() {
  const optOut = new URLSearchParams(window.location.search).get("notrack")
  if (optOut !== null) setOptedOut(optOut !== "0")

  if (isTrackingDisabled()) return

  const storedVisit = loadVisit()

  if (storedVisit) {
    // Same browser session (e.g. a reload): keep adding to the same visit message.
    visit = storedVisit
  } else {
    saveVisit()
    post({ type: "visit" })
      .then((response) => response.json())
      .then(({ messageId }) => {
        if (typeof messageId === "number") visit.messageId = messageId
        saveVisit()
      })
      .catch(() => {})
  }

  activeSince = document.visibilityState === "visible" ? performance.now() : null

  // Hidden covers closing the tab, switching away and locking the phone; the summary is updated each time.
  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      sendSummary()
      activeSince = null
    } else {
      activeSince = performance.now()
    }
  }

  const handleClick = (event: MouseEvent) => {
    if (event.target instanceof Element) recordClick(describeClick(event.target))
  }

  // Clicks inside a YouTube iframe never reach the page, but they move focus into the iframe.
  const handleBlur = () => {
    setTimeout(() => {
      const frame = document.activeElement
      if (frame instanceof HTMLIFrameElement) recordClick(frame.title || "Відео")
    })
  }

  // A section counts as viewed while it crosses the middle of the screen.
  const observer = new IntersectionObserver(
    (entries) => {
      settleTime()
      for (const entry of entries) {
        const id = entry.target.id || "hero"
        if (entry.isIntersecting) currentSection = id
        else if (currentSection === id) currentSection = null
      }
      // Moving to another section is when the previous one's time is final.
      scheduleSummary()
    },
    { rootMargin: "-50% 0px -50% 0px" },
  )

  // Also keeps the time in the current section fresh while the visitor stays on it.
  // While the page is hidden nothing changes, so sendSummary skips the request.
  const summaryInterval = window.setInterval(sendSummary, summaryIntervalMs)

  document.querySelectorAll("main > section").forEach((section) => observer.observe(section))
  document.addEventListener("visibilitychange", handleVisibilityChange)
  document.addEventListener("click", handleClick, true)
  window.addEventListener("pagehide", sendSummary)
  window.addEventListener("blur", handleBlur)

  return () => {
    settleTime()
    activeSince = null
    currentSection = null
    window.clearInterval(summaryInterval)
    window.clearTimeout(summaryTimer)
    summaryTimer = undefined
    observer.disconnect()
    document.removeEventListener("visibilitychange", handleVisibilityChange)
    document.removeEventListener("click", handleClick, true)
    window.removeEventListener("pagehide", sendSummary)
    window.removeEventListener("blur", handleBlur)
  }
}
