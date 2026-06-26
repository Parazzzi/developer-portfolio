import { AnimatedBackground } from "@/components/animated-background"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Skills } from "@/components/skills"
import { ProjectsGrid } from "@/components/projects-grid"
import { Achievements } from "@/components/achievements"
import { Workflow } from "@/components/workflow"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/lib/i18n/language-context"

export default function Page() {
  return (
    <LanguageProvider>
      <AnimatedBackground />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <ProjectsGrid />
        <Achievements />
        <Workflow />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
