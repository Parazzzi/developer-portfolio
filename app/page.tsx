import { AnimatedBackground } from "@/components/animated-background"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { ProjectsGrid } from "@/components/projects-grid"
import { UnderTheHood } from "@/components/under-the-hood"
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
        <ProjectsGrid />
        <UnderTheHood />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
