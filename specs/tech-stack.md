# AgentClinic — Tech stack

## Intent

Stakeholders asked for a **popular TypeScript** stack, a **dashboard** for agents and staff, and a **modern browser** experience. This constitution **commits to server-side TypeScript** (types and business rules run on the server by default) and names a **recommended web framework** so implementation does not stall on bikeshedding.

## Server-side TypeScript (locked)

| Rule | Meaning |
|------|--------|
| **Server-first** | Data loading, mutations, authorization checks, and domain validation run in **server-side TypeScript** (Route Handlers, server actions, loaders, or a dedicated Node API—not "client-only" CRUD). |
| **Shared types** | DTOs and domain types live in packages or modules importable from server code; client bundles only what is safe and intentional. |
| **Node.js LTS** | Runtime for server code; local dev and CI match production class behavior. |

## Recommended framework: **Next.js (App Router)**

| Aspect | Choice |
|--------|--------|
| Framework | **Next.js** (App Router), **TypeScript** strict mode |
| UI | **React**; pair with a **mainstream accessible** component library once layout tokens exist (e.g. Radix-based kits or equivalent—pick one and record it in the repo README). |
| Data | **PostgreSQL** for production-shaped environments; **SQLite** allowed only for local demos with an explicit "non-production" note. |
| API surface | **Route Handlers** and/or **Server Actions** for mutations; JSON contracts versioned or namespaced as the API grows. |

**Why this recommendation:** strong ecosystem and hiring familiarity (Mary's "popular stack"), built-in server rendering and routing for dashboards, straightforward deployment story, and a single codebase where server TS and UI evolve together.

### Documented alternative

- **Remix** (or React Router framework mode) remains a valid substitute if the team standardizes on it—same constraints: server-side loaders/actions, TypeScript strict, Postgres. If the team switches, update this file in the same PR as the scaffold change.

## Client layer

- **Web standards** — semantic HTML, responsive CSS, progressive enhancement where practical (Steve's modern-browser goal).
- **No "secret" business rules in the browser** — UI may cache for UX, but authority stays on the server.

## Quality bar (applies from Phase 0)

- **CI**: lint + typecheck + unit tests on PR; default branch stays green.
- **Browsers**: last two major versions of Chrome, Firefox, Safari, Edge unless narrowed with written rationale.
- **Observability**: structured logs + basic request tracing before any multi-tenant deployment.

## Repository layout (suggested)

- `apps/web` — Next.js app (or repo root as single app if monorepo not needed yet)
- `packages/shared` — shared types, validation schemas (Zod or similar), constants

Adjust to match the generator output; the rule is **one deployable app** until a split is justified.

## Still open (decide before booking mutates real data)

- **Auth provider / session model** — must distinguish **agents** vs **staff**; choose when Phase "auth split" on the roadmap approaches.
- **Hosting** — Vercel, Node container, or internal platform; does not block local development.

## Out of scope for v0 stack

- Multi-region active-active, Kubernetes mandates, or microservices decomposition before the first vertical slice ships.
