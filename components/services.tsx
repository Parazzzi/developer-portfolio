"use client"

import { SectionHeading } from "@/components/section-heading"
import { useLanguage } from "@/lib/i18n/language-context"

export function Services() {
  const { t } = useLanguage()

  return (
    <section id="services" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          description={t.services.description}
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((service, i) => (
            <article
              key={service.title}
              className="group glass rounded-2xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:glow-ring"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-heading text-lg font-semibold tracking-tight">{service.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
