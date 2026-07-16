"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { ArrowUpRight, Boxes, Cpu, Gamepad2, Smartphone, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CinematicVideo, LazyYoutubeEmbed } from "@/components/media-preview"
import { profile, projectItems } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n/language-context"
import { formatMessage, type Translation } from "@/lib/i18n/translations"
import { cn } from "@/lib/utils"

const pcProjectIds = ["pc-creator-3", "pc-creator-3-pro", "pc-creator-2"] as const
type StaticProject = (typeof projectItems)[number]
type PcProject = Extract<StaticProject, { id: (typeof pcProjectIds)[number] }>
type VrProject = Extract<StaticProject, { id: "vr-football-penalty" }>

function isPcProject(project: StaticProject): project is PcProject {
  return (pcProjectIds as readonly string[]).includes(project.id)
}

function isVrProject(project: StaticProject): project is VrProject {
  return project.id === "vr-football-penalty"
}

function hasYoutubeEmbed(project: PcProject): project is PcProject & { youtubeEmbedUrl: string } {
  return "youtubeEmbedUrl" in project
}

export function ProjectsGridClient({ gamesLab }: { gamesLab: ReactNode }) {
  const { t } = useLanguage()
  const pcProjects = projectItems.filter(isPcProject)
  const pcHeroProject = pcProjects.find(hasYoutubeEmbed) ?? pcProjects[0]
  const vrProject = projectItems.find(isVrProject)

  return (
    <>
      <section id="work" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
        <div className="site-shell">
          <div className="max-w-3xl">
            <p className="section-kicker">{t.work.eyebrow}</p>
            <h2 className="mt-4 text-balance font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {t.work.title}
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">{t.work.description}</p>
          </div>

          <article className="mt-12 overflow-hidden rounded-xl border border-white/10 bg-surface/70 shadow-[0_26px_90px_rgba(0,0,0,0.34)]">
            <div className="grid grid-cols-[minmax(0,1fr)] gap-0 lg:grid-cols-[minmax(0,1.04fr)_minmax(420px,0.96fr)]">
              <div className="min-w-0 border-b border-white/10 p-4 sm:p-6 lg:border-r lg:border-b-0">
                <div className="media-frame aspect-video rounded-lg">
                  {pcHeroProject && hasYoutubeEmbed(pcHeroProject) ? (
                    <LazyYoutubeEmbed
                      title={formatMessage(t.projects.card.gameplayVideoTitle, { title: pcHeroProject.title })}
                      src={pcHeroProject.youtubeEmbedUrl}
                      poster={pcHeroProject.poster}
                      posterAlt={formatMessage(t.projects.card.previewAlt, { title: pcHeroProject.title })}
                      playLabel={t.common.playMedia}
                    />
                  ) : (
                    <Image
                      src={pcHeroProject?.poster ?? "/pc-creator-pro.png"}
                      alt={t.work.pc.mediaAlt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 620px"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {pcProjects.map((project) => (
                    <ProjectCover key={project.id} project={project} alt={t.projects.card.previewAlt} />
                  ))}
                </div>
              </div>

              <CaseStudyContent caseStudy={t.work.pc} accent="orange" icon={<Smartphone className="size-5" />} />
            </div>

            <div className="border-t border-white/10 p-4 sm:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-heading text-xl font-semibold tracking-tight">{t.work.pc.projectsLabel}</h3>
                <a
                  href={profile.links.funPortfolio3d}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange underline-offset-4 hover:underline"
                >
                  {t.hero.portfolio3d}
                  <ArrowUpRight className="size-4" />
                </a>
              </div>

              <div className="grid gap-3 lg:grid-cols-3">
                {pcProjects.map((project) => (
                  <ReleaseCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </article>

          {vrProject ? (
            <article className="mt-10 overflow-hidden rounded-xl border border-cyan/25 bg-[linear-gradient(135deg,rgba(73,216,255,0.13),rgba(17,19,24,0.86)_38%,rgba(17,19,24,0.96))] shadow-[0_26px_90px_rgba(0,0,0,0.36)]">
              <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(420px,0.92fr)_minmax(0,1.08fr)]">
                <CaseStudyContent caseStudy={t.work.vr} accent="cyan" icon={<Waves className="size-5" />} />
                <div className="min-w-0 border-t border-cyan/20 p-4 sm:p-6 lg:border-t-0 lg:border-l">
                  <div className="media-frame aspect-video rounded-lg border-cyan/25">
                    {vrProject.video && vrProject.poster ? (
                      <CinematicVideo
                        src={vrProject.video}
                        poster={vrProject.poster}
                        label={t.work.vr.mediaAlt}
                        controls
                      />
                    ) : (
                      <Image
                        src={vrProject.poster ?? "/vr-football-penalty-poster.png"}
                        alt={t.work.vr.mediaAlt}
                        fill
                        sizes="(max-width: 1024px) 92vw, 720px"
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      { icon: Gamepad2, label: t.work.vr.roleLabel, value: t.work.vr.role },
                      { icon: Boxes, label: t.work.vr.platformLabel, value: t.work.vr.platforms },
                      {
                        icon: Cpu,
                        label: t.work.vr.technologiesLabel,
                        value: t.work.vr.technologies.slice(0, 3).join(" / "),
                      },
                    ].map((item) => (
                      <div key={item.label} className="rounded-lg border border-cyan/20 bg-background/40 p-4">
                        <item.icon className="size-4 text-cyan" />
                        <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-cyan">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm leading-snug text-foreground/85">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ) : null}
        </div>
      </section>

      {gamesLab}
    </>
  )
}

function CaseStudyContent({
  caseStudy,
  accent,
  icon,
}: {
  caseStudy: Translation["work"]["pc"]
  accent: "orange" | "cyan"
  icon: ReactNode
}) {
  const accentClass =
    accent === "cyan" ? "text-cyan border-cyan/25 bg-cyan/10" : "text-orange border-orange/25 bg-orange/10"
  const kickerClass = accent === "cyan" ? "cyan-kicker" : "section-kicker"

  return (
    <div className="min-w-0 p-6 sm:p-8">
      <div className={cn("inline-flex items-center gap-2 rounded-md border px-3 py-2", accentClass)}>
        {icon}
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em]">{caseStudy.eyebrow}</span>
      </div>
      <h3 className="mt-6 text-balance font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {caseStudy.title}
      </h3>
      <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">{caseStudy.subtitle}</p>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <InfoBlock label={caseStudy.platformLabel} value={caseStudy.platforms} accent={accent} />
        <InfoBlock label={caseStudy.roleLabel} value={caseStudy.role} accent={accent} />
      </div>

      <div className="mt-7 grid gap-6">
        <BulletGroup label={caseStudy.responsibilitiesLabel} items={caseStudy.responsibilities} accent={accent} />
        <BulletGroup label={caseStudy.challengesLabel} items={caseStudy.challenges} accent={accent} />
      </div>

      <div className="mt-7 rounded-lg border border-white/10 bg-background/42 p-4">
        <p className={kickerClass}>{caseStudy.contributionLabel}</p>
        <p className="mt-3 text-sm leading-relaxed text-foreground/85">{caseStudy.contribution}</p>
      </div>

      <div className="mt-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {caseStudy.technologiesLabel}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {caseStudy.technologies.map((technology) => (
            <li
              key={technology}
              className="rounded-md border border-white/10 bg-white/[0.045] px-2.5 py-1 text-xs font-semibold text-foreground/80"
            >
              {technology}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function InfoBlock({ label, value, accent }: { label: string; value: string; accent: "orange" | "cyan" }) {
  return (
    <div className="rounded-lg border border-white/10 bg-background/35 p-4">
      <p className={cn("font-mono text-[0.68rem] uppercase tracking-[0.16em]", accent === "cyan" ? "text-cyan" : "text-orange")}>
        {label}
      </p>
      <p className="mt-2 text-sm leading-snug text-foreground/85">{value}</p>
    </div>
  )
}

function BulletGroup({ label, items, accent }: { label: string; items: string[]; accent: "orange" | "cyan" }) {
  return (
    <div>
      <p className={cn("font-mono text-xs uppercase tracking-[0.16em]", accent === "cyan" ? "text-cyan" : "text-orange")}>
        {label}
      </p>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
            <span className={cn("mt-2 size-1.5 shrink-0 rounded-full", accent === "cyan" ? "bg-cyan" : "bg-orange")} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProjectCover({ project, alt }: { project: PcProject; alt: string }) {
  return (
    <div className="media-frame aspect-square rounded-lg">
      {project.poster ? (
        <Image
          src={project.poster}
          alt={formatMessage(alt, { title: project.title })}
          fill
          sizes="(max-width: 1024px) 30vw, 180px"
          className="object-cover"
          loading="lazy"
        />
      ) : null}
    </div>
  )
}

function ReleaseCard({ project }: { project: PcProject }) {
  const { t } = useLanguage()
  const content = t.projects.items[project.id]

  return (
    <article className="grid gap-4 rounded-lg border border-white/10 bg-background/42 p-4 sm:grid-cols-[88px_minmax(0,1fr)] lg:grid-cols-1">
      <div className="media-frame aspect-square w-full max-w-[7rem] rounded-lg lg:max-w-none">
        {project.poster ? (
          <Image
            src={project.poster}
            alt={formatMessage(t.projects.card.previewAlt, { title: project.title })}
            fill
            sizes="(max-width: 640px) 96px, (max-width: 1024px) 120px, 220px"
            className="object-cover"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="min-w-0">
        <h4 className="font-heading text-lg font-semibold tracking-tight">{project.title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{content.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {content.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-md border border-white/10 bg-white/[0.045] px-2 py-1 text-[0.72rem] font-semibold text-foreground/75">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button
            render={<a href={project.link} target="_blank" rel="noopener noreferrer" />}
            nativeButton={false}
            size="sm"
            className="rounded-md font-semibold"
          >
            {project.primaryLinkLabel}
            <ArrowUpRight className="size-3.5" />
          </Button>
          <Button
            render={<a href={project.secondaryLink.url} target="_blank" rel="noopener noreferrer" />}
            nativeButton={false}
            size="sm"
            variant="outline"
            className="rounded-md border-white/10 bg-transparent font-semibold hover:bg-white/10"
          >
            {project.secondaryLink.label}
            <ArrowUpRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </article>
  )
}
