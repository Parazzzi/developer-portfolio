export const book = {
  title: "AI in Game Dev",
  author: "Dementiy Besarab",
  cover: "/book/ai-in-game-dev-cover.webp",
  coverWidth: 1086,
  coverHeight: 1448,
  totalPages: 142,
  inquirySubject: "AI in Game Dev - book inquiry",
}

export const bookPreviewPages = [
  { id: "author-note", page: 4 },
  { id: "contents", page: 5 },
  { id: "introduction", page: 6 },
  { id: "game-ideas", page: 20 },
  { id: "prototyping", page: 29 },
  { id: "csharp", page: 45 },
  { id: "debugging", page: 52 },
  { id: "architecture", page: 64 },
  { id: "prompt-library", page: 115 },
  { id: "final-workflow", page: 124 },
] as const

export type BookPreviewPageId = (typeof bookPreviewPages)[number]["id"]

export function bookPreviewImage(page: number, variant: "full" | "thumb" = "full") {
  const fileName = `page-${String(page).padStart(3, "0")}`
  return `/book/preview/${fileName}${variant === "thumb" ? "-thumb" : ""}.jpg`
}

// Chapter start pages in the preview PDF; previewPage links a chapter to its page in the interactive preview.
export const bookChapters = [
  { number: 1, page: 6, previewPage: 6 },
  { number: 2, page: 12, previewPage: null },
  { number: 3, page: 20, previewPage: 20 },
  { number: 4, page: 28, previewPage: 29 },
  { number: 5, page: 40, previewPage: 45 },
  { number: 6, page: 51, previewPage: 52 },
  { number: 7, page: 64, previewPage: 64 },
  { number: 8, page: 75, previewPage: null },
  { number: 9, page: 83, previewPage: null },
  { number: 10, page: 90, previewPage: null },
  { number: 11, page: 97, previewPage: null },
  { number: 12, page: 115, previewPage: 115 },
  { number: 13, page: 124, previewPage: 124 },
] as const

export type BookContent = {
  eyebrow: string
  title: string
  description: string
  status: string
  statusNote: string
  subtitle: string
  paragraphs: string[]
  stats: {
    value: string
    label: string
  }[]
  focusAreas: {
    title: string
    description: string
  }[]
  coverAlt: string
  previewButton: string
  inquiryButton: string
  preview: {
    heading: string
    description: string
    pageLabel: string
    openPageAria: string
    pageAlt: string
    previousPage: string
    nextPage: string
    closePreview: string
    counter: string
    scrollHint: string
    pages: Record<BookPreviewPageId, { title: string; caption: string }>
  }
  contents: {
    heading: string
    pageLabel: string
    previewChapterAria: string
    chapters: { title: string; summary: string }[]
    backMatterHeading: string
    backMatter: string[]
  }
  process: {
    heading: string
    intro: string
    steps: {
      title: string
      description: string
    }[]
  }
  cta: {
    eyebrow: string
    title: string
    description: string
    emailButton: string
  }
}
