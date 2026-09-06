import { BufferGeometry, Float32BufferAttribute } from "three"

/** A milled, twisting elliptical blade. Its changing section catches long studio reflections. */
export function createBladeGeometry(start: number, end: number, steps: number, sides: number) {
  const positions: number[] = []
  const indices: number[] = []

  for (let step = 0; step <= steps; step++) {
    const progress = step / steps
    const angle = start + (end - start) * progress
    const taper = 0.67 + Math.sin(progress * Math.PI) * 0.33
    const twist = angle * 0.6 + 0.34
    const radius = 1.37 + Math.sin(angle * 2) * 0.055

    for (let side = 0; side <= sides; side++) {
      const cross = (side / sides) * Math.PI * 2
      // A soft rectangular cross-section feels machined rather than inflated.
      const radial = Math.sign(Math.cos(cross)) * Math.pow(Math.abs(Math.cos(cross)), 0.55) * 0.19 * taper
      const depth = Math.sign(Math.sin(cross)) * Math.pow(Math.abs(Math.sin(cross)), 0.55) * 0.1 * taper
      const radialTwisted = radial * Math.cos(twist) - depth * Math.sin(twist)
      const depthTwisted = radial * Math.sin(twist) + depth * Math.cos(twist)
      positions.push(
        Math.cos(angle) * (radius + radialTwisted),
        Math.sin(angle) * (radius + radialTwisted) * 1.17,
        Math.sin(angle * 2) * 0.12 + depthTwisted,
      )

      if (step < steps && side < sides) {
        const index = step * (sides + 1) + side
        indices.push(index, index + sides + 1, index + 1, index + 1, index + sides + 1, index + sides + 2)
      }
    }
  }

  // Close the cut faces; the interruptions are a deliberate part of the sculpture.
  for (const row of [0, steps]) {
    const offset = row * (sides + 1)
    for (let side = 1; side < sides - 1; side++) {
      if (row === 0) indices.push(offset, offset + side, offset + side + 1)
      else indices.push(offset, offset + side + 1, offset + side)
    }
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}
