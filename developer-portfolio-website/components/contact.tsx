import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { profile } from "@/lib/portfolio-data"

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto w-full max-w-3xl">
        <div className="glass glow-ring relative overflow-hidden rounded-3xl border border-border p-10 text-center sm:p-14">
          <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />
          <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-primary">Contact</p>
          <h2 className="relative mt-3 text-balance font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s build something playable, polished, and actually fun.
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Have a game idea, a VR concept, or a Unity project that needs a hand? I&apos;d love to hear about it.
          </p>

          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              render={<a href={profile.links.email} />}
              nativeButton={false}
              size="lg"
              className="rounded-full px-7 font-medium"
            >
              <Mail className="size-4" />
              Email me
            </Button>
            <Button
              render={<a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="rounded-full border-border bg-transparent px-7 font-medium hover:bg-secondary"
            >
              <LinkedinIcon className="size-4" />
              LinkedIn
            </Button>
            <Button
              render={<a href={profile.links.github} target="_blank" rel="noopener noreferrer" />}
              size="lg"
              variant="outline"
              className="rounded-full border-border bg-transparent px-7 font-medium hover:bg-secondary"
            >
              <GithubIcon className="size-4" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
