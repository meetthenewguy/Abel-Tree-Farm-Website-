# Repository upload plan

The GitHub connector now has write access for text files. The full Abel Tree Farm preview package is ready locally, but the generated WebP/JPG image files are binary assets and cannot be pushed through the text-oriented file update flow without a bulk binary upload path.

## Recommended upload method

1. Download `abel-tree-farm-preview-package.zip` from ChatGPT.
2. Unzip it locally.
3. In GitHub, open this repository.
4. Click **Add file** -> **Upload files**.
5. Drag the unzipped contents of `abel-tree-farm-preview/` into the repository root.
6. Commit to `main` with message: `Add Abel Tree Farm static site preview`.

## Expected repository root after upload

- `index.html`
- `404.html`
- `_headers`
- `netlify.toml`
- `robots.txt`
- `sitemap.xml`
- `css/styles.css`
- `js/main.js`
- `images/` with WebP/JPG preview assets
- `docs/` with project documentation
- `launch-evidence/` with pre-launch evidence files

## After upload

Deploy from the repository root to Netlify or Cloudflare Pages. Configure form notifications before treating the contact form as live.
