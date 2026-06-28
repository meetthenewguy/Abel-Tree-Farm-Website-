# Abel Tree Farm website preview package

Production-static preview for `abeltreefarm.com`. Built as a static website with external CSS and JavaScript, no framework, no build step, and generated architectural-watercolor placeholder assets.

## Files

- `index.html` — main website
- `404.html` — branded 404 page
- `css/styles.css` — design system and layout
- `js/main.js` — menu, inventory filters, reveal motion, honest Netlify form handling
- `images/` — generated watercolor placeholder assets
- `robots.txt` and `sitemap.xml` — SEO basics
- `netlify.toml` and `_headers` — deployment headers and CSP
- `docs/` — decision log, asset plan, image prompts, launch blockers

## Preview

Open `index.html` in a browser. Form submission will show a failure message locally because there is no Netlify form server in local file preview. That is intentional. It prevents fake success.

## Launch requirement

Deploy to Netlify or Cloudflare Pages, configure form notifications, test a real submission, replace generated illustrations with approved real farm photography where possible, and rerun Lighthouse plus real-device testing before calling this launch-ready.

## Repository recommendation

Use a dedicated GitHub repository for this project, preferably `abel-tree-farm`, with the static site files at the repository root. Keep generated placeholder images in `images/` until approved real photography replaces them. Use pull requests for future content, image, and SEO updates.
