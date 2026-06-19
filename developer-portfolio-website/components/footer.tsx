import { profile } from "@/lib/portfolio-data"

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2 font-mono">
          <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_var(--glow)]" />
          {profile.name}
        </div>
        <p>{profile.role}</p>
        <p>&copy; {new Date().getFullYear()} — Built with Next.js</p>
      </div>
    </footer>
  )
}
