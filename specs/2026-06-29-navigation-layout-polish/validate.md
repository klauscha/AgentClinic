# Validation — Navigation & Layout Polish (Phase 2)

How we know this implementation **succeeded** and is **safe to merge**.

## Automated checks (required)

Run from the project root after `npm install`:

```bash
npm run typecheck
npm test
```

Both commands must exit **0**.

### Expected test coverage (comprehensive)

| Suite | File (expected) | Coverage |
|-------|-----------------|----------|
| Nav component | `src/components/layout/nav.test.tsx` | Pico nav structure (`nav` > `ul` > `li` > `a`); `aria-current="page"` on exact pathname match; inactive link has no `aria-current` |
| Home route | `src/routes/home.route.test.ts` (updated) | GET `/` includes nav; Home link active; Pico + layout stylesheet links in `<head>` |
| Agents route | `src/routes/agents.route.test.ts` | GET `/agents` returns 200 + coming soon content inside layout; Agents link active |
| Layout / Header | `src/components/layout/layout-components.test.tsx` (updated) | `Header` renders `Nav`; Pico `container` landmarks; `Layout` passes path through |
| Pico stylesheet | `src/routes/styles.route.test.ts` (updated) | `GET /styles/pico.min.css` returns 200 + `text/css`; body contains Pico CSS signatures |
| Overrides | `src/routes/styles.route.test.ts` or `src/styles/styles.test.ts` | `layout.css` still served at `/styles/layout.css`; project override rules present |
| Styles config | `src/styles/styles.test.ts` (updated) | Exports `picoCssHref` and `layoutCssHref` |

Shared helpers in `src/test/helpers.ts` (`requestApp`, `renderPage`) should be reused.

## Manual checks (optional spot-checks)

1. **Dev server** — `npm run dev` starts without runtime exceptions.
2. **GET `/`** — Pico-styled page; nav shows Home (active) and Agents; readable on phone-width viewport without horizontal scroll.
3. **GET `/agents`** — Coming soon message visible; Agents link active.
4. **Keyboard** — Tab to nav links; Pico `:focus-visible` ring visible on each link.
5. **Wrap** — Narrow viewport: nav links wrap rather than overflowing.
6. **Color scheme** — Page respects system light/dark preference (Pico `color-scheme` meta).

## Merge criteria summary

| Criterion | Pass condition |
|-----------|----------------|
| Pico CSS | `@picocss/pico` in `package.json`; `/styles/pico.min.css` served and linked in `Layout` before `layout.css` |
| Nav component | `Nav.tsx` exists with Pico semantic markup; `Header` composes it |
| Links | Home (`/`) and Agents (`/agents`) present in nav |
| Active state | Exact pathname match sets `aria-current="page"` |
| Coming soon | `/agents` returns 200 + placeholder content in `Layout` |
| Layout | All routes render inside `Layout` with Pico landmark classes (`container` on main/header as spec'd) |
| Overrides | `layout.css` trimmed to project-specific rules only (no duplicate Pico baseline) |
| Tech stack doc | `specs/tech-stack.md` updated to document Pico CSS |
| Types | `npm run typecheck` passes |
| Tests | `npm test` passes with comprehensive nav + stylesheet coverage |
| Scope | No database, agent list, or extra roadmap phases in this PR |

## Explicitly not required for this merge

- Real agent data or SQLite (Phase 3).
- Nav links to Ailments, Therapies, or Dashboard.
- Hamburger / collapse menu.
- Prefix active matching for `/agents/:id` (Phase 4).
- Custom Pico SASS themes or compiled variants.
- CI workflow changes.

## Reviewer checklist

- [ ] Pulled `feature/navigation-layout-polish` and ran `npm install`.
- [ ] `npm run typecheck` passes with no errors.
- [ ] `npm test` passes with no failures.
- [ ] Changes match `specs/2026-06-29-navigation-layout-polish/requirements.md` scope.
- [ ] `specs/tech-stack.md` reflects Pico CSS adoption.
- [ ] (Optional) Browser spot-check on `/` and `/agents` at mobile and desktop widths.
- [ ] (Optional) Keyboard tab through nav confirms visible focus rings.
