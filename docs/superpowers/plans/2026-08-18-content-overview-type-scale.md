# Content Overview Type Scale Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Increase undersized supporting text in the homepage digital-garden overview while preserving its existing hierarchy and layout.

**Architecture:** Keep the change local to the component's scoped CSS. Update only existing font-size declarations; do not add dependencies, global tokens, markup, or interaction changes.

**Tech Stack:** Astro 7, scoped component CSS, Vitest, TypeScript

## Global Constraints

- Only `src/components/ContentOverview.astro` may change during implementation.
- Titles, article text, navigation, grid dimensions, spacing, and heatmap cell sizes remain unchanged.
- Existing mobile wrapping and reduced-motion behavior remain unchanged.

---

### Task 1: Increase Supporting Text Sizes

**Files:**
- Modify: `src/components/ContentOverview.astro:155-192`
- Verify: `tests/homepage.test.ts`

**Interfaces:**
- Consumes: Existing scoped CSS selectors in `ContentOverview.astro`.
- Produces: The same component markup and Props interface with a more readable supporting-text scale.

- [ ] **Step 1: Confirm the current rendering baseline**

Run: `npm test -- --run tests/homepage.test.ts`

Expected: Four homepage rendering tests pass before the style-only change.

- [ ] **Step 2: Apply the exact font-size replacements**

In `src/components/ContentOverview.astro`, make these replacements and no other layout changes:

```css
.garden header span, .panel-label, .heat-foot { font: 400 11px 'DM Mono', monospace; }
.stats small { font: 400 11px 'DM Mono', monospace; }
.stats a > span { font-size: 11px; }
.tag-cloud sup { font: 400 9px 'DM Mono', monospace; }
.activity-tooltip > span { font: 400 10px 'DM Mono', monospace; }
.tooltip-counts span { font: 400 11px 'DM Mono', monospace; }
.activity-tooltip p { font: 400 11px 'DM Mono', monospace; }
.heat-foot { font-size: 11px; }
```

- [ ] **Step 3: Run the focused rendering tests**

Run: `npm test -- --run tests/homepage.test.ts`

Expected: Four tests pass, confirming the component still renders its identity, interactions, statistics, and real activity data.

- [ ] **Step 4: Run complete verification**

Run: `npm run verify`

Expected: All Vitest tests pass, `astro check` reports zero diagnostics, and the production build generates five static pages.

- [ ] **Step 5: Verify the running homepage and diff scope**

Run:

```powershell
$response = Invoke-WebRequest -Uri 'http://localhost:4321/' -UseBasicParsing
$response.StatusCode
$response.Content.Contains('data-activity-tooltip')
$response.Content.Contains('data-notes="1"')
git diff --check
git status --short
```

Expected: HTTP 200, all content checks return `True`, `git diff --check` returns no errors, and only `src/components/ContentOverview.astro` plus this plan are in scope.

- [ ] **Step 6: Commit the implementation**

```bash
git add src/components/ContentOverview.astro
git commit -m "style: improve overview text readability"
```
