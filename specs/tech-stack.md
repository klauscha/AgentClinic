# Tech Stack

AgentClinic is a server-side TypeScript application. All rendering happens on the server; the browser receives plain HTML that works well and looks good.

## Core

| Layer | Choice | Rationale |
|---|---|---|
| Language | TypeScript | Type safety end-to-end; satisfies Mary's requirement |
| Runtime | Node.js | Stable, well-supported, vast ecosystem |
| Server framework | **Hono** | Lightweight, TypeScript-first, fast, excellent DX; routes and middleware feel natural |
| Templating | Hono JSX (server-side) | JSX without React overhead; components are just functions |
| CSS | **Pico CSS** (`@picocss/pico`) + project overrides | Semantic, class-light baseline; typography, focus, and nav styles built in; no CSS build step |
| UI | **Responsive, mobile-first layout** | Pico scales typography and spacing; viewport and color-scheme meta in `Layout.tsx` — works on phone through desktop |

## Styling

AgentClinic uses a two-layer CSS stack:

- **Pico CSS** — served from `node_modules/@picocss/pico/css/pico.min.css` at `/styles/pico.min.css`; linked first in `Layout.tsx`
- **Project overrides** — `src/styles/layout.css` at `/styles/layout.css`; brand colours, layout tweaks, and nav active-state emphasis only

Use Pico semantic markup (`header.container`, `nav` > `ul` > `li` > `a`, `main.container`) so the baseline styles apply without utility classes.

## Responsive design

All AgentClinic pages share a responsive foundation:

- **Pico CSS** — fluid typography and spacing by default; horizontal nav flex layout with natural wrap on narrow viewports
- **Viewport meta** — `<meta name="viewport" content="width=device-width, initial-scale=1" />` in `Layout.tsx` so mobile browsers scale correctly
- **Color scheme** — `<meta name="color-scheme" content="light dark" />` so Pico respects system light/dark preference
- **No client framework** — responsiveness is achieved with Pico CSS and a thin override stylesheet only

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
