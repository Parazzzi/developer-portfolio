import type { AchievementContent, AchievementId, ProjectContent, ProjectId } from "@/lib/portfolio-data"
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
    availabilityItems: string[]
    viewProjects: string
    contactMe: string
    downloadCv: string
    downloadCvAria: string
  }
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
        { label: "About", href: "#about" },
        { label: "What I Do", href: "#services" },
        { label: "Skills", href: "#skills" },
        { label: "Projects", href: "#projects" },
        { label: "Achievements", href: "#achievements" },
        { label: "Workflow", href: "#workflow" },
        { label: "Contact", href: "#contact" },
      ],
      contact: "Contact Me",
    },
    profile: {
      role: "Unity Developer | C# | Mobile Games | VR/XR",
      subtitle:
        "Unity Developer with 3+ years of commercial and freelance experience building mobile games, VR/XR projects, and interactive Unity applications from prototype to release.",
      badges: ["Unity 2D/3D", "C#", "Android / iOS", "VR / XR", "AI-assisted Development"],
    },
    hero: {
      status: "Currently available",
      availableFor: "Currently available for:",
      availabilityItems: [
        "Full-time Unity Developer roles",
        "Part-time / contract Unity work",
        "Mobile game development",
        "VR/XR prototypes",
        "Project stabilization and bug fixing",
        "Gameplay systems, UI, SDK integrations, optimization, and build preparation",
      ],
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      downloadCv: "Download CV",
      downloadCvAria: "Download Dementiy Besarab CV",
    },
    about: {
      eyebrow: "About",
      title: "Unity development from prototype to release",
      paragraphs: [
        "I am a Unity Developer with 3+ years of commercial and freelance experience building mobile games, VR/XR projects, and interactive applications with Unity and C#.",
        "My work covers gameplay systems, UI implementation, Android/iOS build preparation, optimization, SDK integrations, analytics, monetization, client-server features, and stable production delivery.",
        "I use AI tools like Codex, Claude Code, and ChatGPT for analysis, debugging, refactoring, and architecture validation while keeping ownership of technical decisions and final code quality.",
      ],
      stats: [
        { value: "3+", label: "Years Experience" },
        { value: "Android / iOS", label: "Mobile Builds" },
        { value: "VR / XR", label: "Interactive Projects" },
        { value: "CREATY Games", label: "Recent Studio Role" },
      ],
    },
    services: {
      eyebrow: "What I do",
      title: "What I can do for your project",
      description:
        "Focused Unity support for prototypes, production features, mobile releases, VR/XR work, and existing projects that need stability.",
      items: [
        {
          title: "Gameplay systems",
          description:
            "Build and maintain core gameplay mechanics, game states, player interactions, progression systems, and feature logic in Unity/C#.",
        },
        {
          title: "Mobile game development",
          description:
            "Work on Android/iOS Unity projects, UI flows, performance, build preparation, testing, and release-focused stability.",
        },
        {
          title: "VR/XR prototypes",
          description:
            "Create and polish VR/XR interactions, spatial gameplay, Meta Quest prototypes, and headset-tested gameplay experiences.",
        },
        {
          title: "UI, animation, and game feel",
          description:
            "Implement responsive UIs, polished transitions, DOTween animations, clear feedback, and smooth player-facing flows.",
        },
        {
          title: "SDKs, analytics, and monetization",
          description:
            "Integrate Firebase, analytics, ads, SDK/NDK packages, monetization tools, and client-server features.",
        },
        {
          title: "Project stabilization and bug fixing",
          description:
            "Analyze existing Unity projects, fix bugs, clean up fragile systems, improve structure, optimize performance, and prepare stable builds.",
        },
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "A focused, production-ready toolkit",
      description:
        "Grouped by what I actually ship - from Unity systems to UI, integrations, optimization, and AI-assisted workflows.",
      groups: [
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
          description:
            "Using AI tools for codebase analysis, debugging, refactoring, routine code, and architecture validation.",
          tags: ["Codex", "Claude Code", "ChatGPT", "Architecture Review"],
        },
      ],
    },
    projects: {
      eyebrow: "Projects",
      title: "Selected work",
      description: "Selected Unity games across PC Creator mobile tycoon projects and room-scale VR football gameplay.",
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
      description: "A repeatable process that keeps quality high from first idea to polished build.",
      steps: [
        {
          step: "01",
          title: "Plan architecture and scope",
          description: "Clarify gameplay goals, platform constraints, project structure, and the technical path before building.",
        },
        {
          step: "02",
          title: "Build Unity gameplay systems",
          description:
            "Implement gameplay, UI, services, saves, events, and game states with readable C# and maintainable boundaries.",
        },
        {
          step: "03",
          title: "Integrate SDKs and services",
          description:
            "Connect analytics, ads, SDK/NDK packages, monetization, backend interaction, and client-server features.",
        },
        {
          step: "04",
          title: "Test, optimize, and stabilize",
          description: "Profile performance, fix edge cases, verify mobile or headset behavior, and prepare stable builds.",
        },
        {
          step: "05",
          title: "Use AI as a technical teammate",
          description:
            "Speed up analysis, debugging, refactoring, and architecture validation while keeping final ownership of decisions.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's build something playable, polished, and actually fun.",
      description:
        "Have a mobile game, VR/XR concept, or Unity project that needs a reliable developer? I'd love to hear about it.",
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
        { label: "Про мене", href: "#about" },
        { label: "Що я роблю", href: "#services" },
        { label: "Навички", href: "#skills" },
        { label: "Проєкти", href: "#projects" },
        { label: "Досягнення", href: "#achievements" },
        { label: "Процес", href: "#workflow" },
        { label: "Контакти", href: "#contact" },
      ],
      contact: "Зв'язатися",
    },
    profile: {
      role: "Unity Developer | C# | Мобільні ігри | VR/XR",
      subtitle:
        "Unity Developer із понад 3 роками комерційного та фриланс-досвіду у створенні мобільних ігор, VR/XR-проєктів та інтерактивних Unity-застосунків від прототипу до релізу.",
      badges: ["Unity 2D/3D", "C#", "Android / iOS", "VR / XR", "AI-assisted розробка"],
    },
    hero: {
      status: "Відкритий до пропозицій",
      availableFor: "Відкритий до:",
      availabilityItems: [
        "Full-time ролі Unity Developer",
        "Part-time / контрактна робота з Unity",
        "Розробка мобільних ігор",
        "VR/XR прототипи",
        "Стабілізація проєктів і виправлення багів",
        "Gameplay-системи, UI, SDK-інтеграції, оптимізація та підготовка білдів",
      ],
      viewProjects: "Переглянути проєкти",
      contactMe: "Зв'язатися",
      downloadCv: "Завантажити CV",
      downloadCvAria: "Завантажити CV Dementiy Besarab",
    },
    about: {
      eyebrow: "Про мене",
      title: "Unity-розробка від прототипу до релізу",
      paragraphs: [
        "Я Unity Developer із понад 3 роками комерційного та фриланс-досвіду у створенні мобільних ігор, VR/XR-проєктів та інтерактивних застосунків на Unity і C#.",
        "Моя робота охоплює gameplay-системи, реалізацію UI, підготовку Android/iOS білдів, оптимізацію, SDK-інтеграції, аналітику, монетизацію, клієнт-серверні функції та стабільну production-доставку.",
        "Я використовую AI-інструменти, зокрема Codex, Claude Code і ChatGPT, для аналізу, дебагу, рефакторингу та перевірки архітектури, зберігаючи відповідальність за технічні рішення й фінальну якість коду.",
      ],
      stats: [
        { value: "3+", label: "Роки досвіду" },
        { value: "Android / iOS", label: "Мобільні білди" },
        { value: "VR / XR", label: "Інтерактивні проєкти" },
        { value: "CREATY Games", label: "Остання студійна роль" },
      ],
    },
    services: {
      eyebrow: "Що я роблю",
      title: "Чим можу допомогти вашому проєкту",
      description:
        "Сфокусована Unity-підтримка для прототипів, production-фіч, мобільних релізів, VR/XR-робіт і наявних проєктів, яким потрібна стабільність.",
      items: [
        {
          title: "Gameplay-системи",
          description:
            "Створюю та підтримую основні gameplay-механіки, ігрові стани, взаємодію гравця, системи прогресу та feature-логіку на Unity/C#.",
        },
        {
          title: "Розробка мобільних ігор",
          description:
            "Працюю з Android/iOS Unity-проєктами, UI-флоу, продуктивністю, підготовкою білдів, тестуванням і стабільністю перед релізом.",
        },
        {
          title: "VR/XR прототипи",
          description:
            "Створюю й полірую VR/XR-взаємодії, просторовий gameplay, Meta Quest прототипи та gameplay-досвід, перевірений у headset.",
        },
        {
          title: "UI, анімація та game feel",
          description:
            "Реалізую адаптивні UI, відполіровані переходи, DOTween-анімації, зрозумілий feedback і плавні player-facing флоу.",
        },
        {
          title: "SDK, аналітика та монетизація",
          description:
            "Інтегрую Firebase, аналітику, рекламу, SDK/NDK пакети, інструменти монетизації та клієнт-серверні функції.",
        },
        {
          title: "Стабілізація проєктів і виправлення багів",
          description:
            "Аналізую наявні Unity-проєкти, виправляю баги, приводжу крихкі системи до ладу, покращую структуру, оптимізую продуктивність і готую стабільні білди.",
        },
      ],
    },
    skills: {
      eyebrow: "Навички",
      title: "Сфокусований інструментарій для production",
      description:
        "Згруповано за тим, що я реально доводжу до релізу: Unity-системи, UI, інтеграції, оптимізація та AI-assisted workflows.",
      groups: [
        {
          title: "Unity 2D/3D & C#",
          description: "Комерційна Unity-розробка gameplay-систем, прототипів і production-фіч.",
          tags: ["Unity", "C#", "2D/3D", "Git"],
        },
        {
          title: "Мобільні білди",
          description: "Підготовка Android та iOS білдів, тестування, оптимізація і стабільність перед релізом.",
          tags: ["Android", "iOS", "Оптимізація", "Тестування ігор"],
        },
        {
          title: "VR/XR розробка",
          description: "Просторова взаємодія, тестування у headset, розміщення об'єктів, комфорт і природна поведінка гравця.",
          tags: ["VR/XR", "Meta Quest", "Spatial UX"],
        },
        {
          title: "UI, анімація та game feel",
          description: "Адаптивний UI, відполіровані переходи, анімації, sound hooks і зрозумілий feedback для гравця.",
          tags: ["UGUI", "DOTween", "Spine", "UI/UX"],
        },
        {
          title: "Архітектура та сервіси",
          description:
            "Підтримувані системи на базі SOLID-принципів, dependency injection і зрозумілої структури проєкту.",
          tags: ["SOLID", "Zenject", "Рефакторинг", "Рев'ю коду"],
        },
        {
          title: "SDK та монетизація",
          description: "Аналітика, реклама, SDK/NDK пакети, backend-взаємодія та підтримка клієнт-серверних функцій.",
          tags: ["Firebase", "Game Analytics", "AppMetrica", "AdMob", "AppLovin"],
        },
        {
          title: "AI-assisted розробка",
          description:
            "Використання AI-інструментів для аналізу кодової бази, дебагу, рефакторингу, routine-коду та перевірки архітектури.",
          tags: ["Codex", "Claude Code", "ChatGPT", "Архітектурне рев'ю"],
        },
      ],
    },
    projects: {
      eyebrow: "Проєкти",
      title: "Вибрані роботи",
      description:
        "Вибрані Unity-проєкти: мобільні tycoon-ігри PC Creator та room-scale VR football gameplay.",
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
      description: "Повторюваний процес, який допомагає тримати якість високою від першої ідеї до polished build.",
      steps: [
        {
          step: "01",
          title: "Планую архітектуру та scope",
          description:
            "Уточнюю gameplay-цілі, платформні обмеження, структуру проєкту та технічний шлях перед розробкою.",
        },
        {
          step: "02",
          title: "Будую Unity gameplay-системи",
          description:
            "Реалізую gameplay, UI, сервіси, saves, events і game states з читабельним C# та підтримуваними межами відповідальності.",
        },
        {
          step: "03",
          title: "Інтегрую SDK та сервіси",
          description:
            "Підключаю аналітику, рекламу, SDK/NDK пакети, монетизацію, backend-взаємодію та клієнт-серверні функції.",
        },
        {
          step: "04",
          title: "Тестую, оптимізую та стабілізую",
          description:
            "Профілюю продуктивність, виправляю edge cases, перевіряю mobile або headset behavior і готую стабільні білди.",
        },
        {
          step: "05",
          title: "Використовую AI як технічного teammate",
          description:
            "Прискорюю аналіз, дебаг, рефакторинг і перевірку архітектури, залишаючи фінальну відповідальність за рішення за собою.",
        },
      ],
    },
    contact: {
      eyebrow: "Контакти",
      title: "Створімо щось іграбельне, відполіроване й справді захопливе.",
      description:
        "Маєте мобільну гру, VR/XR-концепт або Unity-проєкт, якому потрібен надійний розробник? Буду радий почути деталі.",
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
