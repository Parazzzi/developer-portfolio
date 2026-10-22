"use client"

import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/section-heading"
import { petProject } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n/language-context"
import { formatMessage } from "@/lib/i18n/translations"

export function PetProject() {
  const { t } = useLanguage()

  return (
    <section id="pet-project" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeading
          eyebrow={t.petProject.eyebrow}
          title={t.petProject.title}
          description={t.petProject.description}
        />

        <article className="glass glow-ring mt-14 overflow-hidden rounded-2xl border border-border">
          <div className="relative aspect-video overflow-hidden bg-secondary">
            <iframe
              className="h-full w-full"
              src={petProject.youtubeEmbedUrl}
              title={formatMessage(t.projects.card.gameplayVideoTitle, { title: petProject.title })}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-heading text-2xl font-semibold tracking-tight">{petProject.title}</h3>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  {t.petProject.status}
                </span>
              </div>
              <Button
                render={<a href={petProject.link} target="_blank" rel="noopener noreferrer" />}
                nativeButton={false}
                size="lg"
                className="self-start rounded-full px-6 font-medium sm:self-auto"
              >
                {t.petProject.playButton}
                <ArrowUpRight className="size-4" />
              </Button>
            </div>

            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {t.petProject.highlights.map((highlight, i) => (
                <li key={highlight.title} className="flex gap-3">
                  <span className="mt-0.5 font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{highlight.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{highlight.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <ul className="mt-8 flex flex-wrap gap-2">
              {t.petProject.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs font-medium text-foreground/75"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  )
}
