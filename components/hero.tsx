"use client"

import { ArrowDown, Check, Download, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { profile } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n/language-context"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-28 pb-20">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {t.hero.status}
        </div>

        <h1 className="text-balance font-heading text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
          {profile.name}
        </h1>

        <p className="mt-4 font-mono text-base text-primary text-glow sm:text-lg">{t.profile.role}</p>

        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t.profile.subtitle}
        </p>

        <div className="mt-7 w-full max-w-2xl rounded-3xl border border-border glass px-4 py-4 sm:px-5">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{t.hero.availableFor}</p>
          <ul className="mt-3 grid gap-2 text-left text-sm text-muted-foreground sm:grid-cols-2">
            {t.hero.availabilityItems.map((item) => (
              <li key={item} className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Button
            render={<a href="#projects" />}
            nativeButton={false}
            size="lg"
            className="rounded-full px-7 font-medium"
          >
            {t.hero.viewProjects}
            <ArrowDown className="size-4" />
          </Button>
          <Button
            render={<a href={profile.links.email} />}
            nativeButton={false}
            size="lg"
            variant="outline"
            className="rounded-full border-border bg-card/40 px-7 font-medium backdrop-blur hover:bg-secondary"
          >
            <Mail className="size-4" />
            {t.hero.contactMe}
          </Button>
          <Button
            render={<a href={profile.links.cv} download aria-label={t.hero.downloadCvAria} />}
            nativeButton={false}
            size="lg"
            variant="outline"
            className="rounded-full border-border bg-card/40 px-7 font-medium backdrop-blur hover:bg-secondary"
          >
            <Download className="size-4" />
            {t.hero.downloadCv}
          </Button>
        </div>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {t.profile.badges.map((badge) => (
            <li
              key={badge}
              className="rounded-full border border-border glass px-3.5 py-1.5 text-xs font-medium text-foreground/80"
            >
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
