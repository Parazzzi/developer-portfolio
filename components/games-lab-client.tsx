"use client"

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react"
import Image from "next/image"
import { Eye, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { GamesLabContent, ResolvedGamesLabItem } from "@/lib/games-lab-data"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/language-context"
import { formatMessage, type Translation } from "@/lib/i18n/translations"

type Props = {
  items: ResolvedGamesLabItem[]
}

type GamesLabCopy = Pick<Translation["gamesLab"], "gameplayPreviewAlt" | "noPreview" | "viewButton">

const modalCloseAnimationMs = 200

export function GamesLabClient({ items }: Props) {
  const { t } = useLanguage()
  const [selectedGame, setSelectedGame] = useState<ResolvedGamesLabItem | null>(null)
  const [isModalClosing, setIsModalClosing] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const closeTimerRef = useRef<number | null>(null)
  const selectedGameRef = useRef<ResolvedGamesLabItem | null>(null)
  const isModalClosingRef = useRef(false)
  const verticalGames = items.filter((game) => game.orientation === "vertical")
  const horizontalGames = items.filter((game) => game.orientation === "horizontal")

  const openModal = useCallback((game: ResolvedGamesLabItem) => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }

    selectedGameRef.current = game
    isModalClosingRef.current = false
    setIsModalClosing(false)
    setSelectedGame(game)
  }, [])

  const closeModal = useCallback(() => {
    if (!selectedGameRef.current || isModalClosingRef.current) {
      return
    }

    isModalClosingRef.current = true
    setIsModalClosing(true)

    closeTimerRef.current = window.setTimeout(() => {
      selectedGameRef.current = null
      isModalClosingRef.current = false
      setSelectedGame(null)
      setIsModalClosing(false)
      closeTimerRef.current = null
    }, modalCloseAnimationMs)
  }, [])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!selectedGame) {
      return
    }

    selectedGameRef.current = selectedGame
    isModalClosingRef.current = false
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0)

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [closeModal, selectedGame])

  const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal()
    }
  }

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") {
      return
    }

    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    const focusableElements = dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

  return (
    <div className="mt-16 border-t border-border/70 pt-14">
      <div className="mx-auto max-w-3xl text-center">
        <h3 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">{t.gamesLab.heading}</h3>
        <p className="mt-3 text-pretty text-base font-medium text-foreground/90 sm:text-lg">
          {t.gamesLab.intro}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t.gamesLab.description}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {verticalGames.map((game) => (
          <VerticalGameCard
            key={game.id}
            game={game}
            content={t.gamesLab.items[game.id]}
            labels={t.gamesLab}
            onView={openModal}
          />
        ))}
      </div>

      <div className="mt-6 space-y-6">
        {horizontalGames.map((game) => (
          <HorizontalGameCard
            key={game.id}
            game={game}
            content={t.gamesLab.items[game.id]}
            labels={t.gamesLab}
            onView={openModal}
          />
        ))}
      </div>

      {selectedGame ? (
        <div
          data-state={isModalClosing ? "closing" : "open"}
          className="games-lab-modal-overlay fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 p-4 backdrop-blur-md sm:items-center sm:p-6"
          onMouseDown={handleOverlayMouseDown}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="games-lab-modal-title"
            onKeyDown={handleDialogKeyDown}
            className={cn(
              "games-lab-modal-panel glass flex max-h-[90vh] w-full flex-col overflow-hidden rounded-3xl border border-border shadow-2xl",
              selectedGame.orientation === "horizontal" ? "max-w-6xl" : "max-w-5xl",
            )}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border/80 p-5 sm:p-6">
              <div>
                <p className="inline-flex rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs font-medium text-foreground/75">
                  {t.gamesLab.items[selectedGame.id].genre}
                </p>
                <h4 id="games-lab-modal-title" className="mt-3 font-heading text-2xl font-semibold tracking-tight">
                  {selectedGame.title}
                </h4>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {t.gamesLab.items[selectedGame.id].fullDescription}
                </p>
              </div>

              <Button
                ref={closeButtonRef}
                type="button"
                size="icon"
                variant="outline"
                aria-label={formatMessage(t.gamesLab.closeGalleryAria, { title: selectedGame.title })}
                onClick={closeModal}
                className="rounded-full border-border bg-background/40 hover:bg-secondary"
              >
                <X className="size-4" />
              </Button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
              {selectedGame.images.length > 0 ? (
                <div
                  className={cn(
                    "grid gap-4",
                    selectedGame.orientation === "horizontal"
                      ? "grid-cols-1 lg:grid-cols-2"
                      : selectedGame.images.length === 1
                        ? "grid-cols-1"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                  )}
                >
                  {selectedGame.images.map((image, index) => (
                    <figure
                      key={image}
                      className={cn(
                        "overflow-hidden rounded-2xl border border-border bg-secondary/40 p-2",
                        selectedGame.orientation === "vertical" && selectedGame.images.length === 1
                          ? "mx-auto w-full max-w-[20rem]"
                          : null,
                      )}
                    >
                      <div
                        className={cn(
                          "relative overflow-hidden rounded-xl bg-background/70",
                          selectedGame.orientation === "horizontal"
                            ? "aspect-[1820/848] w-full"
                            : "mx-auto aspect-[540/1161] w-full max-w-[18rem]",
                        )}
                      >
                        <Image
                          src={image}
                          alt={formatMessage(t.gamesLab.screenshotAlt, {
                            title: selectedGame.title,
                            index: index + 1,
                          })}
                          fill
                          sizes={
                            selectedGame.orientation === "horizontal"
                              ? "(max-width: 1024px) 92vw, 520px"
                              : "(max-width: 640px) 82vw, (max-width: 1024px) 42vw, 280px"
                          }
                          className="object-contain"
                          loading="lazy"
                        />
                      </div>
                    </figure>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-secondary/40 p-8 text-center text-sm text-muted-foreground">
                  {t.gamesLab.noScreenshots}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function VerticalGameCard({
  game,
  content,
  labels,
  onView,
}: {
  game: ResolvedGamesLabItem
  content: GamesLabContent
  labels: GamesLabCopy
  onView: (game: ResolvedGamesLabItem) => void
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border glass transition-all duration-300 hover:-translate-y-1.5 hover:glow-ring">
      <div className="bg-secondary/25 p-3">
        <div className="relative mx-auto aspect-[540/1161] w-full max-w-[13rem] overflow-hidden rounded-2xl border border-border bg-background/60">
          {game.previewImage ? (
            <Image
              src={game.previewImage}
              alt={formatMessage(labels.gameplayPreviewAlt, { title: game.title })}
              fill
              sizes="(max-width: 520px) 82vw, (max-width: 768px) 42vw, (max-width: 1280px) 30vw, 190px"
              className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center text-xs text-muted-foreground">
              {labels.noPreview}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="self-start rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[0.68rem] font-medium text-foreground/75">
          {content.genre}
        </p>
        <h4 className="mt-3 font-heading text-base font-semibold tracking-tight">{game.title}</h4>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">{content.shortDescription}</p>
        <Button
          type="button"
          size="sm"
          onClick={() => onView(game)}
          aria-haspopup="dialog"
          className="mt-4 rounded-full font-medium"
        >
          {labels.viewButton}
          <Eye className="size-3.5" />
        </Button>
      </div>
    </article>
  )
}

function HorizontalGameCard({
  game,
  content,
  labels,
  onView,
}: {
  game: ResolvedGamesLabItem
  content: GamesLabContent
  labels: GamesLabCopy
  onView: (game: ResolvedGamesLabItem) => void
}) {
  return (
    <article className="group grid overflow-hidden rounded-2xl border border-border glass transition-all duration-300 hover:-translate-y-1.5 hover:glow-ring md:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.85fr)]">
      <div className="relative aspect-[1820/848] overflow-hidden bg-secondary/30">
        {game.previewImage ? (
          <Image
            src={game.previewImage}
            alt={formatMessage(labels.gameplayPreviewAlt, { title: game.title })}
            fill
            sizes="(max-width: 768px) 92vw, 680px"
            className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            {labels.noPreview}
          </div>
        )}
      </div>

      <div className="flex flex-col p-5 sm:p-6">
        <p className="self-start rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs font-medium text-foreground/75">
          {content.genre}
        </p>
        <h4 className="mt-4 font-heading text-xl font-semibold tracking-tight">{game.title}</h4>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{content.shortDescription}</p>
        <Button
          type="button"
          size="sm"
          onClick={() => onView(game)}
          aria-haspopup="dialog"
          className="mt-6 w-fit rounded-full font-medium"
        >
          {labels.viewButton}
          <Eye className="size-3.5" />
        </Button>
      </div>
    </article>
  )
}
