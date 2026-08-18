# Orbitale Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first runnable Astro version of the Orbitale personal-blog theme from the approved interactive mock.

**Architecture:** Astro renders a static Chinese-first site from validated content collections. Focused Astro components own layout and presentation; testable framework-free TypeScript modules own orbit geometry and terminal command behavior.

**Tech Stack:** Astro 7, TypeScript, Vitest, Astro content collections, GitHub Actions, CSS custom properties

## Global Constraints

- Chinese is the default locale; English content is optional and uses `/en/` routes.
- Static output must deploy to GitHub Pages.
- Interactive motion must respect `prefers-reduced-motion`.
- The first milestone includes the homepage and example collections, not Obsidian synchronization or full-site search.
- Theme name and package name are `Orbitale` and `orbitale`, version `0.1.0`.

---

### Task 1: Astro Project And Theme Contract

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/content.config.ts`
- Create: `src/config/site.ts`
- Create: `src/content/notes/agent-memory.md`
- Create: `src/content/essays/public-writing.md`
- Create: `src/content/daily/2026-08-17.md`
- Create: `.gitignore`

**Interfaces:**
- Produces: `siteConfig` and the `notes`, `essays`, and `daily` content collections.

- [ ] **Step 1: Scaffold Astro with the official minimal template**

Run: `npm create astro@latest . -- --template minimal --install --no-git --yes`

Expected: Astro project files and dependencies are created without replacing the existing Git repository.

- [ ] **Step 2: Add package metadata, content schemas, and sample Markdown**

Define strict collection schemas for `title`, `description`, `date`, `tags`, `lang`, `published`, and optional translation/image fields.

- [ ] **Step 3: Run Astro type checking**

Run: `npm run check`

Expected: command succeeds with no diagnostics.

- [ ] **Step 4: Commit**

Run: `git add . && git commit -m "chore: scaffold Orbitale Astro theme"`

### Task 2: Testable Interaction Core

**Files:**
- Create: `src/lib/orbit.ts`
- Create: `src/lib/terminal.ts`
- Create: `tests/orbit.test.ts`
- Create: `tests/terminal.test.ts`
- Modify: `package.json`

**Interfaces:**
- Produces: `calculatePointer(origin, target, maxLength)` returning `{ angle, length }`.
- Produces: `parseTerminalCommand(input)` returning a typed command result.

- [ ] **Step 1: Write failing geometry and command tests**

Test center-to-target angles, maximum pointer length, slash normalization, known routes, help, clear, and unknown commands.

- [ ] **Step 2: Run tests and confirm missing-module failures**

Run: `npm test -- --run`

Expected: FAIL because `src/lib/orbit.ts` and `src/lib/terminal.ts` do not exist.

- [ ] **Step 3: Implement the smallest typed modules that satisfy the tests**

Keep geometry independent of the DOM and command parsing independent of navigation.

- [ ] **Step 4: Run tests**

Run: `npm test -- --run`

Expected: all tests pass.

- [ ] **Step 5: Commit**

Run: `git add package.json src/lib tests && git commit -m "feat: add tested interaction core"`

### Task 3: Theme Shell And Interactive Homepage

**Files:**
- Create: `src/layouts/SiteShell.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Hero.astro`
- Create: `src/components/ExplorationOrbit.astro`
- Create: `src/components/CommandTerminal.astro`
- Create: `src/components/ContentOverview.astro`
- Create: `src/styles/global.css`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `siteConfig`, `calculatePointer`, and `parseTerminalCommand`.
- Produces: a responsive homepage with navigation, orbit, terminal, statistics, tag cloud, and activity heatmap.

- [ ] **Step 1: Add a build-level homepage assertion that initially fails**

Create a test that reads the homepage component and asserts the named core components are present.

- [ ] **Step 2: Run the assertion and confirm it fails**

Run: `npm test -- --run`

Expected: FAIL because the homepage components do not exist.

- [ ] **Step 3: Implement the componentized homepage and theme styles**

Port the approved mock without copying its monolithic structure. Use semantic controls, scoped scripts, responsive constraints, and reduced-motion fallbacks.

- [ ] **Step 4: Run tests and Astro checks**

Run: `npm test -- --run && npm run check`

Expected: all tests pass and Astro reports no diagnostics.

- [ ] **Step 5: Commit**

Run: `git add src tests && git commit -m "feat: build Orbitale interactive homepage"`

### Task 4: GitHub Pages And Release Verification

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `README.md`
- Modify: `astro.config.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: a documented static build and GitHub Pages deployment workflow.

- [ ] **Step 1: Configure the Pages workflow**

Run checks, tests, and build on pushes to `main`; deploy `dist/` with the official Pages actions.

- [ ] **Step 2: Document local development and deployment**

Document `npm install`, `npm run dev`, `npm test`, `npm run check`, and the `PUBLIC_SITE_URL` configuration.

- [ ] **Step 3: Run full verification**

Run: `npm test -- --run && npm run check && npm run build`

Expected: tests, Astro diagnostics, and static build all succeed.

- [ ] **Step 4: Commit**

Run: `git add .github README.md astro.config.mjs package.json && git commit -m "ci: add GitHub Pages deployment"`
