import { stats } from "@/lib/portfolio-data"

export function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto grid w-full max-w-5xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">About</p>
          <h2 className="mt-3 text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Unity development from prototype to release
          </h2>
          <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted-foreground">
            <p>
              I am a Unity Developer with 3+ years of commercial and freelance experience building mobile games,
              VR/XR projects, and interactive applications with Unity and C#.
            </p>
            <p>
              My work covers gameplay systems, UI implementation, Android/iOS build preparation, optimization, SDK
              integrations, analytics, monetization, client-server features, and stable production delivery.
            </p>
            <p>
              I use AI tools like Codex, Claude Code, and ChatGPT for analysis, debugging, refactoring, and architecture
              validation while keeping ownership of technical decisions and final code quality.
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
