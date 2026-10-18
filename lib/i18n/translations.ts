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
      role: "Unity & Software Developer | C# | TypeScript | JavaScript | VR/XR",
      subtitle:
        "Software developer with 4+ years of commercial and freelance experience across Unity, mobile games, VR/XR, websites, admin dashboards, and web applications.",
      badges: ["C#", "TypeScript / JavaScript", "Unity 2D/3D", "Web Apps & Dashboards", "VR / XR"],
    },
    hero: {
      status: "Currently available",
      availableFor: "Currently available for:",
      funPortfolio3d: "3D Fun Portfolio",
      availabilityItems: [
        "Software development roles and contracts",
        "Websites, web applications, and admin dashboards",
        "Unity and mobile game development",
        "VR/XR and interactive applications",
        "Project stabilization and bug fixing",
        "UI, service integrations, client-server features, and end-to-end delivery",
      ],
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      downloadCv: "Download CV",
      downloadCvAria: "Download Dementiy Besarab CV",
    },
    about: {
      eyebrow: "About",
      title: "Unity and software development from idea to delivery",
      paragraphs: [
        "I am a Unity and Software Developer with 4+ years of commercial and freelance experience in Unity, C#, mobile games, VR/XR, and interactive applications.",
        "Alongside part-time Unity work, I independently develop websites, web applications, and administrative dashboards with TypeScript, JavaScript, HTML, and CSS, handling UI, project structure, and delivery.",
        "I focus on clean architecture, maintainable code, UI quality, testing, debugging, and end-to-end delivery. AI tools support my analysis and refactoring, while technical decisions and final quality remain my responsibility.",
      ],
      stats: [
        { value: "4+", label: "Years Experience" },
        { value: "C# / TS / JS", label: "Core Languages" },
        { value: "Unity / VR/XR", label: "Interactive Development" },
        { value: "Web Apps", label: "Sites & Admin Dashboards" },
      ],
    },
    services: {
      eyebrow: "What I do",
      title: "What I can do for your project",
      description:
        "End-to-end development for web products, Unity projects, mobile releases, VR/XR experiences, and existing codebases that need stability.",
      items: [
        {
          title: "Websites & web applications",
          description:
            "Build responsive websites and web applications with TypeScript, JavaScript, HTML, and CSS, from structure and UI through final delivery.",
        },
        {
          title: "Administrative dashboards",
          description:
            "Create practical admin interfaces and workflows with clear information architecture, maintainable frontend code, and polished responsive UI.",
        },
        {
          title: "Unity & mobile development",
          description:
            "Develop gameplay systems, UI flows, Android/iOS builds, optimization, testing, analytics, monetization, and production features in Unity/C#.",
        },
        {
          title: "VR/XR & interactive applications",
          description:
            "Build and polish spatial interactions, VR gameplay, UI, and client-server features for headset-tested interactive experiences.",
        },
        {
          title: "Architecture & integrations",
          description:
            "Shape maintainable project structure and integrate services, SDKs, backend interaction, analytics, ads, and client-server functionality.",
        },
        {
          title: "Project stabilization and bug fixing",
          description:
            "Analyze existing codebases, fix bugs, refactor fragile systems, improve performance and maintainability, and prepare stable releases.",
        },
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "A focused, production-ready toolkit",
      description:
        "A practical toolkit spanning web products, Unity systems, VR/XR, architecture, integrations, and delivery quality.",
      groups: [
        {
          title: "Languages & Web",
          description: "Responsive websites, web applications, and administrative dashboards with maintainable frontend code.",
          tags: ["C#", "TypeScript", "JavaScript", "HTML5", "CSS3", "Markdown"],
        },
        {
          title: "Unity & Mobile",
          description: "Commercial Unity development across gameplay systems, production features, and mobile releases.",
          tags: ["Unity 2D/3D", "C#", "Android", "iOS", "Optimization"],
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
          title: "Architecture & Backend",
          description: "Maintainable systems, service integrations, backend interaction, and clear project structure.",
          tags: ["SOLID", "Zenject", "ASP.NET", "Client-Server", "SDK Integrations"],
        },
        {
          title: "SDKs & Monetization",
          description: "Analytics, ads, SDK/NDK packages, backend interaction, and client-server feature support.",
          tags: ["Firebase", "Game Analytics", "AppMetrica", "AdMob", "AppLovin"],
        },
        {
          title: "Tools & Quality",
          description:
            "Testing, debugging, refactoring, code review, source control, and responsible AI-assisted development.",
          tags: ["Git", "Codex", "Claude Code", "ChatGPT", "Testing", "Code Review"],
        },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Commercial and freelance experience",
      description:
        "A track record across web products, Unity mobile games, VR/XR applications, and full-cycle delivery.",
      items: [
        {
          role: "Freelance Developer",
          company: "Self-employed",
          period: "2026 - Present",
          arrangement: "Remote",
          highlights: [
            "Develop websites, web applications, and administrative dashboards using TypeScript, JavaScript, HTML, and CSS; handle UI implementation, project structure, and delivery.",
            "Work on independent and client projects, including Math-Veb, an educational platform with an admin panel, and AUTOCOREx, a website with an admin panel.",
          ],
        },
        {
          role: "Unity Developer",
          company: "Mirko Solutions",
          period: "Apr 2026 - Present",
          arrangement: "Remote · Full-time Apr-Sep · Part-time since Oct",
          highlights: [
            "Work on outsourced Unity VR/XR and interactive applications, including an NDA-protected VR project.",
            "Develop gameplay, VR interactions, UI, and client-server features.",
          ],
        },
        {
          role: "Unity Developer",
          company: "CREATY",
          period: "May 2024 - Apr 2026",
          arrangement: "Lutsk",
          highlights: [
            "Developed two mid-core Unity projects from scratch through release, covering gameplay systems, UI, and Android/iOS build preparation.",
            "Integrated monetization, analytics, and third-party services and collaborated with design and product teams.",
          ],
        },
        {
          role: "Unity Developer",
          company: "Bugiko",
          period: "Nov 2023 - Apr 2024",
          arrangement: "Remote",
          highlights: [
            "Built a large-scale Unity prototype from scratch, selecting the architecture and technology stack while improving performance, scalability, and maintainability.",
          ],
        },
        {
          role: "Unity Developer",
          company: "Freelance",
          period: "Apr 2023 - Oct 2023",
          arrangement: "Remote",
          highlights: [
            "Developed casual mobile games and interactive Unity applications, including gameplay, UI, animations, audio, testing, and direct client communication.",
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Projects",
      title: "Selected Unity work",
      description:
        "Released mobile games and an interactive room-scale VR prototype, complementing the web work listed in my recent experience.",
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
      description: "A practical process for taking web, Unity, and interactive products from idea to stable delivery.",
      steps: [
        {
          step: "01",
          title: "Plan architecture and scope",
          description: "Clarify product goals, platform constraints, project structure, and the technical path before building.",
        },
        {
          step: "02",
          title: "Build the product",
          description:
            "Implement responsive UI, application or gameplay logic, services, and client-server features with readable, maintainable code.",
        },
        {
          step: "03",
          title: "Integrate SDKs and services",
          description:
            "Connect APIs, backend functionality, analytics, ads, SDK/NDK packages, and other third-party services as needed.",
        },
        {
          step: "04",
          title: "Test, optimize, and stabilize",
          description: "Fix edge cases, verify responsive, mobile, or headset behavior, optimize performance, and prepare stable releases.",
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
      title: "Let's build something useful, polished, and reliable.",
      description:
        "Have a website, web application, admin dashboard, mobile game, VR/XR concept, or Unity project? I'd love to hear about it.",
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
        { label: "Досвід", href: "#experience" },
        { label: "Проєкти", href: "#projects" },
        { label: "Досягнення", href: "#achievements" },
        { label: "Процес", href: "#workflow" },
        { label: "Контакти", href: "#contact" },
      ],
      contact: "Зв'язатися",
    },
    profile: {
      role: "Unity & Software Developer | C# | TypeScript | JavaScript | VR/XR",
      subtitle:
        "Software Developer із понад 4 роками комерційного та фриланс-досвіду в Unity, мобільних іграх, VR/XR, вебсайтах, адмінпанелях і вебзастосунках.",
      badges: ["C#", "TypeScript / JavaScript", "Unity 2D/3D", "Вебзастосунки й адмінпанелі", "VR / XR"],
    },
    hero: {
      status: "Відкритий до пропозицій",
      availableFor: "Відкритий до:",
      funPortfolio3d: "3D Fun Portfolio",
      availabilityItems: [
        "Ролі та контракти в software development",
        "Вебсайти, вебзастосунки та адмінпанелі",
        "Unity-розробка та мобільні ігри",
        "VR/XR та інтерактивні застосунки",
        "Стабілізація проєктів і виправлення багів",
        "UI, інтеграції сервісів, клієнт-серверні функції та повний цикл розробки",
      ],
      viewProjects: "Переглянути проєкти",
      contactMe: "Зв'язатися",
      downloadCv: "Завантажити CV",
      downloadCvAria: "Завантажити CV Dementiy Besarab",
    },
    about: {
      eyebrow: "Про мене",
      title: "Unity та software development від ідеї до релізу",
      paragraphs: [
        "Я Unity та Software Developer із понад 4 роками комерційного й фриланс-досвіду в Unity, C#, мобільних іграх, VR/XR та інтерактивних застосунках.",
        "Паралельно з part-time роботою в Unity я самостійно розробляю вебсайти, вебзастосунки й адміністративні панелі на TypeScript, JavaScript, HTML і CSS, відповідаючи за UI, структуру проєкту та delivery.",
        "Фокусуюся на чистій архітектурі, підтримуваному коді, якості UI, тестуванні, дебагу та повному циклі доставки. AI-інструменти допомагають з аналізом і рефакторингом, а технічні рішення та фінальна якість залишаються моєю відповідальністю.",
      ],
      stats: [
        { value: "4+", label: "Роки досвіду" },
        { value: "C# / TS / JS", label: "Основні мови" },
        { value: "Unity / VR/XR", label: "Інтерактивна розробка" },
        { value: "Web Apps", label: "Сайти й адмінпанелі" },
      ],
    },
    services: {
      eyebrow: "Що я роблю",
      title: "Чим можу допомогти вашому проєкту",
      description:
        "Повний цикл розробки для вебпродуктів, Unity-проєктів, мобільних релізів, VR/XR-досвіду та наявних кодових баз, яким потрібна стабільність.",
      items: [
        {
          title: "Вебсайти та вебзастосунки",
          description:
            "Створюю адаптивні вебсайти й вебзастосунки на TypeScript, JavaScript, HTML і CSS: від структури та UI до фінальної доставки.",
        },
        {
          title: "Адміністративні панелі",
          description:
            "Розробляю практичні admin-інтерфейси й робочі процеси зі зрозумілою інформаційною архітектурою, підтримуваним frontend-кодом і якісним адаптивним UI.",
        },
        {
          title: "Unity та мобільна розробка",
          description:
            "Розробляю gameplay-системи, UI-флоу, Android/iOS білди, оптимізацію, тестування, аналітику, монетизацію та production-фічі на Unity/C#.",
        },
        {
          title: "VR/XR та інтерактивні застосунки",
          description:
            "Створюю та полірую просторові взаємодії, VR-gameplay, UI і клієнт-серверні функції для інтерактивного досвіду, перевіреного у headset.",
        },
        {
          title: "Архітектура та інтеграції",
          description:
            "Проєктую підтримувану структуру та інтегрую сервіси, SDK, backend-взаємодію, аналітику, рекламу й клієнт-серверну функціональність.",
        },
        {
          title: "Стабілізація проєктів і виправлення багів",
          description:
            "Аналізую наявні кодові бази, виправляю баги, рефакторю крихкі системи, покращую продуктивність і підтримуваність та готую стабільні релізи.",
        },
      ],
    },
    skills: {
      eyebrow: "Навички",
      title: "Сфокусований інструментарій для production",
      description:
        "Практичний інструментарій для вебпродуктів, Unity-систем, VR/XR, архітектури, інтеграцій і якісного delivery.",
      groups: [
        {
          title: "Мови та Web",
          description: "Адаптивні вебсайти, вебзастосунки й адміністративні панелі з підтримуваним frontend-кодом.",
          tags: ["C#", "TypeScript", "JavaScript", "HTML5", "CSS3", "Markdown"],
        },
        {
          title: "Unity та мобільна розробка",
          description: "Комерційна Unity-розробка gameplay-систем, production-фіч і мобільних релізів.",
          tags: ["Unity 2D/3D", "C#", "Android", "iOS", "Оптимізація"],
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
          title: "Архітектура та Backend",
          description:
            "Підтримувані системи, інтеграції сервісів, backend-взаємодія та зрозуміла структура проєкту.",
          tags: ["SOLID", "Zenject", "ASP.NET", "Client-Server", "SDK Integrations"],
        },
        {
          title: "SDK та монетизація",
          description: "Аналітика, реклама, SDK/NDK пакети, backend-взаємодія та підтримка клієнт-серверних функцій.",
          tags: ["Firebase", "Game Analytics", "AppMetrica", "AdMob", "AppLovin"],
        },
        {
          title: "Інструменти та якість",
          description:
            "Тестування, дебаг, рефакторинг, code review, контроль версій і відповідальна AI-assisted розробка.",
          tags: ["Git", "Codex", "Claude Code", "ChatGPT", "Тестування", "Code Review"],
        },
      ],
    },
    experience: {
      eyebrow: "Досвід",
      title: "Комерційний і фриланс-досвід",
      description:
        "Робота над вебпродуктами, мобільними іграми на Unity, VR/XR-застосунками та повним циклом доставки.",
      items: [
        {
          role: "Freelance Developer",
          company: "Self-employed",
          period: "2026 - дотепер",
          arrangement: "Віддалено",
          highlights: [
            "Розробляю вебсайти, вебзастосунки та адміністративні панелі на TypeScript, JavaScript, HTML і CSS; відповідаю за UI, структуру проєкту та delivery.",
            "Працюю над власними й клієнтськими проєктами, зокрема Math-Veb - освітньою платформою з адмінпанеллю - та AUTOCOREx - сайтом з адмінпанеллю.",
          ],
        },
        {
          role: "Unity Developer",
          company: "Mirko Solutions",
          period: "Кві 2026 - дотепер",
          arrangement: "Віддалено · Full-time кві-вер · Part-time із жовтня",
          highlights: [
            "Працюю над outsourced Unity VR/XR та інтерактивними застосунками, зокрема VR-проєктом під NDA.",
            "Розробляю gameplay, VR-взаємодії, UI та клієнт-серверні функції.",
          ],
        },
        {
          role: "Unity Developer",
          company: "CREATY",
          period: "Тра 2024 - Кві 2026",
          arrangement: "Луцьк",
          highlights: [
            "Розробив два mid-core Unity-проєкти з нуля до релізу, охопивши gameplay-системи, UI та підготовку Android/iOS білдів.",
            "Інтегрував монетизацію, аналітику й сторонні сервіси та співпрацював із design і product-командами.",
          ],
        },
        {
          role: "Unity Developer",
          company: "Bugiko",
          period: "Лис 2023 - Кві 2024",
          arrangement: "Віддалено",
          highlights: [
            "Створив великий Unity-прототип із нуля, обрав архітектуру й технологічний стек та покращив продуктивність, масштабованість і підтримуваність.",
          ],
        },
        {
          role: "Unity Developer",
          company: "Freelance",
          period: "Кві 2023 - Жов 2023",
          arrangement: "Віддалено",
          highlights: [
            "Розробляв casual mobile games та інтерактивні Unity-застосунки: gameplay, UI, анімації, аудіо, тестування й пряма комунікація з клієнтами.",
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Проєкти",
      title: "Вибрані Unity-роботи",
      description:
        "Релізнуті мобільні ігри та інтерактивний room-scale VR-прототип, які доповнюють веброботи з розділу досвіду.",
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
      description: "Практичний процес для створення веб-, Unity та інтерактивних продуктів від ідеї до стабільного релізу.",
      steps: [
        {
          step: "01",
          title: "Планую архітектуру та scope",
          description:
            "Уточнюю цілі продукту, платформні обмеження, структуру проєкту та технічний шлях перед розробкою.",
        },
        {
          step: "02",
          title: "Розробляю продукт",
          description:
            "Реалізую адаптивний UI, прикладну або gameplay-логіку, сервіси й клієнт-серверні функції з читабельним і підтримуваним кодом.",
        },
        {
          step: "03",
          title: "Інтегрую SDK та сервіси",
          description:
            "Підключаю API, backend-функціональність, аналітику, рекламу, SDK/NDK пакети та інші сторонні сервіси за потреби.",
        },
        {
          step: "04",
          title: "Тестую, оптимізую та стабілізую",
          description:
            "Виправляю edge cases, перевіряю responsive, mobile або headset behavior, оптимізую продуктивність і готую стабільні релізи.",
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
      title: "Створімо щось корисне, якісне й надійне.",
      description:
        "Маєте вебсайт, вебзастосунок, адмінпанель, мобільну гру, VR/XR-концепт або Unity-проєкт? Буду радий почути деталі.",
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
