"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus, X } from "lucide-react"
import type { ResolvedGamesLabItem } from "@/lib/games-lab-data"
import { optimizedImage } from "@/lib/media"
import { useLanguage } from "@/lib/i18n/language-context"
import { formatMessage } from "@/lib/i18n/translations"

type Props = { items: ResolvedGamesLabItem[] }
const featuredIds = ["valdrisrun", "meowtubes", "fistcraft", "cyberyolk", "feathermoon"]

export function GamesLabClient({ items }: Props) {
  const { t, language } = useLanguage()
  const [selectedGame, setSelectedGame] = useState<ResolvedGamesLabItem | null>(null)
  const galleryRef = useRef<HTMLDialogElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const previews = featuredIds.flatMap((id) => items.filter((game) => game.id === id))

  function openGallery(game: ResolvedGamesLabItem) {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setSelectedGame(game)
  }

  useEffect(() => {
    const dialog = galleryRef.current
    if (!selectedGame || !dialog) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    if (!dialog.open) dialog.showModal()

    return () => {
      document.body.style.overflow = previousOverflow
      if (dialog.open) dialog.close()
      returnFocusRef.current?.focus({ preventScroll: true })
    }
  }, [selectedGame])

  function scrollPreviews(direction: number) {
    const strip = stripRef.current
    if (!strip) return
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    strip.scrollBy({ left: direction * strip.clientWidth * 0.7, behavior: reducedMotion ? "instant" : "smooth" })
  }

  return (
    <section id="games-lab" className="lab-section" data-artifact="gameplay" aria-labelledby="games-lab-title">
      <div className="site-shell">
        <div className="lab-intro">
          <div>
            <p className="eyebrow"><span className="index-mark">02 /</span> {t.gamesLab.eyebrow}</p>
            <h2 id="games-lab-title" className="section-title">{language === "en" ? <>Play. Iterate.<br /><span className="lab-title-last">Repeat.</span></> : <>Грай. Змінюй.<br /><span className="lab-title-last">Повторюй.</span></>}</h2>
          </div>
          <div className="lab-intro-copy"><p>{t.gamesLab.intro}</p><p>{t.gamesLab.description}</p></div>
        </div>

        <div className="lab-strip-topline">
          <p className="eyebrow">{String(items.length).padStart(2, "0")} / {language === "en" ? "EXPERIMENTS IN PLAY" : "ІГРОВІ ЕКСПЕРИМЕНТИ"}</p>
          <div className="lab-strip-controls">
            <button type="button" onClick={() => scrollPreviews(-1)} aria-label={language === "en" ? "Previous previews" : "Попередні превʼю"}><ArrowLeft size={18} aria-hidden="true" /></button>
            <button type="button" onClick={() => scrollPreviews(1)} aria-label={language === "en" ? "Next previews" : "Наступні превʼю"}><ArrowRight size={18} aria-hidden="true" /></button>
          </div>
        </div>
        <div ref={stripRef} className="lab-preview-strip" tabIndex={0} aria-label={language === "en" ? "Selected prototype previews" : "Вибрані превʼю прототипів"}>
          {previews.map((game) => (
            <button className={`lab-preview ${game.orientation === "horizontal" ? "lab-preview-wide" : ""}`} type="button" key={game.id} onClick={() => openGallery(game)} aria-haspopup="dialog" aria-label={`${t.gamesLab.viewButton}: ${game.title}`}>
              <div className="lab-preview-image">
                {game.previewImage ? <Image src={optimizedImage(game.previewImage)} alt={formatMessage(t.gamesLab.gameplayPreviewAlt, { title: game.title })} fill sizes={game.orientation === "horizontal" ? "(max-width: 760px) 80vw, 550px" : "190px"} className="lab-screenshot" loading="lazy" /> : <span>{t.gamesLab.noPreview}</span>}
                <span className="lab-preview-open" aria-hidden="true"><ArrowUpRight size={18} /></span>
              </div>
              <span className="lab-preview-caption"><span>{game.title}</span><span className="eyebrow">{String(game.images.length).padStart(2, "0")} IMG</span></span>
            </button>
          ))}
        </div>

        <div className="lab-index" aria-label={language === "en" ? "All prototypes" : "Усі прототипи"}>
          <div className="lab-index-label eyebrow"><span>{language === "en" ? "THE COMPLETE INDEX" : "ПОВНИЙ КАТАЛОГ"}</span><span>UNITY / C#</span></div>
          {items.map((game, index) => (
            <details key={game.id} className="lab-index-entry">
              <summary>
                <span className="lab-index-number eyebrow">{String(index + 1).padStart(2, "0")}</span>
                <span className="lab-index-name"><span>{game.title}</span><span className="eyebrow">{t.gamesLab.items[game.id].genre}</span></span>
                <span className="lab-index-description">{t.gamesLab.items[game.id].shortDescription}</span>
                <Plus size={18} className="lab-index-expand" aria-hidden="true" />
              </summary>
              <div className="lab-index-detail">
                <p>{t.gamesLab.items[game.id].fullDescription}</p>
                <button type="button" className="text-link" onClick={() => openGallery(game)} aria-haspopup="dialog">{t.gamesLab.viewButton}<ArrowUpRight size={17} aria-hidden="true" /></button>
              </div>
            </details>
          ))}
        </div>
      </div>

      <dialog ref={galleryRef} className={`lab-gallery ${selectedGame?.orientation === "vertical" ? "lab-gallery-vertical" : ""}`} aria-labelledby="lab-gallery-title" onClose={() => setSelectedGame(null)}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return
          const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, [tabindex="0"]')
          const first = controls[0]
          const last = controls[controls.length - 1]
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
        }}
        onClick={(event) => { if (event.target === event.currentTarget) galleryRef.current?.close() }}>
        {selectedGame ? (
          <div className="lab-gallery-panel">
            <div className="lab-gallery-header">
              <div><p className="eyebrow">{t.gamesLab.items[selectedGame.id].genre}</p><h3 id="lab-gallery-title">{selectedGame.title}</h3><p className="lab-gallery-description">{t.gamesLab.items[selectedGame.id].fullDescription}</p></div>
              <button type="button" autoFocus className="lab-gallery-close" onClick={() => galleryRef.current?.close()} aria-label={formatMessage(t.gamesLab.closeGalleryAria, { title: selectedGame.title })}><X size={20} aria-hidden="true" /></button>
            </div>
            <div className="lab-gallery-media" tabIndex={0} role="group" aria-label={language === "en" ? "Project screenshots" : "Скриншоти проєкту"}>
              {selectedGame.images.length ? selectedGame.images.map((source, index) => (
                <figure key={source}>
                  <div className="lab-gallery-image"><Image src={optimizedImage(source)} alt={formatMessage(t.gamesLab.screenshotAlt, { title: selectedGame.title, index: index + 1 })} fill sizes={selectedGame.orientation === "horizontal" ? "(max-width: 760px) 90vw, 50vw" : "(max-width: 600px) 80vw, 300px"} className="lab-screenshot" loading="lazy" /></div>
                  <figcaption className="eyebrow">{String(index + 1).padStart(2, "0")} / {String(selectedGame.images.length).padStart(2, "0")}</figcaption>
                </figure>
              )) : <p>{t.gamesLab.noScreenshots}</p>}
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  )
}
