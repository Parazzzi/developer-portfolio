export const profile = {
  name: "Dementiy Besarab",
  email: "besarabdementij1@gmail.com",
  telegramHandle: "@besarabd",
  links: {
    email: "mailto:besarabdementij1@gmail.com",
    linkedin: "https://www.linkedin.com/in/dementiy-besarab-6aa77a2a4/",
    telegram: "https://t.me/besarabd",
    cv: "/Dementiy_Besarab_Unity_CV.pdf",
    funPortfolio3d: "https://3-d-portfolio-3d.vercel.app/",
  },
}

export const petProject = {
  id: "scrap-orbit",
  title: "Scrap Orbit",
  youtubeEmbedUrl:
    "https://www.youtube.com/embed/9tbIO3_r9dU?autoplay=1&mute=1&loop=1&playlist=9tbIO3_r9dU&controls=1&playsinline=1",
  link: "https://parazzzi.itch.io/scrap-orbit",
}

export type PetProjectContent = {
  eyebrow: string
  title: string
  description: string
  status: string
  playButton: string
  highlights: {
    title: string
    description: string
  }[]
  tags: string[]
}

export type ProjectStatic = {
  id: string
  title: string
  video?: string
  youtubeEmbedUrl?: string
  poster?: string
  link?: string
  primaryLinkLabel?: string
  secondaryLink?: {
    label: string
    url: string
  }
}

export const projectItems = [
  {
    id: "pc-creator-3",
    title: "PC Creator 3",
    youtubeEmbedUrl:
      "https://www.youtube.com/embed/RmIpoEtc81U?autoplay=1&mute=1&loop=1&playlist=RmIpoEtc81U&controls=1&playsinline=1",
    poster: "/pc-creator-pro.png",
    link: "https://play.google.com/store/apps/details?id=com.creatyglobal.pccreator3&hl=ru",
    primaryLinkLabel: "Play Market",
    secondaryLink: {
      label: "App Store",
      url: "https://apps.apple.com/ua/app/pc-creator-3-tycoon-sim-game/id6740996086",
    },
  },
  {
    id: "pc-creator-3-pro",
    title: "PC Creator 3 Pro",
    poster: "/pc-creator-pro.png",
    link: "https://play.google.com/store/apps/details?id=com.creatyglobal.pccreatorthreepro&hl=ru",
    primaryLinkLabel: "Play Market",
    secondaryLink: {
      label: "App Store",
      url: "https://apps.apple.com/ua/app/pc-creator-3-pro-build-grow/id6740993180",
    },
  },
  {
    id: "pc-creator-2",
    title: "PC Creator 2",
    youtubeEmbedUrl:
      "https://www.youtube.com/embed/ahYLM1eCZ88?autoplay=1&mute=1&loop=1&playlist=ahYLM1eCZ88&controls=1&playsinline=1",
    poster: "/pc-creator-2.png",
    link: "https://play.google.com/store/apps/details?id=com.ultraandre.pccreator2",
    primaryLinkLabel: "Play Market",
    secondaryLink: {
      label: "App Store",
      url: "https://apps.apple.com/ru/app/pc-creator-2-computer-tycoon/id1604170642",
    },
  },
  {
    id: "the-artman",
    title: "The Artman",
    youtubeEmbedUrl:
      "https://www.youtube.com/embed/soU1MSZJS0k?autoplay=1&mute=1&loop=1&playlist=soU1MSZJS0k&controls=1&playsinline=1",
    link: "https://play.google.com/store/apps/details?id=com.WayHeartGame.Artman",
    primaryLinkLabel: "Play Market",
    secondaryLink: {
      label: "App Store",
      url: "https://apps.apple.com/us/app/the-artman/id6450551283",
    },
  },
  {
    id: "vr-football-penalty",
    title: "VR Football Penalty",
    video: "/vr-football-penalty.mp4",
    poster: "/vr-football-penalty-poster.png",
  },
] as const satisfies readonly ProjectStatic[]

export type ProjectId = (typeof projectItems)[number]["id"]

export type ProjectContent = {
  description: string
  tags: string[]
}

export type Project = ProjectStatic & ProjectContent

export type AchievementStatic = {
  id: string
  image: string
  meta: string
}

export const achievementItems = [
  {
    id: "game-designer-certificate",
    image: "/game-designer-certificate.png",
    meta: "SHEPIT Courses / 2025",
  },
] as const satisfies readonly AchievementStatic[]

export type AchievementId = (typeof achievementItems)[number]["id"]

export type AchievementContent = {
  title: string
  description: string
  imageAlt: string
  tags: string[]
}
