"use client"

import type { ReactNode } from "react"
import { SectionHeading } from "@/components/section-heading"
import { ProjectCard } from "@/components/project-card"
import { projectItems } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n/language-context"

export function ProjectsGridClient({ gamesLab }: { gamesLab: ReactNode }) {
  const { t } = useLanguage()
  const projects = projectItems.map((project) => ({
    ...project,
    ...t.projects.items[project.id],
  }))

  return (
    <section id="projects" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          description={t.projects.description}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {gamesLab}
      </div>
    </section>
  )
}
