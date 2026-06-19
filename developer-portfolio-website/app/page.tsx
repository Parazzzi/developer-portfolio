import { AnimatedBackground } from "@/components/animated-background"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { ProjectsGrid } from "@/components/projects-grid"
import { Workflow } from "@/components/workflow"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <>
      <AnimatedBackground />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <ProjectsGrid />
        <Workflow />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
