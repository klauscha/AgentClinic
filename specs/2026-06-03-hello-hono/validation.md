# Validation — Hello Hono (Phase 1)

How we know this implementation **succeeded** and is **safe to merge**.

## Automated checks (required)

Run from the project root after `npm install`:

```bash
npm run typecheck
npm test
```

Both commands must exit **0**. `npm test` runs Vitest (`vitest run`) across the suite under `src/`:

| Suite | File | Coverage |
|-------|------|----------|
| Home route | `src/routes/home.route.test.ts` | GET `/`, document shell, 404 for unknown paths |
| Styles route | `src/routes/styles.route.test.ts` | GET `/styles/layout.css`, missing stylesheet 404 |
| Layout structure | `src/components/layout/layout-structure.test.ts` | One-file-per-component layout module |
| Layout components | `src/components/layout/layout-components.test.tsx` | `Header`, `Main`, `Footer`, `Layout` markup |
| Home page | `src/pages/home.page.test.ts` | `Home` renders inside `Layout` with tagline |
| Styles config | `src/styles/styles.test.ts` | `layoutCssHref` public path |

Shared helpers live in `src/test/helpers.ts` (`requestApp`, `renderPage`).

## Manual checks (optional spot-checks)

These complement automated tests; they are not required if `npm test` passes:

1. **Dev server** — `npm run dev` starts without runtime exceptions.
2. **GET `/` — browser check** — Opening the root URL renders a visible page with the clinic heading and tagline.

## Merge criteria summary

| Criterion | Pass condition |
|-----------|----------------|
| Route | `/` returns 200 + `text/html` + body contains tagline (covered by `npm test`) |
| Home page | Layout regions and stylesheet link present in HTML (covered by `npm test`) |
| Layout | `Header`, `Main`, `Footer` in separate files; `Layout.tsx` composes via imports (covered by `npm test`) |
| Styles | `/styles/layout.css` returns 200 + `text/css` (covered by `npm test`) |
| Types | `npm run typecheck` passes with no errors |
| Tests | `npm test` passes with no failures |
| Scope | No extra roadmap phases smuggled into this PR |

## Explicitly not required for this merge

- Exact character-for-character body match (HTML structure wraps the text).
- CI workflow or lint rules.
- Navigation menus or multi-page routing beyond `/`.
- Production build optimization (later phase).

## Reviewer checklist

- [ ] Pulled the feature branch and ran `npm install`.
- [ ] `npm run typecheck` passes with no errors.
- [ ] `npm test` passes with no failures.
- [ ] Changes match `specs/2026-06-03-hello-hono/requirements.md` scope.
- [ ] (Optional) `npm run dev` and browser spot-check on `/`.
