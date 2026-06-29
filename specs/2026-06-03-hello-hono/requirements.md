# Requirements — Hello Hono (Phase 1)

## Roadmap reference

This slice implements **Phase 1 — Hello Hono** from `specs/roadmap.md`:

- Install and configure Hono with `tsx` dev server
- Single `/` route — extended in this spec to serve a minimal HTML home page (see scope below)
- Confirm TypeScript types work end-to-end

## Scope

The `/` route will return a minimal **HTML page** rendered via Hono JSX, not a bare text string. This is the first activation of the chosen templating layer (`specs/tech-stack.md`) and makes the initial deliverable visibly useful in a browser without adding any domain features.

The page must:
- Return `Content-Type: text/html` with status `200`
- Display the clinic name as a heading
- Include the tagline **`AgentClinic is open for business`** in the body
- Use a shared **layout** with header, main, and footer regions rendered via Hono JSX
- Link an external stylesheet for base layout styles
- Follow **responsive design** per `specs/tech-stack.md`: viewport meta in `Layout`, mobile-first CSS with media queries, fluid spacing on all screen sizes

### Layout file structure

Layout subcomponents are **one component per file** under `src/components/layout/`:

| File | Responsibility |
|------|----------------|
| `Layout.tsx` | Document shell; composes `Header`, `Main`, and `Footer` via imports |
| `Header.tsx` | Shared header (clinic name heading) |
| `Main.tsx` | Page body wrapper; receives page content as `children` |
| `Footer.tsx` | Shared footer copy |

`Layout.tsx` must not inline header, main, or footer markup — each region is imported from its own file.

No navigation, database, or domain data (agents, ailments, etc.) is included.

## Mission alignment

From `specs/mission.md`, AgentClinic is a server-side wellness platform for AI agents. Phase 1 establishes the **technical foundation** (Hono + Hono JSX + TypeScript + dev workflow) so later phases can add agents, ailments, therapies, appointments, and Mary's dashboard on a stable stack.

## Tech stack alignment

Per `specs/tech-stack.md`:

| Decision | Choice for this phase |
|----------|------------------------|
| Language | TypeScript |
| Runtime | Node.js |
| Server | **Hono** |
| Templating | **Hono JSX** — home page and shared layout components |
| CSS | Plain CSS file (`src/styles/layout.css`) linked from `Layout`; mobile-first responsive rules; served as a static asset |
| Data | No database in Phase 1 |
| Dev runner | `tsx` for running TypeScript without a separate compile step in dev |
| Testing | **Vitest** — `npm test` validates routes, stylesheet, layout structure, and responsive markup/CSS |

## Out of scope

- Navigation menus, multi-page routing beyond `/`, or a CSS custom-properties design system beyond base layout styles.
- SQLite, agents, ailments, therapies, appointments, dashboard (later roadmap phases).
- React or client-side frameworks.
- Docker, ORM, production hosting decisions beyond "runs locally with `tsx`".
- CI workflow, lint, or formatting enforcement (Vitest is in scope; CI wiring is not).

## Open decisions

| Decision | Resolution |
|----------|------------|
| Plain text vs. HTML for `/` | **HTML via Hono JSX** — first use of the templating layer, minimal HTML shell only |
| CSS for home page | **External stylesheet** — `layout.css` linked from `Layout.tsx`, served at `/styles/layout.css`, with mobile-first responsive rules |
| Responsive UI | **Required** — viewport meta in `Layout.tsx`; fluid layout tokens and `@media` queries in `layout.css` |
