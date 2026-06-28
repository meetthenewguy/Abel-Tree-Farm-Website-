# Decision Log — Abel Tree Farm

Date: 2026-06-28

## Operating mode
Production Static Site preview.

## Architecture
Static HTML, external CSS, external JavaScript, no framework, no CMS, no build step.

## Why this stack
The site is contact-driven: call, text, request availability, schedule a farm visit. Static delivery gives the best performance, lowest attack surface, easiest rollback, and lowest maintenance burden.

## Hosting
Recommended: Netlify for the first launch because the quote form is wired for Netlify Forms. Cloudflare Pages also works if the form is moved to a separate endpoint.

## Rendering model
Static HTML. Core content and CTAs remain visible without JavaScript.

## Analytics
None installed. Recommended: Cloudflare Web Analytics only if approved. No ad pixels, heatmaps, session replay, or chat widgets by default.

## Forms
Netlify Forms. Honeypot included. Client-side validation requires name plus phone or email. Success is shown only after `response.ok`. On failure, the form tells the user to call or text.

## Payments
No payments on site. Accepted payments are not emphasized in the interface.

## Third parties
None loaded at runtime. Directions links open Google Maps only after user action. Social links are normal outbound links.

## CSP strategy
Strict static CSP with external CSS/JS and one hash for the JSON-LD block. If schema changes, recompute the CSP hash in `netlify.toml` and `_headers`.

## Performance budgets
- Framework JS: 0 KB
- Hand-written JS: small, route-specific
- Third-party scripts: 0
- Hero image: one optimized WebP with fetch priority
- Non-hero images: lazy-loaded WebP

## Known risks
- Generated watercolor assets are placeholders, not real inventory photos.
- Founding year remains unresolved, so it is omitted.
- FNGLA membership remains unverified, so it is omitted.
- Email provided by the team: `abeltreefarm@aol.com`. Published in contact sections and JSON-LD schema.
- Public hours are used for platform consistency but should still be owner-confirmed before final launch.

## Rollback
Revert to the previous deployed static folder or previous Netlify/Cloudflare deploy. No database migration exists.

## Launch evidence
See `/launch-evidence/2026-06-28/`.
