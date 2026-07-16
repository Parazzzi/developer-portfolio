"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"

export function Skills() {
  const { t } = useLanguage()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedCategory = t.toolkit.categories[selectedIndex] ?? t.toolkit.categories[0]

  return (
    <section id="toolkit" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
      <div className="site-shell">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="min-w-0">
            <p className="section-kicker">{t.toolkit.eyebrow}</p>
            <h2 className="mt-4 text-balance font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {t.toolkit.title}
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">{t.toolkit.description}</p>
          </div>

          <div className="technical-surface min-w-0 rounded-xl p-4 sm:p-5">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0">
              {t.toolkit.categories.map((category, index) => {
                const isSelected = index === selectedIndex

                return (
                  <Button
                    key={category.title}
                    type="button"
                    size="sm"
                    variant={isSelected ? "default" : "outline"}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedIndex(index)}
                    className={cn(
                      "h-9 shrink-0 rounded-md px-3 font-semibold",
                      !isSelected && "border-white/10 bg-transparent hover:bg-white/10",
                    )}
                  >
                    {category.title}
                  </Button>
                )
              })}
            </div>

            <div className="mt-5 rounded-lg border border-white/10 bg-background/42 p-5 sm:p-6">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-orange">{t.common.selected}</p>
              <h3 className="mt-3 font-heading text-3xl font-semibold tracking-tight">{selectedCategory.title}</h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {selectedCategory.description}
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {selectedCategory.technologies.map((technology) => (
                  <li key={technology} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-foreground/85">
                    <CheckCircle2 className="size-4 text-cyan" />
                    {technology}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
