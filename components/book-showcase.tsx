"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type TouchEvent,
} from "react"
import Image from "next/image"
import { ArrowDown, ChevronDown, ChevronLeft, ChevronRight, Eye, EyeOff, Mail, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LinkedinIcon } from "@/components/brand-icons"
import { SectionHeading } from "@/components/section-heading"
import { book, bookChapters, bookPreviewImage, bookPreviewPages } from "@/lib/book-data"
import { profile } from "@/lib/portfolio-data"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/language-context"
import { formatMessage } from "@/lib/i18n/translations"

const pageWidth = 1240
const pageHeight = 1860
const thumbWidth = 480
const thumbHeight = 720
const modalCloseAnimationMs = 200
const swipeThresholdPx = 48
const inquiryHref = `${profile.links.email}?subject=${encodeURIComponent(book.inquirySubject)}`

export function BookShowcase() {
  const { t } = useLanguage()
  const copy = t.book
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isModalClosing, setIsModalClosing] = useState(false)
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const closeTimerRef = useRef<number | null>(null)
  const touchStartXRef = useRef<number | null>(null)
  const isOpen = activeIndex !== null

  const openPreview = useCallback((index: number) => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }

    setIsModalClosing(false)
    setActiveIndex(index)
  }, [])

  const openPreviewAtPage = (page: number) => {
    const index = bookPreviewPages.findIndex((previewPage) => previewPage.page === page)

    if (index !== -1) {
      openPreview(index)
    }
  }

  const closePreview = useCallback(() => {
    if (closeTimerRef.current !== null) {
      return
    }

    setIsModalClosing(true)
    closeTimerRef.current = window.setTimeout(() => {
      setActiveIndex(null)
      setIsModalClosing(false)
      closeTimerRef.current = null
    }, modalCloseAnimationMs)
  }, [])

  const showPage = useCallback((direction: 1 | -1) => {
    setActiveIndex((current) => {
      if (current === null) {
        return current
      }

      return (current + direction + bookPreviewPages.length) % bookPreviewPages.length
    })
  }, [])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0)

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        closePreview()
      } else if (event.key === "ArrowRight") {
        showPage(1)
      } else if (event.key === "ArrowLeft") {
        showPage(-1)
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [closePreview, isOpen, showPage])

  const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closePreview()
    }
  }

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) {
      return
    }

    const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )

    if (focusableElements.length === 0) {
      return
    }

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
      return
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartXRef.current
    const endX = event.changedTouches[0]?.clientX
    touchStartXRef.current = null

    if (startX === null || endX === undefined || Math.abs(endX - startX) < swipeThresholdPx) {
      return
    }

    showPage(endX < startX ? 1 : -1)
  }

  const activePage = activeIndex !== null ? bookPreviewPages[activeIndex] : null

  return (
    <section
      id="book"
      className="relative scroll-mt-24 overflow-hidden border-y border-border bg-card/25 px-6 py-24"
    >
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-[20rem]">
            <div className="animate-pulse-glow absolute inset-6 rounded-full bg-amber-400/20 blur-[70px]" />
            <div className="animate-float-slow relative mix-blend-lighten">
              <Image
                src={book.cover}
                alt={copy.coverAlt}
                width={book.coverWidth}
                height={book.coverHeight}
                sizes="(max-width: 640px) 272px, 320px"
                className="h-auto w-full [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent),linear-gradient(to_bottom,transparent,black_8%,black_93%,transparent)]"
              />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-300" />
                </span>
                {copy.status}
              </span>
              <span className="text-xs text-muted-foreground">{copy.statusNote}</span>
            </div>

            <h3 className="mt-5 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{book.title}</h3>
            <p className="mt-2 font-mono text-sm text-primary text-glow sm:text-base">{copy.subtitle}</p>

            <div className="mt-5 space-y-3 text-pretty leading-relaxed text-muted-foreground">
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {copy.stats.map((stat) => (
                <div key={stat.label} className="glass rounded-2xl border border-border px-4 py-3">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-heading text-lg font-semibold tracking-tight text-foreground">{stat.value}</dd>
                  <dd className="mt-0.5 text-xs leading-snug text-muted-foreground">{stat.label}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-7 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {copy.focusAreas.map((area, i) => (
                <li key={area.title} className="flex gap-3">
                  <span className="mt-0.5 font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{area.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{area.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                render={<a href="#book-preview" onClick={() => setIsPreviewExpanded(true)} />}
                nativeButton={false}
                size="lg"
                className="rounded-full px-6 font-medium"
              >
                {copy.previewButton}
                <ArrowDown className="size-4" />
              </Button>
              <Button
                render={<a href={inquiryHref} />}
                nativeButton={false}
                size="lg"
                variant="outline"
                className="rounded-full border-border bg-card/40 px-6 font-medium backdrop-blur hover:bg-secondary"
              >
                <Mail className="size-4" />
                {copy.inquiryButton}
              </Button>
            </div>
          </div>
        </div>

        <div id="book-preview" className="mt-20 scroll-mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">{copy.preview.heading}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {copy.preview.description}
            </p>
            <Button
              type="button"
              size="lg"
              variant="outline"
              aria-expanded={isPreviewExpanded}
              aria-controls="book-preview-pages"
              onClick={() => setIsPreviewExpanded((expanded) => !expanded)}
              className="mt-6 rounded-full border-border bg-card/40 px-6 font-medium backdrop-blur hover:bg-secondary"
            >
              {isPreviewExpanded ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              {isPreviewExpanded ? copy.preview.hidePages : copy.preview.showPages}
              <ChevronDown
                className={cn("size-4 transition-transform duration-300", isPreviewExpanded && "rotate-180")}
              />
            </Button>
          </div>

          <div
            id="book-preview-pages"
            inert={!isPreviewExpanded}
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
              isPreviewExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="-mx-6 min-h-0 overflow-hidden">
              <ul className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pt-2 pb-5 [scrollbar-width:thin]">
                {bookPreviewPages.map((previewPage, index) => {
                  const pageCopy = copy.preview.pages[previewPage.id]

                  return (
                    <li key={previewPage.id} className="w-[10.5rem] shrink-0 snap-start sm:w-[12.5rem]">
                      <button
                        type="button"
                        onClick={() => openPreview(index)}
                        aria-haspopup="dialog"
                        aria-label={formatMessage(copy.preview.openPageAria, {
                          title: pageCopy.title,
                          page: previewPage.page,
                        })}
                        className="group block w-full rounded-2xl border border-border glass p-2 text-left transition-all duration-300 hover:-translate-y-1.5 hover:glow-ring focus-visible:glow-ring focus-visible:outline-none"
                      >
                        <span className="relative block overflow-hidden rounded-xl bg-white">
                          <Image
                            src={bookPreviewImage(previewPage.page, "thumb")}
                            alt=""
                            width={thumbWidth}
                            height={thumbHeight}
                            sizes="(max-width: 640px) 168px, 200px"
                            loading="lazy"
                            className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-background/0 opacity-0 transition-all duration-300 group-hover:bg-background/40 group-hover:opacity-100">
                            <Eye className="size-6 text-foreground" />
                          </span>
                        </span>
                        <span className="mt-2.5 block px-1 pb-1">
                          <span className="font-mono text-[0.68rem] text-primary">
                            {formatMessage(copy.preview.pageLabel, { page: previewPage.page })}
                          </span>
                          <span className="mt-0.5 block truncate text-sm font-medium text-foreground">{pageCopy.title}</span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
              <p className="mt-1 text-center font-mono text-xs text-muted-foreground sm:hidden">{copy.preview.scrollHint}</p>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="glass rounded-2xl border border-border p-6 sm:p-8">
            <h3 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">{copy.contents.heading}</h3>
            <ol className="mt-6 divide-y divide-border/70">
              {bookChapters.map((chapter, i) => {
                const chapterCopy = copy.contents.chapters[i]
                const previewPage = chapter.previewPage

                return (
                  <li key={chapter.number} className="flex items-start gap-4 py-3.5">
                    <span className="w-6 shrink-0 pt-0.5 font-mono text-xs text-primary tabular-nums">
                      {String(chapter.number).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">{chapterCopy.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{chapterCopy.summary}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 pt-0.5">
                      <span className="hidden font-mono text-xs text-muted-foreground tabular-nums sm:inline">
                        {formatMessage(copy.contents.pageLabel, { page: chapter.page })}
                      </span>
                      {previewPage !== null ? (
                        <Button
                          type="button"
                          size="icon-sm"
                          variant="outline"
                          aria-haspopup="dialog"
                          aria-label={formatMessage(copy.contents.previewChapterAria, { title: chapterCopy.title })}
                          onClick={() => openPreviewAtPage(previewPage)}
                          className="rounded-full border-border bg-transparent text-primary hover:bg-secondary"
                        >
                          <Eye className="size-3.5" />
                        </Button>
                      ) : (
                        <span className="size-7" aria-hidden="true" />
                      )}
                    </div>
                  </li>
                )
              })}
            </ol>

            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              {copy.contents.backMatterHeading}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {copy.contents.backMatter.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs font-medium text-foreground/75"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl border border-border p-6 sm:p-8">
            <h3 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">{copy.process.heading}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy.process.intro}</p>
            <ol className="mt-6 space-y-5">
              {copy.process.steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="font-heading text-xl font-semibold text-primary/70 text-glow tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="glass glow-ring relative mt-14 overflow-hidden rounded-3xl border border-border p-8 text-center sm:p-12">
          <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-amber-400/15 blur-[100px]" />
          <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-primary">{copy.cta.eyebrow}</p>
          <h3 className="relative mt-3 text-balance font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            {copy.cta.title}
          </h3>
          <p className="relative mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            {copy.cta.description}
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Button
              render={<a href={inquiryHref} />}
              nativeButton={false}
              size="lg"
              className="rounded-full px-7 font-medium"
            >
              <Mail className="size-4" />
              {copy.cta.emailButton}
            </Button>
            <Button
              render={<a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="rounded-full border-border bg-transparent px-7 font-medium hover:bg-secondary"
            >
              <LinkedinIcon className="size-4" />
              LinkedIn
            </Button>
            <Button
              render={<a href={profile.links.telegram} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="rounded-full border-border bg-transparent px-7 font-medium hover:bg-secondary"
            >
              <Send className="size-4" />
              Telegram
            </Button>
          </div>
        </div>
      </div>

      {activePage && activeIndex !== null ? (
        <div
          data-state={isModalClosing ? "closing" : "open"}
          className="games-lab-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-3 backdrop-blur-md sm:p-6"
          onMouseDown={handleOverlayMouseDown}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-preview-title"
            onKeyDown={handleDialogKeyDown}
            className="games-lab-modal-panel glass flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-border shadow-2xl"
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border/80 px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="font-mono text-xs text-primary">
                  {formatMessage(copy.preview.counter, {
                    page: activePage.page,
                    current: activeIndex + 1,
                    total: bookPreviewPages.length,
                  })}
                </p>
                <h4 id="book-preview-title" className="mt-1 font-heading text-lg font-semibold tracking-tight">
                  {copy.preview.pages[activePage.id].title}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {copy.preview.pages[activePage.id].caption}
                </p>
              </div>
              <Button
                ref={closeButtonRef}
                type="button"
                size="icon"
                variant="outline"
                aria-label={copy.preview.closePreview}
                onClick={closePreview}
                className="rounded-full border-border bg-background/40 hover:bg-secondary"
              >
                <X className="size-4" />
              </Button>
            </div>

            <div
              className="relative flex min-h-0 flex-1 items-center justify-center bg-secondary/30 p-3 sm:p-5"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                key={activePage.page}
                src={bookPreviewImage(activePage.page)}
                alt={formatMessage(copy.preview.pageAlt, {
                  page: activePage.page,
                  title: copy.preview.pages[activePage.id].title,
                })}
                width={pageWidth}
                height={pageHeight}
                sizes="(max-width: 768px) 94vw, 720px"
                className="h-auto max-h-[calc(94vh-11rem)] w-auto max-w-full rounded-lg bg-white shadow-xl animate-in fade-in duration-300"
              />

              <Button
                type="button"
                size="icon-lg"
                variant="outline"
                aria-label={copy.preview.previousPage}
                onClick={() => showPage(-1)}
                className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full border-border bg-background/70 backdrop-blur hover:bg-secondary sm:left-4"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <Button
                type="button"
                size="icon-lg"
                variant="outline"
                aria-label={copy.preview.nextPage}
                onClick={() => showPage(1)}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full border-border bg-background/70 backdrop-blur hover:bg-secondary sm:right-4"
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>

            <div className="flex shrink-0 justify-center gap-1.5 border-t border-border/80 px-5 py-3">
              {bookPreviewPages.map((previewPage, index) => (
                <button
                  key={previewPage.id}
                  type="button"
                  aria-label={formatMessage(copy.preview.openPageAria, {
                    title: copy.preview.pages[previewPage.id].title,
                    page: previewPage.page,
                  })}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    index === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
