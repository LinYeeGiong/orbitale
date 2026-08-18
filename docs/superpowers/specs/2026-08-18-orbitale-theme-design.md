# Orbitale Theme Design

## Goal

Orbitale is a Chinese-first Astro theme for a personal digital garden. It turns the approved Lin mock into a maintainable static site while preserving its exploration orbit, command terminal, technical notes, essays, daily timeline, writing activity, and optional English translations.

## Architecture

Astro owns static routing, Markdown rendering, content validation, asset optimization, RSS, sitemap generation, and GitHub Pages builds. Theme presentation is split into focused Astro components, while small framework-free TypeScript modules own interactive behavior such as terminal commands and orbit geometry.

Content lives in Astro content collections:

- `notes`: technical and learning records.
- `essays`: long-form personal writing.
- `daily`: short chronological posts with optional images.

Chinese pages use root routes. English translations use `/en/` routes and are shown only when matching content exists.

## Theme Components

- `SiteShell`: global metadata, navigation, theme controls, and footer.
- `Hero`: Lin identity, introductory copy, and primary navigation.
- `ExplorationOrbit`: mouse-following cyan pointer and topic statistics.
- `CommandTerminal`: keyboard and clickable command navigation.
- `ContentOverview`: collection counts and writing metrics.
- `TagCloud`: weighted content tags.
- `ActivityHeatmap`: recent publishing activity.
- `DailyTimeline`: short-form daily entries.

## Content Workflow

Obsidian remains the private source of truth. A publishable Markdown file must have `published: true`, a valid content type, date, language, tags, and slug. A later synchronization script will copy only publishable files and their referenced images into this repository. OpenClaw may write to the Obsidian inbox but does not publish directly.

## Interaction Rules

- The exploration pointer follows the mouse relative to the orbit center and returns to the selected topic on pointer leave.
- Topic hover previews metadata; click pins a topic.
- Terminal commands `/home`, `/about`, `/notes`, `/essays`, `/daily`, `/explore`, `/help`, and `/clear` are supported.
- Interactive controls remain keyboard accessible.
- All nonessential motion respects `prefers-reduced-motion`.
- Mobile layouts stack without horizontal overflow.

## Visual System

The theme uses dark charcoal and warm light surfaces with restrained cyan, coral, green, and yellow accents. Typography pairs a readable Chinese serif display face with a monospaced interface face. Cards are reserved for bounded tools such as the terminal; page sections remain unframed.

## Deployment

The default output is fully static. GitHub Actions runs type checks, tests, and `astro build`, then publishes `dist/` to GitHub Pages. The site configuration supports both a user site (`username.github.io`) and a project site through Astro's `site` and `base` options.

## Verification

- Unit tests cover terminal parsing and orbit pointer geometry.
- `astro check` validates Astro and TypeScript files.
- `astro build` proves all static routes and collections render.
- Browser checks cover desktop and mobile layout, interactive pointer movement, command navigation, light mode, and reduced motion.

## First Milestone

Version `0.1.0` provides a runnable Astro project, the shared theme shell, an interactive homepage derived from the mock, sample content collections, tests, and GitHub Pages workflow. Full article templates, Obsidian synchronization, search, RSS, and complete bilingual routing follow as separate milestones.
