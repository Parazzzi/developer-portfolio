"use client"

import { useState, type PointerEvent } from "react"
import Image from "next/image"
import { ArrowDown, ArrowUpRight, Download, Mail, Send } from "lucide-react"
import { LinkedinIcon } from "@/components/brand-icons"
import { CinematicVideo } from "@/components/media-preview"
import { Button } from "@/components/ui/button"
import { profile, projectItems } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n/language-context"
import { formatMessage } from "@/lib/i18n/translations"

export function Hero() {
  const { t } = useLanguage()
  const [depth, setDepth] = useState({ x: 0, y: 0 })
  const pcCreator3 = projectItems.find((project) => project.id === "pc-creator-3")
  const pcCreator2 = projectItems.find((project) => project.id === "pc-creator-2")
  const vrProject = projectItems.find((project) => project.id === "vr-football-penalty")

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    setDepth({
      x: (event.clientX - bounds.left) / bounds.width - 0.5,
      y: (event.clientY - bounds.top) / bounds.height - 0.5,
    })
  }

  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pt-28 pb-16 sm:px-6 lg:min-h-[92svh] lg:pt-32"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setDepth({ x: 0, y: 0 })}
    >
      <div className="editorial-shell grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(540px,1.08fr)] lg:items-center">
        <div className="reveal-up min-w-0">
          <p className="section-kicker">{t.hero.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-balance font-heading text-5xl font-semibold leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
            {t.hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t.hero.subtitle}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {t.profile.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-md border border-white/10 bg-surface/70 px-3 py-1.5 text-xs font-semibold text-foreground/85"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button render={<a href="#work" />} nativeButton={false} size="lg" className="h-11 rounded-md px-5 font-semibold">
              {t.hero.primaryCta}
              <ArrowDown className="size-4" />
            </Button>
            <Button
              render={<a href={profile.links.cv} download aria-label={t.nav.downloadCvAria} />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="h-11 rounded-md border-white/10 bg-surface/70 px-5 font-semibold hover:bg-white/10"
            >
              <Download className="size-4" />
              {t.hero.downloadCv}
            </Button>
            <Button
              render={<a href="#contact" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="h-11 rounded-md border-white/10 bg-transparent px-5 font-semibold hover:bg-white/10"
            >
              <Mail className="size-4" />
              {t.hero.contactCta}
            </Button>
          </div>

          <div className="mt-9 grid gap-4 border-l border-white/10 pl-4 sm:grid-cols-3 sm:border-l-0 sm:pl-0">
            {t.hero.stats.map((stat) => (
              <div key={stat.label} className="sm:border-l sm:border-white/10 sm:pl-4">
                <p className="font-heading text-xl font-semibold text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="mr-1 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {t.hero.socialLabel}
            </span>
            <a
              href={profile.links.email}
              className="inline-flex items-center gap-1.5 text-foreground underline-offset-4 hover:text-orange hover:underline"
            >
              <Mail className="size-4" />
              {t.common.email}
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={formatMessage(t.common.externalLinkAria, { label: t.common.linkedin })}
              className="inline-flex items-center gap-1.5 text-foreground underline-offset-4 hover:text-orange hover:underline"
            >
              <LinkedinIcon className="size-4" />
              {t.common.linkedin}
            </a>
            <a
              href={profile.links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={formatMessage(t.common.externalLinkAria, { label: t.common.telegram })}
              className="inline-flex items-center gap-1.5 text-foreground underline-offset-4 hover:text-orange hover:underline"
            >
              <Send className="size-4" />
              {t.common.telegram}
            </a>
            <a
              href={profile.links.funPortfolio3d}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={formatMessage(t.common.externalLinkAria, { label: t.hero.portfolio3d })}
              className="inline-flex items-center gap-1.5 text-foreground underline-offset-4 hover:text-orange hover:underline"
            >
              {t.hero.portfolio3d}
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>

        <div
          className="relative min-h-[34rem] min-w-0 lg:min-h-[42rem]"
          style={{
            transform: `translate3d(${depth.x * 10}px, ${depth.y * 8}px, 0)`,
          }}
        >
          <div className="absolute -inset-6 rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,107,53,0.16),transparent_34%,rgba(73,216,255,0.12))] opacity-80" />

          <div className="media-frame absolute inset-x-0 top-0 aspect-video rounded-lg lg:inset-x-4">
            {vrProject?.video && vrProject.poster ? (
              <CinematicVideo src={vrProject.video} poster={vrProject.poster} label={t.hero.mediaAlt} />
            ) : (
              <Image
                src="/vr-football-penalty-poster.png"
                alt={t.hero.mediaAlt}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 720px"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/76 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 sm:left-5 sm:right-5">
              <span className="cyan-kicker">{t.hero.mediaTitle}</span>
              <span className="max-w-md text-sm text-foreground/85">{t.hero.mediaSubtitle}</span>
            </div>
          </div>

          <div
            className="media-frame absolute bottom-4 left-0 hidden w-[42%] rotate-[-4deg] rounded-lg sm:block lg:bottom-16"
            style={{
              transform: `translate3d(${depth.x * -14}px, ${depth.y * -10}px, 0) rotate(-4deg)`,
            }}
          >
            <div className="relative aspect-square">
              <Image
                src={pcCreator3?.poster ?? "/pc-creator-pro.png"}
                alt={formatMessage(t.projects.card.previewAlt, { title: pcCreator3?.title ?? "PC Creator 3" })}
                fill
                sizes="(max-width: 1024px) 38vw, 280px"
                className="object-cover"
              />
            </div>
          </div>

          <div
            className="media-frame absolute bottom-16 right-0 w-[46%] rotate-[3deg] rounded-lg sm:bottom-10 lg:bottom-6"
            style={{
              transform: `translate3d(${depth.x * 16}px, ${depth.y * -12}px, 0) rotate(3deg)`,
            }}
          >
            <div className="relative aspect-square">
              <Image
                src={pcCreator2?.poster ?? "/pc-creator-2.png"}
                alt={formatMessage(t.projects.card.previewAlt, { title: pcCreator2?.title ?? "PC Creator 2" })}
                fill
                sizes="(max-width: 1024px) 42vw, 320px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="technical-surface absolute bottom-0 left-1/2 grid w-[min(27rem,88%)] -translate-x-1/2 gap-2 rounded-lg p-4 sm:left-auto sm:right-8 sm:w-72 sm:translate-x-0">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-orange">{t.nav.availability}</span>
              <span className="size-2 rounded-full bg-orange shadow-[0_0_18px_rgba(255,107,53,0.72)]" />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{t.profile.availability}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
