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

No navigation, layout system, CSS file, database, or domain data (agents, ailments, etc.) is included.

## Mission alignment

From `specs/mission.md`, AgentClinic is a server-side wellness platform for AI agents. Phase 1 establishes the **technical foundation** (Hono + Hono JSX + TypeScript + dev workflow) so later phases can add agents, ailments, therapies, appointments, and Mary's dashboard on a stable stack.

## Tech stack alignment

Per `specs/tech-stack.md`:

| Decision | Choice for this phase |
|----------|------------------------|
| Language | TypeScript |
| Runtime | Node.js |
| Server | **Hono** |
| Templating | **Hono JSX** — activated for the home page; first use of the stack's chosen renderer |
| CSS | Not in scope — no stylesheet required for the minimal page |
| Data | No database in Phase 1 |
| Dev runner | `tsx` for running TypeScript without a separate compile step in dev |

## Out of scope

- Full layout/nav component, shared header/footer, CSS custom properties system (Phase 2).
- SQLite, agents, ailments, therapies, appointments, dashboard (later roadmap phases).
- React or client-side frameworks.
- Docker, ORM, production hosting decisions beyond "runs locally with `tsx`".
- Automated tests, CI, lint, or formatting enforcement (may be added when Vitest is introduced).

## Open decisions

| Decision | Resolution |
|----------|------------|
| Plain text vs. HTML for `/` | **HTML via Hono JSX** — first use of the templating layer, minimal HTML shell only |
| CSS for home page | No external stylesheet required; bare semantic HTML is acceptable |
