"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { profile } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n/language-context"
import { languageLabels } from "@/lib/i18n/translations"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div className="mx-auto flex w-[min(72rem,92%)] items-center justify-between">
        <a
          href="#"
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold tracking-tight transition-colors",
            scrolled && "glass glow-ring",
          )}
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary text-glow shadow-[0_0_12px_var(--glow)]" />
          <span className="font-mono">DB</span>
        </a>

        <nav
          className={cn(
            "hidden items-center gap-1 rounded-full px-2 py-1.5 text-sm transition-all lg:flex",
            scrolled ? "glass glow-ring" : "bg-card/40 backdrop-blur",
          )}
        >
          {t.nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <Button
            render={<a href={profile.links.email} />}
            nativeButton={false}
            size="sm"
            className="rounded-full font-medium"
          >
            {t.nav.contact}
          </Button>
        </div>
      </div>
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
      className="rounded-full border-border bg-card/40 px-3 font-mono text-xs backdrop-blur hover:bg-secondary"
    >
      <span className={cn(language === "en" ? "text-primary" : "text-muted-foreground")}>
        {languageLabels.en}
      </span>
      <span className="text-muted-foreground/60">/</span>
      <span className={cn(language === "ua" ? "text-primary" : "text-muted-foreground")}>
        {languageLabels.ua}
      </span>
    </Button>
  )
}
