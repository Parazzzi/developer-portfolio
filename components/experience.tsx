"use client"

import { SectionHeading } from "@/components/section-heading"
import { useLanguage } from "@/lib/i18n/language-context"

export function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experience" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeading
          eyebrow={t.experience.eyebrow}
          title={t.experience.title}
          description={t.experience.description}
        />

        <ol className="relative mt-14 space-y-5 before:absolute before:inset-y-4 before:left-[0.4375rem] before:w-px before:bg-border sm:before:left-[0.5625rem]">
          {t.experience.items.map((item) => (
            <li key={`${item.role}-${item.company}-${item.period}`} className="relative pl-8 sm:pl-10">
              <span className="absolute left-0 top-7 size-3.5 rounded-full border-4 border-background bg-primary shadow-[0_0_16px_var(--glow)] sm:size-[1.125rem]" />
              <article className="glass rounded-2xl border border-border p-6 transition-all duration-300 hover:glow-ring sm:p-7">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="font-heading text-xl font-semibold tracking-tight">{item.role}</h3>
                    <p className="mt-1 text-sm font-medium text-primary">{item.company}</p>
                  </div>
                  <div className="shrink-0 text-left font-mono text-xs text-muted-foreground sm:text-right">
                    <p>{item.period}</p>
                    <p className="mt-1">{item.arrangement}</p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
