"use client"

import { ArrowDown } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import "./editorial.css"

export function UnderTheHood() {
  const { t, language } = useLanguage()

  return (
    <section id="under-the-hood" className="editorial-section systems-section" data-artifact="systems" aria-labelledby="systems-title">
      <div className="site-shell">
        <div className="editorial-heading-row">
          <p className="eyebrow">02 / {t.underHood.eyebrow}</p>
          <p className="editorial-index-note">LOGIC → INTERACTION</p>
        </div>
        <div className="systems-composition">
          <div className="systems-manifesto">
            <h2 id="systems-title" className="section-title">
              {language === "en" ? <>Built to play.<br /><span>Made to last.</span></> : <>Для гри.<br /><span>Надовго.</span></>}
            </h2>
            <p className="editorial-lead">{t.underHood.title}</p>
            <p className="editorial-copy">{t.underHood.description}</p>
          </div>
          <div className="systems-flow">
            <p className="eyebrow">{t.underHood.flowLabel}</p>
            <ol>
              {t.underHood.flow.map((node, index) => (
                <li key={node.label}>
                  <span className="flow-point" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{node.label}</h3><p>{node.description}</p></div>
                  {index < t.underHood.flow.length - 1 && <ArrowDown size={15} className="flow-arrow" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="systems-details">
          <figure className="code-print">
            <figcaption>
              <span className="eyebrow">C# / {t.underHood.codeLabel}</span>
              <span>{t.underHood.codeTitle}</span>
            </figcaption>
            <pre tabIndex={0} aria-label={t.underHood.codeTitle}><code>{t.underHood.codeLines.join("\n")}</code></pre>
          </figure>
          <div className="systems-topics" aria-label={t.underHood.topicsLabel}>
            {t.underHood.topics.map((topic, index) => (
              <article key={topic.title}>
                <span className="editorial-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                  <ul className="editorial-inline-list">{topic.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
