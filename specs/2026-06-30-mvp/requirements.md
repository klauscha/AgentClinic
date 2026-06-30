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
- **Single init migration** — `migrations/001_init.sql` creates all MVP tables and indexes upfront
- **Demo-ready seed data** in `src/db/seed.ts` (TypeScript, not a separate SQL file) — applied after migration when the `agents` table is empty
- Plain SQL migrations — no ORM
- **Runtime path** — `data/agentclinic.db` by default; override with `DATABASE_PATH` env var
- **Lazy init** — first database access runs migration + seed; `npm run db:setup` and `npm run dev` both trigger this
- **`data/`** is gitignored

#### Tables (MVP)

| Table | Purpose |
|-------|---------|
| `agents` | Agent profiles |
| `ailments` | Catalog of agent ailments |
| `therapies` | Catalog of therapies |
| `agent_ailments` | Many-to-many: agents ↔ ailments |
| `ailment_therapies` | Many-to-many: ailments ↔ recommended therapies |
| `appointments` | Booked sessions (agent, datetime, status) — **no therapist column in MVP** |
| `schema_migrations` | Tracks applied migration files |

#### Appointment status values

| Status | Meaning | MVP usage |
|--------|---------|-----------|
| `pending` | Newly booked, awaiting confirmation | Set by booking POST; counted as "open" on dashboard |
| `confirmed` | Staff or system confirmed the slot | **Schema + seed only** — no UI to confirm; deferred until post-MVP staff actions |

> **Roadmap note:** Phase 7 in `specs/roadmap.md` originally mentioned a therapist on appointments. MVP explicitly omits `therapist_id`; therapist profiles are a later phase.

### Navigation

Extend header nav to all MVP sections:

| Label | Path |
|-------|------|
| Home | `/` |
| Agents | `/agents` |
| Ailments | `/ailments` |
| Therapies | `/therapies` |
| Dashboard | `/dashboard` |

- **Active link** — **exact pathname match** only (`aria-current="page"`). Nested routes such as `/agents/:id` and `/appointments/:id/confirmation` do **not** highlight any nav link.
- Replace the Phase 2 `/agents` coming-soon placeholder with the real agent list.
- Use Pico semantic nav markup (`nav` > `ul` > `li` > `a`).

### Phase 3 — Agent List

- **GET `/agents`** — responsive Pico `<table>` of all agents
- Columns: name (linked), model type, status
- Each row links to `/agents/:id`
- Vitest: route returns 200, list renders seeded agents

### Phase 4 — Agent Detail

- **GET `/agents/:id`** — single agent profile inside `Layout`
- Fields: **name**, **model type**, **current status**, **presenting complaints**
- Show linked ailments (name + description); ailment name links to `/ailments` (catalog, not per-ailment detail)
- **No recommended therapies** on agent detail in MVP — therapies are reached via `/therapies` catalog
- Unknown or invalid id → **404 plain text** (`Agent not found`) — not an in-layout error page (Phase 10)
- Vitest: route returns 200 for valid id; 404 for unknown id

### Phase 5 — Ailments Catalog

- **GET `/ailments`** — table of all ailments with name, description, and **agent count** column
- Per-agent ailment names appear on agent detail; ailments list shows counts only (not agent name links)
- Vitest: route returns 200, seeded ailments visible

### Phase 6 — Therapies Catalog

- **GET `/therapies`** — table of therapies with name, description, and comma-separated **ailment names** each therapy addresses
- Vitest: route returns 200, seeded therapies visible

### Phase 7 — Appointment Booking

- Booking **form on the agent detail page** — `POST /agents/:id/book`, not a separate booking GET route
- Form field: `scheduled_at` (`<input type="datetime-local" name="scheduled_at" required>`)
- **POST** creates an appointment with status `pending`
- **Success** → `303` redirect to `GET /appointments/:id/confirmation`
- **Validation failure** (missing/invalid datetime) → `400` + re-rendered agent detail with inline error message; no row created
- **Confirmation page** shows agent name (linked), formatted datetime, and `pending` status
- Vitest: **comprehensive** — form present, POST creates record, validation rejects bad input, confirmation shows details

### Phase 8 — Staff Dashboard

- **GET `/dashboard`** — Mary's dashboard (read-only; no staff actions in MVP)
- **Summary cards** (Pico `<article>` grid):
  - Total agents
  - Open appointments (`pending` count)
  - Ailments in-flight (distinct agents with ≥1 ailment)
- **Read-only tables**:
  - Recent appointments — agent name (linked), scheduled time, status; sorted by `scheduled_at` DESC; up to 10 rows
  - All agents — name (linked), model type, status
  - Ailments overview — ailment name, agents affected count
