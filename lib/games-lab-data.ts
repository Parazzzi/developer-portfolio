export type GamesLabOrientation = "vertical" | "horizontal"

export const gamesLabItems = [
  {
    id: "2048",
    title: "2048",
    folderName: "2048",
    orientation: "vertical",
  },
  {
    id: "bvda-match-arena",
    title: "BVDA Match Arena",
    folderName: "BVDA Match Arena",
    orientation: "vertical",
  },
  {
    id: "cyberyolk",
    title: "CyberYolk",
    folderName: "CyberYolk",
    orientation: "vertical",
  },
  {
    id: "darksummoning",
    title: "DarkSummoning",
    folderName: "DarkSummoning",
    orientation: "vertical",
  },
  {
    id: "feathermoon",
    title: "FeatherMoon",
    folderName: "FeatherMoon",
    orientation: "vertical",
  },
  {
    id: "fistcraft",
    title: "Fistcraft",
    folderName: "Fistcraft",
    orientation: "vertical",
  },
  {
    id: "lexpunk",
    title: "Lexpunk",
    folderName: "Lexpunk",
    orientation: "vertical",
  },
  {
    id: "meowtubes",
    title: "Meowtubes",
    folderName: "Meowtubes",
    orientation: "vertical",
  },
  {
    id: "queue-dash",
    title: "Queue Dash",
    folderName: "Queue Dash",
    orientation: "vertical",
  },
  {
    id: "tamagichi-tramp",
    title: "Tamagichi Tramp",
    folderName: "Tamagichi Tramp",
    orientation: "vertical",
  },
  {
    id: "valdrisrun",
    title: "ValdrisRun",
    folderName: "ValdrisRun",
    orientation: "horizontal",
  },
] as const satisfies readonly {
  id: string
  title: string
  folderName: string
  orientation: GamesLabOrientation
}[]

export type GamesLabItemId = (typeof gamesLabItems)[number]["id"]

export type GamesLabItem = {
  id: GamesLabItemId
  title: string
  folderName: string
  orientation: GamesLabOrientation
}

export type ResolvedGamesLabItem = GamesLabItem & {
  images: string[]
  previewImage: string | null
}

export type GamesLabContent = {
  shortDescription: string
  fullDescription: string
  genre: string
}
