# Digital Artifacts — implementation plan

## Repository audit
- Next.js 16 App Router, React 19, TypeScript, Tailwind 4. One route at `/`.
- English/Ukrainian copy: `lib/i18n/translations.ts`; identities and links: `lib/portfolio-data.ts`.
- Four featured projects, eleven Games Lab projects, server-side screenshot discovery, CV, certificate, LinkedIn, Telegram, email, existing 3D portfolio.
- Preserve canonical, Open Graph, Twitter, icons, Vercel Analytics, Git and deployment configuration.
- Existing PNG images are large; VR footage is 23 MB. Generate WebP derivatives and require explicit media playback.
- No GitHub URL or dated employment history exists. Do not invent these.
- Existing lint script lacks its dependency/config; production build suppresses types. Restore working validation.

## Implementation
1. Retain framework, single-page route, semantic HTML and language/content sources.
2. Near-black #050505, off-white #ecece7, one lime #c4f563 accent. Oversized Geist typography, mono metadata, hairline rules and asymmetry.
3. Compact navigation; typographic artifact hero; four editorial projects; Games Lab gallery/index; architecture; capabilities; about; verified experience; contact.
4. One lazy-loaded Three.js renderer: procedural segmented chrome/crystal sculpture, studio reflections, pointer response and continuous scroll states. No models or scroll hijacking.
5. Separate geometry, renderer, quality and motion from UI. Fallback sculpture, reduced-motion handling and pause control.
6. Mobile-specific composition, capped DPR, adaptive quality, hidden-page pause, disposal and click-to-load videos.
7. Verify desktop/mobile layouts, console, translations, anchors, links, gallery keyboard controls, reduced motion, WebGL-disabled and no-JavaScript content. Run lint, types and production build.
