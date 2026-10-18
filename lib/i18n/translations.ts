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

type CaseStudy = {
  eyebrow: string
  title: string
  subtitle: string
  mediaLabel: string
  mediaAlt: string
  platformLabel: string
  roleLabel: string
  responsibilitiesLabel: string
  challengesLabel: string
  contributionLabel: string
  technologiesLabel: string
  projectsLabel: string
  storeLinksLabel: string
  platforms: string
  role: string
  responsibilities: string[]
  challenges: string[]
  contribution: string
  technologies: string[]
}

type FlowNode = {
  label: string
  description: string
}

type ToolkitCategory = {
  title: string
  description: string
  technologies: string[]
}

type Translation = {
  languageSwitcher: {
    ariaLabel: string
  }
  nav: {
    items: NavItem[]
    contact: string
    downloadCv: string
    downloadCvAria: string
    availability: string
    openMenuAria: string
    closeMenuAria: string
  }
  common: {
    email: string
    linkedin: string
    telegram: string
    externalLinkAria: string
    playMedia: string
    selected: string
  }
  profile: {
    role: string
    compactRole: string
    subtitle: string
    availability: string
    badges: string[]
  }
  hero: {
    eyebrow: string
    headline: string
    subtitle: string
    primaryCta: string
    contactCta: string
    downloadCv: string
    socialLabel: string
    mediaTitle: string
    mediaSubtitle: string
    mediaAlt: string
    portfolio3d: string
    stats: Stat[]
  }
  work: {
    eyebrow: string
    title: string
    description: string
    pc: CaseStudy
    vr: CaseStudy
  }
  projects: {
    card: {
      gameplayVideoTitle: string
      previewAlt: string
      noPreview: string
      gameplayPreview: string
      openProject: string
    }
    items: Record<ProjectId, ProjectContent>
  }
  gamesLab: {
    eyebrow: string
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
  underHood: {
    eyebrow: string
    title: string
    description: string
    flowLabel: string
    flow: FlowNode[]
    topicsLabel: string
    topics: ToolkitCategory[]
    codeLabel: string
    codeTitle: string
    codeLines: string[]
  }
  toolkit: {
    eyebrow: string
    title: string
    description: string
    categories: ToolkitCategory[]
  }
  about: {
    eyebrow: string
    title: string
    paragraphs: string[]
    stats: Stat[]
    availabilityLabel: string
    availabilityItems: string[]
    aiNote: string
    certificate: {
      label: string
      title: string
      description: string
      imageAlt: string
    }
  }
  achievements: {
    eyebrow: string
    title: string
    description: string
    items: Record<AchievementId, AchievementContent>
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
}

export const translations: Record<Language, Translation> = {
  en: {
    languageSwitcher: {
      ariaLabel: "Switch language",
    },
    nav: {
      items: [
        { label: "Work", href: "#work" },
        { label: "Games Lab", href: "#games-lab" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
      ],
      contact: "Contact",
      downloadCv: "CV",
      downloadCvAria: "Download Dementiy Besarab CV",
      availability: "Available",
      openMenuAria: "Open navigation menu",
      closeMenuAria: "Close navigation menu",
    },
    common: {
      email: "Email",
      linkedin: "LinkedIn",
      telegram: "Telegram",
      externalLinkAria: "Open {label} in a new tab",
      playMedia: "Play media",
      selected: "Selected",
    },
    profile: {
      role: "Unity & Software Developer",
      compactRole: "C# / TypeScript / JavaScript / VR-XR",
      subtitle:
        "Software developer working across Unity, C#, mobile games, VR/XR, TypeScript, JavaScript, websites, admin dashboards and web applications.",
      availability: "Open to Unity and software development opportunities.",
      badges: ["Unity & C#", "TypeScript", "Web applications", "VR/XR", "Clean architecture"],
    },
    hero: {
      eyebrow: "Playable Developer Portfolio",
      headline: "I build interactive products from idea to delivery.",
      subtitle:
        "Unity & Software Developer focused on maintainable code, polished UI and end-to-end delivery across games, VR/XR and web applications.",
      primaryCta: "View selected work",
      contactCta: "Start a conversation",
      downloadCv: "Download CV",
      socialLabel: "Contact channels",
      mediaTitle: "Commercial mobile + room-scale VR",
      mediaSubtitle: "Gameplay media from shipped and prototype Unity work.",
      mediaAlt: "Cinematic gameplay composition with VR football and mobile game previews",
      portfolio3d: "3D Fun Portfolio",
      stats: [
        { value: "4+", label: "Years commercial and freelance development" },
        { value: "Android / iOS", label: "Mobile build and release support" },
        { value: "VR / XR", label: "Spatial interaction prototypes" },
      ],
    },
    work: {
      eyebrow: "Selected Commercial Work",
      title: "Production Unity work, presented as systems instead of thumbnails.",
      description:
        "The strongest commercial experience is grouped into focused case studies: mobile tycoon production work and a spatial VR football mechanic.",
      pc: {
        eyebrow: "Commercial mobile case study",
        title: "PC Creator Series",
        subtitle:
          "Commercial Unity mobile simulator work across PC Creator 2, PC Creator 3 and PC Creator 3 Pro, focused on production systems, mobile UI, integrations and stable store builds.",
        mediaLabel: "Mobile production reel",
        mediaAlt: "PC Creator Series project covers",
        platformLabel: "Platforms",
        roleLabel: "Role",
        responsibilitiesLabel: "Responsibilities",
        challengesLabel: "Production challenges",
        contributionLabel: "Contribution",
        technologiesLabel: "Technologies",
        projectsLabel: "Individual releases",
        storeLinksLabel: "Store links",
        platforms: "Android / iOS",
        role: "Unity C# Developer, commercial mobile game production",
        responsibilities: [
          "Gameplay systems and feature logic",
          "Production UI flows and player-facing feedback",
          "Firebase, analytics, monetization and SDK/NDK integrations",
          "Android and iOS build preparation, debugging and maintenance",
        ],
        challenges: [
          "Keeping mobile UI, integrations and gameplay systems stable across store builds",
          "Supporting commercial production needs without adding unnecessary complexity",
          "Debugging, optimization and release-focused maintenance",
        ],
        contribution:
          "Helped turn PC Creator work into release-ready Unity mobile products by supporting gameplay, UI, integrations, stability and build delivery.",
        technologies: ["Unity", "C#", "Android", "iOS", "Firebase", "Game Analytics", "AdMob", "AppLovin"],
      },
      vr: {
        eyebrow: "VR/XR case study",
        title: "VR Football Penalty",
        subtitle:
          "A room-scale VR football penalty prototype where shot height, direction and angle are controlled by real body movement around the ball.",
        mediaLabel: "Room-scale interaction",
        mediaAlt: "VR Football Penalty gameplay preview in a stadium",
        platformLabel: "Platform",
        roleLabel: "Core mechanic",
        responsibilitiesLabel: "Interaction work",
        challengesLabel: "Challenges solved",
        contributionLabel: "Technical contribution",
        technologiesLabel: "Technologies",
        projectsLabel: "Gameplay focus",
        storeLinksLabel: "Links",
        platforms: "VR / XR, headset-tested interaction",
        role: "Natural penalty aiming through player position and body movement",
        responsibilities: [
          "Spatial player movement around the ball",
          "Shot direction, height and angle control",
          "Room-scale gameplay feel and readable player feedback",
          "VR-focused testing and iteration",
        ],
        challenges: [
          "Making the mechanic understandable without flat-screen UI",
          "Keeping aiming physical, readable and comfortable",
          "Balancing responsive movement with stable interaction logic",
        ],
        contribution:
          "Built the core VR interaction loop so the player can aim naturally by stepping forward, backward, left and right before taking the penalty.",
        technologies: ["Unity", "C#", "VR/XR", "Room-scale", "Gameplay"],
      },
    },
    projects: {
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
          tags: ["Unity", "C#", "VR/XR", "Room-scale", "Gameplay"],
        },
      },
    },
    gamesLab: {
      eyebrow: "Games Lab",
      heading: "Prototype shelf, not a template grid.",
      intro: "Unity mobile prototypes, solo experiments and gameplay concepts.",
      description:
        "These smaller projects explore casual mechanics, mobile UI flows, puzzle logic, arcade feel, fast iteration and experimental Unity gameplay.",
      viewButton: "Open gallery",
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
    underHood: {
      eyebrow: "Under the Hood",
      title: "Gameplay is only half the work. The other half is keeping systems understandable.",
      description:
        "This section visualizes the production architecture skills already present in the portfolio: services, events, UI, saves, analytics, optimization and VR interaction loops.",
      flowLabel: "Unity feature flow",
      flow: [
        { label: "Input", description: "Touch, controller, headset movement, player intent" },
        { label: "Gameplay Systems", description: "Mechanics, states, progression, interaction rules" },
        { label: "Events / State", description: "Clear boundaries between feature logic and presentation" },
        { label: "UI / Audio / Saves / Analytics", description: "Feedback, persistence, integrations and release data" },
      ],
      topicsLabel: "Production topics",
      topics: [
        {
          title: "Modular gameplay",
          description: "Feature logic separated enough to debug, tune and ship without rewriting unrelated systems.",
          technologies: ["C#", "SOLID", "State machines", "Events"],
        },
        {
          title: "Services and SDKs",
          description: "Firebase, analytics, ads and backend-facing packages connected with release stability in mind.",
          technologies: ["Firebase", "Game Analytics", "AppMetrica", "AdMob", "AppLovin"],
        },
        {
          title: "Mobile and VR constraints",
          description: "Interaction and performance choices shaped by mobile devices, store builds and headset comfort.",
          technologies: ["Android", "iOS", "VR/XR", "Optimization"],
        },
      ],
      codeLabel: "Small pattern",
      codeTitle: "Event-driven UI update",
      codeLines: [
        "public void Construct(IWallet wallet, IAnalytics analytics)",
        "{",
        "    wallet.Changed += RefreshBalance;",
        "    analytics.Track(\"shop_opened\");",
        "}",
      ],
    },
    toolkit: {
      eyebrow: "Experience and Toolkit",
      title: "A compact toolbelt for Unity and software development.",
      description: "Select a category to see the working context instead of scanning another wall of badges.",
      categories: [
        {
          title: "Unity and C#",
          description: "Commercial Unity development across gameplay systems, prototypes and production features.",
          technologies: ["Unity", "C#", "2D/3D", "Git"],
        },
        {
          title: "Mobile",
          description: "Android and iOS build preparation, testing, optimization and release-focused stability.",
          technologies: ["Android", "iOS", "Performance", "Game testing"],
        },
        {
          title: "VR/XR",
          description: "Spatial interaction, headset-tested behavior, object placement and natural player movement.",
          technologies: ["VR/XR", "Meta Quest", "Room-scale", "Spatial UX"],
        },
        {
          title: "Gameplay",
          description: "Mechanics, game states, progression systems, player feedback and fast iteration loops.",
          technologies: ["Gameplay systems", "State machines", "Events", "Balancing"],
        },
        {
          title: "UI",
          description: "Responsive Unity UI, transitions, animation hooks and clear player-facing flows.",
          technologies: ["UGUI", "DOTween", "Spine", "UI/UX"],
        },
        {
          title: "Architecture",
          description: "Maintainable systems using clear boundaries, dependency injection and pragmatic refactoring.",
          technologies: ["SOLID", "Zenject", "Services", "Code review"],
        },
        {
          title: "SDKs and Services",
          description: "Analytics, ads, SDK/NDK packages, monetization tools and client-server feature support.",
          technologies: ["Firebase", "Game Analytics", "AppMetrica", "AdMob", "AppLovin"],
        },
        {
          title: "Web Development",
          description: "Responsive websites, web applications and administrative dashboards delivered from structure and UI through final implementation.",
          technologies: ["TypeScript", "JavaScript", "HTML5", "CSS3", "Responsive UI"],
        },
      ],
    },
    about: {
      eyebrow: "About",
      title: "A software developer who can move from idea to release.",
      paragraphs: [
        "I am a software developer with 4+ years of commercial and freelance experience across Unity, C#, mobile games, VR/XR, interactive applications and web development.",
        "Alongside part-time Unity work, I independently develop websites, admin dashboards and web applications with TypeScript, JavaScript and HTML/CSS.",
        "I focus on clean architecture, maintainable code, polished UI and dependable end-to-end delivery.",
      ],
      stats: [
        { value: "4+", label: "Years experience" },
        { value: "Android / iOS", label: "Mobile releases" },
        { value: "VR / XR", label: "Interactive projects" },
        { value: "Web", label: "Apps and dashboards" },
      ],
      availabilityLabel: "Available for",
      availabilityItems: [
        "Unity and software developer roles",
        "Part-time or contract development",
        "Web applications and admin dashboards",
        "Mobile game production",
        "VR/XR prototypes",
      ],
      aiNote:
        "AI tools support codebase analysis, testing, debugging, refactoring and code review while architecture, technical decisions and final quality remain developer-owned.",
      certificate: {
        label: "Game design learning",
        title: "Game Designer Certificate",
        description:
          "Completed a practical game design course covering game documentation, interface design, market analysis and basic gameplay balance.",
        imageAlt: "Game Designer certificate awarded to Besarab Dementiy",
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
    contact: {
      eyebrow: "Contact",
      title: "Let's build something worth playing.",
      description:
        "Have a web product, mobile game, VR/XR concept or Unity project that needs production-minded execution? Send the context and I will respond with the most useful next step.",
      emailMe: "Email me",
      downloadCv: "Download CV",
      downloadCvAria: "Download Dementiy Besarab CV",
      telegramLabel: "Telegram:",
    },
    footer: {
      builtWith: "Built with Next.js",
    },
  },
  ua: {
    languageSwitcher: {
      ariaLabel: "Перемкнути мову",
    },
    nav: {
      items: [
        { label: "Роботи", href: "#work" },
        { label: "Games Lab", href: "#games-lab" },
        { label: "Про мене", href: "#about" },
        { label: "Контакти", href: "#contact" },
      ],
      contact: "Контакти",
      downloadCv: "CV",
      downloadCvAria: "Завантажити CV Dementiy Besarab",
      availability: "Доступний",
      openMenuAria: "Відкрити меню навігації",
      closeMenuAria: "Закрити меню навігації",
    },
    common: {
      email: "Email",
      linkedin: "LinkedIn",
      telegram: "Telegram",
      externalLinkAria: "Відкрити {label} у новій вкладці",
      playMedia: "Відтворити медіа",
      selected: "Вибрано",
    },
    profile: {
      role: "Unity & Software Developer",
      compactRole: "C# / TypeScript / JavaScript / VR-XR",
      subtitle:
        "Software developer, який працює з Unity, C#, mobile games, VR/XR, TypeScript, JavaScript, сайтами, admin dashboards і web applications.",
      availability: "Відкритий до можливостей у Unity та software development.",
      badges: ["Unity & C#", "TypeScript", "Web applications", "VR/XR", "Clean architecture"],
    },
    hero: {
      eyebrow: "Playable Developer Portfolio",
      headline: "Я створюю інтерактивні продукти від ідеї до delivery.",
      subtitle:
        "Unity & Software Developer із фокусом на maintainable code, якісний UI та end-to-end delivery для ігор, VR/XR і web applications.",
      primaryCta: "Переглянути роботи",
      contactCta: "Обговорити проєкт",
      downloadCv: "Завантажити CV",
      socialLabel: "Канали зв'язку",
      mediaTitle: "Комерційний mobile + room-scale VR",
      mediaSubtitle: "Gameplay-медіа з релізних і прототипних Unity-проєктів.",
      mediaAlt: "Кінематографічна композиція з VR-футболом і прев'ю мобільних ігор",
      portfolio3d: "3D Fun Portfolio",
      stats: [
        { value: "4+", label: "Роки комерційної та freelance розробки" },
        { value: "Android / iOS", label: "Підтримка mobile build та release" },
        { value: "VR / XR", label: "Прототипи просторової взаємодії" },
      ],
    },
    work: {
      eyebrow: "Вибрані комерційні роботи",
      title: "Production Unity-досвід, поданий як системи, а не набір карток.",
      description:
        "Найсильніший комерційний досвід згруповано в case studies: mobile tycoon production та spatial VR football mechanic.",
      pc: {
        eyebrow: "Комерційний mobile case study",
        title: "PC Creator Series",
        subtitle:
          "Комерційна Unity-робота над мобільними симуляторами PC Creator 2, PC Creator 3 і PC Creator 3 Pro з фокусом на production systems, mobile UI, інтеграції та стабільні store builds.",
        mediaLabel: "Mobile production reel",
        mediaAlt: "Обкладинки проєктів PC Creator Series",
        platformLabel: "Платформи",
        roleLabel: "Роль",
        responsibilitiesLabel: "Зони відповідальності",
        challengesLabel: "Production-виклики",
        contributionLabel: "Внесок",
        technologiesLabel: "Технології",
        projectsLabel: "Окремі релізи",
        storeLinksLabel: "Store links",
        platforms: "Android / iOS",
        role: "Unity C# Developer, commercial mobile game production",
        responsibilities: [
          "Gameplay-системи та feature logic",
          "Production UI flows і player-facing feedback",
          "Firebase, analytics, monetization та SDK/NDK інтеграції",
          "Підготовка Android/iOS builds, debugging і maintenance",
        ],
        challenges: [
          "Підтримувати стабільність mobile UI, integrations і gameplay systems у store builds",
          "Закривати production-потреби без зайвої складності в системах",
          "Debugging, optimization і release-focused maintenance",
        ],
        contribution:
          "Допомагав доводити PC Creator work до release-ready Unity mobile products через gameplay, UI, integrations, stability та build delivery.",
        technologies: ["Unity", "C#", "Android", "iOS", "Firebase", "Game Analytics", "AdMob", "AppLovin"],
      },
      vr: {
        eyebrow: "VR/XR case study",
        title: "VR Football Penalty",
        subtitle:
          "Room-scale VR prototype футбольного пенальті, де висота, напрямок і кут удару контролюються реальним рухом тіла навколо м'яча.",
        mediaLabel: "Room-scale interaction",
        mediaAlt: "Gameplay preview VR Football Penalty на стадіоні",
        platformLabel: "Платформа",
        roleLabel: "Core mechanic",
        responsibilitiesLabel: "Interaction work",
        challengesLabel: "Вирішені виклики",
        contributionLabel: "Технічний внесок",
        technologiesLabel: "Технології",
        projectsLabel: "Gameplay focus",
        storeLinksLabel: "Links",
        platforms: "VR / XR, headset-tested interaction",
        role: "Natural penalty aiming через позицію гравця і рух тіла",
        responsibilities: [
          "Просторовий рух гравця навколо м'яча",
          "Контроль direction, height та angle удару",
          "Room-scale gameplay feel і зрозумілий player feedback",
          "VR-focused testing та ітерації",
        ],
        challenges: [
          "Зробити механіку зрозумілою без flat-screen UI",
          "Зберегти прицілювання фізичним, читабельним і комфортним",
          "Поєднати responsive movement зі стабільною interaction logic",
        ],
        contribution:
          "Побудував core VR interaction loop, щоб гравець міг природно прицілюватися, рухаючись вперед, назад, ліворуч і праворуч перед ударом.",
        technologies: ["Unity", "C#", "VR/XR", "Room-scale", "Gameplay"],
      },
    },
    projects: {
      card: {
        gameplayVideoTitle: "{title} gameplay video",
        previewAlt: "Прев'ю {title}",
        noPreview: "Немає прев'ю",
        gameplayPreview: "Gameplay preview",
        openProject: "Відкрити проєкт",
      },
      items: {
        "pc-creator-3": {
          description:
            "Робота над mobile tycoon simulator PC Creator 3 з фокусом на production Unity systems, mobile UI, build stability, analytics, monetization та release-ready Android/iOS delivery.",
          tags: ["Unity", "C#", "Mobile", "Android/iOS", "Tycoon"],
        },
        "pc-creator-3-pro": {
          description:
            "Premium mobile simulation project у PC Creator series: Unity gameplay, UI flow, SDK integration, mobile optimization і stable store build support.",
          tags: ["Unity", "C#", "Mobile", "Simulation", "SDKs"],
        },
        "pc-creator-2": {
          description:
            "Комерційна Unity-робота над mobile simulator із лінійки PC Creator від CREATY: gameplay та UI systems, Android/iOS build preparation, Firebase analytics, monetization SDKs, SDK/NDK packages і release stability.",
          tags: ["Unity", "C#", "Android/iOS", "Firebase", "Ads SDKs"],
        },
        "vr-football-penalty": {
          description:
            "Room-scale VR football penalty experience, де height, direction і angle удару керуються реальним рухом тіла. Гравець рухається вперед, назад, ліворуч і праворуч навколо м'яча, щоб природно прицілитися перед ударом.",
          tags: ["Unity", "C#", "VR/XR", "Room-scale", "Gameplay"],
        },
      },
    },
    gamesLab: {
      eyebrow: "Games Lab",
      heading: "Полиця прототипів, а не шаблонна grid-секція.",
      intro: "Unity mobile prototypes, solo experiments і gameplay concepts.",
      description:
        "Менші проєкти досліджують casual mechanics, mobile UI flows, puzzle logic, arcade feel, швидку ітерацію та experimental Unity gameplay.",
      viewButton: "Відкрити галерею",
      noPreview: "Немає прев'ю",
      noScreenshots: "Для цієї гри скриншоти не знайдено.",
      closeGalleryAria: "Закрити галерею {title}",
      screenshotAlt: "{title}, скриншот {index}",
      gameplayPreviewAlt: "Gameplay preview {title}",
      items: {
        "2048": {
          shortDescription:
            "Класична числова головоломка, побудована на об'єднанні плиток і досягненні максимального рахунку.",
          fullDescription:
            "Класичний mobile puzzle prototype у стилі 2048 з фокусом на tile merging, score progression і простий casual gameplay.",
          genre: "Number Puzzle / Casual",
        },
        "bvda-match-arena": {
          shortDescription:
            "Мінігра з американського футболу з двома режимами: field goals і точні паси партнерам.",
          fullDescription:
            "Mobile American football prototype із двома gameplay modes: ударом по м'ячу в ціль і точними пасами партнерам по команді.",
          genre: "Sports / Arcade",
        },
        cyberyolk: {
          shortDescription: "Класична Minesweeper-style головоломка, переосмислена в яскравому cyber-themed стилі.",
          fullDescription:
            "Cyber-themed mobile puzzle prototype у стилі Minesweeper з фокусом на grid logic, risk-based choices і clean mobile UI feedback.",
          genre: "Puzzle / Logic",
        },
        darksummoning: {
          shortDescription:
            "Reaction-based arcade, де гравець ловить лише правильні предмети, щоб набрати більше очок.",
          fullDescription:
            "Швидкий arcade prototype, у якому гравець має швидко реагувати, збирати правильні предмети, уникати помилок і набирати вищий рахунок.",
          genre: "Arcade / Reaction",
        },
        feathermoon: {
          shortDescription: "Класична mobile Sudoku puzzle з обмеженою кількістю життів і clean number-based gameplay.",
          fullDescription:
            "FeatherMoon - класичний mobile puzzle prototype у стилі Sudoku. Гравець розв'язує сітку, розміщуючи правильні числа, маючи лише 3 життя для проходження рівня. Гра фокусується на логіці, уважних рішеннях і простій mobile-friendly взаємодії.",
          genre: "Sudoku / Logic Puzzle",
        },
        fistcraft: {
          shortDescription:
            "Fighting game про правильний вибір attacks і blocks для перемоги. Підтримує двох гравців на одному телефоні.",
          fullDescription:
            "Local fighting prototype, де гравці використовують правильні attacks, blocks і timing, щоб перемогти суперника. У гру можуть грати двоє людей на одному телефоні.",
          genre: "Fighting / Local Multiplayer",
        },
        lexpunk: {
          shortDescription: "Memory quiz, у якому гравець запам'ятовує слова й об'єкти, щоб відповідати правильно.",
          fullDescription:
            "Memory-based quiz prototype з фокусом на запам'ятовуванні слів, об'єктів і visual details, а потім виборі правильних відповідей.",
          genre: "Quiz / Memory",
        },
        meowtubes: {
          shortDescription:
            "Sorting puzzle, де котів потрібно переміщати між tubes за кольором. Різні кольори не можна змішувати неправильно.",
          fullDescription:
            "Mobile sorting puzzle prototype, де гравець переміщує котів між tubes і групує їх за кольором, дотримуючись правил розміщення.",
          genre: "Sorting Puzzle / Casual",
        },
        "queue-dash": {
          shortDescription:
            "Швидка casual game, де гравець обирає найшвидшу чергу до каси, щоб фінішувати першим.",
          fullDescription:
            "Casual decision-making prototype, де гравець має вибрати найшвидшу чергу, уникати повільних ліній і першим дістатися каси.",
          genre: "Casual / Decision Game",
        },
        "tamagichi-tramp": {
          shortDescription:
            "Virtual pet-style game, де гравець підтримує его персонажа подарунками та оновленнями офісу.",
          fullDescription:
            "Virtual pet-style prototype, де гравець дарує подарунки, покращує офіс і підтримує високе его персонажа через upgrades та interaction.",
          genre: "Virtual Pet / Simulation",
        },
        valdrisrun: {
          shortDescription:
            "Vampire runner, де гравець виживає якомога довше, уникає небезпек, збирає монети та перетворюється на кажана.",
          fullDescription:
            "Horizontal runner prototype про вампіра, який намагається вижити якомога довше. Гравець уникає obstacles, збирає coins і може перетворюватися на кажана, щоб летіти крізь level.",
          genre: "Runner / Platformer / Arcade",
        },
      },
    },
    underHood: {
      eyebrow: "Under the Hood",
      title: "Gameplay - це лише половина роботи. Друга половина - тримати системи зрозумілими.",
      description:
        "Ця секція показує production architecture skills, які вже є в портфоліо: services, events, UI, saves, analytics, optimization і VR interaction loops.",
      flowLabel: "Unity feature flow",
      flow: [
        { label: "Input", description: "Touch, controller, headset movement, player intent" },
        { label: "Gameplay Systems", description: "Mechanics, states, progression, interaction rules" },
        { label: "Events / State", description: "Чіткі межі між feature logic і presentation" },
        { label: "UI / Audio / Saves / Analytics", description: "Feedback, persistence, integrations і release data" },
      ],
      topicsLabel: "Production topics",
      topics: [
        {
          title: "Modular gameplay",
          description: "Feature logic відокремлена достатньо, щоб її було легко debug, tune і ship без переписування суміжних систем.",
          technologies: ["C#", "SOLID", "State machines", "Events"],
        },
        {
          title: "Services and SDKs",
          description: "Firebase, analytics, ads і backend-facing packages підключаються з фокусом на release stability.",
          technologies: ["Firebase", "Game Analytics", "AppMetrica", "AdMob", "AppLovin"],
        },
        {
          title: "Mobile and VR constraints",
          description: "Interaction та performance choices враховують mobile devices, store builds і headset comfort.",
          technologies: ["Android", "iOS", "VR/XR", "Optimization"],
        },
      ],
      codeLabel: "Small pattern",
      codeTitle: "Event-driven UI update",
      codeLines: [
        "public void Construct(IWallet wallet, IAnalytics analytics)",
        "{",
        "    wallet.Changed += RefreshBalance;",
        "    analytics.Track(\"shop_opened\");",
        "}",
      ],
    },
    toolkit: {
      eyebrow: "Experience and Toolkit",
      title: "Компактний toolbelt для Unity та software development.",
      description: "Оберіть категорію, щоб побачити робочий контекст замість ще однієї стіни badges.",
      categories: [
        {
          title: "Unity and C#",
          description: "Комерційна Unity-розробка: gameplay systems, prototypes і production features.",
          technologies: ["Unity", "C#", "2D/3D", "Git"],
        },
        {
          title: "Mobile",
          description: "Android/iOS build preparation, testing, optimization і release-focused stability.",
          technologies: ["Android", "iOS", "Performance", "Game testing"],
        },
        {
          title: "VR/XR",
          description: "Spatial interaction, headset-tested behavior, object placement і natural player movement.",
          technologies: ["VR/XR", "Meta Quest", "Room-scale", "Spatial UX"],
        },
        {
          title: "Gameplay",
          description: "Mechanics, game states, progression systems, player feedback і fast iteration loops.",
          technologies: ["Gameplay systems", "State machines", "Events", "Balancing"],
        },
        {
          title: "UI",
          description: "Responsive Unity UI, transitions, animation hooks і clear player-facing flows.",
          technologies: ["UGUI", "DOTween", "Spine", "UI/UX"],
        },
        {
          title: "Architecture",
          description: "Maintainable systems із clear boundaries, dependency injection і pragmatic refactoring.",
          technologies: ["SOLID", "Zenject", "Services", "Code review"],
        },
        {
          title: "SDKs and Services",
          description: "Analytics, ads, SDK/NDK packages, monetization tools і client-server feature support.",
          technologies: ["Firebase", "Game Analytics", "AppMetrica", "AdMob", "AppLovin"],
        },
        {
          title: "Web Development",
          description: "Responsive websites, web applications та administrative dashboards — від структури й UI до фінальної реалізації.",
          technologies: ["TypeScript", "JavaScript", "HTML5", "CSS3", "Responsive UI"],
        },
      ],
    },
    about: {
      eyebrow: "Про мене",
      title: "Software developer, який може провести ідею до релізу.",
      paragraphs: [
        "Я software developer із понад 4 роками комерційного та freelance досвіду в Unity, C#, mobile games, VR/XR, interactive applications і web development.",
        "Паралельно з part-time Unity-роботою я самостійно розробляю сайти, admin dashboards і web applications на TypeScript, JavaScript та HTML/CSS.",
        "Я фокусуюся на clean architecture, maintainable code, якісному UI та надійному end-to-end delivery.",
      ],
      stats: [
        { value: "4+", label: "Роки досвіду" },
        { value: "Android / iOS", label: "Mobile releases" },
        { value: "VR / XR", label: "Interactive projects" },
        { value: "Web", label: "Apps і dashboards" },
      ],
      availabilityLabel: "Доступний для",
      availabilityItems: [
        "Unity та software developer roles",
        "Part-time або contract development",
        "Web applications та admin dashboards",
        "Mobile game production",
        "VR/XR prototypes",
      ],
      aiNote:
        "AI tools допомагають із codebase analysis, testing, debugging, refactoring і code review; архітектура, технічні рішення та фінальна якість залишаються відповідальністю розробника.",
      certificate: {
        label: "Game design learning",
        title: "Game Designer Certificate",
        description:
          "Завершив практичний курс із game design: game documentation, interface design, market analysis і basic gameplay balance.",
        imageAlt: "Сертифікат Game Designer, виданий Besarab Dementiy",
      },
    },
    achievements: {
      eyebrow: "Досягнення",
      title: "Досягнення",
      description:
        "Професійні навчальні milestones, пов'язані з game design, production-мисленням і практичною Unity-розробкою.",
      items: {
        "game-designer-certificate": {
          title: "Game Designer Certificate",
          description:
            "Завершив практичний курс із game design, що охоплював game documentation, interface design, market analysis і basic gameplay balance.",
          imageAlt: "Сертифікат Game Designer, виданий Besarab Dementiy",
          tags: ["Game Design", "Documentation", "UI Design", "Balance"],
        },
      },
    },
    contact: {
      eyebrow: "Контакти",
      title: "Створімо щось, у що хочеться грати.",
      description:
        "Маєте web product, mobile game, VR/XR concept або Unity project, якому потрібне production-minded виконання? Надішліть контекст, і я відповім із найкориснішим наступним кроком.",
      emailMe: "Написати email",
      downloadCv: "Завантажити CV",
      downloadCvAria: "Завантажити CV Dementiy Besarab",
      telegramLabel: "Telegram:",
    },
    footer: {
      builtWith: "Built with Next.js",
    },
  },
}

export type { Translation }
