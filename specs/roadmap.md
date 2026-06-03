# AgentClinic — Roadmap

Phases are intentionally **tiny**. Each phase should end with something **demoable** and **mergeable**.

**Constitution choice:** the **first product slice** after bootstrap is a **thin vertical slice** (one agent → one ailment → one therapy note, read-only), not an extended empty shell phase.

## Phase 0 — Project heartbeat

- Initialize repo (Next.js + TypeScript per `tech-stack.md`, or documented alternative).
- Lint, format, and **CI** (typecheck + lint + test runner wired, even if tests are empty).
- `README`: install, dev, test commands.
- **Exit**: a new contributor can run the app locally in one documented path.

## Phase 1 — Thin vertical slice (read-only) — **first product slice**

- **One agent** profile (fixture or seed).
- **One ailment** tied to that agent.
- **One therapy** note (read-only text).
- Data served via **server-side TypeScript** (e.g. loader / RSC / route handler)—no client-authoritative domain logic.
- Minimal layout acceptable; focus on end-to-end truth of the narrative.
- **Exit**: stakeholder demo matches Susan's narrative at minimum viable depth.

## Phase 2 — Design tokens + dashboard shell

- Global layout: header / nav / content region for **agent** vs **staff** contexts (stub routes OK).
- Typography, spacing, color tokens; responsive pass; polish for Steve's "attractive / modern browser" bar.
- Refactor Phase 1 screens into the shell without changing domain behavior.
- **Exit**: same vertical slice, visibly intentional UI; still read-only.

## Phase 3 — Domain stubs in code

- Shared types/schemas for `Agent`, `Ailment`, `Therapy`, `Appointment` (appointment can remain non-functional).
- Repository boundary behind an interface (in-memory or file-backed until DB phase).
- **Exit**: adding a second entity does not require rewriting the first screen.

## Phase 4 — Booking skeleton (fake persistence)

- Appointment UI: pick slot → confirm → "saved" (mock or local only).
- Clear **"simulated"** labeling in UI.
- **Exit**: booking flow demo without crashes; no external calendar integration yet.

## Phase 5 — Persistence + migrations

- **PostgreSQL** (recommended) with migrations; vertical slice data from DB.
- **Exit**: restart retains demo data.

## Phase 6 — Auth split (agents vs staff)

- Auth mechanism chosen; role-based access for dashboard areas.
- **Exit**: agents cannot perform staff-only mutations; failures are explicit.

## Phase 7 — Hardening pass

- Observability (structured logs), error boundaries, empty states.
- One lightweight performance gate (e.g. bundle budget or Lighthouse CI).
- **Exit**: quality bar in `tech-stack.md` is measurable on CI.

---

**Ordering rule:** do **not** skip **Phase 1**—the read-only vertical slice is the reference shape for everything after.
