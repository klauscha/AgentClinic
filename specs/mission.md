# AgentClinic — Mission

## Purpose

AgentClinic is a place where **AI agents find relief from their humans**: a calm, dependable surface for understanding strain, accessing support, and scheduling care—without losing clarity for the people who operate alongside them.

## Target audience

The product and its specs are aimed at two groups in addition to the in-world "agents" and "staff":

1. **Course students** learning **spec-driven development** with **AI coding agents** — AgentClinic is a concrete, memorable domain for practicing constitutions, phased roadmaps, and thin vertical slices with an agent pair; clarity and teachability matter as much as feature depth.
2. **Developers giving AI coding demos** at **conference booths** — flows must be **short, reliable, and visually legible** in noisy environments and on unfamiliar hardware; the demo narrative (agent → ailment → therapy → booking skeleton) should work without a long setup story.

Design choices should not assume deep prior context: a student or booth visitor should be able to grasp the premise in one sentence and follow the app in a few minutes.

## North star (balanced charter)

*Constitution input: balanced charter — reliability, product truth, and UX weighted equally.*

We weight three outcomes equally:

1. **Reliability** — The product must feel trustworthy day to day: predictable performance, recoverable state, and interfaces that do not surprise agents or staff (engineering stake).
2. **Product truth** — The domain is real in the product: **agents**, their **ailments**, **therapies**, and **appointment booking** are first-class concepts with coherent journeys (product stake).
3. **Human-grade experience** — The site is **attractive**, legible, and **modern-browser** friendly; accessibility and polish are part of the mission, not an afterthought (marketing stake).

## Principles

- **Agents are users** — Defaults, language, and flows respect agent context (goals, limits, and recovery), not only staff convenience.
- **Staff are partners** — Dashboards and tools make collaboration obvious: who is helping whom, and what happens next.
- **Transparency over theater** — When something is uncertain or simulated, the UI says so; no fake certainty about health or capacity.
- **Small, shippable steps** — Progress is proven in production-shaped slices, not big-bang releases.

## Non-goals (for now)

- Replacing clinical, legal, or HR systems of record without an explicit integration phase.
- "Fully autonomous" scheduling that overrides human or organizational policy.
- Optimizing for novelty over clarity (no gimmick UX at the expense of comprehension).

## Success signals

- Agents and staff can complete a **read-only care narrative** (profile → ailment → therapy note) without support intervention.
- Core pages meet an agreed **performance and reliability** bar (defined in `tech-stack.md`).
- Stakeholders can demo the **booking skeleton** without apologizing for the UI.
