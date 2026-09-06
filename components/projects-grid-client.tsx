"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { ArrowUpRight, Plus } from "lucide-react"
import { CinematicVideo, LazyYoutubeEmbed } from "@/components/media-preview"
import { profile, projectItems, type ProjectId } from "@/lib/portfolio-data"
import { optimizedImage } from "@/lib/media"
import { useLanguage } from "@/lib/i18n/language-context"
import { formatMessage, type Translation } from "@/lib/i18n/translations"
import "@/components/work.css"

type StaticProject = (typeof projectItems)[number]
const presentationOrder: ProjectId[] = ["pc-creator-3", "pc-creator-3-pro", "pc-creator-2"]

export function ProjectsGridClient({ gamesLab }: { gamesLab: ReactNode }) {
  const { t, language } = useLanguage()

  return (
    <>
      <section id="work" className="work-section" data-artifact="mobile" aria-labelledby="work-title">
        <div className="site-shell">
          <div className="work-intro">
            <div>
              <p className="eyebrow"><span className="index-mark">02 /</span> {t.work.eyebrow}</p>
              <h2 id="work-title" className="section-title">{language === "en" ? <>Selected<br /><span className="work-title-indent">work.</span></> : <>Вибрані<br /><span className="work-title-indent">роботи.</span></>}</h2>
            </div>
            <div className="work-intro-copy">
              <p>{t.work.description}</p>
              <span className="eyebrow">03 / {language === "en" ? "MOBILE RELEASES" : "МОБІЛЬНІ РЕЛІЗИ"}</span>
              <a className="text-link work-xr-link" href="#xr">VR / XR <ArrowUpRight size={15} /></a>
            </div>
          </div>

          <div className="work-collection">
            {presentationOrder.map((id, index) => {
              const project = projectItems.find((item) => item.id === id)
              if (!project) return null
              return <ProjectFeature key={id} project={project} index={index} />
            })}
          </div>

          <a href={profile.links.funPortfolio3d} target="_blank" rel="noopener noreferrer" className="work-external text-link">
            {t.hero.portfolio3d} <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
      {gamesLab}
    </>
  )
}

export function XrWork() {
  const { language } = useLanguage()
  const project = projectItems.find(item => item.id === "vr-football-penalty")!
  return <section id="xr" className="xr-section work-section" data-artifact="xr" aria-labelledby="xr-title"><div className="site-shell">
    <div className="xr-intro"><div className="xr-artifact-space" data-artifact-slot aria-hidden="true" /><div><p className="eyebrow">05 / VR & XR</p><h2 id="xr-title" className="section-title">{language === "en" ? <>Beyond<br />the screen.</> : <>За межами<br />екрана.</>}</h2><p className="xr-intro-copy">{language === "en" ? "Real movement. Spatial interaction. Built in Unity." : "Реальний рух. Просторова взаємодія. Створено в Unity."}</p></div></div>
    <ProjectFeature project={project} index={3} />
  </div></section>
}

