# Validation — MVP (Phases 3–8)

How we know this implementation **succeeded** and is **safe to merge** as a single PR from `feature/mvp` → `master`.

## Automated checks (required)

Run from the project root after `npm install`:

```bash
npm run typecheck
npm test
```

Both commands must exit **0**.

### Test coverage strategy — critical paths

| Area | Depth | Expected suites |
|------|-------|-----------------|
| Database | Light | Migration runs; tables exist; minimum seed counts |
| Agent list (Phase 3) | Light | GET `/agents` — 200, seeded names, layout |
| Agent detail (Phase 4) | Light | GET `/agents/:id` — fields present; unknown id handled |
| Ailments (Phase 5) | Light | GET `/ailments` — 200, seeded content |
| Therapies (Phase 6) | Light | GET `/therapies` — 200, seeded content |
| **Booking (Phase 7)** | **Comprehensive** | Form on detail page; POST creates `pending` appointment; validation rejects bad input; confirmation page shows details |
| **Dashboard (Phase 8)** | **Comprehensive** | Summary counts match seed; table views render; Dashboard nav active |
| Navigation | Light | All five links present; `aria-current` on exact pathname match |
| Layout / styles | Light | Existing Phase 1–2 suites still pass; Pico + layout.css served |

Reuse shared helpers in `src/test/helpers.ts` (`requestApp`, `renderPage`).

### Comprehensive booking tests (minimum)

| Test | Pass condition |
|------|----------------|
| Form present | Agent detail HTML includes booking form with datetime field |
| Happy path POST | Valid POST creates row in `appointments` with status `pending` |
| Validation | Missing or invalid datetime returns error (4xx), no row created |
| Confirmation | Success redirects or links to confirmation showing agent + datetime |

### Comprehensive dashboard tests (minimum)

| Test | Pass condition |
|------|----------------|
| Agent count | Matches number of seeded agents |
| Open appointments | Count of `pending` appointments matches seed |
| Ailments in-flight | Count of agents with ≥1 ailment matches seed |
| Tables | At least one table section renders rows from seed data |

## Manual checks (required spot-checks)

Run `npm run dev` and verify in a modern browser at **~375px** and **~1280px** widths:

| Route | Check |
|-------|-------|
| `/` | Home loads; nav shows all five links; Home active |
| `/agents` | Table/list of 8–10 agents; no horizontal scroll; links to detail |
| `/agents/:id` | Profile fields visible; ailments listed; booking form present |
| `/ailments` | Catalog list; readable on mobile |
| `/therapies` | Catalog list with ailment associations |
| `/dashboard` | Summary counts visible; tables readable |
| Booking flow | Submit form on agent detail → confirmation page shows `pending` booking |
| Keyboard | Tab through nav links; Pico focus ring visible |

## Merge criteria summary

| Criterion | Pass condition |
|-----------|----------------|
| Branch | `feature/mvp` contains all Phases 3–8 |
| Database | Single init migration; demo seed applied; `better-sqlite3` working |
| Routes | `/agents`, `/agents/:id`, `/ailments`, `/therapies`, `/dashboard` + booking POST + confirmation |
| Nav | Home, Agents, Ailments, Therapies, Dashboard in header |
| Active nav | Exact pathname match only |
| Agent detail | name, model type, status, presenting complaints |
| Appointment status | `pending` and `confirmed` supported in schema |
| Layout | All pages inside `Layout` with Pico landmarks |
| Types | `npm run typecheck` passes |
| Tests | `npm test` passes; booking + dashboard comprehensive; other routes light |
| Scope | No Phase 9/10 features, auth, or full dashboard CRUD |
| Docs | `CHANGELOG.md` updated |

## Explicitly not required for this merge

- Phase 9 accessibility audit or hamburger nav
- Phase 10 custom 404/500 pages, sanitization middleware, logging
- Prefix-based active nav for `/agents/:id`
- Full CRUD on dashboard
- Therapist profiles, email, auth
- CI workflow changes

## Reviewer checklist

- [ ] Checked out `feature/mvp` and ran `npm install`.
- [ ] `npm run typecheck` passes with no errors.
- [ ] `npm test` passes with no failures.
- [ ] Changes match `specs/2026-06-30-mvp/requirements.md` scope.
- [ ] Database migration + seed runs cleanly on fresh checkout.
- [ ] Browser spot-check: all routes at mobile (~375px) and desktop (~1280px).
- [ ] Booking flow: form submit → confirmation with `pending` status.
- [ ] Dashboard counts align with visible seed data.
- [ ] No coming-soon placeholder remains at `/agents`.
