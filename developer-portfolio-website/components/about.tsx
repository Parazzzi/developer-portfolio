import { stats } from "@/lib/portfolio-data"

export function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto grid w-full max-w-5xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">About</p>
          <h2 className="mt-3 text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Crafting games that feel as good as they look
          </h2>
          <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted-foreground">
            <p>
              I am a Unity C# Developer with experience in mobile games, VR experiences, gameplay systems, UI,
              integrations, optimization, and working with AI tools like Codex to improve development speed and code
              quality.
            </p>
            <p>
              I care about clean architecture and the small details that make a game feel polished — responsive
              controls, smooth transitions, and performance that holds up on real devices.
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass glow-ring rounded-2xl border border-border p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <dt className="font-heading text-xl font-semibold text-foreground sm:text-2xl">{stat.value}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
