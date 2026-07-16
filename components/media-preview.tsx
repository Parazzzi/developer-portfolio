"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

type CinematicVideoProps = {
  src: string
  poster: string
  label: string
  className?: string
  controls?: boolean
}

export function CinematicVideo({ src, poster, label, className, controls = false }: CinematicVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      video.pause()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
          return
        }

        video.pause()
      },
      { threshold: 0.35 },
    )

    observer.observe(video)

    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      aria-label={label}
      className={cn("h-full w-full object-cover", className)}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      controls={controls}
    />
  )
}

type LazyYoutubeEmbedProps = {
  title: string
  src: string
  poster: string
  posterAlt: string
  playLabel: string
  className?: string
}

export function LazyYoutubeEmbed({ title, src, poster, posterAlt, playLabel, className }: LazyYoutubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  if (isLoaded) {
    return (
      <iframe
        className={cn("h-full w-full", className)}
        src={src}
        title={title}
        loading="lazy"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setIsLoaded(true)}
      className={cn(
        "group relative block h-full w-full overflow-hidden text-left focus-visible:outline-cyan",
        className,
      )}
      aria-label={playLabel}
    >
      <Image
        src={poster}
        alt={posterAlt}
        fill
        sizes="(max-width: 768px) 92vw, 760px"
        className="object-cover transition duration-500 group-hover:scale-[1.035]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-md border border-white/15 bg-background/72 px-3 py-2 text-sm font-semibold text-foreground backdrop-blur">
        <Play className="size-4 fill-orange text-orange" />
        {playLabel}
      </span>
    </button>
  )
}
