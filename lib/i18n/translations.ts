import type {
  AchievementContent,
  AchievementId,
  PetProjectContent,
  ProjectContent,
  ProjectId,
} from "@/lib/portfolio-data"
import type { BookContent } from "@/lib/book-data"
import type { GamesLabContent, GamesLabItemId } from "@/lib/games-lab-data"

export const languages = ["en", "ua"] as const
export type Language = (typeof languages)[number]

export const defaultLanguage: Language = "en"

export const languageLabels: Record<Language, string> = {
  en: "EN",
  ua: "UA",
}

export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && languages.includes(value as Language)
}

export function formatMessage(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce(
    (message, [key, value]) => message.replaceAll(`{${key}}`, String(value)),
    template,
  )
}

type NavItem = {
  label: string
  href: string
}

type Stat = {
  value: string
  label: string
}

type Service = {
  title: string
  description: string
}

type SkillGroup = {
  title: string
  description: string
  tags: string[]
}

type ExperienceItem = {
  role: string
  company: string
  period: string
  arrangement: string
  highlights: string[]
}

type WorkflowStep = {
  step: string
  title: string
  description: string
}

type Translation = {
  languageSwitcher: {
    ariaLabel: string
  }
  nav: {
    items: NavItem[]
    contact: string
  }
  profile: {
    role: string
    subtitle: string
    badges: string[]
  }
  hero: {
    status: string
    availableFor: string
    funPortfolio3d: string
    availabilityItems: string[]
    viewProjects: string
    contactMe: string
    downloadCv: string
    downloadCvAria: string
  }
  petProject: PetProjectContent
  book: BookContent
  about: {
    eyebrow: string
    title: string
    paragraphs: string[]
    stats: Stat[]
  }
  services: {
    eyebrow: string
    title: string
    description: string
    items: Service[]
  }
  skills: {
    eyebrow: string
    title: string
    description: string
    groups: SkillGroup[]
  }
  experience: {
    eyebrow: string
    title: string
    description: string
    items: ExperienceItem[]
  }
  projects: {
    eyebrow: string
    title: string
    description: string
    card: {
      gameplayVideoTitle: string
      previewAlt: string
      noPreview: string
      gameplayPreview: string
      openProject: string
    }
    items: Record<ProjectId, ProjectContent>
  }
  achievements: {
    eyebrow: string
    title: string
    description: string
    items: Record<AchievementId, AchievementContent>
  }
  workflow: {
    eyebrow: string
    title: string
    description: string
    steps: WorkflowStep[]
  }
  contact: {
    eyebrow: string
    title: string
    description: string
    emailMe: string
    downloadCv: string
    downloadCvAria: string
    telegramLabel: string
  }
  footer: {
    builtWith: string
  }
  gamesLab: {
    heading: string
    intro: string
    description: string
    viewButton: string
    noPreview: string
    noScreenshots: string
    closeGalleryAria: string
    screenshotAlt: string
    gameplayPreviewAlt: string
    items: Record<GamesLabItemId, GamesLabContent>
  }
}

