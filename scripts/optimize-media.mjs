import { readdir, mkdir, stat } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const publicDirectory = path.resolve("public")
const outputDirectory = path.join(publicDirectory, "media")
const primaryImages = ["pc-creator-pro.png", "pc-creator-2.png", "vr-football-penalty-poster.png", "game-designer-certificate.png"]

async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(entries.map(entry => entry.isDirectory()
    ? collect(path.join(directory, entry.name))
    : /\.png$/i.test(entry.name) ? [path.join(directory, entry.name)] : []))
  return files.flat()
}

const images = [...primaryImages.map(file => path.join(publicDirectory, file)), ...await collect(path.join(publicDirectory, "games-lab"))]
let originalBytes = 0
let outputBytes = 0
for (const source of images) {
  const relative = path.relative(publicDirectory, source)
  const destination = path.join(outputDirectory, relative.replace(/\.png$/i, ".webp"))
  await mkdir(path.dirname(destination), { recursive: true })
  await sharp(source).rotate().resize({ width: relative.startsWith("games-lab") ? 800 : 1280, height: 1280, fit: "inside", withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toFile(destination)
  originalBytes += (await stat(source)).size
  outputBytes += (await stat(destination)).size
}
console.log(`${images.length} images: ${(originalBytes / 1024 / 1024).toFixed(2)} MB → ${(outputBytes / 1024 / 1024).toFixed(2)} MB (${Math.round((1 - outputBytes / originalBytes) * 100)}% smaller). Originals preserved.`)