- **No confirm/edit/delete** — `pending` → `confirmed` workflow deferred to post-MVP
- Vitest: **comprehensive** — counts match seed constants, tables render expected rows

### Cross-cutting (all MVP pages)

- Every **catalog and dashboard** route renders inside `Layout` (`Header`, `Main`, `Footer`)
- **404 responses** for unknown agent/appointment ids are plain text outside `Layout` until Phase 10
- Pico CSS + `layout.css` overrides
- Responsive layout — no horizontal scroll on phone-width viewports
- `npm run typecheck` and `npm test` pass before merge

### Application architecture

| Layer | Location | Responsibility |
|-------|----------|----------------|
| Routes | `src/app.ts` | HTTP method/path, param parsing, status codes, redirects |
| Pages | `src/pages/*.tsx` | Hono JSX components; call repositories; wrap content in `Layout` |
| Repositories | `src/repositories/*.ts` | SQL queries via `getDb()` |
| Database | `src/db/` | Connection, migration, seed |
| Utilities | `src/lib/` | Shared helpers (e.g. datetime parsing) |

No separate controller layer. Pages call repositories directly.

---

## Appendix A — Schema

Source of truth: `migrations/001_init.sql`.

### `agents`

| Column | Type | Notes |
|--------|------|-------|
| `id` | INTEGER PK AUTOINCREMENT | Stable 1-based ids in seed |
| `name` | TEXT NOT NULL | Display name |
| `model_type` | TEXT NOT NULL | Free text in MVP (e.g. `frontier`, `multimodal`, `code`) |
| `status` | TEXT NOT NULL | Free text in MVP (e.g. `waiting`, `in_session`, `recovering`, `stable`, `critical`) |
| `presenting_complaints` | TEXT NOT NULL | Free-text complaint summary |

### `ailments`

| Column | Type | Notes |
|--------|------|-------|
| `id` | INTEGER PK AUTOINCREMENT | |
| `name` | TEXT NOT NULL UNIQUE | |
| `description` | TEXT NOT NULL | |

### `therapies`

| Column | Type | Notes |
|--------|------|-------|
| `id` | INTEGER PK AUTOINCREMENT | |
| `name` | TEXT NOT NULL UNIQUE | |
| `description` | TEXT NOT NULL | |

### `agent_ailments` / `ailment_therapies`

Composite primary keys on foreign key pairs; `ON DELETE CASCADE`.

### `appointments`

| Column | Type | Notes |
|--------|------|-------|
| `id` | INTEGER PK AUTOINCREMENT | |
| `agent_id` | INTEGER NOT NULL FK → `agents` | |
| `scheduled_at` | TEXT NOT NULL | ISO 8601 UTC (stored via `Date.toISOString()`) |
| `status` | TEXT NOT NULL | `CHECK (status IN ('pending', 'confirmed'))` |
| `created_at` | TEXT NOT NULL | SQLite `datetime('now')` default |

---

## Appendix B — Seed contract

Implementation: `src/db/seed.ts`. Exported constants used by tests:

| Constant | Value |
|----------|-------|
| `SEED_AGENT_COUNT` | 9 |
| `SEED_AILMENT_COUNT` | 12 |
| `SEED_THERAPY_COUNT` | 12 |
| `SEED_APPOINTMENT_COUNT` | 4 (3 `pending`, 1 `confirmed`) |
| `SEED_AGENTS_WITH_AILMENTS` | 9 |

**Idempotency:** seed runs only when `SELECT COUNT(*) FROM agents` is 0.

**Stable test fixtures** — tests may assert on these names:

- Agents: `Claude the Anxious` (id 1), `Agent Zero` (id 9)
- Ailments: `context-window claustrophobia`, `prompt fatigue`
- Therapies: `context expansion meditation`, `prompt journaling`

Insert order: agents → ailments → therapies → `agent_ailments` → `ailment_therapies` → appointments. Autoincrement ids are deterministic when seed runs on an empty database.

---

## Appendix C — Route table

| Method | Path | Success | Error |
|--------|------|---------|-------|
| GET | `/` | 200 HTML home | — |
| GET | `/agents` | 200 HTML agent list | — |
| GET | `/agents/:id` | 200 HTML agent detail | 404 text if id invalid or not found |
| POST | `/agents/:id/book` | 303 redirect to confirmation | 404 text if agent not found; 400 HTML detail with error if datetime invalid |
| GET | `/appointments/:id/confirmation` | 200 HTML confirmation | 404 text if not found |
| GET | `/ailments` | 200 HTML ailments catalog | — |
| GET | `/therapies` | 200 HTML therapies catalog | — |
| GET | `/dashboard` | 200 HTML staff dashboard | — |

**Datetime handling:** `src/lib/datetime.ts` — parse `datetime-local` value to ISO UTC; display via `toLocaleString` with medium date + short time.

---

