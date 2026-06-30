# Requirements — MVP (Phases 3–8)

## Roadmap reference

Phases **1–2 are complete**. This slice delivers the **minimum viable product** by implementing **Phases 3–8** from `specs/roadmap.md`:

| Phase | Feature |
|-------|---------|
| 3 | Agent List |
| 4 | Agent Detail |
| 5 | Ailments Catalog |
| 6 | Therapies Catalog |
| 7 | Appointment Booking |
| 8 | Staff Dashboard |

**Explicitly deferred** to post-MVP:

- Phase 9 — Polish & Accessibility
- Phase 10 — Hardening (404, sanitization, logging)
- Later phases — auth, email, therapist profiles, reporting

## Scope

### Database

- **SQLite** via `better-sqlite3` (per `specs/tech-stack.md`)
- **Single init migration** — one SQL file creating all MVP tables and indexes upfront
- **Demo-ready seed data** applied after migration:
  - 8–10 fictional agents with varied statuses
  - 10+ ailments (e.g. "context-window claustrophobia", "prompt fatigue")
  - 10+ therapies with ailment → therapy mappings
  - Sample appointments linking agents to datetime slots
- Plain SQL migrations — no ORM

#### Tables (MVP)

| Table | Purpose |
|-------|---------|
| `agents` | Agent profiles |
| `ailments` | Catalog of agent ailments |
| `therapies` | Catalog of therapies |
| `agent_ailments` | Many-to-many: agents ↔ ailments |
| `ailment_therapies` | Many-to-many: ailments ↔ recommended therapies |
| `appointments` | Booked sessions (agent, datetime, status) |

#### Appointment status values

- `pending` — newly booked, awaiting confirmation
- `confirmed` — staff or system confirmed the slot

### Navigation

Extend header nav to all MVP sections:

| Label | Path |
|-------|------|
| Home | `/` |
| Agents | `/agents` |
| Ailments | `/ailments` |
| Therapies | `/therapies` |
| Dashboard | `/dashboard` |

- **Active link** — **exact pathname match** only (`aria-current="page"`). Nested routes such as `/agents/:id` do **not** highlight the Agents nav link (consistent with Phase 2; revisit post-MVP).
- Replace the Phase 2 `/agents` coming-soon placeholder with the real agent list.
- Use Pico semantic nav markup (`nav` > `ul` > `li` > `a`).

### Phase 3 — Agent List

- **GET `/agents`** — responsive table or list of all agents
- Columns/at minimum: name, model type, status
- Each row links to the agent detail page
- Vitest: route returns 200, list renders seeded agents

### Phase 4 — Agent Detail

- **GET `/agents/:id`** — single agent profile inside `Layout`
- Fields: **name**, **model type**, **current status**, **presenting complaints**
- Show linked ailments for this agent
- Vitest: route returns 200 for valid id; 404 or error handling for unknown id (light coverage — full error pages deferred to Phase 10)

### Phase 5 — Ailments Catalog

- **GET `/ailments`** — list all ailments
- Agents linked to one or more ailments (visible on agent detail and ailments list)
- Vitest: route returns 200, seeded ailments visible

### Phase 6 — Therapies Catalog

- **GET `/therapies`** — list all therapies
- Show which ailments each therapy addresses
- Vitest: route returns 200, seeded therapies visible

### Phase 7 — Appointment Booking

- Booking **form on the agent detail page** (not a separate booking route)
- Fields: datetime (and any minimal fields needed for a valid booking)
- **POST** handler creates an appointment with status `pending`
- Basic server-side validation (required fields, valid datetime)
- **Confirmation page** after successful booking (dedicated route or rendered response)
- Vitest: **comprehensive** — form present on detail page, POST creates record, validation rejects bad input, confirmation shows booking details

### Phase 8 — Staff Dashboard

- **GET `/dashboard`** — Mary's dashboard
- **Summary counts**: total agents, open appointments (`pending`), ailments in-flight (agents with at least one ailment)
- **Simple table views** for staff to review agents, appointments, and ailments (read-only tables acceptable; no full CRUD required)
- Vitest: **comprehensive** — counts match seed data, tables render expected rows

### Cross-cutting (all MVP pages)

- Every route renders inside `Layout` (`Header`, `Main`, `Footer`)
- Pico CSS + `layout.css` overrides
- Responsive layout — no horizontal scroll on phone-width viewports
- `npm run typecheck` and `npm test` pass before merge

## Mission alignment

From `specs/mission.md`, AgentClinic connects distressed AI agents with therapies and lets staff manage the operation. MVP delivers the **core wellness loop**: browse agents and their ailments, see recommended therapies, book an appointment, and review operations from a dashboard. The whimsical domain stays demo-ready for course students and conference booths.

## Tech stack alignment

Per `specs/tech-stack.md`:

| Decision | Choice for MVP |
|----------|----------------|
| Server | Hono + Hono JSX |
| CSS | Pico CSS + `layout.css` overrides |
| Data | SQLite (`better-sqlite3`), plain SQL migrations |
| Testing | Vitest — critical-path depth (see `validation.md`) |
| Client JS | None — server-rendered HTML only |

## Stakeholder decisions (captured 2026-06-30)

| Decision | Resolution |
|----------|------------|
| MVP phases | **3–8** — full catalog + booking + dashboard |
| Post-MVP | **No** Phase 9 or 10 in this branch |
| Nav links | **Home, Agents, Ailments, Therapies, Dashboard** |
| Seed data | **Demo-ready** — 8–10 agents, 10+ ailments/therapies, sample appointments |
| Migrations | **Single init migration** with all MVP tables |
| Agent detail fields | **Roadmap fields** — name, model type, status, presenting complaints |
| Booking UX | **Form on agent detail** → confirmation page |
| Appointment status | **`pending` + `confirmed`** |
| Dashboard | **Roadmap scope** — summary counts + simple table views |
| Active nav | **Exact pathname match** (no prefix for `/agents/:id`) |
| Merge strategy | **Single merge** — all phases land on `feature/mvp` together |
| Spec structure | **Single directory** — `specs/2026-06-30-mvp/` |

## Out of scope

- Phase 9 semantic audit, keyboard polish beyond Pico baseline, hamburger nav
- Phase 10 error pages (404/500), input sanitization middleware, logging
- Auth, email notifications, therapist profiles, reporting
- Full CRUD on dashboard (create/edit/delete records)
- Prefix-based active nav for nested routes
- ORM, Docker, client-side frameworks
- CI workflow changes (unless required for tests to run)

## Open decisions

None — all MVP decisions resolved with stakeholder input above.
