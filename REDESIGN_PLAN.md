# Redesign Plan

## Repository Snapshot

- Framework: Next.js App Router with React 19 and TypeScript.
- Styling: Tailwind CSS 4, shadcn/base-ui button primitive, CSS variables in `app/globals.css`.
- Routing: single homepage route in `app/page.tsx`.
- Localization: custom client-side `LanguageProvider` with English/Ukrainian copy in `lib/i18n/translations.ts`.
- Analytics: Vercel Analytics is mounted in `app/layout.tsx`.
- Content: project metadata lives in `lib/portfolio-data.ts`; Games Lab inventory lives in `lib/games-lab-data.ts` and screenshots are discovered server-side from `public/games-lab`.
- Media: existing PC Creator covers, VR football poster/video, certificate image, Games Lab screenshots, CV PDF, favicon assets.
- Current risk: `pnpm`/`npm` are not exposed on PATH in this environment, so validation should use installed local binaries through the bundled Node runtime when needed.

## Components To Reuse

- `LanguageProvider` and language switch behavior.
- `Button` primitive and `cn` utility.
- `GamesLab` server-side screenshot discovery.
- Games Lab modal behavior: Escape handling, focus trap, gallery rendering, and translated descriptions.
- `profile`, project links, CV path, social/contact links, certificate data, and analytics integration.
- Existing project media and Games Lab assets.

## Components To Replace Or Heavily Redesign

- `Header`: rebuild as compact sticky game-interface navigation with availability, CV, social/contact affordances, and responsive mobile menu.
- `Hero`: replace text-only profile hero with cinematic gameplay-media composition and direct Unity positioning.
- `ProjectsGrid` / `ProjectsGridClient`: replace equal project cards with two major case studies: PC Creator Series and VR Football Penalty.
- `Skills`: replace repeated cards with compact interactive toolkit categories.
- `Services` and `Workflow`: remove from homepage flow and replace their useful content with `UnderTheHood`.
- `AnimatedBackground`: remove glowing orb treatment; keep subtle grid/noise/editorial technical atmosphere.
- `Contact`: redesign as a strong final CTA.
- `Footer`: simplify and align with the new visual system.

## New Page Structure

1. Navigation
2. Cinematic hero
3. Selected Commercial Work: PC Creator Series
4. VR/XR Case Study: VR Football Penalty
5. Games Lab
6. Under the Hood
7. Experience and Toolkit
8. About
9. Contact
10. Footer

## Visual Design System

- Background: graphite/black base using `#08090C` and `#111318`.
- Typography: existing Geist fonts retained for performance and Ukrainian support; use large editorial sizing, tighter section rhythm, and no sci-fi novelty fonts.
- Accents: orange for commercial/mobile/game-production work; cyan for VR/XR and spatial interaction.
- Surfaces: restrained dark panels with thin borders, 8px-ish radius where practical, minimal glass.
- Details: subtle grid, scanline/noise texture, section numbers, technical labels, media frames, and editorial asymmetry.
- Avoid: glowing orbs, fake terminal/code rain, generic bento grids, excessive rounded pills, oversized duplicated tech-card grids.

## Animation Strategy

- Use CSS-only scroll/media reveals and hover microinteractions where possible.
- Add lightweight client interactions for hero depth, compact nav, toolkit category switching, and media hover playback.
- Respect `prefers-reduced-motion`.
- Keep transforms/opacity GPU-friendly and avoid scroll hijacking.
- Pause or avoid loading heavy media until needed; keep autoplay muted.

## Responsive Strategy

- Desktop: asymmetric two-column hero, large media, case-study layouts with layered project previews.
- Tablet: reduce overlap, stack case-study content with stable media aspect ratios.
- Mobile: simplify hero media composition, use touch-friendly navigation/menu, make Games Lab and case-study actions easy to reach, prevent horizontal overflow.
- Target widths for manual checks: 1440, 1280, 1024, 768, 430, 390, 360.

## Implementation Steps

1. Update structured translation schema for the new sections in English and Ukrainian without inventing metrics.
2. Add/adjust shared project data helpers for grouping PC Creator projects and VR work.
3. Refresh global CSS variables, background utilities, reduced-motion behavior, and focus styles.
4. Replace the homepage section composition in `app/page.tsx`.
5. Build redesigned components: hero, header, case studies, Games Lab presentation, Under the Hood, toolkit, about, contact, footer.
6. Preserve all available links: Play Market, App Store, social/contact links, Telegram, email, CV, 3D portfolio, analytics; render GitHub only if a real URL exists in project data.
7. Validate lint/type/build with available local binaries; fix redesign-caused issues.
8. Run the local site, check desktop/mobile layouts, both languages, console output, navigation, modals, media behavior, and CV download.
9. Create `REDESIGN_SUMMARY.md` with changes, commands, limitations, and asset suggestions.
