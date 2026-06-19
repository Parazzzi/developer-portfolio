import { SectionHeading } from "@/components/section-heading"
import { skillGroups } from "@/lib/portfolio-data"

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="A focused, production-ready toolkit"
          description="Grouped by what I actually ship - from Unity systems to UI, integrations, optimization, and AI-assisted workflows."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <article
              key={group.title}
              className="group glass rounded-2xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:glow-ring"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-heading text-lg font-semibold tracking-tight">{group.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{group.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-foreground/80 transition-colors group-hover:border-primary/30"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
