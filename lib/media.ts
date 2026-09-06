/** Small local derivatives; full-resolution originals remain available unchanged. */
export function optimizedImage(source: string) {
  return source.startsWith("/") && /\.png$/i.test(source)
    ? `/media${source.replace(/\.png$/i, ".webp")}`
    : source
}
