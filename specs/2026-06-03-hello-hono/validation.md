# Validation — Hello Hono (Phase 1)

How we know this implementation **succeeded** and is **safe to merge**.

## Manual checks (required)

All of the following must pass before merge:

1. **Install** — From a clean `node_modules` state, `npm install` (or the chosen package manager documented in the implementation PR) completes without errors.
2. **Dev server** — The documented dev command (e.g. a `package.json` `dev` script using `tsx`) starts without runtime exceptions.
3. **GET `/` — HTTP check** — With the server running, an HTTP GET to the root path returns:
   - Status **200**
   - `Content-Type` header containing `text/html`
   - Response body contains the text `AgentClinic is open for business`
4. **GET `/` — browser check** — Opening the root URL in a browser renders a visible page with the clinic heading and tagline. No blank page, no error message, no raw JSON.
5. **TypeScript** — No TypeScript errors in the new application code: either `tsc --noEmit` passes when wired in the implementation PR, or the IDE's TS diagnostics show zero errors for the touched files — **the implementer must document which command reviewers should run**.

## Merge criteria summary

| Criterion | Pass condition |
|-----------|----------------|
| Route | `/` returns 200 + `text/html` + body contains tagline |
| Home page | Renders a visible HTML page in a browser without errors |
| Types | End-to-end TS soundness per implementation PR instructions |
| Scope | No extra roadmap phases smuggled into this PR |

## Explicitly not required for this merge

- Exact character-for-character body match (HTML structure wraps the text).
- Automated tests (Vitest), CI workflow, or lint rules.
- External CSS, shared layout component, nav, or footer.
- Production build optimization (later phase).

## Reviewer checklist

- [ ] Pulled the feature branch and ran install + dev server.
- [ ] `curl -si http://localhost:<PORT>/` shows `200` and `text/html`.
- [ ] Browser shows the clinic heading and tagline visibly on screen.
- [ ] `tsc --noEmit` (or documented equivalent) passes with no errors.
- [ ] Changes match `specs/2026-06-03-hello-hono/requirements.md` scope.
