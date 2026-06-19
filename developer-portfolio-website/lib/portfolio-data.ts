export const profile = {
  name: "Dementiy Besarab",
  role: "Unity C# Developer",
  subtitle:
    "I build mobile, VR, and gameplay experiences with Unity, C#, clean architecture, and strong attention to user experience.",
  badges: ["Unity", "C#", "Mobile Games", "VR / Meta Quest", "Gameplay Systems"],
  email: "hello@dementiy.dev",
  links: {
    email: "mailto:hello@dementiy.dev",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
  },
}

export const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "Mobile & VR", label: "Platforms" },
  { value: "Unity / C#", label: "Core Stack" },
  { value: "AI-assisted", label: "Workflow" },
]

export type SkillGroup = {
  title: string
  description: string
  tags: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Unity & C#",
    description: "Gameplay programming, clean C# architecture, and engine-level systems.",
    tags: ["Unity", "C#", "Rider", "Git"],
  },
  {
    title: "Mobile Development",
    description: "Performant mobile games shipped for Android and iOS.",
    tags: ["Android", "iOS", "Optimization", "DOTween"],
  },
  {
    title: "VR Development",
    description: "Immersive interaction and spatial behavior for Meta Quest.",
    tags: ["Meta Quest", "VR Interaction", "Spatial UX"],
  },
  {
    title: "UI / UX Implementation",
    description: "Smooth, responsive interfaces with polished transitions.",
    tags: ["UI Toolkit", "UGUI", "DOTween"],
  },
  {
    title: "Architecture & DI",
    description: "Maintainable, testable systems using dependency injection.",
    tags: ["Zenject", "Clean Architecture", "SOLID"],
  },
  {
    title: "SDKs / Analytics",
    description: "Third-party integrations, analytics, and live-ops tooling.",
    tags: ["Firebase", "Analytics", "Ads SDKs"],
  },
  {
    title: "AI-assisted Development",
    description: "Using AI tools to speed up work without blindly trusting output.",
    tags: ["Codex", "Code Review", "Tooling"],
  },
]

export type Project = {
  title: string
  description: string
  tags: string[]
  video: string
  poster?: string
  link: string
  caseStudy?: string
}

export const projects: Project[] = [
  {
    title: "VR Training Experience",
    description:
      "Interactive VR experience for Meta Quest focused on realistic player interaction, spatial behavior, and immersive scenarios.",
    tags: ["Unity", "C#", "VR", "Meta Quest"],
    video: "",
    poster: "/vr-training-meta-quest-immersive-interaction.png",
    link: "#",
    caseStudy: "#",
  },
  {
    title: "Mobile Puzzle Game",
    description:
      "Mobile puzzle game with grid-based gameplay, smooth UI transitions, progression, timers, and responsive mobile controls.",
    tags: ["Unity", "C#", "Mobile", "DOTween"],
    video: "",
    poster: "/mobile-puzzle-game-grid-colorful-ui.png",
    link: "#",
    caseStudy: "#",
  },
  {
    title: "Arcade Mini-Games Hub",
    description:
      "Collection of arcade-style mini-games with shared UI flow, restart logic, animations, and gameplay systems.",
    tags: ["Unity", "C#", "Gameplay", "UI"],
    video: "",
    poster: "/arcade-mini-games-hub-neon-retro.png",
    link: "#",
  },
]

export const workflowSteps = [
  {
    step: "01",
    title: "Understand gameplay goals",
    description: "Clarify the player experience, constraints, and the feel we're aiming for before any code.",
  },
  {
    step: "02",
    title: "Build clean Unity systems",
    description: "Architect maintainable, decoupled systems with DI so features scale without breaking.",
  },
  {
    step: "03",
    title: "Integrate UI, animations, SDKs",
    description: "Wire up responsive interfaces, smooth transitions, analytics, and third-party SDKs.",
  },
  {
    step: "04",
    title: "Test, optimize, and polish",
    description: "Profile performance, fix edge cases, and refine until it feels great on real devices.",
  },
  {
    step: "05",
    title: "Use AI tools carefully",
    description: "Speed up development with AI assistance while reviewing every line instead of blindly trusting it.",
  },
]
