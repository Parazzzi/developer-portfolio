"use client"

import { SectionHeading } from "@/components/section-heading"
import { useLanguage } from "@/lib/i18n/language-context"

export function Workflow() {
  const { t } = useLanguage()

  return (
    <section id="workflow" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto w-full max-w-4xl">
        <SectionHeading
          eyebrow={t.workflow.eyebrow}
          title={t.workflow.title}
          description={t.workflow.description}
        />

        <ol className="mt-14 space-y-4">
          {t.workflow.steps.map((step) => (
            <li
              key={step.step}
              className="group glass relative flex gap-5 rounded-2xl border border-border p-6 transition-all duration-300 hover:glow-ring"
            >
              <span className="font-heading text-2xl font-semibold text-primary/70 text-glow tabular-nums">
                {step.step}
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
