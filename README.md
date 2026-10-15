# Morm Kimheng — Astro portfolio

The existing Vue design now runs on Astro with static, file-based routes. Vue components retain the theme toggle, navigation menu, work filters, design lightbox, and scroll effects. Page content and project metadata are rendered into HTML during the build.

## Develop

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

Astro serves development at http://localhost:4321. Production output is in `dist/`. Vercel is configured for Astro; the previous SPA catch-all rewrite has been removed so direct project URLs and real 404 pages work.

## Content

- `src/pages/`: Astro routes, including generated project detail pages.
- `src/layouts/BaseLayout.astro`: document shell, shared layout and page metadata.
- `src/data/projects.js`: project descriptions, technology tags, images and featured selection.
- `src/components/` and `src/views/`: preserved Vue UI.
- `public/images/projects/`: Family Gear screenshots supplied by the owner, plus original SVG covers for projects awaiting screenshots.

Recent additions were described from local project documentation/source: Family Gear (AMouseWebAPP), Just Mirror (MirrorAPp), Roblox Auto Helper (AHotkey), and Content Report Automation (AReportScript). They are labeled in progress because release/completion status was not confirmed. No private source, credentials, generated installers, or internal data are copied into the portfolio.

The canonical site is configured in `astro.config.mjs`; update it if deploying to another domain. Personal details are in `src/data/personal.js`.
