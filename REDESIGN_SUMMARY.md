# Digital Artifacts — composition refinement

- Preserved the existing identity, project data, links, language support, route and deployment configuration.
- Established fixed atmosphere → WebGL → HTML → navigation/modal layering. The canvas never receives pointer events.
- Added section-driven position, rotation, scale, visibility, wireframe and lighting states. About, capabilities, XR and contact provide explicit composition spaces; dense project media and Experience hide the artifact.
- Added a lightweight independent scroll atmosphere with interpolated graphite/green backgrounds, a warm light Experience section and return to black. Background/fallback works without WebGL.
- Reordered existing content into hero, about, mobile work/lab, systems, capabilities, XR, experience and contact. Preserved every original project and anchor, with a direct XR link in Work.
- Reduced mobile artifact moments and eliminated text/object collisions. Added focus cycling in the gallery and corrected decorative-number contrast.
- Vercel Analytics remains enabled on Vercel; local production builds no longer request a missing Vercel-only endpoint.

## Verification
- Production build, TypeScript and ESLint pass.
- Five Playwright tests cover content/links, all six requested viewport widths, navigation, language persistence, native gallery focus, reduced motion, axe accessibility, disabled WebGL and disabled JavaScript.
- Visual checks: 1920, 1440, 1024, 768, 430 and 390 px; no horizontal overflow.
- Desktop/mobile hero, project, About, capabilities, XR, light Experience and contact compositions inspected.
- Normal browser runtime has no application errors. Windows/ANGLE can report a non-fatal precision warning in Three.js's PMREMGGXConvolution shader. Confirmed upstream: https://github.com/mrdoob/three.js/issues/32692 . It is not suppressed or patched in third-party source.

Run `pnpm dev`, or `pnpm build && pnpm start`. With a server running, run `pnpm test`. Set `PORTFOLIO_TEST_URL` to test another local port.
