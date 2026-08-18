# Content Overview Type Scale

## Goal

Improve the readability of small supporting text in the homepage digital-garden overview without changing the established layout density or visual hierarchy.

## Scope

Only `src/components/ContentOverview.astro` changes. Typography currently below 11px will move up by roughly 1-2px:

- Overview metadata and statistic units: 10px to 11px.
- Tag counts: 7px to 9px.
- Tooltip kicker: 8px to 10px.
- Tooltip counts and total: 9px to 11px.
- Heatmap footer and legend: 9px to 11px.

The tag-panel helper text already uses 11px and remains unchanged. Titles, article text, navigation, grid dimensions, spacing, and heatmap cell sizes remain unchanged.

## Responsive Behavior

Desktop and mobile use the same revised supporting-text sizes. Existing wrapping rules in the heatmap footer remain in place, so the larger summary may wrap on narrow screens without overlapping the legend.

## Verification

- Run the complete test, Astro check, and production build suite with `npm run verify`.
- Confirm the local homepage responds successfully and still contains the activity tooltip and real publication-count attributes.
- Inspect the final diff to ensure no global typography or unrelated components changed.
