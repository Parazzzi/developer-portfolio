import { GamesLab } from "@/components/games-lab"
import { ProjectsGridClient } from "@/components/projects-grid-client"

export function ProjectsGrid() {
  return <ProjectsGridClient gamesLab={<GamesLab />} />
}
