"use client"

import { useState } from "react"
import { Pause, Play } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export function MotionControl() {
  const [paused, setPaused] = useState(false)
  const { language } = useLanguage()

  function toggleMotion() {
    const next = !paused
    setPaused(next)
    document.documentElement.dataset.motion = next ? "paused" : "running"
    window.dispatchEvent(new CustomEvent("artifact-motion-change", { detail: next }))
  }

  return (
    <button type="button" className="motion-control" onClick={toggleMotion} aria-pressed={paused}
      aria-label={language === "en" ? "Pause decorative motion" : "Призупинити декоративну анімацію"}>
      {paused ? <Play size={12} /> : <Pause size={12} />}
      <span>{language === "en" ? (paused ? "Motion off" : "Motion on") : (paused ? "Рух вимкнено" : "Рух увімкнено")}</span>
    </button>
  )
}
