# Plan — Hello Hono (Phase 1)

Numbered task groups for implementation. Order matters within each group where noted.

## 1. Project scaffold and dependencies

1. Initialize Node project metadata (`package.json`) suitable for a small Hono service.
2. Add runtime/dev dependencies aligned with `specs/tech-stack.md`: **Hono**, **TypeScript**, **tsx**, and type packages as needed.
3. Add `tsconfig.json` with settings appropriate for a Node + Hono app (module resolution, strictness consistent with "types work end-to-end"). Enable JSX support (`"jsx": "react-jsx"` or equivalent per Hono JSX guidance) so the compiler accepts `.tsx` files.

## 2. Hono application entry and server start

1. Create the application entry (e.g. `src/index.ts`) that constructs a Hono app instance.
2. Start the HTTP server on a conventional port (e.g. from `process.env.PORT` with a sensible default) so `tsx` can run it predictably.

## 3. Minimal home page

1. Enable Hono's JSX renderer — configure `app.use` with the `jsxRenderer` middleware (or the equivalent Hono JSX helper) so routes can return `c.render(...)`.
2. Create `src/pages/Home.tsx` (or equivalent): a minimal JSX component that renders an HTML page with the clinic name as a heading and the tagline `AgentClinic is open for business` visible in the body. No nav, no layout system, no external CSS file required.
3. Register **GET `/`** in the app to render and return the `Home` component with a `200` status.

## 4. TypeScript and run verification

1. Ensure the project type-checks (`tsc --noEmit` or equivalent) with no errors in the new code.
2. Run the dev server via `tsx` and manually verify GET `/` in a browser and via curl (see `validation.md`).
3. Fix any type or import issues until editor and CLI agree the codebase is sound for this slice.
