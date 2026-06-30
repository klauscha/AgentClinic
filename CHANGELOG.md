# Changelog

User-facing changes grouped by date (newest first). Update before merging via the `update-changelog` skill (`.cursor/skills/update-changelog/SKILL.md`).

## 2026-06-29

- Adopt **Pico CSS** as the site stylesheet baseline with a thin `layout.css` override layer
- Add **site navigation** — `Nav` component, Home/Agents links, active link state, and `/agents` coming-soon page
- Improve layout **accessibility** — per-page `<title>`, headings in `<main>`, brand as linked `<strong>` in nav
- Fix **Pico brand colours** with theme-specific CSS variable selectors for light and dark mode
- Add **layout prop types** (`types.ts`) for `currentPath` and page `title`
- Add **Phase 2 spec** (`specs/2026-06-29-navigation-layout-polish/`), update `specs/tech-stack.md`, and mark Phase 2 complete on the roadmap
- Expand **Vitest coverage** for nav markup, route integration, and Pico/override stylesheet routes
- Replan roadmap: Phase 1 marked complete; Phase 2 refocused on navigation and layout polish
- Add responsive design — viewport meta, mobile-first CSS, fluid spacing tokens, and Vitest coverage
- Add Vitest validation (`npm test`) with route, component, page, and stylesheet test suites
- Extract `src/app.ts` so tests call `app.fetch` without starting a server
- Mark Phase 1 (Hello Hono) complete on the roadmap
- Enforce layout subcomponents in separate files (`Header`, `Main`, `Footer`, `Layout`)
- Refactor home page to use shared `Layout` with externally linked `layout.css`
- Merge Phase 1 feature work to `master` (PRs #3, #4)

## 2026-06-24

- Implement Phase 1 scaffold: Hono + `tsx`, HTML home route, TypeScript config, `package.json` scripts
- Merge Phase 1 feature branch (PR #2)

## 2026-06-04

- Merge Phase 1 feature branch (PR #1)

## 2026-06-03

- Add product specs: `mission.md`, `roadmap.md`, `tech-stack.md`
- Add Hello Hono feature spec (`specs/2026-06-03-hello-hono/`)
- Import and refine course materials and documentation
- Project starting point

## 2026-05-25

- Initial commit
