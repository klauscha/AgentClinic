# Plan — Navigation & Layout Polish (Phase 2)

Numbered task groups for implementation. Order matters within each group where noted.

## 1. Pico CSS setup

1. Add `@picocss/pico` as an npm dependency.
2. Export `picoCssHref` (`/styles/pico.min.css`) from `src/styles/index.ts` alongside `layoutCssHref`.
3. Extend static serving in `src/app.ts` (or `src/index.ts`) so `GET /styles/pico.min.css` serves `node_modules/@picocss/pico/css/pico.min.css`.
4. Update `Layout.tsx`:
   - Add `<meta name="color-scheme" content="light dark" />` in `<head>`.
   - Link Pico stylesheet **before** `layout.css`.
5. Refactor `layout.css` — remove rules Pico already provides (body reset, base typography, generic link styles). Keep AgentClinic-specific overrides only (brand accent, layout tweaks, optional active-nav class).
6. Refactor layout markup for Pico landmarks — e.g. `<header class="container">`, `<main class="container">`, semantic `<footer>` as appropriate.
7. Update `specs/tech-stack.md` to document Pico CSS as the CSS framework.

## 2. Navigation component

1. Create `src/components/layout/Nav.tsx` — accepts `currentPath` as a prop.
2. Render Pico nav structure: `<nav aria-label="Main"><ul>…</ul></nav>` with `<li><a href="…">` items.
3. Set `aria-current="page"` on the link whose `href` exactly matches `currentPath`.
4. Update `Header.tsx` to render branding + `Nav` inside a Pico-friendly `<header class="container">`.
5. Pass `currentPath` from the page/route layer through `Layout` → `Header` → `Nav`.

## 3. Path propagation to layout

1. Extend `Layout.tsx` to accept a `currentPath` prop and pass it to `Header` → `Nav`.
2. Update `Home.tsx` to pass `currentPath="/"` when rendering `Layout`.
3. Ensure the pattern is reusable so Phase 3+ pages only supply their path.

## 4. Coming soon page and route

1. Create `src/pages/ComingSoon.tsx` (or `AgentsComingSoon.tsx`) — minimal Pico-styled content explaining agent listings are coming soon.
2. Register **GET `/agents`** in `src/app.ts` to render the page inside `Layout` with `currentPath="/agents"`.
3. Confirm both `/` and `/agents` return `200` + `text/html`.

## 5. Vitest coverage

1. Add `src/components/layout/nav.test.tsx` — Pico nav structure (`nav`, `ul`, `li`, `a`); `aria-current="page"` on exact pathname match.
2. Add `src/routes/agents.route.test.ts` — GET `/agents` returns 200, coming soon copy, layout shell, Agents link active.
3. Update `src/routes/home.route.test.ts` — nav present; Home link active on `/`; Pico stylesheet linked in HTML.
4. Update `src/routes/styles.route.test.ts` — `GET /styles/pico.min.css` returns 200 + `text/css`; `layout.css` still served; override rules present where expected.
5. Update `src/styles/styles.test.ts` — exports `picoCssHref` and `layoutCssHref`.
6. Update layout component tests for refactored Header/Layout markup and props.
7. Run `npm run typecheck` and `npm test` — both must pass.

## 6. Documentation and merge prep

1. Confirm no Phase 3+ features (database, real agent list) are included.
2. Spot-check in browser: `/` and `/agents` on narrow and wide viewports; tab through nav links to verify Pico focus styles.
