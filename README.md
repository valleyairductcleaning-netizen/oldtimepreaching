# Old Time Preaching website

A lightweight, static HTML website for Cloudflare Pages. The main review is at `book-reviews/the-art-of-divine-contentment/index.html`.

## Deploy with existing GitHub + Cloudflare Pages project

1. In GitHub Desktop, clone the `oldtimepreaching` repository.
2. Extract the ZIP from ChatGPT. Copy the *contents* of its `oldtimepreaching-site` folder into the local cloned repository root alongside README.md, replacing that README if prompted.
3. In GitHub Desktop, commit and **Push origin**.
4. Cloudflare Pages should deploy the updated `main` branch. If it doesn't, verify GitHub repository permissions and the Pages deployment logs.

## Cloudflare Pages settings

- Framework: None
- Branch: main
- Build command: blank
- Build output directory: blank or repository root `/` (as supported by Pages configuration).
- Root directory: repository root.

The top-level `index.html` must remain in the repository root. Do not upload the containing `oldtimepreaching-site` directory as a nested folder.

## Edit content

- Main homepage: `index.html`
- Book review: `book-reviews/the-art-of-divine-contentment/index.html`
- Styling: `assets/style.css`
- Mobile menu and local search: `assets/site.js`
- SEO sitemap: `sitemap.xml`

This build intentionally does not invent additional book reviews or articles. Section landing pages are ready for future content.
