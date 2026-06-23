export type GamesLabOrientation = "vertical" | "horizontal"

export type GamesLabItem = {
  title: string
  folderName: string
  shortDescription: string
  fullDescription: string
  genre: string
  orientation: GamesLabOrientation
}

export type ResolvedGamesLabItem = GamesLabItem & {
  images: string[]
  previewImage: string | null
}

export const gamesLabItems: GamesLabItem[] = [
  {
    title: "2048",
    folderName: "2048",
    shortDescription: "Classic number puzzle based on merging tiles and reaching the highest possible score.",
    fullDescription:
      "A classic 2048-style mobile puzzle prototype focused on tile merging, score progression, and simple casual gameplay.",
    genre: "Number Puzzle / Casual",
    orientation: "vertical",
  },
  {
    title: "BVDA Match Arena",
    folderName: "BVDA Match Arena",
    shortDescription:
      "American football mini-game with two modes: scoring field goals and making accurate passes to teammates.",
    fullDescription:
      "A mobile American football prototype with two gameplay modes: kicking the ball into the goal and making precise passes to teammates.",
    genre: "Sports / Arcade",
    orientation: "vertical",
  },
  {
    title: "CyberYolk",
    folderName: "CyberYolk",
    shortDescription: "A classic Minesweeper-style puzzle game redesigned with a bright cyber-themed visual style.",
    fullDescription:
      "A cyber-themed Minesweeper-style mobile puzzle prototype focused on grid logic, risk-based choices, and clean mobile UI feedback.",
    genre: "Puzzle / Logic",
    orientation: "vertical",
  },
  {
    title: "DarkSummoning",
    folderName: "DarkSummoning",
    shortDescription: "A reaction-based arcade game where the player catches only the correct items to earn more points.",
    fullDescription:
      "A fast arcade prototype where the player must react quickly, collect only the correct items, avoid mistakes, and build a higher score.",
    genre: "Arcade / Reaction",
    orientation: "vertical",
  },
  {
    title: "Fistcraft",
    folderName: "Fistcraft",
    shortDescription:
      "A fighting game focused on choosing the right attacks and blocks to defeat the opponent. Supports two players on one phone.",
    fullDescription:
      "A local fighting prototype where players use correct attacks, blocks, and timing to defeat the opponent. The game can be played by two players on a single phone.",
    genre: "Fighting / Local Multiplayer",
    orientation: "vertical",
  },
  {
    title: "Lexpunk",
    folderName: "Lexpunk",
    shortDescription: "A memory quiz game where the player remembers words and objects to answer correctly.",
    fullDescription:
      "A memory-based quiz prototype focused on remembering words, objects, and visual details, then choosing the correct answers.",
    genre: "Quiz / Memory",
    orientation: "vertical",
  },
  {
    title: "Meowtubes",
    folderName: "Meowtubes",
    shortDescription:
      "A sorting puzzle where cats must be moved into tubes by color. Different colors cannot be mixed incorrectly.",
    fullDescription:
      "A mobile sorting puzzle prototype where the player moves cats between tubes and groups them by color while following placement rules.",
    genre: "Sorting Puzzle / Casual",
    orientation: "vertical",
  },
  {
    title: "Queue Dash",
    folderName: "Queue Dash",
    shortDescription: "A fast casual game where the player chooses the quickest checkout line to finish first and win.",
    fullDescription:
      "A casual decision-making prototype where the player must choose the fastest queue, avoid slow lines, and reach the checkout first.",
    genre: "Casual / Decision Game",
    orientation: "vertical",
  },
  {
    title: "Tamagichi Tramp",
    folderName: "Tamagichi Tramp",
    shortDescription:
      "A virtual pet-style game where the player supports the character's ego with gifts and office upgrades.",
    fullDescription:
      "A virtual pet-style prototype where the player gives gifts, improves the office, and keeps the character's ego high through upgrades and interaction.",
    genre: "Virtual Pet / Simulation",
    orientation: "vertical",
  },
  {
    title: "ValdrisRun",
    folderName: "ValdrisRun",
    shortDescription:
      "A vampire runner where the player survives as long as possible, avoids danger, collects coins, and transforms into a bat to fly.",
    fullDescription:
      "A horizontal runner prototype about a vampire trying to survive as long as possible. The player avoids obstacles, collects coins, and can transform into a bat to fly through the level.",
    genre: "Runner / Platformer / Arcade",
    orientation: "horizontal",
  },
]
