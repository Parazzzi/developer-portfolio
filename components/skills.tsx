"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import "./editorial.css"

export function Skills() {
  const { t, language } = useLanguage()

  return (
    <section id="toolkit" className="editorial-section capabilities-section" data-artifact="tools" aria-labelledby="capabilities-title">
      <span id="skills" className="editorial-anchor" aria-hidden="true" />
      <div className="site-shell">
        <div className="editorial-heading-row">
          <p className="eyebrow">04 / {language === "en" ? "Capabilities" : "Компетенції"}</p>
          <p className="editorial-index-note">UNITY / C# / XR</p>
        </div>
        <div className="capabilities-intro">
          <h2 id="capabilities-title" className="section-title">
            {language === "en" ? <>A working<br />toolkit.</> : <>Робочі<br />інструменти.</>}
          </h2>
          <div className="capabilities-artifact-space" data-artifact-slot aria-hidden="true" />
        </div>
        <p className="capabilities-context editorial-lead">{t.toolkit.title}</p>
        <ol className="capabilities-index">
          {t.toolkit.categories.map((category, index) => (
            <li key={category.title} className="capability-entry">
              <span className="editorial-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div className="capability-content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <ul className="editorial-inline-list" aria-label={language === "en" ? `${category.title} technologies` : `${category.title}: технології`}>
                  {category.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