## Appendix D — Cross-link matrix

| From page | Links to |
|-----------|----------|
| `/agents` | `/agents/:id` (per row) |
| `/agents/:id` | `/ailments` (ailment names), `/agents` (back), POST `/agents/:id/book` (form) |
| `/appointments/:id/confirmation` | `/agents/:id` (agent name, back link) |
| `/ailments` | — (no outbound entity links) |
| `/therapies` | — (ailment names are text, not links) |
| `/dashboard` | `/agents/:id` (agent names in tables) |
| Header nav | `/`, `/agents`, `/ailments`, `/therapies`, `/dashboard` |

**Not linked in MVP:** agent detail → recommended therapies; ailments list → individual agents; per-ailment detail pages.

---

## Appendix E — Dashboard layout

```
┌─────────────────────────────────────────────────────────┐
│  Staff dashboard                                        │
├──────────────┬──────────────┬───────────────────────────┤
│ Agents       │ Open appts   │ Ailments in-flight        │
│ (count)      │ (pending)    │ (agents with ≥1 ailment)  │
├──────────────┴──────────────┴───────────────────────────┤
│  Recent appointments (table, ≤10, by scheduled_at DESC) │
├─────────────────────────────────────────────────────────┤
│  Agents (table, all)                                    │
├─────────────────────────────────────────────────────────┤
│  Ailments overview (table, name + agent count)          │
└─────────────────────────────────────────────────────────┘
```

All tables are read-only. No forms or action buttons.

---

## Appendix F — Test infrastructure

| Concern | Resolution |
|---------|------------|
| Test database | `DATABASE_PATH=:memory:` set in `vitest.setup.ts` before app import |
| Isolation | `setupTestDb()` in `src/test/db.ts` — calls `resetDb()` then `initDb()` in `beforeEach` for DB-touching suites |
| App testing | `requestApp(path, init?)` in `src/test/helpers.ts` — `app.fetch` without live server |
| Component testing | `renderPage(Component)` — Hono jsx renderer for markup assertions |
| Seed assertions | Import `SEED_*` constants from `src/db/seed.ts` — do not hardcode counts in multiple places |

---

## Mission alignment

From `specs/mission.md`, AgentClinic connects distressed AI agents with therapies and lets staff manage the operation. MVP delivers the **core wellness loop**: browse agents and their ailments, browse therapies catalog, book an appointment, and review operations from a dashboard. Agent detail → therapy recommendations are **not** wired in MVP; the therapies catalog is the bridge. The whimsical domain stays demo-ready for course students and conference booths.

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
| Seed data | **Demo-ready** — 9 agents, 12 ailments/therapies, 4 sample appointments |
| Migrations | **Single init migration** with all MVP tables |
| Agent detail fields | **Roadmap fields** — name, model type, status, presenting complaints |
| Booking UX | **Form on agent detail** → `303` redirect → confirmation page |
| Appointment status | **`pending` + `confirmed` in schema**; only `pending` set by booking |
| Therapist on appointments | **Omitted** — deferred with therapist profiles |
| Dashboard | **Summary counts + read-only tables**; no staff confirm action |
| Active nav | **Exact pathname match** (no highlight on nested routes) |
| Error pages | **Plain-text 404** for missing entities until Phase 10 |
| Architecture | **Pages → repositories → SQLite** |
| Merge strategy | **Single merge** — all phases on `feature/mvp` |

## Implementation decisions (captured post-build 2026-06-30)

| Decision | Resolution |
|----------|------------|
| Seed format | TypeScript in `src/db/seed.ts` (not `seeds/demo.sql`) |
| DB init timing | Lazy on first `getDb()`; `npm run db:setup` for explicit setup |
| Ailments list agents | **Count column** only, not agent name links |
| Agent → therapy link | **Not in MVP** — use `/therapies` catalog |
| Booking POST path | `POST /agents/:id/book` |
| Confirmation path | `GET /appointments/:id/confirmation` |
| Validation UX | Re-render agent detail with `role="alert"` error |
| Confirmation nav | No active nav link (`currentPath` not matched) |
| `confirmed` workflow | Seed data only; staff confirm deferred |

## Out of scope

- Phase 9 semantic audit, keyboard polish beyond Pico baseline, hamburger nav
- Phase 10 styled error pages (404/500), input sanitization middleware, logging
- Auth, email notifications, therapist profiles, reporting
- Full CRUD on dashboard; `pending` → `confirmed` staff action
- Agent detail → recommended therapies; per-ailment detail pages
- Prefix-based active nav for nested routes
- ORM, Docker, client-side frameworks
- CI workflow changes (unless required for tests to run)

## Open decisions

None — implementation defaults above are the MVP baseline. Revisit **agent → therapy linking** and **staff confirm workflow** in the next spec slice.
