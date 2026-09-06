import { ArtifactCanvas } from "@/components/artifacts/artifact-canvas"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { ProjectsGrid } from "@/components/projects-grid"
import { UnderTheHood } from "@/components/under-the-hood"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Experience } from "@/components/experience"
import { LanguageProvider } from "@/lib/i18n/language-context"

export default function Page() {
  return (
    <LanguageProvider>
      <ArtifactCanvas />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProjectsGrid />
        <UnderTheHood />
        <Skills />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
