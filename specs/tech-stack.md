# Tech Stack

AgentClinic is a server-side TypeScript application. All rendering happens on the server; the browser receives plain HTML that works well and looks good.

## Core

| Layer | Choice | Rationale |
|---|---|---|
| Language | TypeScript | Type safety end-to-end; satisfies Mary's requirement |
| Runtime | Node.js | Stable, well-supported, vast ecosystem |
| Server framework | **Hono** | Lightweight, TypeScript-first, fast, excellent DX; routes and middleware feel natural |
| Templating | Hono JSX (server-side) | JSX without React overhead; components are just functions |
| CSS | Plain CSS + CSS custom properties | No build step required; Steve gets a modern, attractive result |
| UI | **Responsive, mobile-first layout** | Fluid spacing and typography; viewport meta on every page; media queries in shared CSS — works on phone through desktop |

## Responsive design

All AgentClinic pages share a responsive foundation:

- **Mobile-first CSS** in `src/styles/layout.css` — base styles target small screens; `@media (min-width: …)` enhances layout for larger viewports
- **Viewport meta** — `<meta name="viewport" content="width=device-width, initial-scale=1" />` in `Layout.tsx` so mobile browsers scale correctly
- **Fluid layout** — content regions use percentage/`max-width` widths and responsive padding tokens (`--space-sm`, `--space-md`, `--space-lg`) rather than fixed pixel layouts
- **No client framework** — responsiveness is achieved with plain CSS custom properties and media queries only

## Recommended: Hono

[Hono](https://hono.dev) is chosen over Express/Fastify because:

- First-class TypeScript with zero config
- Built-in JSX renderer for server-side HTML
- Middleware model is simple and composable
- Runs on Node, Deno, Bun, and edge runtimes without changes

## Data

- **SQLite** (via `better-sqlite3`) for local development and early production — simple, embedded, no infrastructure
- Migrations via plain SQL files; no ORM to start

## Testing

- **Vitest** — fast, TypeScript-native, compatible with the rest of the stack
- **Validation** — automated checks run via Vitest instead of (or alongside) manual curl/browser steps where practical; route handlers, components, and utilities get `*.test.ts` / `*.spec.ts` files colocated with source or under `src/`
- **`package.json` script** — `"test": "vitest run"` for a single non-interactive validation pass (CI and pre-merge); use `npm run test:watch` for watch mode during development

Example scripts block:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

## Tooling

- `tsx` for development (run TypeScript directly, no build step needed)
- `tsc` for production builds
- `vitest` for automated validation (`npm test`)
- `prettier` for formatting

## What We Are Not Using

- No React, Vue, or Svelte — server-side rendering keeps the stack simple
- No ORM — SQL is sufficient at this scale
- No Docker — not yet; that's a later phase concern
