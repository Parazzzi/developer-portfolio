"use client"

import { useEffect, useState } from "react"
import { Download, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { profile } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n/language-context"
import { languageLabels } from "@/lib/i18n/translations"
import { cn } from "@/lib/utils"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { t } = useLanguage()

  useEffect(() => {
    const onScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(window.scrollY > 24)
      setScrollProgress(scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-white/10 bg-background/90 py-2 shadow-[0_16px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl"
          : "border-transparent bg-background/10 py-4 backdrop-blur-sm",
      )}
    >
      <div
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-cyan"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <div className="site-shell flex items-center justify-between gap-3">
        <a
          href="#top"
          className="group flex items-center gap-3 rounded-md px-1 py-1 text-sm font-semibold tracking-tight"
          onClick={() => setMenuOpen(false)}
        >
          <span className="grid size-9 place-items-center rounded-md border border-white/12 bg-surface text-sm font-bold text-orange transition-colors group-hover:border-orange/45">
            DB
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-foreground">Dementiy Besarab</span>
            <span className="block text-xs font-medium text-muted-foreground">{t.profile.compactRole}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 rounded-md border border-white/10 bg-surface/72 p-1 text-sm backdrop-blur lg:flex">
          {t.nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded px-3 py-2 text-muted-foreground transition-colors hover:bg-white/7 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-md border border-white/10 bg-surface/70 px-3 py-2 text-xs font-medium text-muted-foreground md:flex">
            <span className="size-2 rounded-full bg-orange shadow-[0_0_18px_rgba(255,107,53,0.75)]" />
            {t.nav.availability}
          </div>
          <LanguageSwitcher />
          <Button
            render={<a href={profile.links.cv} download aria-label={t.nav.downloadCvAria} />}
            nativeButton={false}
            size="sm"
            variant="outline"
            className="hidden rounded-md border-white/10 bg-surface/70 px-3 font-semibold hover:bg-white/10 sm:inline-flex"
          >
            <Download className="size-3.5" />
            {t.nav.downloadCv}
          </Button>
          <Button
            render={<a href="#contact" />}
            nativeButton={false}
            size="sm"
            className="hidden rounded-md px-4 font-semibold md:inline-flex"
          >
            {t.nav.contact}
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="rounded-md border-white/10 bg-surface/70 lg:hidden"
            aria-label={menuOpen ? t.nav.closeMenuAria : t.nav.openMenuAria}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {menuOpen ? (
        <div className="lg:hidden">
          <div className="site-shell mt-3 rounded-lg border border-white/10 bg-background/96 p-3 shadow-2xl backdrop-blur-xl">
            <nav className="grid gap-1">
              {t.nav.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-white/7"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
              <Button
                render={<a href={profile.links.cv} download aria-label={t.nav.downloadCvAria} />}
                nativeButton={false}
                variant="outline"
                className="h-11 rounded-md border-white/10 bg-surface/80 font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                <Download className="size-4" />
                {t.hero.downloadCv}
              </Button>
              <Button
                render={<a href="#contact" />}
                nativeButton={false}
                className="h-11 rounded-md font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                {t.nav.contact}
              </Button>
            </div>
            <p className="mt-3 flex items-center gap-2 px-1 text-sm text-muted-foreground">
              <span className="size-2 rounded-full bg-orange" />
              {t.profile.availability}
            </p>
          </div>
        </div>
      ) : null}
    </header>
  )
}

function LanguageSwitcher() {
  const { language, toggleLanguage, t } = useLanguage()

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      aria-label={t.languageSwitcher.ariaLabel}
      onClick={toggleLanguage}
      className="rounded-md border-white/10 bg-surface/70 px-2.5 font-mono text-xs hover:bg-white/10"
    >
      <span className={cn(language === "en" ? "text-orange" : "text-muted-foreground")}>{languageLabels.en}</span>
      <span className="text-muted-foreground/60">/</span>
      <span className={cn(language === "ua" ? "text-orange" : "text-muted-foreground")}>{languageLabels.ua}</span>
    </Button>
  )
}
