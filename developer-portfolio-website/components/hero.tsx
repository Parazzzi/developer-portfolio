import { ArrowDown, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { profile } from "@/lib/portfolio-data"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-28 pb-20">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Available for new projects
        </div>

        <h1 className="text-balance font-heading text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
          {profile.name}
        </h1>

        <p className="mt-4 font-mono text-base text-primary text-glow sm:text-lg">{profile.role}</p>

        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.subtitle}
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Button
            render={<a href="#projects" />}
            nativeButton={false}
            size="lg"
            className="rounded-full px-7 font-medium"
          >
            View Projects
            <ArrowDown className="size-4" />
          </Button>
          <Button
            render={<a href={profile.links.email} />}
            nativeButton={false}
            size="lg"
            variant="outline"
            className="rounded-full border-border bg-card/40 px-7 font-medium backdrop-blur hover:bg-secondary"
          >
            <Mail className="size-4" />
            Contact Me
          </Button>
        </div>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {profile.badges.map((badge) => (
            <li
              key={badge}
              className="rounded-full border border-border glass px-3.5 py-1.5 text-xs font-medium text-foreground/80"
            >
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
