import {
  ACESFilmicToneMapping, AmbientLight, DirectionalLight, MathUtils,
  PerspectiveCamera, PMREMGenerator, Scene, SRGBColorSpace, Vector2, WebGLRenderer,
} from "three"
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js"
import { getArtifactQuality } from "./quality"
import { createSculpture } from "./sculpture"
import { createScrollState, type ArtifactState } from "./scroll-state"

const CAMERA_DISTANCE = 8
const CAMERA_FOV = 36
const MAX_DELTA = 0.05

export function createArtifactRuntime(canvas: HTMLCanvasElement, stage: HTMLDivElement) {
  const quality = getArtifactQuality()
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: !quality.lowPower, powerPreference: "low-power", stencil: false })
  renderer.setPixelRatio(quality.pixelRatio)
  renderer.setClearColor(0x050505, 0)
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.25

  const scene = new Scene()
  const camera = new PerspectiveCamera(CAMERA_FOV, 1, 0.1, 30)
  camera.position.z = CAMERA_DISTANCE
  const environmentSource = new RoomEnvironment()
  const environmentGenerator = new PMREMGenerator(renderer)
  const environment = environmentGenerator.fromScene(environmentSource, 0.025)
  scene.environment = environment.texture
  scene.environmentIntensity = 1.25
  environmentSource.dispose()
  environmentGenerator.dispose()

  scene.add(new AmbientLight(0xdbe3d2, 0.7))
  const key = new DirectionalLight(0xf0f4e9, 5)
  key.position.set(-3, 4, 5)
  scene.add(key)
  const rim = new DirectionalLight(0xe5efd5, 3.5)
  rim.position.set(4, -1, -2)
  scene.add(rim)

  const sculpture = createSculpture(quality)
  scene.add(sculpture.group)
  const scrollState = createScrollState()
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)")
  const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
  const pointer = new Vector2()
  const smoothedPointer = new Vector2()
  const neutralPointer = new Vector2()
  const current = scrollState.read(quality.compact)
  const stateKeys = Object.keys(current) as (keyof ArtifactState)[]
  let target = { ...current }
  let frame = 0
  let previousTime = 0
  let elapsed = 0
  let destroyed = false
  let lost = false
  let dirty = true
  let resizePending = true
  let paused = document.documentElement.dataset.motion === "paused"
  let frameSamples = 0
  let frameTotal = 0
  let adapted = false
  let viewportWidth = window.innerWidth
  let viewportHeight = window.innerHeight

  function animationAllowed() {
    return !paused && !motionPreference.matches
  }

  function resize() {
    viewportWidth = window.innerWidth
    viewportHeight = window.innerHeight
    quality.compact = viewportWidth < 768
    camera.aspect = viewportWidth / viewportHeight
    camera.updateProjectionMatrix()
    renderer.setSize(viewportWidth, viewportHeight, false)
    scrollState.refresh()
    resizePending = false
    dirty = true
  }

  function requestFrame() {
    if (!frame && !destroyed && !lost && !document.hidden) frame = window.requestAnimationFrame(render)
  }

  function render(timestamp: number) {
    frame = 0
    if (destroyed || lost || document.hidden) return
    if (resizePending) resize()
    const delta = previousTime ? Math.min((timestamp - previousTime) / 1000, MAX_DELTA) : 1 / 60
    const frameDuration = previousTime ? timestamp - previousTime : 16.7
    previousTime = timestamp
    const animated = animationAllowed()
    if (animated) elapsed += delta
    if (dirty) {
      target = scrollState.read(quality.compact)
      dirty = false
    }

    // A critically damped feeling without a scroll hijack or a second scroll engine.
    const interpolation = animated ? 1 - Math.exp(-delta * 5.5) : 1
    for (const property of stateKeys) current[property] = MathUtils.lerp(current[property], target[property], interpolation)
    smoothedPointer.lerp(animated ? pointer : neutralPointer, interpolation)
    const visibleHeight = 2 * Math.tan(MathUtils.degToRad(CAMERA_FOV / 2)) * CAMERA_DISTANCE
    const visibleWidth = visibleHeight * camera.aspect
    sculpture.group.position.set((current.x - 0.5) * visibleWidth, (0.5 - current.y) * visibleHeight, 0)
    // Width constrains narrow screens independently of the browser's tall viewport.
    const baseScale = quality.compact ? Math.min(0.86, camera.aspect * 1.46) : 0.91
    sculpture.group.scale.setScalar(current.scale * baseScale)
    sculpture.group.rotation.set(
      current.rotationX + smoothedPointer.y * 0.11 + Math.sin(elapsed * 0.19) * 0.04,
      current.rotationY + smoothedPointer.x * 0.16 + elapsed * 0.035,
      current.rotationZ + Math.sin(elapsed * 0.13) * 0.035,
    )
    sculpture.update(current, elapsed)
    canvas.style.opacity = String(current.opacity)
    renderer.render(scene, camera)
    stage.dataset.ready = "true"

    // Sustained slow frames lower resolution once, avoiding quality oscillation.
    if (animated && !adapted && frameSamples < 180) {
      frameSamples += 1
      frameTotal += frameDuration
      if (frameSamples === 180) {
        if (frameTotal / frameSamples > 27) renderer.setPixelRatio(Math.max(0.85, quality.pixelRatio * 0.7))
        adapted = true
      }
    }
    if (animated) requestFrame()
  }

  function handleScroll() { dirty = true; requestFrame() }
  function handleResize() { resizePending = true; requestFrame() }
  function handlePointer(event: PointerEvent) {
    if (!precisePointer.matches || !animationAllowed()) return
    pointer.set(event.clientX / viewportWidth * 2 - 1, event.clientY / viewportHeight * 2 - 1)
  }
  function handlePointerLeave() { pointer.set(0, 0) }
  function handleVisibility() {
    if (document.hidden) {
      window.cancelAnimationFrame(frame)
      frame = 0
    } else {
      previousTime = 0
      dirty = true
      requestFrame()
    }
  }
  function handleMotion(event?: Event) {
    if (event?.type === "artifact-motion-change") paused = (event as CustomEvent<boolean>).detail
    dirty = true
    previousTime = 0
    requestFrame()
  }
  function handleContextLost(event: Event) {
    event.preventDefault()
    lost = true
    stage.dataset.ready = "false"
    window.cancelAnimationFrame(frame)
    frame = 0
  }
  function handleContextRestored() {
    lost = false
    resizePending = true
    previousTime = 0
    requestFrame()
  }

  const resizeObserver = new ResizeObserver(handleResize)
  resizeObserver.observe(document.body)
  window.addEventListener("scroll", handleScroll, { passive: true })
  window.addEventListener("resize", handleResize, { passive: true })
  window.addEventListener("pointermove", handlePointer, { passive: true })
  document.documentElement.addEventListener("pointerleave", handlePointerLeave)
  document.addEventListener("visibilitychange", handleVisibility)
  window.addEventListener("artifact-motion-change", handleMotion)
  motionPreference.addEventListener("change", handleMotion)
  canvas.addEventListener("webglcontextlost", handleContextLost)
  canvas.addEventListener("webglcontextrestored", handleContextRestored)
  requestFrame()

  return () => {
    destroyed = true
    window.cancelAnimationFrame(frame)
    resizeObserver.disconnect()
    window.removeEventListener("scroll", handleScroll)
    window.removeEventListener("resize", handleResize)
    window.removeEventListener("pointermove", handlePointer)
    document.documentElement.removeEventListener("pointerleave", handlePointerLeave)
    document.removeEventListener("visibilitychange", handleVisibility)
    window.removeEventListener("artifact-motion-change", handleMotion)
    motionPreference.removeEventListener("change", handleMotion)
    canvas.removeEventListener("webglcontextlost", handleContextLost)
    canvas.removeEventListener("webglcontextrestored", handleContextRestored)
    sculpture.dispose()
    environment.dispose()
    renderer.dispose()
    renderer.forceContextLoss()
  }
}
