# Roadmap

Phases are intentionally small — each one is a shippable slice of work, independently reviewable and testable.

**Cross-cutting standards** (apply from Phase 1 onward):

- **Responsive UI** — viewport meta, mobile-first CSS, fluid spacing (`specs/tech-stack.md`)
- **Vitest validation** — `npm test` must pass before merge; add tests with each new route, component, or stylesheet
- **Shared layout** — new pages render inside `Layout` (`Header`, `Main`, `Footer`)

---

## Phase 1 — Hello Hono ✅ Complete

- Install and configure Hono with `tsx` dev server
- Extract `src/app.ts` (testable app) and `src/index.ts` (server entry)
- Single **GET `/`** route returning an HTML home page via Hono JSX
- Tagline **`AgentClinic is open for business`** visible in the body
- TypeScript end-to-end (`npm run typecheck`)
- Shared layout — `Header`, `Main`, `Footer`, and `Layout` (one component per file)
- Linked `src/styles/layout.css` served at `/styles/layout.css`
- **Responsive base** — viewport meta, mobile-first CSS, fluid spacing tokens, `clamp()` typography
- **Vitest suite** — route, component, page, and stylesheet tests (`npm test`)

## Phase 2 — Navigation & Layout Polish

Phase 1 delivered the layout shell and responsive CSS foundation. Phase 2 finishes the **base layout** experience:

- Add **site navigation** (header nav linking home and future sections)
- Extend shared CSS — typography scale, focus styles, nav layout **responsive across breakpoints**
- Confirm every new route continues to render inside `Layout`
- Vitest coverage for nav markup and active-link behaviour

## Phase 3 — Agent List

- SQLite database + first migration (`agents` table)
- Seed a handful of fictional agents
- `/agents` page listing all agents (responsive table/list layout)
- Vitest tests for route and list rendering

## Phase 4 — Agent Detail

- `/agents/:id` page showing a single agent's profile
- Name, model type, current status, presenting complaints
- Vitest tests for route and detail rendering

## Phase 5 — Ailments Catalog

- `ailments` table + seed data (e.g., "context-window claustrophobia", "prompt fatigue")
- `/ailments` list page
- Link agents to one or more ailments

## Phase 6 — Therapies Catalog

- `therapies` table + seed data
- `/therapies` list page
- Map ailments → recommended therapies

## Phase 7 — Appointment Booking

- `appointments` table (agent, therapist, datetime, status)
- Form to book an appointment from an agent's detail page
- Basic validation and confirmation page

## Phase 8 — Staff Dashboard

- `/dashboard` with summary counts: agents, open appointments, ailments in-flight
- Simple table views for staff to manage records
- Mary's dashboard is now real

## Phase 9 — Polish & Accessibility

- Semantic HTML audit across all pages
- Keyboard navigation and focus styles (beyond Phase 2 baseline)
- Advanced responsive polish (complex tables, nav collapse) as new UI patterns are added

## Phase 10 — Hardening

- Error pages (404, 500)
- Input sanitization on all forms
- Basic logging middleware

---

Later phases (not yet planned): auth, email notifications, therapist profiles, reporting.
