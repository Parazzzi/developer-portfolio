import {
  AdditiveBlending, BufferGeometry, Color, DodecahedronGeometry, EdgesGeometry,
  Float32BufferAttribute, Group, IcosahedronGeometry, LineBasicMaterial, LineSegments,
  MathUtils, Mesh, MeshPhysicalMaterial, MeshStandardMaterial, OctahedronGeometry,
  Points, PointsMaterial, TorusGeometry, Vector3,
} from "three"
import { createBladeGeometry } from "./geometry"
import type { ArtifactQuality } from "./quality"
import type { ArtifactState } from "./scroll-state"

const LIME = 0xc6f36b
const TURN = Math.PI * 2

export function createSculpture(quality: ArtifactQuality) {
  const group = new Group()
  const optical = new Group()
  const mechanism = new Group()
  const orbit = new Group()
  group.add(optical, mechanism, orbit)

  const chrome = new MeshPhysicalMaterial({
    color: 0xb8bdb9, metalness: 1, roughness: 0.23,
    clearcoat: 1, clearcoatRoughness: 0.18, envMapIntensity: 1.65,
  })
  const blackMetal = new MeshPhysicalMaterial({
    color: 0x252a25, metalness: 0.96, roughness: 0.26,
    clearcoat: 0.8, envMapIntensity: 1.5,
  })
  const porcelain = new MeshStandardMaterial({
    color: 0xb3b9a9, metalness: 0.87, roughness: 0.3, envMapIntensity: 1.4,
  })
  const glass = new MeshPhysicalMaterial({
    color: 0xd7e1cf, metalness: 0.1, roughness: 0.07,
    transmission: quality.transmission, transparent: true,
    opacity: quality.lowPower ? 0.21 : 0.66, thickness: 1.1,
    ior: 1.48, clearcoat: 1, envMapIntensity: 1.6,
    depthWrite: false,
  })
  const coreMaterial = new MeshPhysicalMaterial({
    color: 0xabc64b, metalness: 0.48, roughness: 0.24,
    emissive: new Color(LIME), emissiveIntensity: 0.22,
    clearcoat: 1, envMapIntensity: 1.3,
  })
  const wireMaterial = new LineBasicMaterial({ color: 0x9caa90, transparent: true, opacity: 0.25 })
  const accentWire = new LineBasicMaterial({ color: LIME, transparent: true, opacity: 0.36 })

  const fragments: { mesh: Mesh; direction: Vector3; phase: number }[] = []
  const segments = 4
  for (let index = 0; index < segments; index++) {
    const start = (index / segments) * TURN + 0.08
    const end = ((index + 1) / segments) * TURN - 0.08
    const geometry = createBladeGeometry(start, end, quality.curveSegments, quality.crossSegments)
    const mesh = new Mesh(geometry, chrome)
    optical.add(mesh)
    fragments.push({ mesh, direction: new Vector3(Math.cos((start + end) / 2), Math.sin((start + end) / 2), 0), phase: index })

    // The dark second milling follows the outside shell, leaving a clean reveal.
    const inlay = new Mesh(geometry, blackMetal)
    inlay.scale.set(0.83, 0.83, 1.1)
    inlay.rotation.y = 0.16
    inlay.position.z = -0.1
    optical.add(inlay)
    fragments.push({ mesh: inlay, direction: new Vector3(Math.cos((start + end) / 2), Math.sin((start + end) / 2), -0.16), phase: index + 4 })
  }

  // A second, incomplete orbit cuts through the aperture at a different angle.
  for (let index = 0; index < 2; index++) {
    const geometry = createBladeGeometry(index * Math.PI + 0.15, (index + 1) * Math.PI - 0.15, quality.curveSegments, quality.crossSegments)
    const mesh = new Mesh(geometry, porcelain)
    mesh.scale.set(0.72, 0.83, 0.6)
    orbit.add(mesh)
  }
  orbit.rotation.set(0.5, 1.13, -0.34)

  const innerCore = new Mesh(new DodecahedronGeometry(0.46, 0), blackMetal)
  innerCore.scale.set(0.92, 1.34, 0.92)
  mechanism.add(innerCore)
  const seed = new Mesh(new OctahedronGeometry(0.28, 0), coreMaterial)
  seed.scale.set(0.75, 1.6, 0.75)
  seed.position.set(0, 0.14, 0.42)
  mechanism.add(seed)

  const crystalGeometry = new OctahedronGeometry(0.85, 0)
  const crystal = new Mesh(crystalGeometry, glass)
  crystal.scale.set(0.78, 1.21, 0.7)
  crystal.rotation.y = Math.PI / 4
  mechanism.add(crystal)
  const crystalEdges = new LineSegments(new EdgesGeometry(crystalGeometry), wireMaterial)
  crystalEdges.scale.copy(crystal.scale)
  crystalEdges.rotation.copy(crystal.rotation)
  mechanism.add(crystalEdges)

  const coreSource = new IcosahedronGeometry(0.55, 0)
  const coreLines = new LineSegments(new EdgesGeometry(coreSource), accentWire)
  coreSource.dispose()
  coreLines.scale.set(1, 1.35, 1)
  mechanism.add(coreLines)

  // Seven isolated fins make the inner assembly legible as a computational object.
  const fins: Mesh[] = []
  const finGeometry = new TorusGeometry(0.55, 0.015, 5, quality.lowPower ? 32 : 64)
  for (let index = 0; index < 7; index++) {
    const fin = new Mesh(finGeometry, index === 3 ? coreMaterial : chrome)
    fin.rotation.x = Math.PI / 2
    fin.position.y = (index - 3) * 0.17
    const scale = 1 - Math.abs(index - 3) * 0.12
    fin.scale.setScalar(scale)
    mechanism.add(fin)
    fins.push(fin)
  }

  // Fine instrument rails give the thick blades a precise, contrasting edge.
  const railGeometry = new TorusGeometry(1.55, 0.004, 4, quality.lowPower ? 96 : 160)
  const rail = new Mesh(railGeometry, porcelain)
  rail.scale.y = 1.17
  rail.rotation.x = -0.16
  rail.position.z = -0.13
  optical.add(rail)

  const dustPositions = new Float32Array(quality.particles * 3)
  // Deterministic distribution avoids content-dependent visual changes on remount.
  for (let index = 0; index < quality.particles; index++) {
    const angle = index * 2.39996323
    const radius = 1.85 + (index % 7) * 0.075
    dustPositions[index * 3] = Math.cos(angle) * radius
    dustPositions[index * 3 + 1] = Math.sin(angle) * radius * 1.05
    dustPositions[index * 3 + 2] = Math.sin(index * 1.79) * 0.85
  }
  const dustGeometry = new BufferGeometry()
  dustGeometry.setAttribute("position", new Float32BufferAttribute(dustPositions, 3))
  const dustMaterial = new PointsMaterial({ color: 0xb7c4a3, size: 0.008, transparent: true, opacity: 0.48, blending: AdditiveBlending, depthWrite: false })
  const dust = new Points(dustGeometry, dustMaterial)
  group.add(dust)
  const chromeDark = new Color(0x434b3f)
  const chromeLight = new Color(0xb8bdb9)
  const wireDark = new Color(0x2a3824)
  const wireLight = new Color(0x9caa90)

  function update(state: ArtifactState, time: number) {
    for (const fragment of fragments) {
      fragment.mesh.position.copy(fragment.direction).multiplyScalar(state.spread * 0.64)
      fragment.mesh.position.z += Math.sin(fragment.phase * 1.7) * state.spread * 0.35
      fragment.mesh.rotation.z = Math.sin(fragment.phase * 1.37) * state.spread * 0.12
    }
    orbit.rotation.y = 1.13 + time * 0.065 + state.spread * 0.6
    orbit.rotation.x = 0.5 + Math.sin(time * 0.15) * 0.12
    mechanism.rotation.y = -time * 0.11
    coreLines.rotation.y = time * 0.075
    seed.rotation.y = time * 0.18
    dust.rotation.z = -time * 0.018
    glass.opacity = quality.lowPower ? MathUtils.lerp(0.12, 0.33, state.crystal) : MathUtils.lerp(0.4, 0.8, state.crystal)
    chrome.roughness = MathUtils.lerp(0.23, 0.36, state.wire)
    chrome.color.copy(chromeLight).lerp(chromeDark, state.light)
    wireMaterial.color.copy(wireLight).lerp(wireDark, state.light)
    chrome.wireframe = state.wire > 0.82
    porcelain.wireframe = state.wire > 0.82
    blackMetal.wireframe = state.wire > 0.9
    wireMaterial.opacity = MathUtils.lerp(0.2, 0.7, state.wire)
    accentWire.opacity = MathUtils.lerp(0.22, 0.5, state.wire)
    coreMaterial.emissiveIntensity = 0.18 + state.crystal * 0.13
    for (let index = 0; index < fins.length; index++) fins[index].position.y = (index - 3) * (0.17 + state.spread * 0.085)
  }

  function dispose() {
    const geometries = new Set<BufferGeometry>()
    group.traverse(object => {
      if (object instanceof Mesh || object instanceof LineSegments || object instanceof Points) geometries.add(object.geometry)
    })
    geometries.forEach(geometry => geometry.dispose())
    for (const material of [chrome, blackMetal, porcelain, glass, coreMaterial, wireMaterial, accentWire, dustMaterial]) material.dispose()
  }

  return { group, update, dispose }
}
