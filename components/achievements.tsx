"use client"

import Image from "next/image"
import { SectionHeading } from "@/components/section-heading"
import { achievementItems } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n/language-context"

export function Achievements() {
  const { t } = useLanguage()
  const achievements = achievementItems.map((achievement) => ({
    ...achievement,
    ...t.achievements.items[achievement.id],
  }))

  return (
    <section id="achievements" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow={t.achievements.eyebrow}
          title={t.achievements.title}
          description={t.achievements.description}
        />

        <div className="mx-auto mt-14 grid w-full max-w-sm gap-6">
          {achievements.map((achievement) => (
            <article
              key={achievement.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border glass transition-all duration-300 hover:-translate-y-1.5 hover:glow-ring"
            >
              <div className="relative aspect-video overflow-hidden bg-secondary/50">
                <Image
                  src={achievement.image}
                  alt={achievement.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 384px"
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{achievement.meta}</p>
                <h3 className="mt-3 font-heading text-xl font-semibold tracking-tight">{achievement.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {achievement.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {achievement.tags.map((tag) => (
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
          ))}
        </div>
      </div>
    </section>
  )
}