function ProjectFeature({ project, index }: { project: StaticProject; index: number }) {
  const { t, language } = useLanguage()
  const content = t.projects.items[project.id]
  const isVr = project.id === "vr-football-penalty"
  const caseStudy = isVr ? t.work.vr : project.id === "pc-creator-3" ? t.work.pc : null
  const number = String(index + 1).padStart(2, "0")
  const category = isVr ? "VR / XR" : "MOBILE / ANDROID / IOS"

  return (
    <article className={`project-feature ${index % 2 === 1 ? "project-feature-reverse" : ""}`} data-artifact="mobile" aria-labelledby={`project-${project.id}`}>
      <div className="project-topline eyebrow">
        <span>{number} / {isVr ? (language === "en" ? "SPATIAL INTERACTION" : "ПРОСТОРОВА ВЗАЄМОДІЯ") : (language === "en" ? "COMMERCIAL RELEASE" : "КОМЕРЦІЙНИЙ РЕЛІЗ")}</span>
        <span>{category}</span>
      </div>
      <h3 id={`project-${project.id}`} className="project-title">{project.title}<span aria-hidden="true">↗</span></h3>
      <div className="project-body">
        <div className="project-copy">
          <span className="project-specimen" aria-hidden="true">{number}</span>
          <p className="project-description">{content.description}</p>
          <ul className="project-technologies" aria-label={t.work.pc.technologiesLabel}>
            {content.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          {"link" in project ? (
            <div className="project-links">
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-link">{project.primaryLinkLabel}<ArrowUpRight size={16} aria-hidden="true" /></a>
              <a href={project.secondaryLink.url} target="_blank" rel="noopener noreferrer" className="text-link">{project.secondaryLink.label}<ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          ) : <p className="project-footnote eyebrow">{t.work.vr.platforms}</p>}
        </div>

        <figure className={`project-media ${isVr ? "project-media-spatial" : "project-media-mobile"}`}>
          <div className="project-media-viewport">
            {"video" in project ? (
              <CinematicVideo src={project.video} poster={optimizedImage(project.poster)} label={t.work.vr.mediaAlt} playLabel={t.common.playMedia} controls />
            ) : "youtubeEmbedUrl" in project ? (
              <LazyYoutubeEmbed title={formatMessage(t.projects.card.gameplayVideoTitle, { title: project.title })} src={project.youtubeEmbedUrl} poster={optimizedImage(project.poster)} posterAlt={formatMessage(t.projects.card.previewAlt, { title: project.title })} playLabel={t.common.playMedia} containPoster />
            ) : (
              <Image src={optimizedImage(project.poster)} alt={formatMessage(t.projects.card.previewAlt, { title: project.title })} fill sizes="(max-width: 760px) 90vw, 55vw" className="project-poster-contain" loading="lazy" />
            )}
          </div>
          <figcaption className="project-media-caption eyebrow"><span>{isVr ? t.work.vr.mediaLabel : t.work.pc.mediaLabel}</span><span>{number} / 04</span></figcaption>
        </figure>
      </div>
      {caseStudy ? <CaseStudyDetails caseStudy={caseStudy} /> : null}
    </article>
  )
}

function CaseStudyDetails({ caseStudy }: { caseStudy: Translation["work"]["pc"] }) {
  const { language } = useLanguage()

  return (
    <details className="project-case-study">
      <summary>
        <span className="eyebrow">{language === "en" ? "PROCESS & CONTRIBUTION" : "ПРОЦЕС ТА ВНЕСОК"}</span>
        <span>{caseStudy.title}</span>
        <Plus size={18} aria-hidden="true" />
      </summary>
      <div className="case-study-content">
        <div className="case-study-intro">
          <p className="eyebrow">{caseStudy.eyebrow}</p>
          <p>{caseStudy.subtitle}</p>
          <dl className="case-study-facts">
            <div><dt className="eyebrow">{caseStudy.platformLabel}</dt><dd>{caseStudy.platforms}</dd></div>
            <div><dt className="eyebrow">{caseStudy.roleLabel}</dt><dd>{caseStudy.role}</dd></div>
          </dl>
        </div>
        <div className="case-study-bullets">
          <BulletGroup label={caseStudy.responsibilitiesLabel} items={caseStudy.responsibilities} />
          <BulletGroup label={caseStudy.challengesLabel} items={caseStudy.challenges} />
        </div>
        <div className="case-study-contribution">
          <p className="eyebrow">{caseStudy.contributionLabel}</p>
          <p>{caseStudy.contribution}</p>
          <p className="eyebrow">{caseStudy.technologiesLabel}</p>
          <ul className="project-technologies">{caseStudy.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
        </div>
      </div>
    </details>
  )
}

function BulletGroup({ label, items }: { label: string; items: string[] }) {
  return <div><h4 className="eyebrow">{label}</h4><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>
}