export const translations: Record<Language, Translation> = {
  en: {
    languageSwitcher: {
      ariaLabel: "Switch language",
    },
    nav: {
      items: [
        { label: "Pet Project", href: "#pet-project" },
        { label: "Book", href: "#book" },
        { label: "About", href: "#about" },
        { label: "What I Do", href: "#services" },
        { label: "Skills", href: "#skills" },
        { label: "Experience", href: "#experience" },
        { label: "Projects", href: "#projects" },
        { label: "Achievements", href: "#achievements" },
        { label: "Workflow", href: "#workflow" },
        { label: "Contact", href: "#contact" },
      ],
      contact: "Contact Me",
    },
    profile: {
      role: "Unity Developer | C# | Gameplay Systems | Multiplayer | VR/XR",
      subtitle:
        "Unity Developer building mobile games, VR/XR and interactive applications in C#. Delivered two mid-core projects from scratch through release, with experience in gameplay, UI, SDK integrations, optimization, and online co-op.",
      badges: ["Unity 6 / C#", "Gameplay Systems", "Multiplayer / Co-op", "Android / iOS", "VR / XR"],
    },
    hero: {
      status: "Currently available",
      availableFor: "Currently available for:",
      funPortfolio3d: "3D Fun Portfolio",
      availabilityItems: [
        "Unity Developer roles and contracts",
        "Mobile game development for Android/iOS",
        "Gameplay systems and online co-op multiplayer",
        "VR/XR and interactive applications",
        "SDK, analytics, ads, and client-server integrations",
        "Optimization, project stabilization, and bug fixing",
      ],
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      downloadCv: "Download CV",
      downloadCvAria: "Download Dementiy Besarab CV",
    },
    petProject: {
      eyebrow: "Pet Project",
      title: "Scrap Orbit - my own co-op game",
      description:
        "A first-person Unity 6/C# game for solo and online co-op, built end to end by me and now released in Early Access on itch.io.",
      status: "Early Access",
      playButton: "Play on itch.io",
      highlights: [
        {
          title: "Gameplay",
          description:
            "Procedural stations, dismantling, physics-based cargo, oxygen management, fire/electrical hazards, and teammate rescue.",
        },
        {
          title: "Online co-op",
          description:
            "Netcode for GameObjects + Lobby/Relay for host-authoritative co-op, with cargo prediction and reconciliation.",
        },
        {
          title: "Architecture",
          description:
            "Shared, testable gameplay rules for solo and co-op, explicit state machines, and ScriptableObject configuration.",
        },
        {
          title: "Rendering, tests & pipeline",
          description:
            "URP rendering and custom effects, Input System controls, EditMode/PlayMode tests, automated co-op scenarios, and a Blender Python-to-Unity asset pipeline.",
        },
      ],
      tags: ["Unity 6", "C#", "Netcode for GameObjects", "Lobby/Relay", "URP", "Input System", "Unity Test Framework"],
    },
    book: {
      eyebrow: "Book / Author Project",
      title: "AI in Game Dev - my book for game developers",
      description:
        "A practical guide I wrote for game developers who want to use AI tools in real Unity/C# work without giving up code quality, architecture, or production judgment.",
      status: "Manuscript complete",
      statusNote: "Coming soon to Amazon",
      subtitle: "Practical Tools, Workflows, and Real-World Use Cases for Modern Game Creators",
      paragraphs: [
        "AI can make a thoughtful developer faster - it does not make weak work strong by itself. The book is built around that idea: specific tasks, clear constraints, and a developer who stays in control.",
        "It follows the whole development loop - scoping ideas, prototyping in Unity, reviewing generated C#, debugging with evidence, refactoring architecture, and shipping on VR and mobile - with prompts and checklists you can apply to a real project.",
      ],
      stats: [
        { value: "13", label: "Chapters" },
        { value: "142", label: "Pages" },
        { value: "Unity / C#", label: "Core focus" },
        { value: "Mobile / VR", label: "Platform workflows" },
      ],
      focusAreas: [
        {
          title: "AI tools for game developers",
          description: "Where AI actually helps: ideas, prototypes, C# drafts, debugging, reviews, and documentation.",
        },
        {
          title: "Workflows that save time",
          description: "Repeatable loops built on evidence, small outputs, and human review at every gate.",
        },
        {
          title: "Real-world use cases",
          description: "From prototyping to production, including examples of AI output that looks right but breaks the build.",
        },
        {
          title: "Practical examples",
          description: "Unity scenes, C# snippets, VR and mobile constraints, prompt templates, and checklists.",
        },
      ],
      coverAlt: "Cover of the book AI in Game Dev by Dementiy Besarab",
      previewButton: "Look inside",
      inquiryButton: "Ask about the book",
      preview: {
        heading: "Look inside the book",
        description:
          "Ten selected pages from the book. Open any page, then flip through with the arrows, keyboard, or a swipe.",
        pageLabel: "p. {page}",
        openPageAria: "Open preview of page {page}: {title}",
        pageAlt: "Book page {page}: {title}",
        previousPage: "Previous page",
        nextPage: "Next page",
        closePreview: "Close book preview",
        counter: "Page {page} · {current} / {total}",
        scrollHint: "Swipe to see more pages →",
        showPages: "View pages",
        hidePages: "Hide pages",
        pages: {
          "author-note": {
            title: "Author Note",
            caption: "Why I wrote the book and the stance it takes: skeptical, but not anti-AI.",
          },
          contents: {
            title: "Table of Contents",
            caption: "Thirteen chapters plus a glossary, recommended tools, and further reading.",
          },
          introduction: {
            title: "Ch. 1 - Introduction",
            caption: "The AI-assisted development loop that the rest of the book builds on.",
          },
          "game-ideas": {
            title: "Ch. 3 - AI Game Ideas",
            caption: "A constraint canvas that turns vague AI brainstorming into a small prototype brief.",
          },
          prototyping: {
            title: "Ch. 4 - Unity Prototyping",
            caption: "A prototype slice map: prototype the question, not the product.",
          },
          csharp: {
            title: "Ch. 5 - AI for C# Code",
            caption: "Reviewing generated C# against the real project, and why ScriptableObjects are a good bounded task.",
          },
          debugging: {
            title: "Ch. 6 - Debugging With AI",
            caption: "An evidence-first debugging funnel: from symptom to reproduction, isolation, and fix.",
          },
          architecture: {
            title: "Ch. 7 - Architecture Refactoring",
            caption: "Splitting an overgrown manager into clear responsibilities without inventing a framework.",
          },
          "prompt-library": {
            title: "Ch. 12 - Prompt Library",
            caption: "Reusable prompts with goal, context, constraints, output format, and verification built in.",
          },
          "final-workflow": {
            title: "Ch. 13 - Final Workflow",
            caption: "The complete loop from a scoped idea to a reviewed build.",
          },
        },
      },
      contents: {
        heading: "Table of contents",
        pageLabel: "p. {page}",
        previewChapterAria: "Preview a page from {title}",
        chapters: [
          {
            title: "Introduction",
            summary: "Who the book is for and how to use AI without losing your grip on the work.",
          },
          {
            title: "AI Is Not Magic",
            summary: "What AI does well, where it fails, and how to verify output before trusting it.",
          },
          {
            title: "AI Game Ideas",
            summary: "Turning brainstorms into scoped, prototype-friendly concepts.",
          },
          {
            title: "Unity Prototyping",
            summary: "Using AI for the first pass: greybox, movement, temporary UI, and placeholder data.",
          },
          {
            title: "AI For C# Code",
            summary: "Lifecycle, serialization, ScriptableObjects, async code, and performance review.",
          },
          {
            title: "Debugging With AI",
            summary: "Evidence packets, stack traces, and applying one fix at a time.",
          },
          {
            title: "Architecture Refactoring",
            summary: "Reviewing architecture and refactoring overgrown scripts safely.",
          },
          {
            title: "VR And Mobile Workflows",
            summary: "Platform constraints, device test matrices, and bad AI assumptions.",
          },
          {
            title: "Art, Audio, And Narrative",
            summary: "Creative direction, asset tracking, licensing checks, and style consistency.",
          },
          {
            title: "Production Workflow",
            summary: "Feature briefs, reviewable AI output, and documentation as part of the loop.",
          },
          {
            title: "Risks, Ethics, and Copyright",
            summary: "Risk gates for code, assets, privacy, disclosure, and publishing.",
          },
          {
            title: "Prompt Library",
            summary: "Reusable prompts for ideas, scenes, C#, debugging, refactoring, VR, and mobile.",
          },
          {
            title: "Final Workflow",
            summary: "An 11-step loop from game idea to reviewed build.",
          },
        ],
        backMatterHeading: "Back matter",
        backMatter: ["Conclusion", "Glossary", "Recommended Tools", "References & Further Reading", "About the Author"],
      },
      process: {
        heading: "About the writing process",
        intro:
          "I wrote the book the way I build games: small iterations, honest reviews, and nothing shipped without being checked.",
        steps: [
          {
            title: "Grounded in real Unity work",
            description:
              "The topics come from day-to-day Unity/C# development - prototyping, debugging, refactoring, and mobile and VR releases - not from AI hype.",
          },
          {
            title: "AI as an assistant, not the author",
            description:
              "I used AI for research support, alternative viewpoints, analysis, and editorial review. Structure, examples, wording, and final decisions are mine.",
          },
          {
            title: "Examples reviewed like production code",
            description:
              "C# samples and prompts were checked against Unity lifecycle, serialization, and platform pitfalls, and time-sensitive policy notes are flagged for a source check before release.",
          },
          {
            title: "Dedicated editorial passes",
            description:
              "Separate passes for consistency, repetition, fact-checking, figure clarity, and page layout, plus a human-voice pass to keep it sounding like one developer talking to another.",
          },
        ],
      },
      cta: {
        eyebrow: "Interested in the book?",
        title: "Get in touch about early access, feedback, or collaboration",
        description:
          "If you want to read the preview, give feedback, or talk about AI workflows for your Unity team, send me a message - I would be glad to hear from you.",
        emailButton: "Email me about the book",
      },
    },
    about: {
      eyebrow: "About",
      title: "Unity development from idea to release",
      paragraphs: [
        "I am a Unity Developer building mobile games, VR/XR and interactive applications in C#.",
        "At CREATY I delivered two mid-core projects from scratch through release. Today I develop gameplay, VR interactions, UI, and client-server integrations for outsourced Unity apps, and I independently shipped two major updates for The Artman App.",
        "In my pet project Scrap Orbit I build online co-op with Netcode for GameObjects, shared testable gameplay rules, and automated tests. I focus on clean architecture, maintainable code, optimization, and stable releases.",
      ],
      stats: [
        { value: "2", label: "Mid-core releases from scratch" },
        { value: "Unity 6 / C#", label: "Core stack" },
        { value: "Online Co-op", label: "Netcode for GameObjects" },
        { value: "Mobile / VR", label: "Android, iOS, VR/XR" },
      ],
    },
    services: {
      eyebrow: "What I do",
      title: "What I can do for your project",
      description:
        "End-to-end Unity development for mobile releases, multiplayer games, VR/XR experiences, and existing codebases that need stability.",
      items: [
        {
          title: "Unity & mobile development",
          description:
            "Develop gameplay, UI flows, Android/iOS builds, analytics, monetization, and production features in Unity/C#.",
        },
        {
          title: "Gameplay systems",
          description:
            "Build physics-driven mechanics, state machines, animation, and game feel with ScriptableObject-driven, testable gameplay rules.",
        },
        {
          title: "Multiplayer & online co-op",
          description:
            "Implement host-authoritative co-op with Netcode for GameObjects, Lobby/Relay, RPCs, state synchronization, and prediction/reconciliation.",
        },
        {
          title: "VR/XR & interactive applications",
          description:
            "Build and polish spatial interactions, VR gameplay, UI, and client-server features for headset-tested interactive experiences.",
        },
        {
          title: "SDKs & integrations",
          description:
            "Integrate client-server/backend services, Firebase, AppMetrica, GameAnalytics, AppsFlyer, Adjust, Tenjin, AdMob, Unity Ads, AppLovin, and SDK/NDK packages.",
        },
        {
          title: "Optimization and bug fixing",
          description:
            "Profile and optimize builds, debug production issues, refactor fragile systems, and prepare stable releases.",
        },
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "A focused, production-ready toolkit",
      description:
        "A practical toolkit spanning Unity gameplay, architecture, multiplayer, platforms, integrations, and delivery quality.",
      groups: [
        {
          title: "Unity & Gameplay",
          description: "Commercial Unity development of gameplay systems, physics, animation, and game feel.",
          tags: ["Unity 6", "C#", "2D/3D", "Physics", "Spine", "DOTween"],
        },
        {
          title: "Architecture",
          description: "Modular, maintainable systems with shared solo/co-op gameplay rules and clear project structure.",
          tags: ["SOLID", "Zenject", "Interfaces", "State Machines", "ScriptableObjects"],
        },
        {
          title: "Multiplayer",
          description: "Host-authoritative online co-op with synchronized state and cargo prediction/reconciliation.",
          tags: ["Netcode for GameObjects", "Lobby/Relay", "RPCs", "State Sync"],
        },
        {
          title: "Platforms & Rendering",
          description: "Mobile and VR/XR builds, URP rendering, custom visual effects, input, and optimization.",
          tags: ["Android/iOS", "VR/XR", "URP", "Input System", "Optimization"],
        },
        {
          title: "Analytics & Ads",
          description: "Analytics, ads, SDK/NDK packages, and client-server/backend service integrations.",
          tags: ["Firebase", "AppMetrica", "GameAnalytics", "AppsFlyer", "Adjust", "Tenjin", "AdMob", "Unity Ads", "AppLovin"],
        },
        {
          title: "Tools & Quality",
          description: "Automated testing, profiling, debugging, refactoring, and source control.",
          tags: ["Rider", "Git", "Unity Test Framework", "EditMode/PlayMode", "Profiling"],
        },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Commercial and freelance experience",
      description:
        "A track record across Unity mobile games, VR/XR and outsourced applications, and full-cycle delivery.",
      items: [
        {
          role: "Unity Developer",
          company: "Mirko Solutions",
          period: "Apr 2026 - Present",
          arrangement: "Remote · Full-time Apr-Sep · Part-time since Sep",
          highlights: [
            "Continue development of outsourced Unity projects, including VR/XR and interactive applications such as Tile Trap, Space Snap Clicker, and an NDA-protected VR project.",
            "Develop and maintain Unity application features using C#.",
            "Implement gameplay systems, VR interactions, and user interfaces.",
            "Work with client-server functionality and project integrations.",
            "Take part in debugging, optimization, and code improvements.",
          ],
        },
        {
          role: "Unity Developer",
          company: "Wayheart Entertainment",
          period: "Aug 2026 - Oct 2026",
          arrangement: "Remote · Part-time",
          highlights: [
            "Independently developed and delivered two major updates for The Artman App, a Unity project.",
            "Managed development, debugging, and optimization using Unity and C#.",
            "Successfully brought the project to its official release.",
          ],
        },
        {
          role: "Unity Developer",
          company: "CREATY",
          period: "May 2024 - Apr 2026",
          arrangement: "Lutsk · On-site · Full-time",
          highlights: [
            "Developed two mid-core Unity projects from scratch, contributing from early development to release.",
            "Prepared Android/iOS builds and integrated third-party services including AdMob, Unity Ads, and Firebase Analytics.",
            "Collaborated with game designers and analysts on gameplay mechanics, balancing, and feature implementation.",
            "Worked closely with UI/UX designers to implement and polish in-game interfaces.",
            "Integrated client-server features and backend services.",
            "Improved client stability, debugged production issues, and maintained third-party SDK integrations.",
          ],
        },
        {
          role: "Unity Developer",
          company: "Bugiko",
          period: "Nov 2023 - Apr 2024",
          arrangement: "Remote · Full-time",
          highlights: [
            "Built a large-scale Unity prototype from scratch, including project architecture and technology stack selection.",
            "Designed scalable and maintainable systems with a focus on performance and flexibility.",
            "Took part in the full development cycle: from technical planning and architecture to MVP and further iterations.",
            "Applied SOLID principles, Clean Architecture, and dependency injection (Zenject) to keep the codebase modular and maintainable.",
            "Researched and introduced technical solutions to improve development workflow and project scalability.",
          ],
        },
        {
          role: "Unity Developer",
          company: "Freelance",
          period: "Apr 2023 - Oct 2023",
          arrangement: "Remote",
          highlights: [
            "Developed casual mobile games and interactive Unity applications for different clients.",
            "Implemented gameplay mechanics, UI systems, animations, audio, and other game features.",
            "Debugged and optimized projects for Android and iOS devices.",
            "Prepared and tested mobile builds across different platforms.",
            "Worked directly with clients to clarify requirements and turn ideas into working game features.",
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Projects",
      title: "Selected Unity work",
      description: "Released mobile games and an interactive room-scale VR prototype.",
      card: {
        gameplayVideoTitle: "{title} gameplay video",
        previewAlt: "{title} preview",
        noPreview: "No preview",
        gameplayPreview: "Gameplay preview",
        openProject: "Open project",
      },
      items: {
        "pc-creator-3": {
          description:
            "Mobile tycoon simulator work for PC Creator 3, focused on production Unity systems, mobile UI, build stability, analytics, monetization, and release-ready Android/iOS delivery.",
          tags: ["Unity", "C#", "Mobile", "Android/iOS", "Tycoon"],
        },
        "pc-creator-3-pro": {
          description:
            "Premium mobile simulation project in the PC Creator series, with Unity gameplay, UI flow, SDK integration, mobile optimization, and stable store build support.",
          tags: ["Unity", "C#", "Mobile", "Simulation", "SDKs"],
        },
        "pc-creator-2": {
          description:
            "Commercial Unity mobile simulator work connected to CREATY's PC Creator line: gameplay and UI systems, Android/iOS build preparation, Firebase analytics, monetization SDKs, SDK/NDK packages, and release stability.",
          tags: ["Unity", "C#", "Android/iOS", "Firebase", "Ads SDKs"],
        },
        "the-artman": {
          description:
            "Story-driven cinema producer simulator set in a cyberpunk Hollywood of 2056. At Wayheart Entertainment I independently developed and shipped two major Unity updates, covering new features, debugging, and optimization, and took the project to its official release.",
          tags: ["Unity", "C#", "Android/iOS", "Simulation", "Live updates"],
        },
        "vr-football-penalty": {
          description:
            "Room-scale VR football penalty experience where shot height, direction, and angle are controlled by real body movement. The player steps forward, backward, left, and right around the ball to aim the kick naturally before taking the penalty.",
          tags: ["Unity", "C#", "VR/XR", "Room-Scale", "Gameplay"],
        },
      },
    },
    achievements: {
      eyebrow: "Achievements",
      title: "Achievements",
      description:
        "Professional learning milestones connected to game design, production thinking, and practical Unity project work.",
      items: {
        "game-designer-certificate": {
          title: "Game Designer Certificate",
          description:
            "Completed a practical game design course covering game documentation, interface design, market analysis, and basic gameplay balance.",
          imageAlt: "Game Designer certificate awarded to Besarab Dementiy",
          tags: ["Game Design", "Documentation", "UI Design", "Balance"],
        },
      },
    },
    workflow: {
      eyebrow: "Workflow",
      title: "How I work",
      description: "A practical process for taking Unity games and interactive products from idea to stable release.",
      steps: [
        {
          step: "01",
          title: "Plan architecture and scope",
          description: "Clarify product goals, platform constraints, project structure, and the technical path before building.",
        },
        {
          step: "02",
          title: "Build gameplay and UI",
          description:
            "Implement gameplay logic, UI, multiplayer, and client-server features with readable, maintainable, testable code.",
        },
        {
          step: "03",
          title: "Integrate SDKs and services",
          description:
            "Connect backend services, analytics, ads, SDK/NDK packages, and other third-party services as needed.",
        },
        {
          step: "04",
          title: "Test and automate",
          description:
            "Cover gameplay rules with EditMode/PlayMode tests, run automated co-op scenarios, and verify mobile or headset behavior.",
        },
        {
          step: "05",
          title: "Optimize and ship",
          description: "Profile, fix edge cases, optimize performance, and prepare stable Android/iOS and VR releases.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's build something useful, polished, and reliable.",
      description:
        "Have a mobile game, a multiplayer or co-op idea, a VR/XR concept, or a Unity project? I'd love to hear about it.",
      emailMe: "Email me",
      downloadCv: "Download CV",
      downloadCvAria: "Download Dementiy Besarab CV",
      telegramLabel: "Telegram:",
    },
    footer: {
      builtWith: "Built with Next.js",
    },
    gamesLab: {
      heading: "Games Lab",
      intro: "A collection of Unity mobile game prototypes and gameplay concepts.",
      description:
        "These prototypes explore different casual game mechanics, mobile UI flows, fast gameplay iteration, puzzle logic, arcade gameplay, and experimental ideas built in Unity.",
      viewButton: "View",
      noPreview: "No preview",
      noScreenshots: "No screenshots found for this game.",
      closeGalleryAria: "Close {title} gallery",
      screenshotAlt: "{title} screenshot {index}",
      gameplayPreviewAlt: "{title} gameplay preview",
      items: {
        "2048": {
          shortDescription: "Classic number puzzle based on merging tiles and reaching the highest possible score.",
          fullDescription:
            "A classic 2048-style mobile puzzle prototype focused on tile merging, score progression, and simple casual gameplay.",
          genre: "Number Puzzle / Casual",
        },
        "bvda-match-arena": {
          shortDescription:
            "American football mini-game with two modes: scoring field goals and making accurate passes to teammates.",
          fullDescription:
            "A mobile American football prototype with two gameplay modes: kicking the ball into the goal and making precise passes to teammates.",
          genre: "Sports / Arcade",
        },
        cyberyolk: {
          shortDescription: "A classic Minesweeper-style puzzle game redesigned with a bright cyber-themed visual style.",
          fullDescription:
            "A cyber-themed Minesweeper-style mobile puzzle prototype focused on grid logic, risk-based choices, and clean mobile UI feedback.",
          genre: "Puzzle / Logic",
        },
        darksummoning: {
          shortDescription:
            "A reaction-based arcade game where the player catches only the correct items to earn more points.",
          fullDescription:
            "A fast arcade prototype where the player must react quickly, collect only the correct items, avoid mistakes, and build a higher score.",
          genre: "Arcade / Reaction",
        },
        feathermoon: {
          shortDescription: "A classic Sudoku mobile puzzle with limited lives and clean number-based gameplay.",
          fullDescription:
            "FeatherMoon is a classic Sudoku-style mobile puzzle prototype. The player solves the grid by placing the correct numbers while having only 3 lives to complete the level. The game focuses on logic, careful decision-making, and simple mobile-friendly interaction.",
          genre: "Sudoku / Logic Puzzle",
        },
        fistcraft: {
          shortDescription:
            "A fighting game focused on choosing the right attacks and blocks to defeat the opponent. Supports two players on one phone.",
          fullDescription:
            "A local fighting prototype where players use correct attacks, blocks, and timing to defeat the opponent. The game can be played by two players on a single phone.",
          genre: "Fighting / Local Multiplayer",
        },
        lexpunk: {
          shortDescription: "A memory quiz game where the player remembers words and objects to answer correctly.",
          fullDescription:
            "A memory-based quiz prototype focused on remembering words, objects, and visual details, then choosing the correct answers.",
          genre: "Quiz / Memory",
        },
        meowtubes: {
          shortDescription:
            "A sorting puzzle where cats must be moved into tubes by color. Different colors cannot be mixed incorrectly.",
          fullDescription:
            "A mobile sorting puzzle prototype where the player moves cats between tubes and groups them by color while following placement rules.",
          genre: "Sorting Puzzle / Casual",
        },
        "queue-dash": {
          shortDescription: "A fast casual game where the player chooses the quickest checkout line to finish first and win.",
          fullDescription:
            "A casual decision-making prototype where the player must choose the fastest queue, avoid slow lines, and reach the checkout first.",
          genre: "Casual / Decision Game",
        },
        "tamagichi-tramp": {
          shortDescription:
            "A virtual pet-style game where the player supports the character's ego with gifts and office upgrades.",
          fullDescription:
            "A virtual pet-style prototype where the player gives gifts, improves the office, and keeps the character's ego high through upgrades and interaction.",
          genre: "Virtual Pet / Simulation",
        },
        valdrisrun: {
          shortDescription:
            "A vampire runner where the player survives as long as possible, avoids danger, collects coins, and transforms into a bat to fly.",
          fullDescription:
            "A horizontal runner prototype about a vampire trying to survive as long as possible. The player avoids obstacles, collects coins, and can transform into a bat to fly through the level.",
          genre: "Runner / Platformer / Arcade",
        },
      },
    },
  },
  ua: {
    languageSwitcher: {
      ariaLabel: "Перемкнути мову",
    },
    nav: {
      items: [
        { label: "Пет-проєкт", href: "#pet-project" },
        { label: "Книга", href: "#book" },
        { label: "Про мене", href: "#about" },
        { label: "Що я роблю", href: "#services" },
        { label: "Навички", href: "#skills" },
        { label: "Досвід", href: "#experience" },
        { label: "Проєкти", href: "#projects" },
        { label: "Досягнення", href: "#achievements" },
        { label: "Процес", href: "#workflow" },
        { label: "Контакти", href: "#contact" },
      ],
      contact: "Зв'язатися",
    },
    profile: {
      role: "Unity Developer | C# | Gameplay Systems | Multiplayer | VR/XR",
      subtitle:
        "Unity Developer, який створює мобільні ігри, VR/XR та інтерактивні застосунки на C#. Довів два mid-core проєкти з нуля до релізу; маю досвід у gameplay, UI, SDK-інтеграціях, оптимізації та online co-op.",
      badges: ["Unity 6 / C#", "Gameplay-системи", "Multiplayer / Co-op", "Android / iOS", "VR / XR"],
    },
    hero: {
      status: "Відкритий до пропозицій",
      availableFor: "Відкритий до:",
      funPortfolio3d: "3D Fun Portfolio",
      availabilityItems: [
        "Ролі та контракти Unity Developer",
        "Розробка мобільних ігор для Android/iOS",
        "Gameplay-системи та online co-op multiplayer",
        "VR/XR та інтерактивні застосунки",
        "Інтеграції SDK, аналітики, реклами та клієнт-серверних сервісів",
        "Оптимізація, стабілізація проєктів і виправлення багів",
      ],
      viewProjects: "Переглянути проєкти",
      contactMe: "Зв'язатися",
      downloadCv: "Завантажити CV",
      downloadCvAria: "Завантажити CV Dementiy Besarab",
    },
    petProject: {
      eyebrow: "Пет-проєкт",
      title: "Scrap Orbit - моя власна co-op гра",
      description:
        "Гра від першої особи на Unity 6/C# для соло та online co-op, яку я створив повністю сам. Уже вийшла в ранньому доступі на itch.io.",
      status: "Ранній доступ",
      playButton: "Грати на itch.io",
      highlights: [
        {
          title: "Gameplay",
          description:
            "Процедурні станції, розбирання, physics-based вантаж, керування киснем, пожежі та електричні небезпеки, порятунок напарників.",
        },
        {
          title: "Online co-op",
          description:
            "Netcode for GameObjects + Lobby/Relay для host-authoritative co-op із prediction і reconciliation вантажу.",
        },
        {
          title: "Архітектура",
          description:
            "Спільні тестовані gameplay-правила для соло та co-op, явні state machines і конфігурація через ScriptableObjects.",
        },
        {
          title: "Рендеринг, тести й пайплайн",
          description:
            "URP-рендеринг і кастомні ефекти, керування через Input System, EditMode/PlayMode тести, автоматизовані co-op сценарії та Blender Python-to-Unity пайплайн ассетів.",
        },
      ],
      tags: ["Unity 6", "C#", "Netcode for GameObjects", "Lobby/Relay", "URP", "Input System", "Unity Test Framework"],
    },
    book: {
      eyebrow: "Книга / Авторський проєкт",
      title: "AI in Game Dev - моя книга для розробників ігор",
      description:
        "Практичний посібник, який я написав для розробників ігор, що хочуть використовувати AI-інструменти в реальній Unity/C# роботі, не втрачаючи якості коду, архітектури та production-рішень.",
      status: "Книгу завершено",
      statusNote: "Незабаром на Amazon",
      subtitle: "Practical Tools, Workflows, and Real-World Use Cases for Modern Game Creators",
      paragraphs: [
        "AI може зробити вдумливого розробника швидшим, але сам по собі не робить слабку роботу сильною. Книга побудована навколо цієї ідеї: конкретні задачі, чіткі обмеження та розробник, який тримає контроль.",
        "Вона проходить увесь цикл розробки - від скоупінгу ідей, прототипування в Unity та рев'ю згенерованого C# до дебагу на основі доказів, рефакторингу архітектури та релізів на VR і мобільних - з промптами й чеклистами, які можна застосувати до реального проєкту.",
      ],
      stats: [
        { value: "13", label: "Розділів" },
        { value: "142", label: "Сторінки" },
        { value: "Unity / C#", label: "Основний фокус" },
        { value: "Mobile / VR", label: "Платформні workflow" },
      ],
      focusAreas: [
        {
          title: "AI-інструменти для розробників ігор",
          description: "Де AI справді допомагає: ідеї, прототипи, чернетки C#, дебаг, рев'ю та документація.",
        },
        {
          title: "Workflow, що економлять час",
          description: "Повторювані цикли на основі доказів, невеликих результатів і людського рев'ю на кожному етапі.",
        },
        {
          title: "Реальні кейси",
          description: "Від прототипу до продакшну, включно з прикладами AI-відповідей, які виглядають правильно, але ламають білд.",
        },
        {
          title: "Практичні приклади",
          description: "Unity-сцени, C#-фрагменти, обмеження VR і мобільних платформ, шаблони промптів і чеклисти.",
        },
      ],
      coverAlt: "Обкладинка книги AI in Game Dev, автор Dementiy Besarab",
      previewButton: "Зазирнути всередину",
      inquiryButton: "Запитати про книгу",
      preview: {
        heading: "Зазирніть усередину книги",
        description:
          "Десять вибраних сторінок із книги (англійською). Відкрийте будь-яку сторінку й гортайте стрілками, клавіатурою або свайпом.",
        pageLabel: "с. {page}",
        openPageAria: "Відкрити сторінку {page}: {title}",
        pageAlt: "Сторінка книги {page}: {title}",
        previousPage: "Попередня сторінка",
        nextPage: "Наступна сторінка",
        closePreview: "Закрити перегляд книги",
        counter: "Сторінка {page} · {current} / {total}",
        scrollHint: "Гортайте, щоб побачити більше →",
        showPages: "Переглянути сторінки",
        hidePages: "Згорнути сторінки",
        pages: {
          "author-note": {
            title: "Слово автора",
            caption: "Чому я написав цю книгу і яку позицію вона займає: скептично, але не проти AI.",
          },
          contents: {
            title: "Зміст",
            caption: "Тринадцять розділів, глосарій, рекомендовані інструменти та додаткові джерела.",
          },
          introduction: {
            title: "Розд. 1 - Вступ",
            caption: "Цикл AI-assisted розробки, на якому побудована решта книги.",
          },
          "game-ideas": {
            title: "Розд. 3 - Ідеї ігор з AI",
            caption: "Canvas обмежень, що перетворює розмитий AI-брейншторм на невеликий бриф прототипу.",
          },
          prototyping: {
            title: "Розд. 4 - Прототипування в Unity",
            caption: "Карта зрізу прототипу: прототипуйте питання, а не продукт.",
          },
          csharp: {
            title: "Розд. 5 - AI для C#-коду",
            caption: "Рев'ю згенерованого C# у контексті реального проєкту і чому ScriptableObjects - вдала обмежена задача.",
          },
          debugging: {
            title: "Розд. 6 - Дебаг з AI",
            caption: "Воронка дебагу на основі доказів: від симптому до відтворення, ізоляції та виправлення.",
          },
          architecture: {
            title: "Розд. 7 - Рефакторинг архітектури",
            caption: "Розділення переповненого менеджера на чіткі відповідальності без вигадування фреймворку.",
          },
          "prompt-library": {
            title: "Розд. 12 - Бібліотека промптів",
            caption: "Повторно використовувані промпти з метою, контекстом, обмеженнями, форматом відповіді та перевіркою.",
          },
          "final-workflow": {
            title: "Розд. 13 - Фінальний workflow",
            caption: "Повний цикл від заскоупленої ідеї до перевіреного білду.",
          },
        },
      },
      contents: {
        heading: "Зміст",
        pageLabel: "с. {page}",
        previewChapterAria: "Переглянути сторінку з розділу {title}",
        chapters: [
          {
            title: "Вступ",
            summary: "Для кого ця книга і як використовувати AI, не втрачаючи контролю над роботою.",
          },
          {
            title: "AI - це не магія",
            summary: "Що AI робить добре, де помиляється і як перевіряти результат, перш ніж йому довіряти.",
          },
          {
            title: "Ідеї ігор з AI",
            summary: "Як перетворити брейншторм на заскоуплені концепти, зручні для прототипування.",
          },
          {
            title: "Прототипування в Unity",
            summary: "AI для першого проходу: greybox, рух, тимчасовий UI та placeholder-дані.",
          },
          {
            title: "AI для C#-коду",
            summary: "Життєвий цикл, серіалізація, ScriptableObjects, async-код і рев'ю продуктивності.",
          },
          {
            title: "Дебаг з AI",
            summary: "Пакети доказів, stack trace та одне виправлення за раз.",
          },
          {
            title: "Рефакторинг архітектури",
            summary: "Рев'ю архітектури та безпечний рефакторинг переповнених скриптів.",
          },
          {
            title: "VR і мобільні workflow",
            summary: "Платформні обмеження, матриці тестування на пристроях і хибні припущення AI.",
          },
          {
            title: "Арт, аудіо та наратив",
            summary: "Креативний напрям, облік ассетів, перевірка ліцензій і консистентність стилю.",
          },
          {
            title: "Production workflow",
            summary: "Брифи фіч, AI-результати, які легко рев'юїти, і документація як частина циклу.",
          },
          {
            title: "Ризики, етика та авторське право",
            summary: "Контрольні точки ризиків для коду, ассетів, приватності, розкриття AI та публікації.",
          },
          {
            title: "Бібліотека промптів",
            summary: "Готові промпти для ідей, сцен, C#, дебагу, рефакторингу, VR і мобільних.",
          },
          {
            title: "Фінальний workflow",
            summary: "Цикл з 11 кроків від ідеї гри до перевіреного білду.",
          },
        ],
        backMatterHeading: "Додатки",
        backMatter: ["Висновок", "Глосарій", "Рекомендовані інструменти", "Джерела та література", "Про автора"],
      },
      process: {
        heading: "Про процес написання",
        intro:
          "Я писав книгу так само, як роблю ігри: невеликими ітераціями, з чесним рев'ю і нічого не випускаючи без перевірки.",
        steps: [
          {
            title: "На основі реальної Unity-роботи",
            description:
              "Теми взяті з щоденної Unity/C# розробки - прототипування, дебагу, рефакторингу, мобільних і VR-релізів, - а не з AI-хайпу.",
          },
          {
            title: "AI як асистент, а не автор",
            description:
              "Я використовував AI для допомоги з дослідженням, альтернативних поглядів, аналізу та редакторського рев'ю. Структура, приклади, формулювання та фінальні рішення - мої.",
          },
          {
            title: "Приклади перевірені як production-код",
            description:
              "C#-приклади та промпти перевірені на типові проблеми життєвого циклу Unity, серіалізації та платформ, а чутливі до часу нотатки про політики позначені для перевірки джерел перед релізом.",
          },
          {
            title: "Окремі редакторські проходи",
            description:
              "Окремі проходи на консистентність, повтори, фактчекінг, читабельність ілюстрацій і верстку, а також human-voice прохід, щоб текст звучав як розмова одного розробника з іншим.",
          },
        ],
      },
      cta: {
        eyebrow: "Цікавить книга?",
        title: "Напишіть мені щодо раннього доступу, фідбеку чи співпраці",
        description:
          "Якщо хочете прочитати preview, поділитися фідбеком або обговорити AI-workflow для вашої Unity-команди - напишіть мені, буду радий.",
        emailButton: "Написати про книгу",
      },
    },
    about: {
      eyebrow: "Про мене",
      title: "Unity-розробка від ідеї до релізу",
      paragraphs: [
        "Я Unity Developer, який створює мобільні ігри, VR/XR та інтерактивні застосунки на C#.",
        "У CREATY я довів два mid-core проєкти з нуля до релізу. Зараз розробляю gameplay, VR-взаємодії, UI та клієнт-серверні інтеграції для outsourced Unity-застосунків, а також самостійно випустив два великі оновлення для The Artman App.",
        "У своєму пет-проєкті Scrap Orbit я будую online co-op на Netcode for GameObjects, спільні тестовані gameplay-правила та автоматизовані тести. Фокусуюся на чистій архітектурі, підтримуваному коді, оптимізації та стабільних релізах.",
      ],
      stats: [
        { value: "2", label: "Mid-core релізи з нуля" },
        { value: "Unity 6 / C#", label: "Основний стек" },
        { value: "Online Co-op", label: "Netcode for GameObjects" },
        { value: "Mobile / VR", label: "Android, iOS, VR/XR" },
      ],
    },
    services: {
      eyebrow: "Що я роблю",
      title: "Чим можу допомогти вашому проєкту",
      description:
        "Повний цикл Unity-розробки для мобільних релізів, multiplayer-ігор, VR/XR-досвіду та наявних кодових баз, яким потрібна стабільність.",
      items: [
        {
          title: "Unity та мобільна розробка",
          description:
            "Розробляю gameplay, UI-флоу, Android/iOS білди, аналітику, монетизацію та production-фічі на Unity/C#.",
        },
        {
          title: "Gameplay-системи",
          description:
            "Створюю physics-driven механіки, state machines, анімації та game feel на основі тестованих gameplay-правил і ScriptableObjects.",
        },
        {
          title: "Multiplayer та online co-op",
          description:
            "Реалізую host-authoritative co-op на Netcode for GameObjects, Lobby/Relay, RPC, синхронізацію стану та prediction/reconciliation.",
        },
        {
          title: "VR/XR та інтерактивні застосунки",
          description:
            "Створюю та полірую просторові взаємодії, VR-gameplay, UI і клієнт-серверні функції для інтерактивного досвіду, перевіреного у headset.",
        },
        {
          title: "SDK та інтеграції",
          description:
            "Інтегрую клієнт-серверні/backend-сервіси, Firebase, AppMetrica, GameAnalytics, AppsFlyer, Adjust, Tenjin, AdMob, Unity Ads, AppLovin та SDK/NDK пакети.",
        },
        {
          title: "Оптимізація та виправлення багів",
          description:
            "Профілюю й оптимізую білди, дебажу production-проблеми, рефакторю крихкі системи та готую стабільні релізи.",
        },
      ],
    },
    skills: {
      eyebrow: "Навички",
      title: "Сфокусований інструментарій для production",
      description:
        "Практичний інструментарій для Unity gameplay, архітектури, multiplayer, платформ, інтеграцій і якісного delivery.",
      groups: [
        {
          title: "Unity та Gameplay",
          description: "Комерційна Unity-розробка gameplay-систем, фізики, анімацій і game feel.",
          tags: ["Unity 6", "C#", "2D/3D", "Фізика", "Spine", "DOTween"],
        },
        {
          title: "Архітектура",
          description: "Модульні підтримувані системи зі спільними solo/co-op gameplay-правилами та зрозумілою структурою.",
          tags: ["SOLID", "Zenject", "Interfaces", "State Machines", "ScriptableObjects"],
        },
        {
          title: "Multiplayer",
          description: "Host-authoritative online co-op із синхронізацією стану та prediction/reconciliation вантажу.",
          tags: ["Netcode for GameObjects", "Lobby/Relay", "RPC", "State Sync"],
        },
        {
          title: "Платформи та рендеринг",
          description: "Мобільні та VR/XR білди, URP-рендеринг, кастомні візуальні ефекти, input та оптимізація.",
          tags: ["Android/iOS", "VR/XR", "URP", "Input System", "Оптимізація"],
        },
        {
          title: "Аналітика та реклама",
          description: "Аналітика, реклама, SDK/NDK пакети та інтеграції клієнт-серверних/backend-сервісів.",
          tags: ["Firebase", "AppMetrica", "GameAnalytics", "AppsFlyer", "Adjust", "Tenjin", "AdMob", "Unity Ads", "AppLovin"],
        },
        {
          title: "Інструменти та якість",
          description: "Автоматизоване тестування, профілювання, дебаг, рефакторинг і контроль версій.",
          tags: ["Rider", "Git", "Unity Test Framework", "EditMode/PlayMode", "Профілювання"],
        },
      ],
    },
    experience: {
      eyebrow: "Досвід",
      title: "Комерційний і фриланс-досвід",
      description:
        "Робота над мобільними іграми на Unity, VR/XR та outsourced-застосунками і повним циклом доставки.",
      items: [
        {
          role: "Unity Developer",
          company: "Mirko Solutions",
          period: "Кві 2026 - дотепер",
          arrangement: "Віддалено · Full-time кві-вер · Part-time із вересня",
          highlights: [
            "Продовжую розробку outsourced Unity-проєктів, зокрема VR/XR та інтерактивних застосунків: Tile Trap, Space Snap Clicker і VR-проєкту під NDA.",
            "Розробляю та підтримую функціональність Unity-застосунків на C#.",
            "Реалізую gameplay-системи, VR-взаємодії та користувацькі інтерфейси.",
            "Працюю з клієнт-серверною функціональністю та інтеграціями проєктів.",
            "Беру участь у дебагу, оптимізації та покращенні коду.",
          ],
        },
        {
          role: "Unity Developer",
          company: "Wayheart Entertainment",
          period: "Сер 2026 - Жов 2026",
          arrangement: "Віддалено · Part-time",
          highlights: [
            "Самостійно розробив і випустив два великі оновлення для Unity-проєкту The Artman App.",
            "Відповідав за розробку, дебаг і оптимізацію на Unity та C#.",
            "Успішно довів проєкт до офіційного релізу.",
          ],
        },
        {
          role: "Unity Developer",
          company: "CREATY",
          period: "Тра 2024 - Кві 2026",
          arrangement: "Луцьк · В офісі · Full-time",
          highlights: [
            "Розробив два mid-core Unity-проєкти з нуля, беручи участь від ранньої стадії розробки до релізу.",
            "Готував Android/iOS білди та інтегрував сторонні сервіси, зокрема AdMob, Unity Ads і Firebase Analytics.",
            "Співпрацював із геймдизайнерами та аналітиками над gameplay-механіками, балансом і реалізацією фіч.",
            "Тісно працював з UI/UX-дизайнерами над реалізацією та поліруванням in-game інтерфейсів.",
            "Інтегрував клієнт-серверні функції та backend-сервіси.",
            "Покращував стабільність клієнта, дебажив production-проблеми та підтримував інтеграції сторонніх SDK.",
          ],
        },
        {
          role: "Unity Developer",
          company: "Bugiko",
          period: "Лис 2023 - Кві 2024",
          arrangement: "Віддалено · Full-time",
          highlights: [
            "Створив великий Unity-прототип із нуля, включно з архітектурою проєкту та вибором технологічного стеку.",
            "Спроєктував масштабовані й підтримувані системи з фокусом на продуктивності та гнучкості.",
            "Брав участь у повному циклі розробки: від технічного планування й архітектури до MVP і подальших ітерацій.",
            "Застосовував принципи SOLID, Clean Architecture та dependency injection (Zenject), щоб кодова база залишалася модульною й підтримуваною.",
            "Досліджував і впроваджував технічні рішення для покращення робочого процесу розробки та масштабованості проєкту.",
          ],
        },
        {
          role: "Unity Developer",
          company: "Freelance",
          period: "Кві 2023 - Жов 2023",
          arrangement: "Віддалено",
          highlights: [
            "Розробляв casual mobile games та інтерактивні Unity-застосунки для різних клієнтів.",
            "Реалізовував gameplay-механіки, UI-системи, анімації, аудіо та інші ігрові фічі.",
            "Дебажив і оптимізував проєкти для Android та iOS пристроїв.",
            "Готував і тестував мобільні білди для різних платформ.",
            "Працював безпосередньо з клієнтами, уточнюючи вимоги та перетворюючи ідеї на робочі ігрові фічі.",
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Проєкти",
      title: "Вибрані Unity-роботи",
      description: "Релізнуті мобільні ігри та інтерактивний room-scale VR-прототип.",
      card: {
        gameplayVideoTitle: "Відео gameplay для {title}",
        previewAlt: "Прев'ю {title}",
        noPreview: "Немає прев'ю",
        gameplayPreview: "Прев'ю gameplay",
        openProject: "Відкрити проєкт",
      },
      items: {
        "pc-creator-3": {
          description:
            "Робота над мобільним tycoon-симулятором PC Creator 3 з фокусом на production Unity-системах, мобільному UI, стабільності білдів, аналітиці, монетизації та релізній Android/iOS-доставці.",
          tags: ["Unity", "C#", "Мобільна розробка", "Android/iOS", "Tycoon"],
        },
        "pc-creator-3-pro": {
          description:
            "Преміальний мобільний simulation-проєкт у серії PC Creator: Unity gameplay, UI-флоу, SDK-інтеграція, мобільна оптимізація та підтримка стабільних store-білдів.",
          tags: ["Unity", "C#", "Мобільна розробка", "Симуляція", "SDK"],
        },
        "pc-creator-2": {
          description:
            "Комерційна Unity-робота над мобільним симулятором із лінійки PC Creator від CREATY: gameplay та UI-системи, підготовка Android/iOS білдів, Firebase-аналітика, SDK монетизації, SDK/NDK пакети та релізна стабільність.",
          tags: ["Unity", "C#", "Android/iOS", "Firebase", "Ads SDK"],
        },
        "the-artman": {
          description:
            "Сюжетний симулятор кінопродюсера в кіберпанковому Голлівуді 2056 року. У Wayheart Entertainment я самостійно розробив і випустив два великі Unity-оновлення: нові фічі, дебаг та оптимізацію, а також довів проєкт до офіційного релізу.",
          tags: ["Unity", "C#", "Android/iOS", "Симуляція", "Live-оновлення"],
        },
        "vr-football-penalty": {
          description:
            "Room-scale VR-досвід футбольного пенальті, де висота, напрямок і кут удару контролюються реальним рухом тіла. Гравець рухається вперед, назад, ліворуч і праворуч навколо м'яча, щоб природно прицілитися перед ударом.",
          tags: ["Unity", "C#", "VR/XR", "Room-scale", "Gameplay"],
        },
      },
    },
    achievements: {
      eyebrow: "Досягнення",
      title: "Досягнення",
      description:
        "Професійні навчальні milestones, пов'язані з game design, production-мисленням і практичною Unity-розробкою.",
      items: {
        "game-designer-certificate": {
          title: "Сертифікат Game Designer",
          description:
            "Завершив практичний курс із game design, що охоплював ігрову документацію, дизайн інтерфейсів, аналіз ринку та базовий gameplay balance.",
          imageAlt: "Сертифікат Game Designer, виданий Besarab Dementiy",
          tags: ["Геймдизайн", "Документація", "UI-дизайн", "Баланс"],
        },
      },
    },
    workflow: {
      eyebrow: "Процес",
      title: "Як я працюю",
      description: "Практичний процес для створення Unity-ігор та інтерактивних продуктів від ідеї до стабільного релізу.",
      steps: [
        {
          step: "01",
          title: "Планую архітектуру та scope",
          description:
            "Уточнюю цілі продукту, платформні обмеження, структуру проєкту та технічний шлях перед розробкою.",
        },
        {
          step: "02",
          title: "Розробляю gameplay та UI",
          description:
            "Реалізую gameplay-логіку, UI, multiplayer і клієнт-серверні функції з читабельним, підтримуваним і тестованим кодом.",
        },
        {
          step: "03",
          title: "Інтегрую SDK та сервіси",
          description:
            "Підключаю backend-сервіси, аналітику, рекламу, SDK/NDK пакети та інші сторонні сервіси за потреби.",
        },
        {
          step: "04",
          title: "Тестую та автоматизую",
          description:
            "Покриваю gameplay-правила EditMode/PlayMode тестами, запускаю автоматизовані co-op сценарії та перевіряю поведінку на мобільних і в headset.",
        },
        {
          step: "05",
          title: "Оптимізую та випускаю",
          description:
            "Профілюю, виправляю edge cases, оптимізую продуктивність і готую стабільні Android/iOS та VR-релізи.",
        },
      ],
    },
    contact: {
      eyebrow: "Контакти",
      title: "Створімо щось корисне, якісне й надійне.",
      description:
        "Маєте мобільну гру, ідею для multiplayer чи co-op, VR/XR-концепт або Unity-проєкт? Буду радий почути деталі.",
      emailMe: "Написати email",
      downloadCv: "Завантажити CV",
      downloadCvAria: "Завантажити CV Dementiy Besarab",
      telegramLabel: "Telegram:",
    },
    footer: {
      builtWith: "Створено на Next.js",
    },
    gamesLab: {
      heading: "Ігрова лабораторія",
      intro: "Колекція Unity-прототипів мобільних ігор та gameplay-концептів.",
      description:
        "Ці прототипи досліджують різні casual-механіки, мобільні UI-флоу, швидку gameplay-ітерацію, puzzle-логіку, аркадний gameplay та експериментальні ідеї, створені в Unity.",
      viewButton: "Переглянути",
      noPreview: "Немає прев'ю",
      noScreenshots: "Для цієї гри скриншоти не знайдено.",
      closeGalleryAria: "Закрити галерею {title}",
      screenshotAlt: "{title}, скриншот {index}",
      gameplayPreviewAlt: "Прев'ю gameplay {title}",
      items: {
        "2048": {
          shortDescription:
            "Класична числова головоломка, побудована на об'єднанні плиток і досягненні максимально можливого рахунку.",
          fullDescription:
            "Класичний мобільний puzzle-прототип у стилі 2048 з фокусом на об'єднанні плиток, прогресії рахунку та простому casual gameplay.",
          genre: "Числова головоломка / Casual",
        },
        "bvda-match-arena": {
          shortDescription:
            "Мінігра з американського футболу з двома режимами: забивання field goals і точні паси партнерам.",
          fullDescription:
            "Мобільний прототип з американського футболу з двома gameplay-режимами: ударом по м'ячу в ціль і точними пасами партнерам по команді.",
          genre: "Спорт / Аркада",
        },
        cyberyolk: {
          shortDescription:
            "Класична головоломка у стилі Minesweeper, переосмислена у яскравому cyber-themed візуальному стилі.",
          fullDescription:
            "Cyber-themed мобільний puzzle-прототип у стилі Minesweeper з фокусом на grid logic, risk-based choices і чистому mobile UI feedback.",
          genre: "Головоломка / Логіка",
        },
        darksummoning: {
          shortDescription:
            "Reaction-based аркада, де гравець ловить лише правильні предмети, щоб набрати більше очок.",
          fullDescription:
            "Швидкий arcade-прототип, у якому гравець має швидко реагувати, збирати лише правильні предмети, уникати помилок і набирати вищий рахунок.",
          genre: "Аркада / Реакція",
        },
        feathermoon: {
          shortDescription: "Класична мобільна Sudoku-головоломка з обмеженою кількістю життів і чистим number-based gameplay.",
          fullDescription:
            "FeatherMoon - класичний мобільний puzzle-прототип у стилі Sudoku. Гравець розв'язує сітку, розміщуючи правильні числа, маючи лише 3 життя для проходження рівня. Гра фокусується на логіці, уважних рішеннях і простій mobile-friendly взаємодії.",
          genre: "Sudoku / Логічна головоломка",
        },
        fistcraft: {
          shortDescription:
            "Fighting-гра з фокусом на правильному виборі атак і блоків для перемоги над суперником. Підтримує двох гравців на одному телефоні.",
          fullDescription:
            "Локальний fighting-прототип, де гравці використовують правильні атаки, блоки й таймінг, щоб перемогти суперника. У гру можуть грати двоє людей на одному телефоні.",
          genre: "Fighting / Local Multiplayer",
        },
        lexpunk: {
          shortDescription: "Memory quiz, у якому гравець запам'ятовує слова й об'єкти, щоб правильно відповідати.",
          fullDescription:
            "Memory-based quiz-прототип з фокусом на запам'ятовуванні слів, об'єктів і візуальних деталей, а потім виборі правильних відповідей.",
          genre: "Quiz / Memory",
        },
        meowtubes: {
          shortDescription:
            "Sorting puzzle, де котів потрібно переміщати між tubes за кольором. Різні кольори не можна змішувати неправильно.",
          fullDescription:
            "Мобільний sorting puzzle-прототип, де гравець переміщує котів між tubes і групує їх за кольором, дотримуючись правил розміщення.",
          genre: "Sorting Puzzle / Casual",
        },
        "queue-dash": {
          shortDescription:
            "Швидка casual-гра, де гравець обирає найшвидшу чергу до каси, щоб фінішувати першим і перемогти.",
          fullDescription:
            "Casual decision-making прототип, де гравець має вибрати найшвидшу чергу, уникати повільних ліній і першим дістатися каси.",
          genre: "Casual / Decision Game",
        },
        "tamagichi-tramp": {
          shortDescription:
            "Virtual pet-style гра, де гравець підтримує его персонажа подарунками та оновленнями офісу.",
          fullDescription:
            "Virtual pet-style прототип, де гравець дарує подарунки, покращує офіс і підтримує високе его персонажа через upgrade-и та взаємодію.",
          genre: "Virtual Pet / Simulation",
        },
        valdrisrun: {
          shortDescription:
            "Vampire runner, де гравець виживає якомога довше, уникає небезпек, збирає монети та перетворюється на кажана для польоту.",
          fullDescription:
            "Горизонтальний runner-прототип про вампіра, який намагається вижити якомога довше. Гравець уникає перешкод, збирає монети й може перетворюватися на кажана, щоб летіти крізь рівень.",
          genre: "Runner / Platformer / Arcade",
        },
      },
    },
  },
}

export type { Translation }
