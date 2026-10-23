"use client"

import { useEffect } from "react"
import { startVisitTracking } from "@/lib/visit-tracking"

export function VisitTracker() {
  useEffect(() => startVisitTracking(), [])

  return null
}
