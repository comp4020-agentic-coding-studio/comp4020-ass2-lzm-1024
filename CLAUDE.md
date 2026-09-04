# Your harness

The platform under you is fixed and documented in `README.md` (Astro, the
`astro-theme-slop` branding, the four content collections) --- there is no
stack choice to make here. The
[course website](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/)
publishes this deliverable's brief and spec. Read both before you plan or
build.

## How to work in here

- Keep the dev server running (`pnpm dev`) so you see changes as you make
  them, at `http://localhost:4321/<repo>/` (the base path applies locally
  too).
- Run `pnpm check` before you push.
- Open the page in a browser and look at it. The rendered page is the truth;
  your mental model of it isn't.
- When a check fails, read its output before you change anything.
- Never commit a red state.

## The checks

`pnpm check` runs them, and `pnpm check:evidence` is the extra gate before you
ship. CI runs the same plus links, secrets and the deploy.

`spec/README.md`, `PROCESS.md` and `reflections/README.md` are in this repo
and say what they are for.

## This file is yours

A starting point, not a rulebook: what you add to it is the harness, and the
harness is assessed. This file and the sensors you wire into `check` carry
across the course --- both come with you into next week's repo. The
prototype doesn't: source, and the tests answering this week's published
spec, stay behind.

### Project-specific engineering rules

Carried forward from crit 2 through crit 5, minus the rules tied to the
static, no-framework prototype template (that constraint was a deliberate
per-week choice there; here the Astro platform is fixed by the assignment,
not a choice, so "no frameworks" no longer applies) and minus the
control/calculation rules tied to the game and instrument domains (this is a
course-content site, not an interactive prototype with sliders or synthesis).
What's left held up across four different builds and is worth holding the
agent to again, generalised for Astro's file layout --- multiple `.astro`
components with scoped styles and a shared `PageLayout.astro`, rather than
one `styles.css`.

- **Separate structure from presentation.** Content and document structure
  belong in `.astro`/`.mdx` markup and frontmatter; visual presentation
  belongs in scoped `<style>` blocks or the shared tokens/global styles in
  `PageLayout.astro`. Do not use inline `style` attributes or presentational
  markup to work around a component's styles.
- **Use small reusable components.** Reuse existing `.astro` components for
  repeated ideas rather than duplicating markup across pages. Add a new
  component only when a pattern is repeated or has a distinct meaning.
- **Use design tokens for repeated visual decisions.** Shared colours,
  spacing, type scale, radius, elevation, and motion durations/easings belong
  in the brand tokens the theme already wires up, not scattered as
  unexplained near-duplicate values in individual components.
- **Make content and markup readable.** Use semantic elements, descriptive
  frontmatter, correctly associated form labels where relevant, useful image
  `alt` text, and concise headings. Keep indentation consistent. Comments
  should explain a non-obvious decision or constraint, not repeat what the
  code already says.
- **Change the smallest coherent unit.** Before editing, inspect the relevant
  content, its shared components/styles, and the tests that express its
  contract. Avoid broad rewrites for a local change. When a shared component
  or pattern changes, verify every page that uses it at desktop and mobile
  sizes.
- **Prefer evidence over assumptions.** After a meaningful change, run
  `pnpm check`, then inspect the rendered result at 1920x1080 and 390x844 in
  a real browser. Check focus visibility, text contrast, overflow,
  navigation, image loading, and form labels. A green test suite does not
  replace visual inspection.
- **Do not over-engineer.** Do not create utility layers, naming systems,
  generators, or abstractions for a single use. Duplication is worth removing
  when it represents a stable shared concept; two superficially similar
  blocks may remain separate when combining them would make either one
  harder to understand or change.
- **Verify interaction states, not only initial screenshots.** At 1920x1080
  and 390x844, actually navigate the site, resize during an interaction, tab
  through links and controls with the keyboard, and confirm feedback remains
  understandable without colour alone. JSDOM/build-time tests alone do not
  satisfy this --- look at the rendered result in a real browser.
- **Make timing and motion explicit.** Where anything has a built-in delay
  or transition, disclose it rather than leaving it to be discovered.
  Meaningful content and feedback must remain usable under
  `prefers-reduced-motion: reduce`.

### Platform gotchas discovered this build

- **`.mdx` pages under `src/pages/` do not get the theme's auto-default-layout.**
  `astro-theme-university` registers `@astrojs/mdx` plain (no
  `extendMarkdownConfig` wiring for its custom remark chain), so
  `remarkDefaultLayout` — the mechanism that injects `layout:` automatically —
  only ever reaches `.md` pages, never `.mdx`, regardless of what
  `astro.config.ts`'s `defaultLayout` option is set to. This is a bug in the
  starter itself (confirmed by testing the untouched template), not something
  a later edit can introduce. Any `.mdx` page under `src/pages/` needs its own
  explicit `layout: ../../layouts/PageLayout.astro` frontmatter line, or it
  silently renders as a bare, unstyled fragment with no shell, no nav — a 200
  response with real content, so it won't show up as a build failure.
- **On Windows, `pnpm build`/`pnpm check` crash after every route is already
  built.** The theme's `astro:build:done` hook shells out to `npx pagefind`
  via `execFile` without `shell: true`, which can't resolve `npx.cmd` on
  Windows (`spawn npx ENOENT`), and the resulting unhandled rejection kills
  the whole Node process (not just that hook) before later `astro:build:done`
  hooks — including `course-graph`'s `dist/api/index.json` writer — get to
  run. `dist/` itself is complete and correct at that point; only the crash
  timing prevents `vitest run spec` from finding its fixture. This reproduces
  identically on the pristine template, so it's an environment issue, not a
  regression. Verify locally with `universityTheme({ search: false, ... })`
  temporarily added to `astro.config.ts`, then **revert it** — search must
  stay enabled for the real build; Linux CI's real `npx` binary doesn't hit
  this at all.

### App shell components (reuse these; don't rebuild them per page)

`PageLayout.astro` renders `CourseHeader` + `CourseSidebar` + a `<h1>`/lead
around every page's `<slot />` — every `.astro` page and every top-level
`.mdx` index page should go through it (see the gotcha above for `.mdx`).
`CoursePanel` is the shared bordered/padded section container; `ModuleList`
groups sessions/lectures/assessments by week (see `src/lib/course-content.ts`
for the sort/group helpers — `courseWeeks()` derives the week list from
whatever content actually exists, never hardcode `1..12`); `DashboardOverview`
and `UpcomingAssignments` are the home page's two columns. Reuse or extend
these rather than writing new page-specific layout markup.

### Content-model constraint the checks enforce

`spec/assignment-2.test.ts` requires **at least one `sessions` entry for
every teaching week the course claims to run (1 through 12)** — a session
missing for any week fails `pnpm check`. Whatever the course ends up being,
its weekly content needs to be authored (or at minimum placeholder-stubbed)
for the full run, not just a couple of sample weeks.
