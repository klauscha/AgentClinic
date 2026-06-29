---
name: update-changelog
description: >-
  Update CHANGELOG.md at the project root with date headings and bullets from
  recent work or git history. Use when the user asks to update the changelog,
  prepare for merge, run the changelog skill, or sync CHANGELOG.md before a PR.
disable-model-invocation: true
---

# Update Changelog

Maintain `CHANGELOG.md` at the workspace root before merging. The user invokes this skill manually — do not update the changelog unless asked.

## Format

- **Newest date first** — `## YYYY-MM-DD` headings, one per calendar day with changes
- **Bullets** — short, user-facing sentences; past tense for shipped work
- **One bullet per meaningful change** — consolidate related commits; omit merge-commit noise unless it marks a release milestone
- **No duplicate bullets** across dates

Template for a new day:

```markdown
## YYYY-MM-DD

- Brief description of what changed and why it matters
```

Insert new dates **above** the most recent existing date (except when appending to today's section).

## Workflow

1. **Read** `CHANGELOG.md` at the workspace root (bootstrap from git if missing — see below).
2. **Gather changes** since the latest changelog date:
   ```bash
   git log --format="%ad|%s" --date=short
   git log --format="%ad|%s" --date=short --since="<day-after-latest-changelog-date>"
   git diff --stat <base-branch>...HEAD
   ```
   Prefer the branch diff and session context over raw commit subjects when they are vague.
3. **Decide the date** — use today's date for work not yet logged; use commit dates for backfill only.
4. **Update** `CHANGELOG.md`:
   - If today's `##` heading exists → add bullets under it (no duplicates)
   - Else → insert a new `## YYYY-MM-DD` section at the top
5. **Do not commit** unless the user explicitly asks.

## Bootstrap (no CHANGELOG.md)

1. Run `git log --format="%ad|%s" --date=short` for the full history.
2. Group commits by date; rewrite as user-facing bullets (skip bare merge commits unless milestone).
3. Create `CHANGELOG.md` with date sections, newest first.

## What to include

| Include | Exclude |
|---------|---------|
| New routes, UI, specs, tests, tooling | Internal refactors with no outward effect |
| Roadmap / phase completions | Every individual merge commit |
| Breaking or behavior changes | Typo-only edits |
| Dependency additions users run | Agent-only local IDE config |

## Checklist before finishing

- [ ] Newest date is at the top
- [ ] Bullets are distinct and non-redundant
- [ ] Wording matches shipped reality (read diff if unsure)
- [ ] File saved at workspace root `CHANGELOG.md`

## Example

**Input:** Responsive CSS, viewport meta, roadmap replan — 2026-06-29.

**Output:**

```markdown
## 2026-06-29

- Add responsive design — viewport meta, mobile-first CSS, and Vitest coverage
- Replan roadmap: Phase 1 complete; Phase 2 refocused on navigation
```
