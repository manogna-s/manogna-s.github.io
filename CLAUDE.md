# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Local Development

```bash
# Serve with live reload (UTF-8 flags required: .bib has non-ASCII chars)
LANG=en_US.UTF-8 RUBYOPT="-E utf-8" bundle exec jekyll serve --livereload
```

Site is available at `http://127.0.0.1:4000`. Config changes (`_config.yml`) require a full server restart; content changes hot-reload automatically.

## Architecture

This is an [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme hosted on GitHub Pages. There are two distinct kinds of pages:

### 1. Jekyll-managed pages (`_pages/`)
Standard al-folio pages rendered through the Jekyll build pipeline. Key ones:
- `_pages/about.md`: homepage; toggle `selected_papers: true/false` to show featured papers
- `_pages/publications.md`: lists years in front matter (`years: [2026, 2025, ...]`); add a new year here when publishing in a new year
- `_pages/cv.md`: `cv_pdf:` field points to a filename in `assets/pdf/`

### 2. Standalone project pages (root-level subdirectories)
Each paper has a self-contained HTML page (e.g., `attristory/`, `pstarc/`, `santa/`). These are **not** processed by Jekyll: they are plain HTML files served as static assets. They share CSS/JS from `pstarc/static/` via relative paths (`../pstarc/static/css/`). Use `attristory/index.html` as the reference template (it follows all current style rules).

## Publications (`_bibliography/papers.bib`)

Each entry supports these custom fields:
- `abbr` — venue badge label (e.g., `CVPRW`); badge color/URL defined in `_data/venues.yml`
- `abstract` — renders the collapsible Abs button
- `website` — renders the Website button (the only link button currently shown)
- `selected={true}` — surfaces paper on the homepage via `selected_papers.html`
- `arxiv`, `code`, `pdf`, `html`: fields are stored in the bib but **not rendered** (buttons removed from `_layouts/bib.html`); restore them there if needed

The publications page renders buttons via `_layouts/bib.html`. Currently only **Abs** and **Website** buttons are shown.

## Coauthor Links

Author names are auto-linked on the publications page via `_data/coauthors.yml`. To add a clickable link for a coauthor:

```yaml
"Biswas":
  - firstname: ["Soma"]
    url: https://sites.google.com/iisc.ac.in/somabiswas
```

## Adding a New Project Page

1. Create `<project-name>/index.html` — copy structure from `attristory/index.html`
2. Place figures in `<project-name>/static/images/`
3. CSS/JS: reference `../pstarc/static/css/` and `../pstarc/static/js/` (no need to duplicate)
4. Add `website={https://manogna-s.github.io/<project-name>/}` to the bib entry

## Project Page Style Rules (apply to every project page)

- **Font size**: Override to `1.0rem` via a `<style>` block in the page (shared CSS uses `1.2rem`).
- **Text and image width**: Use `<div class="column">` (full width), not `column is-three-quarters`.
- **Images**: `figure img { max-height: 480px; width: auto; display: block; margin: 0 auto; }` — limits height, preserves aspect ratio, centres the image.
- **Tables**: Match the SegAssist results table style — `results-table` class, bold+green for the proposed method row (`segassist-row` pattern), `group-sep` class for group dividers. Always force-center all cells with `text-align: center !important` on both `th`/`td` and their `:first-child` variants — the shared `index.css` has `text-align: right !important` on first children which will override without this.
- **BibTeX copy button**: Always include. Steps:
  - Add `class="language-bibtex"` to both `<pre>` and `<code>`.
  - Load `prism.css`, `prism.min.js`, `prism-bibtex.min.js` in `<head>`.
  - Create `static/js/prism.js` with the `DOMContentLoaded` clipboard-icon button script (see `segassist/static/js/prism.js`).
  - Load `./static/js/prism.js` at the bottom of `<body>` after `index.js`.
- **No em-dashes**: Never use ` — ` in page content. Use `:` instead.

## Adding a New Publication

1. Add entry to `_bibliography/papers.bib` with a unique key (e.g., `sreenivas2026foo`)
2. If the year is new, add it to `years:` in `_pages/publications.md`
3. Add venue badge color/URL to `_data/venues.yml` if the venue is new
