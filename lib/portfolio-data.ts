export const profile = {
  name: "Dementiy Besarab",
  role: "Unity Developer | C# | Mobile Games | VR/XR",
  subtitle:
    "Unity Developer with 3+ years of commercial and freelance experience building mobile games, VR/XR projects, and interactive Unity applications from prototype to release.",
  badges: ["Unity 2D/3D", "C#", "Android / iOS", "VR / XR", "AI-assisted Development"],
  email: "besarabdementij1@gmail.com",
  links: {
    email: "mailto:besarabdementij1@gmail.com",
    linkedin: "https://www.linkedin.com/in/dementiy-besarab-6aa77a2a4/",
  },
}

export const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "Android / iOS", label: "Mobile Builds" },
  { value: "VR / XR", label: "Interactive Projects" },
  { value: "CREATY Games", label: "Recent Studio Role" },
]

export type SkillGroup = {
  title: string
  description: string
  tags: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Unity 2D/3D & C#",
    description: "Commercial Unity development across gameplay systems, prototypes, and production features.",
    tags: ["Unity", "C#", "2D/3D", "Git"],
  },
  {
    title: "Mobile Builds",
    description: "Android and iOS build preparation, testing, optimization, and release-focused stability.",
    tags: ["Android", "iOS", "Performance", "Game Testing"],
  },
  {
    title: "VR/XR Development",
    description: "Spatial interaction, headset testing, object placement, comfort, and natural player behavior.",
    tags: ["VR/XR", "Meta Quest", "Spatial UX"],
  },
  {
    title: "UI, Animation & Game Feel",
    description: "Responsive UI, polished transitions, animations, sound hooks, and clear player feedback.",
    tags: ["UGUI", "DOTween", "Spine", "UI/UX"],
  },
  {
    title: "Architecture & Services",
    description: "Maintainable systems built around SOLID principles, dependency injection, and clear project structure.",
    tags: ["SOLID", "Zenject", "Refactoring", "Code Review"],
  },
  {
    title: "SDKs & Monetization",
    description: "Analytics, ads, SDK/NDK packages, backend interaction, and client-server feature support.",
    tags: ["Firebase", "Game Analytics", "AppMetrica", "AdMob", "AppLovin"],
  },
  {
    title: "AI-assisted Development",
    description: "Using AI tools for codebase analysis, debugging, refactoring, routine code, and architecture validation.",
    tags: ["Codex", "Claude Code", "ChatGPT", "Architecture Review"],
  },
]

export type Project = {
  title: string
  description: string
  tags: string[]
  video: string
  poster?: string
  link?: string
  primaryLinkLabel?: string
  secondaryLink?: {
    label: string
    url: string
  }
}

export const projects: Project[] = [
  {
    title: "VR Football Penalty",
    description:
      "Room-scale VR football penalty experience where shot height, direction, and angle are controlled by real body movement. The player steps forward, backward, left, and right around the ball to aim the kick naturally before taking the penalty.",
    tags: ["Unity", "C#", "VR/XR", "Room-Scale", "Gameplay"],
    video: "/vr-football-penalty.mp4",
    poster: "/vr-football-penalty-poster.png",
  },
  {
    title: "PC Creator 2 - Mobile Simulation",
    description:
      "Commercial Unity mobile simulator work connected to CREATY's PC Creator line: gameplay and UI systems, Android/iOS build preparation, Firebase analytics, monetization SDKs, SDK/NDK packages, and release stability.",
    tags: ["Unity", "C#", "Android/iOS", "Firebase", "Ads SDKs"],
    video: "",
    poster: "/pc-creator-2.png",
    link: "https://play.google.com/store/apps/details?id=com.ultraandre.pccreator2",
    primaryLinkLabel: "Google Play",
    secondaryLink: {
      label: "App Store",
      url: "https://apps.apple.com/us/app/pc-creator-2-computer-tycoon/id1604170642",
    },
  },
  {
    title: "CREATY Mobile Game Systems",
    description:
      "Gameplay, UI, client-server features, backend interaction, analytics, monetization, and production support for mobile Unity projects developed from scratch at CREATY Games.",
    tags: ["Unity", "C#", "Mobile", "Client-Server", "Analytics"],
    video: "",
    poster: "/pc-creator-pro.png",
    link: "https://creaty.me/",
    primaryLinkLabel: "CREATY Games",
    secondaryLink: {
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/creaty-games",
    },
  },
  {
    title: "VR/XR Interaction Work",
    description:
      "VR/XR Unity work focused on natural interaction, spatial hints, headset testing, player comfort, object placement, and interaction logic that feels clear in real space.",
    tags: ["Unity", "C#", "VR/XR", "Spatial UX"],
    video: "",
    poster: "/vr-training-meta-quest-immersive-interaction.png",
    link: "https://www.linkedin.com/posts/dementiy-besarab-6aa77a2a4_vr-in-unity-is-not-just-about-adding-hands-activity-7467200872624783360-TaqP",
    primaryLinkLabel: "LinkedIn Post",
  },
]

export const workflowSteps = [
  {
    step: "01",
    title: "Plan architecture and scope",
    description: "Clarify gameplay goals, platform constraints, project structure, and the technical path before building.",
  },
  {
    step: "02",
    title: "Build Unity gameplay systems",
    description: "Implement gameplay, UI, services, saves, events, and game states with readable C# and maintainable boundaries.",
  },
  {
    step: "03",
    title: "Integrate SDKs and services",
    description: "Connect analytics, ads, SDK/NDK packages, monetization, backend interaction, and client-server features.",
  },
  {
    step: "04",
    title: "Test, optimize, and stabilize",
    description: "Profile performance, fix edge cases, verify mobile or headset behavior, and prepare stable builds.",
  },
  {
    step: "05",
    title: "Use AI as a technical teammate",
    description: "Speed up analysis, debugging, refactoring, and architecture validation while keeping final ownership of decisions.",
  },
]
