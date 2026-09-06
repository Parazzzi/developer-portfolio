"use client"

import { useRef } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { profile } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n/language-context"

export function Header() {
  const { t, language, toggleLanguage } = useLanguage()
  const menu = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const links = [
    { href: "#work", label: language === "en" ? "Work" : "Роботи" },
    { href: "#about", label: language === "en" ? "About" : "Про мене" },
    { href: "#experience", label: language === "en" ? "Experience" : "Досвід" },
    { href: "#skills", label: language === "en" ? "Skills" : "Навички" },
    { href: "#contact", label: t.nav.contact },
  ]
  function closeMenu() { menu.current?.close() }
  return (
    <>
      <a className="skip-link" href="#main-content">{language === "en" ? "Skip to content" : "Перейти до вмісту"}</a>
      <header className="site-header">
        <div className="site-shell header-inner">
          <a className="wordmark" href="#top" aria-label="Dementiy Besarab — home"><span className="brand-mark" aria-hidden="true">d<span>b</span></span><span>DEMENTIY<br />BESARAB</span></a>
          <nav className="desktop-nav" aria-label={language === "en" ? "Main navigation" : "Головна навігація"}>{links.map(link => <a key={link.href} href={link.href}>{link.label}<span className="nav-dot" /></a>)}</nav>
          <div className="header-actions">
            <button className="language-toggle" type="button" onClick={toggleLanguage} aria-label={t.languageSwitcher.ariaLabel}><span className={language === "en" ? "active" : ""}>EN</span><span className="muted">/</span><span className={language === "ua" ? "active" : ""}>UA</span></button>
            <a className="header-cv" href={profile.links.cv} download aria-label={t.nav.downloadCvAria}>CV <ArrowUpRight size={15} /></a>
            <button ref={trigger} className="menu-toggle" type="button" aria-label={t.nav.openMenuAria} aria-haspopup="dialog" aria-controls="mobile-menu" onClick={() => menu.current?.showModal()}><Menu size={23} strokeWidth={1.5} /></button>
          </div>
        </div>
      </header>
      <dialog ref={menu} id="mobile-menu" className="mobile-menu" aria-label={language === "en" ? "Navigation" : "Навігація"} onClose={() => trigger.current?.focus()}>
        <div className="mobile-menu-top"><span className="eyebrow">Digital Artifacts / Index</span><button type="button" onClick={closeMenu} aria-label={t.nav.closeMenuAria}><X size={24} /></button></div>
        <nav>{links.map((link, index) => <a key={link.href} href={link.href} onClick={closeMenu}><span className="eyebrow">0{index + 1}</span>{link.label}<ArrowUpRight size={25} /></a>)}<a href="#games-lab" onClick={closeMenu}><span className="eyebrow">↳</span>Games Lab<ArrowUpRight size={25} /></a></nav>
        <a className="text-link" href={profile.links.cv} download>{t.hero.downloadCv}<ArrowUpRight size={18} /></a>
        <p className="mobile-availability">{t.profile.availability}</p>
      </dialog>
      <noscript><nav className="noscript-nav">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav></noscript>
    </>
  )
}
