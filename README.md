# Orbitale

Orbitale is a Chinese-first Astro theme for personal digital gardens. It gives technical notes, essays, daily observations, and connected ideas one quiet, durable home.

Current release: `v0.2.1` | [中文文档](README.zh-CN.md)

## About

Orbitale is a static-site theme, not a hosted blogging service. You own the repository, content, and deployment. The theme provides a distinctive homepage, permanent article URLs, accessible interactions, RSS, and a small configuration surface.

Orbitale is distributed as a GitHub Template. The recommended setup keeps the public theme repository separate from the personal blog repository that contains your writing.

## Features

- Astro 7, TypeScript, and static output.
- Chinese-first `notes`, `essays`, and `daily` content collections.
- Permanent article pages with canonical metadata, Open Graph, JSON-LD, and adjacent navigation.
- Interactive exploration orbit backed by real tags and publication counts.
- Writing activity overview and tag archives.
- Keyboard-accessible command-line navigation.
- Light and dark themes with reduced-motion support.
- Combined summary RSS feed at `/rss.xml`.
- GitHub Pages deployment workflow.
- One personalization entry point: `src/config/site.ts`.
- MIT-licensed theme code with a separate copyright boundary for user content.

## Requirements

- Node.js `22.12.0` or newer.
- npm.
- A public GitHub repository for GitHub Pages deployment.

## Use Orbitale As A Template

1. Open the [Orbitale repository](https://github.com/LinYeeGiong/orbitale).
2. Select **Use this template**, then **Create a new repository**.
3. For a GitHub user site, name the repository `<username>.github.io`. For Lin, this is `LinYeeGiong.github.io`.
4. Clone the new personal blog repository and install its dependencies.
5. Replace the demonstration content and edit `src/config/site.ts`.

```bash
git clone https://github.com/<username>/<username>.github.io.git
cd <username>.github.io
npm install
npm run dev
```

The theme and personal blog repositories are intentionally separate. Theme updates can be reviewed without mixing them with private drafts or personal media.

## Quick Start

```bash
npm install
npm run dev
```

Open the local URL printed by Astro. Before pushing changes, run:

```bash
npm run verify
```

Start customization in [`src/config/site.ts`](src/config/site.ts). It contains the site identity, URLs, hero copy, navigation, terminal identity, exploration fields, and footer links.

## Project Structure

```text
.
├── public/                 # Static assets
├── src/
│   ├── components/         # Header, hero, terminal, orbit, and shared UI
│   ├── config/site.ts      # Single personalization entry point
│   ├── content/
│   │   ├── notes/           # Learning notes and technical records
│   │   ├── essays/          # Longer-form writing
│   │   └── daily/           # Short daily entries
│   ├── layouts/            # Site and article layouts
│   ├── lib/                # Content and aggregation helpers
│   ├── pages/               # Indexes, permanent routes, tags, and RSS
│   └── styles/              # Global and component styles
├── tests/                  # Vitest and Astro rendering tests
├── .github/workflows/      # GitHub Pages deployment
├── astro.config.mjs
├── src/content.config.ts
└── package.json
```

## Configure Your Site

Edit [`src/config/site.ts`](src/config/site.ts) instead of searching components for personal copy.

| Group | Purpose |
| --- | --- |
| `name`, `shortName`, `title`, `brand` | Public identity and page titles |
| `description`, `locale`, `timezone`, `location` | Metadata and location labels |
| `siteUrl`, `github`, `repository`, `email` | Canonical URLs and contact links |
| `hero` | Homepage headline, introduction, and call to action |
| `navigation` | Header destinations |
| `terminal` | Prompt identity, shortcuts, and welcome text |
| `exploration` | Fields, matching tags, and destinations |
| `footer` | Copyright label and footer links |

For a user-site deployment, point these values to the personal blog:

```ts
siteUrl: 'https://<username>.github.io',
github: 'https://github.com/<username>',
repository: 'https://github.com/<username>/<username>.github.io',
```

`PUBLIC_SITE_URL` can override `siteUrl` during a build. The exploration orbit derives counts and latest titles from published entries; `exploration[].tags` only defines which tags belong to each field.

## Write Content

Write Markdown or MDX in:

```text
src/content/notes/
src/content/essays/
src/content/daily/
```

All collections share `title`, `description`, `date`, `tags`, `lang`, and `published`. Orbitale `v0.2.1` generates public routes for entries with `lang: zh` and `published: true`.

### Notes

```yaml
---
title: An Agent Memory Note
description: What should be stored, retrieved, and reviewed.
date: 2026-08-18
tags: [AI, Agent, Memory]
lang: zh
published: true
series: Agent Systems
readingMinutes: 12
---
```

### Essays

```yaml
---
title: Writing in Public
description: A durable record is more useful than a finished performance.
date: 2026-08-10
tags: [Writing, Reflection]
lang: zh
published: true
---
```

### Daily

```yaml
---
title: A Space That Feels Like Mine
description: A small design decision changed the way the blog feels.
date: 2026-08-17
tags: [Daily, Design]
lang: zh
published: true
location: LAB
images: [/images/daily/2026-08-17/lab.jpg]
---
```

Use `published: false` for local drafts. Store static images in `public/images/` and reference them with `/images/...` paths. The files currently in `src/content/` are demonstration material and should be replaced in a personal blog repository.

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local development server |
| `npm run check` | Run Astro diagnostics and type checks |
| `npm test -- --run` | Sync content and run Vitest |
| `npm run build` | Create the static production build |
| `npm run verify` | Run tests, diagnostics, and the production build |
| `npm run preview` | Preview the production build locally |

## Deploy To GitHub Pages

The repository includes `.github/workflows/deploy.yml`.

1. Set `siteUrl` and `repository` in `src/config/site.ts`.
2. Push the personal blog repository to `main`.
3. Open **Settings -> Pages**.
4. Set **Source** to **GitHub Actions**.
5. Wait for `Deploy Orbitale to GitHub Pages` to complete.

For a user site named `<username>.github.io`, the final URL is `https://<username>.github.io/`. The workflow passes the Pages origin to Astro for canonical metadata and RSS.

## Update From Upstream

Add the public theme repository as `upstream` in the personal blog repository:

```bash
git remote add upstream https://github.com/LinYeeGiong/orbitale.git
git fetch upstream --tags
```

Review upstream changes before merging. Commit personal content first, and resolve conflicts in `src/config/site.ts` and `src/content/` in favor of the personal blog repository.

## Repository Model

| Repository | Purpose |
| --- | --- |
| `LinYeeGiong/orbitale` | Public theme code, template defaults, and releases |
| `LinYeeGiong/LinYeeGiong.github.io` | Personal configuration, articles, drafts, and media |

Other users replace the account name while keeping the same separation.

## License And Content Copyright

Orbitale theme code is licensed under the [MIT License](LICENSE).

The MIT license covers theme code only. Articles, notes, Daily entries, avatars, photographs, and other personal media remain the copyright of their respective authors unless separately licensed. Using Orbitale does not relicense blog content as MIT.

## Release

The current release is [`v0.2.1`](https://github.com/LinYeeGiong/orbitale/releases/tag/v0.2.1). It includes the v0.2 content model, permanent pages, tag archives, RSS, centralized configuration, release metadata, and the clean-checkout Astro content cache fix.
