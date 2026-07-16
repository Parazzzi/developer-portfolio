"use client"

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react"
import Image from "next/image"
import { Eye, Images, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { GamesLabContent, ResolvedGamesLabItem } from "@/lib/games-lab-data"
import { useLanguage } from "@/lib/i18n/language-context"
import { formatMessage, type Translation } from "@/lib/i18n/translations"
import { cn } from "@/lib/utils"

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
  const horizontalGames = items.filter((game) => game.orientation === "horizontal")
  const verticalGames = items.filter((game) => game.orientation === "vertical")
  const orderedGames = [...horizontalGames, ...verticalGames]

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
    <section id="games-lab" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
      <div className="site-shell">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div className="min-w-0">
            <p className="section-kicker">{t.gamesLab.eyebrow}</p>
            <h2 className="mt-4 text-balance font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {t.gamesLab.heading}
            </h2>
          </div>
          <div className="min-w-0 max-w-2xl lg:justify-self-end">
            <p className="text-pretty text-lg font-medium text-foreground/90">{t.gamesLab.intro}</p>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{t.gamesLab.description}</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 lg:grid-cols-12">
          {orderedGames.map((game, index) => (
            <GameLabCard
              key={game.id}
              game={game}
              content={t.gamesLab.items[game.id]}
              labels={t.gamesLab}
              index={index}
              onView={openModal}
            />
          ))}
        </div>
      </div>

      {selectedGame ? (
        <div
          data-state={isModalClosing ? "closing" : "open"}
          className="games-lab-modal-overlay fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/85 p-4 backdrop-blur-md sm:items-center sm:p-6"
          onMouseDown={handleOverlayMouseDown}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="games-lab-modal-title"
            onKeyDown={handleDialogKeyDown}
            className={cn(
              "games-lab-modal-panel technical-surface flex max-h-[90vh] w-full flex-col overflow-hidden rounded-xl",
              selectedGame.orientation === "horizontal" ? "max-w-6xl" : "max-w-5xl",
            )}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
              <div>
                <p className="inline-flex rounded-md border border-white/10 bg-white/[0.045] px-3 py-1 text-xs font-semibold text-foreground/75">
                  {t.gamesLab.items[selectedGame.id].genre}
                </p>
                <h3 id="games-lab-modal-title" className="mt-3 font-heading text-2xl font-semibold tracking-tight">
                  {selectedGame.title}
                </h3>
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
                className="rounded-md border-white/10 bg-background/40 hover:bg-white/10"
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
                        "overflow-hidden rounded-lg border border-white/10 bg-background/42 p-2",
                        selectedGame.orientation === "vertical" && selectedGame.images.length === 1
                          ? "mx-auto w-full max-w-[20rem]"
                          : null,
                      )}
                    >
                      <div
                        className={cn(
                          "relative overflow-hidden rounded-md bg-background/70",
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
                <div className="rounded-lg border border-white/10 bg-background/42 p-8 text-center text-sm text-muted-foreground">
                  {t.gamesLab.noScreenshots}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

function GameLabCard({
  game,
  content,
  labels,
  index,
  onView,
}: {
  game: ResolvedGamesLabItem
  content: GamesLabContent
  labels: GamesLabCopy
  index: number
  onView: (game: ResolvedGamesLabItem) => void
}) {
  const secondaryImage = game.images.find((image) => image !== game.previewImage)

  return (
    <article className={cn("group overflow-hidden rounded-lg border border-white/10 bg-surface/74 transition duration-300 hover:-translate-y-1 hover:border-orange/35", getCardSpan(game, index))}>
      <div
        className={cn(
          "relative overflow-hidden bg-background/60",
          game.orientation === "horizontal" ? "aspect-[1820/848]" : "aspect-[540/1161]",
        )}
      >
        {game.previewImage ? (
          <>
            <Image
              src={game.previewImage}
              alt={formatMessage(labels.gameplayPreviewAlt, { title: game.title })}
              fill
              sizes={game.orientation === "horizontal" ? "(max-width: 1024px) 92vw, 620px" : "(max-width: 640px) 86vw, (max-width: 1024px) 44vw, 260px"}
              className={cn(
                "object-cover transition duration-500 group-hover:scale-[1.035]",
                game.orientation === "vertical" ? "object-contain" : null,
              )}
              loading="lazy"
            />
            {secondaryImage ? (
              <Image
                src={secondaryImage}
                alt=""
                fill
                sizes={game.orientation === "horizontal" ? "(max-width: 1024px) 92vw, 620px" : "(max-width: 640px) 86vw, (max-width: 1024px) 44vw, 260px"}
                className={cn(
                  "object-cover opacity-0 transition duration-500 group-hover:opacity-100",
                  game.orientation === "vertical" ? "object-contain" : null,
                )}
                loading="lazy"
              />
            ) : null}
          </>
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
            {labels.noPreview}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent opacity-90" />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-background/66 px-2.5 py-1 text-[0.68rem] font-semibold text-foreground/78 backdrop-blur">
          <Images className="size-3.5 text-orange" />
          {game.images.length}
        </div>
      </div>

      <div className="p-4">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-orange">{content.genre}</p>
        <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight">{game.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{content.shortDescription}</p>
        <Button
          type="button"
          size="sm"
          onClick={() => onView(game)}
          aria-haspopup="dialog"
          className="mt-4 rounded-md font-semibold"
        >
          {labels.viewButton}
          <Eye className="size-3.5" />
        </Button>
      </div>
    </article>
  )
}

function getCardSpan(game: ResolvedGamesLabItem, index: number) {
  if (game.orientation === "horizontal") {
    return "lg:col-span-7"
  }

  const spans = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-4", "lg:col-span-3", "lg:col-span-3"]
  return spans[index % spans.length]
}
