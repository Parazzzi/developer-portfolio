import { createScrollState, interpolate } from "./scroll-state"

/** The scroll atmosphere works even if Three.js or WebGL cannot initialize. */
export function createAtmosphere(stage: HTMLDivElement) {
  const root = document.documentElement
  const scroll = createScrollState()
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
  const current = scroll.read(window.innerWidth <= 800)
  let frame = 0
  let previousTime = 0
  let needsRefresh = false

  function render(time: number) {
    frame = 0
    if (document.hidden) return
    if (needsRefresh) { scroll.refresh(); needsRefresh = false }
    const target = scroll.read(window.innerWidth <= 800)
    const amount = reduced.matches || root.dataset.motion === "paused" ? 1 : 1 - Math.exp(-Math.min(50, time - (previousTime || time - 16)) / 140)
    previousTime = time
    let unsettled = false
    for (const property of Object.keys(current) as (keyof typeof current)[]) {
      current[property] = interpolate(current[property], target[property], amount)
      if (Math.abs(current[property] - target[property]) > .002) unsettled = true
    }
    root.style.setProperty("--page-bg", `rgb(${current.red.toFixed(1)} ${current.green.toFixed(1)} ${current.blue.toFixed(1)})`)
    // Switch ink at the contrast threshold; interpolating both ink and paper
    // through the same grey would briefly make them indistinguishable.
    const lightInk = current.light > .5
    root.style.setProperty("--text-primary", lightInk ? "#181b16" : "#ecece7")
    root.style.setProperty("--text-secondary", lightInk ? "#34392e" : "#b0b4a7")
    root.style.setProperty("--line-color", `rgb(${interpolate(63, 173, current.light)} ${interpolate(65, 175, current.light)} ${interpolate(57, 162, current.light)})`)
    root.style.setProperty("--atmosphere-x", `${current.x * 100}%`)
    stage.style.setProperty("--fallback-x", `${current.x * 100}%`)
    stage.style.setProperty("--fallback-y", `${current.y * 100}%`)
    stage.style.setProperty("--fallback-scale", String(current.scale))
    stage.style.setProperty("--fallback-opacity", String(current.opacity * .65))
    if (unsettled) schedule()
  }
  function schedule() { if (!frame && !document.hidden) frame = requestAnimationFrame(render) }
  function resize() { needsRefresh = true; schedule() }
  function visibility() { if (document.hidden) { cancelAnimationFrame(frame); frame = 0 } else { previousTime = 0; resize() } }
  const observer = new ResizeObserver(resize)
  observer.observe(document.body)
  window.addEventListener("scroll", schedule, { passive: true })
  window.addEventListener("resize", resize, { passive: true })
  window.addEventListener("artifact-motion-change", schedule)
  reduced.addEventListener("change", schedule)
  document.addEventListener("visibilitychange", visibility)
  schedule()
  return () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    window.removeEventListener("scroll", schedule)
    window.removeEventListener("resize", resize)
    window.removeEventListener("artifact-motion-change", schedule)
    reduced.removeEventListener("change", schedule)
    document.removeEventListener("visibilitychange", visibility)
    for (const property of ["--page-bg", "--text-primary", "--text-secondary", "--line-color", "--atmosphere-x"]) root.style.removeProperty(property)
  }
}
