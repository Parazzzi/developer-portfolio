"use client"

import { useEffect, useRef } from "react"
import "./artifact.css"

/** Decorative, progressively enhanced WebGL; every portfolio detail stays in the DOM. */
export function ArtifactCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    let dispose: (() => void) | undefined
    const timer = window.setTimeout(async () => {
      if (cancelled || !canvasRef.current || !stageRef.current) return
      try {
        const { createArtifactRuntime } = await import("@/lib/artifacts/runtime")
        if (cancelled || !canvasRef.current || !stageRef.current) return
        dispose = createArtifactRuntime(canvasRef.current, stageRef.current)
      } catch {
        // WebGL is an enhancement. The composed static artifact remains visible.
        if (stageRef.current) stageRef.current.dataset.ready = "false"
      }
    }, 60)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      dispose?.()
    }
  }, [])

  return (
    <div className="artifact-stage" ref={stageRef} aria-hidden="true">
      <div className="artifact-fallback">
        <span className="artifact-fallback-orbit artifact-fallback-orbit-one" />
        <span className="artifact-fallback-orbit artifact-fallback-orbit-two" />
        <span className="artifact-fallback-orbit artifact-fallback-orbit-three" />
        <span className="artifact-fallback-core" />
      </div>
      <canvas className="artifact-canvas" ref={canvasRef} />
    </div>
  )
}
