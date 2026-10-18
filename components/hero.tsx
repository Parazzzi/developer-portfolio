"use client"

import { ArrowDown, ArrowUpRight } from "lucide-react"
import { MotionControl } from "@/components/motion-control"
import { useLanguage } from "@/lib/i18n/language-context"

export function Hero() {
  const { t, language } = useLanguage()
  return (
    <section id="top" className="artifact-hero" data-artifact="hero" aria-labelledby="hero-name">
      <div className="hero-topline site-shell">
        <p className="eyebrow"><span className="accent-cross" aria-hidden="true">✳</span> Digital Artifacts <span className="muted">/</span> Portfolio</p>
        <span className="availability"><i aria-hidden="true" />{t.nav.availability}</span>
      </div>
      <div className="hero-composition site-shell">
        <h1 id="hero-name" className="hero-name"><span>DEMENTIY</span><span>BESARAB<span className="name-period">.</span></span></h1>
        <div className="hero-discipline"><span className="small-cross" aria-hidden="true">+</span><p>SOFTWARE<br />DEVELOPER</p><span className="eyebrow">C# / TYPESCRIPT / XR</span></div>
        <div className="artifact-caption" aria-hidden="true"><span className="caption-line" /><p>ARTIFACT 001<br /><span>INTERACTIVE CORE</span></p></div>
      </div>
      <div className="hero-bottom site-shell">
        <p className="hero-intro">{t.hero.subtitle}</p>
        <a href="#work" className="hero-explore"><span>{language === "en" ? "Explore the work" : "Переглянути роботи"}</span><span className="circle-arrow"><ArrowDown size={20} strokeWidth={1.5} /></span></a>
        <div className="hero-index"><span className="eyebrow">01 — 07</span><MotionControl /></div>
      </div>
      <div className="hero-specs site-shell"><span>UNITY <span className="muted">/</span> WEB</span><span>C# · TYPESCRIPT · XR</span><a href="#about">{t.hero.stats[0].value} {language === "en" ? "YEARS OF EXPERIENCE" : "РОКИ ДОСВІДУ"}<ArrowUpRight size={13} /></a></div>
    </section>
  )
}
