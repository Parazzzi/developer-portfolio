"use client"

import Image from "next/image"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { achievementItems, profile } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n/language-context"

export function About() {
  const { t } = useLanguage()
  const certificate = achievementItems.find((achievement) => achievement.id === "game-designer-certificate")

  return (
    <section id="about" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
      <div className="site-shell">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-start">
          <div className="min-w-0">
            <p className="section-kicker">{t.about.eyebrow}</p>
            <h2 className="mt-4 text-balance font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {t.about.title}
            </h2>
            <div className="mt-6 grid gap-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.about.stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-white/10 bg-surface/70 p-4">
                  <p className="font-heading text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-orange/20 bg-orange/[0.055] p-5">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-orange">{t.about.availabilityLabel}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {t.about.availabilityItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                render={<a href={profile.links.cv} download aria-label={t.nav.downloadCvAria} />}
                nativeButton={false}
                className="mt-5 rounded-md font-semibold"
              >
                <Download className="size-4" />
                {t.hero.downloadCv}
              </Button>
            </div>
          </div>

          <aside className="grid min-w-0 gap-4">
            <div className="technical-surface rounded-xl p-5">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan">{t.about.certificate.label}</p>
              <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight">{t.about.certificate.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.about.certificate.description}</p>
              {certificate ? (
                <div className="media-frame mt-5 aspect-[3166/2000] rounded-lg">
                  <Image
                    src={certificate.image}
                    alt={t.about.certificate.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 430px"
                    className="object-contain bg-background/50 p-2"
                    loading="lazy"
                  />
                </div>
              ) : null}
            </div>

            <div className="rounded-lg border border-white/10 bg-surface/60 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">AI</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.about.aiNote}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
