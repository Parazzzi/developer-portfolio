export function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(73,216,255,0.11),transparent_34%),linear-gradient(180deg,#08090c_0%,#0a0b0f_52%,#08090c_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.075) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.075) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, black, transparent 86%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 86%)",
        }}
      />
      <div className="noise-overlay absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.72)]" />
    </div>
  )
}
