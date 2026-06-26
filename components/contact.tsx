"use client"

import { Download, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LinkedinIcon } from "@/components/brand-icons"
import { profile } from "@/lib/portfolio-data"
import { useLanguage } from "@/lib/i18n/language-context"

export function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto w-full max-w-3xl">
        <div className="glass glow-ring relative overflow-hidden rounded-3xl border border-border p-10 text-center sm:p-14">
          <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />
          <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-primary">{t.contact.eyebrow}</p>
          <h2 className="relative mt-3 text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.contact.title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
            {t.contact.description}
          </p>

          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Button
              render={<a href={profile.links.email} />}
              nativeButton={false}
              size="lg"
              className="rounded-full px-7 font-medium"
            >
              <Mail className="size-4" />
              {t.contact.emailMe}
            </Button>
            <Button
              render={<a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="rounded-full border-border bg-transparent px-7 font-medium hover:bg-secondary"
            >
              <LinkedinIcon className="size-4" />
              LinkedIn
            </Button>
            <Button
              render={<a href={profile.links.telegram} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="rounded-full border-border bg-transparent px-7 font-medium hover:bg-secondary"
            >
              <Send className="size-4" />
              Telegram
            </Button>
            <Button
              render={<a href={profile.links.cv} download aria-label={t.contact.downloadCvAria} />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="rounded-full border-border bg-transparent px-7 font-medium hover:bg-secondary"
            >
              <Download className="size-4" />
              {t.contact.downloadCv}
            </Button>
          </div>

          <p className="relative mt-5 text-sm text-muted-foreground">
            {t.contact.telegramLabel}{" "}
            <a
              href={profile.links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              {profile.telegramHandle}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
