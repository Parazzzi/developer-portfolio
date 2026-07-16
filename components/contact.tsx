"use client"

import type { ReactNode } from "react"
import { ArrowUpRight, Download, Mail, Send } from "lucide-react"
import { LinkedinIcon } from "@/components/brand-icons"
import { Button } from "@/components/ui/button"
import { profile } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n/language-context"
import { formatMessage } from "@/lib/i18n/translations"

export function Contact() {
  const { t } = useLanguage()

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-y border-white/10 bg-[linear-gradient(135deg,rgba(255,107,53,0.13),transparent_34%,rgba(73,216,255,0.1))] px-4 py-20 sm:px-6 lg:py-28"
    >
      <div className="site-shell">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:items-end">
          <div className="min-w-0">
            <p className="section-kicker">{t.contact.eyebrow}</p>
            <h2 className="mt-4 max-w-4xl text-balance font-heading text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              {t.contact.title}
            </h2>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {t.contact.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                render={<a href={profile.links.email} />}
                nativeButton={false}
                size="lg"
                className="h-11 rounded-md px-5 font-semibold"
              >
                <Mail className="size-4" />
                {t.contact.emailMe}
              </Button>
              <Button
                render={<a href={profile.links.cv} download aria-label={t.contact.downloadCvAria} />}
                nativeButton={false}
                size="lg"
                variant="outline"
                className="h-11 rounded-md border-white/10 bg-background/35 px-5 font-semibold hover:bg-white/10"
              >
                <Download className="size-4" />
                {t.contact.downloadCv}
              </Button>
            </div>
          </div>

          <div className="grid min-w-0 gap-3">
            <ContactLink href={profile.links.email} label={t.common.email} icon={<Mail className="size-4" />} />
            <ContactLink
              href={profile.links.linkedin}
              label={t.common.linkedin}
              externalLabel={formatMessage(t.common.externalLinkAria, { label: t.common.linkedin })}
              icon={<LinkedinIcon className="size-4" />}
            />
            <ContactLink
              href={profile.links.telegram}
              label={profile.telegramHandle}
              externalLabel={formatMessage(t.common.externalLinkAria, { label: t.common.telegram })}
              icon={<Send className="size-4" />}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactLink({
  href,
  label,
  icon,
  externalLabel,
}: {
  href: string
  label: string
  icon: ReactNode
  externalLabel?: string
}) {
  const isExternal = href.startsWith("http")

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={externalLabel}
      className="group flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-background/36 p-4 text-foreground transition-colors hover:border-orange/35 hover:bg-background/58"
    >
      <span className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-md border border-white/10 bg-white/[0.045] text-orange">
          {icon}
        </span>
        <span className="font-semibold">{label}</span>
      </span>
      <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-orange" />
    </a>
  )
}
