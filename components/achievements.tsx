import Image from "next/image"
import { SectionHeading } from "@/components/section-heading"

export function Achievements() {
  return (
    <section id="achievements" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeading
          eyebrow="Achievements"
          title="Achievements"
          description="A professional learning milestone connected to game design and practical project work."
        />

        <figure className="glass mt-14 overflow-hidden rounded-3xl border border-border p-3 transition-all duration-300 hover:glow-ring sm:p-4">
          <div className="overflow-hidden rounded-2xl bg-secondary/50">
            <Image
              src="/game-designer-certificate.png"
              alt="Game Designer certificate awarded to Besarab Dementiy"
              width={3166}
              height={2000}
              sizes="(max-width: 768px) 100vw, 960px"
              className="h-auto w-full object-contain"
              loading="lazy"
            />
          </div>
          <figcaption className="flex flex-col gap-1 px-2 py-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <span className="font-heading text-lg font-semibold tracking-tight">Certificate / Professional Achievement</span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">SHEPIT Courses</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
