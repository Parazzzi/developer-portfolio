"use client"

import { Code2, GitBranch, Layers3, RadioTower } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

const flowIcons = [RadioTower, Layers3, GitBranch, Code2]

export function UnderTheHood() {
  const { t } = useLanguage()

  return (
    <section id="under-the-hood" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
      <div className="site-shell">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div className="min-w-0 lg:sticky lg:top-28">
            <p className="section-kicker">{t.underHood.eyebrow}</p>
            <h2 className="mt-4 text-balance font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {t.underHood.title}
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">{t.underHood.description}</p>

            <div className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-[#050609]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan">{t.underHood.codeLabel}</p>
                <p className="text-sm text-muted-foreground">{t.underHood.codeTitle}</p>
              </div>
              <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-foreground/90">
                <code>
                  {t.underHood.codeLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </div>

          <div className="grid min-w-0 gap-5">
            <div className="technical-surface rounded-xl p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="cyan-kicker">{t.underHood.flowLabel}</p>
                <span className="hidden h-px flex-1 bg-gradient-to-r from-cyan/50 to-transparent sm:block" />
              </div>

              <ol className="mt-6 grid gap-3">
                {t.underHood.flow.map((node, index) => {
                  const Icon = flowIcons[index] ?? Layers3

                  return (
                    <li key={node.label} className="group relative">
                      {index < t.underHood.flow.length - 1 ? (
                        <span className="absolute left-5 top-12 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-cyan/45 to-orange/25" />
                      ) : null}
                      <div className="relative grid gap-4 rounded-lg border border-white/10 bg-background/44 p-4 transition duration-300 group-hover:border-cyan/35 group-hover:bg-cyan/[0.055] sm:grid-cols-[2.5rem_minmax(0,1fr)]">
                        <span className="grid size-10 place-items-center rounded-md border border-cyan/25 bg-cyan/10 text-cyan">
                          <Icon className="size-5" />
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <p className="font-heading text-lg font-semibold tracking-tight">{node.label}</p>
                            <span className="font-mono text-xs text-muted-foreground">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{node.description}</p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {t.underHood.topics.map((topic) => (
                <article key={topic.title} className="rounded-lg border border-white/10 bg-surface/68 p-5">
                  <p className="font-heading text-lg font-semibold tracking-tight">{topic.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{topic.description}</p>
                  <ul className="mt-4 grid gap-2">
                    {topic.technologies.map((technology) => (
                      <li key={technology} className="flex items-center gap-2 text-sm text-foreground/78">
                        <span className="size-1.5 rounded-full bg-orange" />
                        {technology}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
