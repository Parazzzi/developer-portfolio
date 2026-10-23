export type TrackEventType = "visit" | "cv"

// Open the site once with ?notrack to stop notifications from this browser, ?notrack=0 to undo.
const optOutKey = "portfolio-notrack"
const visitKey = "portfolio-visit-tracked"

function isOptedOut() {
  try {
    return window.localStorage.getItem(optOutKey) === "1"
  } catch {
    return false
  }
}

export function trackEvent(type: TrackEventType) {
  if (isOptedOut()) return

  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type,
      ref: new URLSearchParams(window.location.search).get("ref"),
      referrer: document.referrer.startsWith(window.location.origin) ? "" : document.referrer,
    }),
    keepalive: true,
  }).catch(() => {})
}

export function trackVisit() {
  const optOut = new URLSearchParams(window.location.search).get("notrack")

  try {
    if (optOut === "0") window.localStorage.removeItem(optOutKey)
    else if (optOut !== null) window.localStorage.setItem(optOutKey, "1")

    // One notification per browser session, so reloads don't repeat it.
    if (window.sessionStorage.getItem(visitKey)) return
    window.sessionStorage.setItem(visitKey, "1")
  } catch {
    // Storage can be blocked (e.g. private mode); still report the visit.
  }

  trackEvent("visit")
}
