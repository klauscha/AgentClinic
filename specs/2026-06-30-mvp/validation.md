# Validation — MVP (Phases 3–8)

How we know this implementation **succeeded** and is **safe to merge** as a single PR from `feature/mvp` → `master`.

## Automated checks (required)

Run from the project root after `npm install`:

```bash
npm run typecheck
npm test
```

Both commands must exit **0**.

## Test infrastructure

| File | Role |
|------|------|
| `vitest.setup.ts` | Sets `DATABASE_PATH=:memory:` before any test file loads |
| `src/test/db.ts` | `setupTestDb()` — `resetDb()` + `initDb()` for isolated state |
| `src/test/helpers.ts` | `requestApp()`, `renderPage()` |
| `src/db/seed.ts` | Exported `SEED_*` constants — single source of truth for count assertions |

DB-touching suites call `setupTestDb()` in `beforeEach`. Import `SEED_*` constants rather than duplicating literal counts.

## Test coverage strategy — critical paths

| Area | Depth | Expected suites |
|------|-------|-----------------|
| Database | Light | `src/db/db.test.ts` — tables exist; `SEED_*` counts |
| Agent list (Phase 3) | Light | `src/routes/agents.route.test.ts` — 200, `Claude the Anxious`, layout |
| Agent detail (Phase 4) | Light | `src/routes/agent-detail.route.test.ts` — fields; 404 text for id 9999 |
| Ailments (Phase 5) | Light | `src/routes/ailments.route.test.ts` — seeded ailment names |
| Therapies (Phase 6) | Light | `src/routes/therapies.route.test.ts` — seeded therapy names |
| **Booking (Phase 7)** | **Comprehensive** | `src/routes/booking.route.test.ts` |
| **Dashboard (Phase 8)** | **Comprehensive** | `src/routes/dashboard.route.test.ts` |
| Navigation | Light | `src/components/layout/nav.test.tsx` — five links; no active on `/agents/1` |
| Layout / styles | Light | Phase 1–2 suites still pass |

### Comprehensive booking tests (minimum)

| Test | Pass condition |
|------|----------------|
| Form present | `action="/agents/1/book"`, `name="scheduled_at"`, `type="datetime-local"` |
| Happy path POST | `303` redirect; appointment count = `SEED_APPOINTMENT_COUNT + 1`; latest status `pending` |
| Validation | Invalid/missing datetime → `400`, error copy in body, count unchanged |
| Confirmation | Follow redirect → `200`, agent name, `pending` status |

### Comprehensive dashboard tests (minimum)

| Test | Pass condition |
|------|----------------|
| Agent count | `<strong>${SEED_AGENT_COUNT}</strong>` |
| Open appointments | `<strong>3</strong>` pending (3 of 4 seed appointments) |
| Ailments in-flight | `<strong>${SEED_AGENTS_WITH_AILMENTS}</strong>` |
| Tables | `Claude the Anxious`, `context-window claustrophobia`, `Recent appointments` |
| Nav | `href="/dashboard" aria-current="page"` |

## Manual checks (required spot-checks)

Run `npm run dev` and verify in a modern browser at **~375px** and **~1280px** widths:

| Route | Check |
|-------|-------|
| `/` | Home loads; nav shows all five links; Home active |
| `/agents` | Table of 9 agents; no horizontal scroll; links to detail |
| `/agents/1` | Profile fields; ailments listed; booking form present |
| `/ailments` | Catalog with agent count column; readable on mobile |
| `/therapies` | Catalog with ailment names per therapy |
| `/dashboard` | Three summary cards; three tables; counts match visible data |
| Booking flow | Submit form on `/agents/1` → confirmation shows `pending` |
| `/agents/9999` | Plain-text 404 (not styled error page) |
| Keyboard | Tab through nav links; Pico focus ring visible |

## Merge criteria summary

| Criterion | Pass condition |
|-----------|----------------|
| Branch | `feature/mvp` contains all Phases 3–8 |
| Database | `migrations/001_init.sql`; seed in `src/db/seed.ts`; `better-sqlite3` working |
| Routes | Per **Appendix C** in `requirements.md` |
| Nav | Five links; exact-match active state only |
| Schema | Matches **Appendix A**; no `therapist_id` on appointments |
| `confirmed` status | In schema + seed; no staff confirm UI in MVP |
| Layout | Catalog/dashboard pages inside `Layout`; 404s plain text |
| Types | `npm run typecheck` passes |
| Tests | `npm test` passes; booking + dashboard comprehensive |
| Docs | `CHANGELOG.md` updated; `requirements.md` appendices present |
| Scope | No Phase 9/10, therapist profiles, or dashboard CRUD |

## Explicitly not required for this merge

- Phase 9 accessibility audit or hamburger nav
- Phase 10 styled 404/500 pages, sanitization middleware, logging
- Prefix-based active nav for `/agents/:id`
- Staff action to confirm appointments (`pending` → `confirmed`)
- Agent detail → recommended therapies
- Therapist column on appointments
- CI workflow changes

## Reviewer checklist

- [ ] Checked out `feature/mvp` and ran `npm install`.
- [ ] `npm run typecheck` passes with no errors.
- [ ] `npm test` passes with no failures.
- [ ] Changes match `specs/2026-06-30-mvp/requirements.md` (including appendices).
- [ ] `npm run db:setup` runs cleanly on fresh checkout.
- [ ] Browser spot-check: all routes at mobile (~375px) and desktop (~1280px).
- [ ] Booking flow: form submit → `303` → confirmation with `pending` status.
- [ ] Dashboard counts align with `SEED_*` constants.
- [ ] No coming-soon placeholder remains at `/agents`.
