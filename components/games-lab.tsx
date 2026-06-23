import { existsSync, readdirSync } from "node:fs"
import path from "node:path"
import { GamesLabClient } from "@/components/games-lab-client"
import { gamesLabItems, type ResolvedGamesLabItem } from "@/lib/games-lab-data"

const gamesLabAssetsDirectory = path.join(process.cwd(), "public", "games-lab")
const supportedImageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp"])
const preferredPreviewPattern = /(cover|preview|main|thumbnail|thumb)/i

function toPublicImagePath(folderName: string, fileName: string) {
  return `/games-lab/${encodeURIComponent(folderName)}/${encodeURIComponent(fileName)}`
}

function collectImageFiles(folderName: string) {
  const folderPath = path.join(gamesLabAssetsDirectory, folderName)

  if (!existsSync(folderPath)) {
    return []
  }

  return readdirSync(folderPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && supportedImageExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" }))
}

function resolveGameImages(): ResolvedGamesLabItem[] {
  return gamesLabItems.map((game) => {
    const imageFiles = collectImageFiles(game.folderName)
    const previewFile = imageFiles.find((fileName) => preferredPreviewPattern.test(fileName)) ?? imageFiles[0]

    return {
      ...game,
      images: imageFiles.map((fileName) => toPublicImagePath(game.folderName, fileName)),
      previewImage: previewFile ? toPublicImagePath(game.folderName, previewFile) : null,
    }
  })
}

export function GamesLab() {
  return <GamesLabClient items={resolveGameImages()} />
}
