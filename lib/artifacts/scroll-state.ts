export type ArtifactKind = "hero" | "about" | "xr" | "mobile" | "gameplay" | "systems" | "tools" | "experience" | "contact"

export interface ArtifactState {
  x: number
  y: number
  scale: number
  rotationX: number
  rotationY: number
  rotationZ: number
  spread: number
  crystal: number
  wire: number
  opacity: number
  light: number
  red: number
  green: number
  blue: number
}

interface ArtifactMarker {
  element: HTMLElement
  start: number
  kind: ArtifactKind
  slot: HTMLElement | null
}

const base: ArtifactState = { x: .77, y: .47, scale: .84, rotationX: .25, rotationY: -.5, rotationZ: -.27, spread: 0, crystal: .4, wire: .16, opacity: 1, light: 0, red: 5, green: 5, blue: 5 }
const states: Record<ArtifactKind, ArtifactState> = {
  hero: { ...base },
  about: { ...base, x: .81, y: .34, scale: .47, rotationY: .25, spread: .12, red: 10, green: 10, blue: 10 },
  mobile: { ...base, x: 1.17, y: .34, scale: .2, rotationY: 1.25, opacity: 0, red: 18, green: 18, blue: 16 },
  gameplay: { ...base, x: 1.14, scale: .16, spread: .72, opacity: 0, red: 13, green: 14, blue: 11 },
  systems: { ...base, x: 1.12, y: .28, scale: .18, opacity: 0, rotationX: .1, rotationY: 2.45, spread: .2, wire: .94, crystal: .1, red: 12, green: 14, blue: 11 },
  tools: { ...base, x: .83, y: .29, scale: .4, rotationX: -.5, rotationY: 3.3, spread: .32, wire: 1, crystal: .1, red: 12, green: 14, blue: 11 },
  xr: { ...base, x: .22, y: .4, scale: .7, rotationX: -.35, rotationY: .75, rotationZ: .45, spread: .3, crystal: 1, wire: .12, red: 9, green: 16, blue: 13 },
  experience: { ...base, x: 1.2, scale: .08, opacity: 0, light: 1, red: 233, green: 231, blue: 225 },
  contact: { ...base, x: .85, y: .4, scale: .65, rotationX: .3, rotationY: Math.PI * 2 - .5, spread: 0, crystal: .6 },
}

const keys = Object.keys(base) as (keyof ArtifactState)[]
export const interpolate = (from: number, to: number, amount: number) => from + (to - from) * amount
const ease = (amount: number) => { const t = Math.max(0, Math.min(1, amount)); return t * t * (3 - 2 * t) }

/** One section stays composed until its successor enters the viewport. No React scroll state. */
export function createScrollState() {
  let markers: ArtifactMarker[] = []
  function refresh() {
    markers = Array.from(document.querySelectorAll<HTMLElement>("[data-artifact]"))
      .filter(element => element.dataset.artifact && element.dataset.artifact in states)
      .map(element => ({ element, start: element.getBoundingClientRect().top + window.scrollY, kind: element.dataset.artifact as ArtifactKind, slot: element.querySelector<HTMLElement>("[data-artifact-slot]") }))
      .sort((a, b) => a.start - b.start)
  }
  function markerState(marker: ArtifactMarker, compact: boolean): ArtifactState {
    const result = { ...states[marker.kind] }
    if (marker.slot) {
      const rect = marker.slot.getBoundingClientRect()
      result.x = (rect.left + rect.width / 2) / window.innerWidth
      result.y = (rect.top + rect.height / 2) / window.innerHeight
      result.scale = Math.min(result.scale, rect.width / window.innerHeight * 1.3)
      // A sculpture belongs to its reserved space and leaves with that space.
      if (rect.bottom < 0 || rect.top > window.innerHeight) result.opacity = 0
    }
    if (compact) {
      if (marker.kind === "hero") { result.x = .68; result.y = .5; result.scale = .58 }
      else if (marker.kind === "contact" && marker.slot) { result.scale = Math.min(result.scale, .52) }
      else if (marker.kind === "xr" && marker.slot) { result.scale *= .8 }
      else { result.opacity = 0; result.x = 1.2; result.scale = .12 }
    }
    return result
  }
  function read(compact: boolean): ArtifactState {
    if (!markers.length) return { ...base }
    const position = window.scrollY + window.innerHeight * .52
    let index = markers.findIndex(marker => marker.start > position)
    if (index === 0) return markerState(markers[0], compact)
    if (index < 0) index = markers.length
    const first = markers[index - 1]
    const second = markers[Math.min(index, markers.length - 1)]
    const from = markerState(first, compact)
    if (first === second) return from
    const transitionLength = Math.min(window.innerHeight * .5, (second.start - first.start) * .45)
    const amount = ease((position - (second.start - transitionLength)) / transitionLength)
    const to = markerState(second, compact)
    for (const key of keys) from[key] = interpolate(from[key], to[key], amount)
    return from
  }
  refresh()
  return { refresh, read }
}
