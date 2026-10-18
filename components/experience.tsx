"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { achievementItems } from "@/lib/portfolio-data"
import { optimizedImage } from "@/lib/media"
import { useLanguage } from "@/lib/i18n/language-context"
import "./editorial.css"

export function Experience() {
  const { t, language } = useLanguage()
  const certificate = achievementItems.find((achievement) => achievement.id === "game-designer-certificate")
  const achievement = t.achievements.items["game-designer-certificate"]
  const entries = language === "en" ? [
    { label: "2026 — Present", title: "Freelance / Self-employed", role: "Software Developer", description: "Websites, web applications and admin dashboards built with TypeScript, JavaScript and HTML/CSS, including Math-Veb and AUTOCOREx.", link: "#contact", linkLabel: "Start a conversation" },
    { label: "Apr 2026 — Present", title: "Mirko Solutions", role: "Unity Developer · Full-time, then part-time", description: "Outsourced Unity VR/XR and interactive applications: gameplay, VR interactions, UI and client-server features, including work on an NDA-protected VR project.", link: "#work", linkLabel: "Explore the work" },
    { label: "May 2024 — Apr 2026", title: "CREATY", role: "Unity Developer", description: "Two mid-core Unity projects developed from scratch through release, covering gameplay, UI, Android/iOS builds, analytics, monetization and third-party integrations.", link: "#work", linkLabel: "Explore the releases" },
    { label: "Apr 2023 — Apr 2024", title: "Bugiko & Freelance", role: "Unity Developer", description: "A large-scale Unity prototype plus casual mobile games and interactive applications, with responsibility spanning architecture, mechanics, UI, optimization and delivery.", link: "#games-lab", linkLabel: "Explore the experiments" },
  ] : [
    { label: "2026 — дотепер", title: "Freelance / Self-employed", role: "Software Developer", description: "Сайти, web applications та admin dashboards на TypeScript, JavaScript і HTML/CSS, зокрема Math-Veb та AUTOCOREx.", link: "#contact", linkLabel: "Обговорити проєкт" },
    { label: "Квіт 2026 — дотепер", title: "Mirko Solutions", role: "Unity Developer · Full-time, потім part-time", description: "Outsource Unity VR/XR та interactive applications: gameplay, VR interactions, UI і client-server features, зокрема робота над NDA-захищеним VR-проєктом.", link: "#work", linkLabel: "Переглянути роботи" },
    { label: "Трав 2024 — квіт 2026", title: "CREATY", role: "Unity Developer", description: "Два mid-core Unity-проєкти від старту до релізу: gameplay, UI, Android/iOS builds, analytics, monetization і third-party integrations.", link: "#work", linkLabel: "Переглянути релізи" },
    { label: "Квіт 2023 — квіт 2024", title: "Bugiko та Freelance", role: "Unity Developer", description: "Великий Unity-прототип, casual mobile games та interactive applications із роботою над архітектурою, механіками, UI, оптимізацією й delivery.", link: "#games-lab", linkLabel: "Переглянути експерименти" },
  ]

  return (
    <section id="experience" className="editorial-section experience-section" aria-labelledby="experience-title" data-artifact="systems">
      <div className="site-shell">
        <div className="editorial-heading-row">
          <p className="eyebrow">05 / {language === "en" ? "Experience" : "Досвід"}</p>
          <p className="editorial-index-note">{language === "en" ? "PRACTICE & PERSPECTIVE" : "ПРАКТИКА ТА РОЗВИТОК"}</p>
        </div>
        <h2 id="experience-title" className="section-title experience-title">
          {language === "en" ? <>Work. Learn.<br /><span>Build again.</span></> : <>Робота. Досвід.<br /><span>Нові ідеї.</span></>}
        </h2>
        <ol className="experience-index">
          {entries.map((entry) => (
            <li key={entry.title} className="experience-entry">
              <p className="eyebrow experience-period">{entry.label}</p>
              <div className="experience-role"><h3>{entry.title}</h3><p className="editorial-index-note">{entry.role}</p></div>
              <div className="experience-description">
                <p>{entry.description}</p>
                <a href={entry.link} className="text-link">{entry.linkLabel}<ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
            </li>
          ))}
          {certificate && (
            <li className="experience-entry certificate-entry">
              <p className="eyebrow experience-period">2025 / {t.about.certificate.label}</p>
              <div className="experience-role">
                <h3>{achievement.title}</h3>
                <p className="editorial-index-note">{certificate.meta}</p>
                <p className="certificate-description">{t.about.certificate.description}</p>
                <ul className="editorial-inline-list">{achievement.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </div>
              <figure className="certificate-figure">
                <a href={certificate.image} target="_blank" rel="noreferrer" aria-label={language === "en" ? "View Game Designer Certificate (opens in a new tab)" : "Переглянути сертифікат Game Designer (нова вкладка)"}>
                  <span className="certificate-image"><Image src={optimizedImage(certificate.image)} alt={achievement.imageAlt} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 55vw, 440px" className="object-contain" loading="lazy" /></span>
                  <span className="certificate-view">{language === "en" ? "View certificate" : "Переглянути сертифікат"}<ArrowUpRight size={16} aria-hidden="true" /></span>
                </a>
              </figure>
            </li>
          )}
        </ol>
      </div>
    </section>
  )
}
