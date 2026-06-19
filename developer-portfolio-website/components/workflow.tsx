import { SectionHeading } from "@/components/section-heading"
import { workflowSteps } from "@/lib/portfolio-data"

export function Workflow() {
  return (
    <section id="workflow" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto w-full max-w-4xl">
        <SectionHeading
          eyebrow="Workflow"
          title="How I work"
          description="A repeatable process that keeps quality high from first idea to polished build."
        />

        <ol className="mt-14 space-y-4">
          {workflowSteps.map((step) => (
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
