# Production Readiness Plan

## Goal

Turn the Ovrin docs project into a launch-ready, production-quality documentation site that is stable, polished, and prepared for deployment.

## Phase 1 — Core production hardening

### Status: in progress

- [x] Remove localhost-only defaults from config and metadata
- [x] Add environment-based site URL configuration
- [x] Add favicon asset — moved to `src/app/icon.svg` so it is actually linked in `<head>`
- [x] Add robots and sitemap routes — sitemap now derives from the content tree
- [x] Add environment example file

### Remaining tasks

- [x] Confirm site metadata is consistent across the full app shell — every docs route now has
      `generateMetadata`, so each page carries its own title, description, and Open Graph tags
- [ ] Validate deployment assumptions for static export and host platform

## Phase 2 — Content quality and accuracy

### Status: in progress

- [ ] Review all docs content against the real Ovrin backend repository
- [~] Verify code examples are accurate and copy-pasteable — the installation and first-extraction
      pages are corrected and the first-extraction example is verified to compile against the
      upstream checkout; the remaining fences are not yet audited
- [ ] Ensure terminology matches the upstream project exactly
- [ ] Remove weak or generic phrasing from onboarding pages
- [ ] Tighten the reference pages to match actual API contracts

## Phase 3 — UI polish and launch quality

### Status: pending

- [x] Dark mode actually responds to the theme toggle (Tailwind v4 `@custom-variant`), and no
      longer flashes light on load
- [ ] Final polish on landing-page hierarchy and spacing
- [ ] Final pass on docs page typography and rhythm
- [ ] Final pass on code-block styling and syntax consistency
- [ ] Mobile UX validation across breakpoints
- [ ] Accessibility review for contrast, focus states, and navigation

## Phase 4 — Deployment and operational readiness

### Status: pending

- [ ] Choose deployment target (Vercel, Netlify, custom static host)
- [ ] Configure production build settings for the target host
- [ ] Add domain and custom URL configuration
- [ ] Confirm static export behavior matches hosting constraints
- [ ] Add any required CDN or headers configuration

## Phase 5 — Final verification and sign-off

### Status: pending

- [ ] Run final full test suite
- [x] Run lint, typecheck, and build together — CI runs all four, and they pass locally
- [x] Review final README and onboarding commands — `npm run start` is invalid under
      `output: 'export'`; corrected to serving `out/`
- [ ] Check open graph / social preview metadata
- [ ] Launch checklist approval

## Standing constraints

These come from the upstream project and are not stylistic choices:

- No accuracy figure may be published that `eval/` cannot reproduce. The homepage previously
  showed an invented "99.2%"; it must not come back.
- Confidence is a ranking signal, not a probability, until the weights are calibrated.
- The project is pre-v1 with no tagged release, so `go get` does not resolve yet.

## Execution order

1. Finish production hardening
2. Complete content accuracy sweep
3. Final UI polish pass
4. Deployment setup and environment validation
5. Final verification and release sign-off
