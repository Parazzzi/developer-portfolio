"use client"

import { Download } from "lucide-react"
import { profile } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n/language-context"
import "./editorial.css"

export function About() {
  const { t, language } = useLanguage()

  return (
    <section id="about" className="editorial-section about-section" aria-labelledby="about-title" data-artifact="about">
      <div className="site-shell">
        <div className="editorial-heading-row">
          <p className="eyebrow">01 / {t.about.eyebrow}</p>
          <p className="editorial-index-note">DEMENTIY BESARAB</p>
        </div>
        <div className="about-heading">
          <h2 id="about-title" className="section-title">
            {language === "en" ? <>From idea.<br /><span>To release.</span></> : <>Від ідеї.<br /><span>До релізу.</span></>}
          </h2>
          <div className="about-artifact-space" data-artifact-slot aria-hidden="true" />
        </div>
        <div className="about-body">
          <div className="about-position">
            <p className="editorial-lead">{t.about.title}</p>
            <dl className="about-facts">
              {t.about.stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="about-prose">
            {t.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <aside className="about-ai-note">
              <span className="eyebrow">AI / {language === "en" ? "In the workflow" : "У робочому процесі"}</span>
              <p>{t.about.aiNote}</p>
            </aside>
          </div>
        </div>
        <div className="availability-index">
          <div>
            <p className="eyebrow"><span className="availability-dot" aria-hidden="true" />{t.about.availabilityLabel}</p>
            <a href={profile.links.cv} download aria-label={t.nav.downloadCvAria} className="text-link about-cv">
              {t.hero.downloadCv}<Download size={15} aria-hidden="true" />
            </a>
          </div>
          <ul>{t.about.availabilityItems.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
    </section>
  )
}
