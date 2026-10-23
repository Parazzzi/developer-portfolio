import { petProject, profile } from "@/lib/portfolio-data"

export type TrackEventType = "visit" | "cv" | "summary"

// Open the site once with ?notrack to stop notifications from this browser, ?notrack=0 to undo.
const optOutKey = "portfolio-notrack"
const visitKey = "portfolio-visit"

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

function post(body: Record<string, unknown>) {
  return fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...body,
      ref: new URLSearchParams(window.location.search).get("ref"),
      referrer: document.referrer.startsWith(window.location.origin) ? "" : document.referrer,
    }),
    keepalive: true,
  })
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
  post(summary).catch(() => {})
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
  if (label) visit.clicks[label] = (visit.clicks[label] ?? 0) + 1
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
    },
    { rootMargin: "-50% 0px -50% 0px" },
  )

  document.querySelectorAll("main > section").forEach((section) => observer.observe(section))
  document.addEventListener("visibilitychange", handleVisibilityChange)
  document.addEventListener("click", handleClick, true)
  window.addEventListener("pagehide", sendSummary)
  window.addEventListener("blur", handleBlur)

  return () => {
    settleTime()
    activeSince = null
    currentSection = null
    observer.disconnect()
    document.removeEventListener("visibilitychange", handleVisibilityChange)
    document.removeEventListener("click", handleClick, true)
    window.removeEventListener("pagehide", sendSummary)
    window.removeEventListener("blur", handleBlur)
  }
}
