# Requirements — Navigation & Layout Polish (Phase 2)

## Roadmap reference

This slice implements **Phase 2 — Navigation & Layout Polish** from `specs/roadmap.md`:

- Add **site navigation** (header nav linking home and future sections)
- Extend shared CSS — typography scale, focus styles, nav layout **responsive across breakpoints**
- Confirm every new route continues to render inside `Layout`
- Vitest coverage for nav markup and active-link behaviour

## Scope

Phase 1 delivered the layout shell (`Header`, `Main`, `Footer`, `Layout`) and a hand-rolled responsive CSS foundation. Phase 2 finishes the **base layout** experience by adopting **Pico CSS** as the design baseline, adding navigation, and retaining a thin project override stylesheet.

### Pico CSS adoption

Introduce [**Pico CSS**](https://picocss.com/) (`@picocss/pico`) as the primary stylesheet:

- **Semantic, class-light** — Pico styles native HTML (`header`, `nav`, `main`, `footer`, `a`, typography) with minimal custom classes.
- **Responsive by default** — fluid typography and spacing without hand-rolled media-query scales.
- **Accessible focus** — Pico provides `:focus-visible` and link styles out of the box.
- **No client JS** — aligns with the server-rendered stack; no build step beyond `npm install`.

Delivery:

| Asset | Source | Served at |
|-------|--------|-----------|
| Pico | `node_modules/@picocss/pico/css/pico.min.css` | `/styles/pico.min.css` |
| Overrides | `src/styles/layout.css` | `/styles/layout.css` (existing path) |

`Layout.tsx` loads **Pico first**, then `layout.css`, so project-specific tweaks win on cascade. Add `<meta name="color-scheme" content="light dark" />` per Pico's starter template.

`layout.css` is **slimmed down** — remove Phase 1 hand-rolled typography, body reset, and region rules that Pico already provides. Keep only AgentClinic-specific overrides (e.g. brand accent, active-nav emphasis if needed beyond Pico's `[aria-current]` styling).

Update `specs/tech-stack.md` during implementation to record Pico CSS as the CSS framework choice.

### Navigation

- Add a dedicated **`Nav.tsx`** component under `src/components/layout/` (one component per file).
- `Header.tsx` composes `Nav` alongside the clinic branding.
- Use **Pico's nav markup** — `<nav aria-label="Main"><ul><li><a href="…">…</a></li></ul></nav>` inside a `<header class="container">` (or equivalent Pico landmark pattern).
- Nav links for this phase:

  | Label | Path | Behaviour |
  |-------|------|-----------|
  | Home | `/` | Existing home page |
  | Agents | `/agents` | **Coming soon** placeholder page inside `Layout` until Phase 3 |

- **Active link** — exact pathname match: set `aria-current="page"` on the matching `<a>`. Pico styles `[aria-current]` on nav links; add a project override class only if the default emphasis is insufficient.
- **Responsive layout** — Pico's horizontal `<nav><ul>` flex layout; links wrap naturally on narrow viewports (no hamburger menu, no client-side JS).

### Coming soon page

- **GET `/agents`** returns a minimal page rendered inside `Layout` with a clear "coming soon" message (e.g. agent listings arrive in a future phase).
- Use Pico semantic structure (`<main class="container">`, headings, paragraphs).
- Validates that new pages continue to use the shared layout and nav.

### Routing

- Register **GET `/agents`** in `src/app.ts` alongside existing routes.
- All pages (`/`, `/agents`) render inside `Layout`.

## Mission alignment

From `specs/mission.md`, AgentClinic is a server-side wellness platform for AI agents. Phase 2 makes the site **navigable** and visually polished so later phases (agent list, ailments, therapies, dashboard) can add pages that inherit a consistent header, nav, and Pico-based responsive foundation. Mary's dashboard and agent workflows will plug into this nav shell.

## Tech stack alignment

Per `specs/tech-stack.md` (updated as part of this phase):

| Decision | Choice for this phase |
|----------|------------------------|
| Templating | Hono JSX — `Nav.tsx`, coming-soon page, existing `Layout` |
| CSS | **Pico CSS** (`@picocss/pico`) + thin `layout.css` overrides |
| Static assets | Serve Pico from `node_modules` via existing `serveStatic` middleware |
| Data | No database — `/agents` is a static placeholder |
| Testing | **Vitest** — comprehensive nav, active-link, Pico link presence, and override CSS coverage |

## Stakeholder decisions (captured 2026-06-29)

| Decision | Resolution |
|----------|------------|
| Nav links | **Home + Agents** — Agents prep for Phase 3 |
| Placeholder behaviour | **`/agents` → coming soon page** inside `Layout` |
| Active link | **Exact pathname match** + `aria-current="page"` (Pico-native) |
| Responsive nav | **Horizontal Pico nav** — flex `ul`/`li`, wraps on narrow screens |
| Component structure | **`Nav.tsx`** separate file; `Header` composes it |
| CSS approach | **Pico CSS** for baseline typography, focus, and nav; thin `layout.css` overrides |
| Test depth | **Comprehensive** — markup, active state, Pico + override stylesheets |

## Out of scope

- SQLite, agent data, or a real agent list (Phase 3).
- Links to Ailments, Therapies, Dashboard (later roadmap phases).
- Hamburger menu or collapse toggle (deferred to Phase 9 polish if needed).
- Prefix-based active matching for nested routes (e.g. `/agents/:id`) — exact match only in Phase 2; revisit in Phase 4.
- Pico SASS compilation or custom theme builds — use the prebuilt `pico.min.css` only.
- Auth, forms, error pages (later phases).

## Open decisions

None — all Phase 2 decisions resolved with stakeholder input above.
