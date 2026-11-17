"use client"

import { useEffect, useRef, useState } from "react"

type YouTubeEmbedProps = {
  src: string
  title: string
}

// The embeds autoplay, so loading all of them at once kept several videos decoding off-screen and
// made the whole page lag. Each one mounts when it comes near the viewport and pauses when it leaves.
export function YouTubeEmbed({ src, title }: YouTubeEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [embedUrl, setEmbedUrl] = useState<string | null>(null)
  const videoId = src.match(/\/embed\/([\w-]+)/)?.[1]

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const command = (func: "playVideo" | "pauseVideo") => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func, args: [] }),
        "https://www.youtube.com",
      )
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEmbedUrl((current) => {
            if (current) return current
            const url = new URL(src)
            url.searchParams.set("enablejsapi", "1")
            url.searchParams.set("origin", window.location.origin)
            return url.toString()
          })
          command("playVideo")
        } else {
          command("pauseVideo")
        }
      },
      { rootMargin: "200px 0px" },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [src])

  return (
    <div
      ref={containerRef}
      className="h-full w-full bg-cover bg-center"
      style={videoId ? { backgroundImage: `url(https://i.ytimg.com/vi/${videoId}/hqdefault.jpg)` } : undefined}
    >
      {embedUrl ? (
        <iframe
          ref={iframeRef}
          className="h-full w-full"
          src={embedUrl}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : null}
    </div>
  )
}
