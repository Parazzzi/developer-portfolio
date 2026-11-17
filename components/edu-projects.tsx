"use client"

import { SectionHeading } from "@/components/section-heading"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { eduProjects } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n/language-context"
import { formatMessage } from "@/lib/i18n/translations"

export function EduProjects() {
  const { t } = useLanguage()
  const copy = t.eduProjects

  return (
    <section id="edu-projects" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {eduProjects.map((project) => {
            const item = copy.items[project.id]

            return (
              <article
                key={project.id}
                className="glass flex flex-col overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:glow-ring"
              >
                <div className="relative aspect-video overflow-hidden bg-secondary">
                  <YouTubeEmbed
                    src={project.youtubeEmbedUrl}
                    title={formatMessage(copy.videoTitle, { title: project.title })}
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-heading text-2xl font-semibold tracking-tight">{project.title}</h3>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {item.platform}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>

                  <ul className="mt-6 space-y-4">
                    {item.highlights.map((highlight, i) => (
                      <li key={highlight.title} className="flex gap-3">
                        <span className="mt-0.5 font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{highlight.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{highlight.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                    {item.tags.map((tag) => (
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
            )
          })}
        </div>
      </div>
    </section>
  )
}
