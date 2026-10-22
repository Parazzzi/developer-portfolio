import type {
  AchievementContent,
  AchievementId,
  PetProjectContent,
  ProjectContent,
  ProjectId,
} from "@/lib/portfolio-data"
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
            "Integrate client-server/backend services, Firebase, AppMetrica, GameAnalytics, AdMob, Unity Ads, AppLovin, and SDK/NDK packages.",
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
          tags: ["Firebase", "AppMetrica", "GameAnalytics", "AdMob", "Unity Ads", "AppLovin"],
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
            "Develop gameplay, VR interactions, UI, and client-server integrations for outsourced Unity apps, including Tile Trap, Space Snap Clicker, and an NDA-protected VR project.",
            "Debug and optimize features.",
          ],
        },
        {
          role: "Unity Developer",
          company: "Wayheart Entertainment",
          period: "Aug 2026 - Oct 2026",
          arrangement: "Remote · Part-time",
          highlights: [
            "Independently delivered two major updates for The Artman App using Unity and C#, handling development, debugging, and optimization through its official release.",
          ],
        },
        {
          role: "Unity Developer",
          company: "CREATY",
          period: "May 2024 - Apr 2026",
          arrangement: "Lutsk",
          highlights: [
            "Developed two mid-core Unity projects from scratch through release; implemented gameplay and polished in-game UI with game designers, analysts, and UI/UX designers.",
            "Prepared Android/iOS builds; integrated client-server/backend services, AdMob, Unity Ads, and Firebase Analytics; debugged production issues and maintained SDK integrations.",
          ],
        },
        {
          role: "Unity Developer",
          company: "Bugiko",
          period: "Nov 2023 - Apr 2024",
          arrangement: "Remote",
          highlights: [
            "Built a large-scale Unity prototype from architecture and stack selection to MVP. Applied SOLID, Clean Architecture, and Zenject DI to create modular systems focused on performance and scalability.",
          ],
        },
        {
          role: "Unity Developer",
          company: "Freelance",
          period: "Apr 2023 - Oct 2023",
          arrangement: "Remote",
          highlights: [
            "Built casual mobile games and interactive Unity apps: gameplay, UI, animation, and audio. Optimized and tested Android/iOS builds and clarified requirements directly with clients.",
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
            "Інтегрую клієнт-серверні/backend-сервіси, Firebase, AppMetrica, GameAnalytics, AdMob, Unity Ads, AppLovin та SDK/NDK пакети.",
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
          tags: ["Firebase", "AppMetrica", "GameAnalytics", "AdMob", "Unity Ads", "AppLovin"],
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
            "Розробляю gameplay, VR-взаємодії, UI та клієнт-серверні інтеграції для outsourced Unity-застосунків, зокрема Tile Trap, Space Snap Clicker і VR-проєкту під NDA.",
            "Дебажу та оптимізую фічі.",
          ],
        },
        {
          role: "Unity Developer",
          company: "Wayheart Entertainment",
          period: "Сер 2026 - Жов 2026",
          arrangement: "Віддалено · Part-time",
          highlights: [
            "Самостійно реалізував два великі оновлення для The Artman App на Unity та C#, відповідаючи за розробку, дебаг і оптимізацію аж до офіційного релізу.",
          ],
        },
        {
          role: "Unity Developer",
          company: "CREATY",
          period: "Тра 2024 - Кві 2026",
          arrangement: "Луцьк",
          highlights: [
            "Розробив два mid-core Unity-проєкти з нуля до релізу; реалізовував gameplay та полірував in-game UI разом із геймдизайнерами, аналітиками та UI/UX-дизайнерами.",
            "Готував Android/iOS білди; інтегрував клієнт-серверні/backend-сервіси, AdMob, Unity Ads і Firebase Analytics; дебажив production-проблеми та підтримував SDK-інтеграції.",
          ],
        },
        {
          role: "Unity Developer",
          company: "Bugiko",
          period: "Лис 2023 - Кві 2024",
          arrangement: "Віддалено",
          highlights: [
            "Створив великий Unity-прототип від вибору архітектури й стеку до MVP. Застосував SOLID, Clean Architecture та Zenject DI для модульних систем із фокусом на продуктивності й масштабованості.",
          ],
        },
        {
          role: "Unity Developer",
          company: "Freelance",
          period: "Кві 2023 - Жов 2023",
          arrangement: "Віддалено",
          highlights: [
            "Створював casual mobile games та інтерактивні Unity-застосунки: gameplay, UI, анімації та аудіо. Оптимізував і тестував Android/iOS білди та уточнював вимоги безпосередньо з клієнтами.",
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
