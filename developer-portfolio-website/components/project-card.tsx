"use client"

import { useRef } from "react"
import Image from "next/image"
import { ArrowUpRight, FileText, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/portfolio-data"

export function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }

  const handleLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <article
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border glass transition-all duration-300 hover:-translate-y-1.5 hover:glow-ring"
    >
      {/* video preview area */}
      <div className="relative aspect-video overflow-hidden bg-secondary">
        {project.video ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={project.video}
            poster={project.poster}
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : project.poster ? (
          <Image
            src={project.poster || "/placeholder.svg"}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">No preview</div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />

        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground/90 backdrop-blur">
          <Play className="size-3 fill-primary text-primary" />
          Gameplay preview
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-xl font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs font-medium text-foreground/75"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-2">
          <Button
            render={<a href={project.link} target="_blank" rel="noopener noreferrer" />}
            size="sm"
            className="rounded-full font-medium"
          >
            Open project
            <ArrowUpRight className="size-4" />
          </Button>
          {project.caseStudy ? (
            <Button
              render={<a href={project.caseStudy} target="_blank" rel="noopener noreferrer" />}
              size="sm"
              variant="outline"
              className="rounded-full border-border bg-transparent font-medium hover:bg-secondary"
            >
              <FileText className="size-4" />
              Case study
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  )
}
