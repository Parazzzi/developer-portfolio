"use client"

import { ArrowUpRight } from "lucide-react"
import { profile } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n/language-context"

export function Contact() {
  const { t, language } = useLanguage()
  return (
    <section id="contact" className="contact-section" data-artifact="contact" aria-labelledby="contact-title">
      <div className="site-shell">
        <div className="contact-kicker"><p className="eyebrow">07 / {t.contact.eyebrow}</p><span className="availability"><i aria-hidden="true" />{t.nav.availability}</span></div>
        <div className="contact-composition"><h2 id="contact-title" className="contact-title">{language === "en" ? <>LET’S BUILD<br />SOMETHING<br /><em>INTERACTIVE.</em></> : <>СТВОРІМО<br />ЩОСЬ<br /><em>ІНТЕРАКТИВНЕ.</em></>}</h2><div className="contact-artifact-space" data-artifact-slot aria-hidden="true" /></div>
        <div className="contact-bottom"><div><p className="contact-description">{t.contact.description}</p><a className="contact-email" href={profile.links.email}>{profile.email}<ArrowUpRight strokeWidth={1.3} /></a></div><div className="contact-links">
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={17} /></a>
          <a href={profile.links.telegram} target="_blank" rel="noopener noreferrer">Telegram <span className="muted">{profile.telegramHandle}</span><ArrowUpRight size={17} /></a>
          <a href={profile.links.cv} download aria-label={t.contact.downloadCvAria}>{t.contact.downloadCv}<ArrowUpRight size={17} /></a>
          <a href={profile.links.funPortfolio3d} target="_blank" rel="noopener noreferrer">{t.hero.portfolio3d}<ArrowUpRight size={17} /></a>
        </div></div>
      </div>
    </section>
  )
}
