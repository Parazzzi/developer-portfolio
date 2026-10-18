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
    { label: "Recent studio role", title: "CREATY Games", role: "Unity C# Developer", description: "Commercial mobile game production across the PC Creator series. Gameplay systems, production UI, SDK integrations and Android / iOS release support.", link: "#work", linkLabel: "Explore the work" },
    { label: "3+ years", title: "Commercial & freelance", role: "Unity / Mobile / VR-XR", description: t.about.paragraphs[0], link: "#games-lab", linkLabel: "Explore the experiments" },
  ] : [
    { label: "Recent studio role", title: "CREATY Games", role: "Unity C# Developer", description: "Комерційна розробка mobile games у серії PC Creator. Gameplay-системи, production UI, SDK-інтеграції та підтримка релізів Android / iOS.", link: "#work", linkLabel: "Переглянути роботи" },
    { label: "3+ роки", title: "Комерційна робота / freelance", role: "Unity / Mobile / VR-XR", description: t.about.paragraphs[0], link: "#games-lab", linkLabel: "Переглянути експерименти" },
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
