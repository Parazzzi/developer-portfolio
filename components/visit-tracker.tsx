"use client"

import { useEffect } from "react"
import { trackVisit } from "@/lib/visit-tracking"

export function VisitTracker() {
  useEffect(() => {
    trackVisit()
  }, [])

  return null
}
