export interface ArtifactQuality {
  compact: boolean
  lowPower: boolean
  pixelRatio: number
  curveSegments: number
  crossSegments: number
  particles: number
  transmission: number
}

export function getArtifactQuality(): ArtifactQuality {
  const compact = window.innerWidth <= 800
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  const lowPower = compact || (memory !== undefined && memory <= 4) || navigator.hardwareConcurrency <= 4

  return {
    compact,
    lowPower,
    pixelRatio: Math.min(window.devicePixelRatio || 1, lowPower ? 1.15 : 1.65),
    curveSegments: lowPower ? 32 : 56,
    crossSegments: lowPower ? 8 : 12,
    particles: lowPower ? 18 : 38,
    transmission: lowPower ? 0 : 0.65,
  }
}
