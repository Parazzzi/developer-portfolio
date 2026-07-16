"use client"

import { profile } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="px-4 py-8 sm:px-6">
      <div className="site-shell flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-foreground">{profile.name}</p>
          <p className="mt-1">{t.profile.role}</p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <a className="hover:text-orange" href={profile.links.email}>
            {t.common.email}
          </a>
          <a className="hover:text-orange" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
            {t.common.linkedin}
          </a>
          <a className="hover:text-orange" href={profile.links.telegram} target="_blank" rel="noopener noreferrer">
            {t.common.telegram}
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} - {t.footer.builtWith}</p>
      </div>
    </footer>
  )
}
