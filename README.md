# Orbitale

Orbitale is a Chinese-first Astro theme for Lin's personal digital garden. It combines technical notes, essays, short daily posts, an interactive exploration orbit, and a command-line navigation surface.

## Current Milestone

Version `0.1.0` includes:

- Astro 7 static-site foundation.
- Strict `notes`, `essays`, and `daily` content collections.
- Interactive mouse-following exploration orbit.
- Command terminal with `/home`, `/about`, `/notes`, `/essays`, `/daily`, `/explore`, `/help`, and `/clear`.
- Chinese homepage, About, Notes, Essays, and Daily routes.
- Tag constellation and writing activity overview.
- Dark and light color modes.
- Unit and Astro rendering tests.
- GitHub Pages deployment workflow.

## Local Development

Requirements: Node.js `22.12.0` or newer and npm.

```bash
npm install
npm run dev
```

The development server prints its local URL. Run the complete verification suite with:

```bash
npm run verify
```

## Content

Content files live in:

```text
src/content/notes/
src/content/essays/
src/content/daily/
```

Publishable Markdown uses validated frontmatter:

```yaml
---
title: 让 Agent 记住真正重要的事
description: 从短期上下文到长期可检索记忆。
date: 2026-08-18
tags: [AI, Agent, Memory]
lang: zh
published: true
---
```

Files with `published: false` remain available locally but are excluded from public lists.

## GitHub Pages

Push the repository as `username.github.io`, then enable **Settings → Pages → Source → GitHub Actions**. The first milestone targets a root user site at `https://username.github.io/`.

For a local production build with an explicit URL:

```bash
PUBLIC_SITE_URL=https://username.github.io npm run build
```

PowerShell equivalent:

```powershell
$env:PUBLIC_SITE_URL='https://username.github.io'
npm run build
```

## Next Milestones

- Article detail routes and typography.
- Obsidian publish synchronization and image copying.
- Optional English translation routes.
- RSS, sitemap, search, and tag archive pages.
- Optional GitHub Pages project-site base paths.
- Replace example GitHub identity and sample content with Lin's final information.
