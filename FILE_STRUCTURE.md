# File Structure

Practical Energy Solutions — Next.js (App Router) + TypeScript + Tailwind CSS.
Mobile-first. This document reflects the actual scaffolded layout.

```
practical-energy-solutions/
├── next.config.mjs            # Next.js config
├── postcss.config.mjs         # PostCSS (tailwindcss + autoprefixer)
├── tailwind.config.ts         # Tailwind theme (brand colors) + content globs
├── tsconfig.json              # strict mode, "@/*" -> "src/*" path alias
├── package.json
└── src/
    ├── app/                   # App Router routes
    │   ├── layout.tsx         # Root layout: Header + Footer, metadata, viewport
    │   ├── globals.css        # Tailwind directives + base styles
    │   ├── page.tsx           # Home: hero + services grid
    │   ├── troubleshooting/
    │   │   └── page.tsx        # /troubleshooting
    │   ├── remodels/
    │   │   └── page.tsx        # /remodels
    │   └── ev-charging/
    │       └── page.tsx        # /ev-charging
    ├── components/
    │   ├── Header.tsx          # Sticky nav (desktop links + mobile scroll bar)
    │   ├── Footer.tsx
    │   ├── ServiceCard.tsx     # Home-page service summary card
    │   └── ServiceDetail.tsx   # Shared service detail page body
    └── lib/
        └── services.ts         # Service registry + STRICT solar/wind gatekeeper
```

## Conventions

- **Single source of truth for services:** `src/lib/services.ts` defines every
  offering. Pages and components read from it via `getAllServices()` /
  `getService(slug)` — they never hardcode service copy.
- **Gatekeeper:** every service is validated by `assertInScope` at module load.
  A service with a slug outside the allowlist, or whose copy references
  solar/wind terms, throws and fails the build. Solar and wind are out of scope.
- **Mobile-first:** base styles target small screens; `sm:` / `lg:` prefixes add
  layout for larger viewports.
- **Path alias:** import internal modules with `@/...` (maps to `src/`).
