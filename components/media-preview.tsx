"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

type CinematicVideoProps = {
  src: string
  poster: string
  label: string
  playLabel?: string
  className?: string
  controls?: boolean
}

export function CinematicVideo({ src, poster, label, playLabel = "Play media", className, controls = true }: CinematicVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!isLoaded || !video) return

    // Playback starts only after an explicit action. Offscreen media never keeps playing.
    video.play().catch(() => {})
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause()
    }, { threshold: 0.05 })
    const pauseWhenHidden = () => { if (document.hidden) video.pause() }
    observer.observe(video)
    document.addEventListener("visibilitychange", pauseWhenHidden)
    video.focus()

    return () => {
      video.pause()
      observer.disconnect()
      document.removeEventListener("visibilitychange", pauseWhenHidden)
    }
  }, [isLoaded])

  if (!isLoaded) {
    return <MediaPoster poster={poster} alt={label} playLabel={playLabel} onPlay={() => setIsLoaded(true)} className={className} />
  }

  return <video ref={videoRef} aria-label={label} className={cn("artifact-video", className)} src={src} poster={poster} muted playsInline preload="none" controls={controls} tabIndex={0} />
}

type LazyYoutubeEmbedProps = {
  title: string
  src: string
  poster: string
  posterAlt: string
  playLabel: string
  className?: string
  containPoster?: boolean
}

export function LazyYoutubeEmbed({ title, src, poster, posterAlt, playLabel, className, containPoster = false }: LazyYoutubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!isLoaded || !iframe) return
    iframe.focus()
    const pause = () => iframe.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), "https://www.youtube.com")
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) pause() }, { threshold: 0.05 })
    const pauseWhenHidden = () => { if (document.hidden) pause() }
    observer.observe(iframe)
    document.addEventListener("visibilitychange", pauseWhenHidden)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", pauseWhenHidden)
    }
  }, [isLoaded])

  if (isLoaded) {
    const playerSrc = `${src}${src.includes("?") ? "&" : "?"}enablejsapi=1`
    return <iframe ref={iframeRef} className={cn("artifact-video", className)} src={playerSrc} title={title} loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
  }

  return <MediaPoster poster={poster} alt={posterAlt} playLabel={playLabel} contain={containPoster} onPlay={() => setIsLoaded(true)} className={className} />
}

function MediaPoster({ poster, alt, playLabel, onPlay, className, contain = false }: { poster: string; alt: string; playLabel: string; onPlay: () => void; className?: string; contain?: boolean }) {
  return (
    <button type="button" onClick={onPlay} className={cn("artifact-media-trigger", className)} aria-label={`${playLabel}: ${alt}`}>
      <Image src={poster} alt={alt} fill sizes="(max-width: 760px) 90vw, 55vw" className={contain ? "project-poster-contain" : "project-poster-cover"} loading="lazy" />
      <span className="artifact-play-label"><span className="artifact-play-icon"><Play size={14} fill="currentColor" aria-hidden="true" /></span>{playLabel}<span aria-hidden="true">↗</span></span>
    </button>
  )
}
