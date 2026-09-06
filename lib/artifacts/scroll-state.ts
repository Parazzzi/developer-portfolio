import { MathUtils } from "three"

type ArtifactKind = "hero" | "xr" | "mobile" | "gameplay" | "systems" | "tools" | "contact"

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
}

interface ArtifactMarker {
  element: HTMLElement
  center: number
  kind: ArtifactKind
}

const states: Record<ArtifactKind, ArtifactState> = {
  hero: { x: 0.7, y: 0.49, scale: 1, rotationX: 0.25, rotationY: -0.5, rotationZ: -0.27, spread: 0, crystal: 0.4, wire: 0.16, opacity: 1 },
  xr: { x: 0.81, y: 0.5, scale: 0.74, rotationX: -0.35, rotationY: 0.75, rotationZ: 0.45, spread: 0.28, crystal: 1, wire: 0.12, opacity: 0.5 },
  mobile: { x: 0.81, y: 0.5, scale: 0.72, rotationX: 0.14, rotationY: 1.25, rotationZ: -0.18, spread: 0.03, crystal: 0.75, wire: 0.15, opacity: 0.5 },
  gameplay: { x: 0.8, y: 0.5, scale: 0.67, rotationX: 0.8, rotationY: 1.9, rotationZ: 0.48, spread: 0.72, crystal: 0.28, wire: 0.4, opacity: 0.44 },
  systems: { x: 0.81, y: 0.52, scale: 0.68, rotationX: 0.1, rotationY: 2.45, rotationZ: 0.2, spread: 0.2, crystal: 0.1, wire: 0.86, opacity: 0.55 },
  tools: { x: 0.8, y: 0.51, scale: 0.69, rotationX: -0.5, rotationY: 3.3, rotationZ: -0.4, spread: 0.42, crystal: 0.26, wire: 0.7, opacity: 0.55 },
  contact: { x: 0.78, y: 0.47, scale: 0.85, rotationX: 0.3, rotationY: Math.PI * 2 - 0.5, rotationZ: -0.27, spread: 0, crystal: 0.5, wire: 0.18, opacity: 0.9 },
}

const keys = Object.keys(states.hero) as (keyof ArtifactState)[]

export function createScrollState() {
  let markers: ArtifactMarker[] = []

  function refresh() {
    markers = Array.from(document.querySelectorAll<HTMLElement>("[data-artifact]"))
      .filter(element => element.dataset.artifact && element.dataset.artifact in states)
      .map(element => ({
        element,
        center: element.getBoundingClientRect().top + window.scrollY + Math.min(element.offsetHeight, window.innerHeight) * 0.5,
        kind: element.dataset.artifact as ArtifactKind,
      }))
      .sort((first, second) => first.center - second.center)
  }

  function markerState(marker: ArtifactMarker, compact: boolean): ArtifactState {
    const result = { ...states[marker.kind] }
    if (marker.element.dataset.artifactSide === "left") result.x = 1 - result.x
    if (compact) {
      result.x = marker.kind === "hero" ? 0.67 : 0.82
      result.y = marker.kind === "hero" ? 0.47 : 0.44
      result.scale *= marker.kind === "hero" ? 0.85 : 0.8
      if (marker.kind !== "hero" && marker.kind !== "contact") result.opacity *= 0.55
    }
    return result
  }

  function read(compact: boolean): ArtifactState {
    if (markers.length === 0) return { ...states.hero }
    const position = window.scrollY + window.innerHeight * 0.5
    let index = markers.findIndex(marker => marker.center > position)
    if (index === 0) return markerState(markers[0], compact)
    if (index < 0) index = markers.length
    const first = markers[index - 1]
    const second = markers[Math.min(index, markers.length - 1)]
    if (first === second) return markerState(first, compact)
    const from = markerState(first, compact)
    const to = markerState(second, compact)
    const progress = MathUtils.smoothstep(position, first.center, second.center)
    const result = { ...from }
    for (const key of keys) result[key] = MathUtils.lerp(from[key], to[key], progress)
    return result
  }

  refresh()
  return { refresh, read }
}
